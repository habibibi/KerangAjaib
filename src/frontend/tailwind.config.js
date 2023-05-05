/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {

    extend: {
      colors: {
        'ungu4' : "#482675",
        'ungu3' : '#6b649f',
        'ungu2.5' : '#8e79c8',
        'ungu2' : '#A586E3',
        'ungu1' : '#d5d0ff',
        'ungu1.5' : '#b49dec', 
        'ungu0' : '#eae7ff'
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
}

