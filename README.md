# Understory

An immersive booking site for a nature and sound therapy studio. Built as a local React + Vite app — scroll-driven sensory sections, parallax hero imagery, and four guided "journey" pages.

## Stack

- **Vite + React 19** — build tooling and UI
- **React Router** — client-side routing (`/`, `/collection`, `/journeys/:slug`, `/about`, `/contact`)
- **Tailwind CSS v4** — utility styling, design tokens defined via `@theme` in `src/index.css`
- **Framer Motion** — scroll-linked parallax on hero imagery
- **Fontsource** — self-hosted `Fraunces` (display/body serif) and `IBM Plex Mono` (meta/label rows)

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/   Reusable UI: Nav, Footer, Hero, JourneyCard, ContactForm, etc.
  pages/        Route-level pages: Home, Collection, Journey, About, Contact
  lib/          Site content/copy (content.js) and the scroll-reveal hook
public/images/  Optimized JPEG imagery for hero, journey, and section content
```

## Content

All site copy — journey details, philosophy statement, press mentions, contact
details — lives in `src/lib/content.js`. Edit that file to update copy without
touching component code.

## Notes

- The contact form currently saves submissions to `localStorage` (`understory-inquiries`)
  and shows a confirmation state. There is no backend yet — wire the `handleSubmit`
  function in `src/components/ContactForm.jsx` to a real endpoint (e.g. Wix Bookings,
  Formspree, or a custom API) when ready to go live.
- Hero motion is simulated via Ken Burns-style parallax/scale on a static image
  rather than full-motion video footage.
