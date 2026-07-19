import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 15, 2025, 04:07 AM
 * Component Type: Navigation.AwardWinningScrollIndicatorFixed
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Navigation.AwardWinningScrollIndicatorFixed",
  "description": "Award-winning scroll indicators with full customization - FIXED VERSION with visible indicators",
  "editorElement": {
    "selector": ".award-scroll-indicator-fixed",
    "displayName": "Award Scroll Indicator Fixed",
    "archetype": "container",
    "data": {
      // Layout Presets
      "layoutPreset": {
        "dataType": "select",
        "displayName": "Layout Preset",
        "defaultValue": "horizontal-top-rail",
        "options": [
          "horizontal-top-rail",
          "horizontal-bottom-rail", 
          "vertical-left-rail",
          "vertical-right-rail",
          "corner-morphing-shape",
          "floating-kinetic-number",
          "brutalist-bar",
          "geometric-corners"
        ],
        "group": "Layout",
        "description": "Choose from award-winning scroll indicator designs"
      },
      
      // Content
      "showPercentage": {
        "dataType": "booleanValue",
        "displayName": "Show Percentage",
        "defaultValue": true,
        "group": "Content",
        "description": "Display scroll percentage"
      },
      "showSectionDots": {
        "dataType": "booleanValue",
        "displayName": "Show Section Indicators",
        "defaultValue": true,
        "group": "Content",
        "description": "Show section navigation dots"
      },
      "sectionCount": {
        "dataType": "select",
        "displayName": "Number of Sections",
        "defaultValue": "5",
        "options": ["3", "4", "5", "6", "7", "8"],
        "group": "Content",
        "description": "Number of scrollable sections"
      },
      
      // Section 1
      "section1BgColor": {
        "dataType": "color",
        "displayName": "Section 1 Background",
        "defaultValue": "#FFFFFF",
        "group": "Section 1"
      },
      "section1TextColor": {
        "dataType": "color",
        "displayName": "Section 1 Text",
        "defaultValue": "#000000",
        "group": "Section 1"
      },
      "section1Font": {
        "dataType": "select",
        "displayName": "Section 1 Font",
        "defaultValue": "mono",
        "options": ["mono", "sans", "display", "serif", "grotesk"],
        "group": "Section 1"
      },
      
      // Section 2
      "section2BgColor": {
        "dataType": "color",
        "displayName": "Section 2 Background",
        "defaultValue": "#000000",
        "group": "Section 2"
      },
      "section2TextColor": {
        "dataType": "color",
        "displayName": "Section 2 Text",
        "defaultValue": "#FFFFFF",
        "group": "Section 2"
      },
      "section2Font": {
        "dataType": "select",
        "displayName": "Section 2 Font",
        "defaultValue": "sans",
        "options": ["mono", "sans", "display", "serif", "grotesk"],
        "group": "Section 2"
      },
      
      // Section 3
      "section3BgColor": {
        "dataType": "color",
        "displayName": "Section 3 Background",
        "defaultValue": "#FF0000",
        "group": "Section 3"
      },
      "section3TextColor": {
        "dataType": "color",
        "displayName": "Section 3 Text",
        "defaultValue": "#FFFFFF",
        "group": "Section 3"
      },
      "section3Font": {
        "dataType": "select",
        "displayName": "Section 3 Font",
        "defaultValue": "display",
        "options": ["mono", "sans", "display", "serif", "grotesk"],
        "group": "Section 3"
      },
      
      // Section 4
      "section4BgColor": {
        "dataType": "color",
        "displayName": "Section 4 Background",
        "defaultValue": "#0000FF",
        "group": "Section 4"
      },
      "section4TextColor": {
        "dataType": "color",
        "displayName": "Section 4 Text",
        "defaultValue": "#FFFFFF",
        "group": "Section 4"
      },
      "section4Font": {
        "dataType": "select",
        "displayName": "Section 4 Font",
        "defaultValue": "grotesk",
        "options": ["mono", "sans", "display", "serif", "grotesk"],
        "group": "Section 4"
      },
      
      // Section 5
      "section5BgColor": {
        "dataType": "color",
        "displayName": "Section 5 Background",
        "defaultValue": "#00FF00",
        "group": "Section 5"
      },
      "section5TextColor": {
        "dataType": "color",
        "displayName": "Section 5 Text",
        "defaultValue": "#000000",
        "group": "Section 5"
      },
      "section5Font": {
        "dataType": "select",
        "displayName": "Section 5 Font",
        "defaultValue": "serif",
        "options": ["mono", "sans", "display", "serif", "grotesk"],
        "group": "Section 5"
      },
      
      // Section 6
      "section6BgColor": {
        "dataType": "color",
        "displayName": "Section 6 Background",
        "defaultValue": "#FFFF00",
        "group": "Section 6"
      },
      "section6TextColor": {
        "dataType": "color",
        "displayName": "Section 6 Text",
        "defaultValue": "#000000",
        "group": "Section 6"
      },
      "section6Font": {
        "dataType": "select",
        "displayName": "Section 6 Font",
        "defaultValue": "mono",
        "options": ["mono", "sans", "display", "serif", "grotesk"],
        "group": "Section 6"
      },
      
      // Section 7
      "section7BgColor": {
        "dataType": "color",
        "displayName": "Section 7 Background",
        "defaultValue": "#FF00FF",
        "group": "Section 7"
      },
      "section7TextColor": {
        "dataType": "color",
        "displayName": "Section 7 Text",
        "defaultValue": "#FFFFFF",
        "group": "Section 7"
      },
      "section7Font": {
        "dataType": "select",
        "displayName": "Section 7 Font",
        "defaultValue": "sans",
        "options": ["mono", "sans", "display", "serif", "grotesk"],
        "group": "Section 7"
      },
      
      // Section 8
      "section8BgColor": {
        "dataType": "color",
        "displayName": "Section 8 Background",
        "defaultValue": "#00FFFF",
        "group": "Section 8"
      },
      "section8TextColor": {
        "dataType": "color",
        "displayName": "Section 8 Text",
        "defaultValue": "#000000",
        "group": "Section 8"
      },
      "section8Font": {
        "dataType": "select",
        "displayName": "Section 8 Font",
        "defaultValue": "display",
        "options": ["mono", "sans", "display", "serif", "grotesk"],
        "group": "Section 8"
      },
      
      // Animation
      "animationIntensity": {
        "dataType": "select",
        "displayName": "Animation Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "bold"],
        "group": "Animation"
      },
      
      // Typography
      "numberSize": {
        "dataType": "select",
        "displayName": "Number Size",
        "defaultValue": "large",
        "options": ["medium", "large", "xlarge", "oversized"],
        "group": "Typography"
      },
      "indicatorFont": {
        "dataType": "select",
        "displayName": "Indicator Font",
        "defaultValue": "mono",
        "options": ["mono", "sans", "display", "serif", "grotesk"],
        "group": "Typography"
      },
      
      // Indicator Colors
      "indicatorPrimaryColor": {
        "dataType": "color",
        "displayName": "Indicator Primary",
        "defaultValue": "#000000",
        "group": "Indicator Colors"
      },
      "indicatorAccentColor": {
        "dataType": "color",
        "displayName": "Indicator Accent",
        "defaultValue": "#FF0000",
        "group": "Indicator Colors"
      }
    }
  }
};

function Component({ config = {} }) {
  const layoutPreset = config?.layoutPreset || 'horizontal-top-rail';
  const showPercentage = config?.showPercentage !== false;
  const showSectionDots = config?.showSectionDots !== false;
  const sectionCount = parseInt(config?.sectionCount || '5');
  const animationIntensity = config?.animationIntensity || 'medium';
  const numberSize = config?.numberSize || 'large';
  const indicatorFont = config?.indicatorFont || 'mono';
  
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState(0);
  
  const containerRef = React.useRef(null);
  const sectionRefs = React.useRef([]);
  
  // Section customization
  const sectionBackgrounds = [
    config?.section1BgColor || '#FFFFFF',
    config?.section2BgColor || '#000000',
    config?.section3BgColor || '#FF0000',
    config?.section4BgColor || '#0000FF',
    config?.section5BgColor || '#00FF00',
    config?.section6BgColor || '#FFFF00',
    config?.section7BgColor || '#FF00FF',
    config?.section8BgColor || '#00FFFF'
  ];
  
  const sectionTextColors = [
    config?.section1TextColor || '#000000',
    config?.section2TextColor || '#FFFFFF',
    config?.section3TextColor || '#FFFFFF',
    config?.section4TextColor || '#FFFFFF',
    config?.section5TextColor || '#000000',
    config?.section6TextColor || '#000000',
    config?.section7TextColor || '#FFFFFF',
    config?.section8TextColor || '#000000'
  ];
  
  const sectionFonts = [
    config?.section1Font || 'mono',
    config?.section2Font || 'sans',
    config?.section3Font || 'display',
    config?.section4Font || 'grotesk',
    config?.section5Font || 'serif',
    config?.section6Font || 'mono',
    config?.section7Font || 'sans',
    config?.section8Font || 'display'
  ];
  
  const primaryColor = config?.indicatorPrimaryColor || '#000000';
  const accentColor = config?.indicatorAccentColor || '#FF0000';
  
  // Timing
  const timings = {
    'subtle': { duration: 600, easing: 'ease-out' },
    'medium': { duration: 400, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    'bold': { duration: 300, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }
  };
  const timing = timings[animationIntensity];
  
  // Sizes
  const numberSizes = {
    'medium': '32px',
    'large': '48px',
    'xlarge': '64px',
    'oversized': '96px'
  };
  
  // Fonts
  const fontFamilies = {
    'mono': "'JetBrains Mono', 'Courier New', monospace",
    'sans': "system-ui, -apple-system, sans-serif",
    'display': "'Space Grotesk', 'Inter', system-ui, sans-serif",
    'serif': "'Playfair Display', Georgia, serif",
    'grotesk': "'Archivo Black', 'Impact', sans-serif"
  };
  
  // Calculate scroll progress
  React.useEffect(() => {
    const updateProgress = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const scrollableDistance = scrollHeight - clientHeight;
      
      if (scrollableDistance <= 0) {
        setScrollProgress(0);
        return;
      }
      
      const progress = (scrollTop / scrollableDistance) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    
    return () => container.removeEventListener('scroll', updateProgress);
  }, []);
  
  // Intersection Observer
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observers = sectionRefs.current.map((section, index) => {
      if (!section) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(index);
            }
          });
        },
        { threshold: 0.5, root: container }
      );
      
      observer.observe(section);
      return observer;
    });
    
    return () => observers.forEach(observer => observer?.disconnect());
  }, [sectionCount]);
  
  // Scroll to section
  const scrollToSection = (index) => {
    const section = sectionRefs.current[index];
    if (section && containerRef.current) {
      containerRef.current.scrollTo({ 
        top: section.offsetTop, 
        behavior: 'smooth' 
      });
    }
  };
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Render indicators - SIMPLIFIED AND VISIBLE
  const renderIndicator = () => {
    const commonTransition = prefersReducedMotion ? 'none' : `all ${timing.duration}ms ${timing.easing}`;
    
    switch (layoutPreset) {
      case 'horizontal-top-rail':
        return (
          <>
            {/* Background track */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              backgroundColor: accentColor,
              opacity: 0.2,
              zIndex: 9998
            }} />
            
            {/* Progress bar */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '6px',
              width: `${scrollProgress}%`,
              backgroundColor: primaryColor,
              zIndex: 9999,
              transition: commonTransition
            }}>
              {showPercentage && (
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  fontFamily: fontFamilies[indicatorFont],
                  color: primaryColor,
                  letterSpacing: '0.05em'
                }}>
                  {Math.round(scrollProgress)}%
                </div>
              )}
            </div>
            
            {/* Section dots */}
            {showSectionDots && (
              <div style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '16px',
                zIndex: 9999
              }}>
                {Array.from({ length: sectionCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(i)}
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: activeSection === i ? '2px' : '50%',
                      backgroundColor: activeSection === i ? primaryColor : 'transparent',
                      border: `2px solid ${primaryColor}`,
                      cursor: 'pointer',
                      transition: commonTransition,
                      transform: activeSection === i ? 'scale(1.2) rotate(45deg)' : 'scale(1)',
                      padding: 0
                    }}
                    aria-label={`Section ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        );
      
      case 'horizontal-bottom-rail':
        return (
          <>
            <div style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              backgroundColor: primaryColor,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              padding: '0 40px',
              gap: '30px'
            }}>
              <div style={{
                flex: 1,
                height: '8px',
                backgroundColor: accentColor,
                opacity: 0.3,
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: `${scrollProgress}%`,
                  backgroundColor: accentColor,
                  transition: commonTransition
                }} />
              </div>
              
              {showPercentage && (
                <div style={{
                  fontSize: numberSizes[numberSize],
                  fontWeight: '900',
                  fontFamily: fontFamilies[indicatorFont],
                  color: accentColor,
                  letterSpacing: '-0.02em',
                  minWidth: '120px',
                  textAlign: 'right'
                }}>
                  {String(Math.round(scrollProgress)).padStart(2, '0')}
                </div>
              )}
            </div>
          </>
        );
      
      case 'vertical-right-rail':
        return (
          <div style={{
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            width: '100px',
            backgroundColor: primaryColor,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
            padding: '40px 0'
          }}>
            {showPercentage && (
              <div style={{
                fontSize: numberSizes[numberSize],
                fontWeight: '900',
                fontFamily: fontFamilies[indicatorFont],
                color: accentColor,
                letterSpacing: '-0.05em'
              }}>
                {String(Math.round(scrollProgress)).padStart(2, '0')}
              </div>
            )}
            
            <div style={{
              width: '4px',
              height: '200px',
              backgroundColor: accentColor,
              opacity: 0.3,
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: `${scrollProgress}%`,
                backgroundColor: accentColor,
                transition: commonTransition
              }} />
            </div>
            
            {showSectionDots && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {Array.from({ length: sectionCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(i)}
                    style={{
                      width: '10px',
                      height: activeSection === i ? '40px' : '10px',
                      backgroundColor: activeSection === i ? accentColor : 'transparent',
                      border: `2px solid ${accentColor}`,
                      cursor: 'pointer',
                      transition: commonTransition,
                      padding: 0
                    }}
                    aria-label={`Section ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'corner-morphing-shape':
        return (
          <div style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '120px',
            height: '120px',
            zIndex: 9999
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: primaryColor,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="120" height="120" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="3"
                  opacity="0.3"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="5"
                  strokeDasharray={`${2 * Math.PI * 55}`}
                  strokeDashoffset={`${2 * Math.PI * 55 * (1 - scrollProgress / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: commonTransition }}
                />
              </svg>
              
              {showPercentage && (
                <div style={{
                  fontSize: '28px',
                  fontWeight: '900',
                  fontFamily: fontFamilies[indicatorFont],
                  color: accentColor,
                  letterSpacing: '-0.02em',
                  zIndex: 1
                }}>
                  {Math.round(scrollProgress)}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'floating-kinetic-number':
        return (
          <div style={{
            position: 'fixed',
            top: '50%',
            right: '50px',
            transform: 'translateY(-50%)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '30px'
          }}>
            {showPercentage && (
              <div style={{
                fontSize: numberSizes[numberSize],
                fontWeight: '900',
                fontFamily: fontFamilies[indicatorFont],
                color: primaryColor,
                letterSpacing: '-0.05em',
                lineHeight: '0.9',
                textAlign: 'right'
              }}>
                <div>{String(Math.round(scrollProgress)).padStart(3, '0')}</div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  letterSpacing: '0.2em',
                  marginTop: '10px'
                }}>
                  PERCENT
                </div>
              </div>
            )}
            
            {showSectionDots && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'flex-end'
              }}>
                {Array.from({ length: sectionCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(i)}
                    style={{
                      width: activeSection === i ? '70px' : '35px',
                      height: '4px',
                      backgroundColor: primaryColor,
                      border: 'none',
                      cursor: 'pointer',
                      transition: commonTransition,
                      padding: 0
                    }}
                    aria-label={`Section ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'brutalist-bar':
        return (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            backgroundColor: primaryColor,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            padding: '0 50px',
            borderTop: `6px solid ${accentColor}`,
            gap: '40px'
          }}>
            <div style={{
              flex: 1,
              height: '24px',
              backgroundColor: accentColor,
              position: 'relative',
              border: `3px solid ${accentColor}`,
              opacity: 0.3
            }}>
              <div style={{
                height: '100%',
                width: `${scrollProgress}%`,
                backgroundColor: accentColor,
                border: `3px solid ${primaryColor}`,
                transition: commonTransition
              }} />
            </div>
            
            {showPercentage && (
              <div style={{
                fontSize: '40px',
                fontWeight: '900',
                fontFamily: fontFamilies[indicatorFont],
                color: accentColor,
                minWidth: '130px',
                textAlign: 'right'
              }}>
                {String(Math.round(scrollProgress)).padStart(3, '0')}%
              </div>
            )}
          </div>
        );
      
      case 'geometric-corners':
        return (
          <>
            {/* Top-left */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: `${Math.min(scrollProgress * 3, 300)}px`,
              height: '6px',
              backgroundColor: primaryColor,
              zIndex: 9999,
              transition: commonTransition
            }} />
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '6px',
              height: `${Math.min(scrollProgress * 3, 300)}px`,
              backgroundColor: primaryColor,
              zIndex: 9999,
              transition: commonTransition
            }} />
            
            {/* Bottom-right */}
            <div style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: `${Math.min(scrollProgress * 3, 300)}px`,
              height: '6px',
              backgroundColor: accentColor,
              zIndex: 9999,
              transition: commonTransition
            }} />
            <div style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: '6px',
              height: `${Math.min(scrollProgress * 3, 300)}px`,
              backgroundColor: accentColor,
              zIndex: 9999,
              transition: commonTransition
            }} />
            
            {showPercentage && (
              <div style={{
                position: 'fixed',
                top: '30px',
                right: '30px',
                fontSize: numberSizes[numberSize],
                fontWeight: '900',
                fontFamily: fontFamilies[indicatorFont],
                color: primaryColor,
                letterSpacing: '-0.05em',
                zIndex: 10000
              }}>
                {String(Math.round(scrollProgress)).padStart(2, '0')}
              </div>
            )}
          </>
        );
      
      default:
        return null;
    }
  };
  
  const sectionTitles = [
    { title: "BOLD", subtitle: "Make it count" },
    { title: "KINETIC", subtitle: "Always moving" },
    { title: "EXPERIMENTAL", subtitle: "Push boundaries" },
    { title: "AWARD-WINNING", subtitle: "Stand out" },
    { title: "EDGY", subtitle: "Break the rules" },
    { title: "DYNAMIC", subtitle: "Never static" },
    { title: "CONTEMPORARY", subtitle: "Now, not then" },
    { title: "IMPACTFUL", subtitle: "Impossible to ignore" }
  ];
  
  return (
    <>
      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="award-scroll-indicator-fixed"
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'auto',
          position: 'relative'
        }}
      >
        {/* Sections */}
        {Array.from({ length: sectionCount }).map((_, index) => (
          <div
            key={index}
            ref={el => sectionRefs.current[index] = el}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '100px 20px',
              backgroundColor: sectionBackgrounds[index],
              transition: prefersReducedMotion ? 'none' : 'background-color 500ms ease-out'
            }}
          >
            <div style={{ maxWidth: '800px', width: '100%' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                fontFamily: fontFamilies[sectionFonts[index]],
                color: sectionTextColors[index],
                letterSpacing: '0.3em',
                marginBottom: '30px',
                opacity: activeSection === index ? 1 : 0.5
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <h2 style={{
                fontSize: '64px',
                fontWeight: '900',
                fontFamily: fontFamilies[sectionFonts[index]],
                color: sectionTextColors[index],
                marginBottom: '16px',
                letterSpacing: '-0.02em',
                lineHeight: '1'
              }}>
                {sectionTitles[index].title}
              </h2>
              
              <div style={{
                fontSize: '24px',
                fontWeight: '400',
                fontFamily: fontFamilies[sectionFonts[index]],
                color: sectionTextColors[index],
                opacity: 0.7,
                marginBottom: '40px'
              }}>
                {sectionTitles[index].subtitle}
              </div>
              
              <p style={{
                fontSize: '18px',
                fontWeight: '400',
                fontFamily: fontFamilies[sectionFonts[index]],
                color: sectionTextColors[index],
                opacity: 0.9,
                lineHeight: '1.7'
              }}>
                NOW YOU CAN SEE THE INDICATOR! Each section has independent background color, 
                text color, and font family. Choose from 8 award-winning indicator layouts. 
                Full creative control with zero boring circles.
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Indicators - OUTSIDE scrollable container */}
      {renderIndicator()}
    </>
  );
}

export { MANIFEST, Component };
export default Component;
