const colors = require("tailwindcss/colors");

// TODO: add default theme for fonts
module.exports = {
  mode: "jit",
  content: [
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    colors: {
      red: "rgb(157, 34, 53)",
      white: "rgb(255, 255, 255)",
      gold: "rgb(234, 170, 0)",
      black: "rgb(0, 0, 0)",
      blue: colors.blue,
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Poppins"],
        poppins: ["Poppins", "Roboto"],
        montserrat: ["Montserrat", "Raleway"],
        raleway: ["Raleway", "Montserrat"],
      },
    },
  },
  plugins: [],
};
