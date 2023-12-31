import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        /*
          IMPORTANT
          --------------------------------------------------------------------------
          Look at these components whenever values from this object are manipulated
            Header
        */

        tabAndUp: "45rem", // 720px
        laptopAndUp: "81.25rem" // 1300px
      },
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.serif]
      },
      spacing: {
        "8px": "8px",
        "16px": "16px",
        "24px": "24px",
        "32px": "32px",
        "40px": "40px",
        "48px": "48px",
        "56px": "56px",
        "64px": "64px",
        "72px": "72px",
        "80px": "80px"
      }
    },
  },
  plugins: [],
}
