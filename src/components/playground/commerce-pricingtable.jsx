import React from "react";

const MANIFEST = {
  "type": "Commerce.PricingTable",
  "description": "Sophisticated pricing comparison table with smooth feature reveals and elegant interactions",
  "editorElement": {
    "selector": ".pricing-table",
    "displayName": "Pricing Comparison Table",
    "archetype": "container",
    "data": {
      "plans": {
        "dataType": "text",
        "displayName": "Plan Names (comma-separated)",
        "defaultValue": "Starter,Professional,Enterprise",
        "group": "Content"
      },
      "prices": {
        "dataType": "text",
        "displayName": "Prices (comma-separated)",
        "defaultValue": "$29,$99,$249",
        "group": "Content"
      },
      "billingPeriod": {
        "dataType": "text",
        "displayName": "Billing Period",
        "defaultValue": "per month",
        "group": "Content"
      },
      "features": {
        "dataType": "text",
        "displayName": "Features (pipe-separated: feature|plan1,plan2)",
        "defaultValue": "Up to 10 users|0,1,2|Up to 100GB storage|0,1,2|Basic support|0,1,2|Advanced analytics|1,2|Priority support|2|Custom integrations|2|Dedicated account manager|2|SSO & SAML|2",
        "group": "Content",
        "description": "Format: Feature name|plan indices (0-based, comma-separated)"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "Get Started",
        "group": "Content"
      },
      "highlightedPlanIndex": {
        "dataType": "select",
        "displayName": "Highlighted Plan",
        "defaultValue": "1",
        "options": ["0", "1", "2", "none"],
        "group": "Content",
        "description": "Which plan to emphasize (0-indexed)"
      },
      "showAnnualToggle": {
        "dataType": "booleanValue",
        "displayName": "Show Annual Toggle",
        "defaultValue": true,
        "group": "Content"
      },
      "annualDiscount": {
        "dataType": "select",
        "displayName": "Annual Discount %",
        "defaultValue": "20",
        "options": ["15", "20", "25", "30"],
        "group": "Content"
      },
      "revealOnScroll": {
        "dataType": "booleanValue",
        "displayName": "Reveal on Scroll",
        "defaultValue": true,
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Card Stagger Delay (ms)",
        "defaultValue": "100",
        "options": ["50", "75", "100", "150"],
        "group": "Animation"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Base Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "highlightedCardColor": {
        "dataType": "color",
        "displayName": "Highlighted Card Background",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "highlightedTextColor": {
        "dataType": "color",
        "displayName": "Highlighted Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "priceColor": {
        "dataType": "color",
        "displayName": "Price Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "buttonBackgroundColor": {
        "dataType": "color",
        "displayName": "Button Background",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "buttonTextColor": {
        "dataType": "color",
        "displayName": "Button Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const plans = (config?.plans || "Starter,Professional,Enterprise").split(',').map(p => p.trim());
  const pricesStr = (config?.prices || "$29,$99,$249").split(',').map(p => p.trim());
  const billingPeriod = config?.billingPeriod || "per month";
  const featuresStr = config?.features || "Up to 10 users|0,1,2|Up to 100GB storage|0,1,2|Basic support|0,1,2|Advanced analytics|1,2|Priority support|2|Custom integrations|2";
  const ctaText = config?.ctaText || "Get Started";
  const highlightedPlanIndex = config?.highlightedPlanIndex === "none" ? -1 : parseInt(config?.highlightedPlanIndex || "1");
  const showAnnualToggle = config?.showAnnualToggle !== false;
  const annualDiscount = parseInt(config?.annualDiscount || "20");
  const revealOnScroll = config?.revealOnScroll !== false;
  const staggerDelay = parseInt(config?.staggerDelay || "100");
  const fontSize = parseInt(config?.fontSize || "16");
  const fontWeight = config?.fontWeight || "400";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const cardBackgroundColor = config?.cardBackgroundColor || "#F8F9FA";
  const highlightedCardColor = config?.highlightedCardColor || "#212529";
  const textColor = config?.textColor || "#212529";
  const highlightedTextColor = config?.highlightedTextColor || "#FFFFFF";
  const priceColor = config?.priceColor || "#212529";
  const accentColor = config?.accentColor || "#495057";
  const borderColor = config?.borderColor || "#E9ECEF";
  const buttonBackgroundColor = config?.buttonBackgroundColor || "#212529";
  const buttonTextColor = config?.buttonTextColor || "#FFFFFF";

  const [isAnnual, setIsAnnual] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const containerRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Parse features
  const features = featuresStr.split('|').reduce((acc, item, index) => {
    if (index % 2 === 0) {
      acc.push({ name: item, plans: [] });
    } else {
      acc[acc.length - 1].plans = item.split(',').map(p => parseInt(p.trim()));
    }
    return acc;
  }, []);

  // Calculate prices
  const getPriceDisplay = (priceStr, annual) => {
    const match = priceStr.match(/\$?(\d+)/);
    if (!match) return priceStr;
    const price = parseInt(match[1]);
    if (annual) {
      const discountedPrice = Math.round(price * (1 - annualDiscount / 100));
      return `$${discountedPrice}`;
    }
    return priceStr;
  };

  // Intersection Observer
  React.useEffect(() => {
    if (!revealOnScroll || !containerRef.current || hasAnimated || prefersReducedMotion) {
      if (!revealOnScroll || prefersReducedMotion) setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [revealOnScroll, hasAnimated, prefersReducedMotion]);

  return (
    <div className="pricing-table" style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor,
      padding: '4rem 2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div ref={containerRef} style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: `clamp(${fontSize * 2}px, ${fontSize * 2.5}px + 1vw, ${fontSize * 3}px)`,
            fontWeight: '500',
            color: textColor,
            margin: '0 0 1rem 0',
            letterSpacing: '-0.02em'
          }}>
            Choose Your Plan
          </h1>
          <p style={{
            fontSize: `${fontSize * 1.125}px`,
            color: accentColor,
            margin: '0 0 2rem 0',
            fontWeight: '300'
          }}>
            Select the perfect plan for your needs
          </p>

          {/* Annual Toggle */}
          {showAnnualToggle && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: cardBackgroundColor,
              borderRadius: '8px',
              border: `1px solid ${borderColor}`
            }}>
              <span style={{
                fontSize: `${fontSize * 0.875}px`,
                fontWeight: isAnnual ? '300' : '500',
                color: isAnnual ? accentColor : textColor,
                transition: 'all 200ms ease-out'
              }}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                aria-label={`Switch to ${isAnnual ? 'monthly' : 'annual'} billing`}
                style={{
                  width: '52px',
                  height: '28px',
                  backgroundColor: isAnnual ? textColor : borderColor,
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 200ms ease-out'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '3px',
                  left: isAnnual ? 'calc(100% - 25px)' : '3px',
                  transition: 'all 200ms ease-out',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                }}/>
              </button>
              <span style={{
                fontSize: `${fontSize * 0.875}px`,
                fontWeight: isAnnual ? '500' : '300',
                color: isAnnual ? textColor : accentColor,
                transition: 'all 200ms ease-out'
              }}>
                Annual
                <span style={{
                  marginLeft: '0.5rem',
                  padding: '0.125rem 0.5rem',
                  backgroundColor: isAnnual ? textColor : 'transparent',
                  color: isAnnual ? backgroundColor : accentColor,
                  borderRadius: '4px',
                  fontSize: '0.75em',
                  fontWeight: '500',
                  transition: 'all 200ms ease-out'
                }}>
                  Save {annualDiscount}%
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
          gap: '2rem',
          alignItems: 'stretch'
        }}>
          {plans.map((plan, index) => {
            const isHighlighted = index === highlightedPlanIndex;
            const cardBg = isHighlighted ? highlightedCardColor : cardBackgroundColor;
            const cardText = isHighlighted ? highlightedTextColor : textColor;
            const cardAccent = isHighlighted ? highlightedTextColor : accentColor;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${isHighlighted ? highlightedCardColor : borderColor}`,
                  borderRadius: '12px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isHighlighted ? '0 8px 24px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.06)',
                  transition: 'all 400ms ease-out',
                  opacity: prefersReducedMotion || hasAnimated ? 1 : 0,
                  ...((!prefersReducedMotion && hasAnimated) && {
                    animation: `slideUpFade 500ms ease-out ${index * staggerDelay}ms forwards`
                  })
                }}
              >
                {/* Plan Name */}
                <h2 style={{
                  fontSize: `${fontSize * 1.5}px`,
                  fontWeight: '500',
                  color: cardText,
                  margin: '0 0 0.5rem 0',
                  letterSpacing: '-0.01em'
                }}>
                  {plan}
                </h2>

                {/* Price */}
                <div style={{
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: `${fontSize * 3}px`,
                      fontWeight: '500',
                      color: isHighlighted ? highlightedTextColor : priceColor,
                      letterSpacing: '-0.02em'
                    }}>
                      {getPriceDisplay(pricesStr[index], isAnnual)}
                    </span>
                    <span style={{
                      fontSize: `${fontSize * 0.875}px`,
                      color: cardAccent,
                      fontWeight: '300'
                    }}>
                      {billingPeriod}
                    </span>
                  </div>
                  {isAnnual && (
                    <div style={{
                      fontSize: `${fontSize * 0.75}px`,
                      color: cardAccent,
                      marginTop: '0.25rem',
                      textDecoration: 'line-through',
                      fontWeight: '300'
                    }}>
                      {pricesStr[index]} {billingPeriod}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    fontSize: `${fontSize * 0.9375}px`,
                    fontWeight: '500',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    color: isHighlighted ? highlightedCardColor : buttonTextColor,
                    backgroundColor: isHighlighted ? highlightedTextColor : buttonBackgroundColor,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '2rem',
                    transition: 'all 200ms ease-out',
                    letterSpacing: '0.025em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {ctaText}
                </button>

                {/* Features List */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  flex: 1
                }}>
                  {features.map((feature, fIndex) => {
                    const isIncluded = feature.plans.includes(index);
                    return (
                      <li
                        key={fIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          fontSize: `${fontSize * 0.875}px`,
                          color: isIncluded ? cardText : cardAccent,
                          opacity: isIncluded ? 1 : 0.5,
                          fontWeight: fontWeight
                        }}
                      >
                        <span style={{
                          flexShrink: 0,
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          backgroundColor: isIncluded 
                            ? (isHighlighted ? 'rgba(255,255,255,0.2)' : 'rgba(33,37,41,0.08)')
                            : 'transparent',
                          fontSize: '0.75em'
                        }}>
                          {isIncluded ? '✓' : '—'}
                        </span>
                        <span>{feature.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Component;