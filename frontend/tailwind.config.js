/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#818cf8", // Lighter indigo for dark bg
        secondary: "#f472b6", // Lighter pink
        accent: "#a78bfa", // Lighter purple
        dark: {
          bg: "#0f172a", // Dark blue background
          card: "#1e293b", // Card background
          border: "#334155", // Border color
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.6s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(129, 140, 248, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(129, 140, 248, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
