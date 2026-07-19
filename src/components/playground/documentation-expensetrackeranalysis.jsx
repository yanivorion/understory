import React from "react";

const MANIFEST = {
  "type": "Documentation.ExpenseTrackerAnalysis",
  "description": "Interactive analysis showing the generation process for the Expense Tracker component",
  "editorElement": {
    "selector": ".analysis-component",
    "displayName": "Expense Tracker Analysis",
    "archetype": "container",
    "data": {
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "sidebarBackground": {
        "dataType": "color",
        "displayName": "Sidebar Background",
        "defaultValue": "#F8F9FA",
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
  
  const sections = [
    { id: 'request', label: '📝 Original Request', emoji: '📝' },
    { id: 'triggers', label: '🎯 Prompt Sections', emoji: '🎯' },
    { id: 'decisions', label: '🎨 Design Decisions', emoji: '🎨' },
    { id: 'structure', label: '⚙️ Code Structure', emoji: '⚙️' }
  ];
  
  const promptTriggers = [
    { name: 'Component Analysis & Design Brief', relevance: 95, reason: 'Classified complexity and created design brief' },
    { name: 'Design System: Colors', relevance: 90, reason: 'Applied Cool Gray monochromatic palette' },
    { name: 'Safe Config Handling', relevance: 100, reason: 'Used config?.property pattern throughout' },
    { name: 'MANIFEST Property Exposure', relevance: 95, reason: 'Exposed 20+ properties with proper grouping' },
    { name: 'Responsive Design Guidelines', relevance: 75, reason: 'Made component responsive with max-width' },
    { name: 'Accessibility Requirements', relevance: 85, reason: 'Added ARIA labels and keyboard navigation' },
    { name: 'Animation Guidelines', relevance: 80, reason: 'Applied staggered appearance animations' },
    { name: 'Standard Appearance Transitions', relevance: 90, reason: 'Used opacity + translateY for content reveals' },
    { name: 'Design System: Corner Radius', relevance: 85, reason: 'Applied 8px default for elegant feel' },
    { name: 'Design System: Typography', relevance: 80, reason: 'Used 300-500 weights, proper hierarchy' },
    { name: 'Color Contrast Requirements', relevance: 75, reason: 'Ensured WCAG AA compliance' },
    { name: 'Performance Optimization', relevance: 70, reason: 'Used GPU-accelerated transforms' }
  ];
  
  const designDecisions = [
    {
      title: 'Budget Overview with Progress Visualization',
      reason: 'Financial tracking needs clear budget status at a glance',
      code: `const percentUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

<div style={{
  height: '8px',
  backgroundColor: config?.borderColor || '#E9ECEF',
  borderRadius: '4px',
  overflow: 'hidden'
}}>
  <div style={{
    height: '100%',
    width: \`\${Math.min(percentUsed, 100)}%\`,
    backgroundColor: percentUsed > 100 
      ? config?.deleteColor || '#6C757D' 
      : config?.accentColor || '#495057',
    transition: 'width 400ms ease-out'
  }} />
</div>`
    },
    {
      title: 'Category-Based Visual Analytics',
      reason: 'Users need to see spending patterns by category',
      code: `const categoryTotals = categories.map(cat => ({
  name: cat,
  total: expenses.filter(e => e.category === cat)
    .reduce((sum, e) => sum + e.amount, 0)
})).filter(c => c.total > 0);

// Relative bar sizing
const maxCategoryTotal = Math.max(...categoryTotals.map(c => c.total), 1);
width: \`\${(cat.total / maxCategoryTotal) * 100}%\``
    },
    {
      title: 'Inline Budget Editing',
      reason: 'Allow budget changes without disrupting workflow',
      code: `const [isEditingBudget, setIsEditingBudget] = React.useState(false);

{isEditingBudget ? (
  <input
    value={budgetInput}
    onChange={(e) => setBudgetInput(e.target.value)}
    onKeyPress={(e) => handleKeyPress(e, handleBudgetSave)}
    autoFocus
  />
) : (
  <button onClick={() => setIsEditingBudget(true)}>
    Edit
  </button>
)}`
    },
    {
      title: 'Staggered List Animations',
      reason: 'Create visual hierarchy and guide attention',
      code: `{expenses.map((expense, index) => (
  <div 
    style={{
      opacity: prefersReducedMotion ? 1 : 0,
      transform: prefersReducedMotion ? 'none' : 'translateY(10px)',
      animation: prefersReducedMotion 
        ? 'none' 
        : \`contentAppear 400ms ease-out \${index * 50}ms forwards\`
    }}
  >
    {/* Expense content */}
  </div>
))}`
    },
    {
      title: 'Cool Gray Monochromatic Palette',
      reason: 'Professional financial interface needs sophisticated, trustworthy aesthetic',
      code: `// Cool Gray Palette
Base 1: '#FFFFFF'
Base 2: '#F8F9FA'
Text: '#212529'
Secondary: '#495057'
Border: '#E9ECEF'
Accent: '#495057'`
    },
    {
      title: 'Keyboard Navigation Support',
      reason: 'Accessibility and power user efficiency',
      code: `const handleKeyPress = (e, action) => {
  if (e.key === 'Enter') {
    action();
  }
};

<input
  onKeyPress={(e) => handleKeyPress(e, handleAddExpense)}
/>`
    },
    {
      title: 'Comprehensive Property Exposure',
      reason: 'Allow complete customization without code changes',
      code: `// 20+ properties across 5 groups:
Content: title, currency, budget settings
Colors: 8 color properties
Typography: fontSize, fontWeight, titleSize
Layout: radius, padding, gaps
// All using safe config access:
config?.property || defaultValue`
    },
    {
      title: 'Visual Feedback for Budget Status',
      reason: 'Color change alerts user when over budget',
      code: `<div style={{ 
  fontWeight: '500', 
  color: remaining < 0 
    ? config?.deleteColor || '#6C757D' 
    : 'inherit' 
}}>
  {currencySymbol}{remaining.toFixed(2)}
</div>`
    }
  ];
  
  const codeStructure = [
    { 
      name: 'State Management Pattern', 
      description: 'Multiple useState hooks for form inputs, expenses array, and budget editing',
      code: `const [expenses, setExpenses] = React.useState([]);
const [description, setDescription] = React.useState('');
const [amount, setAmount] = React.useState('');
const [category, setCategory] = React.useState('Food');
const [budget, setBudget] = React.useState(parseFloat(config?.defaultBudget || '2000'));
const [isEditingBudget, setIsEditingBudget] = React.useState(false);`
    },
    { 
      name: 'Derived State Calculations', 
      description: 'Computed values from expenses array for analytics',
      code: `const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
const remaining = budget - totalExpenses;
const percentUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

const categoryTotals = categories.map(cat => ({
  name: cat,
  total: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
})).filter(c => c.total > 0);`
    },
    { 
      name: 'Safe Config Access Pattern', 
      description: 'Optional chaining with fallbacks throughout',
      code: `const currencySymbol = config?.currencySymbol || '$';
const showBudget = config?.showBudget !== false;
backgroundColor: config?.backgroundColor || '#FFFFFF'`
    },
    { 
      name: 'Event Handler Architecture', 
      description: 'Centralized handlers for add, delete, and edit operations',
      code: `const handleAddExpense = () => {
  if (description.trim() && amount && parseFloat(amount) > 0) {
    const newExpense = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    };
    setExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
  }
};`
    },
    { 
      name: 'Reduced Motion Compliance', 
      description: 'Respects user accessibility preferences',
      code: `const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

opacity: prefersReducedMotion ? 1 : 0,
transform: prefersReducedMotion ? 'none' : 'translateY(10px)',
animation: prefersReducedMotion ? 'none' : 'contentAppear 400ms ease-out forwards'`
    },
    { 
      name: 'Progressive Enhancement Layout', 
      description: 'Grid-based responsive layout with semantic structure',
      code: `<div style={{ display: 'grid', gap: config?.itemGap || '12px' }}>
  <input type="text" placeholder="Description" />
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: config?.itemGap || '12px' 
  }}>
    <input type="number" placeholder="Amount" />
    <select value={category}>...</select>
  </div>
</div>`
    },
    { 
      name: 'Inline Editing Pattern', 
      description: 'Conditional rendering for edit/view modes',
      code: `{isEditingBudget ? (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <input value={budgetInput} onChange={...} autoFocus />
    <button onClick={handleBudgetSave}>Save</button>
  </div>
) : (
  <button onClick={() => setIsEditingBudget(true)}>Edit</button>
)}`
    },
    { 
      name: 'Data Aggregation Logic', 
      description: 'Category grouping and statistical calculations',
      code: `const categoryTotals = categories.map(cat => ({
  name: cat,
  total: expenses.filter(e => e.category === cat)
    .reduce((sum, e) => sum + e.amount, 0)
})).filter(c => c.total > 0);

const maxCategoryTotal = Math.max(...categoryTotals.map(c => c.total), 1);`
    },
    { 
      name: 'Animation Orchestration', 
      description: 'Keyframe definition with staggered delays',
      code: `<style>{\`
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
\`}</style>

animation: \`contentAppear 400ms ease-out \${index * 50}ms forwards\``
    },
    { 
      name: 'Interactive State Transitions', 
      description: 'Hover effects with smooth color transitions',
      code: `onMouseEnter={(e) => e.target.style.backgroundColor = config?.buttonHoverColor || '#343A40'}
onMouseLeave={(e) => e.target.style.backgroundColor = config?.accentColor || '#495057'}

style={{
  transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out'
}}`
    },
    { 
      name: 'Semantic HTML Structure', 
      description: 'Proper use of form elements and ARIA labels',
      code: `<button
  onClick={() => handleDeleteExpense(expense.id)}
  aria-label="Delete expense"
  style={{...}}
>
  ×
</button>`
    },
    { 
      name: 'Typography Hierarchy System', 
      description: 'Scaled font sizes with configurable base',
      code: `fontSize: \`\${config?.titleFontSize || 28}px\`,  // Title
fontSize: \`\${config?.fontSize || 15}px\`,         // Body
fontSize: \`\${(config?.fontSize || 15) * 1.87}px\`, // Large number
fontSize: \`\${(config?.fontSize || 15) * 0.87}px\`  // Small text`
    }
  ];
  
  const renderContent = () => {
    switch(activeSection) {
      case 'request':
        return (
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '500', 
              marginBottom: '16px',
              color: config?.textColor || '#212529'
            }}>
              📝 Original Request
            </h2>
            <div style={{
              backgroundColor: config?.sidebarBackground || '#F8F9FA',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '15px',
              lineHeight: '1.6',
              color: config?.textColor || '#212529'
            }}>
              <strong>"Build an expense tracker"</strong>
            </div>
            
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '12px' }}>
              Request Analysis
            </h3>
            <div style={{ lineHeight: '1.6', color: config?.textColor || '#212529' }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>Core Requirements Identified:</strong>
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <li>Ability to add and track individual expenses</li>
                <li>Categorization system for different expense types</li>
                <li>Budget management and monitoring</li>
                <li>Visual analytics and spending insights</li>
                <li>Persistent expense history with delete functionality</li>
              </ul>
              
              <p style={{ marginBottom: '12px' }}>
                <strong>Implied Sophistication:</strong>
              </p>
              <ul style={{ marginLeft: '20px' }}>
                <li>Financial applications require trust and professionalism</li>
                <li>Users need clear visual feedback on budget status</li>
                <li>Category-based analytics for spending awareness</li>
                <li>Smooth interactions for frequent use</li>
              </ul>
            </div>
          </div>
        );
        
      case 'triggers':
        return (
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '500', 
              marginBottom: '16px',
              color: config?.textColor || '#212529'
            }}>
              🎯 Prompt Sections Triggered
            </h2>
            <div style={{ marginBottom: '16px', color: config?.textColor || '#212529' }}>
              These sections of the system prompt were activated during component generation:
            </div>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {promptTriggers.map((trigger, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: config?.sidebarBackground || '#F8F9FA',
                    padding: '16px',
                    borderRadius: '8px',
                    border: `1px solid ${config?.sidebarBackground || '#F8F9FA'}`
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontWeight: '500', color: config?.textColor || '#212529' }}>
                      {trigger.name}
                    </div>
                    <div style={{
                      backgroundColor: config?.accentColor || '#495057',
                      color: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {trigger.relevance}%
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: config?.textColor || '#212529',
                    opacity: 0.8
                  }}>
                    {trigger.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'decisions':
        return (
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '500', 
              marginBottom: '16px',
              color: config?.textColor || '#212529'
            }}>
              🎨 Design Decisions
            </h2>
            <div style={{ marginBottom: '24px', color: config?.textColor || '#212529' }}>
              Key architectural and design choices made during component creation:
            </div>
            
            <div style={{ display: 'grid', gap: '24px' }}>
              {designDecisions.map((decision, index) => (
                <div key={index}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '500', 
                    marginBottom: '8px',
                    color: config?.textColor || '#212529'
                  }}>
                    {decision.title}
                  </h3>
                  <div style={{ 
                    marginBottom: '12px', 
                    color: config?.textColor || '#212529',
                    lineHeight: '1.6'
                  }}>
                    {decision.reason}
                  </div>
                  <pre style={{
                    backgroundColor: config?.sidebarBackground || '#F8F9FA',
                    padding: '16px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: config?.textColor || '#212529'
                  }}>
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
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '500', 
              marginBottom: '16px',
              color: config?.textColor || '#212529'
            }}>
              ⚙️ Code Structure
            </h2>
            <div style={{ marginBottom: '24px', color: config?.textColor || '#212529' }}>
              Architectural patterns and structural decisions in the component:
            </div>
            
            <div style={{ display: 'grid', gap: '24px' }}>
              {codeStructure.map((item, index) => (
                <div key={index}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '500', 
                    marginBottom: '8px',
                    color: config?.textColor || '#212529'
                  }}>
                    {item.name}
                  </h3>
                  <div style={{ 
                    marginBottom: '12px', 
                    color: config?.textColor || '#212529',
                    lineHeight: '1.6'
                  }}>
                    {item.description}
                  </div>
                  <pre style={{
                    backgroundColor: config?.sidebarBackground || '#F8F9FA',
                    padding: '16px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: config?.textColor || '#212529'
                  }}>
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
    <div 
      className="analysis-component"
      style={{
        backgroundColor: config?.backgroundColor || '#FFFFFF',
        minHeight: '600px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: '0'
      }}
    >
      {/* Sidebar */}
      <div style={{
        backgroundColor: config?.sidebarBackground || '#F8F9FA',
        padding: '24px',
        borderRight: `1px solid ${config?.sidebarBackground || '#F8F9FA'}`
      }}>
        <div style={{
          fontSize: '20px',
          fontWeight: '500',
          marginBottom: '24px',
          color: config?.textColor || '#212529'
        }}>
          Analysis
        </div>
        
        <div style={{ display: 'grid', gap: '4px' }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                padding: '12px 16px',
                backgroundColor: activeSection === section.id 
                  ? config?.backgroundColor || '#FFFFFF'
                  : 'transparent',
                border: 'none',
                borderRadius: '6px',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '15px',
                color: config?.textColor || '#212529',
                transition: 'background-color 200ms ease-out',
                fontWeight: activeSection === section.id ? '500' : '400'
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div style={{
        padding: '40px',
        overflow: 'auto'
      }}>
        {renderContent()}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
