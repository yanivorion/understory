import React from "react";

const MANIFEST = {
  "type": "Navigation.RadialSpeedDial",
  "description": "Glassmorphism speed dial menu that expands radially from corner with tilt-on-hover effects",
  "editorElement": {
    "selector": ".radial-speed-dial",
    "displayName": "Radial Speed Dial",
    "archetype": "container",
    "data": {
      "isOpen": {
        "dataType": "booleanValue",
        "displayName": "Start Open",
        "defaultValue": false,
        "group": "Content"
      },
      "position": {
        "dataType": "select",
        "displayName": "Position",
        "defaultValue": "bottom-right",
        "options": ["bottom-right", "bottom-left", "top-right", "top-left"],
        "group": "Layout"
      },
      "itemCount": {
        "dataType": "select",
        "displayName": "Number of Items",
        "defaultValue": "6",
        "options": ["4", "5", "6", "7", "8"],
        "group": "Content"
      },
      "radius": {
        "dataType": "select",
        "displayName": "Orbit Radius",
        "defaultValue": "140",
        "options": ["100", "120", "140", "160", "180"],
        "group": "Layout"
      },
      "continuousRotation": {
        "dataType": "booleanValue",
        "displayName": "Continuous Rotation",
        "defaultValue": true,
        "group": "Animation"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed (seconds)",
        "defaultValue": "40",
        "options": ["20", "30", "40", "50", "60"],
        "group": "Animation"
      },
      "buttonSize": {
        "dataType": "select",
        "displayName": "Button Size",
        "defaultValue": "56",
        "options": ["48", "56", "64", "72"],
        "group": "Layout"
      },
      "itemSize": {
        "dataType": "select",
        "displayName": "Item Card Size",
        "defaultValue": "80",
        "options": ["64", "72", "80", "88", "96"],
        "group": "Layout"
      },
      "backdropBlur": {
        "dataType": "select",
        "displayName": "Glass Blur Amount",
        "defaultValue": "12",
        "options": ["8", "10", "12", "16", "20"],
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Button Background",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "buttonIconColor": {
        "dataType": "color",
        "displayName": "Button Icon Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "itemBackground": {
        "dataType": "color",
        "displayName": "Item Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "itemTextColor": {
        "dataType": "color",
        "displayName": "Item Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Backdrop Overlay",
        "defaultValue": "#000000",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "none",
      "contentResizeDirection": "none"
    }
  }
};

function Component({ config = {} }) {
  const [isOpen, setIsOpen] = React.useState(config?.isOpen || false);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  
  const position = config?.position || "bottom-right";
  const itemCount = parseInt(config?.itemCount || "6");
  const radius = parseInt(config?.radius || "140");
  const continuousRotation = config?.continuousRotation !== false;
  const rotationSpeed = config?.rotationSpeed || "40";
  const buttonSize = parseInt(config?.buttonSize || "56");
  const itemSize = parseInt(config?.itemSize || "80");
  const backdropBlur = config?.backdropBlur || "12";
  
  const backgroundColor = config?.backgroundColor || "#212529";
  const buttonIconColor = config?.buttonIconColor || "#FFFFFF";
  const itemBackground = config?.itemBackground || "#FFFFFF";
  const itemTextColor = config?.itemTextColor || "#212529";
  const overlayColor = config?.overlayColor || "#000000";
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const items = [
    { icon: "⚡", title: "Analytics", desc: "View insights" },
    { icon: "📊", title: "Reports", desc: "Generate reports" },
    { icon: "⚙️", title: "Settings", desc: "Preferences" },
    { icon: "👤", title: "Profile", desc: "Your account" },
    { icon: "📧", title: "Messages", desc: "Inbox" },
    { icon: "🔔", title: "Alerts", desc: "Notifications" },
    { icon: "📁", title: "Files", desc: "Documents" },
    { icon: "🎯", title: "Goals", desc: "Objectives" }
  ].slice(0, itemCount);

  const getPositionStyles = () => {
    const offset = buttonSize / 2;
    const positions = {
      'bottom-right': { bottom: '32px', right: '32px' },
      'bottom-left': { bottom: '32px', left: '32px' },
      'top-right': { top: '32px', right: '32px' },
      'top-left': { top: '32px', left: '32px' }
    };
    return positions[position] || positions['bottom-right'];
  };

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
    setHoveredIndex(index);
  };

  const containerStyle = {
    position: 'fixed',
    ...getPositionStyles(),
    zIndex: 9999,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlayColor,
    opacity: isOpen ? 0.3 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease-out',
    zIndex: 9998
  };

  const orbitContainerStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    pointerEvents: 'none',
    animation: continuousRotation && !prefersReducedMotion && isOpen 
      ? `rotateOrbit ${rotationSpeed}s linear infinite` 
      : 'none'
  };

  const buttonStyle = {
    width: `${buttonSize}px`,
    height: `${buttonSize}px`,
    borderRadius: '50%',
    backgroundColor,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: buttonIconColor,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)',
    transition: prefersReducedMotion ? 'none' : 'transform 200ms ease-out, box-shadow 200ms ease-out',
    transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)',
    position: 'relative',
    zIndex: 10000,
    willChange: 'transform'
  };

  const getItemPosition = (index) => {
    const angle = (360 / items.length) * index;
    const radians = (angle - 90) * (Math.PI / 180);
    
    return {
      left: '50%',
      top: '50%',
      transform: `
        translate(-50%, -50%)
        rotate(${angle}deg) 
        translateX(${isOpen ? radius : 0}px) 
        rotate(-${angle}deg)
        ${continuousRotation && !prefersReducedMotion ? `rotate(-${angle}deg)` : ''}
      `
    };
  };

  const getItemStyle = (index) => {
    const isHovered = hoveredIndex === index;
    const baseDelay = index * 50;
    
    return {
      position: 'absolute',
      ...getItemPosition(index),
      width: `${itemSize}px`,
      minHeight: `${itemSize}px`,
      background: itemBackground,
      backdropFilter: `blur(${backdropBlur}px)`,
      WebkitBackdropFilter: `blur(${backdropBlur}px)`,
      borderRadius: '12px',
      padding: '12px',
      cursor: 'pointer',
      pointerEvents: isOpen ? 'auto' : 'none',
      opacity: isOpen ? 1 : 0,
      transform: isHovered && !prefersReducedMotion
        ? `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg) scale(1.05)`
        : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: prefersReducedMotion 
        ? 'none'
        : `
          opacity ${isOpen ? '300ms' : '200ms'} ease-out ${isOpen ? baseDelay : 0}ms,
          transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)
        `,
      boxShadow: isHovered 
        ? '0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'
        : '0 4px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
      willChange: 'transform, opacity',
      color: itemTextColor,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      textAlign: 'center'
    };
  };

  const iconStyle = {
    fontSize: '28px',
    lineHeight: 1,
    marginBottom: '4px'
  };

  const titleStyle = {
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: 1.2,
    margin: 0
  };

  const descStyle = {
    fontSize: '10px',
    opacity: 0.6,
    lineHeight: 1.2,
    margin: 0
  };

  return (
    <>
      <style>{`
        @keyframes rotateOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
      
      <div style={overlayStyle} onClick={() => setIsOpen(false)} />
      
      <div style={containerStyle} className="radial-speed-dial">
        <div style={orbitContainerStyle}>
          {items.map((item, index) => (
            <div
              key={index}
              style={getItemStyle(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => {
                e.stopPropagation();
                console.log(`Clicked: ${item.title}`);
              }}
            >
              <div style={iconStyle}>{item.icon}</div>
              <div style={titleStyle}>{item.title}</div>
              <div style={descStyle}>{item.desc}</div>
            </div>
          ))}
        </div>
        
        <button
          style={buttonStyle}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={(e) => {
            if (!prefersReducedMotion) {
              e.currentTarget.style.transform = isOpen 
                ? 'rotate(135deg) scale(1.1)' 
                : 'rotate(0deg) scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!prefersReducedMotion) {
              e.currentTarget.style.transform = isOpen 
                ? 'rotate(135deg) scale(1)' 
                : 'rotate(0deg) scale(1)';
            }
          }}
          aria-label={isOpen ? "Close speed dial" : "Open speed dial"}
          aria-expanded={isOpen}
        >
          +
        </button>
      </div>
    </>
  );
}

export { MANIFEST, Component };
export default Component;
