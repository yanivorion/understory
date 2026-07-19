import Reveal from "./Reveal";
import { recognition } from "../lib/content";

export default function Recognition() {
  return (
    <section className="bg-parchment px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="border-t border-b border-line py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 meta-row text-ink-soft">
            <span className="text-ink-faint">Featured In</span>
            {recognition.press.map((name, i) => (
              <span key={name} className="flex items-center gap-3">
                {i > 0 && <span className="text-ink-faint">&middot;</span>}
                <span className="text-ink">{name}</span>
              </span>
            ))}
          </div>
          <div className="meta-row text-clay whitespace-nowrap">{recognition.award}</div>
        </Reveal>
      </div>
    </section>
  );
}
