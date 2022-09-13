/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./{src,public}/**/*.{html,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('dr-children', '& > *');
    },
  ],
};
