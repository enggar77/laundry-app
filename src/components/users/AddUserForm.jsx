import { useState, useContext } from "react";
import { Button, Form, Input } from "react-daisyui";
import { StoreContext } from "../../context/StoreContext";
import { fetchUsers } from "../../context/fetchData";
import { addUser } from "../../context/api";

// eslint-disable-next-line react/prop-types
export default function AddUserForm({ handleClose }) {
   const { dispatch, users } = useContext(StoreContext);
   const [error, setError] = useState("");
   const initialState = {
      name: "",
      username: "",
      email: "",
      role: "employee",
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
      return users.some((user) => user[field] === value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (users) {
         if (isDuplicated("username", formData.username)) {
            setError("Username already exist, please try another.");
            return;
         }
         if (isDuplicated("email", formData.email)) {
            setError("Email already exist, please try another.");
            return;
         }
      }
      try {
         await addUser(formData);
         handleClose();
         await fetchUsers(dispatch);
         resetForm();
      } catch (err) {
         console.log(err.message);
         handleClose();
         dispatch({
            type: "add_user/error",
            payload: "Failed to add new user. please try again.",
         });
      }
   };
   return (
      <Form onSubmit={handleSubmit}>
         <div className="flex flex-col mb-3">
            <label htmlFor="name" className="label">
               <span className="label-text">Full Name</span>
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
            <label htmlFor="username" className="label">
               <span className="label-text">Username</span>
            </label>
            <Input
               id="username"
               name="username"
               color="neutral"
               required
               value={formData.username}
               onChange={handleInputChange}
            />
         </div>
         <div className="flex flex-col mb-3">
            <label htmlFor="email" className="label">
               <span className="label-text">Email</span>
            </label>
            <Input
               id="email"
               name="email"
               type="email"
               color="neutral"
               required
               value={formData.email}
               onChange={handleInputChange}
            />
         </div>
         <div className="flex flex-col mb-3">
            <label className="label">
               <span className="label-text">Role</span>
            </label>
            <Input name="role" color="neutral" value={formData.role} readOnly />
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
