import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Nov 9, 2025, 02:26 PM
 * Component Type: Typography.MagneticAttractionField
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Typography.MagneticAttractionField",
  "description": "Text characters attracted/repelled by cursor with real-time physics simulation, elastic spring-back, and force-based rotation",
  "editorElement": {
    "selector": ".magnetic-text-field",
    "displayName": "Magnetic Attraction Field",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "MAGNETIC PULL",
        "group": "Content"
      },
      "text2": {
        "dataType": "text",
        "displayName": "Secondary Text",
        "defaultValue": "FEEL THE FORCE",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "magneticColor": {
        "dataType": "color",
        "displayName": "Magnetic Highlight Color",
        "defaultValue": "#495057",
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
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "0.02em",
        "options": ["0em", "0.02em", "0.05em", "0.1em"],
        "group": "Typography"
      },
      "magneticForce": {
        "dataType": "select",
        "displayName": "Magnetic Force",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.4", "0.5"],
        "group": "Animation"
      },
      "magneticRadius": {
        "dataType": "select",
        "displayName": "Magnetic Radius (px)",
        "defaultValue": "200",
        "options": ["100", "150", "200", "250", "300"],
        "group": "Animation"
      },
      "springStiffness": {
        "dataType": "select",
        "displayName": "Spring Stiffness",
        "defaultValue": "0.15",
        "options": ["0.1", "0.15", "0.2", "0.25", "0.3"],
        "group": "Animation"
      },
      "springDamping": {
        "dataType": "select",
        "displayName": "Spring Damping",
        "defaultValue": "0.7",
        "options": ["0.5", "0.6", "0.7", "0.8", "0.9"],
        "group": "Animation"
      },
      "rotationIntensity": {
        "dataType": "select",
        "displayName": "Rotation Intensity",
        "defaultValue": "1.0",
        "options": ["0.5", "0.75", "1.0", "1.25", "1.5"],
        "group": "Animation"
      },
      "parallaxSpeed": {
        "dataType": "select",
        "displayName": "Background Parallax Speed",
        "defaultValue": "0.15",
        "options": ["0.05", "0.1", "0.15", "0.2", "0.25"],
        "group": "Animation"
      },
      "showCursor": {
        "dataType": "booleanValue",
        "displayName": "Show Magnetic Cursor",
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
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [characterStates, setCharacterStates] = React.useState({});
  const [parallaxOffset, setParallaxOffset] = React.useState({ x: 0, y: 0 });
  
  const animationFrameRef = React.useRef(null);
  const velocitiesRef = React.useRef({});
  const originalPositionsRef = React.useRef({});

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const text = config?.text || "MAGNETIC PULL";
  const text2 = config?.text2 || "FEEL THE FORCE";
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const magneticColor = config?.magneticColor || "#495057";
  const fontSize = parseInt(config?.fontSize) || 90;
  const fontWeight = config?.fontWeight || "300";
  const letterSpacing = config?.letterSpacing || "0.02em";
  const magneticForce = parseFloat(config?.magneticForce) || 0.3;
  const magneticRadius = parseFloat(config?.magneticRadius) || 200;
  const springStiffness = parseFloat(config?.springStiffness) || 0.15;
  const springDamping = parseFloat(config?.springDamping) || 0.7;
  const rotationIntensity = parseFloat(config?.rotationIntensity) || 1.0;
  const parallaxSpeed = parseFloat(config?.parallaxSpeed) || 0.15;
  const showCursor = config?.showCursor !== false;

  const allCharacters = [
    ...text.split('').map((char, i) => ({ char, id: `t1-${i}`, line: 0 })),
    ...text2.split('').map((char, i) => ({ char, id: `t2-${i}`, line: 1 }))
  ];

  // Initialize character states
  React.useEffect(() => {
    const initialStates = {};
    const initialVelocities = {};
    
    allCharacters.forEach(({ id }) => {
      initialStates[id] = { x: 0, y: 0, rotation: 0 };
      initialVelocities[id] = { x: 0, y: 0 };
    });
    
    setCharacterStates(initialStates);
    velocitiesRef.current = initialVelocities;
  }, [text, text2]);

  // Track cursor position
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        setCursorPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [prefersReducedMotion]);

  // Mouse parallax for background
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 100 * parallaxSpeed;
      const y = (e.clientY / window.innerHeight - 0.5) * 100 * parallaxSpeed;
      setParallaxOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [parallaxSpeed, prefersReducedMotion]);

  // Physics simulation
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const animate = () => {
      setCharacterStates(prevStates => {
        const newStates = { ...prevStates };
        
        Object.keys(newStates).forEach(id => {
          const originalPos = originalPositionsRef.current[id];
          if (!originalPos) return;

          // Calculate distance from cursor to character
          const dx = cursorPos.x - originalPos.x;
          const dy = cursorPos.y - originalPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Apply magnetic force if within radius
          let forceX = 0;
          let forceY = 0;

          if (distance < magneticRadius && distance > 0) {
            const forceMagnitude = (1 - distance / magneticRadius) * magneticForce;
            forceX = (dx / distance) * forceMagnitude * 100;
            forceY = (dy / distance) * forceMagnitude * 100;
          }

          // Current displacement from original position
          const currentState = newStates[id];
          const displaceX = currentState.x;
          const displaceY = currentState.y;

          // Spring force pulling back to original position
          const springX = -displaceX * springStiffness;
          const springY = -displaceY * springStiffness;

          // Get velocity
          const velocity = velocitiesRef.current[id] || { x: 0, y: 0 };

          // Update velocity with forces and damping
          velocity.x = (velocity.x + forceX + springX) * springDamping;
          velocity.y = (velocity.y + forceY + springY) * springDamping;

          // Update position
          const newX = displaceX + velocity.x;
          const newY = displaceY + velocity.y;

          // Calculate rotation based on velocity direction and magnitude
          const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
          const rotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI) * 0.1 * rotationIntensity * Math.min(velocityMagnitude, 5);

          // Update states
          newStates[id] = {
            x: newX,
            y: newY,
            rotation: rotation
          };

          velocitiesRef.current[id] = velocity;
        });

        return newStates;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPos, magneticForce, magneticRadius, springStiffness, springDamping, rotationIntensity, prefersReducedMotion]);

  // Store original positions
  const storeOriginalPosition = (id, element) => {
    if (element && !originalPositionsRef.current[id]) {
      const rect = element.getBoundingClientRect();
      originalPositionsRef.current[id] = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem',
    cursor: showCursor ? 'none' : 'default'
  };

  const backgroundImageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: prefersReducedMotion ? 'none' : `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
    willChange: prefersReducedMotion ? 'auto' : 'transform',
    zIndex: 0,
    opacity: 0.1,
    backgroundImage: 'url(https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1920&q=80&fm=jpg&crop=entropy&cs=monochrome)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'grayscale(100%) contrast(1.3)'
  };

  const textLineStyle = {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10
  };

  const characterStyle = (id) => {
    const state = characterStates[id] || { x: 0, y: 0, rotation: 0 };
    const char = allCharacters.find(c => c.id === id)?.char;
    const isSpace = char === ' ';

    // Calculate distance from cursor for color effect
    const originalPos = originalPositionsRef.current[id];
    let intensity = 0;
    if (originalPos) {
      const dx = cursorPos.x - originalPos.x;
      const dy = cursorPos.y - originalPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      intensity = Math.max(0, 1 - distance / magneticRadius);
    }

    const color = prefersReducedMotion ? textColor : `rgb(
      ${parseInt(textColor.slice(1, 3), 16) + intensity * 30},
      ${parseInt(textColor.slice(3, 5), 16) + intensity * 30},
      ${parseInt(textColor.slice(5, 7), 16) + intensity * 30}
    )`;

    return {
      fontSize: `clamp(${fontSize * 0.4}px, 9vw, ${fontSize}px)`,
      fontWeight,
      letterSpacing,
      color: textColor,
      display: 'inline-block',
      transform: prefersReducedMotion ? 'none' : `translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg)`,
      willChange: prefersReducedMotion ? 'auto' : 'transform',
      padding: isSpace ? '0 0.15em' : '0',
      userSelect: 'none',
      position: 'relative',
      transition: prefersReducedMotion ? 'none' : 'color 200ms ease',
      textShadow: prefersReducedMotion ? 'none' : `0 0 ${intensity * 20}px ${magneticColor}${Math.floor(intensity * 80).toString(16).padStart(2, '0')}`
    };
  };

  const customCursorStyle = {
    position: 'fixed',
    left: cursorPos.x,
    top: cursorPos.y,
    width: `${magneticRadius * 2}px`,
    height: `${magneticRadius * 2}px`,
    border: `1px solid ${magneticColor}`,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 1000,
    opacity: 0.2,
    transition: 'opacity 300ms ease'
  };

  const cursorDotStyle = {
    position: 'fixed',
    left: cursorPos.x,
    top: cursorPos.y,
    width: '8px',
    height: '8px',
    backgroundColor: magneticColor,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 1001
  };

  const infoStyle = {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '14px',
    color: textColor,
    opacity: 0.4,
    zIndex: 20,
    textAlign: 'center',
    pointerEvents: 'none',
    fontWeight: '300'
  };

  return (
    <div style={containerStyle} className="magnetic-text-field">
      {/* Background Image with Parallax */}
      <div style={backgroundImageStyle} />

      {/* Text Line 1 */}
      <div style={textLineStyle}>
        {text.split('').map((char, index) => {
          const id = `t1-${index}`;
          return (
            <span
              key={id}
              ref={(el) => storeOriginalPosition(id, el)}
              style={characterStyle(id)}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>

      {/* Text Line 2 */}
      <div style={textLineStyle}>
        {text2.split('').map((char, index) => {
          const id = `t2-${index}`;
          return (
            <span
              key={id}
              ref={(el) => storeOriginalPosition(id, el)}
              style={characterStyle(id)}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>

      {/* Custom Cursor */}
      {showCursor && !prefersReducedMotion && (
        <>
          <div style={customCursorStyle} />
          <div style={cursorDotStyle} />
        </>
      )}

      {/* Info */}
      <div style={infoStyle}>
        Move cursor to create magnetic field • Characters spring back
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
