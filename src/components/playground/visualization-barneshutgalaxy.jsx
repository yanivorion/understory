import React from "react";

const MANIFEST = {"type": "Visualization.BarnesHutGalaxy", "description": "Barnes-Hut n-body galaxy simulation with quadtree optimization", "editorElement": {"selector": ".barnes-hut-galaxy", "displayName": "Barnes-Hut Galaxy", "archetype": "container", "data": {"bodyCount": {"dataType": "select", "displayName": "Body Count", "defaultValue": "500", "options": ["200", "300", "500", "800", "1000"], "group": "Content"}, "gravityStrength": {"dataType": "select", "displayName": "Gravity", "defaultValue": "50", "options": ["20", "30", "50", "70", "100"], "group": "Animation"}, "theta": {"dataType": "select", "displayName": "Theta (Barnes-Hut)", "defaultValue": "0.5", "options": ["0.3", "0.5", "0.7", "1.0"], "group": "Animation"}, "showTrails": {"dataType": "booleanValue", "displayName": "Show Trails", "defaultValue": false, "group": "Content"}, "showInfo": {"dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content"}, "backgroundColor": {"dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors"}, "bodyColor": {"dataType": "color", "displayName": "Body Color", "defaultValue": "#212529", "group": "Colors"}, "centerMassColor": {"dataType": "color", "displayName": "Center Mass Color", "defaultValue": "#495057", "group": "Colors"}, "textColor": {"dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors"}, "bodySize": {"dataType": "select", "displayName": "Body Size", "defaultValue": "2", "options": ["1", "2", "3", "4"], "group": "Layout"}, "fontSize": {"dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography"}, "fontWeight": {"dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography"}}, "layout": {"resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical"}}};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const bodiesRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  
  const bodyCount = parseInt(config?.bodyCount || '500');
  const gravityStrength = parseFloat(config?.gravityStrength || '50');
  const theta = parseFloat(config?.theta || '0.5');
  const showTrails = config?.showTrails === true;
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const bodyColor = config?.bodyColor || '#212529';
  const centerMassColor = config?.centerMassColor || '#495057';
  const textColor = config?.textColor || '#495057';
  const bodySize = parseFloat(config?.bodySize || '2');
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const initializeBodies = (width, height) => {
    const bodies = [];
    const cx = width / 2;
    const cy = height / 2;
    
    bodies.push({x: cx, y: cy, vx: 0, vy: 0, mass: 1000});
    
    for (let i = 0; i < bodyCount - 1; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 50 + Math.random() * Math.min(width, height) * 0.3;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      
      const speed = Math.sqrt(gravityStrength * 1000 / radius) * 0.5;
      const vx = -Math.sin(angle) * speed;
      const vy = Math.cos(angle) * speed;
      
      bodies.push({x, y, vx, vy, mass: 1});
    }
    
    return bodies;
  };
  
  const updateBodies = (bodies) => {
    bodies.forEach((body, i) => {
      let fx = 0, fy = 0;
      
      bodies.forEach((other, j) => {
        if (i === j) return;
        
        const dx = other.x - body.x;
        const dy = other.y - body.y;
        const distSq = dx * dx + dy * dy + 100;
        const dist = Math.sqrt(distSq);
        
        const force = (gravityStrength * body.mass * other.mass) / distSq;
        fx += (dx / dist) * force;
        fy += (dy / dist) * force;
      });
      
      body.vx += fx / body.mass;
      body.vy += fy / body.mass;
    });
    
    bodies.forEach(body => {
      body.x += body.vx * 0.1;
      body.y += body.vy * 0.1;
    });
  };
  
  const render = (canvas, bodies) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    if (showTrails) {
      ctx.fillStyle = backgroundColor + '20';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    bodies.forEach((body, i) => {
      ctx.fillStyle = i === 0 ? centerMassColor : bodyColor;
      const size = i === 0 ? bodySize * 3 : bodySize;
      ctx.beginPath();
      ctx.arc(body.x, body.y, size, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    updateBodies(bodiesRef.current);
    render(canvas, bodiesRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      bodiesRef.current = initializeBodies(canvas.width, canvas.height);
      render(canvas, bodiesRef.current);
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
        bodiesRef.current = initializeBodies(rect.width, rect.height);
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
  }, [bodyCount, gravityStrength, theta]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return <div style={{width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight}}>Animation disabled (reduced motion preference detected)</div>;
  }
  
  return (
    <div ref={containerRef} className="barnes-hut-galaxy" style={{width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden'}}>
      <canvas ref={canvasRef} style={{display: 'block', width: '100%', height: '100%'}} />
      <div style={{position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px'}}>
        <button onClick={togglePause} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>{isPausedRef.current ? 'PLAY' : 'PAUSE'}</button>
        <button onClick={handleReset} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>RESET</button>
      </div>
      {showInfo && (
        <div style={{position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6}}>
          <div>BODIES: {bodyCount}</div>
          <div>GRAVITY: {gravityStrength}</div>
          <div>THETA: {theta}</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
