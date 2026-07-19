import React from "react";

const MANIFEST = {
  "type": "Typography.ScrollVelocityReactive",
  "description": "Typography that reacts to scroll velocity with physics-based distortion, momentum decay, overshoot animation, and multi-layer parallax depth",
  "editorElement": {
    "selector": ".scroll-velocity-text",
    "displayName": "Scroll-Velocity Reactive Text",
    "archetype": "container",
    "data": {
      "layer1Text": {
        "dataType": "text",
        "displayName": "Layer 1 Text (Front)",
        "defaultValue": "VELOCITY",
        "group": "Content"
      },
      "layer2Text": {
        "dataType": "text",
        "displayName": "Layer 2 Text (Middle)",
        "defaultValue": "MOMENTUM",
        "group": "Content"
      },
      "layer3Text": {
        "dataType": "text",
        "displayName": "Layer 3 Text (Back)",
        "defaultValue": "INERTIA",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "layer1Color": {
        "dataType": "color",
        "displayName": "Layer 1 Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "layer2Color": {
        "dataType": "color",
        "displayName": "Layer 2 Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "layer3Color": {
        "dataType": "color",
        "displayName": "Layer 3 Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 110,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "0em",
        "options": ["-0.02em", "0em", "0.02em", "0.05em"],
        "group": "Typography"
      },
      "velocitySensitivity": {
        "dataType": "select",
        "displayName": "Velocity Sensitivity",
        "defaultValue": "1.0",
        "options": ["0.5", "0.75", "1.0", "1.5", "2.0"],
        "group": "Animation"
      },
      "maxBlur": {
        "dataType": "select",
        "displayName": "Max Blur (px)",
        "defaultValue": "20",
        "options": ["10", "15", "20", "25", "30"],
        "group": "Animation"
      },
      "maxRotation": {
        "dataType": "select",
        "displayName": "Max Rotation (deg)",
        "defaultValue": "15",
        "options": ["5", "10", "15", "20", "25"],
        "group": "Animation"
      },
      "maxScale": {
        "dataType": "select",
        "displayName": "Max Scale",
        "defaultValue": "1.3",
        "options": ["1.1", "1.2", "1.3", "1.4", "1.5"],
        "group": "Animation"
      },
      "decayRate": {
        "dataType": "select",
        "displayName": "Momentum Decay Rate",
        "defaultValue": "0.92",
        "options": ["0.85", "0.9", "0.92", "0.95", "0.97"],
        "group": "Animation"
      },
      "overshootAmount": {
        "dataType": "select",
        "displayName": "Overshoot Amount",
        "defaultValue": "0.2",
        "options": ["0.1", "0.15", "0.2", "0.25", "0.3"],
        "group": "Animation"
      },
      "depthSeparation": {
        "dataType": "select",
        "displayName": "Layer Depth Separation",
        "defaultValue": "100",
        "options": ["50", "75", "100", "125", "150"],
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
  const [velocity, setVelocity] = React.useState(0);
  const [momentum, setMomentum] = React.useState(0);
  const [distortion, setDistortion] = React.useState({ blur: 0, scale: 1, rotation: 0 });
  
  const lastScrollY = React.useRef(0);
  const lastTimestamp = React.useRef(Date.now());
  const animationFrameRef = React.useRef(null);
  const isScrolling = React.useRef(false);
  const scrollTimeoutRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const layer1Text = config?.layer1Text || "VELOCITY";
  const layer2Text = config?.layer2Text || "MOMENTUM";
  const layer3Text = config?.layer3Text || "INERTIA";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const layer1Color = config?.layer1Color || "#212529";
  const layer2Color = config?.layer2Color || "#495057";
  const layer3Color = config?.layer3Color || "#6C757D";
  const fontSize = parseInt(config?.fontSize) || 110;
  const fontWeight = config?.fontWeight || "300";
  const letterSpacing = config?.letterSpacing || "0em";
  const velocitySensitivity = parseFloat(config?.velocitySensitivity) || 1.0;
  const maxBlur = parseFloat(config?.maxBlur) || 20;
  const maxRotation = parseFloat(config?.maxRotation) || 15;
  const maxScale = parseFloat(config?.maxScale) || 1.3;
  const decayRate = parseFloat(config?.decayRate) || 0.92;
  const overshootAmount = parseFloat(config?.overshootAmount) || 0.2;
  const depthSeparation = parseFloat(config?.depthSeparation) || 100;

  // Calculate scroll velocity
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const currentTime = Date.now();
          
          const deltaY = currentScrollY - lastScrollY.current;
          const deltaTime = currentTime - lastTimestamp.current;
          
          // Calculate velocity (pixels per millisecond)
          const rawVelocity = Math.abs(deltaY / deltaTime);
          const clampedVelocity = Math.min(rawVelocity * velocitySensitivity, 5);
          
          setVelocity(clampedVelocity);
          
          lastScrollY.current = currentScrollY;
          lastTimestamp.current = currentTime;
          
          isScrolling.current = true;
          
          // Clear existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          // Set new timeout for overshoot
          scrollTimeoutRef.current = setTimeout(() => {
            isScrolling.current = false;
          }, 50);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [velocitySensitivity, prefersReducedMotion]);

  // Momentum decay and overshoot animation
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const animate = () => {
      setMomentum(prevMomentum => {
        let newMomentum;
        
        if (isScrolling.current) {
          // Apply velocity to momentum
          newMomentum = velocity;
        } else {
          // Decay momentum with overshoot
          if (Math.abs(prevMomentum) > 0.01) {
            newMomentum = prevMomentum * decayRate;
            
            // Add overshoot when momentum is decaying
            if (prevMomentum > 0.1) {
              newMomentum -= prevMomentum * overshootAmount * 0.1;
            }
          } else {
            newMomentum = 0;
          }
        }
        
        return newMomentum;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [velocity, decayRate, overshootAmount, prefersReducedMotion]);

  // Calculate distortion based on momentum
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDistortion({ blur: 0, scale: 1, rotation: 0 });
      return;
    }

    const normalizedMomentum = Math.min(momentum / 3, 1);
    
    const blur = normalizedMomentum * maxBlur;
    const scale = 1 + normalizedMomentum * (maxScale - 1);
    const rotation = normalizedMomentum * maxRotation * (lastScrollY.current > 0 ? 1 : -1);
    
    setDistortion({ blur, scale, rotation });
  }, [momentum, maxBlur, maxScale, maxRotation, prefersReducedMotion]);

  const containerStyle = {
    minHeight: '300vh',
    backgroundColor,
    position: 'relative',
    overflow: 'hidden'
  };

  const fixedContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1500px',
    transformStyle: 'preserve-3d',
    pointerEvents: 'none'
  };

  const backgroundImageStyle = (layer) => {
    const parallaxMultiplier = layer === 1 ? 0.1 : layer === 2 ? 0.05 : 0.02;
    const scrollOffset = (window.scrollY || 0) * parallaxMultiplier;
    
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: prefersReducedMotion ? 'none' : `translateY(${scrollOffset}px)`,
      willChange: prefersReducedMotion ? 'auto' : 'transform',
      zIndex: layer === 1 ? 1 : layer === 2 ? 2 : 3,
      opacity: layer === 1 ? 0.04 : layer === 2 ? 0.06 : 0.08,
      backgroundImage: `url(https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=1920&q=80&fm=jpg&crop=entropy&cs=monochrome)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'grayscale(100%) contrast(1.2)',
      mixBlendMode: 'multiply'
    };
  };

  const textLayerStyle = (layer) => {
    if (prefersReducedMotion) {
      return {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        zIndex: 10 + layer
      };
    }

    const depthOffset = (layer - 2) * depthSeparation;
    const layerScale = layer === 1 ? 1 : layer === 2 ? 0.95 : 0.9;
    
    return {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      transform: `translateZ(${depthOffset}px) scale(${layerScale})`,
      transformStyle: 'preserve-3d',
      zIndex: 10 + layer
    };
  };

  const textStyle = (layerColor, layer) => {
    if (prefersReducedMotion) {
      return {
        fontSize: `clamp(${fontSize * 0.4}px, 10vw, ${fontSize}px)`,
        fontWeight,
        letterSpacing,
        color: layerColor,
        userSelect: 'none',
        opacity: layer === 1 ? 1 : layer === 2 ? 0.7 : 0.5
      };
    }

    const layerDistortionMultiplier = layer === 1 ? 1 : layer === 2 ? 0.7 : 0.5;
    const layerBlur = distortion.blur * layerDistortionMultiplier;
    const layerScale = 1 + (distortion.scale - 1) * layerDistortionMultiplier;
    const layerRotation = distortion.rotation * layerDistortionMultiplier;
    
    return {
      fontSize: `clamp(${fontSize * 0.4}px, 10vw, ${fontSize}px)`,
      fontWeight,
      letterSpacing,
      color: layerColor,
      userSelect: 'none',
      transform: `scale(${layerScale}) rotate(${layerRotation}deg)`,
      filter: `blur(${layerBlur}px)`,
      opacity: layer === 1 ? 1 : layer === 2 ? 0.7 : 0.5,
      transition: 'transform 50ms ease-out, filter 50ms ease-out',
      willChange: 'transform, filter',
      textShadow: `0 0 ${fontSize * 0.1}px ${layerColor}40`
    };
  };

  const instructionStyle = {
    position: 'fixed',
    bottom: '3rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '14px',
    color: layer1Color,
    opacity: 0.4,
    zIndex: 100,
    textAlign: 'center',
    pointerEvents: 'none',
    fontWeight: '300'
  };

  const velocityIndicatorStyle = {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    fontSize: '12px',
    color: layer1Color,
    opacity: 0.3,
    zIndex: 100,
    fontFamily: 'monospace',
    pointerEvents: 'none'
  };

  return (
    <div style={containerStyle} className="scroll-velocity-text">
      {/* Background Layers */}
      <div style={backgroundImageStyle(1)} />
      <div style={backgroundImageStyle(2)} />
      <div style={backgroundImageStyle(3)} />

      {/* Fixed Text Container */}
      <div style={fixedContainerStyle}>
        {/* Layer 3 (Back) */}
        <div style={textLayerStyle(3)}>
          <div style={textStyle(layer3Color, 3)}>
            {layer3Text}
          </div>
        </div>

        {/* Layer 2 (Middle) */}
        <div style={textLayerStyle(2)}>
          <div style={textStyle(layer2Color, 2)}>
            {layer2Text}
          </div>
        </div>

        {/* Layer 1 (Front) */}
        <div style={textLayerStyle(1)}>
          <div style={textStyle(layer1Color, 1)}>
            {layer1Text}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={instructionStyle}>
        Scroll to see velocity-reactive distortion • Momentum decays with overshoot
      </div>

      {/* Velocity Indicator */}
      {!prefersReducedMotion && (
        <div style={velocityIndicatorStyle}>
          velocity: {velocity.toFixed(3)}<br/>
          momentum: {momentum.toFixed(3)}<br/>
          blur: {distortion.blur.toFixed(1)}px
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
