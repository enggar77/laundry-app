import { Menu, Divider } from "react-daisyui";
import { NavLink } from "react-router-dom";

const menuItems = [
   { path: "customers", label: "Customer Management" },
   { path: "products", label: "Product Management" },
   { path: "transactions", label: "Transaction Management" },
   { path: "users", label: "User Management" },
];

export default function Sidebar() {
   return (
      <aside className="w-[30rem] bg-white rounded-2xl shadow-lg py-6 px-8">
         <header className="flex  items-center justify-center gap-2 h-24">
            <img
               src="/assets/logo.png"
               alt="logo"
               className="w-16 rounded-full"
            />
            <h1 className="text-3xl font-bold">Enigma</h1>
         </header>
         <Divider color="neutral" className="opacity-30" />
         <Menu size="lg" className="p-0">
            {menuItems.map((menu) => (
               <Menu.Item key={menu.path}>
                  <NavLink to={`${menu.path}`}>{menu.label}</NavLink>
               </Menu.Item>
            ))}
         </Menu>
      </aside>
   );
}
