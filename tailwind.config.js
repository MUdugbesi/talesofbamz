/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins:['Poppins', 'sans-serif'],
        rubik:['Rubik', 'system-ui'],
        sacramento: ['Sacramento', 'cursive'],
        cookie: ['Cookie', 'cursive'],
        
      },
      colors: {
        primary: '#ff7782',
        secondary: '#adebb3'
      }
    },
  },
  plugins: [],
}

