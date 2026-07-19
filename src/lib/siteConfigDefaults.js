import { journeys as baseJourneys } from "../data/journeys";

// Mirrors the --color-* custom properties defined in src/index.css /
// tailwind.config.js. Keys here (camelCase where needed) map 1:1 to the
// Tailwind color names used across the site.
export const THEME_KEYS = [
  "ink",
  "bark",
  "umber",
  "moss",
  "sage",
  "clay",
  "amber",
  "paper",
  "parch",
  "fog",
  "mist",
];

export const defaultTheme = {
  ink: "#141009",
  bark: "#041f0a",
  umber: "#3a2f21",
  moss: "#5c6650",
  sage: "#8a9179",
  clay: "#ffe1c7",
  amber: "#c99a5b",
  paper: "#ece3d3",
  parch: "#e3d8c4",
  fog: "#cabfab",
  mist: "#a89e8b",
};

export const defaultHero = {
  eyebrow: "Nature & Sound Journeys",
  title: "Return to What Remembers You",
  tagline: "Guided journeys where nature and sound meet the self.",
  scrollHint: "Scroll to walk in",
};

export const defaultPhilosophy = {
  eyebrow: "Philosophy",
  lead: "Nature doesn\u2019t perform for us. It waits.",
  text: "My work is to slow a person down until they can meet it \u2014 and themselves \u2014 without armor. Sound opens what silence alone cannot reach; the forest holds what the mind has been avoiding. You are not here to be fixed, and not here to escape. You are here, on real ground, in real time, to arrive.",
};

export const defaultRecognition = {
  eyebrow: "Recognition",
  items: ["Stillpoint Journal", "Wildmind Quarterly", "The Somatic Review"],
  award: "Recipient of the Nordic Wellbeing Innovation Award.",
};

export const defaultArrival = {
  eyebrow: "Arrival",
  line1: "This is not escape. It is arrival.",
  line2: "The forest holds what the mind has been avoiding.",
};

export const defaultContact = {
  eyebrow: "Begin Your Journey",
  heading: "Whether you\u2019re seeking clarity, release, or simply space to breathe",
  blurb: "Tell us a little about what you\u2019re carrying. We\u2019ll help you find the path that fits.",
  email: "info@mysite.com",
  phone: "123-456-7890",
  addressLine1: "500 Terry Francine St",
  addressLine2: "San Francisco, CA 94158",
};

export const defaultFooter = {
  tagline: "Guided journeys where nature and sound meet the self. Not an escape \u2014 an arrival.",
  bottomNote: "Return to what remembers you",
};

// Per-section background config, editable from the editor panel's
// Backgrounds tab. Each value: { type: 'color'|'image'|'scrub', color?,
// image?, overlay?, sequenceId?, scrubVh?, posterImage? }. sequenceId refers
// to an entry in src/lib/frameSequences.js. An empty color ("") means "let
// the section's own default Tailwind class supply the color" — this keeps
// sections theme-reactive until someone picks an explicit override.
export const BACKGROUND_SECTIONS = ["hero", "philosophy", "arrival", "recognition", "contact"];

// Every section supports all three background modes.
export const BACKGROUND_TYPES = ["color", "image", "scrub"];
export const BACKGROUND_TYPE_SUPPORT = {
  hero: BACKGROUND_TYPES,
  philosophy: BACKGROUND_TYPES,
  arrival: BACKGROUND_TYPES,
  recognition: BACKGROUND_TYPES,
  contact: BACKGROUND_TYPES,
};

export const defaultBackgrounds = {
  hero: { type: "scrub", sequenceId: "hike", scrubVh: 320, overlay: 0, posterImage: "/images/home-hero.jpg" },
  philosophy: { type: "color", color: "" },
  arrival: { type: "image", image: "/images/home-hero.jpg", overlay: 0 },
  recognition: { type: "color", color: "" },
  contact: { type: "color", color: "" },
};

export const defaultJourneyOverrides = baseJourneys.map((j) => ({
  slug: j.slug,
  title: j.title,
  tagline: j.tagline,
  duration: j.duration,
  location: j.location,
  sound: j.sound,
  intro: j.intro,
}));

export const defaultSiteConfig = {
  theme: defaultTheme,
  hero: defaultHero,
  philosophy: defaultPhilosophy,
  recognition: defaultRecognition,
  arrival: defaultArrival,
  contact: defaultContact,
  footer: defaultFooter,
  journeys: defaultJourneyOverrides,
  backgrounds: defaultBackgrounds,
};

export function mergeJourneyOverrides(base, overrides) {
  if (!overrides || !overrides.length) return base;
  const bySlug = new Map(overrides.map((o) => [o.slug, o]));
  return base.map((j) => ({ ...j, ...(bySlug.get(j.slug) || {}) }));
}

function mergeBackgrounds(base, incoming) {
  if (!incoming) return base;
  const merged = { ...base };
  BACKGROUND_SECTIONS.forEach((key) => {
    if (incoming[key]) merged[key] = { ...base[key], ...incoming[key] };
  });
  return merged;
}

export function mergeConfig(base, incoming) {
  if (!incoming) return base;
  return {
    theme: { ...base.theme, ...(incoming.theme || {}) },
    hero: { ...base.hero, ...(incoming.hero || {}) },
    philosophy: { ...base.philosophy, ...(incoming.philosophy || {}) },
    recognition: {
      ...base.recognition,
      ...(incoming.recognition || {}),
      items:
        incoming.recognition?.items && incoming.recognition.items.length
          ? incoming.recognition.items
          : base.recognition.items,
    },
    arrival: { ...base.arrival, ...(incoming.arrival || {}) },
    contact: { ...base.contact, ...(incoming.contact || {}) },
    footer: { ...base.footer, ...(incoming.footer || {}) },
    journeys: mergeJourneyOverrides(base.journeys, incoming.journeys),
    backgrounds: mergeBackgrounds(base.backgrounds, incoming.backgrounds),
  };
}

// Full journey objects (images, arc, support images) merged with the
// editable text-field overrides from config, matched by slug.
export function mergeFullJourneys(configJourneys) {
  return mergeJourneyOverrides(baseJourneys, configJourneys);
}
