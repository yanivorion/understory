import Reveal from "../components/Reveal";
import Gutter from "../components/Gutter";
import ContactForm from "../components/ContactForm";
import { aboutContent, contactDetails } from "../lib/content";

export default function About() {
  return (
    <div className="pt-32 md:pt-40">
      <section className="px-6 md:px-10 mb-16 md:mb-24">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <span className="eyebrow text-clay mb-6 block">Understory</span>
            <h1 className="font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.03] tracking-[0.012em] text-ink">
              Grounded in real terrain, real sound, real time
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <Reveal className="lg:col-span-6 lg:col-start-2 order-2 lg:order-1">
            <span className="eyebrow text-clay mb-6 block">Story</span>
            <p className="font-display text-[22px] md:text-[27px] leading-[1.5] tracking-[0.006em] text-ink">
              {aboutContent.story}
            </p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
              <img
                src="/images/about-story.jpg"
                alt="A figure seen from behind, seated quietly on a fallen log in a forest clearing"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Gutter size="lg" />

      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <Reveal className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
              <img
                src="/images/about-approach.jpg"
                alt="A field recorder and a small notebook resting on natural stone"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-6">
            <span className="eyebrow text-clay mb-6 block">Approach</span>
            <p className="font-display text-[22px] md:text-[27px] leading-[1.5] tracking-[0.006em] text-ink">
              {aboutContent.approach}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 md:px-10 py-24 md:py-32 bg-forest text-paper">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="border-t border-b border-line-dark py-10 flex flex-col md:flex-row md:items-center gap-6">
            <span className="meta-row text-paper/45 whitespace-nowrap">Featured In</span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 meta-row text-paper/85">
              {aboutContent.press.map((name, i) => (
                <span key={name} className="flex items-center gap-3">
                  {i > 0 && <span className="text-paper/30">&middot;</span>}
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow text-clay mb-6 block">Discuss Your Journey</span>
            <div className="flex flex-col gap-2 meta-row text-ink-soft">
              <a href={`mailto:${contactDetails.email}`} className="hover:text-clay transition-colors">
                {contactDetails.email}
              </a>
              <a href={`tel:${contactDetails.phone}`} className="hover:text-clay transition-colors">
                {contactDetails.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-6">
            <ContactForm tone="light" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
