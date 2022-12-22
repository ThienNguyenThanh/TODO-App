/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      colors: {
        app: {
          100: "#FFFFFF",
          200: "#E6EFFA",
          300: "#EFF3F8",
          400: "#A7CBFF",
          500: "#858E9D",
          600: "#505966",
          700: "#1D3557",
          800: "#051123",
        },
      },
    },
  },
  plugins: [],
};
