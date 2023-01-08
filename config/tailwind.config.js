/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['/views/*.{ejs}',],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
   // daisyUI config (optional)
   daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          
          "primary": "#38b2b5",
                   
          "secondary": "#f4a358",
                   
          "accent": "#2326a3",
                   
          "neutral": "#191820",
                   
          "base-100": "#F4F4F6",
                   
          "info": "#4FA1EE",
                   
          "success": "#15654A",
                   
          "warning": "#F9DC67",
                   
          "error": "#F41515",
                   },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
