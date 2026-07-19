import React from "react";

const MANIFEST = {
  "type": "Media.BeforeAfterSlider",
  "description": "Before/after image comparison slider with draggable divider",
  "editorElement": {
    "selector": ".before-after-slider",
    "displayName": "Before/After Slider",
    "archetype": "container",
    "data": {
      "beforeImage": {
        "dataType": "text",
        "displayName": "Before Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "group": "Content"
      },
      "afterImage": {
        "dataType": "text",
        "displayName": "After Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
        "group": "Content"
      },
      "defaultPosition": {
        "dataType": "select",
        "displayName": "Default Position (%)",
        "defaultValue": "50",
        "options": ["25", "33", "50", "66", "75"],
        "group": "Content"
      },
      "orientation": {
        "dataType": "select",
        "displayName": "Divider Orientation",
        "defaultValue": "vertical",
        "options": ["vertical", "horizontal"],
        "group": "Layout"
      },
      "showLabels": {
        "dataType": "booleanValue",
        "displayName": "Show Before/After Labels",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "dividerColor": {
        "dataType": "color",
        "displayName": "Divider Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "handleColor": {
        "dataType": "color",
        "displayName": "Handle Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
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
  const beforeImage = config?.beforeImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
  const afterImage = config?.afterImage || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800';
  const defaultPosition = parseInt(config?.defaultPosition || '50');
  const orientation = config?.orientation || 'vertical';
  const showLabels = config?.showLabels !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const dividerColor = config?.dividerColor || '#FFFFFF';
  const handleColor = config?.handleColor || '#495057';
  const accentColor = config?.accentColor || '#495057';
  
  const [position, setPosition] = React.useState(defaultPosition);
  const [isDragging, setIsDragging] = React.useState(false);
  
  const containerRef = React.useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const handleMove = (clientX, clientY) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    if (orientation === 'vertical') {
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(percentage);
    } else {
      const y = clientY - rect.top;
      const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
      setPosition(percentage);
    }
  };
  
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.clientY);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };
  
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            borderRadius: '12px',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
          }}
        >
          <img
            src={afterImage}
            alt="After"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              userSelect: 'none'
            }}
            draggable={false}
          />
          
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              clipPath: orientation === 'vertical'
                ? `inset(0 ${100 - position}% 0 0)`
                : `inset(0 0 ${100 - position}% 0)`,
              transition: isDragging ? 'none' : 'clip-path 150ms ease-out'
            }}
          >
            <img
              src={beforeImage}
              alt="Before"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
              draggable={false}
            />
          </div>
          
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            style={{
              position: 'absolute',
              ...(orientation === 'vertical' ? {
                left: `${position}%`,
                top: 0,
                bottom: 0,
                width: '4px',
                transform: 'translateX(-50%)',
                cursor: 'ew-resize'
              } : {
                top: `${position}%`,
                left: 0,
                right: 0,
                height: '4px',
                transform: 'translateY(-50%)',
                cursor: 'ns-resize'
              }),
              backgroundColor: dividerColor,
              zIndex: 2,
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              transition: isDragging ? 'none' : 'all 150ms ease-out'
            }}
          >
            <div
              style={{
                position: 'absolute',
                ...(orientation === 'vertical' ? {
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '48px',
                  height: '48px'
                } : {
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '48px',
                  height: '48px'
                }),
                backgroundColor: handleColor,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'transform 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                if (!isDragging) {
                  e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
            >
              <div style={{
                display: 'flex',
                gap: '2px',
                ...(orientation === 'vertical' ? {
                  flexDirection: 'row'
                } : {
                  flexDirection: 'column'
                })
              }}>
                <div style={{
                  width: orientation === 'vertical' ? '3px' : '12px',
                  height: orientation === 'vertical' ? '12px' : '3px',
                  backgroundColor: dividerColor,
                  borderRadius: '2px'
                }} />
                <div style={{
                  width: orientation === 'vertical' ? '3px' : '12px',
                  height: orientation === 'vertical' ? '12px' : '3px',
                  backgroundColor: dividerColor,
                  borderRadius: '2px'
                }} />
              </div>
            </div>
          </div>
          
          {showLabels && (
            <>
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                padding: '8px 16px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '6px',
                backdropFilter: 'blur(8px)',
                opacity: orientation === 'vertical' && position < 20 ? 0 : 1,
                transition: 'opacity 200ms ease-out',
                pointerEvents: 'none'
              }}>
                Before
              </div>
              
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '8px 16px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '6px',
                backdropFilter: 'blur(8px)',
                opacity: orientation === 'vertical' && position > 80 ? 0 : 1,
                transition: 'opacity 200ms ease-out',
                pointerEvents: 'none'
              }}>
                After
              </div>
            </>
          )}
        </div>
        
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '14px',
          color: accentColor
        }}>
          Drag the divider to compare • {Math.round(position)}%
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
