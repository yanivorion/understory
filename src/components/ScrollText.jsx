import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Char({ char, range, progress, dimOpacity, solidOpacity }) {
  const opacity = useTransform(progress, range, [dimOpacity, solidOpacity])
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
  revealStart = 0.04,
  revealEnd = 0.92,
  dimOpacity = 0.18,
  solidOpacity = 1,
  charSpread = 8,
  triggerStart = 0.85,
  triggerEnd = 0.32,
}) {
  const ref = useRef(null)
  const internal = useScroll({
    target: ref,
    offset: [`start ${triggerStart}`, `start ${triggerEnd}`],
  }).scrollYProgress
  const progress = external || internal

  const revealChars = text.replace(/\s/g, '').length
  const span = revealEnd - revealStart || 1
  let cursor = 0

  return (
    <p ref={ref} className={className} style={style}>
      {lead && <span style={leadStyle}>{lead} </span>}
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((ch, ci) => {
              const cs = revealStart + span * (cursor / revealChars)
              const ce = revealStart + span * Math.min(1, (cursor + charSpread) / revealChars)
              cursor += 1
              return (
                <Char
                  key={ci}
                  char={ch}
                  range={[cs, ce]}
                  progress={progress}
                  dimOpacity={dimOpacity}
                  solidOpacity={solidOpacity}
                />
              )
            })}
          </span>
          {wi < arr.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}
