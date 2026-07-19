import React from "react";

const MANIFEST = {
  "type": "Media.PolaroidPhotoGrid",
  "description": "Polaroid photo grid with random rotation angles, handwritten captions, and stacking effect",
  "editorElement": {
    "selector": ".polaroid-photo-grid",
    "displayName": "Polaroid Photo Grid",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs (comma-separated)",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400,https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400,https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400,https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400",
        "group": "Content"
      },
      "captions": {
        "dataType": "text",
        "displayName": "Captions (comma-separated)",
        "defaultValue": "Mountain Vista,Forest Trail,Ocean Waves,Desert Sunset,Winter Woods,Autumn Colors",
        "group": "Content"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "maxRotation": {
        "dataType": "select",
        "displayName": "Max Rotation (degrees)",
        "defaultValue": "8",
        "options": ["3", "5", "8", "12", "15"],
        "group": "Layout"
      },
      "enableHoverEffect": {
        "dataType": "booleanValue",
        "displayName": "Enable Hover Effect",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F5F5F4",
        "group": "Colors"
      },
      "polaroidColor": {
        "dataType": "color",
        "displayName": "Polaroid Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
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
  const images = (config?.images || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400,https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400,https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400,https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400')
    .split(',')
    .map(url => url.trim());
  const captions = (config?.captions || 'Mountain Vista,Forest Trail,Ocean Waves,Desert Sunset,Winter Woods,Autumn Colors')
    .split(',')
    .map(c => c.trim());
  const columns = parseInt(config?.columns || '3');
  const maxRotation = parseInt(config?.maxRotation || '8');
  const enableHoverEffect = config?.enableHoverEffect !== false;
  const backgroundColor = config?.backgroundColor || '#F5F5F4';
  const polaroidColor = config?.polaroidColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const accentColor = config?.accentColor || '#495057';
  
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const getRandomRotation = (index) => {
    const seed = index * 12345;
    const random = Math.sin(seed) * 10000;
    const normalized = random - Math.floor(random);
    return (normalized - 0.5) * 2 * maxRotation;
  };
  
  const getRandomOffset = (index, axis) => {
    const seed = index * (axis === 'x' ? 67890 : 54321);
    const random = Math.sin(seed) * 10000;
    const normalized = random - Math.floor(random);
    return (normalized - 0.5) * 20;
  };
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      padding: '60px 20px',
      fontFamily: '"Caveat", cursive, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '60px 40px',
        padding: '20px'
      }}>
        {images.map((image, index) => {
          const rotation = getRandomRotation(index);
          const offsetX = getRandomOffset(index, 'x');
          const offsetY = getRandomOffset(index, 'y');
          const isHovered = hoveredIndex === index;
          const caption = captions[index] || `Photo ${index + 1}`;
          
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                transform: prefersReducedMotion
                  ? 'none'
                  : isHovered && enableHoverEffect
                  ? 'rotate(0deg) scale(1.05) translateZ(20px)'
                  : `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
                transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                zIndex: isHovered ? 10 : 1
              }}
            >
              <div style={{
                backgroundColor: polaroidColor,
                padding: '16px',
                paddingBottom: '60px',
                boxShadow: isHovered
                  ? '0 20px 40px rgba(0, 0, 0, 0.3)'
                  : '0 8px 16px rgba(0, 0, 0, 0.15)',
                transition: 'box-shadow 400ms ease-out',
                borderRadius: '4px'
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1',
                  backgroundColor: `${accentColor}10`,
                  overflow: 'hidden'
                }}>
                  <img
                    src={image}
                    alt={caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      opacity: prefersReducedMotion ? 1 : (isHovered ? 1 : 0.95),
                      transition: 'opacity 400ms ease-out'
                    }}
                  />
                  
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)',
                      opacity: prefersReducedMotion ? 0 : 1,
                      animation: prefersReducedMotion ? 'none' : 'shimmer 1s ease-out',
                      pointerEvents: 'none'
                    }} />
                  )}
                </div>
                
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  textAlign: 'center',
                  fontSize: '20px',
                  color: textColor,
                  fontFamily: '"Caveat", cursive',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  lineHeight: '1.2',
                  opacity: 0.8
                }}>
                  {caption}
                </div>
              </div>
              
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '20px',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))',
                borderRadius: '2px',
                opacity: 0.6
              }} />
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap');
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
