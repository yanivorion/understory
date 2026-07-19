import React from "react";

const MANIFEST = {
  "type": "Shop.BeautyLuxuryMenu",
  "description": "Luxury beauty store category menu with elegant animations",
  "editorElement": {
    "selector": ".beauty-luxury-menu",
    "displayName": "Beauty Luxury Menu",
    "archetype": "container",
    "data": {
      "category1": { "dataType": "text", "displayName": "Category 1", "defaultValue": "Skincare", "group": "Content" },
      "category2": { "dataType": "text", "displayName": "Category 2", "defaultValue": "Makeup", "group": "Content" },
      "category3": { "dataType": "text", "displayName": "Category 3", "defaultValue": "Fragrance", "group": "Content" },
      "category4": { "dataType": "text", "displayName": "Category 4", "defaultValue": "Haircare", "group": "Content" },
      "category5": { "dataType": "text", "displayName": "Category 5", "defaultValue": "Tools", "group": "Content" },
      "category6": { "dataType": "text", "displayName": "Category 6", "defaultValue": "Bath & Body", "group": "Content" },
      "category7": { "dataType": "text", "displayName": "Category 7", "defaultValue": "Men's Grooming", "group": "Content" },
      "category8": { "dataType": "text", "displayName": "Category 8", "defaultValue": "Gift Sets", "group": "Content" },
      "showNumbers": { "dataType": "booleanValue", "displayName": "Show Numbers", "defaultValue": true, "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FAFAF9", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#1C1917", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent Color", "defaultValue": "#44403C", "group": "Colors" },
      "hoverColor": { "dataType": "color", "displayName": "Hover Color", "defaultValue": "#292524", "group": "Colors" },
      "borderColor": { "dataType": "color", "displayName": "Border Color", "defaultValue": "#E7E5E4", "group": "Colors" },
      "titleFontSize": { "dataType": "number", "displayName": "Title Font Size", "defaultValue": 40, "group": "Typography" },
      "categoryFontSize": { "dataType": "number", "displayName": "Category Font Size", "defaultValue": 20, "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Font Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "letterSpacing": { "dataType": "select", "displayName": "Letter Spacing", "defaultValue": "0.1em", "options": ["0em", "0.05em", "0.075em", "0.1em", "0.15em"], "group": "Typography" },
      "padding": { "dataType": "select", "displayName": "Padding", "defaultValue": "80px", "options": ["60px", "80px", "100px"], "group": "Layout" },
      "itemSpacing": { "dataType": "select", "displayName": "Item Spacing", "defaultValue": "24px", "options": ["16px", "20px", "24px", "32px"], "group": "Layout" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
  const categories = [
    config?.category1 || "Skincare",
    config?.category2 || "Makeup",
    config?.category3 || "Fragrance",
    config?.category4 || "Haircare",
    config?.category5 || "Tools",
    config?.category6 || "Bath & Body",
    config?.category7 || "Men's Grooming",
    config?.category8 || "Gift Sets"
  ];

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const containerStyle = {
    width: '100%',
    minHeight: '800px',
    backgroundColor: config?.backgroundColor || '#FAFAF9',
    padding: config?.padding || '80px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const titleStyle = {
    fontSize: `${config?.titleFontSize || 40}px`,
    fontWeight: config?.fontWeight || '300',
    color: config?.textColor || '#1C1917',
    letterSpacing: config?.letterSpacing || '0.1em',
    textAlign: 'center',
    marginBottom: '60px',
    textTransform: 'uppercase'
  };

  const menuContainerStyle = {
    width: '100%',
    maxWidth: '800px'
  };

  const getItemStyle = (index) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: config?.itemSpacing || '24px',
    borderBottom: `1px solid ${config?.borderColor || '#E7E5E4'}`,
    cursor: 'pointer',
    transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out',
    backgroundColor: hoveredIndex === index ? '#F5F5F4' : 'transparent'
  });

  const categoryTextStyle = (index) => ({
    fontSize: `${config?.categoryFontSize || 20}px`,
    fontWeight: config?.fontWeight || '300',
    color: hoveredIndex === index ? (config?.hoverColor || '#292524') : (config?.textColor || '#1C1917'),
    letterSpacing: config?.letterSpacing || '0.1em',
    textTransform: 'uppercase',
    transition: prefersReducedMotion ? 'none' : 'color 300ms ease-out, transform 300ms ease-out',
    transform: hoveredIndex === index ? 'translateX(8px)' : 'translateX(0)'
  });

  const numberStyle = (index) => ({
    fontSize: '14px',
    fontWeight: '300',
    color: config?.accentColor || '#44403C',
    letterSpacing: '0.1em',
    opacity: hoveredIndex === index ? 1 : 0.6,
    transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease-out'
  });

  const arrowStyle = (index) => ({
    fontSize: '20px',
    color: config?.accentColor || '#44403C',
    opacity: hoveredIndex === index ? 1 : 0,
    transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(-12px)',
    transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out'
  });

  return (
    <div className="beauty-luxury-menu" style={containerStyle}>
      <h1 style={titleStyle}>Beauty Collection</h1>
      <div style={menuContainerStyle}>
        {categories.map((category, index) => (
          <div
            key={index}
            style={getItemStyle(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="button"
            tabIndex={0}
            aria-label={`Browse ${category}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {(config?.showNumbers !== false) && (
                <span style={numberStyle(index)}>{String(index + 1).padStart(2, '0')}</span>
              )}
              <span style={categoryTextStyle(index)}>{category}</span>
            </div>
            <span style={arrowStyle(index)}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
