import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import { contactDetails } from "../lib/content";

export default function Contact() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <img
          src="/images/contact-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-parchment/88" />
        <div className="grain" />
      </div>

      <div className="relative z-10 pt-32 md:pt-44 pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16 md:mb-20 max-w-2xl">
            <span className="eyebrow text-clay mb-6 block">Book or Inquire</span>
            <h1 className="font-display text-[clamp(2.6rem,6.4vw,5.2rem)] leading-[1.05] tracking-[0.012em] text-ink">
              Let's find the right journey for where you are
            </h1>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <Reveal delay={80} className="lg:col-span-7">
              <ContactForm tone="light" />
            </Reveal>

            <Reveal delay={160} className="lg:col-span-4 lg:col-start-9">
              <div className="border-t border-line pt-8 flex flex-col gap-10">
                <div>
                  <div className="eyebrow text-ink-faint mb-3">Address</div>
                  <p className="font-body text-ink text-[16px] leading-relaxed">
                    {contactDetails.address[0]}
                    <br />
                    {contactDetails.address[1]}
                  </p>
                </div>
                <div>
                  <div className="eyebrow text-ink-faint mb-3">Tel</div>
                  <a href={`tel:${contactDetails.phone}`} className="font-body text-ink text-[16px] hover:text-clay transition-colors">
                    {contactDetails.phone}
                  </a>
                </div>
                <div>
                  <div className="eyebrow text-ink-faint mb-3">Email</div>
                  <a href={`mailto:${contactDetails.email}`} className="font-body text-ink text-[16px] hover:text-clay transition-colors">
                    {contactDetails.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
