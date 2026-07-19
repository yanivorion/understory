import React from "react";

const MANIFEST = {
  "type": "Navigation.CircularSpeedDial",
  "description": "Advanced circular speed dial menu with polar coordinate positioning, continuous rotation, 8-position docking system, and sophisticated transitions",
  "editorElement": {
    "selector": ".speed-dial-container",
    "displayName": "Circular Speed Dial Menu",
    "archetype": "container",
    "data": {
      "item1Label": {
        "dataType": "text",
        "displayName": "Item 1 Label",
        "defaultValue": "Home",
        "group": "Content"
      },
      "item1Icon": {
        "dataType": "text",
        "displayName": "Item 1 Icon (emoji)",
        "defaultValue": "🏠",
        "group": "Content"
      },
      "item2Label": {
        "dataType": "text",
        "displayName": "Item 2 Label",
        "defaultValue": "Search",
        "group": "Content"
      },
      "item2Icon": {
        "dataType": "text",
        "displayName": "Item 2 Icon (emoji)",
        "defaultValue": "🔍",
        "group": "Content"
      },
      "item3Label": {
        "dataType": "text",
        "displayName": "Item 3 Label",
        "defaultValue": "Messages",
        "group": "Content"
      },
      "item3Icon": {
        "dataType": "text",
        "displayName": "Item 3 Icon (emoji)",
        "defaultValue": "💬",
        "group": "Content"
      },
      "item4Label": {
        "dataType": "text",
        "displayName": "Item 4 Label",
        "defaultValue": "Settings",
        "group": "Content"
      },
      "item4Icon": {
        "dataType": "text",
        "displayName": "Item 4 Icon (emoji)",
        "defaultValue": "⚙️",
        "group": "Content"
      },
      "item5Label": {
        "dataType": "text",
        "displayName": "Item 5 Label",
        "defaultValue": "Profile",
        "group": "Content"
      },
      "item5Icon": {
        "dataType": "text",
        "displayName": "Item 5 Icon (emoji)",
        "defaultValue": "👤",
        "group": "Content"
      },
      "item6Label": {
        "dataType": "text",
        "displayName": "Item 6 Label",
        "defaultValue": "Analytics",
        "group": "Content"
      },
      "item6Icon": {
        "dataType": "text",
        "displayName": "Item 6 Icon (emoji)",
        "defaultValue": "📊",
        "group": "Content"
      },
      "autoRotate": {
        "dataType": "booleanValue",
        "displayName": "Auto Rotate",
        "defaultValue": true,
        "group": "Content"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed (seconds)",
        "defaultValue": "20",
        "options": ["10", "15", "20", "30", "40"],
        "group": "Content"
      },
      "dockPosition": {
        "dataType": "select",
        "displayName": "Dock Position (Desktop)",
        "defaultValue": "right",
        "options": ["left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
        "group": "Content"
      },
      "dockPositionMobile": {
        "dataType": "select",
        "displayName": "Dock Position (Mobile)",
        "defaultValue": "bottom",
        "options": ["left", "right", "top", "bottom", "bottom-left", "bottom-right"],
        "group": "Content"
      },
      "radius": {
        "dataType": "select",
        "displayName": "Circle Radius",
        "defaultValue": "180",
        "options": ["120", "150", "180", "220", "260"],
        "group": "Content"
      },
      "transitionMode": {
        "dataType": "select",
        "displayName": "Item Transition",
        "defaultValue": "stagger",
        "options": ["stagger", "fade", "wave", "expand"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "menuBackgroundColor": {
        "dataType": "color",
        "displayName": "Menu Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "itemBackgroundColor": {
        "dataType": "color",
        "displayName": "Item Background Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "itemHoverColor": {
        "dataType": "color",
        "displayName": "Item Hover Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "iconColor": {
        "dataType": "color",
        "displayName": "Icon Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "toggleColor": {
        "dataType": "color",
        "displayName": "Toggle Button Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue"],
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    { label: config?.item1Label || "Home", icon: config?.item1Icon || "🏠" },
    { label: config?.item2Label || "Search", icon: config?.item2Icon || "🔍" },
    { label: config?.item3Label || "Messages", icon: config?.item3Icon || "💬" },
    { label: config?.item4Label || "Settings", icon: config?.item4Icon || "⚙️" },
    { label: config?.item5Label || "Profile", icon: config?.item5Icon || "👤" },
    { label: config?.item6Label || "Analytics", icon: config?.item6Icon || "📊" }
  ];

  const autoRotate = config?.autoRotate !== false;
  const rotationSpeed = config?.rotationSpeed || "20";
  const dockPosition = config?.dockPosition || "right";
  const dockPositionMobile = config?.dockPositionMobile || "bottom";
  const radius = parseInt(config?.radius || "180");
  const transitionMode = config?.transitionMode || "stagger";
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const menuBackgroundColor = config?.menuBackgroundColor || "#FFFFFF";
  const itemBackgroundColor = config?.itemBackgroundColor || "#495057";
  const itemHoverColor = config?.itemHoverColor || "#212529";
  const iconColor = config?.iconColor || "#FFFFFF";
  const labelColor = config?.labelColor || "#212529";
  const toggleColor = config?.toggleColor || "#495057";
  const fontFamily = config?.fontFamily || "system-ui";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const isMobile = windowWidth < 768;
  const currentDockPosition = isMobile ? dockPositionMobile : dockPosition;

  const getDockStyles = (position, rad) => {
    const positions = {
      'left': { left: -rad + 'px', top: '50%', transform: 'translateY(-50%)' },
      'right': { right: -rad + 'px', top: '50%', transform: 'translateY(-50%)' },
      'top': { top: -rad + 'px', left: '50%', transform: 'translateX(-50%)' },
      'bottom': { bottom: -rad + 'px', left: '50%', transform: 'translateX(-50%)' },
      'top-left': { top: -rad + 'px', left: -rad + 'px', transform: 'none' },
      'top-right': { top: -rad + 'px', right: -rad + 'px', transform: 'none' },
      'bottom-left': { bottom: -rad + 'px', left: -rad + 'px', transform: 'none' },
      'bottom-right': { bottom: -rad + 'px', right: -rad + 'px', transform: 'none' }
    };
    return positions[position] || positions.right;
  };

  const getItemTransition = (index) => {
    const delays = {
      stagger: index * 50,
      fade: 0,
      wave: Math.abs(index - items.length / 2) * 40,
      expand: (items.length - index - 1) * 30
    };
    return delays[transitionMode] || 0;
  };

  return (
    <div 
      className="speed-dial-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '700px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Circular Menu */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          position: 'fixed',
          ...getDockStyles(currentDockPosition, radius),
          width: radius * 2 + 'px',
          height: radius * 2 + 'px',
          zIndex: 1000
        }}
      >
        {/* Menu Container */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: radius * 2 + 'px',
          height: radius * 2 + 'px',
          opacity: isOpen ? 1 : 0,
          clipPath: isOpen ? `circle(${radius * 1.2}px)` : 'circle(0px)',
          transition: prefersReducedMotion ? 'opacity 300ms ease-out' : 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '100%',
            height: '100%',
            transform: 'translate(-50%, -50%)',
            animation: autoRotate && !isPaused && !prefersReducedMotion ? `rotate ${rotationSpeed}s linear infinite` : 'none',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}>
            {items.map((item, index) => {
              const angle = (360 / items.length) * index;
              
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
                    transformOrigin: '0px 0px',
                    opacity: prefersReducedMotion || !isOpen ? (isOpen ? 1 : 0) : undefined,
                    animation: !prefersReducedMotion && isOpen ? `itemAppear 400ms ease-out ${getItemTransition(index)}ms forwards` : 'none'
                  }}
                >
                  <button
                    onClick={() => console.log(`Clicked: ${item.label}`)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: itemBackgroundColor,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (!prefersReducedMotion) {
                        e.currentTarget.style.backgroundColor = itemHoverColor;
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = itemBackgroundColor;
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span style={{
                      fontSize: '24px',
                      filter: `grayscale(0%)`,
                      color: iconColor
                    }}>
                      {item.icon}
                    </span>
                    
                    <span style={{
                      position: 'absolute',
                      bottom: '-28px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: labelColor,
                      whiteSpace: 'nowrap',
                      backgroundColor: menuBackgroundColor,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      opacity: 0,
                      pointerEvents: 'none',
                      transition: prefersReducedMotion ? 'none' : 'opacity 200ms ease-out'
                    }}
                    onMouseEnter={(e) => {
                      if (!prefersReducedMotion) {
                        e.currentTarget.style.opacity = '1';
                      }
                    }}
                    >
                      {item.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: toggleColor,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 2,
            transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out'
          }}
          onMouseEnter={(e) => {
            if (!prefersReducedMotion) {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: iconColor,
                borderRadius: '1px',
                transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out',
                transformOrigin: 'center',
                ...(i === 0 && isOpen ? { transform: 'translateY(5px) rotate(45deg)' } : {}),
                ...(i === 1 && isOpen ? { opacity: 0 } : {}),
                ...(i === 2 && isOpen ? { transform: 'translateY(-11px) rotate(-45deg)' } : {})
              }}
            />
          ))}
        </button>
      </div>

      {/* Content placeholder */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '60px 20px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '500',
          color: '#212529',
          marginBottom: '16px'
        }}>
          Circular Speed Dial Menu
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#6C757D',
          lineHeight: '1.6'
        }}>
          Click the button in the corner to open the circular menu. Items are positioned using polar coordinates with automatic rotation and smooth transitions.
        </p>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes itemAppear {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
