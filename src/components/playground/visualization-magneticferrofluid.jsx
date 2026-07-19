import React from "react";

const MANIFEST = {
  "type": "Visualization.MagneticFerrofluid",
  "description": "Magnetic ferrofluid simulation with organic spike formations",
  "editorElement": {
    "selector": ".magnetic-ferrofluid",
    "displayName": "Magnetic Ferrofluid",
    "archetype": "container",
    "data": {
      "magnetCount": { "dataType": "select", "displayName": "Magnet Count", "defaultValue": "3", "options": ["1", "2", "3", "4", "5"], "group": "Content" },
      "particleCount": { "dataType": "select", "displayName": "Particle Density", "defaultValue": "400", "options": ["200", "300", "400", "600", "800"], "group": "Content" },
      "fieldStrength": { "dataType": "select", "displayName": "Field Strength", "defaultValue": "50", "options": ["30", "40", "50", "70", "100"], "group": "Animation" },
      "spikeLength": { "dataType": "select", "displayName": "Spike Length", "defaultValue": "80", "options": ["40", "60", "80", "100", "120"], "group": "Animation" },
      "showInfo": { "dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content" },
      "showMagnets": { "dataType": "booleanValue", "displayName": "Show Magnets", "defaultValue": true, "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors" },
      "fluidColor": { "dataType": "color", "displayName": "Fluid Color", "defaultValue": "#212529", "group": "Colors" },
      "magnetColor": { "dataType": "color", "displayName": "Magnet Color", "defaultValue": "#495057", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors" },
      "particleSize": { "dataType": "select", "displayName": "Particle Size", "defaultValue": "2", "options": ["1", "2", "3", "4"], "group": "Layout" },
      "fontSize": { "dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const particlesRef = React.useRef([]);
  const magnetsRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const timeRef = React.useRef(0);
  
  const magnetCount = parseInt(config?.magnetCount || '3');
  const particleCount = parseInt(config?.particleCount || '400');
  const fieldStrength = parseFloat(config?.fieldStrength || '50');
  const spikeLength = parseFloat(config?.spikeLength || '80');
  const showInfo = config?.showInfo !== false;
  const showMagnets = config?.showMagnets !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const fluidColor = config?.fluidColor || '#212529';
  const magnetColor = config?.magnetColor || '#495057';
  const textColor = config?.textColor || '#495057';
  const particleSize = parseFloat(config?.particleSize || '2');
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const initializeMagnets = (width, height) => {
    const magnets = [];
    for (let i = 0; i < magnetCount; i++) {
      const angle = (i / magnetCount) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.25;
      magnets.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        strength: 1
      });
    }
    return magnets;
  };
  
  const initializeParticles = (width, height) => {
    const particles = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const poolRadius = Math.min(width, height) * 0.15;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * poolRadius;
      particles.push({
        x: centerX + Math.cos(angle) * r,
        y: centerY + Math.sin(angle) * r,
        vx: 0,
        vy: 0
      });
    }
    return particles;
  };
  
  const updateParticles = (particles, magnets, time) => {
    particles.forEach(p => {
      let fx = 0, fy = 0;
      
      magnets.forEach(m => {
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        
        if (dist > 1) {
          const fieldX = Math.sin(time * 2 + p.x * 0.01) * 0.5;
          const fieldY = Math.cos(time * 2 + p.y * 0.01) * 0.5;
          const force = (m.strength * fieldStrength) / distSq;
          fx += (dx / dist) * force + fieldX;
          fy += (dy / dist) * force + fieldY;
        }
      });
      
      p.vx = (p.vx + fx) * 0.95;
      p.vy = (p.vy + fy) * 0.95;
      p.x += p.vx;
      p.y += p.vy;
      
      const maxSpeed = 2;
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }
    });
  };
  
  const render = (canvas, particles, magnets) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (showMagnets) {
      magnets.forEach(m => {
        ctx.fillStyle = magnetColor;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    ctx.fillStyle = fluidColor;
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
      ctx.fill();
      
      const nearestMagnet = magnets.reduce((nearest, m) => {
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < nearest.dist ? { magnet: m, dist } : nearest;
      }, { dist: Infinity });
      
      if (nearestMagnet.dist < spikeLength) {
        const dx = nearestMagnet.magnet.x - p.x;
        const dy = nearestMagnet.magnet.y - p.y;
        const angle = Math.atan2(dy, dx);
        const spikeStrength = 1 - (nearestMagnet.dist / spikeLength);
        const spikeLen = spikeStrength * 10;
        
        ctx.globalAlpha = spikeStrength * 0.4;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + Math.cos(angle) * spikeLen, p.y + Math.sin(angle) * spikeLen);
        ctx.strokeStyle = fluidColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    timeRef.current += 0.016;
    updateParticles(particlesRef.current, magnetsRef.current, timeRef.current);
    render(canvas, particlesRef.current, magnetsRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      timeRef.current = 0;
      particlesRef.current = initializeParticles(canvas.width, canvas.height);
      magnetsRef.current = initializeMagnets(canvas.width, canvas.height);
      render(canvas, particlesRef.current, magnetsRef.current);
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
        particlesRef.current = initializeParticles(rect.width, rect.height);
        magnetsRef.current = initializeMagnets(rect.width, rect.height);
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
  }, [magnetCount, particleCount, fieldStrength, spikeLength]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return <div style={{ width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight }}>Animation disabled (reduced motion preference detected)</div>;
  }
  
  return (
    <div ref={containerRef} className="magnetic-ferrofluid" style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px' }}>
        <button onClick={togglePause} style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out' }}>{isPausedRef.current ? 'PLAY' : 'PAUSE'}</button>
        <button onClick={handleReset} style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out' }}>RESET</button>
      </div>
      {showInfo && (
        <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6 }}>
          <div>MAGNETS: {magnetCount}</div>
          <div>PARTICLES: {particleCount}</div>
          <div>FIELD: {fieldStrength}</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
