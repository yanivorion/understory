import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsSplit",
  "description": "Split view layout with category sidebar navigation and detail pane showing selected elements",
  "editorElement": {
    "selector": ".branded-elements-split",
    "displayName": "Branded Elements Split",
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
      "sidebarWidth": {
        "dataType": "select",
        "displayName": "Sidebar Width",
        "defaultValue": "200px",
        "options": ["160px", "200px", "240px"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "sidebarBackgroundColor": {
        "dataType": "color",
        "displayName": "Sidebar Background",
        "defaultValue": "#F8F9FA",
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
      "activeColor": {
        "dataType": "color",
        "displayName": "Active Color",
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
  const [activeCategory, setActiveCategory] = React.useState('Typography');
  const [hoveredItem, setHoveredItem] = React.useState(null);

  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Branded elements';
  const showInfoIcon = config?.showInfoIcon !== false;
  const sidebarWidth = config?.sidebarWidth || '200px';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const sidebarBackgroundColor = config?.sidebarBackgroundColor || '#F8F9FA';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const activeColor = config?.activeColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '14');
  const fontWeight = config?.fontWeight || '400';

  // Categories with counts
  const categories = [
    { id: 'Typography', name: 'Typography', count: 9, icon: 'Aa' },
    { id: 'Colors', name: 'Colors', count: 5, icon: '●' },
    { id: 'Buttons', name: 'Buttons', count: 3, icon: '▭' },
    { id: 'Boxes', name: 'Boxes', count: 2, icon: '▢' },
    { id: 'Lines', name: 'Lines', count: 2, icon: '—' }
  ];

  // All elements organized by category
  const elementsByCategory = {
    Typography: [
      { id: 'h1', name: 'Heading 1', specs: '88/88 • Bold', preview: 'Heading 1' },
      { id: 'h2', name: 'Heading 2', specs: '64/72 • Bold', preview: 'Heading 2' },
      { id: 'h3', name: 'Heading 3', specs: '56/64 • Medium', preview: 'Heading 3' },
      { id: 'h4', name: 'Heading 4', specs: '48/52 • Regular', preview: 'Heading 4' },
      { id: 'h5', name: 'Heading 5', specs: '32/40 • Regular', preview: 'Heading 5' },
      { id: 'h6', name: 'Heading 6', specs: '24/30 • Regular', preview: 'Heading 6' },
      { id: 'p1', name: 'Paragraph 1', specs: '20/26 • Regular', preview: 'Sample paragraph text' },
      { id: 'p2', name: 'Paragraph 2', specs: '16/20 • Regular', preview: 'Sample paragraph text' },
      { id: 'p3', name: 'Paragraph 3', specs: '14/18 • Regular', preview: 'Sample paragraph text' }
    ],
    Colors: [
      { id: 'color-1', hex: '#212529' },
      { id: 'color-2', hex: '#495057' },
      { id: 'color-3', hex: '#ADB5BD' },
      { id: 'color-4', hex: '#E9ECEF' },
      { id: 'color-5', hex: '#F8F9FA' }
    ],
    Buttons: [
      { id: 'btn-primary', name: 'Primary', variant: 'filled' },
      { id: 'btn-secondary', name: 'Secondary', variant: 'outlined' },
      { id: 'btn-tertiary', name: 'Tertiary', variant: 'text' }
    ],
    Boxes: [
      { id: 'box-1', name: 'Box 1', variant: 'filled' },
      { id: 'box-2', name: 'Box 2', variant: 'outlined' }
    ],
    Lines: [
      { id: 'line-1', name: 'Line 1', thickness: '1px' },
      { id: 'line-2', name: 'Line 2', thickness: '3px' }
    ]
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

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
    display: 'flex',
    height: '100vh',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight
  };

  const sidebarStyle = {
    width: sidebarWidth,
    backgroundColor: sidebarBackgroundColor,
    borderRight: `1px solid ${borderColor}`,
    padding: '24px 16px',
    flexShrink: 0,
    overflowY: 'auto'
  };

  const sidebarTitleStyle = {
    fontSize: `${fontSize + 2}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '20px',
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

  const getCategoryItemStyle = (categoryId) => ({
    padding: '10px 12px',
    marginBottom: '4px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: activeCategory === categoryId ? backgroundColor : 'transparent',
    border: `1px solid ${activeCategory === categoryId ? borderColor : 'transparent'}`,
    transition: 'all 150ms ease-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none'
  });

  const categoryLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const categoryIconStyle = {
    fontSize: '16px',
    color: textColor
  };

  const categoryNameStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '400',
    color: textColor
  };

  const categoryCountStyle = {
    fontSize: `${fontSize - 2}px`,
    color: secondaryTextColor,
    backgroundColor: backgroundColor,
    padding: '2px 8px',
    borderRadius: '10px'
  };

  const mainContentStyle = {
    flex: 1,
    padding: '24px',
    overflowY: 'auto'
  };

  const contentHeaderStyle = {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${borderColor}`
  };

  const contentTitleStyle = {
    fontSize: `${fontSize + 6}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '4px'
  };

  const contentSubtitleStyle = {
    fontSize: `${fontSize}px`,
    color: secondaryTextColor
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: activeCategory === 'Typography' ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px'
  };

  const getCardStyle = (itemId) => ({
    backgroundColor: hoveredItem === itemId ? sidebarBackgroundColor : backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '12px',
    padding: '20px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 200ms ease-out',
    transform: hoveredItem === itemId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredItem === itemId
      ? '0 4px 12px rgba(0, 0, 0, 0.08)'
      : '0 1px 3px rgba(0, 0, 0, 0.06)'
  });

  const renderTypography = (item) => (
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
        fontSize: '11px',
        color: secondaryTextColor,
        marginBottom: '8px'
      }}>
        {item.specs}
      </div>
      <div style={{
        fontSize: '28px',
        fontWeight: getWeightValue(item.specs),
        color: textColor,
        lineHeight: '1.2'
      }}>
        {item.preview}
      </div>
    </div>
  );

  const renderColor = (item) => (
    <div
      key={item.id}
      style={{
        ...getCardStyle(item.id),
        padding: '0',
        overflow: 'hidden',
        aspectRatio: '1 / 1'
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
        alignItems: 'flex-end',
        padding: '12px'
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
  );

  const renderButton = (item) => (
    <div
      key={item.id}
      style={{
        ...getCardStyle(item.id),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        minHeight: '120px',
        justifyContent: 'center'
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
        justifyContent: 'center',
        padding: '10px 24px',
        borderRadius: '24px',
        fontSize: `${fontSize}px`,
        fontWeight: '500',
        backgroundColor: item.variant === 'filled' ? textColor : 'transparent',
        color: item.variant === 'filled' ? backgroundColor : textColor,
        border: item.variant === 'outlined' ? `2px solid ${textColor}` : 'none',
        textDecoration: item.variant === 'text' ? 'underline' : 'none'
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
  );

  const renderBox = (item) => (
    <div
      key={item.id}
      style={{
        ...getCardStyle(item.id),
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        flex: 1,
        backgroundColor: item.variant === 'filled' ? sidebarBackgroundColor : 'transparent',
        border: item.variant === 'outlined' ? `2px solid ${borderColor}` : `1px solid ${borderColor}`,
        borderRadius: '8px'
      }} />
      <div style={{
        fontSize: '11px',
        color: secondaryTextColor,
        textAlign: 'center'
      }}>
        {item.name}
      </div>
    </div>
  );

  const renderLine = (item) => (
    <div
      key={item.id}
      style={{
        ...getCardStyle(item.id),
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item.id)}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <div style={{
        width: '80%',
        height: item.thickness,
        backgroundColor: textColor,
        borderRadius: '1px'
      }} />
      <div style={{
        fontSize: '11px',
        color: secondaryTextColor
      }}>
        {item.name} • {item.thickness}
      </div>
    </div>
  );

  const renderContent = () => {
    const items = elementsByCategory[activeCategory] || [];
    
    if (activeCategory === 'Typography') {
      return items.map(renderTypography);
    } else if (activeCategory === 'Colors') {
      return items.map(renderColor);
    } else if (activeCategory === 'Buttons') {
      return items.map(renderButton);
    } else if (activeCategory === 'Boxes') {
      return items.map(renderBox);
    } else if (activeCategory === 'Lines') {
      return items.map(renderLine);
    }
  };

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="branded-elements-split" style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={sidebarTitleStyle}>
          {panelTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Branded design system elements">i</span>
          )}
        </div>

        {/* Category Navigation */}
        <div>
          {categories.map((category) => (
            <div
              key={category.id}
              style={getCategoryItemStyle(category.id)}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div style={categoryLeftStyle}>
                <span style={categoryIconStyle}>{category.icon}</span>
                <span style={categoryNameStyle}>{category.name}</span>
              </div>
              <span style={categoryCountStyle}>{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        <div style={contentHeaderStyle}>
          <div style={contentTitleStyle}>{currentCategory?.name}</div>
          <div style={contentSubtitleStyle}>
            {currentCategory?.count} {currentCategory?.count === 1 ? 'element' : 'elements'}
          </div>
        </div>

        <div style={gridStyle}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
