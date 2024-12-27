import { useContext, useEffect, useState, useRef } from "react";
import { Table, Button } from "react-daisyui";
import { StoreContext } from "../../context/StoreContext";
import { fetchUsers } from "../../context/fetchData";
import { deleteUser } from "../../context/api";
import ShowModal from "../ShowModal";
import DeleteModal from "../DeleteModal";
import EditUserForm from "./EditUserForm";

export default function UsersTable() {
   // prettier-ignore
   const { dispatch, errMessage, users, deleteDialog } = useContext(StoreContext);
   const [selectedUserId, setSelectedUserId] = useState(null);
   const ref = useRef(null);

   const handleShow = (userId) => {
      setSelectedUserId(userId);
      ref.current?.showModal();
   };

   function openDialog(userId) {
      setSelectedUserId(userId);
      dispatch({ type: "delete", payload: true });
   }
   const closeDialog = () => {
      dispatch({ type: "delete", payload: false });
      setSelectedUserId(null);
   };
   async function handleDelete() {
      await deleteUser(selectedUserId);
      await fetchUsers(dispatch);
      closeDialog();
   }

   useEffect(() => {
      if (users && users.length > 0) return;
      fetchUsers(dispatch);
   }, [dispatch, users]);

   return (
      <>
         <Table size="md" className={errMessage ? "" : "mt-6"}>
            <Table.Head>
               <span>No.</span>
               <span>Name</span>
               <span>Username</span>
               <span>Email</span>
               <span>Role</span>
               <span>Actions</span>
            </Table.Head>
            <Table.Body>
               {users.map((user, index) => (
                  <Table.Row key={user.id}>
                     <span className="font-normal">{index + 1}</span>
                     <span>{user.name}</span>
                     <span>{user.username}</span>
                     <span>{user.email}</span>
                     <span className="capitalize">{user.role}</span>
                     <span className="flex gap-2">
                        <Button
                           size="sm"
                           color="neutral"
                           onClick={() => handleShow(user.id)}
                        >
                           edit
                        </Button>
                        <Button
                           size="sm"
                           color="neutral"
                           onClick={() => openDialog(user.id)}
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
            content={EditUserForm}
            ref={ref}
            selectedUserId={selectedUserId}
         />
      </>
   );
}
