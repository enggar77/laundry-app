import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { fetchUsers } from "../../context/fetchData";
import { getUser, updateUser } from "../../context/api";
import { Form, Input, Button } from "react-daisyui";

// eslint-disable-next-line react/prop-types
export default function EditUserForm({ handleClose, selectedUserId }) {
   const { dispatch, users } = useContext(StoreContext);
   const initialState = {
      name: "",
      username: "",
      email: "",
      role: "employee",
   };
   const [formData, setFormData] = useState(initialState);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const response = await getUser(selectedUserId);
            setFormData(response.data.data);
         } catch (error) {
            console.error("Error fetching user data:", error);
         }
      };

      if (selectedUserId) {
         fetchUserData();
      }
   }, [selectedUserId]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const isDuplicated = (field, value) => {
      return users.some(
         (user) => user[field] === value && user.id !== selectedUserId,
      );
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // Check for duplicate username
      if (isDuplicated("username", formData.username)) {
         setError("Username already exists, please try another.");
         return;
      }

      // Check for duplicate email
      if (isDuplicated("email", formData.email)) {
         setError("Email already exists, please try another.");
         return;
      }

      try {
         await updateUser(selectedUserId, formData);
         handleClose();
         fetchUsers(dispatch);
      } catch (err) {
         console.log(err.message);
         handleClose();
         dispatch({
            type: "edit_user/error",
            payload: "Failed to edit the user. please try again.",
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
            <Button color="neutral">Save</Button>
         </div>
      </Form>
   );
}
