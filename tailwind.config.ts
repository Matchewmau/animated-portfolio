import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        paper: "#FAFAF9",
        accent: "#6C5CE7",
        muted: "#71717A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "Inter", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
