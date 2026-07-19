import React from "react";

const MANIFEST = {
  "type": "Typography.PerspectiveTunnelZoom",
  "description": "Text layers recede into vanishing point with continuous zoom creating infinite tunnel effect using true perspective projection mathematics",
  "editorElement": {
    "selector": ".perspective-tunnel-text",
    "displayName": "Perspective Tunnel Infinite Zoom",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "INFINITY",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "nearColor": {
        "dataType": "color",
        "displayName": "Near Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "farColor": {
        "dataType": "color",
        "displayName": "Far Text Color",
        "defaultValue": "#ADB5BD",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Base Font Size (px)",
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
        "defaultValue": "0.15em",
        "options": ["0.1em", "0.15em", "0.2em", "0.25em"],
        "group": "Typography"
      },
      "zoomSpeed": {
        "dataType": "select",
        "displayName": "Zoom Speed",
        "defaultValue": "50",
        "options": ["30", "40", "50", "60", "80"],
        "group": "Animation"
      },
      "layerSpacing": {
        "dataType": "select",
        "displayName": "Layer Spacing (Z-depth)",
        "defaultValue": "200",
        "options": ["150", "200", "250", "300", "350"],
        "group": "Animation"
      },
      "fov": {
        "dataType": "select",
        "displayName": "Field of View (degrees)",
        "defaultValue": "75",
        "options": ["60", "70", "75", "80", "90"],
        "group": "Animation"
      },
      "layerCount": {
        "dataType": "select",
        "displayName": "Visible Layers",
        "defaultValue": "15",
        "options": ["10", "12", "15", "18", "20"],
        "group": "Animation"
      },
      "rotationPerLayer": {
        "dataType": "select",
        "displayName": "Rotation Per Layer (deg)",
        "defaultValue": "5",
        "options": ["0", "3", "5", "8", "10"],
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
  const [zPosition, setZPosition] = React.useState(0);
  const [layers, setLayers] = React.useState([]);
  
  const animationFrameRef = React.useRef(null);
  const lastFrameTimeRef = React.useRef(Date.now());

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const text = config?.text || "INFINITY";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const nearColor = config?.nearColor || "#212529";
  const farColor = config?.farColor || "#ADB5BD";
  const fontSize = parseInt(config?.fontSize) || 100;
  const fontWeight = config?.fontWeight || "300";
  const letterSpacing = config?.letterSpacing || "0.15em";
  const zoomSpeed = parseFloat(config?.zoomSpeed) || 50;
  const layerSpacing = parseFloat(config?.layerSpacing) || 200;
  const fov = parseFloat(config?.fov) || 75;
  const layerCount = parseInt(config?.layerCount) || 15;
  const rotationPerLayer = parseFloat(config?.rotationPerLayer) || 5;

  // Initialize layers
  React.useEffect(() => {
    const initialLayers = [];
    for (let i = 0; i < layerCount; i++) {
      initialLayers.push({
        id: i,
        baseZ: i * layerSpacing,
        text: text
      });
    }
    setLayers(initialLayers);
  }, [text, layerCount, layerSpacing]);

  // Continuous zoom animation
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastFrameTimeRef.current) * 0.001;
      lastFrameTimeRef.current = currentTime;

      setZPosition(prevZ => {
        const newZ = prevZ + zoomSpeed * deltaTime;
        
        // When camera passes through a layer, respawn it at the back
        if (newZ >= layerSpacing) {
          return newZ - layerSpacing;
        }
        return newZ;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [zoomSpeed, layerSpacing, prefersReducedMotion]);

  // Perspective projection calculation
  const projectToScreen = (z, fovDegrees) => {
    const fovRadians = (fovDegrees * Math.PI) / 180;
    const cameraDistance = 1000;
    const projectedZ = z - zPosition;
    
    if (projectedZ <= 0) return null; // Behind camera
    
    const scale = cameraDistance / (cameraDistance + projectedZ);
    const perspective = Math.tan(fovRadians / 2);
    
    return {
      scale,
      opacity: Math.max(0, Math.min(1, scale)),
      blur: Math.max(0, (1 - scale) * 8)
    };
  };

  // Interpolate color based on depth
  const interpolateColor = (near, far, t) => {
    const parseColor = (hex) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    });

    const nearRGB = parseColor(near);
    const farRGB = parseColor(far);

    const r = Math.floor(nearRGB.r + (farRGB.r - nearRGB.r) * t);
    const g = Math.floor(nearRGB.g + (farRGB.g - nearRGB.g) * t);
    const b = Math.floor(nearRGB.b + (farRGB.b - nearRGB.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const containerStyle = {
    width: '100%',
    height: '100vh',
    backgroundColor,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1000px',
    transformStyle: 'preserve-3d'
  };

  const layerStyle = (layer, index) => {
    const actualZ = layer.baseZ - (zPosition % layerSpacing);
    const projection = projectToScreen(actualZ, fov);
    
    if (!projection || projection.scale < 0.01) {
      return { display: 'none' };
    }

    if (prefersReducedMotion) {
      return {
        position: 'absolute',
        fontSize: `${fontSize * projection.scale}px`,
        fontWeight,
        letterSpacing,
        color: interpolateColor(nearColor, farColor, 1 - projection.opacity),
        opacity: projection.opacity,
        userSelect: 'none',
        pointerEvents: 'none'
      };
    }

    const rotation = index * rotationPerLayer;
    const depthIndex = Math.floor(actualZ / layerSpacing);

    return {
      position: 'absolute',
      fontSize: `${fontSize * projection.scale}px`,
      fontWeight,
      letterSpacing,
      color: interpolateColor(nearColor, farColor, 1 - projection.opacity),
      opacity: projection.opacity,
      transform: `scale(${projection.scale}) rotateZ(${rotation}deg)`,
      filter: `blur(${projection.blur}px)`,
      userSelect: 'none',
      pointerEvents: 'none',
      transformStyle: 'preserve-3d',
      willChange: 'transform, opacity, filter',
      zIndex: Math.floor((1 - projection.scale) * 100),
      textShadow: `0 0 ${fontSize * projection.scale * 0.3}px ${nearColor}${Math.floor(projection.opacity * 30).toString(16).padStart(2, '0')}`
    };
  };

  const gridLineStyle = (isVertical, position) => ({
    position: 'absolute',
    [isVertical ? 'left' : 'top']: `${position}%`,
    [isVertical ? 'width' : 'height']: '1px',
    [isVertical ? 'height' : 'width']: '100%',
    backgroundColor: nearColor,
    opacity: 0.05,
    pointerEvents: 'none'
  });

  const infoStyle = {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '14px',
    color: nearColor,
    opacity: 0.4,
    zIndex: 100,
    textAlign: 'center',
    pointerEvents: 'none',
    fontWeight: '300'
  };

  return (
    <div style={containerStyle} className="perspective-tunnel-text">
      {/* Grid lines for tunnel effect */}
      {[20, 40, 60, 80].map(pos => (
        <React.Fragment key={`grid-${pos}`}>
          <div style={gridLineStyle(true, pos)} />
          <div style={gridLineStyle(false, pos)} />
        </React.Fragment>
      ))}

      {/* Text layers */}
      {layers.map((layer, index) => (
        <div key={layer.id} style={layerStyle(layer, index)}>
          {layer.text}
        </div>
      ))}

      {/* Info */}
      <div style={infoStyle}>
        Infinite tunnel • True perspective projection • FOV: {fov}°
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
