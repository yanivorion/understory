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
- Home sections are visually merged rather than hard-cut: `src/components/SectionBlend.jsx`
  paints a solid-to-transparent gradient at the top of a section, colored to match
  whatever preceded it, so dark/light transitions read as one continuous scroll instead
  of stacked blocks.

## Hero: Scroll-Scrubbed Frame Sequence

The homepage hero (`src/components/Hero.jsx`) is a canvas-based scroll-scrubber, not a
video or a single static image. As the user scrolls through a pinned ~420vh section, the
scroll position is mapped to one of 289 WebP frames (a single continuous ~12s camera
move, sampled at its native 24fps) and drawn onto a `<canvas>` with cover-fit cropping.

- Frames live in `public/frames/ascent/frame_0001.webp` … `frame_0289.webp` (1280×720,
  ~9.5MB total — downsized/recompressed from an original 1920×1080 JPEG sequence).
- `public/frames/ascent/manifest.json` documents the source clip and extraction settings.
- The first ~28 frames load eagerly; the rest stream in with limited concurrency in the
  background. Scrubbing always draws the nearest already-loaded frame, so scrolling
  ahead of the network never shows a blank canvas.
- The old static-image parallax hero treatment was **not deleted** — it now lives as the
  background of the "Philosophy" section (`src/components/Philosophy.jsx`).

To swap in a different clip: re-extract frames with ffmpeg, convert to WebP (`cwebp`),
drop them in `public/frames/<name>/` following the `frame_%04d.webp` naming, and update
`FRAME_COUNT` / `FRAME_PATH` at the top of `Hero.jsx`.
