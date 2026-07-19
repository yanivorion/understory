import React from "react";

const MANIFEST = {
  "type": "Typography.GlitchMatrix",
  "description": "Digital glitch effect with scan lines, RGB split, and matrix-style data corruption",
  "editorElement": {
    "selector": ".glitch-matrix",
    "displayName": "Glitch Matrix",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "SYSTEM ERROR",
        "group": "Content"
      },
      "showReplayButton": {
        "dataType": "booleanValue",
        "displayName": "Show Replay Button",
        "defaultValue": true,
        "group": "Content"
      },
      "triggerMode": {
        "dataType": "select",
        "displayName": "Trigger Mode",
        "defaultValue": "entrance",
        "options": ["entrance", "scroll", "manual"],
        "group": "Content"
      },
      "glitchIntensity": {
        "dataType": "select",
        "displayName": "Glitch Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "extreme"],
        "group": "Animation"
      },
      "glitchDuration": {
        "dataType": "select",
        "displayName": "Total Duration (ms)",
        "defaultValue": "2000",
        "options": ["1500", "2000", "2500", "3000"],
        "group": "Animation"
      },
      "glitchIterations": {
        "dataType": "select",
        "displayName": "Glitch Iterations",
        "defaultValue": "20",
        "options": ["15", "20", "25", "30"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#00FF00",
        "group": "Colors"
      },
      "glitchColor1": {
        "dataType": "color",
        "displayName": "Glitch Color 1 (Cyan)",
        "defaultValue": "#00FFFF",
        "group": "Colors"
      },
      "glitchColor2": {
        "dataType": "color",
        "displayName": "Glitch Color 2 (Magenta)",
        "defaultValue": "#FF00FF",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 80,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const text = config?.text || "SYSTEM ERROR";
  const showReplayButton = config?.showReplayButton !== false;
  const triggerMode = config?.triggerMode || "entrance";
  const glitchIntensity = config?.glitchIntensity || "medium";
  const glitchDuration = parseInt(config?.glitchDuration || "2000");
  const glitchIterations = parseInt(config?.glitchIterations || "20");
  const backgroundColor = config?.backgroundColor || "#000000";
  const textColor = config?.textColor || "#00FF00";
  const glitchColor1 = config?.glitchColor1 || "#00FFFF";
  const glitchColor2 = config?.glitchColor2 || "#FF00FF";
  const fontSize = parseInt(config?.fontSize || "80");
  const fontWeight = config?.fontWeight || "500";

  const containerRef = React.useRef(null);
  const [glitchState, setGlitchState] = React.useState({
    offsetX: 0,
    offsetY: 0,
    rgbSplit: 0,
    scrambleChars: [],
    scanLine: 0,
    isVisible: false
  });
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const intensityMultiplier = {
    subtle: 0.5,
    medium: 1.0,
    extreme: 1.5
  }[glitchIntensity];

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const animate = React.useCallback(() => {
    if (prefersReducedMotion) {
      setGlitchState({
        offsetX: 0,
        offsetY: 0,
        rgbSplit: 0,
        scrambleChars: text.split('').map(c => ({ char: c, scrambled: c })),
        scanLine: 0,
        isVisible: true
      });
      setHasAnimated(true);
      return;
    }

    let iteration = 0;
    const iterationDuration = glitchDuration / glitchIterations;

    const glitchInterval = setInterval(() => {
      const progress = iteration / glitchIterations;
      const intensity = Math.sin(progress * Math.PI) * intensityMultiplier;

      // Random glitch parameters
      const offsetX = (Math.random() - 0.5) * 30 * intensity;
      const offsetY = (Math.random() - 0.5) * 20 * intensity;
      const rgbSplit = Math.random() * 8 * intensity;
      const scanLine = Math.random() * 100;

      // Character scrambling - decreases over time
      const scrambleChars = text.split('').map((char, idx) => {
        const shouldScramble = Math.random() < (1 - progress) * 0.7;
        if (char === ' ' || !shouldScramble) {
          return { char, scrambled: char };
        }
        const scrambled = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        return { char, scrambled };
      });

      setGlitchState({
        offsetX,
        offsetY,
        rgbSplit,
        scrambleChars,
        scanLine,
        isVisible: true
      });

      iteration++;

      if (iteration >= glitchIterations) {
        clearInterval(glitchInterval);
        // Final state - clear and stable
        setGlitchState({
          offsetX: 0,
          offsetY: 0,
          rgbSplit: 0,
          scrambleChars: text.split('').map(c => ({ char: c, scrambled: c })),
          scanLine: 0,
          isVisible: true
        });
        setHasAnimated(true);
      }
    }, iterationDuration);
  }, [text, glitchDuration, glitchIterations, intensityMultiplier, prefersReducedMotion]);

  const handleReplay = () => {
    setHasAnimated(false);
    setGlitchState({ offsetX: 0, offsetY: 0, rgbSplit: 0, scrambleChars: [], scanLine: 0, isVisible: false });
    setTimeout(animate, 50);
  };

  React.useEffect(() => {
    if (triggerMode === 'manual') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerMode === 'entrance' && hasAnimated) return;
            animate();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerMode, hasAnimated, animate]);

  return (
    <div
      ref={containerRef}
      className="glitch-matrix"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '400px',
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        overflow: 'hidden'
      }}
    >
      {/* Scan line effect */}
      <div
        style={{
          position: 'absolute',
          top: `${glitchState.scanLine}%`,
          left: 0,
          width: '100%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${textColor}40, transparent)`,
          pointerEvents: 'none',
          opacity: glitchState.isVisible ? 0.5 : 0,
          transition: 'opacity 100ms'
        }}
      />

      {/* Main text with RGB split */}
      <div
        style={{
          position: 'relative',
          fontSize: `clamp(32px, ${fontSize}px, 10vw)`,
          fontWeight,
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: glitchState.isVisible ? 1 : 0
        }}
      >
        {/* Red channel (offset left) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            color: glitchColor2,
            transform: prefersReducedMotion ? 'none' : `translate(${-glitchState.rgbSplit}px, ${glitchState.offsetY}px)`,
            mixBlendMode: 'screen',
            opacity: 0.7
          }}
        >
          {glitchState.scrambleChars.map((item, idx) => (
            <span key={`r-${idx}`}>{item.scrambled === ' ' ? '\u00A0' : item.scrambled}</span>
          ))}
        </div>

        {/* Blue channel (offset right) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            color: glitchColor1,
            transform: prefersReducedMotion ? 'none' : `translate(${glitchState.rgbSplit}px, ${-glitchState.offsetY}px)`,
            mixBlendMode: 'screen',
            opacity: 0.7
          }}
        >
          {glitchState.scrambleChars.map((item, idx) => (
            <span key={`b-${idx}`}>{item.scrambled === ' ' ? '\u00A0' : item.scrambled}</span>
          ))}
        </div>

        {/* Green channel (main) */}
        <div
          style={{
            position: 'relative',
            color: textColor,
            transform: prefersReducedMotion ? 'none' : `translate(${glitchState.offsetX}px, 0)`,
            textShadow: `0 0 10px ${textColor}80`
          }}
        >
          {glitchState.scrambleChars.map((item, idx) => (
            <span key={`g-${idx}`}>{item.char === ' ' ? '\u00A0' : item.char}</span>
          ))}
        </div>
      </div>

      {showReplayButton && (
        <button
          onClick={handleReplay}
          style={{
            position: 'absolute',
            bottom: '40px',
            padding: '12px 28px',
            backgroundColor: 'transparent',
            border: `1px solid ${textColor}`,
            borderRadius: '0',
            color: textColor,
            fontSize: '13px',
            fontWeight: '400',
            fontFamily: 'monospace',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 200ms ease',
            opacity: 0.7
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '1';
            e.target.style.backgroundColor = `${textColor}20`;
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.7';
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          REBOOT
        </button>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
