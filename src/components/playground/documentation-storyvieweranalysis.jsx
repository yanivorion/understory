import React from "react";

const MANIFEST = {
  "type": "Documentation.StoryViewerAnalysis",
  "description": "Analysis of Story Viewer component generation",
  "editorElement": {
    "selector": ".analysis-component",
    "displayName": "Story Viewer Analysis",
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
  
  const renderContent = () => {
    if (activeSection === 'request') return <div><h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#212529' }}>📝 Original Request</h2><div style={{ backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '8px', marginBottom: '24px', color: '#212529' }}><strong>"Make a story viewer like Instagram with progress bars"</strong></div><p style={{ lineHeight: '1.6', color: '#212529' }}><strong>Core Requirements:</strong> Progress bar array, Auto-advance timer, Navigation controls, Pause/play functionality, Story counter</p></div>;
    if (activeSection === 'triggers') return <div><h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#212529' }}>🎯 Key Patterns</h2><ul style={{ lineHeight: '1.8', color: '#212529' }}><li>Interval-based Progress Animation</li><li>Array State Management for Multiple Stories</li><li>Layered Positioning (progress, controls, content)</li><li>Click Zone Navigation Areas</li><li>Pause/Resume Timer Control</li></ul></div>;
    if (activeSection === 'decisions') return <div><h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#212529' }}>🎨 Design Decisions</h2><div style={{ marginBottom: '16px', color: '#212529' }}><h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>Progress Bar Array</h3><p>Individual bars for each story with fill animation</p><pre style={{ backgroundColor: '#F8F9FA', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>{`width: index < currentIndex ? '100%' : 
  (index === currentIndex ? progress+'%' : '0%')`}</pre></div></div>;
    return <div><h2 style={{ fontSize: '24px', fontWeight: '500', color: '#212529' }}>⚙️ Code Structure</h2><p style={{ color: '#212529' }}>setInterval progress tracking, click zone overlays, conditional rendering for navigation, story array slicing</p></div>;
  };
  
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '600px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'grid', gridTemplateColumns: '240px 1fr' }}>
      <div style={{ backgroundColor: '#F8F9FA', padding: '24px', borderRight: '1px solid #E9ECEF' }}>
        <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '24px', color: '#212529' }}>Analysis</div>
        <div style={{ display: 'grid', gap: '4px' }}>
          {sections.map(s => <button key={s.id} onClick={() => setActiveSection(s.id)} style={{ padding: '12px 16px', backgroundColor: activeSection === s.id ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '6px', textAlign: 'left', cursor: 'pointer', fontSize: '15px', fontWeight: activeSection === s.id ? '500' : '400', color: '#212529' }}>{s.label}</button>)}
        </div>
      </div>
      <div style={{ padding: '40px', overflow: 'auto' }}>{renderContent()}</div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
