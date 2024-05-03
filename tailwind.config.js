/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#065f46",
          secondary: "#042f2e",
          "secondary-content": "#047857",
          accent: "#66ffdb",
          neutral: "#0f766e",
          "base-100": "#b9bdb5",
          "base-content": "#66ffdb",
          info: "#8c7501",
          success: "#021f1a",
          warning: "#c94902",
          error: "#ba0000",
          disabled: "#ba0000",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
