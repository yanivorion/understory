import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import { useSiteConfig } from '../lib/ConfigProvider'

// Scroll-scrubbed frame sequence (a walk through the forest), extracted from
// the hike footage. As the visitor scrolls the tall container, the frames
// advance — the "scroll-driven sensory experience" from the brief.
const FRAME_COUNT = 180
const framePath = (i) => `/frames/hike/frame_${String(i + 1).padStart(4, '0')}.jpg`

export default function FrameSequenceHero() {
  const { config } = useSiteConfig()
  const { eyebrow, title, tagline, scrollHint } = config.hero
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const frameRef = useRef(0)
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Overlay type: hold, then release as the walk deepens.
  const titleOpacity = useTransform(scrollYProgress, [0, 0.32, 0.5], [1, 1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-40%'])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const vignette = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.32, 0.62])
  // Green rises from the base as the walk finishes, flowing into the next
  // section so the hero "evolves" into the #041f0a philosophy band.
  const greenWash = useTransform(scrollYProgress, [0.5, 1], [0, 1])

  const drawFrame = (index) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.complete || !img.naturalWidth) return
    const ctx = canvas.getContext('2d')
    const cw = canvas.width
    const ch = canvas.height
    const ir = img.naturalWidth / img.naturalHeight
    const cr = cw / ch
    let dw, dh, dx, dy
    if (cr > ir) {
      dw = cw
      dh = cw / ir
      dx = 0
      dy = (ch - dh) / 2
    } else {
      dh = ch
      dw = ch * ir
      dy = 0
      dx = (cw - dw) / 2
    }
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  const resize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(window.innerWidth * dpr)
    canvas.height = Math.floor(window.innerHeight * dpr)
    drawFrame(frameRef.current)
  }

  // Preload frames. Load the first immediately so the canvas has something to
  // show; defer the rest a tick so the flood of requests doesn't starve the
  // hero's entrance animation on first paint.
  useEffect(() => {
    let cancelled = false
    const imgs = new Array(FRAME_COUNT)

    const loadFrame = (i) => {
      const img = new Image()
      img.src = framePath(i)
      img.onload = () => {
        if (cancelled) return
        if (i === 0) {
          drawFrame(0)
          setReady(true)
        }
      }
      imgs[i] = img
    }

    imagesRef.current = imgs
    loadFrame(0)

    const t = setTimeout(() => {
      for (let i = 1; i < FRAME_COUNT; i++) {
        if (cancelled) break
        loadFrame(i)
      }
    }, 400)

    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))))
    if (idx === frameRef.current) return
    frameRef.current = idx
    requestAnimationFrame(() => drawFrame(idx))
  })

  return (
    <section ref={containerRef} className="relative h-[320vh] w-full bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Poster still under the canvas until the first frame decodes */}
        <img
          src="/images/home-hero.jpg"
          alt="A forest walk at golden hour"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Legibility vignette */}
        <motion.div
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <motion.div
          style={{ opacity: greenWash }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041f0a] via-[#041f0a]/50 to-transparent"
        />

        {/* Headline */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-10 mx-auto flex h-full max-w-container flex-col items-start justify-center px-6 md:px-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            className="eyebrow text-amber/90"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="display mt-6 max-w-4xl text-[13vw] font-light leading-[1.02] text-paper md:text-[6.5rem]"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className="prose-serif mt-8 max-w-md text-lg text-fog/85"
          >
            <span className="font-light">{tagline}</span>
          </motion.p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="meta text-fog/60">{scrollHint}</span>
            <span className="h-12 w-px bg-gradient-to-b from-fog/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
