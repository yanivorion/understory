import { Link } from "react-router-dom";
import MetaPanel from "./MetaPanel";

export default function JourneyCard({ journey, aspect = "aspect-[4/5]", size = "normal" }) {
  const isLead = size === "lead";

  return (
    <Link to={`/journeys/${journey.slug}`} className="group block h-full">
      <div className={`relative overflow-hidden rounded-sm ${aspect} mb-6`}>
        <img
          src={journey.heroImage}
          alt={journey.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" />
        <div className="absolute top-5 left-5 flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] text-paper/85">{journey.number}</span>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <h3
            className={`font-display text-paper tracking-[0.01em] leading-tight ${
              isLead ? "text-[28px] md:text-[38px]" : "text-[20px] md:text-[24px]"
            }`}
          >
            {journey.title}
          </h3>
        </div>
      </div>
      <p className="font-body italic text-ink-soft text-[15px] leading-snug mb-3">{journey.tagline}</p>
      <MetaPanel location={journey.location} duration={journey.duration} sound={journey.sound} />
    </Link>
  );
}
