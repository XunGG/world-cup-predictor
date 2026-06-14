/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          DEFAULT: '#0b6e3b',
          dark: '#064e2a',
          light: '#15803d',
        },
        gold: '#f4c430',
      },
      fontFamily: {
        display: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
