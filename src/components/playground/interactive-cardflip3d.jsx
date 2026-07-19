import React from "react";

const MANIFEST = {
  "type": "Interactive.CardFlip3D",
  "description": "Interactive 3D card flip gallery with perspective depth",
  "editorElement": {
    "selector": ".card-flip-3d",
    "displayName": "3D Card Flip",
    "archetype": "container",
    "data": {
      "frontTitle": {
        "dataType": "text",
        "displayName": "Front Title",
        "defaultValue": "Hover to Flip",
        "group": "Content"
      },
      "frontSubtitle": {
        "dataType": "text",
        "displayName": "Front Subtitle",
        "defaultValue": "Interactive Card",
        "group": "Content"
      },
      "backTitle": {
        "dataType": "text",
        "displayName": "Back Title",
        "defaultValue": "Back Side",
        "group": "Content"
      },
      "backDescription": {
        "dataType": "text",
        "displayName": "Back Description",
        "defaultValue": "Hidden content revealed on flip",
        "group": "Content"
      },
      "flipDuration": {
        "dataType": "select",
        "displayName": "Flip Duration (ms)",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800"],
        "group": "Animation"
      },
      "flipDirection": {
        "dataType": "select",
        "displayName": "Flip Direction",
        "defaultValue": "horizontal",
        "options": ["horizontal", "vertical"],
        "group": "Animation"
      },
      "triggerMode": {
        "dataType": "select",
        "displayName": "Trigger Mode",
        "defaultValue": "hover",
        "options": ["hover", "click"],
        "group": "Animation"
      },
      "cardWidth": {
        "dataType": "select",
        "displayName": "Card Width (px)",
        "defaultValue": "320",
        "options": ["280", "320", "360", "400"],
        "group": "Layout"
      },
      "cardHeight": {
        "dataType": "select",
        "displayName": "Card Height (px)",
        "defaultValue": "400",
        "options": ["320", "360", "400", "440", "480"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "12",
        "options": ["0", "8", "12", "16", "20"],
        "group": "Layout"
      },
      "frontBackgroundColor": {
        "dataType": "color",
        "displayName": "Front Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "frontTextColor": {
        "dataType": "color",
        "displayName": "Front Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "backBackgroundColor": {
        "dataType": "color",
        "displayName": "Back Background",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "backTextColor": {
        "dataType": "color",
        "displayName": "Back Text Color",
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
  const [isFlipped, setIsFlipped] = React.useState(false);

  // Config values
  const frontTitle = config?.frontTitle || "Hover to Flip";
  const frontSubtitle = config?.frontSubtitle || "Interactive Card";
  const backTitle = config?.backTitle || "Back Side";
  const backDescription = config?.backDescription || "Hidden content revealed on flip";
  const flipDuration = parseInt(config?.flipDuration || "600");
  const flipDirection = config?.flipDirection || "horizontal";
  const triggerMode = config?.triggerMode || "hover";
  const cardWidth = parseInt(config?.cardWidth || "320");
  const cardHeight = parseInt(config?.cardHeight || "400");
  const borderRadius = parseInt(config?.borderRadius || "12");
  const frontBackgroundColor = config?.frontBackgroundColor || "#FFFFFF";
  const frontTextColor = config?.frontTextColor || "#18181B";
  const backBackgroundColor = config?.backBackgroundColor || "#18181B";
  const backTextColor = config?.backTextColor || "#FFFFFF";
  const shadowColor = config?.shadowColor || "#000000";
  const fontSize = config?.fontSize || 24;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const handleInteraction = () => {
    if (triggerMode === 'click') {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (triggerMode === 'hover') {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerMode === 'hover') {
      setIsFlipped(false);
    }
  };

  const rotateAxis = flipDirection === 'horizontal' ? 'rotateY' : 'rotateX';
  const shadowOpacity = isFlipped ? 0.15 : 0.08;

  const containerStyle = {
    perspective: '1200px',
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
    cursor: triggerMode === 'click' ? 'pointer' : 'default'
  };

  const cardInnerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transform: prefersReducedMotion ? 'none' : (isFlipped ? `${rotateAxis}(180deg)` : `${rotateAxis}(0deg)`),
    transition: prefersReducedMotion ? 'none' : `transform ${flipDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
  };

  const cardFaceBaseStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: `${borderRadius}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
    textAlign: 'center',
    boxShadow: `0 8px 24px rgba(${parseInt(shadowColor.slice(1,3), 16)}, ${parseInt(shadowColor.slice(3,5), 16)}, ${parseInt(shadowColor.slice(5,7), 16)}, ${shadowOpacity})`,
    transition: prefersReducedMotion ? 'none' : `box-shadow ${flipDuration}ms ease`
  };

  const frontStyle = {
    ...cardFaceBaseStyle,
    backgroundColor: frontBackgroundColor,
    color: frontTextColor,
    transform: 'rotateY(0deg)'
  };

  const backStyle = {
    ...cardFaceBaseStyle,
    backgroundColor: backBackgroundColor,
    color: backTextColor,
    transform: `${rotateAxis}(180deg)`
  };

  const titleStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    marginBottom: '12px',
    letterSpacing: '0.02em'
  };

  const subtitleStyle = {
    fontSize: `${fontSize * 0.6}px`,
    fontWeight: '400',
    opacity: 0.8,
    letterSpacing: '0.03em'
  };

  const descriptionStyle = {
    fontSize: `${fontSize * 0.65}px`,
    fontWeight: '400',
    lineHeight: '1.6',
    opacity: 0.9,
    maxWidth: '32ch'
  };

  return (
    <div 
      className="card-flip-3d"
      style={containerStyle}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`Card: ${frontTitle}. ${triggerMode === 'click' ? 'Click' : 'Hover'} to flip.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleInteraction();
        }
      }}
    >
      <div style={cardInnerStyle}>
        {/* Front Face */}
        <div style={frontStyle}>
          <h3 style={titleStyle}>{frontTitle}</h3>
          <p style={subtitleStyle}>{frontSubtitle}</p>
        </div>

        {/* Back Face */}
        <div style={backStyle}>
          <h3 style={titleStyle}>{backTitle}</h3>
          <p style={descriptionStyle}>{backDescription}</p>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
