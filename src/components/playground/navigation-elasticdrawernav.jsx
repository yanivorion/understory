import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Jul 19, 2026, 08:47 PM
 * Component Type: Navigation.ElasticDrawerNav
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Navigation.ElasticDrawerNav",
  "description": "Side drawer navigation with elastic overshoot animation, staggered menu cascades with spring physics, blur backdrop, nested sub-menus with horizontal slides, and swipe gestures",
  "editorElement": {
    "selector": ".elastic-drawer-nav",
    "displayName": "Elastic Drawer Navigation",
    "archetype": "container",
    "data": {
      "menuItems": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "Home,Work,About,Services,Blog,Contact",
        "group": "Content"
      },
      "drawerSide": {
        "dataType": "select",
        "displayName": "Drawer Side",
        "defaultValue": "left",
        "options": ["left", "right"],
        "group": "Layout"
      },
      "drawerWidth": {
        "dataType": "select",
        "displayName": "Drawer Width",
        "defaultValue": "320",
        "options": ["280", "320", "360", "400"],
        "group": "Layout"
      },
      "elasticity": {
        "dataType": "select",
        "displayName": "Elastic Bounce",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "strong"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Drawer Background",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "activeColor": {
        "dataType": "color",
        "displayName": "Active Item Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "backdropColor": {
        "dataType": "color",
        "displayName": "Backdrop Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 24,
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
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [dragStart, setDragStart] = React.useState(null);
  const [dragOffset, setDragOffset] = React.useState(0);

  const menuItemsText = config?.menuItems || "Home,Work,About,Services,Blog,Contact";
  const menuItems = menuItemsText.split(',').map(item => item.trim());
  const drawerSide = config?.drawerSide || "left";
  const drawerWidth = parseInt(config?.drawerWidth || "320");
  const elasticity = config?.elasticity || "medium";
  const backgroundColor = config?.backgroundColor || "#18181B";
  const textColor = config?.textColor || "#FAFAFA";
  const activeColor = config?.activeColor || "#3F3F46";
  const backdropColor = config?.backdropColor || "#000000";
  const fontSize = config?.fontSize || 24;
  const fontWeight = config?.fontWeight || "400";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const elasticEasing = {
    subtle: 'cubic-bezier(0.68, -0.35, 0.265, 1.35)',
    medium: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    strong: 'cubic-bezier(0.68, -0.75, 0.265, 1.75)'
  }[elasticity];

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setActiveIndex(null);
  };

  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (dragStart === null) return;
    const delta = e.touches[0].clientX - dragStart;
    const isLeftDrawer = drawerSide === 'left';
    
    if ((isLeftDrawer && delta < 0) || (!isLeftDrawer && delta > 0)) {
      setDragOffset(Math.abs(delta));
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > drawerWidth / 3) {
      setIsOpen(false);
    }
    setDragStart(null);
    setDragOffset(0);
  };

  const drawerTransform = isOpen 
    ? drawerSide === 'left' 
      ? `translateX(${-dragOffset}px)`
      : `translateX(${dragOffset}px)`
    : drawerSide === 'left'
      ? `translateX(-${drawerWidth}px)`
      : `translateX(${drawerWidth}px)`;

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleDrawer}
        style={{
          position: 'fixed',
          top: '20px',
          [drawerSide]: '20px',
          width: '48px',
          height: '48px',
          backgroundColor: backgroundColor,
          border: `1px solid ${activeColor}`,
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 200ms ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (!prefersReducedMotion) e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div style={{
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
            backgroundColor: textColor,
            borderRadius: '2px',
            transition: prefersReducedMotion ? 'none' : 'transform 300ms ease, opacity 300ms ease',
            transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none',
            transformOrigin: 'center'
          }} />
          <span style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: textColor,
            borderRadius: '2px',
            transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease',
            opacity: isOpen ? 0 : 1
          }} />
          <span style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: textColor,
            borderRadius: '2px',
            transition: prefersReducedMotion ? 'none' : 'transform 300ms ease, opacity 300ms ease',
            transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
            transformOrigin: 'center'
          }} />
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={toggleDrawer}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: `${backdropColor}80`,
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            animation: prefersReducedMotion ? 'none' : 'fadeIn 300ms ease'
          }}
        />
      )}

      {/* Drawer */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="elastic-drawer-nav"
        style={{
          position: 'fixed',
          top: 0,
          [drawerSide]: 0,
          bottom: 0,
          width: drawerWidth + 'px',
          backgroundColor: backgroundColor,
          zIndex: 1000,
          transform: drawerTransform,
          transition: prefersReducedMotion 
            ? 'none'
            : dragStart !== null 
              ? 'none'
              : `transform 600ms ${elasticEasing}`,
          padding: '80px 40px 40px',
          overflow: 'auto',
          boxShadow: drawerSide === 'left' 
            ? '4px 0 24px rgba(0, 0, 0, 0.3)'
            : '-4px 0 24px rgba(0, 0, 0, 0.3)',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {/* Menu Items */}
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {menuItems.map((item, index) => {
            const isActive = activeIndex === index;
            const delay = index * 50;

            return (
              <li
                key={index}
                onClick={() => setActiveIndex(index)}
                style={{
                  fontSize: fontSize + 'px',
                  fontWeight: isActive ? '500' : fontWeight,
                  color: textColor,
                  padding: '16px 20px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? activeColor : 'transparent',
                  cursor: 'pointer',
                  transition: prefersReducedMotion 
                    ? 'none'
                    : 'background-color 200ms ease, transform 200ms ease',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : `translateX(${drawerSide === 'left' ? '-20px' : '20px'})`,
                  transitionDelay: isOpen ? `${delay}ms` : '0ms',
                  animation: isOpen && !prefersReducedMotion 
                    ? `slideIn 500ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms both`
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive && !prefersReducedMotion) {
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(${drawerSide === 'left' ? '-20px' : '20px'});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

export { MANIFEST, Component };
export default Component;
