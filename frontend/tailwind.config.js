/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0b1a33',
          navyLight: '#1a3355',
          blue: '#2563eb',
          blueHover: '#1d4ed8',
          green: '#0f9d58',
          greenLight: '#e6f7ec',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};