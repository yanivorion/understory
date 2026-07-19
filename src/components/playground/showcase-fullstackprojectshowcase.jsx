import React from "react";

const MANIFEST = {
  "type": "Showcase.FullStackProjectShowcase",
  "description": "Ultimate project showcase combining parallax, lazy loading, page transitions, scroll memory, staged reveals, intersection triggers, URL state persistence, and analytics tracking",
  "editorElement": {
    "selector": ".fullstack-project-showcase",
    "displayName": "Full-Stack Project Showcase",
    "archetype": "container",
    "data": {
      "projectTitle": {
        "dataType": "text",
        "displayName": "Project Title",
        "defaultValue": "Project Evolution",
        "group": "Content"
      },
      "projectSubtitle": {
        "dataType": "text",
        "displayName": "Project Subtitle",
        "defaultValue": "An immersive journey through design and development",
        "group": "Content"
      },
      "heroDescription": {
        "dataType": "text",
        "displayName": "Hero Description",
        "defaultValue": "Exploring the intersection of creativity and technology through carefully crafted digital experiences.",
        "group": "Content"
      },
      "section1Title": {
        "dataType": "text",
        "displayName": "Section 1 Title",
        "defaultValue": "Concept & Vision",
        "group": "Content"
      },
      "section1Text": {
        "dataType": "text",
        "displayName": "Section 1 Text",
        "defaultValue": "Every project begins with an idea. A vision that challenges convention and pushes boundaries. We start by understanding the core problem, then craft solutions that are both beautiful and functional.",
        "group": "Content"
      },
      "section2Title": {
        "dataType": "text",
        "displayName": "Section 2 Title",
        "defaultValue": "Design Process",
        "group": "Content"
      },
      "section2Text": {
        "dataType": "text",
        "displayName": "Section 2 Text",
        "defaultValue": "Through iterative refinement and user-centered thinking, we develop interfaces that feel intuitive and natural. Every pixel serves a purpose, every interaction tells a story.",
        "group": "Content"
      },
      "section3Title": {
        "dataType": "text",
        "displayName": "Section 3 Title",
        "defaultValue": "Technical Excellence",
        "group": "Content"
      },
      "section3Text": {
        "dataType": "text",
        "displayName": "Section 3 Text",
        "defaultValue": "Performance, accessibility, and elegant code architecture form the foundation. We build experiences that are fast, inclusive, and maintainable.",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "heroBackgroundColor": {
        "dataType": "color",
        "displayName": "Hero Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "imagePlaceholderColor": {
        "dataType": "color",
        "displayName": "Image Placeholder Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#DEE2E6",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 64,
        "group": "Typography"
      },
      "subtitleFontSize": {
        "dataType": "number",
        "displayName": "Subtitle Font Size (px)",
        "defaultValue": 20,
        "group": "Typography"
      },
      "sectionTitleFontSize": {
        "dataType": "number",
        "displayName": "Section Title Font Size (px)",
        "defaultValue": 40,
        "group": "Typography"
      },
      "bodyFontSize": {
        "dataType": "number",
        "displayName": "Body Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "titleFontWeight": {
        "dataType": "select",
        "displayName": "Title Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "parallaxSpeed": {
        "dataType": "select",
        "displayName": "Parallax Speed",
        "defaultValue": "0.4",
        "options": ["0.2", "0.3", "0.4", "0.5", "0.6"],
        "group": "Animation"
      },
      "revealDuration": {
        "dataType": "select",
        "displayName": "Reveal Duration (ms)",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800"],
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay (ms)",
        "defaultValue": "150",
        "options": ["100", "150", "200", "250"],
        "group": "Animation"
      },
      "imageLoadDelay": {
        "dataType": "select",
        "displayName": "Image Load Delay (ms)",
        "defaultValue": "100",
        "options": ["0", "50", "100", "150", "200"],
        "group": "Animation"
      },
      "scrollThreshold": {
        "dataType": "select",
        "displayName": "Scroll Trigger Threshold",
        "defaultValue": "0.2",
        "options": ["0.1", "0.2", "0.3", "0.4", "0.5"],
        "group": "Animation"
      },
      "trackAnalytics": {
        "dataType": "booleanValue",
        "displayName": "Track Analytics",
        "defaultValue": true,
        "group": "Analytics"
      },
      "trackScrollDepth": {
        "dataType": "booleanValue",
        "displayName": "Track Scroll Depth",
        "defaultValue": true,
        "group": "Analytics"
      },
      "trackImageViews": {
        "dataType": "booleanValue",
        "displayName": "Track Image Views",
        "defaultValue": true,
        "group": "Analytics"
      },
      "showAnalyticsPanel": {
        "dataType": "booleanValue",
        "displayName": "Show Analytics Panel",
        "defaultValue": true,
        "group": "Analytics"
      },
      "enableUrlState": {
        "dataType": "booleanValue",
        "displayName": "Enable URL State",
        "defaultValue": true,
        "group": "State Management"
      },
      "saveScrollPosition": {
        "dataType": "booleanValue",
        "displayName": "Save Scroll Position",
        "defaultValue": true,
        "group": "State Management"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  // State management
  const [heroVisible, setHeroVisible] = React.useState(false);
  const [section1Visible, setSection1Visible] = React.useState(false);
  const [section2Visible, setSection2Visible] = React.useState(false);
  const [section3Visible, setSection3Visible] = React.useState(false);
  const [parallaxOffset, setParallaxOffset] = React.useState(0);
  const [loadedImages, setLoadedImages] = React.useState(new Set());
  const [analytics, setAnalytics] = React.useState({
    pageViews: 1,
    scrollDepth: 0,
    imageViews: 0,
    timeOnPage: 0,
    sectionsViewed: []
  });
  
  // Refs
  const heroRef = React.useRef(null);
  const section1Ref = React.useRef(null);
  const section2Ref = React.useRef(null);
  const section3Ref = React.useRef(null);
  const image1Ref = React.useRef(null);
  const image2Ref = React.useRef(null);
  const image3Ref = React.useRef(null);
  const containerRef = React.useRef(null);
  const startTime = React.useRef(Date.now());
  const scrollDepthMax = React.useRef(0);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config values safely
  const projectTitle = config?.projectTitle || "Project Evolution";
  const projectSubtitle = config?.projectSubtitle || "An immersive journey through design and development";
  const heroDescription = config?.heroDescription || "Exploring the intersection of creativity and technology through carefully crafted digital experiences.";
  const section1Title = config?.section1Title || "Concept & Vision";
  const section1Text = config?.section1Text || "Every project begins with an idea. A vision that challenges convention and pushes boundaries.";
  const section2Title = config?.section2Title || "Design Process";
  const section2Text = config?.section2Text || "Through iterative refinement and user-centered thinking, we develop interfaces that feel intuitive.";
  const section3Title = config?.section3Title || "Technical Excellence";
  const section3Text = config?.section3Text || "Performance, accessibility, and elegant code architecture form the foundation.";
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const heroBackgroundColor = config?.heroBackgroundColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const secondaryTextColor = config?.secondaryTextColor || "#495057";
  const accentColor = config?.accentColor || "#343A40";
  const imagePlaceholderColor = config?.imagePlaceholderColor || "#E9ECEF";
  const borderColor = config?.borderColor || "#DEE2E6";
  
  const titleFontSize = parseInt(config?.titleFontSize) || 64;
  const subtitleFontSize = parseInt(config?.subtitleFontSize) || 20;
  const sectionTitleFontSize = parseInt(config?.sectionTitleFontSize) || 40;
  const bodyFontSize = parseInt(config?.bodyFontSize) || 16;
  const fontWeight = config?.fontWeight || "400";
  const titleFontWeight = config?.titleFontWeight || "300";
  
  const parallaxSpeed = parseFloat(config?.parallaxSpeed) || 0.4;
  const revealDuration = parseInt(config?.revealDuration) || 600;
  const staggerDelay = parseInt(config?.staggerDelay) || 150;
  const imageLoadDelay = parseInt(config?.imageLoadDelay) || 100;
  const scrollThreshold = parseFloat(config?.scrollThreshold) || 0.2;
  
  const trackAnalytics = config?.trackAnalytics !== false;
  const trackScrollDepth = config?.trackScrollDepth !== false;
  const trackImageViews = config?.trackImageViews !== false;
  const showAnalyticsPanel = config?.showAnalyticsPanel !== false;
  const enableUrlState = config?.enableUrlState !== false;
  const saveScrollPosition = config?.saveScrollPosition !== false;

  // Time on page tracking
  React.useEffect(() => {
    if (!trackAnalytics) return;
    
    const interval = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
      setAnalytics(prev => ({ ...prev, timeOnPage }));
    }, 1000);

    return () => clearInterval(interval);
  }, [trackAnalytics]);

  // Parallax scroll effect
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const scrollY = containerRef.current.scrollTop;
            setParallaxOffset(scrollY * parallaxSpeed);
            
            // Track scroll depth
            if (trackScrollDepth) {
              const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
              const currentDepth = Math.floor((scrollY / scrollHeight) * 100);
              if (currentDepth > scrollDepthMax.current) {
                scrollDepthMax.current = currentDepth;
                setAnalytics(prev => ({ ...prev, scrollDepth: currentDepth }));
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [parallaxSpeed, trackScrollDepth, prefersReducedMotion]);

  // Intersection Observer for content reveals
  React.useEffect(() => {
    const observerOptions = {
      threshold: scrollThreshold,
      rootMargin: '0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target.dataset.section;
          
          switch(section) {
            case 'hero':
              setHeroVisible(true);
              break;
            case 'section1':
              setSection1Visible(true);
              if (trackAnalytics && !analytics.sectionsViewed.includes('section1')) {
                setAnalytics(prev => ({ 
                  ...prev, 
                  sectionsViewed: [...prev.sectionsViewed, 'section1']
                }));
              }
              break;
            case 'section2':
              setSection2Visible(true);
              if (trackAnalytics && !analytics.sectionsViewed.includes('section2')) {
                setAnalytics(prev => ({ 
                  ...prev, 
                  sectionsViewed: [...prev.sectionsViewed, 'section2']
                }));
              }
              break;
            case 'section3':
              setSection3Visible(true);
              if (trackAnalytics && !analytics.sectionsViewed.includes('section3')) {
                setAnalytics(prev => ({ 
                  ...prev, 
                  sectionsViewed: [...prev.sectionsViewed, 'section3']
                }));
              }
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);
    if (section3Ref.current) observer.observe(section3Ref.current);

    return () => observer.disconnect();
  }, [scrollThreshold, trackAnalytics, analytics.sectionsViewed]);

  // Lazy loading images with Intersection Observer
  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    const imageObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imageId = entry.target.dataset.imageId;
          
          setTimeout(() => {
            setLoadedImages(prev => {
              const newSet = new Set(prev);
              newSet.add(imageId);
              return newSet;
            });

            if (trackImageViews) {
              setAnalytics(prev => ({ ...prev, imageViews: prev.imageViews + 1 }));
            }
          }, imageLoadDelay);
        }
      });
    };

    const imageObserver = new IntersectionObserver(imageObserverCallback, observerOptions);

    if (image1Ref.current) imageObserver.observe(image1Ref.current);
    if (image2Ref.current) imageObserver.observe(image2Ref.current);
    if (image3Ref.current) imageObserver.observe(image3Ref.current);

    return () => imageObserver.disconnect();
  }, [imageLoadDelay, trackImageViews]);

  // URL state management
  React.useEffect(() => {
    if (!enableUrlState) return;

    const encodeState = () => {
      const scrollPos = containerRef.current?.scrollTop || 0;
      const state = `s${Math.floor(scrollPos)}`;
      return btoa(state);
    };

    const handleScroll = () => {
      if (saveScrollPosition && containerRef.current) {
        const hash = encodeState();
        if (window.location.hash !== `#${hash}`) {
          window.history.replaceState(null, '', `#${hash}`);
        }
      }
    };

    let timeoutId;
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener('scroll', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleScroll, 200);
      });
    }

    // Restore scroll position from URL
    if (window.location.hash && containerRef.current) {
      try {
        const hash = window.location.hash.substring(1);
        const decoded = atob(hash);
        const scrollMatch = decoded.match(/s(\d+)/);
        if (scrollMatch) {
          const scrollPos = parseInt(scrollMatch[1]);
          containerRef.current.scrollTop = scrollPos;
        }
      } catch (e) {
        // Invalid hash, ignore
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [enableUrlState, saveScrollPosition]);

  const containerStyle = {
    width: '100%',
    height: '600px',
    backgroundColor,
    color: textColor,
    overflow: 'auto',
    position: 'relative'
  };

  const heroSectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: heroBackgroundColor,
    padding: '4rem 2rem',
    overflow: 'hidden'
  };

  const parallaxLayerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '200%',
    transform: prefersReducedMotion ? 'none' : `translateY(${parallaxOffset}px)`,
    willChange: prefersReducedMotion ? 'auto' : 'transform',
    opacity: 0.05,
    pointerEvents: 'none',
    zIndex: 0
  };

  const titleStyle = {
    fontSize: `clamp(${titleFontSize * 0.5}px, 8vw, ${titleFontSize}px)`,
    fontWeight: titleFontWeight,
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
    textAlign: 'center',
    maxWidth: '15ch',
    lineHeight: 1.1,
    opacity: prefersReducedMotion ? 1 : (heroVisible ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (heroVisible ? 'translateY(0)' : 'translateY(30px)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
    position: 'relative',
    zIndex: 1
  };

  const subtitleStyle = {
    fontSize: `clamp(${subtitleFontSize * 0.8}px, 2.5vw, ${subtitleFontSize}px)`,
    fontWeight,
    color: secondaryTextColor,
    textAlign: 'center',
    maxWidth: '40ch',
    lineHeight: 1.6,
    marginBottom: '2rem',
    opacity: prefersReducedMotion ? 1 : (heroVisible ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (heroVisible ? 'translateY(0)' : 'translateY(30px)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}ms, transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}ms`,
    position: 'relative',
    zIndex: 1
  };

  const heroDescriptionStyle = {
    fontSize: `clamp(${bodyFontSize * 0.9}px, 1.8vw, ${bodyFontSize}px)`,
    fontWeight,
    color: secondaryTextColor,
    textAlign: 'center',
    maxWidth: '50ch',
    lineHeight: 1.8,
    opacity: prefersReducedMotion ? 1 : (heroVisible ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (heroVisible ? 'translateY(0)' : 'translateY(30px)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay * 2}ms, transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay * 2}ms`,
    position: 'relative',
    zIndex: 1
  };

  const sectionStyle = {
    padding: '6rem 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const getContentStyle = (visible, delay = 0) => ({
    opacity: prefersReducedMotion ? 1 : (visible ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (visible ? 'translateY(0)' : 'translateY(30px)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
  });

  const sectionTitleStyle = {
    fontSize: `clamp(${sectionTitleFontSize * 0.7}px, 5vw, ${sectionTitleFontSize}px)`,
    fontWeight: titleFontWeight,
    letterSpacing: '-0.01em',
    marginBottom: '1.5rem',
    lineHeight: 1.2
  };

  const sectionTextStyle = {
    fontSize: `${bodyFontSize}px`,
    fontWeight,
    color: secondaryTextColor,
    lineHeight: 1.8,
    maxWidth: '50ch'
  };

  const imageContainerStyle = (imageId, visible, delay = 0) => ({
    width: '100%',
    height: '400px',
    backgroundColor: imagePlaceholderColor,
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    opacity: prefersReducedMotion ? 1 : (visible ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (visible ? 'scale(1)' : 'scale(0.95)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
  });

  const imagePlaceholderStyle = (loaded) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: secondaryTextColor,
    fontSize: '14px',
    opacity: loaded ? 0 : 1,
    transition: 'opacity 400ms ease'
  });

  const imageStyle = (loaded) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'scale(1)' : 'scale(1.05)',
    transition: 'opacity 600ms ease, transform 600ms ease'
  });

  const analyticsStyle = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    backgroundColor: heroBackgroundColor,
    padding: '1rem',
    borderRadius: '4px',
    fontSize: '12px',
    maxWidth: '250px',
    zIndex: 100,
    border: `1px solid ${borderColor}`,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  };

  const analyticsItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: `1px solid ${borderColor}`,
    color: secondaryTextColor
  };

  const analyticsLabelStyle = {
    fontWeight: '400'
  };

  const analyticsValueStyle = {
    fontWeight: '500',
    color: textColor
  };

  return (
    <div ref={containerRef} style={containerStyle} className="fullstack-project-showcase">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        data-section="hero"
        style={heroSectionStyle}
      >
        {/* Parallax Background */}
        <div style={parallaxLayerStyle}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <h1 style={titleStyle}>{projectTitle}</h1>
        <p style={subtitleStyle}>{projectSubtitle}</p>
        <p style={heroDescriptionStyle}>{heroDescription}</p>
      </section>

      {/* Section 1 */}
      <section 
        ref={section1Ref}
        data-section="section1"
        style={sectionStyle}
      >
        <div style={getContentStyle(section1Visible, 0)}>
          <h2 style={sectionTitleStyle}>{section1Title}</h2>
          <p style={sectionTextStyle}>{section1Text}</p>
        </div>
        <div 
          ref={image1Ref}
          data-image-id="image1"
          style={imageContainerStyle('image1', section1Visible, staggerDelay)}
        >
          <div style={imagePlaceholderStyle(loadedImages.has('image1'))}>
            {loadedImages.has('image1') ? 'Image Loaded' : 'Loading...'}
          </div>
          {loadedImages.has('image1') && (
            <div style={imageStyle(true)}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill={imagePlaceholderColor}/>
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill={secondaryTextColor}
                  fontSize="14"
                >
                  Concept Image
                </text>
              </svg>
            </div>
          )}
        </div>
      </section>

      {/* Section 2 */}
      <section 
        ref={section2Ref}
        data-section="section2"
        style={{...sectionStyle, backgroundColor: heroBackgroundColor}}
      >
        <div 
          ref={image2Ref}
          data-image-id="image2"
          style={imageContainerStyle('image2', section2Visible, 0)}
        >
          <div style={imagePlaceholderStyle(loadedImages.has('image2'))}>
            {loadedImages.has('image2') ? 'Image Loaded' : 'Loading...'}
          </div>
          {loadedImages.has('image2') && (
            <div style={imageStyle(true)}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill={imagePlaceholderColor}/>
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill={secondaryTextColor}
                  fontSize="14"
                >
                  Design Process
                </text>
              </svg>
            </div>
          )}
        </div>
        <div style={getContentStyle(section2Visible, staggerDelay)}>
          <h2 style={sectionTitleStyle}>{section2Title}</h2>
          <p style={sectionTextStyle}>{section2Text}</p>
        </div>
      </section>

      {/* Section 3 */}
      <section 
        ref={section3Ref}
        data-section="section3"
        style={sectionStyle}
      >
        <div style={getContentStyle(section3Visible, 0)}>
          <h2 style={sectionTitleStyle}>{section3Title}</h2>
          <p style={sectionTextStyle}>{section3Text}</p>
        </div>
        <div 
          ref={image3Ref}
          data-image-id="image3"
          style={imageContainerStyle('image3', section3Visible, staggerDelay)}
        >
          <div style={imagePlaceholderStyle(loadedImages.has('image3'))}>
            {loadedImages.has('image3') ? 'Image Loaded' : 'Loading...'}
          </div>
          {loadedImages.has('image3') && (
            <div style={imageStyle(true)}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill={imagePlaceholderColor}/>
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill={secondaryTextColor}
                  fontSize="14"
                >
                  Technical Excellence
                </text>
              </svg>
            </div>
          )}
        </div>
      </section>

      {/* Analytics Panel */}
      {showAnalyticsPanel && trackAnalytics && (
        <div style={analyticsStyle}>
          <div style={{fontWeight: '500', marginBottom: '0.75rem', color: textColor}}>
            Analytics
          </div>
          <div style={analyticsItemStyle}>
            <span style={analyticsLabelStyle}>Time on Page</span>
            <span style={analyticsValueStyle}>{analytics.timeOnPage}s</span>
          </div>
          {trackScrollDepth && (
            <div style={analyticsItemStyle}>
              <span style={analyticsLabelStyle}>Scroll Depth</span>
              <span style={analyticsValueStyle}>{analytics.scrollDepth}%</span>
            </div>
          )}
          {trackImageViews && (
            <div style={analyticsItemStyle}>
              <span style={analyticsLabelStyle}>Images Viewed</span>
              <span style={analyticsValueStyle}>{analytics.imageViews}/3</span>
            </div>
          )}
          <div style={{...analyticsItemStyle, borderBottom: 'none'}}>
            <span style={analyticsLabelStyle}>Sections Viewed</span>
            <span style={analyticsValueStyle}>{analytics.sectionsViewed.length}/3</span>
          </div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
