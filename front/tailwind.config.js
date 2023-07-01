/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        latoRegular: 'Lato-Regular',
        latoBold: 'Lato-Bold',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
