import React from "react";

const MANIFEST = {
  "type": "Navigation.HorizontalScrollSnap",
  "description": "Horizontal scroll hijacking with smooth section snapping and progress indicator",
  "editorElement": {
    "selector": ".horizontal-scroll-snap",
    "displayName": "Horizontal Scroll Snap",
    "archetype": "container",
    "data": {
      "sectionCount": {
        "dataType": "select",
        "displayName": "Number of Sections",
        "defaultValue": "5",
        "options": ["3", "4", "5", "6", "7"],
        "group": "Content"
      },
      "snapStrength": {
        "dataType": "select",
        "displayName": "Snap Strength",
        "defaultValue": "strong",
        "options": ["gentle", "medium", "strong"],
        "group": "Animation"
      },
      "scrollSpeed": {
        "dataType": "select",
        "displayName": "Scroll Speed Multiplier",
        "defaultValue": "1.0",
        "options": ["0.7", "1.0", "1.3", "1.5"],
        "group": "Animation"
      },
      "showProgress": {
        "dataType": "booleanValue",
        "displayName": "Show Progress Indicator",
        "defaultValue": true,
        "group": "Content"
      },
      "showNavigation": {
        "dataType": "booleanValue",
        "displayName": "Show Navigation Dots",
        "defaultValue": true,
        "group": "Content"
      },
      "parallaxIntensity": {
        "dataType": "select",
        "displayName": "Parallax Depth Intensity",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.5"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "section1Color": {
        "dataType": "color",
        "displayName": "Section 1 Color",
        "defaultValue": "#667eea",
        "group": "Colors"
      },
      "section2Color": {
        "dataType": "color",
        "displayName": "Section 2 Color",
        "defaultValue": "#764ba2",
        "group": "Colors"
      },
      "section3Color": {
        "dataType": "color",
        "displayName": "Section 3 Color",
        "defaultValue": "#f093fb",
        "group": "Colors"
      },
      "section4Color": {
        "dataType": "color",
        "displayName": "Section 4 Color",
        "defaultValue": "#4facfe",
        "group": "Colors"
      },
      "section5Color": {
        "dataType": "color",
        "displayName": "Section 5 Color",
        "defaultValue": "#43e97b",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "horizontal"
    }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const sectionsRef = React.useRef([]);
  const [currentSection, setCurrentSection] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const scrollTimeoutRef = React.useRef(null);
  const targetScrollRef = React.useRef(0);
  const currentScrollRef = React.useRef(0);
  const animationFrameRef = React.useRef(null);

  // Config values
  const sectionCount = parseInt(config?.sectionCount || "5");
  const snapStrength = config?.snapStrength || "strong";
  const scrollSpeed = parseFloat(config?.scrollSpeed || "1.0");
  const showProgress = config?.showProgress !== false;
  const showNavigation = config?.showNavigation !== false;
  const parallaxIntensity = parseFloat(config?.parallaxIntensity || "0.3");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#FFFFFF";
  const progressColor = config?.progressColor || "#FFFFFF";
  const fontSize = config?.fontSize || 48;
  const fontWeight = config?.fontWeight || "500";

  const sectionColors = [
    config?.section1Color || "#667eea",
    config?.section2Color || "#764ba2",
    config?.section3Color || "#f093fb",
    config?.section4Color || "#4facfe",
    config?.section5Color || "#43e97b",
    config?.section1Color || "#667eea",
    config?.section2Color || "#764ba2"
  ];

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Snap strength values
  const snapThreshold = {
    'gentle': 0.3,
    'medium': 0.2,
    'strong': 0.15
  }[snapStrength] || 0.2;

  // Smooth scroll animation
  const smoothScroll = () => {
    const diff = targetScrollRef.current - currentScrollRef.current;
    
    if (Math.abs(diff) < 0.5) {
      currentScrollRef.current = targetScrollRef.current;
      if (containerRef.current) {
        containerRef.current.scrollLeft = targetScrollRef.current;
      }
      return;
    }

    currentScrollRef.current += diff * 0.1;
    
    if (containerRef.current) {
      containerRef.current.scrollLeft = currentScrollRef.current;
    }

    animationFrameRef.current = requestAnimationFrame(smoothScroll);
  };

  // Handle wheel event
  const handleWheel = (e) => {
    if (prefersReducedMotion) return;
    
    e.preventDefault();
    
    const delta = e.deltaY * scrollSpeed;
    targetScrollRef.current = Math.max(0, Math.min(
      targetScrollRef.current + delta,
      containerRef.current.scrollWidth - containerRef.current.clientWidth
    ));

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(smoothScroll);
    }

    setIsScrolling(true);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      snapToNearest();
      setIsScrolling(false);
    }, 150);
  };

  // Snap to nearest section
  const snapToNearest = () => {
    if (!containerRef.current) return;

    const scrollLeft = containerRef.current.scrollLeft;
    const sectionWidth = containerRef.current.clientWidth;
    const nearestSection = Math.round(scrollLeft / sectionWidth);
    const snapPosition = nearestSection * sectionWidth;

    targetScrollRef.current = snapPosition;
    setCurrentSection(nearestSection);
  };

  // Navigate to section
  const navigateToSection = (index) => {
    if (!containerRef.current) return;

    const sectionWidth = containerRef.current.clientWidth;
    targetScrollRef.current = index * sectionWidth;
    
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(smoothScroll);
    }

    setCurrentSection(index);
  };

  // Update progress
  const handleScroll = () => {
    if (!containerRef.current) return;

    const scrollLeft = containerRef.current.scrollLeft;
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const progress = (scrollLeft / maxScroll) * 100;

    setScrollProgress(progress);
    currentScrollRef.current = scrollLeft;

    // Update parallax
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;
      const content = section.querySelector('.section-content');
      if (!content) return;

      const rect = section.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativePos = (rect.left - containerRect.left) / containerRect.width;
      const parallaxOffset = (relativePos - 0.5) * 100 * parallaxIntensity;

      content.style.transform = `translateX(${parallaxOffset}px)`;
    });
  };

  // Setup
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollSpeed, snapStrength, parallaxIntensity, prefersReducedMotion]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: backgroundColor
  };

  const scrollContainerStyle = {
    display: 'flex',
    height: '100%',
    overflowX: prefersReducedMotion ? 'auto' : 'hidden',
    overflowY: 'hidden',
    scrollSnapType: prefersReducedMotion ? 'x mandatory' : 'none',
    scrollBehavior: prefersReducedMotion ? 'smooth' : 'auto'
  };

  const sectionStyle = (index) => ({
    flex: '0 0 100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${sectionColors[index]}, ${sectionColors[index]}dd)`,
    scrollSnapAlign: prefersReducedMotion ? 'start' : 'none',
    position: 'relative',
    overflow: 'hidden'
  });

  const contentStyle = {
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    textAlign: 'center',
    zIndex: 1,
    transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out'
  };

  const progressBarStyle = {
    position: 'fixed',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    height: '2px',
    backgroundColor: `${progressColor}30`,
    zIndex: 100
  };

  const progressFillStyle = {
    height: '100%',
    backgroundColor: progressColor,
    width: `${scrollProgress}%`,
    transition: 'width 0.1s ease-out'
  };

  const navigationStyle = {
    position: 'fixed',
    right: '40px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    zIndex: 100
  };

  const dotStyle = (index) => ({
    width: currentSection === index ? '12px' : '8px',
    height: currentSection === index ? '12px' : '8px',
    borderRadius: '50%',
    backgroundColor: currentSection === index ? progressColor : `${progressColor}50`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    padding: 0
  });

  return (
    <div className="horizontal-scroll-snap" style={containerStyle}>
      <div ref={containerRef} style={scrollContainerStyle}>
        {Array.from({ length: sectionCount }).map((_, index) => (
          <div
            key={index}
            ref={el => sectionsRef.current[index] = el}
            style={sectionStyle(index)}
          >
            <div className="section-content" style={contentStyle}>
              Section {index + 1}
            </div>
          </div>
        ))}
      </div>

      {showProgress && (
        <div style={progressBarStyle}>
          <div style={progressFillStyle} />
        </div>
      )}

      {showNavigation && (
        <div style={navigationStyle}>
          {Array.from({ length: sectionCount }).map((_, index) => (
            <button
              key={index}
              style={dotStyle(index)}
              onClick={() => navigateToSection(index)}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
