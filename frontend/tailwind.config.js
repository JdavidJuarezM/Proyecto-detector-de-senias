/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Aquí añadimos las animaciones y keyframes personalizados
      keyframes: {
        aurora: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        scan: {
          "0%": { top: "-10%" },
          "100%": { top: "110%" },
        },
        "pulse-dot": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(var(--pulse-color), 0.7)",
          },
          "50%": {
            boxShadow: "0 0 0 6px rgba(var(--pulse-color), 0)",
          },
        },
      },
      animation: {
        aurora: "aurora 25s infinite linear",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        scan: "scan 3s infinite cubic-bezier(0.1, 0.82, 0.25, 1)",
        "pulse-dot": "pulse-dot 1.5s infinite ease-in-out",
      },
      backgroundImage: {
        "grid-pattern": `
          linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
          linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
        `,
      },
    },
  },
  plugins: [],
};
