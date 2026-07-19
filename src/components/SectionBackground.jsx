import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollFrameSequence from "./ScrollFrameSequence";
import { getSequence } from "../lib/frameSequences";

/**
 * Outer <section> wrapper whose background mode is driven by config,
 * editable per-section from the editor panel's Backgrounds tab:
 *
 *   { type: "color", color }                        — flat background color
 *   { type: "image", image, overlay }                — image + dark overlay, gentle parallax zoom
 *   { type: "scrub", sequenceId, scrubVh, overlay }   — scroll-scrubbed frame sequence, pinned
 *
 * `children` is the section's normal foreground content in every mode. In
 * "scrub" mode the section becomes viewport-pinned while frames scrub —
 * content works best when it comfortably fits one viewport.
 */
export default function SectionBackground({ background, className = "", loadingLabel, children }) {
  const type = background?.type || "color";

  if (type === "scrub") {
    return (
      <ScrubBackground background={background} className={className} loadingLabel={loadingLabel}>
        {children}
      </ScrubBackground>
    );
  }

  if (type === "image" && background?.image) {
    return (
      <ImageBackground background={background} className={className}>
        {children}
      </ImageBackground>
    );
  }

  return (
    <section
      className={`relative ${className}`}
      style={background?.color ? { backgroundColor: background.color } : undefined}
    >
      {children}
    </section>
  );
}

function ScrubBackground({ background, className, loadingLabel, children }) {
  const seq = getSequence(background.sequenceId);
  return (
    <ScrollFrameSequence
      frameCount={seq.frameCount}
      framePath={seq.path}
      ext={seq.ext}
      scrubVh={background.scrubVh ?? 320}
      wrapperClassName={className}
      loadingLabel={loadingLabel}
      posterImage={background.posterImage}
    >
      {background.overlay > 0 && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink pointer-events-none"
          style={{ opacity: background.overlay }}
        />
      )}
      {children}
    </ScrollFrameSequence>
  );
}

function ImageBackground({ background, className, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.22]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={background.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
      </motion.div>
      {/* Baseline legibility wash — always on for image backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-ink/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
      {background.overlay > 0 && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink pointer-events-none"
          style={{ opacity: background.overlay }}
        />
      )}
      {children}
    </section>
  );
}
