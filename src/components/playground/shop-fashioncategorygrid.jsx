import React from "react";

const MANIFEST = {
  "type": "Shop.FashionCategoryGrid",
  "description": "Elegant fashion store category grid with 8 categories featuring hover effects and smooth transitions",
  "editorElement": {
    "selector": ".fashion-category-grid",
    "displayName": "Fashion Category Grid",
    "archetype": "container",
    "data": {
      "category1Name": {
        "dataType": "text",
        "displayName": "Category 1 Name",
        "defaultValue": "Women's Wear",
        "group": "Content",
        "description": "First category name"
      },
      "category2Name": {
        "dataType": "text",
        "displayName": "Category 2 Name",
        "defaultValue": "Men's Wear",
        "group": "Content"
      },
      "category3Name": {
        "dataType": "text",
        "displayName": "Category 3 Name",
        "defaultValue": "Accessories",
        "group": "Content"
      },
      "category4Name": {
        "dataType": "text",
        "displayName": "Category 4 Name",
        "defaultValue": "Footwear",
        "group": "Content"
      },
      "category5Name": {
        "dataType": "text",
        "displayName": "Category 5 Name",
        "defaultValue": "Bags",
        "group": "Content"
      },
      "category6Name": {
        "dataType": "text",
        "displayName": "Category 6 Name",
        "defaultValue": "Jewelry",
        "group": "Content"
      },
      "category7Name": {
        "dataType": "text",
        "displayName": "Category 7 Name",
        "defaultValue": "Watches",
        "group": "Content"
      },
      "category8Name": {
        "dataType": "text",
        "displayName": "Category 8 Name",
        "defaultValue": "Seasonal",
        "group": "Content"
      },
      "showProductCount": {
        "dataType": "booleanValue",
        "displayName": "Show Product Count",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
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
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "hoverOverlayColor": {
        "dataType": "color",
        "displayName": "Hover Overlay Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 32,
        "group": "Typography"
      },
      "categoryFontSize": {
        "dataType": "number",
        "displayName": "Category Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "0.025em",
        "options": ["0em", "0.025em", "0.05em", "0.075em", "0.1em"],
        "group": "Typography"
      },
      "gridColumns": {
        "dataType": "select",
        "displayName": "Grid Columns (Desktop)",
        "defaultValue": "4",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "cardHeight": {
        "dataType": "select",
        "displayName": "Card Height",
        "defaultValue": "280px",
        "options": ["240px", "280px", "320px", "360px"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Grid Gap",
        "defaultValue": "20px",
        "options": ["16px", "20px", "24px", "32px"],
        "group": "Layout"
      },
      "padding": {
        "dataType": "select",
        "displayName": "Container Padding",
        "defaultValue": "60px",
        "options": ["40px", "60px", "80px", "100px"],
        "group": "Layout"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "8px", "12px"],
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const categories = [
    { 
      name: config?.category1Name || "Women's Wear", 
      count: 234,
      icon: "👗"
    },
    { 
      name: config?.category2Name || "Men's Wear", 
      count: 189,
      icon: "👔"
    },
    { 
      name: config?.category3Name || "Accessories", 
      count: 156,
      icon: "👜"
    },
    { 
      name: config?.category4Name || "Footwear", 
      count: 143,
      icon: "👞"
    },
    { 
      name: config?.category5Name || "Bags", 
      count: 98,
      icon: "💼"
    },
    { 
      name: config?.category6Name || "Jewelry", 
      count: 112,
      icon: "💎"
    },
    { 
      name: config?.category7Name || "Watches", 
      count: 87,
      icon: "⌚"
    },
    { 
      name: config?.category8Name || "Seasonal", 
      count: 76,
      icon: "🌸"
    }
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
    fontSize: `${config?.titleFontSize || 32}px`,
    fontWeight: config?.fontWeight || '400',
    color: config?.textColor || '#212529',
    letterSpacing: config?.letterSpacing || '0.025em',
    textAlign: 'center',
    marginBottom: '48px',
    textTransform: 'uppercase'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))`,
    gap: config?.gap || '20px',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const getCardStyle = (index) => ({
    position: 'relative',
    height: config?.cardHeight || '280px',
    backgroundColor: config?.cardBackground || '#F8F9FA',
    border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
    borderRadius: config?.cornerRadius || '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: prefersReducedMotion ? 'none' : 'transform 250ms ease-out, box-shadow 250ms ease-out',
    transform: hoveredIndex === index ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: hoveredIndex === index 
      ? '0 8px 24px rgba(0, 0, 0, 0.12)' 
      : '0 2px 8px rgba(0, 0, 0, 0.06)'
  });

  const categoryContentStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    zIndex: 2
  };

  const categoryNameStyle = {
    fontSize: `${config?.categoryFontSize || 16}px`,
    fontWeight: config?.fontWeight || '400',
    color: config?.textColor || '#212529',
    letterSpacing: config?.letterSpacing || '0.025em',
    marginBottom: '4px',
    textTransform: 'uppercase'
  };

  const productCountStyle = {
    fontSize: '14px',
    fontWeight: '300',
    color: config?.secondaryTextColor || '#6C757D',
    letterSpacing: '0.025em'
  };

  const iconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '64px',
    opacity: 0.15,
    pointerEvents: 'none'
  };

  const hoverOverlayStyle = (index) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: config?.hoverOverlayColor || '#212529',
    opacity: hoveredIndex === index ? 0.05 : 0,
    transition: prefersReducedMotion ? 'none' : 'opacity 250ms ease-out',
    pointerEvents: 'none'
  });

  return (
    <div className="fashion-category-grid" style={containerStyle}>
      <h2 style={titleStyle}>Shop by Category</h2>
      <div style={gridStyle}>
        {categories.map((category, index) => (
          <div
            key={index}
            style={getCardStyle(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="button"
            tabIndex={0}
            aria-label={`Browse ${category.name} category with ${category.count} products`}
          >
            <div style={iconStyle}>{category.icon}</div>
            <div style={hoverOverlayStyle(index)} />
            <div style={categoryContentStyle}>
              <div style={categoryNameStyle}>{category.name}</div>
              {(config?.showProductCount !== false) && (
                <div style={productCountStyle}>{category.count} Products</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
