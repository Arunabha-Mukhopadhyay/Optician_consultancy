/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#2a5298',
          600: '#1e3f7a',
          700: '#1B3A6B',
          800: '#152d54',
          900: '#0f2040',
        },
        orange: {
          400: '#f5a54a',
          500: '#E87722',
          600: '#d4681a',
          700: '#b85715',
        },
        brand: {
          navy: '#1B3A6B',
          orange: '#E87722',
          lightgray: '#F8F9FA',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'count-up': 'countUp 2s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        pulseGlow: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(232,119,34,0.4)' }, '50%': { boxShadow: '0 0 20px 10px rgba(232,119,34,0)' } },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1B3A6B 0%, #2a5298 50%, #1a3560 100%)',
        'card-gradient': 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(27, 58, 107, 0.08)',
        'card-hover': '0 8px 40px rgba(27, 58, 107, 0.15)',
        'orange': '0 4px 20px rgba(232, 119, 34, 0.3)',
      }
    },
  },
  plugins: [],
}
