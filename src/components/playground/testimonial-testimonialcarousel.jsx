import React from "react";

const MANIFEST = {
  "type": "Testimonial.TestimonialCarousel",
  "description": "Sophisticated testimonial carousel with swipe gestures and auto-play",
  "editorElement": {
    "selector": ".testimonial-carousel-container",
    "displayName": "Testimonial Carousel",
    "archetype": "container",
    "data": {
      "testimonials": {
        "dataType": "text",
        "displayName": "Testimonials JSON",
        "defaultValue": '[{"quote":"Working with this team transformed our business. The attention to detail and strategic thinking exceeded our expectations.","name":"Sarah Chen","title":"CEO","company":"TechVision","image":"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"},{"quote":"Exceptional quality and professionalism. They delivered beyond what we thought was possible, on time and within budget.","name":"Michael Roberts","title":"Founder","company":"InnovateCo","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"},{"quote":"The level of expertise and dedication is unmatched. Our partnership has been instrumental in driving growth.","name":"Emily Martinez","title":"VP of Product","company":"GrowthLabs","image":"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"}]',
        "group": "Content"
      },
      "autoPlay": {
        "dataType": "booleanValue",
        "displayName": "Enable Auto-Play",
        "defaultValue": "true",
        "group": "Content"
      },
      "autoPlayInterval": {
        "dataType": "number",
        "displayName": "Auto-Play Interval (ms)",
        "defaultValue": "5000",
        "group": "Content"
      },
      "showDots": {
        "dataType": "booleanValue",
        "displayName": "Show Navigation Dots",
        "defaultValue": "true",
        "group": "Content"
      },
      "showArrows": {
        "dataType": "booleanValue",
        "displayName": "Show Arrow Buttons",
        "defaultValue": "true",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "quoteColor": {
        "dataType": "color",
        "displayName": "Quote Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "nameColor": {
        "dataType": "color",
        "displayName": "Name Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title/Company Color",
        "defaultValue": "#6B6B6B",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color (dots, arrows)",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(0,0,0,0.08)",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "Inter, -apple-system, system-ui, sans-serif",
        "options": [
          "Inter, -apple-system, system-ui, sans-serif",
          "SF Pro Display, -apple-system, sans-serif",
          "Helvetica Neue, Helvetica, Arial, sans-serif",
          "Montserrat, sans-serif"
        ],
        "group": "Typography"
      },
      "quoteSize": {
        "dataType": "select",
        "displayName": "Quote Font Size",
        "defaultValue": "20px",
        "options": ["16px", "18px", "20px", "24px"],
        "group": "Typography"
      },
      "quoteWeight": {
        "dataType": "select",
        "displayName": "Quote Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "nameSize": {
        "dataType": "select",
        "displayName": "Name Font Size",
        "defaultValue": "16px",
        "options": ["14px", "16px", "18px"],
        "group": "Typography"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "48px",
        "options": ["32px", "40px", "48px", "56px", "64px"],
        "group": "Layout"
      },
      "cardMaxWidth": {
        "dataType": "select",
        "displayName": "Card Max Width",
        "defaultValue": "800px",
        "options": ["600px", "700px", "800px", "900px", "1000px"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Card Border Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "imageSize": {
        "dataType": "select",
        "displayName": "Image Size",
        "defaultValue": "64px",
        "options": ["48px", "56px", "64px", "72px", "80px"],
        "group": "Layout"
      },
      "showShadow": {
        "dataType": "booleanValue",
        "displayName": "Show Card Shadow",
        "defaultValue": "true",
        "group": "Layout"
      },
      "transitionDuration": {
        "dataType": "number",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "400",
        "group": "Animation"
      },
      "swipeThreshold": {
        "dataType": "number",
        "displayName": "Swipe Distance Threshold (px)",
        "defaultValue": "50",
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const containerRef = React.useRef(null);
  const cardRef = React.useRef(null);
  const autoPlayTimerRef = React.useRef(null);
  const dragStateRef = React.useRef({
    startX: 0,
    currentX: 0,
    isDragging: false
  });

  // Safe config extraction
  const testimonials = React.useMemo(() => {
    try {
      return JSON.parse(config?.testimonials || MANIFEST.editorElement.data.testimonials.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.testimonials.defaultValue);
    }
  }, [config?.testimonials]);

  const autoPlay = config?.autoPlay !== false;
  const autoPlayInterval = parseInt(config?.autoPlayInterval || '5000');
  const showDots = config?.showDots !== false;
  const showArrows = config?.showArrows !== false;
  const transitionDuration = parseInt(config?.transitionDuration || '400');
  const swipeThreshold = parseInt(config?.swipeThreshold || '50');

  // Auto-play logic
  React.useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const startAutoPlay = () => {
      autoPlayTimerRef.current = setTimeout(() => {
        goToNext();
      }, autoPlayInterval);
    };

    startAutoPlay();

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, autoPlay, autoPlayInterval, testimonials.length]);

  // PATTERN 1: Direct DOM animation for smooth transitions
  const animateTransition = React.useCallback((direction) => {
    if (!cardRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const card = cardRef.current;
    const distance = direction === 'next' ? -100 : 100;

    // Exit animation
    card.animate([
      { opacity: 1, transform: 'translateX(0px)' },
      { opacity: 0, transform: `translateX(${distance}px)` }
    ], {
      duration: transitionDuration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }).onfinish = () => {
      // Update index
      if (direction === 'next') {
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
      } else {
        setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
      }

      // Enter animation
      card.animate([
        { opacity: 0, transform: `translateX(${-distance}px)` },
        { opacity: 1, transform: 'translateX(0px)' }
      ], {
        duration: transitionDuration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }).onfinish = () => {
        setIsTransitioning(false);
      };
    };
  }, [isTransitioning, testimonials.length, transitionDuration]);

  const goToNext = React.useCallback(() => {
    animateTransition('next');
  }, [animateTransition]);

  const goToPrev = React.useCallback(() => {
    animateTransition('prev');
  }, [animateTransition]);

  const goToIndex = React.useCallback((index) => {
    if (index === currentIndex || isTransitioning) return;
    const direction = index > currentIndex ? 'next' : 'prev';
    
    // Clear auto-play timer when manually navigating
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }

    setCurrentIndex(index);
  }, [currentIndex, isTransitioning]);

  // PATTERN 4: Gesture recognition for swipe
  const handlePointerDown = React.useCallback((e) => {
    if (isTransitioning) return;
    
    dragStateRef.current = {
      startX: e.clientX,
      currentX: e.clientX,
      isDragging: false
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  }, [isTransitioning]);

  const handlePointerMove = React.useCallback((e) => {
    const state = dragStateRef.current;
    const deltaX = e.clientX - state.startX;

    if (!state.isDragging && Math.abs(deltaX) > 3) {
      state.isDragging = true;
    }

    if (state.isDragging && cardRef.current) {
      state.currentX = e.clientX;
      // Visual feedback during drag
      const dragDistance = deltaX * 0.5; // Damping factor
      cardRef.current.style.transform = `translateX(${dragDistance}px)`;
      cardRef.current.style.opacity = `${1 - Math.abs(deltaX) / 500}`;
    }
  }, []);

  const handlePointerUp = React.useCallback((e) => {
    const state = dragStateRef.current;
    
    if (state.isDragging && cardRef.current) {
      const deltaX = state.currentX - state.startX;
      
      // Reset transform
      cardRef.current.style.transform = 'translateX(0)';
      cardRef.current.style.opacity = '1';

      // Determine if swipe threshold met
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
          goToPrev();
        } else {
          goToNext();
        }
      }
    }

    dragStateRef.current.isDragging = false;
  }, [swipeThreshold, goToNext, goToPrev]);

  const styles = {
    container: {
      width: '100%',
      minHeight: '500px',
      padding: '64px 24px',
      backgroundColor: config?.backgroundColor || '#FAFAFA',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      position: 'relative'
    },
    carouselWrapper: {
      width: '100%',
      maxWidth: config?.cardMaxWidth || '800px',
      position: 'relative'
    },
    card: {
      backgroundColor: config?.cardBackgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      padding: config?.cardPadding || '48px',
      boxShadow: (config?.showShadow !== false) ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
      touchAction: 'pan-y', // Allow vertical scroll, prevent horizontal
      cursor: 'grab',
      userSelect: 'none'
    },
    cardDragging: {
      cursor: 'grabbing'
    },
    quoteSection: {
      marginBottom: '32px'
    },
    quoteIcon: {
      width: '32px',
      height: '32px',
      marginBottom: '16px',
      opacity: '0.3'
    },
    quote: {
      fontSize: config?.quoteSize || '20px',
      fontWeight: config?.quoteWeight || '400',
      color: config?.quoteColor || '#1A1A1A',
      lineHeight: '1.6',
      margin: '0',
      fontStyle: 'italic'
    },
    authorSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    avatar: {
      width: config?.imageSize || '64px',
      height: config?.imageSize || '64px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: `2px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`
    },
    authorInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    name: {
      fontSize: config?.nameSize || '16px',
      fontWeight: '500',
      color: config?.nameColor || '#1A1A1A',
      margin: '0'
    },
    title: {
      fontSize: '14px',
      fontWeight: '400',
      color: config?.titleColor || '#6B6B6B',
      margin: '0'
    },
    navigationContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px'
    },
    arrowButton: {
      width: '44px',
      height: '44px',
      display: showArrows ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: config?.cardBackgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: '50%',
      cursor: 'pointer',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      outline: 'none'
    },
    dotsContainer: {
      display: showDots ? 'flex' : 'none',
      gap: '8px',
      alignItems: 'center'
    },
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: 'rgba(0,0,0,0.2)',
      cursor: 'pointer',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      border: 'none',
      padding: '0'
    },
    dotActive: {
      backgroundColor: config?.accentColor || '#1A1A1A',
      width: '24px',
      borderRadius: '4px'
    }
  };

  if (!testimonials || testimonials.length === 0) {
    return (
      <div style={styles.container} className="testimonial-carousel-container">
        <p style={styles.quote}>No testimonials available.</p>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div style={styles.container} ref={containerRef} className="testimonial-carousel-container">
      <div style={styles.carouselWrapper}>
        <div
          ref={cardRef}
          style={styles.card}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div style={styles.quoteSection}>
            <svg style={styles.quoteIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>
            <blockquote style={styles.quote}>
              {currentTestimonial.quote}
            </blockquote>
          </div>

          <div style={styles.authorSection}>
            <img
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              style={styles.avatar}
            />
            <div style={styles.authorInfo}>
              <p style={styles.name}>{currentTestimonial.name}</p>
              <p style={styles.title}>
                {currentTestimonial.title} • {currentTestimonial.company}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.navigationContainer}>
        <button
          style={styles.arrowButton}
          onClick={goToPrev}
          disabled={isTransitioning}
          aria-label="Previous testimonial"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke={config?.accentColor || '#1A1A1A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div style={styles.dotsContainer}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.dot,
                ...(index === currentIndex ? styles.dotActive : {})
              }}
              onClick={() => goToIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          style={styles.arrowButton}
          onClick={goToNext}
          disabled={isTransitioning}
          aria-label="Next testimonial"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke={config?.accentColor || '#1A1A1A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
