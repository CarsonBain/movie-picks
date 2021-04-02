module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
