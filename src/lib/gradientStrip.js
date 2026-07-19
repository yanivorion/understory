import { NATIVE_BG_HEX } from "./homeSections";

function resolveHex(hex, sectionId) {
  if (hex) return hex;
  return NATIVE_BG_HEX[sectionId] || NATIVE_BG_HEX.hero;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (full.length !== 6) return { r: 20, g: 16, b: 9 };
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function stripEndpointRgba(strip, which, sectionId) {
  const isStart = which === "start";
  const hex = resolveHex(isStart ? strip.color : strip.colorEnd || strip.color, sectionId);
  const opacity = isStart ? (strip.opacity ?? 1) : (strip.opacityEnd ?? 0);
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/** CSS linear-gradient for a top or bottom strip. */
export function buildStripGradient(strip, position, sectionId) {
  const direction = position === "top" ? "to bottom" : "to top";
  const start = stripEndpointRgba(strip, "start", sectionId);
  const end = stripEndpointRgba(strip, "end", sectionId);
  return `linear-gradient(${direction}, ${start} 0%, ${end} 100%)`;
}

export const DEFAULT_GRADIENT_STRIP = {
  enabled: false,
  color: "",
  colorEnd: "",
  opacity: 1,
  opacityEnd: 0,
  height: 22,
  /** Percent of strip height that extends into the adjacent section (0–100). */
  overlap: 100,
};

export function normalizeGradientStrip(strip) {
  return { ...DEFAULT_GRADIENT_STRIP, ...strip };
}

/** vh offset the strip extends past the section edge into the neighbor. */
export function stripOverlapVh(strip) {
  const normalized = normalizeGradientStrip(strip);
  const height = normalized.height ?? 22;
  const overlap = normalized.overlap ?? 100;
  return height * (Math.max(0, Math.min(100, overlap)) / 100);
}
