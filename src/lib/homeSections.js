// Built-in home page sections and helpers for order / custom sections.

export const BUILTIN_SECTION_IDS = [
  "hero",
  "philosophy",
  "journeys",
  "arrival",
  "tryThis",
  "recognition",
  "contact",
];

export const DEFAULT_HOME_SECTION_ORDER = [...BUILTIN_SECTION_IDS];

export const SECTION_LABELS = {
  hero: "Hero",
  philosophy: "Philosophy",
  journeys: "Journeys",
  arrival: "Arrival",
  tryThis: "Try This",
  recognition: "Recognition",
  contact: "Contact",
  content: "Content band",
};

export const NATIVE_BG_HEX = {
  hero: "#141009",
  philosophy: "#041f0a",
  journeys: "#141009",
  arrival: "#141009",
  tryThis: "#141009",
  recognition: "#141009",
  contact: "#e3d8c4",
  content: "#141009",
};

export function isCustomSectionId(id) {
  return id.startsWith("custom-") || id.startsWith("playground-");
}

export function isPlaygroundSectionId(id, customSections = {}) {
  const section = customSections[id];
  return id.startsWith("playground-") || section?.type === "playground";
}

export function getSectionLabel(id, customSections = {}) {
  if (isCustomSectionId(id)) {
    const custom = customSections[id];
    if (custom?.type === "playground") return custom.label || custom.playgroundId || "Playground component";
    return custom?.heading || custom?.eyebrow || "Custom section";
  }
  return SECTION_LABELS[id] || id;
}

export function resolveSectionOrder(config) {
  const order = config?.homeSectionOrder;
  if (!Array.isArray(order) || !order.length) return [...DEFAULT_HOME_SECTION_ORDER];
  const valid = order.filter(
    (id) => BUILTIN_SECTION_IDS.includes(id) || isCustomSectionId(id)
  );
  const missing = BUILTIN_SECTION_IDS.filter((id) => !valid.includes(id));
  return [...valid, ...missing.filter((id) => !valid.includes(id))];
}

export function createCustomSection() {
  const id = `custom-${Date.now().toString(36)}`;
  return {
    id,
    type: "content",
    eyebrow: "New section",
    heading: "Your heading here",
    body: "Add your message. This band supports the same backgrounds and gradient strips as every other section.",
  };
}

export function defaultBackgroundForSection(sectionId) {
  return {
    type: "color",
    color: "",
    overlay: 0,
    gradientTop: { enabled: false, color: "", colorMid: "", colorEnd: "", opacity: 1, opacityMid: null, opacityEnd: 0, height: 22, overlap: 100 },
    gradientBottom: { enabled: false, color: "", colorMid: "", colorEnd: "", opacity: 1, opacityMid: null, opacityEnd: 0, height: 22, overlap: 100 },
  };
}

export function defaultBackgrounds() {
  const backgrounds = {};
  BUILTIN_SECTION_IDS.forEach((id) => {
    backgrounds[id] = {
      ...defaultBackgroundForSection(id),
      ...(id === "hero"
        ? { type: "scrub", sequenceId: "hike", scrubVh: 320, posterImage: "/images/home-hero.jpg" }
        : {}),
      ...(id === "arrival" ? { type: "image", image: "/images/home-hero.jpg" } : {}),
    };
  });
  return backgrounds;
}

export function reorderSections(order, fromIndex, toIndex) {
  const next = [...order];
  if (fromIndex < 0 || fromIndex >= next.length || toIndex < 0 || toIndex >= next.length) return next;
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

export function insertSection(order, afterIndex, sectionId) {
  const next = [...order];
  next.splice(afterIndex + 1, 0, sectionId);
  return next;
}

export function removeSection(order, sectionId) {
  return order.filter((id) => id !== sectionId);
}
