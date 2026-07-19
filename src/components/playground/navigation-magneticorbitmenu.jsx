import React from "react";

const MANIFEST = {
  "type": "Navigation.MagneticOrbitMenu",
  "description": "Radial menu with magnetic hover effects, orbital positioning, ripple interactions, and 3D perspective depth",
  "editorElement": {
    "selector": ".magnetic-orbit-menu",
    "displayName": "Magnetic Orbit Menu",
    "archetype": "container",
    "data": {
      "centerButtonText": {
        "dataType": "text",
        "displayName": "Center Button Text",
        "defaultValue": "Menu",
        "group": "Content"
      },
      "menuItems": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "Home,About,Services,Portfolio,Team,Contact,Blog,Shop",
        "group": "Content"
      },
      "dockPosition": {
        "dataType": "select",
        "displayName": "Dock Position (Desktop)",
        "defaultValue": "bottom-right",
        "options": ["left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
        "group": "Layout"
      },
      "dockPositionMobile": {
        "dataType": "select",
        "displayName": "Dock Position (Mobile)",
        "defaultValue": "bottom",
        "options": ["left", "right", "top", "bottom"],
        "group": "Layout"
      },
      "orbitRadius": {
        "dataType": "select",
        "displayName": "Orbit Radius",
        "defaultValue": "180",
        "options": ["140", "160", "180", "200", "220"],
        "group": "Layout"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed (seconds)",
        "defaultValue": "20",
        "options": ["15", "20", "25", "30", "0"],
        "group": "Animation"
      },
      "magneticStrength": {
        "dataType": "select",
        "displayName": "Magnetic Pull Strength",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "strong"],
        "group": "Animation"
      },
      "transitionMode": {
        "dataType": "select",
        "displayName": "Entrance Transition",
        "defaultValue": "stagger",
        "options": ["fade", "stagger", "circle-expand", "zoom-blur"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "centerButtonColor": {
        "dataType": "color",
        "displayName": "Center Button Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "centerButtonHoverColor": {
        "dataType": "color",
        "displayName": "Center Button Hover",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "itemBackgroundColor": {
        "dataType": "color",
        "displayName": "Menu Item Background",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "itemTextColor": {
        "dataType": "color",
        "displayName": "Menu Item Text",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "rippleColor": {
        "dataType": "color",
        "displayName": "Ripple Effect Color",
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
      "resizeDirection": "none",
      "contentResizeDirection": "none"
    }
  }
};

function Component({ config = {} }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [ripples, setRipples] = React.useState([]);
  const [magneticOffset, setMagneticOffset] = React.useState({});
  const [isMobile, setIsMobile] = React.useState(false);
  const containerRef = React.useRef(null);
  const orbitRef = React.useRef(null);

  // Configuration with safe access
  const centerButtonText = config?.centerButtonText || "Menu";
  const menuItemsText = config?.menuItems || "Home,About,Services,Portfolio,Team,Contact,Blog,Shop";
  const menuItems = menuItemsText.split(',').map(item => item.trim());
  const dockPosition = config?.dockPosition || "bottom-right";
  const dockPositionMobile = config?.dockPositionMobile || "bottom";
  const orbitRadius = parseInt(config?.orbitRadius || "180");
  const rotationSpeed = parseInt(config?.rotationSpeed || "20");
  const magneticStrength = config?.magneticStrength || "medium";
  const transitionMode = config?.transitionMode || "stagger";
  const backgroundColor = config?.backgroundColor || "#18181B";
  const centerButtonColor = config?.centerButtonColor || "#3F3F46";
  const centerButtonHoverColor = config?.centerButtonHoverColor || "#27272A";
  const itemBackgroundColor = config?.itemBackgroundColor || "#3F3F46";
  const itemTextColor = config?.itemTextColor || "#FAFAFA";
  const rippleColor = config?.rippleColor || "#71717A";
  const fontSize = config?.fontSize || 14;
  const fontWeight = config?.fontWeight || "400";

  // Magnetic strength values
  const magneticMultiplier = {
    subtle: 0.15,
    medium: 0.25,
    strong: 0.4
  }[magneticStrength];

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduced motion check
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Get dock styles
  const getDockStyles = () => {
    const position = isMobile ? dockPositionMobile : dockPosition;
    const offset = orbitRadius + 40;
    
    const positions = {
      'left': { left: offset + 'px', top: '50%', transform: 'translateY(-50%)' },
      'right': { right: offset + 'px', top: '50%', transform: 'translateY(-50%)' },
      'top': { top: offset + 'px', left: '50%', transform: 'translateX(-50%)' },
      'bottom': { bottom: offset + 'px', left: '50%', transform: 'translateX(-50%)' },
      'top-left': { top: offset + 'px', left: offset + 'px' },
      'top-right': { top: offset + 'px', right: offset + 'px' },
      'bottom-left': { bottom: offset + 'px', left: offset + 'px' },
      'bottom-right': { bottom: offset + 'px', right: offset + 'px' }
    };
    
    return positions[position] || positions['bottom-right'];
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Create ripple effect
  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now();
    
    setRipples(prev => [...prev, { id: rippleId, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 600);
  };

  // Magnetic hover effect
  const handleItemMouseMove = (e, index) => {
    if (prefersReducedMotion) return;
    
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * magneticMultiplier;
    const deltaY = (e.clientY - centerY) * magneticMultiplier;
    
    setMagneticOffset(prev => ({
      ...prev,
      [index]: { x: deltaX, y: deltaY }
    }));
  };

  const handleItemMouseLeave = (index) => {
    setMagneticOffset(prev => ({
      ...prev,
      [index]: { x: 0, y: 0 }
    }));
  };

  // Get transition styles based on mode
  const getTransitionStyle = (index, total) => {
    if (!isOpen) return { opacity: 0, transform: 'scale(0)' };
    
    const delay = transitionMode === 'stagger' ? index * 50 : 
                  transitionMode === 'fade' ? 0 :
                  transitionMode === 'circle-expand' ? 0 :
                  0;
    
    return {
      opacity: 1,
      transform: 'scale(1)',
      transitionDelay: `${delay}ms`
    };
  };

  return (
    <div 
      ref={containerRef}
      className="magnetic-orbit-menu"
      style={{
        position: 'fixed',
        ...getDockStyles(),
        zIndex: 1000,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Orbit Container */}
      <div
        ref={orbitRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: orbitRadius * 2 + 'px',
          height: orbitRadius * 2 + 'px',
          transform: 'translate(-50%, -50%)',
          transformStyle: 'preserve-3d',
          perspective: '1200px',
          pointerEvents: 'none',
          animation: rotationSpeed > 0 && !prefersReducedMotion 
            ? `rotate ${rotationSpeed}s linear infinite` 
            : 'none',
          animationPlayState: isOpen ? 'running' : 'paused'
        }}
      >
        {/* Menu Items */}
        {menuItems.map((item, index) => {
          const angle = (360 / menuItems.length) * index;
          const offset = magneticOffset[index] || { x: 0, y: 0 };
          
          return (
            <div
              key={index}
              onMouseMove={(e) => handleItemMouseMove(e, index)}
              onMouseLeave={() => handleItemMouseLeave(index)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transformOrigin: '0px 0px',
                transform: prefersReducedMotion 
                  ? `rotate(${angle}deg) translateX(${orbitRadius}px) rotate(-${angle}deg) translate(${offset.x}px, ${offset.y}px)`
                  : `rotate(${angle}deg) translateX(${orbitRadius}px) rotate(-${angle}deg) translate(${offset.x}px, ${offset.y}px) translateZ(${isOpen ? 40 : 0}px)`,
                pointerEvents: isOpen ? 'auto' : 'none',
                transition: prefersReducedMotion 
                  ? 'none'
                  : 'opacity 300ms ease-out, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                willChange: 'transform, opacity',
                ...getTransitionStyle(index, menuItems.length)
              }}
            >
              <button
                onClick={(e) => {
                  createRipple(e);
                  console.log(`Clicked: ${item}`);
                }}
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  backgroundColor: itemBackgroundColor,
                  color: itemTextColor,
                  border: 'none',
                  borderRadius: '50%',
                  fontSize: fontSize + 'px',
                  fontWeight: fontWeight,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  overflow: 'hidden',
                  transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
                  transform: prefersReducedMotion ? 'none' : 'translateZ(0)',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.transform = 'translateZ(0) scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }
                }}
                aria-label={item}
              >
                <span style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '52px',
                  fontSize: item.length > 6 ? (fontSize - 2) + 'px' : fontSize + 'px'
                }}>
                  {item}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Center Button */}
      <button
        onClick={toggleMenu}
        style={{
          position: 'relative',
          width: '80px',
          height: '80px',
          backgroundColor: centerButtonColor,
          color: itemTextColor,
          border: 'none',
          borderRadius: '50%',
          fontSize: (fontSize + 2) + 'px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          transition: prefersReducedMotion 
            ? 'none'
            : 'background-color 200ms ease-out, transform 200ms ease-out',
          transform: prefersReducedMotion ? 'none' : (isOpen ? 'scale(0.9)' : 'scale(1)'),
          zIndex: 10,
          overflow: 'hidden',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (!prefersReducedMotion) {
            e.currentTarget.style.backgroundColor = centerButtonHoverColor;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = centerButtonColor;
        }}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {/* Hamburger Icon */}
        <div style={{
          position: 'relative',
          width: '24px',
          height: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <span style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: itemTextColor,
            borderRadius: '2px',
            transition: prefersReducedMotion 
              ? 'none'
              : 'transform 300ms ease, opacity 300ms ease',
            transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'translateY(0) rotate(0)',
            transformOrigin: 'center'
          }} />
          <span style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: itemTextColor,
            borderRadius: '2px',
            transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease',
            opacity: isOpen ? 0 : 1
          }} />
          <span style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: itemTextColor,
            borderRadius: '2px',
            transition: prefersReducedMotion 
              ? 'none'
              : 'transform 300ms ease, opacity 300ms ease',
            transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'translateY(0) rotate(0)',
            transformOrigin: 'center'
          }} />
        </div>

        {/* Ripples */}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            style={{
              position: 'absolute',
              left: ripple.x + 'px',
              top: ripple.y + 'px',
              width: '0',
              height: '0',
              borderRadius: '50%',
              backgroundColor: rippleColor,
              transform: 'translate(-50%, -50%)',
              animation: prefersReducedMotion ? 'none' : 'ripple 600ms ease-out',
              pointerEvents: 'none'
            }}
          />
        ))}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            animation: prefersReducedMotion ? 'none' : 'fadeIn 300ms ease-out',
            zIndex: -1
          }}
        />
      )}

      <style jsx>{`
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes ripple {
          to {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
