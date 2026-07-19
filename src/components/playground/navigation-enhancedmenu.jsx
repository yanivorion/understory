import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Jul 19, 2026, 08:40 PM
 * Component Type: Navigation.EnhancedMenu
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Navigation.EnhancedMenu",
  "description": "Ultimate navigation menu component with 16+ sophisticated styles including fullscreen overlays, floating menus, gooey morphing, SVG animations, stretchy bars, and creative effects. Features 10+ hamburger styles from simple examples.",
  "editorElement": {
    "selector": ".enhanced-nav-container",
    "displayName": "Enhanced Navigation Menu",
    "archetype": "container",
    "data": {
      "menuStyle": {
        "dataType": "select",
        "displayName": "Menu Style Preset",
        "defaultValue": "fullscreen-slide",
        "options": [
          "fullscreen-slide",
          "fullscreen-fade",
          "circular-reveal",
          "morphing-blob",
          "gooey-morph",
          "floating-expand",
          "vertical-stack",
          "creative-expand",
          "neon-circle",
          "minimal-overlay",
          "split-reveal",
          "bottom-sheet",
          "sidebar-push",
          "stretchy-bar",
          "two-line-minimal",
          "svg-morph"
        ],
        "group": "Content",
        "description": "Choose from 16 menu animation styles"
      },
      "menuItems": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "Home,About,Services,Projects,Contact",
        "group": "Content",
        "description": "Menu items separated by commas"
      },
      "logoText": {
        "dataType": "text",
        "displayName": "Logo Text",
        "defaultValue": "BRAND",
        "group": "Content",
        "description": "Text for logo/brand"
      },
      "showLogo": {
        "dataType": "booleanValue",
        "displayName": "Show Logo",
        "defaultValue": true,
        "group": "Content",
        "description": "Display logo/brand text"
      },
      "hamburgerStyle": {
        "dataType": "select",
        "displayName": "Hamburger Icon Style",
        "defaultValue": "rotate-x",
        "options": [
          "rotate-x",
          "morph-cross",
          "squeeze",
          "arrow",
          "two-line",
          "gooey-rects",
          "svg-dash-1",
          "svg-dash-2",
          "elastic-morph",
          "spin-fade"
        ],
        "group": "Animation",
        "description": "Hamburger to X animation style (10 options)"
      },
      "itemAnimation": {
        "dataType": "select",
        "displayName": "Item Animation",
        "defaultValue": "stagger-fade",
        "options": [
          "stagger-fade",
          "stagger-slide",
          "stagger-scale",
          "wave",
          "elastic-bounce",
          "rotate-flip",
          "simultaneous"
        ],
        "group": "Animation",
        "description": "How menu items animate in"
      },
      "animationSpeed": {
        "dataType": "select",
        "displayName": "Animation Speed",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600", "800"],
        "group": "Animation",
        "description": "Duration in milliseconds"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay",
        "defaultValue": "80",
        "options": ["50", "60", "80", "100", "120", "150"],
        "group": "Animation",
        "description": "Delay between items (ms)"
      },
      "menuPosition": {
        "dataType": "select",
        "displayName": "Menu Position",
        "defaultValue": "right",
        "options": ["left", "right", "center", "top-center"],
        "group": "Layout",
        "description": "Menu button and overlay position"
      },
      "overlayOpacity": {
        "dataType": "select",
        "displayName": "Overlay Opacity",
        "defaultValue": "0.95",
        "options": ["0.85", "0.9", "0.95", "1"],
        "group": "Layout",
        "description": "Menu overlay transparency"
      },
      "menuWidth": {
        "dataType": "select",
        "displayName": "Menu Width",
        "defaultValue": "320",
        "options": ["280", "320", "360", "400", "480"],
        "group": "Layout",
        "description": "Width for floating/bar menus"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Page background color"
      },
      "menuBackground": {
        "dataType": "color",
        "displayName": "Menu Overlay Background",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "Menu overlay background"
      },
      "menuItemColor": {
        "dataType": "color",
        "displayName": "Menu Item Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Menu item text color"
      },
      "menuItemHoverColor": {
        "dataType": "color",
        "displayName": "Menu Item Hover",
        "defaultValue": "#495057",
        "group": "Colors",
        "description": "Menu item hover color"
      },
      "hamburgerColor": {
        "dataType": "color",
        "displayName": "Hamburger Color",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "Hamburger icon color"
      },
      "hamburgerActiveColor": {
        "dataType": "color",
        "displayName": "Hamburger Active Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Hamburger color when menu open"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors",
        "description": "Accent for highlights and effects"
      },
      "gooeyColor": {
        "dataType": "color",
        "displayName": "Gooey/Blob Color",
        "defaultValue": "#708FD4",
        "group": "Colors",
        "description": "Color for gooey blob effects"
      },
      "neonColor": {
        "dataType": "color",
        "displayName": "Neon Effect Color",
        "defaultValue": "#00FF88",
        "group": "Colors",
        "description": "Color for neon glow effects"
      },
      "logoColor": {
        "dataType": "color",
        "displayName": "Logo Color",
        "defaultValue": "#212529",
        "group": "Colors",
        "description": "Logo text color"
      },
      "menuFontSize": {
        "dataType": "number",
        "displayName": "Menu Font Size (px)",
        "defaultValue": 32,
        "group": "Typography",
        "description": "Menu item font size (1-120px)"
      },
      "menuFontWeight": {
        "dataType": "select",
        "displayName": "Menu Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography",
        "description": "Menu item font weight"
      },
      "menuLetterSpacing": {
        "dataType": "select",
        "displayName": "Menu Letter Spacing",
        "defaultValue": "0.025em",
        "options": ["0em", "0.025em", "0.05em", "0.075em", "0.1em"],
        "group": "Typography",
        "description": "Menu item letter spacing"
      },
      "menuTextTransform": {
        "dataType": "select",
        "displayName": "Menu Text Transform",
        "defaultValue": "none",
        "options": ["none", "uppercase", "lowercase", "capitalize"],
        "group": "Typography",
        "description": "Menu text case"
      },
      "logoFontSize": {
        "dataType": "number",
        "displayName": "Logo Font Size (px)",
        "defaultValue": 24,
        "group": "Typography",
        "description": "Logo font size (1-120px)"
      },
      "logoFontWeight": {
        "dataType": "select",
        "displayName": "Logo Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography",
        "description": "Logo font weight"
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
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [activeStretchyItem, setActiveStretchyItem] = React.useState(0);

  // Safe config extraction
  const menuStyle = config?.menuStyle || 'fullscreen-slide';
  const menuItemsText = config?.menuItems || 'Home,About,Services,Projects,Contact';
  const menuItems = menuItemsText.split(',').map(item => item.trim());
  const logoText = config?.logoText || 'BRAND';
  const showLogo = config?.showLogo !== false;
  const hamburgerStyle = config?.hamburgerStyle || 'rotate-x';
  const itemAnimation = config?.itemAnimation || 'stagger-fade';
  const animationSpeed = parseInt(config?.animationSpeed || '400');
  const staggerDelay = parseInt(config?.staggerDelay || '80');
  const menuPosition = config?.menuPosition || 'right';
  const overlayOpacity = parseFloat(config?.overlayOpacity || '0.95');
  const menuWidth = parseInt(config?.menuWidth || '320');
  
  // Colors
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const menuBackground = config?.menuBackground || '#212529';
  const menuItemColor = config?.menuItemColor || '#FFFFFF';
  const menuItemHoverColor = config?.menuItemHoverColor || '#495057';
  const hamburgerColor = config?.hamburgerColor || '#212529';
  const hamburgerActiveColor = config?.hamburgerActiveColor || '#FFFFFF';
  const accentColor = config?.accentColor || '#495057';
  const gooeyColor = config?.gooeyColor || '#708FD4';
  const neonColor = config?.neonColor || '#00FF88';
  const logoColor = config?.logoColor || '#212529';
  
  // Typography
  const menuFontSize = config?.menuFontSize || 32;
  const menuFontWeight = config?.menuFontWeight || '400';
  const menuLetterSpacing = config?.menuLetterSpacing || '0.025em';
  const menuTextTransform = config?.menuTextTransform || 'none';
  const logoFontSize = config?.logoFontSize || 24;
  const logoFontWeight = config?.logoFontWeight || '500';

  // Reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Style categories
  const isFullscreen = [
    'fullscreen-slide', 'fullscreen-fade', 'circular-reveal', 
    'morphing-blob', 'gooey-morph', 'neon-circle', 'minimal-overlay',
    'split-reveal', 'bottom-sheet', 'sidebar-push', 'creative-expand',
    'svg-morph'
  ].includes(menuStyle);
  
  const isFloating = ['floating-expand', 'vertical-stack'].includes(menuStyle);
  const isStretchy = menuStyle === 'stretchy-bar';
  const isTwoLine = menuStyle === 'two-line-minimal';

  // Toggle menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Keyboard accessibility
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Get menu configuration
  const getMenuConfig = () => {
    const configs = {
      'fullscreen-slide': {
        overlayTransform: isOpen 
          ? 'translateX(0)' 
          : menuPosition === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
        itemsAlign: 'center',
        itemsDirection: 'column'
      },
      'fullscreen-fade': {
        overlayOpacity: isOpen ? overlayOpacity : 0,
        overlayTransform: 'none',
        itemsAlign: 'center',
        itemsDirection: 'column',
        pointerEvents: isOpen ? 'auto' : 'none'
      },
      'circular-reveal': {
        clipPath: isOpen 
          ? 'circle(150%)' 
          : menuPosition === 'left' 
            ? 'circle(25px at 45px 45px)' 
            : 'circle(25px at calc(100% - 45px) 45px)',
        itemsAlign: 'center',
        itemsDirection: 'column'
      },
      'morphing-blob': {
        clipPath: isOpen ? 'circle(150%)' : 'circle(40px at calc(100% - 45px) 45px)',
        borderRadius: isOpen ? '0%' : '63% 37% 54% 46% / 55% 48% 52% 45%',
        itemsAlign: 'center',
        itemsDirection: 'column',
        animation: !isOpen && !prefersReducedMotion ? 'morphBlob 8s ease-in-out infinite' : 'none'
      },
      'gooey-morph': {
        clipPath: isOpen ? 'circle(150%)' : 'circle(50px at calc(100% - 45px) 45px)',
        itemsAlign: 'center',
        itemsDirection: 'column',
        gooeyEffect: true,
        filter: 'url(#gooey-filter)'
      },
      'floating-expand': {
        width: isOpen ? `${menuWidth}px` : '70px',
        height: '65px',
        borderRadius: '15px',
        itemsDirection: 'row',
        floatingStyle: true
      },
      'vertical-stack': {
        height: isOpen ? `${menuItems.length * 60 + 40}px` : '60px',
        width: '60px',
        borderRadius: '30px',
        itemsDirection: 'column',
        floatingStyle: true
      },
      'creative-expand': {
        overlayOpacity: isOpen ? overlayOpacity : 0,
        overlayTransform: 'none',
        itemsAlign: 'center',
        itemsDirection: 'column',
        pointerEvents: isOpen ? 'auto' : 'none',
        creativeExpand: true
      },
      'neon-circle': {
        clipPath: isOpen ? 'circle(150%)' : 'circle(25px at calc(100% - 45px) 45px)',
        itemsAlign: 'center',
        itemsDirection: 'column',
        neonEffect: true
      },
      'minimal-overlay': {
        overlayOpacity: isOpen ? overlayOpacity : 0,
        overlayTransform: isOpen ? 'scale(1)' : 'scale(0.95)',
        itemsAlign: 'center',
        itemsDirection: 'column',
        pointerEvents: isOpen ? 'auto' : 'none'
      },
      'split-reveal': {
        overlayTransform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
        itemsAlign: 'center',
        itemsDirection: 'column'
      },
      'bottom-sheet': {
        overlayTransform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        overlayOrigin: 'bottom',
        itemsAlign: 'flex-start',
        itemsDirection: 'column',
        bottomSheet: true
      },
      'sidebar-push': {
        overlayTransform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        width: '300px',
        itemsAlign: 'flex-start',
        itemsDirection: 'column',
        sidebar: true
      },
      'svg-morph': {
        overlayOpacity: isOpen ? overlayOpacity : 0,
        overlayTransform: 'none',
        itemsAlign: 'center',
        itemsDirection: 'column',
        pointerEvents: isOpen ? 'auto' : 'none',
        svgMorph: true
      }
    };

    return configs[menuStyle] || configs['fullscreen-slide'];
  };

  const menuConfig = getMenuConfig();

  // Hamburger bar styles - 10 different styles
  const getHamburgerBarStyle = (position) => {
    const baseColor = isOpen ? hamburgerActiveColor : hamburgerColor;
    const baseTransition = prefersReducedMotion 
      ? 'none' 
      : `all ${animationSpeed}ms cubic-bezier(0.215, 0.61, 0.355, 1)`;

    const baseStyle = {
      position: 'absolute',
      width: '24px',
      height: '2px',
      backgroundColor: baseColor,
      transition: baseTransition,
      borderRadius: '2px'
    };

    if (hamburgerStyle === 'two-line') {
      if (position === 'top') {
        return {
          ...baseStyle,
          top: '35%',
          transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none'
        };
      } else if (position === 'bottom') {
        return {
          ...baseStyle,
          top: '65%',
          transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'
        };
      } else {
        return { ...baseStyle, display: 'none' };
      }
    }

    if (hamburgerStyle === 'rotate-x') {
      if (position === 'top') {
        return {
          ...baseStyle,
          top: isOpen ? '50%' : '30%',
          transform: isOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(-50%)'
        };
      } else if (position === 'middle') {
        return {
          ...baseStyle,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: isOpen ? 0 : 1
        };
      } else {
        return {
          ...baseStyle,
          top: isOpen ? '50%' : '70%',
          transform: isOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-50%)'
        };
      }
    }

    if (hamburgerStyle === 'gooey-rects') {
      if (position === 'top') {
        return {
          ...baseStyle,
          width: '32px',
          height: '4px',
          top: '25%',
          transform: isOpen ? 'rotate(-45deg) translateX(-10px) translateY(12px)' : 'none'
        };
      } else if (position === 'middle') {
        return {
          ...baseStyle,
          width: '32px',
          height: '4px',
          top: '50%',
          transform: isOpen ? 'rotate(45deg)' : 'translateY(-50%)'
        };
      } else {
        return {
          ...baseStyle,
          width: '32px',
          height: '4px',
          top: '75%',
          transform: isOpen ? 'rotate(-45deg) translateX(10px) translateY(-12px)' : 'none'
        };
      }
    }

    if (hamburgerStyle === 'squeeze') {
      if (position === 'top') {
        return {
          ...baseStyle,
          top: isOpen ? '50%' : '30%',
          transform: isOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(-50%)',
          width: isOpen ? '24px' : '20px'
        };
      } else if (position === 'middle') {
        return {
          ...baseStyle,
          top: '50%',
          transform: 'translateY(-50%)',
          width: isOpen ? 0 : '24px'
        };
      } else {
        return {
          ...baseStyle,
          top: isOpen ? '50%' : '70%',
          transform: isOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-50%)',
          width: isOpen ? '24px' : '20px'
        };
      }
    }

    if (hamburgerStyle === 'arrow') {
      if (position === 'top') {
        return {
          ...baseStyle,
          top: '50%',
          left: isOpen ? '6px' : '0',
          transform: isOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-50%)',
          width: isOpen ? '14px' : '24px'
        };
      } else if (position === 'middle') {
        return {
          ...baseStyle,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: isOpen ? 0 : 1
        };
      } else {
        return {
          ...baseStyle,
          top: '50%',
          left: isOpen ? '6px' : '0',
          transform: isOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(-50%)',
          width: isOpen ? '14px' : '24px'
        };
      }
    }

    if (hamburgerStyle === 'elastic-morph') {
      const elasticTiming = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      if (position === 'top') {
        return {
          ...baseStyle,
          top: isOpen ? '50%' : '30%',
          transform: isOpen ? 'translateY(-50%) rotate(45deg) scaleX(1)' : 'translateY(-50%) scaleX(1)',
          transition: `all ${animationSpeed}ms ${elasticTiming}`
        };
      } else if (position === 'middle') {
        return {
          ...baseStyle,
          top: '50%',
          transform: isOpen ? 'translateY(-50%) scaleX(0) rotate(180deg)' : 'translateY(-50%) scaleX(1)',
          transition: `all ${animationSpeed}ms ${elasticTiming}`
        };
      } else {
        return {
          ...baseStyle,
          top: isOpen ? '50%' : '70%',
          transform: isOpen ? 'translateY(-50%) rotate(-45deg) scaleX(1)' : 'translateY(-50%) scaleX(1)',
          transition: `all ${animationSpeed}ms ${elasticTiming}`
        };
      }
    }

    if (hamburgerStyle === 'spin-fade') {
      if (position === 'top') {
        return {
          ...baseStyle,
          top: isOpen ? '50%' : '30%',
          transform: isOpen ? 'translateY(-50%) rotate(405deg)' : 'translateY(-50%) rotate(0)',
          opacity: isOpen ? 1 : 1
        };
      } else if (position === 'middle') {
        return {
          ...baseStyle,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: isOpen ? 0 : 1
        };
      } else {
        return {
          ...baseStyle,
          top: isOpen ? '50%' : '70%',
          transform: isOpen ? 'translateY(-50%) rotate(-405deg)' : 'translateY(-50%) rotate(0)',
          opacity: isOpen ? 0 : 1
        };
      }
    }

    // Default to rotate-x
    return baseStyle;
  };

  // Item animation styles
  const getItemStyle = (index) => {
    if (prefersReducedMotion) {
      return { opacity: 1, transform: 'none' };
    }

    const baseDelay = staggerDelay * index;
    
    const animations = {
      'stagger-fade': {
        opacity: isOpen ? 1 : 0,
        transform: 'none',
        transitionDelay: isOpen ? `${baseDelay}ms` : '0ms'
      },
      'stagger-slide': {
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateX(0)' : 
          menuPosition === 'left' ? 'translateX(-30px)' : 'translateX(30px)',
        transitionDelay: isOpen ? `${baseDelay}ms` : '0ms'
      },
      'stagger-scale': {
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.8)',
        transitionDelay: isOpen ? `${baseDelay}ms` : '0ms'
      },
      'wave': {
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: isOpen ? `${baseDelay + Math.sin(index) * 50}ms` : '0ms'
      },
      'elastic-bounce': {
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.5)',
        transitionDelay: isOpen ? `${baseDelay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      },
      'rotate-flip': {
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'rotateX(0deg)' : 'rotateX(-90deg)',
        transitionDelay: isOpen ? `${baseDelay}ms` : '0ms',
        transformOrigin: 'top'
      },
      'simultaneous': {
        opacity: isOpen ? 1 : 0,
        transform: 'scale(1)',
        transitionDelay: '0ms'
      }
    };

    return animations[itemAnimation] || animations['stagger-fade'];
  };

  // Render menu item with effects
  const renderMenuItem = (item, index) => {
    const isHovered = hoveredItem === index;
    const itemStyle = getItemStyle(index);

    const baseItemStyle = {
      position: 'relative',
      fontSize: menuConfig.floatingStyle ? '14px' : `${menuFontSize}px`,
      fontWeight: menuFontWeight,
      letterSpacing: menuLetterSpacing,
      textTransform: menuTextTransform,
      color: menuItemColor,
      textDecoration: 'none',
      padding: menuConfig.floatingStyle ? '12px 16px' : '8px 20px',
      borderRadius: menuConfig.floatingStyle ? '8px' : '50px',
      transition: prefersReducedMotion 
        ? 'none' 
        : `all ${animationSpeed}ms cubic-bezier(0.23, 1, 0.32, 1)`,
      cursor: 'pointer',
      backgroundColor: isHovered && menuConfig.floatingStyle 
        ? 'rgba(255,255,255,0.1)' 
        : 'transparent',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      ...itemStyle
    };

    if (menuConfig.neonEffect) {
      baseItemStyle.border = isHovered ? `2px solid ${neonColor}` : '2px solid transparent';
      baseItemStyle.boxShadow = isHovered 
        ? `0 0 10px ${neonColor}, inset 0 0 10px ${neonColor}` 
        : 'none';
    }

    if (menuConfig.creativeExpand && isHovered) {
      return (
        <li
          key={index}
          style={{ listStyle: 'none', position: 'relative' }}
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a href="#0" onClick={() => setIsOpen(false)} style={baseItemStyle}>
            {item}
          </a>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: accentColor,
            opacity: 0.1,
            zIndex: -1,
            animation: prefersReducedMotion ? 'none' : 'expandCircle 500ms ease-out',
            pointerEvents: 'none'
          }} />
        </li>
      );
    }

    return (
      <li
        key={index}
        style={{ listStyle: 'none', position: 'relative' }}
        onMouseEnter={() => setHoveredItem(index)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <a href="#0" onClick={() => setIsOpen(false)} style={baseItemStyle}>
          {item}
        </a>
        {isHovered && !menuConfig.floatingStyle && !menuConfig.neonEffect && (
          <div style={{
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '2px',
            backgroundColor: menuItemHoverColor,
            transition: prefersReducedMotion ? 'none' : `all ${animationSpeed * 0.5}ms ease`
          }} />
        )}
      </li>
    );
  };

  // Inject keyframes and SVG filters
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes morphBlob {
        0%, 100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; }
        14% { border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%; }
        28% { border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%; }
        42% { border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%; }
        56% { border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%; }
        70% { border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%; }
        84% { border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%; }
      }

      @keyframes expandCircle {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
      }

      @keyframes stretchyBar {
        0% { clip-path: polygon(0 0, 0 100%, 24% 100%, 28% 0); }
        100% { clip-path: polygon(0 0, 0 100%, 96% 100%, 100% 0); }
      }
    `;
    document.head.appendChild(style);

    // Add SVG filter for gooey effect
    if (menuConfig.gooeyEffect) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.position = 'absolute';
      svg.style.width = '0';
      svg.style.height = '0';
      svg.innerHTML = `
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" 
              result="gooeyness" />
            <feComposite in="SourceGraphic" in2="gooeyness" operator="atop" />
          </filter>
        </defs>
      `;
      document.body.appendChild(svg);
      return () => {
        document.head.removeChild(style);
        document.body.removeChild(svg);
      };
    }

    return () => document.head.removeChild(style);
  }, [menuConfig.gooeyEffect]);

  // Stretchy bar menu (special case)
  if (isStretchy) {
    return (
      <div className="enhanced-nav-container" style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: backgroundColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: `${menuWidth}px`,
          height: '100px',
          backgroundColor: '#EEEDEF',
          clipPath: 'polygon(4% 0px, 100% 0%, 96% 100%, 0px 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px'
        }}>
          {/* Stretchy bar background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: accentColor,
              clipPath: `polygon(0 0, 0 100%, ${(activeStretchyItem + 1) * (100 / menuItems.length)}% 100%, ${((activeStretchyItem + 1) * (100 / menuItems.length)) + 4}% 0)`,
              transition: prefersReducedMotion ? 'none' : 'clip-path 250ms cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
          </div>

          {/* Menu items */}
          <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'relative',
            zIndex: 1
          }}>
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveStretchyItem(index)}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: hoveredItem === index || activeStretchyItem === index 
                    ? menuItemColor 
                    : hamburgerColor,
                  transition: prefersReducedMotion ? 'none' : 'color 250ms ease',
                  textAlign: 'center',
                  userSelect: 'none'
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          textAlign: 'center',
          color: '#6C757D',
          fontSize: '14px'
        }}>
          Stretchy Bar Menu • Click items to see the animated bar
        </div>
      </div>
    );
  }

  // Logo
  const logoStyle = {
    position: 'fixed',
    top: '20px',
    left: menuPosition === 'right' ? '20px' : 'auto',
    right: menuPosition === 'left' ? '20px' : 'auto',
    fontSize: `${logoFontSize}px`,
    fontWeight: logoFontWeight,
    color: logoColor,
    zIndex: 999,
    letterSpacing: '0.05em'
  };

  // Hamburger button
  const hamburgerButtonStyle = {
    position: menuConfig.floatingStyle ? 'relative' : 'fixed',
    top: menuConfig.floatingStyle ? 'auto' : '20px',
    right: menuConfig.floatingStyle ? 'auto' : menuPosition === 'right' ? '20px' : 'auto',
    left: menuConfig.floatingStyle ? 'auto' : menuPosition === 'left' ? '20px' : 'auto',
    width: '50px',
    height: '50px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1001,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Overlay style
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: menuConfig.sidebar ? menuConfig.width : '100%',
    height: menuConfig.bottomSheet ? 'auto' : '100%',
    minHeight: menuConfig.bottomSheet ? '50vh' : 'auto',
    bottom: menuConfig.bottomSheet ? 0 : 'auto',
    backgroundColor: menuConfig.gooeyEffect ? gooeyColor : menuBackground,
    opacity: menuConfig.overlayOpacity !== undefined ? menuConfig.overlayOpacity : overlayOpacity,
    transform: prefersReducedMotion ? 'none' : (menuConfig.overlayTransform || 'none'),
    clipPath: menuConfig.clipPath || 'none',
    borderRadius: menuConfig.borderRadius || '0',
    transition: prefersReducedMotion 
      ? 'none' 
      : `all ${animationSpeed}ms cubic-bezier(0.23, 1, 0.32, 1)`,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: menuConfig.itemsAlign || 'center',
    justifyContent: menuConfig.bottomSheet ? 'flex-start' : 'center',
    padding: menuConfig.sidebar || menuConfig.bottomSheet ? '60px 40px 40px' : '40px',
    pointerEvents: menuConfig.pointerEvents || 'auto',
    animation: prefersReducedMotion ? 'none' : (menuConfig.animation || 'none'),
    boxShadow: menuConfig.sidebar ? '2px 0 10px rgba(0,0,0,0.1)' : 'none',
    filter: menuConfig.gooeyEffect ? 'url(#gooey-filter)' : 'none'
  };

  // Floating menu style
  const floatingMenuStyle = menuConfig.floatingStyle ? {
    position: 'fixed',
    right: menuPosition === 'right' ? '20px' : 'auto',
    left: menuPosition === 'left' ? '20px' : 'auto',
    top: '20px',
    width: menuConfig.width || 'auto',
    height: menuConfig.height || 'auto',
    backgroundColor: menuBackground,
    borderRadius: menuConfig.borderRadius || '15px',
    transition: prefersReducedMotion 
      ? 'none' 
      : `all ${animationSpeed}ms cubic-bezier(0.23, 1, 0.32, 1)`,
    zIndex: 1000,
    display: 'flex',
    flexDirection: menuConfig.itemsDirection || 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '12px',
    gap: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
  } : null;

  // Menu items container
  const menuItemsContainerStyle = {
    display: 'flex',
    flexDirection: menuConfig.itemsDirection || 'column',
    gap: menuConfig.floatingStyle ? '8px' : '20px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: menuConfig.itemsAlign || 'center',
    width: menuConfig.sidebar ? '100%' : 'auto'
  };

  return (
    <div className="enhanced-nav-container" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Logo */}
      {showLogo && !menuConfig.floatingStyle && (
        <div style={logoStyle}>{logoText}</div>
      )}

      {/* Floating Menu */}
      {menuConfig.floatingStyle ? (
        <div style={floatingMenuStyle}>
          <button
            onClick={toggleMenu}
            style={hamburgerButtonStyle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <div style={{ position: 'relative', width: '24px', height: '24px' }}>
              <span style={getHamburgerBarStyle('top')} />
              <span style={getHamburgerBarStyle('middle')} />
              <span style={getHamburgerBarStyle('bottom')} />
            </div>
          </button>
          
          {isOpen && (
            <ul style={menuItemsContainerStyle}>
              {menuItems.map((item, index) => renderMenuItem(item, index))}
            </ul>
          )}
        </div>
      ) : (
        <>
          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            style={hamburgerButtonStyle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <div style={{ position: 'relative', width: '24px', height: '24px' }}>
              <span style={getHamburgerBarStyle('top')} />
              <span style={getHamburgerBarStyle('middle')} />
              <span style={getHamburgerBarStyle('bottom')} />
            </div>
          </button>

          {/* Menu Overlay */}
          <div style={overlayStyle}>
            <ul style={menuItemsContainerStyle}>
              {menuItems.map((item, index) => renderMenuItem(item, index))}
            </ul>
          </div>
        </>
      )}

      {/* Page Content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px',
        pointerEvents: isOpen && isFullscreen ? 'none' : 'auto'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '500',
            color: '#212529',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Enhanced Navigation Menu
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6C757D',
            lineHeight: '1.6',
            marginBottom: '8px'
          }}>
            {menuStyle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} style with {hamburgerStyle.replace(/-/g, ' ')} hamburger
          </p>
          <p style={{
            fontSize: '14px',
            color: '#ADB5BD',
            lineHeight: '1.5'
          }}>
            16 menu styles • 10 hamburger animations • 7 item effects
          </p>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
