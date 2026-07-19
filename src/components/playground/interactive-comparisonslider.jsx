import React from "react";

const MANIFEST = {
  "type": "Interactive.ComparisonSlider",
  "description": "Before/after image comparison slider with draggable handle",
  "editorElement": {
    "selector": ".comparison-slider",
    "displayName": "Comparison Slider",
    "archetype": "container",
    "data": {
      "beforeLabel": {
        "dataType": "text",
        "displayName": "Before Label",
        "defaultValue": "Before",
        "group": "Content"
      },
      "afterLabel": {
        "dataType": "text",
        "displayName": "After Label",
        "defaultValue": "After",
        "group": "Content"
      },
      "initialPosition": {
        "dataType": "select",
        "displayName": "Initial Position (%)",
        "defaultValue": "50",
        "options": ["25", "33", "50", "66", "75"],
        "group": "Content"
      },
      "showLabels": {
        "dataType": "booleanValue",
        "displayName": "Show Labels",
        "defaultValue": true,
        "group": "Content"
      },
      "sliderWidth": {
        "dataType": "select",
        "displayName": "Slider Width (px)",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800"],
        "group": "Layout"
      },
      "sliderHeight": {
        "dataType": "select",
        "displayName": "Slider Height (px)",
        "defaultValue": "400",
        "options": ["300", "350", "400", "450", "500"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "12",
        "options": ["0", "8", "12", "16", "20"],
        "group": "Layout"
      },
      "handleColor": {
        "dataType": "color",
        "displayName": "Handle Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "dividerColor": {
        "dataType": "color",
        "displayName": "Divider Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "labelBackgroundColor": {
        "dataType": "color",
        "displayName": "Label Background",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "labelTextColor": {
        "dataType": "color",
        "displayName": "Label Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 14,
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
      "contentResizeDirection": "both"
    }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);

  // Config values
  const beforeLabel = config?.beforeLabel || "Before";
  const afterLabel = config?.afterLabel || "After";
  const initialPosition = parseInt(config?.initialPosition || "50");
  const showLabels = config?.showLabels !== false;
  const sliderWidth = parseInt(config?.sliderWidth || "600");
  const sliderHeight = parseInt(config?.sliderHeight || "400");
  const borderRadius = parseInt(config?.borderRadius || "12");
  const handleColor = config?.handleColor || "#FFFFFF";
  const dividerColor = config?.dividerColor || "#FFFFFF";
  const labelBackgroundColor = config?.labelBackgroundColor || "#18181B";
  const labelTextColor = config?.labelTextColor || "#FFFFFF";
  const fontSize = config?.fontSize || 14;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Initialize position
  React.useEffect(() => {
    setSliderPosition(initialPosition);
  }, [initialPosition]);

  const updateSliderPosition = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
    
    setSliderPosition(clampedPercentage);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateSliderPosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  // Event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);

  const containerStyle = {
    position: 'relative',
    width: `${sliderWidth}px`,
    height: `${sliderHeight}px`,
    maxWidth: '100%',
    borderRadius: `${borderRadius}px`,
    overflow: 'hidden',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    WebkitUserSelect: 'none'
  };

  const imageBaseStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none'
  };

  const beforeImageStyle = {
    ...imageBaseStyle,
    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
  };

  const dividerStyle = {
    position: 'absolute',
    top: 0,
    left: `${sliderPosition}%`,
    width: '4px',
    height: '100%',
    backgroundColor: dividerColor,
    transform: 'translateX(-50%)',
    transition: prefersReducedMotion ? 'none' : (isDragging ? 'none' : 'left 0.1s ease-out'),
    pointerEvents: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
  };

  const handleStyle = {
    position: 'absolute',
    top: '50%',
    left: `${sliderPosition}%`,
    width: '48px',
    height: '48px',
    backgroundColor: handleColor,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    transition: prefersReducedMotion ? 'none' : (isDragging ? 'none' : 'left 0.1s ease-out'),
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: 10
  };

  const arrowStyle = {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const labelStyle = (position) => ({
    position: 'absolute',
    top: '20px',
    [position]: '20px',
    padding: '8px 16px',
    backgroundColor: `${labelBackgroundColor}CC`,
    color: labelTextColor,
    borderRadius: '6px',
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    pointerEvents: 'none',
    backdropFilter: 'blur(4px)'
  });

  // Placeholder images (gradient backgrounds)
  const beforeGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  const afterGradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';

  return (
    <div 
      ref={containerRef}
      className="comparison-slider"
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {/* After Image (background) */}
      <div style={{ ...imageBaseStyle, background: afterGradient }} />
      
      {/* Before Image (clipped) */}
      <div style={{ ...beforeImageStyle, background: beforeGradient }} />
      
      {/* Labels */}
      {showLabels && (
        <>
          <div style={labelStyle('left')}>{beforeLabel}</div>
          <div style={labelStyle('right')}>{afterLabel}</div>
        </>
      )}
      
      {/* Divider Line */}
      <div style={dividerStyle} />
      
      {/* Handle */}
      <div style={handleStyle}>
        <div style={arrowStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#18181B' }}>
            <path d="M15 18l-6-6 6-6" />
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
