/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cocoa: '#624621',
        caramel: '#9F6D2D',
        cream: '#F8DAB2',
        linen: '#EEEBE4',
        mist: '#D2D2D2',
        danger: '#B3402E',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(98, 70, 33, 0.14)',
      },
    },
  },
  plugins: [],
}
