import { useContext } from "react";
import { motion, useTransform } from "framer-motion";
import { FrameScrollContext } from "./ScrollFrameSequence";
import { useSiteConfig } from "../lib/ConfigProvider";
import { useTextStyle } from "./StyledText";

/**
 * Text + scrim overlay for the home hero. When the hero background is in
 * "scrub" mode it reads scroll progress from the surrounding
 * <ScrollFrameSequence> (via context) and animates in/out with the frames.
 */
export default function HeroOverlay() {
  const frameScroll = useContext(FrameScrollContext);
  const { config } = useSiteConfig();
  const hero = config.hero;

  if (frameScroll) {
    return <ScrubbedOverlay hero={hero} scrollYProgress={frameScroll.scrollYProgress} />;
  }
  return <StaticOverlay hero={hero} />;
}

function ScrubbedOverlay({ hero, scrollYProgress }) {
  const titleOpacity = useTransform(scrollYProgress, [0, 0.32, 0.5], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-40%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const vignette = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.32, 0.62]);
  const greenWash = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <>
      <motion.div
        style={{ opacity: vignette }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      <motion.div
        style={{ opacity: greenWash }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bark via-bark/50 to-transparent"
      />

      <motion.div
        style={{ opacity: titleOpacity, y: titleY }}
        className="relative z-10 mx-auto flex h-full max-w-container flex-col items-start justify-center px-6 md:px-10"
      >
        <HeroText hero={hero} />
      </motion.div>

      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <HeroScrollHint text={hero.scrollHint} />
      </motion.div>
    </>
  );
}

function StaticOverlay({ hero }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/70" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative z-10 mx-auto flex h-full max-w-container flex-col items-start justify-center px-6 md:px-10"
      >
        <HeroText hero={hero} />
      </motion.div>
    </>
  );
}

function HeroScrollHint({ text }) {
  const hintStyle = useTextStyle("hero.scrollHint");
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="meta" style={hintStyle}>
        {text}
      </span>
      <span className="h-12 w-px bg-gradient-to-b from-fog/50 to-transparent" />
    </div>
  );
}

function HeroText({ hero }) {
  const eyebrowStyle = useTextStyle("hero.eyebrow");
  const titleStyle = useTextStyle("hero.title");
  const taglineStyle = useTextStyle("hero.tagline");

  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        className="eyebrow"
        style={eyebrowStyle}
      >
        {hero.eyebrow}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
        className="display mt-6 max-w-4xl text-[13vw] md:text-[6.5rem]"
        style={titleStyle}
      >
        {hero.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
        className="prose-serif mt-8 max-w-md"
        style={taglineStyle}
      >
        {hero.tagline}
      </motion.p>
    </>
  );
}
