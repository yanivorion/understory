import React from "react";

const MANIFEST = {
  "type": "Navigation.FloatingActionButton",
  "description": "Floating Action Button (FAB) menu with multiple expansion patterns: radial, horizontal, vertical, grid. Features sophisticated animations, icon transformations, and customizable positioning for modern mobile-first interfaces.",
  "editorElement": {
    "selector": ".fab-menu-container",
    "displayName": "Floating Action Button Menu",
    "archetype": "container",
    "data": {
      "menuItems": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "🏠,💬,📁,✉️,⚙️",
        "group": "Content",
        "description": "Emoji or text for each menu item"
      },
      "fabIcon": {
        "dataType": "text",
        "displayName": "FAB Icon (closed)",
        "defaultValue": "+",
        "group": "Content",
        "description": "Icon shown when menu is closed"
      },
      "fabIconOpen": {
        "dataType": "text",
        "displayName": "FAB Icon (open)",
        "defaultValue": "×",
        "group": "Content",
        "description": "Icon shown when menu is open"
      },
      "expansionPattern": {
        "dataType": "select",
        "displayName": "Expansion Pattern",
        "defaultValue": "radial-circle",
        "options": [
          "radial-circle",
          "radial-arc",
          "radial-spiral",
          "horizontal-bar",
          "vertical-stack",
          "grid-2x2",
          "grid-3x3",
          "diagonal-cascade"
        ],
        "group": "Animation",
        "description": "How menu items expand from FAB"
      },
      "iconTransform": {
        "dataType": "select",
        "displayName": "Icon Transform",
        "defaultValue": "rotate-scale",
        "options": [
          "rotate-scale",
          "flip-3d",
          "morph-cross",
          "expand-contract",
          "spin-fade"
        ],
        "group": "Animation",
        "description": "FAB icon transformation animation"
      },
      "itemAnimation": {
        "dataType": "select",
        "displayName": "Item Animation",
        "defaultValue": "scale-up",
        "options": [
          "scale-up",
          "slide-fade",
          "bounce-in",
          "rotate-in",
          "flip-reveal"
        ],
        "group": "Animation",
        "description": "Individual item entrance animation"
      },
      "animationSpeed": {
        "dataType": "select",
        "displayName": "Animation Speed",
        "defaultValue": "300",
        "options": ["200", "250", "300", "350", "400"],
        "group": "Animation",
        "description": "Base animation duration in milliseconds"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay",
        "defaultValue": "50",
        "options": ["30", "40", "50", "60", "80", "100"],
        "group": "Animation",
        "description": "Delay between items in milliseconds"
      },
      "radius": {
        "dataType": "select",
        "displayName": "Expansion Radius",
        "defaultValue": "120",
        "options": ["80", "100", "120", "140", "160", "180"],
        "group": "Layout",
        "description": "Distance from FAB to items (px)"
      },
      "fabPosition": {
        "dataType": "select",
        "displayName": "FAB Position",
        "defaultValue": "bottom-right",
        "options": [
          "bottom-right",
          "bottom-left",
          "top-right",
          "top-left",
          "bottom-center",
          "top-center"
        ],
        "group": "Layout",
        "description": "FAB placement on screen"
      },
      "fabSize": {
        "dataType": "select",
        "displayName": "FAB Size",
        "defaultValue": "64",
        "options": ["48", "56", "64", "72", "80"],
        "group": "Layout",
        "description": "FAB button size in pixels"
      },
      "itemSize": {
        "dataType": "select",
        "displayName": "Item Size",
        "defaultValue": "48",
        "options": ["40", "44", "48", "52", "56"],
        "group": "Layout",
        "description": "Menu item size in pixels"
      },
      "fabBackground": {
        "dataType": "color",
        "displayName": "FAB Background",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "FAB button background color"
      },
      "fabIconColor": {
        "dataType": "color",
        "displayName": "FAB Icon Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "FAB icon color"
      },
      "itemBackground": {
        "dataType": "color",
        "displayName": "Item Background",
        "defaultValue": "#495057",
        "group": "Colors",
        "description": "Menu item background color"
      },
      "itemIconColor": {
        "dataType": "color",
        "displayName": "Item Icon Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Menu item icon/text color"
      },
      "itemHoverBackground": {
        "dataType": "color",
        "displayName": "Item Hover Background",
        "defaultValue": "#343A40",
        "group": "Colors",
        "description": "Menu item background on hover"
      },
      "backdropColor": {
        "dataType": "color",
        "displayName": "Backdrop Color",
        "defaultValue": "#000000",
        "group": "Colors",
        "description": "Backdrop overlay color when open"
      },
      "fabIconSize": {
        "dataType": "number",
        "displayName": "FAB Icon Size (px)",
        "defaultValue": 24,
        "group": "Typography",
        "description": "FAB icon font size (1-120px)"
      },
      "itemIconSize": {
        "dataType": "number",
        "displayName": "Item Icon Size (px)",
        "defaultValue": 20,
        "group": "Typography",
        "description": "Menu item icon size (1-120px)"
      },
      "showLabels": {
        "dataType": "booleanValue",
        "displayName": "Show Item Labels",
        "defaultValue": false,
        "group": "Content",
        "description": "Display text labels next to items"
      },
      "itemLabels": {
        "dataType": "text",
        "displayName": "Item Labels (comma-separated)",
        "defaultValue": "Home,Messages,Files,Send,Settings",
        "group": "Content",
        "description": "Text labels for menu items"
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
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  // Safe config extraction
  const menuItems = (config?.menuItems || '🏠,💬,📁,✉️,⚙️').split(',').map(item => item.trim());
  const itemLabels = (config?.itemLabels || 'Home,Messages,Files,Send,Settings').split(',').map(label => label.trim());
  const fabIcon = config?.fabIcon || '+';
  const fabIconOpen = config?.fabIconOpen || '×';
  const expansionPattern = config?.expansionPattern || 'radial-circle';
  const iconTransform = config?.iconTransform || 'rotate-scale';
  const itemAnimation = config?.itemAnimation || 'scale-up';
  const animationSpeed = parseInt(config?.animationSpeed || '300');
  const staggerDelay = parseInt(config?.staggerDelay || '50');
  const radius = parseInt(config?.radius || '120');
  const fabPosition = config?.fabPosition || 'bottom-right';
  const fabSize = parseInt(config?.fabSize || '64');
  const itemSize = parseInt(config?.itemSize || '48');
  const fabBackground = config?.fabBackground || '#212529';
  const fabIconColor = config?.fabIconColor || '#FFFFFF';
  const itemBackground = config?.itemBackground || '#495057';
  const itemIconColor = config?.itemIconColor || '#FFFFFF';
  const itemHoverBackground = config?.itemHoverBackground || '#343A40';
  const backdropColor = config?.backdropColor || '#000000';
  const fabIconSize = config?.fabIconSize || 24;
  const itemIconSize = config?.itemIconSize || 20;
  const showLabels = config?.showLabels !== false;

  // Reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close on escape
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Get FAB position styles
  const getFabPositionStyles = () => {
    const offset = '24px';
    const positions = {
      'bottom-right': { bottom: offset, right: offset },
      'bottom-left': { bottom: offset, left: offset },
      'top-right': { top: offset, right: offset },
      'top-left': { top: offset, left: offset },
      'bottom-center': { bottom: offset, left: '50%', transform: 'translateX(-50%)' },
      'top-center': { top: offset, left: '50%', transform: 'translateX(-50%)' }
    };
    return positions[fabPosition] || positions['bottom-right'];
  };

  // Get item position based on expansion pattern
  const getItemPosition = (index, total) => {
    if (prefersReducedMotion) {
      return { 
        transform: 'translate(0, 0)',
        opacity: 1
      };
    }

    const patterns = {
      'radial-circle': () => {
        const angle = (360 / total) * index - 90; // Start from top
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return { transform: isOpen ? `translate(${x}px, ${y}px)` : 'translate(0, 0)' };
      },
      'radial-arc': () => {
        const startAngle = -45;
        const endAngle = 45;
        const angle = startAngle + ((endAngle - startAngle) / (total - 1)) * index;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return { transform: isOpen ? `translate(${x}px, ${y}px)` : 'translate(0, 0)' };
      },
      'radial-spiral': () => {
        const angle = (360 / total) * index - 90;
        const rad = (angle * Math.PI) / 180;
        const spiralRadius = radius * (0.6 + (index / total) * 0.4);
        const x = Math.cos(rad) * spiralRadius;
        const y = Math.sin(rad) * spiralRadius;
        return { transform: isOpen ? `translate(${x}px, ${y}px) rotate(${angle}deg)` : 'translate(0, 0) rotate(0)' };
      },
      'horizontal-bar': () => {
        const spacing = itemSize + 8;
        const totalWidth = spacing * (total - 1);
        const x = isOpen ? -totalWidth / 2 + spacing * index : 0;
        return { transform: isOpen ? `translate(${x}px, -${radius}px)` : 'translate(0, 0)' };
      },
      'vertical-stack': () => {
        const spacing = itemSize + 8;
        const y = isOpen ? -(spacing * (index + 1)) : 0;
        return { transform: isOpen ? `translate(0, ${y}px)` : 'translate(0, 0)' };
      },
      'grid-2x2': () => {
        const cols = 2;
        const row = Math.floor(index / cols);
        const col = index % cols;
        const spacing = itemSize + 16;
        const x = isOpen ? (col - 0.5) * spacing : 0;
        const y = isOpen ? -(row + 1) * spacing : 0;
        return { transform: isOpen ? `translate(${x}px, ${y}px)` : 'translate(0, 0)' };
      },
      'grid-3x3': () => {
        const cols = 3;
        const row = Math.floor(index / cols);
        const col = index % cols;
        const spacing = itemSize + 12;
        const x = isOpen ? (col - 1) * spacing : 0;
        const y = isOpen ? -(row + 1) * spacing : 0;
        return { transform: isOpen ? `translate(${x}px, ${y}px)` : 'translate(0, 0)' };
      },
      'diagonal-cascade': () => {
        const spacing = itemSize + 8;
        const x = isOpen ? -spacing * (index + 1) : 0;
        const y = isOpen ? -spacing * (index + 1) : 0;
        return { transform: isOpen ? `translate(${x}px, ${y}px)` : 'translate(0, 0)' };
      }
    };

    const pattern = patterns[expansionPattern] || patterns['radial-circle'];
    return pattern();
  };

  // Get item animation styles
  const getItemAnimationStyles = (index) => {
    if (prefersReducedMotion) {
      return { opacity: 1, transform: 'scale(1)' };
    }

    const delay = staggerDelay * index;
    
    const animations = {
      'scale-up': {
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0,
        transitionDelay: isOpen ? `${delay}ms` : '0ms'
      },
      'slide-fade': {
        opacity: isOpen ? 1 : 0,
        transitionDelay: isOpen ? `${delay}ms` : '0ms'
      },
      'bounce-in': {
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.3,
        transitionDelay: isOpen ? `${delay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      },
      'rotate-in': {
        opacity: isOpen ? 1 : 0,
        rotate: isOpen ? '0deg' : '180deg',
        transitionDelay: isOpen ? `${delay}ms` : '0ms'
      },
      'flip-reveal': {
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'rotateY(0deg)' : 'rotateY(90deg)',
        transitionDelay: isOpen ? `${delay}ms` : '0ms'
      }
    };

    return animations[itemAnimation] || animations['scale-up'];
  };

  // Get FAB icon transform styles
  const getFabIconStyles = () => {
    if (prefersReducedMotion) {
      return { transform: 'none' };
    }

    const transforms = {
      'rotate-scale': {
        transform: isOpen ? 'rotate(135deg) scale(1.1)' : 'rotate(0deg) scale(1)'
      },
      'flip-3d': {
        transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transformStyle: 'preserve-3d'
      },
      'morph-cross': {
        transform: isOpen ? 'rotate(45deg) scale(0.9)' : 'rotate(0deg) scale(1)'
      },
      'expand-contract': {
        transform: isOpen ? 'scale(0.8)' : 'scale(1)'
      },
      'spin-fade': {
        transform: isOpen ? 'rotate(360deg) scale(0.8)' : 'rotate(0deg) scale(1)',
        opacity: isOpen ? 0.7 : 1
      }
    };

    return transforms[iconTransform] || transforms['rotate-scale'];
  };

  const fabIconStyles = getFabIconStyles();

  return (
    <div
      className="fab-menu-container"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F8F9FA',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* Demo Content */}
      <div style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '500',
          color: '#212529',
          marginBottom: '16px'
        }}>
          Floating Action Button Menu
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#6C757D',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          Click the FAB in the {fabPosition.replace('-', ' ')} corner to explore {expansionPattern} expansion
          with {iconTransform} icon animation and {itemAnimation} item reveal.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginTop: '48px'
        }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              padding: '32px',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E9ECEF'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '500',
                color: '#212529',
                marginBottom: '12px'
              }}>
                Feature {i}
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#6C757D',
                lineHeight: '1.6'
              }}>
                Modern FAB navigation with sophisticated radial and grid-based expansion patterns.
              </p>
            </div>
          ))}
        </div>
      </div>

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
            backgroundColor: `${backdropColor}30`,
            opacity: prefersReducedMotion ? 1 : (isOpen ? 1 : 0),
            transition: prefersReducedMotion ? 'none' : `opacity ${animationSpeed}ms ease`,
            zIndex: 998,
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
        />
      )}

      {/* FAB Container */}
      <div
        style={{
          position: 'fixed',
          zIndex: 999,
          ...getFabPositionStyles()
        }}
      >
        {/* Menu Items */}
        {menuItems.map((item, index) => {
          const position = getItemPosition(index, menuItems.length);
          const animStyles = getItemAnimationStyles(index);
          const isHovered = hoveredIndex === index;

          return (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={showLabels ? itemLabels[index] : `Menu item ${index + 1}`}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: `${itemSize}px`,
                height: `${itemSize}px`,
                borderRadius: '50%',
                backgroundColor: isHovered ? itemHoverBackground : itemBackground,
                color: itemIconColor,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: `${itemIconSize}px`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: prefersReducedMotion 
                  ? 'none' 
                  : `all ${animationSpeed}ms cubic-bezier(0.215, 0.61, 0.355, 1)`,
                pointerEvents: isOpen ? 'auto' : 'none',
                willChange: 'transform, opacity',
                ...position,
                ...animStyles,
                transform: `${position.transform} ${animStyles.transform || ''}`,
                scale: animStyles.scale,
                rotate: animStyles.rotate,
                transformOrigin: 'center'
              }}
            >
              {item}
              {showLabels && isOpen && (
                <span style={{
                  position: 'absolute',
                  right: '100%',
                  marginRight: '12px',
                  backgroundColor: '#212529',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '400',
                  whiteSpace: 'nowrap',
                  opacity: isOpen ? 1 : 0,
                  transition: `opacity ${animationSpeed}ms ease ${staggerDelay * index}ms`,
                  pointerEvents: 'none'
                }}>
                  {itemLabels[index] || `Item ${index + 1}`}
                </span>
              )}
            </button>
          );
        })}

        {/* FAB Button */}
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          style={{
            position: 'relative',
            width: `${fabSize}px`,
            height: `${fabSize}px`,
            borderRadius: '50%',
            backgroundColor: fabBackground,
            color: fabIconColor,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fabIconSize}px`,
            fontWeight: '300',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: prefersReducedMotion 
              ? 'none' 
              : `all ${animationSpeed}ms cubic-bezier(0.215, 0.61, 0.355, 1)`,
            zIndex: 1,
            ...fabIconStyles
          }}
        >
          <span style={{
            position: 'absolute',
            transition: prefersReducedMotion ? 'none' : `opacity ${animationSpeed * 0.5}ms ease`,
            opacity: isOpen ? 0 : 1
          }}>
            {fabIcon}
          </span>
          <span style={{
            position: 'absolute',
            transition: prefersReducedMotion ? 'none' : `opacity ${animationSpeed * 0.5}ms ease`,
            opacity: isOpen ? 1 : 0
          }}>
            {fabIconOpen}
          </span>
        </button>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
