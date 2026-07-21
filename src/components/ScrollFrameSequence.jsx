import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import SectionGradientStrips from "./SectionGradientStrips";
import { resolveFrameImageSrc, ensureFrameManifest } from "../lib/frameUrls";

/**
 * Reusable scroll-scrubbed frame-sequence background.
 *
 * Draws a numbered sequence of frames onto a full-bleed <canvas> and maps
 * scroll progress through the section to a frame index — the same
 * "video controlled by scroll" mechanic as the home hero. Any section can
 * drop this in with its own frame set to get the same effect.
 *
 * Overlay content (text, scrims, gradients, etc.) is passed as `children`
 * and can read scroll progress / readiness via the `useFrameScroll()` hook.
 */

export const FrameScrollContext = createContext(null);

export function useFrameScroll() {
  const ctx = useContext(FrameScrollContext);
  if (!ctx) {
    throw new Error("useFrameScroll must be used inside a <ScrollFrameSequence>");
  }
  return ctx;
}

export default function ScrollFrameSequence({
  frameCount,
  framePath,
  ext = "jpg",
  scrubVh = 320,
  eagerCount = 24,
  workerCount = 5,
  bgClassName = "bg-ink",
  loadingLabel = "Loading\u2026",
  posterImage,
  overlay = 0,
  gradientTop,
  gradientBottom,
  sectionId = "hero",
  className = "",
  wrapperClassName = "",
  children,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(frameCount));
  const loadedRef = useRef(new Array(frameCount).fill(false));
  const lastDrawnRef = useRef(-1);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const frameUrl = useCallback(
    (index) => resolveFrameImageSrc(framePath, index, ext),
    [framePath, ext]
  );

  const drawFrame = useCallback(
    (rawIndex) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const total = frameCount;
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
    },
    [frameCount]
  );

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      drawFrame(v * (frameCount - 1));
    });
  }, [scrollYProgress, drawFrame, frameCount]);

  useEffect(() => {
    let cancelled = false;
    lastDrawnRef.current = -1;
    setReady(false);
    imagesRef.current = new Array(frameCount);
    loadedRef.current = new Array(frameCount).fill(false);

    const loadOne = (i) =>
      new Promise((resolve) => {
        const { src, crossOrigin } = frameUrl(i);
        const img = new Image();
        img.decoding = "async";
        if (crossOrigin) img.crossOrigin = "anonymous";
        img.onload = () => {
          if (cancelled) return resolve();
          imagesRef.current[i] = img;
          loadedRef.current[i] = true;
          if (i === 0) {
            setReady(true);
            drawFrame(0);
          } else if (Math.abs(i - Math.round(scrollYProgress.get() * (frameCount - 1))) < 3) {
            drawFrame(scrollYProgress.get() * (frameCount - 1));
          }
          resolve();
        };
        img.onerror = () => {
          if (import.meta.env.DEV) console.warn("Frame failed to load:", src);
          resolve();
        };
        img.src = src;
      });

    async function run() {
      await ensureFrameManifest();
      if (cancelled) return;
      const eager = Math.min(eagerCount, frameCount);
      for (let i = 0; i < eager; i++) {
        if (cancelled) return;
        await loadOne(i);
      }
      const rest = [];
      for (let i = eager; i < frameCount; i++) rest.push(i);
      let cursor = 0;
      const worker = async () => {
        while (cursor < rest.length) {
          const idx = rest[cursor++];
          if (cancelled) return;
          await loadOne(idx);
        }
      };
      await Promise.all(new Array(workerCount).fill(0).map(worker));
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framePath, ext]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      lastDrawnRef.current = -1;
      drawFrame(scrollYProgress.get() * (frameCount - 1));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawFrame]);

  return (
    <section
      ref={containerRef}
      className={`relative overflow-visible ${className}`}
      style={{ height: `calc(100vh + ${scrubVh}vh)` }}
    >
      <div className={`sticky top-0 h-screen overflow-visible ${bgClassName} ${wrapperClassName}`}>
        {posterImage && (
          <img
            src={posterImage}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />

        {overlay > 0 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ backgroundColor: `rgb(var(--color-ink) / ${overlay})` }}
          />
        )}

        {!ready && !posterImage && (
          <div className={`absolute inset-0 z-[1] flex items-center justify-center ${bgClassName}`}>
            <span className="meta text-paper/50">{loadingLabel}</span>
          </div>
        )}

        <div className="absolute inset-0 z-10">
          <FrameScrollContext.Provider value={{ scrollYProgress, ready }}>{children}</FrameScrollContext.Provider>
        </div>
      </div>

      <SectionGradientStrips
        background={{ gradientTop, gradientBottom }}
        sectionId={sectionId}
      />
    </section>
  );
}
