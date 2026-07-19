import React from "react";

const MANIFEST = {
  "type": "Media.ImageGalleryLightbox",
  "description": "Image gallery with lightbox zoom, swipe navigation, and keyboard controls",
  "editorElement": {
    "selector": ".image-gallery-lightbox",
    "displayName": "Image Gallery Lightbox",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs (comma-separated)",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800,https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800,https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800,https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
        "group": "Content"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4", "5"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Grid Gap",
        "defaultValue": "16",
        "options": ["8", "12", "16", "20", "24"],
        "group": "Layout"
      },
      "showCaptions": {
        "dataType": "booleanValue",
        "displayName": "Show Image Captions",
        "defaultValue": true,
        "group": "Content"
      },
      "enableSwipe": {
        "dataType": "booleanValue",
        "displayName": "Enable Swipe Navigation",
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
      "overlayColor": {
        "dataType": "color",
        "displayName": "Lightbox Overlay",
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
  const images = (config?.images || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800,https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800,https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800,https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800')
    .split(',')
    .map(url => url.trim());
  const columns = parseInt(config?.columns || '3');
  const gap = parseInt(config?.gap || '16');
  const showCaptions = config?.showCaptions !== false;
  const enableSwipe = config?.enableSwipe !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const overlayColor = config?.overlayColor || '#000000';
  const accentColor = config?.accentColor || '#495057';
  
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [swipeStart, setSwipeStart] = React.useState(null);
  const [swipeOffset, setSwipeOffset] = React.useState(0);
  
  const lightboxRef = React.useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setIsZoomed(false);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsZoomed(false);
    setSwipeOffset(0);
    document.body.style.overflow = 'auto';
  };
  
  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsZoomed(false);
      setSwipeOffset(0);
    }
  };
  
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsZoomed(false);
      setSwipeOffset(0);
    }
  };
  
  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        goToPrev();
        break;
      case 'ArrowRight':
        goToNext();
        break;
    }
  };
  
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex]);
  
  const handleTouchStart = (e) => {
    if (!enableSwipe) return;
    setSwipeStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    if (!enableSwipe || !swipeStart) return;
    const diff = e.touches[0].clientX - swipeStart;
    setSwipeOffset(diff);
  };
  
  const handleTouchEnd = () => {
    if (!enableSwipe) return;
    
    if (swipeOffset > 100) {
      goToPrev();
    } else if (swipeOffset < -100) {
      goToNext();
    }
    
    setSwipeStart(null);
    setSwipeOffset(0);
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
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`
      }}>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 300ms ease-out',
              backgroundColor: `${accentColor}15`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            
            {showCaptions && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '12px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                color: '#FFFFFF',
                fontSize: '14px',
                opacity: 0,
                transition: 'opacity 300ms ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}>
                Image {index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          onClick={(e) => {
            if (e.target === lightboxRef.current) {
              closeLightbox();
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: `${overlayColor}E6`,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: prefersReducedMotion ? 1 : (lightboxOpen ? 1 : 0),
            animation: prefersReducedMotion ? 'none' : 'fadeIn 300ms ease-out',
            backdropFilter: 'blur(8px)'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '32px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 200ms ease-out',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ×
          </button>
          
          {currentIndex > 0 && (
            <button
              onClick={goToPrev}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '32px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 200ms ease-out',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              ‹
            </button>
          )}
          
          {currentIndex < images.length - 1 && (
            <button
              onClick={goToNext}
              aria-label="Next image"
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '32px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 200ms ease-out',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              ›
            </button>
          )}
          
          <div style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            transform: prefersReducedMotion ? 'none' : `translateX(${swipeOffset}px)`,
            transition: swipeOffset === 0 ? 'transform 300ms ease-out' : 'none'
          }}>
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              onClick={() => setIsZoomed(!isZoomed)}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                cursor: 'zoom-in',
                transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                transition: 'transform 400ms ease-out',
                borderRadius: '8px'
              }}
            />
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#FFFFFF',
            fontSize: '14px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '8px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(8px)'
          }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
