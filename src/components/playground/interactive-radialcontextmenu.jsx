import React from "react";

const MANIFEST = {
  "type": "Interactive.RadialContextMenu",
  "description": "Radial context menu that expands from cursor position with spring physics",
  "editorElement": {
    "selector": ".radial-context-menu",
    "displayName": "Radial Context Menu",
    "archetype": "container",
    "data": {
      "items": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "Cut, Copy, Paste, Delete, Share, Edit, Duplicate, Archive",
        "group": "Content"
      },
      "radius": {
        "dataType": "select",
        "displayName": "Menu Radius (px)",
        "defaultValue": "120",
        "options": ["100", "120", "150", "180"],
        "group": "Layout"
      },
      "itemSize": {
        "dataType": "select",
        "displayName": "Item Size (px)",
        "defaultValue": "60",
        "options": ["50", "60", "70", "80"],
        "group": "Layout"
      },
      "springStiffness": {
        "dataType": "select",
        "displayName": "Spring Stiffness",
        "defaultValue": "300",
        "options": ["200", "300", "400", "500"],
        "group": "Animation"
      },
      "springDamping": {
        "dataType": "select",
        "displayName": "Spring Damping",
        "defaultValue": "25",
        "options": ["15", "20", "25", "30"],
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay (ms)",
        "defaultValue": "30",
        "options": ["20", "30", "40", "50"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "menuBackgroundColor": {
        "dataType": "color",
        "displayName": "Menu Item Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "menuHoverColor": {
        "dataType": "color",
        "displayName": "Menu Hover Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "textHoverColor": {
        "dataType": "color",
        "displayName": "Text Hover Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "both",
      "contentResizeDirection": "both"
    }
  }
};

function Component({ config = {} }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({ x: 0, y: 0 });
  const [itemStates, setItemStates] = React.useState([]);
  const animationFrameRef = React.useRef(null);
  const velocitiesRef = React.useRef([]);

  // Config values
  const itemsString = config?.items || "Cut, Copy, Paste, Delete, Share, Edit, Duplicate, Archive";
  const items = itemsString.split(',').map(i => i.trim()).filter(Boolean);
  const radius = parseInt(config?.radius || "120");
  const itemSize = parseInt(config?.itemSize || "60");
  const springStiffness = parseInt(config?.springStiffness || "300");
  const springDamping = parseInt(config?.springDamping || "25");
  const staggerDelay = parseInt(config?.staggerDelay || "30");
  const backgroundColor = config?.backgroundColor || "#F4F4F5";
  const menuBackgroundColor = config?.menuBackgroundColor || "#FFFFFF";
  const menuHoverColor = config?.menuHoverColor || "#18181B";
  const textColor = config?.textColor || "#18181B";
  const textHoverColor = config?.textHoverColor || "#FFFFFF";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Initialize item states
  React.useEffect(() => {
    setItemStates(items.map(() => ({ scale: 0, rotation: 0 })));
    velocitiesRef.current = items.map(() => ({ scale: 0, rotation: 0 }));
  }, [items.length]);

  // Spring animation
  React.useEffect(() => {
    if (!menuOpen || prefersReducedMotion) {
      if (prefersReducedMotion && menuOpen) {
        setItemStates(items.map(() => ({ scale: 1, rotation: 0 })));
      }
      return;
    }

    const targetStates = items.map((_, index) => ({
      scale: 1,
      rotation: 0
    }));

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const newStates = itemStates.map((state, index) => {
        const delay = index * staggerDelay;
        const elapsed = timestamp - startTime - delay;

        if (elapsed < 0) return state;

        const target = targetStates[index];
        const velocity = velocitiesRef.current[index];

        // Spring physics
        const deltaScale = target.scale - state.scale;
        const deltaRotation = target.rotation - state.rotation;

        const springForceScale = deltaScale * springStiffness;
        const dampingForceScale = velocity.scale * springDamping;
        const accelerationScale = (springForceScale - dampingForceScale) / 100;

        const springForceRotation = deltaRotation * springStiffness;
        const dampingForceRotation = velocity.rotation * springDamping;
        const accelerationRotation = (springForceRotation - dampingForceRotation) / 100;

        velocity.scale += accelerationScale;
        velocity.rotation += accelerationRotation;

        const newScale = state.scale + velocity.scale;
        const newRotation = state.rotation + velocity.rotation;

        return {
          scale: newScale,
          rotation: newRotation
        };
      });

      setItemStates(newStates);

      // Continue if not settled
      const settled = newStates.every((state, index) => 
        Math.abs(state.scale - targetStates[index].scale) < 0.001 &&
        Math.abs(velocitiesRef.current[index].scale) < 0.001
      );

      if (!settled) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [menuOpen, items.length, springStiffness, springDamping, staggerDelay, prefersReducedMotion]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
    setItemStates(items.map(() => ({ scale: 0, rotation: 0 })));
    velocitiesRef.current = items.map(() => ({ scale: 0, rotation: 0 }));
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const demoAreaStyle = {
    padding: '60px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'context-menu'
  };

  const menuOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: menuOpen ? 'block' : 'none',
    zIndex: 1000
  };

  const getItemPosition = (index) => {
    const angleStep = (Math.PI * 2) / items.length;
    const angle = angleStep * index - Math.PI / 2; // Start from top

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return { x, y, angle };
  };

  const menuItemStyle = (index, isHovered) => {
    const state = itemStates[index] || { scale: 0, rotation: 0 };
    const position = getItemPosition(index);

    return {
      position: 'absolute',
      left: `${menuPosition.x + position.x}px`,
      top: `${menuPosition.y + position.y}px`,
      width: `${itemSize}px`,
      height: `${itemSize}px`,
      backgroundColor: isHovered ? menuHoverColor : menuBackgroundColor,
      color: isHovered ? textHoverColor : textColor,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transform: prefersReducedMotion 
        ? 'translate(-50%, -50%)' 
        : `translate(-50%, -50%) scale(${state.scale}) rotate(${state.rotation}deg)`,
      transition: isHovered ? 'background-color 0.2s ease, color 0.2s ease' : 'none',
      userSelect: 'none',
      zIndex: 1001
    };
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <div 
      className="radial-context-menu"
      style={containerStyle}
      onContextMenu={handleContextMenu}
      onClick={handleClose}
    >
      <div style={demoAreaStyle}>
        <h3 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '12px' }}>
          Right-Click Here
        </h3>
        <p style={{ fontSize: '14px', opacity: 0.7 }}>
          Open radial context menu with spring physics
        </p>
      </div>

      {/* Menu Overlay */}
      {menuOpen && (
        <div style={menuOverlayStyle} onClick={handleClose}>
          {items.map((item, index) => (
            <div
              key={index}
              style={menuItemStyle(index, hoveredIndex === index)}
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
