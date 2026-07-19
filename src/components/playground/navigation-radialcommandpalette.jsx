import React from "react";

const MANIFEST = {
  "type": "Navigation.RadialCommandPalette",
  "description": "An advanced command palette with radial menu layout, character-level text animations, magnetic hover effects, and scroll-triggered entrance animations",
  "editorElement": {
    "selector": ".radial-command-palette",
    "displayName": "Radial Command Palette",
    "archetype": "container",
    "data": {
      // ========== GROUP 1: CONTENT ==========
      "commands": {
        "dataType": "text",
        "displayName": "Commands (comma-separated)",
        "defaultValue": "Search,Create,Edit,Delete,Share,Settings,Help,Profile",
        "group": "Content",
        "description": "List of command items"
      },
      "centerText": {
        "dataType": "text",
        "displayName": "Center Text",
        "defaultValue": "Command",
        "group": "Content"
      },
      "showPalette": {
        "dataType": "booleanValue",
        "displayName": "Show Palette",
        "defaultValue": true,
        "group": "Content"
      },
      
      // ========== GROUP 2: COLORS ==========
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "itemBackgroundColor": {
        "dataType": "color",
        "displayName": "Item Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "hoverColor": {
        "dataType": "color",
        "displayName": "Hover Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "rippleColor": {
        "dataType": "color",
        "displayName": "Ripple Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      
      // ========== GROUP 3: TYPOGRAPHY ==========
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 14,
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
        "defaultValue": "0.025em",
        "options": ["0em", "0.025em", "0.05em", "0.075em", "0.1em"],
        "group": "Typography"
      },
      
      // ========== GROUP 4: LAYOUT ==========
      "radius": {
        "dataType": "select",
        "displayName": "Circle Radius (px)",
        "defaultValue": "180",
        "options": ["120", "150", "180", "220", "260"],
        "group": "Layout"
      },
      "dockPosition": {
        "dataType": "select",
        "displayName": "Dock Position",
        "defaultValue": "bottom-right",
        "options": ["bottom-right", "bottom-left", "top-right", "top-left", "bottom", "left", "right", "top", "center"],
        "group": "Layout"
      },
      "itemSize": {
        "dataType": "select",
        "displayName": "Item Size",
        "defaultValue": "medium",
        "options": ["small", "medium", "large"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "8",
        "options": ["0", "4", "6", "8", "12", "16"],
        "group": "Layout"
      },
      
      // ========== GROUP 5: ANIMATION ==========
      "textAnimationPreset": {
        "dataType": "select",
        "displayName": "Text Animation Preset",
        "defaultValue": "explosive",
        "options": ["explosive", "typewriter", "wave", "glitch", "spiral", "pendulum", "quantum", "cascade", "magnetic", "origami", "ripple", "aurora", "wonderland"],
        "group": "Animation"
      },
      "intensity": {
        "dataType": "select",
        "displayName": "Animation Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "dramatic"],
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "600",
        "options": ["300", "400", "500", "600", "800"],
        "group": "Animation"
      },
      "staggerAmount": {
        "dataType": "select",
        "displayName": "Stagger Amount (s)",
        "defaultValue": "0.6",
        "options": ["0.3", "0.4", "0.5", "0.6", "0.8", "1.0"],
        "group": "Animation"
      },
      "entranceAnimation": {
        "dataType": "select",
        "displayName": "Entrance Animation",
        "defaultValue": "staggered",
        "options": ["none", "fade", "staggered", "spiral"],
        "group": "Animation"
      },
      "magneticStrength": {
        "dataType": "select",
        "displayName": "Magnetic Hover Strength",
        "defaultValue": "0.3",
        "options": ["0", "0.2", "0.3", "0.4", "0.5"],
        "group": "Animation"
      },
      "autoRotate": {
        "dataType": "booleanValue",
        "displayName": "Auto Rotate",
        "defaultValue": false,
        "group": "Animation"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed (s)",
        "defaultValue": "20",
        "options": ["10", "15", "20", "30", "40"],
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
  // ========== SAFE CONFIG ACCESS ==========
  const commands = (config?.commands || 'Search,Create,Edit,Delete,Share,Settings,Help,Profile').split(',').map(c => c.trim());
  const centerText = config?.centerText || 'Command';
  const showPalette = config?.showPalette !== false;
  
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const itemBackgroundColor = config?.itemBackgroundColor || '#F8F9FA';
  const textColor = config?.textColor || '#18181B';
  const accentColor = config?.accentColor || '#495057';
  const hoverColor = config?.hoverColor || '#343A40';
  const rippleColor = config?.rippleColor || '#495057';
  
  const fontSize = parseInt(config?.fontSize || '14');
  const fontWeight = config?.fontWeight || '400';
  const letterSpacing = config?.letterSpacing || '0.025em';
  
  const radius = parseInt(config?.radius || '180');
  const dockPosition = config?.dockPosition || 'bottom-right';
  const itemSize = config?.itemSize || 'medium';
  const borderRadius = config?.borderRadius || '8';
  
  const textAnimationPreset = config?.textAnimationPreset || 'explosive';
  const intensity = config?.intensity || 'medium';
  const animationDuration = parseInt(config?.animationDuration || '600');
  const staggerAmount = parseFloat(config?.staggerAmount || '0.6');
  const entranceAnimation = config?.entranceAnimation || 'staggered';
  const magneticStrength = parseFloat(config?.magneticStrength || '0.3');
  const autoRotate = config?.autoRotate === true;
  const rotationSpeed = parseInt(config?.rotationSpeed || '20');
  
  // ========== STATE MANAGEMENT ==========
  const [isVisible, setIsVisible] = React.useState(false);
  const [visibleIndices, setVisibleIndices] = React.useState(new Set());
  const [animatedTextIndices, setAnimatedTextIndices] = React.useState(new Set());
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [magneticOffsets, setMagneticOffsets] = React.useState({});
  const [ripples, setRipples] = React.useState([]);
  const [containerRotation, setContainerRotation] = React.useState(0);
  
  const containerRef = React.useRef(null);
  const itemRefs = React.useRef([]);
  const animationFrameRef = React.useRef(null);
  
  // ========== ACCESSIBILITY ==========
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  // ========== ITEM SIZE DIMENSIONS ==========
  const itemDimensions = {
    small: { width: 80, height: 80, iconSize: 20 },
    medium: { width: 100, height: 100, iconSize: 24 },
    large: { width: 120, height: 120, iconSize: 28 }
  };
  const dims = itemDimensions[itemSize] || itemDimensions.medium;
  
  // ========== SCROLL-TRIGGERED ENTRANCE ==========
  React.useEffect(() => {
    if (!showPalette || entranceAnimation === 'none' || prefersReducedMotion) {
      setIsVisible(true);
      const allIndices = new Set(commands.map((_, i) => i));
      setVisibleIndices(allIndices);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            
            if (entranceAnimation === 'staggered') {
              const staggerDelay = 80;
              commands.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleIndices(prev => new Set([...prev, index]));
                }, index * staggerDelay);
              });
            } else if (entranceAnimation === 'spiral') {
              const spiralOrder = commands.map((_, i) => i).sort((a, b) => {
                const angleA = (360 / commands.length) * a;
                const angleB = (360 / commands.length) * b;
                return angleA - angleB;
              });
              spiralOrder.forEach((index, order) => {
                setTimeout(() => {
                  setVisibleIndices(prev => new Set([...prev, index]));
                }, order * 60);
              });
            } else {
              setVisibleIndices(new Set(commands.map((_, i) => i)));
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [showPalette, commands.length, entranceAnimation, isVisible, prefersReducedMotion]);
  
  // ========== CHARACTER-LEVEL TEXT ANIMATION ==========
  const getPresetConfig = (preset, charIndex, totalChars, intensity) => {
    const intensityMultiplier = {
      subtle: 0.5,
      medium: 1.0,
      dramatic: 1.5
    }[intensity];
    
    const position = charIndex / totalChars;
    
    const getRandom = (index, seed, min, max) => {
      const x = Math.sin(index * seed) * 10000;
      const random = x - Math.floor(x);
      return min + random * (max - min);
    };
    
    const presets = {
      explosive: {
        offsetX: getRandom(charIndex, 1.23, -80, 80) * intensityMultiplier,
        offsetY: getRandom(charIndex, 4.56, -80, 80) * intensityMultiplier,
        rotation: getRandom(charIndex, 7.89, -180, 180),
        scale: 0.3,
        blur: 6
      },
      typewriter: {
        offsetX: -15 * intensityMultiplier,
        offsetY: 0,
        rotation: 0,
        scale: 1,
        blur: 0
      },
      wave: {
        offsetY: Math.sin(position * Math.PI * 2) * 30 * intensityMultiplier,
        offsetX: 0,
        rotation: Math.sin(position * Math.PI * 2) * 10,
        scale: 1,
        blur: 0
      },
      glitch: {
        offsetX: getRandom(charIndex, 2.1, -20, 20) * intensityMultiplier,
        offsetY: getRandom(charIndex, 3.4, -20, 20) * intensityMultiplier,
        rotation: getRandom(charIndex, 5.6, -15, 15),
        scale: getRandom(charIndex, 7.8, 0.6, 1.4),
        blur: getRandom(charIndex, 9.1, 0, 3)
      },
      spiral: {
        offsetX: Math.cos(position * Math.PI * 4) * 50 * intensityMultiplier,
        offsetY: Math.sin(position * Math.PI * 4) * 50 * intensityMultiplier,
        rotation: position * 720,
        scale: 0.5,
        blur: 3
      },
      pendulum: {
        offsetX: Math.sin(position * Math.PI) * 40 * intensityMultiplier,
        offsetY: -Math.abs(Math.cos(position * Math.PI)) * 30 * intensityMultiplier,
        rotation: Math.sin(position * Math.PI) * 25,
        scale: 1,
        blur: 0
      },
      quantum: {
        offsetY: (charIndex % 2 === 0 ? 30 : -30) * intensityMultiplier,
        offsetX: (charIndex % 3 === 0 ? 20 : -20) * intensityMultiplier,
        rotation: (charIndex % 2 === 0 ? 45 : -45),
        scale: charIndex % 3 === 0 ? 0.5 : 0.8,
        blur: charIndex % 2 === 0 ? 4 : 0
      },
      cascade: {
        offsetY: -60 * intensityMultiplier,
        offsetX: getRandom(charIndex, 1.1, -8, 8),
        rotation: getRandom(charIndex, 2.2, -8, 8),
        scale: 1,
        blur: 2
      },
      magnetic: {
        offsetX: (position - 0.5) * 80 * intensityMultiplier,
        offsetY: (position - 0.5) * 40 * intensityMultiplier,
        rotation: (position - 0.5) * 60,
        scale: 0.3,
        blur: 6
      },
      origami: {
        offsetY: (charIndex % 2 === 0 ? -40 : 40) * intensityMultiplier,
        offsetX: 0,
        rotation: 90,
        scale: 0.2,
        blur: 0,
        use3D: true
      },
      ripple: {
        offsetX: Math.cos(Math.abs(position - 0.5) * Math.PI * 2) * 40 * intensityMultiplier,
        offsetY: Math.sin(Math.abs(position - 0.5) * Math.PI * 2) * 40 * intensityMultiplier,
        rotation: 0,
        scale: 0.5,
        blur: Math.abs(position - 0.5) * 8
      },
      aurora: {
        offsetY: Math.sin(position * Math.PI * 3) * 25 * intensityMultiplier,
        offsetX: Math.cos(position * Math.PI * 2) * 15 * intensityMultiplier,
        rotation: position * 120,
        scale: 1,
        blur: 0
      },
      wonderland: {
        offsetY: 30 + (Math.sin(charIndex * 0.5) * 30) * intensityMultiplier,
        offsetX: (Math.sin(charIndex * 0.3) * 20) * intensityMultiplier,
        rotation: 0,
        rotateX: 30,
        rotateY: -35,
        rotateZ: -15,
        scale: 1,
        blur: 0,
        use3D: true
      }
    };
    
    return presets[preset] || presets.explosive;
  };
  
  const getStaggerOrder = (totalChars) => {
    const indices = Array.from({ length: totalChars }, (_, i) => i);
    
    // Match preset to stagger type
    if (['typewriter', 'wave', 'cascade', 'aurora'].includes(textAnimationPreset)) {
      return indices; // Sequential
    } else if (['explosive', 'glitch', 'quantum'].includes(textAnimationPreset)) {
      return indices.sort(() => Math.random() - 0.5); // Random
    } else if (['magnetic', 'ripple'].includes(textAnimationPreset)) {
      // From center
      const mid = Math.floor(totalChars / 2);
      const ordered = [];
      for (let i = 0; i < mid; i++) {
        ordered.push(mid - i - 1);
        if (mid + i < totalChars) ordered.push(mid + i);
      }
      return ordered;
    }
    return indices;
  };
  
  const animateText = (itemIndex) => {
    const text = commands[itemIndex];
    const characters = text.split('');
    const orderedIndices = getStaggerOrder(characters.length);
    const totalDuration = staggerAmount * 1000;
    const delayPerChar = totalDuration / characters.length;
    
    // Reset first
    setAnimatedTextIndices(new Set());
    
    orderedIndices.forEach((charIndex, orderIndex) => {
      setTimeout(() => {
        setAnimatedTextIndices(prev => {
          const newSet = new Set(prev);
          newSet.add(`${itemIndex}-${charIndex}`);
          return newSet;
        });
      }, orderIndex * delayPerChar);
    });
  };
  
  // ========== POLAR COORDINATE POSITIONING ==========
  const getItemPosition = (index) => {
    const angle = (360 / commands.length) * index;
    const radians = (angle - 90) * (Math.PI / 180);
    
    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `
        rotate(${angle}deg)
        translateX(${radius}px)
        rotate(-${angle}deg)
        ${autoRotate && !prefersReducedMotion ? `rotate(-${containerRotation}deg)` : ''}
        ${magneticOffsets[index] ? `translate(${magneticOffsets[index].x}px, ${magneticOffsets[index].y}px)` : ''}
      `,
      transformOrigin: '0px 0px'
    };
  };
  
  // ========== DOCK POSITIONING ==========
  const getDockStyles = () => {
    const offset = radius;
    
    const positions = {
      'left': { left: `-${offset}px`, top: '50%', transform: 'translateY(-50%)', clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' },
      'right': { right: `-${offset}px`, top: '50%', transform: 'translateY(-50%)', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' },
      'top': { top: `-${offset}px`, left: '50%', transform: 'translateX(-50%)', clipPath: 'polygon(0 50%, 0 100%, 100% 100%, 100% 50%)' },
      'bottom': { bottom: `-${offset}px`, left: '50%', transform: 'translateX(-50%)', clipPath: 'polygon(0 0, 0 50%, 100% 50%, 100% 0)' },
      'top-left': { top: `-${offset}px`, left: `-${offset}px`, clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' },
      'top-right': { top: `-${offset}px`, right: `-${offset}px`, clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)' },
      'bottom-left': { bottom: `-${offset}px`, left: `-${offset}px`, clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)' },
      'bottom-right': { bottom: `-${offset}px`, right: `-${offset}px`, clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)' },
      'center': { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
    };
    
    return positions[dockPosition] || positions['bottom-right'];
  };
  
  // ========== MAGNETIC HOVER EFFECT ==========
  const handleItemMouseMove = (e, index) => {
    if (!itemRefs.current[index] || prefersReducedMotion || magneticStrength === 0) return;
    
    const rect = itemRefs.current[index].getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    
    const magneticRadius = 120;
    
    if (distance < magneticRadius) {
      const strength = 1 - (distance / magneticRadius);
      const moveX = deltaX * magneticStrength * strength;
      const moveY = deltaY * magneticStrength * strength;
      
      setMagneticOffsets(prev => ({
        ...prev,
        [index]: { x: moveX, y: moveY }
      }));
    }
  };
  
  const handleItemMouseLeave = (index) => {
    setMagneticOffsets(prev => ({
      ...prev,
      [index]: { x: 0, y: 0 }
    }));
    setHoveredIndex(null);
  };
  
  // ========== RIPPLE CLICK EFFECT ==========
  const handleItemClick = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipples = [];
    for (let i = 0; i < 3; i++) {
      newRipples.push({
        id: Date.now() + i + Math.random(),
        x,
        y,
        delay: i * 100,
        itemIndex: index
      });
    }
    
    setRipples(prev => [...prev, ...newRipples]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => !newRipples.find(nr => nr.id === r.id)));
    }, 1300);
    
    // Trigger text animation
    animateText(index);
  };
  
  // ========== AUTO ROTATION ==========
  React.useEffect(() => {
    if (!autoRotate || prefersReducedMotion) return;
    
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rotation = (elapsed / (rotationSpeed * 1000)) * 360;
      setContainerRotation(rotation % 360);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoRotate, rotationSpeed, prefersReducedMotion]);
  
  // ========== RENDER ==========
  if (!showPalette) return null;
  
  return (
    <div
      ref={containerRef}
      className="radial-command-palette"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Circular Container */}
      <div
        style={{
          position: dockPosition === 'center' ? 'relative' : 'fixed',
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          ...getDockStyles(),
          pointerEvents: 'none',
          zIndex: 1000
        }}
      >
        {/* Center Button */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${dims.width}px`,
            height: `${dims.height}px`,
            backgroundColor: accentColor,
            borderRadius: `${borderRadius}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: `${fontSize + 2}px`,
            fontWeight: fontWeight,
            letterSpacing: letterSpacing,
            cursor: 'pointer',
            pointerEvents: 'auto',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
            opacity: prefersReducedMotion ? 1 : (isVisible ? 1 : 0),
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          }}
        >
          {centerText}
        </div>
        
        {/* Command Items */}
        {commands.map((command, index) => {
          const isItemVisible = visibleIndices.has(index);
          const characters = command.split('').map((char, charIndex) => ({
            char: char === ' ' ? '\u00A0' : char,
            index: charIndex
          }));
          
          return (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              style={{
                ...getItemPosition(index),
                width: `${dims.width}px`,
                height: `${dims.height}px`,
                backgroundColor: hoveredIndex === index ? hoverColor : itemBackgroundColor,
                borderRadius: `${borderRadius}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                pointerEvents: 'auto',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                opacity: prefersReducedMotion ? 1 : (isItemVisible ? 1 : 0),
                transition: prefersReducedMotion 
                  ? 'none'
                  : `opacity 400ms ease-out ${index * 80}ms, background-color 200ms ease-out, transform 200ms ease-out, box-shadow 200ms ease-out`,
                color: textColor,
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight,
                letterSpacing: letterSpacing,
                overflow: 'hidden',
                willChange: magneticStrength > 0 ? 'transform' : 'auto'
              }}
              onMouseMove={(e) => handleItemMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => handleItemMouseLeave(index)}
              onClick={(e) => handleItemClick(e, index)}
            >
              {/* Character-level animated text */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {characters.map((charData, charIndex) => {
                  const isAnimated = animatedTextIndices.has(`${index}-${charIndex}`);
                  const presetConfig = getPresetConfig(
                    textAnimationPreset,
                    charIndex,
                    characters.length,
                    intensity
                  );
                  const orderedIndices = getStaggerOrder(characters.length);
                  const delay = orderedIndices.indexOf(charIndex) * (staggerAmount * 1000 / characters.length);
                  
                  return (
                    <span
                      key={charIndex}
                      style={{
                        display: 'inline-block',
                        opacity: prefersReducedMotion ? 1 : (isAnimated ? 1 : 0),
                        transform: prefersReducedMotion
                          ? 'none'
                          : isAnimated
                            ? 'translate(0, 0) rotate(0) scale(1)'
                            : `translate(${presetConfig.offsetX || 0}px, ${presetConfig.offsetY || 0}px) 
                               rotate(${presetConfig.rotation || 0}deg) 
                               scale(${presetConfig.scale || 1})
                               ${presetConfig.use3D ? `rotateX(${presetConfig.rotateX || 0}deg) rotateY(${presetConfig.rotateY || 0}deg) rotateZ(${presetConfig.rotateZ || 0}deg)` : ''}`,
                        filter: prefersReducedMotion ? 'none' : (isAnimated ? 'blur(0)' : `blur(${presetConfig.blur || 0}px)`),
                        transition: prefersReducedMotion
                          ? 'none'
                          : `all ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
                        willChange: 'transform, opacity, filter',
                        transformStyle: presetConfig.use3D ? 'preserve-3d' : 'flat',
                        perspective: presetConfig.use3D ? '1200px' : 'none'
                      }}
                    >
                      {charData.char}
                    </span>
                  );
                })}
              </div>
              
              {/* Ripples */}
              {ripples
                .filter(r => r.itemIndex === index)
                .map(ripple => (
                  <span
                    key={ripple.id}
                    style={{
                      position: 'absolute',
                      left: ripple.x + 'px',
                      top: ripple.y + 'px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: rippleColor,
                      transform: 'translate(-50%, -50%) scale(0)',
                      opacity: 0,
                      pointerEvents: 'none',
                      animation: prefersReducedMotion
                        ? 'none'
                        : `ripple 800ms ease-out ${ripple.delay}ms forwards`
                    }}
                  />
                ))}
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(15);
            opacity: 0;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
