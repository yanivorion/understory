import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsCompact",
  "description": "Ultra-compact list view with small previews, optimized for space efficiency",
  "editorElement": {
    "selector": ".branded-elements-compact",
    "displayName": "Branded Elements Compact",
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
      "showPreviews": {
        "dataType": "booleanValue",
        "displayName": "Show Previews",
        "defaultValue": true,
        "group": "Content",
        "description": "Show visual previews inline"
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
        "defaultValue": 13,
        "group": "Typography"
      },
      "itemSpacing": {
        "dataType": "select",
        "displayName": "Item Spacing",
        "defaultValue": "2px",
        "options": ["0px", "2px", "4px", "6px"],
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
  const showPreviews = config?.showPreviews !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const hoverBackgroundColor = config?.hoverBackgroundColor || '#F8F9FA';
  const linkColor = config?.linkColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '13');
  const itemSpacing = config?.itemSpacing || '2px';

  // Compact list items
  const listItems = [
    {
      id: 'heading-2',
      type: 'heading',
      label: 'Heading 2',
      specs: '64/72 • Bold',
      icon: 'H2'
    },
    {
      id: 'paragraph-2',
      type: 'text',
      label: 'Paragraph 2',
      specs: '16/20 • Regular',
      icon: 'P2'
    },
    {
      id: 'primary-button',
      type: 'button',
      label: 'Primary Button',
      specs: 'Filled',
      icon: '●'
    },
    {
      id: 'box-1',
      type: 'box',
      label: 'Box 1',
      specs: 'Filled',
      icon: '▢'
    },
    {
      id: 'line-1',
      type: 'line',
      label: 'Line 1',
      specs: '1px',
      icon: '—'
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
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
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
    fontSize: '10px',
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
    display: 'flex',
    flexDirection: 'column',
    gap: itemSpacing
  };

  const getItemStyle = (itemId) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    backgroundColor: hoveredItem === itemId ? hoverBackgroundColor : 'transparent',
    borderRadius: '6px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 150ms ease-out',
    border: `1px solid ${hoveredItem === itemId ? borderColor : 'transparent'}`
  });

  const leftSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: '1'
  };

  const iconStyle = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: hoverBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: textColor,
    flexShrink: 0
  };

  const labelStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '400',
    color: textColor
  };

  const specsStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    fontWeight: '400',
    marginLeft: 'auto',
    paddingLeft: '12px'
  };

  const previewStyle = (item) => {
    switch (item.type) {
      case 'heading':
        return {
          fontSize: '18px',
          fontWeight: '700',
          color: textColor,
          marginLeft: '12px'
        };
      case 'text':
        return {
          fontSize: '11px',
          fontWeight: '400',
          color: secondaryTextColor,
          marginLeft: '12px',
          maxWidth: '120px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        };
      case 'button':
        return {
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: '500',
          backgroundColor: textColor,
          color: backgroundColor,
          marginLeft: '12px'
        };
      case 'box':
        return {
          width: '24px',
          height: '24px',
          backgroundColor: hoverBackgroundColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '4px',
          marginLeft: '12px'
        };
      case 'line':
        return {
          width: '40px',
          height: '1px',
          backgroundColor: textColor,
          marginLeft: '12px'
        };
      default:
        return {};
    }
  };

  const renderPreview = (item) => {
    if (!showPreviews) return null;

    switch (item.type) {
      case 'heading':
        return <div style={previewStyle(item)}>Aa</div>;
      case 'text':
        return <div style={previewStyle(item)}>Sample text preview</div>;
      case 'button':
        return <div style={previewStyle(item)}>Btn</div>;
      case 'box':
        return <div style={previewStyle(item)} />;
      case 'line':
        return <div style={previewStyle(item)} />;
      default:
        return null;
    }
  };

  return (
    <div className="branded-elements-compact" style={containerStyle}>
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

      {/* Compact List */}
      <div style={listContainerStyle}>
        {listItems.map((item) => (
          <div
            key={item.id}
            style={getItemStyle(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item.id)}
            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
          >
            <div style={leftSectionStyle}>
              <div style={iconStyle}>{item.icon}</div>
              <div style={labelStyle}>{item.label}</div>
              {renderPreview(item)}
            </div>
            <div style={specsStyle}>{item.specs}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
