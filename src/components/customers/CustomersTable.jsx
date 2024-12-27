import { useContext, useEffect, useState, useRef } from "react";
import { Table, Button } from "react-daisyui";
import { StoreContext } from "../../context/StoreContext";
import { fetchCustomers } from "../../context/fetchData";
import { deleteCustomer } from "../../context/api";
import ShowModal from "../ShowModal";
import DeleteModal from "../DeleteModal";
import EditCustomerForm from "./EditCustomerForm";

export default function CustomersTable() {
   // prettier-ignore
   const { dispatch, errMessage, customers, deleteDialog } = useContext(StoreContext);
   const [selectedCustomerId, setSelectedCustomerId] = useState(null);
   const ref = useRef(null);

   const handleShow = (customerId) => {
      setSelectedCustomerId(customerId);
      ref.current?.showModal();
   };

   function openDialog(customerId) {
      setSelectedCustomerId(customerId);
      dispatch({ type: "delete", payload: true });
   }
   const closeDialog = () => {
      dispatch({ type: "delete", payload: false });
      setSelectedCustomerId(null);
   };
   async function handleDelete() {
      await deleteCustomer(selectedCustomerId);
      await fetchCustomers(dispatch);
      closeDialog();
   }

   useEffect(() => {
      if (customers && customers.length > 0) return;
      fetchCustomers(dispatch);
   }, [dispatch, customers]);

   return (
      <>
         <Table size="md" className={errMessage ? "" : "mt-6"}>
            <Table.Head>
               <span>No.</span>
               <span>Name</span>
               <span>Phone Number</span>
               <span>Address</span>
               <span>Actions</span>
            </Table.Head>
            <Table.Body>
               {customers.map((customer, index) => (
                  <Table.Row key={customer.id}>
                     <span className="font-normal">{index + 1}</span>
                     <span>{customer.name}</span>
                     <span>{customer.phoneNumber}</span>
                     <span>{customer.address}</span>
                     <span className="flex gap-2">
                        <Button
                           size="sm"
                           color="neutral"
                           onClick={() => handleShow(customer.id)}
                        >
                           edit
                        </Button>
                        <Button
                           size="sm"
                           color="neutral"
                           onClick={() => openDialog(customer.id)}
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
            content={EditCustomerForm}
            ref={ref}
            selectedCustomerId={selectedCustomerId}
         />
      </>
   );
}
