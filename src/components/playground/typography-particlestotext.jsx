import React from "react";

const MANIFEST = {
  "type": "Typography.ParticlesToText",
  "description": "Characters assembled from particle clouds that converge to form text",
  "editorElement": {
    "selector": ".particles-to-text",
    "displayName": "Particles To Text",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "PARTICLE ASSEMBLY",
        "group": "Content"
      },
      "showReplayButton": {
        "dataType": "booleanValue",
        "displayName": "Show Replay Button",
        "defaultValue": true,
        "group": "Content"
      },
      "triggerMode": {
        "dataType": "select",
        "displayName": "Trigger Mode",
        "defaultValue": "entrance",
        "options": ["entrance", "scroll", "manual"],
        "group": "Content"
      },
      "particlesPerChar": {
        "dataType": "select",
        "displayName": "Particles Per Character",
        "defaultValue": "12",
        "options": ["8", "12", "16", "20"],
        "group": "Animation"
      },
      "convergeDuration": {
        "dataType": "select",
        "displayName": "Converge Duration (ms)",
        "defaultValue": "1200",
        "options": ["800", "1000", "1200", "1500"],
        "group": "Animation"
      },
      "particleSize": {
        "dataType": "select",
        "displayName": "Particle Size",
        "defaultValue": "3",
        "options": ["2", "3", "4", "5"],
        "group": "Animation"
      },
      "spawnRadius": {
        "dataType": "select",
        "displayName": "Spawn Radius (px)",
        "defaultValue": "150",
        "options": ["100", "150", "200", "250"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "particleColor": {
        "dataType": "color",
        "displayName": "Particle Color",
        "defaultValue": "#71717A",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 72,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
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
  const text = config?.text || "PARTICLE ASSEMBLY";
  const showReplayButton = config?.showReplayButton !== false;
  const triggerMode = config?.triggerMode || "entrance";
  const particlesPerChar = parseInt(config?.particlesPerChar || "12");
  const convergeDuration = parseInt(config?.convergeDuration || "1200");
  const particleSize = parseInt(config?.particleSize || "3");
  const spawnRadius = parseInt(config?.spawnRadius || "150");
  const backgroundColor = config?.backgroundColor || "#18181B";
  const textColor = config?.textColor || "#FAFAFA";
  const particleColor = config?.particleColor || "#71717A";
  const fontSize = parseInt(config?.fontSize || "72");
  const fontWeight = config?.fontWeight || "500";

  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const particlesRef = React.useRef([]);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const animate = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Measure text
    ctx.font = `${fontWeight} ${fontSize}px system-ui`;
    ctx.fillStyle = textColor;
    const textWidth = ctx.measureText(text).width;
    const startX = (canvas.width - textWidth) / 2;
    const startY = canvas.height / 2;

    // Draw text to get pixel data
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(text, startX, startY);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Find text pixels and create particles
    const textPixels = [];
    for (let y = 0; y < canvas.height; y += 2) {
      for (let x = 0; x < canvas.width; x += 2) {
        const i = (y * canvas.width + x) * 4;
        if (imageData.data[i + 3] > 128) {
          textPixels.push({ x, y });
        }
      }
    }

    // Sample pixels for particles
    const sampledPixels = [];
    const step = Math.max(1, Math.floor(textPixels.length / (text.length * particlesPerChar)));
    for (let i = 0; i < textPixels.length; i += step) {
      sampledPixels.push(textPixels[i]);
    }

    // Create particles with random spawn positions
    particlesRef.current = sampledPixels.map(target => {
      const angle = Math.random() * Math.PI * 2;
      const distance = spawnRadius + Math.random() * spawnRadius;
      return {
        x: target.x + Math.cos(angle) * distance,
        y: target.y + Math.sin(angle) * distance,
        targetX: target.x,
        targetY: target.y,
        progress: 0
      };
    });

    setIsAnimating(true);
    setHasAnimated(true);

    const startTime = Date.now();
    const render = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / convergeDuration);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);

      particlesRef.current.forEach(particle => {
        const currentX = particle.x + (particle.targetX - particle.x) * eased;
        const currentY = particle.y + (particle.targetY - particle.y) * eased;
        const alpha = 0.3 + progress * 0.7;

        ctx.fillStyle = `${particleColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      });

      if (progress < 1) {
        requestAnimationFrame(render);
      } else {
        setIsAnimating(false);
        // Draw final text
        ctx.font = `${fontWeight} ${fontSize}px system-ui`;
        ctx.fillStyle = textColor;
        ctx.fillText(text, startX, startY);
      }
    };

    render();
  }, [text, fontSize, fontWeight, textColor, particleColor, particlesPerChar, convergeDuration, spawnRadius, particleSize, prefersReducedMotion]);

  const handleReplay = () => {
    setHasAnimated(false);
    setTimeout(animate, 50);
  };

  React.useEffect(() => {
    if (triggerMode === 'manual') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerMode === 'entrance' && hasAnimated) return;
            animate();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerMode, hasAnimated, animate]);

  return (
    <div
      ref={containerRef}
      className="particles-to-text"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '400px',
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />

      {showReplayButton && (
        <button
          onClick={handleReplay}
          style={{
            position: 'absolute',
            bottom: '40px',
            padding: '12px 28px',
            backgroundColor: 'transparent',
            border: `1px solid ${textColor}40`,
            borderRadius: '4px',
            color: textColor,
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 300ms ease',
            opacity: 0.6
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.6'}
        >
          Replay
        </button>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
