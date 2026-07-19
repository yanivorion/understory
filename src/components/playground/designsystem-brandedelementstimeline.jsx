import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsTimeline",
  "description": "Timeline/linear flow layout presenting elements in vertical progression with connecting lines",
  "editorElement": {
    "selector": ".branded-elements-timeline",
    "displayName": "Branded Elements Timeline",
    "archetype": "container",
    "data": {
      "panelTitle": {
        "dataType": "text",
        "displayName": "Panel Title",
        "defaultValue": "Design System Timeline",
        "group": "Content"
      },
      "showInfoIcon": {
        "dataType": "booleanValue",
        "displayName": "Show Info Icon",
        "defaultValue": true,
        "group": "Content"
      },
      "showConnectorLines": {
        "dataType": "booleanValue",
        "displayName": "Show Connector Lines",
        "defaultValue": true,
        "group": "Content"
      },
      "timelineStyle": {
        "dataType": "select",
        "displayName": "Timeline Style",
        "defaultValue": "left",
        "options": ["left", "center", "alternating"],
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
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
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
  const panelTitle = config?.panelTitle || 'Design System Timeline';
  const showInfoIcon = config?.showInfoIcon !== false;
  const showConnectorLines = config?.showConnectorLines !== false;
  const timelineStyle = config?.timelineStyle || 'left';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const cardBackgroundColor = config?.cardBackgroundColor || '#F8F9FA';
  const accentColor = config?.accentColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '14');
  const fontWeight = config?.fontWeight || '400';

  // Timeline items organized by category
  const timelineItems = [
    { id: 'typo-start', type: 'section', category: 'Typography', count: 9 },
    { id: 'h1', type: 'element', category: 'Typography', name: 'Heading 1', specs: '88/88 • Bold', preview: 'Heading 1' },
    { id: 'h2', type: 'element', category: 'Typography', name: 'Heading 2', specs: '64/72 • Bold', preview: 'Heading 2' },
    { id: 'h3', type: 'element', category: 'Typography', name: 'Heading 3', specs: '56/64 • Medium', preview: 'Heading 3' },
    { id: 'p1', type: 'element', category: 'Typography', name: 'Paragraph 1', specs: '20/26 • Regular', preview: 'Sample paragraph' },
    
    { id: 'colors-start', type: 'section', category: 'Colors', count: 5 },
    { id: 'color-1', type: 'color', hex: '#212529' },
    { id: 'color-2', type: 'color', hex: '#495057' },
    { id: 'color-3', type: 'color', hex: '#ADB5BD' },
    
    { id: 'buttons-start', type: 'section', category: 'Buttons', count: 3 },
    { id: 'btn-primary', type: 'button', name: 'Primary', variant: 'filled' },
    { id: 'btn-secondary', type: 'button', name: 'Secondary', variant: 'outlined' },
    
    { id: 'elements-start', type: 'section', category: 'Elements', count: 4 },
    { id: 'box-1', type: 'box', name: 'Box 1', variant: 'filled' },
    { id: 'line-1', type: 'line', name: 'Line 1', thickness: '1px' }
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
    padding: '40px 24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight,
    minHeight: '100vh'
  };

  const headerStyle = {
    textAlign: timelineStyle === 'center' ? 'center' : 'left',
    marginBottom: '48px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 8}px`,
    fontWeight: '500',
    color: textColor,
    display: 'inline-flex',
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

  const timelineContainerStyle = {
    position: 'relative',
    maxWidth: timelineStyle === 'center' ? '600px' : '100%',
    margin: timelineStyle === 'center' ? '0 auto' : '0',
    paddingLeft: timelineStyle === 'left' ? '40px' : '0'
  };

  const connectorLineStyle = {
    position: 'absolute',
    left: timelineStyle === 'left' ? '12px' : '50%',
    top: '0',
    bottom: '0',
    width: '2px',
    backgroundColor: borderColor,
    transform: timelineStyle === 'center' ? 'translateX(-50%)' : 'none'
  };

  const timelineItemContainerStyle = (index) => ({
    position: 'relative',
    marginBottom: '32px',
    display: 'flex',
    justifyContent: timelineStyle === 'alternating' 
      ? (index % 2 === 0 ? 'flex-start' : 'flex-end')
      : timelineStyle === 'center' ? 'center' : 'flex-start',
    paddingLeft: timelineStyle === 'alternating' && index % 2 === 0 ? '40px' : '0',
    paddingRight: timelineStyle === 'alternating' && index % 2 !== 0 ? '40px' : '0'
  });

  const dotStyle = {
    position: 'absolute',
    left: timelineStyle === 'left' ? '3px' : '50%',
    top: '20px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: accentColor,
    border: `3px solid ${backgroundColor}`,
    transform: timelineStyle === 'center' ? 'translateX(-50%)' : 'none',
    zIndex: 2
  };

  const sectionHeaderStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    backgroundColor: accentColor,
    color: backgroundColor,
    borderRadius: '24px',
    fontSize: `${fontSize + 2}px`,
    fontWeight: '500'
  };

  const getCardStyle = (itemId) => ({
    backgroundColor: cardBackgroundColor,
    border: `1px solid ${hoveredItem === itemId ? accentColor : borderColor}`,
    borderRadius: '12px',
    padding: '20px',
    maxWidth: timelineStyle === 'left' ? '500px' : '280px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    transform: hoveredItem === itemId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredItem === itemId
      ? '0 4px 12px rgba(0, 0, 0, 0.08)'
      : '0 1px 3px rgba(0, 0, 0, 0.06)'
  });

  const renderElement = (item) => {
    if (item.type === 'section') {
      return (
        <div key={item.id} style={timelineItemContainerStyle(timelineItems.indexOf(item))}>
          {showConnectorLines && <div style={dotStyle} />}
          <div style={sectionHeaderStyle}>
            <span>{item.category}</span>
            <span style={{
              fontSize: `${fontSize - 1}px`,
              opacity: 0.8
            }}>
              {item.count} items
            </span>
          </div>
        </div>
      );
    }

    if (item.type === 'element') {
      return (
        <div key={item.id} style={timelineItemContainerStyle(timelineItems.indexOf(item))}>
          {showConnectorLines && <div style={dotStyle} />}
          <div
            style={getCardStyle(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item.id)}
            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
          >
            <div style={{
              fontSize: '11px',
              color: secondaryTextColor,
              marginBottom: '8px'
            }}>
              {item.name}
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: getWeightValue(item.specs),
              color: textColor,
              lineHeight: '1.2',
              marginBottom: '8px'
            }}>
              {item.preview}
            </div>
            <div style={{
              fontSize: `${fontSize - 1}px`,
              color: secondaryTextColor
            }}>
              {item.specs}
            </div>
          </div>
        </div>
      );
    }

    if (item.type === 'color') {
      return (
        <div key={item.id} style={timelineItemContainerStyle(timelineItems.indexOf(item))}>
          {showConnectorLines && <div style={dotStyle} />}
          <div
            style={{
              ...getCardStyle(item.id),
              padding: '0',
              overflow: 'hidden',
              height: '80px'
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
              backgroundColor: item.hex,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#FFFFFF',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                {item.hex}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (item.type === 'button') {
      return (
        <div key={item.id} style={timelineItemContainerStyle(timelineItems.indexOf(item))}>
          {showConnectorLines && <div style={dotStyle} />}
          <div
            style={{
              ...getCardStyle(item.id),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item.id)}
            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 24px',
              borderRadius: '24px',
              fontSize: `${fontSize}px`,
              fontWeight: '500',
              backgroundColor: item.variant === 'filled' ? textColor : 'transparent',
              color: item.variant === 'filled' ? backgroundColor : textColor,
              border: item.variant === 'outlined' ? `2px solid ${textColor}` : 'none'
            }}>
              Button
            </div>
            <div style={{
              fontSize: '11px',
              color: secondaryTextColor
            }}>
              {item.name}
            </div>
          </div>
        </div>
      );
    }

    if (item.type === 'box' || item.type === 'line') {
      return (
        <div key={item.id} style={timelineItemContainerStyle(timelineItems.indexOf(item))}>
          {showConnectorLines && <div style={dotStyle} />}
          <div
            style={getCardStyle(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item.id)}
            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
          >
            <div style={{
              fontSize: '11px',
              color: secondaryTextColor,
              marginBottom: '12px'
            }}>
              {item.name}
            </div>
            {item.type === 'box' ? (
              <div style={{
                width: '100px',
                height: '60px',
                backgroundColor: backgroundColor,
                border: `2px solid ${borderColor}`,
                borderRadius: '8px'
              }} />
            ) : (
              <div style={{
                width: '100%',
                height: item.thickness,
                backgroundColor: textColor,
                borderRadius: '1px'
              }} />
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="branded-elements-timeline" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {panelTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Design system timeline view">i</span>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div style={timelineContainerStyle}>
        {showConnectorLines && <div style={connectorLineStyle} />}
        {timelineItems.map((item) => renderElement(item))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
