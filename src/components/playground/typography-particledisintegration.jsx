import React from "react";

const MANIFEST = {
  "type": "Typography.ParticleDisintegration",
  "description": "Kinetic typography that explodes into physics-based particles on scroll with 3D transforms and bi-directional animations",
  "editorElement": {
    "selector": ".particle-disintegration-text",
    "displayName": "Particle Disintegration Text",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "EVOLVE",
        "group": "Content"
      },
      "particlesPerCharacter": {
        "dataType": "select",
        "displayName": "Particles Per Character",
        "defaultValue": "50",
        "options": ["30", "40", "50", "60", "70"],
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "particleColor": {
        "dataType": "color",
        "displayName": "Particle Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 120,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "-0.02em",
        "options": ["-0.04em", "-0.02em", "0em", "0.02em"],
        "group": "Typography"
      },
      "explosionForce": {
        "dataType": "select",
        "displayName": "Explosion Force",
        "defaultValue": "1.0",
        "options": ["0.5", "0.75", "1.0", "1.25", "1.5"],
        "group": "Animation"
      },
      "particleSize": {
        "dataType": "select",
        "displayName": "Particle Size (px)",
        "defaultValue": "3",
        "options": ["2", "3", "4", "5", "6"],
        "group": "Animation"
      },
      "explosionDuration": {
        "dataType": "select",
        "displayName": "Explosion Duration (ms)",
        "defaultValue": "1200",
        "options": ["800", "1000", "1200", "1400", "1600"],
        "group": "Animation"
      },
      "scrollTriggerThreshold": {
        "dataType": "select",
        "displayName": "Scroll Trigger Point",
        "defaultValue": "0.5",
        "options": ["0.3", "0.4", "0.5", "0.6", "0.7"],
        "group": "Animation"
      },
      "rotationIntensity": {
        "dataType": "select",
        "displayName": "3D Rotation Intensity",
        "defaultValue": "1.0",
        "options": ["0.5", "0.75", "1.0", "1.5", "2.0"],
        "group": "Animation"
      },
      "parallaxSpeed": {
        "dataType": "select",
        "displayName": "Background Parallax Speed",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.4", "0.5"],
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
  const [particles, setParticles] = React.useState([]);
  const [isExploded, setIsExploded] = React.useState(false);
  const [parallaxOffset, setParallaxOffset] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  
  const containerRef = React.useRef(null);
  const textRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config
  const text = config?.text || "EVOLVE";
  const particlesPerCharacter = parseInt(config?.particlesPerCharacter) || 50;
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const particleColor = config?.particleColor || "#495057";
  const fontSize = parseInt(config?.fontSize) || 120;
  const fontWeight = config?.fontWeight || "300";
  const letterSpacing = config?.letterSpacing || "-0.02em";
  const explosionForce = parseFloat(config?.explosionForce) || 1.0;
  const particleSize = parseInt(config?.particleSize) || 3;
  const explosionDuration = parseInt(config?.explosionDuration) || 1200;
  const scrollTriggerThreshold = parseFloat(config?.scrollTriggerThreshold) || 0.5;
  const rotationIntensity = parseFloat(config?.rotationIntensity) || 1.0;
  const parallaxSpeed = parseFloat(config?.parallaxSpeed) || 0.3;

  // Generate particles from text
  const generateParticles = React.useCallback(() => {
    if (!textRef.current) return [];

    const chars = text.split('');
    const allParticles = [];
    const charWidth = fontSize * 0.6;
    const totalWidth = charWidth * chars.length;
    const startX = (window.innerWidth - totalWidth) / 2;

    chars.forEach((char, charIndex) => {
      const charX = startX + charIndex * charWidth;
      const charY = window.innerHeight / 2;

      for (let i = 0; i < particlesPerCharacter; i++) {
        // Deterministic randomness based on index
        const seed = charIndex * particlesPerCharacter + i;
        const random1 = Math.sin(seed * 0.1) * 10000;
        const random2 = Math.cos(seed * 0.15) * 10000;
        const random3 = Math.sin(seed * 0.2) * 10000;
        const random4 = Math.cos(seed * 0.25) * 10000;
        const random5 = Math.sin(seed * 0.3) * 10000;
        const random6 = Math.cos(seed * 0.35) * 10000;
        
        const r1 = random1 - Math.floor(random1);
        const r2 = random2 - Math.floor(random2);
        const r3 = random3 - Math.floor(random3);
        const r4 = random4 - Math.floor(random4);
        const r5 = random5 - Math.floor(random5);
        const r6 = random6 - Math.floor(random6);

        // Particle within character bounds
        const localX = (r1 - 0.5) * charWidth * 0.8;
        const localY = (r2 - 0.5) * fontSize * 0.8;

        // Explosion trajectory
        const angle = r3 * Math.PI * 2;
        const distance = 200 + r4 * 400;
        const velocityX = Math.cos(angle) * distance * explosionForce;
        const velocityY = Math.sin(angle) * distance * explosionForce;

        // 3D rotation values
        const rotateX = (r5 - 0.5) * 720 * rotationIntensity;
        const rotateY = (r6 - 0.5) * 720 * rotationIntensity;
        const rotateZ = (r1 - 0.5) * 360 * rotationIntensity;

        allParticles.push({
          id: `${charIndex}-${i}`,
          startX: charX + localX,
          startY: charY + localY,
          velocityX,
          velocityY,
          rotateX,
          rotateY,
          rotateZ,
          scale: 0.3 + r2 * 0.7,
          delay: r3 * 200,
          char: char,
          charIndex
        });
      }
    });

    return allParticles;
  }, [text, particlesPerCharacter, fontSize, explosionForce, rotationIntensity]);

  // Initialize particles
  React.useEffect(() => {
    const initialParticles = generateParticles();
    setParticles(initialParticles);
  }, [generateParticles]);

  // Scroll tracking for parallax
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const progress = Math.min(scrollY / windowHeight, 1);
          
          setParallaxOffset(scrollY * parallaxSpeed);
          setScrollProgress(progress);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxSpeed, prefersReducedMotion]);

  // Scroll-based explosion trigger
  React.useEffect(() => {
    if (scrollProgress >= scrollTriggerThreshold && !isExploded) {
      setIsExploded(true);
    } else if (scrollProgress < scrollTriggerThreshold && isExploded) {
      setIsExploded(false);
    }
  }, [scrollProgress, scrollTriggerThreshold, isExploded]);

  const containerStyle = {
    minHeight: '200vh',
    backgroundColor,
    position: 'relative',
    overflow: 'hidden'
  };

  const backgroundImageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: prefersReducedMotion ? 'none' : `translateY(${parallaxOffset}px)`,
    willChange: prefersReducedMotion ? 'auto' : 'transform',
    zIndex: 0,
    opacity: 0.15,
    backgroundImage: 'url(https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&q=80&fm=jpg&crop=entropy&cs=monochrome)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'grayscale(100%) contrast(1.2)'
  };

  const textContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    perspective: '1200px',
    transformStyle: 'preserve-3d'
  };

  const textStyle = {
    fontSize: `clamp(${fontSize * 0.4}px, 12vw, ${fontSize}px)`,
    fontWeight,
    letterSpacing,
    color: textColor,
    lineHeight: 1,
    textAlign: 'center',
    opacity: prefersReducedMotion ? 1 : (isExploded ? 0 : 1),
    transition: prefersReducedMotion ? 'none' : `opacity ${explosionDuration * 0.3}ms ease`,
    pointerEvents: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  };

  const particleContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 5,
    pointerEvents: 'none',
    perspective: '1200px',
    transformStyle: 'preserve-3d'
  };

  const getParticleStyle = (particle) => {
    if (prefersReducedMotion) {
      return {
        position: 'absolute',
        width: `${particleSize}px`,
        height: `${particleSize}px`,
        backgroundColor: particleColor,
        borderRadius: '50%',
        left: `${particle.startX}px`,
        top: `${particle.startY}px`,
        opacity: isExploded ? 0 : 1
      };
    }

    const progress = isExploded ? 1 : 0;
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    const currentX = particle.startX + particle.velocityX * easeOut;
    const currentY = particle.startY + particle.velocityY * easeOut;
    
    const currentRotateX = particle.rotateX * easeOut;
    const currentRotateY = particle.rotateY * easeOut;
    const currentRotateZ = particle.rotateZ * easeOut;
    
    const currentScale = particle.scale * (1 - easeOut * 0.5);
    const currentOpacity = Math.max(0, 1 - easeOut);

    return {
      position: 'absolute',
      width: `${particleSize}px`,
      height: `${particleSize}px`,
      backgroundColor: particleColor,
      borderRadius: '50%',
      left: `${currentX}px`,
      top: `${currentY}px`,
      transform: `
        translate(-50%, -50%)
        rotateX(${currentRotateX}deg)
        rotateY(${currentRotateY}deg)
        rotateZ(${currentRotateZ}deg)
        scale(${currentScale})
      `,
      opacity: currentOpacity,
      transformStyle: 'preserve-3d',
      transition: `
        transform ${explosionDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${particle.delay}ms,
        opacity ${explosionDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${particle.delay}ms
      `,
      willChange: 'transform, opacity',
      boxShadow: `0 0 ${particleSize * 2}px ${particleColor}40`
    };
  };

  const instructionStyle = {
    position: 'fixed',
    bottom: '4rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '14px',
    color: textColor,
    opacity: 0.5,
    zIndex: 20,
    textAlign: 'center',
    pointerEvents: 'none'
  };

  return (
    <div ref={containerRef} style={containerStyle} className="particle-disintegration-text">
      {/* Background Image with Parallax */}
      <div style={backgroundImageStyle} />

      {/* Original Text */}
      <div style={textContainerStyle}>
        <div ref={textRef} style={textStyle}>
          {text}
        </div>
      </div>

      {/* Particles */}
      <div style={particleContainerStyle}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={getParticleStyle(particle)}
          />
        ))}
      </div>

      {/* Scroll Instruction */}
      <div style={instructionStyle}>
        Scroll down to explode • Scroll up to reform
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
