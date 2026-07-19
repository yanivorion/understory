import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsIconLibrary",
  "description": "Icon library grid with search, categories, and copy functionality",
  "editorElement": {
    "selector": ".branded-elements-icon-library",
    "displayName": "Branded Elements Icon Library",
    "archetype": "container",
    "data": {
      "panelTitle": {
        "dataType": "text",
        "displayName": "Panel Title",
        "defaultValue": "Icon Library",
        "group": "Content"
      },
      "showSearch": {
        "dataType": "booleanValue",
        "displayName": "Show Search",
        "defaultValue": true,
        "group": "Content"
      },
      "showCategories": {
        "dataType": "booleanValue",
        "displayName": "Show Categories",
        "defaultValue": true,
        "group": "Content"
      },
      "showIconNames": {
        "dataType": "booleanValue",
        "displayName": "Show Icon Names",
        "defaultValue": true,
        "group": "Content"
      },
      "gridColumns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "6",
        "options": ["4", "5", "6", "8"],
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
      "iconBackgroundColor": {
        "dataType": "color",
        "displayName": "Icon Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "hoverBackgroundColor": {
        "dataType": "color",
        "displayName": "Hover Background",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#DEE2E6",
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
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [hoveredIcon, setHoveredIcon] = React.useState(null);

  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Icon Library';
  const showSearch = config?.showSearch !== false;
  const showCategories = config?.showCategories !== false;
  const showIconNames = config?.showIconNames !== false;
  const gridColumns = parseInt(config?.gridColumns || '6');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const iconBackgroundColor = config?.iconBackgroundColor || '#F8F9FA';
  const hoverBackgroundColor = config?.hoverBackgroundColor || '#E9ECEF';
  const borderColor = config?.borderColor || '#DEE2E6';
  const fontSize = parseInt(config?.fontSize || '13');

  // Icon library data
  const categories = [
    { id: 'all', name: 'All Icons', count: 18 },
    { id: 'arrows', name: 'Arrows', count: 6 },
    { id: 'interface', name: 'Interface', count: 6 },
    { id: 'social', name: 'Social', count: 6 }
  ];

  const icons = [
    { id: 'arrow-up', name: 'Arrow Up', category: 'arrows', symbol: '↑' },
    { id: 'arrow-down', name: 'Arrow Down', category: 'arrows', symbol: '↓' },
    { id: 'arrow-left', name: 'Arrow Left', category: 'arrows', symbol: '←' },
    { id: 'arrow-right', name: 'Arrow Right', category: 'arrows', symbol: '→' },
    { id: 'chevron-up', name: 'Chevron Up', category: 'arrows', symbol: '⌃' },
    { id: 'chevron-down', name: 'Chevron Down', category: 'arrows', symbol: '⌄' },
    { id: 'close', name: 'Close', category: 'interface', symbol: '×' },
    { id: 'check', name: 'Check', category: 'interface', symbol: '✓' },
    { id: 'plus', name: 'Plus', category: 'interface', symbol: '+' },
    { id: 'minus', name: 'Minus', category: 'interface', symbol: '−' },
    { id: 'search', name: 'Search', category: 'interface', symbol: '⌕' },
    { id: 'settings', name: 'Settings', category: 'interface', symbol: '⚙' },
    { id: 'heart', name: 'Heart', category: 'social', symbol: '♥' },
    { id: 'star', name: 'Star', category: 'social', symbol: '★' },
    { id: 'bookmark', name: 'Bookmark', category: 'social', symbol: '🔖' },
    { id: 'share', name: 'Share', category: 'social', symbol: '⤴' },
    { id: 'download', name: 'Download', category: 'social', symbol: '⬇' },
    { id: 'upload', name: 'Upload', category: 'social', symbol: '⬆' }
  ];

  const filteredIcons = icons.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || icon.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleIconClick = (iconId) => {
    console.log(`Clicked icon: ${iconId}`);
  };

  const containerStyle = {
    backgroundColor,
    padding: '32px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`
  };

  const headerStyle = {
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 12}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '8px'
  };

  const iconCountStyle = {
    fontSize: `${fontSize}px`,
    color: secondaryTextColor
  };

  const searchBarStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: `${fontSize}px`,
    border: `1px solid ${borderColor}`,
    borderRadius: '8px',
    backgroundColor,
    color: textColor,
    marginBottom: '20px',
    fontFamily: 'inherit'
  };

  const categoriesStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '32px',
    flexWrap: 'wrap'
  };

  const getCategoryStyle = (categoryId) => ({
    padding: '8px 16px',
    fontSize: `${fontSize}px`,
    backgroundColor: activeCategory === categoryId ? textColor : iconBackgroundColor,
    color: activeCategory === categoryId ? backgroundColor : textColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    userSelect: 'none'
  });

  const iconsGridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
    gap: '16px'
  };

  const getIconCardStyle = (iconId) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: hoveredIcon === iconId ? hoverBackgroundColor : iconBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    minHeight: '100px'
  });

  const iconSymbolStyle = {
    fontSize: `${fontSize + 24}px`,
    color: textColor,
    marginBottom: showIconNames ? '12px' : '0'
  };

  const iconNameStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    textAlign: 'center'
  };

  return (
    <div className="branded-elements-icon-library" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>{panelTitle}</div>
        <div style={iconCountStyle}>{filteredIcons.length} icons</div>
      </div>

      {/* Search */}
      {showSearch && (
        <input
          type="text"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchBarStyle}
        />
      )}

      {/* Categories */}
      {showCategories && (
        <div style={categoriesStyle}>
          {categories.map((category) => (
            <div
              key={category.id}
              style={getCategoryStyle(category.id)}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name} ({category.count})
            </div>
          ))}
        </div>
      )}

      {/* Icons Grid */}
      <div style={iconsGridStyle}>
        {filteredIcons.map((icon) => (
          <div
            key={icon.id}
            style={getIconCardStyle(icon.id)}
            onMouseEnter={() => setHoveredIcon(icon.id)}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => handleIconClick(icon.id)}
          >
            <div style={iconSymbolStyle}>{icon.symbol}</div>
            {showIconNames && (
              <div style={iconNameStyle}>{icon.name}</div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredIcons.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '48px',
          color: secondaryTextColor,
          fontSize: `${fontSize}px`
        }}>
          No icons found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
