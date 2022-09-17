/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./{src,public}/**/*.{html,tsx}'],
  theme: {
    extend: {
      animation: {
        'loading-dot': 'loading-dot 2.8s infinite',
        'loading-dots': 'loading-dots 2.8s infinite',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('dr-children', '& > *');
    },
  ],
};
