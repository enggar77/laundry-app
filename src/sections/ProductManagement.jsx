import { useContext, useRef } from "react";
import { StoreContext } from "../context/StoreContext";
import { Button } from "react-daisyui";

import AlertError from "../components/AlertError";
import LoadingContent from "../components/LoadingContent";
import ShowModal from "../components/ShowModal";
import ProductsTable from "../components/products/ProductsTable";
import AddProductForm from "../components/products/AddProductForm";

export default function CustomerManagement() {
   const { isLoading, products } = useContext(StoreContext);
   const ref = useRef(null);

   const handleShow = () => {
      ref.current?.showModal();
   };

   return (
      <>
         {/* Add User */}
         <div className="text-end">
            <Button color="neutral" onClick={handleShow}>
               Add Product
            </Button>
         </div>
         <ShowModal content={AddProductForm} ref={ref} />
         {/* Error message */}
         <AlertError />
         {/* Table */}
         {products ? (
            isLoading ? (
               <LoadingContent />
            ) : (
               <ProductsTable />
            )
         ) : (
            <div className="text-center pt-32 text-lg">
               <p>No data available. Please add a product to get started.</p>
            </div>
         )}
      </>
   );
}
