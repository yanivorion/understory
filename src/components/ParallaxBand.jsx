import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Full-bleed parallax band — the background drifts slower than the foreground,
// creating the depth "transition" between sections. Reuses the golden-hour
// forest still from the original hero.
export default function ParallaxBand({
  image = '/images/home-hero.jpg',
  eyebrow,
  children,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-14%', '14%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18])
  const textY = useTransform(scrollYProgress, [0, 1], ['22%', '-22%'])

  return (
    <section ref={ref} className="relative h-[85vh] w-full overflow-hidden bg-ink md:h-screen">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-container flex-col items-center justify-center px-6 text-center md:px-10"
      >
        {eyebrow && <p className="eyebrow text-amber/90">{eyebrow}</p>}
        {children}
      </motion.div>
    </section>
  )
}
