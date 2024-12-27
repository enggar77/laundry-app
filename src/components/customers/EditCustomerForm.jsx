import { useContext, useState, useEffect } from "react";
import { Form, Input, Button } from "react-daisyui";
import { StoreContext } from "../../context/StoreContext";
import { fetchCustomers } from "../../context/fetchData";
import { getCustomer, updateCustomer } from "../../context/api";

// eslint-disable-next-line react/prop-types
export default function EditUserForm({ handleClose, selectedCustomerId }) {
   const { dispatch, customers } = useContext(StoreContext);
   const initialState = {
      name: "",
      phoneNumber: "",
      address: "",
   };
   const [formData, setFormData] = useState(initialState);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchCustomerData = async () => {
         try {
            const response = await getCustomer(selectedCustomerId);
            setFormData(response.data.data);
         } catch (error) {
            console.error("Error fetching customer data:", error);
         }
      };

      if (selectedCustomerId) {
         fetchCustomerData();
      }
   }, [selectedCustomerId]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const isDuplicated = (field, value) => {
      return customers.some(
         (customers) =>
            customers[field] === value && customers.id !== selectedCustomerId,
      );
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (isDuplicated("phoneNumber", formData.phoneNumber)) {
         setError("Phone Number already exists, please try another.");
         return;
      }
      try {
         await updateCustomer(selectedCustomerId, formData);
         handleClose();
         fetchCustomers(dispatch);
      } catch (err) {
         console.log(err.message);
         handleClose();
         dispatch({
            type: "edit_customer/error",
            payload: "Failed to edit the customer. please try again.",
         });
      }
   };

   return (
      <Form onSubmit={handleSubmit}>
         <div className="flex flex-col mb-3">
            <label htmlFor="name" className="label">
               <span className="label-text">Customer Name</span>
            </label>
            <Input
               id="name"
               name="name"
               color="neutral"
               required
               value={formData.name}
               onChange={handleInputChange}
            />
         </div>
         <div className="flex flex-col mb-3">
            <label htmlFor="phoneNumber" className="label">
               <span className="label-text">Phone Number</span>
            </label>
            <Input
               id="phoneNumber"
               name="phoneNumber"
               color="neutral"
               required
               value={formData.phoneNumber}
               onChange={handleInputChange}
            />
         </div>
         <div className="flex flex-col mb-3">
            <label htmlFor="address" className="label">
               <span className="label-text">Adress</span>
            </label>
            <Input
               id="address"
               name="address"
               color="neutral"
               required
               value={formData.address}
               onChange={handleInputChange}
            />
         </div>
         <div
            className={`flex justify-end items-center mt-2 ${error ? "justify-between" : ""}`}
         >
            {error && <p className="text-red-400 underline text-sm">{error}</p>}
            <Button color="neutral">Save</Button>
         </div>
      </Form>
   );
}
