import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Avatar, Button } from "react-daisyui";

export default function Header() {
   const { dispatch } = useContext(StoreContext);
   const navigate = useNavigate();
   const location = useLocation();
   const [dropdownOpen, setDropdownOpen] = useState(false);

   // Logout handler
   const handleLogout = async () => {
      dispatch({ type: "logout" });
      localStorage.removeItem("authToken");
      navigate("/login");
   };

   // Toggle dropdown
   const toggleDropdown = () => {
      setDropdownOpen((prev) => !prev);
   };

   const formattedPathname = location.pathname.replace(/^\/+/, "");

   return (
      <header className="flex justify-between items-center relative bg-white rounded-2xl py-6 px-8 shadow-lg">
         <h1 className="text-4xl font-bold">
            Admin Dashboard - {formattedPathname.charAt(0).toUpperCase()}
            {formattedPathname.slice(1)}
         </h1>

         {/* Avatar and Dropdown */}
         <div className="relative">
            <div
               onClick={toggleDropdown}
               className="cursor-pointer flex items-center gap-2"
            >
               <Avatar
                  shape="circle"
                  size="sm"
                  border="true"
                  borderColor="neutral"
                  color="neutral"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
               />
            </div>
            {dropdownOpen && (
               <div className="absolute right-0 mt-2 w-40  rounded z-10">
                  <Button
                     onClick={handleLogout}
                     className="block w-full px-4 py-2 text-left text-lg"
                  >
                     Log out
                  </Button>
               </div>
            )}
         </div>
      </header>
   );
}
