/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#141009',      // deep warm near-black
        bark: '#041f0a',     // deep forest green
        umber: '#3a2f21',
        moss: '#5c6650',     // muted forest green
        sage: '#8a9179',
        clay: '#ffe1c7',     // warm peach accent
        amber: '#c99a5b',    // golden-hour gold
        paper: '#ece3d3',    // warm cream
        parch: '#e3d8c4',    // deeper parchment
        fog: '#cabfab',
        mist: '#a89e8b',
      },
      fontFamily: {
        display: ['Merriweather', 'Georgia', 'serif'],
        sans: ['"Product Sans"', '"Google Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Product Sans"', '"Google Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        meta: '0.14em',
        wide2: '0.24em',
      },
      maxWidth: {
        container: '1360px',
      },
      transitionTimingFunction: {
        breath: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
