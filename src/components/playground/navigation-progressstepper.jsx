import React from "react";

const MANIFEST = {
  "type": "Navigation.ProgressStepper",
  "description": "Sophisticated progress stepper with animated transitions, smooth progress bar, and step states",
  "editorElement": {
    "selector": ".stepper-container",
    "displayName": "Progress Stepper",
    "archetype": "container",
    "data": {
      "steps": {
        "dataType": "text",
        "displayName": "Steps (comma-separated)",
        "defaultValue": "Account Details,Company Info,Preferences,Review,Complete",
        "group": "Content"
      },
      "currentStep": {
        "dataType": "select",
        "displayName": "Current Step",
        "defaultValue": "2",
        "options": ["0", "1", "2", "3", "4", "5", "6"],
        "group": "Content"
      },
      "showStepNumbers": {
        "dataType": "booleanValue",
        "displayName": "Show Step Numbers",
        "defaultValue": true,
        "group": "Content"
      },
      "completedColor": {
        "dataType": "color",
        "displayName": "Completed Step Color",
        "defaultValue": "#8B7F73",
        "group": "Colors"
      },
      "activeColor": {
        "dataType": "color",
        "displayName": "Active Step Color",
        "defaultValue": "#2B2520",
        "group": "Colors"
      },
      "inactiveColor": {
        "dataType": "color",
        "displayName": "Inactive Step Color",
        "defaultValue": "#D4D4D4",
        "group": "Colors"
      },
      "progressBarBackground": {
        "dataType": "color",
        "displayName": "Progress Bar Background",
        "defaultValue": "#F0F0F0",
        "group": "Colors"
      },
      "progressBarFill": {
        "dataType": "color",
        "displayName": "Progress Bar Fill",
        "defaultValue": "#8B7F73",
        "group": "Colors"
      },
      "textCompletedColor": {
        "dataType": "color",
        "displayName": "Completed Text Color",
        "defaultValue": "#6B6158",
        "group": "Colors"
      },
      "textActiveColor": {
        "dataType": "color",
        "displayName": "Active Text Color",
        "defaultValue": "#2B2520",
        "group": "Colors"
      },
      "textInactiveColor": {
        "dataType": "color",
        "displayName": "Inactive Text Color",
        "defaultValue": "#A3A3A3",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui, -apple-system, sans-serif",
        "options": [
          "system-ui, -apple-system, sans-serif",
          "Inter, sans-serif",
          "Georgia, serif"
        ],
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "select",
        "displayName": "Label Size",
        "defaultValue": "14px",
        "options": ["12px", "13px", "14px", "15px", "16px"],
        "group": "Typography"
      },
      "circleSize": {
        "dataType": "select",
        "displayName": "Circle Size",
        "defaultValue": "40px",
        "options": ["32px", "36px", "40px", "44px", "48px"],
        "group": "Layout"
      },
      "progressBarHeight": {
        "dataType": "select",
        "displayName": "Progress Bar Height",
        "defaultValue": "4px",
        "options": ["2px", "3px", "4px", "6px", "8px"],
        "group": "Layout"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration",
        "defaultValue": "500ms",
        "options": ["300ms", "400ms", "500ms", "600ms", "700ms"],
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
  const [animatingStep, setAnimatingStep] = React.useState(null);
  
  const stepsArray = (config?.steps || "Account Details,Company Info,Preferences,Review,Complete").split(',').map(s => s.trim());
  const currentStep = parseInt(config?.currentStep || "2");
  const showStepNumbers = config?.showStepNumbers !== false;
  
  const completedColor = config?.completedColor || "#8B7F73";
  const activeColor = config?.activeColor || "#2B2520";
  const inactiveColor = config?.inactiveColor || "#D4D4D4";
  const progressBarBackground = config?.progressBarBackground || "#F0F0F0";
  const progressBarFill = config?.progressBarFill || "#8B7F73";
  const textCompletedColor = config?.textCompletedColor || "#6B6158";
  const textActiveColor = config?.textActiveColor || "#2B2520";
  const textInactiveColor = config?.textInactiveColor || "#A3A3A3";
  
  const fontFamily = config?.fontFamily || "system-ui, -apple-system, sans-serif";
  const labelSize = config?.labelSize || "14px";
  const circleSize = config?.circleSize || "40px";
  const progressBarHeight = config?.progressBarHeight || "4px";
  const animationDuration = parseInt(config?.animationDuration || "500");
  
  const circleSizeNum = parseInt(circleSize);
  const progressPercent = stepsArray.length > 1 ? (currentStep / (stepsArray.length - 1)) * 100 : 0;
  
  React.useEffect(() => {
    setAnimatingStep(currentStep);
    const timer = setTimeout(() => setAnimatingStep(null), animationDuration);
    return () => clearTimeout(timer);
  }, [currentStep]);
  
  const containerStyle = {
    padding: '40px 20px',
    fontFamily,
    maxWidth: '900px',
    margin: '0 auto'
  };
  
  const progressBarContainerStyle = {
    position: 'relative',
    height: progressBarHeight,
    backgroundColor: progressBarBackground,
    borderRadius: progressBarHeight,
    marginBottom: '48px',
    overflow: 'hidden'
  };
  
  const progressBarFillStyle = {
    height: '100%',
    backgroundColor: progressBarFill,
    borderRadius: progressBarHeight,
    width: `${progressPercent}%`,
    transition: `width ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    boxShadow: '0 0 8px rgba(0,0,0,0.1)'
  };
  
  const stepsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative'
  };
  
  const stepStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: 'relative'
  };
  
  const getStepState = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'inactive';
  };
  
  const getCircleColor = (state) => {
    if (state === 'completed') return completedColor;
    if (state === 'active') return activeColor;
    return inactiveColor;
  };
  
  const getTextColor = (state) => {
    if (state === 'completed') return textCompletedColor;
    if (state === 'active') return textActiveColor;
    return textInactiveColor;
  };
  
  const circleStyle = (index) => {
    const state = getStepState(index);
    const isAnimating = animatingStep === index;
    
    return {
      width: circleSize,
      height: circleSize,
      borderRadius: '50%',
      backgroundColor: getCircleColor(state),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: '500',
      color: '#FFFFFF',
      marginBottom: '12px',
      transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
      boxShadow: state === 'active' ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 6px rgba(0,0,0,0.08)',
      position: 'relative',
      zIndex: 2
    };
  };
  
  const checkmarkStyle = {
    fontSize: '20px'
  };
  
  const labelStyle = (index) => {
    const state = getStepState(index);
    
    return {
      fontSize: labelSize,
      fontWeight: state === 'active' ? '500' : '400',
      color: getTextColor(state),
      textAlign: 'center',
      transition: `all ${animationDuration}ms ease-out`,
      maxWidth: '120px'
    };
  };
  
  const connectorContainerStyle = {
    position: 'absolute',
    top: `${circleSizeNum / 2}px`,
    left: `${circleSizeNum / 2}px`,
    right: `${circleSizeNum / 2}px`,
    height: '2px',
    zIndex: 1
  };
  
  const connectorStyle = (index) => {
    if (index >= stepsArray.length - 1) return { display: 'none' };
    
    const state = getStepState(index);
    const isCompleted = state === 'completed';
    
    return {
      position: 'absolute',
      left: `${(100 / (stepsArray.length - 1)) * index}%`,
      width: `${100 / (stepsArray.length - 1)}%`,
      height: '2px',
      backgroundColor: isCompleted ? completedColor : inactiveColor,
      transition: `all ${animationDuration}ms ease-out`,
      opacity: 0.3
    };
  };
  
  return (
    <div className="stepper-container" style={containerStyle}>
      <div style={progressBarContainerStyle}>
        <div style={progressBarFillStyle} />
      </div>
      
      <div style={stepsContainerStyle}>
        <div style={connectorContainerStyle}>
          {stepsArray.map((_, index) => (
            <div key={index} style={connectorStyle(index)} />
          ))}
        </div>
        
        {stepsArray.map((step, index) => {
          const state = getStepState(index);
          
          return (
            <div key={index} style={stepStyle}>
              <div style={circleStyle(index)}>
                {state === 'completed' ? (
                  <span style={checkmarkStyle}>✓</span>
                ) : showStepNumbers ? (
                  index + 1
                ) : null}
              </div>
              <div style={labelStyle(index)}>{step}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
