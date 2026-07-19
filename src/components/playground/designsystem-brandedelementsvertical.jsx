import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsVertical",
  "description": "Vertical card layout with rotated text labels inspired by gradient palettes, displaying typography elements",
  "editorElement": {
    "selector": ".branded-elements-vertical",
    "displayName": "Branded Elements Vertical",
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
      "hoverBackgroundColor": {
        "dataType": "color",
        "displayName": "Hover Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#D0D34D",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Base Font Size (px)",
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
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "16px",
        "options": ["8px", "12px", "16px", "20px", "24px"],
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
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const hoverBackgroundColor = config?.hoverBackgroundColor || '#F8F9FA';
  const accentColor = config?.accentColor || '#D0D34D';
  const fontSize = parseInt(config?.fontSize || '14');
  const fontWeight = config?.fontWeight || '400';
  const cornerRadius = config?.cornerRadius || '16px';
  const cardGap = config?.cardGap || '16px';

  // Typography items
  const typographyItems = [
    { id: 'h1', label: 'Heading 1', weight: 'Bold', size: '88', lineHeight: '88', preview: 'Heading 1', displaySize: '48px' },
    { id: 'h2', label: 'Heading 2', weight: 'Bold', size: '64', lineHeight: '72', preview: 'Heading 2', displaySize: '40px' },
    { id: 'h3', label: 'Heading 3', weight: 'Medium', size: '56', lineHeight: '64', preview: 'Heading 3', displaySize: '36px' },
    { id: 'h4', label: 'Heading 4', weight: 'Regular', size: '48', lineHeight: '52', preview: 'Heading 4', displaySize: '32px' },
    { id: 'h5', label: 'Heading 5', weight: 'Regular', size: '32', lineHeight: '40', preview: 'Heading 5', displaySize: '24px' },
    { id: 'h6', label: 'Heading 6', weight: 'Regular', size: '24', lineHeight: '30', preview: 'Heading 6', displaySize: '20px' },
    { id: 'p1', label: 'Paragraph 1', weight: 'Regular', size: '20', lineHeight: '26', preview: 'Paragraph 1', displaySize: '18px' },
    { id: 'p2', label: 'Paragraph 2', weight: 'Regular', size: '16', lineHeight: '20', preview: 'Paragraph 2', displaySize: '15px' },
    { id: 'p3', label: 'Paragraph 3', weight: 'Regular', size: '14', lineHeight: '18', preview: 'Paragraph 3', displaySize: '13px' }
  ];

  const handleItemClick = (itemId) => {
    console.log(`Clicked: ${itemId}`);
  };

  const getWeightValue = (weightName) => {
    const weights = {
      'Bold': '700',
      'Semibold': '600',
      'Medium': '500',
      'Regular': '400',
      'Light': '300'
    };
    return weights[weightName] || '400';
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 2}px`,
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
    fontSize: '11px',
    color: secondaryTextColor,
    cursor: 'help'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: cardGap
  };

  const getCardStyle = (itemId) => ({
    backgroundColor: hoveredItem === itemId ? hoverBackgroundColor : backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: cornerRadius,
    padding: '24px 20px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    transform: hoveredItem === itemId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredItem === itemId 
      ? '0 4px 12px rgba(0, 0, 0, 0.08)' 
      : '0 1px 3px rgba(0, 0, 0, 0.06)',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden'
  });

  const topSpecStyle = {
    fontSize: '11px',
    fontWeight: '500',
    color: hoveredItem ? accentColor : textColor,
    letterSpacing: '0.5px',
    textAlign: 'center',
    transition: 'color 200ms ease-out'
  };

  const verticalLabelStyle = {
    fontSize: `${fontSize + 2}px`,
    fontWeight: '500',
    color: textColor,
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const bottomSpecStyle = {
    fontSize: '11px',
    fontWeight: '500',
    color: secondaryTextColor,
    letterSpacing: '0.5px',
    textAlign: 'center'
  };

  const previewTextStyle = (item) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: item.displaySize,
    fontWeight: getWeightValue(item.weight),
    color: textColor,
    opacity: hoveredItem === item.id ? 1 : 0.15,
    transition: 'opacity 200ms ease-out',
    pointerEvents: 'none',
    whiteSpace: 'nowrap'
  });

  return (
    <div className="branded-elements-vertical" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {panelTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Branded design system elements">i</span>
          )}
        </div>
      </div>

      {/* Typography Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{
          fontSize: `${fontSize}px`,
          fontWeight: '500',
          color: textColor,
          marginBottom: '16px'
        }}>
          Typography
        </h3>

        <div style={gridStyle}>
          {typographyItems.map((item) => (
            <div
              key={item.id}
              style={getCardStyle(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item.id)}
              onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
              onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
            >
              {/* Top Spec - Size/Line Height */}
              <div style={topSpecStyle}>
                {item.size}/{item.lineHeight}px
              </div>

              {/* Vertical Label */}
              <div style={verticalLabelStyle}>
                {item.label}
              </div>

              {/* Preview Text (visible on hover) */}
              <div style={previewTextStyle(item)}>
                {item.preview}
              </div>

              {/* Bottom Spec - Weight */}
              <div style={bottomSpecStyle}>
                {item.weight}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Sections (Buttons, Colors, etc.) could be added here */}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
