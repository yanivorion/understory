# Understory

An immersive booking site for a nature & sound therapy studio — guided journeys
that combine forest immersion with layered soundscapes.

Visual language: **Meditative-Immersive**. Warm oversized Fraunces (800) display
type with air and breath, paced by IBM Plex Mono meta rows (11px / 0.14em).

## Running locally

This project needs **Node 22+** (Vite 8). If your default `node` is older, use nvm:

```bash
export PATH="$HOME/.nvm/versions/node/v22.13.1/bin:$PATH"
npm install
npm run dev      # http://localhost:5178
npm run build    # production build -> dist/
```

## Structure

```
src/
  pages/        Home, Collection, Journey (:slug), About, Contact
  components/   Nav, Footer, Layout, Reveal, MetaPanel, JourneyCard, ContactForm
  data/         journeys.js  (single source of truth for the four journeys)
  lib/          bookings.js  (form-submission seam — see below)
public/images/  24 optimized photos, mapped to their brief slots
```

- **Home** — scroll-driven hero, four-journey widget, philosophy, recognition, contact band
- **Collection** — the signature asymmetric grid: a wide 3/2 lead + two stacked squares,
  full-width breathing gutters above/below, each card with a two-row hairline meta panel
- **Journey** — full-bleed hero, session meta band, intro, the Entry/Immersion/Emergence arc,
  two supporting images, and a "book this journey" panel
- **About** — story, approach, press, contact form
- **Contact** — form + details over a soft forest backdrop

## Home page motion

- **Hero — scroll-scrubbed frame sequence** (`src/components/FrameSequenceHero.jsx`).
  A canvas plays 180 frames of a forest walk (extracted from the hike footage) mapped to
  scroll progress across a 320vh section — scroll down and you walk the trail. The headline
  holds, then releases as the walk deepens. Frames live in `public/frames/hike/`
  (`frame_0001.jpg`…`frame_0180.jpg`, ~32 MB). **For production, host the frames on a CDN**
  (R2/S3/Vercel Blob) and point `framePath()` at it — 32 MB is heavy to serve from origin.
  Source: 360 frames were downsampled to every-other (180) at JPEG q58.
- **Character-by-character reveal** (`ScrollText.jsx`) — the Philosophy statement lights up
  one character at a time as it scrolls up (lead sentence stays lit).
- **Parallax "Arrival" band** (`ParallaxBand.jsx`) — the original golden-hour hero still,
  repurposed as a mid-page depth transition (background drifts slower than the text).
- **"Try this" arc** (`TryThis.jsx`) — a traced arc with circled bullets over a forest
  canopy; SVG on desktop, a stacked list on mobile.

## Deliberate substitutions from the brief

1. **Hero footage → frame sequence.** Rather than a `<video>`, the hero scrubs decoded JPG
   frames on a canvas, which gives precise scroll-linked control. To use real video instead,
   swap `FrameSequenceHero` for a `<video>` element.
2. **Wix Bookings → native Base44 booking form.** This is a Base44 build, so the "Book a
   Session" CTAs feed a native inquiry form. See below.

## Wiring to Base44 (when an app slot is free)

The account hit the free-tier limit (5 apps) at build time, so this is currently a
standalone frontend. To make it a real Base44 app:

```bash
export PATH="$HOME/.nvm/versions/node/v22.13.1/bin:$PATH"
# from inside this folder — backend-only adds base44 config without touching the frontend
npm install --save-dev base44
npx base44 create understory -p .        # registers the app (needs a free slot)
npx base44 entities push                 # pushes base44/entities/booking.jsonc (already drafted)
npm run build && npx base44 deploy -y    # build + deploy site + entities
```

Then flip the submission seam in `src/lib/bookings.js`:

```js
import { base44 } from '../api/base44Client'   // created by `base44 create`
export async function submitBooking(form) {
  return base44.entities.Booking.create({ ...form, status: 'new' })
}
```

The `Booking` entity schema is already drafted in `base44/entities/booking.jsonc`.
