import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { fetchProducts } from "../../context/fetchData";
import { getProduct, updateProduct } from "../../context/api";
import { Form, Input, Button } from "react-daisyui";

// eslint-disable-next-line react/prop-types
export default function EditProductForm({ handleClose, selectedProductId }) {
   const { dispatch, products } = useContext(StoreContext);
   const initialState = {
      name: "",
      price: "",
      type: "Kg",
   };
   const [formData, setFormData] = useState(initialState);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchedProductData = async () => {
         try {
            const response = await getProduct(selectedProductId);
            setFormData(response.data.data);
         } catch (error) {
            console.error("Error fetching product data:", error);
         }
      };

      if (selectedProductId) {
         fetchedProductData();
      }
   }, [selectedProductId]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const isDuplicated = (field, value) => {
      return products.some(
         (product) =>
            product[field] === value && product.id !== selectedProductId,
      );
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const productData = {
         ...formData,
         price: parseInt(formData.price),
      };
      if (isDuplicated("name", formData.name)) {
         setError("Product Name already exists, please try another.");
         return;
      }
      if (isNaN(parseInt(formData.price)) || parseInt(formData.price) <= 0) {
         setError("Price must be a positive number.");
         return;
      }

      try {
         await updateProduct(selectedProductId, productData);
         handleClose();
         fetchProducts(dispatch);
      } catch (err) {
         console.log(err.message);
         handleClose();
         dispatch({
            type: "edit_product/error",
            payload: "Failed to edit the product. please try again.",
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
            <Button color="neutral">Save</Button>
         </div>
      </Form>
   );
}
