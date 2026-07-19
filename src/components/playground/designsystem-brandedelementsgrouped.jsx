import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsGrouped",
  "description": "Grouped cards layout showing all elements in a unified grid with visual section grouping",
  "editorElement": {
    "selector": ".branded-elements-grouped",
    "displayName": "Branded Elements Grouped",
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
      "showElementCounts": {
        "dataType": "booleanValue",
        "displayName": "Show Element Counts",
        "defaultValue": true,
        "group": "Content"
      },
      "gridColumns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "4",
        "options": ["3", "4", "5", "6"],
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
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "sectionHeaderColor": {
        "dataType": "color",
        "displayName": "Section Header Color",
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
        "defaultValue": "10px",
        "options": ["0px", "6px", "8px", "10px", "12px"],
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
  const showElementCounts = config?.showElementCounts !== false;
  const gridColumns = parseInt(config?.gridColumns || '4');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const cardBackgroundColor = config?.cardBackgroundColor || '#F8F9FA';
  const sectionHeaderColor = config?.sectionHeaderColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '13');
  const fontWeight = config?.fontWeight || '400';
  const cornerRadius = config?.cornerRadius || '10px';
  const sectionSpacing = config?.sectionSpacing || '32px';

  // Organized sections with all elements
  const sections = [
    {
      id: 'typography',
      title: 'Typography',
      icon: 'Aa',
      elements: [
        { id: 'h1', name: 'Heading 1', specs: '88/88 • Bold', preview: 'H1', type: 'text' },
        { id: 'h2', name: 'Heading 2', specs: '64/72 • Bold', preview: 'H2', type: 'text' },
        { id: 'h3', name: 'Heading 3', specs: '56/64 • Medium', preview: 'H3', type: 'text' },
        { id: 'h4', name: 'Heading 4', specs: '48/52 • Regular', preview: 'H4', type: 'text' },
        { id: 'h5', name: 'Heading 5', specs: '32/40 • Regular', preview: 'H5', type: 'text' },
        { id: 'h6', name: 'Heading 6', specs: '24/30 • Regular', preview: 'H6', type: 'text' },
        { id: 'p1', name: 'Paragraph 1', specs: '20/26 • Regular', preview: 'P1', type: 'text' },
        { id: 'p2', name: 'Paragraph 2', specs: '16/20 • Regular', preview: 'P2', type: 'text' },
        { id: 'p3', name: 'Paragraph 3', specs: '14/18 • Regular', preview: 'P3', type: 'text' }
      ]
    },
    {
      id: 'colors',
      title: 'Colors',
      icon: '●',
      elements: [
        { id: 'color-1', hex: '#212529', type: 'color' },
        { id: 'color-2', hex: '#495057', type: 'color' },
        { id: 'color-3', hex: '#ADB5BD', type: 'color' },
        { id: 'color-4', hex: '#E9ECEF', type: 'color' },
        { id: 'color-5', hex: '#F8F9FA', type: 'color' }
      ]
    },
    {
      id: 'buttons',
      title: 'Buttons',
      icon: '▭',
      elements: [
        { id: 'btn-primary', name: 'Primary', variant: 'filled', type: 'button' },
        { id: 'btn-secondary', name: 'Secondary', variant: 'outlined', type: 'button' },
        { id: 'btn-tertiary', name: 'Tertiary', variant: 'text', type: 'button' }
      ]
    },
    {
      id: 'boxes',
      title: 'Boxes',
      icon: '▢',
      elements: [
        { id: 'box-1', name: 'Box 1', variant: 'filled', type: 'box' },
        { id: 'box-2', name: 'Box 2', variant: 'outlined', type: 'box' }
      ]
    },
    {
      id: 'lines',
      title: 'Lines',
      icon: '—',
      elements: [
        { id: 'line-1', name: 'Line 1', thickness: '1px', type: 'line' },
        { id: 'line-2', name: 'Line 2', thickness: '3px', type: 'line' }
      ]
    }
  ];

  const handleItemClick = (itemId) => {
    console.log(`Clicked: ${itemId}`);
  };

  const getWeightValue = (specs) => {
    if (specs?.includes('Bold')) return '700';
    if (specs?.includes('Medium')) return '500';
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
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 8}px`,
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

  const sectionContainerStyle = {
    marginBottom: sectionSpacing
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: `2px solid ${borderColor}`
  };

  const sectionIconStyle = {
    fontSize: '20px',
    color: sectionHeaderColor
  };

  const sectionTitleStyle = {
    fontSize: `${fontSize + 4}px`,
    fontWeight: '500',
    color: sectionHeaderColor
  };

  const sectionCountStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    marginLeft: 'auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
    gap: '12px'
  };

  const getCardStyle = (itemId) => ({
    backgroundColor: cardBackgroundColor,
    border: `1px solid ${hoveredItem === itemId ? sectionHeaderColor : borderColor}`,
    borderRadius: cornerRadius,
    padding: '16px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    transform: hoveredItem === itemId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredItem === itemId
      ? '0 4px 12px rgba(0, 0, 0, 0.08)'
      : 'none',
    aspectRatio: '1 / 1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  });

  const cardLabelStyle = {
    fontSize: '10px',
    color: secondaryTextColor,
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    right: '10px',
    textAlign: 'center'
  };

  const renderText = (element) => (
    <div
      key={element.id}
      style={{ ...getCardStyle(element.id), position: 'relative' }}
      onMouseEnter={() => setHoveredItem(element.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(element.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        fontSize: '32px',
        fontWeight: getWeightValue(element.specs),
        color: textColor,
        lineHeight: '1'
      }}>
        {element.preview}
      </div>
      <div style={cardLabelStyle}>
        {element.name}<br />
        <span style={{ fontSize: '9px' }}>{element.specs}</span>
      </div>
    </div>
  );

  const renderColor = (element) => (
    <div
      key={element.id}
      style={{
        ...getCardStyle(element.id),
        padding: '0',
        overflow: 'hidden',
        position: 'relative'
      }}
      onMouseEnter={() => setHoveredItem(element.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(element.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: element.hex
      }} />
      <div style={{
        ...cardLabelStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '4px'
      }}>
        {element.hex}
      </div>
    </div>
  );

  const renderButton = (element) => (
    <div
      key={element.id}
      style={{ ...getCardStyle(element.id), position: 'relative' }}
      onMouseEnter={() => setHoveredItem(element.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(element.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        borderRadius: '16px',
        fontSize: '11px',
        fontWeight: '500',
        backgroundColor: element.variant === 'filled' ? textColor : 'transparent',
        color: element.variant === 'filled' ? backgroundColor : textColor,
        border: element.variant === 'outlined' ? `1px solid ${textColor}` : 'none',
        textDecoration: element.variant === 'text' ? 'underline' : 'none'
      }}>
        Button
      </div>
      <div style={cardLabelStyle}>{element.name}</div>
    </div>
  );

  const renderBox = (element) => (
    <div
      key={element.id}
      style={{ ...getCardStyle(element.id), position: 'relative' }}
      onMouseEnter={() => setHoveredItem(element.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(element.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        width: '60%',
        height: '60%',
        backgroundColor: element.variant === 'filled' ? backgroundColor : 'transparent',
        border: element.variant === 'outlined' ? `2px solid ${borderColor}` : `1px solid ${borderColor}`,
        borderRadius: cornerRadius
      }} />
      <div style={cardLabelStyle}>{element.name}</div>
    </div>
  );

  const renderLine = (element) => (
    <div
      key={element.id}
      style={{ ...getCardStyle(element.id), position: 'relative' }}
      onMouseEnter={() => setHoveredItem(element.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(element.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        width: '70%',
        height: element.thickness,
        backgroundColor: textColor,
        borderRadius: '1px'
      }} />
      <div style={cardLabelStyle}>{element.name} • {element.thickness}</div>
    </div>
  );

  const renderElement = (element) => {
    switch (element.type) {
      case 'text':
        return renderText(element);
      case 'color':
        return renderColor(element);
      case 'button':
        return renderButton(element);
      case 'box':
        return renderBox(element);
      case 'line':
        return renderLine(element);
      default:
        return null;
    }
  };

  return (
    <div className="branded-elements-grouped" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {panelTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Branded design system elements">i</span>
          )}
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.id} style={sectionContainerStyle}>
          {/* Section Header */}
          <div style={sectionHeaderStyle}>
            <span style={sectionIconStyle}>{section.icon}</span>
            <span style={sectionTitleStyle}>{section.title}</span>
            {showElementCounts && (
              <span style={sectionCountStyle}>
                {section.elements.length} {section.elements.length === 1 ? 'element' : 'elements'}
              </span>
            )}
          </div>

          {/* Section Grid */}
          <div style={gridStyle}>
            {section.elements.map((element) => renderElement(element))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
