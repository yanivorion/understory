import React from "react";

const MANIFEST = {
  "type": "Navigation.LiquidMorphingNav",
  "description": "Navigation bar with liquid morphing active indicator, magnetic text hover, animated gradient background, and sophisticated hamburger morphing through multiple states",
  "editorElement": {
    "selector": ".liquid-morphing-nav",
    "displayName": "Liquid Morphing Navigation",
    "archetype": "container",
    "data": {
      "menuItems": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "Home,Work,About,Services,Contact",
        "group": "Content"
      },
      "logoText": {
        "dataType": "text",
        "displayName": "Logo Text",
        "defaultValue": "BRAND",
        "group": "Content"
      },
      "initialActive": {
        "dataType": "select",
        "displayName": "Initial Active Item",
        "defaultValue": "0",
        "options": ["0", "1", "2", "3", "4"],
        "group": "Content"
      },
      "blobStyle": {
        "dataType": "select",
        "displayName": "Blob Animation Style",
        "defaultValue": "elastic",
        "options": ["smooth", "elastic", "bouncy"],
        "group": "Animation"
      },
      "magneticStrength": {
        "dataType": "select",
        "displayName": "Magnetic Pull Strength",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "strong"],
        "group": "Animation"
      },
      "gradientAnimation": {
        "dataType": "booleanValue",
        "displayName": "Animated Gradient Background",
        "defaultValue": true,
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "blobColor": {
        "dataType": "color",
        "displayName": "Blob Indicator Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#A1A1AA",
        "group": "Colors"
      },
      "activeTextColor": {
        "dataType": "color",
        "displayName": "Active Text Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "gradientColor1": {
        "dataType": "color",
        "displayName": "Gradient Color 1",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "gradientColor2": {
        "dataType": "color",
        "displayName": "Gradient Color 2",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 16,
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
      "resizeDirection": "horizontal",
      "contentResizeDirection": "none"
    }
  }
};

function Component({ config = {} }) {
  const [activeIndex, setActiveIndex] = React.useState(parseInt(config?.initialActive || "0"));
  const [blobStyle, setBlobStyle] = React.useState({ left: 0, width: 0 });
  const [magneticOffsets, setMagneticOffsets] = React.useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [hamburgerState, setHamburgerState] = React.useState('lines'); // 'lines', 'x', 'arrow'
  const navRef = React.useRef(null);
  const itemsRef = React.useRef([]);

  // Configuration
  const menuItemsText = config?.menuItems || "Home,Work,About,Services,Contact";
  const menuItems = menuItemsText.split(',').map(item => item.trim());
  const logoText = config?.logoText || "BRAND";
  const blobAnimStyle = config?.blobStyle || "elastic";
  const magneticStrength = config?.magneticStrength || "medium";
  const gradientAnimation = config?.gradientAnimation !== false;
  const backgroundColor = config?.backgroundColor || "#18181B";
  const blobColor = config?.blobColor || "#3F3F46";
  const textColor = config?.textColor || "#A1A1AA";
  const activeTextColor = config?.activeTextColor || "#FAFAFA";
  const gradientColor1 = config?.gradientColor1 || "#27272A";
  const gradientColor2 = config?.gradientColor2 || "#3F3F46";
  const fontSize = config?.fontSize || 16;
  const fontWeight = config?.fontWeight || "400";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Blob easing based on style
  const blobEasing = {
    smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bouncy: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  }[blobAnimStyle];

  // Magnetic multiplier
  const magneticMultiplier = {
    subtle: 0.1,
    medium: 0.2,
    strong: 0.3
  }[magneticStrength];

  // Update blob position
  React.useEffect(() => {
    const updateBlob = () => {
      const activeItem = itemsRef.current[activeIndex];
      if (activeItem && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const left = itemRect.left - navRect.left;
        const width = itemRect.width;
        setBlobStyle({ left, width });
      }
    };

    updateBlob();
    window.addEventListener('resize', updateBlob);
    return () => window.removeEventListener('resize', updateBlob);
  }, [activeIndex]);

  // Handle item click
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  // Magnetic hover
  const handleMouseMove = (e, index) => {
    if (prefersReducedMotion) return;
    
    const item = itemsRef.current[index];
    if (!item) return;

    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * magneticMultiplier;
    const deltaY = (e.clientY - centerY) * magneticMultiplier;

    setMagneticOffsets(prev => ({
      ...prev,
      [index]: { x: deltaX, y: deltaY }
    }));
  };

  const handleMouseLeave = (index) => {
    setMagneticOffsets(prev => ({
      ...prev,
      [index]: { x: 0, y: 0 }
    }));
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Cycle hamburger states
    if (!isMobileMenuOpen) {
      setHamburgerState('x');
    } else {
      setHamburgerState('lines');
    }
  };

  return (
    <nav 
      className="liquid-morphing-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        backgroundColor: backgroundColor,
        zIndex: 1000,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* Animated Gradient Background */}
      {gradientAnimation && !prefersReducedMotion && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(120deg, ${gradientColor1}, ${gradientColor2}, ${gradientColor1})`,
          backgroundSize: '200% 200%',
          animation: 'gradientWave 8s ease infinite',
          opacity: 0.5,
          pointerEvents: 'none'
        }} />
      )}

      {/* Nav Content */}
      <div style={{
        position: 'relative',
        height: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div style={{
          fontSize: (fontSize + 4) + 'px',
          fontWeight: '500',
          color: activeTextColor,
          letterSpacing: '0.1em'
        }}>
          {logoText}
        </div>

        {/* Desktop Menu */}
        <div 
          ref={navRef}
          style={{
            position: 'relative',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}
          className="desktop-menu"
        >
          {/* Blob Indicator */}
          <div
            style={{
              position: 'absolute',
              left: blobStyle.left + 'px',
              width: blobStyle.width + 'px',
              height: '48px',
              backgroundColor: blobColor,
              borderRadius: '24px',
              transition: prefersReducedMotion 
                ? 'none'
                : `left 600ms ${blobEasing}, width 600ms ${blobEasing}`,
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const isActive = activeIndex === index;
            const offset = magneticOffsets[index] || { x: 0, y: 0 };

            return (
              <button
                key={index}
                ref={el => itemsRef.current[index] = el}
                onClick={() => handleItemClick(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{
                  position: 'relative',
                  padding: '12px 24px',
                  fontSize: fontSize + 'px',
                  fontWeight: fontWeight,
                  color: isActive ? activeTextColor : textColor,
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  transition: prefersReducedMotion 
                    ? 'none'
                    : 'color 300ms ease, transform 200ms ease',
                  transform: prefersReducedMotion 
                    ? 'none'
                    : `translate(${offset.x}px, ${offset.y}px)`,
                  zIndex: 1,
                  whiteSpace: 'nowrap',
                  outline: 'none'
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMobileMenu}
          style={{
            display: 'none',
            width: '48px',
            height: '48px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            outline: 'none'
          }}
          className="mobile-hamburger"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div style={{
            position: 'relative',
            width: '24px',
            height: '18px',
            margin: '0 auto'
          }}>
            {/* Line 1 */}
            <span style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '2px',
              backgroundColor: activeTextColor,
              borderRadius: '2px',
              transition: prefersReducedMotion 
                ? 'none'
                : 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease',
              transform: hamburgerState === 'x' 
                ? 'translateY(8px) rotate(45deg)' 
                : hamburgerState === 'arrow'
                ? 'translateY(0) rotate(-45deg) scaleX(0.7)'
                : 'translateY(0) rotate(0)',
              transformOrigin: 'center'
            }} />
            {/* Line 2 */}
            <span style={{
              position: 'absolute',
              left: 0,
              top: '8px',
              width: '100%',
              height: '2px',
              backgroundColor: activeTextColor,
              borderRadius: '2px',
              transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease',
              opacity: hamburgerState === 'lines' ? 1 : 0
            }} />
            {/* Line 3 */}
            <span style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              height: '2px',
              backgroundColor: activeTextColor,
              borderRadius: '2px',
              transition: prefersReducedMotion 
                ? 'none'
                : 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease',
              transform: hamburgerState === 'x' 
                ? 'translateY(-8px) rotate(-45deg)' 
                : hamburgerState === 'arrow'
                ? 'translateY(0) rotate(45deg) scaleX(0.7)'
                : 'translateY(0) rotate(0)',
              transformOrigin: 'center'
            }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: backgroundColor,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            animation: prefersReducedMotion ? 'none' : 'slideDown 400ms cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          className="mobile-menu"
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                handleItemClick(index);
                toggleMobileMenu();
              }}
              style={{
                fontSize: (fontSize + 8) + 'px',
                fontWeight: '500',
                color: activeIndex === index ? activeTextColor : textColor,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '16px 32px',
                transition: 'color 300ms ease',
                animation: prefersReducedMotion ? 'none' : `slideIn 400ms ease-out ${index * 50}ms both`
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes gradientWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}

export { MANIFEST, Component };
export default Component;
