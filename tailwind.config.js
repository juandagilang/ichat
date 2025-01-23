/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#FF8C00", // Warna oranye utama
          600: "#FF7F00", // Warna oranye saat hover
        },
      },
    },
  },
  plugins: [],
};
