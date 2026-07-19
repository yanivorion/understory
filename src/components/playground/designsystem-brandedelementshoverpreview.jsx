import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsHoverPreview",
  "description": "Minimal list with large hover preview overlay showing element details",
  "editorElement": {
    "selector": ".branded-elements-hover-preview",
    "displayName": "Branded Elements Hover Preview",
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
      "previewPosition": {
        "dataType": "select",
        "displayName": "Preview Position",
        "defaultValue": "right",
        "options": ["right", "left"],
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
      "hoverBackgroundColor": {
        "dataType": "color",
        "displayName": "Hover Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "previewBackgroundColor": {
        "dataType": "color",
        "displayName": "Preview Background Color",
        "defaultValue": "#212529",
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
  const previewPosition = config?.previewPosition || 'right';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const hoverBackgroundColor = config?.hoverBackgroundColor || '#F8F9FA';
  const previewBackgroundColor = config?.previewBackgroundColor || '#212529';
  const linkColor = config?.linkColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '14');

  // List items
  const listItems = [
    {
      id: 'heading-2',
      type: 'heading',
      name: 'Heading 2',
      specs: '64/72 • Bold',
      preview: 'Fresh Perspectives'
    },
    {
      id: 'paragraph-2',
      type: 'text',
      name: 'Paragraph 2',
      specs: '16/20 • Regular',
      preview: 'This is the space to introduce the Services section.'
    },
    {
      id: 'primary-button',
      type: 'button',
      name: 'Primary Button',
      preview: 'Button'
    },
    {
      id: 'box-1',
      type: 'box',
      name: 'Box 1'
    },
    {
      id: 'line-1',
      type: 'line',
      name: 'Line 1',
      thickness: '1px'
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
    fontSize: `${fontSize}px`,
    position: 'relative'
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

  const listContainerStyle = {
    position: 'relative'
  };

  const getListItemStyle = (itemId) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    marginBottom: '4px',
    backgroundColor: hoveredItem === itemId ? hoverBackgroundColor : 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    border: `1px solid ${hoveredItem === itemId ? borderColor : 'transparent'}`,
    position: 'relative',
    zIndex: hoveredItem === itemId ? 2 : 1
  });

  const itemNameStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    color: textColor
  };

  const itemSpecsStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor
  };

  const previewOverlayStyle = {
    position: 'absolute',
    top: '0',
    [previewPosition]: '-280px',
    width: '260px',
    backgroundColor: previewBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    zIndex: 10,
    opacity: hoveredItem ? 1 : 0,
    transform: hoveredItem ? 'translateX(0)' : `translateX(${previewPosition === 'right' ? '-10px' : '10px'})`,
    transition: 'all 200ms ease-out',
    pointerEvents: 'none',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const renderPreview = () => {
    const item = listItems.find(i => i.id === hoveredItem);
    if (!item) return null;

    const previewColor = '#FFFFFF';

    switch (item.type) {
      case 'heading':
        return (
          <>
            <div style={{
              fontSize: '40px',
              fontWeight: '700',
              color: previewColor,
              lineHeight: '1.2',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {item.preview}
            </div>
            <div style={{
              fontSize: '13px',
              color: previewColor,
              opacity: 0.7
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
              color: previewColor,
              lineHeight: '1.5',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {item.preview}
            </div>
            <div style={{
              fontSize: '13px',
              color: previewColor,
              opacity: 0.7
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
            padding: '12px 32px',
            borderRadius: '24px',
            fontSize: `${fontSize + 2}px`,
            fontWeight: '500',
            backgroundColor: previewColor,
            color: previewBackgroundColor
          }}>
            {item.preview}
          </div>
        );
      
      case 'box':
        return (
          <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: previewColor,
            borderRadius: '12px',
            opacity: 0.9
          }} />
        );
      
      case 'line':
        return (
          <div style={{
            width: '180px',
            height: item.thickness,
            backgroundColor: previewColor,
            borderRadius: '1px'
          }} />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="branded-elements-hover-preview" style={containerStyle}>
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

      {/* List with Hover Preview */}
      <div style={listContainerStyle}>
        {listItems.map((item) => (
          <div
            key={item.id}
            style={getListItemStyle(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item.id)}
          >
            <div style={itemNameStyle}>{item.name}</div>
            {item.specs && <div style={itemSpecsStyle}>{item.specs}</div>}
          </div>
        ))}

        {/* Preview Overlay */}
        <div style={previewOverlayStyle}>
          {renderPreview()}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
