import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

export default function HomeContact() {
  return (
    <section className="bg-parchment px-6 md:px-10 py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow text-clay mb-7 block">Begin Your Journey</span>
          <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.08] tracking-[0.012em] text-ink mb-7">
            Whether you're seeking clarity, release, or simply space to breathe
          </h2>
          <Link
            to="/contact"
            className="inline-block meta-row px-8 py-4 rounded-full bg-ink text-parchment hover:bg-clay transition-colors"
          >
            Book a Session
          </Link>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
          <ContactForm tone="light" />
        </Reveal>
      </div>
    </section>
  );
}
