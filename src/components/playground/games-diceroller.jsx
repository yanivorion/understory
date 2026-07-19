import React from "react";

const MANIFEST = {
  "type": "Games.DiceRoller",
  "description": "Sophisticated dice roller with 3D rotation animations and multiple dice support",
  "editorElement": {
    "selector": ".dice-roller",
    "displayName": "Dice Roller",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "Dice Roller",
        "group": "Content"
      },
      "numberOfDice": {
        "dataType": "select",
        "displayName": "Number of Dice",
        "defaultValue": "1",
        "options": ["1", "2", "3", "4", "5", "6"],
        "group": "Content"
      },
      "showTotal": {
        "dataType": "booleanValue",
        "displayName": "Show Total (Multiple Dice)",
        "defaultValue": true,
        "group": "Content"
      },
      "showHistory": {
        "dataType": "booleanValue",
        "displayName": "Show Roll History",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "diceBackground": {
        "dataType": "color",
        "displayName": "Dice Background",
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
      "dotColor": {
        "dataType": "color",
        "displayName": "Dice Dot Color",
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
        "defaultValue": "12px",
        "options": ["8px", "10px", "12px", "14px", "16px"],
        "group": "Layout"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "800",
        "options": ["600", "800", "1000", "1200"],
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [diceValues, setDiceValues] = React.useState([6]);
  const [isRolling, setIsRolling] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  
  const numDice = parseInt(config?.numberOfDice || '1');
  
  // Initialize dice array when numDice changes
  React.useEffect(() => {
    setDiceValues(Array(numDice).fill(6));
  }, [numDice]);
  
  const rollDice = () => {
    setIsRolling(true);
    
    // Generate new random values
    const newValues = Array(numDice).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    
    setTimeout(() => {
      setDiceValues(newValues);
      setIsRolling(false);
      
      // Add to history
      if (config?.showHistory !== false) {
        setHistory(prev => [
          { values: newValues, total: newValues.reduce((a, b) => a + b, 0), time: new Date().toLocaleTimeString() },
          ...prev.slice(0, 9)
        ]);
      }
    }, parseInt(config?.animationDuration || '800'));
  };
  
  const getDiceDots = (value) => {
    const dotPositions = {
      1: [[50, 50]],
      2: [[25, 25], [75, 75]],
      3: [[25, 25], [50, 50], [75, 75]],
      4: [[25, 25], [75, 25], [25, 75], [75, 75]],
      5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
      6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]]
    };
    
    return dotPositions[value] || [];
  };
  
  const total = diceValues.reduce((sum, val) => sum + val, 0);
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  return (
    <div 
      className="dice-roller"
      style={{
        backgroundColor: config?.backgroundColor || '#FFFFFF',
        color: config?.textColor || '#212529',
        padding: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: `${config?.fontSize || 15}px`,
        fontWeight: config?.fontWeight || '400',
        maxWidth: '700px',
        margin: '0 auto',
        minHeight: '500px'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontSize: `${config?.titleFontSize || 28}px`,
          fontWeight: '500',
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em'
        }}>
          {config?.title || 'Dice Roller'}
        </h1>
        <div style={{
          color: config?.secondaryTextColor || '#495057',
          fontSize: `${(config?.fontSize || 15) * 0.93}px`
        }}>
          Roll the dice and test your luck
        </div>
      </div>
      
      {/* Dice Display */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
        marginBottom: '32px',
        minHeight: '140px',
        alignItems: 'center'
      }}>
        {diceValues.map((value, index) => (
          <div
            key={index}
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: config?.diceBackground || '#F8F9FA',
              border: `2px solid ${config?.borderColor || '#E9ECEF'}`,
              borderRadius: config?.cornerRadius || '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              transition: prefersReducedMotion ? 'none' : `transform ${config?.animationDuration || '800'}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              transform: isRolling 
                ? (prefersReducedMotion ? 'none' : `rotateX(${720 + index * 180}deg) rotateY(${720 + index * 90}deg)`) 
                : 'rotateX(0) rotateY(0)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {getDiceDots(value).map((pos, dotIndex) => (
                <div
                  key={dotIndex}
                  style={{
                    position: 'absolute',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: config?.dotColor || '#212529',
                    left: `${pos[0]}%`,
                    top: `${pos[1]}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Total Display */}
      {(config?.showTotal !== false) && numDice > 1 && (
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: config?.diceBackground || '#F8F9FA',
          borderRadius: config?.cornerRadius || '12px',
          border: `1px solid ${config?.borderColor || '#E9ECEF'}`
        }}>
          <div style={{
            fontSize: `${(config?.fontSize || 15) * 0.87}px`,
            color: config?.secondaryTextColor || '#495057',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            Total
          </div>
          <div style={{
            fontSize: `${(config?.fontSize || 15) * 2.4}px`,
            fontWeight: '500'
          }}>
            {total}
          </div>
        </div>
      )}
      
      {/* Roll Button */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <button
          onClick={rollDice}
          disabled={isRolling}
          style={{
            padding: '14px 48px',
            backgroundColor: isRolling ? config?.secondaryTextColor || '#495057' : config?.accentColor || '#495057',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: config?.cornerRadius || '12px',
            cursor: isRolling ? 'not-allowed' : 'pointer',
            fontSize: `${(config?.fontSize || 15) * 1.07}px`,
            fontWeight: '500',
            transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
            opacity: isRolling ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (!isRolling) e.target.style.backgroundColor = config?.buttonHoverColor || '#343A40';
          }}
          onMouseLeave={(e) => {
            if (!isRolling) e.target.style.backgroundColor = config?.accentColor || '#495057';
          }}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>
      
      {/* History */}
      {(config?.showHistory !== false) && history.length > 0 && (
        <div>
          <div style={{
            fontSize: `${(config?.fontSize || 15) * 0.87}px`,
            color: config?.secondaryTextColor || '#495057',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px'
          }}>
            Roll History
          </div>
          <div style={{ display: 'grid', gap: '8px' }}>
            {history.map((roll, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: config?.diceBackground || '#F8F9FA',
                  borderRadius: config?.cornerRadius || '12px',
                  border: `1px solid ${config?.borderColor || '#E9ECEF'}`,
                  opacity: prefersReducedMotion ? 1 : 0,
                  animation: prefersReducedMotion ? 'none' : `contentAppear 400ms ease-out ${index * 50}ms forwards`
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {roll.values.map((val, idx) => (
                    <span key={idx} style={{ 
                      fontSize: `${(config?.fontSize || 15) * 1.2}px`,
                      fontWeight: '500'
                    }}>
                      {val}
                    </span>
                  ))}
                  {numDice > 1 && (
                    <span style={{ 
                      fontSize: `${(config?.fontSize || 15) * 0.93}px`,
                      color: config?.secondaryTextColor || '#495057',
                      marginLeft: '8px'
                    }}>
                      = {roll.total}
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: `${(config?.fontSize || 15) * 0.8}px`,
                  color: config?.secondaryTextColor || '#495057'
                }}>
                  {roll.time}
                </div>
              </div>
            ))}
          </div>
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
