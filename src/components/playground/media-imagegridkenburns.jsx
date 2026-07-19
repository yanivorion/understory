import React from "react";

const MANIFEST = {
  "type": "Media.ImageGridKenBurns",
  "description": "Image grid with Ken Burns zoom effect on hover, smooth transitions, and overlay captions",
  "editorElement": {
    "selector": ".image-grid-ken-burns",
    "displayName": "Image Grid Ken Burns",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs (comma-separated)",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600,https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600,https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600,https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600",
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
      "gap": {
        "dataType": "select",
        "displayName": "Grid Gap",
        "defaultValue": "16",
        "options": ["8", "12", "16", "20", "24"],
        "group": "Layout"
      },
      "zoomLevel": {
        "dataType": "select",
        "displayName": "Zoom Level",
        "defaultValue": "1.15",
        "options": ["1.1", "1.15", "1.2", "1.3"],
        "group": "Animation"
      },
      "showCaptions": {
        "dataType": "booleanValue",
        "displayName": "Show Captions",
        "defaultValue": true,
        "group": "Content"
      },
      "showOverlay": {
        "dataType": "booleanValue",
        "displayName": "Show Hover Overlay",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Overlay Color",
        "defaultValue": "#000000",
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
  const images = (config?.images || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600,https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600,https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600,https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600')
    .split(',')
    .map(url => url.trim());
  const captions = (config?.captions || 'Mountain Vista,Forest Trail,Ocean Waves,Desert Sunset,Winter Woods,Autumn Colors')
    .split(',')
    .map(c => c.trim());
  const columns = parseInt(config?.columns || '3');
  const gap = parseInt(config?.gap || '16');
  const zoomLevel = parseFloat(config?.zoomLevel || '1.15');
  const showCaptions = config?.showCaptions !== false;
  const showOverlay = config?.showOverlay !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#FFFFFF';
  const overlayColor = config?.overlayColor || '#000000';
  const accentColor = config?.accentColor || '#495057';
  
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const getRandomZoomDirection = (index) => {
    const directions = [
      { x: 0, y: 0 },      // Center
      { x: -5, y: -5 },    // Top-left
      { x: 5, y: -5 },     // Top-right
      { x: -5, y: 5 },     // Bottom-left
      { x: 5, y: 5 },      // Bottom-right
    ];
    return directions[index % directions.length];
  };
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '500',
          color: accentColor,
          textAlign: 'center',
          marginBottom: '48px',
          letterSpacing: '-0.02em'
        }}>
          Explore the Gallery
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`
        }}>
          {images.map((image, index) => {
            const isHovered = hoveredIndex === index;
            const caption = captions[index] || `Image ${index + 1}`;
            const zoomDirection = getRandomZoomDirection(index);
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: isHovered
                    ? '0 12px 32px rgba(0, 0, 0, 0.2)'
                    : '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 500ms ease-out, transform 500ms ease-out',
                  transform: prefersReducedMotion ? 'none' : (isHovered ? 'translateY(-4px)' : 'translateY(0)')
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <img
                    src={image}
                    alt={caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: prefersReducedMotion
                        ? 'none'
                        : isHovered
                        ? `scale(${zoomLevel}) translate(${zoomDirection.x}%, ${zoomDirection.y}%)`
                        : 'scale(1) translate(0, 0)',
                      transition: 'transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      willChange: 'transform'
                    }}
                  />
                </div>
                
                {showOverlay && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to top, ${overlayColor}CC, transparent)`,
                    opacity: prefersReducedMotion ? 1 : (isHovered ? 1 : 0),
                    transition: 'opacity 500ms ease-out',
                    pointerEvents: 'none'
                  }} />
                )}
                
                {showCaptions && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px',
                    color: textColor,
                    transform: prefersReducedMotion
                      ? 'none'
                      : isHovered
                      ? 'translateY(0)'
                      : 'translateY(20px)',
                    opacity: prefersReducedMotion ? 1 : (isHovered ? 1 : 0),
                    transition: 'all 500ms ease-out',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '500',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em'
                    }}>
                      {caption}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      opacity: 0.9,
                      margin: 0
                    }}>
                      Hover to explore
                    </p>
                  </div>
                )}
                
                {!showCaptions && isHovered && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    opacity: prefersReducedMotion ? 1 : (isHovered ? 1 : 0),
                    transform: prefersReducedMotion
                      ? 'none'
                      : isHovered
                      ? 'scale(1) rotate(0deg)'
                      : 'scale(0.8) rotate(-90deg)',
                    transition: 'all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}>
                    🔍
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div style={{
          marginTop: '48px',
          textAlign: 'center',
          fontSize: '14px',
          color: accentColor
        }}>
          Hover over images to see the Ken Burns effect • Zoom Level: {zoomLevel}x
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
