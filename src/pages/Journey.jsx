import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useJourneys } from "../lib/ConfigProvider";
import MetaPanel from "../components/MetaPanel";
import Reveal from "../components/Reveal";
import Gutter from "../components/Gutter";
import HomeContact from "../components/HomeContact";

function JourneyHero({ journey }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);

  return (
    <section ref={ref} className="relative h-[86vh] min-h-[560px] overflow-hidden bg-forest-deep">
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <img src={journey.heroImage} alt={journey.title} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/75" />
      <div className="grain" />

      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-[1400px] mx-auto w-full">
          <span className="font-mono text-[11px] tracking-[0.14em] text-paper/70 mb-4 block">
            Journey {journey.number}
          </span>
          <h1 className="font-display text-paper font-extrabold text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] tracking-[0.01em] max-w-4xl">
            {journey.title}
          </h1>
          <p className="font-body italic text-paper/85 text-[17px] md:text-[20px] mt-6 max-w-lg">
            {journey.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Journey() {
  const { slug } = useParams();
  const journeys = useJourneys();
  const journey = journeys.find((j) => j.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!journey) return <Navigate to="/collection" replace />;

  const otherJourneys = journeys.filter((j) => j.slug !== journey.slug);

  return (
    <div>
      <JourneyHero journey={journey} />

      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-4">
            <MetaPanel location={journey.location} duration={journey.duration} sound={journey.sound} />
            <p className="font-body text-ink-soft text-[16px] leading-relaxed mt-8">{journey.description}</p>
            <Link
              to="/contact"
              className="inline-block mt-9 meta-row px-8 py-4 rounded-full bg-ink text-parchment hover:bg-clay transition-colors"
            >
              Book This Journey
            </Link>
          </Reveal>

          <div className="lg:col-span-8 flex flex-col gap-16 md:gap-20">
            {journey.arc.map((step, i) => (
              <Reveal
                key={step.label}
                delay={i * 90}
                className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-10 pb-12 border-b border-line-soft last:border-b-0"
              >
                <span className="eyebrow text-clay">{step.label}</span>
                <p className="font-display text-[22px] md:text-[26px] leading-[1.45] tracking-[0.008em] text-ink">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Gutter size="md" />

      <section className="px-6 md:px-10 pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {journey.supportImages.map((img, i) => (
            <Reveal key={img.src} delay={i * 100}>
              <div className="relative overflow-hidden rounded-sm aspect-[4/3] mb-4">
                <img src={img.src} alt={img.caption} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              </div>
              <p className="font-body italic text-ink-soft text-[14px]">{img.caption}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Gutter size="lg" tone="dark" />

      <section className="bg-forest text-paper px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <span className="eyebrow text-clay-soft mb-8 block">The Other Paths</span>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {otherJourneys.map((j, i) => (
              <Reveal key={j.slug} delay={i * 100}>
                <Link to={`/journeys/${j.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-5">
                    <img
                      src={j.widgetImage}
                      alt={j.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                    />
                  </div>
                  <h3 className="font-display text-[19px] tracking-[0.01em] group-hover:text-clay-soft transition-colors">
                    {j.title}
                  </h3>
                  <p className="meta-row text-paper/45 mt-2">{j.duration}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeContact />
    </div>
  );
}
