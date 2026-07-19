import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.22]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.32, 0.72]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100vh] min-h-[640px] overflow-hidden bg-forest-deep">
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <img
          src="/images/home-hero.jpg"
          alt="A lone figure walking a soft dirt path into the forest at golden hour"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-forest-deep" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-transparent to-forest-deep/70" />
      <div className="grain" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <span className="eyebrow text-paper/70 mb-7">Understory &middot; Nature &amp; Sound Journeys</span>
        <h1 className="font-display font-extrabold text-paper text-[clamp(2.6rem,8.4vw,7.2rem)] leading-[1.03] tracking-[0.01em] max-w-5xl">
          Return to What
          <br />
          Remembers You
        </h1>
        <p className="font-body text-paper/80 text-[17px] md:text-[19px] mt-8 max-w-lg leading-relaxed">
          Guided journeys where nature and sound meet the self
        </p>
      </motion.div>

      <div className="absolute bottom-9 inset-x-0 flex flex-col items-center gap-3 z-10">
        <span className="meta-row text-paper/55">Scroll to Begin</span>
        <span className="h-10 w-px bg-paper/35 relative overflow-hidden">
          <span className="absolute top-0 left-0 h-full w-full bg-paper animate-[pulse_2.6s_ease-in-out_infinite]" />
        </span>
      </div>
    </section>
  );
}
