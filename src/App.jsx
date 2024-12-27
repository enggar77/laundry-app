import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreProvider from "./context/StoreContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import UserManagement from "./sections/UserManagement";
import CustomerManagement from "./sections/CustomerManagement";
import ProductManagement from "./sections/ProductManagement";
import TransactionManagement from "./sections/TransactionManagement";

function App() {
   return (
      <BrowserRouter>
         <StoreProvider>
            <Routes>
               <Route path="/login" element={<LoginPage />} />
               <Route
                  path="/"
                  element={
                     <ProtectedRoute>
                        <Dashboard />
                     </ProtectedRoute>
                  }
               >
                  <Route index element={<CustomerManagement />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="products" element={<ProductManagement />} />
                  <Route path="customers" element={<CustomerManagement />} />
                  {/* prettier-ignore */}
                  <Route path="transactions" element={<TransactionManagement />} />
               </Route>
               <Route path="/*" element={<PageNotFound />} />
            </Routes>
         </StoreProvider>
      </BrowserRouter>
   );
}

export default App;
