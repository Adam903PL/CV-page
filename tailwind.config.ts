import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Twoje istniejące kolory
      colors: {
        primary: '#00BD95',
        gradientStart: '#1A202C',
        gradientEnd: '#000000',
        buttonStart: '#00FFC9',
        buttonEnd: '#00BD95',
        neonGreen: '#00BD95',
        neonCyan: '#00FFC9',
      },
      // Moje dodane animacje
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;