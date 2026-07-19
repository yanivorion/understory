import React from "react";

const MANIFEST = {
  "type": "Interactive.LavaLampLoadingIndicator",
  "description": "A mesmerizing loading indicator with authentic lava lamp physics where blobs merge, split, rise, and fall organically",
  "editorElement": {
    "selector": ".lava-lamp-loading",
    "displayName": "Lava Lamp Loading",
    "archetype": "container",
    "data": {
      "label": {
        "dataType": "text",
        "displayName": "Loading Label",
        "defaultValue": "Loading Experience",
        "group": "Content"
      },
      "blobCount": {
        "dataType": "select",
        "displayName": "Number of Blobs",
        "defaultValue": "6",
        "options": ["4", "6", "8", "10"],
        "group": "Animation"
      },
      "speed": {
        "dataType": "select",
        "displayName": "Animation Speed",
        "defaultValue": "medium",
        "options": ["slow", "medium", "fast"],
        "group": "Animation"
      },
      "viscosity": {
        "dataType": "select",
        "displayName": "Lava Viscosity",
        "defaultValue": "medium",
        "options": ["thin", "medium", "thick"],
        "group": "Animation"
      },
      "heatIntensity": {
        "dataType": "select",
        "displayName": "Heat Intensity",
        "defaultValue": "medium",
        "options": ["low", "medium", "high"],
        "group": "Animation",
        "description": "How vigorously blobs rise"
      },
      "lampHeight": {
        "dataType": "select",
        "displayName": "Lamp Height",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "lampGlassColor": {
        "dataType": "color",
        "displayName": "Lamp Glass Color",
        "defaultValue": "#2C3E50",
        "group": "Colors"
      },
      "lavaColor": {
        "dataType": "color",
        "displayName": "Lava Color",
        "defaultValue": "#E74C3C",
        "group": "Colors"
      },
      "glowColor": {
        "dataType": "color",
        "displayName": "Glow Color",
        "defaultValue": "#F39C12",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function LavaLampLoadingIndicator({ config = {} }) {
  const [blobs, setBlobs] = React.useState([]);
  
  const blobsRef = React.useRef([]);
  const animationFrameRef = React.useRef(null);
  const containerRef = React.useRef(null);
  
  const blobCount = parseInt(config?.blobCount || '6');
  const speed = config?.speed || 'medium';
  const viscosity = config?.viscosity || 'medium';
  const heatIntensity = config?.heatIntensity || 'medium';
  const lampHeight = parseInt(config?.lampHeight || '400');
  const lampWidth = lampHeight * 0.5;
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const getPhysicsParams = () => {
    const speedMultipliers = { slow: 0.6, medium: 1.0, fast: 1.6 };
    const viscosityValues = {
      thin: { friction: 0.98, rise: 0.8 },
      medium: { friction: 0.95, rise: 0.5 },
      thick: { friction: 0.92, rise: 0.3 }
    };
    const heatValues = { low: 0.6, medium: 1.0, high: 1.5 };
    
    return {
      speed: speedMultipliers[speed] || 1.0,
      ...viscosityValues[viscosity] || viscosityValues.medium,
      heat: heatValues[heatIntensity] || 1.0
    };
  };
  
  const physics = getPhysicsParams();
  
  React.useEffect(() => {
    const initialBlobs = [];
    for (let i = 0; i < blobCount; i++) {
      initialBlobs.push({
        id: i,
        x: lampWidth / 2 + (Math.random() - 0.5) * (lampWidth * 0.4),
        y: lampHeight - 60 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 2,
        radius: 20 + Math.random() * 25,
        heat: Math.random(),
        phase: Math.random() * Math.PI * 2
      });
    }
    blobsRef.current = initialBlobs;
    setBlobs(initialBlobs);
  }, [blobCount, lampWidth, lampHeight]);
  
  React.useEffect(() => {
    if (blobs.length === 0 || prefersReducedMotion) {
      if (prefersReducedMotion && blobs.length > 0) {
        const staticBlobs = blobs.map((blob, i) => ({
          ...blob,
          y: lampHeight - 80 - (i * 60),
          vx: 0,
          vy: 0
        }));
        setBlobs(staticBlobs);
      }
      return;
    }
    
    const simulate = () => {
      blobsRef.current = blobsRef.current.map(blob => {
        const buoyancy = -physics.heat * physics.rise * (0.5 + blob.heat * 0.5);
        let newVy = (blob.vy + buoyancy) * physics.friction;
        let newVx = blob.vx * physics.friction;
        let newX = blob.x + newVx * physics.speed;
        let newY = blob.y + newVy * physics.speed;
        
        const margin = blob.radius;
        if (newX - margin < 0) {
          newX = margin;
          newVx = -newVx * 0.5;
        } else if (newX + margin > lampWidth) {
          newX = lampWidth - margin;
          newVx = -newVx * 0.5;
        }
        
        if (newY + margin > lampHeight - 40) {
          newY = lampHeight - 40 - margin;
          newVy = -newVy * 0.3;
          blob.heat = Math.min(1, blob.heat + 0.01);
        }
        
        if (newY - margin < 40) {
          newY = 40 + margin;
          newVy = -newVy * 0.3;
          blob.heat = Math.max(0, blob.heat - 0.01);
        }
        
        const heightRatio = newY / lampHeight;
        if (heightRatio < 0.3) {
          blob.heat = Math.max(0, blob.heat - 0.005);
        } else if (heightRatio > 0.7) {
          blob.heat = Math.min(1, blob.heat + 0.005);
        }
        
        blob.phase += 0.02;
        newVx += Math.sin(blob.phase) * 0.1;
        
        return { ...blob, x: newX, y: newY, vx: newVx, vy: newVy };
      });
      
      for (let i = 0; i < blobsRef.current.length; i++) {
        for (let j = i + 1; j < blobsRef.current.length; j++) {
          const blob1 = blobsRef.current[i];
          const blob2 = blobsRef.current[j];
          const dx = blob2.x - blob1.x;
          const dy = blob2.y - blob1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = (blob1.radius + blob2.radius) * 0.8;
          
          if (distance < minDist && distance > 0) {
            const force = 0.05;
            const angle = Math.atan2(dy, dx);
            blob1.vx += Math.cos(angle) * force;
            blob1.vy += Math.sin(angle) * force;
            blob2.vx -= Math.cos(angle) * force;
            blob2.vy -= Math.sin(angle) * force;
          }
        }
      }
      
      setBlobs([...blobsRef.current]);
      animationFrameRef.current = requestAnimationFrame(simulate);
    };
    
    animationFrameRef.current = requestAnimationFrame(simulate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [blobs.length, lampWidth, lampHeight, physics, prefersReducedMotion]);
  
  return (
    <div
      className="lava-lamp-loading"
      style={{
        width: '100%',
        minHeight: '700px',
        backgroundColor: config?.backgroundColor || '#18181B',
        padding: '40px 32px',
        borderRadius: '8px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ position: 'relative', width: `${lampWidth}px`, height: `${lampHeight}px`, marginBottom: '32px' }}>
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: config?.lampGlassColor || '#2C3E50',
            borderRadius: `${lampWidth / 2}px ${lampWidth / 2}px 40px 40px`,
            overflow: 'hidden',
            boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)',
            border: '3px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: `radial-gradient(ellipse at center bottom, ${config?.glowColor || '#F39C12'}60, transparent)`,
            pointerEvents: 'none'
          }} />
          
          {blobs.map(blob => (
            <div
              key={blob.id}
              style={{
                position: 'absolute',
                left: `${blob.x}px`,
                top: `${blob.y}px`,
                width: `${blob.radius * 2}px`,
                height: `${blob.radius * 2}px`,
                borderRadius: '50%',
                backgroundColor: config?.lavaColor || '#E74C3C',
                transform: 'translate(-50%, -50%)',
                filter: prefersReducedMotion ? 'none' : `blur(${2 + blob.heat * 3}px)`,
                opacity: 0.8 + blob.heat * 0.2,
                boxShadow: `0 0 ${20 + blob.heat * 20}px ${config?.lavaColor || '#E74C3C'}, inset 0 0 ${10 + blob.heat * 10}px rgba(255, 255, 255, 0.3)`,
                transition: prefersReducedMotion ? 'none' : 'filter 300ms ease-out',
                willChange: 'transform',
                pointerEvents: 'none'
              }}
            />
          ))}
          
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20%',
            width: '60%',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            pointerEvents: 'none'
          }} />
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${lampWidth * 0.8}px`,
          height: '40px',
          background: `linear-gradient(to bottom, ${config?.lampGlassColor || '#2C3E50'}, #1a1a1a)`,
          borderRadius: '0 0 20px 20px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderTop: 'none'
        }} />
      </div>
      
      {config?.label && (
        <div style={{
          fontSize: `${(config?.fontSize || 16) * 1.25}px`,
          fontWeight: '300',
          color: config?.textColor || '#FFFFFF',
          marginBottom: '16px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: prefersReducedMotion ? 1 : 0.8,
          animation: prefersReducedMotion ? 'none' : 'pulse 2s ease-in-out infinite'
        }}>
          {config.label}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: config?.lavaColor || '#E74C3C',
              opacity: prefersReducedMotion ? 0.6 : 0.4,
              animation: prefersReducedMotion ? 'none' : `dotPulse 1.4s ease-in-out infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        fontSize: `${(config?.fontSize || 16) * 0.75}px`,
        color: config?.textColor || '#FFFFFF',
        opacity: 0.6,
        textAlign: 'center',
        maxWidth: '400px',
        fontWeight: '300',
        lineHeight: '1.5'
      }}>
        Authentic lava lamp physics with buoyancy, merging, and temperature dynamics
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
          40% { opacity: 1; transform: scale(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

export default LavaLampLoadingIndicator;