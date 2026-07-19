import React from "react";

const MANIFEST = {
  "type": "Tools.UnitConverter",
  "description": "Sophisticated multi-category unit converter with real-time conversion and elegant interface",
  "editorElement": {
    "selector": ".unit-converter",
    "displayName": "Unit Converter",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "Unit Converter",
        "group": "Content"
      },
      "subtitle": {
        "dataType": "text",
        "displayName": "Subtitle",
        "defaultValue": "Convert between units with precision",
        "group": "Content"
      },
      "defaultCategory": {
        "dataType": "select",
        "displayName": "Default Category",
        "defaultValue": "Length",
        "options": ["Length", "Weight", "Temperature", "Volume", "Area", "Speed", "Time"],
        "group": "Content"
      },
      "showSwapButton": {
        "dataType": "booleanValue",
        "displayName": "Show Swap Button",
        "defaultValue": true,
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
      "activeTabColor": {
        "dataType": "color",
        "displayName": "Active Tab Background",
        "defaultValue": "#FFFFFF",
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
      },
      "itemGap": {
        "dataType": "select",
        "displayName": "Item Gap",
        "defaultValue": "16px",
        "options": ["12px", "14px", "16px", "18px", "20px"],
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
  const [category, setCategory] = React.useState(config?.defaultCategory || 'Length');
  const [fromValue, setFromValue] = React.useState('1');
  const [fromUnit, setFromUnit] = React.useState('');
  const [toUnit, setToUnit] = React.useState('');
  const [result, setResult] = React.useState('');
  
  const conversions = {
    Length: {
      units: ['Meters', 'Kilometers', 'Miles', 'Feet', 'Inches', 'Centimeters', 'Millimeters', 'Yards'],
      toBase: {
        'Meters': 1,
        'Kilometers': 1000,
        'Miles': 1609.34,
        'Feet': 0.3048,
        'Inches': 0.0254,
        'Centimeters': 0.01,
        'Millimeters': 0.001,
        'Yards': 0.9144
      }
    },
    Weight: {
      units: ['Kilograms', 'Grams', 'Pounds', 'Ounces', 'Tons', 'Milligrams'],
      toBase: {
        'Kilograms': 1,
        'Grams': 0.001,
        'Pounds': 0.453592,
        'Ounces': 0.0283495,
        'Tons': 1000,
        'Milligrams': 0.000001
      }
    },
    Temperature: {
      units: ['Celsius', 'Fahrenheit', 'Kelvin'],
      toBase: null // Special handling
    },
    Volume: {
      units: ['Liters', 'Milliliters', 'Gallons', 'Quarts', 'Pints', 'Cups', 'Fluid Ounces'],
      toBase: {
        'Liters': 1,
        'Milliliters': 0.001,
        'Gallons': 3.78541,
        'Quarts': 0.946353,
        'Pints': 0.473176,
        'Cups': 0.236588,
        'Fluid Ounces': 0.0295735
      }
    },
    Area: {
      units: ['Square Meters', 'Square Kilometers', 'Square Miles', 'Square Feet', 'Acres', 'Hectares'],
      toBase: {
        'Square Meters': 1,
        'Square Kilometers': 1000000,
        'Square Miles': 2589988,
        'Square Feet': 0.092903,
        'Acres': 4046.86,
        'Hectares': 10000
      }
    },
    Speed: {
      units: ['Meters/Second', 'Kilometers/Hour', 'Miles/Hour', 'Feet/Second', 'Knots'],
      toBase: {
        'Meters/Second': 1,
        'Kilometers/Hour': 0.277778,
        'Miles/Hour': 0.44704,
        'Feet/Second': 0.3048,
        'Knots': 0.514444
      }
    },
    Time: {
      units: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Years'],
      toBase: {
        'Seconds': 1,
        'Minutes': 60,
        'Hours': 3600,
        'Days': 86400,
        'Weeks': 604800,
        'Years': 31536000
      }
    }
  };
  
  // Initialize units when category changes
  React.useEffect(() => {
    const units = conversions[category]?.units || [];
    if (units.length >= 2) {
      setFromUnit(units[0]);
      setToUnit(units[1]);
    }
  }, [category]);
  
  // Perform conversion
  React.useEffect(() => {
    if (!fromValue || !fromUnit || !toUnit || isNaN(parseFloat(fromValue))) {
      setResult('');
      return;
    }
    
    const value = parseFloat(fromValue);
    let convertedValue;
    
    if (category === 'Temperature') {
      // Special temperature conversion logic
      let celsius;
      if (fromUnit === 'Celsius') celsius = value;
      else if (fromUnit === 'Fahrenheit') celsius = (value - 32) * 5/9;
      else if (fromUnit === 'Kelvin') celsius = value - 273.15;
      
      if (toUnit === 'Celsius') convertedValue = celsius;
      else if (toUnit === 'Fahrenheit') convertedValue = celsius * 9/5 + 32;
      else if (toUnit === 'Kelvin') convertedValue = celsius + 273.15;
    } else {
      // Standard conversion through base unit
      const toBase = conversions[category].toBase;
      const baseValue = value * toBase[fromUnit];
      convertedValue = baseValue / toBase[toUnit];
    }
    
    // Format result with appropriate precision
    const formatted = convertedValue < 0.01 || convertedValue > 10000
      ? convertedValue.toExponential(4)
      : convertedValue.toFixed(6).replace(/\.?0+$/, '');
    
    setResult(formatted);
  }, [fromValue, fromUnit, toUnit, category]);
  
  const handleSwap = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    if (result) {
      setFromValue(result);
    }
  };
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  const categories = Object.keys(conversions);
  const currentUnits = conversions[category]?.units || [];
  
  return (
    <div 
      className="unit-converter"
      style={{
        backgroundColor: config?.backgroundColor || '#FFFFFF',
        color: config?.textColor || '#212529',
        padding: config?.containerPadding || '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: `${config?.fontSize || 15}px`,
        fontWeight: config?.fontWeight || '400',
        maxWidth: '700px',
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
          {config?.title || 'Unit Converter'}
        </h1>
        <div style={{
          color: config?.secondaryTextColor || '#495057',
          fontSize: `${(config?.fontSize || 15) * 0.93}px`
        }}>
          {config?.subtitle || 'Convert between units with precision'}
        </div>
      </div>
      
      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '10px 16px',
              backgroundColor: category === cat 
                ? config?.activeTabColor || '#FFFFFF'
                : config?.containerBackground || '#F8F9FA',
              border: `1px solid ${category === cat ? config?.borderColor || '#E9ECEF' : 'transparent'}`,
              borderRadius: config?.cornerRadius || '8px',
              cursor: 'pointer',
              fontSize: `${(config?.fontSize || 15) * 0.93}px`,
              fontWeight: category === cat ? '500' : '400',
              color: config?.textColor || '#212529',
              transition: prefersReducedMotion ? 'none' : 'all 250ms ease-out',
              whiteSpace: 'nowrap',
              boxShadow: category === cat ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Conversion Interface */}
      <div style={{
        backgroundColor: config?.containerBackground || '#F8F9FA',
        padding: '24px',
        borderRadius: config?.cornerRadius || '8px',
        border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
        opacity: prefersReducedMotion ? 1 : 0,
        transform: prefersReducedMotion ? 'none' : 'translateY(10px)',
        animation: prefersReducedMotion ? 'none' : 'contentAppear 400ms ease-out forwards'
      }}>
        {/* From Section */}
        <div style={{ marginBottom: config?.itemGap || '16px' }}>
          <label style={{
            display: 'block',
            fontSize: `${(config?.fontSize || 15) * 0.87}px`,
            color: config?.secondaryTextColor || '#495057',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            From
          </label>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '12px' 
          }}>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              placeholder="Enter value"
              style={{
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
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              style={{
                padding: '12px',
                border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                borderRadius: config?.cornerRadius || '8px',
                fontSize: `${config?.fontSize || 15}px`,
                fontFamily: 'inherit',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              {currentUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Swap Button */}
        {(config?.showSwapButton !== false) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginBottom: config?.itemGap || '16px'
          }}>
            <button
              onClick={handleSwap}
              aria-label="Swap units"
              style={{
                width: '40px',
                height: '40px',
                border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                borderRadius: config?.cornerRadius || '8px',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: config?.accentColor || '#495057',
                transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = config?.containerBackground || '#F8F9FA';
                e.target.style.transform = prefersReducedMotion ? 'none' : 'rotate(180deg)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.transform = 'rotate(0deg)';
              }}
            >
              ⇅
            </button>
          </div>
        )}
        
        {/* To Section */}
        <div style={{ marginBottom: config?.itemGap || '16px' }}>
          <label style={{
            display: 'block',
            fontSize: `${(config?.fontSize || 15) * 0.87}px`,
            color: config?.secondaryTextColor || '#495057',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            To
          </label>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '12px' 
          }}>
            <div style={{
              padding: '12px',
              border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
              borderRadius: config?.cornerRadius || '8px',
              fontSize: `${config?.fontSize || 15}px`,
              fontWeight: '500',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              color: result ? config?.textColor || '#212529' : config?.secondaryTextColor || '#495057',
              minHeight: '45px'
            }}>
              {result || '—'}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              style={{
                padding: '12px',
                border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                borderRadius: config?.cornerRadius || '8px',
                fontSize: `${config?.fontSize || 15}px`,
                fontFamily: 'inherit',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              {currentUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Result Display */}
        {result && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#FFFFFF',
            borderRadius: config?.cornerRadius || '8px',
            border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
            opacity: prefersReducedMotion ? 1 : 0,
            animation: prefersReducedMotion ? 'none' : 'contentAppear 400ms ease-out forwards'
          }}>
            <div style={{
              fontSize: `${(config?.fontSize || 15) * 0.87}px`,
              color: config?.secondaryTextColor || '#495057',
              marginBottom: '8px'
            }}>
              Conversion Result
            </div>
            <div style={{
              fontSize: `${(config?.fontSize || 15) * 1.2}px`,
              fontWeight: '500',
              color: config?.textColor || '#212529',
              wordBreak: 'break-all'
            }}>
              {fromValue} {fromUnit} = {result} {toUnit}
            </div>
          </div>
        )}
      </div>
      
      {/* Info Section */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: config?.containerBackground || '#F8F9FA',
        borderRadius: config?.cornerRadius || '8px',
        fontSize: `${(config?.fontSize || 15) * 0.87}px`,
        color: config?.secondaryTextColor || '#495057',
        lineHeight: '1.5'
      }}>
        <strong>Quick tip:</strong> Enter any value to see real-time conversion. 
        Use the swap button to quickly reverse the conversion direction.
      </div>
      
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
