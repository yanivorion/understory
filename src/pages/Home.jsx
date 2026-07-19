import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMotionValue } from 'framer-motion'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import FrameSequenceHero from '../components/FrameSequenceHero'
import HomeSectionShell from '../components/HomeSectionShell'
import ScrollText from '../components/ScrollText'
import SectionBackground from '../components/SectionBackground'
import SectionGradientStrips from '../components/SectionGradientStrips'
import { useFrameScroll } from '../components/ScrollFrameSequence'
import TryThis from '../components/TryThis'
import { useJourneys, useSiteConfig } from '../lib/ConfigProvider'
import { useEditorUI } from '../lib/EditorUIContext'
import PlaygroundSection from '../components/PlaygroundSection'
import { useTextStyle } from '../components/StyledText'
import { isCustomSectionId, isPlaygroundSectionId, resolveSectionOrder } from '../lib/homeSections'

function JourneyWidget({ sectionId }) {
  const journeys = useJourneys()
  const { config } = useSiteConfig()
  const bg = config.backgrounds[sectionId] || config.backgrounds.journeys
  const eyebrowStyle = useTextStyle('journeys.eyebrow')
  const headingStyle = useTextStyle('journeys.heading')
  const cardTitleStyle = useTextStyle('journeys.cardTitle')

  return (
    <section className="relative overflow-visible bg-ink py-28 md:py-40">
      <SectionGradientStrips background={bg} sectionId={sectionId} />
      <div className="relative z-10 mx-auto max-w-container px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow" style={eyebrowStyle}>
            Enter the Understory
          </p>
          <h2 className="display mt-6 text-4xl md:text-6xl" style={headingStyle}>
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
                    <p className="display mt-2 text-xl" style={cardTitleStyle}>
                      {j.title}
                    </p>
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

function TryThisSection({ sectionId }) {
  const { config } = useSiteConfig()
  const bg = config.backgrounds[sectionId] || config.backgrounds.tryThis

  return (
    <div className="relative">
      <SectionGradientStrips background={bg} sectionId={sectionId} />
      <TryThis />
    </div>
  )
}

const philosophyTextClass =
  'text-3xl font-light leading-[1.24] text-white md:text-5xl md:leading-[1.2] lg:text-[3.6rem] lg:leading-[1.16]'

function PhilosophyText({ eyebrow, lead, text, progress }) {
  const eyebrowStyle = useTextStyle('philosophy.eyebrow')
  const bodyStyle = useTextStyle('philosophy.text')
  const leadStyle = useTextStyle('philosophy.lead')

  return (
    <div className="w-full px-6 md:px-14">
      <p className="eyebrow mb-10" style={eyebrowStyle}>
        {eyebrow}
      </p>
      <ScrollText
        lead={lead}
        text={text}
        progress={progress}
        start={0.04}
        end={0.92}
        className={philosophyTextClass}
        style={bodyStyle}
        leadStyle={leadStyle}
      />
    </div>
  )
}

function PhilosophyScrubContent({ eyebrow, lead, text }) {
  const { scrollYProgress } = useFrameScroll()
  return (
    <div className="relative z-10 flex h-full items-center overflow-hidden">
      <PhilosophyText eyebrow={eyebrow} lead={lead} text={text} progress={scrollYProgress} />
    </div>
  )
}

function PhilosophyStatic({ bg, sectionId, eyebrow, lead, text }) {
  const ref = useRef(null)
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
    <section ref={ref} className="relative overflow-visible md:h-[260vh]">
      {bg.type === 'image' && bg.image ? (
        <div className="absolute inset-0">
          <img src={bg.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
          {Number(bg.overlay) > 0 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{ backgroundColor: `rgb(var(--color-ink) / ${Number(bg.overlay)})` }}
            />
          )}
        </div>
      ) : (
        <div className="absolute inset-0 bg-bark" style={bg.color ? { backgroundColor: bg.color } : undefined} />
      )}
      <SectionGradientStrips background={bg} sectionId={sectionId} />
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-24 md:h-screen md:py-0">
        <PhilosophyText eyebrow={eyebrow} lead={lead} text={text} progress={progress} />
      </div>
    </section>
  )
}

function PhilosophyStatement({ sectionId }) {
  const { config } = useSiteConfig()
  const { eyebrow, lead, text } = config.philosophy
  const bg = config.backgrounds[sectionId] || config.backgrounds.philosophy

  if (bg.type === 'scrub') {
    return (
      <SectionBackground background={bg} sectionId={sectionId} className="bg-bark" loadingLabel="Loading\u2026">
        <PhilosophyScrubContent eyebrow={eyebrow} lead={lead} text={text} />
      </SectionBackground>
    )
  }

  return <PhilosophyStatic bg={bg} sectionId={sectionId} eyebrow={eyebrow} lead={lead} text={text} />
}

function Recognition({ sectionId }) {
  const { config } = useSiteConfig()
  const { eyebrow, items, award } = config.recognition
  const bg = config.backgrounds[sectionId] || config.backgrounds.recognition
  const eyebrowStyle = useTextStyle('recognition.eyebrow')
  const itemStyle = useTextStyle('recognition.item')
  const awardStyle = useTextStyle('recognition.award')
  return (
    <SectionBackground background={bg} sectionId={sectionId} className="bg-ink py-24" loadingLabel="Loading\u2026">
      <div className="relative z-10 mx-auto max-w-container px-6 md:px-10">
        <Reveal className="text-center">
          <p className="eyebrow" style={eyebrowStyle}>
            {eyebrow}
          </p>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {items.map((it) => (
              <span key={it} className="display text-xl md:text-2xl" style={itemStyle}>
                {it}
              </span>
            ))}
          </div>
          <p className="prose-serif mx-auto mt-10 max-w-xl" style={awardStyle}>
            <span>{award}</span>
          </p>
        </Reveal>
      </div>
    </SectionBackground>
  )
}

function ContactBand({ sectionId }) {
  const { config } = useSiteConfig()
  const { eyebrow, heading, blurb, email, phone } = config.contact
  const bg = config.backgrounds[sectionId] || config.backgrounds.contact
  const eyebrowStyle = useTextStyle('contact.eyebrow')
  const headingStyle = useTextStyle('contact.heading')
  const blurbStyle = useTextStyle('contact.blurb')
  const detailsStyle = useTextStyle('contact.details')
  return (
    <SectionBackground background={bg} sectionId={sectionId} className="bg-parch py-28 md:py-40" loadingLabel="Loading\u2026">
      <div id="begin" className="relative z-10 mx-auto max-w-container px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow" style={eyebrowStyle}>
              {eyebrow}
            </p>
            <h2 className="display mt-6 text-4xl md:text-6xl" style={headingStyle}>
              {heading}
            </h2>
            <p className="prose-serif mt-8 max-w-md" style={blurbStyle}>
              {blurb}
            </p>
            <div className="mt-10 space-y-2 meta" style={detailsStyle}>
              <p>{email}</p>
              <p>{phone}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm tone="light" />
          </Reveal>
        </div>
      </div>
    </SectionBackground>
  )
}

function Arrival({ sectionId }) {
  const { config } = useSiteConfig()
  const { eyebrow, line1, line2 } = config.arrival
  const bg = config.backgrounds[sectionId] || config.backgrounds.arrival
  const eyebrowStyle = useTextStyle('arrival.eyebrow')
  const line1Style = useTextStyle('arrival.line1')
  const line2Style = useTextStyle('arrival.line2')
  return (
    <SectionBackground
      background={bg}
      sectionId={sectionId}
      className="relative h-[85vh] w-full bg-ink md:h-screen"
      loadingLabel="Loading\u2026"
    >
      <div className="relative z-10 mx-auto flex h-full max-w-container flex-col items-center justify-center px-6 text-center md:px-10">
        {eyebrow && (
          <p className="eyebrow" style={eyebrowStyle}>
            {eyebrow}
          </p>
        )}
        <p className="display mt-6 max-w-3xl text-4xl leading-tight md:text-6xl" style={line1Style}>
          {line1}
        </p>
        <p className="prose-serif mt-6 max-w-md" style={line2Style}>
          {line2}
        </p>
      </div>
    </SectionBackground>
  )
}

function CustomContentSection({ sectionId }) {
  const { config, updateLocal } = useSiteConfig()
  const { open } = useEditorUI()
  const section = config.customSections?.[sectionId]
  const bg = config.backgrounds[sectionId]

  if (!section) return null

  const updateCustom = (key, value) =>
    updateLocal({ customSections: { [sectionId]: { [key]: value } } })

  return (
    <SectionBackground background={bg} sectionId={sectionId} className="bg-ink py-28 md:py-40" loadingLabel="Loading\u2026">
      <div className="relative z-10 mx-auto max-w-container px-6 md:px-10">
        <Reveal>
          {open ? (
            <div className="space-y-4 max-w-3xl">
              <input
                value={section.eyebrow || ''}
                onChange={(e) => updateCustom('eyebrow', e.target.value)}
                className="w-full bg-transparent border-b border-paper/20 py-2 eyebrow text-clay outline-none"
                placeholder="Eyebrow"
              />
              <input
                value={section.heading || ''}
                onChange={(e) => updateCustom('heading', e.target.value)}
                className="w-full bg-transparent border-b border-paper/20 py-2 display text-4xl text-paper md:text-6xl outline-none"
                placeholder="Heading"
              />
              <textarea
                value={section.body || ''}
                onChange={(e) => updateCustom('body', e.target.value)}
                rows={5}
                className="w-full bg-transparent border border-paper/15 rounded-lg p-4 prose-serif text-fog/85 outline-none resize-y"
                placeholder="Body text"
              />
            </div>
          ) : (
            <>
              {section.eyebrow && <p className="eyebrow text-clay">{section.eyebrow}</p>}
              <h2 className="display mt-6 text-4xl text-paper md:text-6xl">{section.heading}</h2>
              <p className="prose-serif mt-8 max-w-2xl text-fog/85">
                <span className="font-light">{section.body}</span>
              </p>
            </>
          )}
        </Reveal>
      </div>
    </SectionBackground>
  )
}

function CustomSectionRouter({ sectionId }) {
  const { config } = useSiteConfig()
  const section = config.customSections?.[sectionId]
  if (!section) return null
  if (isPlaygroundSectionId(sectionId, config.customSections)) {
    return <PlaygroundSection sectionId={sectionId} section={section} />
  }
  return <CustomContentSection sectionId={sectionId} />
}

function renderSection(sectionId) {
  if (isCustomSectionId(sectionId)) return <CustomSectionRouter sectionId={sectionId} />

  switch (sectionId) {
    case 'hero':
      return <FrameSequenceHero />
    case 'philosophy':
      return <PhilosophyStatement sectionId={sectionId} />
    case 'journeys':
      return <JourneyWidget sectionId={sectionId} />
    case 'arrival':
      return <Arrival sectionId={sectionId} />
    case 'tryThis':
      return <TryThisSection sectionId={sectionId} />
    case 'recognition':
      return <Recognition sectionId={sectionId} />
    case 'contact':
      return <ContactBand sectionId={sectionId} />
    default:
      return null
  }
}

export default function Home() {
  const { config } = useSiteConfig()
  const order = resolveSectionOrder(config)

  return (
    <>
      {order.map((sectionId, index) => (
        <HomeSectionShell key={sectionId} sectionId={sectionId} index={index} total={order.length}>
          {renderSection(sectionId)}
        </HomeSectionShell>
      ))}
    </>
  )
}
