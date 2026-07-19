import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsSpotlight",
  "description": "Spotlight hero layout with large featured element and thumbnail strip navigation",
  "editorElement": {
    "selector": ".branded-elements-spotlight",
    "displayName": "Branded Elements Spotlight",
    "archetype": "container",
    "data": {
      "sectionTitle": {
        "dataType": "text",
        "displayName": "Section Title",
        "defaultValue": "Featured Element",
        "group": "Content"
      },
      "showThumbnails": {
        "dataType": "booleanValue",
        "displayName": "Show Thumbnails",
        "defaultValue": true,
        "group": "Content"
      },
      "showSpecs": {
        "dataType": "booleanValue",
        "displayName": "Show Specifications",
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
      "spotlightBackgroundColor": {
        "dataType": "color",
        "displayName": "Spotlight Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "thumbnailBackgroundColor": {
        "dataType": "color",
        "displayName": "Thumbnail Background",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#DEE2E6",
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
  const sectionTitle = config?.sectionTitle || 'Featured Element';
  const showThumbnails = config?.showThumbnails !== false;
  const showSpecs = config?.showSpecs !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const spotlightBackgroundColor = config?.spotlightBackgroundColor || '#F8F9FA';
  const thumbnailBackgroundColor = config?.thumbnailBackgroundColor || '#E9ECEF';
  const borderColor = config?.borderColor || '#DEE2E6';
  const accentColor = config?.accentColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '14');

  // Elements for spotlight
  const elements = [
    { id: 'h1', name: 'Heading 1', category: 'Typography', specs: '88/88 • Bold', icon: 'H1', preview: 'Hello' },
    { id: 'h2', name: 'Heading 2', category: 'Typography', specs: '64/72 • Bold', icon: 'H2', preview: 'World' },
    { id: 'btn', name: 'Primary Button', category: 'Interactive', specs: 'Filled variant', icon: '●', preview: 'Click' },
    { id: 'box', name: 'Box 1', category: 'Elements', specs: 'Container', icon: '▢', preview: null },
    { id: 'line', name: 'Line 1', category: 'Elements', specs: '1px thickness', icon: '—', preview: null }
  ];

  const activeElement = elements[activeIndex];

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const containerStyle = {
    backgroundColor,
    padding: '32px 24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`
  };

  const titleStyle = {
    fontSize: `${fontSize + 2}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '24px'
  };

  const spotlightContainerStyle = {
    backgroundColor: spotlightBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '16px',
    padding: '48px',
    marginBottom: '24px',
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    transition: 'all 300ms ease-out'
  };

  const spotlightIconStyle = {
    fontSize: '120px',
    fontWeight: '700',
    color: textColor,
    lineHeight: '1'
  };

  const spotlightNameStyle = {
    fontSize: `${fontSize + 12}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '8px'
  };

  const spotlightCategoryStyle = {
    fontSize: `${fontSize}px`,
    color: secondaryTextColor,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '16px'
  };

  const spotlightSpecsStyle = {
    fontSize: `${fontSize + 2}px`,
    color: textColor,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '8px 16px',
    borderRadius: '20px'
  };

  const thumbnailsContainerStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  const getThumbnailStyle = (index) => ({
    width: '80px',
    height: '80px',
    backgroundColor: activeIndex === index ? accentColor : thumbnailBackgroundColor,
    border: `2px solid ${activeIndex === index ? accentColor : borderColor}`,
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 200ms ease-out',
    opacity: activeIndex === index ? 1 : 0.7
  });

  const thumbnailIconStyle = (index) => ({
    fontSize: `${fontSize + 16}px`,
    fontWeight: '500',
    color: activeIndex === index ? '#FFFFFF' : textColor,
    marginBottom: '4px'
  });

  const thumbnailLabelStyle = (index) => ({
    fontSize: '10px',
    color: activeIndex === index ? '#FFFFFF' : secondaryTextColor,
    textAlign: 'center'
  });

  return (
    <div className="branded-elements-spotlight" style={containerStyle}>
      {/* Title */}
      <div style={titleStyle}>{sectionTitle}</div>

      {/* Spotlight */}
      <div style={spotlightContainerStyle}>
        <div style={spotlightIconStyle}>{activeElement.icon}</div>
        <div>
          <div style={spotlightNameStyle}>{activeElement.name}</div>
          <div style={spotlightCategoryStyle}>{activeElement.category}</div>
          {showSpecs && (
            <div style={spotlightSpecsStyle}>{activeElement.specs}</div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div style={thumbnailsContainerStyle}>
          {elements.map((element, index) => (
            <div
              key={element.id}
              style={getThumbnailStyle(index)}
              onClick={() => handleThumbnailClick(index)}
            >
              <div style={thumbnailIconStyle(index)}>{element.icon}</div>
              <div style={thumbnailLabelStyle(index)}>{element.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
