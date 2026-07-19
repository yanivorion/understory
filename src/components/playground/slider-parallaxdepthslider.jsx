import React from "react";

const MANIFEST = {
  "type": "Slider.ParallaxDepthSlider",
  "description": "Infinite slider with multiple parallax depth layers, drag momentum physics with lerp smoothing, 3D perspective card rotation, and elastic snap-to-center",
  "editorElement": {
    "selector": ".parallax-depth-slider",
    "displayName": "Parallax Depth Slider",
    "archetype": "container",
    "data": {
      "slides": {
        "dataType": "text",
        "displayName": "Slide Titles (comma-separated)",
        "defaultValue": "Project Alpha,Project Beta,Project Gamma,Project Delta,Project Epsilon,Project Zeta",
        "group": "Content"
      },
      "slideDescriptions": {
        "dataType": "text",
        "displayName": "Slide Descriptions (pipe-separated)",
        "defaultValue": "Revolutionary design approach|Innovation in user experience|Technical excellence in development|Strategic business transformation|Deep market research insights|Data-driven decision making",
        "group": "Content"
      },
      "autoRotate": {
        "dataType": "booleanValue",
        "displayName": "Auto Rotate",
        "defaultValue": false,
        "group": "Animation"
      },
      "rotateSpeed": {
        "dataType": "select",
        "displayName": "Auto Rotate Speed (seconds)",
        "defaultValue": "4",
        "options": ["3", "4", "5", "6"],
        "group": "Animation"
      },
      "parallaxIntensity": {
        "dataType": "select",
        "displayName": "Parallax Depth Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "strong"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "cardColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#71717A",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Indicator Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 32,
        "group": "Typography"
      },
      "bodyFontSize": {
        "dataType": "number",
        "displayName": "Body Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
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
  const [dragState, setDragState] = React.useState({
    isDragging: false,
    startX: 0,
    currentX: 0,
    velocity: 0
  });
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [targetScroll, setTargetScroll] = React.useState(0);
  const containerRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);
  const lastTimeRef = React.useRef(Date.now());

  // Configuration
  const slidesText = config?.slides || "Project Alpha,Project Beta,Project Gamma,Project Delta,Project Epsilon,Project Zeta";
  const descriptionsText = config?.slideDescriptions || "Revolutionary design approach|Innovation in user experience|Technical excellence in development|Strategic business transformation|Deep market research insights|Data-driven decision making";
  const slides = slidesText.split(',').map(s => s.trim());
  const descriptions = descriptionsText.split('|').map(d => d.trim());
  const autoRotate = config?.autoRotate || false;
  const rotateSpeed = parseInt(config?.rotateSpeed || "4") * 1000;
  const parallaxIntensity = config?.parallaxIntensity || "medium";
  const backgroundColor = config?.backgroundColor || "#18181B";
  const cardColor = config?.cardColor || "#27272A";
  const textColor = config?.textColor || "#FAFAFA";
  const accentColor = config?.accentColor || "#71717A";
  const progressColor = config?.progressColor || "#3F3F46";
  const titleFontSize = config?.titleFontSize || 32;
  const bodyFontSize = config?.bodyFontSize || 14;
  const fontWeight = config?.fontWeight || "400";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Parallax multipliers
  const parallaxMultipliers = {
    subtle: { front: 1.2, middle: 1.0, back: 0.8 },
    medium: { front: 1.5, middle: 1.0, back: 0.6 },
    strong: { front: 2.0, middle: 1.0, back: 0.5 }
  }[parallaxIntensity];

  const cardWidth = 400;
  const cardGap = 40;
  const totalWidth = (cardWidth + cardGap) * slides.length;

  // Lerp function for smooth interpolation
  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  // Animation loop
  React.useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      // Smooth lerp interpolation
      setScrollPosition(prev => {
        const newScroll = lerp(prev, targetScroll, 0.1);
        return Math.abs(newScroll - targetScroll) < 0.1 ? targetScroll : newScroll;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetScroll]);

  // Auto rotate
  React.useEffect(() => {
    if (!autoRotate || dragState.isDragging || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setTargetScroll(prev => prev - (cardWidth + cardGap));
    }, rotateSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, dragState.isDragging, rotateSpeed, prefersReducedMotion]);

  // Mouse/Touch handlers
  const handleStart = (clientX) => {
    setDragState(prev => ({
      ...prev,
      isDragging: true,
      startX: clientX,
      currentX: clientX
    }));
  };

  const handleMove = (clientX) => {
    if (!dragState.isDragging) return;

    const delta = clientX - dragState.currentX;
    const velocity = delta;

    setTargetScroll(prev => prev + delta * 1.5);
    setDragState(prev => ({
      ...prev,
      currentX: clientX,
      velocity: velocity
    }));
  };

  const handleEnd = () => {
    if (!dragState.isDragging) return;

    // Apply momentum
    const momentum = dragState.velocity * 10;
    setTargetScroll(prev => prev + momentum);

    setDragState(prev => ({
      ...prev,
      isDragging: false,
      velocity: 0
    }));
  };

  // Wrap scroll position for infinite loop
  const wrappedScroll = ((scrollPosition % totalWidth) + totalWidth) % totalWidth;

  return (
    <div 
      className="parallax-depth-slider"
      style={{
        minHeight: '100vh',
        backgroundColor: backgroundColor,
        padding: '80px 0',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        perspective: '1200px',
        position: 'relative'
      }}
    >
      {/* Background Parallax Layer (slowest) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '400px',
        transform: `translateY(-50%) translateX(${wrappedScroll * parallaxMultipliers.back}px)`,
        display: 'flex',
        gap: '200px',
        pointerEvents: 'none',
        opacity: 0.1
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              minWidth: '150px',
              height: '150px',
              borderRadius: '50%',
              border: `2px solid ${accentColor}`,
              flexShrink: 0
            }}
          />
        ))}
      </div>

      {/* Main Slider Container */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        style={{
          position: 'relative',
          display: 'flex',
          gap: cardGap + 'px',
          cursor: dragState.isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          paddingLeft: '50%',
          transform: `translateX(${wrappedScroll * parallaxMultipliers.middle}px)`,
          willChange: 'transform'
        }}
      >
        {/* Render cards multiple times for infinite effect */}
        {[...Array(3)].map((_, setIndex) => (
          <React.Fragment key={setIndex}>
            {slides.map((slide, index) => {
              const absoluteIndex = setIndex * slides.length + index;
              const offset = absoluteIndex * (cardWidth + cardGap);
              const distanceFromCenter = Math.abs(wrappedScroll - offset);
              const normalizedDistance = distanceFromCenter / (cardWidth + cardGap);
              const scale = Math.max(0.85, 1 - normalizedDistance * 0.1);
              const rotateY = (normalizedDistance * 15) * (wrappedScroll > offset ? 1 : -1);
              const opacity = Math.max(0.4, 1 - normalizedDistance * 0.3);

              return (
                <div
                  key={`${setIndex}-${index}`}
                  style={{
                    minWidth: cardWidth + 'px',
                    height: '500px',
                    backgroundColor: cardColor,
                    borderRadius: '12px',
                    padding: '40px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    transform: prefersReducedMotion 
                      ? `scale(${scale})`
                      : `scale(${scale}) rotateY(${rotateY}deg) translateZ(${scale * 50}px)`,
                    opacity: opacity,
                    transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease',
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    pointerEvents: dragState.isDragging ? 'none' : 'auto'
                  }}
                >
                  <div>
                    <h3 style={{
                      fontSize: titleFontSize + 'px',
                      fontWeight: '500',
                      color: textColor,
                      margin: 0,
                      marginBottom: '24px',
                      letterSpacing: '-0.02em'
                    }}>
                      {slide}
                    </h3>
                    <p style={{
                      fontSize: bodyFontSize + 'px',
                      fontWeight: fontWeight,
                      color: accentColor,
                      lineHeight: 1.6,
                      margin: 0
                    }}>
                      {descriptions[index] || 'Detailed description of this project'}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '32px'
                  }}>
                    <span style={{
                      fontSize: (bodyFontSize - 2) + 'px',
                      color: accentColor,
                      fontWeight: fontWeight
                    }}>
                      0{index + 1}
                    </span>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: `2px solid ${accentColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      color: accentColor
                    }}>
                      →
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Foreground Parallax Layer (fastest) */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: 0,
        right: 0,
        height: '200px',
        transform: `translateX(${wrappedScroll * parallaxMultipliers.front}px)`,
        display: 'flex',
        gap: '150px',
        pointerEvents: 'none',
        opacity: 0.05
      }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              minWidth: '80px',
              height: '80px',
              borderRadius: '8px',
              border: `2px solid ${textColor}`,
              flexShrink: 0,
              transform: 'rotate(45deg)'
            }}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        {slides.map((_, index) => {
          const isActive = Math.abs(Math.round(wrappedScroll / (cardWidth + cardGap)) % slides.length) === index;
          return (
            <div
              key={index}
              style={{
                width: isActive ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: isActive ? textColor : progressColor,
                transition: prefersReducedMotion ? 'none' : 'width 300ms ease, background-color 300ms ease',
                cursor: 'pointer'
              }}
              onClick={() => setTargetScroll(-index * (cardWidth + cardGap))}
            />
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
