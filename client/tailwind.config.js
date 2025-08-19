/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        cabin: ['cabin', 'sans-serif']
      },
    },
  },
  plugins: [],
}