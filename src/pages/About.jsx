import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'

export default function About() {
  return (
    <div className="bg-ink">
      {/* Intro */}
      <section className="px-6 pb-16 pt-40 md:px-10 md:pt-52">
        <div className="mx-auto max-w-container">
          <Reveal className="max-w-4xl">
            <p className="eyebrow text-clay">About Understory</p>
            <h1 className="display mt-6 text-5xl leading-[1.02] text-paper md:text-7xl">
              I set out to stop running from my own quiet
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-container items-center gap-16 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="/images/about-story.jpg"
                alt="A figure seated quietly on a fallen log in a forest clearing"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="eyebrow text-mist">The Story</p>
            <div className="prose-serif mt-6 space-y-6 text-lg text-fog/85">
              <p className="font-light">
                I didn’t set out to build a wellness studio. I set out to stop running from my own
                quiet.
              </p>
              <p className="font-light">
                Years of sitting in forests with a recorder and no agenda taught me that people
                don’t need to be fixed — they need somewhere safe enough to stop performing.
              </p>
              <p className="font-light">
                Understory grew out of that: sessions built from real terrain, real sound, and real
                time, not a script.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-bark px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-container items-center gap-16 md:grid-cols-2">
          <Reveal className="md:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="/images/about-approach.jpg"
                alt="A field recorder and a small notebook resting on natural stone"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12} className="md:order-1">
            <p className="eyebrow text-clay">The Approach</p>
            <h2 className="display mt-5 text-3xl text-paper md:text-4xl">
              Nothing is simulated. You are always moving toward something real.
            </h2>
            <div className="prose-serif mt-8 space-y-6 text-lg text-fog/85">
              <p className="font-light">
                Every journey is built from a real place — recorded, walked, and tested before it’s
                ever offered.
              </p>
              <p className="font-light">
                Sound is layered, not looped: a base of the actual environment, a middle layer that
                shifts with the emotional arc of the walk, and a peak moment placed where the
                terrain itself opens up.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Press */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-container text-center">
          <Reveal>
            <p className="eyebrow text-mist">Press</p>
            <p className="prose-serif mx-auto mt-8 max-w-2xl text-xl text-fog/70">
              <span className="font-light">Featured in</span>
            </p>
            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {['Stillpoint Journal', 'Wildmind Quarterly', 'The Somatic Review', 'Groundwork Magazine'].map(
                (p) => (
                  <span key={p} className="display text-xl text-fog/70 md:text-2xl">
                    {p}
                  </span>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-parch px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto grid max-w-container gap-16 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow text-bark">Discuss Your Journey</p>
            <h2 className="display mt-6 text-4xl text-bark md:text-5xl">
              Somewhere safe enough to stop performing
            </h2>
            <div className="mt-10 space-y-2 meta text-bark/60">
              <p>info@mysite.com</p>
              <p>123-456-7890</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm tone="light" />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
