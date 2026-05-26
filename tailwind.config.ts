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
        accent: {
          DEFAULT: "rgb(var(--primary-rgb) / <alpha-value>)",
          cyan: "rgb(var(--secondary-rgb) / <alpha-value>)",
          dim: "rgb(var(--primary-rgb) / <alpha-value>)",
          muted: "rgb(var(--primary-rgb) / 0.14)",
        },
        navy: {
          DEFAULT: "rgb(var(--bg-rgb) / <alpha-value>)",
          2: "rgb(var(--bg-rgb) / <alpha-value>)",
          3: "rgb(var(--surface-rgb) / <alpha-value>)",
        },
        card: "rgb(var(--surface-rgb) / <alpha-value>)",
        txt: "rgb(var(--text-soft-rgb) / <alpha-value>)",
        dim: "rgb(var(--text-soft-rgb) / <alpha-value>)",
        bright: "rgb(var(--text-rgb) / <alpha-value>)",
        border: {
          DEFAULT: "rgb(var(--border-rgb) / <alpha-value>)",
          strong: "rgb(var(--primary-rgb) / 0.4)",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 65%, var(--secondary)) 50%, var(--secondary) 100%)",
        "gradient-text": "linear-gradient(90deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 50%, var(--secondary)) 50%, var(--secondary) 100%)",
        "gradient-line": "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
        "hero-glow": "radial-gradient(circle, color-mix(in srgb, var(--primary) 26%, transparent) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 80px var(--shadow)",
        "glow-sm": "0 0 40px var(--shadow)",
        card: "0 4px 24px var(--shadow)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
