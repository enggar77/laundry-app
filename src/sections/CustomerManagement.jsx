import { useContext, useRef } from "react";
import { StoreContext } from "../context/StoreContext";
import { Button } from "react-daisyui";

import AlertError from "../components/AlertError";
import LoadingContent from "../components/LoadingContent";
import ShowModal from "../components/ShowModal";
import CustomersTable from "../components/customers/CustomersTable";
import AddCustomerForm from "../components/customers/AddCustomerForm";

export default function CustomerManagement() {
   const { isLoading, customers } = useContext(StoreContext);
   const ref = useRef(null);

   const handleShow = () => {
      ref.current?.showModal();
   };

   return (
      <>
         {/* Add User */}
         <div className="text-end">
            <Button color="neutral" onClick={handleShow}>
               Add Customer
            </Button>
         </div>
         <ShowModal content={AddCustomerForm} ref={ref} />
         {/* Error message */}
         <AlertError />
         {/* Table */}
         {customers ? (
            isLoading ? (
               <LoadingContent />
            ) : (
               <CustomersTable />
            )
         ) : (
            <div className="text-center pt-32 text-lg">
               <p>No data available. Please add a customer to get started.</p>
            </div>
         )}
      </>
   );
}
