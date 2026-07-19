import React from "react";

const MANIFEST = {"type": "Visualization.SandpileCellularAutomaton", "description": "Sandpile cellular automaton with self-organized criticality avalanches", "editorElement": {"selector": ".sandpile-cellular-automaton", "displayName": "Sandpile Cellular Automaton", "archetype": "container", "data": {"gridSize": {"dataType": "select", "displayName": "Grid Size", "defaultValue": "150", "options": ["100", "120", "150", "180", "200"], "group": "Content"}, "dropRate": {"dataType": "select", "displayName": "Drop Rate", "defaultValue": "10", "options": ["1", "5", "10", "20", "50"], "group": "Animation"}, "criticalMass": {"dataType": "select", "displayName": "Critical Mass", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Animation"}, "autoMode": {"dataType": "booleanValue", "displayName": "Auto Mode", "defaultValue": true, "group": "Content"}, "showInfo": {"dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content"}, "backgroundColor": {"dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors"}, "level0Color": {"dataType": "color", "displayName": "Level 0 Color", "defaultValue": "#FFFFFF", "group": "Colors"}, "level1Color": {"dataType": "color", "displayName": "Level 1 Color", "defaultValue": "#E9ECEF", "group": "Colors"}, "level2Color": {"dataType": "color", "displayName": "Level 2 Color", "defaultValue": "#ADB5BD", "group": "Colors"}, "level3Color": {"dataType": "color", "displayName": "Level 3 Color", "defaultValue": "#495057", "group": "Colors"}, "level4Color": {"dataType": "color", "displayName": "Level 4+ Color", "defaultValue": "#212529", "group": "Colors"}, "textColor": {"dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors"}, "fontSize": {"dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography"}, "fontWeight": {"dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography"}}, "layout": {"resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical"}}};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const gridRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const dropCounterRef = React.useRef(0);
  
  const gridSize = parseInt(config?.gridSize || '150');
  const dropRate = parseInt(config?.dropRate || '10');
  const criticalMass = parseInt(config?.criticalMass || '4');
  const autoMode = config?.autoMode !== false;
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const level0Color = config?.level0Color || '#FFFFFF';
  const level1Color = config?.level1Color || '#E9ECEF';
  const level2Color = config?.level2Color || '#ADB5BD';
  const level3Color = config?.level3Color || '#495057';
  const level4Color = config?.level4Color || '#212529';
  const textColor = config?.textColor || '#495057';
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const colors = [level0Color, level1Color, level2Color, level3Color, level4Color];
  
  const initializeGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      grid[i] = [];
      for (let j = 0; j < gridSize; j++) {
        grid[i][j] = 0;
      }
    }
    return grid;
  };
  
  const topple = (grid) => {
    let changed = false;
    const newGrid = grid.map(row => [...row]);
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] >= criticalMass) {
          newGrid[i][j] -= criticalMass;
          changed = true;
          
          if (i > 0) newGrid[i-1][j]++;
          if (i < gridSize - 1) newGrid[i+1][j]++;
          if (j > 0) newGrid[i][j-1]++;
          if (j < gridSize - 1) newGrid[i][j+1]++;
        }
      }
    }
    
    return {grid: newGrid, changed};
  };
  
  const addSand = (grid) => {
    const cx = Math.floor(gridSize / 2);
    const cy = Math.floor(gridSize / 2);
    grid[cx][cy]++;
  };
  
  const update = (grid) => {
    if (autoMode) {
      dropCounterRef.current++;
      if (dropCounterRef.current >= 60 / dropRate) {
        addSand(grid);
        dropCounterRef.current = 0;
      }
    }
    
    let newGrid = grid;
    for (let i = 0; i < 10; i++) {
      const result = topple(newGrid);
      newGrid = result.grid;
      if (!result.changed) break;
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
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const value = Math.min(grid[i][j], colors.length - 1);
        ctx.fillStyle = colors[value];
        ctx.fillRect(
          offsetX + i * cellSize,
          offsetY + j * cellSize,
          cellSize + 1,
          cellSize + 1
        );
      }
    }
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    gridRef.current = update(gridRef.current);
    render(canvas, gridRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    gridRef.current = initializeGrid();
    dropCounterRef.current = 0;
    if (canvasRef.current) render(canvasRef.current, gridRef.current);
  };
  
  const handleClick = (e) => {
    if (autoMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cellSize = Math.min(canvas.width, canvas.height) / gridSize;
    const offsetX = (canvas.width - cellSize * gridSize) / 2;
    const offsetY = (canvas.height - cellSize * gridSize) / 2;
    
    const i = Math.floor((x - offsetX) / cellSize);
    const j = Math.floor((y - offsetY) / cellSize);
    
    if (i >= 0 && i < gridSize && j >= 0 && j < gridSize) {
      gridRef.current[i][j]++;
    }
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
    
    canvas.addEventListener('click', handleClick);
    
    animate();
    
    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('click', handleClick);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gridSize, dropRate, criticalMass, autoMode]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return <div style={{width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight}}>Animation disabled (reduced motion preference detected)</div>;
  }
  
  return (
    <div ref={containerRef} className="sandpile-cellular-automaton" style={{width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden', cursor: autoMode ? 'default' : 'pointer'}}>
      <canvas ref={canvasRef} style={{display: 'block', width: '100%', height: '100%'}} />
      <div style={{position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px'}}>
        <button onClick={togglePause} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>{isPausedRef.current ? 'PLAY' : 'PAUSE'}</button>
        <button onClick={handleReset} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>RESET</button>
      </div>
      {showInfo && (
        <div style={{position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6}}>
          <div>GRID: {gridSize}x{gridSize}</div>
          <div>CRITICAL: {criticalMass}</div>
          <div>MODE: {autoMode ? 'AUTO' : 'MANUAL'}</div>
          {!autoMode && <div>CLICK TO ADD</div>}
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
