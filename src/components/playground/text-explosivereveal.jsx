import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 15, 2025, 11:03 AM
 * Component Type: Text.ExplosiveReveal
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Text.ExplosiveReveal",
  "description": "Professional text reveal component with 12 boutique animation presets. Features character-level animations including Explosive, Typewriter, Wave, Glitch, Spiral, Pendulum, Quantum, Cascade, Magnetic, Origami, Ripple, and Aurora effects. Perfect for hero sections, feature introductions, and attention-grabbing headlines.",
  "editorElement": {
    "selector": ".explosive-text-reveal",
    "displayName": "Boutique Text Reveal",
    "archetype": "container",
    "data": {
      // Content Group
      "text": {
        "dataType": "text",
        "displayName": "Headline Text",
        "defaultValue": "Experience the art of typographic motion. Each character tells a story through sophisticated animation.",
        "group": "Content",
        "description": "The text content to animate with reveal effect"
      },
      "showReplayButton": {
        "dataType": "booleanValue",
        "displayName": "Show Replay Button",
        "defaultValue": true,
        "group": "Content",
        "description": "Display a button to replay the animation"
      },
      "replayButtonText": {
        "dataType": "text",
        "displayName": "Replay Button Text",
        "defaultValue": "Replay",
        "group": "Content",
        "description": "Text label for the replay button"
      },
      "triggerMode": {
        "dataType": "select",
        "displayName": "Trigger Mode",
        "defaultValue": "entrance",
        "options": ["entrance", "scroll", "manual"],
        "group": "Content",
        "description": "Animation trigger: Entrance (play once on enter), Scroll (play each time scrolled into view), Manual (only via replay button)"
      },
      "scrollThreshold": {
        "dataType": "select",
        "displayName": "Scroll Trigger Threshold",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.5", "0.7"],
        "group": "Content",
        "description": "Percentage of component visible before triggering (lower = triggers earlier)"
      },
      
      // Colors Group
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Main background color of the component"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "Color of the animated headline text"
      },
      "buttonTextColor": {
        "dataType": "color",
        "displayName": "Button Text Color",
        "defaultValue": "#495057",
        "group": "Colors",
        "description": "Color of the replay button text"
      },
      "buttonBorderColor": {
        "dataType": "color",
        "displayName": "Button Border Color",
        "defaultValue": "#495057",
        "group": "Colors",
        "description": "Color of the replay button border"
      },
      "buttonHoverColor": {
        "dataType": "color",
        "displayName": "Button Hover Color",
        "defaultValue": "#343A40",
        "group": "Colors",
        "description": "Button border and text color on hover"
      },
      
      // Typography Group
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 48,
        "group": "Typography",
        "description": "Base font size for headline text in pixels (scales responsively)"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography",
        "description": "Font weight: 300 (Light), 400 (Regular), or 500 (Medium)"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "0.05em",
        "options": ["0em", "0.025em", "0.05em", "0.075em", "0.1em"],
        "group": "Typography",
        "description": "Spacing between letters"
      },
      "textAlign": {
        "dataType": "select",
        "displayName": "Text Alignment",
        "defaultValue": "center",
        "options": ["left", "center", "right"],
        "group": "Typography",
        "description": "Horizontal alignment of the text"
      },
      
      // Animation Group
      "animationPreset": {
        "dataType": "select",
        "displayName": "Animation Preset",
        "defaultValue": "explosive",
        "options": [
          "explosive",
          "typewriter",
          "wave",
          "glitch",
          "spiral",
          "pendulum",
          "quantum",
          "cascade",
          "magnetic",
          "origami",
          "ripple",
          "aurora",
          "wonderland"
        ],
        "group": "Animation",
        "description": "Choose boutique animation style: Explosive (random scatter), Typewriter (classic reveal), Wave (sine motion), Glitch (digital stutter), Spiral (rotating entrance), Pendulum (swing motion), Quantum (phase shift), Cascade (waterfall), Magnetic (center pull), Origami (fold unfold), Ripple (circular spread), Aurora (color shimmer), Wonderland (3D kinetic depth)"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800", "1000"],
        "group": "Animation",
        "description": "Duration of each character's animation in milliseconds"
      },
      "staggerAmount": {
        "dataType": "select",
        "displayName": "Stagger Amount",
        "defaultValue": "0.6",
        "options": ["0.3", "0.4", "0.5", "0.6", "0.8", "1.0", "1.5"],
        "group": "Animation",
        "description": "Total time to stagger all characters in seconds"
      },
      "intensity": {
        "dataType": "select",
        "displayName": "Effect Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "dramatic"],
        "group": "Animation",
        "description": "Overall intensity of animation effects"
      },
      "replaySpeed": {
        "dataType": "select",
        "displayName": "Replay Speed",
        "defaultValue": "0.5",
        "options": ["0.25", "0.5", "0.75", "1.0"],
        "group": "Animation",
        "description": "Speed multiplier for replay animation (lower = slower)"
      },
      
      // Layout Group
      "maxWidth": {
        "dataType": "select",
        "displayName": "Max Width",
        "defaultValue": "1200px",
        "options": ["800px", "1000px", "1200px", "1400px", "100%"],
        "group": "Layout",
        "description": "Maximum width of the text container"
      },
      "padding": {
        "dataType": "select",
        "displayName": "Container Padding",
        "defaultValue": "60px 20px",
        "options": ["40px 20px", "60px 20px", "80px 40px", "100px 40px"],
        "group": "Layout",
        "description": "Padding around the component (vertical horizontal)"
      }
    }
  }
};

function Component({ config = {} }) {
  // Safe config access with optional chaining and defaults
  const text = config?.text || "Experience the art of typographic motion. Each character tells a story through sophisticated animation.";
  const showReplayButton = config?.showReplayButton !== false;
  const replayButtonText = config?.replayButtonText || "Replay";
  const triggerMode = config?.triggerMode || "entrance";
  const scrollThreshold = parseFloat(config?.scrollThreshold || "0.3");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#212529";
  const buttonTextColor = config?.buttonTextColor || "#495057";
  const buttonBorderColor = config?.buttonBorderColor || "#495057";
  const buttonHoverColor = config?.buttonHoverColor || "#343A40";
  const fontSize = parseInt(config?.fontSize || "48");
  const fontWeight = config?.fontWeight || "500";
  const letterSpacing = config?.letterSpacing || "0.05em";
  const textAlign = config?.textAlign || "center";
  const animationPreset = config?.animationPreset || "explosive";
  const animationDuration = parseInt(config?.animationDuration || "600");
  const staggerAmount = parseFloat(config?.staggerAmount || "0.6");
  const intensity = config?.intensity || "medium";
  const replaySpeed = parseFloat(config?.replaySpeed || "0.5");
  const maxWidth = config?.maxWidth || "1200px";
  const padding = config?.padding || "60px 20px";
  
  const [animatedIndices, setAnimatedIndices] = React.useState(new Set());
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);
  const containerRef = React.useRef(null);
  const animationTimeoutsRef = React.useRef([]);
  const textCharsRef = React.useRef([]);
  
  // Intensity multipliers
  const intensityMultiplier = {
    subtle: 0.5,
    medium: 1,
    dramatic: 1.5
  }[intensity];
  
  // Animation preset configurations
  const getAnimationConfig = (preset, charIndex, totalChars) => {
    const middle = Math.floor(totalChars / 2);
    const distanceFromMiddle = Math.abs(charIndex - middle);
    const normalizedPosition = charIndex / totalChars; // 0 to 1
    
    const configs = {
      explosive: {
        offsetY: (Math.random() - 0.5) * 300 * intensityMultiplier,
        offsetX: (Math.random() - 0.5) * 300 * intensityMultiplier,
        rotation: (Math.random() - 0.5) * 180 * intensityMultiplier,
        scale: 0.3,
        blur: 10,
        staggerType: 'random'
      },
      typewriter: {
        offsetY: 0,
        offsetX: -20 * intensityMultiplier,
        rotation: 0,
        scale: 1,
        blur: 0,
        staggerType: 'sequential'
      },
      wave: {
        offsetY: Math.sin(normalizedPosition * Math.PI * 2) * 80 * intensityMultiplier,
        offsetX: 0,
        rotation: Math.sin(normalizedPosition * Math.PI * 2) * 15 * intensityMultiplier,
        scale: 0.8,
        blur: 0,
        staggerType: 'sequential'
      },
      glitch: {
        offsetY: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 40 + 20) * intensityMultiplier,
        offsetX: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 60 + 30) * intensityMultiplier,
        rotation: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 20 + 10),
        scale: Math.random() * 0.5 + 0.5,
        blur: Math.random() * 8,
        staggerType: 'random'
      },
      spiral: {
        offsetY: Math.sin(normalizedPosition * Math.PI * 6) * 120 * intensityMultiplier,
        offsetX: Math.cos(normalizedPosition * Math.PI * 6) * 120 * intensityMultiplier,
        rotation: normalizedPosition * 720 * intensityMultiplier,
        scale: 0.3,
        blur: 5,
        staggerType: 'sequential'
      },
      pendulum: {
        offsetY: Math.sin(normalizedPosition * Math.PI) * 100 * intensityMultiplier,
        offsetX: (normalizedPosition - 0.5) * 150 * intensityMultiplier,
        rotation: (normalizedPosition - 0.5) * 90 * intensityMultiplier,
        scale: 0.7,
        blur: 0,
        staggerType: 'edges'
      },
      quantum: {
        offsetY: (charIndex % 2 === 0 ? 80 : -80) * intensityMultiplier,
        offsetX: (charIndex % 3 === 0 ? 60 : charIndex % 3 === 1 ? 0 : -60) * intensityMultiplier,
        rotation: (charIndex % 4) * 90,
        scale: charIndex % 2 === 0 ? 0.4 : 1.6,
        blur: charIndex % 2 === 0 ? 15 : 0,
        staggerType: 'alternating'
      },
      cascade: {
        offsetY: -150 * intensityMultiplier,
        offsetX: (charIndex % 5 - 2) * 30 * intensityMultiplier,
        rotation: (charIndex % 3 - 1) * 20,
        scale: 0.5,
        blur: 8,
        staggerType: 'sequential'
      },
      magnetic: {
        offsetY: (normalizedPosition - 0.5) * 200 * intensityMultiplier,
        offsetX: (normalizedPosition - 0.5) * 200 * intensityMultiplier,
        rotation: (normalizedPosition - 0.5) * 180 * intensityMultiplier,
        scale: 0.2,
        blur: 12,
        staggerType: 'fromCenter'
      },
      origami: {
        offsetY: charIndex % 2 === 0 ? -100 * intensityMultiplier : 100 * intensityMultiplier,
        offsetX: 0,
        rotation: charIndex % 2 === 0 ? -90 : 90,
        scale: 0.1,
        blur: 0,
        staggerType: 'alternating',
        perspective: true
      },
      ripple: {
        offsetY: Math.sin(distanceFromMiddle * 0.5) * 80 * intensityMultiplier,
        offsetX: Math.cos(distanceFromMiddle * 0.5) * 80 * intensityMultiplier,
        rotation: distanceFromMiddle * 15,
        scale: 0.4 + (distanceFromMiddle * 0.05),
        blur: distanceFromMiddle * 0.5,
        staggerType: 'fromCenter'
      },
      aurora: {
        offsetY: Math.sin(normalizedPosition * Math.PI * 4) * 60 * intensityMultiplier,
        offsetX: Math.cos(normalizedPosition * Math.PI * 3) * 60 * intensityMultiplier,
        rotation: normalizedPosition * 360,
        scale: 0.6,
        blur: 10,
        saturation: 150,
        hueRotate: normalizedPosition * 180,
        staggerType: 'sequential'
      },
      wonderland: {
        offsetY: 40 + (Math.sin(charIndex * 0.5) * 40) * intensityMultiplier,
        offsetX: (Math.sin(charIndex * 0.3) * 25) * intensityMultiplier,
        rotation: 0,
        rotateX: 35 + (Math.sin(charIndex * 0.4) * 35) * intensityMultiplier,
        rotateY: -40 + (Math.cos(charIndex * 0.3) * 40) * intensityMultiplier,
        rotateZ: -18 + (Math.sin(charIndex * 0.6) * 18) * intensityMultiplier,
        scale: 1,
        blur: 0,
        staggerType: 'sequential',
        perspective: true,
        use3D: true
      }
    };
    
    return configs[preset] || configs.explosive;
  };
  
  // Split text into characters - recalculate when preset or intensity changes
  React.useEffect(() => {
    const characters = text.split('').map((char, index) => {
      const animConfig = getAnimationConfig(animationPreset, index, text.length);
      return {
        char: char === ' ' ? '\u00A0' : char,
        index,
        ...animConfig
      };
    });
    textCharsRef.current = characters;
    
    // Reset animation when preset changes
    setAnimatedIndices(new Set());
    setHasAnimated(false);
  }, [text, animationPreset, intensity]);
  
  // Get stagger order based on type
  const getStaggerOrder = (totalChars, staggerType) => {
    const indices = Array.from({ length: totalChars }, (_, i) => i);
    
    switch (staggerType) {
      case 'sequential':
        return indices;
      case 'reverse':
        return indices.reverse();
      case 'alternating':
        return indices.sort((a, b) => (a % 2) - (b % 2));
      case 'fromCenter': {
        const middle = Math.floor(totalChars / 2);
        return indices.sort((a, b) => 
          Math.abs(a - middle) - Math.abs(b - middle)
        );
      }
      case 'edges': {
        const middle = Math.floor(totalChars / 2);
        return indices.sort((a, b) => 
          Math.abs(b - middle) - Math.abs(a - middle)
        );
      }
      case 'random':
      default:
        return indices.sort(() => Math.random() - 0.5);
    }
  };
  
  // Animation function
  const animate = React.useCallback((speed = 1) => {
    if (textCharsRef.current.length === 0) return;
    
    setIsAnimating(true);
    setAnimatedIndices(new Set());
    
    // Clear any existing timeouts
    animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    animationTimeoutsRef.current = [];
    
    // Get stagger order based on preset's stagger type
    const staggerType = textCharsRef.current[0]?.staggerType || 'random';
    const staggerOrder = getStaggerOrder(textCharsRef.current.length, staggerType);
    const delayIncrement = (staggerAmount * 1000) / textCharsRef.current.length;
    
    staggerOrder.forEach((charIndex, staggerIndex) => {
      const timeout = setTimeout(() => {
        setAnimatedIndices(prev => {
          const newSet = new Set(prev);
          newSet.add(charIndex);
          return newSet;
        });
      }, staggerIndex * delayIncrement * speed);
      
      animationTimeoutsRef.current.push(timeout);
    });
    
    // Reset animation state after completion
    const completionTimeout = setTimeout(() => {
      setIsAnimating(false);
      setHasAnimated(true);
    }, (textCharsRef.current.length * delayIncrement * speed) + (animationDuration * speed));
    
    animationTimeoutsRef.current.push(completionTimeout);
  }, [animationDuration, staggerAmount]);
  
  // Intersection Observer for scroll-triggered animation
  React.useEffect(() => {
    if (triggerMode === 'manual') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && textCharsRef.current.length > 0) {
            // For 'entrance' mode, only play once
            if (triggerMode === 'entrance' && hasAnimated) return;
            
            // For 'scroll' mode, always play when entering viewport
            if (triggerMode === 'scroll' || !hasAnimated) {
              setTimeout(() => animate(), 100);
            }
          }
        });
      },
      { threshold: scrollThreshold }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [triggerMode, scrollThreshold, hasAnimated, animate]);
  
  // Replay function
  const handleReplay = () => {
    setAnimatedIndices(new Set());
    setHasAnimated(false);
    
    // Trigger animation with replay speed after a brief delay
    setTimeout(() => {
      animate(replaySpeed);
    }, 50);
  };
  
  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return (
    <div 
      ref={containerRef}
      className="explosive-text-reveal"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        padding,
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        maxWidth,
        width: '100%',
        padding: '0 20px',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          margin: '0 0 40px 0',
          color: textColor,
          fontSize: `clamp(${fontSize * 0.4}px, ${fontSize / 16}rem + 2vw, ${fontSize}px)`,
          fontWeight,
          letterSpacing,
          textAlign,
          lineHeight: 1.3,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          wordWrap: 'break-word',
          overflow: 'hidden',
          perspective: textCharsRef.current[0]?.perspective ? '1200px' : 'none',
          transformStyle: textCharsRef.current[0]?.use3D ? 'preserve-3d' : 'flat'
        }}>
          {textCharsRef.current.map((item, index) => {
            const isAnimated = animatedIndices.has(index);
            const filters = [];
            
            if (item.blur) filters.push(`blur(${isAnimated ? 0 : item.blur}px)`);
            if (item.saturation) filters.push(`saturate(${isAnimated ? 100 : item.saturation}%)`);
            if (item.hueRotate) filters.push(`hue-rotate(${isAnimated ? 0 : item.hueRotate}deg)`);
            
            // Build transform string based on whether it's 3D or 2D
            let transformString;
            if (item.use3D) {
              transformString = isAnimated
                ? 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(0, 0, 0) scale(1)'
                : `rotateX(${item.rotateX || 0}deg) rotateY(${item.rotateY || 0}deg) rotateZ(${item.rotateZ || 0}deg) translate3d(${item.offsetX}px, ${item.offsetY}px, 0) scale(${item.scale || 1})`;
            } else {
              transformString = isAnimated 
                ? 'translate(0, 0) rotate(0deg) scale(1)' 
                : `translate(${item.offsetX}px, ${item.offsetY}px) rotate(${item.rotation || 0}deg) scale(${item.scale || 1})`;
            };
            
            return (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  opacity: prefersReducedMotion ? 1 : (isAnimated ? 1 : 0),
                  transform: prefersReducedMotion ? 'translate(0, 0) rotate(0deg) scale(1)' : transformString,
                  filter: prefersReducedMotion ? 'none' : (filters.length > 0 ? filters.join(' ') : 'none'),
                  transition: prefersReducedMotion 
                    ? 'none'
                    : `opacity ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1), filter ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  willChange: 'transform, opacity, filter',
                  transformStyle: item.use3D ? 'preserve-3d' : 'flat'
                }}
              >
                {item.char}
              </span>
            );
          })}
        </h1>
        
        {showReplayButton && (
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              onClick={handleReplay}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              disabled={isAnimating}
              style={{
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: isButtonHovered ? buttonHoverColor : buttonTextColor,
                backgroundColor: 'transparent',
                border: `3px solid ${isButtonHovered ? buttonHoverColor : buttonBorderColor}`,
                borderRadius: '99px',
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                outline: 'none',
                transition: 'all 200ms ease-out',
                opacity: isAnimating ? 0.5 : 1,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                WebkitTapHighlightColor: 'transparent'
              }}
              aria-label={`${replayButtonText} - Press to replay the text reveal animation`}
            >
              {replayButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
