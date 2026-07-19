// Two-row, hairline-divided meta panel used beneath every journey card.
// Row 1: location + duration.  Row 2: sound layer.
export default function MetaPanel({ location, duration, sound, tone = 'light' }) {
  const label = tone === 'light' ? 'text-mist' : 'text-bark/55'
  const value = tone === 'light' ? 'text-paper/85' : 'text-bark/90'
  const rule = tone === 'light' ? 'bg-paper/15' : 'bg-bark/15'

  return (
    <div className="meta">
      <div className="flex items-baseline justify-between gap-4 py-3">
        <span className={label}>{location}</span>
        <span className={value}>{duration}</span>
      </div>
      <div className={`h-px w-full ${rule}`} />
      <div className="flex items-baseline justify-between gap-4 py-3">
        <span className={label}>Sound</span>
        <span className={`${value} text-right`}>{sound}</span>
      </div>
    </div>
  )
}
