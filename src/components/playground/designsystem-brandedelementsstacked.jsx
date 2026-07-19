import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsStacked",
  "description": "Stacked cards with overlapping peek effect showing branded elements",
  "editorElement": {
    "selector": ".branded-elements-stacked",
    "displayName": "Branded Elements Stacked",
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
      "stackOffset": {
        "dataType": "select",
        "displayName": "Stack Offset",
        "defaultValue": "8px",
        "options": ["4px", "8px", "12px", "16px"],
        "group": "Layout",
        "description": "Vertical spacing between stacked cards"
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
        "defaultValue": "12px",
        "options": ["0px", "8px", "12px", "16px"],
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
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Safe config access with defaults
  const sectionTitle = config?.sectionTitle || 'Branded elements';
  const showInfoIcon = config?.showInfoIcon !== false;
  const showSeeAll = config?.showSeeAll !== false;
  const seeAllText = config?.seeAllText || 'See All';
  const stackOffset = parseInt(config?.stackOffset || '8');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const cardBackgroundColor = config?.cardBackgroundColor || '#F8F9FA';
  const linkColor = config?.linkColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '14');
  const cornerRadius = config?.cornerRadius || '12px';

  // Stack items
  const stackItems = [
    {
      id: 'heading-2',
      type: 'heading',
      label: 'Heading 2',
      preview: 'Fresh Perspectives',
      specs: '64/72 px • Bold'
    },
    {
      id: 'paragraph-2',
      type: 'text',
      label: 'Paragraph 2',
      preview: 'This is the space to introduce the Services section.',
      specs: '16/20 px'
    },
    {
      id: 'primary-button',
      type: 'button',
      label: 'Primary Button',
      preview: 'Button'
    },
    {
      id: 'box-1',
      type: 'box',
      label: 'Box 1'
    },
    {
      id: 'line-1',
      type: 'line',
      label: 'Line 1',
      thickness: '1px'
    }
  ];

  const handleCardClick = () => {
    setActiveIndex((prev) => (prev + 1) % stackItems.length);
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

  const stackContainerStyle = {
    position: 'relative',
    height: `${240 + (stackItems.length - 1) * stackOffset}px`,
    cursor: 'pointer'
  };

  const getCardStyle = (index) => {
    const isActive = index === activeIndex;
    const offset = (stackItems.length - 1 - index) * stackOffset;
    
    return {
      position: 'absolute',
      top: `${offset}px`,
      left: '0',
      right: '0',
      backgroundColor: isActive ? cardBackgroundColor : backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: cornerRadius,
      padding: '32px 24px',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 300ms ease-out',
      zIndex: stackItems.length - index,
      transform: isActive ? 'scale(1)' : 'scale(0.98)',
      opacity: index === activeIndex ? 1 : 0.6,
      boxShadow: isActive
        ? '0 4px 12px rgba(0, 0, 0, 0.08)'
        : '0 1px 3px rgba(0, 0, 0, 0.06)'
    };
  };

  const labelStyle = {
    fontSize: '11px',
    color: secondaryTextColor,
    fontWeight: '400',
    letterSpacing: '0.02em',
    marginBottom: '12px'
  };

  const counterStyle = {
    marginTop: '16px',
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    textAlign: 'center'
  };

  const renderContent = (item) => {
    switch (item.type) {
      case 'heading':
        return (
          <>
            <div style={{
              fontSize: '36px',
              fontWeight: '700',
              color: textColor,
              lineHeight: '1.2',
              textAlign: 'center',
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
          </>
        );
      
      case 'text':
        return (
          <>
            <div style={{
              fontSize: '14px',
              fontWeight: '400',
              color: textColor,
              lineHeight: '1.5',
              textAlign: 'center',
              maxWidth: '90%',
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
          </>
        );
      
      case 'button':
        return (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 24px',
            borderRadius: '20px',
            fontSize: `${fontSize}px`,
            fontWeight: '500',
            backgroundColor: textColor,
            color: backgroundColor
          }}>
            {item.preview}
          </div>
        );
      
      case 'box':
        return (
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: backgroundColor,
            borderRadius: cornerRadius,
            border: `1px solid ${borderColor}`
          }} />
        );
      
      case 'line':
        return (
          <div style={{
            width: '160px',
            height: item.thickness,
            backgroundColor: textColor,
            borderRadius: '1px'
          }} />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="branded-elements-stacked" style={containerStyle}>
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

      {/* Stacked Cards */}
      <div style={stackContainerStyle} onClick={handleCardClick}>
        {stackItems.map((item, index) => (
          <div key={item.id} style={getCardStyle(index)}>
            <div style={labelStyle}>{item.label}</div>
            {renderContent(item)}
          </div>
        ))}
      </div>

      {/* Counter */}
      <div style={counterStyle}>
        {activeIndex + 1} / {stackItems.length}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
