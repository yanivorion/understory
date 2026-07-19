import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 21, 2025, 03:34 AM
 * Component Type: Typography.KineticHeadline
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Typography.KineticHeadline",
  "description": "Premium character-level text animation component with 13 boutique animation presets, 3 trigger modes, and comprehensive customization",
  "editorElement": {
    "selector": ".kinetic-headline-container",
    "displayName": "Kinetic Typography Headline",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Headline Text",
        "defaultValue": "Transform Your Vision Into Reality",
        "group": "Content"
      },
      "showReplayButton": {
        "dataType": "booleanValue",
        "displayName": "Show Replay Button",
        "defaultValue": true,
        "group": "Content"
      },
      "replayButtonText": {
        "dataType": "text",
        "displayName": "Replay Button Text",
        "defaultValue": "↻ Replay",
        "group": "Content"
      },
      "triggerMode": {
        "dataType": "select",
        "displayName": "Trigger Mode",
        "defaultValue": "entrance",
        "options": ["entrance", "scroll", "manual"],
        "group": "Content",
        "description": "Entrance: play once on enter, Scroll: play each time scrolled into view, Manual: only via replay button"
      },
      "scrollThreshold": {
        "dataType": "select",
        "displayName": "Scroll Trigger Threshold",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.5", "0.7"],
        "group": "Content"
      },
      "animationPreset": {
        "dataType": "select",
        "displayName": "Animation Preset",
        "defaultValue": "cascade",
        "options": [
          "explosive", "typewriter", "wave", "glitch", "spiral",
          "pendulum", "quantum", "cascade", "magnetic", "origami",
          "ripple", "aurora", "wonderland"
        ],
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800", "1000"],
        "group": "Animation"
      },
      "staggerAmount": {
        "dataType": "select",
        "displayName": "Stagger Amount (s)",
        "defaultValue": "0.6",
        "options": ["0.3", "0.4", "0.5", "0.6", "0.8", "1.0", "1.5"],
        "group": "Animation"
      },
      "intensity": {
        "dataType": "select",
        "displayName": "Effect Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "dramatic"],
        "group": "Animation"
      },
      "replaySpeed": {
        "dataType": "select",
        "displayName": "Replay Speed",
        "defaultValue": "0.5",
        "options": ["0.25", "0.5", "0.75", "1.0"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "buttonTextColor": {
        "dataType": "color",
        "displayName": "Button Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "buttonBorderColor": {
        "dataType": "color",
        "displayName": "Button Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "buttonHoverColor": {
        "dataType": "color",
        "displayName": "Button Hover Color",
        "defaultValue": "#212529",
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
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "-0.02em",
        "options": ["-0.02em", "0em", "0.025em", "0.05em", "0.075em"],
        "group": "Typography"
      },
      "textAlign": {
        "dataType": "select",
        "displayName": "Text Alignment",
        "defaultValue": "center",
        "options": ["left", "center", "right"],
        "group": "Typography"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue", "Georgia"],
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
  const [animatedIndices, setAnimatedIndices] = React.useState(new Set());
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [isReplaying, setIsReplaying] = React.useState(false);
  const containerRef = React.useRef(null);

  const text = config?.text || "Transform Your Vision Into Reality";
  const showReplayButton = config?.showReplayButton !== false;
  const replayButtonText = config?.replayButtonText || "↻ Replay";
  const triggerMode = config?.triggerMode || "entrance";
  const scrollThreshold = parseFloat(config?.scrollThreshold || "0.3");
  const animationPreset = config?.animationPreset || "cascade";
  const animationDuration = parseInt(config?.animationDuration || "600");
  const staggerAmount = parseFloat(config?.staggerAmount || "0.6");
  const intensity = config?.intensity || "medium";
  const replaySpeed = parseFloat(config?.replaySpeed || "0.5");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#212529";
  const buttonTextColor = config?.buttonTextColor || "#495057";
  const buttonBorderColor = config?.buttonBorderColor || "#E9ECEF";
  const buttonHoverColor = config?.buttonHoverColor || "#212529";
  const fontSize = config?.fontSize || 48;
  const fontWeight = config?.fontWeight || "500";
  const letterSpacing = config?.letterSpacing || "-0.02em";
  const textAlign = config?.textAlign || "center";
  const fontFamily = config?.fontFamily || "system-ui";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const intensityMultiplier = {
    subtle: 0.5,
    medium: 1.0,
    dramatic: 1.5
  }[intensity];

  const getRandom = (index, seed, min, max) => {
    const x = Math.sin(index * seed) * 10000;
    const random = x - Math.floor(x);
    return min + random * (max - min);
  };

  const getAnimationConfig = (charIndex, totalChars) => {
    const position = charIndex / (totalChars - 1 || 1);
    const middle = totalChars / 2;

    const presets = {
      explosive: {
        offsetX: getRandom(charIndex, 0.5, -150, 150) * intensityMultiplier,
        offsetY: getRandom(charIndex, 0.7, -150, 150) * intensityMultiplier,
        rotation: getRandom(charIndex, 0.3, -180, 180) * intensityMultiplier,
        scale: 0.3,
        blur: 10 * intensityMultiplier,
        staggerType: 'random'
      },
      typewriter: {
        offsetX: -20 * intensityMultiplier,
        offsetY: 0,
        rotation: 0,
        scale: 1,
        blur: 0,
        staggerType: 'sequential'
      },
      wave: {
        offsetX: 0,
        offsetY: (Math.sin(position * Math.PI * 2) * 40) * intensityMultiplier,
        rotation: (Math.sin(position * Math.PI * 2) * 15) * intensityMultiplier,
        scale: 1,
        blur: 0,
        staggerType: 'sequential'
      },
      glitch: {
        offsetX: getRandom(charIndex, 0.8, -30, 30) * intensityMultiplier,
        offsetY: getRandom(charIndex, 0.9, -30, 30) * intensityMultiplier,
        rotation: getRandom(charIndex, 0.4, -10, 10) * intensityMultiplier,
        scale: getRandom(charIndex, 0.6, 0.7, 1.3),
        blur: getRandom(charIndex, 0.5, 3, 8) * intensityMultiplier,
        staggerType: 'random'
      },
      spiral: {
        offsetX: (Math.cos(position * Math.PI * 4) * 80) * intensityMultiplier,
        offsetY: (Math.sin(position * Math.PI * 4) * 80) * intensityMultiplier,
        rotation: (position * 720) * intensityMultiplier,
        scale: 0.5,
        blur: 0,
        staggerType: 'sequential'
      },
      pendulum: {
        offsetX: (Math.sin(position * Math.PI * 2) * 60) * intensityMultiplier,
        offsetY: (Math.cos(position * Math.PI * 2) * 40) * intensityMultiplier,
        rotation: (Math.sin(position * Math.PI * 2) * 30) * intensityMultiplier,
        scale: 1,
        blur: 0,
        staggerType: 'edges'
      },
      quantum: {
        offsetX: ((charIndex % 2 === 0 ? 1 : -1) * 50) * intensityMultiplier,
        offsetY: ((charIndex % 3 === 0 ? 1 : -1) * 50) * intensityMultiplier,
        rotation: (charIndex % 2 === 0 ? 90 : -90) * intensityMultiplier,
        scale: charIndex % 2 === 0 ? 0.2 : 1.5,
        blur: 5 * intensityMultiplier,
        staggerType: 'alternating'
      },
      cascade: {
        offsetX: 0,
        offsetY: -60 * intensityMultiplier,
        rotation: getRandom(charIndex, 0.3, -8, 8) * intensityMultiplier,
        scale: 1,
        blur: 3 * intensityMultiplier,
        staggerType: 'sequential'
      },
      magnetic: {
        offsetX: ((position - 0.5) * 150) * intensityMultiplier,
        offsetY: ((position - 0.5) * 80) * intensityMultiplier,
        rotation: ((position - 0.5) * 45) * intensityMultiplier,
        scale: 0.2,
        blur: 8 * intensityMultiplier,
        staggerType: 'fromCenter'
      },
      origami: {
        offsetX: 0,
        offsetY: ((charIndex % 2 === 0 ? 1 : -1) * 80) * intensityMultiplier,
        rotation: 90 * intensityMultiplier,
        scale: 0.1,
        blur: 0,
        staggerType: 'alternating',
        use3D: true
      },
      ripple: {
        offsetX: (Math.cos(Math.abs(charIndex - middle) * 0.3) * 50) * intensityMultiplier,
        offsetY: (Math.sin(Math.abs(charIndex - middle) * 0.3) * 50) * intensityMultiplier,
        rotation: 0,
        scale: 1,
        blur: (Math.abs(charIndex - middle) * 0.5) * intensityMultiplier,
        staggerType: 'fromCenter'
      },
      aurora: {
        offsetX: (Math.sin(position * Math.PI * 3) * 40) * intensityMultiplier,
        offsetY: (Math.cos(position * Math.PI * 2) * 30) * intensityMultiplier,
        rotation: 0,
        scale: 1,
        blur: 2 * intensityMultiplier,
        hueRotate: position * 60,
        saturation: 150,
        staggerType: 'sequential'
      },
      wonderland: {
        offsetY: (40 + (Math.sin(charIndex * 0.5) * 40)) * intensityMultiplier,
        offsetX: (Math.sin(charIndex * 0.3) * 25) * intensityMultiplier,
        rotation: 0,
        rotateX: (35 + (Math.sin(charIndex * 0.4) * 35)) * intensityMultiplier,
        rotateY: (-40 + (Math.cos(charIndex * 0.3) * 40)) * intensityMultiplier,
        rotateZ: (-18 + (Math.sin(charIndex * 0.6) * 18)) * intensityMultiplier,
        scale: 1,
        blur: 0,
        staggerType: 'sequential',
        perspective: true,
        use3D: true
      }
    };

    return presets[animationPreset] || presets.cascade;
  };

  const getStaggerOrder = (totalChars, staggerType) => {
    const indices = Array.from({ length: totalChars }, (_, i) => i);
    const middle = Math.floor(totalChars / 2);

    switch (staggerType) {
      case 'sequential':
        return indices;
      case 'reverse':
        return indices.reverse();
      case 'random':
        return indices.sort(() => Math.random() - 0.5);
      case 'fromCenter':
        return indices.sort((a, b) => Math.abs(a - middle) - Math.abs(b - middle));
      case 'edges':
        return indices.sort((a, b) => Math.abs(middle - a) - Math.abs(middle - b)).reverse();
      case 'alternating':
        return [...indices.filter((_, i) => i % 2 === 0), ...indices.filter((_, i) => i % 2 === 1)];
      default:
        return indices;
    }
  };

  const animate = () => {
    setAnimatedIndices(new Set());
    const chars = text.split('');
    const config = getAnimationConfig(0, chars.length);
    const order = getStaggerOrder(chars.length, config.staggerType);
    const delayPerChar = (staggerAmount * 1000) / chars.length;

    order.forEach((index, orderIndex) => {
      setTimeout(() => {
        setAnimatedIndices(prev => {
          const newSet = new Set(prev);
          newSet.add(index);
          return newSet;
        });
      }, orderIndex * delayPerChar);
    });

    setHasAnimated(true);
  };

  const handleReplay = () => {
    setIsReplaying(true);
    setAnimatedIndices(new Set());
    
    setTimeout(() => {
      animate();
      setTimeout(() => setIsReplaying(false), 100);
    }, 50);
  };

  React.useEffect(() => {
    if (triggerMode === 'manual') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerMode === 'entrance' && hasAnimated) return;
            animate();
          }
        });
      },
      { threshold: scrollThreshold }
    );
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [triggerMode, scrollThreshold, hasAnimated, text, animationPreset, staggerAmount, intensity]);

  const characters = text.split('').map((char, index) => {
    const isAnimated = animatedIndices.has(index);
    const animConfig = getAnimationConfig(index, text.length);
    
    const filters = [];
    if (animConfig.blur) {
      filters.push(`blur(${isAnimated || prefersReducedMotion ? 0 : animConfig.blur}px)`);
    }
    if (animConfig.saturation) {
      filters.push(`saturate(${isAnimated || prefersReducedMotion ? 100 : animConfig.saturation}%)`);
    }
    if (animConfig.hueRotate !== undefined) {
      filters.push(`hue-rotate(${isAnimated || prefersReducedMotion ? 0 : animConfig.hueRotate}deg)`);
    }

    let transform = 'none';
    if (!prefersReducedMotion) {
      if (animConfig.use3D) {
        const tx = isAnimated ? 0 : (animConfig.offsetX || 0);
        const ty = isAnimated ? 0 : (animConfig.offsetY || 0);
        const tz = isAnimated ? 0 : (animConfig.offsetZ || 0);
        const rx = isAnimated ? 0 : (animConfig.rotateX || 0);
        const ry = isAnimated ? 0 : (animConfig.rotateY || 0);
        const rz = isAnimated ? 0 : (animConfig.rotateZ || animConfig.rotation || 0);
        const s = isAnimated ? 1 : (animConfig.scale || 1);
        
        transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translate3d(${tx}px, ${ty}px, ${tz}px) scale(${s})`;
      } else {
        const tx = isAnimated ? 0 : (animConfig.offsetX || 0);
        const ty = isAnimated ? 0 : (animConfig.offsetY || 0);
        const r = isAnimated ? 0 : (animConfig.rotation || 0);
        const s = isAnimated ? 1 : (animConfig.scale || 1);
        
        transform = `translate(${tx}px, ${ty}px) rotate(${r}deg) scale(${s})`;
      }
    }

    return {
      char: char === ' ' ? '\u00A0' : char,
      isAnimated,
      transform,
      filter: filters.join(' ')
    };
  });

  return (
    <div
      ref={containerRef}
      className="kinetic-headline-container"
      style={{
        backgroundColor,
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        fontFamily,
        perspective: getAnimationConfig(0, 1).perspective ? '1200px' : 'none',
        position: 'relative'
      }}
    >
      <h1
        style={{
          fontSize: `clamp(${fontSize * 0.5}px, ${fontSize * 0.08}vw + ${fontSize * 0.4}px, ${fontSize}px)`,
          fontWeight,
          letterSpacing,
          textAlign,
          color: textColor,
          margin: '0 0 32px 0',
          lineHeight: '1.2',
          maxWidth: '1200px',
          transformStyle: getAnimationConfig(0, 1).use3D ? 'preserve-3d' : 'flat'
        }}
      >
        {characters.map((charData, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              opacity: prefersReducedMotion ? 1 : (charData.isAnimated ? 1 : 0),
              transform: charData.transform,
              filter: charData.filter,
              transition: prefersReducedMotion ? 'none' : `all ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              willChange: 'transform, opacity, filter',
              transformStyle: getAnimationConfig(0, 1).use3D ? 'preserve-3d' : 'flat'
            }}
          >
            {charData.char}
          </span>
        ))}
      </h1>

      {showReplayButton && (
        <button
          onClick={handleReplay}
          disabled={isReplaying}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: buttonTextColor,
            border: `1px solid ${buttonBorderColor}`,
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: isReplaying ? 'not-allowed' : 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
            fontFamily,
            opacity: isReplaying ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!isReplaying && !prefersReducedMotion) {
              e.currentTarget.style.color = buttonHoverColor;
              e.currentTarget.style.borderColor = buttonHoverColor;
            }
          }}
          onMouseLeave={(e) => {
            if (!isReplaying) {
              e.currentTarget.style.color = buttonTextColor;
              e.currentTarget.style.borderColor = buttonBorderColor;
            }
          }}
        >
          {replayButtonText}
        </button>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
