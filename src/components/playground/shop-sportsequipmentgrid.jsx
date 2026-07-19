import React from "react";

const MANIFEST = {
  "type": "Shop.SportsEquipmentGrid",
  "description": "Sports equipment category grid with dynamic hover effects",
  "editorElement": {
    "selector": ".sports-equipment-grid",
    "displayName": "Sports Equipment Grid",
    "archetype": "container",
    "data": {
      "cat1": { "dataType": "text", "displayName": "Category 1", "defaultValue": "Running", "group": "Content" },
      "cat2": { "dataType": "text", "displayName": "Category 2", "defaultValue": "Gym", "group": "Content" },
      "cat3": { "dataType": "text", "displayName": "Category 3", "defaultValue": "Cycling", "group": "Content" },
      "cat4": { "dataType": "text", "displayName": "Category 4", "defaultValue": "Swimming", "group": "Content" },
      "cat5": { "dataType": "text", "displayName": "Category 5", "defaultValue": "Team Sports", "group": "Content" },
      "cat6": { "dataType": "text", "displayName": "Category 6", "defaultValue": "Outdoor", "group": "Content" },
      "cat7": { "dataType": "text", "displayName": "Category 7", "defaultValue": "Yoga", "group": "Content" },
      "cat8": { "dataType": "text", "displayName": "Category 8", "defaultValue": "Nutrition", "group": "Content" },
      "bgColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FFFFFF", "group": "Colors" },
      "cardBg": { "dataType": "color", "displayName": "Card Background", "defaultValue": "#F1F3F5", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#212529", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent Color", "defaultValue": "#495057", "group": "Colors" },
      "borderColor": { "dataType": "color", "displayName": "Border", "defaultValue": "#DEE2E6", "group": "Colors" },
      "titleSize": { "dataType": "number", "displayName": "Title Size", "defaultValue": 36, "group": "Typography" },
      "catSize": { "dataType": "number", "displayName": "Category Size", "defaultValue": 18, "group": "Typography" },
      "weight": { "dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "gap": { "dataType": "select", "displayName": "Gap", "defaultValue": "24px", "options": ["16px", "20px", "24px", "32px"], "group": "Layout" },
      "padding": { "dataType": "select", "displayName": "Padding", "defaultValue": "60px", "options": ["40px", "60px", "80px"], "group": "Layout" },
      "radius": { "dataType": "select", "displayName": "Radius", "defaultValue": "12px", "options": ["4px", "8px", "12px"], "group": "Layout" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const [activeIndex, setActiveIndex] = React.useState(null);
  
  const categories = [
    { name: config?.cat1 || "Running", icon: "🏃", color: "#FF6B6B" },
    { name: config?.cat2 || "Gym", icon: "🏋️", color: "#4ECDC4" },
    { name: config?.cat3 || "Cycling", icon: "🚴", color: "#FFE66D" },
    { name: config?.cat4 || "Swimming", icon: "🏊", color: "#95E1D3" },
    { name: config?.cat5 || "Team Sports", icon: "⚽", color: "#F38181" },
    { name: config?.cat6 || "Outdoor", icon: "⛰️", color: "#AA96DA" },
    { name: config?.cat7 || "Yoga", icon: "🧘", color: "#FCBAD3" },
    { name: config?.cat8 || "Nutrition", icon: "🥗", color: "#A8D8EA" }
  ];

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const containerStyle = {
    width: '100%',
    minHeight: '700px',
    backgroundColor: config?.bgColor || '#FFFFFF',
    padding: config?.padding || '60px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const titleStyle = {
    fontSize: `${config?.titleSize || 36}px`,
    fontWeight: config?.weight || '400',
    color: config?.textColor || '#212529',
    textAlign: 'center',
    marginBottom: '48px',
    textTransform: 'uppercase',
    letterSpacing: '0.025em'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: config?.gap || '24px',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const getCardStyle = (index) => ({
    position: 'relative',
    height: '220px',
    backgroundColor: config?.cardBg || '#F1F3F5',
    border: `2px solid ${config?.borderColor || '#DEE2E6'}`,
    borderRadius: config?.radius || '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: prefersReducedMotion ? 'none' : 'all 250ms ease-out',
    transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
    borderColor: activeIndex === index ? (config?.accentColor || '#495057') : (config?.borderColor || '#DEE2E6')
  });

  const iconStyle = (index) => ({
    fontSize: '56px',
    marginBottom: '12px',
    transition: prefersReducedMotion ? 'none' : 'transform 250ms ease-out',
    transform: activeIndex === index ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)'
  });

  const categoryNameStyle = {
    fontSize: `${config?.catSize || 18}px`,
    fontWeight: config?.weight || '400',
    color: config?.textColor || '#212529',
    textAlign: 'center'
  };

  const accentBarStyle = (index) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: config?.accentColor || '#495057',
    transform: activeIndex === index ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'left',
    transition: prefersReducedMotion ? 'none' : 'transform 300ms ease-out'
  });

  return (
    <div className="sports-equipment-grid" style={containerStyle}>
      <h2 style={titleStyle}>Shop by Sport</h2>
      <div style={gridStyle}>
        {categories.map((cat, index) => (
          <div
            key={index}
            style={getCardStyle(index)}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            role="button"
            tabIndex={0}
            aria-label={`Browse ${cat.name}`}
          >
            <div style={iconStyle(index)}>{cat.icon}</div>
            <div style={categoryNameStyle}>{cat.name}</div>
            <div style={accentBarStyle(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
