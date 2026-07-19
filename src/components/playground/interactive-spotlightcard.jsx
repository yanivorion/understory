import React from "react";

const MANIFEST = {
  "type": "Interactive.SpotlightCard",
  "description": "Card with moving spotlight gradient that follows cursor",
  "editorElement": {
    "selector": ".spotlight-card",
    "displayName": "Spotlight Card",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "Spotlight Effect",
        "group": "Content"
      },
      "description": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "Move your cursor over the card to see the spotlight shine",
        "group": "Content"
      },
      "spotlightSize": {
        "dataType": "select",
        "displayName": "Spotlight Size (px)",
        "defaultValue": "300",
        "options": ["200", "250", "300", "400", "500"],
        "group": "Animation"
      },
      "spotlightOpacity": {
        "dataType": "select",
        "displayName": "Spotlight Opacity",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.4", "0.5"],
        "group": "Animation"
      },
      "cardWidth": {
        "dataType": "select",
        "displayName": "Card Width (px)",
        "defaultValue": "360",
        "options": ["300", "320", "360", "400", "480"],
        "group": "Layout"
      },
      "cardHeight": {
        "dataType": "select",
        "displayName": "Card Height (px)",
        "defaultValue": "240",
        "options": ["200", "220", "240", "280", "320"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "16",
        "options": ["0", "8", "12", "16", "20"],
        "group": "Layout"
      },
      "padding": {
        "dataType": "select",
        "displayName": "Padding",
        "defaultValue": "32",
        "options": ["24", "28", "32", "40"],
        "group": "Layout"
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
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "spotlightColor": {
        "dataType": "color",
        "displayName": "Spotlight Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 20,
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
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  // Config values
  const title = config?.title || "Spotlight Effect";
  const description = config?.description || "Move your cursor over the card to see the spotlight shine";
  const spotlightSize = parseInt(config?.spotlightSize || "300");
  const spotlightOpacity = parseFloat(config?.spotlightOpacity || "0.3");
  const cardWidth = parseInt(config?.cardWidth || "360");
  const cardHeight = parseInt(config?.cardHeight || "240");
  const borderRadius = parseInt(config?.borderRadius || "16");
  const padding = parseInt(config?.padding || "32");
  const backgroundColor = config?.backgroundColor || "#18181B";
  const textColor = config?.textColor || "#FFFFFF";
  const borderColor = config?.borderColor || "#3F3F46";
  const spotlightColor = config?.spotlightColor || "#FFFFFF";
  const fontSize = config?.fontSize || 20;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const handleMouseMove = (e) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    position: 'relative',
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
    backgroundColor: backgroundColor,
    color: textColor,
    borderRadius: `${borderRadius}px`,
    padding: `${padding}px`,
    border: `1px solid ${borderColor}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'default',
    overflow: 'hidden',
    transition: 'border-color 0.3s ease'
  };

  const spotlightStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: `${borderRadius}px`,
    pointerEvents: 'none',
    opacity: isHovered ? 1 : 0,
    background: prefersReducedMotion 
      ? 'transparent' 
      : `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}${Math.round(spotlightOpacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
    transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease'
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1
  };

  const titleStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    marginBottom: '12px',
    letterSpacing: '0.02em'
  };

  const descriptionStyle = {
    fontSize: `${fontSize * 0.75}px`,
    fontWeight: '400',
    lineHeight: '1.6',
    opacity: 0.8
  };

  return (
    <div 
      ref={cardRef}
      className="spotlight-card"
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight effect */}
      <div style={spotlightStyle} />
      
      {/* Content */}
      <div style={contentStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <p style={descriptionStyle}>{description}</p>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
