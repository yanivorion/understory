import { getFontFamily } from "./fontCatalog";

export const TEXT_STYLE_DEFAULTS = {
  fontId: "",
  fontSize: null,
  fontSizeUnit: "px",
  fontWeight: null,
  fontStyle: "normal",
  lineHeight: null,
  letterSpacing: null,
  letterSpacingUnit: "em",
  color: "",
  textAlign: "",
  textTransform: "",
  textDecoration: "",
  opacity: null,
  maxWidth: null,
  maxWidthUnit: "ch",
};

/** Every editable text field on the site. */
export const TEXT_FIELD_REGISTRY = [
  { key: "hero.eyebrow", label: "Hero — Eyebrow", group: "Hero" },
  { key: "hero.title", label: "Hero — Title", group: "Hero" },
  { key: "hero.tagline", label: "Hero — Tagline", group: "Hero" },
  { key: "hero.scrollHint", label: "Hero — Scroll hint", group: "Hero" },
  { key: "philosophy.eyebrow", label: "Philosophy — Eyebrow", group: "Philosophy" },
  { key: "philosophy.lead", label: "Philosophy — Lead", group: "Philosophy" },
  { key: "philosophy.text", label: "Philosophy — Body", group: "Philosophy" },
  { key: "recognition.eyebrow", label: "Recognition — Eyebrow", group: "Recognition" },
  { key: "recognition.item", label: "Recognition — Press names", group: "Recognition" },
  { key: "recognition.award", label: "Recognition — Award", group: "Recognition" },
  { key: "arrival.eyebrow", label: "Arrival — Eyebrow", group: "Arrival" },
  { key: "arrival.line1", label: "Arrival — Headline", group: "Arrival" },
  { key: "arrival.line2", label: "Arrival — Subline", group: "Arrival" },
  { key: "journeys.heading", label: "Journeys — Section heading", group: "Journeys" },
  { key: "journeys.eyebrow", label: "Journeys — Eyebrow", group: "Journeys" },
  { key: "journeys.cardTitle", label: "Journeys — Card title", group: "Journeys" },
  { key: "contact.eyebrow", label: "Contact — Eyebrow", group: "Contact" },
  { key: "contact.heading", label: "Contact — Heading", group: "Contact" },
  { key: "contact.blurb", label: "Contact — Blurb", group: "Contact" },
  { key: "contact.details", label: "Contact — Email / phone", group: "Contact" },
  { key: "footer.tagline", label: "Footer — Tagline", group: "Footer" },
  { key: "footer.bottomNote", label: "Footer — Bottom note", group: "Footer" },
];

/** Baseline typography matching the shipped design (used when config has no override). */
export const DEFAULT_FIELD_STYLES = {
  "hero.eyebrow": { fontId: "product-sans", fontSize: 12, fontWeight: 500, letterSpacing: 0.06, letterSpacingUnit: "em", color: "#c99a5b", opacity: 0.9 },
  "hero.title": { fontId: "fraunces", fontSize: 6.5, fontSizeUnit: "rem", fontWeight: 800, lineHeight: 1.02, color: "#ece3d3" },
  "hero.tagline": { fontId: "product-sans", fontSize: 18, fontWeight: 300, lineHeight: 1.7, color: "#cabfab", opacity: 0.85 },
  "hero.scrollHint": { fontId: "product-sans", fontSize: 12, letterSpacing: 0.02, letterSpacingUnit: "em", color: "#cabfab", opacity: 0.6 },
  "philosophy.eyebrow": { fontId: "product-sans", fontSize: 12, fontWeight: 500, letterSpacing: 0.06, letterSpacingUnit: "em", color: "#ffe1c7" },
  "philosophy.lead": { fontId: "fraunces", fontSize: 3.6, fontSizeUnit: "rem", fontWeight: 300, lineHeight: 1.16, color: "#ffffff" },
  "philosophy.text": { fontId: "fraunces", fontSize: 3.6, fontSizeUnit: "rem", fontWeight: 300, lineHeight: 1.16, color: "#ffffff" },
  "recognition.eyebrow": { fontId: "product-sans", fontSize: 12, fontWeight: 500, letterSpacing: 0.06, letterSpacingUnit: "em", color: "#a89e8b" },
  "recognition.item": { fontId: "fraunces", fontSize: 24, fontWeight: 400, color: "#cabfab", opacity: 0.7 },
  "recognition.award": { fontId: "fraunces", fontSize: 18, fontWeight: 300, lineHeight: 1.7, color: "#cabfab", opacity: 0.6 },
  "arrival.eyebrow": { fontId: "product-sans", fontSize: 12, fontWeight: 500, letterSpacing: 0.06, letterSpacingUnit: "em", color: "#c99a5b", opacity: 0.9 },
  "arrival.line1": { fontId: "fraunces", fontSize: 60, fontWeight: 400, lineHeight: 1.04, color: "#ece3d3" },
  "arrival.line2": { fontId: "merriweather", fontSize: 18, fontWeight: 300, lineHeight: 1.7, color: "#cabfab", opacity: 0.85 },
  "journeys.eyebrow": { fontId: "product-sans", fontSize: 12, fontWeight: 500, letterSpacing: 0.06, letterSpacingUnit: "em", color: "#ffe1c7" },
  "journeys.heading": { fontId: "fraunces", fontSize: 60, fontWeight: 400, lineHeight: 1.04, color: "#ece3d3" },
  "journeys.cardTitle": { fontId: "fraunces", fontSize: 20, fontWeight: 400, color: "#ece3d3" },
  "contact.eyebrow": { fontId: "product-sans", fontSize: 12, fontWeight: 500, letterSpacing: 0.06, letterSpacingUnit: "em", color: "#041f0a" },
  "contact.heading": { fontId: "fraunces", fontSize: 60, fontWeight: 400, lineHeight: 1.04, color: "#041f0a" },
  "contact.blurb": { fontId: "merriweather", fontSize: 18, fontWeight: 300, lineHeight: 1.7, color: "#041f0a", opacity: 0.7 },
  "contact.details": { fontId: "product-sans", fontSize: 12, letterSpacing: 0.02, letterSpacingUnit: "em", color: "#041f0a", opacity: 0.6 },
  "footer.tagline": { fontId: "merriweather", fontSize: 16, fontWeight: 300, lineHeight: 1.7, color: "#cabfab", opacity: 0.7 },
  "footer.bottomNote": { fontId: "product-sans", fontSize: 12, letterSpacing: 0.02, letterSpacingUnit: "em", color: "#a89e8b" },
};

export function normalizeTextStyle(partial = {}) {
  return { ...TEXT_STYLE_DEFAULTS, ...partial };
}

export function resolveTextStyle(textStyles, key) {
  const base = DEFAULT_FIELD_STYLES[key] || {};
  const override = textStyles?.[key] || {};
  return normalizeTextStyle({ ...base, ...override });
}

export function textStyleToCss(style) {
  const s = normalizeTextStyle(style);
  const css = {};

  if (s.fontId) css.fontFamily = getFontFamily(s.fontId);
  if (s.fontSize != null && s.fontSize !== "") css.fontSize = `${s.fontSize}${s.fontSizeUnit || "px"}`;
  if (s.fontWeight != null && s.fontWeight !== "") css.fontWeight = s.fontWeight;
  if (s.fontStyle && s.fontStyle !== "normal") css.fontStyle = s.fontStyle;
  if (s.lineHeight != null && s.lineHeight !== "") css.lineHeight = s.lineHeight;
  if (s.letterSpacing != null && s.letterSpacing !== "") {
    css.letterSpacing = `${s.letterSpacing}${s.letterSpacingUnit || "em"}`;
  }
  if (s.color) css.color = s.color;
  if (s.textTransform) css.textTransform = s.textTransform;
  if (s.textDecoration) css.textDecoration = s.textDecoration;
  if (s.opacity != null && s.opacity !== "") css.opacity = s.opacity;

  if (s.maxWidth != null && s.maxWidth !== "") {
    css.maxWidth = `${s.maxWidth}${s.maxWidthUnit || "ch"}`;
    css.display = "block";
    css.whiteSpace = "normal";
    css.overflowWrap = "break-word";
  }

  if (s.textAlign) {
    css.textAlign = s.textAlign;
    if (!css.display) css.display = "block";
    if (s.maxWidth == null || s.maxWidth === "") css.maxWidth = css.maxWidth || "100%";

    if (s.textAlign === "center") {
      css.width = "fit-content";
      css.maxWidth = s.maxWidth != null && s.maxWidth !== "" ? css.maxWidth : "100%";
      css.marginLeft = "auto";
      css.marginRight = "auto";
      css.alignSelf = "center";
    } else if (s.textAlign === "right") {
      css.width = "fit-content";
      css.marginLeft = "auto";
      css.marginRight = "0";
      css.alignSelf = "flex-end";
    } else if (s.textAlign === "justify") {
      css.width = "100%";
      css.alignSelf = "stretch";
    } else if (s.textAlign === "left") {
      css.alignSelf = "flex-start";
    }
  }

  return css;
}

export function mergeTextStyles(base = {}, incoming) {
  if (!incoming) return base;
  const merged = { ...base };
  Object.entries(incoming).forEach(([key, val]) => {
    merged[key] = { ...(base[key] || {}), ...val };
  });
  return merged;
}

export function collectUsedFontIds(textStyles) {
  const ids = new Set(["product-sans", "fraunces"]);
  TEXT_FIELD_REGISTRY.forEach(({ key }) => {
    const resolved = resolveTextStyle(textStyles, key);
    if (resolved.fontId) ids.add(resolved.fontId);
  });
  Object.values(textStyles || {}).forEach((s) => {
    if (s?.fontId) ids.add(s.fontId);
  });
  return [...ids];
}
