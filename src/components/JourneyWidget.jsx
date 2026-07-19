import { Link } from "react-router-dom";
import { journeys } from "../lib/content";
import Reveal from "./Reveal";

export default function JourneyWidget() {
  return (
    <section className="bg-parchment px-6 md:px-10 py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <div className="eyebrow text-clay mb-5">Enter the Understory</div>
            <h2 className="font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.05] tracking-[0.015em] text-ink max-w-2xl">
              Four paths into presence, stillness, and sound
            </h2>
          </div>
          <Link
            to="/collection"
            className="meta-row text-ink-soft border-b border-ink/30 pb-1 whitespace-nowrap hover:border-clay hover:text-clay transition-colors"
          >
            View the Full Collection
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {journeys.map((journey, i) => (
            <Reveal key={journey.slug} delay={i * 90}>
              <Link to={`/journeys/${journey.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-5">
                  <img
                    src={journey.widgetImage}
                    alt={journey.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.14em] text-paper/85">
                    {journey.number}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display text-[19px] md:text-[21px] tracking-[0.01em] text-ink group-hover:text-clay transition-colors">
                    {journey.title}
                  </h3>
                </div>
                <p className="font-body text-[14px] text-ink-soft italic leading-snug mb-4">
                  {journey.tagline}
                </p>
                <div className="meta-row text-ink-faint flex flex-col gap-1 pt-3 border-t border-line-soft">
                  <span>{journey.duration}</span>
                  <span>{journey.location}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
