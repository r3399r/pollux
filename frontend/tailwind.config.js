/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      navy: {
        100: '#7e99be',
        300: '#567196',
        500: '#385378',
        700: '#223a5a',
        900: '#13284b',
      },
      green: {
        300: '#d9e7c4',
      },
      tan: {
        300: '#dfd5d1',
      },
      beige: {
        300: '#f1e0bf',
      },
      grey: {
        100: '#f7f9f9',
        200: '#f2f4f4',
        300: '#e3e5e5',
        500: '#cfd1d1',
      },
      teal: {
        300: '#b1dedc',
        400: '#81cbc8',
        500: '#4aa6b5',
      },
      tomato: {
        500: '#d96459',
      },
    },
  },
  plugins: [],
};
