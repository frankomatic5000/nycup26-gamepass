import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        us: {
          blue: "#2457C5",
          navy: "#071B4A",
          red: "#D7282F",
          white: "#FFFFFF",
          cream: "#F6F8FC",
        },
      },
      fontFamily: {
        sans: ["Noto Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Archivo Black", "Noto Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 48px rgba(7, 27, 74, 0.12)",
      },
    },
  },
  plugins: [animate],
};

export default config;
