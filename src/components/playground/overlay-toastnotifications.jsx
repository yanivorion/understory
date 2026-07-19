import React from "react";

const MANIFEST = {
  "type": "Overlay.ToastNotifications",
  "description": "Toast notification system with stacking and auto-dismiss",
  "editorElement": {
    "selector": ".toast-notifications",
    "displayName": "Toast Notifications",
    "archetype": "container",
    "data": {
      "buttonText": {
        "dataType": "text",
        "displayName": "Trigger Button Text",
        "defaultValue": "Show Toast",
        "group": "Content"
      },
      "toastTypes": {
        "dataType": "select",
        "displayName": "Demo Toast Type",
        "defaultValue": "success",
        "options": ["success", "error", "warning", "info"],
        "group": "Content"
      },
      "position": {
        "dataType": "select",
        "displayName": "Position",
        "defaultValue": "top-right",
        "options": ["top-left", "top-right", "bottom-left", "bottom-right", "top-center"],
        "group": "Layout"
      },
      "autoDismissTime": {
        "dataType": "select",
        "displayName": "Auto Dismiss Time (ms)",
        "defaultValue": "3000",
        "options": ["2000", "3000", "4000", "5000", "0"],
        "group": "Animation",
        "description": "0 = no auto dismiss"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "300",
        "options": ["200", "300", "400"],
        "group": "Animation"
      },
      "maxToasts": {
        "dataType": "select",
        "displayName": "Max Visible Toasts",
        "defaultValue": "4",
        "options": ["3", "4", "5", "6"],
        "group": "Layout"
      },
      "successColor": {
        "dataType": "color",
        "displayName": "Success Color",
        "defaultValue": "#22C55E",
        "group": "Colors"
      },
      "errorColor": {
        "dataType": "color",
        "displayName": "Error Color",
        "defaultValue": "#EF4444",
        "group": "Colors"
      },
      "warningColor": {
        "dataType": "color",
        "displayName": "Warning Color",
        "defaultValue": "#F59E0B",
        "group": "Colors"
      },
      "infoColor": {
        "dataType": "color",
        "displayName": "Info Color",
        "defaultValue": "#3B82F6",
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
        "defaultValue": "#18181B",
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
      "resizeDirection": "horizontal",
      "contentResizeDirection": "horizontal"
    }
  }
};

function Component({ config = {} }) {
  const [toasts, setToasts] = React.useState([]);

  // Config values
  const buttonText = config?.buttonText || "Show Toast";
  const toastTypes = config?.toastTypes || "success";
  const position = config?.position || "top-right";
  const autoDismissTime = parseInt(config?.autoDismissTime || "3000");
  const animationDuration = parseInt(config?.animationDuration || "300");
  const maxToasts = parseInt(config?.maxToasts || "4");
  const successColor = config?.successColor || "#22C55E";
  const errorColor = config?.errorColor || "#EF4444";
  const warningColor = config?.warningColor || "#F59E0B";
  const infoColor = config?.infoColor || "#3B82F6";
  const toastBackground = config?.toastBackground || "#FFFFFF";
  const toastTextColor = config?.toastTextColor || "#18181B";
  const fontSize = config?.fontSize || 14;
  const fontWeight = config?.fontWeight || "400";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const toastMessages = {
    success: 'Operation completed successfully!',
    error: 'An error occurred. Please try again.',
    warning: 'Warning: Please review your input.',
    info: 'Here is some helpful information.'
  };

  const toastColors = {
    success: successColor,
    error: errorColor,
    warning: warningColor,
    info: infoColor
  };

  const addToast = () => {
    const newToast = {
      id: Date.now(),
      type: toastTypes,
      message: toastMessages[toastTypes]
    };

    setToasts(prev => {
      const updated = [newToast, ...prev];
      return updated.slice(0, maxToasts);
    });

    if (autoDismissTime > 0) {
      setTimeout(() => {
        removeToast(newToast.id);
      }, autoDismissTime);
    }
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Position styles
  const getPositionStyles = () => {
    const base = {
      position: 'fixed',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '400px',
      padding: '20px',
      pointerEvents: 'none'
    };

    switch (position) {
      case 'top-left':
        return { ...base, top: 0, left: 0 };
      case 'top-right':
        return { ...base, top: 0, right: 0 };
      case 'bottom-left':
        return { ...base, bottom: 0, left: 0 };
      case 'bottom-right':
        return { ...base, bottom: 0, right: 0 };
      case 'top-center':
        return { ...base, top: 0, left: '50%', transform: 'translateX(-50%)' };
      default:
        return { ...base, top: 0, right: 0 };
    }
  };

  const containerStyle = {
    display: 'inline-block'
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: toastColors[toastTypes],
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: `${fontSize + 2}px`,
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    outline: 'none'
  };

  const toastContainerStyle = getPositionStyles();

  const getToastStyle = (index) => {
    const isTop = position.includes('top');
    const baseTransform = isTop 
      ? 'translateX(100%)' 
      : 'translateX(100%)';

    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      backgroundColor: toastBackground,
      color: toastTextColor,
      borderRadius: '8px',
      borderLeft: `4px solid ${toastColors[toastTypes]}`,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      pointerEvents: 'auto',
      cursor: 'pointer',
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      minWidth: '280px',
      animation: prefersReducedMotion 
        ? 'none' 
        : `slideIn ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
      transform: baseTransform,
      opacity: 0
    };
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    flexShrink: 0,
    color: toastColors[toastTypes]
  };

  const closeButtonStyle = {
    marginLeft: 'auto',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    opacity: 0.6,
    transition: 'opacity 0.2s ease',
    padding: 0,
    border: 'none',
    background: 'transparent',
    color: toastTextColor
  };

  const keyframes = `
    @keyframes slideIn {
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;

  const getIcon = (type) => {
    const icons = {
      success: (
        <svg viewBox="0 0 20 20" fill="currentColor" style={iconStyle}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      error: (
        <svg viewBox="0 0 20 20" fill="currentColor" style={iconStyle}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
      warning: (
        <svg viewBox="0 0 20 20" fill="currentColor" style={iconStyle}>
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      info: (
        <svg viewBox="0 0 20 20" fill="currentColor" style={iconStyle}>
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    };
    return icons[type];
  };

  return (
    <div className="toast-notifications" style={containerStyle}>
      <style>{keyframes}</style>
      
      <button
        style={buttonStyle}
        onClick={addToast}
        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        {buttonText}
      </button>

      {/* Toast Container */}
      <div style={toastContainerStyle}>
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={getToastStyle(index)}
            onClick={() => removeToast(toast.id)}
            role="alert"
            aria-live="polite"
          >
            {getIcon(toast.type)}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              style={closeButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                removeToast(toast.id);
              }}
              aria-label="Close notification"
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.6'}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l8 8M14 6l-8 8" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
