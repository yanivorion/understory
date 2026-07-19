import React from "react";

const MANIFEST = {
  "type": "Media.ImageComparisonSlider",
  "description": "Advanced before/after image comparison slider with smooth dragging, snap behavior, overlay labels, and accessible keyboard controls",
  "editorElement": {
    "selector": ".image-comparison-container",
    "displayName": "Image Comparison Slider",
    "archetype": "container",
    "data": {
      "beforeImage": {
        "dataType": "text",
        "displayName": "Before Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop&sat=-100",
        "group": "Content"
      },
      "afterImage": {
        "dataType": "text",
        "displayName": "After Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
        "group": "Content"
      },
      "beforeLabel": {
        "dataType": "text",
        "displayName": "Before Label",
        "defaultValue": "BEFORE",
        "group": "Content"
      },
      "afterLabel": {
        "dataType": "text",
        "displayName": "After Label",
        "defaultValue": "AFTER",
        "group": "Content"
      },
      "showLabels": {
        "dataType": "booleanValue",
        "displayName": "Show Labels",
        "defaultValue": true,
        "group": "Content"
      },
      "initialPosition": {
        "dataType": "select",
        "displayName": "Initial Slider Position",
        "defaultValue": "50",
        "options": ["25", "33", "50", "66", "75"],
        "group": "Content"
      },
      "snapToCenter": {
        "dataType": "booleanValue",
        "displayName": "Snap to Center",
        "defaultValue": false,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "sliderColor": {
        "dataType": "color",
        "displayName": "Slider Line Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "handleColor": {
        "dataType": "color",
        "displayName": "Handle Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "handleIconColor": {
        "dataType": "color",
        "displayName": "Handle Icon Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "labelBackgroundColor": {
        "dataType": "color",
        "displayName": "Label Background Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "labelTextColor": {
        "dataType": "color",
        "displayName": "Label Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue"],
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "number",
        "displayName": "Label Size (px)",
        "defaultValue": 12,
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
  const [sliderPosition, setSliderPosition] = React.useState(parseFloat(config?.initialPosition || "50"));
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef(null);

  const beforeImage = config?.beforeImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop&sat=-100";
  const afterImage = config?.afterImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop";
  const beforeLabel = config?.beforeLabel || "BEFORE";
  const afterLabel = config?.afterLabel || "AFTER";
  const showLabels = config?.showLabels !== false;
  const snapToCenter = config?.snapToCenter === true;
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const sliderColor = config?.sliderColor || "#FFFFFF";
  const handleColor = config?.handleColor || "#FFFFFF";
  const handleIconColor = config?.handleIconColor || "#495057";
  const labelBackgroundColor = config?.labelBackgroundColor || "#212529";
  const labelTextColor = config?.labelTextColor || "#FFFFFF";
  const fontFamily = config?.fontFamily || "system-ui";
  const labelSize = config?.labelSize || 12;

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const updateSliderPosition = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((clientX - rect.left) / rect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));
    
    setSliderPosition(newPosition);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    if (isDragging && snapToCenter) {
      const snapThreshold = 10;
      if (Math.abs(sliderPosition - 50) < snapThreshold) {
        setSliderPosition(50);
      }
    }
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setSliderPosition(prev => Math.max(0, prev - 5));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSliderPosition(prev => Math.min(100, prev + 5));
        break;
      case 'Home':
        e.preventDefault();
        setSliderPosition(0);
        break;
      case 'End':
        e.preventDefault();
        setSliderPosition(100);
        break;
    }
  };

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
  }, [isDragging, sliderPosition]);

  return (
    <div 
      className="image-comparison-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        ref={containerRef}
        tabIndex={0}
        role="slider"
        aria-label="Image comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        onKeyDown={handleKeyDown}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          aspectRatio: '4/3',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          outline: 'none',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }}
      >
        {/* After Image (Full) */}
        <div style={{
          position: 'absolute',
          inset: 0
        }}>
          <img
            src={afterImage}
            alt="After"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          />
          
          {showLabels && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: labelBackgroundColor,
              color: labelTextColor,
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: `${labelSize}px`,
              fontWeight: '500',
              letterSpacing: '0.1em',
              opacity: 0.9
            }}>
              {afterLabel}
            </div>
          )}
        </div>

        {/* Before Image (Clipped) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: prefersReducedMotion || isDragging ? 'none' : 'clip-path 100ms ease-out'
        }}>
          <img
            src={beforeImage}
            alt="Before"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          />
          
          {showLabels && (
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: labelBackgroundColor,
              color: labelTextColor,
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: `${labelSize}px`,
              fontWeight: '500',
              letterSpacing: '0.1em',
              opacity: 0.9
            }}>
              {beforeLabel}
            </div>
          )}
        </div>

        {/* Slider Line */}
        <div
          style={{
            position: 'absolute',
            left: `${sliderPosition}%`,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: sliderColor,
            transform: 'translateX(-50%)',
            boxShadow: '0 0 16px rgba(0,0,0,0.3)',
            transition: prefersReducedMotion || isDragging ? 'none' : 'left 100ms ease-out',
            pointerEvents: 'none'
          }}
        />

        {/* Handle */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          style={{
            position: 'absolute',
            left: `${sliderPosition}%`,
            top: '50%',
            width: '56px',
            height: '56px',
            backgroundColor: handleColor,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: prefersReducedMotion || isDragging ? 'none' : 'left 100ms ease-out, transform 150ms ease-out',
            touchAction: 'none'
          }}
          onMouseEnter={(e) => {
            if (!isDragging && !prefersReducedMotion) {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isDragging) {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
            }
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 5l-6 7 6 7M16 5l6 7-6 7" stroke={handleIconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Hint Text */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: labelBackgroundColor,
          color: labelTextColor,
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '12px',
          opacity: isDragging ? 0 : 0.7,
          transition: prefersReducedMotion ? 'none' : 'opacity 200ms ease-out',
          pointerEvents: 'none'
        }}>
          Drag slider or use arrow keys
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
