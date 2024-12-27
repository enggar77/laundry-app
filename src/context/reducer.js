const initialState = {
   token: localStorage.getItem("authToken") || null,
   isLoading: false,
   errMessage: "",
   deleteDialog: false,
   users: [],
   customers: [],
   products: [],
   transactions: [],
};

function reducer(state, action) {
   switch (action.type) {
      // LOGIN
      case "login/loading":
         return {
            ...state,
            isLoading: true,
            errMessage: "",
         };
      case "login/error":
         return {
            ...state,
            errMessage: action.payload,
            isLoading: false,
         };
      case "login/success":
         return {
            ...state,
            token: action.payload.token,
            isLoading: false,
            errMessage: "",
         };
      // LOGOUT
      case "logout":
         return {
            ...state,
            token: null,
            errMessage: "",
            isLoading: false,
            users: [],
            customers: [],
            products: [],
            transactions: [],
         };
      // DELETE
      case "delete":
         return {
            ...state,
            deleteDialog: action.payload,
         };
      // USER MANAGEMENT
      case "get_users/loading":
         return {
            ...state,
            isLoading: true,
            errMessage: "",
         };
      case "get_users/error":
         return {
            ...state,
            errMessage: action.payload,
            isLoading: false,
         };
      case "get_users/success":
         return {
            ...state,
            users: action.payload,
            isLoading: false,
            errMessage: "",
         };
      case "add_user/error":
         return {
            ...state,
            errMessage: action.payload,
         };
      case "edit_user/error":
         return {
            ...state,
            errMessage: action.payload,
         };
      // CUSTOMER MANAGEMENT
      case "get_customers/loading":
         return {
            ...state,
            isLoading: true,
            errMessage: "",
         };
      case "get_customers/error":
         return {
            ...state,
            errMessage: action.payload,
            isLoading: false,
         };
      case "get_customers/success":
         return {
            ...state,
            customers: action.payload,
            isLoading: false,
            errMessage: "",
         };
      case "add_customer/error":
         return {
            ...state,
            errMessage: action.payload,
         };
      case "edit_customer/error":
         return {
            ...state,
            errMessage: action.payload,
         };
      // PRODUCTS MANAGEMENT
      case "get_products/loading":
         return {
            ...state,
            isLoading: true,
            errMessage: "",
         };
      case "get_products/error":
         return {
            ...state,
            errMessage: action.payload,
            isLoading: false,
         };
      case "get_products/success":
         return {
            ...state,
            products: action.payload,
            isLoading: false,
            errMessage: "",
         };
      case "add_product/error":
         return {
            ...state,
            errMessage: action.payload,
         };
      case "edit_product/error":
         return {
            ...state,
            errMessage: action.payload,
         };
      // TRANSACTIONS MANAGEMENT
      case "get_transactions/loading":
         return {
            ...state,
            isLoading: true,
            errMessage: "",
         };
      case "get_transactions/error":
         return {
            ...state,
            errMessage: action.payload,
            isLoading: false,
         };
      case "get_transactions/success":
         return {
            ...state,
            transactions: action.payload,
            isLoading: false,
            errMessage: "",
         };
      case "add_transaction/error":
         return {
            ...state,
            errMessage: action.payload,
         };
      default:
         throw new Error(`Unhandled action type: ${action.type}`);
   }
}

export { initialState, reducer };
