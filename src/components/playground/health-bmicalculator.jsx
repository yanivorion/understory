import React from "react";

const MANIFEST = {
  "type": "Health.BMICalculator",
  "description": "Sophisticated BMI calculator with visual category indicators and health insights",
  "editorElement": {
    "selector": ".bmi-calculator",
    "displayName": "BMI Calculator",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "BMI Calculator",
        "group": "Content"
      },
      "subtitle": {
        "dataType": "text",
        "displayName": "Subtitle",
        "defaultValue": "Calculate your Body Mass Index",
        "group": "Content"
      },
      "showCategory": {
        "dataType": "booleanValue",
        "displayName": "Show BMI Category",
        "defaultValue": true,
        "group": "Content"
      },
      "showRange": {
        "dataType": "booleanValue",
        "displayName": "Show Healthy Range",
        "defaultValue": true,
        "group": "Content"
      },
      "unitSystem": {
        "dataType": "select",
        "displayName": "Default Unit System",
        "defaultValue": "metric",
        "options": ["metric", "imperial"],
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "containerBackground": {
        "dataType": "color",
        "displayName": "Container Background",
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
        "defaultValue": "#495057",
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
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "buttonHoverColor": {
        "dataType": "color",
        "displayName": "Button Hover Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "resultHighlightColor": {
        "dataType": "color",
        "displayName": "Result Highlight Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Base Font Size (px)",
        "defaultValue": 15,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 28,
        "group": "Typography"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "8px",
        "options": ["4px", "6px", "8px", "10px", "12px"],
        "group": "Layout"
      },
      "containerPadding": {
        "dataType": "select",
        "displayName": "Container Padding",
        "defaultValue": "24px",
        "options": ["16px", "20px", "24px", "28px", "32px"],
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
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [units, setUnits] = React.useState(config?.unitSystem || 'metric');
  const [bmi, setBmi] = React.useState(null);
  const [category, setCategory] = React.useState('');
  
  const bmiCategories = [
    { name: 'Underweight', min: 0, max: 18.5, color: '#6C757D' },
    { name: 'Normal weight', min: 18.5, max: 25, color: '#495057' },
    { name: 'Overweight', min: 25, max: 30, color: '#6C757D' },
    { name: 'Obese', min: 30, max: 100, color: '#6C757D' }
  ];
  
  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (!h || !w || h <= 0 || w <= 0) {
      setBmi(null);
      setCategory('');
      return;
    }
    
    let bmiValue;
    if (units === 'metric') {
      // kg / (m^2)
      bmiValue = w / ((h / 100) * (h / 100));
    } else {
      // (lbs / in^2) * 703
      bmiValue = (w / (h * h)) * 703;
    }
    
    setBmi(bmiValue.toFixed(1));
    
    // Determine category
    for (let cat of bmiCategories) {
      if (bmiValue >= cat.min && bmiValue < cat.max) {
        setCategory(cat.name);
        break;
      }
    }
  };
  
  React.useEffect(() => {
    calculateBMI();
  }, [height, weight, units]);
  
  const getHealthyRange = () => {
    const h = parseFloat(height);
    if (!h || h <= 0) return null;
    
    if (units === 'metric') {
      const heightM = h / 100;
      const minWeight = (18.5 * heightM * heightM).toFixed(1);
      const maxWeight = (25 * heightM * heightM).toFixed(1);
      return `${minWeight} - ${maxWeight} kg`;
    } else {
      const minWeight = ((18.5 * h * h) / 703).toFixed(1);
      const maxWeight = ((25 * h * h) / 703).toFixed(1);
      return `${minWeight} - ${maxWeight} lbs`;
    }
  };
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  const healthyRange = getHealthyRange();
  const currentCategory = bmiCategories.find(cat => cat.name === category);
  
  return (
    <div 
      className="bmi-calculator"
      style={{
        backgroundColor: config?.backgroundColor || '#FFFFFF',
        color: config?.textColor || '#212529',
        padding: config?.containerPadding || '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: `${config?.fontSize || 15}px`,
        fontWeight: config?.fontWeight || '400',
        maxWidth: '600px',
        margin: '0 auto',
        minHeight: '500px'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: `${config?.titleFontSize || 28}px`,
          fontWeight: '500',
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em'
        }}>
          {config?.title || 'BMI Calculator'}
        </h1>
        <div style={{
          color: config?.secondaryTextColor || '#495057',
          fontSize: `${(config?.fontSize || 15) * 0.93}px`
        }}>
          {config?.subtitle || 'Calculate your Body Mass Index'}
        </div>
      </div>
      
      {/* Unit Toggle */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        backgroundColor: config?.containerBackground || '#F8F9FA',
        padding: '4px',
        borderRadius: config?.cornerRadius || '8px'
      }}>
        <button
          onClick={() => setUnits('metric')}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: units === 'metric' ? '#FFFFFF' : 'transparent',
            border: 'none',
            borderRadius: config?.cornerRadius || '8px',
            cursor: 'pointer',
            fontSize: `${config?.fontSize || 15}px`,
            fontWeight: units === 'metric' ? '500' : '400',
            color: config?.textColor || '#212529',
            transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
            boxShadow: units === 'metric' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
          }}
        >
          Metric (cm, kg)
        </button>
        <button
          onClick={() => setUnits('imperial')}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: units === 'imperial' ? '#FFFFFF' : 'transparent',
            border: 'none',
            borderRadius: config?.cornerRadius || '8px',
            cursor: 'pointer',
            fontSize: `${config?.fontSize || 15}px`,
            fontWeight: units === 'imperial' ? '500' : '400',
            color: config?.textColor || '#212529',
            transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
            boxShadow: units === 'imperial' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
          }}
        >
          Imperial (in, lbs)
        </button>
      </div>
      
      {/* Input Section */}
      <div style={{
        backgroundColor: config?.containerBackground || '#F8F9FA',
        padding: '24px',
        borderRadius: config?.cornerRadius || '8px',
        border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
        marginBottom: '24px'
      }}>
        <div style={{ display: 'grid', gap: '16px' }}>
          {/* Height Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: `${(config?.fontSize || 15) * 0.87}px`,
              color: config?.secondaryTextColor || '#495057',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px'
            }}>
              Height ({units === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={units === 'metric' ? '170' : '67'}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                borderRadius: config?.cornerRadius || '8px',
                fontSize: `${config?.fontSize || 15}px`,
                fontFamily: 'inherit',
                fontWeight: '500',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out'
              }}
              onFocus={(e) => e.target.style.borderColor = config?.accentColor || '#495057'}
              onBlur={(e) => e.target.style.borderColor = config?.borderColor || '#E9ECEF'}
            />
          </div>
          
          {/* Weight Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: `${(config?.fontSize || 15) * 0.87}px`,
              color: config?.secondaryTextColor || '#495057',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px'
            }}>
              Weight ({units === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={units === 'metric' ? '70' : '154'}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                borderRadius: config?.cornerRadius || '8px',
                fontSize: `${config?.fontSize || 15}px`,
                fontFamily: 'inherit',
                fontWeight: '500',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out'
              }}
              onFocus={(e) => e.target.style.borderColor = config?.accentColor || '#495057'}
              onBlur={(e) => e.target.style.borderColor = config?.borderColor || '#E9ECEF'}
            />
          </div>
        </div>
      </div>
      
      {/* Result Section */}
      {bmi && (
        <div style={{
          opacity: prefersReducedMotion ? 1 : 0,
          transform: prefersReducedMotion ? 'none' : 'translateY(10px)',
          animation: prefersReducedMotion ? 'none' : 'contentAppear 400ms ease-out forwards'
        }}>
          {/* BMI Value */}
          <div style={{
            backgroundColor: config?.containerBackground || '#F8F9FA',
            padding: '32px 24px',
            borderRadius: config?.cornerRadius || '8px',
            border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: `${(config?.fontSize || 15) * 0.87}px`,
              color: config?.secondaryTextColor || '#495057',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              Your BMI
            </div>
            <div style={{
              fontSize: `${(config?.fontSize || 15) * 3.2}px`,
              fontWeight: '500',
              color: config?.resultHighlightColor || '#212529',
              marginBottom: (config?.showCategory !== false && category) ? '12px' : '0'
            }}>
              {bmi}
            </div>
            {(config?.showCategory !== false) && category && (
              <div style={{
                fontSize: `${(config?.fontSize || 15) * 1.07}px`,
                color: currentCategory?.color || config?.textColor || '#212529',
                fontWeight: '500'
              }}>
                {category}
              </div>
            )}
          </div>
          
          {/* BMI Scale Visualization */}
          <div style={{
            backgroundColor: config?.containerBackground || '#F8F9FA',
            padding: '20px',
            borderRadius: config?.cornerRadius || '8px',
            border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: `${(config?.fontSize || 15) * 0.87}px`,
              color: config?.secondaryTextColor || '#495057',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px'
            }}>
              BMI Categories
            </div>
            
            <div style={{ display: 'grid', gap: '8px' }}>
              {bmiCategories.map(cat => {
                const isActive = cat.name === category;
                return (
                  <div 
                    key={cat.name}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 12px',
                      backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                      borderRadius: config?.cornerRadius || '8px',
                      border: isActive ? `1px solid ${config?.borderColor || '#E9ECEF'}` : '1px solid transparent',
                      transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
                    }}
                  >
                    <div style={{
                      fontSize: `${(config?.fontSize || 15) * 0.93}px`,
                      fontWeight: isActive ? '500' : '400'
                    }}>
                      {cat.name}
                    </div>
                    <div style={{
                      fontSize: `${(config?.fontSize || 15) * 0.87}px`,
                      color: config?.secondaryTextColor || '#495057'
                    }}>
                      {cat.min} - {cat.max === 100 ? '∞' : cat.max}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Healthy Range */}
          {(config?.showRange !== false) && healthyRange && (
            <div style={{
              backgroundColor: config?.containerBackground || '#F8F9FA',
              padding: '16px 20px',
              borderRadius: config?.cornerRadius || '8px',
              fontSize: `${(config?.fontSize || 15) * 0.93}px`,
              lineHeight: '1.5',
              color: config?.secondaryTextColor || '#495057'
            }}>
              <strong style={{ color: config?.textColor || '#212529' }}>Healthy weight range:</strong> {healthyRange} for your height
            </div>
          )}
        </div>
      )}
      
      {/* Info */}
      {!bmi && (
        <div style={{
          textAlign: 'center',
          padding: '48px 20px',
          color: config?.secondaryTextColor || '#495057',
          fontSize: `${(config?.fontSize || 15) * 0.93}px`
        }}>
          Enter your height and weight to calculate your BMI
        </div>
      )}
      
      <style>{`
        @keyframes contentAppear {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export { MANIFEST, Component };
export default Component;
