import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsStateMatrix",
  "description": "Complete state matrix showing all interactive states for each element (default, hover, active, focus, disabled)",
  "editorElement": {
    "selector": ".branded-elements-state-matrix",
    "displayName": "Branded Elements State Matrix",
    "archetype": "container",
    "data": {
      "panelTitle": {
        "dataType": "text",
        "displayName": "Panel Title",
        "defaultValue": "Components",
        "group": "Content"
      },
      "panelSubtitle": {
        "dataType": "text",
        "displayName": "Panel Subtitle",
        "defaultValue": "Button States",
        "group": "Content"
      },
      "showTabs": {
        "dataType": "booleanValue",
        "displayName": "Show Category Tabs",
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
      "sectionBackgroundColor": {
        "dataType": "color",
        "displayName": "Section Background",
        "defaultValue": "#F8F9FA",
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
  const [activeTab, setActiveTab] = React.useState('Overview');

  // Safe config access with defaults
  const panelTitle = config?.panelTitle || 'Components';
  const panelSubtitle = config?.panelSubtitle || 'Button States';
  const showTabs = config?.showTabs !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const sectionBackgroundColor = config?.sectionBackgroundColor || '#F8F9FA';
  const borderColor = config?.borderColor || '#E9ECEF';
  const fontSize = parseInt(config?.fontSize || '13');

  const tabs = ['Overview', 'Usage', 'Implementation'];

  // Button variants and states
  const variants = [
    { id: 'primary-large', name: 'Primary (XLarge)', size: 'Text w/ icon' },
    { id: 'primary-text', name: 'Primary (Large)', size: 'Text w/ icon' },
    { id: 'primary-icon', name: 'Primary (Medium)', size: 'Icon w/ text' }
  ];

  const states = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];

  const containerStyle = {
    backgroundColor,
    padding: '0',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    minHeight: '100vh'
  };

  const headerStyle = {
    padding: '32px 24px 24px',
    borderBottom: `1px solid ${borderColor}`
  };

  const titleStyle = {
    fontSize: `${fontSize + 12}px`,
    fontWeight: '400',
    color: secondaryTextColor,
    marginBottom: '4px'
  };

  const subtitleStyle = {
    fontSize: `${fontSize + 16}px`,
    fontWeight: '500',
    color: textColor
  };

  const tabsStyle = {
    display: 'flex',
    gap: '32px',
    padding: '0 24px',
    borderBottom: `1px solid ${borderColor}`
  };

  const getTabStyle = (tab) => ({
    padding: '16px 0',
    fontSize: `${fontSize + 1}px`,
    color: activeTab === tab ? textColor : secondaryTextColor,
    borderBottom: `2px solid ${activeTab === tab ? textColor : 'transparent'}`,
    cursor: 'pointer',
    transition: 'all 150ms ease-out'
  });

  const contentStyle = {
    padding: '32px 24px'
  };

  const variantSectionStyle = {
    marginBottom: '48px'
  };

  const variantHeaderStyle = {
    backgroundColor: sectionBackgroundColor,
    padding: '12px 20px',
    marginBottom: '16px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const variantNameStyle = {
    fontSize: `${fontSize + 1}px`,
    fontWeight: '500',
    color: textColor
  };

  const variantSizeStyle = {
    fontSize: `${fontSize}px`,
    color: secondaryTextColor
  };

  const stateGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px'
  };

  const stateColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const stateLabelStyle = {
    fontSize: `${fontSize - 1}px`,
    color: secondaryTextColor,
    marginBottom: '16px',
    textAlign: 'center'
  };

  const getButtonStyle = (state) => {
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 24px',
      borderRadius: '24px',
      fontSize: `${fontSize}px`,
      fontWeight: '500',
      border: 'none',
      cursor: state === 'Disabled' ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease-out'
    };

    if (state === 'Disabled') {
      return {
        ...baseStyle,
        backgroundColor: '#E9ECEF',
        color: '#ADB5BD',
        opacity: 0.5
      };
    }

    if (state === 'Hover') {
      return {
        ...baseStyle,
        backgroundColor: '#343A40',
        color: '#FFFFFF'
      };
    }

    if (state === 'Active') {
      return {
        ...baseStyle,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        transform: 'scale(0.98)'
      };
    }

    if (state === 'Focus') {
      return {
        ...baseStyle,
        backgroundColor: textColor,
        color: '#FFFFFF',
        boxShadow: `0 0 0 3px ${borderColor}`
      };
    }

    return {
      ...baseStyle,
      backgroundColor: textColor,
      color: '#FFFFFF'
    };
  };

  const arrowIconStyle = {
    width: '12px',
    height: '12px'
  };

  return (
    <div className="branded-elements-state-matrix" style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>{panelTitle}</div>
        <div style={subtitleStyle}>{panelSubtitle}</div>
      </div>

      {/* Tabs */}
      {showTabs && (
        <div style={tabsStyle}>
          {tabs.map((tab) => (
            <div
              key={tab}
              style={getTabStyle(tab)}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={contentStyle}>
        {variants.map((variant) => (
          <div key={variant.id} style={variantSectionStyle}>
            {/* Variant Header */}
            <div style={variantHeaderStyle}>
              <div style={variantNameStyle}>{variant.name}</div>
              <div style={variantSizeStyle}>{variant.size}</div>
            </div>

            {/* State Grid */}
            <div style={stateGridStyle}>
              {states.map((state) => (
                <div key={state} style={stateColumnStyle}>
                  <div style={stateLabelStyle}>{state}</div>
                  <button style={getButtonStyle(state)}>
                    <span>Label text</span>
                    <svg
                      style={arrowIconStyle}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 6h6M6 3l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
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
