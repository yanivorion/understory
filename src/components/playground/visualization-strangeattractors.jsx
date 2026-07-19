import React from "react";

const MANIFEST = {"type": "Visualization.StrangeAttractors", "description": "Collection of strange attractors: Aizawa, Dadras, Chen with 3D projection", "editorElement": {"selector": ".strange-attractors", "displayName": "Strange Attractors", "archetype": "container", "data": {"attractorType": {"dataType": "select", "displayName": "Attractor Type", "defaultValue": "aizawa", "options": ["aizawa", "dadras", "chen", "rossler", "thomas"], "group": "Content"}, "trailLength": {"dataType": "select", "displayName": "Trail Length", "defaultValue": "2000", "options": ["1000", "1500", "2000", "3000", "5000"], "group": "Animation"}, "speed": {"dataType": "select", "displayName": "Animation Speed", "defaultValue": "1.0", "options": ["0.5", "0.7", "1.0", "1.5", "2.0"], "group": "Animation"}, "rotationSpeed": {"dataType": "select", "displayName": "Rotation Speed", "defaultValue": "0.3", "options": ["0", "0.1", "0.3", "0.5", "1.0"], "group": "Animation"}, "showInfo": {"dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content"}, "backgroundColor": {"dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors"}, "attractorColor": {"dataType": "color", "displayName": "Attractor Color", "defaultValue": "#212529", "group": "Colors"}, "textColor": {"dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors"}, "lineWidth": {"dataType": "select", "displayName": "Line Width", "defaultValue": "1", "options": ["0.5", "1", "1.5", "2"], "group": "Layout"}, "fontSize": {"dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography"}, "fontWeight": {"dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography"}}, "layout": {"resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical"}}};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const trailRef = React.useRef([]);
  const pointRef = React.useRef({x: 0.1, y: 0, z: 0});
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const rotationRef = React.useRef(0);
  
  const attractorType = config?.attractorType || 'aizawa';
  const trailLength = parseInt(config?.trailLength || '2000');
  const speed = parseFloat(config?.speed || '1.0');
  const rotationSpeed = parseFloat(config?.rotationSpeed || '0.3');
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const attractorColor = config?.attractorColor || '#212529';
  const textColor = config?.textColor || '#495057';
  const lineWidth = parseFloat(config?.lineWidth || '1');
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const attractors = {
    aizawa: (p) => {
      const a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;
      return {
        dx: ((p.z - b) * p.x - d * p.y) * speed * 0.01,
        dy: (d * p.x + (p.z - b) * p.y) * speed * 0.01,
        dz: (c + a * p.z - (p.z * p.z * p.z) / 3 - (p.x * p.x + p.y * p.y) * (1 + e * p.z) + f * p.z * p.x * p.x * p.x) * speed * 0.01
      };
    },
    dadras: (p) => {
      const a = 3, b = 2.7, c = 1.7, d = 2, e = 9;
      return {
        dx: (p.y - a * p.x + b * p.y * p.z) * speed * 0.01,
        dy: (c * p.y - p.x * p.z + p.z) * speed * 0.01,
        dz: (d * p.x * p.y - e * p.z) * speed * 0.01
      };
    },
    chen: (p) => {
      const a = 35, b = 3, c = 28;
      return {
        dx: (a * (p.y - p.x)) * speed * 0.001,
        dy: ((c - a) * p.x - p.x * p.z + c * p.y) * speed * 0.001,
        dz: (p.x * p.y - b * p.z) * speed * 0.001
      };
    },
    rossler: (p) => {
      const a = 0.2, b = 0.2, c = 5.7;
      return {
        dx: (-p.y - p.z) * speed * 0.05,
        dy: (p.x + a * p.y) * speed * 0.05,
        dz: (b + p.z * (p.x - c)) * speed * 0.05
      };
    },
    thomas: (p) => {
      const b = 0.208186;
      return {
        dx: (Math.sin(p.y) - b * p.x) * speed * 0.1,
        dy: (Math.sin(p.z) - b * p.y) * speed * 0.1,
        dz: (Math.sin(p.x) - b * p.z) * speed * 0.1
      };
    }
  };
  
  const project3D = (x, y, z, width, height, rotation) => {
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    const rotX = x * cosR - y * sinR;
    const rotY = x * sinR + y * cosR;
    
    const scale = Math.min(width, height) * 0.08;
    const fov = 500;
    const distance = 3;
    const perspective = fov / (fov + z * scale + distance * scale);
    
    return {
      x: width / 2 + rotX * scale * perspective,
      y: height / 2 + rotY * scale * perspective
    };
  };
  
  const update = () => {
    const attractor = attractors[attractorType];
    const d = attractor(pointRef.current);
    pointRef.current.x += d.dx;
    pointRef.current.y += d.dy;
    pointRef.current.z += d.dz;
  };
  
  const render = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    update();
    trailRef.current.push({...pointRef.current});
    if (trailRef.current.length > trailLength) trailRef.current.shift();
    
    rotationRef.current += rotationSpeed * 0.01;
    
    ctx.strokeStyle = attractorColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    for (let i = 1; i < trailRef.current.length; i++) {
      const prev = trailRef.current[i - 1];
      const curr = trailRef.current[i];
      const alpha = i / trailRef.current.length;
      
      const p1 = project3D(prev.x, prev.y, prev.z, width, height, rotationRef.current);
      const p2 = project3D(curr.x, curr.y, curr.z, width, height, rotationRef.current);
      
      ctx.globalAlpha = alpha * 0.8;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    render(canvas);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    pointRef.current = {x: 0.1, y: 0, z: 0};
    trailRef.current = [];
    rotationRef.current = 0;
    if (canvasRef.current) render(canvasRef.current);
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
  }, [attractorType, trailLength, speed, rotationSpeed]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return <div style={{width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight}}>Animation disabled (reduced motion preference detected)</div>;
  }
  
  return (
    <div ref={containerRef} className="strange-attractors" style={{width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden'}}>
      <canvas ref={canvasRef} style={{display: 'block', width: '100%', height: '100%'}} />
      <div style={{position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px'}}>
        <button onClick={togglePause} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>{isPausedRef.current ? 'PLAY' : 'PAUSE'}</button>
        <button onClick={handleReset} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>RESET</button>
      </div>
      {showInfo && (
        <div style={{position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6}}>
          <div>TYPE: {attractorType.toUpperCase()}</div>
          <div>TRAIL: {trailLength}</div>
          <div>SPEED: {speed}x</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
