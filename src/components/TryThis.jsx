import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// Landscape 16:9 frame so the whole composition fits inside one 100vh screen.
const VB_W = 1440
const VB_H = 810
const Cx = 465.9
const Cy = 435
const R = 364.1

const prompts = [
  { deg: -50, lines: ['notice when you’re ignoring', 'how you really feel'] },
  { deg: -25, lines: ['stop filling every quiet', 'moment with distraction'] },
  { deg: 0, lines: ['soften your space', 'and your expectations'] },
  { deg: 25, lines: ['let yourself slow down', 'without guilt'] },
  { deg: 50, lines: ['take a deep breath and', 'come back to your body'] },
]

const pt = (deg) => {
  const r = (deg * Math.PI) / 180
  return { x: Cx + R * Math.cos(r), y: Cy + R * Math.sin(r) }
}

const start = pt(-58)
const end = pt(58)
const arcPath = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${R} ${R} 0 0 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`

function Bullet({ prompt, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1])
  const scale = useTransform(progress, range, [0.4, 1])
  const { x, y } = pt(prompt.deg)
  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx={x} cy={y} r="12" fill="#ece3d3" style={{ scale, transformOrigin: `${x}px ${y}px` }} />
      <text
        x={x + 38}
        y={y}
        fill="#ece3d3"
        style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif", fontWeight: 400 }}
        fontSize="29"
      >
        <tspan x={x + 38} dy="-7">
          {prompt.lines[0]}
        </tspan>
        <tspan x={x + 38} dy="38">
          {prompt.lines[1]}
        </tspan>
      </text>
    </motion.g>
  )
}

export default function TryThis() {
  const ref = useRef(null)
  // Pin progress computed manually from the section's position — deterministic
  // and independent of the page's scroll-container quirks.
  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) return
      const p = Math.min(1, Math.max(0, -rect.top / total))
      scrollYProgress.set(p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [scrollYProgress])

  const headingOpacity = useTransform(scrollYProgress, [0.02, 0.12], [0, 1])
  const arcLength = useTransform(scrollYProgress, [0.05, 0.28], [0, 1])
  const markOpacity = useTransform(scrollYProgress, [0.86, 0.96], [0, 1])

  // bullets reveal one after another across the pinned scroll
  const bulletRange = (i) => {
    const s = 0.22 + i * 0.13
    return [s, s + 0.1]
  }

  return (
    <section ref={ref} className="relative w-full bg-ink md:h-[320vh]">
      {/* Pinned 100vh stage */}
      <div className="sticky top-0 hidden h-screen w-full overflow-hidden md:block">
        <img
          src="/images/teaser-undersong.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-moss/20" />
        <div className="absolute inset-0 bg-ink/55" />

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {/* Arc */}
          <motion.path
            d={arcPath}
            fill="none"
            stroke="rgba(236,227,211,0.55)"
            strokeWidth="1.5"
            style={{ pathLength: arcLength }}
          />

          {/* Heading */}
          <motion.text
            style={{ opacity: headingOpacity }}
            x="120"
            y="360"
            fill="#ece3d3"
            fontFamily="Merriweather, Georgia, serif"
            fontWeight="300"
            fontSize="54"
          >
            <tspan x="120" dy="0">instead of pushing</tspan>
            <tspan x="120" dy="70">through everything…</tspan>
            <tspan x="120" dy="70">try this</tspan>
          </motion.text>

          {/* Bullets — revealed one by one on scroll */}
          {prompts.map((p, i) => (
            <Bullet key={i} prompt={p} progress={scrollYProgress} range={bulletRange(i)} />
          ))}

          {/* Labyrinth mark */}
          <motion.g style={{ opacity: markOpacity }} stroke="#ece3d3" strokeWidth="2" fill="none">
            <circle cx="1330" cy="705" r="10" />
            <circle cx="1330" cy="705" r="22" />
            <circle cx="1330" cy="705" r="34" />
            <path d="M1330 739 L1330 671" />
          </motion.g>
        </svg>

        {/* Scroll cue while pinned */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [0.9, 0.9, 0, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <span className="meta text-fog/60">Keep scrolling</span>
        </motion.div>
      </div>

      {/* Mobile: stacked list (no pin) */}
      <div className="relative w-full overflow-hidden md:hidden">
        <img
          src="/images/teaser-undersong.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative z-10 px-6 py-24">
          <h2 className="display text-4xl font-light leading-tight text-paper">
            instead of pushing through everything… try this
          </h2>
          <ul className="mt-12 space-y-8">
            {prompts.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.9 }}
                className="flex items-start gap-4"
              >
                <span className="mt-2 h-3 w-3 flex-none rounded-full bg-paper" />
                <span className="prose-serif text-xl text-paper/90">
                  <span className="font-light">
                    {p.lines[0]} {p.lines[1]}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
