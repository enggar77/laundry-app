import { useContext, useEffect, useState, useRef } from "react";
import { Table, Button } from "react-daisyui";
import { StoreContext } from "../../context/StoreContext";
import { fetchProducts } from "../../context/fetchData";
import { deleteProduct } from "../../context/api";
import ShowModal from "../ShowModal";
import DeleteModal from "../DeleteModal";
import EditProductForm from "./EditProductForm";

export default function ProductsTable() {
   // prettier-ignore
   const { dispatch, errMessage, products, deleteDialog } = useContext(StoreContext);
   const [selectedProductId, setSelectedProductId] = useState(null);
   const ref = useRef(null);

   const handleShow = (productId) => {
      setSelectedProductId(productId);
      ref.current?.showModal();
   };

   function openDialog(productId) {
      setSelectedProductId(productId);
      dispatch({ type: "delete", payload: true });
   }
   const closeDialog = () => {
      dispatch({ type: "delete", payload: false });
      setSelectedProductId(null);
   };
   function formatPrice(price) {
      if (!price && price !== 0) return "Rp 0";
      return `Rp ${price.toLocaleString("id-ID")}`;
   }

   async function handleDelete() {
      await deleteProduct(selectedProductId);
      await fetchProducts(dispatch);
      closeDialog();
   }

   useEffect(() => {
      if (products && products.length > 0) return;
      fetchProducts(dispatch);
   }, [dispatch, products]);

   return (
      <>
         <Table size="md" className={errMessage ? "" : "mt-6"}>
            <Table.Head>
               <span>No.</span>
               <span>Name</span>
               <span>Price</span>
               <span>Actions</span>
            </Table.Head>
            <Table.Body>
               {products.map((product, index) => (
                  <Table.Row key={product.id}>
                     <span className="font-normal">{index + 1}</span>
                     <span>{product.name}</span>
                     <span>
                        {formatPrice(product.price)}
                        {"/"}
                        {product.type}
                     </span>
                     <span className="flex gap-2">
                        <Button
                           size="sm"
                           color="neutral"
                           onClick={() => handleShow(product.id)}
                        >
                           edit
                        </Button>
                        <Button
                           size="sm"
                           color="neutral"
                           onClick={() => openDialog(product.id)}
                        >
                           delete
                        </Button>
                     </span>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table>

         {/* Delete User */}
         {deleteDialog && (
            <DeleteModal
               deleteDialog={deleteDialog}
               closeDialog={closeDialog}
               handleDelete={handleDelete}
            />
         )}

         {/* Edit User */}
         <ShowModal
            content={EditProductForm}
            ref={ref}
            selectedProductId={selectedProductId}
         />
      </>
   );
}
