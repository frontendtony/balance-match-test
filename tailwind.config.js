/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#005B96',
      },
      textColor: {
        dark: '#011F4B',
        light: '#7E8299',
      },
    },
  },
  plugins: [],
};
