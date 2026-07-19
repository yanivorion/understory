import React from "react";

const MANIFEST = {
  "type": "Scroll.ImageSequencePlayer",
  "description": "Scroll-triggered image sequence player with frame scrubbing and progress bar",
  "editorElement": {
    "selector": ".image-sequence-player",
    "displayName": "Image Sequence Player",
    "archetype": "container",
    "data": {
      "frameCount": {
        "dataType": "select",
        "displayName": "Number of Frames",
        "defaultValue": "60",
        "options": ["30", "45", "60", "90", "120"],
        "group": "Content"
      },
      "scrollDistance": {
        "dataType": "select",
        "displayName": "Scroll Distance (vh)",
        "defaultValue": "300",
        "options": ["200", "300", "400", "500"],
        "group": "Animation"
      },
      "interpolation": {
        "dataType": "select",
        "displayName": "Frame Interpolation",
        "defaultValue": "smooth",
        "options": ["discrete", "smooth"],
        "group": "Animation"
      },
      "showProgress": {
        "dataType": "booleanValue",
        "displayName": "Show Progress Bar",
        "defaultValue": true,
        "group": "Content"
      },
      "showFrameNumber": {
        "dataType": "booleanValue",
        "displayName": "Show Frame Number",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Bar Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "both",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // Config values
  const frameCount = parseInt(config?.frameCount || "60");
  const scrollDistance = parseInt(config?.scrollDistance || "300");
  const interpolation = config?.interpolation || "smooth";
  const showProgress = config?.showProgress !== false;
  const showFrameNumber = config?.showFrameNumber !== false;
  const backgroundColor = config?.backgroundColor || "#000000";
  const progressColor = config?.progressColor || "#FFFFFF";
  const textColor = config?.textColor || "#FFFFFF";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Generate procedural frames (geometric patterns for demo)
  const drawFrame = (frame) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Create animated geometric pattern
    const progress = frame / frameCount;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw rotating and scaling shapes
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 / 8) * i + progress * Math.PI * 2;
      const radius = 80 + Math.sin(progress * Math.PI * 2 + i) * 40;
      const x = centerX + Math.cos(angle) * (100 + progress * 80);
      const y = centerY + Math.sin(angle) * (100 + progress * 80);
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + progress * Math.PI * 4);
      
      // Gradient fill
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, `hsla(${(progress * 360 + i * 45) % 360}, 70%, 60%, 0.8)`);
      gradient.addColorStop(1, `hsla(${(progress * 360 + i * 45) % 360}, 70%, 40%, 0.3)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(-radius/2, -radius/2, radius, radius);
      
      ctx.restore();
    }
    
    // Draw center circle
    const centerRadius = 60 + Math.sin(progress * Math.PI * 4) * 20;
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centerRadius);
    centerGradient.addColorStop(0, `hsla(${progress * 360}, 80%, 70%, 1)`);
    centerGradient.addColorStop(1, `hsla(${progress * 360}, 80%, 50%, 0.5)`);
    
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
    ctx.fill();
  };

  // Handle scroll
  const handleScroll = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress through the container
    const scrollStart = rect.top + windowHeight;
    const scrollEnd = rect.bottom;
    const scrollRange = scrollEnd - scrollStart;
    const scrolled = windowHeight - rect.top;
    
    if (scrolled < 0 || scrolled > scrollRange) return;
    
    const progress = scrolled / scrollRange;
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    
    setScrollProgress(clampedProgress);
    
    // Calculate frame
    let targetFrame;
    if (interpolation === 'smooth') {
      targetFrame = clampedProgress * (frameCount - 1);
    } else {
      targetFrame = Math.floor(clampedProgress * frameCount);
    }
    
    setCurrentFrame(targetFrame);
  };

  // Draw current frame
  React.useEffect(() => {
    drawFrame(currentFrame);
  }, [currentFrame, frameCount, backgroundColor]);

  // Setup canvas and scroll listener
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial render

    return () => window.removeEventListener('scroll', handleScroll);
  }, [frameCount, interpolation, scrollDistance]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: `${scrollDistance}vh`,
    backgroundColor: backgroundColor
  };

  const stickyWrapperStyle = {
    position: 'sticky',
    top: '0',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '20px'
  };

  const canvasStyle = {
    maxWidth: '90%',
    maxHeight: '70vh',
    borderRadius: '8px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
  };

  const progressBarStyle = {
    width: '80%',
    maxWidth: '600px',
    height: '4px',
    backgroundColor: `${progressColor}30`,
    borderRadius: '2px',
    overflow: 'hidden'
  };

  const progressFillStyle = {
    height: '100%',
    backgroundColor: progressColor,
    width: `${scrollProgress * 100}%`,
    transition: 'width 0.1s ease'
  };

  const frameNumberStyle = {
    color: textColor,
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'monospace',
    opacity: 0.7
  };

  return (
    <div ref={containerRef} className="image-sequence-player" style={containerStyle}>
      <div style={stickyWrapperStyle}>
        <canvas 
          ref={canvasRef}
          style={canvasStyle}
        />
        
        {showProgress && (
          <div style={progressBarStyle}>
            <div style={progressFillStyle} />
          </div>
        )}
        
        {showFrameNumber && (
          <div style={frameNumberStyle}>
            Frame {Math.round(currentFrame)} / {frameCount}
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
