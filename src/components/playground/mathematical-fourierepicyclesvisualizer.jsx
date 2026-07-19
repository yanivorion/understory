import React from "react";

const MANIFEST = {
  "type": "Mathematical.FourierEpicyclesVisualizer",
  "description": "Visualizes Fourier decomposition using epicycles - rotating circles that trace paths, demonstrating frequency domain mathematics",
  "editorElement": {
    "selector": ".fourier-epicycles",
    "displayName": "Fourier Epicycles Visualizer",
    "archetype": "container",
    "data": {
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "circleColor": {
        "dataType": "color",
        "displayName": "Circle Color",
        "defaultValue": "#DEE2E6",
        "group": "Colors"
      },
      "armColor": {
        "dataType": "color",
        "displayName": "Arm Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "pathColor": {
        "dataType": "color",
        "displayName": "Path Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "shape": {
        "dataType": "select",
        "displayName": "Shape to Draw",
        "defaultValue": "circle",
        "options": ["circle", "square", "star", "heart", "infinity"],
        "group": "Content"
      },
      "epicycleCount": {
        "dataType": "select",
        "displayName": "Number of Epicycles",
        "defaultValue": "10",
        "options": ["5", "8", "10", "15", "20"],
        "group": "Content"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed",
        "defaultValue": "1.0",
        "options": ["0.5", "0.75", "1.0", "1.5", "2.0"],
        "group": "Animation"
      },
      "scaleSize": {
        "dataType": "select",
        "displayName": "Shape Scale",
        "defaultValue": "150",
        "options": ["100", "150", "200", "250"],
        "group": "Layout"
      },
      "showCircles": {
        "dataType": "booleanValue",
        "displayName": "Show Epicycle Circles",
        "defaultValue": true,
        "group": "Content"
      },
      "showArms": {
        "dataType": "booleanValue",
        "displayName": "Show Rotating Arms",
        "defaultValue": true,
        "group": "Content"
      },
      "trailLength": {
        "dataType": "select",
        "displayName": "Trail Length",
        "defaultValue": "200",
        "options": ["100", "150", "200", "300", "400"],
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
  const canvasRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);
  const timeRef = React.useRef(0);
  const pathPointsRef = React.useRef([]);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const circleColor = config?.circleColor || "#DEE2E6";
  const armColor = config?.armColor || "#495057";
  const pathColor = config?.pathColor || "#212529";
  const shape = config?.shape || "circle";
  const epicycleCount = parseInt(config?.epicycleCount) || 10;
  const rotationSpeed = parseFloat(config?.rotationSpeed) || 1.0;
  const scaleSize = parseFloat(config?.scaleSize) || 150;
  const showCircles = config?.showCircles !== false;
  const showArms = config?.showArms !== false;
  const trailLength = parseInt(config?.trailLength) || 200;

  // Generate shape path points
  const generateShapePath = (shapeType, scale) => {
    const points = [];
    const numPoints = 100;

    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2;
      let x, y;

      switch (shapeType) {
        case 'circle':
          x = Math.cos(t) * scale;
          y = Math.sin(t) * scale;
          break;
        
        case 'square':
          const seg = Math.floor((t / (Math.PI * 2)) * 4);
          const progress = ((t / (Math.PI * 2)) * 4) % 1;
          if (seg === 0) {
            x = scale; y = (progress * 2 - 1) * scale;
          } else if (seg === 1) {
            x = (1 - progress * 2) * scale; y = scale;
          } else if (seg === 2) {
            x = -scale; y = (1 - progress * 2) * scale;
          } else {
            x = (progress * 2 - 1) * scale; y = -scale;
          }
          break;
        
        case 'star':
          const r = (i % 20 < 10) ? scale : scale * 0.5;
          x = Math.cos(t) * r;
          y = Math.sin(t) * r;
          break;
        
        case 'heart':
          x = 16 * Math.pow(Math.sin(t), 3) * (scale / 16);
          y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * (scale / 16);
          break;
        
        case 'infinity':
          x = Math.cos(t) / (1 + Math.pow(Math.sin(t), 2)) * scale * 1.5;
          y = Math.sin(t) * Math.cos(t) / (1 + Math.pow(Math.sin(t), 2)) * scale * 1.5;
          break;
        
        default:
          x = Math.cos(t) * scale;
          y = Math.sin(t) * scale;
      }

      points.push({ x, y });
    }

    return points;
  };

  // Simplified DFT (Discrete Fourier Transform) calculation
  const calculateDFT = (points) => {
    const coefficients = [];
    const N = points.length;

    // Calculate first N/2 frequency components
    for (let k = 0; k < Math.min(epicycleCount, N / 2); k++) {
      let real = 0;
      let imag = 0;

      for (let n = 0; n < N; n++) {
        const phi = (Math.PI * 2 * k * n) / N;
        real += points[n].x * Math.cos(phi) + points[n].y * Math.sin(phi);
        imag += -points[n].x * Math.sin(phi) + points[n].y * Math.cos(phi);
      }

      real /= N;
      imag /= N;

      const amplitude = Math.sqrt(real * real + imag * imag);
      const phase = Math.atan2(imag, real);
      const frequency = k;

      coefficients.push({ amplitude, phase, frequency });
    }

    // Sort by amplitude (largest first) for better visualization
    return coefficients.sort((a, b) => b.amplitude - a.amplitude);
  };

  // Calculate epicycle position at time t
  const drawEpicycles = (ctx, coefficients, time, startX, startY) => {
    let x = startX;
    let y = startY;

    coefficients.forEach((coef, index) => {
      const prevX = x;
      const prevY = y;

      const angle = coef.frequency * time + coef.phase;
      x += Math.cos(angle) * coef.amplitude;
      y += Math.sin(angle) * coef.amplitude;

      // Draw circle
      if (showCircles) {
        ctx.strokeStyle = circleColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(prevX, prevY, coef.amplitude, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw arm
      if (showArms) {
        ctx.strokeStyle = armColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      // Draw center point
      ctx.fillStyle = armColor;
      ctx.beginPath();
      ctx.arc(prevX, prevY, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw endpoint
    ctx.fillStyle = pathColor;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();

    return { x, y };
  };

  // Main animation loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Generate shape and calculate DFT
    const shapePath = generateShapePath(shape, scaleSize);
    const coefficients = calculateDFT(shapePath);

    if (prefersReducedMotion) {
      // Draw static state
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      drawEpicycles(ctx, coefficients, 0, centerX, centerY);
      return;
    }

    const animate = () => {
      timeRef.current += 0.02 * rotationSpeed;

      // Clear canvas
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2 - scaleSize;
      const centerY = canvas.height / 2;

      // Draw epicycles
      const endpoint = drawEpicycles(ctx, coefficients, timeRef.current, centerX, centerY);

      // Store path point
      pathPointsRef.current.push({ x: endpoint.x, y: endpoint.y });
      if (pathPointsRef.current.length > trailLength) {
        pathPointsRef.current.shift();
      }

      // Draw traced path
      if (pathPointsRef.current.length > 1) {
        ctx.strokeStyle = pathColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(pathPointsRef.current[0].x, pathPointsRef.current[0].y);
        
        for (let i = 1; i < pathPointsRef.current.length; i++) {
          ctx.lineTo(pathPointsRef.current[i].x, pathPointsRef.current[i].y);
        }
        ctx.stroke();
      }

      // Reset when complete cycle
      if (timeRef.current >= Math.PI * 2) {
        timeRef.current = 0;
        pathPointsRef.current = [];
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    backgroundColor, circleColor, armColor, pathColor, shape, epicycleCount,
    rotationSpeed, scaleSize, showCircles, showArms, trailLength, prefersReducedMotion
  ]);

  const containerStyle = {
    width: '100%',
    height: '600px',
    backgroundColor,
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
    color: armColor,
    opacity: 0.5,
    textAlign: 'center',
    pointerEvents: 'none',
    fontWeight: '300'
  };

  return (
    <div style={containerStyle} className="fourier-epicycles">
      <canvas ref={canvasRef} style={canvasStyle} />
      
      <div style={infoStyle}>
        Fourier epicycles • {epicycleCount} rotating circles • Shape: {shape}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
