/** @type {import('tailwindcss/types').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#100F10",
          100: "#666666",
          200: "#BABABA",
          300: "#D9D9D9",
          400: "#C0C0C0",
        },
        light: {
          50: "#FFFFFF",
          100: "#f5c2ff",
          200: "#ff8fe3",
          300: "#e0a3ff",
          400: "#b32eb3",
          500: "#FF47E6",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
