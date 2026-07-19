import React from "react";

const MANIFEST = {
  "type": "Gallery.CircularShowcase",
  "description": "Circular project showcase where images orbit around center with zoom and blur effects",
  "editorElement": {
    "selector": ".circular-showcase",
    "displayName": "Circular Project Showcase",
    "archetype": "container",
    "data": {
      "radius": {
        "dataType": "select",
        "displayName": "Orbit Radius",
        "defaultValue": "280",
        "options": ["220", "250", "280", "320", "360"],
        "group": "Layout"
      },
      "itemSize": {
        "dataType": "select",
        "displayName": "Item Size",
        "defaultValue": "140",
        "options": ["100", "120", "140", "160", "180"],
        "group": "Layout"
      },
      "centerSize": {
        "dataType": "select",
        "displayName": "Center Display Size",
        "defaultValue": "400",
        "options": ["320", "360", "400", "440", "480"],
        "group": "Layout"
      },
      "enableDragRotation": {
        "dataType": "booleanValue",
        "displayName": "Enable Drag Rotation",
        "defaultValue": true,
        "group": "Content"
      },
      "autoRotate": {
        "dataType": "booleanValue",
        "displayName": "Auto Rotate",
        "defaultValue": false,
        "group": "Animation"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed (seconds)",
        "defaultValue": "30",
        "options": ["20", "25", "30", "40", "50"],
        "group": "Animation"
      },
      "blurAmount": {
        "dataType": "select",
        "displayName": "Inactive Blur Amount",
        "defaultValue": "6",
        "options": ["3", "4", "5", "6", "8", "10"],
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "itemBorderColor": {
        "dataType": "color",
        "displayName": "Item Border Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "centerOverlayColor": {
        "dataType": "color",
        "displayName": "Center Overlay Color",
        "defaultValue": "#000000",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [rotation, setRotation] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, angle: 0 });
  const [momentum, setMomentum] = React.useState(0);
  
  const containerRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const lastTimeRef = React.useRef(Date.now());
  const velocityRef = React.useRef(0);
  
  const radius = parseInt(config?.radius || "280");
  const itemSize = parseInt(config?.itemSize || "140");
  const centerSize = parseInt(config?.centerSize || "400");
  const enableDragRotation = config?.enableDragRotation !== false;
  const autoRotate = config?.autoRotate || false;
  const rotationSpeed = parseFloat(config?.rotationSpeed || "30");
  const blurAmount = parseInt(config?.blurAmount || "6");
  
  const backgroundColor = config?.backgroundColor || "#FAFAFA";
  const itemBorderColor = config?.itemBorderColor || "#E4E4E7";
  const textColor = config?.textColor || "#18181B";
  const centerOverlayColor = config?.centerOverlayColor || "#000000";
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const projects = [
    { 
      title: "Alpine Retreat", 
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop"
    },
    { 
      title: "Urban Oasis", 
      category: "Interior Design",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop"
    },
    { 
      title: "Coastal Modern", 
      category: "Residential",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=800&fit=crop"
    },
    { 
      title: "Minimal Studio", 
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=800&fit=crop"
    },
    { 
      title: "Garden Villa", 
      category: "Landscape",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=800&fit=crop"
    },
    { 
      title: "Tech Hub", 
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=800&fit=crop"
    }
  ];

  // Momentum animation
  React.useEffect(() => {
    if (prefersReducedMotion || (!enableDragRotation && !autoRotate)) return;
    
    const animate = () => {
      if (autoRotate && !isDragging && selectedIndex === null) {
        setRotation(prev => (prev + 360 / (rotationSpeed * 60)) % 360);
      } else if (Math.abs(velocityRef.current) > 0.01 && !isDragging) {
        setRotation(prev => (prev + velocityRef.current) % 360);
        velocityRef.current *= 0.95;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [autoRotate, isDragging, selectedIndex, rotationSpeed, prefersReducedMotion, enableDragRotation]);

  const handleMouseDown = (e) => {
    if (!enableDragRotation || selectedIndex !== null) return;
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    setDragStart({ x: angle, angle: rotation });
    velocityRef.current = 0;
    lastTimeRef.current = Date.now();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !enableDragRotation) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    const delta = angle - dragStart.x;
    const newRotation = (dragStart.angle + delta) % 360;
    
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (newRotation - rotation) / dt * 16;
    }
    lastTimeRef.current = now;
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (!enableDragRotation) return;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, rotation, enableDragRotation]);

  const containerStyle = {
    width: '100%',
    minHeight: '800px',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    cursor: enableDragRotation && selectedIndex === null ? (isDragging ? 'grabbing' : 'grab') : 'default',
    userSelect: 'none'
  };

  const orbitContainerStyle = {
    position: 'relative',
    width: `${radius * 2 + itemSize}px`,
    height: `${radius * 2 + itemSize}px`,
    transition: prefersReducedMotion ? 'none' : 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)'
  };

  const getItemPosition = (index) => {
    const angle = (360 / projects.length) * index + rotation;
    const radians = (angle - 90) * (Math.PI / 180);
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;
    
    return {
      left: '50%',
      top: '50%',
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
    };
  };

  const getItemStyle = (index) => {
    const isSelected = selectedIndex === index;
    const isInactive = selectedIndex !== null && !isSelected;
    
    return {
      position: 'absolute',
      ...getItemPosition(index),
      width: `${itemSize}px`,
      height: `${itemSize}px`,
      borderRadius: '12px',
      overflow: 'hidden',
      cursor: selectedIndex === null ? 'pointer' : isSelected ? 'default' : 'pointer',
      border: `2px solid ${itemBorderColor}`,
      boxShadow: isSelected 
        ? '0 20px 60px rgba(0,0,0,0.3)' 
        : '0 4px 12px rgba(0,0,0,0.1)',
      transition: prefersReducedMotion 
        ? 'none'
        : 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease-out, filter 300ms ease-out, box-shadow 300ms ease-out',
      opacity: isInactive ? 0.3 : 1,
      filter: isInactive ? `blur(${blurAmount}px)` : 'blur(0px)',
      transform: isSelected 
        ? `translate(-50%, -50%) scale(0.8)` 
        : getItemPosition(index).transform,
      zIndex: isSelected ? 100 : isInactive ? 1 : 10,
      pointerEvents: selectedIndex !== null && !isSelected ? 'none' : 'auto',
      willChange: 'transform, opacity, filter'
    };
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  };

  const centerDisplayStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${centerSize}px`,
    height: `${centerSize}px`,
    borderRadius: '16px',
    overflow: 'hidden',
    opacity: selectedIndex !== null ? 1 : 0,
    pointerEvents: selectedIndex !== null ? 'auto' : 'none',
    transition: prefersReducedMotion 
      ? 'none'
      : 'opacity 400ms ease-out, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: selectedIndex !== null 
      ? 'translate(-50%, -50%) scale(1)' 
      : 'translate(-50%, -50%) scale(0.8)',
    boxShadow: '0 30px 90px rgba(0,0,0,0.4)',
    zIndex: 200,
    border: `3px solid ${itemBorderColor}`
  };

  const centerImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const centerInfoStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: `linear-gradient(to top, ${centerOverlayColor}, transparent)`,
    padding: '40px 24px 24px',
    color: '#FFFFFF'
  };

  const centerTitleStyle = {
    fontSize: '28px',
    fontWeight: '500',
    margin: '0 0 4px 0',
    letterSpacing: '-0.01em'
  };

  const centerCategoryStyle = {
    fontSize: '14px',
    opacity: 0.8,
    margin: 0,
    fontWeight: '400'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: prefersReducedMotion ? 'none' : 'transform 200ms ease-out',
    color: textColor,
    zIndex: 201
  };

  const selected = selectedIndex !== null ? projects[selectedIndex] : null;

  return (
    <div 
      ref={containerRef} 
      style={containerStyle}
      onMouseDown={handleMouseDown}
      className="circular-showcase"
    >
      <div style={orbitContainerStyle}>
        {projects.map((project, index) => (
          <div
            key={index}
            style={getItemStyle(index)}
            onClick={() => {
              if (selectedIndex === null) {
                setSelectedIndex(index);
                velocityRef.current = 0;
              }
            }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              style={imageStyle}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {selected && (
        <div style={centerDisplayStyle}>
          <img 
            src={selected.image} 
            alt={selected.title}
            style={centerImageStyle}
            draggable={false}
          />
          <div style={centerInfoStyle}>
            <h3 style={centerTitleStyle}>{selected.title}</h3>
            <p style={centerCategoryStyle}>{selected.category}</p>
          </div>
          <button
            style={closeButtonStyle}
            onClick={() => setSelectedIndex(null)}
            onMouseEnter={(e) => {
              if (!prefersReducedMotion) {
                e.currentTarget.style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!prefersReducedMotion) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
