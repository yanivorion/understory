import React from "react";

const MANIFEST = {
  "type": "Feedback.ToastSystem",
  "description": "Polished toast notification system with multiple types, stacking, slide animations, and auto-dismiss",
  "editorElement": {
    "selector": ".toast-system-container",
    "displayName": "Toast System",
    "archetype": "container",
    "data": {
      "demoMode": {
        "dataType": "booleanValue",
        "displayName": "Show Demo Toasts",
        "defaultValue": true,
        "group": "Content"
      },
      "autoDismiss": {
        "dataType": "booleanValue",
        "displayName": "Auto Dismiss",
        "defaultValue": true,
        "group": "Content"
      },
      "dismissDelay": {
        "dataType": "select",
        "displayName": "Auto Dismiss Delay",
        "defaultValue": "4000",
        "options": ["3000", "4000", "5000", "6000", "8000"],
        "group": "Content"
      },
      "successColor": {
        "dataType": "color",
        "displayName": "Success Color",
        "defaultValue": "#059669",
        "group": "Colors"
      },
      "errorColor": {
        "dataType": "color",
        "displayName": "Error Color",
        "defaultValue": "#DC2626",
        "group": "Colors"
      },
      "warningColor": {
        "dataType": "color",
        "displayName": "Warning Color",
        "defaultValue": "#D97706",
        "group": "Colors"
      },
      "infoColor": {
        "dataType": "color",
        "displayName": "Info Color",
        "defaultValue": "#2563EB",
        "group": "Colors"
      },
      "toastBackground": {
        "dataType": "color",
        "displayName": "Toast Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "toastTextColor": {
        "dataType": "color",
        "displayName": "Toast Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "closeButtonColor": {
        "dataType": "color",
        "displayName": "Close Button Color",
        "defaultValue": "#737373",
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
      "fontSize": {
        "dataType": "select",
        "displayName": "Font Size",
        "defaultValue": "14px",
        "options": ["13px", "14px", "15px", "16px"],
        "group": "Typography"
      },
      "toastWidth": {
        "dataType": "select",
        "displayName": "Toast Width",
        "defaultValue": "360px",
        "options": ["320px", "360px", "400px", "440px"],
        "group": "Layout"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "8px",
        "options": ["4px", "6px", "8px", "10px", "12px"],
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
  const [toasts, setToasts] = React.useState([]);
  const toastIdCounter = React.useRef(0);
  
  const demoMode = config?.demoMode !== false;
  const autoDismiss = config?.autoDismiss !== false;
  const dismissDelay = parseInt(config?.dismissDelay || "4000");
  
  const successColor = config?.successColor || "#059669";
  const errorColor = config?.errorColor || "#DC2626";
  const warningColor = config?.warningColor || "#D97706";
  const infoColor = config?.infoColor || "#2563EB";
  const toastBackground = config?.toastBackground || "#FFFFFF";
  const toastTextColor = config?.toastTextColor || "#1A1A1A";
  const closeButtonColor = config?.closeButtonColor || "#737373";
  
  const fontFamily = config?.fontFamily || "system-ui, -apple-system, sans-serif";
  const fontSize = config?.fontSize || "14px";
  const toastWidth = config?.toastWidth || "360px";
  const cornerRadius = config?.cornerRadius || "8px";
  
  const typeConfig = {
    success: { color: successColor, icon: '✓', label: 'Success' },
    error: { color: errorColor, icon: '✕', label: 'Error' },
    warning: { color: warningColor, icon: '⚠', label: 'Warning' },
    info: { color: infoColor, icon: 'ℹ', label: 'Info' }
  };
  
  const addToast = (type, message) => {
    const id = toastIdCounter.current++;
    const newToast = {
      id,
      type,
      message,
      isExiting: false
    };
    
    setToasts(prev => [...prev, newToast]);
    
    if (autoDismiss) {
      setTimeout(() => {
        removeToast(id);
      }, dismissDelay);
    }
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, isExiting: true } : toast
    ));
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  };
  
  React.useEffect(() => {
    if (demoMode && toasts.length === 0) {
      setTimeout(() => addToast('success', 'Changes saved successfully!'), 500);
      setTimeout(() => addToast('info', 'New update available'), 1500);
      setTimeout(() => addToast('warning', 'Your trial expires in 3 days'), 2500);
    }
  }, [demoMode]);
  
  const containerStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    fontFamily,
    maxHeight: 'calc(100vh - 40px)',
    overflowY: 'auto'
  };
  
  const toastStyle = (toast) => {
    const config = typeConfig[toast.type];
    
    return {
      width: toastWidth,
      backgroundColor: toastBackground,
      borderRadius: cornerRadius,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '16px',
      borderLeft: `4px solid ${config.color}`,
      transform: toast.isExiting ? 'translateX(400px)' : 'translateX(0)',
      opacity: toast.isExiting ? 0 : 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      animation: toast.isExiting ? 'none' : 'slideInRight 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative'
    };
  };
  
  const iconContainerStyle = (type) => {
    const config = typeConfig[type];
    
    return {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: `${config.color}20`,
      color: config.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '500',
      flexShrink: 0
    };
  };
  
  const contentStyle = {
    flex: 1,
    paddingRight: '8px'
  };
  
  const titleStyle = (type) => {
    const config = typeConfig[type];
    
    return {
      fontSize: fontSize,
      fontWeight: '500',
      color: toastTextColor,
      marginBottom: '4px'
    };
  };
  
  const messageStyle = {
    fontSize: `calc(${fontSize} - 1px)`,
    color: toastTextColor,
    opacity: 0.8,
    lineHeight: '1.5'
  };
  
  const closeButtonStyle = {
    width: '20px',
    height: '20px',
    border: 'none',
    background: 'none',
    color: closeButtonColor,
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'all 150ms ease-out',
    flexShrink: 0,
    padding: 0
  };
  
  const demoButtonsStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: demoMode ? 'flex' : 'none',
    gap: '8px',
    flexWrap: 'wrap',
    maxWidth: '360px'
  };
  
  const demoButtonStyle = (type) => {
    const config = typeConfig[type];
    
    return {
      padding: '10px 16px',
      backgroundColor: config.color,
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 200ms ease-out',
      fontFamily
    };
  };
  
  return (
    <div className="toast-system-container">
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      
      <div style={containerStyle}>
        {toasts.map(toast => {
          const config = typeConfig[toast.type];
          
          return (
            <div key={toast.id} style={toastStyle(toast)}>
              <div style={iconContainerStyle(toast.type)}>
                {config.icon}
              </div>
              
              <div style={contentStyle}>
                <div style={titleStyle(toast.type)}>{config.label}</div>
                <div style={messageStyle}>{toast.message}</div>
              </div>
              
              <button
                style={closeButtonStyle}
                onClick={() => removeToast(toast.id)}
                onMouseEnter={e => e.target.style.backgroundColor = '#F5F5F5'}
                onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
      
      <div style={demoButtonsStyle}>
        <button 
          style={demoButtonStyle('success')}
          onClick={() => addToast('success', 'Operation completed successfully!')}
          onMouseEnter={e => e.target.style.opacity = '0.9'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Show Success
        </button>
        <button 
          style={demoButtonStyle('error')}
          onClick={() => addToast('error', 'Something went wrong. Please try again.')}
          onMouseEnter={e => e.target.style.opacity = '0.9'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Show Error
        </button>
        <button 
          style={demoButtonStyle('warning')}
          onClick={() => addToast('warning', 'Please review your input before continuing.')}
          onMouseEnter={e => e.target.style.opacity = '0.9'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Show Warning
        </button>
        <button 
          style={demoButtonStyle('info')}
          onClick={() => addToast('info', 'Here is some helpful information for you.')}
          onMouseEnter={e => e.target.style.opacity = '0.9'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Show Info
        </button>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
