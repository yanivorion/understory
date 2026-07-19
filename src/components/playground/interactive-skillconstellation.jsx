import React from "react";

const MANIFEST = {
  "type": "Interactive.SkillConstellation",
  "description": "Circular rotating constellation of skill badges with animated connecting lines, orbital sub-skills, and glow effects on hover",
  "editorElement": {
    "selector": ".skill-constellation",
    "displayName": "Interactive Skill Constellation",
    "archetype": "container",
    "data": {
      "skills": {
        "dataType": "text",
        "displayName": "Skills (comma-separated)",
        "defaultValue": "React,TypeScript,Node.js,Design,Strategy,Research,Marketing,Analytics",
        "group": "Content"
      },
      "orbitRadius": {
        "dataType": "select",
        "displayName": "Orbit Radius",
        "defaultValue": "250",
        "options": ["200", "250", "300", "350"],
        "group": "Layout"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed (seconds)",
        "defaultValue": "30",
        "options": ["20", "30", "40", "0"],
        "group": "Animation"
      },
      "enableConnections": {
        "dataType": "booleanValue",
        "displayName": "Show Connection Lines",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "skillColor": {
        "dataType": "color",
        "displayName": "Skill Badge Color",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "lineColor": {
        "dataType": "color",
        "displayName": "Connection Line Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "glowColor": {
        "dataType": "color",
        "displayName": "Glow Color",
        "defaultValue": "#71717A",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 14,
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
  const [hoveredSkill, setHoveredSkill] = React.useState(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);

  // Configuration
  const skillsText = config?.skills || "React,TypeScript,Node.js,Design,Strategy,Research,Marketing,Analytics";
  const skills = skillsText.split(',').map(s => s.trim());
  const orbitRadius = parseInt(config?.orbitRadius || "250");
  const rotationSpeed = parseInt(config?.rotationSpeed || "30");
  const enableConnections = config?.enableConnections !== false;
  const backgroundColor = config?.backgroundColor || "#18181B";
  const skillColor = config?.skillColor || "#27272A";
  const textColor = config?.textColor || "#FAFAFA";
  const lineColor = config?.lineColor || "#3F3F46";
  const glowColor = config?.glowColor || "#71717A";
  const fontSize = config?.fontSize || 14;
  const fontWeight = config?.fontWeight || "400";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Draw connecting lines
  React.useEffect(() => {
    if (!enableConnections || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines between adjacent skills
      skills.forEach((_, index) => {
        const angle1 = (360 / skills.length) * index;
        const angle2 = (360 / skills.length) * ((index + 1) % skills.length);
        
        const rad1 = (angle1 * Math.PI) / 180;
        const rad2 = (angle2 * Math.PI) / 180;

        const x1 = centerX + Math.cos(rad1) * orbitRadius;
        const y1 = centerY + Math.sin(rad1) * orbitRadius;
        const x2 = centerX + Math.cos(rad2) * orbitRadius;
        const y2 = centerY + Math.sin(rad2) * orbitRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = hoveredSkill === index || hoveredSkill === ((index + 1) % skills.length)
          ? glowColor
          : lineColor;
        ctx.lineWidth = hoveredSkill === index || hoveredSkill === ((index + 1) % skills.length) ? 2 : 1;
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [skills.length, orbitRadius, hoveredSkill, enableConnections, lineColor, glowColor]);

  // Resize canvas
  React.useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const updateSize = () => {
      const size = Math.min(window.innerWidth, 800);
      canvasRef.current.width = size;
      canvasRef.current.height = size;
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="skill-constellation"
      style={{
        minHeight: '100vh',
        backgroundColor: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative'
      }}
    >
      {/* Canvas for connection lines */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />

      {/* Constellation Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          position: 'relative',
          width: (orbitRadius * 2 + 200) + 'px',
          height: (orbitRadius * 2 + 200) + 'px',
          animation: rotationSpeed > 0 && !prefersReducedMotion 
            ? `rotate ${rotationSpeed}s linear infinite` 
            : 'none',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        {/* Center Hub */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '100px',
          height: '100px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: skillColor,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 30px ${glowColor}`,
          border: `2px solid ${glowColor}`,
          zIndex: 10
        }}>
          <span style={{
            fontSize: (fontSize + 2) + 'px',
            fontWeight: '500',
            color: textColor,
            transform: rotationSpeed > 0 && !prefersReducedMotion ? `rotate(-${rotationSpeed}s)` : 'none'
          }}>
            Skills
          </span>
        </div>

        {/* Skill Badges */}
        {skills.map((skill, index) => {
          const angle = (360 / skills.length) * index;
          const isHovered = hoveredSkill === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transformOrigin: '0px 0px',
                transform: `rotate(${angle}deg) translateX(${orbitRadius}px) rotate(-${angle}deg)`,
                transition: prefersReducedMotion ? 'none' : 'transform 400ms ease'
              }}
            >
              <div style={{
                width: '120px',
                height: '80px',
                backgroundColor: skillColor,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: prefersReducedMotion 
                  ? 'none'
                  : isHovered ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease',
                boxShadow: isHovered 
                  ? `0 8px 24px rgba(0,0,0,0.3), 0 0 30px ${glowColor}`
                  : '0 4px 12px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                border: `1px solid ${isHovered ? glowColor : 'transparent'}`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <span style={{
                  fontSize: fontSize + 'px',
                  fontWeight: isHovered ? '500' : fontWeight,
                  color: textColor,
                  textAlign: 'center',
                  zIndex: 2,
                  position: 'relative'
                }}>
                  {skill}
                </span>

                {/* Glow effect */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
                    animation: prefersReducedMotion ? 'none' : 'pulse 2s ease-in-out infinite'
                  }} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
