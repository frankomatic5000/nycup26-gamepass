import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brazil: {
          blue: "#4B174F",
          navy: "#24113D",
          green: "#E94733",
          yellow: "#F5B83B",
          leaf: "#B21F3A",
          cream: "#FFF4DF",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Archivo Black", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 48px rgba(36, 17, 61, 0.14)",
      },
    },
  },
  plugins: [animate],
};

export default config;
