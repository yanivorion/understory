import React from "react";

const MANIFEST = {
  "type": "Typography.QuantumFlickerState",
  "description": "Text exists in multiple states simultaneously with deterministic flicker patterns, varying frequencies per character, and quantum tunneling effects",
  "editorElement": {
    "selector": ".quantum-flicker-text",
    "displayName": "Quantum Flicker State",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "SUPERPOSITION",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F1F3F5",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "flickerColor1": {
        "dataType": "color",
        "displayName": "Flicker State 1 Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "flickerColor2": {
        "dataType": "color",
        "displayName": "Flicker State 2 Color",
        "defaultValue": "#6C757D",
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
        "defaultValue": "0.08em",
        "options": ["0.05em", "0.08em", "0.1em", "0.15em"],
        "group": "Typography"
      },
      "flickerFrequency": {
        "dataType": "select",
        "displayName": "Base Flicker Frequency (Hz)",
        "defaultValue": "10",
        "options": ["5", "8", "10", "12", "15"],
        "group": "Animation"
      },
      "frequencyVariation": {
        "dataType": "select",
        "displayName": "Frequency Variation",
        "defaultValue": "0.5",
        "options": ["0.2", "0.3", "0.5", "0.7", "1.0"],
        "group": "Animation"
      },
      "tunnelProbability": {
        "dataType": "select",
        "displayName": "Quantum Tunnel Probability",
        "defaultValue": "0.05",
        "options": ["0.02", "0.05", "0.08", "0.1"],
        "group": "Animation"
      },
      "hoverSlowdown": {
        "dataType": "select",
        "displayName": "Hover Slowdown Factor",
        "defaultValue": "0.2",
        "options": ["0.1", "0.15", "0.2", "0.3", "0.4"],
        "group": "Animation"
      },
      "stateCount": {
        "dataType": "select",
        "displayName": "Simultaneous States",
        "defaultValue": "3",
        "options": ["2", "3", "4", "5"],
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
  const [characterStates, setCharacterStates] = React.useState({});
  const [isHovered, setIsHovered] = React.useState(false);
  const [tunnelStates, setTunnelStates] = React.useState({});
  
  const animationFrameRef = React.useRef(null);
  const lastUpdateRef = React.useRef({});
  const stateSeeds = React.useRef({});

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const text = config?.text || "SUPERPOSITION";
  const backgroundColor = config?.backgroundColor || "#F1F3F5";
  const textColor = config?.textColor || "#212529";
  const flickerColor1 = config?.flickerColor1 || "#495057";
  const flickerColor2 = config?.flickerColor2 || "#6C757D";
  const fontSize = parseInt(config?.fontSize) || 100;
  const fontWeight = config?.fontWeight || "300";
  const letterSpacing = config?.letterSpacing || "0.08em";
  const baseFrequency = parseFloat(config?.flickerFrequency) || 10;
  const frequencyVariation = parseFloat(config?.frequencyVariation) || 0.5;
  const tunnelProbability = parseFloat(config?.tunnelProbability) || 0.05;
  const hoverSlowdown = parseFloat(config?.hoverSlowdown) || 0.2;
  const stateCount = parseInt(config?.stateCount) || 3;

  const characters = text.split('');

  // Initialize deterministic random seeds for each character
  React.useEffect(() => {
    const seeds = {};
    characters.forEach((char, index) => {
      seeds[index] = {
        frequencySeed: Math.sin(index * 0.1) * 10000,
        positionSeed: Math.cos(index * 0.15) * 10000,
        scaleSeed: Math.sin(index * 0.2) * 10000,
        rotationSeed: Math.cos(index * 0.25) * 10000,
        colorSeed: Math.sin(index * 0.3) * 10000
      };
    });
    stateSeeds.current = seeds;

    // Initialize states
    const initialStates = {};
    const initialTunnelStates = {};
    characters.forEach((char, index) => {
      initialStates[index] = {
        stateIndex: 0,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0
      };
      initialTunnelStates[index] = false;
    });
    setCharacterStates(initialStates);
    setTunnelStates(initialTunnelStates);
    lastUpdateRef.current = {};
  }, [text]);

  // Get deterministic random value
  const getDeterministicRandom = (seed, index, time) => {
    const value = Math.sin(seed + index + time) * 10000;
    return value - Math.floor(value);
  };

  // Quantum flicker animation loop
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const animate = (timestamp) => {
      const speedMultiplier = isHovered ? hoverSlowdown : 1.0;

      setCharacterStates(prevStates => {
        const newStates = { ...prevStates };

        characters.forEach((char, index) => {
          const seeds = stateSeeds.current[index];
          if (!seeds) return;

          // Calculate per-character frequency
          const freqRandom = getDeterministicRandom(seeds.frequencySeed, index, 0);
          const charFrequency = baseFrequency * (1 + (freqRandom - 0.5) * frequencyVariation) * speedMultiplier;
          const interval = 1000 / charFrequency;

          // Check if enough time has passed for this character
          const lastUpdate = lastUpdateRef.current[index] || 0;
          if (timestamp - lastUpdate < interval) return;

          lastUpdateRef.current[index] = timestamp;

          // Quantum tunnel check (random disappearance)
          const tunnelRandom = getDeterministicRandom(seeds.positionSeed, index, timestamp * 0.001);
          if (tunnelRandom < tunnelProbability) {
            setTunnelStates(prev => ({ ...prev, [index]: true }));
            setTimeout(() => {
              setTunnelStates(prev => ({ ...prev, [index]: false }));
            }, 50 + Math.random() * 100);
          }

          // Generate new state
          const stateIndex = Math.floor(getDeterministicRandom(seeds.colorSeed, index, timestamp * 0.001) * stateCount);
          
          // Position variation
          const posX = (getDeterministicRandom(seeds.positionSeed, index, timestamp * 0.001) - 0.5) * 8;
          const posY = (getDeterministicRandom(seeds.positionSeed + 1, index, timestamp * 0.001) - 0.5) * 8;
          
          // Scale flicker
          const scale = 0.95 + getDeterministicRandom(seeds.scaleSeed, index, timestamp * 0.001) * 0.1;
          
          // Rotation flicker
          const rotation = (getDeterministicRandom(seeds.rotationSeed, index, timestamp * 0.001) - 0.5) * 4;

          newStates[index] = {
            stateIndex,
            x: posX,
            y: posY,
            scale,
            rotation
          };
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
  }, [characters, baseFrequency, frequencyVariation, tunnelProbability, hoverSlowdown, stateCount, isHovered, prefersReducedMotion]);

  const getStateColor = (stateIndex) => {
    const colors = [textColor, flickerColor1, flickerColor2];
    if (stateCount === 2) return colors[stateIndex % 2];
    if (stateCount === 4) {
      const fourColors = [textColor, flickerColor1, flickerColor2, textColor];
      return fourColors[stateIndex % 4];
    }
    if (stateCount === 5) {
      const fiveColors = [textColor, flickerColor1, flickerColor2, flickerColor1, textColor];
      return fiveColors[stateIndex % 5];
    }
    return colors[stateIndex % 3];
  };

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
    zIndex: 0,
    opacity: 0.06,
    backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&fm=jpg&crop=entropy&cs=monochrome)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'grayscale(100%) contrast(1.4)',
    animation: prefersReducedMotion ? 'none' : 'staticNoise 0.1s steps(2) infinite'
  };

  const textContainerStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer'
  };

  const characterStyle = (index) => {
    const state = characterStates[index] || { stateIndex: 0, x: 0, y: 0, scale: 1, rotation: 0 };
    const isTunneling = tunnelStates[index];
    const char = characters[index];
    const isSpace = char === ' ';

    if (prefersReducedMotion) {
      return {
        fontSize: `clamp(${fontSize * 0.4}px, 10vw, ${fontSize}px)`,
        fontWeight,
        letterSpacing,
        color: textColor,
        display: 'inline-block',
        padding: isSpace ? '0 0.2em' : '0'
      };
    }

    return {
      fontSize: `clamp(${fontSize * 0.4}px, 10vw, ${fontSize}px)`,
      fontWeight,
      letterSpacing,
      color: getStateColor(state.stateIndex),
      display: 'inline-block',
      transform: `translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg) scale(${state.scale})`,
      opacity: isTunneling ? 0 : (isHovered ? 1 : 0.95),
      padding: isSpace ? '0 0.2em' : '0',
      userSelect: 'none',
      transition: isTunneling ? 'opacity 50ms linear' : (isHovered ? 'opacity 300ms ease' : 'none'),
      filter: isTunneling ? 'blur(4px)' : 'none',
      textShadow: `0 0 ${fontSize * 0.08}px currentColor`
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
    <div style={containerStyle} className="quantum-flicker-text">
      <style>
        {`
          @keyframes staticNoise {
            0%, 100% { opacity: 0.06; }
            50% { opacity: 0.08; }
          }
        `}
      </style>

      {/* Background */}
      <div style={backgroundImageStyle} />

      {/* Flickering Text */}
      <div 
        style={textContainerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
        {isHovered ? 'Hover to slow quantum fluctuation' : 'Multiple states flickering • Quantum tunneling active'}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
