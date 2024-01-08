module.exports = {
  content: [
    './src/components/**/*.{js,jsx}',
    './src/pages/**/*.{js,jsx}',
    './src/providers/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'piano-blue': '#78C9E7',
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
        eurostile: ['Eurostile', 'sans-serif'],
        'eurostyle-normal': ['EuroStyle Normal', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
