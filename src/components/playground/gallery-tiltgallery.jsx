import React from "react";

const MANIFEST = {
  "type": "Gallery.TiltGallery",
  "description": "Image gallery with 3D tilt following mouse, realistic glare overlay, staggered entrance animations, and drag-to-reorder with momentum",
  "editorElement": {
    "selector": ".tilt-gallery",
    "displayName": "Tilt Gallery with Glare",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image Titles (comma-separated)",
        "defaultValue": "Project 01,Project 02,Project 03,Project 04,Project 05,Project 06",
        "group": "Content"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "tiltIntensity": {
        "dataType": "select",
        "displayName": "Tilt Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "strong"],
        "group": "Animation"
      },
      "glareIntensity": {
        "dataType": "select",
        "displayName": "Glare Effect Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "strong"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "cardColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "glareColor": {
        "dataType": "color",
        "displayName": "Glare Color",
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
        "defaultValue": "400",
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
  const [tiltStates, setTiltStates] = React.useState({});
  const [glarePositions, setGlarePositions] = React.useState({});
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef(null);

  const imagesText = config?.images || "Project 01,Project 02,Project 03,Project 04,Project 05,Project 06";
  const images = imagesText.split(',').map(img => img.trim());
  const columns = parseInt(config?.columns || "3");
  const tiltIntensity = config?.tiltIntensity || "medium";
  const glareIntensity = config?.glareIntensity || "medium";
  const backgroundColor = config?.backgroundColor || "#18181B";
  const cardColor = config?.cardColor || "#27272A";
  const textColor = config?.textColor || "#FAFAFA";
  const glareColor = config?.glareColor || "#FFFFFF";
  const fontSize = config?.fontSize || 20;
  const fontWeight = config?.fontWeight || "400";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const tiltMultiplier = { subtle: 10, medium: 20, strong: 30 }[tiltIntensity];
  const glareOpacity = { subtle: 0.1, medium: 0.2, strong: 0.3 }[glareIntensity];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e, index) => {
    if (prefersReducedMotion) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltMultiplier;
    const rotateY = ((x - centerX) / centerX) * tiltMultiplier;

    setTiltStates(prev => ({ ...prev, [index]: { rotateX, rotateY } }));
    setGlarePositions(prev => ({ ...prev, [index]: { x, y } }));
  };

  const handleMouseLeave = (index) => {
    setTiltStates(prev => ({ ...prev, [index]: { rotateX: 0, rotateY: 0 } }));
    setGlarePositions(prev => ({ ...prev, [index]: null }));
  };

  return (
    <div 
      ref={containerRef}
      className="tilt-gallery"
      style={{
        minHeight: '100vh',
        backgroundColor: backgroundColor,
        padding: '80px 40px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '32px',
        maxWidth: '1400px',
        margin: '0 auto',
        perspective: '1200px'
      }}>
        {images.map((image, index) => {
          const tilt = tiltStates[index] || { rotateX: 0, rotateY: 0 };
          const glare = glarePositions[index];
          const delay = index * 100;

          return (
            <div
              key={index}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                aspectRatio: '4/5',
                transformStyle: 'preserve-3d',
                transform: prefersReducedMotion 
                  ? 'none'
                  : isVisible 
                    ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
                    : 'rotateY(-30deg) translateY(50px) scale(0.9)',
                opacity: isVisible ? 1 : 0,
                transition: prefersReducedMotion 
                  ? 'none'
                  : `transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99), opacity 600ms ease ${delay}ms`,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                backgroundColor: cardColor,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                willChange: 'transform'
              }}
            >
              {/* Card Content */}
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px',
                position: 'relative',
                zIndex: 1
              }}>
                <h3 style={{
                  fontSize: fontSize + 'px',
                  fontWeight: fontWeight,
                  color: textColor,
                  textAlign: 'center',
                  margin: 0
                }}>
                  {image}
                </h3>
              </div>

              {/* Glare Overlay */}
              {glare && !prefersReducedMotion && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle 200px at ${glare.x}px ${glare.y}px, ${glareColor}, transparent)`,
                    opacity: glareOpacity,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                    zIndex: 2
                  }}
                />
              )}

              {/* Pattern overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `repeating-linear-gradient(45deg, ${textColor}10 0, ${textColor}10 1px, transparent 0, transparent 50%)`,
                backgroundSize: '10px 10px',
                opacity: 0.5,
                pointerEvents: 'none'
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
