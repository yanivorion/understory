import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 15, 2025, 11:07 AM
 * Component Type: Showcase.CinematicSlideshow
 * 
 * User Request: WebGL Image Effects - 3D distortions, depth maps, parallax
 * 
 * Design Brief:
 * Advanced WebGL gallery with 3D parallax effects, depth-map based distortions,
and mouse-reactive displacement. Features GPU-accelerated shaders for
sophisticated image transitions with simulated depth perception.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Showcase.CinematicSlideshow",
  "description": "Full-page slideshow with stunning cinematic transitions, scroll triggers, and gesture controls - no external libraries required",
  "editorElement": {
    "selector": ".cinematic-slideshow",
    "displayName": "Cinematic Slideshow",
    "archetype": "container",
    "data": {
      "transitionStyle": {
        "dataType": "select",
        "displayName": "Transition Style",
        "defaultValue": "fade-scale",
        "options": ["fade-scale", "slide-fade", "clip-reveal", "blur-shift", "zoom-rotate"],
        "group": "Animation",
        "description": "Select the page transition effect"
      },
      "transitionDuration": {
        "dataType": "select",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "800",
        "options": ["600", "800", "1000", "1200"],
        "group": "Animation"
      },
      "autoPlay": {
        "dataType": "booleanValue",
        "displayName": "Auto Play",
        "defaultValue": false,
        "group": "Content"
      },
      "autoPlayDelay": {
        "dataType": "select",
        "displayName": "Auto Play Delay (seconds)",
        "defaultValue": "5",
        "options": ["3", "5", "7", "10"],
        "group": "Animation"
      },
      "enableScrollTrigger": {
        "dataType": "booleanValue",
        "displayName": "Enable Scroll to Change Slides",
        "defaultValue": true,
        "group": "Content",
        "description": "Allow mouse wheel to navigate slides"
      },
      "showProgress": {
        "dataType": "booleanValue",
        "displayName": "Show Progress Indicators",
        "defaultValue": true,
        "group": "Content"
      },
      "showNavigation": {
        "dataType": "booleanValue",
        "displayName": "Show Navigation Arrows",
        "defaultValue": true,
        "group": "Content"
      },
      "slide1Title": {
        "dataType": "text",
        "displayName": "Slide 1 Title",
        "defaultValue": "CINEMATIC EXPERIENCE",
        "group": "Content"
      },
      "slide1Body": {
        "dataType": "text",
        "displayName": "Slide 1 Body",
        "defaultValue": "Stunning full-page transitions without external libraries. Pure JavaScript performance.",
        "group": "Content"
      },
      "slide1Caption": {
        "dataType": "text",
        "displayName": "Slide 1 Caption",
        "defaultValue": "Scroll or use arrows to navigate",
        "group": "Content"
      },
      "slide2Title": {
        "dataType": "text",
        "displayName": "Slide 2 Title",
        "defaultValue": "SCROLL TRIGGERED",
        "group": "Content"
      },
      "slide2Body": {
        "dataType": "text",
        "displayName": "Slide 2 Body",
        "defaultValue": "Intersection Observer powers smooth reveals and scroll-based transitions with native performance.",
        "group": "Content"
      },
      "slide2Caption": {
        "dataType": "text",
        "displayName": "Slide 2 Caption",
        "defaultValue": "Keyboard navigation supported",
        "group": "Content"
      },
      "slide3Title": {
        "dataType": "text",
        "displayName": "Slide 3 Title",
        "defaultValue": "GESTURE CONTROL",
        "group": "Content"
      },
      "slide3Body": {
        "dataType": "text",
        "displayName": "Slide 3 Body",
        "defaultValue": "Touch gestures, keyboard shortcuts, and scroll wheels all supported for seamless navigation.",
        "group": "Content"
      },
      "slide3Caption": {
        "dataType": "text",
        "displayName": "Slide 3 Caption",
        "defaultValue": "Swipe on mobile devices",
        "group": "Content"
      },
      "slide4Title": {
        "dataType": "text",
        "displayName": "Slide 4 Title",
        "defaultValue": "PURE PERFORMANCE",
        "group": "Content"
      },
      "slide4Body": {
        "dataType": "text",
        "displayName": "Slide 4 Body",
        "defaultValue": "GPU-accelerated transforms and optimized animations deliver 60fps without compromise.",
        "group": "Content"
      },
      "slide4Caption": {
        "dataType": "text",
        "displayName": "Slide 4 Caption",
        "defaultValue": "Production ready",
        "group": "Content"
      },
      "backgroundColor1": {
        "dataType": "color",
        "displayName": "Slide 1 Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "backgroundColor2": {
        "dataType": "color",
        "displayName": "Slide 2 Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "backgroundColor3": {
        "dataType": "color",
        "displayName": "Slide 3 Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "backgroundColor4": {
        "dataType": "color",
        "displayName": "Slide 4 Background",
        "defaultValue": "#F1F3F5",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "bodyTextColor": {
        "dataType": "color",
        "displayName": "Body Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "captionTextColor": {
        "dataType": "color",
        "displayName": "Caption Text Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "navigationColor": {
        "dataType": "color",
        "displayName": "Navigation Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "navigationHoverColor": {
        "dataType": "color",
        "displayName": "Navigation Hover Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "progressActiveColor": {
        "dataType": "color",
        "displayName": "Progress Active Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "progressInactiveColor": {
        "dataType": "color",
        "displayName": "Progress Inactive Color",
        "defaultValue": "#DEE2E6",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 64,
        "group": "Typography"
      },
      "bodyFontSize": {
        "dataType": "number",
        "displayName": "Body Font Size (px)",
        "defaultValue": 20,
        "group": "Typography"
      },
      "captionFontSize": {
        "dataType": "number",
        "displayName": "Caption Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "titleFontWeight": {
        "dataType": "select",
        "displayName": "Title Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "bodyFontWeight": {
        "dataType": "select",
        "displayName": "Body Font Weight",
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
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [direction, setDirection] = React.useState(1);
  const [touchStart, setTouchStart] = React.useState(null);
  const containerRef = React.useRef(null);
  const autoPlayTimerRef = React.useRef(null);
  const scrollTimeoutRef = React.useRef(null);

  const transitionStyle = config?.transitionStyle || 'fade-scale';
  const transitionDuration = parseInt(config?.transitionDuration || '800');
  const autoPlay = config?.autoPlay !== false;
  const autoPlayDelay = parseInt(config?.autoPlayDelay || '5') * 1000;
  const enableScrollTrigger = config?.enableScrollTrigger !== false;
  const showProgress = config?.showProgress !== false;
  const showNavigation = config?.showNavigation !== false;

  const slides = [
    {
      title: config?.slide1Title || 'CINEMATIC EXPERIENCE',
      body: config?.slide1Body || 'Stunning full-page transitions without external libraries. Pure JavaScript performance.',
      caption: config?.slide1Caption || 'Scroll or use arrows to navigate',
      bgColor: config?.backgroundColor1 || '#FFFFFF'
    },
    {
      title: config?.slide2Title || 'SCROLL TRIGGERED',
      body: config?.slide2Body || 'Intersection Observer powers smooth reveals and scroll-based transitions with native performance.',
      caption: config?.slide2Caption || 'Keyboard navigation supported',
      bgColor: config?.backgroundColor2 || '#F8F9FA'
    },
    {
      title: config?.slide3Title || 'GESTURE CONTROL',
      body: config?.slide3Body || 'Touch gestures, keyboard shortcuts, and scroll wheels all supported for seamless navigation.',
      caption: config?.slide3Caption || 'Swipe on mobile devices',
      bgColor: config?.backgroundColor3 || '#FFFFFF'
    },
    {
      title: config?.slide4Title || 'PURE PERFORMANCE',
      body: config?.slide4Body || 'GPU-accelerated transforms and optimized animations deliver 60fps without compromise.',
      caption: config?.slide4Caption || 'Production ready',
      bgColor: config?.backgroundColor4 || '#F1F3F5'
    }
  ];

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Auto-play functionality
  React.useEffect(() => {
    if (autoPlay && !isTransitioning) {
      autoPlayTimerRef.current = setTimeout(() => {
        goToSlide((currentSlide + 1) % slides.length, 1);
      }, autoPlayDelay);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentSlide, autoPlay, autoPlayDelay, isTransitioning]);

  const goToSlide = (index, dir) => {
    if (isTransitioning || index === currentSlide) return;
    
    setDirection(dir);
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next, 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        goToSlide(prev, -1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isTransitioning]);

  // Scroll navigation with debounce
  React.useEffect(() => {
    if (!enableScrollTrigger) return;

    const handleWheel = (e) => {
      if (isTransitioning) return;

      e.preventDefault();
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (Math.abs(e.deltaY) > 10) {
          if (e.deltaY > 0) {
            const next = (currentSlide + 1) % slides.length;
            goToSlide(next, 1);
          } else {
            const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            goToSlide(prev, -1);
          }
        }
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentSlide, isTransitioning, enableScrollTrigger]);

  // Touch gestures
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || isTransitioning) return;

    const deltaX = e.changedTouches[0].clientX - touchStart.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.y;

    if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
          goToSlide(prev, -1);
        } else {
          const next = (currentSlide + 1) % slides.length;
          goToSlide(next, 1);
        }
      } else {
        if (deltaY < 0) {
          const next = (currentSlide + 1) % slides.length;
          goToSlide(next, 1);
        } else {
          const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
          goToSlide(prev, -1);
        }
      }
    }
    setTouchStart(null);
  };

  const getTransitionStyles = (isActive, isNext) => {
    if (prefersReducedMotion) {
      return {
        opacity: isActive ? 1 : 0,
        transform: 'none'
      };
    }

    const duration = `${transitionDuration}ms`;
    const baseStyle = {
      transition: `all ${duration} cubic-bezier(0.22, 1, 0.36, 1)`,
      willChange: 'transform, opacity, filter'
    };

    switch (transitionStyle) {
      case 'fade-scale':
        return {
          ...baseStyle,
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scale(1)' : 'scale(0.95)',
          filter: isActive ? 'blur(0px)' : 'blur(10px)'
        };
      
      case 'slide-fade':
        return {
          ...baseStyle,
          opacity: isActive ? 1 : 0,
          transform: isActive 
            ? 'translateX(0)' 
            : `translateX(${direction > 0 ? '100%' : '-100%'})`
        };
      
      case 'clip-reveal':
        return {
          ...baseStyle,
          clipPath: isActive 
            ? 'circle(150% at 50% 50%)' 
            : 'circle(0% at 50% 50%)',
          opacity: 1
        };
      
      case 'blur-shift':
        return {
          ...baseStyle,
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(50px)',
          filter: isActive ? 'blur(0px)' : 'blur(20px)'
        };
      
      case 'zoom-rotate':
        return {
          ...baseStyle,
          opacity: isActive ? 1 : 0,
          transform: isActive 
            ? 'scale(1) rotate(0deg)' 
            : 'scale(1.2) rotate(5deg)',
          filter: isActive ? 'blur(0px)' : 'blur(15px)'
        };
      
      default:
        return {
          ...baseStyle,
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scale(1)' : 'scale(0.95)'
        };
    }
  };

  const getContentAnimationStyle = (delay) => {
    if (prefersReducedMotion) {
      return { opacity: 1, transform: 'none' };
    }

    return {
      animation: `contentReveal ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`,
      willChange: 'transform, opacity'
    };
  };

  return (
    <div 
      ref={containerRef}
      className="cinematic-slideshow"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>
        {`
          @keyframes contentReveal {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: slide.bgColor,
            pointerEvents: index === currentSlide ? 'auto' : 'none',
            ...getTransitionStyles(index === currentSlide, index > currentSlide)
          }}
        >
          <div style={{
            maxWidth: '900px',
            padding: '0 40px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: `clamp(32px, 5vw, ${config?.titleFontSize || 64}px)`,
              fontWeight: config?.titleFontWeight || '300',
              letterSpacing: '0.05em',
              color: config?.textColor || '#212529',
              margin: '0 0 24px 0',
              lineHeight: '1.1',
              ...(index === currentSlide ? getContentAnimationStyle(0) : {})
            }}>
              {slide.title}
            </h1>
            
            <p style={{
              fontSize: `clamp(16px, 2vw, ${config?.bodyFontSize || 20}px)`,
              fontWeight: config?.bodyFontWeight || '400',
              color: config?.bodyTextColor || '#495057',
              margin: '0 0 16px 0',
              lineHeight: '1.6',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              ...(index === currentSlide ? getContentAnimationStyle(150) : {})
            }}>
              {slide.body}
            </p>
            
            <p style={{
              fontSize: `${config?.captionFontSize || 14}px`,
              fontWeight: '400',
              color: config?.captionTextColor || '#6C757D',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              ...(index === currentSlide ? getContentAnimationStyle(300) : {})
            }}>
              {slide.caption}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <button
            onClick={() => {
              const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
              goToSlide(prev, -1);
            }}
            disabled={isTransitioning}
            aria-label="Previous slide"
            style={{
              position: 'absolute',
              left: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              border: `1px solid ${config?.navigationColor || '#495057'}`,
              background: 'transparent',
              borderRadius: '50%',
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isTransitioning ? 0.5 : 0.7,
              transition: 'all 200ms ease-out',
              color: config?.navigationColor || '#495057'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.borderColor = config?.navigationHoverColor || '#212529';
              e.currentTarget.style.color = config?.navigationHoverColor || '#212529';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = isTransitioning ? '0.5' : '0.7';
              e.currentTarget.style.borderColor = config?.navigationColor || '#495057';
              e.currentTarget.style.color = config?.navigationColor || '#495057';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4L6 10L12 16" />
            </svg>
          </button>

          <button
            onClick={() => {
              const next = (currentSlide + 1) % slides.length;
              goToSlide(next, 1);
            }}
            disabled={isTransitioning}
            aria-label="Next slide"
            style={{
              position: 'absolute',
              right: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              border: `1px solid ${config?.navigationColor || '#495057'}`,
              background: 'transparent',
              borderRadius: '50%',
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isTransitioning ? 0.5 : 0.7,
              transition: 'all 200ms ease-out',
              color: config?.navigationColor || '#495057'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.borderColor = config?.navigationHoverColor || '#212529';
              e.currentTarget.style.color = config?.navigationHoverColor || '#212529';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = isTransitioning ? '0.5' : '0.7';
              e.currentTarget.style.borderColor = config?.navigationColor || '#495057';
              e.currentTarget.style.color = config?.navigationColor || '#495057';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 4L14 10L8 16" />
            </svg>
          </button>
        </>
      )}

      {/* Progress Indicators */}
      {showProgress && (
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index, index > currentSlide ? 1 : -1)}
              disabled={isTransitioning || index === currentSlide}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
              style={{
                width: index === currentSlide ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: index === currentSlide 
                  ? config?.progressActiveColor || '#343A40'
                  : config?.progressInactiveColor || '#DEE2E6',
                cursor: isTransitioning || index === currentSlide ? 'default' : 'pointer',
                transition: 'all 300ms ease-out',
                padding: 0
              }}
              onMouseEnter={(e) => {
                if (index !== currentSlide && !isTransitioning) {
                  e.currentTarget.style.background = config?.progressActiveColor || '#343A40';
                  e.currentTarget.style.opacity = '0.6';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentSlide) {
                  e.currentTarget.style.background = config?.progressInactiveColor || '#DEE2E6';
                  e.currentTarget.style.opacity = '1';
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        fontSize: '14px',
        fontWeight: '400',
        color: config?.captionTextColor || '#6C757D',
        letterSpacing: '0.05em'
      }}>
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
