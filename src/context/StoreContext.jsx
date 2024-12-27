import { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext();

// eslint-disable-next-line react/prop-types
const StoreProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const value = {
      dispatch,
      token: state.token,
      isLoading: state.isLoading,
      errMessage: state.errMessage,
      deleteDialog: state.deleteDialog,
      users: state.users,
      customers: state.customers,
      products: state.products,
      transactions: state.transactions,
   };

   return (
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
   );
};

export default StoreProvider;
