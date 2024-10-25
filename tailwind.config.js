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
          100: "#008080",
          200: "#BABABA",
          300: "#D9D9D9",
          400: "#C0C0C0",
        },
        light: {
          50: "#FFFFFF",
          100: "#E6E6FA",
          200: "#FFDAB9",
          300: "#FFFFE0",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
