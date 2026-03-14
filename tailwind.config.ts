import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          ink: "#10233d",
          ocean: "#0f766e",
          sky: "#0ea5e9",
          sand: "#fff8eb",
          rose: "#f97316",
        },
      },
      boxShadow: {
        panel: "0 24px 80px -48px rgba(15, 23, 42, 0.35)",
      },
      borderRadius: {
        panel: "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
