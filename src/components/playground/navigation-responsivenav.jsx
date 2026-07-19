import React from "react";

const MANIFEST = {
  "type": "Navigation.ResponsiveNav",
  "description": "Premium responsive navigation with animated hamburger icon, sliding drawer, and backdrop blur effect",
  "editorElement": {
    "selector": ".nav-container",
    "displayName": "Responsive Navigation",
    "archetype": "container",
    "data": {
      "menuItems": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "Home,About,Services,Portfolio,Contact",
        "group": "Content"
      },
      "logoText": {
        "dataType": "text",
        "displayName": "Logo Text",
        "defaultValue": "Brand",
        "group": "Content"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "Get Started",
        "group": "Content"
      },
      "showCTA": {
        "dataType": "booleanValue",
        "displayName": "Show CTA Button",
        "defaultValue": true,
        "group": "Content"
      },
      "navBackground": {
        "dataType": "color",
        "displayName": "Nav Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "navBorder": {
        "dataType": "color",
        "displayName": "Nav Border",
        "defaultValue": "rgba(139, 127, 115, 0.12)",
        "group": "Colors"
      },
      "logoColor": {
        "dataType": "color",
        "displayName": "Logo Color",
        "defaultValue": "#2B2520",
        "group": "Colors"
      },
      "linkColor": {
        "dataType": "color",
        "displayName": "Link Color",
        "defaultValue": "#6B6158",
        "group": "Colors"
      },
      "linkHoverColor": {
        "dataType": "color",
        "displayName": "Link Hover Color",
        "defaultValue": "#2B2520",
        "group": "Colors"
      },
      "hamburgerColor": {
        "dataType": "color",
        "displayName": "Hamburger Icon Color",
        "defaultValue": "#2B2520",
        "group": "Colors"
      },
      "drawerBackground": {
        "dataType": "color",
        "displayName": "Drawer Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "backdropColor": {
        "dataType": "color",
        "displayName": "Backdrop Overlay Color",
        "defaultValue": "rgba(0, 0, 0, 0.3)",
        "group": "Colors"
      },
      "ctaBackground": {
        "dataType": "color",
        "displayName": "CTA Background",
        "defaultValue": "#2B2520",
        "group": "Colors"
      },
      "ctaTextColor": {
        "dataType": "color",
        "displayName": "CTA Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui, -apple-system, sans-serif",
        "options": [
          "system-ui, -apple-system, sans-serif",
          "Inter, sans-serif",
          "Georgia, serif"
        ],
        "group": "Typography"
      },
      "logoSize": {
        "dataType": "select",
        "displayName": "Logo Size",
        "defaultValue": "20px",
        "options": ["18px", "20px", "22px", "24px"],
        "group": "Typography"
      },
      "linkSize": {
        "dataType": "select",
        "displayName": "Link Size",
        "defaultValue": "15px",
        "options": ["14px", "15px", "16px", "17px"],
        "group": "Typography"
      },
      "navHeight": {
        "dataType": "select",
        "displayName": "Nav Height",
        "defaultValue": "72px",
        "options": ["64px", "72px", "80px", "88px"],
        "group": "Layout"
      },
      "enableBackdropBlur": {
        "dataType": "booleanValue",
        "displayName": "Enable Backdrop Blur",
        "defaultValue": true,
        "group": "Effects"
      },
      "blurIntensity": {
        "dataType": "select",
        "displayName": "Blur Intensity",
        "defaultValue": "12px",
        "options": ["8px", "10px", "12px", "16px", "20px"],
        "group": "Effects"
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
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  
  const menuItems = (config?.menuItems || "Home,About,Services,Portfolio,Contact").split(',').map(i => i.trim());
  const logoText = config?.logoText || "Brand";
  const ctaText = config?.ctaText || "Get Started";
  const showCTA = config?.showCTA !== false;
  
  const navBackground = config?.navBackground || "#FFFFFF";
  const navBorder = config?.navBorder || "rgba(139, 127, 115, 0.12)";
  const logoColor = config?.logoColor || "#2B2520";
  const linkColor = config?.linkColor || "#6B6158";
  const linkHoverColor = config?.linkHoverColor || "#2B2520";
  const hamburgerColor = config?.hamburgerColor || "#2B2520";
  const drawerBackground = config?.drawerBackground || "#FFFFFF";
  const backdropColor = config?.backdropColor || "rgba(0, 0, 0, 0.3)";
  const ctaBackground = config?.ctaBackground || "#2B2520";
  const ctaTextColor = config?.ctaTextColor || "#FFFFFF";
  
  const fontFamily = config?.fontFamily || "system-ui, -apple-system, sans-serif";
  const logoSize = config?.logoSize || "20px";
  const linkSize = config?.linkSize || "15px";
  
  const navHeight = config?.navHeight || "72px";
  const enableBackdropBlur = config?.enableBackdropBlur !== false;
  const blurIntensity = config?.blurIntensity || "12px";
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: navHeight,
    backgroundColor: navBackground,
    borderBottom: `1px solid ${navBorder}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(20px, 5vw, 60px)',
    fontFamily,
    zIndex: 1000,
    backdropFilter: enableBackdropBlur ? `blur(${blurIntensity})` : 'none',
    WebkitBackdropFilter: enableBackdropBlur ? `blur(${blurIntensity})` : 'none'
  };
  
  const logoStyle = {
    fontSize: logoSize,
    fontWeight: '500',
    color: logoColor,
    letterSpacing: '-0.01em'
  };
  
  const desktopMenuStyle = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '40px'
  };
  
  const linkStyle = {
    fontSize: linkSize,
    fontWeight: '400',
    color: linkColor,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 200ms ease-out'
  };
  
  const ctaButtonStyle = {
    padding: '10px 24px',
    backgroundColor: ctaBackground,
    color: ctaTextColor,
    border: 'none',
    borderRadius: '6px',
    fontSize: linkSize,
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 200ms ease-out',
    fontFamily
  };
  
  const hamburgerStyle = {
    display: isMobile ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '28px',
    height: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    zIndex: 1002
  };
  
  const lineStyle = (index) => {
    const baseStyle = {
      width: '100%',
      height: '2px',
      backgroundColor: hamburgerColor,
      borderRadius: '2px',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      transformOrigin: 'center'
    };
    
    if (isOpen) {
      if (index === 0) return { ...baseStyle, transform: 'rotate(45deg) translateY(9px)' };
      if (index === 1) return { ...baseStyle, opacity: 0, transform: 'scaleX(0)' };
      if (index === 2) return { ...baseStyle, transform: 'rotate(-45deg) translateY(-9px)' };
    }
    
    return baseStyle;
  };
  
  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: backdropColor,
    backdropFilter: enableBackdropBlur ? `blur(${blurIntensity})` : 'none',
    WebkitBackdropFilter: enableBackdropBlur ? `blur(${blurIntensity})` : 'none',
    zIndex: 999,
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'opacity 300ms ease-out'
  };
  
  const drawerStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '80%',
    maxWidth: '400px',
    backgroundColor: drawerBackground,
    boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.1)',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1001,
    padding: '100px 40px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };
  
  const mobileLinksStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };
  
  const mobileLinkStyle = {
    fontSize: '20px',
    fontWeight: '400',
    color: linkColor,
    cursor: 'pointer',
    transition: 'color 200ms ease-out',
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
    transitionDelay: isOpen ? '100ms' : '0ms'
  };
  
  return (
    <div className="nav-container">
      <nav style={navStyle}>
        <div style={logoStyle}>{logoText}</div>
        
        <div style={desktopMenuStyle}>
          {menuItems.map((item, i) => (
            <a 
              key={i} 
              style={linkStyle}
              onMouseEnter={e => e.target.style.color = linkHoverColor}
              onMouseLeave={e => e.target.style.color = linkColor}
            >
              {item}
            </a>
          ))}
          {showCTA && (
            <button 
              style={ctaButtonStyle}
              onMouseEnter={e => e.target.style.opacity = '0.9'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              {ctaText}
            </button>
          )}
        </div>
        
        <button 
          style={hamburgerStyle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span style={lineStyle(0)} />
          <span style={lineStyle(1)} />
          <span style={lineStyle(2)} />
        </button>
      </nav>
      
      {isMobile && (
        <>
          <div style={backdropStyle} onClick={() => setIsOpen(false)} />
          <div style={drawerStyle}>
            <div style={mobileLinksStyle}>
              {menuItems.map((item, i) => (
                <div 
                  key={i}
                  style={{
                    ...mobileLinkStyle,
                    transitionDelay: isOpen ? `${100 + i * 50}ms` : '0ms'
                  }}
                  onMouseEnter={e => e.target.style.color = linkHoverColor}
                  onMouseLeave={e => e.target.style.color = linkColor}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </div>
              ))}
            </div>
            {showCTA && (
              <button 
                style={{
                  ...ctaButtonStyle,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'all 300ms ease-out',
                  transitionDelay: isOpen ? `${100 + menuItems.length * 50}ms` : '0ms'
                }}
              >
                {ctaText}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
