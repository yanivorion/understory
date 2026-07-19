import React from "react";

const MANIFEST = {
  "type": "Documentation.DiceRollerAnalysis",
  "description": "Interactive analysis of the Dice Roller generation process",
  "editorElement": {
    "selector": ".analysis-component",
    "displayName": "Dice Roller Analysis",
    "archetype": "container",
    "data": { "backgroundColor": { "dataType": "color", "displayName": "Background Color", "defaultValue": "#FFFFFF", "group": "Colors" } },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
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
  
  const triggers = [
    { name: '3D Transform Animations', relevance: 95, reason: 'Applied rotateX/rotateY for dice roll effect' },
    { name: 'Animation Duration Control', relevance: 90, reason: 'Exposed animation timing as property' },
    { name: 'Safe Config Handling', relevance: 100, reason: 'Used config?.property throughout' },
    { name: 'Multi-State Management', relevance: 90, reason: 'Dice values, rolling state, history' },
    { name: 'Staggered Animations', relevance: 85, reason: 'History items appear with delays' },
    { name: 'Design System: Corner Radius', relevance: 80, reason: '12px default for playful feel' }
  ];
  
  const decisions = [
    { title: '3D Rotation Animation', reason: 'Create realistic dice rolling effect', code: `transform: isRolling 
  ? 'rotateX(720deg) rotateY(720deg)' 
  : 'rotateX(0) rotateY(0)',
transformStyle: 'preserve-3d',
perspective: '1000px'` },
    { title: 'Dot Position Mapping', reason: 'Visual representation of dice faces', code: `const dotPositions = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  // ... positions for 3-6
};` },
    { title: 'Roll History Tracking', reason: 'Let users see previous rolls', code: `setHistory(prev => [
  { values: newValues, total, time: new Date().toLocaleTimeString() },
  ...prev.slice(0, 9)
]);` }
  ];
  
  const renderContent = () => {
    if (activeSection === 'request') return <div><h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>📝 Original Request</h2><div style={{ backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '8px' }}><strong>"Make a dice roller with animation"</strong></div></div>;
    if (activeSection === 'triggers') return <div><h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>🎯 Prompt Sections Triggered</h2><div style={{ display: 'grid', gap: '12px' }}>{triggers.map((t, idx) => <div key={idx} style={{ backgroundColor: '#F8F9FA', padding: '16px', borderRadius: '8px' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><div style={{ fontWeight: '500' }}>{t.name}</div><div style={{ backgroundColor: '#495057', color: '#FFF', padding: '4px 10px', borderRadius: '4px', fontSize: '13px' }}>{t.relevance}%</div></div><div style={{ fontSize: '14px', opacity: 0.8 }}>{t.reason}</div></div>)}</div></div>;
    if (activeSection === 'decisions') return <div><h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px' }}>🎨 Design Decisions</h2><div style={{ display: 'grid', gap: '24px' }}>{decisions.map((d, idx) => <div key={idx}><h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>{d.title}</h3><div style={{ marginBottom: '12px' }}>{d.reason}</div><pre style={{ backgroundColor: '#F8F9FA', padding: '16px', borderRadius: '8px', fontSize: '13px' }}><code>{d.code}</code></pre></div>)}</div></div>;
    return <div><h2 style={{ fontSize: '24px', fontWeight: '500' }}>⚙️ Code Structure</h2><p>3D transform pattern, dot positioning system, timeout-based animation sequencing, history array management</p></div>;
  };
  
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '600px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'grid', gridTemplateColumns: '240px 1fr' }}>
      <div style={{ backgroundColor: '#F8F9FA', padding: '24px', borderRight: '1px solid #E9ECEF' }}>
        <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '24px' }}>Analysis</div>
        <div style={{ display: 'grid', gap: '4px' }}>
          {sections.map(s => <button key={s.id} onClick={() => setActiveSection(s.id)} style={{ padding: '12px 16px', backgroundColor: activeSection === s.id ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '6px', textAlign: 'left', cursor: 'pointer', fontSize: '15px', fontWeight: activeSection === s.id ? '500' : '400' }}>{s.label}</button>)}
        </div>
      </div>
      <div style={{ padding: '40px', overflow: 'auto' }}>{renderContent()}</div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
