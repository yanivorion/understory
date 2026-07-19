import React from "react";

const MANIFEST = {
  "type": "Finance.ExpenseTracker",
  "description": "Sophisticated expense tracking component with category management, visual analytics, and budget monitoring",
  "editorElement": {
    "selector": ".expense-tracker",
    "displayName": "Expense Tracker",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "Expense Tracker",
        "group": "Content"
      },
      "currencySymbol": {
        "dataType": "text",
        "displayName": "Currency Symbol",
        "defaultValue": "$",
        "group": "Content"
      },
      "showBudget": {
        "dataType": "booleanValue",
        "displayName": "Show Budget Section",
        "defaultValue": true,
        "group": "Content"
      },
      "defaultBudget": {
        "dataType": "text",
        "displayName": "Default Monthly Budget",
        "defaultValue": "2000",
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
      "deleteColor": {
        "dataType": "color",
        "displayName": "Delete Button Color",
        "defaultValue": "#6C757D",
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
        "defaultValue": "12px",
        "options": ["8px", "10px", "12px", "16px", "20px"],
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
  const [expenses, setExpenses] = React.useState([]);
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('Food');
  const [budget, setBudget] = React.useState(parseFloat(config?.defaultBudget || '2000'));
  const [isEditingBudget, setIsEditingBudget] = React.useState(false);
  const [budgetInput, setBudgetInput] = React.useState(budget.toString());
  
  const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Other'];
  
  const currencySymbol = config?.currencySymbol || '$';
  const showBudget = config?.showBudget !== false;
  
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = budget - totalExpenses;
  const percentUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;
  
  const categoryTotals = categories.map(cat => ({
    name: cat,
    total: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  })).filter(c => c.total > 0);
  
  const maxCategoryTotal = Math.max(...categoryTotals.map(c => c.total), 1);
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  const handleAddExpense = () => {
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
  };
  
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };
  
  const handleBudgetSave = () => {
    const newBudget = parseFloat(budgetInput);
    if (!isNaN(newBudget) && newBudget > 0) {
      setBudget(newBudget);
    } else {
      setBudgetInput(budget.toString());
    }
    setIsEditingBudget(false);
  };
  
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };
  
  return (
    <div 
      className="expense-tracker"
      style={{
        backgroundColor: config?.backgroundColor || '#FFFFFF',
        color: config?.textColor || '#212529',
        padding: config?.containerPadding || '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: `${config?.fontSize || 15}px`,
        fontWeight: config?.fontWeight || '400',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '400px'
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
          {config?.title || 'Expense Tracker'}
        </h1>
        <div style={{
          color: config?.secondaryTextColor || '#495057',
          fontSize: `${(config?.fontSize || 15) * 0.93}px`
        }}>
          Track your spending and manage your budget
        </div>
      </div>
      
      {/* Budget Overview */}
      {showBudget && (
        <div style={{
          backgroundColor: config?.containerBackground || '#F8F9FA',
          padding: '20px',
          borderRadius: config?.cornerRadius || '8px',
          marginBottom: '24px',
          border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
          opacity: prefersReducedMotion ? 1 : 0,
          transform: prefersReducedMotion ? 'none' : 'translateY(10px)',
          animation: prefersReducedMotion ? 'none' : 'contentAppear 400ms ease-out forwards'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: `${(config?.fontSize || 15) * 0.87}px`,
              color: config?.secondaryTextColor || '#495057',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Monthly Budget
            </div>
            {isEditingBudget ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleBudgetSave)}
                  autoFocus
                  style={{
                    width: '120px',
                    padding: '6px 10px',
                    border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                    borderRadius: config?.cornerRadius || '8px',
                    fontSize: `${config?.fontSize || 15}px`,
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleBudgetSave}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: config?.accentColor || '#495057',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: config?.cornerRadius || '8px',
                    cursor: 'pointer',
                    fontSize: `${(config?.fontSize || 15) * 0.87}px`,
                    fontWeight: '500',
                    transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = config?.buttonHoverColor || '#343A40'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = config?.accentColor || '#495057'}
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsEditingBudget(true);
                  setBudgetInput(budget.toString());
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: config?.accentColor || '#495057',
                  cursor: 'pointer',
                  fontSize: `${(config?.fontSize || 15) * 0.87}px`,
                  textDecoration: 'underline',
                  padding: '0'
                }}
              >
                Edit
              </button>
            )}
          </div>
          
          <div style={{ 
            fontSize: `${(config?.fontSize || 15) * 1.87}px`,
            fontWeight: '500',
            marginBottom: '12px'
          }}>
            {currencySymbol}{budget.toFixed(2)}
          </div>
          
          {/* Progress Bar */}
          <div style={{
            height: '8px',
            backgroundColor: config?.borderColor || '#E9ECEF',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '12px'
          }}>
            <div style={{
              height: '100%',
              width: `${Math.min(percentUsed, 100)}%`,
              backgroundColor: percentUsed > 100 ? config?.deleteColor || '#6C757D' : config?.accentColor || '#495057',
              transition: prefersReducedMotion ? 'none' : 'width 400ms ease-out',
              borderRadius: '4px'
            }} />
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            fontSize: `${(config?.fontSize || 15) * 0.93}px`
          }}>
            <div>
              <div style={{ color: config?.secondaryTextColor || '#495057', marginBottom: '4px' }}>
                Spent
              </div>
              <div style={{ fontWeight: '500' }}>
                {currencySymbol}{totalExpenses.toFixed(2)}
              </div>
            </div>
            <div>
              <div style={{ color: config?.secondaryTextColor || '#495057', marginBottom: '4px' }}>
                Remaining
              </div>
              <div style={{ fontWeight: '500', color: remaining < 0 ? config?.deleteColor || '#6C757D' : 'inherit' }}>
                {currencySymbol}{remaining.toFixed(2)}
              </div>
            </div>
            <div>
              <div style={{ color: config?.secondaryTextColor || '#495057', marginBottom: '4px' }}>
                Used
              </div>
              <div style={{ fontWeight: '500' }}>
                {percentUsed.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Expense Form */}
      <div style={{
        backgroundColor: config?.containerBackground || '#F8F9FA',
        padding: '20px',
        borderRadius: config?.cornerRadius || '8px',
        marginBottom: '24px',
        border: `1px solid ${config?.borderColor || '#E9ECEF'}`
      }}>
        <div style={{
          fontSize: `${(config?.fontSize || 15) * 0.87}px`,
          color: config?.secondaryTextColor || '#495057',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '16px'
        }}>
          Add Expense
        </div>
        
        <div style={{ display: 'grid', gap: config?.itemGap || '12px' }}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, handleAddExpense)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
              borderRadius: config?.cornerRadius || '8px',
              fontSize: `${config?.fontSize || 15}px`,
              fontFamily: 'inherit',
              outline: 'none',
              transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out'
            }}
            onFocus={(e) => e.target.style.borderColor = config?.accentColor || '#495057'}
            onBlur={(e) => e.target.style.borderColor = config?.borderColor || '#E9ECEF'}
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: config?.itemGap || '12px' }}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleAddExpense)}
              style={{
                padding: '10px 12px',
                border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                borderRadius: config?.cornerRadius || '8px',
                fontSize: `${config?.fontSize || 15}px`,
                fontFamily: 'inherit',
                outline: 'none',
                transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out'
              }}
              onFocus={(e) => e.target.style.borderColor = config?.accentColor || '#495057'}
              onBlur={(e) => e.target.style.borderColor = config?.borderColor || '#E9ECEF'}
            />
            
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '10px 12px',
                border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                borderRadius: config?.cornerRadius || '8px',
                fontSize: `${config?.fontSize || 15}px`,
                fontFamily: 'inherit',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleAddExpense}
            style={{
              padding: '12px',
              backgroundColor: config?.accentColor || '#495057',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: config?.cornerRadius || '8px',
              cursor: 'pointer',
              fontSize: `${config?.fontSize || 15}px`,
              fontWeight: '500',
              transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = config?.buttonHoverColor || '#343A40'}
            onMouseLeave={(e) => e.target.style.backgroundColor = config?.accentColor || '#495057'}
          >
            Add Expense
          </button>
        </div>
      </div>
      
      {/* Category Breakdown */}
      {categoryTotals.length > 0 && (
        <div style={{
          backgroundColor: config?.containerBackground || '#F8F9FA',
          padding: '20px',
          borderRadius: config?.cornerRadius || '8px',
          marginBottom: '24px',
          border: `1px solid ${config?.borderColor || '#E9ECEF'}`
        }}>
          <div style={{
            fontSize: `${(config?.fontSize || 15) * 0.87}px`,
            color: config?.secondaryTextColor || '#495057',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px'
          }}>
            Category Breakdown
          </div>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {categoryTotals.map(cat => (
              <div key={cat.name}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                  fontSize: `${(config?.fontSize || 15) * 0.93}px`
                }}>
                  <span>{cat.name}</span>
                  <span style={{ fontWeight: '500' }}>
                    {currencySymbol}{cat.total.toFixed(2)}
                  </span>
                </div>
                <div style={{
                  height: '6px',
                  backgroundColor: config?.borderColor || '#E9ECEF',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(cat.total / maxCategoryTotal) * 100}%`,
                    backgroundColor: config?.accentColor || '#495057',
                    transition: prefersReducedMotion ? 'none' : 'width 400ms ease-out',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Expenses List */}
      <div>
        <div style={{
          fontSize: `${(config?.fontSize || 15) * 0.87}px`,
          color: config?.secondaryTextColor || '#495057',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '16px'
        }}>
          Recent Expenses ({expenses.length})
        </div>
        
        {expenses.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 20px',
            color: config?.secondaryTextColor || '#495057'
          }}>
            No expenses yet. Add your first expense above.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: config?.itemGap || '12px' }}>
            {expenses.map((expense, index) => (
              <div 
                key={expense.id}
                style={{
                  backgroundColor: config?.containerBackground || '#F8F9FA',
                  padding: '16px',
                  borderRadius: config?.cornerRadius || '8px',
                  border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: '16px',
                  opacity: prefersReducedMotion ? 1 : 0,
                  transform: prefersReducedMotion ? 'none' : 'translateY(10px)',
                  animation: prefersReducedMotion ? 'none' : `contentAppear 400ms ease-out ${index * 50}ms forwards`
                }}
              >
                <div>
                  <div style={{ 
                    fontWeight: '500',
                    marginBottom: '4px'
                  }}>
                    {expense.description}
                  </div>
                  <div style={{
                    fontSize: `${(config?.fontSize || 15) * 0.87}px`,
                    color: config?.secondaryTextColor || '#495057'
                  }}>
                    {expense.category} · {expense.date}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{ 
                    fontWeight: '500',
                    fontSize: `${(config?.fontSize || 15) * 1.07}px`
                  }}>
                    {currencySymbol}{expense.amount.toFixed(2)}
                  </div>
                  
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    aria-label="Delete expense"
                    style={{
                      width: '32px',
                      height: '32px',
                      border: 'none',
                      borderRadius: config?.cornerRadius || '8px',
                      backgroundColor: 'transparent',
                      color: config?.deleteColor || '#6C757D',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = config?.borderColor || '#E9ECEF'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
