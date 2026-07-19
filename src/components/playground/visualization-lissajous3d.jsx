import React from "react";

const MANIFEST = {
  "type": "Visualization.Lissajous3D",
  "description": "3D Lissajous curves harmonograph, parametric harmonic motion visualization",
  "editorElement": {
    "selector": ".lissajous-3d",
    "displayName": "Lissajous 3D",
    "archetype": "container",
    "data": {
      "freqX": { "dataType": "select", "displayName": "X Frequency", "defaultValue": "3", "options": ["1", "2", "3", "4", "5"], "group": "Content" },
      "freqY": { "dataType": "select", "displayName": "Y Frequency", "defaultValue": "4", "options": ["1", "2", "3", "4", "5"], "group": "Content" },
      "freqZ": { "dataType": "select", "displayName": "Z Frequency", "defaultValue": "5", "options": ["1", "2", "3", "4", "5"], "group": "Content" },
      "phaseX": { "dataType": "select", "displayName": "X Phase", "defaultValue": "0", "options": ["0", "0.5", "1.0", "1.5"], "group": "Animation" },
      "phaseY": { "dataType": "select", "displayName": "Y Phase", "defaultValue": "0.5", "options": ["0", "0.5", "1.0", "1.5"], "group": "Animation" },
      "trailLength": { "dataType": "select", "displayName": "Trail Length", "defaultValue": "300", "options": ["100", "200", "300", "500", "800"], "group": "Animation" },
      "showInfo": { "dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors" },
      "curveColor": { "dataType": "color", "displayName": "Curve Color", "defaultValue": "#212529", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors" },
      "lineWidth": { "dataType": "select", "displayName": "Line Width", "defaultValue": "2", "options": ["1", "2", "3", "4"], "group": "Layout" },
      "fontSize": { "dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const trailRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const timeRef = React.useRef(0);
  
  const freqX = parseFloat(config?.freqX || '3');
  const freqY = parseFloat(config?.freqY || '4');
  const freqZ = parseFloat(config?.freqZ || '5');
  const phaseX = parseFloat(config?.phaseX || '0');
  const phaseY = parseFloat(config?.phaseY || '0.5');
  const trailLength = parseInt(config?.trailLength || '300');
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const curveColor = config?.curveColor || '#212529';
  const textColor = config?.textColor || '#495057';
  const lineWidth = parseFloat(config?.lineWidth || '2');
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const calculatePoint = (t) => {
    const x = Math.sin(freqX * t + phaseX * Math.PI);
    const y = Math.sin(freqY * t + phaseY * Math.PI);
    const z = Math.sin(freqZ * t);
    return { x, y, z };
  };
  
  const project3D = (x, y, z, width, height) => {
    const scale = Math.min(width, height) * 0.3;
    const fov = 500;
    const distance = 2;
    const perspective = fov / (fov + z * scale + distance * scale);
    return {
      x: width / 2 + x * scale * perspective,
      y: height / 2 + y * scale * perspective,
      depth: z
    };
  };
  
  const render = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    const point = calculatePoint(timeRef.current);
    trailRef.current.push(point);
    if (trailRef.current.length > trailLength) trailRef.current.shift();
    
    ctx.strokeStyle = curveColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    for (let i = 1; i < trailRef.current.length; i++) {
      const prev = trailRef.current[i - 1];
      const curr = trailRef.current[i];
      const alpha = i / trailRef.current.length;
      
      const p1 = project3D(prev.x, prev.y, prev.z, width, height);
      const p2 = project3D(curr.x, curr.y, curr.z, width, height);
      
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
    timeRef.current += 0.05;
    render(canvas);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    timeRef.current = 0;
    trailRef.current = [];
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
  }, [freqX, freqY, freqZ, phaseX, phaseY, trailLength]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return <div style={{ width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight }}>Animation disabled (reduced motion preference detected)</div>;
  }
  
  return (
    <div ref={containerRef} className="lissajous-3d" style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px' }}>
        <button onClick={togglePause} style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out' }}>{isPausedRef.current ? 'PLAY' : 'PAUSE'}</button>
        <button onClick={handleReset} style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out' }}>RESET</button>
      </div>
      {showInfo && (
        <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6 }}>
          <div>FREQ: {freqX}:{freqY}:{freqZ}</div>
          <div>PHASE: {phaseX},{phaseY}</div>
          <div>TRAIL: {trailLength}</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
