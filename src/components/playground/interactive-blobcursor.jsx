import React from "react";

const MANIFEST = {
  "type": "Interactive.BlobCursor",
  "description": "Custom cursor that morphs into different shapes when hovering over interactive elements",
  "editorElement": {
    "selector": ".blob-cursor",
    "displayName": "Morphing Blob Cursor",
    "archetype": "container",
    "data": {
      "enableCursor": {
        "dataType": "booleanValue",
        "displayName": "Enable Custom Cursor",
        "defaultValue": true,
        "group": "Content"
      },
      "size": {
        "dataType": "select",
        "displayName": "Cursor Size (px)",
        "defaultValue": "32",
        "options": ["24", "28", "32", "40", "48"],
        "group": "Layout"
      },
      "morphSpeed": {
        "dataType": "select",
        "displayName": "Morph Speed (ms)",
        "defaultValue": "300",
        "options": ["200", "300", "400", "500"],
        "group": "Animation"
      },
      "elasticity": {
        "dataType": "select",
        "displayName": "Elasticity",
        "defaultValue": "0.15",
        "options": ["0.1", "0.15", "0.2", "0.25"],
        "group": "Animation"
      },
      "cursorColor": {
        "dataType": "color",
        "displayName": "Cursor Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "hoverColor": {
        "dataType": "color",
        "displayName": "Hover Color",
        "defaultValue": "#3B82F6",
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Demo Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "buttonColor": {
        "dataType": "color",
        "displayName": "Demo Button Color",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Demo Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
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
  const [targetPos, setTargetPos] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [cursorScale, setCursorScale] = React.useState(1);
  const animationFrameRef = React.useRef(null);

  // Config values
  const enableCursor = config?.enableCursor !== false;
  const size = parseInt(config?.size || "32");
  const morphSpeed = parseInt(config?.morphSpeed || "300");
  const elasticity = parseFloat(config?.elasticity || "0.15");
  const cursorColor = config?.cursorColor || "#18181B";
  const hoverColor = config?.hoverColor || "#3B82F6";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const buttonColor = config?.buttonColor || "#F4F4F5";
  const textColor = config?.textColor || "#18181B";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Mouse move handler
  React.useEffect(() => {
    if (!enableCursor || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableCursor, prefersReducedMotion]);

  // Smooth follow animation
  React.useEffect(() => {
    if (!enableCursor || prefersReducedMotion) return;

    const animate = () => {
      setCursorPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * elasticity,
        y: prev.y + (targetPos.y - prev.y) * elasticity
      }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetPos, elasticity, enableCursor, prefersReducedMotion]);

  const containerStyle = {
    width: '100%',
    minHeight: '600px',
    backgroundColor: backgroundColor,
    padding: '80px 24px',
    cursor: enableCursor && !prefersReducedMotion ? 'none' : 'default',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px'
  };

  const cursorStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: isHovering ? hoverColor : cursorColor,
    pointerEvents: 'none',
    zIndex: 9999,
    transform: `translate(${cursorPos.x - size / 2}px, ${cursorPos.y - size / 2}px) scale(${cursorScale})`,
    transition: prefersReducedMotion 
      ? 'none' 
      : `background-color ${morphSpeed}ms ease, transform 0.1s ease`,
    opacity: enableCursor ? 0.8 : 0,
    mixBlendMode: 'difference',
    willChange: 'transform'
  };

  const demoButtonStyle = {
    padding: '16px 32px',
    backgroundColor: buttonColor,
    color: textColor,
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: enableCursor && !prefersReducedMotion ? 'none' : 'pointer',
    transition: 'transform 0.2s ease'
  };

  const demoTextStyle = {
    fontSize: '18px',
    color: textColor,
    textAlign: 'center',
    maxWidth: '500px',
    lineHeight: '1.6'
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setCursorScale(1.5);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCursorScale(1);
  };

  return (
    <div className="blob-cursor" style={containerStyle}>
      {enableCursor && !prefersReducedMotion && (
        <div style={cursorStyle} />
      )}

      <p style={demoTextStyle}>
        {enableCursor 
          ? "Move your cursor around to see the blob follow. Hover over buttons to see it morph!"
          : "Enable custom cursor to see the effect"}
      </p>

      <button
        style={demoButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover Over Me
      </button>

      <button
        style={demoButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Or This Button
      </button>

      <button
        style={demoButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Try This One Too
      </button>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
