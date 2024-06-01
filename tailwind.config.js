import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ["Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
        "4xs": "0.375rem",
      },
      lineHeight: {
        "2xs": "0.75rem",
        "3xs": "0.625rem",
        "4xs": "0.5rem",
      },
      colors: {
        extrablack: "#141414",
        extragray0: "#6A6A6A",
        extragray1: "#808080",
        extragray2: "#C5C5C5",
        extragray3: "#D9D9D9",
        extragray4: "#F1F1F1",
        darkgreen: "#343300",
        customgreen: "#429400",
        dirtywhite: "#F8FDEF",
        lime: "#EDD000",
      },
      letterSpacing: {
        verywide: "0.2em",
        veryverywide: "0.5em",
      },
      screens: {
        mb: "400px", // Mobile screen
        mbx: "500px", // Mid Mobile screen
        sm: "640px", // Small screens
        md: "768px", // Medium screens
        lg: "1024px", // Large screens
        xl: "1280px", // Extra-large screens
        "2xl": "1536px", // 2XL screens
      },
      borderRadius: {
        large: "30px",
        medium: "15px",
      },
      maxWidth: {
        large: "40rem",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["bumblebee"],
  },
};
