import React from "react";

const MANIFEST = {
  "type": "Interactive.TiltCard",
  "description": "Card with mouse-following 3D tilt perspective and inner shadow",
  "editorElement": {
    "selector": ".tilt-card",
    "displayName": "Tilt Perspective Card",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "Tilt Effect",
        "group": "Content"
      },
      "description": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "Move your mouse to see the 3D tilt",
        "group": "Content"
      },
      "showGlare": {
        "dataType": "booleanValue",
        "displayName": "Show Glare Effect",
        "defaultValue": true,
        "group": "Content"
      },
      "tiltMaxAngle": {
        "dataType": "select",
        "displayName": "Max Tilt Angle (deg)",
        "defaultValue": "15",
        "options": ["5", "10", "15", "20", "25"],
        "group": "Animation"
      },
      "transitionSpeed": {
        "dataType": "select",
        "displayName": "Transition Speed (ms)",
        "defaultValue": "300",
        "options": ["200", "300", "400", "500"],
        "group": "Animation"
      },
      "cardWidth": {
        "dataType": "select",
        "displayName": "Card Width (px)",
        "defaultValue": "320",
        "options": ["280", "320", "360", "400", "480"],
        "group": "Layout"
      },
      "cardHeight": {
        "dataType": "select",
        "displayName": "Card Height (px)",
        "defaultValue": "400",
        "options": ["320", "360", "400", "440", "480", "520"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "16",
        "options": ["0", "8", "12", "16", "20", "24"],
        "group": "Layout"
      },
      "padding": {
        "dataType": "select",
        "displayName": "Padding",
        "defaultValue": "32",
        "options": ["24", "32", "40", "48"],
        "group": "Layout"
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
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "glareColor": {
        "dataType": "color",
        "displayName": "Glare Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "shadowColor": {
        "dataType": "color",
        "displayName": "Shadow Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 24,
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
  const cardRef = React.useRef(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = React.useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = React.useState(false);

  // Config values
  const title = config?.title || "Tilt Effect";
  const description = config?.description || "Move your mouse to see the 3D tilt";
  const showGlare = config?.showGlare !== false;
  const tiltMaxAngle = parseInt(config?.tiltMaxAngle || "15");
  const transitionSpeed = parseInt(config?.transitionSpeed || "300");
  const cardWidth = parseInt(config?.cardWidth || "320");
  const cardHeight = parseInt(config?.cardHeight || "400");
  const borderRadius = parseInt(config?.borderRadius || "16");
  const padding = parseInt(config?.padding || "32");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#18181B";
  const glareColor = config?.glareColor || "#FFFFFF";
  const shadowColor = config?.shadowColor || "#000000";
  const fontSize = config?.fontSize || 24;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const handleMouseMove = (e) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;
    
    const tiltY = percentX * tiltMaxAngle;
    const tiltX = -percentY * tiltMaxAngle;
    
    setTilt({ x: tiltX, y: tiltY });
    
    // Glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  // Shadow calculation based on tilt
  const shadowX = Math.round(tilt.y * 0.5);
  const shadowY = Math.round(tilt.x * 0.5);
  const shadowBlur = isHovered ? 32 : 24;
  
  const containerStyle = {
    perspective: '1200px',
    width: `${cardWidth}px`,
    height: `${cardHeight}px`
  };

  const cardStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor,
    color: textColor,
    borderRadius: `${borderRadius}px`,
    padding: `${padding}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    transformStyle: 'preserve-3d',
    transform: prefersReducedMotion 
      ? 'none' 
      : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
    transition: prefersReducedMotion 
      ? 'none' 
      : `transform ${transitionSpeed}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${transitionSpeed}ms ease`,
    boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.${isHovered ? '15' : '08'})`,
    overflow: 'hidden',
    cursor: 'default',
    willChange: 'transform'
  };

  const glareStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: `${borderRadius}px`,
    pointerEvents: 'none',
    background: showGlare && isHovered
      ? `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}40 0%, transparent 50%)`
      : 'transparent',
    opacity: isHovered ? 1 : 0,
    transition: prefersReducedMotion ? 'none' : `opacity ${transitionSpeed}ms ease`
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    transform: 'translateZ(20px)'
  };

  const titleStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    marginBottom: '16px',
    letterSpacing: '0.02em'
  };

  const descriptionStyle = {
    fontSize: `${fontSize * 0.65}px`,
    fontWeight: '400',
    lineHeight: '1.6',
    opacity: 0.8,
    maxWidth: '32ch'
  };

  return (
    <div 
      className="tilt-card"
      style={containerStyle}
    >
      <div
        ref={cardRef}
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glare overlay */}
        <div style={glareStyle} />
        
        {/* Content */}
        <div style={contentStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descriptionStyle}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
