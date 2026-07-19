import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsFlipCards",
  "description": "Card deck with flip animation revealing element details on click",
  "editorElement": {
    "selector": ".branded-elements-flip-cards",
    "displayName": "Branded Elements Flip Cards",
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
      "autoFlipOnHover": {
        "dataType": "booleanValue",
        "displayName": "Auto Flip on Hover",
        "defaultValue": false,
        "group": "Content",
        "description": "Flip cards on hover instead of click"
      },
      "gridColumns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
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
      "frontBackgroundColor": {
        "dataType": "color",
        "displayName": "Front Card Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "backBackgroundColor": {
        "dataType": "color",
        "displayName": "Back Card Background",
        "defaultValue": "#495057",
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
        "defaultValue": "16px",
        "options": ["8px", "12px", "16px", "20px"],
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
  const [flippedCards, setFlippedCards] = React.useState(new Set());

  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Branded elements';
  const showInfoIcon = config?.showInfoIcon !== false;
  const autoFlipOnHover = config?.autoFlipOnHover || false;
  const gridColumns = parseInt(config?.gridColumns || '3');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const frontBackgroundColor = config?.frontBackgroundColor || '#F8F9FA';
  const backBackgroundColor = config?.backBackgroundColor || '#495057';
  const borderColor = config?.borderColor || '#E9ECEF';
  const fontSize = parseInt(config?.fontSize || '14');
  const fontWeight = config?.fontWeight || '400';
  const cornerRadius = config?.cornerRadius || '16px';

  // Cards with front and back content
  const cards = [
    {
      id: 'h1',
      category: 'Typography',
      front: { label: 'Heading 1', preview: 'H1' },
      back: { size: '88px', lineHeight: '88px', weight: 'Bold', usage: 'Hero sections, page titles' }
    },
    {
      id: 'h2',
      category: 'Typography',
      front: { label: 'Heading 2', preview: 'H2' },
      back: { size: '64px', lineHeight: '72px', weight: 'Bold', usage: 'Section headers' }
    },
    {
      id: 'h3',
      category: 'Typography',
      front: { label: 'Heading 3', preview: 'H3' },
      back: { size: '56px', lineHeight: '64px', weight: 'Medium', usage: 'Subsection headers' }
    },
    {
      id: 'p1',
      category: 'Typography',
      front: { label: 'Paragraph 1', preview: 'P1' },
      back: { size: '20px', lineHeight: '26px', weight: 'Regular', usage: 'Large body text' }
    },
    {
      id: 'p2',
      category: 'Typography',
      front: { label: 'Paragraph 2', preview: 'P2' },
      back: { size: '16px', lineHeight: '20px', weight: 'Regular', usage: 'Standard body text' }
    },
    {
      id: 'btn-primary',
      category: 'Buttons',
      front: { label: 'Primary Button', preview: '●' },
      back: { variant: 'Filled', usage: 'Primary actions, CTAs', state: 'Interactive' }
    },
    {
      id: 'btn-secondary',
      category: 'Buttons',
      front: { label: 'Secondary Button', preview: '○' },
      back: { variant: 'Outlined', usage: 'Secondary actions', state: 'Interactive' }
    },
    {
      id: 'box-1',
      category: 'Elements',
      front: { label: 'Box 1', preview: '▢' },
      back: { type: 'Container', variant: 'Filled', usage: 'Content containers' }
    },
    {
      id: 'line-1',
      category: 'Elements',
      front: { label: 'Line 1', preview: '—' },
      back: { thickness: '1px', usage: 'Dividers, separators', style: 'Solid' }
    }
  ];

  const handleCardClick = (cardId) => {
    if (!autoFlipOnHover) {
      setFlippedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(cardId)) {
          newSet.delete(cardId);
        } else {
          newSet.add(cardId);
        }
        return newSet;
      });
    }
  };

  const handleCardHover = (cardId, isEntering) => {
    if (autoFlipOnHover) {
      setFlippedCards(prev => {
        const newSet = new Set(prev);
        if (isEntering) {
          newSet.add(cardId);
        } else {
          newSet.delete(cardId);
        }
        return newSet;
      });
    }
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
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 8}px`,
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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
    gap: '20px'
  };

  const cardContainerStyle = {
    perspective: '1000px',
    height: '240px',
    cursor: 'pointer'
  };

  const getCardInnerStyle = (isFlipped) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
  });

  const cardFaceStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: cornerRadius,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${borderColor}`,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
  };

  const frontStyle = {
    ...cardFaceStyle,
    backgroundColor: frontBackgroundColor
  };

  const backStyle = {
    ...cardFaceStyle,
    backgroundColor: backBackgroundColor,
    color: '#FFFFFF',
    transform: 'rotateY(180deg)'
  };

  const categoryBadgeStyle = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    fontSize: '10px',
    fontWeight: '500',
    color: secondaryTextColor,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const previewStyle = {
    fontSize: '48px',
    fontWeight: '700',
    color: textColor,
    marginBottom: '12px'
  };

  const labelStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    color: textColor
  };

  const backContentStyle = {
    width: '100%',
    textAlign: 'left'
  };

  const backRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const backLabelStyle = {
    fontSize: '11px',
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const backValueStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '500'
  };

  const backUsageStyle = {
    fontSize: `${fontSize - 1}px`,
    lineHeight: '1.5',
    opacity: 0.9,
    marginTop: '12px'
  };

  return (
    <div className="branded-elements-flip-cards" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {panelTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Click cards to flip and see details">i</span>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div style={gridStyle}>
        {cards.map((card) => {
          const isFlipped = flippedCards.has(card.id);
          
          return (
            <div
              key={card.id}
              style={cardContainerStyle}
              onClick={() => handleCardClick(card.id)}
              onMouseEnter={() => handleCardHover(card.id, true)}
              onMouseLeave={() => handleCardHover(card.id, false)}
            >
              <div style={getCardInnerStyle(isFlipped)}>
                {/* Front */}
                <div style={frontStyle}>
                  <div style={categoryBadgeStyle}>{card.category}</div>
                  <div style={previewStyle}>{card.front.preview}</div>
                  <div style={labelStyle}>{card.front.label}</div>
                </div>

                {/* Back */}
                <div style={backStyle}>
                  <div style={backContentStyle}>
                    {card.back.size && (
                      <>
                        <div style={backRowStyle}>
                          <span style={backLabelStyle}>Font Size</span>
                          <span style={backValueStyle}>{card.back.size}</span>
                        </div>
                        <div style={backRowStyle}>
                          <span style={backLabelStyle}>Line Height</span>
                          <span style={backValueStyle}>{card.back.lineHeight}</span>
                        </div>
                        <div style={backRowStyle}>
                          <span style={backLabelStyle}>Weight</span>
                          <span style={backValueStyle}>{card.back.weight}</span>
                        </div>
                      </>
                    )}
                    {card.back.variant && (
                      <div style={backRowStyle}>
                        <span style={backLabelStyle}>Variant</span>
                        <span style={backValueStyle}>{card.back.variant}</span>
                      </div>
                    )}
                    {card.back.type && (
                      <div style={backRowStyle}>
                        <span style={backLabelStyle}>Type</span>
                        <span style={backValueStyle}>{card.back.type}</span>
                      </div>
                    )}
                    {card.back.thickness && (
                      <div style={backRowStyle}>
                        <span style={backLabelStyle}>Thickness</span>
                        <span style={backValueStyle}>{card.back.thickness}</span>
                      </div>
                    )}
                    {card.back.usage && (
                      <div style={backUsageStyle}>
                        <div style={backLabelStyle}>Usage</div>
                        <div style={{ marginTop: '4px' }}>{card.back.usage}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
