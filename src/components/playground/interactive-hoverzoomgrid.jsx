import React from "react";

const MANIFEST = {
  "type": "Interactive.HoverZoomGrid",
  "description": "Image grid with hover zoom effect that dims other images",
  "editorElement": {
    "selector": ".hover-zoom-grid",
    "displayName": "Hover Zoom Grid",
    "archetype": "container",
    "data": {
      "itemCount": {
        "dataType": "select",
        "displayName": "Number of Items",
        "defaultValue": "6",
        "options": ["4", "6", "8", "9"],
        "group": "Content"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Gap",
        "defaultValue": "16",
        "options": ["12", "16", "20", "24"],
        "group": "Layout"
      },
      "aspectRatio": {
        "dataType": "select",
        "displayName": "Aspect Ratio",
        "defaultValue": "1/1",
        "options": ["1/1", "4/3", "16/9", "3/4"],
        "group": "Layout"
      },
      "zoomScale": {
        "dataType": "select",
        "displayName": "Zoom Scale",
        "defaultValue": "1.05",
        "options": ["1.03", "1.05", "1.08", "1.1"],
        "group": "Animation"
      },
      "transitionDuration": {
        "dataType": "select",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "300",
        "options": ["200", "300", "400", "500"],
        "group": "Animation"
      },
      "dimOpacity": {
        "dataType": "select",
        "displayName": "Dim Opacity",
        "defaultValue": "0.5",
        "options": ["0.3", "0.4", "0.5", "0.6"],
        "group": "Animation"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "12",
        "options": ["0", "8", "12", "16"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Overlay Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
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
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  // Config values
  const itemCount = parseInt(config?.itemCount || "6");
  const columns = parseInt(config?.columns || "3");
  const gap = parseInt(config?.gap || "16");
  const aspectRatio = config?.aspectRatio || "1/1";
  const zoomScale = parseFloat(config?.zoomScale || "1.05");
  const transitionDuration = parseInt(config?.transitionDuration || "300");
  const dimOpacity = parseFloat(config?.dimOpacity || "0.5");
  const borderRadius = parseInt(config?.borderRadius || "12");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const overlayColor = config?.overlayColor || "#18181B";
  const textColor = config?.textColor || "#FFFFFF";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Generate gradient backgrounds
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  ];

  const containerStyle = {
    width: '100%',
    backgroundColor: backgroundColor,
    padding: '48px 24px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const itemWrapperStyle = (index) => {
    const isHovered = hoveredIndex === index;
    const isDimmed = hoveredIndex !== null && !isHovered;

    return {
      position: 'relative',
      aspectRatio: aspectRatio,
      borderRadius: `${borderRadius}px`,
      overflow: 'hidden',
      cursor: 'pointer',
      transform: prefersReducedMotion 
        ? 'none' 
        : (isHovered ? `scale(${zoomScale})` : 'scale(1)'),
      opacity: isDimmed ? dimOpacity : 1,
      transition: prefersReducedMotion 
        ? 'none' 
        : `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${transitionDuration}ms ease`,
      zIndex: isHovered ? 10 : 1,
      willChange: 'transform, opacity'
    };
  };

  const imageStyle = (index) => ({
    width: '100%',
    height: '100%',
    background: gradients[index % gradients.length],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: textColor,
    fontSize: '24px',
    fontWeight: '500'
  });

  const overlayStyle = (index) => {
    const isHovered = hoveredIndex === index;

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `${overlayColor}`,
      opacity: isHovered ? 0 : 0.15,
      transition: prefersReducedMotion ? 'none' : `opacity ${transitionDuration}ms ease`,
      pointerEvents: 'none'
    };
  };

  return (
    <div className="hover-zoom-grid" style={containerStyle}>
      <div style={gridStyle}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <div
            key={index}
            style={itemWrapperStyle(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="img"
            aria-label={`Image ${index + 1}`}
          >
            <div style={imageStyle(index)}>
              {index + 1}
            </div>
            <div style={overlayStyle(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
