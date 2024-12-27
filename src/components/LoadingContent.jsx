import { Loading } from "react-daisyui";

export default function LoadingContent() {
   return (
      <div className="flex-1 flex items-start justify-center pt-36">
         <Loading size="lg" variant="spinner" />
      </div>
   );
}
