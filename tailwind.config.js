/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: {
          DEFAULT: '#0a0a0a',
          hover: '#111111',
        },
        border: {
          DEFAULT: '#1a1a1a',
          subtle: '#141414',
        },
        primary: '#3E8AEA', // Bright Blue
        'primary-hover': '#2d7ad9',
        secondary: '#8a8f98',
        accent: {
          mint: '#64AE87', // Mint/Teal Green
          orange: '#D48849', // Orange/Gold
          gray: '#3D4437', // Dark Gray-Green
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(92.88deg, #3E8AEA 9.16%, #64AE87 43.89%, #D48849 64.72%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
