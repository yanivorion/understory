import React from "react";

const MANIFEST = {
  "type": "Visualization.KelvinHelmholtz",
  "description": "Fluid dynamics vortex formation, atmospheric instability wave patterns",
  "editorElement": {
    "selector": ".kelvin-helmholtz",
    "displayName": "Kelvin-Helmholtz Instability",
    "archetype": "container",
    "data": {
      "particleCount": {
        "dataType": "select",
        "displayName": "Particle Density",
        "defaultValue": "500",
        "options": ["300", "400", "500", "700", "1000"],
        "group": "Content"
      },
      "shearVelocity": {
        "dataType": "select",
        "displayName": "Shear Velocity",
        "defaultValue": "3",
        "options": ["1", "2", "3", "4", "5"],
        "group": "Animation"
      },
      "waveAmplitude": {
        "dataType": "select",
        "displayName": "Wave Amplitude",
        "defaultValue": "20",
        "options": ["10", "15", "20", "30", "40"],
        "group": "Animation"
      },
      "waveFrequency": {
        "dataType": "select",
        "displayName": "Wave Frequency",
        "defaultValue": "0.02",
        "options": ["0.01", "0.015", "0.02", "0.025", "0.03"],
        "group": "Animation"
      },
      "showInfo": {
        "dataType": "booleanValue",
        "displayName": "Show Info",
        "defaultValue": true,
        "group": "Content"
      },
      "colorMode": {
        "dataType": "select",
        "displayName": "Color Mode",
        "defaultValue": "velocity",
        "options": ["velocity", "layer", "gradient"],
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "topLayerColor": {
        "dataType": "color",
        "displayName": "Top Layer Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "bottomLayerColor": {
        "dataType": "color",
        "displayName": "Bottom Layer Color",
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
        "options": ["1", "1.5", "2", "2.5", "3"],
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
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const timeRef = React.useRef(0);
  
  const particleCount = parseInt(config?.particleCount || '500');
  const shearVelocity = parseFloat(config?.shearVelocity || '3');
  const waveAmplitude = parseFloat(config?.waveAmplitude || '20');
  const waveFrequency = parseFloat(config?.waveFrequency || '0.02');
  const showInfo = config?.showInfo !== false;
  const colorMode = config?.colorMode || 'velocity';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const topLayerColor = config?.topLayerColor || '#212529';
  const bottomLayerColor = config?.bottomLayerColor || '#ADB5BD';
  const textColor = config?.textColor || '#495057';
  const particleSize = parseFloat(config?.particleSize || '2');
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  const initializeParticles = (width, height) => {
    const particles = [];
    const midY = height / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const layer = y < midY ? 'top' : 'bottom';
      
      particles.push({
        x, y,
        originalX: x,
        originalY: y,
        vx: 0,
        vy: 0,
        layer
      });
    }
    
    return particles;
  };
  
  const updateParticles = (particles, width, height, time) => {
    const midY = height / 2;
    
    particles.forEach(p => {
      const distFromMid = Math.abs(p.originalY - midY);
      const interfaceWidth = height * 0.15;
      const interfaceFactor = Math.max(0, 1 - distFromMid / interfaceWidth);
      
      // Shear velocity (opposite directions)
      const baseVel = p.layer === 'top' ? shearVelocity : -shearVelocity;
      
      // Wave perturbation (Kelvin-Helmholtz instability)
      const wavePhase = p.originalX * waveFrequency + time * 2;
      const waveY = Math.sin(wavePhase) * waveAmplitude * interfaceFactor;
      const waveVy = Math.cos(wavePhase) * waveAmplitude * waveFrequency * interfaceFactor;
      
      // Vortex roll-up
      const vortexStrength = interfaceFactor * time * 0.1;
      const vortexPhase = p.originalX * waveFrequency * 2 + time;
      const vortexOffset = Math.sin(vortexPhase) * vortexStrength * 10;
      
      p.vx = baseVel * (1 - interfaceFactor * 0.5);
      p.vy = waveVy + vortexOffset * 0.1;
      
      p.x = p.originalX + baseVel * time * 20 + vortexOffset;
      p.y = p.originalY + waveY;
      
      // Wrap around
      if (p.x < 0) p.x += width;
      if (p.x > width) p.x -= width;
    });
  };
  
  const getParticleColor = (particle, midY) => {
    const topRgb = hexToRgb(topLayerColor);
    const bottomRgb = hexToRgb(bottomLayerColor);
    
    switch (colorMode) {
      case 'velocity': {
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const intensity = Math.min(speed / 5, 1);
        return particle.layer === 'top' 
          ? `rgba(${topRgb.r},${topRgb.g},${topRgb.b},${0.3 + intensity * 0.7})`
          : `rgba(${bottomRgb.r},${bottomRgb.g},${bottomRgb.b},${0.3 + intensity * 0.7})`;
      }
      case 'layer':
        return particle.layer === 'top' ? topLayerColor : bottomLayerColor;
      case 'gradient': {
        const factor = (particle.y / (midY * 2));
        const r = Math.floor(topRgb.r * (1 - factor) + bottomRgb.r * factor);
        const g = Math.floor(topRgb.g * (1 - factor) + bottomRgb.g * factor);
        const b = Math.floor(topRgb.b * (1 - factor) + bottomRgb.b * factor);
        return `rgb(${r},${g},${b})`;
      }
      default:
        return topLayerColor;
    }
  };
  
  const render = (canvas, particles) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const midY = canvas.height / 2;
    
    particles.forEach(p => {
      ctx.fillStyle = getParticleColor(p, midY);
      ctx.beginPath();
      ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    timeRef.current += 0.016;
    
    updateParticles(particlesRef.current, canvas.width, canvas.height, timeRef.current);
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
      timeRef.current = 0;
      particlesRef.current = initializeParticles(canvas.width, canvas.height);
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
  }, [particleCount, shearVelocity, waveAmplitude, waveFrequency]);
  
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
    <div ref={containerRef} className="kelvin-helmholtz" 
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
          <div>SHEAR: {shearVelocity} m/s</div>
          <div>AMPLITUDE: {waveAmplitude}px</div>
          <div>MODE: {colorMode.toUpperCase()}</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
