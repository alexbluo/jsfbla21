module.exports = {
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
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Poppins", "Open Sans"],
        poppins: ["Poppins", "Roboto", "Open Sans"],
        open_sans: ["Open Sans"],
        monteserrat: ["Monteserrat", "Raleway"],
        raleway: ["Raleway", "Monteserrat"],
      },
      animation: {},
    },
  },
  plugins: [],
};
