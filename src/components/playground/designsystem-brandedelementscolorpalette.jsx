import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsColorPalette",
  "description": "Comprehensive color palette showing shades, tints, and variations with hex values",
  "editorElement": {
    "selector": ".branded-elements-color-palette",
    "displayName": "Branded Elements Color Palette",
    "archetype": "container",
    "data": {
      "panelTitle": {
        "dataType": "text",
        "displayName": "Panel Title",
        "defaultValue": "Color Palette",
        "group": "Content"
      },
      "showHexValues": {
        "dataType": "booleanValue",
        "displayName": "Show Hex Values",
        "defaultValue": true,
        "group": "Content"
      },
      "showRGBValues": {
        "dataType": "booleanValue",
        "displayName": "Show RGB Values",
        "defaultValue": false,
        "group": "Content"
      },
      "showUsageNotes": {
        "dataType": "booleanValue",
        "displayName": "Show Usage Notes",
        "defaultValue": true,
        "group": "Content"
      },
      "swatchSize": {
        "dataType": "select",
        "displayName": "Swatch Size",
        "defaultValue": "120px",
        "options": ["80px", "100px", "120px", "140px"],
        "group": "Layout"
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
        "defaultValue": 13,
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "vertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [copiedColor, setCopiedColor] = React.useState(null);

  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Color Palette';
  const showHexValues = config?.showHexValues !== false;
  const showRGBValues = config?.showRGBValues || false;
  const showUsageNotes = config?.showUsageNotes !== false;
  const swatchSize = config?.swatchSize || '120px';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const fontSize = parseInt(config?.fontSize || '13');

  // Color groups with shades
  const colorGroups = [
    {
      name: 'Primary',
      colors: [
        { name: 'Primary 900', hex: '#212529', rgb: 'R: 33 G: 37 B: 41', usage: 'Headings, primary text' },
        { name: 'Primary 700', hex: '#495057', rgb: 'R: 73 G: 80 B: 87', usage: 'Secondary text' },
        { name: 'Primary 500', hex: '#6C757D', rgb: 'R: 108 G: 117 B: 125', usage: 'Tertiary text' },
        { name: 'Primary 300', hex: '#ADB5BD', rgb: 'R: 173 G: 181 B: 189', usage: 'Disabled states' },
        { name: 'Primary 100', hex: '#DEE2E6', rgb: 'R: 222 G: 226 B: 230', usage: 'Borders, dividers' }
      ]
    },
    {
      name: 'Neutrals',
      colors: [
        { name: 'Background', hex: '#FFFFFF', rgb: 'R: 255 G: 255 B: 255', usage: 'Page background' },
        { name: 'Surface 1', hex: '#F8F9FA', rgb: 'R: 248 G: 249 B: 250', usage: 'Card backgrounds' },
        { name: 'Surface 2', hex: '#F1F3F5', rgb: 'R: 241 G: 243 B: 245', usage: 'Elevated surfaces' },
        { name: 'Surface 3', hex: '#E9ECEF', rgb: 'R: 233 G: 236 B: 239', usage: 'Subtle emphasis' }
      ]
    }
  ];

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const containerStyle = {
    backgroundColor,
    padding: '32px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`
  };

  const titleStyle = {
    fontSize: `${fontSize + 12}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '32px'
  };

  const groupStyle = {
    marginBottom: '48px'
  };

  const groupTitleStyle = {
    fontSize: `${fontSize + 4}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '20px'
  };

  const swatchesGridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${swatchSize}, 1fr))`,
    gap: '20px'
  };

  const swatchCardStyle = {
    border: `1px solid ${borderColor}`,
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 150ms ease-out'
  };

  const getSwatchColorStyle = (hex) => ({
    width: '100%',
    height: swatchSize,
    backgroundColor: hex,
    border: hex === '#FFFFFF' ? `1px solid ${borderColor}` : 'none',
    position: 'relative'
  });

  const copiedBadgeStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#FFFFFF',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: `${fontSize - 1}px`,
    fontWeight: '500'
  };

  const swatchInfoStyle = {
    padding: '12px',
    backgroundColor
  };

  const swatchNameStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '4px'
  };

  const swatchHexStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    fontFamily: 'monospace',
    marginBottom: showRGBValues || showUsageNotes ? '4px' : '0'
  };

  const swatchRGBStyle = {
    fontSize: `${fontSize - 2}px`,
    color: secondaryTextColor,
    marginBottom: showUsageNotes ? '8px' : '0'
  };

  const swatchUsageStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    lineHeight: '1.4',
    borderTop: `1px solid ${borderColor}`,
    paddingTop: '8px',
    marginTop: '8px'
  };

  return (
    <div className="branded-elements-color-palette" style={containerStyle}>
      {/* Title */}
      <div style={titleStyle}>{panelTitle}</div>

      {/* Color Groups */}
      {colorGroups.map((group) => (
        <div key={group.name} style={groupStyle}>
          <div style={groupTitleStyle}>{group.name}</div>
          
          <div style={swatchesGridStyle}>
            {group.colors.map((color) => (
              <div
                key={color.hex}
                style={swatchCardStyle}
                onClick={() => handleCopyColor(color.hex)}
              >
                <div style={getSwatchColorStyle(color.hex)}>
                  {copiedColor === color.hex && (
                    <div style={copiedBadgeStyle}>Copied!</div>
                  )}
                </div>
                <div style={swatchInfoStyle}>
                  <div style={swatchNameStyle}>{color.name}</div>
                  {showHexValues && (
                    <div style={swatchHexStyle}>{color.hex}</div>
                  )}
                  {showRGBValues && (
                    <div style={swatchRGBStyle}>{color.rgb}</div>
                  )}
                  {showUsageNotes && (
                    <div style={swatchUsageStyle}>{color.usage}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
