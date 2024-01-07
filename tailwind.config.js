module.exports = {
  content: [
    './src/components/**/*.{js,jsx}',
    './src/pages/**/*.{js,jsx}',
    './src/providers/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
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
