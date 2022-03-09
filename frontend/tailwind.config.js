// TODO: add apply for content-body
// TODO: style/fix map (deleted index.css and now it doesnt work)

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
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Poppins"],
        poppins: ["Poppins", "Roboto"],
        montserrat: ["Montserrat", "Raleway"],
        raleway: ["Raleway", "Monteserrat"],
      },
      animation: {
        "fade-in-down": "fade-in-down cubic-bezier(0.16, 1, 0.3, 1) 2s",
        "fade-in-up": "fade-in-up cubic-bezier(0.16, 1, 0.3, 1) 2s",
      },
    },
    keyframes: {
      "fade-in-down": {
        "0%": {
          opacity: "0",
          transform: "translateY(-100%)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      "fade-in-up": {
        "0%": {
          opacity: "0",
          transform: "translateY(100%)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
  },
  plugins: [],
};
