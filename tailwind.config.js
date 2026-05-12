module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
        'pastryWhite': "#f5ede3",
        'pastryYellow': "#ffeab6",
        'chocolate': "#3b2218",
        'milkChocolate': "#6b4f47",
        'whiteChocolate': "#a08e88",
        'cream': "#faf6f1",
        'warmGold': "#c8a96e",
        'softRose': "#e8c4b8",
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'gentle-float': 'gentle-float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ]
}
