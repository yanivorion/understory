import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 16, 2025, 02:47 PM
 * Component Type: Text.VariableFontCursorProximity
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Text.VariableFontCursorProximity",
  "description": "Kinetic typography component where individual characters dynamically respond to cursor proximity by smoothly transitioning their font weight and slant through variable font technology, creating an immersive interactive text experience",
  "editorElement": {
    "selector": ".variable-font-proximity-container",
    "displayName": "Variable Font Cursor Proximity",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "Extraordinary",
        "group": "Content",
        "description": "The text that will respond to cursor proximity"
      },
      "fromFontVariationSettings": {
        "dataType": "text",
        "displayName": "Base Font Settings",
        "defaultValue": "'wght' 400, 'slnt' 0",
        "group": "Typography",
        "description": "CSS font-variation-settings for default state (e.g., 'wght' 400, 'slnt' 0)"
      },
      "toFontVariationSettings": {
        "dataType": "text",
        "displayName": "Proximity Font Settings",
        "defaultValue": "'wght' 900, 'slnt' -10",
        "group": "Typography",
        "description": "CSS font-variation-settings when cursor is near (e.g., 'wght' 900, 'slnt' -10)"
      },
      "radius": {
        "dataType": "select",
        "displayName": "Proximity Radius (px)",
        "defaultValue": "200",
        "options": ["100", "150", "200", "250", "300", "350", "400"],
        "group": "Animation",
        "description": "Distance from cursor where effect is active"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 64,
        "group": "Typography",
        "description": "Base font size in pixels (1-120)"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Base Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography",
        "description": "Base font weight (for fallback)"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "-0.02em",
        "options": ["-0.05em", "-0.02em", "0em", "0.025em", "0.05em"],
        "group": "Typography",
        "description": "Space between characters"
      },
      "lineHeight": {
        "dataType": "select",
        "displayName": "Line Height",
        "defaultValue": "1",
        "options": ["0.9", "1", "1.1", "1.2", "1.3"],
        "group": "Typography",
        "description": "Line height multiplier"
      },
      "textAlign": {
        "dataType": "select",
        "displayName": "Text Alignment",
        "defaultValue": "center",
        "options": ["left", "center", "right"],
        "group": "Typography",
        "description": "Horizontal text alignment"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "Base text color"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Container background color"
      },
      "transitionSpeed": {
        "dataType": "select",
        "displayName": "Transition Speed",
        "defaultValue": "instant",
        "options": ["instant", "fast", "smooth"],
        "group": "Animation",
        "description": "Response speed to cursor movement"
      },
      "paddingVertical": {
        "dataType": "select",
        "displayName": "Vertical Padding",
        "defaultValue": "2rem",
        "options": ["1rem", "1.5rem", "2rem", "2.5rem", "3rem"],
        "group": "Layout",
        "description": "Top and bottom padding"
      },
      "paddingHorizontal": {
        "dataType": "select",
        "displayName": "Horizontal Padding",
        "defaultValue": "2rem",
        "options": ["1rem", "1.5rem", "2rem", "2.5rem", "3rem"],
        "group": "Layout",
        "description": "Left and right padding"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const text = config?.text || "Extraordinary";
  const fromFontVariationSettings = config?.fromFontVariationSettings || "'wght' 400, 'slnt' 0";
  const toFontVariationSettings = config?.toFontVariationSettings || "'wght' 900, 'slnt' -10";
  const radius = parseInt(config?.radius || "200");
  const fontSize = parseInt(config?.fontSize || "64");
  const fontWeight = config?.fontWeight || "400";
  const letterSpacing = config?.letterSpacing || "-0.02em";
  const lineHeight = config?.lineHeight || "1";
  const textAlign = config?.textAlign || "center";
  const textColor = config?.textColor || "#212529";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const transitionSpeed = config?.transitionSpeed || "instant";
  const paddingVertical = config?.paddingVertical || "2rem";
  const paddingHorizontal = config?.paddingHorizontal || "2rem";

  const containerRef = React.useRef(null);
  const charRefs = React.useRef([]);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });
  const isMouseInsideRef = React.useRef(false);
  const animationFrameRef = React.useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Parse font variation settings
  const parseFontVariationSettings = (settings) => {
    const axes = {};
    const matches = settings.matchAll(/'(\w+)'\s+([-\d.]+)/g);
    for (const match of matches) {
      axes[match[1]] = parseFloat(match[2]);
    }
    return axes;
  };

  const fromAxes = parseFontVariationSettings(fromFontVariationSettings);
  const toAxes = parseFontVariationSettings(toFontVariationSettings);

  // Get transition duration based on speed setting
  const getTransitionDuration = () => {
    if (transitionSpeed === 'instant') return '0ms';
    if (transitionSpeed === 'fast') return '80ms';
    return '150ms';
  };

  // Update all characters
  const updateCharacters = React.useCallback(() => {
    if (prefersReducedMotion || !charRefs.current.length) return;

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    charRefs.current.forEach((charEl) => {
      if (!charEl) return;

      const rect = charEl.getBoundingClientRect();
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mouseX - charX, 2) + 
        Math.pow(mouseY - charY, 2)
      );

      if (distance > radius || !isMouseInsideRef.current) {
        charEl.style.fontVariationSettings = fromFontVariationSettings;
      } else {
        const t = distance / radius;
        
        const interpolatedAxes = Object.keys(fromAxes).map(axis => {
          const fromValue = fromAxes[axis];
          const toValue = toAxes[axis] || fromValue;
          const value = fromValue + (toValue - fromValue) * (1 - t);
          return `'${axis}' ${value.toFixed(2)}`;
        });

        charEl.style.fontVariationSettings = interpolatedAxes.join(', ');
      }
    });
  }, [prefersReducedMotion, radius, fromFontVariationSettings, fromAxes, toAxes]);

  // Continuous animation loop
  const animate = React.useCallback(() => {
    updateCharacters();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateCharacters]);

  // Start/stop animation loop
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, prefersReducedMotion]);

  // Handle mouse events
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      isMouseInsideRef.current = true;
    };

    const handleMouseLeave = () => {
      isMouseInsideRef.current = false;
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const container = containerRef.current;
    if (!container) return;

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  const characters = text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    index
  }));

  const transitionDuration = getTransitionDuration();

  return (
    <div 
      ref={containerRef}
      className="variable-font-proximity-container"
      style={{
        backgroundColor,
        padding: `${paddingVertical} ${paddingHorizontal}`,
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          fontSize: `clamp(${Math.max(fontSize * 0.5, 16)}px, ${fontSize}px, ${fontSize * 1.5}px)`,
          fontWeight,
          letterSpacing,
          lineHeight,
          color: textColor,
          textAlign,
          fontFamily: 'var(--font-family, system-ui, -apple-system, sans-serif)',
          fontFeatureSettings: '"kern" 1',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          display: 'inline-block',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      >
        {characters.map(({ char, index }) => (
          <span
            key={index}
            ref={(el) => charRefs.current[index] = el}
            className="proximity-char"
            style={{
              display: 'inline-block',
              fontVariationSettings: fromFontVariationSettings,
              transition: prefersReducedMotion ? 'none' : `font-variation-settings ${transitionDuration} ease-out`,
              willChange: prefersReducedMotion ? 'auto' : 'font-variation-settings'
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
