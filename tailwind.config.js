// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // THIS is important for React
  ],
  safelist: [
    'sm:grid-cols-1',
    'sm:grid-cols-2',
    'sm:grid-cols-3',
    'sm:grid-cols-4',
    'md:grid-cols-1',
    'md:grid-cols-2',
    'md:grid-cols-3',
    'md:grid-cols-4',
    'md:grid-cols-5',
    'lg:grid-cols-1',
    'lg:grid-cols-3',
    'lg:grid-cols-4',
    'lg:grid-cols-5',
    'xl:grid-cols-1',
    'xl:grid-cols-2',
    'xl:grid-cols-3',
    'xl:grid-cols-4',
    'xl:grid-cols-5',
  ],
  theme: {
    extend: {
      fontFamily: {
        bakery: ['"Epilogue"', 'sans-serif'],
        seasons: ['"Seasons"', 'sans-serif'],
        benedict: ['"Benedict"', 'sans-serif'],
      },
      colors: {
        'spanish-white': '#d4cda7',
        'pastryWhite': "#fbfaf6",
        'pastryYellow': "#ffeab6",
        'chocolate': "#422b24"
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-debug-screens'),
  ]
}
