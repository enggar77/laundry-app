// prettier-ignore
import { listUsers, listCustomers, listProducts, listTransactions } from "./api";

// Users
export const fetchUsers = async (dispatch) => {
   try {
      dispatch({ type: "get_users/loading" });
      const response = await listUsers();
      if (response.status) {
         const fetchedUsers = response.data.data;
         setTimeout(() => {
            dispatch({
               type: "get_users/success",
               payload: fetchedUsers,
            });
         }, 1000);
      }
   } catch (err) {
      console.error("Error fetching users:", err);
      dispatch({
         type: "get_users/error",
         payload: "Failed to fetch users. Please try again.",
      });
   }
};

// Customers
export const fetchCustomers = async (dispatch) => {
   try {
      dispatch({ type: "get_customers/loading" });
      const response = await listCustomers();
      if (response.status) {
         const fetchedCustomers = response.data.data;
         setTimeout(() => {
            dispatch({
               type: "get_customers/success",
               payload: fetchedCustomers,
            });
         }, 1000);
      }
   } catch (err) {
      console.error("Error fetching customers:", err);
      dispatch({
         type: "get_customers/error",
         payload: "Failed to fetch customers. Please try again.",
      });
   }
};

// Products
export const fetchProducts = async (dispatch) => {
   try {
      dispatch({ type: "get_products/loading" });
      const response = await listProducts();
      if (response.status) {
         const fetchedProducts = response.data.data;
         setTimeout(() => {
            dispatch({
               type: "get_products/success",
               payload: fetchedProducts,
            });
         }, 1000);
      }
   } catch (err) {
      console.error("Error fetching products:", err);
      dispatch({
         type: "get_products/error",
         payload: "Failed to fetch products. Please try again.",
      });
   }
};

// Transactions
export const fetchTransactions = async (dispatch) => {
   try {
      dispatch({ type: "get_transactions/loading" });
      const response = await listTransactions();
      if (response.status) {
         const fetchedTransactions = response.data.data;
         setTimeout(() => {
            dispatch({
               type: "get_transactions/success",
               payload: fetchedTransactions,
            });
         }, 1000);
      }
   } catch (err) {
      console.error("Error fetching transactions:", err);
      dispatch({
         type: "get_transactions/error",
         payload: "Failed to fetch transactions. Please try again.",
      });
   }
};
