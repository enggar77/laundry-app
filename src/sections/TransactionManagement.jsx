import { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { StoreContext } from "../context/StoreContext";
import { Button } from "react-daisyui";

import AlertError from "../components/AlertError";
import LoadingContent from "../components/LoadingContent";
import ShowModal from "../components/ShowModal";
import TransactionsTable from "../components/transactions/TransactionsTable";
import AddTransactionForm from "../components/transactions/AddTransactionForm";

export default function TransactionManagement() {
   const { isLoading, products } = useContext(StoreContext);
   const [transactionId, setTransactionId] = useState("");
   const ref = useRef(null);

   const handleShow = () => {
      setTransactionId(uuidv4());
      ref.current?.showModal();
   };

   function shortenId(id) {
      return id.slice(0, 11).toUpperCase();
   }

   return (
      <>
         {/* Add User */}
         <div className="text-end">
            <Button color="neutral" onClick={handleShow}>
               Add Transaction
            </Button>
         </div>
         <ShowModal
            content={AddTransactionForm}
            ref={ref}
            shortenId={shortenId}
            transactionId={transactionId}
         />
         {/* Error message */}
         <AlertError />
         {/* Table */}
         {products ? (
            isLoading ? (
               <LoadingContent />
            ) : (
               <TransactionsTable shortenId={shortenId} />
            )
         ) : (
            <div className="text-center pt-32 text-lg">
               <p>No data available. Please add a product to get started.</p>
            </div>
         )}
      </>
   );
}
