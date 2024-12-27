import { useState, useContext } from "react";
import { Button, Form, Input } from "react-daisyui";
import { StoreContext } from "../../context/StoreContext";
import { fetchCustomers } from "../../context/fetchData";
import { addCustomer } from "../../context/api";

// eslint-disable-next-line react/prop-types
export default function AddCustomerForm({ handleClose }) {
   const { dispatch, customers } = useContext(StoreContext);
   const [error, setError] = useState("");
   const initialState = {
      name: "",
      phoneNumber: "",
      address: "",
   };
   const [formData, setFormData] = useState(initialState);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const resetForm = () => {
      setFormData(initialState);
      setError("");
   };

   const isDuplicated = (field, value) => {
      return customers.some((customer) => customer[field] === value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (customers) {
         if (isDuplicated("phoneNumber", formData.phoneNumber)) {
            setError("Phone number already exist, please try another.");
            return;
         }
      }
      try {
         await addCustomer(formData);
         handleClose();
         await fetchCustomers(dispatch);
         resetForm();
      } catch (err) {
         console.log(err.message);
         handleClose();
         dispatch({
            type: "add_customer/error",
            payload: "Failed to add new customer. please try again.",
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
            <Button color="neutral">Submit</Button>
         </div>
      </Form>
   );
}
