import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import MetaPanel from '../components/MetaPanel'
import { useJourneys } from '../lib/ConfigProvider'

function CardImage({ j, ratio }) {
  return (
    <Link to={`/journey/${j.slug}`} className="group block">
      <div className={`relative ${ratio} overflow-hidden rounded-lg`}>
        <img src={j.hero} alt={j.title} className="img-breathe h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="meta text-amber/90">Journey {j.number}</span>
          <h3 className="display mt-2 text-2xl text-paper md:text-3xl">{j.title}</h3>
          <p className="prose-serif mt-1 text-fog/80">
            <span className="font-light">{j.tagline}</span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <MetaPanel location={j.location} duration={j.duration} sound={j.sound} />
      </div>
    </Link>
  )
}

export default function Collection() {
  const journeys = useJourneys()
  const [lead, sq1, sq2, wide] = journeys

  return (
    <div className="bg-ink">
      {/* Header — full-width breathing gutter above the grid */}
      <section className="px-6 pb-8 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-container">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-clay">The Collection</p>
            <h1 className="display mt-6 text-5xl leading-[1.02] text-paper md:text-7xl">
              The Forest Holds Many Paths
            </h1>
            <p className="prose-serif mt-8 max-w-xl text-xl text-fog/80">
              <span className="font-light">
                Four journeys, each shaped for a different kind of arrival.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Empty gutter — breath before immersion */}
      <div className="h-16 md:h-28" />

      {/* Asymmetric three-card grid: wide 3/2 lead + two stacked squares */}
      <section className="px-6 md:px-10">
        <div className="mx-auto grid max-w-container gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <CardImage j={lead} ratio="aspect-[3/2]" />
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <CardImage j={sq1} ratio="aspect-square" />
            </Reveal>
            <Reveal delay={0.2}>
              <CardImage j={sq2} ratio="aspect-square" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Empty gutter between sections */}
      <div className="h-16 md:h-28" />

      {/* Fourth journey — full-width wide feature */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-container">
          <Reveal>
            <CardImage j={wide} ratio="aspect-[16/7]" />
          </Reveal>
        </div>
      </section>

      {/* Empty gutter below — breath after */}
      <div className="h-24 md:h-40" />

      <section className="border-t border-paper/10 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-container text-center">
          <Reveal>
            <p className="display text-3xl text-paper md:text-4xl">
              Not sure which path is yours?
            </p>
            <Link
              to="/contact"
              className="meta mt-8 inline-block rounded-full border border-amber/60 px-8 py-4 text-amber transition-all duration-500 hover:bg-amber hover:text-ink"
            >
              Begin a conversation
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
