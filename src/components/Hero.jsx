import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 289;
const FRAME_PATH = "/frames/ascent/frame_";
const SCRUB_VH = 320;

function frameUrl(index) {
  return `${FRAME_PATH}${String(index + 1).padStart(4, "0")}.webp`;
}

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(FRAME_COUNT));
  const loadedRef = useRef(new Array(FRAME_COUNT).fill(false));
  const lastDrawnRef = useRef(-1);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const frameIndexMV = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.05, 0.4, 0.56], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.56], ["0%", "-14%"]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.55]);
  const endFadeOpacity = useTransform(scrollYProgress, [0.76, 1], [0, 1]);

  const drawFrame = useCallback((rawIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const total = FRAME_COUNT;
    let target = Math.round(rawIndex);
    target = Math.max(0, Math.min(total - 1, target));

    let drawIndex = target;
    if (!loadedRef.current[drawIndex]) {
      let found = -1;
      for (let d = 1; d <= total; d++) {
        const before = target - d;
        const after = target + d;
        if (before >= 0 && loadedRef.current[before]) {
          found = before;
          break;
        }
        if (after < total && loadedRef.current[after]) {
          found = after;
          break;
        }
      }
      if (found === -1) return;
      drawIndex = found;
    }

    if (drawIndex === lastDrawnRef.current) return;
    const img = imagesRef.current[drawIndex];
    if (!img) return;

    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    lastDrawnRef.current = drawIndex;
  }, []);

  useMotionValueEvent(scrollYProgress, "change", () => {
    drawFrame(frameIndexMV.get());
  });

  useEffect(() => {
    let cancelled = false;

    const loadOne = (i) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return resolve();
          imagesRef.current[i] = img;
          loadedRef.current[i] = true;
          if (i === 0) {
            setReady(true);
            drawFrame(0);
          } else if (lastDrawnRef.current === -1 || Math.abs(i - Math.round(frameIndexMV.get())) < 3) {
            drawFrame(frameIndexMV.get());
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameUrl(i);
      });

    async function run() {
      const eagerCount = Math.min(28, FRAME_COUNT);
      for (let i = 0; i < eagerCount; i++) {
        if (cancelled) return;
        await loadOne(i);
      }
      const rest = [];
      for (let i = eagerCount; i < FRAME_COUNT; i++) rest.push(i);
      let cursor = 0;
      const worker = async () => {
        while (cursor < rest.length) {
          const idx = rest[cursor++];
          if (cancelled) return;
          await loadOne(idx);
        }
      };
      await Promise.all(new Array(5).fill(0).map(worker));
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      lastDrawnRef.current = -1;
      drawFrame(frameIndexMV.get());
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawFrame]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `calc(100vh + ${SCRUB_VH}vh)` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-forest-deep">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-forest-deep">
            <span className="meta-row text-paper/50">Entering the Understory&hellip;</span>
          </div>
        )}

        <motion.div style={{ opacity: scrimOpacity }} className="absolute inset-0 bg-forest-deep" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-transparent to-forest-deep/35" />
        <motion.div style={{ opacity: endFadeOpacity }} className="absolute inset-0 bg-forest-deep" />
        <div className="grain" />

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
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

        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-9 inset-x-0 flex flex-col items-center gap-3 z-10"
        >
          <span className="meta-row text-paper/55">Scroll to Begin the Ascent</span>
          <span className="h-10 w-px bg-paper/35 relative overflow-hidden">
            <span className="absolute top-0 left-0 h-full w-full bg-paper animate-[pulse_2.6s_ease-in-out_infinite]" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
