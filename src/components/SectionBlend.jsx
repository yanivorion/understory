/**
 * A decorative solid-to-transparent gradient strip placed at the top of a
 * section to visually melt the previous section's color into this one,
 * instead of a hard-edged boundary between two flat backgrounds.
 */
export default function SectionBlend({ from, height = "34vh", position = "top" }) {
  const direction = position === "top" ? "to bottom" : "to top";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-0 ${position === "top" ? "top-0" : "bottom-0"}`}
      style={{
        height,
        background: `linear-gradient(${direction}, ${from} 0%, transparent 100%)`,
      }}
    />
  );
}
