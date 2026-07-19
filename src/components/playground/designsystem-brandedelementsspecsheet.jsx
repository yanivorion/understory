import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsSpecSheet",
  "description": "Technical specification sheet view with detailed typography documentation and expanded information",
  "editorElement": {
    "selector": ".branded-elements-spec-sheet",
    "displayName": "Branded Elements Spec Sheet",
    "archetype": "container",
    "data": {
      "panelTitle": {
        "dataType": "text",
        "displayName": "Panel Title",
        "defaultValue": "Typography Specification",
        "group": "Content"
      },
      "showInfoIcon": {
        "dataType": "booleanValue",
        "displayName": "Show Info Icon",
        "defaultValue": true,
        "group": "Content"
      },
      "showCSSProperties": {
        "dataType": "booleanValue",
        "displayName": "Show CSS Properties",
        "defaultValue": true,
        "group": "Content"
      },
      "showUsageNotes": {
        "dataType": "booleanValue",
        "displayName": "Show Usage Notes",
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
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "codeBackgroundColor": {
        "dataType": "color",
        "displayName": "Code Background Color",
        "defaultValue": "#F8F9FA",
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
        "defaultValue": 13,
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
  const [expandedItem, setExpandedItem] = React.useState('h1');

  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Typography Specification';
  const showInfoIcon = config?.showInfoIcon !== false;
  const showCSSProperties = config?.showCSSProperties !== false;
  const showUsageNotes = config?.showUsageNotes !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const codeBackgroundColor = config?.codeBackgroundColor || '#F8F9FA';
  const accentColor = config?.accentColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '13');
  const fontWeight = config?.fontWeight || '400';

  // Typography specifications with usage notes
  const typographySpecs = [
    {
      id: 'h1',
      name: 'Heading 1',
      token: 'heading-1',
      size: 88,
      lineHeight: 88,
      weight: 'Bold',
      weightValue: '700',
      letterSpacing: '-0.02em',
      usage: 'Hero sections, main page titles',
      samples: ['The New Standard', 'Innovation Redefined', 'Welcome to the Future']
    },
    {
      id: 'h2',
      name: 'Heading 2',
      token: 'heading-2',
      size: 64,
      lineHeight: 72,
      weight: 'Bold',
      weightValue: '700',
      letterSpacing: '-0.01em',
      usage: 'Section headers, feature titles',
      samples: ['Fresh Perspectives', 'Our Services', 'Latest Updates']
    },
    {
      id: 'h3',
      name: 'Heading 3',
      token: 'heading-3',
      size: 56,
      lineHeight: 64,
      weight: 'Medium',
      weightValue: '500',
      letterSpacing: '-0.01em',
      usage: 'Subsection headers, card titles',
      samples: ['Timeless Design Solutions', 'What We Offer', 'Key Features']
    },
    {
      id: 'h4',
      name: 'Heading 4',
      token: 'heading-4',
      size: 48,
      lineHeight: 52,
      weight: 'Regular',
      weightValue: '400',
      letterSpacing: '0em',
      usage: 'Component headers, list titles',
      samples: ['Protected Travel Benefits', 'Customer Stories', 'Our Process']
    },
    {
      id: 'h5',
      name: 'Heading 5',
      token: 'heading-5',
      size: 32,
      lineHeight: 40,
      weight: 'Regular',
      weightValue: '400',
      letterSpacing: '0em',
      usage: 'Small headers, category labels',
      samples: ['Team Introduction', 'Pricing Plans', 'Contact Information']
    },
    {
      id: 'h6',
      name: 'Heading 6',
      token: 'heading-6',
      size: 24,
      lineHeight: 30,
      weight: 'Regular',
      weightValue: '400',
      letterSpacing: '0em',
      usage: 'Micro headers, form section labels',
      samples: ['Service Details', 'Quick Links', 'Social Media']
    },
    {
      id: 'p1',
      name: 'Paragraph 1',
      token: 'paragraph-1',
      size: 20,
      lineHeight: 26,
      weight: 'Regular',
      weightValue: '400',
      letterSpacing: '0em',
      usage: 'Large body text, introductions',
      samples: ['This is the space to introduce the Services section and provide context.']
    },
    {
      id: 'p2',
      name: 'Paragraph 2',
      token: 'paragraph-2',
      size: 16,
      lineHeight: 20,
      weight: 'Regular',
      weightValue: '400',
      letterSpacing: '0em',
      usage: 'Standard body text, descriptions',
      samples: ['Use this for main content paragraphs and detailed descriptions.']
    },
    {
      id: 'p3',
      name: 'Paragraph 3',
      token: 'paragraph-3',
      size: 14,
      lineHeight: 18,
      weight: 'Regular',
      weightValue: '400',
      letterSpacing: '0em',
      usage: 'Small text, captions, metadata',
      samples: ['Small print, captions, and supplementary information.']
    }
  ];

  const containerStyle = {
    backgroundColor,
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight
  };

  const headerStyle = {
    marginBottom: '32px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${borderColor}`
  };

  const titleStyle = {
    fontSize: `${fontSize + 6}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '8px',
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

  const subtitleStyle = {
    fontSize: `${fontSize}px`,
    color: secondaryTextColor,
    fontWeight: '400'
  };

  const specItemStyle = (isExpanded) => ({
    border: `1px solid ${isExpanded ? accentColor : borderColor}`,
    borderRadius: '8px',
    marginBottom: '16px',
    transition: 'all 200ms ease-out',
    backgroundColor: isExpanded ? backgroundColor : 'transparent'
  });

  const specHeaderStyle = {
    padding: '16px 20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none'
  };

  const specNameStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const tokenBadgeStyle = {
    fontSize: '11px',
    fontWeight: '500',
    color: accentColor,
    backgroundColor: codeBackgroundColor,
    padding: '4px 8px',
    borderRadius: '4px',
    fontFamily: 'monospace'
  };

  const specValuesStyle = {
    display: 'flex',
    gap: '16px',
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor
  };

  const specBodyStyle = {
    borderTop: `1px solid ${borderColor}`,
    padding: '20px'
  };

  const previewSectionStyle = {
    marginBottom: '24px'
  };

  const previewLabelStyle = {
    fontSize: '11px',
    fontWeight: '500',
    color: secondaryTextColor,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px'
  };

  const previewTextStyle = (spec) => ({
    fontSize: `${Math.min(spec.size, 56)}px`,
    lineHeight: `${Math.min(spec.lineHeight, 64)}px`,
    fontWeight: spec.weightValue,
    color: textColor,
    letterSpacing: spec.letterSpacing,
    marginBottom: '8px'
  });

  const propsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '20px'
  };

  const propItemStyle = {
    backgroundColor: codeBackgroundColor,
    padding: '12px',
    borderRadius: '6px'
  };

  const propLabelStyle = {
    fontSize: '11px',
    fontWeight: '500',
    color: secondaryTextColor,
    marginBottom: '4px'
  };

  const propValueStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: '400',
    color: textColor,
    fontFamily: 'monospace'
  };

  const usageBoxStyle = {
    backgroundColor: codeBackgroundColor,
    padding: '12px 16px',
    borderRadius: '6px',
    borderLeft: `3px solid ${accentColor}`
  };

  const usageLabelStyle = {
    fontSize: '11px',
    fontWeight: '500',
    color: accentColor,
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const usageTextStyle = {
    fontSize: `${fontSize}px`,
    color: textColor
  };

  return (
    <div className="branded-elements-spec-sheet" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {panelTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Technical typography specifications">i</span>
          )}
        </div>
        <div style={subtitleStyle}>
          Design tokens and implementation guidelines
        </div>
      </div>

      {/* Typography Specifications */}
      <div>
        {typographySpecs.map((spec) => {
          const isExpanded = expandedItem === spec.id;
          
          return (
            <div key={spec.id} style={specItemStyle(isExpanded)}>
              {/* Header */}
              <div
                style={specHeaderStyle}
                onClick={() => setExpandedItem(isExpanded ? null : spec.id)}
              >
                <div style={specNameStyle}>
                  <span style={{ fontSize: `${fontSize + 2}px`, fontWeight: '500' }}>
                    {spec.name}
                  </span>
                  <span style={tokenBadgeStyle}>
                    {spec.token}
                  </span>
                </div>
                <div style={specValuesStyle}>
                  <span>{spec.size}px</span>
                  <span>•</span>
                  <span>{spec.weight}</span>
                  <span style={{
                    fontSize: '16px',
                    color: textColor,
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 200ms ease-out'
                  }}>
                    ▼
                  </span>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div style={specBodyStyle}>
                  {/* Preview Samples */}
                  <div style={previewSectionStyle}>
                    <div style={previewLabelStyle}>Preview Samples</div>
                    {spec.samples.map((sample, index) => (
                      <div key={index} style={previewTextStyle(spec)}>
                        {sample}
                      </div>
                    ))}
                  </div>

                  {/* CSS Properties */}
                  {showCSSProperties && (
                    <div style={previewSectionStyle}>
                      <div style={previewLabelStyle}>CSS Properties</div>
                      <div style={propsGridStyle}>
                        <div style={propItemStyle}>
                          <div style={propLabelStyle}>font-size</div>
                          <div style={propValueStyle}>{spec.size}px</div>
                        </div>
                        <div style={propItemStyle}>
                          <div style={propLabelStyle}>line-height</div>
                          <div style={propValueStyle}>{spec.lineHeight}px</div>
                        </div>
                        <div style={propItemStyle}>
                          <div style={propLabelStyle}>font-weight</div>
                          <div style={propValueStyle}>{spec.weightValue}</div>
                        </div>
                        <div style={propItemStyle}>
                          <div style={propLabelStyle}>letter-spacing</div>
                          <div style={propValueStyle}>{spec.letterSpacing}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Usage Guidelines */}
                  {showUsageNotes && (
                    <div style={usageBoxStyle}>
                      <div style={usageLabelStyle}>Usage Guidelines</div>
                      <div style={usageTextStyle}>{spec.usage}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
