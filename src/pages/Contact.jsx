import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <div className="relative bg-ink">
      {/* Soft forest backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/images/contact-bg.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="relative z-10 mx-auto max-w-container px-6 pb-28 pt-40 md:px-10 md:pt-52">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-clay">Book or Inquire</p>
          <h1 className="display mt-6 text-5xl leading-[1.02] text-paper md:text-7xl">
            Begin Your Journey
          </h1>
          <p className="prose-serif mt-8 max-w-xl text-xl text-fog/80">
            <span className="font-light">
              Whether you’re seeking clarity, release, or simply space to breathe — tell us what
              you’re hoping to move through.
            </span>
          </p>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="rounded-2xl border border-paper/10 bg-bark/40 p-8 md:p-12">
              <ContactForm tone="dark" />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-12">
              <div>
                <p className="eyebrow text-mist">Address</p>
                <p className="prose-serif mt-4 text-lg text-fog/85">
                  <span className="font-light">
                    500 Terry Francine St
                    <br />
                    San Francisco, CA 94158
                  </span>
                </p>
              </div>
              <div className="h-px w-full hairline" />
              <div>
                <p className="eyebrow text-mist">Tel</p>
                <a
                  href="tel:1234567890"
                  className="prose-serif mt-4 block text-lg text-fog/85 transition-colors hover:text-amber"
                >
                  <span className="font-light">123-456-7890</span>
                </a>
              </div>
              <div className="h-px w-full hairline" />
              <div>
                <p className="eyebrow text-mist">Email</p>
                <a
                  href="mailto:info@mysite.com"
                  className="prose-serif mt-4 block text-lg text-fog/85 transition-colors hover:text-amber"
                >
                  <span className="font-light">info@mysite.com</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
