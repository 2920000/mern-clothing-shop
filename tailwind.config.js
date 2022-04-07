const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "500px",
        mder: "750px",
        lg: "800px",
      },
      colors: {
        white: "#FFFFFF",
        light_white:'#f7f8fa',
        black: "#000000",
        light_grey: "#5D5C5C",
        grey: "#1A1A1A",
        light_black: "#5D5D5D",
        border_bottom_filter: "#f1f1f1",
        border_checkbox: "rgba(0,0,0,0.2)",
        skeleton_color: "#dbd8d8",
        bt_header:'#292929',
        border_size_color:'#e8e8e1',
        border_cart_color:' #eeeff0',
        red:'#C70000',
        money_line_through_color:'#808080',
        quick_view_color:'rgba(255, 255, 255, 0.75)',
        pagination_color:'rgba(93,92,92,0.2)',
        border_input:'#e0dede',
        border:'#f1f0ed'
      },
    },

    fontFamily: {
      lato: "Lato, sans-serif",
      montserrat:"'Montserrat', sans-serif",
      carter:" 'Carter One', cursive"
    },
    keyframes:{
       skeleton_loading:{
         '0%':{opacity:'0'},
         '100%':{opacity:'1'}
       },
       spinner:{
         '0%':{transform:'rotate(0)'},
         '100%':{transform:'rotate(360deg)'}
       }
    },
    animation:{
      'skeleton':'skeleton_loading 1s linear infinite alternate',
      'spinner':'spinner 800ms linear infinite'
    },

  },
  variants: {
    extend: {
      backgroundColor: ["label-checked"], // you need add new variant to a property you want to extend
    },
  },

  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant("label-checked", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const eClassName = e(`label-checked${separator}${className}`); // escape class
          const yourSelector = 'input[type="radio"]'; // your input selector. Could be any
          return `${yourSelector}:checked ~ .${eClassName}`; // ~ - CSS selector for siblings
        });
      });
    }),
  ],
};
