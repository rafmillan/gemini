/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'dt': '640px',
      'lg': '950px',
    },
    extend: {},
  },
  plugins: [],
};
