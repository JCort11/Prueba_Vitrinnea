/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#93c5fd",
          500: "#2563eb",
          700: "#1e40af",
        },
        accent: {
          500: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 6px 20px rgba(16,24,40,0.08)",
      },
      borderRadius: {
        lg: "12px",
      },
    },
  },
  plugins: [],
};