/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "node_modules/daisyui/dist/**/*.js",
      "node_modules/react-daisyui/dist/**/*.js",
   ],
   theme: {
      extend: {
         fontFamily: {
            sans: ["Nunito"],
         },
      },
   },
   plugins: [require("daisyui")],
   daisyui: {
      themes: ["emerald"],
   },
};
