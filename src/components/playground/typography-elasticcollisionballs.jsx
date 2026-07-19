import React from "react";

const MANIFEST = {
  "type": "Typography.ElasticCollisionBalls",
  "description": "Characters as physics balls with perfect elastic collisions, momentum conservation, wall reflections, and angular momentum-based rotation",
  "editorElement": {
    "selector": ".elastic-collision-text",
    "displayName": "Elastic Collision Text Balls",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "COLLISION",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "collisionColor": {
        "dataType": "color",
        "displayName": "Collision Flash Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 80,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "ballRadius": {
        "dataType": "select",
        "displayName": "Ball Radius Multiplier",
        "defaultValue": "1.0",
        "options": ["0.8", "1.0", "1.2", "1.5"],
        "group": "Physics"
      },
      "initialVelocity": {
        "dataType": "select",
        "displayName": "Initial Velocity",
        "defaultValue": "3",
        "options": ["1", "2", "3", "4", "5"],
        "group": "Physics"
      },
      "gravity": {
        "dataType": "select",
        "displayName": "Gravity",
        "defaultValue": "0.2",
        "options": ["0", "0.1", "0.2", "0.3", "0.5"],
        "group": "Physics"
      },
      "restitution": {
        "dataType": "select",
        "displayName": "Restitution (Bounciness)",
        "defaultValue": "0.98",
        "options": ["0.9", "0.95", "0.98", "0.99", "1.0"],
        "group": "Physics"
      },
      "friction": {
        "dataType": "select",
        "displayName": "Air Friction",
        "defaultValue": "0.999",
        "options": ["0.99", "0.995", "0.999", "1.0"],
        "group": "Physics"
      },
      "showBoundaries": {
        "dataType": "booleanValue",
        "displayName": "Show Boundaries",
        "defaultValue": true,
        "group": "Content"
      },
      "showVelocityVectors": {
        "dataType": "booleanValue",
        "displayName": "Show Velocity Vectors",
        "defaultValue": false,
        "group": "Content"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [balls, setBalls] = React.useState([]);
  const [containerSize, setContainerSize] = React.useState({ width: 800, height: 600 });
  const [collisions, setCollisions] = React.useState([]);
  
  const containerRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const text = config?.text || "COLLISION";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#212529";
  const collisionColor = config?.collisionColor || "#495057";
  const fontSize = parseInt(config?.fontSize) || 80;
  const fontWeight = config?.fontWeight || "400";
  const ballRadiusMultiplier = parseFloat(config?.ballRadius) || 1.0;
  const initialVelocity = parseFloat(config?.initialVelocity) || 3;
  const gravity = parseFloat(config?.gravity) || 0.2;
  const restitution = parseFloat(config?.restitution) || 0.98;
  const friction = parseFloat(config?.friction) || 0.999;
  const showBoundaries = config?.showBoundaries !== false;
  const showVelocityVectors = config?.showVelocityVectors || false;

  const characters = text.split('');
  const baseRadius = (fontSize * 0.6) * ballRadiusMultiplier;

  // Initialize balls
  React.useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });

      const initialBalls = characters.map((char, index) => {
        const radius = baseRadius;
        const margin = radius * 2;
        
        return {
          id: index,
          char,
          x: margin + Math.random() * (rect.width - margin * 2),
          y: margin + Math.random() * (rect.height - margin * 2),
          vx: (Math.random() - 0.5) * initialVelocity * 2,
          vy: (Math.random() - 0.5) * initialVelocity * 2,
          radius,
          rotation: Math.random() * 360,
          angularVelocity: 0,
          mass: 1,
          lastCollisionTime: 0
        };
      });

      setBalls(initialBalls);
    }
  }, [text, fontSize, baseRadius, initialVelocity]);

  // Handle container resize
  React.useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Physics simulation
  React.useEffect(() => {
    if (prefersReducedMotion || balls.length === 0) return;

    const animate = () => {
      setBalls(prevBalls => {
        const newBalls = prevBalls.map(ball => ({ ...ball }));
        const currentTime = Date.now();

        // Apply forces
        newBalls.forEach(ball => {
          // Gravity
          ball.vy += gravity;

          // Air friction
          ball.vx *= friction;
          ball.vy *= friction;

          // Update position
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Update rotation
          ball.rotation += ball.angularVelocity;
          ball.angularVelocity *= 0.99; // Angular friction
        });

        // Wall collisions
        newBalls.forEach(ball => {
          // Left/right walls
          if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx *= -restitution;
            ball.angularVelocity = -ball.vy * 0.1;
          } else if (ball.x + ball.radius > containerSize.width) {
            ball.x = containerSize.width - ball.radius;
            ball.vx *= -restitution;
            ball.angularVelocity = ball.vy * 0.1;
          }

          // Top/bottom walls
          if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy *= -restitution;
            ball.angularVelocity = ball.vx * 0.1;
          } else if (ball.y + ball.radius > containerSize.height) {
            ball.y = containerSize.height - ball.radius;
            ball.vy *= -restitution;
            ball.angularVelocity = -ball.vx * 0.1;
          }
        });

        // Ball-to-ball collisions
        const newCollisions = [];
        for (let i = 0; i < newBalls.length; i++) {
          for (let j = i + 1; j < newBalls.length; j++) {
            const b1 = newBalls[i];
            const b2 = newBalls[j];

            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = b1.radius + b2.radius;

            if (distance < minDistance) {
              // Collision detected
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              // Rotate velocities
              const vx1 = b1.vx * cos + b1.vy * sin;
              const vy1 = b1.vy * cos - b1.vx * sin;
              const vx2 = b2.vx * cos + b2.vy * sin;
              const vy2 = b2.vy * cos - b2.vx * sin;

              // Elastic collision formulas (1D)
              const finalVx1 = ((b1.mass - b2.mass) * vx1 + 2 * b2.mass * vx2) / (b1.mass + b2.mass);
              const finalVx2 = ((b2.mass - b1.mass) * vx2 + 2 * b1.mass * vx1) / (b1.mass + b2.mass);

              // Rotate back
              b1.vx = finalVx1 * cos - vy1 * sin;
              b1.vy = vy1 * cos + finalVx1 * sin;
              b2.vx = finalVx2 * cos - vy2 * sin;
              b2.vy = vy2 * cos + finalVx2 * sin;

              // Apply restitution
              b1.vx *= restitution;
              b1.vy *= restitution;
              b2.vx *= restitution;
              b2.vy *= restitution;

              // Separate balls to prevent overlap
              const overlap = minDistance - distance;
              const separationX = (overlap / 2) * cos;
              const separationY = (overlap / 2) * sin;
              
              b1.x -= separationX;
              b1.y -= separationY;
              b2.x += separationX;
              b2.y += separationY;

              // Angular momentum from collision
              const impactForce = Math.sqrt((finalVx1 - vx1) ** 2 + (vy1 - finalVy1) ** 2);
              b1.angularVelocity += impactForce * (Math.random() - 0.5) * 2;
              b2.angularVelocity += impactForce * (Math.random() - 0.5) * 2;

              // Track collision for visual effect
              b1.lastCollisionTime = currentTime;
              b2.lastCollisionTime = currentTime;
              
              newCollisions.push({
                x: (b1.x + b2.x) / 2,
                y: (b1.y + b2.y) / 2,
                time: currentTime
              });
            }
          }
        }

        setCollisions(prev => [...prev, ...newCollisions].filter(c => currentTime - c.time < 200));

        return newBalls;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [balls.length, containerSize, gravity, restitution, friction, prefersReducedMotion]);

  const containerStyle = {
    width: '100%',
    height: '600px',
    backgroundColor,
    position: 'relative',
    overflow: 'hidden',
    border: showBoundaries ? `2px solid ${textColor}20` : 'none'
  };

  const ballStyle = (ball) => {
    const timeSinceCollision = Date.now() - ball.lastCollisionTime;
    const collisionFlash = Math.max(0, 1 - timeSinceCollision / 200);

    if (prefersReducedMotion) {
      return {
        position: 'absolute',
        left: ball.x,
        top: ball.y,
        fontSize: `${fontSize}px`,
        fontWeight,
        color: textColor,
        transform: 'translate(-50%, -50%)',
        userSelect: 'none',
        pointerEvents: 'none'
      };
    }

    const color = collisionFlash > 0 
      ? `rgb(${parseInt(collisionColor.slice(1,3), 16)}, ${parseInt(collisionColor.slice(3,5), 16)}, ${parseInt(collisionColor.slice(5,7), 16)})`
      : textColor;

    return {
      position: 'absolute',
      left: ball.x,
      top: ball.y,
      fontSize: `${fontSize}px`,
      fontWeight,
      color,
      transform: `translate(-50%, -50%) rotate(${ball.rotation}deg)`,
      userSelect: 'none',
      pointerEvents: 'none',
      transition: collisionFlash > 0 ? 'none' : 'color 200ms ease',
      textShadow: collisionFlash > 0 ? `0 0 ${collisionFlash * 30}px ${collisionColor}` : 'none',
      willChange: 'transform'
    };
  };

  const velocityVectorStyle = (ball) => ({
    position: 'absolute',
    left: ball.x,
    top: ball.y,
    width: Math.sqrt(ball.vx ** 2 + ball.vy ** 2) * 10,
    height: '2px',
    backgroundColor: collisionColor,
    transformOrigin: 'left center',
    transform: `translate(0, -50%) rotate(${Math.atan2(ball.vy, ball.vx) * 180 / Math.PI}deg)`,
    opacity: 0.5,
    pointerEvents: 'none'
  });

  const collisionFlashStyle = (collision) => {
    const age = Date.now() - collision.time;
    const opacity = Math.max(0, 1 - age / 200);
    const scale = 1 + age / 100;

    return {
      position: 'absolute',
      left: collision.x,
      top: collision.y,
      width: '20px',
      height: '20px',
      border: `2px solid ${collisionColor}`,
      borderRadius: '50%',
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      pointerEvents: 'none'
    };
  };

  const infoStyle = {
    position: 'absolute',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '14px',
    color: textColor,
    opacity: 0.4,
    textAlign: 'center',
    pointerEvents: 'none',
    fontWeight: '300'
  };

  return (
    <div ref={containerRef} style={containerStyle} className="elastic-collision-text">
      {/* Balls */}
      {balls.map(ball => (
        <React.Fragment key={ball.id}>
          <div style={ballStyle(ball)}>
            {ball.char === ' ' ? '\u00A0' : ball.char}
          </div>
          
          {/* Velocity vectors */}
          {showVelocityVectors && !prefersReducedMotion && (
            <div style={velocityVectorStyle(ball)} />
          )}
        </React.Fragment>
      ))}

      {/* Collision flashes */}
      {!prefersReducedMotion && collisions.map((collision, index) => (
        <div key={`${collision.time}-${index}`} style={collisionFlashStyle(collision)} />
      ))}

      {/* Info */}
      <div style={infoStyle}>
        Perfect elastic collisions • Momentum conserved • Angular momentum from impacts
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
