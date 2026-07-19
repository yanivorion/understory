import React from "react";

const MANIFEST = {
  "type": "Typography.SpiralVortexEntrance",
  "description": "Text characters spiral inward from screen edges converging at center with 3D rotation facing travel direction and cascading vortex effect",
  "editorElement": {
    "selector": ".spiral-vortex-text",
    "displayName": "Spiral Vortex Entrance",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "CONVERGENCE",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "vortexColor": {
        "dataType": "color",
        "displayName": "Vortex Trail Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 110,
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
        "defaultValue": "0.05em",
        "options": ["0em", "0.05em", "0.1em", "0.15em"],
        "group": "Typography"
      },
      "spiralTurns": {
        "dataType": "select",
        "displayName": "Spiral Turns",
        "defaultValue": "2.5",
        "options": ["1.5", "2.0", "2.5", "3.0", "3.5"],
        "group": "Animation"
      },
      "spiralRadius": {
        "dataType": "select",
        "displayName": "Spiral Radius",
        "defaultValue": "1.5",
        "options": ["1.0", "1.25", "1.5", "1.75", "2.0"],
        "group": "Animation"
      },
      "entranceDuration": {
        "dataType": "select",
        "displayName": "Entrance Duration (ms)",
        "defaultValue": "1800",
        "options": ["1200", "1500", "1800", "2000", "2400"],
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Cascade Stagger (ms)",
        "defaultValue": "80",
        "options": ["50", "60", "80", "100", "120"],
        "group": "Animation"
      },
      "rotation3DIntensity": {
        "dataType": "select",
        "displayName": "3D Rotation Intensity",
        "defaultValue": "1.0",
        "options": ["0.5", "0.75", "1.0", "1.5", "2.0"],
        "group": "Animation"
      },
      "autoplay": {
        "dataType": "booleanValue",
        "displayName": "Autoplay on Load",
        "defaultValue": true,
        "group": "Animation"
      },
      "backgroundRotation": {
        "dataType": "booleanValue",
        "displayName": "Rotate Background",
        "defaultValue": true,
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [backgroundRotation, setBackgroundRotation] = React.useState(0);
  
  const containerRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);
  const startTimeRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const text = config?.text || "CONVERGENCE";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#212529";
  const vortexColor = config?.vortexColor || "#6C757D";
  const fontSize = parseInt(config?.fontSize) || 110;
  const fontWeight = config?.fontWeight || "300";
  const letterSpacing = config?.letterSpacing || "0.05em";
  const spiralTurns = parseFloat(config?.spiralTurns) || 2.5;
  const spiralRadius = parseFloat(config?.spiralRadius) || 1.5;
  const entranceDuration = parseInt(config?.entranceDuration) || 1800;
  const staggerDelay = parseInt(config?.staggerDelay) || 80;
  const rotation3DIntensity = parseFloat(config?.rotation3DIntensity) || 1.0;
  const autoplay = config?.autoplay !== false;
  const enableBackgroundRotation = config?.backgroundRotation !== false;

  const characters = text.split('');

  // Calculate spiral path for each character
  const calculateSpiralPath = (index, totalChars, progress) => {
    // Spiral parameters
    const anglePerChar = (Math.PI * 2 * spiralTurns) / totalChars;
    const angle = anglePerChar * index;
    
    // Radius decreases as we approach center (progress 0 to 1)
    const maxRadius = Math.max(window.innerWidth, window.innerHeight) * spiralRadius;
    const radius = maxRadius * (1 - progress);
    
    // Polar to Cartesian coordinates
    const x = Math.cos(angle + Math.PI) * radius;
    const y = Math.sin(angle + Math.PI) * radius;
    
    // Calculate rotation to face direction of travel
    const tangentAngle = angle + Math.PI / 2;
    const rotationZ = (tangentAngle * 180 / Math.PI) * rotation3DIntensity;
    
    // 3D rotation based on distance from center
    const rotationX = (1 - progress) * 180 * rotation3DIntensity;
    const rotationY = (1 - progress) * 90 * rotation3DIntensity * Math.sin(angle);
    
    // Scale grows as it approaches center
    const scale = 0.3 + progress * 0.7;
    
    // Opacity fades in
    const opacity = progress;

    return { x, y, rotationX, rotationY, rotationZ, scale, opacity };
  };

  // Trigger animation
  const triggerAnimation = () => {
    if (prefersReducedMotion) {
      setIsAnimating(true);
      setHasAnimated(true);
      return;
    }

    setIsAnimating(true);
    setHasAnimated(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, entranceDuration + characters.length * staggerDelay);
  };

  // Autoplay on mount
  React.useEffect(() => {
    if (autoplay && !hasAnimated) {
      setTimeout(() => triggerAnimation(), 300);
    }
  }, [autoplay, hasAnimated]);

  // Background rotation animation
  React.useEffect(() => {
    if (prefersReducedMotion || !enableBackgroundRotation) return;

    const animate = () => {
      startTimeRef.current = startTimeRef.current || Date.now();
      const elapsed = (Date.now() - startTimeRef.current) * 0.001;
      setBackgroundRotation(elapsed * 2); // 2 degrees per second
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enableBackgroundRotation, prefersReducedMotion]);

  // Intersection observer trigger
  React.useEffect(() => {
    if (hasAnimated || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          triggerAnimation();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    perspective: '1500px',
    transformStyle: 'preserve-3d'
  };

  const backgroundImageStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '150%',
    height: '150%',
    transform: prefersReducedMotion ? 'translate(-50%, -50%)' : `translate(-50%, -50%) rotate(${backgroundRotation}deg)`,
    willChange: prefersReducedMotion ? 'auto' : 'transform',
    zIndex: 0,
    opacity: 0.12,
    backgroundImage: 'url(https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80&fm=jpg&crop=entropy&cs=monochrome)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'grayscale(100%) contrast(1.2)'
  };

  const textContainerStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    perspective: '1500px',
    transformStyle: 'preserve-3d'
  };

  const characterWrapperStyle = {
    position: 'relative',
    display: 'inline-block',
    perspective: '1500px',
    transformStyle: 'preserve-3d'
  };

  const characterStyle = (index) => {
    if (prefersReducedMotion) {
      return {
        fontSize: `clamp(${fontSize * 0.4}px, 10vw, ${fontSize}px)`,
        fontWeight,
        letterSpacing,
        color: textColor,
        display: 'inline-block',
        opacity: 1
      };
    }

    const delay = index * staggerDelay;
    const char = characters[index];
    const isSpace = char === ' ';

    return {
      fontSize: `clamp(${fontSize * 0.4}px, 10vw, ${fontSize}px)`,
      fontWeight,
      letterSpacing,
      color: textColor,
      display: 'inline-block',
      padding: isSpace ? '0 0.15em' : '0',
      transformStyle: 'preserve-3d',
      animation: hasAnimated ? `spiralIn ${entranceDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards` : 'none',
      opacity: hasAnimated ? 0 : 1,
      transform: hasAnimated ? 'translate(0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)' : 'none',
      userSelect: 'none',
      willChange: hasAnimated ? 'transform, opacity' : 'auto',
      textShadow: `0 0 ${fontSize * 0.15}px ${vortexColor}30`
    };
  };

  const replayButtonStyle = {
    position: 'fixed',
    bottom: '3rem',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.75rem 2rem',
    fontSize: '14px',
    fontWeight: '400',
    color: textColor,
    backgroundColor: 'transparent',
    border: `1px solid ${textColor}`,
    borderRadius: '2px',
    cursor: 'pointer',
    zIndex: 20,
    transition: 'all 200ms ease',
    opacity: hasAnimated && !isAnimating ? 1 : 0,
    pointerEvents: hasAnimated && !isAnimating ? 'auto' : 'none'
  };

  // Generate keyframes dynamically
  const generateKeyframes = () => {
    let keyframes = '';
    
    characters.forEach((char, index) => {
      const path = calculateSpiralPath(index, characters.length, 0);
      
      keyframes += `
        @keyframes spiralIn {
          from {
            transform: translate(${path.x}px, ${path.y}px) 
                       rotateX(${path.rotationX}deg) 
                       rotateY(${path.rotationY}deg) 
                       rotateZ(${path.rotationZ}deg) 
                       scale(${path.scale});
            opacity: 0;
          }
          to {
            transform: translate(0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
            opacity: 1;
          }
        }
      `;
    });
    
    return keyframes;
  };

  return (
    <div ref={containerRef} style={containerStyle} className="spiral-vortex-text">
      <style>
        {generateKeyframes()}
      </style>

      {/* Rotating Background */}
      <div style={backgroundImageStyle} />

      {/* Spiraling Text */}
      <div style={textContainerStyle}>
        {characters.map((char, index) => (
          <div key={index} style={characterWrapperStyle}>
            <span style={characterStyle(index)}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          </div>
        ))}
      </div>

      {/* Replay Button */}
      <button
        style={replayButtonStyle}
        onClick={() => {
          setHasAnimated(false);
          setTimeout(() => triggerAnimation(), 50);
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = textColor;
          e.target.style.color = backgroundColor;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = textColor;
        }}
      >
        Replay Vortex
      </button>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
