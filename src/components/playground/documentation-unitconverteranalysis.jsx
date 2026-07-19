import React from "react";

const MANIFEST = {
  "type": "Documentation.UnitConverterAnalysis",
  "description": "Interactive analysis of the Unit Converter generation process",
  "editorElement": {
    "selector": ".analysis-component",
    "displayName": "Unit Converter Analysis",
    "archetype": "container",
    "data": {
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
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
  const [activeSection, setActiveSection] = React.useState('request');
  
  const sections = [
    { id: 'request', label: '📝 Original Request' },
    { id: 'triggers', label: '🎯 Prompt Sections' },
    { id: 'decisions', label: '🎨 Design Decisions' },
    { id: 'structure', label: '⚙️ Code Structure' }
  ];
  
  const promptTriggers = [
    { name: 'Component Analysis & Design Brief', relevance: 90, reason: 'Classified as technical tool component' },
    { name: 'Safe Config Handling', relevance: 100, reason: 'Used config?.property throughout' },
    { name: 'MANIFEST Property Exposure', relevance: 95, reason: 'Exposed 18+ properties across 5 groups' },
    { name: 'Standard Appearance Transitions', relevance: 85, reason: 'Applied to conversion interface' },
    { name: 'Design System: Colors (Cool Gray)', relevance: 90, reason: 'Technical tool aesthetic' },
    { name: 'React State Management', relevance: 95, reason: 'Multiple state hooks for conversion logic' },
    { name: 'Real-time Calculation Pattern', relevance: 90, reason: 'useEffect for live conversion' },
    { name: 'Accessibility: Semantic HTML', relevance: 80, reason: 'Labels and ARIA attributes' },
    { name: 'Tab Navigation Pattern', relevance: 85, reason: 'Category switching with active states' },
    { name: 'Design System: Corner Radius', relevance: 80, reason: '8px elegant default' },
    { name: 'Typography Hierarchy', relevance: 75, reason: 'Scaled font sizes with base multipliers' },
    { name: 'Responsive Grid Layout', relevance: 85, reason: 'Two-column input/select grid' }
  ];
  
  const designDecisions = [
    {
      title: 'Multi-Category Architecture with Tab Interface',
      reason: 'Organized 7 conversion categories with clear visual switching',
      code: `const conversions = {
  Length: { units: [...], toBase: {...} },
  Weight: { units: [...], toBase: {...} },
  Temperature: { units: [...], toBase: null },
  // ... 4 more categories
};

<div style={{ display: 'flex', gap: '8px' }}>
  {categories.map(cat => (
    <button
      onClick={() => setCategory(cat)}
      style={{
        backgroundColor: category === cat ? activeColor : inactiveColor,
        border: category === cat ? solidBorder : 'none'
      }}
    >
      {cat}
    </button>
  ))}
</div>`
    },
    {
      title: 'Real-Time Conversion with useEffect',
      reason: 'Instant feedback as user types or changes units',
      code: `React.useEffect(() => {
  if (!fromValue || !fromUnit || !toUnit || isNaN(parseFloat(fromValue))) {
    setResult('');
    return;
  }
  
  const value = parseFloat(fromValue);
  const baseValue = value * toBase[fromUnit];
  const convertedValue = baseValue / toBase[toUnit];
  
  const formatted = convertedValue < 0.01 || convertedValue > 10000
    ? convertedValue.toExponential(4)
    : convertedValue.toFixed(6).replace(/\.?0+$/, '');
  
  setResult(formatted);
}, [fromValue, fromUnit, toUnit, category]);`
    },
    {
      title: 'Base Unit Conversion Strategy',
      reason: 'Efficient conversion through intermediate base unit',
      code: `// Convert any unit to any other unit:
// 1. Convert FROM unit to base (meters, kg, etc)
// 2. Convert FROM base to TO unit

const toBase = conversions[category].toBase;
const baseValue = value * toBase[fromUnit];
const convertedValue = baseValue / toBase[toUnit];

// Example: 5 feet to inches
// 5 * 0.3048 = 1.524 meters (base)
// 1.524 / 0.0254 = 60 inches`
    },
    {
      title: 'Special Temperature Handling',
      reason: 'Temperature requires formula-based conversion, not multipliers',
      code: `if (category === 'Temperature') {
  let celsius;
  if (fromUnit === 'Celsius') celsius = value;
  else if (fromUnit === 'Fahrenheit') celsius = (value - 32) * 5/9;
  else if (fromUnit === 'Kelvin') celsius = value - 273.15;
  
  if (toUnit === 'Celsius') convertedValue = celsius;
  else if (toUnit === 'Fahrenheit') convertedValue = celsius * 9/5 + 32;
  else if (toUnit === 'Kelvin') convertedValue = celsius + 273.15;
}`
    },
    {
      title: 'Intelligent Result Formatting',
      reason: 'Display precision appropriate to magnitude',
      code: `const formatted = convertedValue < 0.01 || convertedValue > 10000
  ? convertedValue.toExponential(4)  // Scientific notation for extremes
  : convertedValue.toFixed(6).replace(/\.?0+$/, '');  // Remove trailing zeros`
    },
    {
      title: 'Swap Button with Rotation Animation',
      reason: 'Visual feedback for unit reversal action',
      code: `const handleSwap = () => {
  const tempUnit = fromUnit;
  setFromUnit(toUnit);
  setToUnit(tempUnit);
  if (result) setFromValue(result);
};

<button
  onClick={handleSwap}
  onMouseEnter={(e) => {
    e.target.style.transform = 'rotate(180deg)';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'rotate(0deg)';
  }}
>
  ⇅
</button>`
    },
    {
      title: 'Dynamic Unit Initialization',
      reason: 'Auto-select appropriate units when category changes',
      code: `React.useEffect(() => {
  const units = conversions[category]?.units || [];
  if (units.length >= 2) {
    setFromUnit(units[0]);
    setToUnit(units[1]);
  }
}, [category]);`
    },
    {
      title: 'Result Display with Conditional Rendering',
      reason: 'Only show result card when conversion is valid',
      code: `{result && (
  <div style={{
    opacity: 0,
    animation: 'contentAppear 400ms ease-out forwards'
  }}>
    <div>{fromValue} {fromUnit} = {result} {toUnit}</div>
  </div>
)}`
    }
  ];
  
  const codeStructure = [
    { 
      name: 'Comprehensive Conversion Data Structure', 
      description: '7 categories with base unit conversion ratios',
      code: `const conversions = {
  Length: {
    units: ['Meters', 'Kilometers', 'Miles', ...],
    toBase: { 'Meters': 1, 'Kilometers': 1000, ... }
  },
  // Temperature uses null toBase for special handling
  Temperature: { units: ['Celsius', 'Fahrenheit', 'Kelvin'], toBase: null }
};`
    },
    { 
      name: 'Multi-State Management Pattern', 
      description: '5 state hooks for conversion interface',
      code: `const [category, setCategory] = React.useState('Length');
const [fromValue, setFromValue] = React.useState('1');
const [fromUnit, setFromUnit] = React.useState('');
const [toUnit, setToUnit] = React.useState('');
const [result, setResult] = React.useState('');`
    },
    { 
      name: 'Safe Config Access Throughout', 
      description: 'Optional chaining for all config properties',
      code: `config?.defaultCategory || 'Length'
config?.showSwapButton !== false
fontSize: \`\${config?.fontSize || 15}px\``
    },
    { 
      name: 'Real-Time Calculation Engine', 
      description: 'useEffect dependency array triggers recalculation',
      code: `React.useEffect(() => {
  // Conversion logic
}, [fromValue, fromUnit, toUnit, category]);
// Runs whenever any input changes`
    },
    { 
      name: 'Dynamic UI Generation', 
      description: 'Category tabs and unit dropdowns from data',
      code: `{categories.map(cat => <button key={cat}>{cat}</button>)}
{currentUnits.map(unit => <option key={unit} value={unit}>{unit}</option>)}`
    },
    { 
      name: 'Grid-Based Form Layout', 
      description: 'Responsive two-column input structure',
      code: `<div style={{ 
  display: 'grid', 
  gridTemplateColumns: '1fr 1fr', 
  gap: '12px' 
}}>
  <input type="number" />
  <select></select>
</div>`
    },
    { 
      name: 'Conditional Precision Formatting', 
      description: 'Scientific notation for extreme values',
      code: `const formatted = convertedValue < 0.01 || convertedValue > 10000
  ? convertedValue.toExponential(4)
  : convertedValue.toFixed(6).replace(/\.?0+$/, '');`
    },
    { 
      name: 'Active State Visualization', 
      description: 'Tab highlighting with smooth transitions',
      code: `backgroundColor: category === cat ? activeColor : inactiveColor,
border: category === cat ? solidBorder : 'transparent',
transition: 'all 250ms ease-out'`
    },
    { 
      name: 'Swap Animation Pattern', 
      description: 'Transform-based rotation on hover',
      code: `onMouseEnter={(e) => e.target.style.transform = 'rotate(180deg)'}
onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg)'}`
    },
    { 
      name: 'Focus State Enhancement', 
      description: 'Border color change on input focus',
      code: `onFocus={(e) => e.target.style.borderColor = accentColor}
onBlur={(e) => e.target.style.borderColor = borderColor}`
    }
  ];
  
  const renderContent = () => {
    switch(activeSection) {
      case 'request':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>
              📝 Original Request
            </h2>
            <div style={{ backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
              <strong>"Build a unit converter (km to miles, etc)"</strong>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '12px' }}>Request Analysis</h3>
            <div style={{ lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}><strong>Core Requirements:</strong></p>
              <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <li>Multiple conversion categories (length, weight, temperature, etc.)</li>
                <li>Real-time conversion as user types</li>
                <li>Bidirectional conversion capability</li>
                <li>Precise mathematical accuracy</li>
                <li>Clear input/output interface</li>
              </ul>
              <p style={{ marginBottom: '12px' }}><strong>Technical Sophistication:</strong></p>
              <ul style={{ marginLeft: '20px' }}>
                <li>Base unit conversion strategy for efficiency</li>
                <li>Special handling for temperature (formula-based)</li>
                <li>Scientific notation for extreme values</li>
                <li>Category-based organization with 7 types</li>
              </ul>
            </div>
          </div>
        );
      case 'triggers':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>🎯 Prompt Sections Triggered</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {promptTriggers.map((trigger, idx) => (
                <div key={idx} style={{ backgroundColor: '#F8F9FA', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontWeight: '500' }}>{trigger.name}</div>
                    <div style={{ backgroundColor: '#495057', color: '#FFF', padding: '4px 10px', borderRadius: '4px', fontSize: '13px' }}>
                      {trigger.relevance}%
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>{trigger.reason}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'decisions':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>🎨 Design Decisions</h2>
            <div style={{ display: 'grid', gap: '24px' }}>
              {designDecisions.map((decision, idx) => (
                <div key={idx}>
                  <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>{decision.title}</h3>
                  <div style={{ marginBottom: '12px', lineHeight: '1.6' }}>{decision.reason}</div>
                  <pre style={{ backgroundColor: '#F8F9FA', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '13px', lineHeight: '1.5' }}>
                    <code>{decision.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        );
      case 'structure':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>⚙️ Code Structure</h2>
            <div style={{ display: 'grid', gap: '24px' }}>
              {codeStructure.map((item, idx) => (
                <div key={idx}>
                  <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>{item.name}</h3>
                  <div style={{ marginBottom: '12px', lineHeight: '1.6' }}>{item.description}</div>
                  <pre style={{ backgroundColor: '#F8F9FA', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '13px', lineHeight: '1.5' }}>
                    <code>{item.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div style={{
      backgroundColor: config?.backgroundColor || '#FFFFFF',
      minHeight: '600px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'grid',
      gridTemplateColumns: '240px 1fr'
    }}>
      <div style={{ backgroundColor: '#F8F9FA', padding: '24px', borderRight: '1px solid #E9ECEF' }}>
        <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '24px' }}>Analysis</div>
        <div style={{ display: 'grid', gap: '4px' }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                padding: '12px 16px',
                backgroundColor: activeSection === section.id ? '#FFFFFF' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: activeSection === section.id ? '500' : '400'
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '40px', overflow: 'auto' }}>{renderContent()}</div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
