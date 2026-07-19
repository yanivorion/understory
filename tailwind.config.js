/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Backed by CSS custom properties (defaults in src/index.css) so the
        // /studio dashboard can retune the palette at runtime without
        // touching this file. Tailwind's color-mix-based opacity modifiers
        // (e.g. bg-ink/85) work fine against var() values.
        ink: 'var(--color-ink)',      // deep warm near-black
        bark: 'var(--color-bark)',     // deep forest green
        umber: 'var(--color-umber)',
        moss: 'var(--color-moss)',     // muted forest green
        sage: 'var(--color-sage)',
        clay: 'var(--color-clay)',     // warm peach accent
        amber: 'var(--color-amber)',    // golden-hour gold
        paper: 'var(--color-paper)',    // warm cream
        parch: 'var(--color-parch)',    // deeper parchment
        fog: 'var(--color-fog)',
        mist: 'var(--color-mist)',
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
