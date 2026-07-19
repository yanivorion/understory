import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsPills",
  "description": "Floating pill-shaped badges with tag-like layout showing element labels",
  "editorElement": {
    "selector": ".branded-elements-pills",
    "displayName": "Branded Elements Pills",
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
      "showIcons": {
        "dataType": "booleanValue",
        "displayName": "Show Icons",
        "defaultValue": true,
        "group": "Content"
      },
      "pillStyle": {
        "dataType": "select",
        "displayName": "Pill Style",
        "defaultValue": "outlined",
        "options": ["outlined", "filled", "minimal"],
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
      "pillBackgroundColor": {
        "dataType": "color",
        "displayName": "Pill Background",
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
  const showIcons = config?.showIcons !== false;
  const pillStyle = config?.pillStyle || 'outlined';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const pillBackgroundColor = config?.pillBackgroundColor || '#F8F9FA';
  const linkColor = config?.linkColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '13');

  // Pills with icons and specs
  const pills = [
    { id: 'h2', label: 'Heading 2', icon: 'H2', specs: '64/72' },
    { id: 'p2', label: 'Paragraph 2', icon: 'P2', specs: '16/20' },
    { id: 'btn', label: 'Primary Button', icon: '●', specs: null },
    { id: 'box', label: 'Box 1', icon: '▢', specs: null },
    { id: 'line', label: 'Line 1', icon: '—', specs: '1px' }
  ];

  const handlePillClick = (pillId) => {
    console.log(`Clicked: ${pillId}`);
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

  const pillsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center'
  };

  const getPillStyle = (pillId) => {
    const isHovered = hoveredItem === pillId;
    
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 18px',
      borderRadius: '24px',
      cursor: 'grab',
      userSelect: 'none',
      transition: 'all 200ms ease-out',
      fontSize: `${fontSize}px`,
      fontWeight: '400'
    };

    if (pillStyle === 'outlined') {
      return {
        ...baseStyle,
        backgroundColor: isHovered ? pillBackgroundColor : 'transparent',
        border: `1px solid ${isHovered ? textColor : borderColor}`,
        color: textColor,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none'
      };
    } else if (pillStyle === 'filled') {
      return {
        ...baseStyle,
        backgroundColor: isHovered ? textColor : pillBackgroundColor,
        border: `1px solid ${isHovered ? textColor : borderColor}`,
        color: isHovered ? backgroundColor : textColor,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 2px 8px rgba(0, 0, 0, 0.12)' : 'none'
      };
    } else { // minimal
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        border: 'none',
        color: isHovered ? textColor : secondaryTextColor,
        textDecoration: isHovered ? 'underline' : 'none'
      };
    }
  };

  const iconStyle = {
    fontSize: `${fontSize + 2}px`,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24px'
  };

  const specsStyle = {
    fontSize: `${fontSize - 2}px`,
    color: secondaryTextColor,
    marginLeft: '4px'
  };

  return (
    <div className="branded-elements-pills" style={containerStyle}>
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

      {/* Pills Container */}
      <div style={pillsContainerStyle}>
        {pills.map((pill) => (
          <div
            key={pill.id}
            style={getPillStyle(pill.id)}
            onMouseEnter={() => setHoveredItem(pill.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handlePillClick(pill.id)}
            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
          >
            {showIcons && <span style={iconStyle}>{pill.icon}</span>}
            <span>{pill.label}</span>
            {pill.specs && <span style={specsStyle}>{pill.specs}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
