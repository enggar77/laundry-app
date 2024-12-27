import { Navigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
   const { token } = useContext(StoreContext);
   if (!token) {
      return <Navigate to="/login" replace />;
   } else {
      return children;
   }
}
