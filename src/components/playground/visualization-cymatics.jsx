import React from "react";

const MANIFEST = {
  "type": "Visualization.Cymatics",
  "description": "Standing wave patterns visualization, Chladni plate simulation with frequency resonance",
  "editorElement": {
    "selector": ".cymatics",
    "displayName": "Cymatics",
    "archetype": "container",
    "data": {
      "frequency": { "dataType": "select", "displayName": "Frequency", "defaultValue": "7", "options": ["3", "5", "7", "9", "11", "13"], "group": "Content" },
      "nodeCount": { "dataType": "select", "displayName": "Node Density", "defaultValue": "80", "options": ["50", "60", "80", "100", "120"], "group": "Content" },
      "amplitude": { "dataType": "select", "displayName": "Amplitude", "defaultValue": "1.0", "options": ["0.5", "0.7", "1.0", "1.3", "1.5"], "group": "Animation" },
      "showInfo": { "dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors" },
      "nodeColor": { "dataType": "color", "displayName": "Node Color", "defaultValue": "#212529", "group": "Colors" },
      "antiNodeColor": { "dataType": "color", "displayName": "Anti-Node Color", "defaultValue": "#E9ECEF", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors" },
      "fontSize": { "dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const timeRef = React.useRef(0);
  
  const frequency = parseInt(config?.frequency || '7');
  const nodeCount = parseInt(config?.nodeCount || '80');
  const amplitude = parseFloat(config?.amplitude || '1.0');
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const nodeColor = config?.nodeColor || '#212529';
  const antiNodeColor = config?.antiNodeColor || '#E9ECEF';
  const textColor = config?.textColor || '#495057';
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
  };
  
  const chladniPattern = (x, y, time) => {
    const n = frequency;
    const m = frequency;
    const phase = time * 2;
    return Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * y) * Math.cos(phase) * amplitude;
  };
  
  const render = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const size = Math.min(width, height) * 0.8;
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    const nodeRgb = hexToRgb(nodeColor);
    const antiRgb = hexToRgb(antiNodeColor);
    
    for (let i = 0; i < nodeCount; i++) {
      for (let j = 0; j < nodeCount; j++) {
        const x = i / nodeCount;
        const y = j / nodeCount;
        const value = chladniPattern(x, y, timeRef.current);
        
        const pixelX = centerX - size / 2 + (i / nodeCount) * size;
        const pixelY = centerY - size / 2 + (j / nodeCount) * size;
        
        const distance = Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2));
        if (distance > 0.5) continue;
        
        const intensity = Math.abs(value);
        const r = Math.floor(nodeRgb.r * intensity + antiRgb.r * (1 - intensity));
        const g = Math.floor(nodeRgb.g * intensity + antiRgb.g * (1 - intensity));
        const b = Math.floor(nodeRgb.b * intensity + antiRgb.b * (1 - intensity));
        
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(pixelX, pixelY, size / nodeCount + 1, size / nodeCount + 1);
      }
    }
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    timeRef.current += 0.016;
    render(canvas);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    timeRef.current = 0;
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
  }, [frequency, nodeCount, amplitude]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return (
      <div style={{ width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight }}>
        Animation disabled (reduced motion preference detected)
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="cymatics" style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px' }}>
        <button onClick={togglePause} style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out' }}>
          {isPausedRef.current ? 'PLAY' : 'PAUSE'}
        </button>
        <button onClick={handleReset} style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out' }}>
          RESET
        </button>
      </div>
      {showInfo && (
        <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6 }}>
          <div>FREQUENCY: {frequency}Hz</div>
          <div>NODES: {nodeCount}x{nodeCount}</div>
          <div>AMPLITUDE: {amplitude}</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
