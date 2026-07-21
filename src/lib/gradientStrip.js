import { NATIVE_BG_HEX } from "./homeSections";

function resolveHex(hex, sectionId, fallbackHex = "") {
  if (hex) return hex;
  if (fallbackHex) return fallbackHex;
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

function toRgba(hex, opacity, sectionId, fallbackHex = "") {
  const resolved = resolveHex(hex, sectionId, fallbackHex);
  const { r, g, b } = hexToRgb(resolved);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/** @deprecated use stripStopRgba */
export function stripEndpointRgba(strip, which, sectionId) {
  return stripStopRgba(strip, which === "start" ? "start" : "end", sectionId);
}

export function stripStopRgba(strip, stop, sectionId) {
  const edgeColor = strip.color;
  const innerColor = strip.colorEnd || strip.color;
  const edgeOpacity = strip.opacity ?? 1;
  const innerOpacity = strip.opacityEnd ?? 0;

  if (stop === "start") {
    return toRgba(edgeColor, edgeOpacity, sectionId);
  }
  if (stop === "end") {
    return toRgba(innerColor, innerOpacity, sectionId, edgeColor);
  }

  const midColor = strip.colorMid || innerColor || edgeColor;
  const midOpacity =
    strip.opacityMid != null && strip.opacityMid !== ""
      ? strip.opacityMid
      : (edgeOpacity + innerOpacity) / 2;
  return toRgba(midColor, midOpacity, sectionId, edgeColor);
}

/** CSS linear-gradient for a top or bottom strip (3 stops: 0%, 50%, 100%). */
export function buildStripGradient(strip, position, sectionId) {
  const direction = position === "top" ? "to bottom" : "to top";
  const start = stripStopRgba(strip, "start", sectionId);
  const mid = stripStopRgba(strip, "mid", sectionId);
  const end = stripStopRgba(strip, "end", sectionId);
  return `linear-gradient(${direction}, ${start} 0%, ${mid} 50%, ${end} 100%)`;
}

export const DEFAULT_GRADIENT_STRIP = {
  enabled: false,
  color: "",
  colorMid: "",
  colorEnd: "",
  opacity: 1,
  opacityMid: null,
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
