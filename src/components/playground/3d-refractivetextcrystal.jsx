import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 19, 2025, 11:47 AM
 * Component Type: 3D.RefractiveTextCrystal
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "3D.RefractiveTextCrystal",
  "description": "Interactive 3D refractive crystal displaying text through cube-mapped textures with mouse parallax control",
  "editorElement": {
    "selector": ".refractive-crystal-container",
    "displayName": "3D Refractive Text Crystal",
    "archetype": "container",
    "data": {
      "placeholderText": {
        "dataType": "text",
        "displayName": "Placeholder Text",
        "defaultValue": "Type here_",
        "group": "Content",
        "description": "Placeholder shown in input field"
      },
      "initialText": {
        "dataType": "text",
        "displayName": "Initial Text",
        "defaultValue": "HELLO WORLD",
        "group": "Content",
        "description": "Starting text displayed on crystal"
      },
      "showInput": {
        "dataType": "booleanValue",
        "displayName": "Show Input Field",
        "defaultValue": true,
        "group": "Content",
        "description": "Show/hide the text input control"
      },
      "enableMouseTracking": {
        "dataType": "booleanValue",
        "displayName": "Enable Mouse Tracking",
        "defaultValue": true,
        "group": "Content",
        "description": "Allow mouse/touch to control camera"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#D98E04",
        "group": "Colors",
        "description": "Main background color"
      },
      "inputBorderColor": {
        "dataType": "color",
        "displayName": "Input Border Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Border color for text input"
      },
      "inputTextColor": {
        "dataType": "color",
        "displayName": "Input Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Text color in input field"
      },
      "textColor1": {
        "dataType": "color",
        "displayName": "Text Color 1",
        "defaultValue": "#D98E04",
        "group": "Colors",
        "description": "First color in texture palette"
      },
      "textColor2": {
        "dataType": "color",
        "displayName": "Text Color 2",
        "defaultValue": "#F2E205",
        "group": "Colors",
        "description": "Second color in texture palette"
      },
      "textColor3": {
        "dataType": "color",
        "displayName": "Text Color 3",
        "defaultValue": "#7F25D9",
        "group": "Colors",
        "description": "Third color in texture palette"
      },
      "textColor4": {
        "dataType": "color",
        "displayName": "Text Color 4",
        "defaultValue": "#5C12A6",
        "group": "Colors",
        "description": "Fourth color in texture palette"
      },
      "textColor5": {
        "dataType": "color",
        "displayName": "Text Color 5",
        "defaultValue": "#2F0459",
        "group": "Colors",
        "description": "Fifth color in texture palette"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Texture Font Size (px)",
        "defaultValue": 50,
        "group": "Typography",
        "description": "Font size for texture generation"
      },
      "inputFontSize": {
        "dataType": "number",
        "displayName": "Input Font Size (px)",
        "defaultValue": 30,
        "group": "Typography",
        "description": "Font size for input field"
      },
      "crystalSize": {
        "dataType": "number",
        "displayName": "Crystal Size",
        "defaultValue": 50,
        "group": "Layout",
        "description": "Size of the 3D crystal geometry"
      },
      "crystalDetail": {
        "dataType": "select",
        "displayName": "Crystal Detail",
        "defaultValue": "1",
        "options": ["0", "1", "2"],
        "group": "Layout",
        "description": "Geometric detail level (higher = more polygons)"
      },
      "refractionRatio": {
        "dataType": "select",
        "displayName": "Refraction Ratio",
        "defaultValue": "0.85",
        "options": ["0.75", "0.80", "0.85", "0.90", "0.95"],
        "group": "Layout",
        "description": "Material refraction intensity"
      },
      "cameraSpeed": {
        "dataType": "select",
        "displayName": "Camera Speed",
        "defaultValue": "0.05",
        "options": ["0.02", "0.03", "0.05", "0.08", "0.10"],
        "group": "Layout",
        "description": "Camera tracking responsiveness"
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
  const inputRef = React.useRef(null);
  const sceneDataRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState(config?.initialText || "HELLO WORLD");
  const [threeLoaded, setThreeLoaded] = React.useState(false);
  
  const colors = [
    config?.textColor1 || "#D98E04",
    config?.textColor2 || "#F2E205",
    config?.textColor3 || "#7F25D9",
    config?.textColor4 || "#5C12A6",
    config?.textColor5 || "#2F0459"
  ];

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

  const textToTexture = React.useCallback((text) => {
    if (!text) text = config?.initialText || "HELLO WORLD";
    const canvas = document.createElement('canvas');
    const tileSize = 1024;
    const fontSize = parseInt(config?.fontSize || '50');
    
    canvas.width = tileSize * 4;
    canvas.height = tileSize;
    
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px "Rubik Mono One", monospace`;
    const fillColor = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const textWidth = ctx.measureText(text).width;
    const textHeight = fontSize * 0.8;
    let index = 0;
    
    for (let y = 0; y < canvas.height; y += textHeight) {
      for (let x = 0; x < canvas.width; x += textWidth) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        const _x = index % 2 === 0 ? x : x - (textWidth / 2);
        ctx.fillText(text, _x, y);
      }
      index += 1;
    }
    
    const tileFromCanvas = (tileIndex) => {
      const imgCanvas = document.createElement('canvas');
      imgCanvas.width = tileSize;
      imgCanvas.height = tileSize;
      const context = imgCanvas.getContext("2d");
      context.drawImage(canvas, -tileSize * tileIndex, 0);
      return imgCanvas.toDataURL();
    };
    
    return [
      tileFromCanvas(0),
      tileFromCanvas(1),
      tileFromCanvas(4),
      tileFromCanvas(4),
      tileFromCanvas(2),
      tileFromCanvas(3)
    ];
  }, [config?.fontSize, config?.initialText, colors]);

  // Initialize Three.js scene
  React.useEffect(() => {
    if (!threeLoaded || !containerRef.current) return;

    let camera, scene, renderer, mesh;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = containerRef.current.clientWidth / 2;
    let windowHalfY = containerRef.current.clientHeight / 2;
    let animationId;

    const init = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
      camera.position.z = -100;
      camera.position.y = -100;
      
      const imgs = textToTexture(inputValue);
      const texture = new THREE.CubeTextureLoader().load(imgs);
      texture.mapping = THREE.CubeRefractionMapping;

      scene = new THREE.Scene();

      const ambient = new THREE.AmbientLight(0xffffff);
      scene.add(ambient);

      const geometry = new THREE.IcosahedronGeometry(
        parseInt(config?.crystalSize || '50'),
        parseInt(config?.crystalDetail || '1')
      );
      const material = new THREE.MeshPhongMaterial({
        envMap: texture,
        refractionRatio: parseFloat(config?.refractionRatio || '0.85')
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      containerRef.current.appendChild(renderer.domElement);

      sceneDataRef.current = { camera, scene, renderer, mesh, geometry, material };

      const onMouseMove = (event) => {
        if (config?.enableMouseTracking === false) return;
        const rect = containerRef.current.getBoundingClientRect();
        if (event.touches) {
          mouseX = (event.touches[0].clientX - rect.left - windowHalfX) / 4;
          mouseY = (event.touches[0].clientY - rect.top - windowHalfY) / 4;
        } else {
          mouseX = (event.clientX - rect.left - windowHalfX) / 4;
          mouseY = (event.clientY - rect.top - windowHalfY) / 4;
        }
      };

      const onResize = () => {
        if (!containerRef.current) return;
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        windowHalfX = newWidth / 2;
        windowHalfY = newHeight / 2;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      containerRef.current.addEventListener('mousemove', onMouseMove);
      containerRef.current.addEventListener('touchmove', onMouseMove);
      window.addEventListener('resize', onResize);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        const speed = parseFloat(config?.cameraSpeed || '0.05');
        camera.position.x += (mouseX - camera.position.x) * speed;
        camera.position.y += (-mouseY - camera.position.y) * speed;
        camera.lookAt(mesh.position);
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('mousemove', onMouseMove);
          containerRef.current.removeEventListener('touchmove', onMouseMove);
        }
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animationId);
      };
    };

    const cleanup = init();

    return () => {
      if (cleanup) cleanup();
      if (sceneDataRef.current) {
        const { geometry, material, renderer } = sceneDataRef.current;
        if (geometry) geometry.dispose();
        if (material) material.dispose();
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        }
      }
    };
  }, [threeLoaded, config?.crystalSize, config?.crystalDetail, config?.refractionRatio, config?.cameraSpeed, config?.enableMouseTracking, textToTexture]);

  // Update texture when input changes
  React.useEffect(() => {
    if (!sceneDataRef.current || !sceneDataRef.current.mesh) return;
    
    const imgs = textToTexture(inputValue);
    const texture = new THREE.CubeTextureLoader().load(imgs);
    texture.mapping = THREE.CubeRefractionMapping;
    sceneDataRef.current.mesh.material.envMap = texture;
  }, [inputValue, textToTexture]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value || config?.initialText || "HELLO WORLD");
  };

  return (
    <>
      <link 
        href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap" 
        rel="stylesheet"
      />
      <div 
        ref={containerRef}
        className="refractive-crystal-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          backgroundColor: config?.backgroundColor || '#D98E04',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {!threeLoaded && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: '300'
          }}>
            Loading 3D engine...
          </div>
        )}
        
        {(config?.showInput !== false) && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={config?.placeholderText || "Type here_"}
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '20px',
              width: '300px',
              maxWidth: '90%',
              transform: 'translateX(-50%)',
              border: `2px solid ${config?.inputBorderColor || '#FFFFFF'}`,
              backgroundColor: 'transparent',
              padding: '15px',
              fontSize: `${config?.inputFontSize || 30}px`,
              color: config?.inputTextColor || '#FFFFFF',
              textAlign: 'center',
              fontFamily: '"Rubik Mono One", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              outline: 'none',
              borderRadius: '0',
              transition: 'border-color 250ms ease-out',
              zIndex: 10
            }}
            onFocus={(e) => {
              e.target.style.borderColor = config?.inputTextColor || '#FFFFFF';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = config?.inputBorderColor || '#FFFFFF';
            }}
          />
        )}
      </div>
    </>
  );
}

export { MANIFEST, Component };
export default Component;
