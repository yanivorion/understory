import React from "react";

const MANIFEST = {
  "type": "Media.ImageCarousel",
  "description": "Image carousel with thumbnail navigation, autoplay, and smooth transitions",
  "editorElement": {
    "selector": ".image-carousel",
    "displayName": "Image Carousel",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs (comma-separated)",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800,https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800,https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        "group": "Content"
      },
      "autoplay": {
        "dataType": "booleanValue",
        "displayName": "Autoplay",
        "defaultValue": true,
        "group": "Content"
      },
      "autoplaySpeed": {
        "dataType": "select",
        "displayName": "Autoplay Speed (seconds)",
        "defaultValue": "4",
        "options": ["2", "3", "4", "5", "6"],
        "group": "Content"
      },
      "showThumbnails": {
        "dataType": "booleanValue",
        "displayName": "Show Thumbnails",
        "defaultValue": true,
        "group": "Content"
      },
      "showDots": {
        "dataType": "booleanValue",
        "displayName": "Show Dot Indicators",
        "defaultValue": true,
        "group": "Content"
      },
      "showArrows": {
        "dataType": "booleanValue",
        "displayName": "Show Arrow Buttons",
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
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "activeColor": {
        "dataType": "color",
        "displayName": "Active Indicator Color",
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
  const images = (config?.images || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800,https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800,https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800')
    .split(',')
    .map(url => url.trim());
  const autoplay = config?.autoplay !== false;
  const autoplaySpeed = parseInt(config?.autoplaySpeed || '4') * 1000;
  const showThumbnails = config?.showThumbnails !== false;
  const showDots = config?.showDots !== false;
  const showArrows = config?.showArrows !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const activeColor = config?.activeColor || '#495057';
  const accentColor = config?.accentColor || '#495057';
  
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(autoplay);
  const [direction, setDirection] = React.useState('next');
  
  const autoplayRef = React.useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };
  
  const goToNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const goToPrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  React.useEffect(() => {
    if (isPlaying && !prefersReducedMotion) {
      autoplayRef.current = setInterval(() => {
        goToNext();
      }, autoplaySpeed);
      
      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [isPlaying, currentIndex, autoplaySpeed, prefersReducedMotion]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };
  
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
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
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: `${accentColor}15`,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: index === currentIndex ? 1 : 0,
                  transform: prefersReducedMotion ? 'none' : (
                    index === currentIndex
                      ? 'translateX(0) scale(1)'
                      : direction === 'next'
                      ? 'translateX(100%) scale(0.95)'
                      : 'translateX(-100%) scale(0.95)'
                  ),
                  transition: prefersReducedMotion ? 'opacity 300ms ease-out' : 'all 500ms ease-out',
                  pointerEvents: index === currentIndex ? 'auto' : 'none'
                }}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
          
          {showArrows && (
            <>
              <button
                onClick={goToPrev}
                aria-label="Previous slide"
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: textColor,
                  fontSize: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 200ms ease-out',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  zIndex: 2
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ‹
              </button>
              
              <button
                onClick={goToNext}
                aria-label="Next slide"
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: textColor,
                  fontSize: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 200ms ease-out',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  zIndex: 2
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ›
              </button>
            </>
          )}
          
          {showDots && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              zIndex: 2
            }}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  style={{
                    width: index === currentIndex ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: index === currentIndex
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 300ms ease-out',
                    padding: 0
                  }}
                />
              ))}
            </div>
          )}
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: textColor,
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 200ms ease-out',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 2
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
        
        {showThumbnails && (
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '20px',
            overflowX: 'auto',
            padding: '4px',
            scrollbarWidth: 'thin'
          }}>
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  flexShrink: 0,
                  width: '120px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: index === currentIndex ? `3px solid ${activeColor}` : '3px solid transparent',
                  opacity: index === currentIndex ? 1 : 0.6,
                  transition: 'all 200ms ease-out',
                  backgroundColor: `${accentColor}15`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.opacity = '0.6';
                  }
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
