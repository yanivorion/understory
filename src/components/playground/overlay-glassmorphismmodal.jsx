import React from "react";

const MANIFEST = {
  "type": "Overlay.GlassmorphismModal",
  "description": "Modal with frosted glass effect and backdrop blur",
  "editorElement": {
    "selector": ".glassmorphism-modal",
    "displayName": "Glassmorphism Modal",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "Modal Title",
        "group": "Content"
      },
      "description": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "This is a beautiful glassmorphism modal with backdrop blur effect",
        "group": "Content"
      },
      "buttonText": {
        "dataType": "text",
        "displayName": "Button Text",
        "defaultValue": "Open Modal",
        "group": "Content"
      },
      "closeButtonText": {
        "dataType": "text",
        "displayName": "Close Button Text",
        "defaultValue": "Close",
        "group": "Content"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "300",
        "options": ["200", "300", "400", "500"],
        "group": "Animation"
      },
      "blurAmount": {
        "dataType": "select",
        "displayName": "Backdrop Blur Amount",
        "defaultValue": "12",
        "options": ["8", "10", "12", "16", "20"],
        "group": "Animation"
      },
      "modalWidth": {
        "dataType": "select",
        "displayName": "Modal Width (px)",
        "defaultValue": "480",
        "options": ["400", "480", "560", "640"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "16",
        "options": ["8", "12", "16", "20", "24"],
        "group": "Layout"
      },
      "padding": {
        "dataType": "select",
        "displayName": "Padding",
        "defaultValue": "32",
        "options": ["24", "32", "40", "48"],
        "group": "Layout"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Overlay Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "glassBackgroundColor": {
        "dataType": "color",
        "displayName": "Glass Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "buttonBackgroundColor": {
        "dataType": "color",
        "displayName": "Button Background",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "buttonTextColor": {
        "dataType": "color",
        "displayName": "Button Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 16,
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
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Config values
  const title = config?.title || "Modal Title";
  const description = config?.description || "This is a beautiful glassmorphism modal with backdrop blur effect";
  const buttonText = config?.buttonText || "Open Modal";
  const closeButtonText = config?.closeButtonText || "Close";
  const animationDuration = parseInt(config?.animationDuration || "300");
  const blurAmount = parseInt(config?.blurAmount || "12");
  const modalWidth = parseInt(config?.modalWidth || "480");
  const borderRadius = parseInt(config?.borderRadius || "16");
  const padding = parseInt(config?.padding || "32");
  const overlayColor = config?.overlayColor || "#000000";
  const glassBackgroundColor = config?.glassBackgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#18181B";
  const borderColor = config?.borderColor || "#FFFFFF";
  const buttonBackgroundColor = config?.buttonBackgroundColor || "#18181B";
  const buttonTextColor = config?.buttonTextColor || "#FFFFFF";
  const fontSize = config?.fontSize || 16;
  const fontWeight = config?.fontWeight || "400";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const triggerButtonStyle = {
    padding: '12px 24px',
    backgroundColor: buttonBackgroundColor,
    color: buttonTextColor,
    border: 'none',
    borderRadius: '8px',
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    outline: 'none'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${overlayColor}40`,
    backdropFilter: prefersReducedMotion ? 'none' : `blur(${blurAmount}px)`,
    WebkitBackdropFilter: prefersReducedMotion ? 'none' : `blur(${blurAmount}px)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 1000,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: prefersReducedMotion 
      ? 'none' 
      : `opacity ${animationDuration}ms ease, visibility ${animationDuration}ms ease`
  };

  const modalStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: `${modalWidth}px`,
    backgroundColor: `${glassBackgroundColor}E6`,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: `${borderRadius}px`,
    border: `1px solid ${borderColor}40`,
    padding: `${padding}px`,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    transform: prefersReducedMotion 
      ? 'none' 
      : (isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)'),
    opacity: isOpen ? 1 : 0,
    transition: prefersReducedMotion 
      ? 'none' 
      : `transform ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${animationDuration}ms ease`
  };

  const titleStyle = {
    fontSize: `${fontSize * 1.5}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '16px',
    letterSpacing: '0.02em'
  };

  const descriptionStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    color: textColor,
    lineHeight: '1.6',
    opacity: 0.85,
    marginBottom: '24px'
  };

  const closeButtonStyle = {
    padding: '10px 20px',
    backgroundColor: buttonBackgroundColor,
    color: buttonTextColor,
    border: 'none',
    borderRadius: '8px',
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    outline: 'none'
  };

  return (
    <div className="glassmorphism-modal">
      <button
        style={triggerButtonStyle}
        onClick={() => setIsOpen(true)}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        {buttonText}
      </button>

      {/* Modal Overlay */}
      <div
        style={overlayStyle}
        onClick={() => setIsOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Content */}
        <div
          style={modalStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id="modal-title" style={titleStyle}>{title}</h2>
          <p style={descriptionStyle}>{description}</p>
          <button
            style={closeButtonStyle}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {closeButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
