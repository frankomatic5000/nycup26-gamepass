import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brazil: {
          blue: "#063B8E",
          navy: "#08275E",
          green: "#179B4C",
          yellow: "#F7C600",
          leaf: "#0E7F3B",
          cream: "#F8F4E8",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Archivo Black", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 48px rgba(8, 39, 94, 0.12)",
      },
    },
  },
  plugins: [animate],
};

export default config;
