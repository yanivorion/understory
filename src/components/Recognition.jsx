import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import SectionBlend from "./SectionBlend";
import { recognition } from "../lib/content";

export default function Recognition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pressX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const awardX = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  return (
    <section ref={ref} className="relative bg-parchment px-6 md:px-10 pt-32 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      {/* now follows the parchment Journey Widget — keep the seam invisible */}
      <SectionBlend from="var(--color-parchment)" height="34vh" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <Reveal className="border-b border-line pb-10 md:pb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <motion.div style={{ x: pressX }} className="flex flex-wrap items-center gap-x-3 gap-y-2 meta-row text-ink-soft">
            <span className="text-ink-faint">Featured In</span>
            {recognition.press.map((name, i) => (
              <span key={name} className="flex items-center gap-3">
                {i > 0 && <span className="text-ink-faint">&middot;</span>}
                <span className="text-ink">{name}</span>
              </span>
            ))}
          </motion.div>
          <motion.div style={{ x: awardX }} className="meta-row text-clay whitespace-nowrap">
            {recognition.award}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
