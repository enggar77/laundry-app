import { forwardRef, useState } from "react";
import { Button, Modal } from "react-daisyui";

// eslint-disable-next-line react/prop-types
const ShowModal = forwardRef(({ content: Content, ...props }, ref) => {
   const handleClose = () => {
      ref.current?.close();
   };
   const [wide, setWide] = useState(false);

   return (
      <>
         <Modal
            ref={ref}
            backdrop="true"
            onClose={handleClose}
            className={wide ? "w-11/12 max-w-5xl overflow-visible" : ""}
         >
            {/* Close Button */}
            <form method="dialog">
               <Button
                  size="sm"
                  color="neutral"
                  shape="circle"
                  className="absolute right-2 top-2"
                  onClick={handleClose}
               >
                  x
               </Button>
            </form>
            {/* Render Dynamic Content */}
            <Content handleClose={handleClose} setWide={setWide} {...props} />
         </Modal>
      </>
   );
});

// Set displayName to avoid ESLint warning
ShowModal.displayName = "ShowModal";

export default ShowModal;
