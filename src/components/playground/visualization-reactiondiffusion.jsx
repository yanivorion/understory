import React from "react";

const MANIFEST = {
  "type": "Visualization.ReactionDiffusion",
  "description": "Gray-Scott reaction-diffusion system generating organic Turing patterns",
  "editorElement": {
    "selector": ".reaction-diffusion",
    "displayName": "Reaction-Diffusion",
    "archetype": "container",
    "data": {
      "pattern": {
        "dataType": "select",
        "displayName": "Pattern Preset",
        "defaultValue": "spots",
        "options": ["spots", "stripes", "coral", "waves", "mitosis", "custom"],
        "group": "Content",
        "description": "Pre-configured feed/kill parameters"
      },
      "feedRate": {
        "dataType": "select",
        "displayName": "Feed Rate (f)",
        "defaultValue": "0.055",
        "options": ["0.020", "0.030", "0.040", "0.055", "0.062", "0.070"],
        "group": "Content",
        "description": "Chemical A feed rate"
      },
      "killRate": {
        "dataType": "select",
        "displayName": "Kill Rate (k)",
        "defaultValue": "0.062",
        "options": ["0.050", "0.055", "0.060", "0.062", "0.065", "0.070"],
        "group": "Content",
        "description": "Chemical B kill rate"
      },
      "diffusionA": {
        "dataType": "select",
        "displayName": "Diffusion A",
        "defaultValue": "1.0",
        "options": ["0.5", "1.0", "1.5", "2.0"],
        "group": "Content",
        "description": "Diffusion rate of chemical A"
      },
      "diffusionB": {
        "dataType": "select",
        "displayName": "Diffusion B",
        "defaultValue": "0.5",
        "options": ["0.2", "0.3", "0.5", "0.7"],
        "group": "Content",
        "description": "Diffusion rate of chemical B"
      },
      "resolution": {
        "dataType": "select",
        "displayName": "Grid Resolution",
        "defaultValue": "128",
        "options": ["64", "128", "192", "256"],
        "group": "Content",
        "description": "Simulation grid size"
      },
      "speed": {
        "dataType": "select",
        "displayName": "Simulation Speed",
        "defaultValue": "1.0",
        "options": ["0.5", "1.0", "2.0", "3.0"],
        "group": "Content",
        "description": "Time step multiplier"
      },
      "showControls": {
        "dataType": "booleanValue",
        "displayName": "Show Controls",
        "defaultValue": true,
        "group": "Content"
      },
      "showInfo": {
        "dataType": "booleanValue",
        "displayName": "Show Parameters",
        "defaultValue": true,
        "group": "Content"
      },
      "colorLow": {
        "dataType": "color",
        "displayName": "Low Concentration",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "colorMid1": {
        "dataType": "color",
        "displayName": "Mid Low",
        "defaultValue": "#F5F5F4",
        "group": "Colors"
      },
      "colorMid2": {
        "dataType": "color",
        "displayName": "Mid",
        "defaultValue": "#78716C",
        "group": "Colors"
      },
      "colorMid3": {
        "dataType": "color",
        "displayName": "Mid High",
        "defaultValue": "#44403C",
        "group": "Colors"
      },
      "colorHigh": {
        "dataType": "color",
        "displayName": "High Concentration",
        "defaultValue": "#1C1917",
        "group": "Colors"
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
  const gridARef = React.useRef(null);
  const gridBRef = React.useRef(null);
  const gridNextARef = React.useRef(null);
  const gridNextBRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  
  // Safe config access
  const pattern = config?.pattern || 'spots';
  const feedRate = parseFloat(config?.feedRate || '0.055');
  const killRate = parseFloat(config?.killRate || '0.062');
  const diffusionA = parseFloat(config?.diffusionA || '1.0');
  const diffusionB = parseFloat(config?.diffusionB || '0.5');
  const resolution = parseInt(config?.resolution || '128');
  const speed = parseFloat(config?.speed || '1.0');
  const showControls = config?.showControls !== false;
  const showInfo = config?.showInfo !== false;
  const colorLow = config?.colorLow || '#FFFFFF';
  const colorMid1 = config?.colorMid1 || '#F5F5F4';
  const colorMid2 = config?.colorMid2 || '#78716C';
  const colorMid3 = config?.colorMid3 || '#44403C';
  const colorHigh = config?.colorHigh || '#1C1917';
  
  const [currentF, setCurrentF] = React.useState(feedRate);
  const [currentK, setCurrentK] = React.useState(killRate);
  
  // Pattern presets
  const presets = {
    spots: { f: 0.055, k: 0.062 },
    stripes: { f: 0.035, k: 0.060 },
    coral: { f: 0.062, k: 0.061 },
    waves: { f: 0.014, k: 0.054 },
    mitosis: { f: 0.029, k: 0.057 },
    custom: { f: feedRate, k: killRate }
  };
  
  React.useEffect(() => {
    const preset = presets[pattern];
    if (preset) {
      setCurrentF(preset.f);
      setCurrentK(preset.k);
    }
  }, [pattern]);
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  // Initialize grids
  const initializeGrids = (size) => {
    const gridA = new Float32Array(size * size);
    const gridB = new Float32Array(size * size);
    
    gridA.fill(1);
    gridB.fill(0);
    
    const centerX = Math.floor(size / 2);
    const centerY = Math.floor(size / 2);
    const seedRadius = Math.floor(size / 8);
    
    for (let y = centerY - seedRadius; y < centerY + seedRadius; y++) {
      for (let x = centerX - seedRadius; x < centerX + seedRadius; x++) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
          const dx = x - centerX;
          const dy = y - centerY;
          if (dx * dx + dy * dy < seedRadius * seedRadius) {
            const index = y * size + x;
            gridB[index] = Math.random() > 0.5 ? 1 : 0;
          }
        }
      }
    }
    
    gridARef.current = gridA;
    gridBRef.current = gridB;
    gridNextARef.current = new Float32Array(size * size);
    gridNextBRef.current = new Float32Array(size * size);
  };
  
  // Laplacian operator
  const laplacian = (grid, x, y, size) => {
    const center = -1;
    const adjacent = 0.2;
    const diagonal = 0.05;
    
    const wrap = (val, max) => (val + max) % max;
    
    const c = grid[y * size + x];
    const n = grid[wrap(y - 1, size) * size + x];
    const s = grid[wrap(y + 1, size) * size + x];
    const e = grid[y * size + wrap(x + 1, size)];
    const w = grid[y * size + wrap(x - 1, size)];
    const ne = grid[wrap(y - 1, size) * size + wrap(x + 1, size)];
    const nw = grid[wrap(y - 1, size) * size + wrap(x - 1, size)];
    const se = grid[wrap(y + 1, size) * size + wrap(x + 1, size)];
    const sw = grid[wrap(y + 1, size) * size + wrap(x - 1, size)];
    
    return adjacent * (n + s + e + w) + diagonal * (ne + nw + se + sw) + center * c;
  };
  
  // Gray-Scott simulation
  const simulate = (size, f, k, dA, dB, dt) => {
    const gridA = gridARef.current;
    const gridB = gridBRef.current;
    const nextA = gridNextARef.current;
    const nextB = gridNextBRef.current;
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const index = y * size + x;
        const a = gridA[index];
        const b = gridB[index];
        
        const lapA = laplacian(gridA, x, y, size);
        const lapB = laplacian(gridB, x, y, size);
        
        const reaction = a * b * b;
        
        nextA[index] = a + (dA * lapA - reaction + f * (1 - a)) * dt;
        nextB[index] = b + (dB * lapB + reaction - (k + f) * b) * dt;
        
        nextA[index] = Math.max(0, Math.min(1, nextA[index]));
        nextB[index] = Math.max(0, Math.min(1, nextB[index]));
      }
    }
    
    gridARef.current = nextA;
    gridBRef.current = nextB;
    gridNextARef.current = gridA;
    gridNextBRef.current = gridB;
  };
  
  // Render
  const render = (canvas, size) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    
    const gridB = gridBRef.current;
    
    const colors = [
      hexToRgb(colorLow),
      hexToRgb(colorMid1),
      hexToRgb(colorMid2),
      hexToRgb(colorMid3),
      hexToRgb(colorHigh)
    ];
    
    for (let i = 0; i < size * size; i++) {
      const b = gridB[i];
      
      const colorPos = b * (colors.length - 1);
      const colorIndex = Math.floor(colorPos);
      const colorFrac = colorPos - colorIndex;
      
      const c1 = colors[Math.min(colorIndex, colors.length - 1)];
      const c2 = colors[Math.min(colorIndex + 1, colors.length - 1)];
      
      const r = c1.r + (c2.r - c1.r) * colorFrac;
      const g = c1.g + (c2.g - c1.g) * colorFrac;
      const b_color = c1.b + (c2.b - c1.b) * colorFrac;
      
      data[i * 4] = r;
      data[i * 4 + 1] = g;
      data[i * 4 + 2] = b_color;
      data[i * 4 + 3] = 255;
    }
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size;
    tempCanvas.height = size;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(imageData, 0, 0);
    
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
  };
  
  // Animation loop
  const animate = () => {
    if (isPausedRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const stepsPerFrame = Math.ceil(speed);
    for (let i = 0; i < stepsPerFrame; i++) {
      simulate(resolution, currentF, currentK, diffusionA, diffusionB, 1.0);
    }
    
    render(canvas, resolution);
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const reset = () => {
    initializeGrids(resolution);
    const canvas = canvasRef.current;
    if (canvas) render(canvas, resolution);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) {
      animate();
    }
  };
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      
      if (size > 0) {
        canvas.width = size;
        canvas.height = size;
      }
    };
    
    updateSize();
    
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    
    initializeGrids(resolution);
    render(canvas, resolution);
    animate();
    
    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resolution, currentF, currentK, diffusionA, diffusionB, speed, 
      colorLow, colorMid1, colorMid2, colorMid3, colorHigh]);
  
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
        backgroundColor: colorLow,
        color: colorHigh,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px'
      }}>
        Animation disabled (reduced motion preference detected)
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className="reaction-diffusion" 
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        position: 'relative',
        backgroundColor: colorLow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
          imageRendering: 'pixelated'
        }}
      />
      
      {showInfo && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '12px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '6px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
          fontSize: '11px',
          color: '#1C1917',
          lineHeight: '1.6'
        }}>
          <div>Pattern: {pattern}</div>
          <div>Feed (f): {currentF.toFixed(3)}</div>
          <div>Kill (k): {currentK.toFixed(3)}</div>
          <div>Grid: {resolution}×{resolution}</div>
        </div>
      )}
      
      {showControls && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          padding: '12px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <button
            onClick={togglePause}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '500',
              color: '#1C1917',
              backgroundColor: 'transparent',
              border: '1px solid #E7E5E4',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#FAFAF9';
              e.target.style.borderColor = '#D6D3D1';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#E7E5E4';
            }}
          >
            {isPausedRef.current ? 'Resume' : 'Pause'}
          </button>
          
          <button
            onClick={reset}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '500',
              color: '#1C1917',
              backgroundColor: 'transparent',
              border: '1px solid #E7E5E4',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#FAFAF9';
              e.target.style.borderColor = '#D6D3D1';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#E7E5E4';
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
