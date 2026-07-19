import React from "react";

const MANIFEST = {
  "type": "Shop.TechCategoryShowcase",
  "description": "Modern tech store category showcase with 8 sections using contemporary card design",
  "editorElement": {
    "selector": ".tech-category-showcase",
    "displayName": "Tech Category Showcase",
    "archetype": "container",
    "data": {
      "category1Name": { "dataType": "text", "displayName": "Category 1", "defaultValue": "Smartphones", "group": "Content" },
      "category2Name": { "dataType": "text", "displayName": "Category 2", "defaultValue": "Laptops", "group": "Content" },
      "category3Name": { "dataType": "text", "displayName": "Category 3", "defaultValue": "Audio", "group": "Content" },
      "category4Name": { "dataType": "text", "displayName": "Category 4", "defaultValue": "Gaming", "group": "Content" },
      "category5Name": { "dataType": "text", "displayName": "Category 5", "defaultValue": "Smart Home", "group": "Content" },
      "category6Name": { "dataType": "text", "displayName": "Category 6", "defaultValue": "Cameras", "group": "Content" },
      "category7Name": { "dataType": "text", "displayName": "Category 7", "defaultValue": "Wearables", "group": "Content" },
      "category8Name": { "dataType": "text", "displayName": "Category 8", "defaultValue": "Accessories", "group": "Content" },
      "showIcons": { "dataType": "booleanValue", "displayName": "Show Category Icons", "defaultValue": true, "group": "Content" },
      "showArrow": { "dataType": "booleanValue", "displayName": "Show Explore Arrow", "defaultValue": true, "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background Color", "defaultValue": "#FFFFFF", "group": "Colors" },
      "cardBackground": { "dataType": "color", "displayName": "Card Background", "defaultValue": "#F8F9FA", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#212529", "group": "Colors" },
      "iconColor": { "dataType": "color", "displayName": "Icon Color", "defaultValue": "#495057", "group": "Colors" },
      "borderColor": { "dataType": "color", "displayName": "Border Color", "defaultValue": "#E9ECEF", "group": "Colors" },
      "arrowColor": { "dataType": "color", "displayName": "Arrow Color", "defaultValue": "#6C757D", "group": "Colors" },
      "titleFontSize": { "dataType": "number", "displayName": "Title Font Size", "defaultValue": 36, "group": "Typography" },
      "categoryFontSize": { "dataType": "number", "displayName": "Category Font Size", "defaultValue": 18, "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "gridColumns": { "dataType": "select", "displayName": "Grid Columns", "defaultValue": "4", "options": ["2", "3", "4"], "group": "Layout" },
      "cardHeight": { "dataType": "select", "displayName": "Card Height", "defaultValue": "200px", "options": ["160px", "200px", "240px"], "group": "Layout" },
      "gap": { "dataType": "select", "displayName": "Grid Gap", "defaultValue": "24px", "options": ["16px", "20px", "24px", "32px"], "group": "Layout" },
      "padding": { "dataType": "select", "displayName": "Padding", "defaultValue": "60px", "options": ["40px", "60px", "80px"], "group": "Layout" },
      "cornerRadius": { "dataType": "select", "displayName": "Corner Radius", "defaultValue": "8px", "options": ["4px", "8px", "12px"], "group": "Layout" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
  const categories = [
    { name: config?.category1Name || "Smartphones", icon: "📱" },
    { name: config?.category2Name || "Laptops", icon: "💻" },
    { name: config?.category3Name || "Audio", icon: "🎧" },
    { name: config?.category4Name || "Gaming", icon: "🎮" },
    { name: config?.category5Name || "Smart Home", icon: "🏠" },
    { name: config?.category6Name || "Cameras", icon: "📷" },
    { name: config?.category7Name || "Wearables", icon: "⌚" },
    { name: config?.category8Name || "Accessories", icon: "🔌" }
  ];
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const containerStyle = {
    width: '100%',
    minHeight: '600px',
    backgroundColor: config?.backgroundColor || '#FFFFFF',
    padding: config?.padding || '60px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const titleStyle = {
    fontSize: `${config?.titleFontSize || 36}px`,
    fontWeight: config?.fontWeight || '400',
    color: config?.textColor || '#212529',
    textAlign: 'center',
    marginBottom: '48px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
    gap: config?.gap || '24px',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const getCardStyle = (index) => ({
    position: 'relative',
    height: config?.cardHeight || '200px',
    backgroundColor: config?.cardBackground || '#F8F9FA',
    border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
    borderRadius: config?.cornerRadius || '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: prefersReducedMotion ? 'none' : 'all 250ms ease-out',
    transform: hoveredIndex === index ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
    boxShadow: hoveredIndex === index 
      ? '0 12px 32px rgba(0, 0, 0, 0.12)' 
      : '0 2px 8px rgba(0, 0, 0, 0.06)'
  });

  const iconStyle = {
    fontSize: '48px',
    marginBottom: '16px',
    transition: prefersReducedMotion ? 'none' : 'transform 250ms ease-out'
  };

  const categoryNameStyle = {
    fontSize: `${config?.categoryFontSize || 18}px`,
    fontWeight: config?.fontWeight || '400',
    color: config?.textColor || '#212529',
    textAlign: 'center'
  };

  const arrowStyle = (index) => ({
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    color: config?.arrowColor || '#6C757D',
    fontSize: '20px',
    opacity: hoveredIndex === index ? 1 : 0,
    transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(-8px)',
    transition: prefersReducedMotion ? 'none' : 'all 250ms ease-out'
  });

  return (
    <div className="tech-category-showcase" style={containerStyle}>
      <h2 style={titleStyle}>Browse Categories</h2>
      <div style={gridStyle}>
        {categories.map((category, index) => (
          <div
            key={index}
            style={getCardStyle(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="button"
            tabIndex={0}
            aria-label={`Browse ${category.name}`}
          >
            {(config?.showIcons !== false) && <div style={iconStyle}>{category.icon}</div>}
            <div style={categoryNameStyle}>{category.name}</div>
            {(config?.showArrow !== false) && <div style={arrowStyle(index)}>→</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
