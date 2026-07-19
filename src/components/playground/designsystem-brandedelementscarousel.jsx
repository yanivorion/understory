import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsCarousel",
  "description": "Carousel-style lobby with horizontal scrolling cards showing branded elements one at a time",
  "editorElement": {
    "selector": ".branded-elements-carousel",
    "displayName": "Branded Elements Carousel",
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
      "autoPlay": {
        "dataType": "booleanValue",
        "displayName": "Auto Play",
        "defaultValue": false,
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
        "defaultValue": "12px",
        "options": ["0px", "8px", "12px", "16px", "20px"],
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
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Safe config access with defaults
  const sectionTitle = config?.sectionTitle || 'Branded elements';
  const showInfoIcon = config?.showInfoIcon !== false;
  const showSeeAll = config?.showSeeAll !== false;
  const seeAllText = config?.seeAllText || 'See All';
  const autoPlay = config?.autoPlay || false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const cardBackgroundColor = config?.cardBackgroundColor || '#F8F9FA';
  const linkColor = config?.linkColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '14');
  const cornerRadius = config?.cornerRadius || '12px';

  // Carousel items
  const carouselItems = [
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
      specs: '16/20 px • Regular'
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

  // Auto-play effect
  React.useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoPlay, carouselItems.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handleSeeAllClick = () => {
    console.log('See All clicked - navigate to drill-in view');
  };

  const currentItem = carouselItems[currentIndex];

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

  const carouselContainerStyle = {
    position: 'relative',
    padding: '0 48px'
  };

  const cardStyle = {
    backgroundColor: cardBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: cornerRadius,
    padding: '48px 32px',
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'all 300ms ease-out'
  };

  const navButtonStyle = (direction) => ({
    position: 'absolute',
    top: '50%',
    [direction]: '0',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: `1px solid ${borderColor}`,
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '20px',
    color: textColor,
    transition: 'all 200ms ease-out',
    userSelect: 'none'
  });

  const indicatorsStyle = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginTop: '20px'
  };

  const indicatorStyle = (isActive) => ({
    width: isActive ? '24px' : '8px',
    height: '8px',
    borderRadius: '4px',
    backgroundColor: isActive ? textColor : borderColor,
    cursor: 'pointer',
    transition: 'all 200ms ease-out'
  });

  const labelStyle = {
    position: 'absolute',
    top: '16px',
    left: '20px',
    fontSize: '11px',
    color: secondaryTextColor,
    fontWeight: '400',
    letterSpacing: '0.02em'
  };

  const renderContent = () => {
    switch (currentItem.type) {
      case 'heading':
        return (
          <>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: textColor,
              lineHeight: '1.2',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {currentItem.preview}
            </div>
            <div style={{
              fontSize: `${fontSize - 1}px`,
              color: secondaryTextColor
            }}>
              {currentItem.specs}
            </div>
          </>
        );
      
      case 'text':
        return (
          <>
            <div style={{
              fontSize: '16px',
              fontWeight: '400',
              color: textColor,
              lineHeight: '1.5',
              textAlign: 'center',
              maxWidth: '80%',
              marginBottom: '16px'
            }}>
              {currentItem.preview}
            </div>
            <div style={{
              fontSize: `${fontSize - 1}px`,
              color: secondaryTextColor
            }}>
              {currentItem.specs}
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
            backgroundColor: textColor,
            color: backgroundColor,
            cursor: 'pointer'
          }}>
            {currentItem.preview}
          </div>
        );
      
      case 'box':
        return (
          <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: backgroundColor,
            borderRadius: cornerRadius,
            border: `1px solid ${borderColor}`
          }} />
        );
      
      case 'line':
        return (
          <div style={{
            width: '200px',
            height: currentItem.thickness,
            backgroundColor: textColor,
            borderRadius: '1px'
          }} />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="branded-elements-carousel" style={containerStyle}>
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

      {/* Carousel */}
      <div style={carouselContainerStyle}>
        <div style={cardStyle}>
          <div style={labelStyle}>{currentItem.label}</div>
          {renderContent()}
        </div>

        {/* Navigation Buttons */}
        <div
          style={navButtonStyle('left')}
          onClick={handlePrev}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = cardBackgroundColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = backgroundColor;
          }}
        >
          ←
        </div>
        <div
          style={navButtonStyle('right')}
          onClick={handleNext}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = cardBackgroundColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = backgroundColor;
          }}
        >
          →
        </div>
      </div>

      {/* Indicators */}
      <div style={indicatorsStyle}>
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            style={indicatorStyle(index === currentIndex)}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
