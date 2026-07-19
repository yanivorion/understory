import React from "react";

const MANIFEST = {
  "type": "Text.KineticTextReveal",
  "description": "Kinetic typography component with character-level reveal animations, rotation, scaling, and multiple stagger patterns",
  "editorElement": {
    "selector": ".kinetic-text-container",
    "displayName": "Kinetic Text Reveal",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "Kinetic Energy",
        "group": "Content"
      },
      "autoPlay": {
        "dataType": "booleanValue",
        "displayName": "Auto Play on Load",
        "defaultValue": true,
        "group": "Content"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui, -apple-system, sans-serif",
        "options": [
          "system-ui, -apple-system, sans-serif",
          "Inter, sans-serif",
          "Georgia, serif",
          "'SF Pro Display', sans-serif"
        ],
        "group": "Typography"
      },
      "fontSize": {
        "dataType": "select",
        "displayName": "Font Size",
        "defaultValue": "72px",
        "options": ["48px", "56px", "64px", "72px", "80px", "96px", "120px"],
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "-0.02em",
        "options": ["-0.04em", "-0.02em", "0em", "0.02em", "0.05em"],
        "group": "Typography"
      },
      "staggerPattern": {
        "dataType": "select",
        "displayName": "Stagger Pattern",
        "defaultValue": "sequential",
        "options": ["sequential", "reverse", "random", "fromCenter", "fromEdges", "alternating"],
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (per char)",
        "defaultValue": "600ms",
        "options": ["400ms", "500ms", "600ms", "700ms", "800ms"],
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay",
        "defaultValue": "50ms",
        "options": ["30ms", "40ms", "50ms", "60ms", "80ms", "100ms"],
        "group": "Animation"
      },
      "rotationIntensity": {
        "dataType": "select",
        "displayName": "Rotation Intensity",
        "defaultValue": "15",
        "options": ["0", "10", "15", "20", "30", "45"],
        "group": "Animation"
      },
      "scaleIntensity": {
        "dataType": "select",
        "displayName": "Scale Intensity",
        "defaultValue": "0.3",
        "options": ["0", "0.2", "0.3", "0.5", "0.7"],
        "group": "Animation"
      },
      "translateYIntensity": {
        "dataType": "select",
        "displayName": "Vertical Movement",
        "defaultValue": "30",
        "options": ["0", "20", "30", "40", "60"],
        "group": "Animation"
      },
      "enableBlur": {
        "dataType": "booleanValue",
        "displayName": "Enable Blur Effect",
        "defaultValue": true,
        "group": "Effects"
      },
      "blurIntensity": {
        "dataType": "select",
        "displayName": "Blur Intensity",
        "defaultValue": "10",
        "options": ["5", "8", "10", "15", "20"],
        "group": "Effects"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [animatedIndices, setAnimatedIndices] = React.useState(new Set());
  const [isAnimating, setIsAnimating] = React.useState(false);
  const containerRef = React.useRef(null);
  
  // Safe config access with defaults
  const text = config?.text || "Kinetic Energy";
  const autoPlay = config?.autoPlay !== false;
  const textColor = config?.textColor || "#1A1A1A";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  
  const fontFamily = config?.fontFamily || "system-ui, -apple-system, sans-serif";
  const fontSize = config?.fontSize || "72px";
  const fontWeight = config?.fontWeight || "400";
  const letterSpacing = config?.letterSpacing || "-0.02em";
  
  const staggerPattern = config?.staggerPattern || "sequential";
  const animationDuration = parseInt(config?.animationDuration || "600");
  const staggerDelay = parseInt(config?.staggerDelay || "50");
  const rotationIntensity = parseInt(config?.rotationIntensity || "15");
  const scaleIntensity = parseFloat(config?.scaleIntensity || "0.3");
  const translateYIntensity = parseInt(config?.translateYIntensity || "30");
  
  const enableBlur = config?.enableBlur !== false;
  const blurIntensity = parseInt(config?.blurIntensity || "10");
  
  // Split text into characters
  const characters = text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char, // Non-breaking space
    index,
    originalIndex: index
  }));
  
  // Generate stagger order based on pattern
  const getStaggerOrder = () => {
    const indices = characters.map((_, i) => i);
    
    switch(staggerPattern) {
      case 'reverse':
        return indices.reverse();
      
      case 'random':
        // Deterministic random for consistent replays
        const seeded = [...indices];
        for (let i = seeded.length - 1; i > 0; i--) {
          const j = Math.floor((Math.sin(i * 12.9898) * 43758.5453) % 1 * (i + 1));
          [seeded[i], seeded[j]] = [seeded[j], seeded[i]];
        }
        return seeded;
      
      case 'fromCenter':
        const center = Math.floor(indices.length / 2);
        const ordered = [];
        for (let i = 0; i < indices.length; i++) {
          if (i % 2 === 0) {
            ordered.push(center + Math.floor(i / 2));
          } else {
            ordered.push(center - Math.ceil(i / 2));
          }
        }
        return ordered.filter(i => i >= 0 && i < indices.length);
      
      case 'fromEdges':
        const edges = [];
        let left = 0, right = indices.length - 1;
        while (left <= right) {
          edges.push(left++);
          if (left <= right) edges.push(right--);
        }
        return edges;
      
      case 'alternating':
        const even = indices.filter(i => i % 2 === 0);
        const odd = indices.filter(i => i % 2 !== 0);
        return [...even, ...odd];
      
      case 'sequential':
      default:
        return indices;
    }
  };
  
  // Trigger animation
  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimatedIndices(new Set());
    
    const order = getStaggerOrder();
    
    order.forEach((charIndex, orderIndex) => {
      setTimeout(() => {
        setAnimatedIndices(prev => {
          const newSet = new Set(prev);
          newSet.add(charIndex);
          return newSet;
        });
        
        // Animation complete
        if (orderIndex === order.length - 1) {
          setTimeout(() => setIsAnimating(false), animationDuration);
        }
      }, orderIndex * staggerDelay);
    });
  };
  
  // Auto-play on mount or config change
  React.useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(startAnimation, 100);
      return () => clearTimeout(timer);
    }
  }, [text, staggerPattern, autoPlay]);
  
  const containerStyle = {
    display: 'inline-block',
    padding: '40px',
    backgroundColor,
    borderRadius: '8px',
    cursor: isAnimating ? 'default' : 'pointer',
    userSelect: 'none'
  };
  
  const textContainerStyle = {
    display: 'flex',
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight: '1.1',
    color: textColor
  };
  
  const getCharStyle = (index) => {
    const isAnimated = animatedIndices.has(index);
    
    // Calculate random rotation direction (deterministic)
    const rotationDirection = Math.sin(index * 7.1234) > 0 ? 1 : -1;
    const rotation = isAnimated ? 0 : (rotationIntensity * rotationDirection);
    
    const scale = isAnimated ? 1 : (1 - scaleIntensity);
    const translateY = isAnimated ? 0 : translateYIntensity;
    
    const filters = [];
    if (enableBlur) {
      filters.push(`blur(${isAnimated ? 0 : blurIntensity}px)`);
    }
    
    return {
      display: 'inline-block',
      opacity: isAnimated ? 1 : 0,
      transform: `translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
      filter: filters.join(' '),
      transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      willChange: 'transform, opacity, filter'
    };
  };
  
  return (
    <div 
      ref={containerRef}
      className="kinetic-text-container"
      style={containerStyle}
      onClick={!isAnimating ? startAnimation : undefined}
    >
      <div style={textContainerStyle}>
        {characters.map((item, index) => (
          <span key={index} style={getCharStyle(item.originalIndex)}>
            {item.char}
          </span>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
