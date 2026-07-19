import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 19, 2025, 08:43 AM
 * Component Type: Layout.CircularMenu
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Layout.CircularMenu",
  "description": "Rotating circular menu with hover effects and hamburger toggle",
  "editorElement": {
    "selector": ".circular-menu",
    "displayName": "Circular Menu",
    "archetype": "container",
    "data": {
      // Content Group
      "items": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "HOME,ABOUT,SERVICES,PORTFOLIO,TEAM,CAREERS,BLOG,CONTACT,SHOP,NEWS,GALLERY,SUPPORT,FAQ,PRICING,REVIEWS,PARTNERS,EVENTS,MEDIA",
        "group": "Content"
      },
      "showNumbers": {
        "dataType": "booleanValue",
        "displayName": "Show Item Numbers",
        "defaultValue": true,
        "group": "Content"
      },
      
      // Colors Group
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "numberColor": {
        "dataType": "color",
        "displayName": "Number Color",
        "defaultValue": "#999999",
        "group": "Colors"
      },
      "hamburgerColor": {
        "dataType": "color",
        "displayName": "Hamburger Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      
      // Typography Group
      "itemFontSize": {
        "dataType": "number",
        "displayName": "Item Font Size (px)",
        "defaultValue": 24,
        "group": "Typography"
      },
      "numberFontSize": {
        "dataType": "number",
        "displayName": "Number Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["400", "500"],
        "group": "Typography"
      },
      
      // Animation Group
      "transitionEffect": {
        "dataType": "select",
        "displayName": "Open Transition Effect",
        "defaultValue": "fade",
        "options": ["fade", "slide", "scale"],
        "group": "Animation"
      },
      "rotationSpeed": {
        "dataType": "select",
        "displayName": "Rotation Speed (seconds)",
        "defaultValue": "60",
        "options": ["40", "50", "60", "80", "100"],
        "group": "Animation"
      },
      "enableRotation": {
        "dataType": "booleanValue",
        "displayName": "Enable Rotation",
        "defaultValue": true,
        "group": "Animation"
      },
      
      // Layout Group
      "radius": {
        "dataType": "select",
        "displayName": "Circle Radius",
        "defaultValue": "300",
        "options": ["250", "300", "350", "400", "450"],
        "group": "Layout"
      },
      "dockPosition": {
        "dataType": "select",
        "displayName": "Dock Position (Desktop)",
        "defaultValue": "left",
        "options": ["left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
        "group": "Layout"
      },
      "mobileDockPosition": {
        "dataType": "select",
        "displayName": "Dock Position (Mobile)",
        "defaultValue": "bottom",
        "options": ["left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
        "group": "Layout"
      },
      "hamburgerPosition": {
        "dataType": "select",
        "displayName": "Hamburger Position",
        "defaultValue": "top-left",
        "options": ["top-left", "top-right", "bottom-left", "bottom-right"],
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const { useState, useEffect } = React;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const defaultItems = "HOME,ABOUT,SERVICES,PORTFOLIO,TEAM,CAREERS,BLOG,CONTACT,SHOP,NEWS,GALLERY,SUPPORT,FAQ,PRICING,REVIEWS,PARTNERS,EVENTS,MEDIA";
  const items = (config.items || defaultItems).split(',').map(item => item.trim());
  
  const rotationSpeed = parseInt(config.rotationSpeed || '60');
  const enableRotation = config.enableRotation !== false;
  const showNumbers = config.showNumbers !== false;
  const radius = parseInt(config.radius || '300');
  const increment = 360 / items.length;
  const transitionEffect = config.transitionEffect || 'fade';
  
  // Use mobile or desktop dock position
  const dockPosition = isMobile 
    ? (config.mobileDockPosition || 'bottom')
    : (config.dockPosition || 'left');
  
  // Clamp font sizes between 1-120px
  const itemFontSize = Math.max(1, Math.min(120, parseInt(config.itemFontSize) || 24));
  const numberFontSize = Math.max(1, Math.min(120, parseInt(config.numberFontSize) || 14));
  
  // Get dock position styles
  const getDockStyles = () => {
    const size = radius * 2;
    const positions = {
      'left': { left: -radius + 'px', top: '50%', transform: 'translateY(-50%)' },
      'right': { right: -radius + 'px', top: '50%', transform: 'translateY(-50%)' },
      'top': { top: -radius + 'px', left: '50%', transform: 'translateX(-50%)' },
      'bottom': { bottom: -radius + 'px', left: '50%', transform: 'translateX(-50%)' },
      'top-left': { top: -radius + 'px', left: -radius + 'px', transform: 'none' },
      'top-right': { top: -radius + 'px', right: -radius + 'px', transform: 'none' },
      'bottom-left': { bottom: -radius + 'px', left: -radius + 'px', transform: 'none' },
      'bottom-right': { bottom: -radius + 'px', right: -radius + 'px', transform: 'none' }
    };
    return positions[dockPosition] || positions.left;
  };
  
  // Get transition styles with distinct animations
  const getTransitionStyles = () => {
    const baseStyles = getDockStyles();
    
    if (!isMenuOpen) {
      // Closed state - different per transition type
      switch(transitionEffect) {
        case 'slide':
          return {
            ...baseStyles,
            opacity: 0,
            scale: 1,
            pointerEvents: 'none'
          };
        case 'scale':
          return {
            ...baseStyles,
            opacity: 0,
            scale: 0.3,
            pointerEvents: 'none'
          };
        case 'fade':
        default:
          return {
            ...baseStyles,
            opacity: 0,
            scale: 1,
            pointerEvents: 'none'
          };
      }
    } else {
      // Open state - all return to base position
      return {
        ...baseStyles,
        opacity: 1,
        scale: 1,
        pointerEvents: 'none'
      };
    }
  };
  
  // Hamburger position logic
  const getHamburgerStyle = () => {
    const position = config.hamburgerPosition || 'top-left';
    const baseStyle = {
      position: 'fixed',
      zIndex: 1000,
      width: '48px',
      height: '48px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '6px',
      padding: 0
    };
    
    switch(position) {
      case 'top-right':
        return { ...baseStyle, top: '32px', right: '32px' };
      case 'bottom-left':
        return { ...baseStyle, bottom: '32px', left: '32px' };
      case 'bottom-right':
        return { ...baseStyle, bottom: '32px', right: '32px' };
      default:
        return { ...baseStyle, top: '32px', left: '32px' };
    }
  };
  
  return (
    <div 
      className="circular-menu"
      style={{
        backgroundColor: config.backgroundColor || '#000000',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <style>{`
        @keyframes rotateCircle {
          from {
            transform: translateY(-50%) rotate(0deg);
          }
          to {
            transform: translateY(-50%) rotate(360deg);
          }
        }
        
        .circle-container {
          animation: rotateCircle ${rotationSpeed}s linear infinite;
        }
        
        .circle-container.paused {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .circle-container {
            animation: none;
          }
        }
      `}</style>
      
      {/* Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        style={getHamburgerStyle()}
      >
        <span style={{
          width: '32px',
          height: '2px',
          backgroundColor: config.hamburgerColor || '#FFFFFF',
          transition: 'all 300ms ease',
          transform: isMenuOpen ? 'translateY(5px) rotate(45deg)' : 'translateY(0) rotate(0)',
          transformOrigin: 'center'
        }} />
        <span style={{
          width: '32px',
          height: '2px',
          backgroundColor: config.hamburgerColor || '#FFFFFF',
          transition: 'all 300ms ease',
          opacity: isMenuOpen ? 0 : 1
        }} />
        <span style={{
          width: '32px',
          height: '2px',
          backgroundColor: config.hamburgerColor || '#FFFFFF',
          transition: 'all 300ms ease',
          transform: isMenuOpen ? 'translateY(-11px) rotate(-45deg)' : 'translateY(0) rotate(0)',
          transformOrigin: 'center'
        }} />
      </button>
      
      {/* Rotating Menu Container */}
      <div
        className={enableRotation && hoveredIndex === null ? 'circle-container' : 'circle-container paused'}
        style={{
          position: 'absolute',
          width: radius * 2 + 'px',
          height: radius * 2 + 'px',
          transformOrigin: 'center center',
          transition: transitionEffect === 'scale' 
            ? 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.4, 0, 0.2, 1), left 500ms cubic-bezier(0.4, 0, 0.2, 1), right 500ms cubic-bezier(0.4, 0, 0.2, 1), top 500ms cubic-bezier(0.4, 0, 0.2, 1), bottom 500ms cubic-bezier(0.4, 0, 0.2, 1)'
            : 'opacity 500ms ease-out, left 500ms ease-out, right 500ms ease-out, top 500ms ease-out, bottom 500ms ease-out, transform 500ms ease-out',
          ...getTransitionStyles()
        }}
      >
        {items.map((item, index) => {
          const angle = index * increment;
          
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: hoveredIndex === index 
                  ? 'rotate(' + angle + 'deg) translateX(' + radius + 'px) scale(1.1)'
                  : 'rotate(' + angle + 'deg) translateX(' + radius + 'px) scale(1)',
                transformOrigin: '0px 0px',
                paddingLeft: '20px',
                fontSize: itemFontSize + 'px',
                fontWeight: config.fontWeight || '500',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Arial', sans-serif",
                fontStretch: 'expanded',
                color: config.textColor || '#FFFFFF',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.25s ease-out',
                pointerEvents: isMenuOpen ? 'auto' : 'none'
              }}
            >
              {showNumbers && (
                <span style={{
                  fontSize: numberFontSize + 'px',
                  color: config.numberColor || '#999999',
                  fontWeight: '400'
                }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
