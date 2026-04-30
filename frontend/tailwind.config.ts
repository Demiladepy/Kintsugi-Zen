import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./stores/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        "accent-violet": "hsl(var(--accent-violet))",
        "accent-amber": "hsl(var(--accent-amber))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        destructive: "hsl(var(--destructive))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        reading: ["var(--font-reading)"],
        dyslexic: ["var(--font-dyslexic)"],
      },
      fontSize: {
        display: ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.05", fontWeight: "600", letterSpacing: "-0.03em" }],
        h1: ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", fontWeight: "600", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.01em" }],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.6" }],
        reading: ["1.125rem", { lineHeight: "1.75" }],
        mono: ["0.875rem", { lineHeight: "1.5" }],
      },
      keyframes: {
        "pulse-success": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.05)" },
        },
      },
      animation: {
        "pulse-success": "pulse-success 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [animate, typography],
};

export default config;
