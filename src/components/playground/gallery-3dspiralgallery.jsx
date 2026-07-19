import React from "react";

const MANIFEST = {
  "type": "Gallery.3DSpiralGallery",
  "description": "Advanced 3D spiral gallery with perspective transforms and helical image positioning",
  "editorElement": {
    "selector": ".spiral-gallery-3d",
    "displayName": "3D Spiral Gallery",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs (comma-separated)",
        "defaultValue": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800,https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800,https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800,https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800,https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800,https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800,https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800,https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=800,https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800,https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800,https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=800,https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=800,https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800,https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800,https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800,https://images.unsplash.com/photo-1490598000245-075175152d25?w=800,https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800,https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=800,https://images.unsplash.com/photo-1519501025264-65ba15a82391?w=800,https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
        "group": "Content"
      },
      "showTitle": {
        "dataType": "booleanValue",
        "displayName": "Show Gallery Title",
        "defaultValue": true,
        "group": "Content"
      },
      "galleryTitle": {
        "dataType": "text",
        "displayName": "Gallery Title",
        "defaultValue": "City Gallery",
        "group": "Content"
      },
      "showNavButtons": {
        "dataType": "booleanValue",
        "displayName": "Show Navigation Buttons",
        "defaultValue": true,
        "group": "Content"
      },
      "autoRotate": {
        "dataType": "booleanValue",
        "displayName": "Auto Rotate",
        "defaultValue": false,
        "group": "Animation"
      },
      "autoRotateSpeed": {
        "dataType": "select",
        "displayName": "Auto Rotate Speed",
        "defaultValue": "20",
        "options": ["10", "15", "20", "30", "40"],
        "group": "Animation",
        "description": "Seconds per full rotation"
      },
      "spiralRadius": {
        "dataType": "select",
        "displayName": "Spiral Radius",
        "defaultValue": "450",
        "options": ["300", "350", "400", "450", "500", "600"],
        "group": "Layout",
        "description": "Distance from center in pixels"
      },
      "spiralDepth": {
        "dataType": "select",
        "displayName": "Spiral Depth",
        "defaultValue": "2000",
        "options": ["1000", "1500", "2000", "2500", "3000"],
        "group": "Layout",
        "description": "Z-axis depth range for tunnel"
      },
      "spiralTurns": {
        "dataType": "select",
        "displayName": "Spiral Turns",
        "defaultValue": "4",
        "options": ["2", "3", "4", "5", "6", "8"],
        "group": "Layout",
        "description": "Number of complete rotations in spiral"
      },
      "verticalSpread": {
        "dataType": "select",
        "displayName": "Vertical Spread",
        "defaultValue": "0.6",
        "options": ["0.3", "0.4", "0.5", "0.6", "0.7", "0.8"],
        "group": "Layout",
        "description": "Vertical winding amount (0-1)"
      },
      "imageWidth": {
        "dataType": "select",
        "displayName": "Image Width",
        "defaultValue": "200",
        "options": ["150", "180", "200", "220", "250"],
        "group": "Layout"
      },
      "imageHeight": {
        "dataType": "select",
        "displayName": "Image Height",
        "defaultValue": "150",
        "options": ["120", "140", "150", "170", "200"],
        "group": "Layout"
      },
      "perspective": {
        "dataType": "select",
        "displayName": "3D Perspective",
        "defaultValue": "1400",
        "options": ["1000", "1200", "1400", "1600", "2000"],
        "group": "Layout",
        "description": "Lower = more dramatic 3D effect"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed",
        "defaultValue": "600",
        "options": ["400", "500", "600", "800", "1000"],
        "group": "Animation",
        "description": "Transition duration in ms"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#0A0A0A",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#2A2A2A",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "buttonColor": {
        "dataType": "color",
        "displayName": "Button Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "buttonHoverColor": {
        "dataType": "color",
        "displayName": "Button Hover Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "0.1em",
        "options": ["0em", "0.05em", "0.1em", "0.15em", "0.2em"],
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
  const images = (config?.images || MANIFEST.editorElement.data.images.defaultValue).split(',').map(url => url.trim());
  const showTitle = config?.showTitle !== false;
  const galleryTitle = config?.galleryTitle || 'City Gallery';
  const showNavButtons = config?.showNavButtons !== false;
  const autoRotate = config?.autoRotate || false;
  const autoRotateSpeed = parseInt(config?.autoRotateSpeed || '20');
  const spiralRadius = parseInt(config?.spiralRadius || '450');
  const spiralDepth = parseInt(config?.spiralDepth || '2000');
  const spiralTurns = parseInt(config?.spiralTurns || '4');
  const verticalSpread = parseFloat(config?.verticalSpread || '0.6');
  const imageWidth = parseInt(config?.imageWidth || '200');
  const imageHeight = parseInt(config?.imageHeight || '150');
  const perspective = parseInt(config?.perspective || '1400');
  const rotationSpeed = parseInt(config?.rotationSpeed || '600');
  const backgroundColor = config?.backgroundColor || '#0A0A0A';
  const cardBackgroundColor = config?.cardBackgroundColor || '#1A1A1A';
  const borderColor = config?.borderColor || '#2A2A2A';
  const titleColor = config?.titleColor || '#E9ECEF';
  const buttonColor = config?.buttonColor || '#E9ECEF';
  const buttonHoverColor = config?.buttonHoverColor || '#FFFFFF';
  const titleFontSize = config?.titleFontSize || 14;
  const fontWeight = config?.fontWeight || '400';
  const letterSpacing = config?.letterSpacing || '0.1em';

  const [currentRotation, setCurrentRotation] = React.useState(0);
  const [isAutoRotating, setIsAutoRotating] = React.useState(autoRotate);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const animationRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Auto-rotation effect
  React.useEffect(() => {
    if (isAutoRotating && !prefersReducedMotion) {
      const rotateStep = () => {
        setCurrentRotation(prev => prev + 0.2);
        animationRef.current = requestAnimationFrame(rotateStep);
      };
      animationRef.current = requestAnimationFrame(rotateStep);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoRotating, prefersReducedMotion]);

  const handlePrevious = () => {
    setCurrentRotation(prev => prev + (360 / images.length));
  };

  const handleNext = () => {
    setCurrentRotation(prev => prev - (360 / images.length));
  };

  const calculatePosition = (index, rotation) => {
    const totalImages = images.length;
    const angleStep = (Math.PI * 2) / totalImages;
    const angle = index * angleStep + (rotation * Math.PI / 180);
    
    // TRUE 3D HELIX: Spirals around (X), up/down (Y), and back (Z)
    const x = Math.cos(angle) * spiralRadius;
    
    // Y creates vertical winding - climbs as spiral goes deeper
    // Using smaller radius for Y creates elliptical helix
    const y = Math.sin(angle) * (spiralRadius * verticalSpread);
    
    // Z-depth continuously increases with angle (creates infinite tunnel)
    const z = -(angle / (Math.PI * 2 / spiralTurns)) * (spiralDepth / spiralTurns);
    
    // Calculate scale based on Z position (further = smaller)
    // Map z from 0 to -spiralDepth → scale from 1.0 to 0.2
    const normalizedDepth = Math.max(0, Math.min(1, -z / spiralDepth));
    const scale = 1.0 - (normalizedDepth * 0.8);
    
    // Rotation to face center
    const rotateY = -(angle * 180 / Math.PI) + 90;
    
    return { x, y, z, scale, rotateY };
  };

  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: '600px',
      backgroundColor,
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    title: {
      position: 'absolute',
      top: '30px',
      left: '30px',
      color: titleColor,
      fontSize: `${titleFontSize}px`,
      fontWeight,
      letterSpacing,
      textTransform: 'uppercase',
      zIndex: 100,
      opacity: showTitle ? 1 : 0,
      pointerEvents: showTitle ? 'auto' : 'none'
    },
    scene: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      perspective: `${perspective}px`,
      transformStyle: 'preserve-3d'
    },
    spiralContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: prefersReducedMotion ? 'none' : `transform ${rotationSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      transform: `translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(${currentRotation}deg)`
    },
    imageCard: (position, index) => ({
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: `${imageWidth}px`,
      height: `${imageHeight}px`,
      transformStyle: 'preserve-3d',
      transition: prefersReducedMotion ? 'none' : `transform ${rotationSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      transform: `
        translate(-50%, -50%)
        translate3d(${position.x}px, ${position.y}px, ${position.z}px)
        rotateY(${position.rotateY}deg)
        scale(${hoveredIndex === index ? position.scale * 1.1 : position.scale})
      `,
      cursor: 'pointer',
      willChange: 'transform'
    }),
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      backgroundColor: cardBackgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '4px',
      display: 'block',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
    },
    navButton: (side) => ({
      position: 'absolute',
      top: '50%',
      [side]: '30px',
      transform: 'translateY(-50%)',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      border: `2px solid ${borderColor}`,
      color: buttonColor,
      fontSize: '24px',
      display: showNavButtons ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 100,
      transition: 'all 200ms ease-out',
      userSelect: 'none',
      WebkitUserSelect: 'none'
    }),
    autoRotateToggle: {
      position: 'absolute',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '10px 20px',
      backgroundColor: isAutoRotating ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.6)',
      border: `1px solid ${borderColor}`,
      borderRadius: '20px',
      color: buttonColor,
      fontSize: '12px',
      fontWeight,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      zIndex: 100,
      transition: 'all 200ms ease-out',
      userSelect: 'none',
      WebkitUserSelect: 'none'
    }
  };

  return (
    <div 
      ref={containerRef}
      className="spiral-gallery-3d" 
      style={styles.container}
      onMouseEnter={() => setIsAutoRotating(false)}
      onMouseLeave={() => autoRotate && setIsAutoRotating(true)}
    >
      {showTitle && (
        <div style={styles.title}>{galleryTitle}</div>
      )}

      <div style={styles.scene}>
        <div style={styles.spiralContainer}>
          {images.map((url, index) => {
            const position = calculatePosition(index, currentRotation);
            return (
              <div
                key={index}
                style={styles.imageCard(position, index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={url}
                  alt={`Gallery image ${index + 1}`}
                  style={styles.image}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        style={styles.navButton('left')}
        onClick={handlePrevious}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
          e.currentTarget.style.color = buttonHoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
          e.currentTarget.style.color = buttonColor;
        }}
        aria-label="Previous image"
      >
        ←
      </button>

      <button
        style={styles.navButton('right')}
        onClick={handleNext}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
          e.currentTarget.style.color = buttonHoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
          e.currentTarget.style.color = buttonColor;
        }}
        aria-label="Next image"
      >
        →
      </button>

      <button
        style={styles.autoRotateToggle}
        onClick={() => setIsAutoRotating(!isAutoRotating)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.color = buttonHoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isAutoRotating ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.6)';
          e.currentTarget.style.color = buttonColor;
        }}
      >
        {isAutoRotating ? '⏸ Pause' : '▶ Auto Rotate'}
      </button>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
