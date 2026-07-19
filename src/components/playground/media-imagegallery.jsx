import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Jul 19, 2026, 07:27 PM
 * Component Type: Media.ImageGallery
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Jul 19, 2026, 07:26 PM
 * Component Type: Media.ImageGallery
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Media.ImageGallery",
  "description": "Premium image gallery with lightbox modal, smooth transitions, thumbnail navigation, and keyboard controls",
  "editorElement": {
    "selector": ".image-gallery",
    "displayName": "Image Gallery",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Gallery Heading",
        "defaultValue": "PROJECT SHOWCASE",
        "group": "Content"
      },
      "images": {
        "dataType": "text",
        "displayName": "Image URLs (one per line)",
        "defaultValue": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450962-e8f6c1fe7715?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450898-784e44127c60?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450994-2f1af64e8191?w=800&q=80",
        "group": "Content",
        "description": "One image URL per line"
      },
      "captions": {
        "dataType": "text",
        "displayName": "Image Captions (one per line)",
        "defaultValue": "Modern Architecture\nUrban Design\nInterior Space\nContemporary Living\nMinimal Aesthetic\nNatural Light",
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
        "defaultValue": "1rem",
        "options": ["0.5rem", "0.75rem", "1rem", "1.5rem"],
        "group": "Layout"
      },
      "aspectRatio": {
        "dataType": "select",
        "displayName": "Image Aspect Ratio",
        "defaultValue": "4/3",
        "options": ["1/1", "4/3", "16/9", "3/2"],
        "group": "Layout"
      },
      "maxWidth": {
        "dataType": "select",
        "displayName": "Container Max Width",
        "defaultValue": "1200px",
        "options": ["1000px", "1100px", "1200px", "1400px"],
        "group": "Layout"
      },
      "transitionDuration": {
        "dataType": "select",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
        "group": "Animation"
      },
      "hoverEffect": {
        "dataType": "select",
        "displayName": "Hover Effect",
        "defaultValue": "zoom",
        "options": ["none", "zoom", "brightness", "blur"],
        "group": "Animation"
      },
      "headingFontSize": {
        "dataType": "number",
        "displayName": "Heading Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "captionFontSize": {
        "dataType": "number",
        "displayName": "Caption Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "headingColor": {
        "dataType": "color",
        "displayName": "Heading Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "captionColor": {
        "dataType": "color",
        "displayName": "Caption Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "overlayBackground": {
        "dataType": "color",
        "displayName": "Lightbox Overlay",
        "defaultValue": "rgba(0,0,0,0.9)",
        "group": "Colors"
      },
      "thumbnailBorder": {
        "dataType": "color",
        "displayName": "Active Thumbnail Border",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "controlsColor": {
        "dataType": "color",
        "displayName": "Controls Color",
        "defaultValue": "#FFFFFF",
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
  const heading = config?.heading || "PROJECT SHOWCASE";
  const imagesText = config?.images || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450962-e8f6c1fe7715?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450898-784e44127c60?w=800&q=80\nhttps://images.unsplash.com/photo-1618556450994-2f1af64e8191?w=800&q=80";
  const captionsText = config?.captions || "Modern Architecture\nUrban Design\nInterior Space\nContemporary Living\nMinimal Aesthetic\nNatural Light";
  const columns = parseInt(config?.columns || "3");
  const gap = config?.gap || "1rem";
  const aspectRatio = config?.aspectRatio || "4/3";
  const maxWidth = config?.maxWidth || "1200px";
  const transitionDuration = parseInt(config?.transitionDuration || "400");
  const hoverEffect = config?.hoverEffect || "zoom";
  const headingFontSize = parseInt(config?.headingFontSize || "14");
  const captionFontSize = parseInt(config?.captionFontSize || "14");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const headingColor = config?.headingColor || "#6C757D";
  const captionColor = config?.captionColor || "#495057";
  const overlayBackground = config?.overlayBackground || "rgba(0,0,0,0.9)";
  const thumbnailBorder = config?.thumbnailBorder || "#FFFFFF";
  const controlsColor = config?.controlsColor || "#FFFFFF";

  const images = imagesText.split('\n').filter(url => url.trim());
  const captions = captionsText.split('\n').filter(cap => cap.trim());

  const [lightboxIndex, setLightboxIndex] = React.useState(null);
  const isLightboxOpen = lightboxIndex !== null;

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const goToPrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;

      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const getHoverStyle = () => {
    const effects = {
      none: {},
      zoom: { transform: 'scale(1.05)' },
      brightness: { filter: 'brightness(1.1)' },
      blur: { filter: 'blur(2px)' }
    };
    return effects[hoverEffect] || {};
  };

  return (
    <div className="image-gallery" style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor,
      padding: '4rem 1.5rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth,
        margin: '0 auto'
      }}>
        {/* Heading */}
        <div style={{
          fontSize: `${headingFontSize}px`,
          fontWeight: '400',
          letterSpacing: '0.1em',
          color: headingColor,
          textTransform: 'uppercase',
          marginBottom: '2.5rem',
          textAlign: 'center'
        }}>
          {heading}
        </div>

        {/* Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap
        }}>
          {images.map((imageUrl, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              style={{
                position: 'relative',
                aspectRatio,
                backgroundColor: '#F8F9FA',
                border: 'none',
                borderRadius: '6px',
                overflow: 'hidden',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <img
                src={imageUrl}
                alt={captions[index] || `Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: prefersReducedMotion 
                    ? 'none' 
                    : `all ${transitionDuration}ms ease-out`
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion && hoverEffect !== 'none') {
                    Object.assign(e.currentTarget.style, getHoverStyle());
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'none';
                }}
              />
              
              {captions[index] && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                  color: '#FFFFFF',
                  fontSize: `${captionFontSize}px`,
                  fontWeight: '400',
                  opacity: 0,
                  transition: prefersReducedMotion ? 'none' : `opacity ${transitionDuration}ms ease-out`
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.opacity = 1;
                  }
                }}
                >
                  {captions[index]}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayBackground,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            opacity: 1,
            animation: prefersReducedMotion ? 'none' : 'fadeIn 300ms ease-out'
          }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              color: controlsColor,
              cursor: 'pointer',
              fontSize: '2rem',
              lineHeight: 1,
              padding: 0,
              transition: 'opacity 200ms ease-out'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
          >
            ×
          </button>

          {/* Main Image */}
          <div
            style={{
              maxWidth: '90vw',
              maxHeight: '70vh',
              position: 'relative',
              opacity: 1,
              transform: 'scale(1)',
              animation: prefersReducedMotion ? 'none' : 'zoomIn 400ms ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={captions[lightboxIndex] || `Image ${lightboxIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '6px'
              }}
            />
          </div>

          {/* Caption */}
          {captions[lightboxIndex] && (
            <div style={{
              marginTop: '1.5rem',
              color: controlsColor,
              fontSize: '1rem',
              fontWeight: '400',
              textAlign: 'center'
            }}>
              {captions[lightboxIndex]}
            </div>
          )}

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: '50%',
              color: controlsColor,
              cursor: 'pointer',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ‹
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: '50%',
              color: controlsColor,
              cursor: 'pointer',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ›
          </button>

          {/* Thumbnail Navigation */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
            maxWidth: '90vw',
            overflowX: 'auto',
            padding: '0.5rem'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {images.map((imageUrl, index) => (
              <button
                key={index}
                onClick={() => setLightboxIndex(index)}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '4px',
                  border: index === lightboxIndex ? `2px solid ${thumbnailBorder}` : '2px solid transparent',
                  padding: 0,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  opacity: index === lightboxIndex ? 1 : 0.6,
                  transition: 'all 200ms ease-out',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (index !== lightboxIndex) e.currentTarget.style.opacity = 0.8;
                }}
                onMouseLeave={(e) => {
                  if (index !== lightboxIndex) e.currentTarget.style.opacity = 0.6;
                }}
              >
                <img
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .image-gallery > div > div:last-of-type {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .image-gallery * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
