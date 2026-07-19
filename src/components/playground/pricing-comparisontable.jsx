import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 21, 2025, 09:24 AM
 * Component Type: Pricing.ComparisonTable
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Pricing.ComparisonTable",
  "description": "Sophisticated three-tier pricing comparison table with feature lists and recommended tier highlighting",
  "editorElement": {
    "selector": ".pricing-table-container",
    "displayName": "Pricing Comparison Table",
    "archetype": "container",
    "data": {
      "tier1Name": {
        "dataType": "text",
        "displayName": "Tier 1 Name",
        "defaultValue": "Basic",
        "group": "Content"
      },
      "tier1Price": {
        "dataType": "text",
        "displayName": "Tier 1 Price",
        "defaultValue": "$29",
        "group": "Content"
      },
      "tier1Period": {
        "dataType": "text",
        "displayName": "Tier 1 Period",
        "defaultValue": "/month",
        "group": "Content"
      },
      "tier1Features": {
        "dataType": "text",
        "displayName": "Tier 1 Features (comma-separated)",
        "defaultValue": "Up to 10 users,5 GB storage,Basic support,Email notifications",
        "group": "Content"
      },
      "tier1ButtonText": {
        "dataType": "text",
        "displayName": "Tier 1 Button Text",
        "defaultValue": "Get Started",
        "group": "Content"
      },
      "tier2Name": {
        "dataType": "text",
        "displayName": "Tier 2 Name",
        "defaultValue": "Pro",
        "group": "Content"
      },
      "tier2Price": {
        "dataType": "text",
        "displayName": "Tier 2 Price",
        "defaultValue": "$79",
        "group": "Content"
      },
      "tier2Period": {
        "dataType": "text",
        "displayName": "Tier 2 Period",
        "defaultValue": "/month",
        "group": "Content"
      },
      "tier2Features": {
        "dataType": "text",
        "displayName": "Tier 2 Features (comma-separated)",
        "defaultValue": "Up to 50 users,50 GB storage,Priority support,Email & SMS notifications,Advanced analytics,Custom integrations",
        "group": "Content"
      },
      "tier2ButtonText": {
        "dataType": "text",
        "displayName": "Tier 2 Button Text",
        "defaultValue": "Start Free Trial",
        "group": "Content"
      },
      "tier2Recommended": {
        "dataType": "booleanValue",
        "displayName": "Mark Tier 2 as Recommended",
        "defaultValue": true,
        "group": "Content"
      },
      "tier2Badge": {
        "dataType": "text",
        "displayName": "Tier 2 Badge Text",
        "defaultValue": "MOST POPULAR",
        "group": "Content"
      },
      "tier3Name": {
        "dataType": "text",
        "displayName": "Tier 3 Name",
        "defaultValue": "Enterprise",
        "group": "Content"
      },
      "tier3Price": {
        "dataType": "text",
        "displayName": "Tier 3 Price",
        "defaultValue": "Custom",
        "group": "Content"
      },
      "tier3Period": {
        "dataType": "text",
        "displayName": "Tier 3 Period",
        "defaultValue": "",
        "group": "Content"
      },
      "tier3Features": {
        "dataType": "text",
        "displayName": "Tier 3 Features (comma-separated)",
        "defaultValue": "Unlimited users,Unlimited storage,24/7 dedicated support,All notification channels,Custom analytics,API access,SLA guarantee,Dedicated account manager",
        "group": "Content"
      },
      "tier3ButtonText": {
        "dataType": "text",
        "displayName": "Tier 3 Button Text",
        "defaultValue": "Contact Sales",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "recommendedCardBackground": {
        "dataType": "color",
        "displayName": "Recommended Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "recommendedBorderColor": {
        "dataType": "color",
        "displayName": "Recommended Border Color",
        "defaultValue": "#495057",
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
      "badgeBackgroundColor": {
        "dataType": "color",
        "displayName": "Badge Background Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "badgeTextColor": {
        "dataType": "color",
        "displayName": "Badge Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "checkmarkColor": {
        "dataType": "color",
        "displayName": "Checkmark Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "buttonTextColor": {
        "dataType": "color",
        "displayName": "Button Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "buttonBackgroundColor": {
        "dataType": "color",
        "displayName": "Button Background Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "buttonHoverColor": {
        "dataType": "color",
        "displayName": "Button Hover Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue", "Arial"],
        "group": "Typography"
      },
      "tierNameSize": {
        "dataType": "number",
        "displayName": "Tier Name Size (px)",
        "defaultValue": 20,
        "group": "Typography"
      },
      "priceSize": {
        "dataType": "number",
        "displayName": "Price Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "featureSize": {
        "dataType": "number",
        "displayName": "Feature Size (px)",
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
      "cardBorderRadius": {
        "dataType": "select",
        "displayName": "Card Border Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "32px",
        "options": ["24px", "32px", "40px", "48px"],
        "group": "Layout"
      },
      "cardGap": {
        "dataType": "select",
        "displayName": "Gap Between Cards",
        "defaultValue": "24px",
        "options": ["16px", "24px", "32px", "40px"],
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
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const tierData = [
    {
      name: config?.tier1Name || "Basic",
      price: config?.tier1Price || "$29",
      period: config?.tier1Period || "/month",
      features: (config?.tier1Features || "Up to 10 users,5 GB storage,Basic support,Email notifications").split(',').map(f => f.trim()),
      buttonText: config?.tier1ButtonText || "Get Started",
      isRecommended: false
    },
    {
      name: config?.tier2Name || "Pro",
      price: config?.tier2Price || "$79",
      period: config?.tier2Period || "/month",
      features: (config?.tier2Features || "Up to 50 users,50 GB storage,Priority support,Email & SMS notifications,Advanced analytics,Custom integrations").split(',').map(f => f.trim()),
      buttonText: config?.tier2ButtonText || "Start Free Trial",
      isRecommended: config?.tier2Recommended !== false,
      badge: config?.tier2Badge || "MOST POPULAR"
    },
    {
      name: config?.tier3Name || "Enterprise",
      price: config?.tier3Price || "Custom",
      period: config?.tier3Period || "",
      features: (config?.tier3Features || "Unlimited users,Unlimited storage,24/7 dedicated support,All notification channels,Custom analytics,API access,SLA guarantee,Dedicated account manager").split(',').map(f => f.trim()),
      buttonText: config?.tier3ButtonText || "Contact Sales",
      isRecommended: false
    }
  ];

  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const cardBackgroundColor = config?.cardBackgroundColor || "#F8F9FA";
  const recommendedCardBackground = config?.recommendedCardBackground || "#FFFFFF";
  const borderColor = config?.borderColor || "#E9ECEF";
  const recommendedBorderColor = config?.recommendedBorderColor || "#495057";
  const textColor = config?.textColor || "#212529";
  const secondaryTextColor = config?.secondaryTextColor || "#6C757D";
  const badgeBackgroundColor = config?.badgeBackgroundColor || "#212529";
  const badgeTextColor = config?.badgeTextColor || "#FFFFFF";
  const checkmarkColor = config?.checkmarkColor || "#495057";
  const buttonTextColor = config?.buttonTextColor || "#FFFFFF";
  const buttonBackgroundColor = config?.buttonBackgroundColor || "#495057";
  const buttonHoverColor = config?.buttonHoverColor || "#343A40";
  const fontFamily = config?.fontFamily || "system-ui";
  const tierNameSize = config?.tierNameSize || 20;
  const priceSize = config?.priceSize || 48;
  const featureSize = config?.featureSize || 14;
  const fontWeight = config?.fontWeight || "400";
  const cardBorderRadius = config?.cardBorderRadius || "8px";
  const cardPadding = config?.cardPadding || "32px";
  const cardGap = config?.cardGap || "24px";

  return (
    <div 
      className="pricing-table-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: cardGap,
        maxWidth: '1200px',
        width: '100%'
      }}>
        {tierData.map((tier, index) => (
          <div
            key={index}
            style={{
              backgroundColor: tier.isRecommended ? recommendedCardBackground : cardBackgroundColor,
              border: `2px solid ${tier.isRecommended ? recommendedBorderColor : borderColor}`,
              borderRadius: cardBorderRadius,
              padding: cardPadding,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              transform: tier.isRecommended && !prefersReducedMotion ? 'scale(1.05)' : 'scale(1)',
              boxShadow: tier.isRecommended ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.06)',
              transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out'
            }}
          >
            {tier.isRecommended && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: badgeBackgroundColor,
                color: badgeTextColor,
                padding: '4px 16px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.05em'
              }}>
                {tier.badge}
              </div>
            )}

            <div style={{
              marginBottom: '24px',
              paddingBottom: '24px',
              borderBottom: `1px solid ${borderColor}`
            }}>
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: `${tierNameSize}px`,
                fontWeight: '500',
                color: textColor,
                letterSpacing: '-0.01em'
              }}>
                {tier.name}
              </h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '4px'
              }}>
                <span style={{
                  fontSize: `${priceSize}px`,
                  fontWeight: '300',
                  color: textColor,
                  lineHeight: '1'
                }}>
                  {tier.price}
                </span>
                {tier.period && (
                  <span style={{
                    fontSize: `${featureSize}px`,
                    color: secondaryTextColor,
                    fontWeight
                  }}>
                    {tier.period}
                  </span>
                )}
              </div>
            </div>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 32px 0',
              flex: 1
            }}>
              {tier.features.map((feature, fIndex) => (
                <li
                  key={fIndex}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '12px',
                    fontSize: `${featureSize}px`,
                    color: textColor,
                    fontWeight,
                    lineHeight: '1.6'
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <circle cx="10" cy="10" r="10" fill={checkmarkColor} fillOpacity="0.1" />
                    <path
                      d="M6 10l2.5 2.5L14 7"
                      stroke={checkmarkColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              style={{
                width: '100%',
                padding: '14px 24px',
                backgroundColor: buttonBackgroundColor,
                color: buttonTextColor,
                border: 'none',
                borderRadius: '6px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out',
                fontFamily
              }}
              onMouseEnter={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.backgroundColor = buttonHoverColor;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = buttonBackgroundColor;
              }}
            >
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
