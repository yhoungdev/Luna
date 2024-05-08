import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
    padding: {
      DEFAULT: '1rem',
      sm: '2rem',
      lg: '3rem',
      xl: '4rem',
      '2xl': '1rem',
    },
    },
      colors: {
        accent: '#4f47e4',
        brands: {    
          accent:'#4f47e4',                                                                             
          secondary: '#212529                                                             '
        }
      }
    },
  },
  plugins: [daisyui],
}