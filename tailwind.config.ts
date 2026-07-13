import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf4e8",
        linen: "#efe2cd",
        mocha: "#6f5746",
        umber: "#3f3027",
        gold: "#b89556",
        bronze: "#9b6d2f",
        sage: "#7d8974",
        blush: "#d8aea0"
      },
      boxShadow: {
        envelope: "0 26px 80px rgba(63, 48, 39, 0.22)",
        glow: "0 0 55px rgba(184, 149, 86, 0.22)",
        soft: "0 18px 60px rgba(74, 53, 35, 0.12)",
        button: "0 14px 30px rgba(155, 109, 47, 0.26)"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "Segoe UI", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
