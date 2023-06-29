/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      white: '#fff',
      beige: {
        100: '#F6F4EC',
        200: '#EFE9DF',
        500: '#D9CEBD',
      },
      navy: {
        300: '#4D6279',
        500: '#334457',
        700: '#223244',
        900: '#101D2B',
      },
      olive: {
        500: '#779382',
        700: '#5e7e6b',
      },
      brickred: {
        500: '#9E5349',
      },
      haze: {
        100: '#D7E4f8',
        500: '#5085D4',
      },
    },
    screens: {
      sm: '640px',
      md: '1024px',
      lg: '1400px',
    },
  },
  plugins: [],
};
