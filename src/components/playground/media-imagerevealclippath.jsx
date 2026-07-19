import React from "react";

const MANIFEST = {
  "type": "Media.ImageRevealClipPath",
  "description": "Image reveal effect using animated clip-path shapes with multiple reveal patterns",
  "editorElement": {
    "selector": ".image-reveal-clippath",
    "displayName": "Image Reveal Clip-Path",
    "archetype": "container",
    "data": {
      "image": {
        "dataType": "text",
        "displayName": "Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
        "group": "Content"
      },
      "revealPattern": {
        "dataType": "select",
        "displayName": "Reveal Pattern",
        "defaultValue": "circle",
        "options": ["circle", "diamond", "hexagon", "star", "heart", "wipe-horizontal", "wipe-vertical", "diagonal", "cross", "iris"],
        "group": "Animation"
      },
      "duration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "1500",
        "options": ["800", "1000", "1500", "2000", "2500"],
        "group": "Animation"
      },
      "triggerMode": {
        "dataType": "select",
        "displayName": "Trigger Mode",
        "defaultValue": "scroll",
        "options": ["scroll", "button", "auto"],
        "group": "Content"
      },
      "autoDelay": {
        "dataType": "select",
        "displayName": "Auto Play Delay (s)",
        "defaultValue": "1",
        "options": ["0", "0.5", "1", "1.5", "2"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Overlay Color",
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
  const image = config?.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200';
  const revealPattern = config?.revealPattern || 'circle';
  const duration = parseInt(config?.duration || '1500');
  const triggerMode = config?.triggerMode || 'scroll';
  const autoDelay = parseFloat(config?.autoDelay || '1') * 1000;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const overlayColor = config?.overlayColor || '#495057';
  const accentColor = config?.accentColor || '#495057';
  
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [hasScrolled, setHasScrolled] = React.useState(false);
  
  const containerRef = React.useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const getClipPath = (pattern, revealed) => {
    if (revealed) {
      switch (pattern) {
        case 'circle':
          return 'circle(150% at 50% 50%)';
        case 'diamond':
          return 'polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)';
        case 'hexagon':
          return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
        case 'star':
          return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        case 'heart':
          return 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")';
        case 'wipe-horizontal':
          return 'inset(0 0% 0 0)';
        case 'wipe-vertical':
          return 'inset(0% 0 0 0)';
        case 'diagonal':
          return 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        case 'cross':
          return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
        case 'iris':
          return 'circle(70.7% at 50% 50%)';
        default:
          return 'circle(150% at 50% 50%)';
      }
    } else {
      switch (pattern) {
        case 'circle':
          return 'circle(0% at 50% 50%)';
        case 'diamond':
          return 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)';
        case 'hexagon':
          return 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)';
        case 'star':
          return 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)';
        case 'heart':
          return 'path("M12 12l0 0C12 12 12 12 12 12c0 0 0 0 0 0C12 12 12 12 12 12c0 0 0 0 0 0L12 12z")';
        case 'wipe-horizontal':
          return 'inset(0 100% 0 0)';
        case 'wipe-vertical':
          return 'inset(100% 0 0 0)';
        case 'diagonal':
          return 'polygon(0 0, 0 0, 0 0, 0 0)';
        case 'cross':
          return 'polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%)';
        case 'iris':
          return 'circle(0% at 50% 50%)';
        default:
          return 'circle(0% at 50% 50%)';
      }
    }
  };
  
  const handleReveal = () => {
    setIsRevealed(true);
  };
  
  const handleReset = () => {
    setIsRevealed(false);
  };
  
  React.useEffect(() => {
    if (triggerMode === 'auto') {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, autoDelay);
      return () => clearTimeout(timer);
    }
  }, [triggerMode, autoDelay]);
  
  React.useEffect(() => {
    if (triggerMode === 'scroll' && !hasScrolled) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsRevealed(true);
              setHasScrolled(true);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      
      return () => observer.disconnect();
    }
  }, [triggerMode, hasScrolled]);
  
  const getEasing = () => {
    switch (revealPattern) {
      case 'wipe-horizontal':
      case 'wipe-vertical':
        return 'cubic-bezier(0.65, 0, 0.35, 1)';
      case 'circle':
      case 'iris':
        return 'cubic-bezier(0.22, 1, 0.36, 1)';
      default:
        return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
  };
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '32px',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          aspectRatio: '16/9',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          backgroundColor: overlayColor
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: '500',
          color: '#FFFFFF',
          opacity: isRevealed ? 0 : 1,
          transition: `opacity ${duration}ms ease-out`,
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {triggerMode === 'button' ? 'Click reveal to start' : 'Revealing...'}
        </div>
        
        <img
          src={image}
          alt="Reveal"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            clipPath: prefersReducedMotion ? 'none' : getClipPath(revealPattern, isRevealed),
            transition: prefersReducedMotion ? 'none' : `clip-path ${duration}ms ${getEasing()}`,
            willChange: 'clip-path'
          }}
        />
      </div>
      
      <div style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
      }}>
        {triggerMode === 'button' && (
          <>
            <button
              onClick={handleReveal}
              disabled={isRevealed}
              style={{
                padding: '12px 32px',
                backgroundColor: isRevealed ? `${accentColor}40` : accentColor,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: isRevealed ? 'not-allowed' : 'pointer',
                transition: 'all 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                if (!isRevealed) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Reveal Image
            </button>
            
            <button
              onClick={handleReset}
              disabled={!isRevealed}
              style={{
                padding: '12px 32px',
                backgroundColor: !isRevealed ? `${accentColor}40` : `${accentColor}20`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: !isRevealed ? 'not-allowed' : 'pointer',
                transition: 'all 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                if (isRevealed) {
                  e.currentTarget.style.backgroundColor = `${accentColor}30`;
                }
              }}
              onMouseLeave={(e) => {
                if (isRevealed) {
                  e.currentTarget.style.backgroundColor = `${accentColor}20`;
                }
              }}
            >
              Reset
            </button>
          </>
        )}
        
        {triggerMode !== 'button' && (
          <button
            onClick={handleReset}
            style={{
              padding: '12px 32px',
              backgroundColor: `${accentColor}20`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${accentColor}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${accentColor}20`;
            }}
          >
            Replay Animation
          </button>
        )}
      </div>
      
      <div style={{
        fontSize: '14px',
        color: accentColor,
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Pattern: <strong>{revealPattern}</strong> • 
        Duration: <strong>{duration}ms</strong> • 
        Trigger: <strong>{triggerMode}</strong>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
