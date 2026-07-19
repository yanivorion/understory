import React from "react";

const MANIFEST = {
  "type": "Navigation.PageTransitionSystem",
  "description": "Sophisticated page transition system with scroll position memory, route analytics, and multiple transition styles",
  "editorElement": {
    "selector": ".page-transition-system",
    "displayName": "Page Transition System",
    "archetype": "container",
    "data": {
      "page1Title": {
        "dataType": "text",
        "displayName": "Page 1 Title",
        "defaultValue": "Home",
        "group": "Content"
      },
      "page1Content": {
        "dataType": "text",
        "displayName": "Page 1 Content",
        "defaultValue": "Welcome to the home page. This system demonstrates sophisticated page transitions with scroll position memory. Navigate between pages to see the smooth animations and automatic scroll restoration.",
        "group": "Content"
      },
      "page2Title": {
        "dataType": "text",
        "displayName": "Page 2 Title",
        "defaultValue": "About",
        "group": "Content"
      },
      "page2Content": {
        "dataType": "text",
        "displayName": "Page 2 Content",
        "defaultValue": "This is the about page with its own unique content. Scroll down to see more content, then navigate away. When you return, your exact scroll position will be restored.",
        "group": "Content"
      },
      "page3Title": {
        "dataType": "text",
        "displayName": "Page 3 Title",
        "defaultValue": "Projects",
        "group": "Content"
      },
      "page3Content": {
        "dataType": "text",
        "displayName": "Page 3 Content",
        "defaultValue": "Explore our project portfolio. This page demonstrates how scroll position is preserved per route, creating a seamless navigation experience.",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "navBackgroundColor": {
        "dataType": "color",
        "displayName": "Nav Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "activeNavColor": {
        "dataType": "color",
        "displayName": "Active Nav Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "bodyFontSize": {
        "dataType": "number",
        "displayName": "Body Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "navFontSize": {
        "dataType": "number",
        "displayName": "Nav Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "titleFontWeight": {
        "dataType": "select",
        "displayName": "Title Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "transitionStyle": {
        "dataType": "select",
        "displayName": "Transition Style",
        "defaultValue": "slide-horizontal",
        "options": ["slide-horizontal", "slide-vertical", "fade-slide"],
        "group": "Animation"
      },
      "transitionDuration": {
        "dataType": "select",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800"],
        "group": "Animation"
      },
      "easing": {
        "dataType": "select",
        "displayName": "Easing Function",
        "defaultValue": "cubic-bezier(0.22, 1, 0.36, 1)",
        "options": [
          "cubic-bezier(0.22, 1, 0.36, 1)",
          "cubic-bezier(0.4, 0, 0.2, 1)",
          "cubic-bezier(0.16, 1, 0.3, 1)"
        ],
        "group": "Animation"
      },
      "trackAnalytics": {
        "dataType": "booleanValue",
        "displayName": "Track Navigation",
        "defaultValue": true,
        "group": "Analytics"
      },
      "showAnalytics": {
        "dataType": "booleanValue",
        "displayName": "Show Analytics Panel",
        "defaultValue": true,
        "group": "Analytics"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [currentPage, setCurrentPage] = React.useState('page1');
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [transitionDirection, setTransitionDirection] = React.useState('forward');
  const [navigationHistory, setNavigationHistory] = React.useState([]);
  
  const scrollPositions = React.useRef({
    page1: 0,
    page2: 0,
    page3: 0
  });
  
  const containerRef = React.useRef(null);
  const pageRefs = React.useRef({
    page1: React.createRef(),
    page2: React.createRef(),
    page3: React.createRef()
  });

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config values safely
  const page1Title = config?.page1Title || "Home";
  const page1Content = config?.page1Content || "Welcome to the home page. This system demonstrates sophisticated page transitions with scroll position memory.";
  const page2Title = config?.page2Title || "About";
  const page2Content = config?.page2Content || "This is the about page with its own unique content. Scroll down to see more content.";
  const page3Title = config?.page3Title || "Projects";
  const page3Content = config?.page3Content || "Explore our project portfolio. This page demonstrates scroll position preservation.";
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const navBackgroundColor = config?.navBackgroundColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const secondaryTextColor = config?.secondaryTextColor || "#495057";
  const accentColor = config?.accentColor || "#343A40";
  const activeNavColor = config?.activeNavColor || "#212529";
  
  const titleFontSize = parseInt(config?.titleFontSize) || 48;
  const bodyFontSize = parseInt(config?.bodyFontSize) || 16;
  const navFontSize = parseInt(config?.navFontSize) || 14;
  const fontWeight = config?.fontWeight || "400";
  const titleFontWeight = config?.titleFontWeight || "300";
  
  const transitionStyle = config?.transitionStyle || "slide-horizontal";
  const transitionDuration = parseInt(config?.transitionDuration) || 600;
  const easing = config?.easing || "cubic-bezier(0.22, 1, 0.36, 1)";
  const trackAnalytics = config?.trackAnalytics !== false;
  const showAnalytics = config?.showAnalytics !== false;

  // Save scroll position before navigating
  const saveScrollPosition = () => {
    if (containerRef.current) {
      scrollPositions.current[currentPage] = containerRef.current.scrollTop;
    }
  };

  // Restore scroll position after navigating
  const restoreScrollPosition = (page) => {
    if (containerRef.current) {
      const savedPosition = scrollPositions.current[page] || 0;
      containerRef.current.scrollTop = savedPosition;
    }
  };

  // Track navigation analytics
  const trackNavigation = (fromPage, toPage, timestamp) => {
    if (!trackAnalytics) return;
    
    const event = {
      from: fromPage,
      to: toPage,
      timestamp,
      scrollPosition: scrollPositions.current[fromPage],
      transitionStyle,
      duration: transitionDuration
    };
    
    setNavigationHistory(prev => [...prev, event].slice(-10)); // Keep last 10
  };

  // Handle page navigation
  const navigateTo = (page) => {
    if (page === currentPage || isTransitioning) return;

    const pageOrder = ['page1', 'page2', 'page3'];
    const currentIndex = pageOrder.indexOf(currentPage);
    const targetIndex = pageOrder.indexOf(page);
    const direction = targetIndex > currentIndex ? 'forward' : 'backward';

    // Save current scroll position
    saveScrollPosition();

    // Track navigation
    trackNavigation(currentPage, page, Date.now());

    // Start transition
    setIsTransitioning(true);
    setTransitionDirection(direction);

    // Wait for exit animation, then change page
    setTimeout(() => {
      setCurrentPage(page);
      
      // Restore scroll position after page change
      setTimeout(() => {
        restoreScrollPosition(page);
        setIsTransitioning(false);
      }, 50);
    }, transitionDuration);
  };

  // Get transition styles based on configuration
  const getPageTransitionStyle = (page) => {
    const isActive = page === currentPage;
    const isForward = transitionDirection === 'forward';
    
    if (prefersReducedMotion) {
      return {
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none'
      };
    }

    let transform = 'translate(0, 0)';
    let opacity = 1;

    if (transitionStyle === 'slide-horizontal') {
      if (!isActive) {
        transform = isTransitioning 
          ? (isForward ? 'translateX(-15%)' : 'translateX(15%)')
          : (isForward ? 'translateX(100%)' : 'translateX(-100%)');
        opacity = isTransitioning ? 0 : 0;
      }
    } else if (transitionStyle === 'slide-vertical') {
      if (!isActive) {
        transform = isTransitioning
          ? 'translateY(-10%)'
          : 'translateY(100%)';
        opacity = isTransitioning ? 0 : 0;
      }
    } else if (transitionStyle === 'fade-slide') {
      if (!isActive) {
        transform = isTransitioning
          ? 'translateY(-5%)'
          : 'translateY(10%)';
        opacity = 0;
      }
    }

    return {
      transform,
      opacity,
      pointerEvents: isActive ? 'auto' : 'none'
    };
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '600px',
    backgroundColor,
    color: textColor,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const navStyle = {
    display: 'flex',
    gap: '2rem',
    padding: '1.5rem 2rem',
    backgroundColor: navBackgroundColor,
    borderBottom: `1px solid ${secondaryTextColor}20`,
    position: 'relative',
    zIndex: 10
  };

  const navButtonStyle = (page) => ({
    background: 'none',
    border: 'none',
    fontSize: `${navFontSize}px`,
    fontWeight: currentPage === page ? '500' : fontWeight,
    color: currentPage === page ? activeNavColor : secondaryTextColor,
    cursor: 'pointer',
    padding: '0.5rem 0',
    position: 'relative',
    transition: `color 200ms ease`,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  });

  const navIndicatorStyle = (page) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: accentColor,
    transform: currentPage === page ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'left',
    transition: `transform 300ms ${easing}`
  });

  const contentContainerStyle = {
    position: 'relative',
    flex: 1,
    overflow: 'auto'
  };

  const pageStyle = (page) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100%',
    padding: '3rem 2rem',
    ...getPageTransitionStyle(page),
    transition: prefersReducedMotion ? 'opacity 0ms' : `transform ${transitionDuration}ms ${easing}, opacity ${transitionDuration}ms ${easing}`,
    willChange: prefersReducedMotion ? 'auto' : 'transform, opacity'
  });

  const titleStyle = {
    fontSize: `clamp(${titleFontSize * 0.7}px, 5vw, ${titleFontSize}px)`,
    fontWeight: titleFontWeight,
    marginBottom: '2rem',
    letterSpacing: '-0.02em'
  };

  const bodyStyle = {
    fontSize: `${bodyFontSize}px`,
    fontWeight,
    color: secondaryTextColor,
    lineHeight: 1.8,
    maxWidth: '60ch',
    marginBottom: '2rem'
  };

  const fillerContentStyle = {
    marginTop: '3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  };

  const fillerBlockStyle = {
    height: '200px',
    backgroundColor: navBackgroundColor,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: secondaryTextColor,
    fontSize: '14px'
  };

  const analyticsStyle = {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    backgroundColor: navBackgroundColor,
    padding: '1rem',
    borderRadius: '4px',
    fontSize: '12px',
    maxWidth: '300px',
    maxHeight: '200px',
    overflow: 'auto',
    zIndex: 20,
    border: `1px solid ${secondaryTextColor}20`
  };

  const analyticsItemStyle = {
    padding: '0.5rem 0',
    borderBottom: `1px solid ${secondaryTextColor}10`,
    color: secondaryTextColor
  };

  return (
    <div style={containerStyle} className="page-transition-system">
      {/* Navigation */}
      <nav style={navStyle}>
        <button 
          style={navButtonStyle('page1')}
          onClick={() => navigateTo('page1')}
          disabled={isTransitioning}
        >
          {page1Title}
          <div style={navIndicatorStyle('page1')} />
        </button>
        <button 
          style={navButtonStyle('page2')}
          onClick={() => navigateTo('page2')}
          disabled={isTransitioning}
        >
          {page2Title}
          <div style={navIndicatorStyle('page2')} />
        </button>
        <button 
          style={navButtonStyle('page3')}
          onClick={() => navigateTo('page3')}
          disabled={isTransitioning}
        >
          {page3Title}
          <div style={navIndicatorStyle('page3')} />
        </button>
      </nav>

      {/* Page Content Container */}
      <div ref={containerRef} style={contentContainerStyle}>
        {/* Page 1 */}
        <div style={pageStyle('page1')}>
          <h1 style={titleStyle}>{page1Title}</h1>
          <p style={bodyStyle}>{page1Content}</p>
          
          <div style={fillerContentStyle}>
            <div style={fillerBlockStyle}>Scroll down to see more content</div>
            <div style={fillerBlockStyle}>Your scroll position is saved</div>
            <div style={fillerBlockStyle}>Navigate away and come back</div>
            <div style={fillerBlockStyle}>Position will be restored</div>
          </div>
        </div>

        {/* Page 2 */}
        <div style={pageStyle('page2')}>
          <h1 style={titleStyle}>{page2Title}</h1>
          <p style={bodyStyle}>{page2Content}</p>
          
          <div style={fillerContentStyle}>
            <div style={fillerBlockStyle}>Additional content section</div>
            <div style={fillerBlockStyle}>Each page remembers its scroll</div>
            <div style={fillerBlockStyle}>Smooth transitions preserved</div>
            <div style={fillerBlockStyle}>Analytics tracked automatically</div>
          </div>
        </div>

        {/* Page 3 */}
        <div style={pageStyle('page3')}>
          <h1 style={titleStyle}>{page3Title}</h1>
          <p style={bodyStyle}>{page3Content}</p>
          
          <div style={fillerContentStyle}>
            <div style={fillerBlockStyle}>Project showcase content</div>
            <div style={fillerBlockStyle}>Independent scroll state</div>
            <div style={fillerBlockStyle}>Seamless navigation</div>
            <div style={fillerBlockStyle}>Production-ready pattern</div>
          </div>
        </div>
      </div>

      {/* Analytics Panel */}
      {showAnalytics && navigationHistory.length > 0 && (
        <div style={analyticsStyle}>
          <div style={{ fontWeight: '500', marginBottom: '0.5rem', color: textColor }}>
            Navigation History
          </div>
          {navigationHistory.slice(-5).reverse().map((event, index) => (
            <div key={index} style={analyticsItemStyle}>
              {event.from} → {event.to} 
              <div style={{ fontSize: '10px', marginTop: '0.25rem' }}>
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
