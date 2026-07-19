import { buildStripGradient, normalizeGradientStrip, stripOverlapVh } from "../lib/gradientStrip";

/**
 * Top/bottom gradient strips that extend into adjacent sections so seams dissolve
 * instead of hard-cutting at section boundaries.
 */
export default function SectionGradientStrips({ background, sectionId = "hero" }) {
  const top = background?.gradientTop;
  const bottom = background?.gradientBottom;

  if (!top?.enabled && !bottom?.enabled) return null;

  return (
    <>
      {top?.enabled && (
        <TopStrip strip={top} sectionId={sectionId} />
      )}
      {bottom?.enabled && (
        <BottomStrip strip={bottom} sectionId={sectionId} />
      )}
    </>
  );
}

function TopStrip({ strip, sectionId }) {
  const normalized = normalizeGradientStrip(strip);
  const overlap = stripOverlapVh(normalized);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 z-[25]"
      style={{
        top: overlap ? `-${overlap}vh` : 0,
        height: `${normalized.height ?? 22}vh`,
        background: buildStripGradient(normalized, "top", sectionId),
      }}
    />
  );
}

function BottomStrip({ strip, sectionId }) {
  const normalized = normalizeGradientStrip(strip);
  const overlap = stripOverlapVh(normalized);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 z-[25]"
      style={{
        bottom: overlap ? `-${overlap}vh` : 0,
        height: `${normalized.height ?? 22}vh`,
        background: buildStripGradient(normalized, "bottom", sectionId),
      }}
    />
  );
}
