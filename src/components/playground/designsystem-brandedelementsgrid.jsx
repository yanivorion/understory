import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsGrid",
  "description": "Grid layout of branded elements with equal 1:1 aspect ratio cells",
  "editorElement": {
    "selector": ".branded-elements-grid",
    "displayName": "Branded Elements Grid",
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
      "gridColumns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4", "5"],
        "group": "Layout",
        "description": "Number of columns in grid"
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
        "defaultValue": 14,
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
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "16px",
        "options": ["12px", "16px", "20px", "24px"],
        "group": "Layout"
      },
      "gridGap": {
        "dataType": "select",
        "displayName": "Grid Gap",
        "defaultValue": "12px",
        "options": ["8px", "12px", "16px", "20px", "24px"],
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
  const gridColumns = parseInt(config?.gridColumns || '3');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const hoverBackgroundColor = config?.hoverBackgroundColor || '#F8F9FA';
  const linkColor = config?.linkColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '14');
  const fontWeight = config?.fontWeight || '400';
  const cornerRadius = config?.cornerRadius || '8px';
  const cardPadding = config?.cardPadding || '16px';
  const gridGap = config?.gridGap || '12px';

  // Grid items with scaled content for 1:1 cells
  const gridItems = [
    {
      id: 'heading-2',
      type: 'heading',
      label: 'Heading 2',
      preview: 'Fresh Perspectives',
      specs: '64/72 px'
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
      label: 'Primary',
      preview: 'Button'
    },
    {
      id: 'box-1',
      type: 'box',
      label: 'Box 1',
      preview: null
    },
    {
      id: 'line-1',
      type: 'line',
      label: 'Line 1',
      thickness: '1px',
      specs: '1px'
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
    fontWeight
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
    cursor: 'pointer',
    transition: 'opacity 200ms ease-out'
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
    gap: gridGap,
    marginBottom: gridGap
  };

  const getCardStyle = (itemId) => ({
    backgroundColor: hoveredItem === itemId ? hoverBackgroundColor : backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: cornerRadius,
    padding: cardPadding,
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    transform: hoveredItem === itemId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredItem === itemId 
      ? '0 4px 12px rgba(0, 0, 0, 0.08)' 
      : '0 1px 3px rgba(0, 0, 0, 0.06)',
    aspectRatio: '1 / 1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative'
  });

  const labelStyle = {
    fontSize: '11px',
    color: secondaryTextColor,
    fontWeight: '400',
    letterSpacing: '0.02em',
    position: 'absolute',
    bottom: '12px',
    left: '12px',
    right: '12px',
    textAlign: 'center'
  };

  const renderHeading = (item) => (
    <div
      key={item.id}
      style={getCardStyle(item.id)}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        fontSize: '24px',
        fontWeight: '700',
        color: textColor,
        lineHeight: '1.2',
        textAlign: 'center',
        maxWidth: '90%'
      }}>
        {item.preview}
      </div>
      <div style={labelStyle}>
        {item.label} • {item.specs}
      </div>
    </div>
  );

  const renderText = (item) => (
    <div
      key={item.id}
      style={getCardStyle(item.id)}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        fontSize: '12px',
        fontWeight: '400',
        color: textColor,
        lineHeight: '1.4',
        textAlign: 'center',
        maxWidth: '90%',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical'
      }}>
        {item.preview}
      </div>
      <div style={labelStyle}>
        {item.label} • {item.specs}
      </div>
    </div>
  );

  const renderButton = (item) => (
    <div
      key={item.id}
      style={getCardStyle(item.id)}
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
        padding: '10px 24px',
        borderRadius: '24px',
        fontSize: `${fontSize}px`,
        fontWeight: '500',
        backgroundColor: textColor,
        color: backgroundColor,
        cursor: 'pointer'
      }}>
        {item.preview}
      </div>
      <div style={labelStyle}>
        {item.label}
      </div>
    </div>
  );

  const renderBox = (item) => (
    <div
      key={item.id}
      style={getCardStyle(item.id)}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        width: '60%',
        height: '60%',
        backgroundColor: hoverBackgroundColor,
        borderRadius: cornerRadius,
        border: `1px solid ${borderColor}`
      }} />
      <div style={labelStyle}>
        {item.label}
      </div>
    </div>
  );

  const renderLine = (item) => (
    <div
      key={item.id}
      style={getCardStyle(item.id)}
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
        {item.label} • {item.specs}
      </div>
    </div>
  );

  const renderItem = (item) => {
    switch (item.type) {
      case 'heading':
        return renderHeading(item);
      case 'text':
        return renderText(item);
      case 'button':
        return renderButton(item);
      case 'box':
        return renderBox(item);
      case 'line':
        return renderLine(item);
      default:
        return null;
    }
  };

  return (
    <div className="branded-elements-grid" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {sectionTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Branded design system elements">i</span>
          )}
        </div>
        {showSeeAll && (
          <a 
            style={seeAllStyle}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            onClick={handleSeeAllClick}
          >
            {seeAllText}
          </a>
        )}
      </div>

      {/* 1:1 Grid */}
      <div style={gridContainerStyle}>
        {gridItems.map((item) => renderItem(item))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
