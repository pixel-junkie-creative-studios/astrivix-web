/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": { opacity: 0, transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: 1, transform: "translate(-50%,-40%) scale(1)" },
        },
      },
      boxShadow: {
        'liquid-glass': '0 30px 60px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.4), inset 0 -4px 10px rgba(0,0,0,0.9), inset 1px 0 2px rgba(255,255,255,0.1), inset -1px 0 2px rgba(0,0,0,0.5)',
        'skeuo-raised': '0 20px 40px var(--shadow-dark), inset 0 2px 4px var(--shadow-light), inset 0 -4px 6px rgba(0,0,0,0.8)',
        'skeuo-pressed': 'inset 10px 10px 20px var(--shadow-dark), inset -5px -5px 20px var(--shadow-light), 0 1px 1px rgba(255,255,255,0.1)',
      },
      colors: {
        'ax-bg': 'var(--color-bg)',
        'ax-accent': 'var(--color-accent)',
        'ax-text': 'var(--color-text)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Or whichever loud font the user prefers
      }
    },
  },
  plugins: [],
}
