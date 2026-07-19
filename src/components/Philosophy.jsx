import Reveal from "./Reveal";
import { philosophyText } from "../lib/content";

export default function Philosophy() {
  return (
    <section className="bg-forest text-paper px-6 md:px-10 py-28 md:py-40 relative overflow-hidden">
      <div className="grain" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Reveal>
          <span className="eyebrow text-clay-soft mb-9 block">Philosophy</span>
        </Reveal>
        <Reveal delay={120}>
          <p className="font-display text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.35] tracking-[0.008em]">
            {philosophyText}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
