const colors = require("tailwindcss/colors");

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
        raleway: ["Raleway", "Monteserrat"],
      },
      animation: {
        "fade-in-down": "fade-in-down cubic-bezier(0.16, 1, 0.3, 1) 2s",
        "fade-in-up": "fade-in-up cubic-bezier(0.16, 1, 0.3, 1) 2s",
        "scale-up": "scale-up .4s cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
    keyframes: {
      "fade-in-down": {
        "0%": {
          opacity: "0",
          transform: "translateY(-200%)",
        },
        "100%": {
          opacity: "0.9",
          transform: "translateY(0%)",
        },
      },
      "fade-in-up": {
        "0%": {
          opacity: "0",
          transform: "translateY(200%)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0%)",
        },
      },
      "scale-up": {
        "0%": {
          transform: "scale(0)",
        },
        "100%": {
          transform: "scale(1)",
        },
      },
    },
  },
  plugins: [],
};
