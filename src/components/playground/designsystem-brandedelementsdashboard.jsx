import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsDashboard",
  "description": "Dashboard view with statistics, metrics, and analytics-style presentation of design system elements",
  "editorElement": {
    "selector": ".branded-elements-dashboard",
    "displayName": "Branded Elements Dashboard",
    "archetype": "container",
    "data": {
      "panelTitle": {
        "dataType": "text",
        "displayName": "Panel Title",
        "defaultValue": "Design System Dashboard",
        "group": "Content"
      },
      "showInfoIcon": {
        "dataType": "booleanValue",
        "displayName": "Show Info Icon",
        "defaultValue": true,
        "group": "Content"
      },
      "showMetrics": {
        "dataType": "booleanValue",
        "displayName": "Show Metrics",
        "defaultValue": true,
        "group": "Content"
      },
      "showUsageStats": {
        "dataType": "booleanValue",
        "displayName": "Show Usage Stats",
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
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "successColor": {
        "dataType": "color",
        "displayName": "Success Color",
        "defaultValue": "#28A745",
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
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Design System Dashboard';
  const showInfoIcon = config?.showInfoIcon !== false;
  const showMetrics = config?.showMetrics !== false;
  const showUsageStats = config?.showUsageStats !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const borderColor = config?.borderColor || '#E9ECEF';
  const cardBackgroundColor = config?.cardBackgroundColor || '#F8F9FA';
  const accentColor = config?.accentColor || '#495057';
  const successColor = config?.successColor || '#28A745';
  const fontSize = parseInt(config?.fontSize || '14');
  const fontWeight = config?.fontWeight || '400';

  // Dashboard stats
  const stats = [
    { id: 'total', label: 'Total Elements', value: '21', change: '+2', trend: 'up' },
    { id: 'categories', label: 'Categories', value: '5', change: '0', trend: 'neutral' },
    { id: 'typography', label: 'Typography Styles', value: '9', change: '+1', trend: 'up' },
    { id: 'updated', label: 'Last Updated', value: '2d ago', change: null, trend: 'neutral' }
  ];

  // Category breakdown
  const categories = [
    { id: 'typography', name: 'Typography', count: 9, percentage: 43, color: '#495057' },
    { id: 'colors', name: 'Colors', count: 5, percentage: 24, color: '#6C757D' },
    { id: 'buttons', name: 'Buttons', count: 3, percentage: 14, color: '#ADB5BD' },
    { id: 'boxes', name: 'Boxes', count: 2, percentage: 10, color: '#CED4DA' },
    { id: 'lines', name: 'Lines', count: 2, percentage: 10, color: '#DEE2E6' }
  ];

  // Usage data
  const usageData = [
    { element: 'Heading 2', usage: 87, category: 'Typography' },
    { element: 'Paragraph 2', usage: 76, category: 'Typography' },
    { element: 'Primary Button', usage: 65, category: 'Buttons' },
    { element: 'Color #212529', usage: 54, category: 'Colors' },
    { element: 'Box 1', usage: 43, category: 'Boxes' }
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
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: `${fontSize + 8}px`,
    fontWeight: '500',
    color: textColor,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
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
    color: secondaryTextColor
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '32px'
  };

  const statCardStyle = {
    backgroundColor: cardBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '12px',
    padding: '20px'
  };

  const statLabelStyle = {
    fontSize: '11px',
    color: secondaryTextColor,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  };

  const statValueStyle = {
    fontSize: `${fontSize + 14}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '8px'
  };

  const statChangeStyle = (trend) => ({
    fontSize: '12px',
    color: trend === 'up' ? successColor : secondaryTextColor,
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  });

  const sectionStyle = {
    marginBottom: '32px'
  };

  const sectionTitleStyle = {
    fontSize: `${fontSize + 4}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '16px'
  };

  const contentGridStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px'
  };

  const cardStyle = {
    backgroundColor: cardBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '12px',
    padding: '24px'
  };

  const categoryItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  };

  const categoryLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  };

  const colorDotStyle = (color) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: color,
    flexShrink: 0
  });

  const categoryNameStyle = {
    fontSize: `${fontSize}px`,
    color: textColor
  };

  const categoryCountStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    marginRight: '12px'
  };

  const progressBarContainerStyle = {
    width: '80px',
    height: '6px',
    backgroundColor: borderColor,
    borderRadius: '3px',
    overflow: 'hidden'
  };

  const getProgressBarStyle = (percentage, color) => ({
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: color,
    transition: 'width 300ms ease-out'
  });

  const usageItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: `1px solid ${borderColor}`
  };

  const usageBarContainerStyle = {
    flex: 1,
    height: '8px',
    backgroundColor: borderColor,
    borderRadius: '4px',
    overflow: 'hidden',
    marginLeft: '16px',
    marginRight: '12px'
  };

  const getUsageBarStyle = (usage) => ({
    width: `${usage}%`,
    height: '100%',
    backgroundColor: accentColor,
    transition: 'width 300ms ease-out'
  });

  const usageValueStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: textColor,
    minWidth: '40px',
    textAlign: 'right'
  };

  return (
    <div className="branded-elements-dashboard" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          {panelTitle}
          {showInfoIcon && (
            <span style={infoIconStyle} title="Design system metrics and analytics">i</span>
          )}
        </div>
        <div style={subtitleStyle}>
          Overview of your design system elements and usage patterns
        </div>
      </div>

      {/* Stats Grid */}
      {showMetrics && (
        <div style={statsGridStyle}>
          {stats.map((stat) => (
            <div key={stat.id} style={statCardStyle}>
              <div style={statLabelStyle}>{stat.label}</div>
              <div style={statValueStyle}>{stat.value}</div>
              {stat.change && (
                <div style={statChangeStyle(stat.trend)}>
                  <span>{stat.trend === 'up' ? '↑' : '→'}</span>
                  <span>{stat.change}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content Grid */}
      <div style={contentGridStyle}>
        {/* Category Breakdown */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Category Breakdown</div>
          <div style={cardStyle}>
            {categories.map((category) => (
              <div key={category.id} style={categoryItemStyle}>
                <div style={categoryLeftStyle}>
                  <div style={colorDotStyle(category.color)} />
                  <div style={categoryNameStyle}>{category.name}</div>
                </div>
                <div style={categoryCountStyle}>{category.count}</div>
                <div style={progressBarContainerStyle}>
                  <div style={getProgressBarStyle(category.percentage, category.color)} />
                </div>
                <div style={{ fontSize: '12px', color: secondaryTextColor, minWidth: '40px', textAlign: 'right' }}>
                  {category.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Quick Stats</div>
          <div style={cardStyle}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: `${fontSize + 16}px`,
                fontWeight: '500',
                color: textColor,
                marginBottom: '4px'
              }}>
                21
              </div>
              <div style={{
                fontSize: '12px',
                color: secondaryTextColor
              }}>
                Active Elements
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: `${fontSize + 16}px`,
                fontWeight: '500',
                color: successColor,
                marginBottom: '4px'
              }}>
                100%
              </div>
              <div style={{
                fontSize: '12px',
                color: secondaryTextColor
              }}>
                Coverage
              </div>
            </div>
            <div>
              <div style={{
                fontSize: `${fontSize + 16}px`,
                fontWeight: '500',
                color: textColor,
                marginBottom: '4px'
              }}>
                5
              </div>
              <div style={{
                fontSize: '12px',
                color: secondaryTextColor
              }}>
                Collections
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      {showUsageStats && (
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Most Used Elements</div>
          <div style={cardStyle}>
            {usageData.map((item, index) => (
              <div key={index} style={usageItemStyle}>
                <div style={{
                  fontSize: `${fontSize}px`,
                  color: textColor,
                  minWidth: '180px'
                }}>
                  {item.element}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: secondaryTextColor,
                  minWidth: '80px'
                }}>
                  {item.category}
                </div>
                <div style={usageBarContainerStyle}>
                  <div style={getUsageBarStyle(item.usage)} />
                </div>
                <div style={usageValueStyle}>{item.usage}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
