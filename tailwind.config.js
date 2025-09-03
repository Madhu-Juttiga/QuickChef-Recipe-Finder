/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables toggling dark mode via a CSS class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glassy: {
          light: 'rgba(255, 255, 255, 0.2)',
          dark: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
  plugins: [],
}
