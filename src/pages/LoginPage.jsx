import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { login } from "../context/api";
// prettier-ignore
import { Card,  Form, Input, Button, Loading, Tooltip } from "react-daisyui";
import AlertError from "../components/AlertError";

export default function LoginPage() {
   const { dispatch, isLoading, token } = useContext(StoreContext);
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!username || !password) {
         dispatch({
            type: "login/error",
            payload: "Username or password cannot be empty.",
         });

         return;
      }

      try {
         dispatch({ type: "login/loading" });
         const response = await login(username, password);
         const token = await response.data.data.token;
         if (token) {
            setTimeout(() => {
               const id = dispatch({
                  type: "login/success",
                  payload: { token },
               });
               localStorage.setItem("authToken", token);
               return () => clearTimeout(id);
            }, 1200);
         }
      } catch (error) {
         setUsername("");
         setPassword("");

         dispatch({
            type: "login/error",
            payload: "Invalid username or password.",
         });
         console.error("Login error: ", error.message);
      }
   };

   useEffect(() => {
      if (token) {
         navigate("/customers", { replace: true });
      }
   }, [token, navigate]);

   return (
      <div className="min-h-screen flex bg-[#E9E9E9]">
         <div className="bg-[url('/assets/bg.png')] w-[60%] bg-no-repeat bg-cover bg-center"></div>
         <Card className="w-[40%] bg-[#fff] min-h-full rounded-2xl m-6 py-20 flex flex-col items-center gap-24">
            <header className="flex flex-col items-center gap-20">
               <img
                  src="/assets/logo.png"
                  alt="logo"
                  className="w-16 rounded-full"
               />

               <h1 className="text-5xl font-extrabold">Welcome back!</h1>
            </header>

            <Form onSubmit={handleSubmit} className="w-[25rem]">
               {/* error */}
               <AlertError />

               <Input
                  className="mb-4"
                  size="lg"
                  placeholder="Username"
                  color="neutral"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />

               <Input
                  placeholder="Password"
                  size="lg"
                  color="neutral"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <Button className="mt-6" type="submit" color="neutral" size="lg">
                  {isLoading ? <Loading /> : "Log in"}
               </Button>

               <div className="mt-[2rem]">
                  <Tooltip
                     className="underline text-start cursor-pointer text-md"
                     message="username: admin - password: password"
                     position="right"
                  >
                     Demo account
                  </Tooltip>
               </div>
            </Form>
         </Card>
      </div>
   );
}
