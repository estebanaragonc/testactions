/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: '320px',
    },
    extend: {
      colors: {
        'victory-red': '#ba172b',
      },
    },
  },
  plugins: [],
};
