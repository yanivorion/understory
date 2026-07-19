import React from "react";

const MANIFEST = {
  "type": "Shop.HomeGardenBrowser",
  "description": "Home decor category browser with 8 categories and smooth transitions",
  "editorElement": {
    "selector": ".home-garden-browser",
    "displayName": "Home & Garden Browser",
    "archetype": "container",
    "data": {
      "category1Name": { "dataType": "text", "displayName": "Category 1", "defaultValue": "Furniture", "group": "Content" },
      "category2Name": { "dataType": "text", "displayName": "Category 2", "defaultValue": "Lighting", "group": "Content" },
      "category3Name": { "dataType": "text", "displayName": "Category 3", "defaultValue": "Textiles", "group": "Content" },
      "category4Name": { "dataType": "text", "displayName": "Category 4", "defaultValue": "Kitchen", "group": "Content" },
      "category5Name": { "dataType": "text", "displayName": "Category 5", "defaultValue": "Bath", "group": "Content" },
      "category6Name": { "dataType": "text", "displayName": "Category 6", "defaultValue": "Garden", "group": "Content" },
      "category7Name": { "dataType": "text", "displayName": "Category 7", "defaultValue": "Storage", "group": "Content" },
      "category8Name": { "dataType": "text", "displayName": "Category 8", "defaultValue": "Decor", "group": "Content" },
      "layoutStyle": { "dataType": "select", "displayName": "Layout Style", "defaultValue": "masonry", "options": ["grid", "masonry", "list"], "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FAFAF9", "group": "Colors" },
      "cardBackground": { "dataType": "color", "displayName": "Card Background", "defaultValue": "#FFFFFF", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#1C1917", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent Color", "defaultValue": "#44403C", "group": "Colors" },
      "borderColor": { "dataType": "color", "displayName": "Border Color", "defaultValue": "#E7E5E4", "group": "Colors" },
      "titleFontSize": { "dataType": "number", "displayName": "Title Font Size", "defaultValue": 32, "group": "Typography" },
      "categoryFontSize": { "dataType": "number", "displayName": "Category Font Size", "defaultValue": 16, "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "gap": { "dataType": "select", "displayName": "Grid Gap", "defaultValue": "20px", "options": ["16px", "20px", "24px", "32px"], "group": "Layout" },
      "padding": { "dataType": "select", "displayName": "Padding", "defaultValue": "60px", "options": ["40px", "60px", "80px"], "group": "Layout" },
      "cornerRadius": { "dataType": "select", "displayName": "Corner Radius", "defaultValue": "8px", "options": ["4px", "8px", "12px"], "group": "Layout" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  
  const categories = [
    { name: config?.category1Name || "Furniture", desc: "Living & bedroom", icon: "🛋️" },
    { name: config?.category2Name || "Lighting", desc: "Indoor & outdoor", icon: "💡" },
    { name: config?.category3Name || "Textiles", desc: "Bedding & curtains", icon: "🧵" },
    { name: config?.category4Name || "Kitchen", desc: "Cookware & dining", icon: "🍽️" },
    { name: config?.category5Name || "Bath", desc: "Towels & accessories", icon: "🛁" },
    { name: config?.category6Name || "Garden", desc: "Plants & tools", icon: "🌿" },
    { name: config?.category7Name || "Storage", desc: "Organization", icon: "📦" },
    { name: config?.category8Name || "Decor", desc: "Art & accents", icon: "🖼️" }
  ];

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const containerStyle = {
    width: '100%',
    minHeight: '700px',
    backgroundColor: config?.backgroundColor || '#FAFAF9',
    padding: config?.padding || '60px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const titleStyle = {
    fontSize: `${config?.titleFontSize || 32}px`,
    fontWeight: config?.fontWeight || '400',
    color: config?.textColor || '#1C1917',
    marginBottom: '40px',
    letterSpacing: '0.025em'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: config?.gap || '20px',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const getCardStyle = (index) => ({
    backgroundColor: config?.cardBackground || '#FFFFFF',
    border: `1px solid ${config?.borderColor || '#E7E5E4'}`,
    borderRadius: config?.cornerRadius || '8px',
    padding: '32px',
    cursor: 'pointer',
    transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out',
    transform: selectedCategory === index ? 'scale(1.03)' : 'scale(1)',
    boxShadow: selectedCategory === index 
      ? '0 8px 24px rgba(0, 0, 0, 0.1)' 
      : '0 2px 8px rgba(0, 0, 0, 0.05)',
    borderColor: selectedCategory === index ? (config?.accentColor || '#44403C') : (config?.borderColor || '#E7E5E4')
  });

  const iconStyle = {
    fontSize: '40px',
    marginBottom: '16px',
    display: 'block'
  };

  const categoryNameStyle = {
    fontSize: `${config?.categoryFontSize || 16}px`,
    fontWeight: '500',
    color: config?.textColor || '#1C1917',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const descStyle = {
    fontSize: '14px',
    fontWeight: '300',
    color: '#78716C',
    lineHeight: 1.5
  };

  return (
    <div className="home-garden-browser" style={containerStyle}>
      <h2 style={titleStyle}>HOME & GARDEN</h2>
      <div style={gridStyle}>
        {categories.map((category, index) => (
          <div
            key={index}
            style={getCardStyle(index)}
            onClick={() => setSelectedCategory(index)}
            role="button"
            tabIndex={0}
            aria-label={`Browse ${category.name} - ${category.desc}`}
            aria-pressed={selectedCategory === index}
          >
            <span style={iconStyle}>{category.icon}</span>
            <div style={categoryNameStyle}>{category.name}</div>
            <div style={descStyle}>{category.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
