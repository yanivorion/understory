import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsBento",
  "description": "Bento box style layout with mixed-size cards in an asymmetric grid",
  "editorElement": {
    "selector": ".branded-elements-bento",
    "displayName": "Branded Elements Bento",
    "archetype": "container",
    "data": {
      "sectionTitle": {
        "dataType": "text",
        "displayName": "Section Title",
        "defaultValue": "Branded elements",
        "group": "Content"
      },
      "showInfoIcon": {
        "dataType": "booleanValue",
        "displayName": "Show Info Icon",
        "defaultValue": true,
        "group": "Content"
      },
      "showSeeAll": {
        "dataType": "booleanValue",
        "displayName": "Show See All Link",
        "defaultValue": true,
        "group": "Content"
      },
      "seeAllText": {
        "dataType": "text",
        "displayName": "See All Text",
        "defaultValue": "See All",
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
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
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
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "16px",
        "options": ["8px", "12px", "16px", "20px"],
        "group": "Layout"
      },
      "cardGap": {
        "dataType": "select",
        "displayName": "Card Gap",
        "defaultValue": "12px",
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
  const sectionTitle = config?.sectionTitle || 'Branded elements';
  const showInfoIcon = config?.showInfoIcon !== false;
  const showSeeAll = config?.showSeeAll !== false;
  const seeAllText = config?.seeAllText || 'See All';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const cardBackgroundColor = config?.cardBackgroundColor || '#F8F9FA';
  const linkColor = config?.linkColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '14');
  const cornerRadius = config?.cornerRadius || '16px';
  const cardGap = config?.cardGap || '12px';

  // Bento items with grid positions
  const bentoItems = [
    {
      id: 'heading-2',
      type: 'heading',
      label: 'Heading 2',
      preview: 'Fresh Perspectives',
      specs: '64/72 • Bold',
      gridArea: '1 / 1 / 3 / 3' // Large: 2x2
    },
    {
      id: 'primary-button',
      type: 'button',
      label: 'Primary Button',
      preview: 'Button',
      gridArea: '1 / 3 / 2 / 4' // Small: 1x1
    },
    {
      id: 'paragraph-2',
      type: 'text',
      label: 'Paragraph 2',
      preview: 'This is the space to introduce the Services section.',
      specs: '16/20 • Regular',
      gridArea: '2 / 3 / 3 / 4' // Small: 1x1
    },
    {
      id: 'box-1',
      type: 'box',
      label: 'Box 1',
      gridArea: '3 / 1 / 4 / 2' // Small: 1x1
    },
    {
      id: 'line-1',
      type: 'line',
      label: 'Line 1',
      thickness: '1px',
      gridArea: '3 / 2 / 4 / 4' // Wide: 1x2
    }
  ];

  const handleItemClick = (itemId) => {
    console.log(`Clicked: ${itemId}`);
  };

  const handleSeeAllClick = () => {
    console.log('See All clicked - navigate to drill-in view');
  };

  const containerStyle = {
    backgroundColor,
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px'
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

  const seeAllStyle = {
    color: linkColor,
    fontSize: `${fontSize}px`,
    fontWeight: '400',
    textDecoration: 'none',
    cursor: 'pointer'
  };

  const bentoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 120px)',
    gap: cardGap
  };

  const getCardStyle = (itemId, gridArea) => ({
    gridArea,
    backgroundColor: cardBackgroundColor,
    border: `1px solid ${hoveredItem === itemId ? textColor : borderColor}`,
    borderRadius: cornerRadius,
    padding: '20px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    transform: hoveredItem === itemId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredItem === itemId
      ? '0 4px 12px rgba(0, 0, 0, 0.08)'
      : '0 1px 3px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden'
  });

  const labelStyle = {
    fontSize: '11px',
    color: secondaryTextColor,
    fontWeight: '400',
    letterSpacing: '0.02em'
  };

  const renderContent = (item) => {
    switch (item.type) {
      case 'heading':
        return (
          <>
            <div style={labelStyle}>{item.label}</div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: textColor,
              lineHeight: '1.2',
              flex: '1',
              display: 'flex',
              alignItems: 'center'
            }}>
              {item.preview}
            </div>
            <div style={{
              fontSize: `${fontSize - 1}px`,
              color: secondaryTextColor
            }}>
              {item.specs}
            </div>
          </>
        );
      
      case 'text':
        return (
          <>
            <div style={labelStyle}>{item.label}</div>
            <div style={{
              fontSize: '13px',
              fontWeight: '400',
              color: textColor,
              lineHeight: '1.4',
              flex: '1',
              display: 'flex',
              alignItems: 'center'
            }}>
              {item.preview}
            </div>
            <div style={{
              fontSize: `${fontSize - 1}px`,
              color: secondaryTextColor
            }}>
              {item.specs}
            </div>
          </>
        );
      
      case 'button':
        return (
          <>
            <div style={labelStyle}>{item.label}</div>
            <div style={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 24px',
                borderRadius: '24px',
                fontSize: `${fontSize}px`,
                fontWeight: '500',
                backgroundColor: textColor,
                color: backgroundColor
              }}>
                {item.preview}
              </div>
            </div>
          </>
        );
      
      case 'box':
        return (
          <>
            <div style={labelStyle}>{item.label}</div>
            <div style={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: backgroundColor,
                borderRadius: '12px',
                border: `1px solid ${borderColor}`
              }} />
            </div>
          </>
        );
      
      case 'line':
        return (
          <>
            <div style={labelStyle}>{item.label}</div>
            <div style={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '80%',
                height: item.thickness,
                backgroundColor: textColor,
                borderRadius: '1px'
              }} />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="branded-elements-bento" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {sectionTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Branded design system elements">i</span>
          )}
        </div>
        {showSeeAll && (
          <a style={seeAllStyle} onClick={handleSeeAllClick}>
            {seeAllText}
          </a>
        )}
      </div>

      {/* Bento Grid */}
      <div style={bentoGridStyle}>
        {bentoItems.map((item) => (
          <div
            key={item.id}
            style={getCardStyle(item.id, item.gridArea)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item.id)}
            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
          >
            {renderContent(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
