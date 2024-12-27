import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col items-center min-h-screen pt-[10vh]">
         <h1 className="text-6xl font-bold mb-8">Page not found ...</h1>
         <Button
            color="neutral"
            size="lg"
            onClick={() => navigate("/customers")}
         >
            Back to Dashboard
         </Button>
      </div>
   );
}
