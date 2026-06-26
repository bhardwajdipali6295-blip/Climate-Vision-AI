/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8eceff',
          400: '#59b2ff',
          500: '#3391ff',
          600: '#1b6ff5',
          700: '#145ae1',
          800: '#1749b6',
          900: '#193f8f',
          950: '#142857',
        },
        dark: {
          50: '#f6f6f9',
          100: '#ececf2',
          200: '#d5d5e2',
          300: '#b0b0c9',
          400: '#8585ab',
          500: '#666691',
          600: '#525278',
          700: '#434362',
          800: '#3a3a53',
          900: '#1a1a2e',
          950: '#0f0f1a',
        },
      },
    },
  },
  plugins: [],
}
