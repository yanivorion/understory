import React from "react";

const MANIFEST = {
  "type": "Typography.CharacterScramble",
  "description": "Random character replacement cycling to correct letters",
  "editorElement": {
    "selector": ".characterscramble",
    "displayName": "Character Swap Scramble",
    "archetype": "container",
    "data": {
      "text": {"dataType": "text", "displayName": "Text", "defaultValue": "DECRYPTING", "group": "Content"},
      "showReplayButton": {"dataType": "booleanValue", "displayName": "Show Replay", "defaultValue": true, "group": "Content"},
      "triggerMode": {"dataType": "select", "displayName": "Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Content"},

      "cycleSpeed": {"dataType": "select", "displayName": "Cycle Speed (ms)", "defaultValue": "80", "options": ["60", "80", "100", "120"], "group": "Animation"},
      "totalCycles": {"dataType": "select", "displayName": "Total Cycles", "defaultValue": "15", "options": ["10", "15", "20", "25"], "group": "Animation"},
      "characterSet": {"dataType": "select", "displayName": "Character Set", "defaultValue": "alphanumeric", "options": ["alphanumeric", "symbols", "mixed"], "group": "Animation"},
      "backgroundColor": {"dataType": "color", "displayName": "Background", "defaultValue": "#F8F9FA", "group": "Colors"},
      "textColor": {"dataType": "color", "displayName": "Text Color", "defaultValue": "#212529", "group": "Colors"},
      "fontSize": {"dataType": "number", "displayName": "Font Size", "defaultValue": 72, "group": "Typography"},
      "fontWeight": {"dataType": "select", "displayName": "Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography"}
    }
  }
};

function Component({ config = {} }) {
  // Safe config extraction with defaults
  const text = config?.text || "DECRYPTING";
  const showReplayButton = config?.showReplayButton !== false;
  const triggerMode = config?.triggerMode || "entrance";
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const fontSize = parseInt(config?.fontSize || "72");
  const fontWeight = config?.fontWeight || "400";

  const containerRef = React.useRef(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const animate = React.useCallback(() => {
    if (prefersReducedMotion) {
      setIsAnimating(true);
      setHasAnimated(true);
      return;
    }

    setIsAnimating(true);
    setHasAnimated(true);
    
    // Animation implementation would go here
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  }, [prefersReducedMotion]);

  const handleReplay = () => {
    setHasAnimated(false);
    setIsAnimating(false);
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
      className="characterscramble"
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
          fontSize: `clamp(32px, ${fontSize}px, 10vw)`,
          fontWeight,
          color: textColor,
          textAlign: 'center',
          opacity: isAnimating || hasAnimated ? 1 : 0,
          transition: 'opacity 300ms ease'
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
            border: `1px solid ${textColor}40`,
            borderRadius: '4px',
            color: textColor,
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 300ms ease',
            opacity: 0.6
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.6'}
        >
          Replay
        </button>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
