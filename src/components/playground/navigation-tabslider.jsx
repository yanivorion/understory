import React from "react";

const MANIFEST = {
  "type": "Navigation.TabSlider",
  "description": "Tabs with animated sliding underline indicator",
  "editorElement": {
    "selector": ".tab-slider",
    "displayName": "Tab Slider",
    "archetype": "container",
    "data": {
      "tabs": {
        "dataType": "text",
        "displayName": "Tab Labels (comma-separated)",
        "defaultValue": "Overview, Features, Pricing, Reviews",
        "group": "Content"
      },
      "defaultTab": {
        "dataType": "select",
        "displayName": "Default Active Tab",
        "defaultValue": "0",
        "options": ["0", "1", "2", "3"],
        "group": "Content"
      },
      "indicatorStyle": {
        "dataType": "select",
        "displayName": "Indicator Style",
        "defaultValue": "underline",
        "options": ["underline", "pill", "full-pill"],
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "300",
        "options": ["200", "300", "400", "500"],
        "group": "Animation"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Gap Between Tabs",
        "defaultValue": "32",
        "options": ["16", "24", "32", "40", "48"],
        "group": "Layout"
      },
      "padding": {
        "dataType": "select",
        "displayName": "Tab Padding",
        "defaultValue": "12",
        "options": ["8", "12", "16", "20"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "tabColor": {
        "dataType": "color",
        "displayName": "Tab Color",
        "defaultValue": "#71717A",
        "group": "Colors"
      },
      "activeTabColor": {
        "dataType": "color",
        "displayName": "Active Tab Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "indicatorColor": {
        "dataType": "color",
        "displayName": "Indicator Color",
        "defaultValue": "#18181B",
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
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontal",
      "contentResizeDirection": "horizontal"
    }
  }
};

function Component({ config = {} }) {
  const tabsContainerRef = React.useRef(null);
  const tabRefs = React.useRef([]);
  const [activeTab, setActiveTab] = React.useState(0);
  const [indicatorStyle, setIndicatorStyle] = React.useState({});

  // Config values
  const tabsString = config?.tabs || "Overview, Features, Pricing, Reviews";
  const tabs = tabsString.split(',').map(tab => tab.trim()).filter(Boolean);
  const defaultTab = parseInt(config?.defaultTab || "0");
  const indicatorStyleType = config?.indicatorStyle || "underline";
  const animationDuration = parseInt(config?.animationDuration || "300");
  const gap = parseInt(config?.gap || "32");
  const padding = parseInt(config?.padding || "12");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const tabColor = config?.tabColor || "#71717A";
  const activeTabColor = config?.activeTabColor || "#18181B";
  const indicatorColor = config?.indicatorColor || "#18181B";
  const fontSize = config?.fontSize || 16;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Initialize default tab
  React.useEffect(() => {
    setActiveTab(Math.min(defaultTab, tabs.length - 1));
  }, [defaultTab, tabs.length]);

  // Update indicator position
  React.useEffect(() => {
    const updateIndicator = () => {
      const activeTabElement = tabRefs.current[activeTab];
      if (!activeTabElement || !tabsContainerRef.current) return;

      const tabRect = activeTabElement.getBoundingClientRect();
      const containerRect = tabsContainerRef.current.getBoundingClientRect();
      const left = tabRect.left - containerRect.left;

      if (indicatorStyleType === 'underline') {
        setIndicatorStyle({
          width: `${tabRect.width}px`,
          left: `${left}px`,
          height: '2px',
          bottom: '0'
        });
      } else if (indicatorStyleType === 'pill') {
        setIndicatorStyle({
          width: `${tabRect.width}px`,
          left: `${left}px`,
          height: '4px',
          bottom: '0',
          borderRadius: '2px'
        });
      } else if (indicatorStyleType === 'full-pill') {
        setIndicatorStyle({
          width: `${tabRect.width + padding * 2}px`,
          left: `${left - padding}px`,
          height: `${tabRect.height + padding * 2}px`,
          top: '-' + padding + 'px',
          borderRadius: '100px'
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab, indicatorStyleType, padding]);

  const containerStyle = {
    position: 'relative',
    backgroundColor: backgroundColor,
    padding: '24px',
    width: '100%'
  };

  const tabsListStyle = {
    position: 'relative',
    display: 'flex',
    gap: `${gap}px`,
    borderBottom: indicatorStyleType !== 'full-pill' ? `1px solid #E4E4E7` : 'none',
    paddingBottom: indicatorStyleType !== 'full-pill' ? '12px' : '0'
  };

  const tabStyle = (index) => ({
    position: 'relative',
    padding: `${padding}px`,
    backgroundColor: 'transparent',
    color: activeTab === index ? activeTabColor : tabColor,
    border: 'none',
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    cursor: 'pointer',
    transition: prefersReducedMotion ? 'none' : `color ${animationDuration}ms ease`,
    outline: 'none',
    whiteSpace: 'nowrap',
    zIndex: 2
  });

  const indicatorBaseStyle = {
    position: 'absolute',
    backgroundColor: indicatorStyleType === 'full-pill' ? `${indicatorColor}15` : indicatorColor,
    transition: prefersReducedMotion 
      ? 'none' 
      : `all ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
    pointerEvents: 'none',
    zIndex: 1,
    ...indicatorStyle
  };

  return (
    <div className="tab-slider" style={containerStyle}>
      <div 
        ref={tabsContainerRef}
        style={tabsListStyle}
        role="tablist"
        aria-label="Navigation tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            style={tabStyle(index)}
            onClick={() => setActiveTab(index)}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
          >
            {tab}
          </button>
        ))}
        
        {/* Animated Indicator */}
        <div style={indicatorBaseStyle} aria-hidden="true" />
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
