module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        fontFamily: {
        'aeonik-regular': ['"Aeonik Regular"', 'sans-serif'],
        'aeonik-medium': ['"Aeonik Medium"', 'sans-serif'],
      },
    },
    },
    plugins: [require('tailwindcss-animate')],
  };