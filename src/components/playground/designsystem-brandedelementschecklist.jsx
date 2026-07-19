import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsChecklist",
  "description": "Checklist-style layout with feature rows and checkmarks, similar to product feature comparison",
  "editorElement": {
    "selector": ".branded-elements-checklist",
    "displayName": "Branded Elements Checklist",
    "archetype": "container",
    "data": {
      "sectionTitle": {
        "dataType": "text",
        "displayName": "Section Title",
        "defaultValue": "Product",
        "group": "Content"
      },
      "sectionSubtitle": {
        "dataType": "text",
        "displayName": "Section Subtitle",
        "defaultValue": "Branded Elements",
        "group": "Content"
      },
      "descriptionText": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "Comprehensive set of typography, buttons, and UI elements ready for use in your designs.",
        "group": "Content"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Columns",
        "defaultValue": "2",
        "options": ["1", "2", "3"],
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
      "checkmarkColor": {
        "dataType": "color",
        "displayName": "Checkmark Color",
        "defaultValue": "#28A745",
        "group": "Colors"
      },
      "rowBackgroundColor": {
        "dataType": "color",
        "displayName": "Row Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Base Font Size (px)",
        "defaultValue": 14,
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
  const [hoveredRow, setHoveredRow] = React.useState(null);

  // Safe config access with defaults
  const sectionTitle = config?.sectionTitle || 'Product';
  const sectionSubtitle = config?.sectionSubtitle || 'Branded Elements';
  const descriptionText = config?.descriptionText || 'Comprehensive set of typography, buttons, and UI elements ready for use in your designs.';
  const columns = parseInt(config?.columns || '2');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const checkmarkColor = config?.checkmarkColor || '#28A745';
  const rowBackgroundColor = config?.rowBackgroundColor || '#F8F9FA';
  const fontSize = parseInt(config?.fontSize || '14');

  // Feature list items
  const features = [
    { id: 'h1', name: 'Heading 1', specs: '88/88 • Bold' },
    { id: 'h2', name: 'Heading 2', specs: '64/72 • Bold' },
    { id: 'h3', name: 'Heading 3', specs: '56/64 • Medium' },
    { id: 'p1', name: 'Paragraph 1', specs: '20/26 • Regular' },
    { id: 'p2', name: 'Paragraph 2', specs: '16/20 • Regular' },
    { id: 'btn-primary', name: 'Primary Button', specs: 'Filled variant' },
    { id: 'btn-secondary', name: 'Secondary Button', specs: 'Outlined variant' },
    { id: 'box-1', name: 'Box 1', specs: 'Container element' },
    { id: 'box-2', name: 'Box 2', specs: 'Container element' },
    { id: 'line-1', name: 'Line 1', specs: '1px thickness' }
  ];

  const handleRowClick = (featureId) => {
    console.log(`Clicked: ${featureId}`);
  };

  const containerStyle = {
    backgroundColor,
    padding: '32px 24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`
  };

  const headerStyle = {
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 24}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '4px'
  };

  const subtitleStyle = {
    fontSize: `${fontSize + 10}px`,
    fontWeight: '400',
    color: secondaryTextColor,
    marginBottom: '16px'
  };

  const descriptionStyle = {
    fontSize: `${fontSize + 2}px`,
    color: textColor,
    lineHeight: '1.6',
    maxWidth: '600px',
    marginBottom: '32px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '12px'
  };

  const getRowStyle = (featureId) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: hoveredRow === featureId ? rowBackgroundColor : 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    border: `1px solid ${hoveredRow === featureId ? '#E9ECEF' : 'transparent'}`
  });

  const checkmarkStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: checkmarkColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    flexShrink: 0
  };

  const checkmarkIconStyle = {
    width: '12px',
    height: '12px',
    color: '#FFFFFF'
  };

  const featureContentStyle = {
    flex: 1
  };

  const featureNameStyle = {
    fontSize: `${fontSize + 1}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '2px'
  };

  const featureSpecsStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor
  };

  return (
    <div className="branded-elements-checklist" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>{sectionTitle}</div>
        <div style={subtitleStyle}>{sectionSubtitle}</div>
        <div style={descriptionStyle}>{descriptionText}</div>
      </div>

      {/* Feature Grid */}
      <div style={gridStyle}>
        {features.map((feature) => (
          <div
            key={feature.id}
            style={getRowStyle(feature.id)}
            onMouseEnter={() => setHoveredRow(feature.id)}
            onMouseLeave={() => setHoveredRow(null)}
            onClick={() => handleRowClick(feature.id)}
          >
            <div style={checkmarkStyle}>
              <svg
                style={checkmarkIconStyle}
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={featureContentStyle}>
              <div style={featureNameStyle}>{feature.name}</div>
              <div style={featureSpecsStyle}>{feature.specs}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
