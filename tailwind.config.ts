import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta: negro cálido + dorado champagne
        ink: {
          DEFAULT: "#0a0908",
          900: "#0a0908",
          800: "#11100e",
          700: "#181613",
          600: "#221f1b",
          500: "#2e2a25",
        },
        gold: {
          DEFAULT: "#c9a96e",
          50: "#faf6ee",
          100: "#f1e7d3",
          200: "#e6d3ad",
          300: "#d9bd87",
          400: "#c9a96e",
          500: "#b8935a",
          600: "#9a7646",
          700: "#7a5c37",
        },
        sand: {
          DEFAULT: "#e9e3d9",
          muted: "#a39c90",
          dim: "#6f695f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
      },
      maxWidth: {
        site: "80rem",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
