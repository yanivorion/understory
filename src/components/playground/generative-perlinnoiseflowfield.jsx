import React from "react";

const MANIFEST = {
  "type": "Generative.PerlinNoiseFlowField",
  "description": "Particle system following Perlin noise vector field creating organic, flowing visual patterns with mathematical precision",
  "editorElement": {
    "selector": ".perlin-flow-field",
    "displayName": "Perlin Noise Flow Field",
    "archetype": "container",
    "data": {
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "particleColor": {
        "dataType": "color",
        "displayName": "Particle Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "trailColor": {
        "dataType": "color",
        "displayName": "Trail Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "particleCount": {
        "dataType": "select",
        "displayName": "Particle Count",
        "defaultValue": "500",
        "options": ["200", "300", "500", "800", "1000"],
        "group": "Content"
      },
      "particleSize": {
        "dataType": "select",
        "displayName": "Particle Size (px)",
        "defaultValue": "2",
        "options": ["1", "2", "3", "4"],
        "group": "Content"
      },
      "flowSpeed": {
        "dataType": "select",
        "displayName": "Flow Speed",
        "defaultValue": "1.0",
        "options": ["0.5", "0.75", "1.0", "1.5", "2.0"],
        "group": "Animation"
      },
      "noiseScale": {
        "dataType": "select",
        "displayName": "Noise Scale",
        "defaultValue": "0.005",
        "options": ["0.003", "0.005", "0.008", "0.01"],
        "group": "Animation"
      },
      "noiseEvolution": {
        "dataType": "select",
        "displayName": "Noise Evolution Speed",
        "defaultValue": "0.0005",
        "options": ["0.0002", "0.0005", "0.001", "0.002"],
        "group": "Animation"
      },
      "trailLength": {
        "dataType": "select",
        "displayName": "Trail Length",
        "defaultValue": "20",
        "options": ["10", "15", "20", "30", "40"],
        "group": "Content"
      },
      "showVectorField": {
        "dataType": "booleanValue",
        "displayName": "Show Vector Field",
        "defaultValue": false,
        "group": "Content"
      },
      "fadeBackground": {
        "dataType": "booleanValue",
        "displayName": "Fade Background",
        "defaultValue": true,
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const canvasRef = React.useRef(null);
  const particlesRef = React.useRef([]);
  const animationFrameRef = React.useRef(null);
  const timeRef = React.useRef(0);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const particleColor = config?.particleColor || "#212529";
  const trailColor = config?.trailColor || "#495057";
  const particleCount = parseInt(config?.particleCount) || 500;
  const particleSize = parseInt(config?.particleSize) || 2;
  const flowSpeed = parseFloat(config?.flowSpeed) || 1.0;
  const noiseScale = parseFloat(config?.noiseScale) || 0.005;
  const noiseEvolution = parseFloat(config?.noiseEvolution) || 0.0005;
  const trailLength = parseInt(config?.trailLength) || 20;
  const showVectorField = config?.showVectorField || false;
  const fadeBackground = config?.fadeBackground !== false;

  // Simple Perlin noise implementation (simplified 2D)
  const noise2D = (x, y) => {
    // Simplified noise using sine waves (approximation of Perlin)
    const a = Math.sin(x * 1.5 + y * 0.8) * 0.5;
    const b = Math.sin(x * 0.8 - y * 1.2) * 0.5;
    const c = Math.sin(x * 2.1 + y * 1.7) * 0.3;
    return (a + b + c) / 1.3;
  };

  // Get flow vector at position
  const getFlowVector = (x, y, time) => {
    const angle = noise2D(x * noiseScale, y * noiseScale + time) * Math.PI * 4;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
  };

  // Initialize particles
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        history: []
      });
    }
    particlesRef.current = particles;
  }, [particleCount]);

  // Animation loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = rect.height;

    if (prefersReducedMotion) {
      // Draw static state
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = particleColor;
      particlesRef.current.forEach(particle => {
        ctx.fillRect(particle.x - particleSize/2, particle.y - particleSize/2, particleSize, particleSize);
      });
      return;
    }

    const animate = () => {
      timeRef.current += noiseEvolution;

      // Fade background for trails
      if (fadeBackground) {
        ctx.fillStyle = `${backgroundColor}08`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw vector field if enabled
      if (showVectorField) {
        const gridSize = 30;
        ctx.strokeStyle = `${trailColor}30`;
        ctx.lineWidth = 1;
        
        for (let x = 0; x < canvas.width; x += gridSize) {
          for (let y = 0; y < canvas.height; y += gridSize) {
            const vector = getFlowVector(x, y, timeRef.current);
            const length = 15;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + vector.x * length, y + vector.y * length);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Get flow vector
        const vector = getFlowVector(particle.x, particle.y, timeRef.current);
        
        // Update position
        particle.x += vector.x * flowSpeed;
        particle.y += vector.y * flowSpeed;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Store history for trails
        particle.history.push({ x: particle.x, y: particle.y });
        if (particle.history.length > trailLength) {
          particle.history.shift();
        }
        
        // Draw trail
        if (particle.history.length > 1) {
          ctx.strokeStyle = trailColor;
          ctx.lineWidth = particleSize * 0.5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(particle.history[0].x, particle.history[0].y);
          
          for (let i = 1; i < particle.history.length; i++) {
            const alpha = i / particle.history.length;
            ctx.globalAlpha = alpha * 0.3;
            ctx.lineTo(particle.history[i].x, particle.history[i].y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        
        // Draw particle
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    backgroundColor, particleColor, trailColor, particleSize, flowSpeed, 
    noiseScale, noiseEvolution, trailLength, showVectorField, fadeBackground, prefersReducedMotion
  ]);

  const containerStyle = {
    width: '100%',
    height: '600px',
    backgroundColor,
    position: 'relative',
    overflow: 'hidden'
  };

  const canvasStyle = {
    width: '100%',
    height: '100%',
    display: 'block'
  };

  const infoStyle = {
    position: 'absolute',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '14px',
    color: particleColor,
    opacity: 0.4,
    textAlign: 'center',
    pointerEvents: 'none',
    fontWeight: '300'
  };

  return (
    <div style={containerStyle} className="perlin-flow-field">
      <canvas ref={canvasRef} style={canvasStyle} />
      
      <div style={infoStyle}>
        Perlin noise flow field • {particleCount} particles following vector field
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
