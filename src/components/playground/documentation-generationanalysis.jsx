import React from "react";

const MANIFEST = {
  "type": "Documentation.GenerationAnalysis",
  "description": "Interactive analysis of Toast Notification System component generation process",
  "editorElement": {
    "selector": ".generation-analysis",
    "displayName": "Generation Analysis - Toast System",
    "archetype": "container",
    "data": {
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
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
  
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const accentColor = config?.accentColor || '#495057';

  const sections = [
    { id: 'request', label: '📝 Original Request', icon: '📝' },
    { id: 'triggered', label: '🎯 Prompt Sections', icon: '🎯' },
    { id: 'decisions', label: '🎨 Design Decisions', icon: '🎨' },
    { id: 'structure', label: '⚙️ Code Structure', icon: '⚙️' }
  ];

  const promptSections = [
    { name: 'Playground Code Format', relevance: 100, reason: 'Required MANIFEST structure with safe config access' },
    { name: 'Design Philosophy', relevance: 95, reason: 'Sophisticated, elegant, minimalist approach applied' },
    { name: 'Monochromatic Palettes', relevance: 90, reason: 'Cool Gray palette selected for professional interface' },
    { name: 'Animation Guidelines', relevance: 85, reason: 'Smooth 400ms transitions with ease-out timing' },
    { name: 'Typography Strategy', relevance: 80, reason: 'Contemporary Minimal font system (400-500 weights)' },
    { name: 'Accessibility Requirements', relevance: 90, reason: 'ARIA labels, reduced motion, keyboard support' },
    { name: 'Property Exposure', relevance: 95, reason: 'Comprehensive MANIFEST with grouped properties' },
    { name: 'Corner Radius Strategy', relevance: 75, reason: 'Moderate rounded (8px) for modern elegant feel' },
    { name: 'Shadow Strategy', relevance: 80, reason: 'Soft shadows (0.08 opacity) for depth' },
    { name: 'Responsive Design', relevance: 70, reason: 'Position system adapts to screen context' },
    { name: 'Safe Config Handling', relevance: 100, reason: 'Optional chaining for all config access' },
    { name: 'Standard Transitions', relevance: 85, reason: 'Slide-in appearance animation applied' }
  ];

  const designDecisions = [
    {
      title: 'Stacking Architecture',
      reason: 'Used array-based state management to handle multiple simultaneous notifications with automatic trimming to maxVisible limit',
      code: `const addToast = (type, title, message) => {
  setToasts(prev => {
    const updated = [...prev, newToast];
    return updated.slice(-maxVisible);
  });
};`
    },
    {
      title: 'Position System',
      reason: 'Implemented 6-position layout system using fixed positioning with transform centering for top/bottom-center variants',
      code: `const positions = {
  'top-center': { 
    top: 0, 
    left: '50%', 
    transform: 'translateX(-50%)' 
  }
};`
    },
    {
      title: 'Type-Based Color System',
      reason: 'Created dynamic color mapping that respects user customization while maintaining semantic meaning for each notification type',
      code: `const getTypeColor = (type) => {
  const colors = {
    success: successColor,
    error: errorColor,
    warning: warningColor,
    info: infoColor
  };
  return colors[type] || infoColor;
};`
    },
    {
      title: 'Auto-Dismiss with Cleanup',
      reason: 'Implemented setTimeout-based auto-dismiss that can be toggled, with proper cleanup on manual dismissal',
      code: `if (autoDismiss) {
  setTimeout(() => {
    removeToast(id);
  }, dismissDuration);
}`
    },
    {
      title: 'Staggered Entrance Animation',
      reason: 'Applied index-based animation delays for cascading reveal effect, creating visual rhythm',
      code: `animation: 'toastSlideIn 400ms ease-out forwards',
animationDelay: \`\${index * 50}ms\``
    },
    {
      title: 'Icon Component System',
      reason: 'Built inline SVG icon components for zero external dependencies and perfect color synchronization',
      code: `const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" 
       fill="none" stroke={successColor} strokeWidth="2">
    <path d="M16.5 5.5L7.5 14.5L3.5 10.5"/>
  </svg>
);`
    },
    {
      title: 'Pointer Events Management',
      reason: 'Container has pointer-events: none to avoid blocking page interactions, while individual toasts restore interactivity',
      code: `// Container
pointerEvents: 'none'

// Individual toast
pointerEvents: 'auto'`
    },
    {
      title: 'Border Accent Pattern',
      reason: 'Used left border accent (3px solid) instead of full border to create subtle type differentiation without overwhelming',
      code: `borderLeft: \`3px solid \${getTypeColor(toast.type)}\``
    },
    {
      title: 'Reduced Motion Compliance',
      reason: 'Detected prefers-reduced-motion and provided instant state changes instead of animations for accessibility',
      code: `const prefersReducedMotion = 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

animation: prefersReducedMotion ? 'none' : 'toastSlideIn 400ms'`
    },
    {
      title: 'Demo Mode System',
      reason: 'Implemented timed demo sequence on mount for immediate visual feedback and component showcase',
      code: `React.useEffect(() => {
  if (demoMode) {
    setTimeout(() => addToast('success', 'Success', '...'), 500);
    setTimeout(() => addToast('info', 'Update', '...'), 1500);
  }
}, [demoMode]);`
    }
  ];

  const structurePatterns = [
    { name: 'State Management', desc: 'Array-based toast queue with unique ID system' },
    { name: 'Config Safety', desc: 'Optional chaining (config?.property) for all config access' },
    { name: 'Type System', desc: 'String-based type mapping to color/icon functions' },
    { name: 'Cleanup Pattern', desc: 'setTimeout with manual override for auto-dismiss' },
    { name: 'Position Calculator', desc: 'Object-based position style generator' },
    { name: 'Icon Components', desc: 'Inline functional SVG components' },
    { name: 'Animation System', desc: 'CSS keyframes with staggered delays' },
    { name: 'Accessibility Layer', desc: 'ARIA labels, reduced motion detection' },
    { name: 'Event Handlers', desc: 'Inline hover effects with style mutations' },
    { name: 'Demo Controls', desc: 'Interactive trigger buttons for testing' },
    { name: 'Responsive Stack', desc: 'Flexbox column with gap-based spacing' },
    { name: 'MANIFEST Structure', desc: 'Comprehensive property exposure with grouping' }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'request':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', color: textColor, marginBottom: '24px' }}>
              Original User Request
            </h2>
            <div style={{
              backgroundColor: '#F8F9FA',
              padding: '24px',
              borderRadius: '8px',
              borderLeft: `3px solid ${accentColor}`,
              marginBottom: '24px'
            }}>
              <p style={{ fontSize: '16px', color: textColor, lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>
                "Hey, I need a sleek notification toast system for my dashboard. It should support different types (success, error, info, warning) and stack nicely when multiple notifications appear. Make it feel premium and modern."
              </p>
            </div>
            
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: textColor, marginBottom: '16px' }}>
              Request Analysis
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ 
                  width: '4px', 
                  backgroundColor: accentColor, 
                  borderRadius: '2px',
                  flexShrink: 0 
                }}></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: textColor, marginBottom: '4px' }}>
                    Component Type
                  </div>
                  <div style={{ fontSize: '14px', color: '#6C757D' }}>
                    Notification system with state management
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ 
                  width: '4px', 
                  backgroundColor: accentColor, 
                  borderRadius: '2px',
                  flexShrink: 0 
                }}></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: textColor, marginBottom: '4px' }}>
                    Key Requirements
                  </div>
                  <div style={{ fontSize: '14px', color: '#6C757D' }}>
                    Multiple types (success, error, info, warning), stacking behavior, premium aesthetic
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ 
                  width: '4px', 
                  backgroundColor: accentColor, 
                  borderRadius: '2px',
                  flexShrink: 0 
                }}></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: textColor, marginBottom: '4px' }}>
                    Visual Direction
                  </div>
                  <div style={{ fontSize: '14px', color: '#6C757D' }}>
                    "Sleek", "premium", "modern" → triggers Sophisticated/Elegant profile
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'triggered':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', color: textColor, marginBottom: '24px' }}>
              Prompt Sections Triggered
            </h2>
            <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '24px', lineHeight: '1.6' }}>
              These sections of the system prompt were activated to generate this component, ranked by relevance:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {promptSections.map((section, index) => (
                <div key={index} style={{
                  backgroundColor: '#FAFAFA',
                  padding: '16px',
                  borderRadius: '6px',
                  border: '1px solid #E9ECEF'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: textColor }}>
                      {section.name}
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      backgroundColor: section.relevance >= 90 ? accentColor : '#ADB5BD',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {section.relevance}%
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6C757D', lineHeight: '1.5' }}>
                    {section.reason}
                  </div>
                  
                  {/* Progress bar */}
                  <div style={{
                    marginTop: '12px',
                    height: '3px',
                    backgroundColor: '#E9ECEF',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${section.relevance}%`,
                      height: '100%',
                      backgroundColor: accentColor,
                      transition: 'width 800ms ease-out'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'decisions':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', color: textColor, marginBottom: '24px' }}>
              Design Decisions & Implementation
            </h2>
            <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '24px', lineHeight: '1.6' }}>
              Key architectural choices and their rationale:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {designDecisions.map((decision, index) => (
                <div key={index} style={{
                  backgroundColor: '#FAFAFA',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #E9ECEF'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      backgroundColor: accentColor,
                      color: '#FFFFFF',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '500',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: '500', color: textColor, margin: 0 }}>
                      {decision.title}
                    </h3>
                  </div>
                  
                  <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6', marginBottom: '16px' }}>
                    {decision.reason}
                  </p>
                  
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    padding: '16px',
                    borderRadius: '6px',
                    border: '1px solid #E9ECEF',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: textColor,
                    lineHeight: '1.6',
                    overflowX: 'auto'
                  }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{decision.code}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'structure':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '500', color: textColor, marginBottom: '24px' }}>
              Code Structure & Patterns
            </h2>
            <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '24px', lineHeight: '1.6' }}>
              Architectural patterns and code organization used in this component:
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {structurePatterns.map((pattern, index) => (
                <div key={index} style={{
                  backgroundColor: '#FAFAFA',
                  padding: '16px',
                  borderRadius: '6px',
                  border: '1px solid #E9ECEF'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: textColor,
                    marginBottom: '8px'
                  }}>
                    {pattern.name}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#6C757D',
                    lineHeight: '1.5'
                  }}>
                    {pattern.desc}
                  </div>
                </div>
              ))}
            </div>
            
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: textColor, marginBottom: '16px' }}>
              Component Architecture
            </h3>
            <div style={{
              backgroundColor: '#FAFAFA',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #E9ECEF'
            }}>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: textColor,
                lineHeight: '1.8'
              }}>
                <div>📦 Component Root</div>
                <div style={{ paddingLeft: '20px' }}>├─ 🎛️ State Management (toasts, nextId)</div>
                <div style={{ paddingLeft: '20px' }}>├─ 🔧 Config Safety Layer (optional chaining)</div>
                <div style={{ paddingLeft: '20px' }}>├─ ♿ Accessibility Detection (reduced motion)</div>
                <div style={{ paddingLeft: '20px' }}>├─ 🎨 Style Calculators (position, colors)</div>
                <div style={{ paddingLeft: '20px' }}>├─ 📝 Toast Management (add, remove)</div>
                <div style={{ paddingLeft: '20px' }}>├─ 🎭 Icon Components (4 types)</div>
                <div style={{ paddingLeft: '20px' }}>├─ 🎬 Demo Mode Effect</div>
                <div style={{ paddingLeft: '20px' }}>├─ 🖼️ UI Render</div>
                <div style={{ paddingLeft: '40px' }}>   ├─ Demo Controls</div>
                <div style={{ paddingLeft: '40px' }}>   └─ Toast Stack Container</div>
                <div style={{ paddingLeft: '60px' }}>        └─ Individual Toasts (mapped)</div>
                <div style={{ paddingLeft: '20px' }}>└─ 💅 Animation Keyframes</div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="generation-analysis" style={{
      width: '100%',
      minHeight: '600px',
      backgroundColor: backgroundColor,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      display: 'flex',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '260px',
        backgroundColor: '#F8F9FA',
        borderRight: '1px solid #E9ECEF',
        padding: '24px 0',
        flexShrink: 0
      }}>
        <div style={{
          padding: '0 24px',
          marginBottom: '24px'
        }}>
          <h1 style={{
            fontSize: '18px',
            fontWeight: '500',
            color: textColor,
            margin: 0
          }}>
            Generation Analysis
          </h1>
          <div style={{
            fontSize: '13px',
            color: '#6C757D',
            marginTop: '4px'
          }}>
            Toast Notification System
          </div>
        </div>
        
        <nav>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: activeSection === section.id ? backgroundColor : 'transparent',
                border: 'none',
                borderLeft: `3px solid ${activeSection === section.id ? accentColor : 'transparent'}`,
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSection === section.id ? '500' : '400',
                color: activeSection === section.id ? textColor : '#6C757D',
                transition: 'all 200ms ease-out',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== section.id) {
                  e.target.style.backgroundColor = '#FAFAFA';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== section.id) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{section.icon}</span>
              <span>{section.label.split(' ')[1]}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Content Area */}
      <div style={{
        flex: 1,
        padding: '40px',
        overflowY: 'auto',
        maxHeight: '100vh'
      }}>
        {renderContent()}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
