import React from "react";

const MANIFEST = {
  "type": "Media.GSAPContinuousSlideshow",
  "description": "Continuous vertical slideshow with GSAP Observer - sections wrap infinitely with split text animations and parallax effects (replica of uploaded component)",
  "editorElement": {
    "selector": ".gsap-slideshow-container",
    "displayName": "GSAP Observer Slideshow",
    "archetype": "container",
    "data": {
      "sections": {
        "dataType": "text",
        "displayName": "Section Headings (comma-separated)",
        "defaultValue": "Scroll down,Animated with GSAP,GreenSock,Animation platform,Keep scrolling",
        "group": "Content"
      },
      "backgroundImages": {
        "dataType": "text",
        "displayName": "Background Images (comma-separated URLs)",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200,https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200,https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200,https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200",
        "group": "Content"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (seconds)",
        "defaultValue": "1.25",
        "options": ["0.8", "1.0", "1.25", "1.5", "2.0"],
        "group": "Animation"
      },
      "charStagger": {
        "dataType": "select",
        "displayName": "Character Stagger",
        "defaultValue": "0.02",
        "options": ["0.01", "0.02", "0.03", "0.04", "0.05"],
        "group": "Animation",
        "description": "Delay between each character animation"
      },
      "parallaxAmount": {
        "dataType": "select",
        "displayName": "Image Parallax Amount",
        "defaultValue": "15",
        "options": ["10", "15", "20", "25", "30"],
        "group": "Animation",
        "description": "Image movement percentage"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Heading Font Size (px)",
        "defaultValue": 64,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "700",
        "options": ["400", "500", "600", "700", "800", "900"],
        "group": "Typography"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "overlayOpacity": {
        "dataType": "select",
        "displayName": "Background Overlay Opacity",
        "defaultValue": "0.3",
        "options": ["0", "0.1", "0.2", "0.3", "0.4", "0.5"],
        "group": "Colors",
        "description": "Dark overlay on background images"
      }
    }
  }
};

function Component({ config = {} }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [direction, setDirection] = React.useState(1);
  const sectionsRef = React.useRef([]);
  const imagesRef = React.useRef([]);
  const outerWrappersRef = React.useRef([]);
  const innerWrappersRef = React.useRef([]);
  const headingsRef = React.useRef([]);
  const containerRef = React.useRef(null);
  
  // Safe config access
  const headings = (config?.sections || 'Scroll down,Animated with GSAP,GreenSock,Animation platform,Keep scrolling').split(',');
  const bgImages = (config?.backgroundImages || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200,https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200,https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200,https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200').split(',');
  
  const duration = parseFloat(config?.animationDuration) || 1.25;
  const charStagger = parseFloat(config?.charStagger) || 0.02;
  const parallaxAmount = parseInt(config?.parallaxAmount) || 15;
  const fontSize = config?.fontSize || 64;
  const fontWeight = config?.fontWeight || '700';
  const textColor = config?.textColor || '#FFFFFF';
  const overlayOpacity = parseFloat(config?.overlayOpacity) || 0.3;
  
  const totalSections = headings.length;
  
  // Wrap function
  const wrap = (index) => {
    return ((index % totalSections) + totalSections) % totalSections;
  };
  
  // Split text into characters
  const splitText = (text) => {
    return text.split('').map((char, index) => ({
      char: char === ' ' ? '\u00A0' : char,
      index
    }));
  };
  
  // Navigate to section
  const gotoSection = (index, dir) => {
    const wrappedIndex = wrap(index);
    
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(dir);
    
    const fromTop = dir === -1;
    const dFactor = fromTop ? -1 : 1;
    
    // Animate current section out
    if (currentIndex >= 0) {
      const currentSection = sectionsRef.current[currentIndex];
      const currentImage = imagesRef.current[currentIndex];
      
      if (currentSection && currentImage) {
        // Set z-index
        currentSection.style.zIndex = 0;
        
        // Animate image parallax out
        currentImage.style.transition = `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`;
        currentImage.style.transform = `translateY(${-parallaxAmount * dFactor}%)`;
        
        // Hide current section after animation
        setTimeout(() => {
          currentSection.style.opacity = 0;
          currentSection.style.visibility = 'hidden';
        }, duration * 1000);
      }
    }
    
    // Animate new section in
    const newSection = sectionsRef.current[wrappedIndex];
    const newImage = imagesRef.current[wrappedIndex];
    const newOuter = outerWrappersRef.current[wrappedIndex];
    const newInner = innerWrappersRef.current[wrappedIndex];
    const newHeading = headingsRef.current[wrappedIndex];
    
    if (newSection && newImage && newOuter && newInner) {
      // Show new section
      newSection.style.opacity = 1;
      newSection.style.visibility = 'visible';
      newSection.style.zIndex = 1;
      
      // Set initial positions for wrappers
      newOuter.style.transition = 'none';
      newInner.style.transition = 'none';
      newOuter.style.transform = `translateY(${100 * dFactor}%)`;
      newInner.style.transform = `translateY(${-100 * dFactor}%)`;
      
      // Set initial position for image
      newImage.style.transition = 'none';
      newImage.style.transform = `translateY(${parallaxAmount * dFactor}%)`;
      
      // Animate characters initial state
      if (newHeading) {
        const chars = newHeading.querySelectorAll('.char');
        chars.forEach(char => {
          char.style.transition = 'none';
          char.style.opacity = 0;
          char.style.transform = `translateY(${150 * dFactor}%)`;
        });
      }
      
      // Wait a frame then animate
      setTimeout(() => {
        // Animate wrappers
        newOuter.style.transition = `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`;
        newInner.style.transition = `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`;
        newOuter.style.transform = 'translateY(0)';
        newInner.style.transform = 'translateY(0)';
        
        // Animate image
        newImage.style.transition = `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`;
        newImage.style.transform = 'translateY(0)';
        
        // Animate characters
        if (newHeading) {
          const chars = newHeading.querySelectorAll('.char');
          chars.forEach((char, index) => {
            setTimeout(() => {
              char.style.transition = `all ${duration * 0.8}s cubic-bezier(0.16, 1, 0.3, 1)`;
              char.style.opacity = 1;
              char.style.transform = 'translateY(0)';
            }, duration * 200 + index * charStagger * 1000);
          });
        }
      }, 50);
    }
    
    setCurrentIndex(wrappedIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, duration * 1000);
  };
  
  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        gotoSection(currentIndex + 1, 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        gotoSection(currentIndex - 1, -1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);
  
  // Wheel/Touch navigation
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    let touchStartY = 0;
    let wheelTimeout = null;
    
    const handleWheel = (e) => {
      if (isAnimating) return;
      
      e.preventDefault();
      
      // Debounce wheel events
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          gotoSection(currentIndex + 1, 1);
        } else {
          gotoSection(currentIndex - 1, -1);
        }
      }, 50);
    };
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e) => {
      if (isAnimating) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          gotoSection(currentIndex + 1, 1);
        } else {
          gotoSection(currentIndex - 1, -1);
        }
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(wheelTimeout);
    };
  }, [currentIndex, isAnimating]);
  
  // Initial animation
  React.useEffect(() => {
    setTimeout(() => {
      gotoSection(0, 1);
    }, 100);
  }, []);
  
  return (
    <div 
      className="gsap-slideshow-container" 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
        touchAction: 'none'
      }}
    >
      {headings.map((heading, index) => {
        const chars = splitText(heading.trim());
        const bgImage = bgImages[index % bgImages.length];
        
        return (
          <section
            key={index}
            ref={el => sectionsRef.current[index] = el}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              visibility: 'hidden',
              zIndex: 0
            }}
          >
            <div
              ref={el => outerWrappersRef.current[index] = el}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <div
                ref={el => innerWrappersRef.current[index] = el}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <div
                  ref={el => imagesRef.current[index] = el}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: `rgba(0,0,0,${overlayOpacity})`
                  }} />
                  
                  {/* Heading with split characters */}
                  <h2
                    ref={el => headingsRef.current[index] = el}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      margin: 0,
                      fontSize: `${fontSize}px`,
                      fontWeight: fontWeight,
                      color: textColor,
                      textAlign: 'center',
                      width: '90%',
                      maxWidth: '1200px',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {chars.map((charObj, charIndex) => (
                      <span
                        key={charIndex}
                        className="char"
                        style={{
                          display: 'inline-block',
                          opacity: 0,
                          transform: 'translateY(150%)',
                          willChange: 'transform, opacity'
                        }}
                      >
                        {charObj.char}
                      </span>
                    ))}
                  </h2>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      
      {/* Scroll indicator */}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: textColor,
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'center',
        zIndex: 100,
        opacity: 0.8,
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        <div style={{ marginBottom: '8px' }}>
          {currentIndex + 1} / {totalSections}
        </div>
        <div style={{
          fontSize: '20px',
          animation: 'bounce 2s infinite'
        }}>
          ↓
        </div>
      </div>
      
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
