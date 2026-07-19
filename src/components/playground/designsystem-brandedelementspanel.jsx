import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsPanel",
  "description": "Design system panel displaying typography, colors, buttons, and boxes as clickable brandbook-style cards with specifications",
  "editorElement": {
    "selector": ".branded-elements-panel",
    "displayName": "Branded Elements Panel",
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
      "linkColor": {
        "dataType": "color",
        "displayName": "Link Color",
        "defaultValue": "#495057",
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
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "16px",
        "options": ["12px", "16px", "20px", "24px"],
        "group": "Layout"
      },
      "sectionSpacing": {
        "dataType": "select",
        "displayName": "Section Spacing",
        "defaultValue": "32px",
        "options": ["24px", "32px", "40px", "48px"],
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
  const linkColor = config?.linkColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '14');
  const fontWeight = config?.fontWeight || '400';
  const cornerRadius = config?.cornerRadius || '8px';
  const cardPadding = config?.cardPadding || '16px';
  const sectionSpacing = config?.sectionSpacing || '32px';

  // Typography data - exact Wix specifications
  const typographyItems = [
    { id: 'h1', label: 'Heading 1', weight: 'Bold', size: '88', lineHeight: '88', preview: 'Heading 1', type: 'heading', fontFamily: 'Wix Madefor Display' },
    { id: 'h2', label: 'Heading 2', weight: 'Bold', size: '64', lineHeight: '72', preview: 'Heading 2', type: 'heading', fontFamily: 'Wix Madefor Display' },
    { id: 'h3', label: 'Heading 3', weight: 'Medium', size: '56', lineHeight: '64', preview: 'Heading 3', type: 'heading', fontFamily: 'Wix Madefor Display' },
    { id: 'h4', label: 'Heading 4', weight: 'Regular', size: '48', lineHeight: '52', preview: 'Heading 4', type: 'heading', fontFamily: 'Wix Madefor Display' },
    { id: 'h5', label: 'Heading 5', weight: 'Regular', size: '32', lineHeight: '40', preview: 'Heading 5', type: 'heading', fontFamily: 'Wix Madefor Display' },
    { id: 'h6', label: 'Heading 6', weight: 'Regular', size: '24', lineHeight: '30', preview: 'Heading 6', type: 'heading', fontFamily: 'Wix Madefor Display' },
    { id: 'p1', label: 'Paragraph 1', weight: 'Regular', size: '20', lineHeight: '26', preview: 'This is the space to introduce the Services section. Briefly describe the types of services offered and highlight any special benefits or features.', type: 'paragraph', fontFamily: 'Wix Madefor Text' },
    { id: 'p2', label: 'Paragraph 2', weight: 'Regular', size: '16', lineHeight: '20', preview: 'This is the space to introduce the Services section. Briefly describe the types of services offered and highlight any special benefits or features.', type: 'paragraph', fontFamily: 'Wix Madefor Text' },
    { id: 'p3', label: 'Paragraph 3', weight: 'Regular', size: '14', lineHeight: '18', preview: 'This is the space to introduce the Services section. Briefly describe the types of services offered and highlight any special benefits or features.', type: 'paragraph', fontFamily: 'Wix Madefor Text' }
  ];

  // Button variants
  const buttonItems = [
    { id: 'primary', label: 'Primary', type: 'filled', preview: 'Button' },
    { id: 'secondary', label: 'Secondary', type: 'outlined', preview: 'Button' },
    { id: 'tertiary', label: 'Tertiary', type: 'text', preview: 'Button' }
  ];

  // Color swatches
  const colorItems = [
    { id: 'color-1', hex: '#212529' },
    { id: 'color-2', hex: '#495057' },
    { id: 'color-3', hex: '#ADB5BD' },
    { id: 'color-4', hex: '#E9ECEF' },
    { id: 'color-5', hex: '#F8F9FA' }
  ];

  // Line styles
  const lineItems = [
    { id: 'line-1', label: 'Line 1', thickness: '1px', style: 'solid' },
    { id: 'line-2', label: 'Line 2', thickness: '3px', style: 'solid' }
  ];

  const handleItemClick = (section, itemId) => {
    console.log(`Clicked: ${section} - ${itemId}`);
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
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight,
    minHeight: '100vh'
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

  const sectionStyle = {
    marginBottom: sectionSpacing
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const sectionTitleStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    color: textColor
  };

  const getCardStyle = (itemId) => ({
    backgroundColor: hoveredItem === itemId ? hoverBackgroundColor : backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: cornerRadius,
    padding: cardPadding,
    marginBottom: '12px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    transform: hoveredItem === itemId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredItem === itemId 
      ? '0 4px 12px rgba(0, 0, 0, 0.08)' 
      : '0 1px 3px rgba(0, 0, 0, 0.06)'
  });

  const typographyCardStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    alignItems: 'center',
    gap: '16px'
  };

  const specLabelStyle = {
    fontSize: `${fontSize - 2}px`,
    color: secondaryTextColor,
    fontWeight: '400'
  };

  const specValueStyle = {
    fontSize: `${fontSize}px`,
    color: textColor,
    fontWeight: '400'
  };

  const buttonPreviewStyle = (type) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: type === 'text' ? '10px 16px' : '10px 24px',
    borderRadius: '24px',
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    backgroundColor: type === 'filled' ? textColor : 'transparent',
    color: type === 'filled' ? backgroundColor : textColor,
    border: type === 'outlined' ? `2px solid ${textColor}` : 'none',
    textDecoration: type === 'text' ? 'underline' : 'none',
    cursor: 'pointer',
    transition: 'all 200ms ease-out'
  });

  const colorSwatchStyle = (hex) => ({
    width: '48px',
    height: '48px',
    borderRadius: cornerRadius,
    backgroundColor: hex,
    border: `1px solid ${borderColor}`,
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    transform: hoveredItem === hex ? 'scale(1.08)' : 'scale(1)',
    boxShadow: hoveredItem === hex ? '0 2px 8px rgba(0, 0, 0, 0.12)' : 'none'
  });

  const colorGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))',
    gap: '12px'
  };

  return (
    <div className="branded-elements-panel" style={containerStyle}>
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
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>Typography</h3>
        </div>

        {/* Column Headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '16px',
          padding: '0 16px 12px 16px',
          borderBottom: `1px solid ${borderColor}`,
          marginBottom: '12px'
        }}>
          <span style={{ ...specLabelStyle, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>HIERARCHY</span>
          <span style={{ ...specLabelStyle, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>WEIGHT</span>
          <span style={{ ...specLabelStyle, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>SIZE</span>
          <span style={{ ...specLabelStyle, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>LINE HEIGHT</span>
        </div>

        {typographyItems.map((item) => (
          <div
            key={item.id}
            style={{
              ...getCardStyle(item.id),
              cursor: 'grab',
              userSelect: 'none'
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick('typography', item.id)}
            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
          >
            <div style={typographyCardStyle}>
              <div style={{
                fontSize: `${item.type === 'heading' ? Math.min(parseInt(item.size), 56) : Math.min(parseInt(item.size), 20)}px`,
                fontWeight: getWeightValue(item.weight),
                color: textColor,
                lineHeight: '1.2',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                whiteSpace: item.type === 'paragraph' ? 'normal' : 'nowrap',
                overflow: item.type === 'paragraph' ? 'visible' : 'hidden',
                textOverflow: item.type === 'paragraph' ? 'clip' : 'ellipsis'
              }}>
                {item.preview}
              </div>
              <div style={specValueStyle}>{item.weight}</div>
              <div style={specValueStyle}>{item.size}</div>
              <div style={specValueStyle}>{item.lineHeight}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Colors Section */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>Colors</h3>
        </div>

        <div style={colorGridStyle}>
          {colorItems.map((item) => (
            <div
              key={item.id}
              style={colorSwatchStyle(item.hex)}
              onMouseEnter={() => setHoveredItem(item.hex)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick('colors', item.id)}
              title={item.hex}
            />
          ))}
        </div>
      </div>

      {/* Buttons Section */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>Buttons</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px'
        }}>
          {buttonItems.map((item) => (
            <div key={item.id}>
              <div
                style={{
                  ...getCardStyle(item.id),
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick('buttons', item.id)}
                onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
              >
                <div style={buttonPreviewStyle(item.type)}>
                  {item.preview}
                </div>
              </div>
              <div style={{
                fontSize: '11px',
                color: secondaryTextColor,
                fontWeight: '400',
                letterSpacing: '0.02em',
                marginTop: '8px',
                paddingLeft: '4px'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boxes Section */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>Boxes</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          <div>
            <div
              style={{
                ...getCardStyle('box-filled'),
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={() => setHoveredItem('box-filled')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick('boxes', 'box-filled')}
              onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
              onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
            >
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: hoverBackgroundColor,
                borderRadius: cornerRadius
              }} />
            </div>
            <div style={{
              fontSize: '11px',
              color: secondaryTextColor,
              fontWeight: '400',
              letterSpacing: '0.02em',
              marginTop: '8px',
              paddingLeft: '4px'
            }}>
              Box 1
            </div>
          </div>

          <div>
            <div
              style={{
                ...getCardStyle('box-outlined'),
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={() => setHoveredItem('box-outlined')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick('boxes', 'box-outlined')}
              onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
              onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
            >
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                border: `2px solid ${borderColor}`,
                borderRadius: cornerRadius
              }} />
            </div>
            <div style={{
              fontSize: '11px',
              color: secondaryTextColor,
              fontWeight: '400',
              letterSpacing: '0.02em',
              marginTop: '8px',
              paddingLeft: '4px'
            }}>
              Box 2
            </div>
          </div>
        </div>
      </div>

      {/* Lines Section */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>Lines</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {lineItems.map((item) => (
            <div key={item.id}>
              <div
                style={{
                  ...getCardStyle(item.id),
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick('lines', item.id)}
                onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
              >
                <div style={{
                  width: '80%',
                  height: item.thickness,
                  backgroundColor: textColor,
                  borderRadius: '1px'
                }} />
              </div>
              <div style={{
                fontSize: '11px',
                color: secondaryTextColor,
                fontWeight: '400',
                letterSpacing: '0.02em',
                marginTop: '8px',
                paddingLeft: '4px'
              }}>
                {item.label} • {item.thickness}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
