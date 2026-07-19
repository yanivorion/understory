/** @type {import('tailwindcss').Config} */

// The CSS custom properties in src/index.css hold "R G B" channel triples
// (e.g. "20 16 9"), not hex strings — this is what lets Tailwind's opacity
// modifiers (bg-ink/85, text-paper/70, ...) keep working against a runtime-
// editable palette. rgb(var(--x) / <alpha-value>) is Tailwind's documented
// pattern for CSS-variable-backed colors with opacity support.
function withOpacity(variable) {
  return ({ opacityValue }) =>
    opacityValue === undefined ? `rgb(var(${variable}))` : `rgb(var(${variable}) / ${opacityValue})`
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Backed by CSS custom properties (defaults in src/index.css) so the
        // /studio dashboard can retune the palette at runtime without
        // touching this file.
        ink: withOpacity('--color-ink'),      // deep warm near-black
        bark: withOpacity('--color-bark'),     // deep forest green
        umber: withOpacity('--color-umber'),
        moss: withOpacity('--color-moss'),     // muted forest green
        sage: withOpacity('--color-sage'),
        clay: withOpacity('--color-clay'),     // warm peach accent
        amber: withOpacity('--color-amber'),    // golden-hour gold
        paper: withOpacity('--color-paper'),    // warm cream
        parch: withOpacity('--color-parch'),    // deeper parchment
        fog: withOpacity('--color-fog'),
        mist: withOpacity('--color-mist'),
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
