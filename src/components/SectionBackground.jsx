import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollFrameSequence from "./ScrollFrameSequence";
import SectionGradientStrips from "./SectionGradientStrips";
import { getSequence } from "../lib/frameSequences";

/**
 * Outer <section> wrapper whose background mode is driven by config,
 * editable per-section from the editor panel's Backgrounds tab.
 */
export default function SectionBackground({
  background,
  sectionId = "hero",
  className = "",
  loadingLabel,
  children,
}) {
  const type = background?.type || "color";

  if (type === "scrub") {
    return (
      <ScrubBackground
        background={background}
        sectionId={sectionId}
        className={className}
        loadingLabel={loadingLabel}
      >
        {children}
      </ScrubBackground>
    );
  }

  if (type === "image" && background?.image) {
    return (
      <ImageBackground background={background} sectionId={sectionId} className={className}>
        {children}
      </ImageBackground>
    );
  }

  return (
    <section
      className={`relative overflow-visible ${className}`}
      style={background?.color ? { backgroundColor: background.color } : undefined}
    >
      <SectionGradientStrips background={background} sectionId={sectionId} />
      {children}
    </section>
  );
}

function ScrubBackground({ background, sectionId, className, loadingLabel, children }) {
  const seq = getSequence(background.sequenceId);
  return (
    <ScrollFrameSequence
      frameCount={seq.frameCount}
      framePath={seq.path}
      ext={seq.ext}
      scrubVh={background.scrubVh ?? 320}
      overlay={Number(background.overlay) || 0}
      wrapperClassName={className}
      loadingLabel={loadingLabel}
      posterImage={background.posterImage}
      gradientTop={background.gradientTop}
      gradientBottom={background.gradientBottom}
      sectionId={sectionId}
    >
      {children}
    </ScrollFrameSequence>
  );
}

function ImageBackground({ background, sectionId, className, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.22]);

  return (
    <section ref={ref} className={`relative overflow-visible ${className}`}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={background.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-ink/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
      {Number(background.overlay) > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ backgroundColor: `rgb(var(--color-ink) / ${Number(background.overlay)})` }}
        />
      )}
      <SectionGradientStrips background={background} sectionId={sectionId} />
      {children}
    </section>
  );
}
