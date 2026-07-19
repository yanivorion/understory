import React from "react";

const MANIFEST = {
  "type": "Geometric.GenerativeGridMorph",
  "description": "Geometric grid that morphs between tessellation patterns with smooth vertex interpolation and mathematical precision",
  "editorElement": {
    "selector": ".generative-grid-morph",
    "displayName": "Generative Grid Morph",
    "archetype": "container",
    "data": {
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "gridColor": {
        "dataType": "color",
        "displayName": "Grid Line Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "gridSize": {
        "dataType": "select",
        "displayName": "Grid Size",
        "defaultValue": "8",
        "options": ["6", "8", "10", "12"],
        "group": "Layout"
      },
      "cellSize": {
        "dataType": "select",
        "displayName": "Cell Size (px)",
        "defaultValue": "60",
        "options": ["40", "50", "60", "70", "80"],
        "group": "Layout"
      },
      "morphPattern": {
        "dataType": "select",
        "displayName": "Morph Pattern",
        "defaultValue": "wave",
        "options": ["wave", "ripple", "spiral", "random", "checkerboard"],
        "group": "Animation"
      },
      "morphSpeed": {
        "dataType": "select",
        "displayName": "Morph Speed",
        "defaultValue": "1.0",
        "options": ["0.5", "0.75", "1.0", "1.5", "2.0"],
        "group": "Animation"
      },
      "lineWidth": {
        "dataType": "select",
        "displayName": "Line Width (px)",
        "defaultValue": "2",
        "options": ["1", "2", "3", "4"],
        "group": "Layout"
      },
      "showNodes": {
        "dataType": "booleanValue",
        "displayName": "Show Node Points",
        "defaultValue": true,
        "group": "Content"
      },
      "nodeSize": {
        "dataType": "select",
        "displayName": "Node Size (px)",
        "defaultValue": "4",
        "options": ["2", "3", "4", "5", "6"],
        "group": "Layout"
      },
      "continuousAnimation": {
        "dataType": "booleanValue",
        "displayName": "Continuous Animation",
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
  const canvasRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);
  const timeRef = React.useRef(0);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const gridColor = config?.gridColor || "#212529";
  const accentColor = config?.accentColor || "#495057";
  const gridSize = parseInt(config?.gridSize) || 8;
  const cellSize = parseInt(config?.cellSize) || 60;
  const morphPattern = config?.morphPattern || "wave";
  const morphSpeed = parseFloat(config?.morphSpeed) || 1.0;
  const lineWidth = parseInt(config?.lineWidth) || 2;
  const showNodes = config?.showNodes !== false;
  const nodeSize = parseInt(config?.nodeSize) || 4;
  const continuousAnimation = config?.continuousAnimation !== false;

  // Calculate displacement for each grid point based on pattern
  const getDisplacement = (x, y, time, pattern) => {
    const centerX = gridSize / 2;
    const centerY = gridSize / 2;

    switch (pattern) {
      case 'wave':
        return {
          dx: Math.sin(x * 0.5 + time) * 15,
          dy: Math.cos(y * 0.5 + time) * 15
        };
      
      case 'ripple':
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const ripple = Math.sin(distance - time * 2) * 20;
        const angle = Math.atan2(y - centerY, x - centerX);
        return {
          dx: Math.cos(angle) * ripple,
          dy: Math.sin(angle) * ripple
        };
      
      case 'spiral':
        const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const ang = Math.atan2(y - centerY, x - centerX);
        const spiralOffset = dist * 0.3 + time;
        return {
          dx: Math.cos(ang + spiralOffset) * 15,
          dy: Math.sin(ang + spiralOffset) * 15
        };
      
      case 'random':
        return {
          dx: Math.sin(x * 1.5 + time + y * 0.8) * 12,
          dy: Math.cos(y * 1.2 + time + x * 0.6) * 12
        };
      
      case 'checkerboard':
        const checker = ((Math.floor(x) + Math.floor(y)) % 2) * 2 - 1;
        return {
          dx: Math.sin(time) * 10 * checker,
          dy: Math.cos(time) * 10 * checker
        };
      
      default:
        return { dx: 0, dy: 0 };
    }
  };

  // Draw grid
  const drawGrid = (ctx, width, height, time) => {
    ctx.clearRect(0, 0, width, height);

    const offsetX = (width - (gridSize - 1) * cellSize) / 2;
    const offsetY = (height - (gridSize - 1) * cellSize) / 2;

    // Draw lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Horizontal lines
    for (let y = 0; y < gridSize; y++) {
      ctx.beginPath();
      for (let x = 0; x < gridSize; x++) {
        const displacement = getDisplacement(x, y, time, morphPattern);
        const posX = offsetX + x * cellSize + displacement.dx;
        const posY = offsetY + y * cellSize + displacement.dy;
        
        if (x === 0) {
          ctx.moveTo(posX, posY);
        } else {
          ctx.lineTo(posX, posY);
        }
      }
      ctx.stroke();
    }

    // Vertical lines
    for (let x = 0; x < gridSize; x++) {
      ctx.beginPath();
      for (let y = 0; y < gridSize; y++) {
        const displacement = getDisplacement(x, y, time, morphPattern);
        const posX = offsetX + x * cellSize + displacement.dx;
        const posY = offsetY + y * cellSize + displacement.dy;
        
        if (y === 0) {
          ctx.moveTo(posX, posY);
        } else {
          ctx.lineTo(posX, posY);
        }
      }
      ctx.stroke();
    }

    // Draw nodes if enabled
    if (showNodes) {
      ctx.fillStyle = accentColor;
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const displacement = getDisplacement(x, y, time, morphPattern);
          const posX = offsetX + x * cellSize + displacement.dx;
          const posY = offsetY + y * cellSize + displacement.dy;
          
          ctx.beginPath();
          ctx.arc(posX, posY, nodeSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  // Animation loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;

    if (prefersReducedMotion || !continuousAnimation) {
      drawGrid(ctx, canvas.width, canvas.height, 0);
      return;
    }

    const animate = () => {
      timeRef.current += 0.016 * morphSpeed;
      drawGrid(ctx, canvas.width, canvas.height, timeRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gridSize, cellSize, morphPattern, morphSpeed, lineWidth, showNodes, nodeSize, gridColor, accentColor, continuousAnimation, prefersReducedMotion]);

  const containerStyle = {
    width: '100%',
    height: '600px',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const canvasStyle = {
    width: '100%',
    height: '100%',
    display: 'block'
  };

  const infoStyle = {
    position: 'absolute',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '14px',
    color: gridColor,
    opacity: 0.4,
    textAlign: 'center',
    pointerEvents: 'none',
    fontWeight: '300'
  };

  return (
    <div style={containerStyle} className="generative-grid-morph">
      <canvas ref={canvasRef} style={canvasStyle} />
      
      <div style={infoStyle}>
        Generative grid morphing • Pattern: {morphPattern}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
