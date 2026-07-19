import React from "react";

const MANIFEST = {
  "type": "Card.PricingCard",
  "description": "Sophisticated pricing card with smooth hover lift effect, perfect for SaaS landing pages",
  "editorElement": {
    "selector": ".pricing-card-container",
    "displayName": "Pricing Card",
    "archetype": "container",
    "data": {
      "planName": {
        "dataType": "text",
        "displayName": "Plan Name",
        "defaultValue": "Professional",
        "group": "Content"
      },
      "price": {
        "dataType": "text",
        "displayName": "Price",
        "defaultValue": "49",
        "group": "Content"
      },
      "currency": {
        "dataType": "text",
        "displayName": "Currency Symbol",
        "defaultValue": "$",
        "group": "Content"
      },
      "period": {
        "dataType": "text",
        "displayName": "Billing Period",
        "defaultValue": "month",
        "group": "Content"
      },
      "features": {
        "dataType": "text",
        "displayName": "Features (comma-separated)",
        "defaultValue": "Unlimited projects,10 team members,Priority support,Advanced analytics,Custom integrations",
        "group": "Content"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "Get Started",
        "group": "Content"
      },
      "popular": {
        "dataType": "booleanValue",
        "displayName": "Show Popular Badge",
        "defaultValue": false,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(139, 127, 115, 0.12)",
        "group": "Colors"
      },
      "planNameColor": {
        "dataType": "color",
        "displayName": "Plan Name Color",
        "defaultValue": "#6B6158",
        "group": "Colors"
      },
      "priceColor": {
        "dataType": "color",
        "displayName": "Price Color",
        "defaultValue": "#2B2520",
        "group": "Colors"
      },
      "featureTextColor": {
        "dataType": "color",
        "displayName": "Feature Text Color",
        "defaultValue": "#6B6158",
        "group": "Colors"
      },
      "checkmarkColor": {
        "dataType": "color",
        "displayName": "Checkmark Color",
        "defaultValue": "#8B7F73",
        "group": "Colors"
      },
      "buttonBackground": {
        "dataType": "color",
        "displayName": "Button Background",
        "defaultValue": "#2B2520",
        "group": "Colors"
      },
      "buttonTextColor": {
        "dataType": "color",
        "displayName": "Button Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "badgeBackground": {
        "dataType": "color",
        "displayName": "Popular Badge Background",
        "defaultValue": "#8B7F73",
        "group": "Colors"
      },
      "badgeTextColor": {
        "dataType": "color",
        "displayName": "Popular Badge Text",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui, -apple-system, sans-serif",
        "options": [
          "system-ui, -apple-system, sans-serif",
          "Inter, sans-serif",
          "Georgia, serif",
          "'SF Pro Display', sans-serif"
        ],
        "group": "Typography"
      },
      "planNameSize": {
        "dataType": "select",
        "displayName": "Plan Name Size",
        "defaultValue": "14px",
        "options": ["12px", "14px", "16px", "18px"],
        "group": "Typography"
      },
      "priceSize": {
        "dataType": "select",
        "displayName": "Price Size",
        "defaultValue": "48px",
        "options": ["36px", "42px", "48px", "54px", "60px"],
        "group": "Typography"
      },
      "featureSize": {
        "dataType": "select",
        "displayName": "Feature Text Size",
        "defaultValue": "15px",
        "options": ["13px", "14px", "15px", "16px"],
        "group": "Typography"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "40px",
        "options": ["32px", "36px", "40px", "48px"],
        "group": "Layout"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "8px",
        "options": ["4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "maxWidth": {
        "dataType": "select",
        "displayName": "Max Width",
        "defaultValue": "380px",
        "options": ["320px", "360px", "380px", "400px", "420px"],
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Safe config access with defaults
  const planName = config?.planName || "Professional";
  const price = config?.price || "49";
  const currency = config?.currency || "$";
  const period = config?.period || "month";
  const featuresString = config?.features || "Unlimited projects,10 team members,Priority support,Advanced analytics,Custom integrations";
  const ctaText = config?.ctaText || "Get Started";
  const showPopular = config?.popular !== false;
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const borderColor = config?.borderColor || "rgba(139, 127, 115, 0.12)";
  const planNameColor = config?.planNameColor || "#6B6158";
  const priceColor = config?.priceColor || "#2B2520";
  const featureTextColor = config?.featureTextColor || "#6B6158";
  const checkmarkColor = config?.checkmarkColor || "#8B7F73";
  const buttonBackground = config?.buttonBackground || "#2B2520";
  const buttonTextColor = config?.buttonTextColor || "#FFFFFF";
  const badgeBackground = config?.badgeBackground || "#8B7F73";
  const badgeTextColor = config?.badgeTextColor || "#FFFFFF";
  
  const fontFamily = config?.fontFamily || "system-ui, -apple-system, sans-serif";
  const planNameSize = config?.planNameSize || "14px";
  const priceSize = config?.priceSize || "48px";
  const featureSize = config?.featureSize || "15px";
  
  const cardPadding = config?.cardPadding || "40px";
  const cornerRadius = config?.cornerRadius || "8px";
  const maxWidth = config?.maxWidth || "380px";
  
  // Parse features
  const features = featuresString.split(',').map(f => f.trim()).filter(f => f);
  
  const containerStyle = {
    display: 'inline-block',
    fontFamily,
    maxWidth,
    width: '100%'
  };
  
  const cardStyle = {
    backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: cornerRadius,
    padding: cardPadding,
    position: 'relative',
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
    boxShadow: isHovered 
      ? '0 20px 40px rgba(0, 0, 0, 0.08)' 
      : '0 2px 8px rgba(0, 0, 0, 0.04)',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'default'
  };
  
  const badgeStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: badgeBackground,
    color: badgeTextColor,
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    opacity: showPopular ? 1 : 0,
    pointerEvents: showPopular ? 'auto' : 'none'
  };
  
  const headerStyle = {
    marginBottom: '24px'
  };
  
  const planNameStyle = {
    color: planNameColor,
    fontSize: planNameSize,
    fontWeight: '500',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '12px'
  };
  
  const priceContainerStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px'
  };
  
  const currencyStyle = {
    color: priceColor,
    fontSize: `calc(${priceSize} * 0.5)`,
    fontWeight: '400'
  };
  
  const priceStyle = {
    color: priceColor,
    fontSize: priceSize,
    fontWeight: '300',
    lineHeight: '1'
  };
  
  const periodStyle = {
    color: planNameColor,
    fontSize: '16px',
    fontWeight: '400'
  };
  
  const featuresContainerStyle = {
    marginBottom: '32px'
  };
  
  const featureItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '14px',
    color: featureTextColor,
    fontSize: featureSize,
    fontWeight: '400',
    lineHeight: '1.5'
  };
  
  const checkmarkStyle = {
    color: checkmarkColor,
    fontSize: '18px',
    flexShrink: 0,
    marginTop: '2px'
  };
  
  const buttonStyle = {
    width: '100%',
    padding: '16px 24px',
    backgroundColor: buttonBackground,
    color: buttonTextColor,
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily,
    opacity: isHovered ? 0.9 : 1
  };
  
  return (
    <div 
      className="pricing-card-container"
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={cardStyle}>
        <div style={badgeStyle}>Popular</div>
        
        <div style={headerStyle}>
          <div style={planNameStyle}>{planName}</div>
          <div style={priceContainerStyle}>
            <span style={currencyStyle}>{currency}</span>
            <span style={priceStyle}>{price}</span>
            <span style={periodStyle}>/{period}</span>
          </div>
        </div>
        
        <div style={featuresContainerStyle}>
          {features.map((feature, index) => (
            <div key={index} style={featureItemStyle}>
              <span style={checkmarkStyle}>✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <button 
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
