import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsMasonry",
  "description": "Masonry/Pinterest-style layout with staggered grid showing all branded elements with varying heights",
  "editorElement": {
    "selector": ".branded-elements-masonry",
    "displayName": "Branded Elements Masonry",
    "archetype": "container",
    "data": {
      "panelTitle": {
        "dataType": "text",
        "displayName": "Panel Title",
        "defaultValue": "Branded elements",
        "group": "Content"
      },
      "showInfoIcon": {
        "dataType": "booleanValue",
        "displayName": "Show Info Icon",
        "defaultValue": true,
        "group": "Content"
      },
      "columnCount": {
        "dataType": "select",
        "displayName": "Column Count",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout",
        "description": "Number of masonry columns"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
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
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Base Font Size (px)",
        "defaultValue": 13,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "12px",
        "options": ["0px", "8px", "12px", "16px"],
        "group": "Layout"
      },
      "cardGap": {
        "dataType": "select",
        "displayName": "Card Gap",
        "defaultValue": "16px",
        "options": ["8px", "12px", "16px", "20px"],
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "vertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [hoveredItem, setHoveredItem] = React.useState(null);

  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Branded elements';
  const showInfoIcon = config?.showInfoIcon !== false;
  const columnCount = parseInt(config?.columnCount || '3');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const cardBackgroundColor = config?.cardBackgroundColor || '#F8F9FA';
  const accentColor = config?.accentColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '13');
  const fontWeight = config?.fontWeight || '400';
  const cornerRadius = config?.cornerRadius || '12px';
  const cardGap = config?.cardGap || '16px';

  // All elements with varying content heights
  const allElements = [
    // Typography - varying heights
    { id: 'h1', category: 'Typography', name: 'Heading 1', specs: '88/88 • Bold', preview: 'Heading 1', size: 'large', height: 'tall' },
    { id: 'h2', category: 'Typography', name: 'Heading 2', specs: '64/72 • Bold', preview: 'Heading 2', size: 'large', height: 'tall' },
    { id: 'h3', category: 'Typography', name: 'Heading 3', specs: '56/64 • Medium', preview: 'Heading 3', size: 'medium', height: 'medium' },
    { id: 'p1', category: 'Typography', name: 'Paragraph 1', specs: '20/26 • Regular', preview: 'This is sample paragraph text for preview purposes.', size: 'small', height: 'medium' },
    { id: 'h4', category: 'Typography', name: 'Heading 4', specs: '48/52 • Regular', preview: 'Heading 4', size: 'medium', height: 'medium' },
    { id: 'p2', category: 'Typography', name: 'Paragraph 2', specs: '16/20 • Regular', preview: 'Sample text', size: 'small', height: 'short' },
    
    // Colors - short height
    { id: 'colors', category: 'Colors', name: 'Color Palette', count: 5, type: 'color-group', height: 'short' },
    
    // Buttons - medium height
    { id: 'btn-primary', category: 'Buttons', name: 'Primary', type: 'button', variant: 'filled', height: 'short' },
    { id: 'btn-secondary', category: 'Buttons', name: 'Secondary', type: 'button', variant: 'outlined', height: 'short' },
    { id: 'btn-tertiary', category: 'Buttons', name: 'Tertiary', type: 'button', variant: 'text', height: 'short' },
    
    // Boxes
    { id: 'box-1', category: 'Boxes', name: 'Box 1', type: 'box', variant: 'filled', height: 'medium' },
    { id: 'box-2', category: 'Boxes', name: 'Box 2', type: 'box', variant: 'outlined', height: 'medium' },
    
    // Lines
    { id: 'line-1', category: 'Lines', name: 'Line 1', type: 'line', thickness: '1px', height: 'short' },
    { id: 'line-2', category: 'Lines', name: 'Line 2', type: 'line', thickness: '3px', height: 'short' }
  ];

  const handleItemClick = (itemId) => {
    console.log(`Clicked: ${itemId}`);
  };

  const getWeightValue = (specs) => {
    if (specs.includes('Bold')) return '700';
    if (specs.includes('Medium')) return '500';
    return '400';
  };

  const containerStyle = {
    backgroundColor,
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight
  };

  const headerStyle = {
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 6}px`,
    fontWeight: '500',
    color: textColor,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const infoIconStyle = {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: `1px solid ${secondaryTextColor}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: secondaryTextColor,
    cursor: 'help'
  };

  const masonryStyle = {
    columnCount: columnCount,
    columnGap: cardGap
  };

  const getCardStyle = (itemId) => ({
    backgroundColor: cardBackgroundColor,
    border: `1px solid ${hoveredItem === itemId ? accentColor : borderColor}`,
    borderRadius: cornerRadius,
    padding: '20px',
    marginBottom: cardGap,
    breakInside: 'avoid',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    transform: hoveredItem === itemId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredItem === itemId
      ? '0 4px 12px rgba(0, 0, 0, 0.08)'
      : '0 1px 3px rgba(0, 0, 0, 0.06)'
  });

  const categoryBadgeStyle = {
    fontSize: '10px',
    fontWeight: '500',
    color: accentColor,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  };

  const itemNameStyle = {
    fontSize: `${fontSize + 1}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '8px'
  };

  const specsStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    marginBottom: '12px'
  };

  const renderElement = (element) => {
    const isTypography = element.category === 'Typography';
    const isColorGroup = element.type === 'color-group';
    const isButton = element.type === 'button';
    const isBox = element.type === 'box';
    const isLine = element.type === 'line';

    return (
      <div
        key={element.id}
        style={getCardStyle(element.id)}
        onMouseEnter={() => setHoveredItem(element.id)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => handleItemClick(element.id)}
        onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
        onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
      >
        <div style={categoryBadgeStyle}>{element.category}</div>
        <div style={itemNameStyle}>{element.name}</div>
        {element.specs && <div style={specsStyle}>{element.specs}</div>}

        {/* Content Preview */}
        {isTypography && (
          <div style={{
            fontSize: element.size === 'large' ? '32px' : element.size === 'medium' ? '24px' : '14px',
            fontWeight: getWeightValue(element.specs),
            color: textColor,
            lineHeight: '1.2',
            marginTop: '12px'
          }}>
            {element.preview}
          </div>
        )}

        {isColorGroup && (
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px'
          }}>
            {['#212529', '#495057', '#ADB5BD', '#E9ECEF', '#F8F9FA'].map((color, i) => (
              <div key={i} style={{
                width: '32px',
                height: '32px',
                backgroundColor: color,
                borderRadius: '6px',
                border: `1px solid ${borderColor}`
              }} />
            ))}
          </div>
        )}

        {isButton && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: `${fontSize}px`,
            fontWeight: '500',
            backgroundColor: element.variant === 'filled' ? textColor : 'transparent',
            color: element.variant === 'filled' ? backgroundColor : textColor,
            border: element.variant === 'outlined' ? `2px solid ${textColor}` : 'none',
            textDecoration: element.variant === 'text' ? 'underline' : 'none',
            marginTop: '12px'
          }}>
            Button
          </div>
        )}

        {isBox && (
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: element.variant === 'filled' ? backgroundColor : 'transparent',
            border: element.variant === 'outlined' ? `2px solid ${borderColor}` : `1px solid ${borderColor}`,
            borderRadius: cornerRadius,
            marginTop: '12px'
          }} />
        )}

        {isLine && (
          <div style={{
            width: '100%',
            height: element.thickness,
            backgroundColor: textColor,
            borderRadius: '1px',
            marginTop: '12px'
          }} />
        )}
      </div>
    );
  };

  return (
    <div className="branded-elements-masonry" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {panelTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Branded design system elements">i</span>
          )}
        </div>
      </div>

      {/* Masonry Grid */}
      <div style={masonryStyle}>
        {allElements.map((element) => renderElement(element))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
