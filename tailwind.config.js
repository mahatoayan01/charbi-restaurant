/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF7F4',
          100: '#FBECE6',
          200: '#F7D6C9',
          300: '#EEB19B',
          400: '#DE7F61',
          500: '#C84B31', // Signature Charbi Terracotta / Masala Red
          600: '#B53B23',
          700: '#972E1A',
          800: '#7B2719',
          900: '#642419',
          950: '#360F0A',
        },
        saffron: {
          50: '#FFF9EB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009', // Warm Saffron Gold
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E',
        },
        cream: {
          50: '#FAF8F5',
          100: '#F5EFEB',
          200: '#EBE2D9',
          300: '#DDD0C3',
          400: '#C5B2A1',
          500: '#A9927D',
        },
        dark: {
          800: '#2A2421',
          900: '#1D1816',
          950: '#130F0E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(200, 75, 49, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 32px -4px rgba(29, 24, 22, 0.12), 0 4px 12px -2px rgba(29, 24, 22, 0.06)',
      }
    },
  },
  plugins: [],
};

