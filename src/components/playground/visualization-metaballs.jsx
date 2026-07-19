import React from "react";

const MANIFEST = {
  "type": "Visualization.Metaballs",
  "description": "Organic blob merging with marching squares isosurface rendering, smooth fluid dynamics",
  "editorElement": {
    "selector": ".metaballs",
    "displayName": "Metaballs",
    "archetype": "container",
    "data": {
      "blobCount": {
        "dataType": "select",
        "displayName": "Blob Count",
        "defaultValue": "8",
        "options": ["3", "5", "8", "10", "12", "15"],
        "group": "Content",
        "description": "Number of organic blobs"
      },
      "blobSpeed": {
        "dataType": "select",
        "displayName": "Blob Speed",
        "defaultValue": "0.5",
        "options": ["0.2", "0.3", "0.5", "0.7", "1.0"],
        "group": "Animation",
        "description": "Movement speed multiplier"
      },
      "threshold": {
        "dataType": "select",
        "displayName": "Merge Threshold",
        "defaultValue": "1.0",
        "options": ["0.5", "0.7", "1.0", "1.3", "1.5"],
        "group": "Animation",
        "description": "Blob merging sensitivity"
      },
      "showField": {
        "dataType": "booleanValue",
        "displayName": "Show Field",
        "defaultValue": false,
        "group": "Content",
        "description": "Visualize metaball field"
      },
      "showInfo": {
        "dataType": "booleanValue",
        "displayName": "Show Info",
        "defaultValue": true,
        "group": "Content",
        "description": "Display technical metrics"
      },
      "resolution": {
        "dataType": "select",
        "displayName": "Resolution",
        "defaultValue": "20",
        "options": ["10", "15", "20", "25", "30"],
        "group": "Layout",
        "description": "Marching squares grid density"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Primary background"
      },
      "blobColor": {
        "dataType": "color",
        "displayName": "Blob Color",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "Blob fill color"
      },
      "outlineColor": {
        "dataType": "color",
        "displayName": "Outline Color",
        "defaultValue": "#495057",
        "group": "Colors",
        "description": "Blob edge color"
      },
      "fieldColor": {
        "dataType": "color",
        "displayName": "Field Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors",
        "description": "Field visualization color"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#495057",
        "group": "Colors",
        "description": "UI text color"
      },
      "lineWidth": {
        "dataType": "select",
        "displayName": "Outline Width",
        "defaultValue": "2",
        "options": ["1", "1.5", "2", "2.5", "3"],
        "group": "Layout",
        "description": "Blob outline thickness"
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
        "description": "Info text weight"
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
  const blobsRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  
  // Safe config access
  const blobCount = parseInt(config?.blobCount || '8');
  const blobSpeed = parseFloat(config?.blobSpeed || '0.5');
  const threshold = parseFloat(config?.threshold || '1.0');
  const showField = config?.showField === true;
  const showInfo = config?.showInfo !== false;
  const resolution = parseInt(config?.resolution || '20');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const blobColor = config?.blobColor || '#212529';
  const outlineColor = config?.outlineColor || '#495057';
  const fieldColor = config?.fieldColor || '#E9ECEF';
  const textColor = config?.textColor || '#495057';
  const lineWidth = parseFloat(config?.lineWidth || '2');
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  // Initialize blobs
  const initializeBlobs = (width, height) => {
    const blobs = [];
    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2 * blobSpeed,
        vy: (Math.random() - 0.5) * 2 * blobSpeed,
        radius: 40 + Math.random() * 60
      });
    }
    return blobs;
  };
  
  // Update blob positions
  const updateBlobs = (blobs, width, height) => {
    blobs.forEach(blob => {
      blob.x += blob.vx;
      blob.y += blob.vy;
      
      // Bounce off walls
      if (blob.x - blob.radius < 0 || blob.x + blob.radius > width) {
        blob.vx *= -1;
        blob.x = Math.max(blob.radius, Math.min(width - blob.radius, blob.x));
      }
      if (blob.y - blob.radius < 0 || blob.y + blob.radius > height) {
        blob.vy *= -1;
        blob.y = Math.max(blob.radius, Math.min(height - blob.radius, blob.y));
      }
    });
  };
  
  // Calculate metaball field value at point
  const getFieldValue = (x, y, blobs) => {
    let sum = 0;
    blobs.forEach(blob => {
      const dx = x - blob.x;
      const dy = y - blob.y;
      const distSq = dx * dx + dy * dy;
      if (distSq > 0) {
        sum += (blob.radius * blob.radius) / distSq;
      }
    });
    return sum;
  };
  
  // Marching squares lookup table
  const getMarchingSquaresLines = (a, b, c, d, threshold) => {
    const state = (a > threshold ? 8 : 0) |
                  (b > threshold ? 4 : 0) |
                  (c > threshold ? 2 : 0) |
                  (d > threshold ? 1 : 0);
    
    // Linear interpolation for edge positions
    const lerp = (v1, v2, threshold, val1, val2) => {
      if (Math.abs(val2 - val1) < 0.00001) return 0.5;
      return (threshold - val1) / (val2 - val1);
    };
    
    const lines = [];
    
    switch(state) {
      case 1: lines.push([[0.5, 1], [1, 0.5]]); break;
      case 2: lines.push([[0, 0.5], [0.5, 1]]); break;
      case 3: lines.push([[0, 0.5], [1, 0.5]]); break;
      case 4: lines.push([[0.5, 0], [1, 0.5]]); break;
      case 5: lines.push([[0.5, 0], [0.5, 1]]); break;
      case 6: lines.push([[0, 0.5], [0.5, 0]], [[0.5, 1], [1, 0.5]]); break;
      case 7: lines.push([[0, 0.5], [0.5, 0]]); break;
      case 8: lines.push([[0, 0.5], [0.5, 0]]); break;
      case 9: lines.push([[0.5, 1], [0.5, 0]], [[0, 0.5], [1, 0.5]]); break;
      case 10: lines.push([[0.5, 0], [0.5, 1]]); break;
      case 11: lines.push([[0.5, 0], [1, 0.5]]); break;
      case 12: lines.push([[0, 0.5], [1, 0.5]]); break;
      case 13: lines.push([[0, 0.5], [0.5, 1]]); break;
      case 14: lines.push([[0.5, 1], [1, 0.5]]); break;
    }
    
    return lines;
  };
  
  // Render function
  const render = (canvas, blobs) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    const cellSize = resolution;
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);
    
    // Calculate field
    const field = [];
    for (let j = 0; j <= rows; j++) {
      field[j] = [];
      for (let i = 0; i <= cols; i++) {
        const x = i * cellSize;
        const y = j * cellSize;
        field[j][i] = getFieldValue(x, y, blobs);
      }
    }
    
    // Draw field visualization if enabled
    if (showField) {
      ctx.fillStyle = fieldColor;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const value = field[j][i];
          const alpha = Math.min(value / threshold, 1) * 0.3;
          ctx.globalAlpha = alpha;
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
      ctx.globalAlpha = 1;
    }
    
    // Draw metaball contours using marching squares
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // First pass: draw outlines
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = i * cellSize;
        const y = j * cellSize;
        
        const a = field[j][i];
        const b = field[j][i + 1];
        const c = field[j + 1][i + 1];
        const d = field[j + 1][i];
        
        const lines = getMarchingSquaresLines(a, b, c, d, threshold);
        
        lines.forEach(line => {
          const x1 = x + line[0][0] * cellSize;
          const y1 = y + line[0][1] * cellSize;
          const x2 = x + line[1][0] * cellSize;
          const y2 = y + line[1][1] * cellSize;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      }
    }
    
    // Second pass: fill blob areas
    ctx.fillStyle = blobColor;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = i * cellSize;
        const y = j * cellSize;
        const centerValue = getFieldValue(x + cellSize/2, y + cellSize/2, blobs);
        
        if (centerValue > threshold) {
          ctx.globalAlpha = 0.15;
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }
    ctx.globalAlpha = 1;
  };
  
  // Animation loop
  const animate = () => {
    if (isPausedRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    updateBlobs(blobsRef.current, canvas.width, canvas.height);
    render(canvas, blobsRef.current);
    
    animationRef.current = requestAnimationFrame(animate);
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
      blobsRef.current = initializeBlobs(canvas.width, canvas.height);
      render(canvas, blobsRef.current);
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
        blobsRef.current = initializeBlobs(rect.width, rect.height);
      }
    };
    
    updateSize();
    
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    
    animate();
    
    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [blobCount, blobSpeed, threshold, resolution]);
  
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
        fontFamily: 'system-ui, -apple-system, sans-serif',
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
      className="metaballs" 
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        position: 'relative',
        backgroundColor,
        overflow: 'hidden'
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
            border: `1px solid ${outlineColor}`,
            borderRadius: '6px',
            color: textColor,
            fontFamily: 'system-ui, -apple-system, sans-serif',
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
            border: `1px solid ${outlineColor}`,
            borderRadius: '6px',
            color: textColor,
            fontFamily: 'system-ui, -apple-system, sans-serif',
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
          border: `1px solid ${outlineColor}`,
          borderRadius: '6px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: `${fontSize}px`,
          fontWeight,
          color: textColor,
          lineHeight: 1.6
        }}>
          <div>BLOBS: {blobCount}</div>
          <div>THRESHOLD: {threshold}</div>
          <div>RESOLUTION: {resolution}px</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
