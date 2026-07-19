import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 15, 2025, 04:18 AM
 * Component Type: Creative.FluidColorCanvas
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Creative.FluidColorCanvas",
  "description": "Immersive drawing canvas with constantly shifting colors and artistic brush presets. Mouse movement creates fluid, rainbow-shifting strokes with zero UI interference. Features smooth, spray, glow, ribbon, and constellation brush effects with large stroke capabilities. Perfect for generative art, creative exploration, and mesmerizing visual experiences.",
  "editorElement": {
    "selector": ".fluid-color-canvas",
    "displayName": "Fluid Color Drawing Canvas",
    "archetype": "container",
    "data": {
      // Canvas Settings Group
      "canvasBackground": {
        "dataType": "select",
        "displayName": "Canvas Background",
        "defaultValue": "dark",
        "options": ["dark", "light"],
        "group": "Canvas Settings",
        "description": "Background color: dark (#212529) or light (#FFFFFF)"
      },
      "autoDrawOnMove": {
        "dataType": "booleanValue",
        "displayName": "Auto Draw on Mouse Move",
        "defaultValue": true,
        "group": "Canvas Settings",
        "description": "Automatically draw when mouse moves (no click required)"
      },
      "showInstructions": {
        "dataType": "booleanValue",
        "displayName": "Show Instructions",
        "defaultValue": true,
        "group": "Canvas Settings",
        "description": "Display usage instructions overlay (fades after 3 seconds)"
      },
      
      // Brush Settings Group
      "brushPreset": {
        "dataType": "select",
        "displayName": "Brush Preset",
        "defaultValue": "smooth",
        "options": ["smooth", "spray", "glow", "ribbon", "constellation", "web"],
        "group": "Brush Settings",
        "description": "Artistic brush effect: Smooth (fluid), Spray (scattered), Glow (luminous), Ribbon (trailing), Constellation (connected dots), Web (interconnected)"
      },
      "strokeWidth": {
        "dataType": "select",
        "displayName": "Stroke Width",
        "defaultValue": "30",
        "options": ["10", "20", "30", "50", "75", "100", "150", "200"],
        "group": "Brush Settings",
        "description": "Base stroke width in pixels - can be very large for dramatic effects"
      },
      "strokeOpacity": {
        "dataType": "select",
        "displayName": "Stroke Opacity",
        "defaultValue": "0.6",
        "options": ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"],
        "group": "Brush Settings",
        "description": "Opacity of brush strokes (lower = more transparent, builds up gradually)"
      },
      "smoothing": {
        "dataType": "select",
        "displayName": "Stroke Smoothing",
        "defaultValue": "0.3",
        "options": ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"],
        "group": "Brush Settings",
        "description": "Stroke smoothing intensity (0 = jagged, 0.7 = very smooth)"
      },
      
      // Color Animation Group
      "colorShiftSpeed": {
        "dataType": "select",
        "displayName": "Color Shift Speed",
        "defaultValue": "1.0",
        "options": ["0.2", "0.5", "0.8", "1.0", "1.5", "2.0", "3.0"],
        "group": "Color Animation",
        "description": "Speed of color transitions through the spectrum (higher = faster rainbow cycling)"
      },
      "saturation": {
        "dataType": "select",
        "displayName": "Color Saturation",
        "defaultValue": "80",
        "options": ["40", "50", "60", "70", "80", "90", "100"],
        "group": "Color Animation",
        "description": "Color saturation percentage (higher = more vibrant colors)"
      },
      "lightness": {
        "dataType": "select",
        "displayName": "Color Lightness",
        "defaultValue": "50",
        "options": ["30", "40", "50", "60", "70"],
        "group": "Color Animation",
        "description": "Color lightness percentage (50 = balanced, higher = lighter/pastel)"
      },
      
      // Layout Group
      "canvasWidth": {
        "dataType": "select",
        "displayName": "Canvas Width",
        "defaultValue": "100%",
        "options": ["800", "1000", "1200", "1400", "100%"],
        "group": "Layout",
        "description": "Width of the canvas in pixels or full width (100%)"
      },
      "canvasHeight": {
        "dataType": "select",
        "displayName": "Canvas Height",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800", "900", "1000"],
        "group": "Layout",
        "description": "Height of the canvas in pixels"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "8",
        "options": ["0", "4", "8", "12", "16"],
        "group": "Layout",
        "description": "Border radius of canvas in pixels"
      }
    }
  }
};

function Component({ config = {} }) {
  // Safe config access with defaults
  const canvasBackground = config?.canvasBackground || "dark";
  const autoDrawOnMove = config?.autoDrawOnMove !== false;
  const showInstructions = config?.showInstructions !== false;
  const brushPreset = config?.brushPreset || "smooth";
  const strokeWidth = parseInt(config?.strokeWidth || "30");
  const strokeOpacity = parseFloat(config?.strokeOpacity || "0.6");
  const smoothing = parseFloat(config?.smoothing || "0.3");
  const colorShiftSpeed = parseFloat(config?.colorShiftSpeed || "1.0");
  const saturation = parseInt(config?.saturation || "80");
  const lightness = parseInt(config?.lightness || "50");
  const canvasWidth = config?.canvasWidth || "100%";
  const canvasHeight = parseInt(config?.canvasHeight || "600");
  const cornerRadius = config?.cornerRadius || "8";

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(showInstructions);
  const lastPoint = useRef(null);
  const hueRef = useRef(0);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);

  const bgColor = canvasBackground === "dark" ? "#212529" : "#FFFFFF";
  const textColor = canvasBackground === "dark" ? "#FFFFFF" : "#212529";

  // Hide instructions after 3 seconds
  useEffect(() => {
    if (showInstructions) {
      const timer = setTimeout(() => {
        setInstructionsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showInstructions]);

  // Color animation loop
  useEffect(() => {
    const animate = () => {
      hueRef.current = (hueRef.current + colorShiftSpeed * 0.5) % 360;
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colorShiftSpeed]);

  const getCurrentColor = () => {
    return `hsl(${hueRef.current}, ${saturation}%, ${lightness}%)`;
  };

  const drawSmooth = (ctx, x, y, lastX, lastY) => {
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = strokeOpacity;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (smoothing > 0 && lastX !== null) {
      const smoothX = lastX + (x - lastX) * (1 - smoothing);
      const smoothY = lastY + (y - lastY) * (1 - smoothing);
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(smoothX, smoothY);
      ctx.stroke();
      
      return { x: smoothX, y: smoothY };
    } else {
      ctx.beginPath();
      ctx.moveTo(lastX || x, lastY || y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      return { x, y };
    }
  };

  const drawSpray = (ctx, x, y) => {
    const density = strokeWidth * 0.3;
    ctx.globalAlpha = strokeOpacity * 0.5;
    
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * strokeWidth;
      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius;
      
      ctx.fillStyle = getCurrentColor();
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawGlow = (ctx, x, y, lastX, lastY) => {
    const layers = 5;
    
    for (let i = layers; i > 0; i--) {
      ctx.strokeStyle = getCurrentColor();
      ctx.lineWidth = strokeWidth * (i / layers);
      ctx.globalAlpha = strokeOpacity * (1 / (i * 2));
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(lastX || x, lastY || y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const drawRibbon = (ctx, x, y, lastX, lastY) => {
    if (lastX === null || lastY === null) return { x, y };
    
    const dx = x - lastX;
    const dy = y - lastY;
    const angle = Math.atan2(dy, dx);
    const perpAngle = angle + Math.PI / 2;
    
    const ribbonWidth = strokeWidth;
    
    ctx.globalAlpha = strokeOpacity;
    ctx.fillStyle = getCurrentColor();
    
    ctx.beginPath();
    ctx.moveTo(
      lastX + Math.cos(perpAngle) * ribbonWidth / 2,
      lastY + Math.sin(perpAngle) * ribbonWidth / 2
    );
    ctx.lineTo(
      x + Math.cos(perpAngle) * ribbonWidth / 2,
      y + Math.sin(perpAngle) * ribbonWidth / 2
    );
    ctx.lineTo(
      x - Math.cos(perpAngle) * ribbonWidth / 2,
      y - Math.sin(perpAngle) * ribbonWidth / 2
    );
    ctx.lineTo(
      lastX - Math.cos(perpAngle) * ribbonWidth / 2,
      lastY - Math.sin(perpAngle) * ribbonWidth / 2
    );
    ctx.closePath();
    ctx.fill();
    
    return { x, y };
  };

  const drawConstellation = (ctx, x, y) => {
    // Add new particle
    particlesRef.current.push({
      x,
      y,
      hue: hueRef.current,
      life: 1.0
    });
    
    // Keep only recent particles
    particlesRef.current = particlesRef.current.slice(-50);
    
    // Draw connections
    ctx.globalAlpha = strokeOpacity * 0.3;
    particlesRef.current.forEach((particle, i) => {
      if (particle.life <= 0) return;
      
      // Draw particle
      ctx.fillStyle = `hsl(${particle.hue}, ${saturation}%, ${lightness}%)`;
      ctx.globalAlpha = strokeOpacity * particle.life;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw connections to nearby particles
      particlesRef.current.slice(i + 1).forEach(other => {
        const dist = Math.hypot(other.x - particle.x, other.y - particle.y);
        if (dist < strokeWidth * 2) {
          ctx.strokeStyle = `hsl(${particle.hue}, ${saturation}%, ${lightness}%)`;
          ctx.globalAlpha = strokeOpacity * particle.life * (1 - dist / (strokeWidth * 2));
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      });
      
      // Decay particle
      particle.life -= 0.02;
    });
    
    // Remove dead particles
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);
  };

  const drawWeb = (ctx, x, y) => {
    // Add new point
    particlesRef.current.push({
      x,
      y,
      hue: hueRef.current,
      life: 1.0
    });
    
    // Keep limited points
    particlesRef.current = particlesRef.current.slice(-30);
    
    // Draw web connections
    particlesRef.current.forEach((particle, i) => {
      if (particle.life <= 0) return;
      
      // Connect to all other points
      particlesRef.current.slice(i + 1).forEach(other => {
        const dist = Math.hypot(other.x - particle.x, other.y - particle.y);
        if (dist < strokeWidth * 3) {
          ctx.strokeStyle = `hsl(${(particle.hue + other.hue) / 2}, ${saturation}%, ${lightness}%)`;
          ctx.globalAlpha = strokeOpacity * particle.life * other.life * (1 - dist / (strokeWidth * 3));
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      });
      
      // Decay
      particle.life -= 0.015;
    });
    
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!autoDrawOnMove && !isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    
    const lastX = lastPoint.current?.x || null;
    const lastY = lastPoint.current?.y || null;
    
    switch (brushPreset) {
      case 'smooth':
        lastPoint.current = drawSmooth(ctx, x, y, lastX, lastY);
        break;
      case 'spray':
        drawSpray(ctx, x, y);
        lastPoint.current = { x, y };
        break;
      case 'glow':
        drawGlow(ctx, x, y, lastX, lastY);
        lastPoint.current = { x, y };
        break;
      case 'ribbon':
        lastPoint.current = drawRibbon(ctx, x, y, lastX, lastY);
        break;
      case 'constellation':
        drawConstellation(ctx, x, y);
        lastPoint.current = { x, y };
        break;
      case 'web':
        drawWeb(ctx, x, y);
        lastPoint.current = { x, y };
        break;
      default:
        lastPoint.current = drawSmooth(ctx, x, y, lastX, lastY);
    }
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    if (!autoDrawOnMove) {
      draw(e);
    }
  };

  const handleMouseMove = (e) => {
    draw(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current = [];
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'c' || e.key === 'C') {
        clearCanvas();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div 
      className="fluid-color-canvas"
      style={{
        width: '100%',
        maxWidth: canvasWidth === '100%' ? '100%' : `${canvasWidth}px`,
        margin: '0 auto',
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasWidth === '100%' ? 1400 : parseInt(canvasWidth)}
        height={canvasHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          backgroundColor: bgColor,
          borderRadius: `${cornerRadius}px`,
          cursor: 'crosshair',
          display: 'block',
          width: '100%',
          height: 'auto',
          touchAction: 'none'
        }}
      />
      
      {instructionsVisible && (
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: canvasBackground === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '12px 24px',
          borderRadius: '8px',
          color: textColor,
          fontSize: '14px',
          fontWeight: '400',
          pointerEvents: 'none',
          opacity: 1,
          animation: 'fadeOut 3s forwards',
          textAlign: 'center'
        }}>
          {autoDrawOnMove ? 'Move mouse to draw' : 'Click and drag to draw'} • Press 'C' to clear
        </div>
      )}
      
      <style>{`
        @keyframes fadeOut {
          0%, 80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
