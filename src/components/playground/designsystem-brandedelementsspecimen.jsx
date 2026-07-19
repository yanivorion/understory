import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsSpecimen",
  "description": "Large typography specimen sheet showing weight variations and character specimens",
  "editorElement": {
    "selector": ".branded-elements-specimen",
    "displayName": "Branded Elements Specimen",
    "archetype": "container",
    "data": {
      "panelTitle": {
        "dataType": "text",
        "displayName": "Panel Title",
        "defaultValue": "Typography",
        "group": "Content"
      },
      "showWeightLabels": {
        "dataType": "booleanValue",
        "displayName": "Show Weight Labels",
        "defaultValue": true,
        "group": "Content"
      },
      "specimenCharacter": {
        "dataType": "text",
        "displayName": "Specimen Character",
        "defaultValue": "a",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#3D4F6D",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#B8C5D9",
        "group": "Colors"
      },
      "dividerColor": {
        "dataType": "color",
        "displayName": "Divider Color",
        "defaultValue": "#5A6F8E",
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
  const [hoveredWeight, setHoveredWeight] = React.useState(null);

  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Typography';
  const showWeightLabels = config?.showWeightLabels !== false;
  const specimenCharacter = config?.specimenCharacter || 'a';
  const backgroundColor = config?.backgroundColor || '#3D4F6D';
  const textColor = config?.textColor || '#FFFFFF';
  const secondaryTextColor = config?.secondaryTextColor || '#B8C5D9';
  const dividerColor = config?.dividerColor || '#5A6F8E';
  const fontSize = parseInt(config?.fontSize || '14');

  // Weight specimens
  const weights = [
    { name: 'Ultra Light', style: 'Italic', variant: 'Condensed', subVariant: 'Italic', weight: '200', value: 200 },
    { name: 'Light', style: 'Italic', variant: 'Condensed', subVariant: 'Italic', weight: '300', value: 300 },
    { name: 'Regular', style: 'Italic', variant: 'Condensed', subVariant: 'Italic', weight: '400', value: 400 },
    { name: 'Medium', style: 'Italic', variant: 'Condensed', subVariant: 'Italic', weight: '500', value: 500 },
    { name: 'Bold', style: 'Italic', variant: 'Condensed', subVariant: 'Italic', weight: '700', value: 700 },
    { name: 'Heavy', style: 'Italic', variant: 'Condensed', subVariant: 'Italic', weight: '800', value: 800 },
    { name: 'Black', style: 'Italic', variant: 'Condensed', subVariant: 'Italic', weight: '900', value: 900 }
  ];

  const containerStyle = {
    backgroundColor,
    padding: '48px 32px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    minHeight: '100vh'
  };

  const titleStyle = {
    fontSize: `${fontSize + 48}px`,
    fontWeight: '400',
    color: textColor,
    marginBottom: '48px',
    textDecoration: 'underline',
    textUnderlineOffset: '8px'
  };

  const specimensContainerStyle = {
    display: 'flex',
    gap: '0',
    marginBottom: '48px',
    borderTop: `1px solid ${dividerColor}`,
    borderBottom: `1px solid ${dividerColor}`,
    padding: '32px 0'
  };

  const getSpecimenColumnStyle = (weight) => ({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: `1px solid ${dividerColor}`,
    padding: '24px 16px',
    cursor: 'pointer',
    transition: 'all 200ms ease-out',
    backgroundColor: hoveredWeight === weight.value ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    ':last-child': {
      borderRight: 'none'
    }
  });

  const weightLabelContainerStyle = {
    textAlign: 'center',
    marginBottom: '24px'
  };

  const weightNameStyle = {
    fontSize: `${fontSize + 2}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '4px'
  };

  const weightStyleStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '400',
    color: secondaryTextColor,
    fontStyle: 'italic',
    marginBottom: '2px'
  };

  const weightVariantStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    fontWeight: '500'
  };

  const weightSubVariantStyle = {
    fontSize: `${fontSize - 2}px`,
    color: secondaryTextColor,
    fontStyle: 'italic'
  };

  const getSpecimenCharacterStyle = (weight) => ({
    fontSize: '180px',
    fontWeight: weight.toString(),
    color: textColor,
    lineHeight: '1',
    fontFeatureSettings: '"liga" 1, "kern" 1'
  });

  const detailsSectionStyle = {
    marginTop: '48px'
  };

  const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '24px'
  };

  const detailCardStyle = {
    padding: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    border: `1px solid ${dividerColor}`
  };

  const detailLabelStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  };

  const detailValueStyle = {
    fontSize: `${fontSize + 8}px`,
    fontWeight: '500',
    color: textColor
  };

  return (
    <div className="branded-elements-specimen" style={containerStyle}>
      {/* Title */}
      <div style={titleStyle}>{panelTitle}</div>

      {/* Large Specimens */}
      <div style={specimensContainerStyle}>
        {weights.map((weight) => (
          <div
            key={weight.value}
            style={getSpecimenColumnStyle(weight)}
            onMouseEnter={() => setHoveredWeight(weight.value)}
            onMouseLeave={() => setHoveredWeight(null)}
          >
            {showWeightLabels && (
              <div style={weightLabelContainerStyle}>
                <div style={weightNameStyle}>{weight.name}</div>
                <div style={weightStyleStyle}>{weight.style}</div>
                <div style={weightVariantStyle}>{weight.variant}</div>
                <div style={weightSubVariantStyle}>{weight.subVariant}</div>
              </div>
            )}
            <div style={getSpecimenCharacterStyle(weight.value)}>
              {specimenCharacter}
            </div>
          </div>
        ))}
      </div>

      {/* Details Grid */}
      <div style={detailsSectionStyle}>
        <div style={detailsGridStyle}>
          {weights.map((weight) => (
            <div key={weight.value} style={detailCardStyle}>
              <div style={detailLabelStyle}>{weight.name}</div>
              <div style={detailValueStyle}>{weight.weight}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
