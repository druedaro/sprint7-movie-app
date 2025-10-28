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
    function({ addComponents, theme }) {
      addComponents({
        '.card-glass': {
          backgroundColor: 'rgb(30 41 59 / 0.5)',
          backdropFilter: 'blur(12px)',
          borderWidth: '1px',
          borderColor: 'rgb(255 255 255 / 0.1)',
          borderRadius: theme('borderRadius.lg'),
        },
        '.card-glass-hover': {
          transitionProperty: 'all',
          transitionDuration: '300ms',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 25px 50px -12px rgb(193 215 72 / 0.3)',
            borderColor: 'rgb(193 215 72 / 0.5)',
          }
        },

        '.bg-gradient-app': {
          backgroundImage: 'linear-gradient(to bottom right, rgb(36 42 11), rgb(107 125 33), rgb(36 42 11))',
        },

        '.text-gradient-lime-white': {
          backgroundImage: 'linear-gradient(to right, rgb(193 215 72), rgb(255 255 255), rgb(193 215 72))',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        },

        '.btn-primary': {
          backgroundImage: 'linear-gradient(to right, rgb(193 215 72), rgb(168 191 58))',
          color: 'rgb(255 255 255)',
          fontWeight: theme('fontWeight.bold'),
          paddingLeft: theme('spacing.6'),
          paddingRight: theme('spacing.6'),
          paddingTop: theme('spacing.3'),
          paddingBottom: theme('spacing.3'),
          borderRadius: theme('borderRadius.lg'),
          border: 'none',
          transitionProperty: 'all',
          transitionDuration: '300ms',
          '&:hover': {
            backgroundImage: 'linear-gradient(to right, rgb(205 237 117), rgb(193 215 72))',
            boxShadow: '0 10px 15px -3px rgb(193 215 72 / 0.5)',
            transform: 'scale(1.05)',
          }
        },
        '.btn-outline': {
          color: 'white',
          fontWeight: theme('fontWeight.medium'),
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          paddingTop: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
          borderRadius: theme('borderRadius.lg'),
          borderWidth: '1px',
          borderColor: 'rgb(255 255 255 / 0.3)',
          transitionProperty: 'all',
          transitionDuration: '300ms',
          '&:hover': {
            backgroundColor: 'rgb(255 255 255 / 0.1)',
            borderColor: 'rgb(255 255 255 / 0.5)',
          }
        },

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

        // Loading Spinner
        '.spinner-lime': {
          borderTopColor: 'rgb(193 215 72)',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        },
      })
    }
  ],
}

