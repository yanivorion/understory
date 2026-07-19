import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import SectionBlend from "./SectionBlend";
import { philosophyText } from "../lib/content";

export default function Philosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.22]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.07, 0.07, 0]);

  return (
    <section
      ref={ref}
      className="relative text-paper px-6 md:px-10 pt-40 md:pt-56 pb-32 md:pb-44 overflow-hidden bg-forest-deep"
    >
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <img
          src="/images/home-hero.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest-deep/80" />

      <SectionBlend from="var(--color-parchment)" height="40vh" />

      <motion.span
        aria-hidden="true"
        style={{ y: ghostY, opacity: ghostOpacity }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display font-extrabold text-paper text-[26vw] leading-none whitespace-nowrap select-none"
      >
        Stillness
      </motion.span>

      <div className="grain" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
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
