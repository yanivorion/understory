import React from "react";

const MANIFEST = {
  "type": "Typography.DNAHelixDoubleSpiral",
  "description": "Text arranged in double helix formation with parametric 3D curves, base-pair connections, continuous rotation, and depth-based perspective scaling",
  "editorElement": {
    "selector": ".dna-helix-text",
    "displayName": "DNA Helix Double Spiral",
    "archetype": "container",
    "data": {
      "strand1Text": {
        "dataType": "text",
        "displayName": "Strand 1 Text",
        "defaultValue": "EVOLUTION",
        "group": "Content"
      },
      "strand2Text": {
        "dataType": "text",
        "displayName": "Strand 2 Text",
        "defaultValue": "CREATION",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F1F3F5",
        "group": "Colors"
      },
      "strand1Color": {
        "dataType": "color",
        "displayName": "Strand 1 Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "strand2Color": {
        "dataType": "color",
        "displayName": "Strand 2 Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "connectionColor": {
        "dataType": "color",
        "displayName": "Base-Pair Connection Color",
        "defaultValue": "#DEE2E6",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 40,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "helixRadius": {
        "dataType": "select",
        "displayName": "Helix Radius (px)",
        "defaultValue": "120",
        "options": ["80", "100", "120", "150", "180"],
        "group": "Animation"
      },
      "helixPitch": {
        "dataType": "select",
        "displayName": "Helix Pitch (height per turn)",
        "defaultValue": "400",
        "options": ["300", "350", "400", "450", "500"],
        "group": "Animation"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.4", "0.5"],
        "group": "Animation"
      },
      "depthScale": {
        "dataType": "select",
        "displayName": "Depth Scale Factor",
        "defaultValue": "0.5",
        "options": ["0.3", "0.4", "0.5", "0.6", "0.7"],
        "group": "Animation"
      },
      "showConnections": {
        "dataType": "booleanValue",
        "displayName": "Show Base-Pair Connections",
        "defaultValue": true,
        "group": "Content"
      },
      "autoRotate": {
        "dataType": "booleanValue",
        "displayName": "Auto-Rotate",
        "defaultValue": true,
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
  const [rotationAngle, setRotationAngle] = React.useState(0);
  
  const animationFrameRef = React.useRef(null);
  const startTimeRef = React.useRef(Date.now());

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const strand1Text = config?.strand1Text || "EVOLUTION";
  const strand2Text = config?.strand2Text || "CREATION";
  const backgroundColor = config?.backgroundColor || "#F1F3F5";
  const strand1Color = config?.strand1Color || "#212529";
  const strand2Color = config?.strand2Color || "#495057";
  const connectionColor = config?.connectionColor || "#DEE2E6";
  const fontSize = parseInt(config?.fontSize) || 40;
  const fontWeight = config?.fontWeight || "400";
  const helixRadius = parseFloat(config?.helixRadius) || 120;
  const helixPitch = parseFloat(config?.helixPitch) || 400;
  const rotationSpeed = parseFloat(config?.rotationSpeed) || 0.3;
  const depthScale = parseFloat(config?.depthScale) || 0.5;
  const showConnections = config?.showConnections !== false;
  const autoRotate = config?.autoRotate !== false;

  // Use longer strand for positioning
  const maxLength = Math.max(strand1Text.length, strand2Text.length);
  const strand1Chars = strand1Text.split('');
  const strand2Chars = strand2Text.split('');

  // Calculate helix position for a character
  const calculateHelixPosition = (index, totalChars, strandOffset, rotation) => {
    // Parametric helix equations
    const t = (index / totalChars) * Math.PI * 4; // 2 full turns
    const z = (index / totalChars) * helixPitch;
    
    // Add rotation and strand offset (180° for opposite strand)
    const angle = t + rotation + strandOffset;
    
    const x = Math.cos(angle) * helixRadius;
    const y = Math.sin(angle) * helixRadius;
    
    // Calculate scale based on z-depth (perspective)
    const scale = 1 - (Math.abs(y) / helixRadius) * depthScale;
    
    // Calculate opacity based on depth
    const opacity = 0.3 + (scale * 0.7);
    
    // Calculate rotation to face outward
    const faceRotation = (angle * 180 / Math.PI) + 90;
    
    return { x, y, z, scale, opacity, faceRotation };
  };

  // Auto-rotation animation
  React.useEffect(() => {
    if (!autoRotate || prefersReducedMotion) return;

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) * 0.001;
      setRotationAngle(elapsed * rotationSpeed);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoRotate, rotationSpeed, prefersReducedMotion]);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    perspective: '1500px',
    transformStyle: 'preserve-3d'
  };

  const helixContainerStyle = {
    position: 'relative',
    width: `${helixRadius * 3}px`,
    height: `${helixPitch + 100}px`,
    transformStyle: 'preserve-3d'
  };

  const characterStyle = (position, color) => {
    if (prefersReducedMotion) {
      return {
        position: 'absolute',
        left: '50%',
        top: `${position.z}px`,
        fontSize: `${fontSize}px`,
        fontWeight,
        color,
        transform: 'translate(-50%, -50%)',
        userSelect: 'none',
        pointerEvents: 'none',
        opacity: position.opacity
      };
    }

    // Sort by y (depth) for proper layering
    const zIndex = Math.floor((1 - position.opacity) * 100);

    return {
      position: 'absolute',
      left: `calc(50% + ${position.x}px)`,
      top: `${position.z}px`,
      fontSize: `${fontSize * position.scale}px`,
      fontWeight,
      color,
      transform: `translate(-50%, -50%) rotateZ(${position.faceRotation}deg)`,
      opacity: position.opacity,
      userSelect: 'none',
      pointerEvents: 'none',
      transformStyle: 'preserve-3d',
      zIndex,
      willChange: 'transform, opacity',
      transition: 'none',
      textShadow: `0 0 ${fontSize * position.scale * 0.2}px ${color}40`
    };
  };

  const connectionLineStyle = (pos1, pos2) => {
    const dx = pos2.x - pos1.x;
    const dy = pos2.z - pos1.z;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    const averageOpacity = (pos1.opacity + pos2.opacity) / 2;
    const averageScale = (pos1.scale + pos2.scale) / 2;

    return {
      position: 'absolute',
      left: `calc(50% + ${pos1.x}px)`,
      top: `${pos1.z}px`,
      width: `${length}px`,
      height: '1px',
      backgroundColor: connectionColor,
      transformOrigin: 'left center',
      transform: `rotate(${angle}deg)`,
      opacity: averageOpacity * 0.5,
      pointerEvents: 'none',
      zIndex: 0
    };
  };

  const infoStyle = {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '14px',
    color: strand1Color,
    opacity: 0.4,
    zIndex: 100,
    textAlign: 'center',
    pointerEvents: 'none',
    fontWeight: '300'
  };

  // Calculate positions for all characters
  const strand1Positions = strand1Chars.map((char, index) => ({
    char,
    ...calculateHelixPosition(index, maxLength, 0, rotationAngle)
  }));

  const strand2Positions = strand2Chars.map((char, index) => ({
    char,
    ...calculateHelixPosition(index, maxLength, Math.PI, rotationAngle)
  }));

  // Sort all characters by opacity for proper z-ordering
  const allCharacters = [
    ...strand1Positions.map((pos, i) => ({ ...pos, color: strand1Color, index: i, strand: 1 })),
    ...strand2Positions.map((pos, i) => ({ ...pos, color: strand2Color, index: i, strand: 2 }))
  ].sort((a, b) => a.opacity - b.opacity);

  return (
    <div style={containerStyle} className="dna-helix-text">
      <div style={helixContainerStyle}>
        {/* Base-pair connections */}
        {showConnections && !prefersReducedMotion && strand1Positions.map((pos1, index) => {
          if (index < strand2Positions.length) {
            const pos2 = strand2Positions[index];
            return (
              <div key={`conn-${index}`} style={connectionLineStyle(pos1, pos2)} />
            );
          }
          return null;
        })}

        {/* Characters (sorted by depth) */}
        {allCharacters.map((item, index) => (
          <div key={`${item.strand}-${item.index}`} style={characterStyle(item, item.color)}>
            {item.char === ' ' ? '\u00A0' : item.char}
          </div>
        ))}
      </div>

      {/* Info */}
      <div style={infoStyle}>
        Parametric double helix • Two strands rotating in opposite directions
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
