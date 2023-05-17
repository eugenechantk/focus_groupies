/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily:{
      'mono': ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'theme': {
          100: '#FFFFFF',
          95: '#F2F2F2',
          92: '#EBEBEB',
          90: '#E5E5E5',
          85: '#D9D9D9',
          25: '#404040',
          12: '#1F1F1F',
          5: '#1D1D1D',
        }
      }
    },
  },
  plugins: [],
};
