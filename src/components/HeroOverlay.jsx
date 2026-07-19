import { motion, useTransform } from "framer-motion";
import { useFrameScroll } from "./ScrollFrameSequence";
import { useSiteConfig } from "../lib/ConfigProvider";

/**
 * Text + scrim overlay for the home hero. Lives inside a <ScrollFrameSequence>
 * and reads scroll progress via useFrameScroll() to animate in/out with the
 * frame sequence beneath it. Copy comes from the site config (editable via
 * /studio), falling back to the built-in defaults.
 */
export default function HeroOverlay() {
  const { scrollYProgress } = useFrameScroll();
  const { config } = useSiteConfig();
  const hero = config.hero;

  const textOpacity = useTransform(scrollYProgress, [0, 0.05, 0.4, 0.56], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.56], ["0%", "-14%"]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.55]);
  const endFadeOpacity = useTransform(scrollYProgress, [0.76, 1], [0, 1]);

  return (
    <>
      <motion.div style={{ opacity: scrimOpacity }} className="absolute inset-0 bg-forest-deep" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-transparent to-forest-deep/35" />
      <motion.div style={{ opacity: endFadeOpacity }} className="absolute inset-0 bg-forest-deep" />
      <div className="grain" />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <span className="eyebrow text-paper/70 mb-7">{hero.eyebrow}</span>
        <h1 className="font-display font-light text-paper text-[clamp(2.6rem,8.4vw,7.2rem)] leading-[1.03] tracking-[0.01em] max-w-5xl">
          {hero.titleLine1}
          <br />
          {hero.titleLine2}
        </h1>
        <p className="font-body text-paper/80 text-[17px] md:text-[19px] mt-8 max-w-lg leading-relaxed">
          {hero.tagline}
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-9 inset-x-0 flex flex-col items-center gap-3 z-10"
      >
        <span className="meta-row text-paper/55">Scroll to Begin the Ascent</span>
        <span className="h-10 w-px bg-paper/35 relative overflow-hidden">
          <span className="absolute top-0 left-0 h-full w-full bg-paper animate-[pulse_2.6s_ease-in-out_infinite]" />
        </span>
      </motion.div>
    </>
  );
}
