import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsAccordion",
  "description": "Accordion list with expandable rows revealing element specifications and previews",
  "editorElement": {
    "selector": ".branded-elements-accordion",
    "displayName": "Branded Elements Accordion",
    "archetype": "container",
    "data": {
      "sectionTitle": {
        "dataType": "text",
        "displayName": "Section Title",
        "defaultValue": "Element Library",
        "group": "Content"
      },
      "allowMultipleOpen": {
        "dataType": "booleanValue",
        "displayName": "Allow Multiple Open",
        "defaultValue": false,
        "group": "Content"
      },
      "showIcons": {
        "dataType": "booleanValue",
        "displayName": "Show Icons",
        "defaultValue": true,
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
      "headerBackgroundColor": {
        "dataType": "color",
        "displayName": "Header Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "contentBackgroundColor": {
        "dataType": "color",
        "displayName": "Content Background",
        "defaultValue": "#FAFBFC",
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
      }
    },
    "layout": {
      "resizeDirection": "vertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [openItems, setOpenItems] = React.useState(new Set());

  // Safe config access with defaults
  const sectionTitle = config?.sectionTitle || 'Element Library';
  const allowMultipleOpen = config?.allowMultipleOpen || false;
  const showIcons = config?.showIcons !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const headerBackgroundColor = config?.headerBackgroundColor || '#F8F9FA';
  const contentBackgroundColor = config?.contentBackgroundColor || '#FAFBFC';
  const borderColor = config?.borderColor || '#E9ECEF';
  const fontSize = parseInt(config?.fontSize || '14');

  // Accordion items
  const items = [
    { 
      id: 'h2', 
      name: 'Heading 2', 
      category: 'Typography',
      icon: 'H2',
      specs: {
        size: '64px',
        lineHeight: '72px',
        weight: 'Bold',
        usage: 'Section headers, feature titles'
      }
    },
    { 
      id: 'p2', 
      name: 'Paragraph 2', 
      category: 'Typography',
      icon: 'P2',
      specs: {
        size: '16px',
        lineHeight: '20px',
        weight: 'Regular',
        usage: 'Body text, descriptions'
      }
    },
    { 
      id: 'btn', 
      name: 'Primary Button', 
      category: 'Interactive',
      icon: '●',
      specs: {
        variant: 'Filled',
        radius: '24px',
        padding: '10px 24px',
        usage: 'Primary actions, CTAs'
      }
    },
    { 
      id: 'box', 
      name: 'Box 1', 
      category: 'Elements',
      icon: '▢',
      specs: {
        type: 'Container',
        border: '1px solid',
        radius: '8px',
        usage: 'Content grouping'
      }
    }
  ];

  const handleToggle = (itemId) => {
    setOpenItems(prev => {
      const newSet = new Set(allowMultipleOpen ? prev : []);
      if (prev.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const containerStyle = {
    backgroundColor,
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`
  };

  const titleStyle = {
    fontSize: `${fontSize + 8}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '24px'
  };

  const accordionStyle = {
    border: `1px solid ${borderColor}`,
    borderRadius: '12px',
    overflow: 'hidden'
  };

  const getHeaderStyle = (itemId) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: headerBackgroundColor,
    borderBottom: openItems.has(itemId) ? `1px solid ${borderColor}` : 'none',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    userSelect: 'none'
  });

  const headerLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const iconStyle = {
    fontSize: `${fontSize + 12}px`,
    fontWeight: '500',
    color: textColor,
    minWidth: '32px',
    textAlign: 'center'
  };

  const headerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const itemNameStyle = {
    fontSize: `${fontSize + 1}px`,
    fontWeight: '500',
    color: textColor
  };

  const itemCategoryStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor
  };

  const chevronStyle = (isOpen) => ({
    fontSize: '12px',
    color: secondaryTextColor,
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 200ms ease-out'
  });

  const getContentStyle = (itemId) => ({
    maxHeight: openItems.has(itemId) ? '300px' : '0',
    overflow: 'hidden',
    transition: 'max-height 300ms ease-out',
    backgroundColor: contentBackgroundColor
  });

  const contentInnerStyle = {
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  };

  const specRowStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const specLabelStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const specValueStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    color: textColor
  };

  const dividerStyle = {
    height: '1px',
    backgroundColor: borderColor
  };

  return (
    <div className="branded-elements-accordion" style={containerStyle}>
      {/* Title */}
      <div style={titleStyle}>{sectionTitle}</div>

      {/* Accordion */}
      <div style={accordionStyle}>
        {items.map((item, index) => {
          const isOpen = openItems.has(item.id);
          return (
            <React.Fragment key={item.id}>
              {/* Header */}
              <div
                style={getHeaderStyle(item.id)}
                onClick={() => handleToggle(item.id)}
              >
                <div style={headerLeftStyle}>
                  {showIcons && <div style={iconStyle}>{item.icon}</div>}
                  <div style={headerContentStyle}>
                    <div style={itemNameStyle}>{item.name}</div>
                    <div style={itemCategoryStyle}>{item.category}</div>
                  </div>
                </div>
                <div style={chevronStyle(isOpen)}>▼</div>
              </div>

              {/* Content */}
              <div style={getContentStyle(item.id)}>
                <div style={contentInnerStyle}>
                  {Object.entries(item.specs).map(([key, value]) => (
                    <div key={key} style={specRowStyle}>
                      <div style={specLabelStyle}>{key}</div>
                      <div style={specValueStyle}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              {index < items.length - 1 && <div style={dividerStyle} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
