import React from "react";

const MANIFEST = {
  "type": "Documentation.BMICalculatorAnalysis",
  "description": "Interactive analysis of the BMI Calculator generation process",
  "editorElement": {
    "selector": ".analysis-component",
    "displayName": "BMI Calculator Analysis",
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
  
  const content = {
    request: {
      original: '"Build a BMI calculator"',
      analysis: {
        core: ['Height and weight input', 'BMI calculation formula', 'Category classification', 'Unit system support (metric/imperial)', 'Visual result display'],
        sophistication: ['Real-time calculation', 'Category-based feedback', 'Healthy weight range calculation', 'Toggle interface for units', 'Progressive disclosure of results']
      }
    },
    triggers: [
      { name: 'Component Analysis & Design Brief', relevance: 90, reason: 'Health calculator classification' },
      { name: 'Safe Config Handling', relevance: 100, reason: 'Used config?.property throughout' },
      { name: 'Real-Time Calculation Pattern', relevance: 95, reason: 'useEffect for instant BMI updates' },
      { name: 'Standard Appearance Transitions', relevance: 85, reason: 'Result section fade-in' },
      { name: 'Toggle Interface Pattern', relevance: 90, reason: 'Unit system switcher' },
      { name: 'Category Visualization', relevance: 85, reason: 'BMI range display with active state' },
      { name: 'MANIFEST Property Exposure', relevance: 90, reason: '17+ properties with proper grouping' },
      { name: 'Design System: Colors', relevance: 85, reason: 'Cool Gray health aesthetic' }
    ]
  };
  
  const decisions = [
    { title: 'Dual Unit System with Toggle', reason: 'Support both metric and imperial measurements', code: `const [units, setUnits] = React.useState('metric');

if (units === 'metric') {
  bmiValue = w / ((h / 100) * (h / 100));
} else {
  bmiValue = (w / (h * h)) * 703;
}` },
    { title: 'Real-Time BMI Calculation', reason: 'Instant feedback as user types', code: `React.useEffect(() => {
  calculateBMI();
}, [height, weight, units]);` },
    { title: 'Category-Based Visual Feedback', reason: 'Help users understand their BMI context', code: `const bmiCategories = [
  { name: 'Underweight', min: 0, max: 18.5 },
  { name: 'Normal weight', min: 18.5, max: 25 },
  // ...
];

for (let cat of bmiCategories) {
  if (bmiValue >= cat.min && bmiValue < cat.max) {
    setCategory(cat.name);
  }
}` }
  ];
  
  const renderContent = () => {
    switch(activeSection) {
      case 'request':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>📝 Original Request</h2>
            <div style={{ backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
              <strong>{content.request.original}</strong>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '12px' }}>Request Analysis</h3>
            <div style={{ lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}><strong>Core Requirements:</strong></p>
              <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                {content.request.analysis.core.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
              <p style={{ marginBottom: '12px' }}><strong>Sophistication Elements:</strong></p>
              <ul style={{ marginLeft: '20px' }}>
                {content.request.analysis.sophistication.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>
        );
      case 'triggers':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>🎯 Prompt Sections Triggered</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {content.triggers.map((trigger, idx) => (
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
              {decisions.map((decision, idx) => (
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
        return <div><h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>⚙️ Code Structure</h2><p>Multi-state management, formula-based calculation, category determination logic, unit conversion handling</p></div>;
      default:
        return null;
    }
  };
  
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '600px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'grid', gridTemplateColumns: '240px 1fr' }}>
      <div style={{ backgroundColor: '#F8F9FA', padding: '24px', borderRight: '1px solid #E9ECEF' }}>
        <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '24px' }}>Analysis</div>
        <div style={{ display: 'grid', gap: '4px' }}>
          {sections.map(section => (
            <button key={section.id} onClick={() => setActiveSection(section.id)} style={{ padding: '12px 16px', backgroundColor: activeSection === section.id ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '6px', textAlign: 'left', cursor: 'pointer', fontSize: '15px', fontWeight: activeSection === section.id ? '500' : '400' }}>
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
