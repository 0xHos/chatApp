import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#0d3d4c",
        secondary: "#e9ecef",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
