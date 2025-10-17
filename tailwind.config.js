/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7fce8',
          100: '#eef9d1',
          200: '#ddf3a3',
          300: '#cded75',
          400: '#c1d748',
          500: '#a8bf3a',
          600: '#8fa72c',
          700: '#6b7d21',
          800: '#475316',
          900: '#242a0b',
        },
        secondary: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1a1a1a',
          900: '#0a0a0a',
        }
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.nav-glass': {
          backgroundColor: 'rgb(0 0 0 / 0.2)',
          backdropFilter: 'blur(16px)',
          borderBottomWidth: '1px',
          borderBottomColor: 'rgb(255 255 255 / 0.1)',
        },
        '.footer-glass': {
          backgroundColor: 'rgb(0 0 0 / 0.3)',
          backdropFilter: 'blur(12px)',
          borderTopWidth: '1px',
          borderTopColor: 'rgb(255 255 255 / 0.1)',
        },
      })
    }
  ],
}