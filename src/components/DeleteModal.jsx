import { Modal, Button } from "react-daisyui";

// prettier-ignore
// eslint-disable-next-line react/prop-types
export default function DeleteModal({deleteDialog,closeDialog,handleDelete}) {
   return (
      <Modal className="bg-neutral text-white rounded-lg" open={deleteDialog}>
         <Modal.Body className="flex flex-col gap-4 text-lg">
            Are you sure you want to delete this? This action cannot be
            undone.
            <form method="dialog" className="flex justify-end gap-2">
               <Button className="w-14" onClick={closeDialog}>
                  No
               </Button>
               <Button className="w-14" onClick={handleDelete}>
                  Yes
               </Button>
            </form>
         </Modal.Body>
      </Modal>
   );
}
