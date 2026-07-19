import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsTokens",
  "description": "Design token table with visual representations showing spacing, typography, and color tokens",
  "editorElement": {
    "selector": ".branded-elements-tokens",
    "displayName": "Branded Elements Tokens",
    "archetype": "container",
    "data": {
      "panelTitle": {
        "dataType": "text",
        "displayName": "Panel Title",
        "defaultValue": "Design Tokens",
        "group": "Content"
      },
      "showVisualPreview": {
        "dataType": "booleanValue",
        "displayName": "Show Visual Preview",
        "defaultValue": true,
        "group": "Content"
      },
      "tokenCategory": {
        "dataType": "select",
        "displayName": "Token Category",
        "defaultValue": "all",
        "options": ["all", "spacing", "typography", "colors"],
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F5F5F5",
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
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#8B5CF6",
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
  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Design Tokens';
  const showVisualPreview = config?.showVisualPreview !== false;
  const tokenCategory = config?.tokenCategory || 'all';
  const backgroundColor = config?.backgroundColor || '#F5F5F5';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const cardBackgroundColor = config?.cardBackgroundColor || '#FFFFFF';
  const borderColor = config?.borderColor || '#E9ECEF';
  const accentColor = config?.accentColor || '#8B5CF6';
  const fontSize = parseInt(config?.fontSize || '14');

  // Token data
  const spacingTokens = [
    { name: '4xs(0)', token: 'spacing-4xs', value: '0', px: '0', preview: 0 },
    { name: '3xs(2)', token: 'spacing-3xs', value: '2', px: '2', preview: 2 },
    { name: '2xs(4)', token: 'spacing-2xs', value: '4', px: '4', preview: 4 },
    { name: 'xs(8)', token: 'spacing-xs', value: '8', px: '8', preview: 8 },
    { name: 's(12)', token: 'spacing-s', value: '12', px: '12', preview: 12 },
    { name: 'm(16)', token: 'spacing-m', value: '16', px: '16', preview: 16 },
    { name: 'l(24)', token: 'spacing-l', value: '24', px: '24', preview: 24 },
    { name: 'xl(32)', token: 'spacing-xl', value: '32', px: '32', preview: 32 },
    { name: '2xl(40)', token: 'spacing-2xl', value: '40', px: '40', preview: 40 },
    { name: '3xl(48)', token: 'spacing-3xl', value: '48', px: '48', preview: 48 },
    { name: '4xl(64)', token: 'spacing-4xl', value: '64', px: '64', preview: 64 },
    { name: '5xl(80)', token: 'spacing-5xl', value: '80', px: '80', preview: 80 },
    { name: '6xl(96)', token: 'spacing-6xl', value: '96', px: '96', preview: 96 },
    { name: '7xl(128)', token: 'spacing-7xl', value: '128', px: '128', preview: 128 }
  ];

  const typographyTokens = [
    { name: 'Type-xs', token: 'type-xs', size: '12', lineHeight: '16', preview: 'Aa' },
    { name: 'Type-sm', token: 'type-sm', size: '14', lineHeight: '20', preview: 'Aa' },
    { name: 'Type-md', token: 'type-md', size: '16', lineHeight: '24', preview: 'Aa' },
    { name: 'Type-lg', token: 'type-lg', size: '18', lineHeight: '28', preview: 'Aa' },
    { name: 'Type-xl', token: 'type-xl', size: '20', lineHeight: '30', preview: 'Aa' },
    { name: 'Type-2xl', token: 'type-2xl', size: '24', lineHeight: '32', preview: 'Aa' },
    { name: 'Type-3xl', token: 'type-3xl', size: '30', lineHeight: '38', preview: 'Aa' },
    { name: 'Type-4xl', token: 'type-4xl', size: '36', lineHeight: '44', preview: 'Aa' },
    { name: 'Type-5xl', token: 'type-5xl', size: '48', lineHeight: '56', preview: 'Aa' },
    { name: 'Type-6xl', token: 'type-6xl', size: '64', lineHeight: '72', preview: 'Aa' }
  ];

  const allTokens = tokenCategory === 'spacing' ? spacingTokens :
                    tokenCategory === 'typography' ? typographyTokens :
                    [...spacingTokens, ...typographyTokens];

  const containerStyle = {
    backgroundColor,
    padding: '32px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    minHeight: '100vh'
  };

  const titleStyle = {
    fontSize: `${fontSize + 12}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '32px'
  };

  const sectionsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: showVisualPreview ? '2fr 1fr' : '1fr',
    gap: '32px'
  };

  const sectionStyle = {
    backgroundColor: cardBackgroundColor,
    borderRadius: '16px',
    padding: '32px',
    border: `1px solid ${borderColor}`
  };

  const sectionTitleStyle = {
    fontSize: `${fontSize + 6}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '24px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const headerRowStyle = {
    borderBottom: `2px solid ${borderColor}`
  };

  const headerCellStyle = {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: `${fontSize - 1}px`,
    fontWeight: '500',
    color: secondaryTextColor,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const rowStyle = {
    borderBottom: `1px solid ${borderColor}`
  };

  const cellStyle = {
    padding: '16px',
    fontSize: `${fontSize}px`,
    color: textColor
  };

  const tokenNameStyle = {
    fontWeight: '500',
    marginBottom: '2px'
  };

  const tokenVariableStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    fontFamily: 'monospace'
  };

  const visualGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const getVisualPreviewStyle = (value) => ({
    width: `${Math.min(parseInt(value) * 1.5, 240)}px`,
    height: '48px',
    backgroundColor: accentColor,
    borderRadius: '4px',
    opacity: 0.8,
    transition: 'all 200ms ease-out'
  });

  const getTypePreviewStyle = (size) => ({
    fontSize: `${size}px`,
    fontWeight: '500',
    color: textColor
  });

  const renderSpacingTokens = () => (
    <>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>Token</th>
            <th style={headerCellStyle}>Value</th>
            <th style={headerCellStyle}>Pixels</th>
          </tr>
        </thead>
        <tbody>
          {spacingTokens.map((token) => (
            <tr key={token.token} style={rowStyle}>
              <td style={cellStyle}>
                <div style={tokenNameStyle}>{token.name}</div>
              </td>
              <td style={cellStyle}>
                <div style={tokenVariableStyle}>{token.token}</div>
              </td>
              <td style={cellStyle}>{token.value}</td>
              <td style={cellStyle}>{token.px}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const renderTypographyTokens = () => (
    <>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>Token</th>
            <th style={headerCellStyle}>Size</th>
            <th style={headerCellStyle}>Line Height</th>
          </tr>
        </thead>
        <tbody>
          {typographyTokens.map((token) => (
            <tr key={token.token} style={rowStyle}>
              <td style={cellStyle}>
                <div style={tokenNameStyle}>{token.name}</div>
              </td>
              <td style={cellStyle}>
                <div style={tokenVariableStyle}>{token.token}</div>
              </td>
              <td style={cellStyle}>{token.size}px</td>
              <td style={cellStyle}>{token.lineHeight}px</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const renderVisualPreviews = () => {
    if (tokenCategory === 'spacing' || tokenCategory === 'all') {
      return (
        <div style={visualGridStyle}>
          {spacingTokens.map((token) => (
            <div key={token.token}>
              <div style={{
                fontSize: `${fontSize - 1}px`,
                color: secondaryTextColor,
                marginBottom: '8px'
              }}>
                {token.name}
              </div>
              <div style={getVisualPreviewStyle(token.value)} />
            </div>
          ))}
        </div>
      );
    }

    if (tokenCategory === 'typography') {
      return (
        <div style={visualGridStyle}>
          {typographyTokens.map((token) => (
            <div key={token.token}>
              <div style={{
                fontSize: `${fontSize - 1}px`,
                color: secondaryTextColor,
                marginBottom: '8px'
              }}>
                {token.name}
              </div>
              <div style={getTypePreviewStyle(token.size)}>
                {token.preview}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="branded-elements-tokens" style={containerStyle}>
      <div style={titleStyle}>{panelTitle}</div>

      <div style={sectionsContainerStyle}>
        {/* Tokens Table */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>
            {tokenCategory === 'spacing' ? 'Spacing Tokens' :
             tokenCategory === 'typography' ? 'Type Scale' :
             'Spacing Tokens'}
          </div>
          {tokenCategory === 'spacing' || tokenCategory === 'all' ? renderSpacingTokens() : null}
          {tokenCategory === 'typography' ? renderTypographyTokens() : null}
        </div>

        {/* Visual Preview */}
        {showVisualPreview && (
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Visual Preview</div>
            {renderVisualPreviews()}
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
