export default function MetaPanel({ location, duration, sound, tone = "light" }) {
  const isDark = tone === "dark";
  const lineClass = isDark ? "border-line-dark-soft" : "border-line-soft";
  const labelClass = isDark ? "text-paper/40" : "text-ink-faint";
  const valueClass = isDark ? "text-paper/85" : "text-ink-soft";

  return (
    <div className={`border-t ${lineClass}`}>
      <div className={`flex items-baseline justify-between gap-4 py-3 border-b ${lineClass}`}>
        <span className={`meta-row ${labelClass}`}>{location}</span>
        <span className={`meta-row ${valueClass} whitespace-nowrap`}>{duration}</span>
      </div>
      <div className="flex items-baseline justify-between gap-4 py-3">
        <span className={`meta-row ${labelClass}`}>Sound Layer</span>
        <span className={`meta-row ${valueClass} text-right`}>{sound}</span>
      </div>
    </div>
  );
}
