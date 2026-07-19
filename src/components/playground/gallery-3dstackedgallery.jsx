import React from "react";

const MANIFEST = {
  "type": "Gallery.3DStackedGallery",
  "description": "A 3D stacked image gallery with shader effects, recreating the sophisticated layered card layout with depth and perspective",
  "editorElement": {
    "selector": ".stacked-gallery-container",
    "displayName": "3D Stacked Gallery",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs (comma-separated)",
        "defaultValue": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800,https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800,https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800,https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800,https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800",
        "group": "Content"
      },
      "autoRotate": {
        "dataType": "booleanValue",
        "displayName": "Auto Rotate",
        "defaultValue": true,
        "group": "Content"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed (seconds)",
        "defaultValue": "4",
        "options": ["2", "3", "4", "5", "7"],
        "group": "Animation"
      },
      "spread": {
        "dataType": "select",
        "displayName": "Card Spread",
        "defaultValue": "120",
        "options": ["80", "100", "120", "140", "160"],
        "group": "Layout",
        "description": "Spacing between cards in pixels"
      },
      "depth": {
        "dataType": "select",
        "displayName": "3D Depth",
        "defaultValue": "200",
        "options": ["100", "150", "200", "250", "300"],
        "group": "Layout",
        "description": "Z-axis depth between layers"
      },
      "perspective": {
        "dataType": "select",
        "displayName": "Perspective",
        "defaultValue": "1200",
        "options": ["800", "1000", "1200", "1500", "2000"],
        "group": "Layout"
      },
      "showControls": {
        "dataType": "booleanValue",
        "displayName": "Show Controls",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "controlColor": {
        "dataType": "color",
        "displayName": "Control Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "controlHoverColor": {
        "dataType": "color",
        "displayName": "Control Hover Color",
        "defaultValue": "#3F3F46",
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
  const containerRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const rotationRef = React.useRef(0);
  const targetRotationRef = React.useRef(0);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const frameRef = React.useRef(null);

  // Safe config access
  const images = (config?.images || MANIFEST.editorElement.data.images.defaultValue).split(',').map(s => s.trim());
  const autoRotate = config?.autoRotate !== false;
  const rotationSpeed = parseFloat(config?.rotationSpeed || '4') * 1000;
  const spread = parseFloat(config?.spread || '120');
  const depth = parseFloat(config?.depth || '200');
  const perspective = parseFloat(config?.perspective || '1200');
  const showControls = config?.showControls !== false;
  const backgroundColor = config?.backgroundColor || '#F4F4F5';
  const controlColor = config?.controlColor || '#18181B';
  const controlHoverColor = config?.controlHoverColor || '#3F3F46';

  // Mouse move handler
  const handleMouseMove = React.useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
    };
  }, []);

  // Animation loop
  React.useEffect(() => {
    const animate = () => {
      // Smooth rotation
      rotationRef.current += (targetRotationRef.current - rotationRef.current) * 0.1;

      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll('.gallery-card');
        cards.forEach((card, index) => {
          const offset = index - currentIndex;
          const absOffset = Math.abs(offset);
          
          // Calculate position
          const angle = rotationRef.current + (offset * 15); // degrees
          const x = Math.sin(angle * Math.PI / 180) * spread;
          const z = Math.cos(angle * Math.PI / 180) * depth - depth;
          const rotateY = -angle;
          
          // Mouse parallax effect
          const parallaxX = isHovering ? mouseRef.current.x * 20 * (1 - absOffset * 0.3) : 0;
          const parallaxY = isHovering ? mouseRef.current.y * 20 * (1 - absOffset * 0.3) : 0;
          
          // Opacity based on distance
          const opacity = Math.max(0.3, 1 - absOffset * 0.2);
          
          // Scale based on z position
          const scale = 1 - absOffset * 0.05;
          
          // Apply transforms
          card.style.transform = `
            translate3d(${x + parallaxX}px, ${parallaxY}px, ${z}px) 
            rotateY(${rotateY}deg) 
            scale(${scale})
          `;
          card.style.opacity = opacity;
          card.style.zIndex = 1000 - absOffset;
          
          // Blur for cards further away
          const blur = absOffset > 0 ? Math.min(absOffset * 2, 8) : 0;
          card.style.filter = `blur(${blur}px)`;
        });
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [currentIndex, isHovering, spread, depth]);

  // Auto-rotation
  React.useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      handleNext();
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed, currentIndex]);

  const handleNext = () => {
    targetRotationRef.current -= 15;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    targetRotationRef.current += 15;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index) => {
    const diff = currentIndex - index;
    targetRotationRef.current += diff * 15;
    setCurrentIndex(index);
  };

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div 
      className="stacked-gallery-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '600px',
        backgroundColor: backgroundColor,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%'
      }}
    >
      {/* 3D Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)'
        }}
      >
        {images.map((url, index) => (
          <div
            key={index}
            className="gallery-card"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '400px',
              height: '500px',
              marginLeft: '-200px',
              marginTop: '-250px',
              transformStyle: 'preserve-3d',
              transition: prefersReducedMotion ? 'none' : 'filter 300ms ease-out',
              willChange: 'transform, opacity',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <img
              src={url}
              alt={`Gallery image ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
              draggable="false"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      {showControls && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: '32px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: `2px solid ${controlColor}`,
              backgroundColor: backgroundColor,
              color: controlColor,
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: prefersReducedMotion ? 'none' : 'all 250ms ease-out',
              zIndex: 10000,
              fontWeight: '300'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = controlColor;
              e.currentTarget.style.color = backgroundColor;
              e.currentTarget.style.borderColor = controlColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = backgroundColor;
              e.currentTarget.style.color = controlColor;
              e.currentTarget.style.borderColor = controlColor;
            }}
          >
            ←
          </button>

          <button
            onClick={handleNext}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: '32px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: `2px solid ${controlColor}`,
              backgroundColor: backgroundColor,
              color: controlColor,
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: prefersReducedMotion ? 'none' : 'all 250ms ease-out',
              zIndex: 10000,
              fontWeight: '300'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = controlColor;
              e.currentTarget.style.color = backgroundColor;
              e.currentTarget.style.borderColor = controlColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = backgroundColor;
              e.currentTarget.style.color = controlColor;
              e.currentTarget.style.borderColor = controlColor;
            }}
          >
            →
          </button>

          {/* Dot Indicators */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              zIndex: 10000
            }}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to image ${index + 1}`}
                style={{
                  width: currentIndex === index ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: currentIndex === index ? controlColor : controlColor + '40',
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out',
                  padding: 0
                }}
                onMouseEnter={(e) => {
                  if (currentIndex !== index) {
                    e.currentTarget.style.backgroundColor = controlHoverColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentIndex !== index) {
                    e.currentTarget.style.backgroundColor = controlColor + '40';
                  }
                }}
              />
            ))}
          </div>

          {/* Index Counter */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              fontSize: '14px',
              fontWeight: '400',
              color: controlColor,
              letterSpacing: '0.05em',
              zIndex: 10000
            }}
          >
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
