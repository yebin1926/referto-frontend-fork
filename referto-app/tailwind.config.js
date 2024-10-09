// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxl: "1100px",
      },
      placeholderColor: {
        "custom-color": "#E5E5E5",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        slideDown: "slideDown 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
