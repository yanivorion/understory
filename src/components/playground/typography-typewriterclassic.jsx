import React from "react";

const MANIFEST = {
  "type": "Typography.TypewriterClassic",
  "description": "Authentic typewriter effect with carriage return and key strike with blinking cursor",
  "editorElement": {
    "selector": ".typewriter-classic",
    "displayName": "Typewriter Mechanical",
    "archetype": "container",
    "data": {
      "text": {"dataType": "text", "displayName": "Text Content", "defaultValue": "CLASSIC TYPE", "group": "Content"},
      "showReplayButton": {"dataType": "booleanValue", "displayName": "Show Replay Button", "defaultValue": true, "group": "Content"},
      "triggerMode": {"dataType": "select", "displayName": "Trigger Mode", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Content"},
      "typeSpeed": {"dataType": "select", "displayName": "Type Speed (ms)", "defaultValue": "120", "options": ["80", "100", "120", "150"], "group": "Animation"},
      "showCursor": {"dataType": "booleanValue", "displayName": "Show Cursor", "defaultValue": true, "group": "Content"},
      "cursorBlinkSpeed": {"dataType": "select", "displayName": "Cursor Blink (ms)", "defaultValue": "500", "options": ["400", "500", "600", "700"], "group": "Animation"},
      "backgroundColor": {"dataType": "color", "displayName": "Background Color", "defaultValue": "#F8F9FA", "group": "Colors"},
      "textColor": {"dataType": "color", "displayName": "Text Color", "defaultValue": "#212529", "group": "Colors"},
      "cursorColor": {"dataType": "color", "displayName": "Cursor Color", "defaultValue": "#212529", "group": "Colors"},
      "fontSize": {"dataType": "number", "displayName": "Font Size (px)", "defaultValue": 72, "group": "Typography"},
      "fontWeight": {"dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography"}
    }
  }
};

function Component({ config = {} }) {
  const text = config?.text || "CLASSIC TYPE";
  const showReplayButton = config?.showReplayButton !== false;
  const triggerMode = config?.triggerMode || "entrance";
  const typeSpeed = parseInt(config?.typeSpeed || "120");
  const showCursor = config?.showCursor !== false;
  const cursorBlinkSpeed = parseInt(config?.cursorBlinkSpeed || "500");
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const cursorColor = config?.cursorColor || "#212529";
  const fontSize = parseInt(config?.fontSize || "72");
  const fontWeight = config?.fontWeight || "400";

  const containerRef = React.useRef(null);
  const [typedText, setTypedText] = React.useState("");
  const [cursorVisible, setCursorVisible] = React.useState(true);
  const [isTyping, setIsTyping] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const animate = React.useCallback(() => {
    if (prefersReducedMotion) {
      setTypedText(text);
      setHasAnimated(true);
      return;
    }

    setTypedText("");
    setIsTyping(true);
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setTypedText(text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setHasAnimated(true);
      }
    }, typeSpeed);
  }, [text, typeSpeed, prefersReducedMotion]);

  // Cursor blink
  React.useEffect(() => {
    if (!showCursor) return;
    
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(blinkInterval);
  }, [showCursor, cursorBlinkSpeed]);

  const handleReplay = () => {
    setHasAnimated(false);
    setTypedText("");
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

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [triggerMode, hasAnimated, animate]);

  return (
    <div ref={containerRef} className="typewriter-classic" style={{
      position: 'relative', width: '100%', minHeight: '400px', backgroundColor,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '60px 40px', overflow: 'hidden'
    }}>
      <div style={{
        fontSize: `clamp(32px, ${fontSize}px, 10vw)`,
        fontWeight,
        fontFamily: 'monospace',
        color: textColor,
        textAlign: 'center',
        letterSpacing: '0.05em'
      }}>
        {typedText}
        {showCursor && (
          <span style={{
            borderRight: `3px solid ${cursorColor}`,
            marginLeft: '2px',
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 100ms'
          }}>&nbsp;</span>
        )}
      </div>

      {showReplayButton && (
        <button onClick={handleReplay} style={{
          position: 'absolute', bottom: '40px', padding: '12px 28px', backgroundColor: 'transparent',
          border: `1px solid ${textColor}40`, borderRadius: '4px', color: textColor,
          fontSize: '13px', fontWeight: '400', letterSpacing: '0.1em', textTransform: 'uppercase',
          cursor: 'pointer', transition: 'all 300ms ease', opacity: 0.6
        }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.6'}>
          Type Again
        </button>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
