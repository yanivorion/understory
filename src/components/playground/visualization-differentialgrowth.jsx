import React from "react";

const MANIFEST = {"type": "Visualization.DifferentialGrowth", "description": "Differential growth algorithm simulating coral/brain tissue organic expansion", "editorElement": {"selector": ".differential-growth", "displayName": "Differential Growth", "archetype": "container", "data": {"nodeCount": {"dataType": "select", "displayName": "Initial Nodes", "defaultValue": "50", "options": ["30", "40", "50", "60", "80"], "group": "Content"}, "growthRate": {"dataType": "select", "displayName": "Growth Rate", "defaultValue": "0.5", "options": ["0.2", "0.3", "0.5", "0.7", "1.0"], "group": "Animation"}, "maxDist": {"dataType": "select", "displayName": "Max Distance", "defaultValue": "15", "options": ["10", "12", "15", "18", "20"], "group": "Animation"}, "repulsion": {"dataType": "select", "displayName": "Repulsion Force", "defaultValue": "0.5", "options": ["0.2", "0.3", "0.5", "0.7", "1.0"], "group": "Animation"}, "showInfo": {"dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content"}, "backgroundColor": {"dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors"}, "organismColor": {"dataType": "color", "displayName": "Organism Color", "defaultValue": "#212529", "group": "Colors"}, "textColor": {"dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors"}, "lineWidth": {"dataType": "select", "displayName": "Line Width", "defaultValue": "2", "options": ["1", "1.5", "2", "2.5", "3"], "group": "Layout"}, "fontSize": {"dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography"}, "fontWeight": {"dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography"}}, "layout": {"resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical"}}};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const nodesRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  
  const nodeCount = parseInt(config?.nodeCount || '50');
  const growthRate = parseFloat(config?.growthRate || '0.5');
  const maxDist = parseFloat(config?.maxDist || '15');
  const repulsion = parseFloat(config?.repulsion || '0.5');
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const organismColor = config?.organismColor || '#212529';
  const textColor = config?.textColor || '#495057';
  const lineWidth = parseFloat(config?.lineWidth || '2');
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const initializeNodes = (width, height) => {
    const nodes = [];
    const cx = width / 2;
    const cy = height / 2;
    const radius = 50;
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      nodes.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: 0,
        vy: 0
      });
    }
    return nodes;
  };
  
  const updateNodes = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const prev = nodes[(i - 1 + nodes.length) % nodes.length];
      const next = nodes[(i + 1) % nodes.length];
      
      const dx1 = prev.x - node.x;
      const dy1 = prev.y - node.y;
      const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      
      const dx2 = next.x - node.x;
      const dy2 = next.y - node.y;
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      
      if (dist1 > maxDist) {
        const newNode = {
          x: (node.x + prev.x) / 2,
          y: (node.y + prev.y) / 2,
          vx: 0,
          vy: 0
        };
        nodes.splice(i, 0, newNode);
        i++;
      }
      
      let fx = 0, fy = 0;
      
      for (let j = 0; j < nodes.length; j++) {
        if (Math.abs(i - j) < 2 || Math.abs(i - j) > nodes.length - 2) continue;
        
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        
        if (dist < maxDist * 2 && dist > 0) {
          const force = repulsion / distSq;
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        }
      }
      
      node.vx = (node.vx + fx) * 0.9;
      node.vy = (node.vy + fy) * 0.9;
      node.x += node.vx * growthRate;
      node.y += node.vy * growthRate;
    }
    
    if (nodes.length > 2000) {
      nodes.splice(Math.floor(nodes.length / 2), 1);
    }
  };
  
  const render = (canvas, nodes) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = organismColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    if (nodes.length > 0) {
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
      }
      ctx.closePath();
    }
    ctx.stroke();
    
    ctx.fillStyle = organismColor + '20';
    ctx.fill();
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    updateNodes(nodesRef.current);
    render(canvas, nodesRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      nodesRef.current = initializeNodes(canvas.width, canvas.height);
      render(canvas, nodesRef.current);
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
        nodesRef.current = initializeNodes(rect.width, rect.height);
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
  }, [nodeCount, growthRate, maxDist, repulsion]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return <div style={{width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight}}>Animation disabled (reduced motion preference detected)</div>;
  }
  
  return (
    <div ref={containerRef} className="differential-growth" style={{width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden'}}>
      <canvas ref={canvasRef} style={{display: 'block', width: '100%', height: '100%'}} />
      <div style={{position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px'}}>
        <button onClick={togglePause} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>{isPausedRef.current ? 'PLAY' : 'PAUSE'}</button>
        <button onClick={handleReset} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>RESET</button>
      </div>
      {showInfo && (
        <div style={{position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6}}>
          <div>NODES: {nodesRef.current.length}</div>
          <div>GROWTH: {growthRate}</div>
          <div>REPULSION: {repulsion}</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
