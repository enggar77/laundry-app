import { StoreContext } from "../context/StoreContext";
import { useContext } from "react";
import { Alert } from "react-daisyui";

export default function AlertError() {
   const { errMessage } = useContext(StoreContext);
   return (
      <>
         {errMessage && (
            <Alert status="error" className="my-5 rounded-md">
               {errMessage}
            </Alert>
         )}
      </>
   );
}
