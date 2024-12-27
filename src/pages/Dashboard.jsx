import Content from "../sections/Content";
import Header from "../sections/Header";
import Sidebar from "../sections/Sidebar";

export default function Dashboard() {
   // remove scrollbar width in firefox
   if (navigator.userAgent.toLowerCase().includes("firefox")) {
      document.documentElement.style.scrollbarWidth = "none";
   }

   return (
      <>
         <div className="h-screen bg-[#E9E9E9] p-6 flex gap-6">
            <Sidebar />
            <div className="w-full flex flex-col gap-6">
               <Header />
               <Content />
            </div>
         </div>
      </>
   );
}
