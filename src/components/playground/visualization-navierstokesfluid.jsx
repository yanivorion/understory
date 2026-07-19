import React from "react";

const MANIFEST = {"type": "Visualization.NavierStokesFluid", "description": "Real-time fluid dynamics with vorticity and pressure simulation", "editorElement": {"selector": ".navier-stokes-fluid", "displayName": "Navier-Stokes Fluid", "archetype": "container", "data": {"gridSize": {"dataType": "select", "displayName": "Grid Resolution", "defaultValue": "80", "options": ["50", "60", "80", "100"], "group": "Content"}, "viscosity": {"dataType": "select", "displayName": "Viscosity", "defaultValue": "0.0001", "options": ["0.00001", "0.0001", "0.001", "0.01"], "group": "Animation"}, "diffusion": {"dataType": "select", "displayName": "Diffusion", "defaultValue": "0.00001", "options": ["0.00001", "0.0001", "0.001"], "group": "Animation"}, "showVelocity": {"dataType": "booleanValue", "displayName": "Show Velocity Field", "defaultValue": true, "group": "Content"}, "showInfo": {"dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content"}, "backgroundColor": {"dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors"}, "fluidColor": {"dataType": "color", "displayName": "Fluid Color", "defaultValue": "#212529", "group": "Colors"}, "velocityColor": {"dataType": "color", "displayName": "Velocity Color", "defaultValue": "#495057", "group": "Colors"}, "textColor": {"dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors"}, "fontSize": {"dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography"}, "fontWeight": {"dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography"}}, "layout": {"resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical"}}};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const fluidRef = React.useRef({u: [], v: [], density: []});
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const mouseRef = React.useRef({x: 0, y: 0, isDown: false});
  
  const gridSize = parseInt(config?.gridSize || '80');
  const viscosity = parseFloat(config?.viscosity || '0.0001');
  const diffusion = parseFloat(config?.diffusion || '0.00001');
  const showVelocity = config?.showVelocity !== false;
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const fluidColor = config?.fluidColor || '#212529';
  const velocityColor = config?.velocityColor || '#495057';
  const textColor = config?.textColor || '#495057';
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const initializeFluid = () => {
    const u = [], v = [], density = [];
    for (let i = 0; i < gridSize; i++) {
      u[i] = [];
      v[i] = [];
      density[i] = [];
      for (let j = 0; j < gridSize; j++) {
        u[i][j] = 0;
        v[i][j] = 0;
        density[i][j] = 0;
      }
    }
    return {u, v, density};
  };
  
  const diffuse = (x, x0, diff, dt, N) => {
    const a = dt * diff * N * N;
    for (let k = 0; k < 4; k++) {
      for (let i = 1; i < N - 1; i++) {
        for (let j = 1; j < N - 1; j++) {
          x[i][j] = (x0[i][j] + a * (x[i-1][j] + x[i+1][j] + x[i][j-1] + x[i][j+1])) / (1 + 4 * a);
        }
      }
    }
  };
  
  const advect = (d, d0, u, v, dt, N) => {
    for (let i = 1; i < N - 1; i++) {
      for (let j = 1; j < N - 1; j++) {
        let x = i - dt * N * u[i][j];
        let y = j - dt * N * v[i][j];
        
        x = Math.max(0.5, Math.min(N - 1.5, x));
        y = Math.max(0.5, Math.min(N - 1.5, y));
        
        const i0 = Math.floor(x);
        const j0 = Math.floor(y);
        const i1 = i0 + 1;
        const j1 = j0 + 1;
        
        const s1 = x - i0;
        const s0 = 1 - s1;
        const t1 = y - j0;
        const t0 = 1 - t1;
        
        d[i][j] = s0 * (t0 * d0[i0][j0] + t1 * d0[i0][j1]) +
                  s1 * (t0 * d0[i1][j0] + t1 * d0[i1][j1]);
      }
    }
  };
  
  const step = (fluid) => {
    const dt = 0.1;
    const N = gridSize;
    
    const u0 = fluid.u.map(row => [...row]);
    const v0 = fluid.v.map(row => [...row]);
    const dens0 = fluid.density.map(row => [...row]);
    
    diffuse(u0, fluid.u, viscosity, dt, N);
    diffuse(v0, fluid.v, viscosity, dt, N);
    advect(fluid.u, u0, u0, v0, dt, N);
    advect(fluid.v, v0, u0, v0, dt, N);
    
    diffuse(dens0, fluid.density, diffusion, dt, N);
    advect(fluid.density, dens0, fluid.u, fluid.v, dt, N);
    
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        fluid.density[i][j] *= 0.99;
      }
    }
  };
  
  const render = (canvas, fluid) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    const cellW = width / gridSize;
    const cellH = height / gridSize;
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const dens = fluid.density[i][j];
        if (dens > 0.01) {
          ctx.fillStyle = fluidColor;
          ctx.globalAlpha = Math.min(dens * 10, 1);
          ctx.fillRect(i * cellW, j * cellH, cellW + 1, cellH + 1);
        }
      }
    }
    ctx.globalAlpha = 1;
    
    if (showVelocity) {
      ctx.strokeStyle = velocityColor;
      ctx.lineWidth = 0.5;
      const step = 5;
      for (let i = 0; i < gridSize; i += step) {
        for (let j = 0; j < gridSize; j += step) {
          const u = fluid.u[i][j];
          const v = fluid.v[i][j];
          if (Math.abs(u) + Math.abs(v) > 0.1) {
            const x = i * cellW + cellW / 2;
            const y = j * cellH + cellH / 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + u * 50, y + v * 50);
            ctx.stroke();
          }
        }
      }
    }
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    step(fluidRef.current);
    render(canvas, fluidRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * gridSize;
    const y = ((e.clientY - rect.top) / rect.height) * gridSize;
    
    if (mouseRef.current.isDown) {
      const i = Math.floor(x);
      const j = Math.floor(y);
      if (i > 0 && i < gridSize - 1 && j > 0 && j < gridSize - 1) {
        const dx = x - mouseRef.current.x;
        const dy = y - mouseRef.current.y;
        fluidRef.current.u[i][j] += dx * 50;
        fluidRef.current.v[i][j] += dy * 50;
        fluidRef.current.density[i][j] += 100;
      }
    }
    mouseRef.current.x = x;
    mouseRef.current.y = y;
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    fluidRef.current = initializeFluid();
    if (canvasRef.current) render(canvasRef.current, fluidRef.current);
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
        fluidRef.current = initializeFluid();
      }
    };
    
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', () => mouseRef.current.isDown = true);
    canvas.addEventListener('mouseup', () => mouseRef.current.isDown = false);
    canvas.addEventListener('mouseleave', () => mouseRef.current.isDown = false);
    
    animate();
    
    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gridSize, viscosity, diffusion]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return <div style={{width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight}}>Animation disabled (reduced motion preference detected)</div>;
  }
  
  return (
    <div ref={containerRef} className="navier-stokes-fluid" style={{width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden', cursor: 'crosshair'}}>
      <canvas ref={canvasRef} style={{display: 'block', width: '100%', height: '100%'}} />
      <div style={{position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px'}}>
        <button onClick={togglePause} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>{isPausedRef.current ? 'PLAY' : 'PAUSE'}</button>
        <button onClick={handleReset} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>RESET</button>
      </div>
      {showInfo && (
        <div style={{position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6}}>
          <div>GRID: {gridSize}x{gridSize}</div>
          <div>VISCOSITY: {viscosity}</div>
          <div>DRAG TO ADD FLUID</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
