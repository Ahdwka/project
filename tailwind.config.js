/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00ADB5',
        secondary: '#393E46',
        dark: {
          100: '#EEEEEE',
          200: '#929292',
          300: '#393E46',
          400: '#222831',
          500: '#1A1E23',
        }
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      }
    },
  },
  plugins: [],
};