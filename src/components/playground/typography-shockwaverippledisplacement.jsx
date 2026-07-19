import React from "react";

const MANIFEST = {
  "type": "Typography.ShockwaveRippleDisplacement",
  "description": "Interactive text where each character click sends shockwave ripples that displace other characters with wave interference physics and elastic spring-back",
  "editorElement": {
    "selector": ".shockwave-ripple-text",
    "displayName": "Shockwave Ripple Displacement",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "RIPPLE EFFECT",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
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
        "displayName": "Wave Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 90,
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
        "defaultValue": "0.1em",
        "options": ["0.05em", "0.1em", "0.15em", "0.2em"],
        "group": "Typography"
      },
      "waveAmplitude": {
        "dataType": "select",
        "displayName": "Wave Amplitude (px)",
        "defaultValue": "80",
        "options": ["40", "60", "80", "100", "120"],
        "group": "Animation"
      },
      "waveSpeed": {
        "dataType": "select",
        "displayName": "Wave Speed",
        "defaultValue": "300",
        "options": ["200", "250", "300", "350", "400"],
        "group": "Animation"
      },
      "waveDamping": {
        "dataType": "select",
        "displayName": "Wave Damping",
        "defaultValue": "0.015",
        "options": ["0.01", "0.015", "0.02", "0.025", "0.03"],
        "group": "Animation"
      },
      "springStiffness": {
        "dataType": "select",
        "displayName": "Spring Stiffness",
        "defaultValue": "0.08",
        "options": ["0.05", "0.08", "0.1", "0.12", "0.15"],
        "group": "Animation"
      },
      "springDamping": {
        "dataType": "select",
        "displayName": "Spring Damping",
        "defaultValue": "0.85",
        "options": ["0.75", "0.8", "0.85", "0.9", "0.92"],
        "group": "Animation"
      },
      "autoTrigger": {
        "dataType": "booleanValue",
        "displayName": "Auto-trigger Waves",
        "defaultValue": true,
        "group": "Animation"
      },
      "autoTriggerInterval": {
        "dataType": "select",
        "displayName": "Auto-trigger Interval (ms)",
        "defaultValue": "2000",
        "options": ["1500", "2000", "2500", "3000", "4000"],
        "group": "Animation"
      },
      "showWaveCircles": {
        "dataType": "booleanValue",
        "displayName": "Show Wave Circles",
        "defaultValue": true,
        "group": "Content"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [characterStates, setCharacterStates] = React.useState({});
  const [waves, setWaves] = React.useState([]);
  const [originalPositions, setOriginalPositions] = React.useState({});
  
  const animationFrameRef = React.useRef(null);
  const velocitiesRef = React.useRef({});
  const characterRefs = React.useRef({});
  const autoTriggerTimeoutRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const text = config?.text || "RIPPLE EFFECT";
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const waveColor = config?.waveColor || "#495057";
  const fontSize = parseInt(config?.fontSize) || 90;
  const fontWeight = config?.fontWeight || "300";
  const letterSpacing = config?.letterSpacing || "0.1em";
  const waveAmplitude = parseFloat(config?.waveAmplitude) || 80;
  const waveSpeed = parseFloat(config?.waveSpeed) || 300;
  const waveDamping = parseFloat(config?.waveDamping) || 0.015;
  const springStiffness = parseFloat(config?.springStiffness) || 0.08;
  const springDamping = parseFloat(config?.springDamping) || 0.85;
  const autoTrigger = config?.autoTrigger !== false;
  const autoTriggerInterval = parseInt(config?.autoTriggerInterval) || 2000;
  const showWaveCircles = config?.showWaveCircles !== false;

  const characters = text.split('');

  // Initialize character states and positions
  React.useEffect(() => {
    const initialStates = {};
    const initialVelocities = {};
    
    characters.forEach((char, index) => {
      initialStates[index] = { x: 0, y: 0, scale: 1 };
      initialVelocities[index] = { x: 0, y: 0 };
    });
    
    setCharacterStates(initialStates);
    velocitiesRef.current = initialVelocities;
  }, [text]);

  // Store original positions after render
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const positions = {};
      Object.keys(characterRefs.current).forEach(key => {
        const el = characterRefs.current[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          positions[key] = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
        }
      });
      setOriginalPositions(positions);
    }, 100);

    return () => clearTimeout(timeout);
  }, [text, fontSize]);

  // Create shockwave
  const createShockwave = (x, y) => {
    const newWave = {
      id: Date.now() + Math.random(),
      x,
      y,
      radius: 0,
      startTime: Date.now()
    };
    setWaves(prev => [...prev, newWave]);

    // Remove wave after animation
    setTimeout(() => {
      setWaves(prev => prev.filter(w => w.id !== newWave.id));
    }, 2000);
  };

  // Handle character click
  const handleCharacterClick = (index) => {
    if (prefersReducedMotion) return;
    
    const pos = originalPositions[index];
    if (pos) {
      createShockwave(pos.x, pos.y);
    }
  };

  // Auto-trigger waves
  React.useEffect(() => {
    if (!autoTrigger || prefersReducedMotion || Object.keys(originalPositions).length === 0) return;

    const triggerRandomWave = () => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const pos = originalPositions[randomIndex];
      if (pos) {
        createShockwave(pos.x, pos.y);
      }

      autoTriggerTimeoutRef.current = setTimeout(triggerRandomWave, autoTriggerInterval);
    };

    autoTriggerTimeoutRef.current = setTimeout(triggerRandomWave, 1000);

    return () => {
      if (autoTriggerTimeoutRef.current) {
        clearTimeout(autoTriggerTimeoutRef.current);
      }
    };
  }, [autoTrigger, autoTriggerInterval, originalPositions, characters.length, prefersReducedMotion]);

  // Physics simulation
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const animate = () => {
      // Update wave radii
      setWaves(prevWaves => 
        prevWaves.map(wave => ({
          ...wave,
          radius: (Date.now() - wave.startTime) * waveSpeed * 0.001
        }))
      );

      // Update character positions based on waves
      setCharacterStates(prevStates => {
        const newStates = { ...prevStates };

        Object.keys(newStates).forEach(key => {
          const index = parseInt(key);
          const originalPos = originalPositions[index];
          if (!originalPos) return;

          const currentState = newStates[index];
          const velocity = velocitiesRef.current[index] || { x: 0, y: 0 };

          // Calculate wave forces
          let totalForceX = 0;
          let totalForceY = 0;

          waves.forEach(wave => {
            const dx = originalPos.x - wave.x;
            const dy = originalPos.y - wave.y;
            const distanceToEpicenter = Math.sqrt(dx * dx + dy * dy);
            const distanceToWavefront = Math.abs(distanceToWavefront - wave.radius);

            // Wave hits when wavefront passes character position
            if (Math.abs(distanceToEpicenter - wave.radius) < 50) {
              const waveStrength = Math.exp(-distanceToWavefront * waveDamping);
              const angle = Math.atan2(dy, dx);
              
              const force = waveStrength * waveAmplitude;
              totalForceX += Math.cos(angle) * force;
              totalForceY += Math.sin(angle) * force;
            }
          });

          // Spring force back to origin
          const springX = -currentState.x * springStiffness;
          const springY = -currentState.y * springStiffness;

          // Update velocity
          velocity.x = (velocity.x + totalForceX * 0.01 + springX) * springDamping;
          velocity.y = (velocity.y + totalForceY * 0.01 + springY) * springDamping;

          // Update position
          newStates[index] = {
            x: currentState.x + velocity.x,
            y: currentState.y + velocity.y,
            scale: 1
          };

          velocitiesRef.current[index] = velocity;
        });

        return newStates;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [waves, originalPositions, waveAmplitude, waveSpeed, waveDamping, springStiffness, springDamping, prefersReducedMotion]);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem',
    cursor: 'pointer'
  };

  const textContainerStyle = {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0',
    zIndex: 10
  };

  const characterStyle = (index) => {
    const state = characterStates[index] || { x: 0, y: 0, scale: 1 };
    const char = characters[index];
    const isSpace = char === ' ';

    if (prefersReducedMotion) {
      return {
        fontSize: `clamp(${fontSize * 0.4}px, 9vw, ${fontSize}px)`,
        fontWeight,
        letterSpacing,
        color: textColor,
        display: 'inline-block',
        padding: isSpace ? '0 0.3em' : '0',
        cursor: 'pointer'
      };
    }

    const displacement = Math.sqrt(state.x * state.x + state.y * state.y);
    const maxDisplacement = waveAmplitude;
    const intensity = Math.min(displacement / maxDisplacement, 1);

    return {
      fontSize: `clamp(${fontSize * 0.4}px, 9vw, ${fontSize}px)`,
      fontWeight,
      letterSpacing,
      color: textColor,
      display: 'inline-block',
      transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
      padding: isSpace ? '0 0.3em' : '0',
      userSelect: 'none',
      cursor: 'pointer',
      transition: 'color 100ms ease',
      willChange: 'transform',
      filter: `blur(${intensity * 2}px)`,
      textShadow: `0 0 ${intensity * 20}px ${waveColor}${Math.floor(intensity * 100).toString(16).padStart(2, '0')}`
    };
  };

  const waveCircleStyle = (wave) => {
    const opacity = Math.max(0, 1 - wave.radius / (waveAmplitude * 5));
    
    return {
      position: 'fixed',
      left: wave.x,
      top: wave.y,
      width: wave.radius * 2,
      height: wave.radius * 2,
      border: `1px solid ${waveColor}`,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      opacity,
      pointerEvents: 'none',
      zIndex: 5
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
    <div style={containerStyle} className="shockwave-ripple-text">
      {/* Wave Circles */}
      {showWaveCircles && waves.map(wave => (
        <div key={wave.id} style={waveCircleStyle(wave)} />
      ))}

      {/* Text */}
      <div style={textContainerStyle}>
        {characters.map((char, index) => (
          <span
            key={index}
            ref={el => characterRefs.current[index] = el}
            style={characterStyle(index)}
            onClick={() => handleCharacterClick(index)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Info */}
      <div style={infoStyle}>
        Click characters to create shockwaves • Wave interference in action
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
