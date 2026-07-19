import React from "react";

const MANIFEST = {
  "type": "Visualization.MandelbrotDeepZoom",
  "description": "Interactive Mandelbrot set fractal explorer with deep zoom and monochromatic gradients",
  "editorElement": {
    "selector": ".mandelbrot-zoom",
    "displayName": "Mandelbrot Deep Zoom",
    "archetype": "container",
    "data": {
      "maxIterations": {
        "dataType": "select",
        "displayName": "Max Iterations",
        "defaultValue": "256",
        "options": ["64", "128", "256", "512", "1024"],
        "group": "Content",
        "description": "Higher = more detail but slower rendering"
      },
      "zoomSpeed": {
        "dataType": "select",
        "displayName": "Zoom Speed",
        "defaultValue": "2",
        "options": ["1.5", "2", "3", "5"],
        "group": "Content",
        "description": "Zoom multiplier per click"
      },
      "smoothColoring": {
        "dataType": "booleanValue",
        "displayName": "Smooth Coloring",
        "defaultValue": true,
        "group": "Content",
        "description": "Continuous color gradients vs banding"
      },
      "supersampling": {
        "dataType": "select",
        "displayName": "Anti-Aliasing",
        "defaultValue": "1",
        "options": ["1", "2", "4"],
        "group": "Content",
        "description": "Higher = smoother but slower (1=off, 2=2x2, 4=4x4)"
      },
      "autoZoom": {
        "dataType": "booleanValue",
        "displayName": "Auto Zoom Animation",
        "defaultValue": false,
        "group": "Content",
        "description": "Continuous zoom into interesting location"
      },
      "showCoordinates": {
        "dataType": "booleanValue",
        "displayName": "Show Coordinates",
        "defaultValue": true,
        "group": "Content"
      },
      "showControls": {
        "dataType": "booleanValue",
        "displayName": "Show Controls",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background (Max Iterations)",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Color for points outside set"
      },
      "setColor": {
        "dataType": "color",
        "displayName": "Set Interior",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "Color for points in the set"
      },
      "gradient1": {
        "dataType": "color",
        "displayName": "Gradient Stop 1",
        "defaultValue": "#F1F3F5",
        "group": "Colors"
      },
      "gradient2": {
        "dataType": "color",
        "displayName": "Gradient Stop 2",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "gradient3": {
        "dataType": "color",
        "displayName": "Gradient Stop 3",
        "defaultValue": "#DEE2E6",
        "group": "Colors"
      },
      "gradient4": {
        "dataType": "color",
        "displayName": "Gradient Stop 4",
        "defaultValue": "#CED4DA",
        "group": "Colors"
      },
      "gradient5": {
        "dataType": "color",
        "displayName": "Gradient Stop 5",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "gradient6": {
        "dataType": "color",
        "displayName": "Gradient Stop 6",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "renderQuality": {
        "dataType": "select",
        "displayName": "Render Quality",
        "defaultValue": "high",
        "options": ["draft", "medium", "high", "ultra"],
        "group": "Layout",
        "description": "Draft=fast preview, Ultra=slow but beautiful"
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
  const animationRef = React.useRef(null);
  const isDraggingRef = React.useRef(false);
  const lastPosRef = React.useRef({ x: 0, y: 0 });
  const renderTimeoutRef = React.useRef(null);
  
  // Safe config access
  const maxIterations = parseInt(config?.maxIterations || '256');
  const zoomSpeed = parseFloat(config?.zoomSpeed || '2');
  const smoothColoring = config?.smoothColoring !== false;
  const supersampling = parseInt(config?.supersampling || '1');
  const autoZoom = config?.autoZoom === true;
  const showCoordinates = config?.showCoordinates !== false;
  const showControls = config?.showControls !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const setColor = config?.setColor || '#212529';
  const gradient1 = config?.gradient1 || '#F1F3F5';
  const gradient2 = config?.gradient2 || '#E9ECEF';
  const gradient3 = config?.gradient3 || '#DEE2E6';
  const gradient4 = config?.gradient4 || '#CED4DA';
  const gradient5 = config?.gradient5 || '#495057';
  const gradient6 = config?.gradient6 || '#6C757D';
  const renderQuality = config?.renderQuality || 'high';
  
  // Viewport state (in refs for smooth updates)
  const viewportRef = React.useRef({
    centerX: -0.5,
    centerY: 0,
    width: 3.5,
    height: 2
  });
  
  const [isRendering, setIsRendering] = React.useState(false);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [renderProgress, setRenderProgress] = React.useState(0);
  
  // Color palette
  const colorPaletteRef = React.useRef([]);
  
  // Build color palette from config
  React.useEffect(() => {
    const colors = [
      setColor,
      gradient5,
      gradient4,
      gradient3,
      gradient2,
      gradient1,
      backgroundColor
    ];
    
    const palette = [];
    const steps = 256;
    
    for (let i = 0; i < steps; i++) {
      const position = i / steps;
      const segmentCount = colors.length - 1;
      const segment = Math.floor(position * segmentCount);
      const segmentPos = (position * segmentCount) - segment;
      
      const color1 = hexToRgb(colors[segment]);
      const color2 = hexToRgb(colors[Math.min(segment + 1, colors.length - 1)]);
      
      const r = Math.round(color1.r + (color2.r - color1.r) * segmentPos);
      const g = Math.round(color1.g + (color2.g - color1.g) * segmentPos);
      const b = Math.round(color1.b + (color2.b - color1.b) * segmentPos);
      
      palette.push({ r, g, b });
    }
    
    colorPaletteRef.current = palette;
  }, [setColor, gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, backgroundColor]);
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  // Mandelbrot iteration with smooth coloring
  const mandelbrot = (cx, cy, maxIter) => {
    let x = 0;
    let y = 0;
    let xx = 0;
    let yy = 0;
    let iter = 0;
    
    while (iter < maxIter && xx + yy <= 4) {
      y = 2 * x * y + cy;
      x = xx - yy + cx;
      xx = x * x;
      yy = y * y;
      iter++;
    }
    
    if (iter === maxIter) {
      return maxIter;
    }
    
    if (smoothColoring) {
      const log_zn = Math.log(xx + yy) / 2;
      const nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
      return iter + 1 - nu;
    }
    
    return iter;
  };
  
  // Get color for iteration count
  const getColor = (iterations) => {
    if (iterations >= maxIterations) {
      return hexToRgb(setColor);
    }
    
    const paletteSize = colorPaletteRef.current.length;
    const index = Math.floor((iterations / maxIterations) * paletteSize);
    const clampedIndex = Math.max(0, Math.min(paletteSize - 1, index));
    
    return colorPaletteRef.current[clampedIndex];
  };
  
  // Render the fractal
  const render = async (canvas, progressive = true) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    if (width === 0 || height === 0) return;
    
    const viewport = viewportRef.current;
    
    setIsRendering(true);
    setRenderProgress(0);
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Quality settings
    const qualityMap = {
      draft: { passes: 1, blockSize: 4 },
      medium: { passes: 2, blockSize: 2 },
      high: { passes: 3, blockSize: 1 },
      ultra: { passes: 4, blockSize: 1 }
    };
    
    const quality = qualityMap[renderQuality] || qualityMap.high;
    
    // Progressive rendering
    for (let pass = 0; pass < quality.passes; pass++) {
      const blockSize = Math.max(1, quality.blockSize * Math.pow(2, quality.passes - pass - 1));
      
      for (let py = 0; py < height; py += blockSize) {
        for (let px = 0; px < width; px += blockSize) {
          
          // Supersampling for anti-aliasing
          let totalIter = 0;
          const samples = supersampling * supersampling;
          
          for (let sy = 0; sy < supersampling; sy++) {
            for (let sx = 0; sx < supersampling; sx++) {
              const sampleX = px + (sx + 0.5) / supersampling;
              const sampleY = py + (sy + 0.5) / supersampling;
              
              const cx = viewport.centerX + (sampleX / width - 0.5) * viewport.width;
              const cy = viewport.centerY + (sampleY / height - 0.5) * viewport.height;
              
              totalIter += mandelbrot(cx, cy, maxIterations);
            }
          }
          
          const avgIter = totalIter / samples;
          const color = getColor(avgIter);
          
          // Fill block
          for (let by = 0; by < blockSize && py + by < height; by++) {
            for (let bx = 0; bx < blockSize && px + bx < width; bx++) {
              const index = ((py + by) * width + (px + bx)) * 4;
              data[index] = color.r;
              data[index + 1] = color.g;
              data[index + 2] = color.b;
              data[index + 3] = 255;
            }
          }
        }
        
        // Update progress
        if (py % 10 === 0) {
          const progress = ((pass / quality.passes) + (py / height) / quality.passes) * 100;
          setRenderProgress(Math.round(progress));
          
          // Update canvas incrementally for progressive feel
          if (progressive && pass < quality.passes - 1) {
            ctx.putImageData(imageData, 0, 0);
            await new Promise(resolve => setTimeout(resolve, 0));
          }
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    setIsRendering(false);
    setRenderProgress(100);
  };
  
  // Zoom to point
  const zoomTo = (clientX, clientY, zoomIn = true) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const viewport = viewportRef.current;
    
    // Convert pixel to complex plane
    const cx = viewport.centerX + (x / canvas.width - 0.5) * viewport.width;
    const cy = viewport.centerY + (y / canvas.height - 0.5) * viewport.height;
    
    // Zoom
    const factor = zoomIn ? zoomSpeed : (1 / zoomSpeed);
    viewport.width /= factor;
    viewport.height /= factor;
    
    // Recenter on click point
    viewport.centerX = cx;
    viewport.centerY = cy;
    
    setZoomLevel(prev => zoomIn ? prev * factor : prev / factor);
    
    render(canvas, true);
  };
  
  // Pan
  const pan = (dx, dy) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const viewport = viewportRef.current;
    
    viewport.centerX -= (dx / canvas.width) * viewport.width;
    viewport.centerY -= (dy / canvas.height) * viewport.height;
    
    render(canvas, false);
  };
  
  // Reset view
  const reset = () => {
    viewportRef.current = {
      centerX: -0.5,
      centerY: 0,
      width: 3.5,
      height: 2
    };
    setZoomLevel(1);
    
    const canvas = canvasRef.current;
    if (canvas) render(canvas, true);
  };
  
  // Auto zoom animation
  React.useEffect(() => {
    if (!autoZoom) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let animating = true;
    
    const animate = async () => {
      if (!animating) return;
      
      // Zoom towards interesting point
      const interestingPoints = [
        { x: -0.7269, y: 0.1889 },
        { x: -0.8, y: 0.156 },
        { x: -0.7453, y: 0.1127 },
        { x: 0.285, y: 0.01 }
      ];
      
      const target = interestingPoints[Math.floor(Math.random() * interestingPoints.length)];
      
      const viewport = viewportRef.current;
      viewport.centerX += (target.x - viewport.centerX) * 0.1;
      viewport.centerY += (target.y - viewport.centerY) * 0.1;
      viewport.width *= 0.95;
      viewport.height *= 0.95;
      
      setZoomLevel(prev => prev * 1.05);
      
      await render(canvas, false);
      
      setTimeout(() => animate(), 100);
    };
    
    animate();
    
    return () => {
      animating = false;
    };
  }, [autoZoom, maxIterations, smoothColoring]);
  
  // Mouse handlers
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    
    pan(-dx, -dy);
  };
  
  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };
  
  const handleClick = (e) => {
    if (isDraggingRef.current) return;
    
    const zoomIn = !e.shiftKey;
    zoomTo(e.clientX, e.clientY, zoomIn);
  };
  
  // Initialize and handle resize
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      if (width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;
        
        // Maintain aspect ratio in viewport
        viewportRef.current.height = viewportRef.current.width * (height / width);
        
        // Clear any pending render
        if (renderTimeoutRef.current) {
          clearTimeout(renderTimeoutRef.current);
        }
        
        // Debounce render on resize
        renderTimeoutRef.current = setTimeout(() => {
          render(canvas, true);
        }, 100);
      }
    };
    
    // Initial render
    updateSize();
    
    // Use ResizeObserver for better resize handling
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    
    return () => {
      resizeObserver.disconnect();
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
  }, [maxIterations, smoothColoring, supersampling, renderQuality, 
      setColor, gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, backgroundColor]);
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  if (prefersReducedMotion && autoZoom) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        color: setColor,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px'
      }}>
        Auto-zoom disabled (reduced motion preference detected)
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className="mandelbrot-zoom" 
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        position: 'relative',
        backgroundColor,
        overflow: 'hidden',
        cursor: isDraggingRef.current ? 'grabbing' : 'crosshair'
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated'
        }}
      />
      
      {showCoordinates && (
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
          color: '#212529',
          lineHeight: '1.6',
          pointerEvents: 'none'
        }}>
          <div>Center: {viewportRef.current.centerX.toFixed(10)}, {viewportRef.current.centerY.toFixed(10)}</div>
          <div>Zoom: {zoomLevel.toFixed(2)}x</div>
          <div>Width: {viewportRef.current.width.toExponential(4)}</div>
          {isRendering && <div>Rendering: {renderProgress}%</div>}
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
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '90%'
        }}>
          <button
            onClick={reset}
            disabled={isRendering}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '500',
              color: '#212529',
              backgroundColor: 'transparent',
              border: '1px solid #DEE2E6',
              borderRadius: '6px',
              cursor: isRendering ? 'not-allowed' : 'pointer',
              opacity: isRendering ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!isRendering) {
                e.target.style.backgroundColor = '#F8F9FA';
                e.target.style.borderColor = '#CED4DA';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#DEE2E6';
            }}
          >
            Reset View
          </button>
          
          <div style={{
            fontSize: '11px',
            color: '#6C757D',
            alignSelf: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center'
          }}>
            Click to zoom in • Shift+Click to zoom out • Drag to pan
          </div>
        </div>
      )}
      
      {isRendering && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px 32px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '14px',
          color: '#212529',
          fontWeight: '500',
          pointerEvents: 'none'
        }}>
          Rendering: {renderProgress}%
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
