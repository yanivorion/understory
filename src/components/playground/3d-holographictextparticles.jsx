import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 19, 2025, 11:46 AM
 * Component Type: 3D.HolographicTextParticles
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "3D.HolographicTextParticles",
  "description": "Text rendered as floating holographic particles with mouse interaction and color shifting",
  "editorElement": {
    "selector": ".holographic-particles-container",
    "displayName": "Holographic Text Particles",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text Content",
        "defaultValue": "FUTURE",
        "group": "Content",
        "description": "Text to render as particles"
      },
      "showInput": {
        "dataType": "booleanValue",
        "displayName": "Show Input Field",
        "defaultValue": true,
        "group": "Content",
        "description": "Show/hide text input control"
      },
      "particleDensity": {
        "dataType": "select",
        "displayName": "Particle Density",
        "defaultValue": "medium",
        "options": ["low", "medium", "high", "ultra"],
        "group": "Content",
        "description": "Number of particles per letter"
      },
      "enableMouseRepulsion": {
        "dataType": "booleanValue",
        "displayName": "Enable Mouse Repulsion",
        "defaultValue": true,
        "group": "Content",
        "description": "Particles avoid mouse cursor"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors",
        "description": "Scene background"
      },
      "particleColor": {
        "dataType": "color",
        "displayName": "Particle Base Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Core particle color"
      },
      "holographicColor1": {
        "dataType": "color",
        "displayName": "Holographic Tint 1",
        "defaultValue": "#00FFFF",
        "group": "Colors",
        "description": "First holographic color"
      },
      "holographicColor2": {
        "dataType": "color",
        "displayName": "Holographic Tint 2",
        "defaultValue": "#FF00FF",
        "group": "Colors",
        "description": "Second holographic color"
      },
      "holographicColor3": {
        "dataType": "color",
        "displayName": "Holographic Tint 3",
        "defaultValue": "#00FF00",
        "group": "Colors",
        "description": "Third holographic color"
      },
      "inputTextColor": {
        "dataType": "color",
        "displayName": "Input Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Input field text color"
      },
      "inputBorderColor": {
        "dataType": "color",
        "displayName": "Input Border Color",
        "defaultValue": "#3F3F46",
        "group": "Colors",
        "description": "Input field border"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Text Size (px)",
        "defaultValue": 120,
        "group": "Typography",
        "description": "Size of text formation"
      },
      "inputFontSize": {
        "dataType": "number",
        "displayName": "Input Font Size (px)",
        "defaultValue": 24,
        "group": "Typography",
        "description": "Input field font size"
      },
      "particleSize": {
        "dataType": "select",
        "displayName": "Particle Size",
        "defaultValue": "2",
        "options": ["1", "2", "3", "4", "5"],
        "group": "Layout",
        "description": "Individual particle radius"
      },
      "repulsionStrength": {
        "dataType": "select",
        "displayName": "Repulsion Strength",
        "defaultValue": "100",
        "options": ["50", "100", "150", "200"],
        "group": "Layout",
        "description": "Mouse repulsion force"
      },
      "ambientMotion": {
        "dataType": "select",
        "displayName": "Ambient Motion",
        "defaultValue": "subtle",
        "options": ["none", "subtle", "moderate", "dynamic"],
        "group": "Animation",
        "description": "Idle particle drift intensity"
      },
      "returnSpeed": {
        "dataType": "select",
        "displayName": "Return Speed",
        "defaultValue": "0.05",
        "options": ["0.02", "0.05", "0.08", "0.12"],
        "group": "Animation",
        "description": "Speed particles return to position"
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
  const containerRef = React.useRef(null);
  const sceneDataRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState(config?.text || "FUTURE");
  const [threeLoaded, setThreeLoaded] = React.useState(false);

  // Load Three.js
  React.useEffect(() => {
    if (typeof THREE !== 'undefined') {
      setThreeLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = () => setThreeLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Text to particle positions
  const textToParticles = React.useCallback((text) => {
    const canvas = document.createElement('canvas');
    const fontSize = parseInt(config?.fontSize || '120');
    const ctx = canvas.getContext('2d');
    
    ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize;
    
    canvas.width = textWidth + 40;
    canvas.height = textHeight + 40;
    
    ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 20, textHeight / 2 + 20);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const particles = [];
    
    const densityMap = {
      'low': 6,
      'medium': 4,
      'high': 3,
      'ultra': 2
    };
    const step = densityMap[config?.particleDensity || 'medium'] || 4;
    
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        const alpha = imageData.data[index + 3];
        
        if (alpha > 128) {
          particles.push({
            x: (x - canvas.width / 2) * 0.5,
            y: (canvas.height / 2 - y) * 0.5,
            z: (Math.random() - 0.5) * 20
          });
        }
      }
    }
    
    return particles;
  }, [config?.fontSize, config?.particleDensity]);

  // Initialize Three.js scene
  React.useEffect(() => {
    if (!threeLoaded || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      canvas: canvasRef.current 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlePositions = textToParticles(inputValue);
    const particleCount = particlePositions.length;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    particlePositions.forEach((pos, i) => {
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
      
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
      
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: parseFloat(config?.particleSize || '2'),
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const mouse = { x: 0, y: 0, z: 0 };
    let time = 0;

    const onMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
      mouse.z = 0;
    };

    const onResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    if (config?.enableMouseRepulsion !== false) {
      containerRef.current.addEventListener('mousemove', onMouseMove);
    }
    window.addEventListener('resize', onResize);

    const ambientMotionMap = {
      'none': 0,
      'subtle': 0.2,
      'moderate': 0.5,
      'dynamic': 1.0
    };
    const ambientIntensity = ambientMotionMap[config?.ambientMotion || 'subtle'] || 0.2;
    const returnSpeed = parseFloat(config?.returnSpeed || '0.05');
    const repulsionStrength = parseFloat(config?.repulsionStrength || '100');

    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      time += 0.01;

      const positions = geometry.attributes.position.array;
      const colors = geometry.attributes.color.array;

      // Convert mouse to world coordinates
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const mouseWorld = camera.position.clone().add(dir.multiplyScalar(distance));

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const targetX = particlePositions[i].x;
        const targetY = particlePositions[i].y;
        const targetZ = particlePositions[i].z;

        // Current position
        let px = positions[i3];
        let py = positions[i3 + 1];
        let pz = positions[i3 + 2];

        // Ambient motion
        if (ambientIntensity > 0) {
          px += Math.sin(time + i * 0.1) * ambientIntensity;
          py += Math.cos(time + i * 0.15) * ambientIntensity;
        }

        // Mouse repulsion
        if (config?.enableMouseRepulsion !== false) {
          const dx = px - mouseWorld.x;
          const dy = py - mouseWorld.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < repulsionStrength) {
            const force = (repulsionStrength - dist) / repulsionStrength;
            velocities[i3] += (dx / dist) * force * 2;
            velocities[i3 + 1] += (dy / dist) * force * 2;
          }
        }

        // Apply velocity
        px += velocities[i3];
        py += velocities[i3 + 1];
        pz += velocities[i3 + 2];

        // Return to target position
        px += (targetX - px) * returnSpeed;
        py += (targetY - py) * returnSpeed;
        pz += (targetZ - pz) * returnSpeed;

        // Damping
        velocities[i3] *= 0.95;
        velocities[i3 + 1] *= 0.95;
        velocities[i3 + 2] *= 0.95;

        positions[i3] = px;
        positions[i3 + 1] = py;
        positions[i3 + 2] = pz;

        // Holographic color cycling
        const hue = (time * 0.5 + i * 0.01) % 1;
        colors[i3] = Math.abs(Math.sin(hue * Math.PI * 2));
        colors[i3 + 1] = Math.abs(Math.sin((hue + 0.33) * Math.PI * 2));
        colors[i3 + 2] = Math.abs(Math.sin((hue + 0.66) * Math.PI * 2));
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
      
      sceneDataRef.current = { animationId };
    };

    animate();

    sceneDataRef.current = { scene, camera, renderer, geometry, material, particles };

    return () => {
      if (sceneDataRef.current?.animationId) {
        cancelAnimationFrame(sceneDataRef.current.animationId);
      }
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [threeLoaded, inputValue, config?.enableMouseRepulsion, config?.particleSize, config?.ambientMotion, config?.returnSpeed, config?.repulsionStrength, textToParticles]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value || config?.text || "FUTURE");
  };

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div 
      ref={containerRef}
      className="holographic-particles-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: config?.backgroundColor || '#18181B',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />

      {!threeLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: config?.inputTextColor || '#FFFFFF',
          fontSize: '18px',
          fontWeight: '300',
          letterSpacing: '0.05em'
        }}>
          INITIALIZING HOLOGRAPHIC DISPLAY...
        </div>
      )}

      {(config?.showInput !== false) && (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="TYPE HERE"
          maxLength={20}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '30px',
            transform: 'translateX(-50%)',
            width: '300px',
            maxWidth: '90%',
            padding: '12px 20px',
            backgroundColor: 'transparent',
            border: `1px solid ${config?.inputBorderColor || '#3F3F46'}`,
            borderRadius: '0',
            color: config?.inputTextColor || '#FFFFFF',
            fontSize: `${config?.inputFontSize || 24}px`,
            fontWeight: '400',
            letterSpacing: '0.1em',
            textAlign: 'center',
            textTransform: 'uppercase',
            outline: 'none',
            transition: 'border-color 250ms ease-out',
            zIndex: 10
          }}
          onFocus={(e) => {
            e.target.style.borderColor = config?.inputTextColor || '#FFFFFF';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = config?.inputBorderColor || '#3F3F46';
          }}
        />
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
