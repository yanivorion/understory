import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsKanban",
  "description": "Kanban board layout with element cards organized in category columns",
  "editorElement": {
    "selector": ".branded-elements-kanban",
    "displayName": "Branded Elements Kanban",
    "archetype": "container",
    "data": {
      "sectionTitle": {
        "dataType": "text",
        "displayName": "Section Title",
        "defaultValue": "Design System Elements",
        "group": "Content"
      },
      "showCardCount": {
        "dataType": "booleanValue",
        "displayName": "Show Card Count",
        "defaultValue": true,
        "group": "Content"
      },
      "columnGap": {
        "dataType": "select",
        "displayName": "Column Gap",
        "defaultValue": "16px",
        "options": ["12px", "16px", "20px", "24px"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
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
      "columnBackgroundColor": {
        "dataType": "color",
        "displayName": "Column Background",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
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
  const [hoveredCard, setHoveredCard] = React.useState(null);

  // Safe config access with defaults
  const sectionTitle = config?.sectionTitle || 'Design System Elements';
  const showCardCount = config?.showCardCount !== false;
  const columnGap = config?.columnGap || '16px';
  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const columnBackgroundColor = config?.columnBackgroundColor || '#E9ECEF';
  const cardBackgroundColor = config?.cardBackgroundColor || '#FFFFFF';
  const borderColor = config?.borderColor || '#DEE2E6';
  const fontSize = parseInt(config?.fontSize || '13');

  // Kanban columns with cards
  const columns = [
    {
      id: 'typography',
      title: 'Typography',
      cards: [
        { id: 'h1', name: 'Heading 1', specs: '88/88 • Bold', icon: 'H1' },
        { id: 'h2', name: 'Heading 2', specs: '64/72 • Bold', icon: 'H2' },
        { id: 'p2', name: 'Paragraph 2', specs: '16/20 • Regular', icon: 'P2' }
      ]
    },
    {
      id: 'interactive',
      title: 'Interactive',
      cards: [
        { id: 'btn-primary', name: 'Primary Button', specs: 'Filled variant', icon: '●' },
        { id: 'btn-secondary', name: 'Secondary Button', specs: 'Outlined', icon: '○' }
      ]
    },
    {
      id: 'elements',
      title: 'Elements',
      cards: [
        { id: 'box-1', name: 'Box 1', specs: 'Container', icon: '▢' },
        { id: 'box-2', name: 'Box 2', specs: 'Container', icon: '▣' },
        { id: 'line-1', name: 'Line 1', specs: '1px', icon: '—' }
      ]
    }
  ];

  const handleCardClick = (cardId) => {
    console.log(`Clicked: ${cardId}`);
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

  const columnsContainerStyle = {
    display: 'flex',
    gap: columnGap,
    alignItems: 'flex-start'
  };

  const columnStyle = {
    flex: '1',
    backgroundColor: columnBackgroundColor,
    borderRadius: '12px',
    padding: '16px',
    minWidth: '200px'
  };

  const columnHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  };

  const columnTitleStyle = {
    fontSize: `${fontSize + 1}px`,
    fontWeight: '500',
    color: textColor
  };

  const cardCountStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '2px 8px',
    borderRadius: '12px'
  };

  const cardsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const getCardStyle = (cardId) => ({
    backgroundColor: cardBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '8px',
    padding: '12px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 150ms ease-out',
    transform: hoveredCard === cardId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredCard === cardId
      ? '0 4px 12px rgba(0, 0, 0, 0.1)'
      : '0 1px 3px rgba(0, 0, 0, 0.08)'
  });

  const cardIconStyle = {
    fontSize: `${fontSize + 12}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '8px'
  };

  const cardNameStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '4px'
  };

  const cardSpecsStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor
  };

  return (
    <div className="branded-elements-kanban" style={containerStyle}>
      {/* Title */}
      <div style={titleStyle}>{sectionTitle}</div>

      {/* Columns */}
      <div style={columnsContainerStyle}>
        {columns.map((column) => (
          <div key={column.id} style={columnStyle}>
            {/* Column Header */}
            <div style={columnHeaderStyle}>
              <div style={columnTitleStyle}>{column.title}</div>
              {showCardCount && (
                <div style={cardCountStyle}>{column.cards.length}</div>
              )}
            </div>

            {/* Cards */}
            <div style={cardsContainerStyle}>
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  style={getCardStyle(card.id)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(card.id)}
                  onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                  onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
                >
                  <div style={cardIconStyle}>{card.icon}</div>
                  <div style={cardNameStyle}>{card.name}</div>
                  <div style={cardSpecsStyle}>{card.specs}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
