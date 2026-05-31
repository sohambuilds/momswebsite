import type { Config } from "tailwindcss";

/**
 * Palette anchored to sample_design/Clay Corner.html — every value below mirrors
 * a CSS custom property on :root so utility classes (`bg-cream-50`, etc.) and the
 * raw vars (`var(--cream-50)`) stay in lockstep.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#f8f1e6",
          100: "#f0e6d3",
          200: "#e6d6ba",
          // a few extras kept for existing call-sites
          300: "#dcc8a0",
          400: "#cdb585",
          500: "#bea065",
        },
        clay: {
          50: "#f4ead9",
          100: "#e8d4bd",
          200: "#d4b896",
          300: "#b89570",
          400: "#9c7752",
          500: "#7d5c3c",
          600: "#5e4329",
          700: "#3d2c1a",
          800: "#2a1d10",
        },
        terracotta: {
          50: "#fdf0e8",
          100: "#f8d7c4",
          200: "#eea98a",
          300: "#d97757",
          400: "#c8694b",
          500: "#b85a3a",
          600: "#a14a2e",
          700: "#8a3e26",
          800: "#6c2f1c",
        },
        charcoal: {
          50: "#f4efe8",
          100: "#d6cdc0",
          200: "#a8997e",
          300: "#8a7a60",
          400: "#6b5a4a",
          500: "#6b5a4a",
          600: "#4d3d2f",
          700: "#3a2e24",
          800: "#241a12",
          900: "#1a130d",
        },
        sage: {
          50: "#eaf0e6",
          100: "#cfd6b8",
          200: "#aebd9c",
          300: "#94a382",
          400: "#7a8b6f",
          500: "#7a8b6f",
          600: "#5d6c54",
          700: "#465040",
          800: "#2f352b",
        },
        ink: "#221912",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
