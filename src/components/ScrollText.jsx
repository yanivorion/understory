import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// A single character whose opacity is driven by scroll progress:
// starts as translucent white, fills to solid white.
function Char({ char, range, progress }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }}>{char}</motion.span>
}

// Scroll-triggered "writing" — each character fills from translucent to solid
// white, one after another. Can be driven by an external progress MotionValue
// (e.g. a pinned section's scroll progress); otherwise tracks its own scroll.
export default function ScrollText({
  text,
  className = '',
  style,
  lead = '',
  leadStyle,
  progress: external,
  start = 0,
  end = 0.9,
}) {
  const ref = useRef(null)
  const internal = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.32'],
  }).scrollYProgress
  const progress = external || internal

  const revealChars = text.replace(/\s/g, '').length
  const span = end - start || 1
  let cursor = 0

  return (
    <p ref={ref} className={className} style={style}>
      {lead && <span style={leadStyle}>{lead} </span>}
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((ch, ci) => {
              const cs = start + span * (cursor / revealChars)
              const ce = start + span * Math.min(1, (cursor + 8) / revealChars)
              cursor += 1
              return <Char key={ci} char={ch} range={[cs, ce]} progress={progress} />
            })}
          </span>
          {wi < arr.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}
