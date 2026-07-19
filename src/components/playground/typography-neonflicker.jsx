import React from "react";

const MANIFEST = {
  "type": "Typography.NeonFlicker",
  "description": "Neon sign style flicker entrance with power-on sequence and electrical hum effect",
  "editorElement": {
    "selector": ".neon-flicker",
    "displayName": "Neon Flicker",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "NEON NIGHTS",
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
      "flickerStyle": {
        "dataType": "select",
        "displayName": "Flicker Style",
        "defaultValue": "realistic",
        "options": ["realistic", "fast", "slow", "erratic"],
        "group": "Animation"
      },
      "warmUpDuration": {
        "dataType": "select",
        "displayName": "Warm-up Duration (ms)",
        "defaultValue": "2000",
        "options": ["1500", "2000", "2500", "3000"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#0A0A0A",
        "group": "Colors"
      },
      "neonColor": {
        "dataType": "color",
        "displayName": "Neon Color",
        "defaultValue": "#FF006E",
        "group": "Colors"
      },
      "glowColor": {
        "dataType": "color",
        "displayName": "Glow Color",
        "defaultValue": "#FF1493",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 90,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
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
  const text = config?.text || "NEON NIGHTS";
  const showReplayButton = config?.showReplayButton !== false;
  const triggerMode = config?.triggerMode || "entrance";
  const flickerStyle = config?.flickerStyle || "realistic";
  const warmUpDuration = parseInt(config?.warmUpDuration || "2000");
  const backgroundColor = config?.backgroundColor || "#0A0A0A";
  const neonColor = config?.neonColor || "#FF006E";
  const glowColor = config?.glowColor || "#FF1493";
  const fontSize = parseInt(config?.fontSize || "90");
  const fontWeight = config?.fontWeight || "400";

  const containerRef = React.useRef(null);
  const [brightness, setBrightness] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const flickerPatterns = {
    realistic: [0, 0.3, 0, 0.7, 0.2, 1, 0.9, 1, 0.8, 1],
    fast: [0, 1, 0, 1, 0, 1, 1, 1],
    slow: [0, 0.2, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
    erratic: [0, 0.5, 0.1, 0.8, 0.3, 1, 0.7, 1, 0.9, 0.6, 1]
  };

  const pattern = flickerPatterns[flickerStyle] || flickerPatterns.realistic;

  const animate = React.useCallback(() => {
    if (prefersReducedMotion) {
      setBrightness(1);
      setHasAnimated(true);
      return;
    }

    let currentStep = 0;
    const stepDuration = warmUpDuration / pattern.length;

    const flickerInterval = setInterval(() => {
      setBrightness(pattern[currentStep]);
      currentStep++;

      if (currentStep >= pattern.length) {
        clearInterval(flickerInterval);
        setBrightness(1);
        setHasAnimated(true);
      }
    }, stepDuration);
  }, [warmUpDuration, pattern, prefersReducedMotion]);

  const handleReplay = () => {
    setHasAnimated(false);
    setBrightness(0);
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

  const glowIntensity = brightness * 40;

  return (
    <div
      ref={containerRef}
      className="neon-flicker"
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
      <div
        style={{
          fontSize: `clamp(36px, ${fontSize}px, 12vw)`,
          fontWeight,
          fontFamily: 'system-ui',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: neonColor,
          opacity: prefersReducedMotion ? 1 : brightness,
          textShadow: prefersReducedMotion ? `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}` : `
            0 0 ${glowIntensity * 0.25}px ${glowColor},
            0 0 ${glowIntensity * 0.5}px ${glowColor},
            0 0 ${glowIntensity}px ${glowColor},
            0 0 ${glowIntensity * 1.5}px ${glowColor}
          `,
          transition: prefersReducedMotion ? 'none' : 'opacity 50ms, text-shadow 50ms',
          willChange: 'opacity, text-shadow'
        }}
      >
        {text}
      </div>

      {showReplayButton && (
        <button
          onClick={handleReplay}
          style={{
            position: 'absolute',
            bottom: '40px',
            padding: '12px 28px',
            backgroundColor: 'transparent',
            border: `1px solid ${neonColor}60`,
            borderRadius: '4px',
            color: neonColor,
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 300ms ease',
            opacity: 0.6,
            boxShadow: `0 0 10px ${glowColor}00`
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '1';
            e.target.style.boxShadow = `0 0 20px ${glowColor}60`;
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.6';
            e.target.style.boxShadow = `0 0 10px ${glowColor}00`;
          }}
        >
          Power On
        </button>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
