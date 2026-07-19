import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMotionValue } from 'framer-motion'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import FrameSequenceHero from '../components/FrameSequenceHero'
import ScrollText from '../components/ScrollText'
import ParallaxBand from '../components/ParallaxBand'
import TryThis from '../components/TryThis'
import { useJourneys, useSiteConfig } from '../lib/ConfigProvider'

function JourneyWidget() {
  const journeys = useJourneys()
  return (
    <section className="bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-clay">Enter the Understory</p>
          <h2 className="display mt-6 text-4xl text-paper md:text-6xl">
            Four paths into presence, stillness, and sound
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {journeys.map((j, i) => (
            <Reveal key={j.slug} delay={i * 0.08}>
              <Link to={`/journey/${j.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src={j.teaser}
                    alt={j.title}
                    className="img-breathe h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="meta text-amber/90">Journey {j.number}</span>
                    <p className="display mt-2 text-xl text-paper">{j.title}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center" delay={0.1}>
          <Link
            to="/collection"
            className="meta inline-block border-b border-amber/40 pb-1 text-amber transition-colors hover:border-amber"
          >
            See all journeys
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function PhilosophyStatement() {
  const { config } = useSiteConfig()
  const { eyebrow, lead, text } = config.philosophy
  const ref = useRef(null)
  // Pin progress: 0 the instant the section reaches the top of the fold (0px),
  // 1 when the pin ends. The typing is driven entirely by this — so it does not
  // begin until the section is fully at top:0 and 100vh.
  const progress = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) {
        progress.set(0)
        return
      }
      progress.set(Math.min(1, Math.max(0, -rect.top / total)))
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
  }, [progress])

  return (
    <section ref={ref} className="bg-bark md:h-[260vh]">
      {/* Pinned 100vh stage — typing starts only once this reaches top:0 */}
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-24 md:h-screen md:py-0">
        {/* coast to coast — full-bleed statement */}
        <div className="w-full px-6 md:px-14">
          <p className="eyebrow mb-10 text-clay">{eyebrow}</p>
          <ScrollText
            lead={lead}
            text={text}
            progress={progress}
            start={0.04}
            end={0.92}
            className="text-3xl font-light leading-[1.24] text-white md:text-5xl md:leading-[1.2] lg:text-[3.6rem] lg:leading-[1.16]"
          />
        </div>

        {/* Bottom fade — the green dissolves into the section below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent to-ink" />
      </div>
    </section>
  )
}

function Recognition() {
  const { config } = useSiteConfig()
  const { eyebrow, items, award } = config.recognition
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal className="text-center">
          <p className="eyebrow text-mist">{eyebrow}</p>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {items.map((it) => (
              <span key={it} className="display text-xl text-fog/70 md:text-2xl">
                {it}
              </span>
            ))}
          </div>
          <p className="prose-serif mx-auto mt-10 max-w-xl text-fog/60">
            <span className="font-light">{award}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ContactBand() {
  const { config } = useSiteConfig()
  const { eyebrow, heading, blurb, email, phone } = config.contact
  return (
    <section id="begin" className="bg-parch py-28 md:py-40">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow text-bark">{eyebrow}</p>
            <h2 className="display mt-6 text-4xl text-bark md:text-6xl">{heading}</h2>
            <p className="prose-serif mt-8 max-w-md text-bark/70">
              <span className="font-light">{blurb}</span>
            </p>
            <div className="mt-10 space-y-2 meta text-bark/60">
              <p>{email}</p>
              <p>{phone}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm tone="light" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Arrival() {
  const { config } = useSiteConfig()
  const { eyebrow, line1, line2 } = config.arrival
  return (
    <ParallaxBand eyebrow={eyebrow}>
      <p className="display mt-6 max-w-3xl text-4xl leading-tight text-paper md:text-6xl">
        {line1}
      </p>
      <p className="prose-serif mt-6 max-w-md text-fog/85">
        <span className="font-light">{line2}</span>
      </p>
    </ParallaxBand>
  )
}

export default function Home() {
  return (
    <>
      <FrameSequenceHero />
      <PhilosophyStatement />
      <JourneyWidget />
      <Arrival />
      <TryThis />
      <Recognition />
      <ContactBand />
    </>
  )
}
