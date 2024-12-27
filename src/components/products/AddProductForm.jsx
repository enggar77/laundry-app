import { useState, useContext } from "react";
import { Button, Form, Input } from "react-daisyui";
import { StoreContext } from "../../context/StoreContext";
import { fetchProducts } from "../../context/fetchData";
import { addProduct } from "../../context/api";

// eslint-disable-next-line react/prop-types
export default function AddProductForm({ handleClose }) {
   const { dispatch, products } = useContext(StoreContext);
   const [error, setError] = useState("");
   const initialState = {
      name: "",
      price: "",
      type: "Kg",
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
      return products.some((product) => product[field] === value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const productData = {
         ...formData,
         price: parseInt(formData.price),
      };

      if (products) {
         if (isDuplicated("name", formData.name)) {
            setError("Product name already exist, please try another.");
            return;
         }
         if (isNaN(parseInt(formData.price)) || parseInt(formData.price) <= 0) {
            setError("Price must be a positive number.");
            return;
         }
      }
      try {
         await addProduct(productData);
         handleClose();
         await fetchProducts(dispatch);
         resetForm();
      } catch (err) {
         console.log(err.message);
         handleClose();
         dispatch({
            type: "add_product/error",
            payload: "Failed to add new product. please try again.",
         });
      }
   };
   return (
      <Form onSubmit={handleSubmit}>
         <div className="flex flex-col mb-3">
            <label htmlFor="name" className="label">
               <span className="label-text">Product Name</span>
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
            <label htmlFor="price" className="label">
               <span className="label-text">Price</span>
            </label>
            <Input
               id="price"
               name="price"
               color="neutral"
               type="number"
               required
               value={formData.price}
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
