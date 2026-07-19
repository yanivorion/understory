import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Jul 19, 2026, 07:23 PM
 * Component Type: Navigation.MenuAdvanced
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Navigation.MenuAdvanced",
  "description": "Complete menu system with hamburger (8 SVG animations + 6 overlay styles) and horizontal modes (12 hover presets)",
  "editorElement": {
    "selector": ".menu-container",
    "displayName": "Advanced Menu",
    "archetype": "container",
    "data": {
      "menuType": {
        "dataType": "select",
        "displayName": "Menu Type",
        "defaultValue": "hamburger",
        "options": ["hamburger", "horizontal"],
        "group": "Content"
      },
      "menuItems": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "Home,About,Services,Portfolio,Contact",
        "group": "Content"
      },
      "hamburgerStyle": {
        "dataType": "select",
        "displayName": "Hamburger Animation",
        "defaultValue": "svg-dash-1",
        "options": ["svg-dash-1", "svg-dash-2", "svg-dash-3", "svg-dash-4", "svg-dash-5", "svg-dash-6", "svg-dash-7", "svg-dash-8"],
        "group": "Hamburger"
      },
      "overlayStyle": {
        "dataType": "select",
        "displayName": "Overlay Reveal Style",
        "defaultValue": "fullscreen-slide",
        "options": ["fullscreen-slide", "fullscreen-fade", "circular-reveal", "morphing-blob", "split-reveal", "bottom-sheet"],
        "group": "Hamburger"
      },
      "hamburgerColor": {
        "dataType": "color",
        "displayName": "Hamburger Color",
        "defaultValue": "#18181B",
        "group": "Hamburger"
      },
      "overlayBgColor": {
        "dataType": "color",
        "displayName": "Overlay Background",
        "defaultValue": "#18181B",
        "group": "Hamburger"
      },
      "overlayTextColor": {
        "dataType": "color",
        "displayName": "Overlay Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Hamburger"
      },
      "horizontalPreset": {
        "dataType": "select",
        "displayName": "Horizontal Hover Effect",
        "defaultValue": "underline-slide",
        "options": [
          "underline-slide", "background-pill", "border-top", "border-bottom", "scale-lift",
          "magnetic-pull", "floating-label", "stagger-reveal", "spotlight",
          "border-scale-fill", "svg-wave-underline", "dual-gradient"
        ],
        "group": "Horizontal"
      },
      "horizontalPosition": {
        "dataType": "select",
        "displayName": "Bar Position",
        "defaultValue": "top",
        "options": ["top", "bottom"],
        "group": "Horizontal"
      },
      "horizontalAlignment": {
        "dataType": "select",
        "displayName": "Menu Alignment",
        "defaultValue": "center",
        "options": ["left", "center", "right"],
        "group": "Horizontal"
      },
      "horizontalBgColor": {
        "dataType": "color",
        "displayName": "Bar Background",
        "defaultValue": "#FFFFFF",
        "group": "Horizontal"
      },
      "horizontalTextColor": {
        "dataType": "color",
        "displayName": "Link Color",
        "defaultValue": "#18181B",
        "group": "Horizontal"
      },
      "horizontalHoverColor": {
        "dataType": "color",
        "displayName": "Hover Color",
        "defaultValue": "#3F3F46",
        "group": "Horizontal"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#A1A1AA",
        "group": "Colors"
      },
      "animationSpeed": {
        "dataType": "select",
        "displayName": "Animation Speed",
        "defaultValue": "300",
        "options": ["200", "250", "300", "350", "400"],
        "group": "Animation"
      }
    }
  }
};

function Component({ config = {} }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
  const menuType = config?.menuType || 'hamburger';
  const items = (config?.menuItems || 'Home,About,Services,Portfolio,Contact').split(',');
  const hamburgerStyle = config?.hamburgerStyle || 'svg-dash-1';
  const overlayStyle = config?.overlayStyle || 'fullscreen-slide';
  const hamburgerColor = config?.hamburgerColor || '#18181B';
  const overlayBg = config?.overlayBgColor || '#18181B';
  const overlayText = config?.overlayTextColor || '#FFFFFF';
  
  const horizontalPreset = config?.horizontalPreset || 'underline-slide';
  const horizontalPosition = config?.horizontalPosition || 'top';
  const horizontalAlign = config?.horizontalAlignment || 'center';
  const horizontalBg = config?.horizontalBgColor || '#FFFFFF';
  const horizontalTextColor = config?.horizontalTextColor || '#18181B';
  const horizontalHoverColor = config?.horizontalHoverColor || '#3F3F46';
  
  const accentColor = config?.accentColor || '#A1A1AA';
  const animSpeed = parseInt(config?.animationSpeed) || 300;
  
  // SVG Hamburger animations
  const getSVGPaths = () => {
    const animations = {
      'svg-dash-1': {
        top: { d: isOpen ? 'M 20,29 H 80' : 'M 20,29 H 80' },
        middle: { opacity: isOpen ? 0 : 1 },
        bottom: { d: isOpen ? 'M 20,29 H 80' : 'M 20,71 H 80' },
        topTransform: isOpen ? 'rotate(45 50 50)' : 'rotate(0 50 50)',
        bottomTransform: isOpen ? 'rotate(-45 50 50)' : 'rotate(0 50 50)'
      },
      'svg-dash-2': {
        top: { d: isOpen ? 'M 20,50 H 80' : 'M 20,29 H 80' },
        middle: { opacity: isOpen ? 0 : 1 },
        bottom: { d: isOpen ? 'M 20,50 H 80' : 'M 20,71 H 80' },
        topTransform: isOpen ? 'rotate(45 50 50)' : 'rotate(0 50 50)',
        bottomTransform: isOpen ? 'rotate(-45 50 50)' : 'rotate(0 50 50)'
      },
      'svg-dash-3': {
        top: { d: isOpen ? 'M 20,29 L 50,50 L 80,29' : 'M 20,29 H 80' },
        middle: { d: isOpen ? 'M 20,50 H 80' : 'M 20,50 H 80' },
        bottom: { d: isOpen ? 'M 20,71 L 50,50 L 80,71' : 'M 20,71 H 80' }
      },
      'svg-dash-4': {
        top: { d: isOpen ? 'M 30,30 H 70' : 'M 20,29 H 80' },
        middle: { d: isOpen ? 'M 30,50 H 70' : 'M 30,50 H 70' },
        bottom: { d: isOpen ? 'M 30,70 H 70' : 'M 20,71 H 80' },
        containerTransform: isOpen ? 'rotate(180 50 50) scale(0.8)' : 'rotate(0 50 50) scale(1)'
      },
      'svg-dash-5': {
        top: { d: isOpen ? 'M 20,35 H 80' : 'M 20,29 H 80' },
        middle: { opacity: 1 },
        bottom: { d: isOpen ? 'M 20,65 H 80' : 'M 20,71 H 80' }
      },
      'svg-dash-6': {
        top: { d: isOpen ? 'M 35,50 H 65' : 'M 20,29 H 80' },
        middle: { opacity: isOpen ? 0 : 1 },
        bottom: { d: isOpen ? 'M 35,50 H 65' : 'M 20,71 H 80' }
      },
      'svg-dash-7': {
        top: { d: isOpen ? 'M 30,40 H 70' : 'M 20,29 H 80' },
        middle: { d: isOpen ? 'M 25,50 H 75' : 'M 20,50 H 80' },
        bottom: { d: isOpen ? 'M 30,60 H 70' : 'M 20,71 H 80' }
      },
      'svg-dash-8': {
        top: { d: isOpen ? 'M 50,30 V 70' : 'M 20,29 H 80' },
        middle: { d: isOpen ? 'M 30,50 H 70' : 'M 20,50 H 80' },
        bottom: { opacity: isOpen ? 0 : 1 }
      }
    };
    
    return animations[hamburgerStyle] || animations['svg-dash-1'];
  };
  
  // Overlay styles
  const getOverlayStyle = () => {
    const styles = {
      'fullscreen-slide': {
        transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
        opacity: 1,
        height: '100vh'
      },
      'fullscreen-fade': {
        transform: 'none',
        opacity: isOpen ? 0.98 : 0,
        height: '100vh',
        pointerEvents: isOpen ? 'auto' : 'none'
      },
      'circular-reveal': {
        clipPath: isOpen ? 'circle(150% at 95% 5%)' : 'circle(0% at 95% 5%)',
        opacity: 1,
        height: '100vh'
      },
      'morphing-blob': {
        clipPath: isOpen ? 'ellipse(100% 100% at 50% 50%)' : 'ellipse(0% 0% at 95% 5%)',
        opacity: 1,
        height: '100vh'
      },
      'split-reveal': {
        clipPath: isOpen ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        opacity: 1,
        height: '100vh'
      },
      'bottom-sheet': {
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        opacity: 1,
        height: '100vh',
        bottom: 0
      }
    };
    
    return styles[overlayStyle] || styles['fullscreen-slide'];
  };
  
  // Horizontal hover effects
  const getHorizontalItemStyle = (index) => {
    const isHovered = hoveredIndex === index;
    
    const presets = {
      'underline-slide': isHovered ? {
        borderBottom: `2px solid ${accentColor}`,
        paddingBottom: '2px'
      } : {},
      
      'background-pill': isHovered ? {
        background: horizontalHoverColor + '20',
        borderRadius: '20px',
        transform: 'scale(1.05)'
      } : {},
      
      'scale-lift': isHovered ? {
        transform: 'scale(1.08) translateY(-2px)',
        color: horizontalHoverColor
      } : {},
      
      'floating-label': isHovered ? {
        transform: 'translateY(-3px)',
        borderBottom: `1px solid ${accentColor}`
      } : {},
      
      'spotlight': isHovered ? {
        background: `radial-gradient(circle at center, ${horizontalHoverColor}15 0%, transparent 70%)`
      } : {}
    };
    
    return presets[horizontalPreset] || {};
  };
  
  const paths = getSVGPaths();
  
  if (menuType === 'hamburger') {
    return (
      <div className="menu-container">
        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 10000,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <svg width="50" height="50" viewBox="0 0 100 100" style={{
            transform: paths.containerTransform || 'none',
            transition: `transform ${animSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`
          }}>
            <path
              d={paths.top.d}
              stroke={hamburgerColor}
              strokeWidth="5"
              fill="none"
              style={{
                transform: paths.topTransform || 'none',
                transformOrigin: '50px 50px',
                transition: `all ${animSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`
              }}
            />
            <path
              d={paths.middle.d || 'M 20,50 H 80'}
              stroke={hamburgerColor}
              strokeWidth="5"
              fill="none"
              style={{
                opacity: paths.middle.opacity !== undefined ? paths.middle.opacity : 1,
                transition: `all ${animSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`
              }}
            />
            <path
              d={paths.bottom.d}
              stroke={hamburgerColor}
              strokeWidth="5"
              fill="none"
              style={{
                transform: paths.bottomTransform || 'none',
                transformOrigin: '50px 50px',
                opacity: paths.bottom.opacity !== undefined ? paths.bottom.opacity : 1,
                transition: `all ${animSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`
              }}
            />
          </svg>
        </button>
        
        {/* Overlay menu */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: overlayBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          zIndex: 9999,
          transition: `all ${animSpeed * 1.5}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          ...getOverlayStyle()
        }}>
          {items.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: '32px',
                fontWeight: '500',
                color: overlayText,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all ${animSpeed}ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 50}ms`,
                letterSpacing: '0.025em'
              }}
              onClick={() => setIsOpen(false)}
            >
              {item.trim()}
            </a>
          ))}
        </div>
      </div>
    );
  }
  
  // Horizontal menu
  return (
    <div className="menu-container">
      <nav style={{
        position: 'fixed',
        [horizontalPosition]: 0,
        left: 0,
        right: 0,
        backgroundColor: horizontalBg,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        zIndex: 1000,
        padding: '16px 24px'
      }}>
        <ul style={{
          display: 'flex',
          gap: '32px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          justifyContent: horizontalAlign,
          alignItems: 'center'
        }}>
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: hoveredIndex === index ? horizontalHoverColor : horizontalTextColor,
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  padding: '8px 16px',
                  display: 'inline-block',
                  transition: `all ${animSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  position: 'relative',
                  letterSpacing: '0.025em',
                  ...getHorizontalItemStyle(index)
                }}
              >
                {item.trim()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={{
        paddingTop: horizontalPosition === 'top' ? '80px' : '0',
        paddingBottom: horizontalPosition === 'bottom' ? '80px' : '0',
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        color: '#71717A',
        fontFamily: "'Inter', sans-serif"
      }}>
        Menu Type: {menuType} • Preset: {horizontalPreset}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
