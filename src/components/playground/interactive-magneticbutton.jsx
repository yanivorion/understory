import React from "react";

const MANIFEST = {
  "type": "Interactive.MagneticButton",
  "description": "Interactive button with magnetic cursor attraction and ripple click effect",
  "editorElement": {
    "selector": ".magnetic-button-container",
    "displayName": "Magnetic Button",
    "archetype": "container",
    "data": {
      "buttonText": {
        "dataType": "text",
        "displayName": "Button Text",
        "defaultValue": "Hover Me",
        "group": "Content"
      },
      "magneticStrength": {
        "dataType": "select",
        "displayName": "Magnetic Strength",
        "defaultValue": "0.5",
        "options": ["0.2", "0.3", "0.5", "0.7", "1.0"],
        "group": "Animation",
        "description": "How strongly button follows cursor (0.2 = subtle, 1.0 = aggressive)"
      },
      "magneticRadius": {
        "dataType": "select",
        "displayName": "Magnetic Radius (px)",
        "defaultValue": "100",
        "options": ["50", "75", "100", "150", "200"],
        "group": "Animation",
        "description": "Distance from button center where magnetic effect activates"
      },
      "rippleCount": {
        "dataType": "select",
        "displayName": "Ripple Count",
        "defaultValue": "3",
        "options": ["1", "2", "3", "4"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "rippleColor": {
        "dataType": "color",
        "displayName": "Ripple Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "hoverBackgroundColor": {
        "dataType": "color",
        "displayName": "Hover Background",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "0.05em",
        "options": ["0em", "0.025em", "0.05em", "0.075em"],
        "group": "Typography"
      },
      "paddingVertical": {
        "dataType": "select",
        "displayName": "Padding Vertical",
        "defaultValue": "16",
        "options": ["12", "16", "20", "24"],
        "group": "Layout"
      },
      "paddingHorizontal": {
        "dataType": "select",
        "displayName": "Padding Horizontal",
        "defaultValue": "32",
        "options": ["24", "32", "40", "48"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "8",
        "options": ["0", "4", "6", "8", "12", "100"],
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const buttonRef = React.useRef(null);
  const [ripples, setRipples] = React.useState([]);
  const [transform, setTransform] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const animationFrameRef = React.useRef(null);

  // Config values with safe access
  const buttonText = config?.buttonText || "Hover Me";
  const magneticStrength = parseFloat(config?.magneticStrength || "0.5");
  const magneticRadius = parseInt(config?.magneticRadius || "100");
  const rippleCount = parseInt(config?.rippleCount || "3");
  const backgroundColor = config?.backgroundColor || "#18181B";
  const textColor = config?.textColor || "#FFFFFF";
  const rippleColor = config?.rippleColor || "#FFFFFF";
  const hoverBackgroundColor = config?.hoverBackgroundColor || "#27272A";
  const fontSize = config?.fontSize || 16;
  const fontWeight = config?.fontWeight || "500";
  const letterSpacing = config?.letterSpacing || "0.05em";
  const paddingVertical = parseInt(config?.paddingVertical || "16");
  const paddingHorizontal = parseInt(config?.paddingHorizontal || "32");
  const borderRadius = parseInt(config?.borderRadius || "8");

  // Reduced motion check
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Magnetic effect handler
  const handleMouseMove = (e) => {
    if (!buttonRef.current || prefersReducedMotion) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < magneticRadius) {
      const strength = 1 - (distance / magneticRadius);
      const moveX = distanceX * magneticStrength * strength;
      const moveY = distanceY * magneticStrength * strength;
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        setTransform({ x: moveX, y: moveY });
      });
    } else {
      setTransform({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ x: 0, y: 0 });
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Ripple effect handler
  const handleClick = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipples = [];
    for (let i = 0; i < rippleCount; i++) {
      newRipples.push({
        id: Date.now() + i,
        x,
        y,
        delay: i * 100
      });
    }

    setRipples(prev => [...prev, ...newRipples]);

    // Remove ripples after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => !newRipples.find(nr => nr.id === r.id)));
    }, 1000 + (rippleCount - 1) * 100);
  };

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const buttonStyle = {
    position: 'relative',
    padding: `${paddingVertical}px ${paddingHorizontal}px`,
    backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor,
    color: textColor,
    border: 'none',
    borderRadius: `${borderRadius}px`,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    letterSpacing: letterSpacing,
    cursor: 'pointer',
    overflow: 'hidden',
    transform: prefersReducedMotion ? 'none' : `translate(${transform.x}px, ${transform.y}px)`,
    transition: prefersReducedMotion ? 'none' : 'background-color 0.3s ease, transform 0.15s ease-out',
    outline: 'none',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    willChange: 'transform'
  };

  const rippleStyle = (ripple) => ({
    position: 'absolute',
    left: ripple.x,
    top: ripple.y,
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: rippleColor,
    transform: 'translate(-50%, -50%) scale(0)',
    opacity: 0,
    pointerEvents: 'none',
    animation: prefersReducedMotion ? 'none' : `rippleAnimation 0.8s ease-out ${ripple.delay}ms forwards`
  });

  return (
    <div 
      className="magnetic-button-container"
      style={{ 
        display: 'inline-block',
        padding: `${magneticRadius}px`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <style>
        {`
          @keyframes rippleAnimation {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0.6;
            }
            100% {
              transform: translate(-50%, -50%) scale(20);
              opacity: 0;
            }
          }
          
          .magnetic-button-container button:active {
            transform: ${prefersReducedMotion ? 'none' : `translate(${transform.x}px, ${transform.y}px) scale(0.98)`};
          }
        `}
      </style>
      
      <button
        ref={buttonRef}
        style={buttonStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        aria-label={buttonText}
      >
        {buttonText}
        
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            style={rippleStyle(ripple)}
          />
        ))}
      </button>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
