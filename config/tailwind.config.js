/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
      extend: {},
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
     // daisyUI config (optional)
     daisyui: {
      styled: true,
      themes: true,
      base: true,
      utils: true,
      logs: true,
      rtl: false,
      prefix: "",
      darkTheme: "dark",
    },
    daisyui: {
      themes: [
        {
          mytheme: {
          
 "primary": "#057AFF",
          
 "secondary": "#463AA1",
          
 "accent": "#C149AD",
          
 "neutral": "#021431",
          
 "base-100": "#FFFFFF",
          
 "info": "#93E6FB",
          
 "success": "#80CED1",
          
 "warning": "#EFD8BD",
          
 "error": "#E58B8B",
          },
        },
      ],
    },
  }
  