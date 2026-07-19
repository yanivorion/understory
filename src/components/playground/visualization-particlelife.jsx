import React from "react";

const MANIFEST = {
  "type": "Visualization.ParticleLife",
  "description": "Artificial life simulation with attraction/repulsion rules, emergent behavior patterns",
  "editorElement": {
    "selector": ".particle-life",
    "displayName": "Particle Life",
    "archetype": "container",
    "data": {
      "particleCount": {
        "dataType": "select",
        "displayName": "Particle Count",
        "defaultValue": "300",
        "options": ["100", "200", "300", "500", "800"],
        "group": "Content"
      },
      "typeCount": {
        "dataType": "select",
        "displayName": "Particle Types",
        "defaultValue": "4",
        "options": ["2", "3", "4", "5", "6"],
        "group": "Content"
      },
      "attractionRange": {
        "dataType": "select",
        "displayName": "Attraction Range",
        "defaultValue": "80",
        "options": ["50", "60", "80", "100", "120"],
        "group": "Animation"
      },
      "friction": {
        "dataType": "select",
        "displayName": "Friction",
        "defaultValue": "0.9",
        "options": ["0.7", "0.8", "0.9", "0.95", "0.98"],
        "group": "Animation"
      },
      "showTrails": {
        "dataType": "booleanValue",
        "displayName": "Show Trails",
        "defaultValue": false,
        "group": "Content"
      },
      "showInfo": {
        "dataType": "booleanValue",
        "displayName": "Show Info",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "type1Color": {
        "dataType": "color",
        "displayName": "Type 1 Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "type2Color": {
        "dataType": "color",
        "displayName": "Type 2 Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "type3Color": {
        "dataType": "color",
        "displayName": "Type 3 Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "type4Color": {
        "dataType": "color",
        "displayName": "Type 4 Color",
        "defaultValue": "#ADB5BD",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "particleSize": {
        "dataType": "select",
        "displayName": "Particle Size",
        "defaultValue": "2",
        "options": ["1", "2", "3", "4"],
        "group": "Layout"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size",
        "defaultValue": 12,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
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
  const particlesRef = React.useRef([]);
  const rulesRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  
  const particleCount = parseInt(config?.particleCount || '300');
  const typeCount = parseInt(config?.typeCount || '4');
  const attractionRange = parseFloat(config?.attractionRange || '80');
  const friction = parseFloat(config?.friction || '0.9');
  const showTrails = config?.showTrails === true;
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const type1Color = config?.type1Color || '#212529';
  const type2Color = config?.type2Color || '#495057';
  const type3Color = config?.type3Color || '#6C757D';
  const type4Color = config?.type4Color || '#ADB5BD';
  const textColor = config?.textColor || '#495057';
  const particleSize = parseFloat(config?.particleSize || '2');
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const typeColors = [type1Color, type2Color, type3Color, type4Color, '#CED4DA', '#DEE2E6'];
  
  const initializeParticles = (width, height) => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        type: Math.floor(Math.random() * typeCount)
      });
    }
    return particles;
  };
  
  const initializeRules = () => {
    const rules = [];
    for (let i = 0; i < typeCount; i++) {
      rules[i] = [];
      for (let j = 0; j < typeCount; j++) {
        rules[i][j] = Math.random() * 2 - 1;
      }
    }
    return rules;
  };
  
  const applyRules = (particles, rules, width, height) => {
    particles.forEach(p1 => {
      let fx = 0;
      let fy = 0;
      
      particles.forEach(p2 => {
        if (p1 === p2) return;
        
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        
        // Wrap around edges
        if (dx > width / 2) dx -= width;
        if (dx < -width / 2) dx += width;
        if (dy > height / 2) dy -= height;
        if (dy < -height / 2) dy += height;
        
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        
        if (dist > 0 && dist < attractionRange) {
          const force = rules[p1.type][p2.type] / dist;
          fx += force * dx;
          fy += force * dy;
        }
      });
      
      p1.vx = (p1.vx + fx) * friction;
      p1.vy = (p1.vy + fy) * friction;
      
      p1.x += p1.vx;
      p1.y += p1.vy;
      
      // Wrap around
      if (p1.x < 0) p1.x += width;
      if (p1.x >= width) p1.x -= width;
      if (p1.y < 0) p1.y += height;
      if (p1.y >= height) p1.y -= height;
    });
  };
  
  const render = (canvas, particles) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    if (showTrails) {
      ctx.fillStyle = backgroundColor + '20';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    particles.forEach(p => {
      ctx.fillStyle = typeColors[p.type] || typeColors[0];
      ctx.beginPath();
      ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    applyRules(particlesRef.current, rulesRef.current, canvas.width, canvas.height);
    render(canvas, particlesRef.current);
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      particlesRef.current = initializeParticles(canvas.width, canvas.height);
      rulesRef.current = initializeRules();
      render(canvas, particlesRef.current);
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
        rulesRef.current = initializeRules();
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
  }, [particleCount, typeCount, attractionRange, friction]);
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  if (prefersReducedMotion) {
    return (
      <div style={{
        width: '100%', height: '100%', minHeight: '500px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor, color: textColor,
        fontFamily: 'ui-monospace, monospace',
        fontSize: `${fontSize}px`, fontWeight
      }}>
        Animation disabled (reduced motion preference detected)
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="particle-life" 
      style={{
        width: '100%', height: '100%', minHeight: '500px',
        position: 'relative', backgroundColor, overflow: 'hidden'
      }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      
      <div style={{
        position: 'absolute', bottom: '16px', left: '16px',
        display: 'flex', gap: '8px'
      }}>
        <button onClick={togglePause} style={{
          padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)',
          border: `1px solid ${textColor}`, borderRadius: '6px',
          color: textColor, fontFamily: 'ui-monospace, monospace',
          fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer',
          transition: 'all 200ms ease-out'
        }}>
          {isPausedRef.current ? 'PLAY' : 'PAUSE'}
        </button>
        
        <button onClick={handleReset} style={{
          padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)',
          border: `1px solid ${textColor}`, borderRadius: '6px',
          color: textColor, fontFamily: 'ui-monospace, monospace',
          fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer',
          transition: 'all 200ms ease-out'
        }}>
          RESET
        </button>
      </div>
      
      {showInfo && (
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)',
          border: `1px solid ${textColor}`, borderRadius: '6px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: `${fontSize}px`, fontWeight,
          color: textColor, lineHeight: 1.6
        }}>
          <div>PARTICLES: {particleCount}</div>
          <div>TYPES: {typeCount}</div>
          <div>RANGE: {attractionRange}px</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
