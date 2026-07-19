import React from "react";

const MANIFEST = {"type": "Visualization.PhysarumSlimeMold", "description": "Physarum slime mold simulation with agent-based pathfinding", "editorElement": {"selector": ".physarum-slime-mold", "displayName": "Physarum Slime Mold", "archetype": "container", "data": {"agentCount": {"dataType": "select", "displayName": "Agent Count", "defaultValue": "1000", "options": ["500", "800", "1000", "1500", "2000"], "group": "Content"}, "sensorAngle": {"dataType": "select", "displayName": "Sensor Angle", "defaultValue": "45", "options": ["30", "45", "60", "90"], "group": "Animation"}, "turnAngle": {"dataType": "select", "displayName": "Turn Angle", "defaultValue": "45", "options": ["30", "45", "60", "90"], "group": "Animation"}, "decayRate": {"dataType": "select", "displayName": "Decay Rate", "defaultValue": "0.95", "options": ["0.9", "0.93", "0.95", "0.97", "0.99"], "group": "Animation"}, "showInfo": {"dataType": "booleanValue", "displayName": "Show Info", "defaultValue": true, "group": "Content"}, "backgroundColor": {"dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors"}, "trailColor": {"dataType": "color", "displayName": "Trail Color", "defaultValue": "#212529", "group": "Colors"}, "textColor": {"dataType": "color", "displayName": "Text Color", "defaultValue": "#495057", "group": "Colors"}, "fontSize": {"dataType": "number", "displayName": "Font Size", "defaultValue": 12, "group": "Typography"}, "fontWeight": {"dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography"}}, "layout": {"resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical"}}};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const trailCanvasRef = React.useRef(null);
  const agentsRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  
  const agentCount = parseInt(config?.agentCount || '1000');
  const sensorAngle = parseFloat(config?.sensorAngle || '45') * Math.PI / 180;
  const turnAngle = parseFloat(config?.turnAngle || '45') * Math.PI / 180;
  const decayRate = parseFloat(config?.decayRate || '0.95');
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const trailColor = config?.trailColor || '#212529';
  const textColor = config?.textColor || '#495057';
  const fontSize = config?.fontSize || 12;
  const fontWeight = config?.fontWeight || '400';
  
  const initializeAgents = (width, height) => {
    const agents = [];
    const cx = width / 2;
    const cy = height / 2;
    for (let i = 0; i < agentCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      agents.push({x: cx + (Math.random() - 0.5) * 100, y: cy + (Math.random() - 0.5) * 100, angle});
    }
    return agents;
  };
  
  const sense = (x, y, angle, trailCtx, width, height) => {
    const sensorDist = 9;
    const sx = x + Math.cos(angle) * sensorDist;
    const sy = y + Math.sin(angle) * sensorDist;
    if (sx < 0 || sx >= width || sy < 0 || sy >= height) return 0;
    const data = trailCtx.getImageData(Math.floor(sx), Math.floor(sy), 1, 1).data;
    return data[0];
  };
  
  const updateAgents = (agents, trailCanvas, width, height) => {
    const trailCtx = trailCanvas.getContext('2d');
    agents.forEach(agent => {
      const fwd = sense(agent.x, agent.y, agent.angle, trailCtx, width, height);
      const left = sense(agent.x, agent.y, agent.angle - sensorAngle, trailCtx, width, height);
      const right = sense(agent.x, agent.y, agent.angle + sensorAngle, trailCtx, width, height);
      
      if (fwd > left && fwd > right) {
      } else if (fwd < left && fwd < right) {
        agent.angle += (Math.random() - 0.5) * 2 * turnAngle;
      } else if (left < right) {
        agent.angle += turnAngle;
      } else if (right < left) {
        agent.angle -= turnAngle;
      }
      
      agent.x += Math.cos(agent.angle) * 1;
      agent.y += Math.sin(agent.angle) * 1;
      
      if (agent.x < 0 || agent.x >= width || agent.y < 0 || agent.y >= height) {
        agent.angle = Math.random() * Math.PI * 2;
        agent.x = Math.max(0, Math.min(width - 1, agent.x));
        agent.y = Math.max(0, Math.min(height - 1, agent.y));
      }
    });
  };
  
  const render = (canvas, trailCanvas, agents) => {
    if (!canvas || !trailCanvas) return;
    const ctx = canvas.getContext('2d');
    const trailCtx = trailCanvas.getContext('2d');
    
    trailCtx.fillStyle = `rgba(255,255,255,${1 - decayRate})`;
    trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height);
    
    trailCtx.fillStyle = trailColor;
    agents.forEach(agent => {
      trailCtx.fillRect(Math.floor(agent.x), Math.floor(agent.y), 1, 1);
    });
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(trailCanvas, 0, 0);
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    const canvas = canvasRef.current;
    const trailCanvas = trailCanvasRef.current;
    if (!canvas || !trailCanvas) return;
    updateAgents(agentsRef.current, trailCanvas, canvas.width, canvas.height);
    render(canvas, trailCanvas, agentsRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) animate();
  };
  
  const handleReset = () => {
    const canvas = canvasRef.current;
    const trailCanvas = trailCanvasRef.current;
    if (canvas && trailCanvas) {
      agentsRef.current = initializeAgents(canvas.width, canvas.height);
      const trailCtx = trailCanvas.getContext('2d');
      trailCtx.fillStyle = '#FFFFFF';
      trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height);
      render(canvas, trailCanvas, agentsRef.current);
    }
  };
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const trailCanvas = trailCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !trailCanvas || !container) return;
    
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        trailCanvas.width = rect.width;
        trailCanvas.height = rect.height;
        agentsRef.current = initializeAgents(rect.width, rect.height);
        const trailCtx = trailCanvas.getContext('2d');
        trailCtx.fillStyle = '#FFFFFF';
        trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height);
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
  }, [agentCount, sensorAngle, turnAngle, decayRate]);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return <div style={{width: '100%', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight}}>Animation disabled (reduced motion preference detected)</div>;
  }
  
  return (
    <div ref={containerRef} className="physarum-slime-mold" style={{width: '100%', height: '100%', minHeight: '500px', position: 'relative', backgroundColor, overflow: 'hidden'}}>
      <canvas ref={trailCanvasRef} style={{display: 'none'}} />
      <canvas ref={canvasRef} style={{display: 'block', width: '100%', height: '100%'}} />
      <div style={{position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px'}}>
        <button onClick={togglePause} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>{isPausedRef.current ? 'PLAY' : 'PAUSE'}</button>
        <button onClick={handleReset} style={{padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', color: textColor, fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer', transition: 'all 200ms ease-out'}}>RESET</button>
      </div>
      {showInfo && (
        <div style={{position: 'absolute', top: '16px', right: '16px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${textColor}`, borderRadius: '6px', fontFamily: 'ui-monospace, monospace', fontSize: `${fontSize}px`, fontWeight, color: textColor, lineHeight: 1.6}}>
          <div>AGENTS: {agentCount}</div>
          <div>DECAY: {decayRate}</div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
