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
          DEFAULT: "#A855F7",
          cyan: "#22D3EE",
          dim: "#7C3AED",
          muted: "rgba(168,85,247,0.12)",
        },
        navy: {
          DEFAULT: "#0A0A0F",
          2: "#0F0F14",
          3: "#14141C",
        },
        card: "#12121A",
        txt: "#A1A1AA",
        dim: "#71717A",
        bright: "#FAFAFA",
        border: {
          DEFAULT: "rgba(255,255,255,0.06)",
          strong: "rgba(168,85,247,0.35)",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #A855F7 0%, #6366F1 50%, #22D3EE 100%)",
        "gradient-text": "linear-gradient(90deg, #C084FC 0%, #818CF8 50%, #22D3EE 100%)",
        "gradient-line": "linear-gradient(90deg, #A855F7 0%, #22D3EE 100%)",
        "hero-glow": "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 80px rgba(168,85,247,0.35)",
        "glow-sm": "0 0 40px rgba(168,85,247,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
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
