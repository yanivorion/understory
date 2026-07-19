import React from "react";

const MANIFEST = {
  "type": "Notification.ToastSystem",
  "description": "Premium toast notification system with stacking, auto-dismiss, and multiple notification types",
  "editorElement": {
    "selector": ".toast-notification-system",
    "displayName": "Toast Notification System",
    "archetype": "container",
    "data": {
      "demoMode": {
        "dataType": "booleanValue",
        "displayName": "Demo Mode",
        "defaultValue": true,
        "group": "Content",
        "description": "Show demo notifications on load"
      },
      "position": {
        "dataType": "select",
        "displayName": "Position",
        "defaultValue": "top-right",
        "options": ["top-left", "top-right", "bottom-left", "bottom-right", "top-center", "bottom-center"],
        "group": "Layout",
        "description": "Screen position for notifications"
      },
      "maxVisible": {
        "dataType": "select",
        "displayName": "Max Visible",
        "defaultValue": "4",
        "options": ["3", "4", "5", "6"],
        "group": "Content",
        "description": "Maximum number of visible toasts"
      },
      "autoDismiss": {
        "dataType": "booleanValue",
        "displayName": "Auto Dismiss",
        "defaultValue": true,
        "group": "Content"
      },
      "dismissDuration": {
        "dataType": "select",
        "displayName": "Dismiss Duration (ms)",
        "defaultValue": "4000",
        "options": ["3000", "4000", "5000", "6000", "8000"],
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "successColor": {
        "dataType": "color",
        "displayName": "Success Accent",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "errorColor": {
        "dataType": "color",
        "displayName": "Error Accent",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "warningColor": {
        "dataType": "color",
        "displayName": "Warning Accent",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "infoColor": {
        "dataType": "color",
        "displayName": "Info Accent",
        "defaultValue": "#ADB5BD",
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
        "displayName": "Secondary Text",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "none",
      "contentResizeDirection": "none"
    }
  }
};

function Component({ config = {} }) {
  const [toasts, setToasts] = React.useState([]);
  const [nextId, setNextId] = React.useState(1);

  // Safe config access
  const position = config?.position || 'top-right';
  const maxVisible = parseInt(config?.maxVisible || '4');
  const autoDismiss = config?.autoDismiss !== false;
  const dismissDuration = parseInt(config?.dismissDuration || '4000');
  const demoMode = config?.demoMode !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const successColor = config?.successColor || '#495057';
  const errorColor = config?.errorColor || '#212529';
  const warningColor = config?.warningColor || '#6C757D';
  const infoColor = config?.infoColor || '#ADB5BD';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#495057';
  const borderColor = config?.borderColor || '#E9ECEF';
  const fontSize = config?.fontSize || 14;
  const fontWeight = config?.fontWeight || '400';

  // Accessibility
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Toast type colors
  const getTypeColor = (type) => {
    const colors = {
      success: successColor,
      error: errorColor,
      warning: warningColor,
      info: infoColor
    };
    return colors[type] || infoColor;
  };

  // Add toast function
  const addToast = (type, title, message) => {
    const id = nextId;
    setNextId(prev => prev + 1);
    
    const newToast = {
      id,
      type,
      title,
      message,
      timestamp: Date.now()
    };

    setToasts(prev => {
      const updated = [...prev, newToast];
      return updated.slice(-maxVisible);
    });

    if (autoDismiss) {
      setTimeout(() => {
        removeToast(id);
      }, dismissDuration);
    }
  };

  // Remove toast function
  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Demo notifications on mount
  React.useEffect(() => {
    if (demoMode) {
      setTimeout(() => addToast('success', 'Success', 'Your changes have been saved'), 500);
      setTimeout(() => addToast('info', 'Update Available', 'A new version is ready to install'), 1500);
      setTimeout(() => addToast('warning', 'Warning', 'Your session will expire in 5 minutes'), 2500);
    }
  }, [demoMode]);

  // Position styles
  const getPositionStyles = () => {
    const base = {
      position: 'fixed',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '20px',
      pointerEvents: 'none'
    };

    const positions = {
      'top-left': { top: 0, left: 0 },
      'top-right': { top: 0, right: 0 },
      'bottom-left': { bottom: 0, left: 0 },
      'bottom-right': { bottom: 0, right: 0 },
      'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
      'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' }
    };

    return { ...base, ...positions[position] };
  };

  // Icon components
  const SuccessIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={successColor} strokeWidth="2">
      <path d="M16.5 5.5L7.5 14.5L3.5 10.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ErrorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={errorColor} strokeWidth="2">
      <circle cx="10" cy="10" r="7.5"/>
      <path d="M10 6.5V10.5" strokeLinecap="round"/>
      <circle cx="10" cy="13.5" r="0.5" fill={errorColor}/>
    </svg>
  );

  const WarningIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={warningColor} strokeWidth="2">
      <path d="M10 3L17 17H3L10 3Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 8V11" strokeLinecap="round"/>
      <circle cx="10" cy="14" r="0.5" fill={warningColor}/>
    </svg>
  );

  const InfoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={infoColor} strokeWidth="2">
      <circle cx="10" cy="10" r="7.5"/>
      <path d="M10 13.5V10" strokeLinecap="round"/>
      <circle cx="10" cy="7" r="0.5" fill={infoColor}/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={secondaryTextColor} strokeWidth="2">
      <path d="M4 4L12 12M12 4L4 12" strokeLinecap="round"/>
    </svg>
  );

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <SuccessIcon />;
      case 'error': return <ErrorIcon />;
      case 'warning': return <WarningIcon />;
      case 'info': return <InfoIcon />;
      default: return <InfoIcon />;
    }
  };

  return (
    <div className="toast-notification-system" style={{
      width: '100%',
      minHeight: '400px',
      backgroundColor: '#F8F9FA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Demo Controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: `${fontSize + 2}px`,
          fontWeight: '500',
          color: textColor,
          marginBottom: '8px'
        }}>
          Trigger Notifications
        </div>
        
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => addToast('success', 'Success', 'Operation completed successfully')}
            style={{
              padding: '10px 20px',
              backgroundColor: backgroundColor,
              color: successColor,
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              cursor: 'pointer',
              transition: 'all 200ms ease-out',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = successColor;
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = borderColor;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Success
          </button>

          <button
            onClick={() => addToast('error', 'Error', 'Something went wrong')}
            style={{
              padding: '10px 20px',
              backgroundColor: backgroundColor,
              color: errorColor,
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              cursor: 'pointer',
              transition: 'all 200ms ease-out',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = errorColor;
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = borderColor;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Error
          </button>

          <button
            onClick={() => addToast('warning', 'Warning', 'Please review your input')}
            style={{
              padding: '10px 20px',
              backgroundColor: backgroundColor,
              color: warningColor,
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              cursor: 'pointer',
              transition: 'all 200ms ease-out',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = warningColor;
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = borderColor;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Warning
          </button>

          <button
            onClick={() => addToast('info', 'Info', 'Here\'s some helpful information')}
            style={{
              padding: '10px 20px',
              backgroundColor: backgroundColor,
              color: infoColor,
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              cursor: 'pointer',
              transition: 'all 200ms ease-out',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = infoColor;
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = borderColor;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Info
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <div style={getPositionStyles()}>
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={{
              backgroundColor: backgroundColor,
              border: `1px solid ${borderColor}`,
              borderLeft: `3px solid ${getTypeColor(toast.type)}`,
              borderRadius: '8px',
              padding: '16px',
              minWidth: '320px',
              maxWidth: '420px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              pointerEvents: 'auto',
              opacity: prefersReducedMotion ? 1 : 0,
              transform: prefersReducedMotion ? 'none' : 'translateX(-15px)',
              animation: prefersReducedMotion ? 'none' : 'toastSlideIn 400ms ease-out forwards',
              animationDelay: `${index * 50}ms`
            }}
          >
            <div style={{ flexShrink: 0, marginTop: '2px' }}>
              {getIcon(toast.type)}
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: `${fontSize}px`,
                fontWeight: '500',
                color: textColor,
                marginBottom: '4px'
              }}>
                {toast.title}
              </div>
              <div style={{
                fontSize: `${fontSize - 1}px`,
                fontWeight: fontWeight,
                color: secondaryTextColor,
                lineHeight: '1.4'
              }}>
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              style={{
                background: 'none',
                border: 'none',
                padding: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                transition: 'background-color 200ms ease-out',
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#F8F9FA'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
