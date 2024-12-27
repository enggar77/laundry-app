import { useContext, useRef } from "react";
import { StoreContext } from "../context/StoreContext";
import { Button } from "react-daisyui";

import UsersTable from "../components/users/UsersTable";
import AlertError from "../components/AlertError";
import LoadingContent from "../components/LoadingContent";
import ShowModal from "../components/ShowModal";
import AddUserForm from "../components/users/AddUserForm";

export default function UserManagement() {
   const { isLoading, users } = useContext(StoreContext);
   const ref = useRef(null);

   const handleShow = () => {
      ref.current?.showModal();
   };

   return (
      <>
         {/* Add User */}
         <div className="text-end">
            <Button color="neutral" onClick={handleShow}>
               Add User
            </Button>
         </div>
         <ShowModal content={AddUserForm} ref={ref} />
         {/* Error message */}
         <AlertError />
         {/* Table */}
         {users ? (
            isLoading ? (
               <LoadingContent />
            ) : (
               <UsersTable />
            )
         ) : (
            <div className="text-center pt-32 text-lg">
               <p>No data available. Please add a user to get started.</p>
            </div>
         )}
      </>
   );
}
