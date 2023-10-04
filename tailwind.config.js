
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "yt-black": "#0f0f0f",
      "yt-red": "#ff0300",
      "yt-white": "#f1f1f1",
      "yt-light-black": "#272727",
      "yt-light": "#181818",
      "yt-light-1": "#212121",
      "yt-gray": "gray"
    },
    extend: {
      gridTemplateColumns: {
        yt: "repeat(auto-fit, minmax(250px, 1fr))",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ],
}