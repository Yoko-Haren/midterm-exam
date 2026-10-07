/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter Variable"',
          'Inter',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        ink: '#141414',
        paper: '#F6F5F2',
        cocoa: '#624621',
        caramel: '#9F6D2D',
        cream: '#F8DAB2',
        linen: '#EEEBE4',
        mist: '#D2D2D2',
        danger: '#B3402E',
      },
      boxShadow: {
        glass: '0 1px 2px rgba(20, 20, 20, 0.04), 0 8px 24px rgba(20, 20, 20, 0.06)',
      },
    },
  },
  plugins: [],
}
