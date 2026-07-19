import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsCard",
  "description": "Fontshare-inspired large card view of branded elements with interactive controls",
  "editorElement": {
    "selector": ".branded-elements-card",
    "displayName": "Branded Elements Card",
    "archetype": "container",
    "data": {
      "sectionTitle": {
        "dataType": "text",
        "displayName": "Section Title",
        "defaultValue": "Branded elements",
        "group": "Content"
      },
      "fontFamilyDisplay": {
        "dataType": "text",
        "displayName": "Display Font Name",
        "defaultValue": "Wix Madefor Display",
        "group": "Content"
      },
      "fontFamilyText": {
        "dataType": "text",
        "displayName": "Text Font Name",
        "defaultValue": "Wix Madefor Text",
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
      }
    },
    "layout": {
      "resizeDirection": "vertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [selectedElement, setSelectedElement] = React.useState(0);

  // Safe config access with defaults
  const sectionTitle = config?.sectionTitle || 'Branded elements';
  const fontFamilyDisplay = config?.fontFamilyDisplay || 'Wix Madefor Display';
  const fontFamilyText = config?.fontFamilyText || 'Wix Madefor Text';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const fontSize = parseInt(config?.fontSize || '14');
  const fontWeight = config?.fontWeight || '400';
  const cornerRadius = config?.cornerRadius || '8px';

  // Typography elements
  const typographyElements = [
    { id: 'h1', name: 'Heading 1', preview: 'The New Standard', size: 88, weight: 'Bold', styles: 10 },
    { id: 'h2', name: 'Heading 2', preview: 'Fresh Perspectives', size: 64, weight: 'Bold', styles: 8 },
    { id: 'h3', name: 'Heading 3', preview: 'Timeless Design', size: 56, weight: 'Medium', styles: 6 },
    { id: 'p1', name: 'Paragraph 1', preview: 'This is the space to introduce the Services section.', size: 20, weight: 'Regular', styles: 4 }
  ];

  const containerStyle = {
    backgroundColor,
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight,
    minHeight: '100vh'
  };

  const headerStyle = {
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 10}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '32px'
  };

  const elementListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '32px'
  };

  const getElementCardStyle = (index) => ({
    backgroundColor: selectedElement === index ? backgroundColor : 'transparent',
    border: `1px solid ${selectedElement === index ? borderColor : 'transparent'}`,
    borderRadius: cornerRadius,
    padding: '16px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    boxShadow: selectedElement === index ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none'
  });

  const elementCardTitleStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '4px'
  };

  const elementCardSpecsStyle = {
    fontSize: `${fontSize - 2}px`,
    color: secondaryTextColor,
    display: 'flex',
    gap: '8px'
  };

  return (
    <div className="branded-elements-card" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>{sectionTitle}</h1>
      </div>

      {/* Typography Grid - All Elements Visible */}
      <div style={elementListStyle}>
        {typographyElements.map((element, index) => (
          <div
            key={element.id}
            style={{
              ...getElementCardStyle(index),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px',
              minHeight: '120px'
            }}
            onClick={() => setSelectedElement(index)}
            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
          >
            {/* Preview */}
            <div style={{
              fontSize: `${Math.min(element.size, 56)}px`,
              fontWeight: element.weight === 'Bold' ? '700' : element.weight === 'Medium' ? '500' : '400',
              color: textColor,
              lineHeight: '1.2',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              flex: '1',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {element.preview}
            </div>
            
            {/* Element Info */}
            <div style={{
              textAlign: 'right',
              marginLeft: '24px',
              flexShrink: 0
            }}>
              <div style={elementCardTitleStyle}>{element.name}</div>
              <div style={elementCardSpecsStyle}>
                <span>{element.size}px</span>
                <span>•</span>
                <span>{element.weight}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Font Family Attribution */}
      <div style={{
        marginTop: '32px',
        padding: '16px',
        borderTop: `1px solid ${borderColor}`,
        fontSize: `${fontSize - 2}px`,
        color: secondaryTextColor,
        textAlign: 'center'
      }}>
        Using {fontFamilyDisplay} • {fontFamilyText}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
