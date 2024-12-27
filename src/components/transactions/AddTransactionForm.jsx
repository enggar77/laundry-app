import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Button, Form, Input, Select } from "react-daisyui";
import { fetchTransactions } from "../../context/fetchData";
import { addTransaction } from "../../context/api";

// prettier-ignore
// eslint-disable-next-line react/prop-types
export default function AddTransactionForm({ handleClose, shortenId, transactionId }) {
   const { dispatch, customers, products } = useContext(StoreContext);
   const [customerId, setCustomerId] = useState("default");
   const [serviceId, setServiceId] = useState("default");
   const [qty, setQty] = useState("");
   const [totalPrice, setTotalPrice] = useState(0);
   const [error, setError] = useState('');

   const resetForm = () => {
      setCustomerId('default');
      setServiceId('default');
      setQty('');
      setTotalPrice(0);
      setError("");
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (customerId === 'default') {
         setError("Please select a customer.");
         return;
      }
      if (serviceId === 'default') {
         setError("Please select a package.");
         return;
      }
      if (qty === 0) {
         setError("Please input a quantity");
         return;
      }
      if (qty < 0) {
         setError("Please input a positive number.");
         return;
      }
      const data = {
         customerId: customerId,
         billDetails: [{ product: { id: serviceId }, qty: parseInt(qty) }],
      };
      try {
         await addTransaction(data);
         handleClose();
         await fetchTransactions(dispatch);
         resetForm();
      } catch(err) {
         console.log(err.message);
         handleClose();
         resetForm();
         dispatch({
            type: "add_transaction/error",
            payload: "Failed to add new transaction. please try again.",
         });
      }
   };

   useEffect(() => {
      if (serviceId === 'default' || !qty) {
         setTotalPrice(0);
         return;
      }
      const selectedProduct = products.find(product => product.id === serviceId);
      if (selectedProduct) {
         setTotalPrice(selectedProduct.price * qty);
      }
   }, [serviceId, qty, products]);

   return (
      <Form onSubmit={handleSubmit}>
         <div className="flex flex-col mb-3">
            <label htmlFor="transactionId" className="label">
               <span className="label-text">Transaction ID</span>
            </label>
            <Input
               id="transactionId"
               name="transactionId"
               color="neutral"
               value={shortenId(transactionId)}
               disabled
            />
         </div>
         <div className="flex flex-col mb-3">
            <label htmlFor="customerName" className="label">
               <span className="label-text">Customer Name</span>
            </label>
            <Select
               id="customerName"
               name="customerName"
               color="neutral"
               value={customerId}
               onChange={(e) => setCustomerId(e.target.value)}
               required
            >
               <option value={"default"} disabled>Choose customer</option>
               {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
               ))}
            </Select>
         </div>
         <div className="flex flex-col mb-3">
            <label htmlFor="package" className="label">
               <span className="label-text">Package</span>
            </label>
            <Select
               id="package"
               name="package"
               color="neutral"
               value={serviceId}
               onChange={(e) => setServiceId(e.target.value)}
               required
            >
               <option value={"default"} disabled>Choose package</option>
               {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
               ))}
            </Select>
         </div>
         <div className="flex flex-col mb-3">
            <label htmlFor="qty" className="label">
               <span className="label-text">Qty (Kg)</span>
            </label>
            <Input
               id="qty"
               name="qty"
               color="neutral"
               type="number"
               value={qty}
               onChange={(e) => setQty(e.target.value)}
               required
            />
         </div>
         <div className="flex flex-col mb-3">
            <label htmlFor="price" className="label">
               <span className="label-text">Total Price</span>
            </label>
            <Input
               id="price"
               name="price"
               color="neutral"
               value={totalPrice}
               disabled
            />
         </div>
         <div
            className={`flex justify-end items-center mt-2 ${error ? "justify-between" : ""}`}
         >
            {error && <p className="text-red-400 underline text-sm">{error}</p>}
            <Button color="neutral">Submit</Button>
         </div>
      </Form>
   );
}
