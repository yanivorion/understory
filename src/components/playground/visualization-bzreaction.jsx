import React from "react";

const MANIFEST = {"type": "Visualization.BZReaction", "description": "Belousov-Zhabotinsky reaction chemical spiral waves", "editorElement": {"selector": ".bz-reaction", "displayName": "BZ Reaction", "archetype": "container", "data": {"gridSize": {"dataType": "select", "displayName": "Grid Size", "defaultValue": "150", "options": ["100", "120", "150", "180", "200"], "group": "Content"}, "reactionSpeed": {"dataType": "select", "displayName": "Reaction Speed", "defaultValue": "1.0", "options": ["0.5", "0.7", "1.0", "1.3", "1.5"], "group": "Animation"}, "diffusionRate": {"dataType": "select", "displayName": "Diffusion Rate", "defaultValue": "0.2", "options": ["0.1", "0.2", "0.3", "0.4"], "group": "Animation"}, "showInfo": {"dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content"}, "backgroundColor": {"dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors"}, "activeColor": {"dataType": "color", "displayName": "Active State Color", "defaultValue": "#212529", "group": "Colors"}, "inactiveColor": {"dataType": "color", "displayName": "Inactive State Color", "defaultValue": "#E9ECEF", "group": "Colors"}, "textColor": {"dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors"}, "fontSize": {"dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography"}, "fontWeight": {"dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography"}}, "layout": {"resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical"}}};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const gridRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  
  const gridSize = parseInt(config?.gridSize || '150');
  const reactionSpeed = parseFloat(config?.reactionSpeed || '1.0');
  const diffusionRate = parseFloat(config?.diffusionRate || '0.2');
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const activeColor = config?.activeColor || '#212529';
  const inactiveColor = config?.inactiveColor || '#E9ECEF';
  const textColor = config?.textColor || '#495057';
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)} : {r: 0, g: 0, b: 0};
  };
  
  const initializeGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      grid[i] = [];
      for (let j = 0; j < gridSize; j++) {
        grid[i][j] = {a: Math.random(), b: Math.random()};
      }
    }
    const cx = Math.floor(gridSize / 2);
    const cy = Math.floor(gridSize / 2);
    for (let i = -5; i <= 5; i++) {
      for (let j = -5; j <= 5; j++) {
        if (cx + i >= 0 && cx + i < gridSize && cy + j >= 0 && cy + j < gridSize) {
          grid[cx + i][cy + j] = {a: 1, b: 0};
        }
      }
    }
    return grid;
  };
  
  const updateGrid = (grid) => {
    const newGrid = [];
    const dA = 1.0 * diffusionRate;
    const dB = 0.5 * diffusionRate;
    const f = 0.055 * reactionSpeed;
    const k = 0.062 * reactionSpeed;
    
    for (let i = 0; i < gridSize; i++) {
      newGrid[i] = [];
      for (let j = 0; j < gridSize; j++) {
        const a = grid[i][j].a;
        const b = grid[i][j].b;
        
        let laplaceA = 0;
        let laplaceB = 0;
        
        const neighbors = [
          [i-1,j], [i+1,j], [i,j-1], [i,j+1]
        ];
        
        neighbors.forEach(([ni, nj]) => {
          if (ni >= 0 && ni < gridSize && nj >= 0 && nj < gridSize) {
            laplaceA += grid[ni][nj].a - a;
            laplaceB += grid[ni][nj].b - b;
          }
        });
        
        const newA = a + (dA * laplaceA - a * b * b + f * (1 - a)) * 1.0;
        const newB = b + (dB * laplaceB + a * b * b - (k + f) * b) * 1.0;
        
        newGrid[i][j] = {
          a: Math.max(0, Math.min(1, newA)),
          b: Math.max(0, Math.min(1, newB))
        };
      }
    }
    return newGrid;
  };
  
  const render = (canvas, grid) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    const cellSize = Math.min(width, height) / gridSize;
    const offsetX = (width - cellSize * gridSize) / 2;
    const offsetY = (height - cellSize * gridSize) / 2;
    
    const activeRgb = hexToRgb(activeColor);
    const inactiveRgb = hexToRgb(inactiveColor);
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const value = grid[i][j].a;
        const r = Math.floor(inactiveRgb.r * (1 - value) + activeRgb.r * value);
        const g = Math.floor(inactiveRgb.g * (1 - value) + activeRgb.g * value);
        const b = Math.floor(inactiveRgb.b * (1 - value) + activeRgb.b * value);
        
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(offsetX + i * cellSize, offsetY + j * cellSize, cellSize + 1, cellSize + 1);
      }
    }
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    gridRef.current = updateGrid(gridRef.current);
    render(canvas, gridRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    gridRef.current = initializeGrid();
    if (canvasRef.current) render(canvasRef.current, gridRef.current);
  };
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        gridRef.current = initializeGrid();
      }
    };
    
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    animate();
    
    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gridSize, reactionSpeed, diffusionRate]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return <div style={{width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight}}>Animation disabled (reduced motion preference detected)</div>;
  }
  
  return (
    <div ref={containerRef} className="bz-reaction" style={{width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden'}}>
      <canvas ref={canvasRef} style={{display: 'block', width: '100%', height: '100%'}} />
      <div style={{position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px'}}>
        <button onClick={togglePause} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>{isPausedRef.current ? 'PLAY' : 'PAUSE'}</button>
        <button onClick={handleReset} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>RESET</button>
      </div>
      {showInfo && (
        <div style={{position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6}}>
          <div>GRID: {gridSize}x{gridSize}</div>
          <div>SPEED: {reactionSpeed}</div>
          <div>DIFFUSION: {diffusionRate}</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
