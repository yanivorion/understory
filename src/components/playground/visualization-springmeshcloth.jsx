import React from "react";

const MANIFEST = {
  "type": "Visualization.SpringMeshCloth",
  "description": "Physics-based cloth simulation with Verlet integration, interactive spring network",
  "editorElement": {
    "selector": ".spring-mesh-cloth",
    "displayName": "Spring Mesh Cloth",
    "archetype": "container",
    "data": {
      "gridWidth": {
        "dataType": "select",
        "displayName": "Grid Width",
        "defaultValue": "30",
        "options": ["15", "20", "25", "30", "35", "40"],
        "group": "Content",
        "description": "Number of horizontal points"
      },
      "gridHeight": {
        "dataType": "select",
        "displayName": "Grid Height",
        "defaultValue": "20",
        "options": ["10", "15", "20", "25", "30"],
        "group": "Content",
        "description": "Number of vertical points"
      },
      "gravity": {
        "dataType": "select",
        "displayName": "Gravity",
        "defaultValue": "0.5",
        "options": ["0", "0.2", "0.5", "0.8", "1.0", "1.5"],
        "group": "Animation",
        "description": "Downward force strength"
      },
      "stiffness": {
        "dataType": "select",
        "displayName": "Spring Stiffness",
        "defaultValue": "0.95",
        "options": ["0.85", "0.9", "0.95", "0.97", "0.99"],
        "group": "Animation",
        "description": "Cloth rigidity (higher = stiffer)"
      },
      "damping": {
        "dataType": "select",
        "displayName": "Damping",
        "defaultValue": "0.98",
        "options": ["0.9", "0.94", "0.98", "0.99"],
        "group": "Animation",
        "description": "Motion dampening (lower = more bouncy)"
      },
      "showPoints": {
        "dataType": "booleanValue",
        "displayName": "Show Points",
        "defaultValue": true,
        "group": "Content",
        "description": "Display mesh points"
      },
      "showFill": {
        "dataType": "booleanValue",
        "displayName": "Show Fill",
        "defaultValue": true,
        "group": "Content",
        "description": "Fill cloth surface"
      },
      "showInfo": {
        "dataType": "booleanValue",
        "displayName": "Show Info",
        "defaultValue": true,
        "group": "Content",
        "description": "Display metrics"
      },
      "interactive": {
        "dataType": "booleanValue",
        "displayName": "Interactive Mode",
        "defaultValue": true,
        "group": "Content",
        "description": "Enable mouse dragging"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Background"
      },
      "meshColor": {
        "dataType": "color",
        "displayName": "Mesh Line Color",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "Spring connections"
      },
      "pointColor": {
        "dataType": "color",
        "displayName": "Point Color",
        "defaultValue": "#495057",
        "group": "Colors",
        "description": "Mesh points"
      },
      "pinColor": {
        "dataType": "color",
        "displayName": "Pin Color",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "Pinned points"
      },
      "fillColor": {
        "dataType": "color",
        "displayName": "Cloth Fill Color",
        "defaultValue": "#F1F3F5",
        "group": "Colors",
        "description": "Surface fill"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#495057",
        "group": "Colors",
        "description": "Info text"
      },
      "lineWidth": {
        "dataType": "select",
        "displayName": "Line Width",
        "defaultValue": "1",
        "options": ["0.5", "1", "1.5", "2"],
        "group": "Layout",
        "description": "Mesh line thickness"
      },
      "pointRadius": {
        "dataType": "select",
        "displayName": "Point Size",
        "defaultValue": "2",
        "options": ["1", "2", "3", "4"],
        "group": "Layout",
        "description": "Point dot size"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size",
        "defaultValue": 12,
        "group": "Typography",
        "description": "Info text size"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography",
        "description": "Text weight"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const pointsRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const draggedPointRef = React.useRef(null);
  
  // Safe config access
  const gridWidth = parseInt(config?.gridWidth || '30');
  const gridHeight = parseInt(config?.gridHeight || '20');
  const gravity = parseFloat(config?.gravity || '0.5');
  const stiffness = parseFloat(config?.stiffness || '0.95');
  const damping = parseFloat(config?.damping || '0.98');
  const showPoints = config?.showPoints !== false;
  const showFill = config?.showFill !== false;
  const showInfo = config?.showInfo !== false;
  const interactive = config?.interactive !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const meshColor = config?.meshColor || '#212529';
  const pointColor = config?.pointColor || '#495057';
  const pinColor = config?.pinColor || '#212529';
  const fillColor = config?.fillColor || '#F1F3F5';
  const textColor = config?.textColor || '#495057';
  const lineWidth = parseFloat(config?.lineWidth || '1');
  const pointRadius = parseFloat(config?.pointRadius || '2');
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  // Initialize cloth mesh
  const initializeMesh = (width, height) => {
    const points = [];
    const spacing = Math.min(width, height) * 0.8 / Math.max(gridWidth, gridHeight);
    const offsetX = (width - spacing * gridWidth) / 2;
    const offsetY = 50;
    
    for (let y = 0; y <= gridHeight; y++) {
      for (let x = 0; x <= gridWidth; x++) {
        const point = {
          x: offsetX + x * spacing,
          y: offsetY + y * spacing,
          oldX: offsetX + x * spacing,
          oldY: offsetY + y * spacing,
          pinned: y === 0 // Pin top row
        };
        points.push(point);
      }
    }
    
    return points;
  };
  
  // Get point index
  const getIndex = (x, y) => {
    return y * (gridWidth + 1) + x;
  };
  
  // Update physics (Verlet integration)
  const updatePhysics = (points, width, height) => {
    // Apply forces
    points.forEach(point => {
      if (point.pinned) return;
      
      // Store velocity (Verlet)
      const vx = (point.x - point.oldX) * damping;
      const vy = (point.y - point.oldY) * damping;
      
      point.oldX = point.x;
      point.oldY = point.y;
      
      // Apply gravity
      point.x += vx;
      point.y += vy + gravity;
      
      // Constrain to bounds
      if (point.y > height - 20) {
        point.y = height - 20;
        point.oldY = point.y;
      }
    });
    
    // Constraint solving (spring connections)
    const iterations = 5;
    for (let iter = 0; iter < iterations; iter++) {
      for (let y = 0; y <= gridHeight; y++) {
        for (let x = 0; x <= gridWidth; x++) {
          const idx = getIndex(x, y);
          const point = points[idx];
          
          // Right neighbor
          if (x < gridWidth) {
            const rightIdx = getIndex(x + 1, y);
            const right = points[rightIdx];
            const spacing = Math.abs(points[1].oldX - points[0].oldX);
            satisfyConstraint(point, right, spacing);
          }
          
          // Bottom neighbor
          if (y < gridHeight) {
            const bottomIdx = getIndex(x, y + 1);
            const bottom = points[bottomIdx];
            const spacing = Math.abs(points[gridWidth + 1].oldY - points[0].oldY);
            satisfyConstraint(point, bottom, spacing);
          }
        }
      }
    }
  };
  
  // Satisfy distance constraint
  const satisfyConstraint = (p1, p2, targetDist) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist === 0) return;
    
    const diff = (targetDist - dist) / dist;
    const offsetX = dx * diff * 0.5 * stiffness;
    const offsetY = dy * diff * 0.5 * stiffness;
    
    if (!p1.pinned) {
      p1.x -= offsetX;
      p1.y -= offsetY;
    }
    if (!p2.pinned) {
      p2.x += offsetX;
      p2.y += offsetY;
    }
  };
  
  // Render
  const render = (canvas, points) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Draw fill
    if (showFill) {
      ctx.fillStyle = fillColor;
      ctx.globalAlpha = 0.6;
      
      for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
          const idx1 = getIndex(x, y);
          const idx2 = getIndex(x + 1, y);
          const idx3 = getIndex(x + 1, y + 1);
          const idx4 = getIndex(x, y + 1);
          
          ctx.beginPath();
          ctx.moveTo(points[idx1].x, points[idx1].y);
          ctx.lineTo(points[idx2].x, points[idx2].y);
          ctx.lineTo(points[idx3].x, points[idx3].y);
          ctx.lineTo(points[idx4].x, points[idx4].y);
          ctx.closePath();
          ctx.fill();
        }
      }
      
      ctx.globalAlpha = 1;
    }
    
    // Draw mesh lines
    ctx.strokeStyle = meshColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    
    // Horizontal lines
    for (let y = 0; y <= gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const idx1 = getIndex(x, y);
        const idx2 = getIndex(x + 1, y);
        ctx.moveTo(points[idx1].x, points[idx1].y);
        ctx.lineTo(points[idx2].x, points[idx2].y);
      }
    }
    
    // Vertical lines
    for (let x = 0; x <= gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        const idx1 = getIndex(x, y);
        const idx2 = getIndex(x, y + 1);
        ctx.moveTo(points[idx1].x, points[idx1].y);
        ctx.lineTo(points[idx2].x, points[idx2].y);
      }
    }
    
    ctx.stroke();
    
    // Draw points
    if (showPoints) {
      points.forEach(point => {
        ctx.fillStyle = point.pinned ? pinColor : pointColor;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.pinned ? pointRadius * 1.5 : pointRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  };
  
  // Animation loop
  const animate = () => {
    if (isPausedRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    updatePhysics(pointsRef.current, canvas.width, canvas.height);
    render(canvas, pointsRef.current);
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Mouse handling
  const handleMouseDown = (e) => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Find closest point
    let closest = null;
    let minDist = 20;
    
    pointsRef.current.forEach(point => {
      const dx = point.x - mouseX;
      const dy = point.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < minDist) {
        minDist = dist;
        closest = point;
      }
    });
    
    if (closest) {
      draggedPointRef.current = closest;
    }
  };
  
  const handleMouseMove = (e) => {
    if (!interactive || !draggedPointRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    draggedPointRef.current.x = mouseX;
    draggedPointRef.current.y = mouseY;
    draggedPointRef.current.oldX = mouseX;
    draggedPointRef.current.oldY = mouseY;
  };
  
  const handleMouseUp = () => {
    draggedPointRef.current = null;
  };
  
  // Toggle pause
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) {
      animate();
    }
  };
  
  // Reset
  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      pointsRef.current = initializeMesh(canvas.width, canvas.height);
      render(canvas, pointsRef.current);
    }
  };
  
  // Initialize
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        pointsRef.current = initializeMesh(rect.width, rect.height);
      }
    };
    
    updateSize();
    
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    
    // Mouse events
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    animate();
    
    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gridWidth, gridHeight, gravity, stiffness, damping]);
  
  // prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  if (prefersReducedMotion) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        color: textColor,
        fontFamily: 'ui-monospace, monospace',
        fontSize: `${fontSize}px`,
        fontWeight
      }}>
        Animation disabled (reduced motion preference detected)
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className="spring-mesh-cloth" 
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        position: 'relative',
        backgroundColor,
        overflow: 'hidden',
        cursor: interactive ? 'grab' : 'default'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
      
      {/* Controls */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={togglePause}
          style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: `1px solid ${meshColor}`,
            borderRadius: '6px',
            color: textColor,
            fontFamily: 'ui-monospace, monospace',
            fontSize: `${fontSize}px`,
            fontWeight,
            cursor: 'pointer',
            transition: 'all 200ms ease-out'
          }}
        >
          {isPausedRef.current ? 'PLAY' : 'PAUSE'}
        </button>
        
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: `1px solid ${meshColor}`,
            borderRadius: '6px',
            color: textColor,
            fontFamily: 'ui-monospace, monospace',
            fontSize: `${fontSize}px`,
            fontWeight,
            cursor: 'pointer',
            transition: 'all 200ms ease-out'
          }}
        >
          RESET
        </button>
      </div>
      
      {/* Info */}
      {showInfo && (
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          padding: '12px 16px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: `1px solid ${meshColor}`,
          borderRadius: '6px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: `${fontSize}px`,
          fontWeight,
          color: textColor,
          lineHeight: 1.6
        }}>
          <div>POINTS: {(gridWidth + 1) * (gridHeight + 1)}</div>
          <div>GRAVITY: {gravity}</div>
          <div>STIFFNESS: {stiffness}</div>
          {interactive && <div>DRAG TO INTERACT</div>}
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
