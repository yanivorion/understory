import React from "react";

const MANIFEST = {
  "type": "Visualization.VoronoiOrganism",
  "description": "Living Voronoi diagram with organic pulsing cellular structure",
  "editorElement": {
    "selector": ".voronoi-organism",
    "displayName": "Voronoi Organism",
    "archetype": "container",
    "data": {
      "siteCount": {
        "dataType": "select",
        "displayName": "Cell Count",
        "defaultValue": "50",
        "options": ["20", "30", "50", "75", "100"],
        "group": "Content",
        "description": "Number of Voronoi sites"
      },
      "pulseSpeed": {
        "dataType": "select",
        "displayName": "Pulse Speed",
        "defaultValue": "1.0",
        "options": ["0.5", "1.0", "2.0", "3.0"],
        "group": "Content",
        "description": "Organic pulsing speed"
      },
      "movementSpeed": {
        "dataType": "select",
        "displayName": "Movement Speed",
        "defaultValue": "0.5",
        "options": ["0.1", "0.3", "0.5", "1.0"],
        "group": "Content",
        "description": "Site drift speed"
      },
      "colorMode": {
        "dataType": "select",
        "displayName": "Color Mode",
        "defaultValue": "alternating",
        "options": ["alternating", "distance", "uniform"],
        "group": "Content",
        "description": "Cell coloring strategy"
      },
      "showSites": {
        "dataType": "booleanValue",
        "displayName": "Show Site Points",
        "defaultValue": true,
        "group": "Content"
      },
      "showBorders": {
        "dataType": "booleanValue",
        "displayName": "Show Cell Borders",
        "defaultValue": true,
        "group": "Content"
      },
      "mouseInfluence": {
        "dataType": "select",
        "displayName": "Mouse Influence",
        "defaultValue": "0.5",
        "options": ["0", "0.3", "0.5", "1.0"],
        "group": "Content",
        "description": "0 = none, 1.0 = strong attraction"
      },
      "showControls": {
        "dataType": "booleanValue",
        "displayName": "Show Controls",
        "defaultValue": true,
        "group": "Content"
      },
      "showInfo": {
        "dataType": "booleanValue",
        "displayName": "Show Statistics",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "cellColor1": {
        "dataType": "color",
        "displayName": "Cell Color 1",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "cellColor2": {
        "dataType": "color",
        "displayName": "Cell Color 2",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "siteColor": {
        "dataType": "color",
        "displayName": "Site Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "activeSiteColor": {
        "dataType": "color",
        "displayName": "Active Site Color",
        "defaultValue": "#18181B",
        "group": "Colors"
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
  const sitesRef = React.useRef([]);
  const animationRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const timeRef = React.useRef(0);
  const mouseRef = React.useRef({ x: -1000, y: -1000, active: false });
  
  const siteCount = parseInt(config?.siteCount || '50');
  const pulseSpeed = parseFloat(config?.pulseSpeed || '1.0');
  const movementSpeed = parseFloat(config?.movementSpeed || '0.5');
  const colorMode = config?.colorMode || 'alternating';
  const showSites = config?.showSites !== false;
  const showBorders = config?.showBorders !== false;
  const mouseInfluence = parseFloat(config?.mouseInfluence || '0.5');
  const showControls = config?.showControls !== false;
  const showInfo = config?.showInfo !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const cellColor1 = config?.cellColor1 || '#FAFAFA';
  const cellColor2 = config?.cellColor2 || '#F4F4F5';
  const borderColor = config?.borderColor || '#E4E4E7';
  const siteColor = config?.siteColor || '#3F3F46';
  const activeSiteColor = config?.activeSiteColor || '#18181B';
  
  const [cellCount, setCellCount] = React.useState(0);
  
  const initializeSites = (count, width, height) => {
    const sites = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      sites.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * movementSpeed,
        vy: Math.sin(angle) * movementSpeed,
        phase: Math.random() * Math.PI * 2,
        baseSize: 3 + Math.random() * 2
      });
    }
    return sites;
  };
  
  const calculateVoronoi = (sites, width, height) => {
    const cells = [];
    
    sites.forEach((site, index) => {
      const points = [];
      const samples = 32;
      
      for (let i = 0; i < samples; i++) {
        const angle = (i / samples) * Math.PI * 2;
        let maxDist = Math.max(width, height) * 2;
        
        for (let r = 10; r < maxDist; r += 10) {
          const testX = site.x + Math.cos(angle) * r;
          const testY = site.y + Math.sin(angle) * r;
          
          let closest = index;
          let closestDist = Infinity;
          
          sites.forEach((otherSite, otherIndex) => {
            const dist = Math.hypot(testX - otherSite.x, testY - otherSite.y);
            if (dist < closestDist) {
              closestDist = dist;
              closest = otherIndex;
            }
          });
          
          if (closest !== index) {
            points.push({ x: testX, y: testY });
            break;
          }
        }
      }
      
      cells.push({ site, points });
    });
    
    return cells;
  };
  
  const updateSites = (width, height, time) => {
    sitesRef.current.forEach((site) => {
      const pulseX = Math.sin(time * pulseSpeed + site.phase) * movementSpeed;
      const pulseY = Math.cos(time * pulseSpeed + site.phase * 1.3) * movementSpeed;
      
      site.x += site.vx + pulseX;
      site.y += site.vy + pulseY;
      
      if (mouseRef.current.active && mouseInfluence > 0) {
        const dx = mouseRef.current.x - site.x;
        const dy = mouseRef.current.y - site.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * mouseInfluence * 0.5;
          site.x += (dx / dist) * force;
          site.y += (dy / dist) * force;
        }
      }
      
      if (site.x < 0) site.x = width;
      if (site.x > width) site.x = 0;
      if (site.y < 0) site.y = height;
      if (site.y > height) site.y = 0;
      
      if (Math.random() < 0.01) {
        site.vx += (Math.random() - 0.5) * 0.1;
        site.vy += (Math.random() - 0.5) * 0.1;
      }
      
      const speed = Math.hypot(site.vx, site.vy);
      if (speed > movementSpeed * 2) {
        site.vx = (site.vx / speed) * movementSpeed * 2;
        site.vy = (site.vy / speed) * movementSpeed * 2;
      }
    });
  };
  
  const render = (canvas, time) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    const cells = calculateVoronoi(sitesRef.current, width, height);
    setCellCount(cells.length);
    
    cells.forEach((cell, index) => {
      if (cell.points.length < 3) return;
      
      let fillColor;
      if (colorMode === 'alternating') {
        fillColor = index % 2 === 0 ? cellColor1 : cellColor2;
      } else if (colorMode === 'distance') {
        const centerDist = Math.hypot(cell.site.x - width / 2, cell.site.y - height / 2);
        const maxDist = Math.hypot(width / 2, height / 2);
        const t = centerDist / maxDist;
        fillColor = t < 0.5 ? cellColor1 : cellColor2;
      } else {
        fillColor = cellColor1;
      }
      
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.moveTo(cell.points[0].x, cell.points[0].y);
      cell.points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.fill();
      
      if (showBorders) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
    
    if (showSites) {
      sitesRef.current.forEach((site) => {
        const pulse = 1 + Math.sin(time * pulseSpeed * 2 + site.phase) * 0.3;
        const size = site.baseSize * pulse;
        
        const nearMouse = mouseRef.current.active && 
          Math.hypot(site.x - mouseRef.current.x, site.y - mouseRef.current.y) < 50;
        
        ctx.fillStyle = nearMouse ? activeSiteColor : siteColor;
        ctx.beginPath();
        ctx.arc(site.x, site.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  };
  
  const animate = () => {
    if (isPausedRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    timeRef.current += 0.016;
    updateSites(canvas.width, canvas.height, timeRef.current);
    render(canvas, timeRef.current);
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };
  
  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };
  
  const reset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    sitesRef.current = initializeSites(siteCount, canvas.width, canvas.height);
    timeRef.current = 0;
  };
  
  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
    if (!isPausedRef.current) {
      animate();
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
      }
    };
    
    updateSize();
    
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    
    sitesRef.current = initializeSites(siteCount, canvas.width, canvas.height);
    animate();
    
    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [siteCount, pulseSpeed, movementSpeed, colorMode, showSites, showBorders, mouseInfluence,
      backgroundColor, cellColor1, cellColor2, borderColor, siteColor, activeSiteColor]);
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  if (prefersReducedMotion) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        color: siteColor,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px'
      }}>
        Animation disabled (reduced motion preference detected)
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className="voronoi-organism" 
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        position: 'relative',
        backgroundColor,
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
      
      {showInfo && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '12px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '6px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
          fontSize: '11px',
          color: '#18181B',
          lineHeight: '1.6'
        }}>
          <div>Cells: {cellCount}</div>
          <div>Mode: {colorMode}</div>
        </div>
      )}
      
      {showControls && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          padding: '12px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={togglePause}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '500',
              color: '#18181B',
              backgroundColor: 'transparent',
              border: '1px solid #E4E4E7',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#FAFAFA';
              e.target.style.borderColor = '#D4D4D8';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#E4E4E7';
            }}
          >
            {isPausedRef.current ? 'Resume' : 'Pause'}
          </button>
          
          <button
            onClick={reset}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '500',
              color: '#18181B',
              backgroundColor: 'transparent',
              border: '1px solid #E4E4E7',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#FAFAFA';
              e.target.style.borderColor = '#D4D4D8';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#E4E4E7';
            }}
          >
            Reset
          </button>
          
          <div style={{
            fontSize: '11px',
            color: '#71717A',
            alignSelf: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Move mouse to influence cells
          </div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
