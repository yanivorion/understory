import React from "react";

const MANIFEST = {
  "type": "Interactive.MagneticDistortion",
  "description": "Image with magnetic distortion effect - cursor warps vertices creating liquid deformation",
  "editorElement": {
    "selector": ".magnetic-distortion",
    "displayName": "Magnetic Image Distortion",
    "archetype": "container",
    "data": {
      "distortionStrength": {
        "dataType": "select",
        "displayName": "Distortion Strength",
        "defaultValue": "40",
        "options": ["20", "30", "40", "60", "80"],
        "group": "Animation"
      },
      "distortionRadius": {
        "dataType": "select",
        "displayName": "Distortion Radius (px)",
        "defaultValue": "150",
        "options": ["100", "150", "200", "250"],
        "group": "Animation"
      },
      "smoothness": {
        "dataType": "select",
        "displayName": "Smoothness",
        "defaultValue": "0.15",
        "options": ["0.1", "0.15", "0.2", "0.3"],
        "group": "Animation"
      },
      "imageSize": {
        "dataType": "select",
        "displayName": "Image Size",
        "defaultValue": "large",
        "options": ["medium", "large", "xlarge"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "16",
        "options": ["0", "8", "16", "24"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "imageBackground": {
        "dataType": "color",
        "displayName": "Image Background",
        "defaultValue": "#667eea",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "both",
      "contentResizeDirection": "both"
    }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = React.useState({ x: 0, y: 0 });
  const animationFrameRef = React.useRef(null);

  // Config values
  const distortionStrength = parseInt(config?.distortionStrength || "40");
  const distortionRadius = parseInt(config?.distortionRadius || "150");
  const smoothness = parseFloat(config?.smoothness || "0.15");
  const imageSize = config?.imageSize || "large";
  const borderRadius = parseInt(config?.borderRadius || "16");
  const backgroundColor = config?.backgroundColor || "#000000";
  const imageBackground = config?.imageBackground || "#667eea";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Image size mapping
  const sizeMap = {
    'medium': { width: 400, height: 300 },
    'large': { width: 600, height: 450 },
    'xlarge': { width: 800, height: 600 }
  };
  const dimensions = sizeMap[imageSize] || sizeMap.large;

  // Smooth mouse follow
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const animate = () => {
      setSmoothPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * smoothness,
        y: prev.y + (mousePos.y - prev.y) * smoothness
      }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, smoothness, prefersReducedMotion]);

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!imageRef.current || prefersReducedMotion) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: dimensions.width / 2, y: dimensions.height / 2 });
  };

  // Calculate distortion
  const calculateDistortion = () => {
    if (prefersReducedMotion) return 'none';

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Distance from mouse to center
    const dx = smoothPos.x - centerX;
    const dy = smoothPos.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only distort within radius
    if (distance > distortionRadius) {
      return 'none';
    }

    // Calculate distortion amount based on distance
    const strength = (1 - distance / distortionRadius) * distortionStrength;

    // Create perspective and skew based on mouse position
    const skewX = (smoothPos.x / dimensions.width - 0.5) * strength * 0.3;
    const skewY = (smoothPos.y / dimensions.height - 0.5) * strength * 0.3;
    
    const scaleX = 1 + (Math.abs(skewX) * 0.01);
    const scaleY = 1 + (Math.abs(skewY) * 0.01);

    // Perspective rotation
    const rotateY = ((smoothPos.x / dimensions.width) - 0.5) * strength * 0.15;
    const rotateX = -((smoothPos.y / dimensions.height) - 0.5) * strength * 0.15;

    return `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      skew(${skewX}deg, ${skewY}deg)
      scale(${scaleX}, ${scaleY})
    `;
  };

  // Calculate clip-path for liquid effect
  const calculateClipPath = () => {
    if (prefersReducedMotion) return 'none';

    const w = dimensions.width;
    const h = dimensions.height;
    const cx = smoothPos.x;
    const cy = smoothPos.y;

    // Create 8 control points around the rectangle
    const points = [
      { x: 0, y: 0 },           // top-left
      { x: w / 2, y: 0 },       // top-center
      { x: w, y: 0 },           // top-right
      { x: w, y: h / 2 },       // right-center
      { x: w, y: h },           // bottom-right
      { x: w / 2, y: h },       // bottom-center
      { x: 0, y: h },           // bottom-left
      { x: 0, y: h / 2 }        // left-center
    ];

    // Distort points based on distance to mouse
    const distortedPoints = points.map(point => {
      const dx = cx - point.x;
      const dy = cy - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < distortionRadius) {
        const strength = (1 - distance / distortionRadius) * distortionStrength * 0.5;
        const angle = Math.atan2(dy, dx);
        
        return {
          x: point.x + Math.cos(angle) * strength,
          y: point.y + Math.sin(angle) * strength
        };
      }

      return point;
    });

    // Convert to percentages
    const percentPoints = distortedPoints.map(p => 
      `${(p.x / w * 100).toFixed(1)}% ${(p.y / h * 100).toFixed(1)}%`
    );

    return `polygon(${percentPoints.join(', ')})`;
  };

  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    overflow: 'hidden'
  };

  const imageContainerStyle = {
    position: 'relative',
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    perspective: '1000px',
    cursor: 'none'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, ${imageBackground}, ${imageBackground}dd)`,
    borderRadius: `${borderRadius}px`,
    transform: calculateDistortion(),
    clipPath: calculateClipPath(),
    transition: prefersReducedMotion ? 'none' : 'none',
    transformStyle: 'preserve-3d',
    willChange: 'transform, clip-path',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: '500',
    userSelect: 'none'
  };

  // Custom cursor
  const cursorStyle = {
    position: 'fixed',
    left: smoothPos.x,
    top: smoothPos.y,
    width: `${distortionRadius * 2}px`,
    height: `${distortionRadius * 2}px`,
    border: '2px dashed rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    opacity: mousePos.x > 0 ? 0.5 : 0,
    transition: 'opacity 0.3s ease'
  };

  return (
    <div 
      ref={containerRef}
      className="magnetic-distortion"
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={imageContainerStyle}>
        <div ref={imageRef} style={imageStyle}>
          <div>Move cursor to distort</div>
        </div>
      </div>

      {!prefersReducedMotion && <div style={cursorStyle} />}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
