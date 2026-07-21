/** Scroll-reveal animation for the Philosophy statement (ScrollText). */
export const PHILOSOPHY_SCROLL_DEFAULTS = {
  revealStart: 0.04,
  revealEnd: 0.92,
  dimOpacity: 0.18,
  solidOpacity: 1,
  charSpread: 8,
  triggerStart: 0.85,
  triggerEnd: 0.32,
};

export function resolvePhilosophyScroll(config) {
  return { ...PHILOSOPHY_SCROLL_DEFAULTS, ...(config?.philosophyScroll || {}) };
}
