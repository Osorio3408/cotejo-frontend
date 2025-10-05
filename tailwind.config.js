// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfff6",
          100: "#c8ffe6",
          200: "#94f7cf",
          300: "#54e9b3",
          400: "#1fd89a",
          500: "#00c481", // Verde COTEJO
          600: "#00a871",
          700: "#008a5f",
          800: "#066c4e",
          900: "#0a5742",
        },
      },
      boxShadow: { soft: "0 10px 25px -10px rgb(0 196 129 / 0.25)" },
    },
  },
  plugins: [],
}
