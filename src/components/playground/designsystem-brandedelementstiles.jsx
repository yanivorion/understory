import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsTiles",
  "description": "Compact tiles view of branded elements showing all design system items in a dense, scannable layout",
  "editorElement": {
    "selector": ".branded-elements-tiles",
    "displayName": "Branded Elements Tiles",
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
      "tileColumns": {
        "dataType": "select",
        "displayName": "Tile Columns",
        "defaultValue": "4",
        "options": ["3", "4", "5", "6"],
        "group": "Layout",
        "description": "Number of columns for tile grid"
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
        "defaultValue": "6px",
        "options": ["0px", "4px", "6px", "8px"],
        "group": "Layout"
      },
      "tileGap": {
        "dataType": "select",
        "displayName": "Tile Gap",
        "defaultValue": "8px",
        "options": ["4px", "8px", "12px", "16px"],
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
  const tileColumns = parseInt(config?.tileColumns || '4');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const hoverBackgroundColor = config?.hoverBackgroundColor || '#F8F9FA';
  const fontSize = parseInt(config?.fontSize || '13');
  const fontWeight = config?.fontWeight || '400';
  const cornerRadius = config?.cornerRadius || '6px';
  const tileGap = config?.tileGap || '8px';

  // All elements as tiles
  const allElements = [
    // Typography
    { id: 'h1', type: 'typography', label: 'Heading 1', preview: 'H1', size: '88px', weight: 'Bold' },
    { id: 'h2', type: 'typography', label: 'Heading 2', preview: 'H2', size: '64px', weight: 'Bold' },
    { id: 'h3', type: 'typography', label: 'Heading 3', preview: 'H3', size: '56px', weight: 'Medium' },
    { id: 'h4', type: 'typography', label: 'Heading 4', preview: 'H4', size: '48px', weight: 'Regular' },
    { id: 'h5', type: 'typography', label: 'Heading 5', preview: 'H5', size: '32px', weight: 'Regular' },
    { id: 'h6', type: 'typography', label: 'Heading 6', preview: 'H6', size: '24px', weight: 'Regular' },
    { id: 'p1', type: 'typography', label: 'Paragraph 1', preview: 'P1', size: '20px', weight: 'Regular' },
    { id: 'p2', type: 'typography', label: 'Paragraph 2', preview: 'P2', size: '16px', weight: 'Regular' },
    { id: 'p3', type: 'typography', label: 'Paragraph 3', preview: 'P3', size: '14px', weight: 'Regular' },
    
    // Buttons
    { id: 'btn-primary', type: 'button', label: 'Primary', variant: 'filled' },
    { id: 'btn-secondary', type: 'button', label: 'Secondary', variant: 'outlined' },
    { id: 'btn-tertiary', type: 'button', label: 'Tertiary', variant: 'text' },
    
    // Colors
    { id: 'color-1', type: 'color', hex: '#212529' },
    { id: 'color-2', type: 'color', hex: '#495057' },
    { id: 'color-3', type: 'color', hex: '#ADB5BD' },
    { id: 'color-4', type: 'color', hex: '#E9ECEF' },
    { id: 'color-5', type: 'color', hex: '#F8F9FA' },
    
    // Boxes
    { id: 'box-1', type: 'box', label: 'Box 1', variant: 'filled' },
    { id: 'box-2', type: 'box', label: 'Box 2', variant: 'outlined' },
    
    // Lines
    { id: 'line-1', type: 'line', label: 'Line 1', thickness: '1px' },
    { id: 'line-2', type: 'line', label: 'Line 2', thickness: '3px' }
  ];

  const handleItemClick = (itemId) => {
    console.log(`Clicked: ${itemId}`);
  };

  const containerStyle = {
    backgroundColor,
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 3}px`,
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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${tileColumns}, 1fr)`,
    gap: tileGap
  };

  const getTileStyle = (itemId) => ({
    backgroundColor: hoveredItem === itemId ? hoverBackgroundColor : backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: cornerRadius,
    padding: '12px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 150ms ease-out',
    transform: hoveredItem === itemId ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: hoveredItem === itemId 
      ? '0 2px 6px rgba(0, 0, 0, 0.06)' 
      : 'none',
    aspectRatio: '1 / 1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  });

  const labelStyle = {
    fontSize: '10px',
    color: secondaryTextColor,
    fontWeight: '400',
    position: 'absolute',
    bottom: '8px',
    left: '8px',
    right: '8px',
    textAlign: 'center',
    lineHeight: '1.2'
  };

  const renderTypography = (item) => (
    <div
      key={item.id}
      style={getTileStyle(item.id)}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        fontSize: '24px',
        fontWeight: item.weight === 'Bold' ? '700' : item.weight === 'Medium' ? '500' : '400',
        color: textColor,
        lineHeight: '1'
      }}>
        {item.preview}
      </div>
      <div style={labelStyle}>
        {item.label}<br />
        <span style={{ fontSize: '9px' }}>{item.size} • {item.weight}</span>
      </div>
    </div>
  );

  const renderButton = (item) => (
    <div
      key={item.id}
      style={getTileStyle(item.id)}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
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
        backgroundColor: item.variant === 'filled' ? textColor : 'transparent',
        color: item.variant === 'filled' ? backgroundColor : textColor,
        border: item.variant === 'outlined' ? `1px solid ${textColor}` : 'none',
        textDecoration: item.variant === 'text' ? 'underline' : 'none'
      }}>
        Button
      </div>
      <div style={labelStyle}>
        {item.label}
      </div>
    </div>
  );

  const renderColor = (item) => (
    <div
      key={item.id}
      style={{
        ...getTileStyle(item.id),
        padding: '0',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: item.hex
      }} />
      <div style={{
        ...labelStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '4px'
      }}>
        {item.hex}
      </div>
    </div>
  );

  const renderBox = (item) => (
    <div
      key={item.id}
      style={getTileStyle(item.id)}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        width: '60%',
        height: '60%',
        backgroundColor: item.variant === 'filled' ? hoverBackgroundColor : 'transparent',
        border: item.variant === 'outlined' ? `2px solid ${borderColor}` : 'none',
        borderRadius: cornerRadius
      }} />
      <div style={labelStyle}>
        {item.label}
      </div>
    </div>
  );

  const renderLine = (item) => (
    <div
      key={item.id}
      style={getTileStyle(item.id)}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        width: '70%',
        height: item.thickness,
        backgroundColor: textColor,
        borderRadius: '1px'
      }} />
      <div style={labelStyle}>
        {item.label} • {item.thickness}
      </div>
    </div>
  );

  const renderElement = (element) => {
    switch (element.type) {
      case 'typography':
        return renderTypography(element);
      case 'button':
        return renderButton(element);
      case 'color':
        return renderColor(element);
      case 'box':
        return renderBox(element);
      case 'line':
        return renderLine(element);
      default:
        return null;
    }
  };

  return (
    <div className="branded-elements-tiles" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {panelTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Branded design system elements">i</span>
          )}
        </div>
        <div style={{
          fontSize: '11px',
          color: secondaryTextColor
        }}>
          {allElements.length} elements
        </div>
      </div>

      {/* Tiles Grid */}
      <div style={gridStyle}>
        {allElements.map((element) => renderElement(element))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
