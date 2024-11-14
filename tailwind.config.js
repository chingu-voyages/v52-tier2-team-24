/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'red-button': '#FFF1F1',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        geologica: ['Geologica', 'sans-serif'],        
      },
      fontSize:{
        xs: ['0.625rem', '0.75rem'],
        sm: ['0.75rem', '0.875rem'],
        md: ['0.875rem', '1rem'],
        lg: ['1rem','1.5rem'],
        xl: ['1.125rem','1.25rem']
      },
      fontWeight:{
        light:300,
        normal:400,
        medium:500,
        semibold:600,
        bold:700,
      }
    },
  },
  plugins: [],
};
