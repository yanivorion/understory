import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 21, 2025, 03:29 AM
 * Component Type: Calculator.PricingCalculator
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Calculator.PricingCalculator",
  "description": "Sophisticated pricing calculator with real-time calculations, interactive sliders, feature toggles, tiered pricing logic, and animated value updates",
  "editorElement": {
    "selector": ".pricing-calculator-container",
    "displayName": "Interactive Pricing Calculator",
    "archetype": "container",
    "data": {
      "basePrice": {
        "dataType": "text",
        "displayName": "Base Price",
        "defaultValue": "49",
        "group": "Content"
      },
      "userPricePerUnit": {
        "dataType": "text",
        "displayName": "Price Per User",
        "defaultValue": "15",
        "group": "Content"
      },
      "storagePricePerGB": {
        "dataType": "text",
        "displayName": "Price Per GB Storage",
        "defaultValue": "0.5",
        "group": "Content"
      },
      "feature1Name": {
        "dataType": "text",
        "displayName": "Feature 1 Name",
        "defaultValue": "Advanced Analytics",
        "group": "Content"
      },
      "feature1Price": {
        "dataType": "text",
        "displayName": "Feature 1 Price",
        "defaultValue": "29",
        "group": "Content"
      },
      "feature2Name": {
        "dataType": "text",
        "displayName": "Feature 2 Name",
        "defaultValue": "Priority Support",
        "group": "Content"
      },
      "feature2Price": {
        "dataType": "text",
        "displayName": "Feature 2 Price",
        "defaultValue": "49",
        "group": "Content"
      },
      "feature3Name": {
        "dataType": "text",
        "displayName": "Feature 3 Name",
        "defaultValue": "Custom Branding",
        "group": "Content"
      },
      "feature3Price": {
        "dataType": "text",
        "displayName": "Feature 3 Price",
        "defaultValue": "99",
        "group": "Content"
      },
      "discountThreshold": {
        "dataType": "text",
        "displayName": "Discount Threshold (users)",
        "defaultValue": "50",
        "group": "Content"
      },
      "discountPercent": {
        "dataType": "text",
        "displayName": "Discount Percentage",
        "defaultValue": "15",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "valueColor": {
        "dataType": "color",
        "displayName": "Value Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "sliderTrackColor": {
        "dataType": "color",
        "displayName": "Slider Track Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "sliderFillColor": {
        "dataType": "color",
        "displayName": "Slider Fill Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "sliderThumbColor": {
        "dataType": "color",
        "displayName": "Slider Thumb Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "toggleActiveColor": {
        "dataType": "color",
        "displayName": "Toggle Active Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "toggleInactiveColor": {
        "dataType": "color",
        "displayName": "Toggle Inactive Color",
        "defaultValue": "#CED4DA",
        "group": "Colors"
      },
      "priceColor": {
        "dataType": "color",
        "displayName": "Total Price Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "discountBadgeColor": {
        "dataType": "color",
        "displayName": "Discount Badge Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue"],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "number",
        "displayName": "Title Size (px)",
        "defaultValue": 24,
        "group": "Typography"
      },
      "priceSize": {
        "dataType": "number",
        "displayName": "Price Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "number",
        "displayName": "Label Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [users, setUsers] = React.useState(10);
  const [storage, setStorage] = React.useState(50);
  const [features, setFeatures] = React.useState({
    feature1: false,
    feature2: false,
    feature3: false
  });
  const [animatedTotal, setAnimatedTotal] = React.useState(0);

  const basePrice = parseFloat(config?.basePrice || "49");
  const userPrice = parseFloat(config?.userPricePerUnit || "15");
  const storagePrice = parseFloat(config?.storagePricePerGB || "0.5");
  
  const featuresList = [
    { 
      key: 'feature1', 
      name: config?.feature1Name || "Advanced Analytics", 
      price: parseFloat(config?.feature1Price || "29") 
    },
    { 
      key: 'feature2', 
      name: config?.feature2Name || "Priority Support", 
      price: parseFloat(config?.feature2Price || "49") 
    },
    { 
      key: 'feature3', 
      name: config?.feature3Name || "Custom Branding", 
      price: parseFloat(config?.feature3Price || "99") 
    }
  ];

  const discountThreshold = parseInt(config?.discountThreshold || "50");
  const discountPercent = parseFloat(config?.discountPercent || "15");

  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FFFFFF";
  const borderColor = config?.borderColor || "#E9ECEF";
  const titleColor = config?.titleColor || "#212529";
  const labelColor = config?.labelColor || "#495057";
  const valueColor = config?.valueColor || "#212529";
  const sliderTrackColor = config?.sliderTrackColor || "#E9ECEF";
  const sliderFillColor = config?.sliderFillColor || "#495057";
  const sliderThumbColor = config?.sliderThumbColor || "#495057";
  const toggleActiveColor = config?.toggleActiveColor || "#495057";
  const toggleInactiveColor = config?.toggleInactiveColor || "#CED4DA";
  const priceColor = config?.priceColor || "#212529";
  const discountBadgeColor = config?.discountBadgeColor || "#495057";
  const fontFamily = config?.fontFamily || "system-ui";
  const titleSize = config?.titleSize || 24;
  const priceSize = config?.priceSize || 48;
  const labelSize = config?.labelSize || 14;

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const calculateTotal = () => {
    let total = basePrice;
    total += users * userPrice;
    total += storage * storagePrice;
    
    featuresList.forEach(feature => {
      if (features[feature.key]) {
        total += feature.price;
      }
    });

    // Apply volume discount
    if (users >= discountThreshold) {
      total *= (1 - discountPercent / 100);
    }

    return total;
  };

  const total = calculateTotal();
  const hasDiscount = users >= discountThreshold;

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedTotal(total);
      return;
    }

    const duration = 800;
    const startValue = animatedTotal;
    const endValue = total;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (endValue - startValue) * easeOutQuart;
      
      setAnimatedTotal(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [total]);

  const toggleFeature = (featureKey) => {
    setFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  return (
    <div 
      className="pricing-calculator-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        maxWidth: '1000px',
        width: '100%'
      }}>
        {/* Controls Panel */}
        <div style={{
          backgroundColor: cardBackgroundColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          padding: '32px'
        }}>
          <h2 style={{
            margin: '0 0 24px 0',
            fontSize: `${titleSize}px`,
            fontWeight: '500',
            color: titleColor
          }}>
            Configure Your Plan
          </h2>

          {/* Users Slider */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <label style={{
                fontSize: `${labelSize}px`,
                fontWeight: '500',
                color: labelColor
              }}>
                Number of Users
              </label>
              <span style={{
                fontSize: '18px',
                fontWeight: '500',
                color: valueColor
              }}>
                {users}
              </span>
            </div>
            
            <input
              type="range"
              min="1"
              max="200"
              value={users}
              onChange={(e) => setUsers(parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                outline: 'none',
                appearance: 'none',
                background: `linear-gradient(to right, ${sliderFillColor} 0%, ${sliderFillColor} ${(users / 200) * 100}%, ${sliderTrackColor} ${(users / 200) * 100}%, ${sliderTrackColor} 100%)`
              }}
            />
          </div>

          {/* Storage Slider */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <label style={{
                fontSize: `${labelSize}px`,
                fontWeight: '500',
                color: labelColor
              }}>
                Storage (GB)
              </label>
              <span style={{
                fontSize: '18px',
                fontWeight: '500',
                color: valueColor
              }}>
                {storage} GB
              </span>
            </div>
            
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={storage}
              onChange={(e) => setStorage(parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                outline: 'none',
                appearance: 'none',
                background: `linear-gradient(to right, ${sliderFillColor} 0%, ${sliderFillColor} ${((storage - 10) / 990) * 100}%, ${sliderTrackColor} ${((storage - 10) / 990) * 100}%, ${sliderTrackColor} 100%)`
              }}
            />
          </div>

          {/* Feature Toggles */}
          <div>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '16px',
              fontWeight: '500',
              color: titleColor
            }}>
              Add-on Features
            </h3>
            
            {featuresList.map((feature) => (
              <div
                key={feature.key}
                onClick={() => toggleFeature(feature.key)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: features[feature.key] ? '#F8F9FA' : 'transparent',
                  border: `1px solid ${features[feature.key] ? borderColor : 'transparent'}`,
                  borderRadius: '8px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
                }}
              >
                <div>
                  <div style={{
                    fontSize: `${labelSize}px`,
                    fontWeight: '500',
                    color: titleColor,
                    marginBottom: '4px'
                  }}>
                    {feature.name}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: labelColor
                  }}>
                    +${feature.price}/month
                  </div>
                </div>
                
                <div style={{
                  width: '48px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: features[feature.key] ? toggleActiveColor : toggleInactiveColor,
                  position: 'relative',
                  transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: features[feature.key] ? '26px' : '2px',
                    transition: prefersReducedMotion ? 'none' : 'left 200ms ease-out',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary Panel */}
        <div style={{
          backgroundColor: cardBackgroundColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            margin: '0 0 24px 0',
            fontSize: `${titleSize}px`,
            fontWeight: '500',
            color: titleColor
          }}>
            Price Summary
          </h2>

          {/* Breakdown */}
          <div style={{
            flex: 1,
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: `1px solid ${borderColor}`
            }}>
              <span style={{ fontSize: `${labelSize}px`, color: labelColor }}>Base Plan</span>
              <span style={{ fontSize: `${labelSize}px`, fontWeight: '500', color: valueColor }}>
                ${basePrice.toFixed(2)}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: `1px solid ${borderColor}`
            }}>
              <span style={{ fontSize: `${labelSize}px`, color: labelColor }}>
                {users} Users × ${userPrice}
              </span>
              <span style={{ fontSize: `${labelSize}px`, fontWeight: '500', color: valueColor }}>
                ${(users * userPrice).toFixed(2)}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: `1px solid ${borderColor}`
            }}>
              <span style={{ fontSize: `${labelSize}px`, color: labelColor }}>
                {storage} GB × ${storagePrice}
              </span>
              <span style={{ fontSize: `${labelSize}px`, fontWeight: '500', color: valueColor }}>
                ${(storage * storagePrice).toFixed(2)}
              </span>
            </div>

            {featuresList.map(feature => features[feature.key] && (
              <div
                key={feature.key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: `1px solid ${borderColor}`
                }}
              >
                <span style={{ fontSize: `${labelSize}px`, color: labelColor }}>
                  {feature.name}
                </span>
                <span style={{ fontSize: `${labelSize}px`, fontWeight: '500', color: valueColor }}>
                  ${feature.price.toFixed(2)}
                </span>
              </div>
            ))}

            {hasDiscount && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#F8F9FA',
                borderRadius: '6px'
              }}>
                <div style={{
                  backgroundColor: discountBadgeColor,
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {discountPercent}% OFF
                </div>
                <span style={{ fontSize: '13px', color: labelColor }}>
                  Volume discount applied
                </span>
              </div>
            )}
          </div>

          {/* Total */}
          <div style={{
            paddingTop: '24px',
            borderTop: `2px solid ${borderColor}`
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '500',
                color: titleColor
              }}>
                Total per month
              </span>
              <div style={{
                fontSize: `${priceSize}px`,
                fontWeight: '300',
                color: priceColor,
                lineHeight: '1'
              }}>
                ${animatedTotal.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${sliderThumbColor};
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          transition: ${prefersReducedMotion ? 'none' : 'transform 150ms ease-out'};
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: ${prefersReducedMotion ? 'none' : 'scale(1.2)'};
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${sliderThumbColor};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
