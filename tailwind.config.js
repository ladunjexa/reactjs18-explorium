/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
        'monofett': ['Monofett', 'cursive']
      }
    },
  },
  plugins: [],
}
