import axios from "axios";

export const api = axios.create({
   baseURL: "/api/v1",
});

// LOGIN
export const login = (username, password) =>
   api.post("/auth/login", { username, password });

// USERS
export const listUsers = () =>
   api.get("/users", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const getUser = (userId) =>
   api.get(`/users/${userId}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const addUser = (userData) =>
   api.post("/users", userData, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const deleteUser = (userId) =>
   api.delete(`/users/${userId}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const updateUser = (userId, userData) =>
   api.put(
      `/users`,
      { id: userId, ...userData },
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
         },
      },
   );

// CUSTOMERS
export const listCustomers = () =>
   api.get("/customers", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const getCustomer = (customerId) =>
   api.get(`/customers/${customerId}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const addCustomer = (customerData) =>
   api.post("/customers", customerData, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const deleteCustomer = (customerId) =>
   api.delete(`/customers/${customerId}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const updateCustomer = (customerId, customerData) =>
   api.put(
      `/customers`,
      { id: customerId, ...customerData },
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
         },
      },
   );

// PRODUCTS
export const listProducts = () =>
   api.get("/products", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const getProduct = (productId) =>
   api.get(`/products/${productId}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const addProduct = (productData) =>
   api.post("/products", productData, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const deleteProduct = (productId) =>
   api.delete(`/products/${productId}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const updateProduct = (productId, productData) =>
   api.put(
      `/products`,
      { id: productId, ...productData },
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
         },
      },
   );

// TRANSACTIONS
export const listTransactions = () =>
   api.get("/bills", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const getTransaction = (transactionId) =>
   api.get(`/bills/${transactionId}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
export const addTransaction = (transactionData) =>
   api.post("/bills", transactionData, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
   });
