import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep, slightly warm navy / near-black ink
        navy: {
          DEFAULT: "#0A0E1A",
          900: "#070A12",
          800: "#0F1424",
          700: "#1A2138",
          600: "#2A3450",
        },
        ink: "#0B1120", // primary body text
        paper: "#F6F5F1", // warm off-white page background
        // Electric lime accent — used sparingly
        lime: {
          DEFAULT: "#AAFF00",
          dark: "#7FB500", // accessible-ish for small accents on light
          glow: "#C2FF4D",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,17,32,0.04), 0 10px 30px -16px rgba(11,17,32,0.16)",
        "card-hover":
          "0 1px 2px rgba(11,17,32,0.05), 0 26px 48px -20px rgba(11,17,32,0.28)",
        lime: "0 14px 34px -14px rgba(122,181,0,0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "chat-pop": {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.3)", opacity: "0" },
          "100%": { transform: "scale(1.3)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "chat-pop": "chat-pop 0.25s ease-out both",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.2,1) infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
