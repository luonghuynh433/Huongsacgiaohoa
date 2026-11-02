/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#F8F5EE',
          200: '#EFE9DC',
          300: '#E4DAC8',
          paper: '#F6F2E9',
        },
        teal: {
          DEFAULT: '#0F3E35',
          deep: '#0B2C26',
          dark: '#0F3E35',
          medium: '#155246',
          subtle: '#217060',
        },
        gold: {
          light: '#E2C889',
          DEFAULT: '#C5A059',
          dark: '#9E7A36',
          accent: '#D4AF37',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif"', '"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 4px 20px -2px rgba(15, 62, 53, 0.08)',
        card: '0 8px 30px -4px rgba(15, 62, 53, 0.12)',
      },
    },
  },
  plugins: [],
};

