import React from "react";

const MANIFEST = {
  "type": "Interactive.ParallaxScene",
  "description": "Multi-layer parallax scene with mouse and scroll parallax creating 3D depth",
  "editorElement": {
    "selector": ".parallax-scene",
    "displayName": "Parallax Layered Scene",
    "archetype": "container",
    "data": {
      "layerCount": {
        "dataType": "select",
        "displayName": "Number of Layers",
        "defaultValue": "5",
        "options": ["3", "4", "5", "6", "7"],
        "group": "Content"
      },
      "mouseParallaxStrength": {
        "dataType": "select",
        "displayName": "Mouse Parallax Strength",
        "defaultValue": "20",
        "options": ["10", "15", "20", "30", "40"],
        "group": "Animation"
      },
      "scrollParallaxStrength": {
        "dataType": "select",
        "displayName": "Scroll Parallax Strength",
        "defaultValue": "0.5",
        "options": ["0.2", "0.3", "0.5", "0.7", "1.0"],
        "group": "Animation"
      },
      "sceneHeight": {
        "dataType": "select",
        "displayName": "Scene Height (vh)",
        "defaultValue": "200",
        "options": ["150", "200", "250", "300"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#0a0e27",
        "group": "Colors"
      },
      "layer1Color": {
        "dataType": "color",
        "displayName": "Layer 1 Color (Back)",
        "defaultValue": "#1a1f3a",
        "group": "Colors"
      },
      "layer2Color": {
        "dataType": "color",
        "displayName": "Layer 2 Color",
        "defaultValue": "#2a3556",
        "group": "Colors"
      },
      "layer3Color": {
        "dataType": "color",
        "displayName": "Layer 3 Color (Middle)",
        "defaultValue": "#3d4a7a",
        "group": "Colors"
      },
      "layer4Color": {
        "dataType": "color",
        "displayName": "Layer 4 Color",
        "defaultValue": "#5060a5",
        "group": "Colors"
      },
      "layer5Color": {
        "dataType": "color",
        "displayName": "Layer 5 Color (Front)",
        "defaultValue": "#6c7ac9",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "both",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const layersRef = React.useRef([]);
  const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });
  const [scrollPos, setScrollPos] = React.useState(0);

  // Config values
  const layerCount = parseInt(config?.layerCount || "5");
  const mouseParallaxStrength = parseInt(config?.mouseParallaxStrength || "20");
  const scrollParallaxStrength = parseFloat(config?.scrollParallaxStrength || "0.5");
  const sceneHeight = parseInt(config?.sceneHeight || "200");
  const backgroundColor = config?.backgroundColor || "#0a0e27";

  const layerColors = [
    config?.layer1Color || "#1a1f3a",
    config?.layer2Color || "#2a3556",
    config?.layer3Color || "#3d4a7a",
    config?.layer4Color || "#5060a5",
    config?.layer5Color || "#6c7ac9",
    config?.layer1Color || "#1a1f3a",
    config?.layer2Color || "#2a3556"
  ];

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current || prefersReducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePos({ x, y });
  };

  // Handle scroll
  const handleScroll = () => {
    if (!containerRef.current || prefersReducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Calculate scroll progress
    const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
    setScrollPos(scrollProgress);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: `${sceneHeight}vh`,
    backgroundColor: backgroundColor,
    overflow: 'hidden',
    cursor: 'default'
  };

  const getLayerTransform = (index) => {
    if (prefersReducedMotion) return 'none';

    const totalLayers = layerCount;
    const depth = (index + 1) / totalLayers; // 0.2 to 1.0
    
    // Mouse parallax (closer layers move more)
    const mouseX = (mousePos.x - 0.5) * mouseParallaxStrength * depth;
    const mouseY = (mousePos.y - 0.5) * mouseParallaxStrength * depth;
    
    // Scroll parallax (closer layers move more)
    const scrollY = (scrollPos - 0.5) * 200 * scrollParallaxStrength * depth;
    
    // Scale based on depth (closer = larger)
    const scale = 1 + (depth * 0.2);
    
    return `translate(${mouseX}px, ${mouseY + scrollY}px) scale(${scale})`;
  };

  const layerStyle = (index) => {
    const depth = (index + 1) / layerCount;
    const opacity = 0.3 + (depth * 0.7);

    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '120%',
      height: '120%',
      transform: getLayerTransform(index),
      transition: prefersReducedMotion ? 'none' : 'transform 0.15s ease-out',
      willChange: 'transform',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: opacity
    };
  };

  // Generate shapes for each layer
  const generateShapes = (layerIndex) => {
    const shapes = [];
    const shapeCount = 3 + layerIndex;
    const layerDepth = (layerIndex + 1) / layerCount;

    for (let i = 0; i < shapeCount; i++) {
      const size = 60 + Math.random() * 120;
      const x = (Math.random() - 0.5) * 80; // -40% to 40%
      const y = (Math.random() - 0.5) * 80;
      const rotation = Math.random() * 360;
      const shapeType = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)];

      shapes.push({
        key: `${layerIndex}-${i}`,
        size,
        x,
        y,
        rotation,
        type: shapeType,
        color: layerColors[layerIndex]
      });
    }

    return shapes;
  };

  const renderShape = (shape) => {
    const baseStyle = {
      position: 'absolute',
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      left: `calc(50% + ${shape.x}%)`,
      top: `calc(50% + ${shape.y}%)`,
      transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
      backgroundColor: shape.color,
      opacity: 0.6
    };

    if (shape.type === 'circle') {
      return <div key={shape.key} style={{ ...baseStyle, borderRadius: '50%' }} />;
    } else if (shape.type === 'square') {
      return <div key={shape.key} style={{ ...baseStyle, borderRadius: '12px' }} />;
    } else {
      return (
        <div
          key={shape.key}
          style={{
            ...baseStyle,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
      );
    }
  };

  const [layerShapes] = React.useState(() => 
    Array.from({ length: layerCount }).map((_, i) => generateShapes(i))
  );

  return (
    <div 
      ref={containerRef}
      className="parallax-scene"
      style={containerStyle}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: layerCount }).map((_, index) => (
        <div
          key={index}
          ref={el => layersRef.current[index] = el}
          style={layerStyle(index)}
        >
          {layerShapes[index].map(shape => renderShape(shape))}
        </div>
      ))}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
