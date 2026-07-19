import React from "react";

const MANIFEST = {
  "type": "Typography.LiquidMorphingWaves",
  "description": "Text that flows like liquid mercury with continuous multi-axis sine wave animations and never-settling hypnotic motion",
  "editorElement": {
    "selector": ".liquid-morphing-text",
    "displayName": "Liquid Morphing Text Waves",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "FLUID MOTION",
        "group": "Content"
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
      "waveColor": {
        "dataType": "color",
        "displayName": "Wave Highlight Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 100,
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
        "defaultValue": "0.05em",
        "options": ["0em", "0.05em", "0.1em", "0.15em"],
        "group": "Typography"
      },
      "waveAmplitudeX": {
        "dataType": "select",
        "displayName": "Wave Amplitude X (px)",
        "defaultValue": "30",
        "options": ["15", "20", "30", "40", "50"],
        "group": "Animation"
      },
      "waveAmplitudeY": {
        "dataType": "select",
        "displayName": "Wave Amplitude Y (px)",
        "defaultValue": "40",
        "options": ["20", "30", "40", "50", "60"],
        "group": "Animation"
      },
      "waveFrequency1": {
        "dataType": "select",
        "displayName": "Wave Frequency 1",
        "defaultValue": "0.02",
        "options": ["0.01", "0.015", "0.02", "0.025", "0.03"],
        "group": "Animation"
      },
      "waveFrequency2": {
        "dataType": "select",
        "displayName": "Wave Frequency 2",
        "defaultValue": "0.03",
        "options": ["0.02", "0.025", "0.03", "0.035", "0.04"],
        "group": "Animation"
      },
      "waveFrequency3": {
        "dataType": "select",
        "displayName": "Wave Frequency 3",
        "defaultValue": "0.015",
        "options": ["0.01", "0.015", "0.02", "0.025", "0.03"],
        "group": "Animation"
      },
      "waveSpeed": {
        "dataType": "select",
        "displayName": "Wave Speed",
        "defaultValue": "1.0",
        "options": ["0.5", "0.75", "1.0", "1.25", "1.5"],
        "group": "Animation"
      },
      "rotationAmount": {
        "dataType": "select",
        "displayName": "Rotation Amount (deg)",
        "defaultValue": "15",
        "options": ["5", "10", "15", "20", "25"],
        "group": "Animation"
      },
      "maxBlur": {
        "dataType": "select",
        "displayName": "Max Blur (px)",
        "defaultValue": "4",
        "options": ["2", "3", "4", "5", "6"],
        "group": "Animation"
      },
      "parallaxSpeed": {
        "dataType": "select",
        "displayName": "Background Parallax Speed",
        "defaultValue": "0.2",
        "options": ["0.1", "0.15", "0.2", "0.25", "0.3"],
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
  const [time, setTime] = React.useState(0);
  const [parallaxOffset, setParallaxOffset] = React.useState(0);
  
  const animationFrameRef = React.useRef(null);
  const startTimeRef = React.useRef(Date.now());

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const text = config?.text || "FLUID MOTION";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#212529";
  const waveColor = config?.waveColor || "#495057";
  const fontSize = parseInt(config?.fontSize) || 100;
  const fontWeight = config?.fontWeight || "300";
  const letterSpacing = config?.letterSpacing || "0.05em";
  const waveAmplitudeX = parseFloat(config?.waveAmplitudeX) || 30;
  const waveAmplitudeY = parseFloat(config?.waveAmplitudeY) || 40;
  const waveFrequency1 = parseFloat(config?.waveFrequency1) || 0.02;
  const waveFrequency2 = parseFloat(config?.waveFrequency2) || 0.03;
  const waveFrequency3 = parseFloat(config?.waveFrequency3) || 0.015;
  const waveSpeed = parseFloat(config?.waveSpeed) || 1.0;
  const rotationAmount = parseFloat(config?.rotationAmount) || 15;
  const maxBlur = parseFloat(config?.maxBlur) || 4;
  const parallaxSpeed = parseFloat(config?.parallaxSpeed) || 0.2;

  // Continuous animation loop
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) * waveSpeed * 0.001;
      setTime(elapsed);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [waveSpeed, prefersReducedMotion]);

  // Scroll parallax
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setParallaxOffset(window.scrollY * parallaxSpeed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxSpeed, prefersReducedMotion]);

  // Calculate wave transformation for each character
  const getCharacterTransform = (index, totalChars) => {
    if (prefersReducedMotion) {
      return {
        x: 0,
        y: 0,
        rotation: 0,
        blur: 0
      };
    }

    const position = index / totalChars;
    
    // Layer 1: Primary wave (X-axis)
    const wave1X = Math.sin(time * Math.PI * 2 * waveFrequency1 + position * Math.PI * 4) * waveAmplitudeX;
    
    // Layer 2: Secondary wave (Y-axis)
    const wave2Y = Math.sin(time * Math.PI * 2 * waveFrequency2 + position * Math.PI * 3) * waveAmplitudeY;
    
    // Layer 3: Tertiary wave (Rotation)
    const wave3Rotation = Math.sin(time * Math.PI * 2 * waveFrequency3 + position * Math.PI * 5) * rotationAmount;
    
    // Combined X motion (two waves)
    const x = wave1X + Math.cos(time * Math.PI * 2 * waveFrequency2 + position * Math.PI * 6) * waveAmplitudeX * 0.5;
    
    // Combined Y motion (two waves)
    const y = wave2Y + Math.sin(time * Math.PI * 2 * waveFrequency1 + position * Math.PI * 7) * waveAmplitudeY * 0.3;
    
    // Rotation from wave
    const rotation = wave3Rotation;
    
    // Calculate blur based on wave amplitude (higher displacement = more blur)
    const displacement = Math.sqrt(x * x + y * y);
    const maxDisplacement = Math.sqrt(waveAmplitudeX * waveAmplitudeX + waveAmplitudeY * waveAmplitudeY);
    const blur = (displacement / maxDisplacement) * maxBlur;

    return { x, y, rotation, blur };
  };

  const characters = text.split('');

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem'
  };

  const backgroundImageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: prefersReducedMotion ? 'none' : `translateY(${parallaxOffset}px)`,
    willChange: prefersReducedMotion ? 'auto' : 'transform',
    zIndex: 0,
    opacity: 0.08,
    backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80&fm=jpg&crop=entropy&cs=monochrome)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'grayscale(100%) contrast(1.1) blur(2px)'
  };

  const textContainerStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0',
    perspective: '1000px',
    transformStyle: 'preserve-3d'
  };

  const characterStyle = (index) => {
    const transform = getCharacterTransform(index, characters.length);
    const char = characters[index];
    const isSpace = char === ' ';

    return {
      fontSize: `clamp(${fontSize * 0.4}px, 10vw, ${fontSize}px)`,
      fontWeight,
      letterSpacing,
      color: textColor,
      display: 'inline-block',
      transform: prefersReducedMotion ? 'none' : `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotation}deg)`,
      filter: prefersReducedMotion ? 'none' : `blur(${transform.blur}px)`,
      willChange: prefersReducedMotion ? 'auto' : 'transform, filter',
      transformStyle: 'preserve-3d',
      lineHeight: 1.2,
      padding: isSpace ? '0 0.2em' : '0',
      userSelect: 'none',
      textShadow: `0 0 ${fontSize * 0.1}px ${waveColor}20`
    };
  };

  const infoStyle = {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '14px',
    color: textColor,
    opacity: 0.4,
    zIndex: 20,
    textAlign: 'center',
    pointerEvents: 'none',
    fontWeight: '300'
  };

  return (
    <div style={containerStyle} className="liquid-morphing-text">
      {/* Background Image with Parallax */}
      <div style={backgroundImageStyle} />

      {/* Flowing Text */}
      <div style={textContainerStyle}>
        {characters.map((char, index) => (
          <span
            key={index}
            style={characterStyle(index)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Info */}
      <div style={infoStyle}>
        Continuous liquid motion • Never settles
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
