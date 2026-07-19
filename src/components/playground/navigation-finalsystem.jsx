import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Jul 19, 2026, 08:41 PM
 * Component Type: Navigation.FinalSystem
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Navigation.FinalSystem",
  "description": "Complete navigation system with 8 SVG hamburger animations and 12 refined horizontal menu hover effects. Streamlined, production-ready, and fully accessible.",
  "editorElement": {
    "selector": ".final-nav-container",
    "displayName": "Final Navigation System",
    "archetype": "container",
    "data": {
      "menuType": {
        "dataType": "select",
        "displayName": "Menu Type",
        "defaultValue": "horizontal",
        "options": ["hamburger", "horizontal"],
        "group": "Content",
        "description": "Navigation mode: Hamburger (overlay) or Horizontal (persistent bar)"
      },
      "menuItems": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "Home,About,Services,Projects,Contact",
        "group": "Content"
      },
      "logoText": {
        "dataType": "text",
        "displayName": "Logo Text",
        "defaultValue": "BRAND",
        "group": "Content"
      },
      "showLogo": {
        "dataType": "booleanValue",
        "displayName": "Show Logo",
        "defaultValue": true,
        "group": "Content"
      },
      "hamburgerSvgStyle": {
        "dataType": "select",
        "displayName": "SVG Hamburger Style",
        "defaultValue": "svg-dash-1",
        "options": [
          "svg-dash-1", "svg-dash-2", "svg-dash-3", "svg-dash-4",
          "svg-dash-5", "svg-dash-6", "svg-dash-7", "svg-dash-8"
        ],
        "group": "Animation",
        "description": "8 SVG path morphing styles"
      },
      "overlayStyle": {
        "dataType": "select",
        "displayName": "Overlay Style",
        "defaultValue": "fullscreen-slide",
        "options": ["fullscreen-slide", "fullscreen-fade", "circular-reveal", "morphing-blob", "split-reveal", "bottom-sheet"],
        "group": "Animation"
      },
      "horizontalPreset": {
        "dataType": "select",
        "displayName": "Horizontal Menu Preset",
        "defaultValue": "underline-slide",
        "options": [
          "underline-slide", "background-pill", "border-top", "border-bottom",
          "scale-lift", "magnetic-pull", "floating-label", "stagger-reveal",
          "spotlight", "border-scale-fill", "svg-wave-underline", "dual-gradient"
        ],
        "group": "Animation",
        "description": "12 refined horizontal hover effects"
      },
      "horizontalPosition": {
        "dataType": "select",
        "displayName": "Bar Position",
        "defaultValue": "top",
        "options": ["top", "bottom"],
        "group": "Layout"
      },
      "horizontalAlignment": {
        "dataType": "select",
        "displayName": "Menu Alignment",
        "defaultValue": "center",
        "options": ["left", "center", "right"],
        "group": "Layout"
      },
      "animationSpeed": {
        "dataType": "select",
        "displayName": "Animation Speed",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "menuBackground": {
        "dataType": "color",
        "displayName": "Menu Background",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "menuItemColor": {
        "dataType": "color",
        "displayName": "Menu Item Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "menuItemHoverColor": {
        "dataType": "color",
        "displayName": "Menu Item Hover",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "hamburgerColor": {
        "dataType": "color",
        "displayName": "Hamburger Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "hamburgerActiveColor": {
        "dataType": "color",
        "displayName": "Hamburger Active",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "gradientStart": {
        "dataType": "color",
        "displayName": "Gradient Start",
        "defaultValue": "#FF0000",
        "group": "Colors",
        "description": "For gradient effects"
      },
      "gradientEnd": {
        "dataType": "color",
        "displayName": "Gradient End",
        "defaultValue": "#00FFFF",
        "group": "Colors",
        "description": "For gradient effects"
      },
      "logoColor": {
        "dataType": "color",
        "displayName": "Logo Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "menuFontSize": {
        "dataType": "number",
        "displayName": "Menu Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "menuFontWeight": {
        "dataType": "select",
        "displayName": "Menu Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "menuLetterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "0.05em",
        "options": ["0em", "0.025em", "0.05em", "0.075em", "0.1em"],
        "group": "Typography"
      },
      "menuTextTransform": {
        "dataType": "select",
        "displayName": "Text Transform",
        "defaultValue": "uppercase",
        "options": ["none", "uppercase", "lowercase", "capitalize"],
        "group": "Typography"
      },
      "logoFontSize": {
        "dataType": "number",
        "displayName": "Logo Font Size (px)",
        "defaultValue": 24,
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
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Safe config extraction
  const menuType = config?.menuType || 'horizontal';
  const menuItemsText = config?.menuItems || 'Home,About,Services,Projects,Contact';
  const menuItems = menuItemsText.split(',').map(item => item.trim());
  const logoText = config?.logoText || 'BRAND';
  const showLogo = config?.showLogo !== false;
  const hamburgerSvgStyle = config?.hamburgerSvgStyle || 'svg-dash-1';
  const overlayStyle = config?.overlayStyle || 'fullscreen-slide';
  const horizontalPreset = config?.horizontalPreset || 'underline-slide';
  const horizontalPosition = config?.horizontalPosition || 'top';
  const horizontalAlignment = config?.horizontalAlignment || 'center';
  const animationSpeed = parseInt(config?.animationSpeed || '400');
  
  // Colors
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const menuBackground = config?.menuBackground || '#212529';
  const menuItemColor = config?.menuItemColor || '#FFFFFF';
  const menuItemHoverColor = config?.menuItemHoverColor || '#FFFFFF';
  const hamburgerColor = config?.hamburgerColor || '#212529';
  const hamburgerActiveColor = config?.hamburgerActiveColor || '#FFFFFF';
  const accentColor = config?.accentColor || '#495057';
  const gradientStart = config?.gradientStart || '#FF0000';
  const gradientEnd = config?.gradientEnd || '#00FFFF';
  const logoColor = config?.logoColor || '#212529';
  
  // Typography
  const menuFontSize = config?.menuFontSize || 16;
  const menuFontWeight = config?.menuFontWeight || '400';
  const menuLetterSpacing = config?.menuLetterSpacing || '0.05em';
  const menuTextTransform = config?.menuTextTransform || 'uppercase';
  const logoFontSize = config?.logoFontSize || 24;

  // Reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Toggle hamburger
  const toggleMenu = () => {
    if (menuType === 'hamburger') setIsOpen(!isOpen);
  };

  // Escape key
  React.useEffect(() => {
    if (menuType === 'hamburger' && isOpen) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, menuType]);

  // SVG Hamburger render
  const renderSVGHamburger = () => {
    const strokeColor = isOpen ? hamburgerActiveColor : hamburgerColor;
    const svgStyle = {
      cursor: 'pointer',
      userSelect: 'none',
      transition: prefersReducedMotion ? 'none' : `transform ${animationSpeed}ms`
    };

    const lineStyle = {
      fill: 'none',
      stroke: strokeColor,
      strokeWidth: '5.5',
      strokeLinecap: 'round',
      transition: prefersReducedMotion 
        ? 'none' 
        : `stroke-dasharray ${animationSpeed}ms, stroke-dashoffset ${animationSpeed}ms`
    };

    const shouldRotate = ['svg-dash-1', 'svg-dash-4', 'svg-dash-7'].includes(hamburgerSvgStyle);
    const rotation = shouldRotate && isOpen ? '45deg' : '0deg';
    svgStyle.transform = `rotate(${rotation})`;

    const dashConfigs = {
      'svg-dash-1': {
        top: { d: "m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40",
          dasharray: '40 139', dashoffset: isOpen ? '-98px' : '0' },
        middle: { d: "m 30,50 h 40", dasharray: '40 40', dashoffset: '0' },
        bottom: { d: "m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40",
          dasharray: '40 180', dashoffset: isOpen ? '-138px' : '0' }
      },
      'svg-dash-2': {
        top: { d: "m 70,33 h -40 c -6.5909,0 -7.763966,-4.501509 -7.763966,-7.511428 0,-4.721448 3.376452,-9.583771 13.876919,-9.583771 14.786182,0 11.409257,14.896182 9.596449,21.970818 -1.812808,7.074636 -15.709402,12.124381 -15.709402,12.124381",
          dasharray: '40 121', dashoffset: isOpen ? '-102px' : '0' },
        middle: { d: "m 30,50 h 40", dasharray: '40 40', dashoffset: '0' },
        bottom: { d: "m 70,67 h -40 c -6.5909,0 -7.763966,4.501509 -7.763966,7.511428 0,4.721448 3.376452,9.583771 13.876919,9.583771 14.786182,0 11.409257,-14.896182 9.596449,-21.970818 -1.812808,-7.074636 -15.709402,-12.124381 -15.709402,-12.124381",
          dasharray: '40 121', dashoffset: isOpen ? '-102px' : '0' }
      },
      'svg-dash-3': {
        top: { d: "m 70,33 h -40 c -11.092231,0 11.883874,13.496726 -3.420361,12.956839 -0.962502,-2.089471 -2.222071,-3.282996 -4.545687,-3.282996 -2.323616,0 -5.113897,2.622752 -5.113897,7.071068 0,4.448316 2.080609,7.007933 5.555839,7.007933 2.401943,0 2.96769,-1.283974 4.166879,-3.282995 2.209342,0.273823 4.031294,1.642466 5.857227,-0.252538 v -13.005715 16.288404 h 7.653568",
          dasharray: isOpen ? '75 130' : '40 130', dashoffset: isOpen ? '-63px' : '0' },
        middle: { d: "m 70,50 h -40 c -5.6862,0 -8.534259,5.373483 -8.534259,11.551069 0,7.187738 3.499166,10.922274 13.131984,10.922274 11.021777,0 7.022787,-15.773343 15.531095,-15.773343 3.268142,0 5.177031,-2.159429 5.177031,-6.7 0,-4.540571 -1.766442,-7.33533 -5.087851,-7.326157 -3.321409,0.0092 -5.771288,2.789632 -5.771288,7.326157 0,4.536525 2.478983,6.805271 5.771288,6.7",
          dasharray: '40 140', dashoffset: isOpen ? '-102px' : '0' },
        bottom: { d: "m 70,67 h -40 c 0,0 -3.680675,0.737051 -3.660714,-3.517857 0.02541,-5.415597 3.391687,-10.357143 10.982142,-10.357143 4.048418,0 17.88928,0.178572 23.482143,0.178572 0,2.563604 2.451177,3.403635 4.642857,3.392857 2.19168,-0.01078 4.373905,-1.369814 4.375,-3.392857 0.0011,-2.023043 -1.924401,-2.589191 -4.553571,-4.107143 -2.62917,-1.517952 -4.196429,-1.799562 -4.196429,-3.660714 0,-1.861153 2.442181,-3.118811 4.196429,-3.035715 1.754248,0.0831 4.375,0.890841 4.375,3.125 2.628634,0 6.160714,0.267857 6.160714,0.267857 l -0.178571,-2.946428 10.178571,0 -10.178571,0 v 6.696428 l 8.928571,0 -8.928571,0 v 7.142858 l 10.178571,0 -10.178571,0",
          dasharray: isOpen ? '110 205' : '40 205', dashoffset: isOpen ? '-86px' : '0' }
      },
      'svg-dash-4': {
        top: { d: "m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20",
          dasharray: '40 121', dashoffset: isOpen ? '-68px' : '0' },
        middle: { d: "m 70,50 h -40", dasharray: '40 40', dashoffset: '0' },
        bottom: { d: "m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20",
          dasharray: '40 121', dashoffset: isOpen ? '-68px' : '0' }
      },
      'svg-dash-5': {
        top: { d: "m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429",
          dasharray: isOpen ? '14 82' : '40 82', dashoffset: isOpen ? '-72px' : '0' },
        middle: { d: "m 70,50 h -40", dasharray: '40 40', dashoffset: '0' },
        bottom: { d: "m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429",
          dasharray: isOpen ? '14 82' : '40 82', dashoffset: isOpen ? '-72px' : '0' }
      },
      'svg-dash-6': {
        top: { d: "m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272",
          dasharray: '40 172', dashoffset: isOpen ? '-132px' : '0' },
        middle: { d: "m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272",
          dasharray: '40 111', dashoffset: isOpen ? '-71px' : '0' },
        bottom: { d: "m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272",
          dasharray: '40 172', dashoffset: isOpen ? '-132px' : '0' }
      },
      'svg-dash-7': {
        top: { d: "m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013",
          dasharray: isOpen ? '17 82' : '40 82', dashoffset: isOpen ? '-62px' : '0' },
        middle: { d: "m 70,50 h -40", dasharray: '40 111', dashoffset: isOpen ? '23px' : '0' },
        bottom: { d: "m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40",
          dasharray: '40 161', dashoffset: isOpen ? '-83px' : '0' }
      },
      'svg-dash-8': {
        top: { d: "m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20",
          dasharray: '40 160', dashoffset: isOpen ? '-64px' : '0' },
        middle: { d: "m 30,50 h 40", dasharray: '40 142', dashoffset: '0',
          extraTransform: isOpen ? 'rotate(90deg)' : 'none', transformOrigin: '50%' },
        bottom: { d: "m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20",
          dasharray: '40 85', dashoffset: isOpen ? '-64px' : '0' }
      }
    };

    const config = dashConfigs[hamburgerSvgStyle] || dashConfigs['svg-dash-1'];

    return (
      <svg onClick={toggleMenu} viewBox="0 0 100 100" width="50" height="50" style={svgStyle}>
        <path style={{ ...lineStyle, strokeDasharray: config.top.dasharray, strokeDashoffset: config.top.dashoffset }} d={config.top.d} />
        <path style={{ ...lineStyle, strokeDasharray: config.middle.dasharray, strokeDashoffset: config.middle.dashoffset, transform: config.middle.extraTransform, transformOrigin: config.middle.transformOrigin }} d={config.middle.d} />
        <path style={{ ...lineStyle, strokeDasharray: config.bottom.dasharray, strokeDashoffset: config.bottom.dashoffset }} d={config.bottom.d} />
      </svg>
    );
  };

  // Overlay config
  const getOverlayConfig = () => {
    const configs = {
      'fullscreen-slide': { transform: isOpen ? 'translateX(0)' : 'translateX(100%)', opacity: 1 },
      'fullscreen-fade': { opacity: isOpen ? 0.95 : 0, pointerEvents: isOpen ? 'auto' : 'none' },
      'circular-reveal': { clipPath: isOpen ? 'circle(150%)' : 'circle(25px at calc(100% - 40px) 40px)' },
      'morphing-blob': { clipPath: isOpen ? 'circle(150%)' : 'circle(40px at calc(100% - 40px) 40px)', borderRadius: isOpen ? '0%' : '63% 37% 54% 46% / 55% 48% 52% 45%' },
      'split-reveal': { transform: isOpen ? 'translateY(0)' : 'translateY(-100%)' },
      'bottom-sheet': { transform: isOpen ? 'translateY(0)' : 'translateY(100%)', bottom: 0, minHeight: '50vh', height: 'auto' }
    };
    return configs[overlayStyle] || configs['fullscreen-slide'];
  };

  // Horizontal item styles (12 presets)
  const getHorizontalItemStyle = (index, isHovered, isActive) => {
    const baseStyle = {
      position: 'relative',
      padding: '12px 20px',
      fontSize: `${menuFontSize}px`,
      fontWeight: menuFontWeight,
      letterSpacing: menuLetterSpacing,
      textTransform: menuTextTransform,
      textDecoration: 'none',
      cursor: 'pointer',
      transition: prefersReducedMotion ? 'none' : `all ${animationSpeed}ms ease`,
      color: menuItemColor,
      display: 'inline-block',
      userSelect: 'none',
      overflow: 'visible'
    };

    const effects = {
      'underline-slide': {
        after: (isHovered || isActive) ? {
          content: '""', position: 'absolute', bottom: '0', left: '0',
          width: '100%', height: '2px', backgroundColor: accentColor,
          animation: prefersReducedMotion ? 'none' : 'slideIn 300ms ease'
        } : null
      },
      'background-pill': {
        backgroundColor: (isHovered || isActive) ? accentColor : 'transparent',
        borderRadius: '50px',
        color: (isHovered || isActive) ? menuBackground : menuItemColor
      },
      'border-top': {
        borderTop: (isHovered || isActive) ? `3px solid ${accentColor}` : '3px solid transparent',
        marginTop: '-3px'
      },
      'border-bottom': {
        borderBottom: (isHovered || isActive) ? `3px solid ${accentColor}` : '3px solid transparent'
      },
      'scale-lift': {
        transform: (isHovered || isActive) ? 'translateY(-3px) scale(1.05)' : 'none'
      },
      'magnetic-pull': {
        transform: isHovered ? 'scale(1.1)' : (isActive ? 'scale(1.05)' : 'scale(1)'),
        fontWeight: (isHovered || isActive) ? '500' : menuFontWeight
      },
      'floating-label': {
        transform: (isHovered || isActive) ? 'translateY(-5px)' : 'none',
        after: (isHovered || isActive) ? {
          content: '"•"', position: 'absolute', bottom: '-10px', left: '50%',
          transform: 'translateX(-50%)', color: accentColor, fontSize: '20px'
        } : null
      },
      'stagger-reveal': {
        opacity: 1,
        backgroundColor: (isHovered || isActive) ? `${accentColor}20` : 'transparent',
        borderRadius: '4px'
      },
      'spotlight': {
        boxShadow: (isHovered || isActive) ? `0 0 20px ${accentColor}40, inset 0 0 20px ${accentColor}20` : 'none',
        backgroundColor: (isHovered || isActive) ? `${accentColor}10` : 'transparent',
        borderRadius: '8px'
      },
      'border-scale-fill': {
        before: (isHovered || isActive) ? {
          content: '""', position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          borderTop: `2px solid ${accentColor}`,
          borderBottom: `2px solid ${accentColor}`,
          transform: 'scaleY(1)', opacity: 1,
          transition: prefersReducedMotion ? 'none' : 'all 300ms ease',
          pointerEvents: 'none'
        } : {
          content: '""', position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          borderTop: `2px solid ${accentColor}`,
          borderBottom: `2px solid ${accentColor}`,
          transform: 'scaleY(2)', opacity: 0,
          transition: prefersReducedMotion ? 'none' : 'all 300ms ease',
          pointerEvents: 'none'
        },
        after: (isHovered || isActive) ? {
          content: '""', position: 'absolute', top: '2px', left: 0,
          width: '100%', height: 'calc(100% - 4px)',
          backgroundColor: accentColor,
          transform: 'scaleY(1)', opacity: 1, zIndex: -1,
          transition: prefersReducedMotion ? 'none' : 'all 300ms ease'
        } : {
          content: '""', position: 'absolute', top: '2px', left: 0,
          width: '100%', height: 'calc(100% - 4px)',
          backgroundColor: accentColor,
          transform: 'scale(0)', opacity: 0, zIndex: -1,
          transition: prefersReducedMotion ? 'none' : 'all 300ms ease'
        },
        color: (isHovered || isActive) ? menuBackground : menuItemColor
      },
      'svg-wave-underline': {
        backgroundImage: (isHovered || isActive) 
          ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'390\' height=\'50\' viewBox=\'0 0 390 50\'%3E%3Cpath fill=\'none\' stroke=\'%23d94f5c\' stroke-width=\'1.5\' d=\'M0,47.585c0,0,97.5,0,130,0c13.75,0,28.74-38.778,46.168-19.416C192.669,46.5,243.603,47.585,260,47.585c31.821,0,130,0,130,0\'/%3E%3C/svg%3E")'
          : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: (isHovered || isActive) ? '0 100%' : '390px 100%',
        backgroundSize: '390px 50px',
        transition: prefersReducedMotion ? 'none' : 'background-position 900ms linear',
        paddingBottom: '10px'
      },
      'dual-gradient': {
        before: (isHovered || isActive) ? {
          content: '""', position: 'absolute', width: '100%', height: '2px',
          background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
          top: '-5px', left: 0, transform: 'scaleX(1)', transformOrigin: 'left',
          transition: prefersReducedMotion ? 'none' : 'transform 400ms ease-out'
        } : {
          content: '""', position: 'absolute', width: '100%', height: '2px',
          background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
          top: '-5px', left: 0, transform: 'scaleX(0)', transformOrigin: 'left',
          transition: prefersReducedMotion ? 'none' : 'transform 400ms ease-out'
        },
        after: (isHovered || isActive) ? {
          content: '""', position: 'absolute', width: '100%', height: '2px',
          background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
          bottom: '-5px', left: 0, transform: 'scaleX(1)', transformOrigin: 'right',
          transition: prefersReducedMotion ? 'none' : 'transform 400ms ease-out'
        } : {
          content: '""', position: 'absolute', width: '100%', height: '2px',
          background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
          bottom: '-5px', left: 0, transform: 'scaleX(0)', transformOrigin: 'right',
          transition: prefersReducedMotion ? 'none' : 'transform 400ms ease-out'
        }
      }
    };

    const effect = effects[horizontalPreset] || effects['underline-slide'];
    return { ...baseStyle, ...effect };
  };

  // Render menu item
  const renderMenuItem = (item, index) => {
    const isHovered = hoveredIndex === index;
    const isActive = activeIndex === index;

    if (menuType === 'horizontal') {
      const itemStyle = getHorizontalItemStyle(index, isHovered, isActive);
      
      return (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={itemStyle}
        >
          {itemStyle.before && <div style={{ ...itemStyle.before, pointerEvents: 'none' }} />}
          {item}
          {itemStyle.after && <div style={{ ...itemStyle.after, pointerEvents: 'none' }} />}
        </div>
      );
    }

    // Hamburger mode
    return (
      <li
        key={index}
        style={{
          listStyle: 'none',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: prefersReducedMotion ? 'none' : `all ${animationSpeed}ms ease ${index * 50}ms`
        }}
      >
        <a
          href="#0"
          onClick={() => setIsOpen(false)}
          style={{
            fontSize: '32px', fontWeight: menuFontWeight, letterSpacing: menuLetterSpacing,
            textTransform: menuTextTransform, color: menuItemColor, textDecoration: 'none',
            display: 'block', padding: '12px 0', transition: `color ${animationSpeed}ms ease`
          }}
        >
          {item}
        </a>
      </li>
    );
  };

  // Inject keyframes
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { width: 0; }
        to { width: 100%; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // HORIZONTAL MENU MODE
  if (menuType === 'horizontal') {
    const justifyContent = { left: 'flex-start', center: 'center', right: 'flex-end' }[horizontalAlignment];

    return (
      <div className="final-nav-container" style={{
        position: 'relative', width: '100%', minHeight: '100vh',
        backgroundColor: backgroundColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <nav style={{
          position: 'fixed', [horizontalPosition]: 0, left: 0, right: 0,
          backgroundColor: menuBackground, padding: '0 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '70px', zIndex: 1000,
          boxShadow: horizontalPosition === 'top' ? '0 2px 10px rgba(0,0,0,0.1)' : '0 -2px 10px rgba(0,0,0,0.1)'
        }}>
          {showLogo && (
            <div style={{
              fontSize: `${logoFontSize}px`, fontWeight: '500',
              color: menuItemColor, letterSpacing: '0.05em'
            }}>
              {logoText}
            </div>
          )}

          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            justifyContent: showLogo ? 'flex-end' : justifyContent,
            flex: showLogo ? 1 : 'none',
            position: 'relative'
          }}>
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </div>
        </nav>

        <div style={{
          paddingTop: horizontalPosition === 'top' ? '70px' : '0',
          paddingBottom: horizontalPosition === 'bottom' ? '70px' : '0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', padding: '120px 40px'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '700px' }}>
            <h1 style={{
              fontSize: '56px', fontWeight: '500', color: '#212529',
              marginBottom: '20px', letterSpacing: '-0.02em'
            }}>
              Horizontal Navigation Menu
            </h1>
            <p style={{
              fontSize: '20px', color: '#6C757D', lineHeight: '1.6', marginBottom: '12px'
            }}>
              {horizontalPreset.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} preset
            </p>
            <p style={{
              fontSize: '15px', color: '#ADB5BD', lineHeight: '1.5'
            }}>
              12 refined hover effects • {horizontalPosition} positioned • {horizontalAlignment} aligned
            </p>
          </div>
        </div>
      </div>
    );
  }

  // HAMBURGER MENU MODE
  const overlayConfig = getOverlayConfig();

  return (
    <div className="final-nav-container" style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      backgroundColor: backgroundColor,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {showLogo && (
        <div style={{
          position: 'fixed', top: '20px', left: '20px',
          fontSize: `${logoFontSize}px`, fontWeight: '500',
          color: logoColor, zIndex: 999, letterSpacing: '0.05em'
        }}>
          {logoText}
        </div>
      )}

      <div style={{
        position: 'fixed', top: '15px', right: '15px', zIndex: 1001
      }}>
        {renderSVGHamburger()}
      </div>

      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        bottom: overlayConfig.bottom, height: overlayConfig.height,
        minHeight: overlayConfig.minHeight, backgroundColor: menuBackground,
        opacity: overlayConfig.opacity !== undefined ? overlayConfig.opacity : 0.95,
        transform: prefersReducedMotion ? 'none' : (overlayConfig.transform || 'none'),
        clipPath: overlayConfig.clipPath, borderRadius: overlayConfig.borderRadius,
        transition: prefersReducedMotion ? 'none' : `all ${animationSpeed}ms cubic-bezier(0.23, 1, 0.32, 1)`,
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px', pointerEvents: overlayConfig.pointerEvents || 'auto'
      }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'center' }}>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </ul>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', padding: '40px', pointerEvents: isOpen ? 'none' : 'auto'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h1 style={{
            fontSize: '56px', fontWeight: '500', color: '#212529',
            marginBottom: '20px', letterSpacing: '-0.02em'
          }}>
            Hamburger Menu Mode
          </h1>
          <p style={{
            fontSize: '20px', color: '#6C757D', lineHeight: '1.6', marginBottom: '12px'
          }}>
            {hamburgerSvgStyle.toUpperCase()} • {overlayStyle.replace(/-/g, ' ')}
          </p>
          <p style={{
            fontSize: '15px', color: '#ADB5BD', lineHeight: '1.5'
          }}>
            8 SVG hamburger animations • 6 overlay styles • Full mobile overlay experience
          </p>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
