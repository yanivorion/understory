import React from "react";

const MANIFEST = {"type": "Documentation.WhackAMoleAnalysis", "description": "Analysis of Whack-a-Mole game component", "editorElement": {"selector": ".analysis-component", "displayName": "Whack-a-Mole Analysis", "archetype": "container", "data": {"backgroundColor": {"dataType": "color", "displayName": "Background Color", "defaultValue": "#FFFFFF", "group": "Colors"}}, "layout": {"resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical"}}};

function Component({ config = {} }) {
  const [activeSection, setActiveSection] = React.useState('request');
  const sections = [{id: 'request', label: '📝 Original Request'}, {id: 'triggers', label: '🎯 Prompt Sections'}, {id: 'decisions', label: '🎨 Design Decisions'}, {id: 'structure', label: '⚙️ Code Structure'}];
  
  const renderContent = () => {
    if (activeSection === 'request') return <div><h2 style={{fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#212529'}}>📝 Original Request</h2><div style={{backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '8px', marginBottom: '24px', color: '#212529'}}><strong>"Build a whack-a-mole game"</strong></div><p style={{lineHeight: '1.6', color: '#212529'}}><strong>Requirements:</strong> Grid of holes, Random mole appearances, Click detection and scoring, Game timer, High score tracking, Game state management (idle/playing/finished), Mole appearance animation</p></div>;
    if (activeSection === 'triggers') return <div><h2 style={{fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#212529'}}>🎯 Key Patterns</h2><ul style={{lineHeight: '1.8', color: '#212529'}}><li>Game State Machine (idle/playing/finished)</li><li>Dual setInterval Logic (timer + mole spawning)</li><li>Random Index Generation</li><li>Array State for Active Moles</li><li>setTimeout for Mole Disappearance</li><li>Conditional Grid Layout (3x3 vs 4x4)</li><li>Score Tracking and High Score Persistence</li></ul></div>;
    if (activeSection === 'decisions') return <div><h2 style={{fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#212529'}}>🎨 Design Decisions</h2><div style={{marginBottom: '16px', color: '#212529'}}><h3 style={{fontSize: '18px', fontWeight: '500', marginBottom: '8px'}}>Random Mole Spawning</h3><p>Interval-based random selection with duplicate prevention</p><pre style={{backgroundColor: '#F8F9FA', padding: '16px', borderRadius: '8px', fontSize: '13px'}}>{`const randomHole = Math.floor(Math.random() * gridCount);
if (!moles.includes(randomHole)) {
  setMoles(prev => [...prev, randomHole]);
  setTimeout(() => {
    setMoles(prev => prev.filter(m => m !== randomHole));
  }, moleSpeed);
}`}</pre></div><div style={{marginBottom: '16px', color: '#212529'}}><h3 style={{fontSize: '18px', fontWeight: '500', marginBottom: '8px'}}>Click Detection & Scoring</h3><p>Check if clicked hole has active mole</p><pre style={{backgroundColor: '#F8F9FA', padding: '16px', borderRadius: '8px', fontSize: '13px'}}>{`const handleWhack = (holeIndex) => {
  if (moles.includes(holeIndex)) {
    setScore(s => s + 1);
    setMoles(prev => prev.filter(m => m !== holeIndex));
  }
};`}</pre></div></div>;
    return <div><h2 style={{fontSize: '24px', fontWeight: '500', color: '#212529'}}>⚙️ Code Structure</h2><p style={{color: '#212529'}}>State machine pattern, dual interval management, array filtering for mole removal, conditional rendering per game state, high score comparison logic, dynamic grid sizing</p></div>;
  };
  
  return (
    <div style={{backgroundColor: '#FFFFFF', minHeight: '600px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'grid', gridTemplateColumns: '240px 1fr'}}>
      <div style={{backgroundColor: '#F8F9FA', padding: '24px', borderRight: '1px solid #E9ECEF'}}>
        <div style={{fontSize: '20px', fontWeight: '500', marginBottom: '24px', color: '#212529'}}>Analysis</div>
        <div style={{display: 'grid', gap: '4px'}}>
          {sections.map(s => <button key={s.id} onClick={() => setActiveSection(s.id)} style={{padding: '12px 16px', backgroundColor: activeSection === s.id ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '6px', textAlign: 'left', cursor: 'pointer', fontSize: '15px', fontWeight: activeSection === s.id ? '500' : '400', color: '#212529'}}>{s.label}</button>)}
        </div>
      </div>
      <div style={{padding: '40px', overflow: 'auto'}}>{renderContent()}</div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
