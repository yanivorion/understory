import { journeys as baseJourneys, philosophyText, recognition } from "./content";

// Mirrors the --color-* custom properties defined in src/index.css. Keys here
// (camelCase) map to CSS var suffixes (kebab-case) in applyTheme().
export const THEME_KEYS = [
  "parchment",
  "parchmentDeep",
  "paper",
  "ink",
  "inkSoft",
  "inkFaint",
  "forest",
  "forestDeep",
  "moss",
  "clay",
  "claySoft",
];

export const defaultTheme = {
  parchment: "#f1ead9",
  parchmentDeep: "#e7dcc4",
  paper: "#f8f3e8",
  ink: "#241f18",
  inkSoft: "#4a4438",
  inkFaint: "#7a7264",
  forest: "#232c20",
  forestDeep: "#171e14",
  moss: "#5e6b4c",
  clay: "#a85a35",
  claySoft: "#c98a5c",
};

export const defaultHero = {
  eyebrow: "Understory \u00b7 Nature & Sound Journeys",
  titleLine1: "Return to What",
  titleLine2: "Remembers You",
  tagline: "Guided journeys where nature and sound meet the self",
};

export const defaultPhilosophy = {
  eyebrow: "Philosophy",
  text: philosophyText,
  backgroundImage: "/images/home-hero.jpg",
};

export const defaultRecognition = {
  press: [...recognition.press],
  award: recognition.award,
};

export const defaultJourneyOverrides = baseJourneys.map((j) => ({
  slug: j.slug,
  title: j.title,
  tagline: j.tagline,
  duration: j.duration,
  location: j.location,
  sound: j.sound,
  description: j.description,
}));

export const defaultSiteConfig = {
  theme: defaultTheme,
  hero: defaultHero,
  philosophy: defaultPhilosophy,
  recognition: defaultRecognition,
  journeys: defaultJourneyOverrides,
};

export function mergeJourneyOverrides(base, overrides) {
  if (!overrides || !overrides.length) return base;
  const bySlug = new Map(overrides.map((o) => [o.slug, o]));
  return base.map((j) => ({ ...j, ...(bySlug.get(j.slug) || {}) }));
}

export function mergeConfig(base, incoming) {
  if (!incoming) return base;
  return {
    theme: { ...base.theme, ...(incoming.theme || {}) },
    hero: { ...base.hero, ...(incoming.hero || {}) },
    philosophy: { ...base.philosophy, ...(incoming.philosophy || {}) },
    recognition: { ...base.recognition, ...(incoming.recognition || {}) },
    journeys: mergeJourneyOverrides(base.journeys, incoming.journeys),
  };
}

// Full journey objects (images, arc, support images) merged with the
// editable text-field overrides from config, matched by slug.
export function mergeFullJourneys(configJourneys) {
  return mergeJourneyOverrides(baseJourneys, configJourneys);
}
