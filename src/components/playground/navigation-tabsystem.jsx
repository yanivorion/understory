import React from "react";

const MANIFEST = {
  "type": "Navigation.TabSystem",
  "description": "Sophisticated tab navigation with animated underline, smooth content transitions, and keyboard accessibility",
  "editorElement": {
    "selector": ".tab-system",
    "displayName": "Tab System",
    "archetype": "container",
    "data": {
      "tabs": {
        "dataType": "text",
        "displayName": "Tab Labels (comma-separated)",
        "defaultValue": "Overview,Features,Specifications,Reviews,Support",
        "group": "Content"
      },
      "tabContents": {
        "dataType": "text",
        "displayName": "Tab Contents (separate with |||)",
        "defaultValue": "Get a comprehensive overview of our premium product line, designed with attention to detail and user experience at its core.|||Explore advanced features including real-time synchronization, intelligent automation, and seamless integration capabilities.|||Review detailed technical specifications, performance metrics, and compatibility information for informed decision-making.|||Read authentic customer reviews and testimonials from users worldwide who have transformed their workflow.|||Access comprehensive support resources, documentation, and connect with our expert team for personalized assistance.",
        "group": "Content",
        "description": "Separate each tab's content with |||"
      },
      "defaultTab": {
        "dataType": "select",
        "displayName": "Default Active Tab",
        "defaultValue": "0",
        "options": ["0", "1", "2", "3", "4"],
        "group": "Content",
        "description": "Which tab is active on load (0-indexed)"
      },
      "tabLayout": {
        "dataType": "select",
        "displayName": "Tab Layout",
        "defaultValue": "horizontal",
        "options": ["horizontal", "vertical"],
        "group": "Layout"
      },
      "contentAlignment": {
        "dataType": "select",
        "displayName": "Content Alignment",
        "defaultValue": "left",
        "options": ["left", "center"],
        "group": "Layout"
      },
      "maxWidth": {
        "dataType": "select",
        "displayName": "Container Max Width",
        "defaultValue": "1000px",
        "options": ["800px", "900px", "1000px", "1100px", "1200px"],
        "group": "Layout"
      },
      "transitionStyle": {
        "dataType": "select",
        "displayName": "Content Transition",
        "defaultValue": "slideLeft",
        "options": ["fade", "slideLeft", "slideUp", "scale"],
        "group": "Animation",
        "description": "How content appears when switching tabs"
      },
      "transitionDuration": {
        "dataType": "select",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
        "group": "Animation"
      },
      "tabFontSize": {
        "dataType": "number",
        "displayName": "Tab Font Size (px)",
        "defaultValue": 15,
        "group": "Typography"
      },
      "contentFontSize": {
        "dataType": "number",
        "displayName": "Content Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Tab Font Weight",
        "defaultValue": "500",
        "options": ["400", "500"],
        "group": "Typography"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "tabColor": {
        "dataType": "color",
        "displayName": "Inactive Tab Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "activeTabColor": {
        "dataType": "color",
        "displayName": "Active Tab Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "tabHoverColor": {
        "dataType": "color",
        "displayName": "Tab Hover Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "underlineColor": {
        "dataType": "color",
        "displayName": "Active Underline Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "contentTextColor": {
        "dataType": "color",
        "displayName": "Content Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "contentBackground": {
        "dataType": "color",
        "displayName": "Content Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const tabsText = config?.tabs || "Overview,Features,Specifications,Reviews,Support";
  const contentsText = config?.tabContents || "Get a comprehensive overview of our premium product line, designed with attention to detail and user experience at its core.|||Explore advanced features including real-time synchronization, intelligent automation, and seamless integration capabilities.|||Review detailed technical specifications, performance metrics, and compatibility information for informed decision-making.|||Read authentic customer reviews and testimonials from users worldwide who have transformed their workflow.|||Access comprehensive support resources, documentation, and connect with our expert team for personalized assistance.";
  const defaultTab = parseInt(config?.defaultTab || "0");
  const tabLayout = config?.tabLayout || "horizontal";
  const contentAlignment = config?.contentAlignment || "left";
  const maxWidth = config?.maxWidth || "1000px";
  const transitionStyle = config?.transitionStyle || "slideLeft";
  const transitionDuration = parseInt(config?.transitionDuration || "400");
  const tabFontSize = parseInt(config?.tabFontSize || "15");
  const contentFontSize = parseInt(config?.contentFontSize || "16");
  const fontWeight = config?.fontWeight || "500";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const tabColor = config?.tabColor || "#6C757D";
  const activeTabColor = config?.activeTabColor || "#212529";
  const tabHoverColor = config?.tabHoverColor || "#495057";
  const underlineColor = config?.underlineColor || "#212529";
  const borderColor = config?.borderColor || "#E9ECEF";
  const contentTextColor = config?.contentTextColor || "#495057";
  const contentBackground = config?.contentBackground || "#F8F9FA";

  const tabs = tabsText.split(',').map(t => t.trim());
  const contents = contentsText.split('|||').map(c => c.trim());

  const [activeTab, setActiveTab] = React.useState(defaultTab);
  const [underlineStyle, setUnderlineStyle] = React.useState({});
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const tabRefs = React.useRef([]);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  React.useEffect(() => {
    updateUnderline();
  }, [activeTab, tabLayout]);

  React.useEffect(() => {
    const handleResize = () => updateUnderline();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const updateUnderline = () => {
    const activeTabElement = tabRefs.current[activeTab];
    if (!activeTabElement) return;

    const rect = activeTabElement.getBoundingClientRect();
    const parentRect = activeTabElement.parentElement.getBoundingClientRect();

    if (tabLayout === 'horizontal') {
      setUnderlineStyle({
        width: `${rect.width}px`,
        left: `${rect.left - parentRect.left}px`,
        height: '2px',
        bottom: 0
      });
    } else {
      setUnderlineStyle({
        height: `${rect.height}px`,
        top: `${rect.top - parentRect.top}px`,
        width: '2px',
        left: 0
      });
    }
  };

  const handleTabClick = (index) => {
    if (index === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveTab(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabClick(index);
    } else if (e.key === 'ArrowRight' && tabLayout === 'horizontal') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      tabRefs.current[nextIndex]?.focus();
      handleTabClick(nextIndex);
    } else if (e.key === 'ArrowLeft' && tabLayout === 'horizontal') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      tabRefs.current[prevIndex]?.focus();
      handleTabClick(prevIndex);
    } else if (e.key === 'ArrowDown' && tabLayout === 'vertical') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      tabRefs.current[nextIndex]?.focus();
      handleTabClick(nextIndex);
    } else if (e.key === 'ArrowUp' && tabLayout === 'vertical') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      tabRefs.current[prevIndex]?.focus();
      handleTabClick(prevIndex);
    }
  };

  const getContentTransitionStyle = () => {
    const duration = prefersReducedMotion ? 0 : transitionDuration;

    const styles = {
      fade: {
        opacity: isTransitioning ? 0 : 1,
        transition: `opacity ${duration}ms ease-out`
      },
      slideLeft: {
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'translateX(-15px)' : 'translateX(0)',
        transition: `all ${duration}ms ease-out`
      },
      slideUp: {
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
        transition: `all ${duration}ms ease-out`
      },
      scale: {
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
        transition: `all ${duration}ms ease-out`
      }
    };

    return styles[transitionStyle] || styles.slideLeft;
  };

  return (
    <div className="tab-system" style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor,
      padding: '4rem 1.5rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth,
        margin: '0 auto',
        display: 'flex',
        flexDirection: tabLayout === 'vertical' ? 'row' : 'column',
        gap: tabLayout === 'vertical' ? '2rem' : '0'
      }}>
        {/* Tab Navigation */}
        <div
          role="tablist"
          aria-label="Content tabs"
          style={{
            display: 'flex',
            flexDirection: tabLayout === 'vertical' ? 'column' : 'row',
            gap: tabLayout === 'vertical' ? '0.5rem' : '2rem',
            position: 'relative',
            borderBottom: tabLayout === 'horizontal' ? `1px solid ${borderColor}` : 'none',
            borderRight: tabLayout === 'vertical' ? `1px solid ${borderColor}` : 'none',
            paddingRight: tabLayout === 'vertical' ? '2rem' : '0',
            minWidth: tabLayout === 'vertical' ? '200px' : 'auto'
          }}
        >
          {tabs.map((tab, index) => {
            const isActive = index === activeTab;

            return (
              <button
                key={index}
                ref={el => tabRefs.current[index] = el}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${index}`}
                id={`tab-${index}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{
                  padding: tabLayout === 'horizontal' ? '1rem 0' : '0.75rem 1rem',
                  fontSize: `${tabFontSize}px`,
                  fontWeight: isActive ? fontWeight : '400',
                  color: isActive ? activeTabColor : tabColor,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 200ms ease-out',
                  fontFamily: 'inherit',
                  textAlign: tabLayout === 'vertical' ? 'left' : 'center',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = tabHoverColor;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = tabColor;
                }}
              >
                {tab}
              </button>
            );
          })}

          {/* Animated Underline */}
          <div style={{
            position: 'absolute',
            backgroundColor: underlineColor,
            transition: prefersReducedMotion ? 'none' : 'all 250ms ease-out',
            ...underlineStyle
          }} />
        </div>

        {/* Tab Content */}
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          style={{
            flex: 1,
            padding: tabLayout === 'horizontal' ? '2rem 0' : '0',
            ...getContentTransitionStyle()
          }}
        >
          <div style={{
            backgroundColor: contentBackground,
            borderRadius: '8px',
            padding: '2.5rem',
            border: `1px solid ${borderColor}`,
            overflow: 'clip'
          }}>
            <p style={{
              fontSize: `${contentFontSize}px`,
              lineHeight: 1.7,
              color: contentTextColor,
              margin: 0,
              textAlign: contentAlignment,
              fontWeight: '400'
            }}>
              {contents[activeTab] || `Content for ${tabs[activeTab]}`}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tab-system > div {
            flex-direction: column !important;
          }
          .tab-system [role="tablist"] {
            flex-direction: row !important;
            overflow-x: auto;
            border-right: none !important;
            border-bottom: 1px solid ${borderColor} !important;
            padding-right: 0 !important;
            min-width: auto !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tab-system * {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Component;