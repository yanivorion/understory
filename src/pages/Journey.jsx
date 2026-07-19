import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Reveal from '../components/Reveal'
import MetaPanel from '../components/MetaPanel'
import { getJourney, journeys } from '../data/journeys'

export default function Journey() {
  const { slug } = useParams()
  const journey = getJourney(slug)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])

  if (!journey) return <Navigate to="/collection" replace />

  const idx = journeys.findIndex((j) => j.slug === slug)
  const next = journeys[(idx + 1) % journeys.length]

  return (
    <article className="bg-ink">
      {/* Full-bleed hero */}
      <section ref={heroRef} className="relative h-[92svh] w-full overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img src={journey.hero} alt={journey.title} className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink" />
        <div className="relative z-10 mx-auto flex h-full max-w-container flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">
          <Reveal>
            <span className="eyebrow text-amber/90">Journey {journey.number}</span>
            <h1 className="display mt-5 max-w-4xl text-6xl leading-[0.98] text-paper md:text-8xl">
              {journey.title}
            </h1>
            <p className="prose-serif mt-6 max-w-xl text-xl text-fog/85 md:text-2xl">
              <span className="font-light">{journey.tagline}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Meta band */}
      <section className="border-b border-paper/10 px-6 py-10 md:px-10">
        <div className="mx-auto grid max-w-container gap-x-12 gap-y-6 sm:grid-cols-3">
          {[
            ['Duration', journey.duration],
            ['Location', journey.location],
            ['Sound Layer', journey.sound],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="meta text-mist">{k}</p>
              <p className="prose-serif mt-2 text-lg text-paper/90">
                <span className="font-light">{v}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="prose-serif text-2xl leading-relaxed text-paper/90 md:text-[1.9rem]">
              <span className="font-light">{journey.intro}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* First support image — full width */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-container">
          <Reveal>
            <div className="relative aspect-[16/8] overflow-hidden rounded-lg">
              <img
                src={journey.supports[0]}
                alt={`${journey.title} — detail`}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* The arc — Entry / Immersion / Emergence */}
      <section className="px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-container">
          <Reveal className="mb-16 text-center">
            <p className="eyebrow text-clay">The Arc of the Journey</p>
          </Reveal>
          <div className="mx-auto max-w-3xl space-y-16">
            {journey.movements.map((m, i) => (
              <Reveal key={m.phase} delay={i * 0.08}>
                <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                  <div>
                    <span className="meta text-amber/80">0{i + 1}</span>
                    <p className="display mt-2 text-2xl text-paper">{m.phase}</p>
                  </div>
                  <p className="prose-serif text-lg leading-relaxed text-fog/85">
                    <span className="font-light">{m.text}</span>
                  </p>
                </div>
                {i < journey.movements.length - 1 && (
                  <div className="mt-16 h-px w-full hairline" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Second support image + meta panel */}
      <section className="px-6 pb-8 md:px-10">
        <div className="mx-auto grid max-w-container items-end gap-8 md:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={journey.supports[1]}
                alt={`${journey.title} — detail`}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-lg border border-paper/10 bg-bark/40 p-8">
              <p className="eyebrow text-clay">Session Details</p>
              <div className="mt-6">
                <MetaPanel
                  location={journey.location}
                  duration={journey.duration}
                  sound={journey.sound}
                />
              </div>
              <Link
                to="/contact"
                className="meta mt-8 inline-block rounded-full border border-amber/60 px-7 py-3.5 text-amber transition-all duration-500 hover:bg-amber hover:text-ink"
              >
                Book this journey
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next journey */}
      <section className="mt-16 border-t border-paper/10 px-6 py-20 md:px-10">
        <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="meta text-mist">Next journey</p>
            <Link
              to={`/journey/${next.slug}`}
              className="display mt-3 block text-3xl text-paper transition-colors hover:text-amber md:text-4xl"
            >
              {next.title} →
            </Link>
          </div>
          <Link to="/collection" className="meta text-fog/70 transition-colors hover:text-amber">
            All journeys
          </Link>
        </div>
      </section>
    </article>
  )
}
