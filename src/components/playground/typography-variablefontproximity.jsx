import React from "react";

const MANIFEST = {
  "type": "Typography.VariableFontProximity",
  "description": "Cursor proximity effect with variable font weight and slant - characters respond to mouse position",
  "editorElement": {
    "selector": ".variable-font-proximity",
    "displayName": "Variable Font Proximity",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "PRESSURE",
        "group": "Content"
      },
      "proximityRadius": {
        "dataType": "select",
        "displayName": "Proximity Radius (px)",
        "defaultValue": "300",
        "options": ["200", "250", "300", "350", "400"],
        "group": "Animation",
        "description": "Distance from cursor for effect"
      },
      "minWeight": {
        "dataType": "select",
        "displayName": "Minimum Font Weight",
        "defaultValue": "300",
        "options": ["100", "200", "300", "400"],
        "group": "Typography"
      },
      "maxWeight": {
        "dataType": "select",
        "displayName": "Maximum Font Weight",
        "defaultValue": "1000",
        "options": ["700", "800", "900", "1000"],
        "group": "Typography"
      },
      "slantAmount": {
        "dataType": "select",
        "displayName": "Max Slant Amount",
        "defaultValue": "-15",
        "options": ["-20", "-15", "-10", "-5", "0"],
        "group": "Animation",
        "description": "Negative = italic slant"
      },
      "scaleAmount": {
        "dataType": "select",
        "displayName": "Scale Multiplier",
        "defaultValue": "0.1",
        "options": ["0.05", "0.1", "0.15", "0.2"],
        "group": "Animation",
        "description": "How much characters scale up"
      },
      "returnSpeed": {
        "dataType": "select",
        "displayName": "Return Speed (s)",
        "defaultValue": "0.5",
        "options": ["0.3", "0.4", "0.5", "0.6", "0.8"],
        "group": "Animation",
        "description": "Speed returning to normal"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 120,
        "group": "Typography"
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
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "showCrosshair": {
        "dataType": "booleanValue",
        "displayName": "Show Crosshair Cursor",
        "defaultValue": true,
        "group": "Content"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const text = config?.text || "PRESSURE";
  const proximityRadius = parseInt(config?.proximityRadius || "300");
  const minWeight = parseInt(config?.minWeight || "300");
  const maxWeight = parseInt(config?.maxWeight || "1000");
  const slantAmount = parseInt(config?.slantAmount || "-15");
  const scaleAmount = parseFloat(config?.scaleAmount || "0.1");
  const returnSpeed = parseFloat(config?.returnSpeed || "0.5");
  const fontSize = parseInt(config?.fontSize || "120");
  const backgroundColor = config?.backgroundColor || "#000000";
  const textColor = config?.textColor || "#FFFFFF";
  const showCrosshair = config?.showCrosshair !== false;

  const containerRef = React.useRef(null);
  const charRefs = React.useRef([]);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const animationFrameRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const characters = text.split('').map((char, idx) => ({
    char: char === ' ' ? '\u00A0' : char,
    index: idx
  }));

  // Clamp function
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Mouse move handler
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      // Reset all characters with smooth transition
      charRefs.current.forEach(char => {
        if (char) {
          char.style.transition = `all ${returnSpeed}s ease`;
          char.style.fontVariationSettings = `'wght' ${minWeight}, 'slnt' 0`;
          char.style.transform = 'scale(1)';
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [returnSpeed, minWeight, prefersReducedMotion]);

  // Animation loop for instant updates
  React.useEffect(() => {
    if (prefersReducedMotion || !isHovering) return;

    const updateCharacters = () => {
      charRefs.current.forEach(char => {
        if (!char) return;

        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        // Calculate distance from mouse to character center
        const dx = mousePos.x - charCenterX;
        const dy = mousePos.y - charCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate proximity (0 = far, 1 = at cursor)
        const proximity = clamp(1 - distance / proximityRadius, 0, 1);

        // Apply effects instantly (no transition during interaction)
        char.style.transition = 'none';
        
        // Weight: interpolate between min and max
        const weight = minWeight + ((maxWeight - minWeight) * proximity);
        
        // Slant: 0 at rest, slantAmount at full proximity
        const slant = slantAmount * proximity;
        
        // Scale: 1 at rest, 1 + scaleAmount at full proximity
        const scale = 1 + (scaleAmount * proximity);

        char.style.fontVariationSettings = `'wght' ${weight}, 'slnt' ${slant}`;
        char.style.transform = `scale(${scale})`;
      });

      animationFrameRef.current = requestAnimationFrame(updateCharacters);
    };

    updateCharacters();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, isHovering, proximityRadius, minWeight, maxWeight, slantAmount, scaleAmount, prefersReducedMotion]);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Recursive:slnt,wght,CASL,MONO@-15..0,300..1000,0..1,0..1&display=swap');
        `}
      </style>

      <div
        ref={containerRef}
        className="variable-font-proximity"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: showCrosshair ? 'crosshair' : 'default'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: "'Recursive', monospace",
            fontSize: `clamp(32px, ${fontSize}px, 20vw)`,
            lineHeight: 1,
            color: textColor,
            userSelect: 'none'
          }}
        >
          {characters.map((item, idx) => (
            <span
              key={idx}
              ref={el => charRefs.current[idx] = el}
              style={{
                display: 'inline-block',
                fontVariationSettings: prefersReducedMotion ? `'wght' ${minWeight}, 'slnt' 0` : undefined,
                willChange: 'transform, font-variation-settings',
                transformOrigin: 'center'
              }}
            >
              {item.char}
            </span>
          ))}
        </div>

        {/* Instructions */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '14px',
            color: textColor,
            opacity: 0.4,
            fontFamily: "'Recursive', monospace",
            fontVariationSettings: "'wght' 400",
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          Move cursor over text
        </div>
      </div>
    </>
  );
}

export { MANIFEST, Component };
export default Component;
