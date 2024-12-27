import { Outlet } from "react-router-dom";

export default function Content() {
   return (
      <div className="bg-white h-full rounded-2xl py-6 px-8 shadow-lg flex flex-col">
         <Outlet />
      </div>
   );
}
