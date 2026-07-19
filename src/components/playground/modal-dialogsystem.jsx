import React from "react";

const MANIFEST = {
  "type": "Modal.DialogSystem",
  "description": "Accessible modal dialog with animations, focus trap, and keyboard support",
  "editorElement": {
    "selector": ".modal-system-container",
    "displayName": "Modal Dialog System",
    "archetype": "container",
    "data": {
      "demoTitle": {
        "dataType": "text",
        "displayName": "Demo Modal Title",
        "defaultValue": "Confirm Action",
        "group": "Content"
      },
      "demoContent": {
        "dataType": "text",
        "displayName": "Demo Modal Content",
        "defaultValue": "Are you sure you want to proceed with this action? This cannot be undone.",
        "group": "Content"
      },
      "primaryButtonText": {
        "dataType": "text",
        "displayName": "Primary Button Text",
        "defaultValue": "Confirm",
        "group": "Content"
      },
      "secondaryButtonText": {
        "dataType": "text",
        "displayName": "Secondary Button Text",
        "defaultValue": "Cancel",
        "group": "Content"
      },
      "triggerButtonText": {
        "dataType": "text",
        "displayName": "Trigger Button Text",
        "defaultValue": "Open Modal",
        "group": "Content"
      },
      "closeOnOverlayClick": {
        "dataType": "booleanValue",
        "displayName": "Close on Overlay Click",
        "defaultValue": "true",
        "group": "Content"
      },
      "closeOnEscape": {
        "dataType": "booleanValue",
        "displayName": "Close on Escape Key",
        "defaultValue": "true",
        "group": "Content"
      },
      "showCloseButton": {
        "dataType": "booleanValue",
        "displayName": "Show Close Button",
        "defaultValue": "true",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Page Background",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Overlay Color",
        "defaultValue": "rgba(0,0,0,0.5)",
        "group": "Colors"
      },
      "modalBackgroundColor": {
        "dataType": "color",
        "displayName": "Modal Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "primaryTextColor": {
        "dataType": "color",
        "displayName": "Primary Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#6B6B6B",
        "group": "Colors"
      },
      "primaryButtonColor": {
        "dataType": "color",
        "displayName": "Primary Button Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "secondaryButtonColor": {
        "dataType": "color",
        "displayName": "Secondary Button Color",
        "defaultValue": "#E5E5E5",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(0,0,0,0.08)",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "Inter, -apple-system, system-ui, sans-serif",
        "options": [
          "Inter, -apple-system, system-ui, sans-serif",
          "SF Pro Display, -apple-system, sans-serif",
          "Helvetica Neue, Helvetica, Arial, sans-serif"
        ],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "select",
        "displayName": "Title Font Size",
        "defaultValue": "24px",
        "options": ["20px", "24px", "28px", "32px"],
        "group": "Typography"
      },
      "contentSize": {
        "dataType": "select",
        "displayName": "Content Font Size",
        "defaultValue": "16px",
        "options": ["14px", "16px", "18px"],
        "group": "Typography"
      },
      "modalSize": {
        "dataType": "select",
        "displayName": "Modal Size",
        "defaultValue": "medium",
        "options": ["small", "medium", "large"],
        "group": "Layout"
      },
      "modalPadding": {
        "dataType": "select",
        "displayName": "Modal Padding",
        "defaultValue": "32px",
        "options": ["24px", "28px", "32px", "40px", "48px"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "12px",
        "options": ["0px", "6px", "8px", "12px", "16px"],
        "group": "Layout"
      },
      "showShadow": {
        "dataType": "booleanValue",
        "displayName": "Show Modal Shadow",
        "defaultValue": "true",
        "group": "Layout"
      },
      "animationDuration": {
        "dataType": "number",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "250",
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
  const [isOpen, setIsOpen] = React.useState(false);
  const modalRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const previousFocusRef = React.useRef(null);
  const firstFocusableRef = React.useRef(null);
  const lastFocusableRef = React.useRef(null);

  const closeOnOverlayClick = config?.closeOnOverlayClick !== false;
  const closeOnEscape = config?.closeOnEscape !== false;
  const showCloseButton = config?.showCloseButton !== false;
  const animationDuration = parseInt(config?.animationDuration || '250');

  // Modal size mapping
  const modalSizes = {
    small: '400px',
    medium: '600px',
    large: '800px'
  };

  const modalMaxWidth = modalSizes[config?.modalSize || 'medium'];

  // PATTERN 1: Direct DOM animation for modal entrance/exit
  const openModal = React.useCallback(() => {
    previousFocusRef.current = document.activeElement;
    setIsOpen(true);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Animate overlay and modal
    requestAnimationFrame(() => {
      if (overlayRef.current) {
        overlayRef.current.animate([
          { opacity: 0 },
          { opacity: 1 }
        ], {
          duration: animationDuration,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        });
      }

      if (modalRef.current) {
        modalRef.current.animate([
          { opacity: 0, transform: 'scale(0.95) translateY(-20px)' },
          { opacity: 1, transform: 'scale(1) translateY(0)' }
        ], {
          duration: animationDuration,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        });
      }
    });
  }, [animationDuration]);

  const closeModal = React.useCallback(() => {
    if (overlayRef.current && modalRef.current) {
      overlayRef.current.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], {
        duration: animationDuration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });

      modalRef.current.animate([
        { opacity: 1, transform: 'scale(1) translateY(0)' },
        { opacity: 0, transform: 'scale(0.95) translateY(-20px)' }
      ], {
        duration: animationDuration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }).onfinish = () => {
        setIsOpen(false);
        document.body.style.overflow = '';
        
        // Restore focus
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [animationDuration]);

  // Focus trap
  React.useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      firstFocusableRef.current = focusableElements[0];
      lastFocusableRef.current = focusableElements[focusableElements.length - 1];
      
      // Focus first element
      setTimeout(() => firstFocusableRef.current?.focus(), animationDuration);
    }
  }, [isOpen, animationDuration]);

  // Keyboard handlers
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Escape key
      if (e.key === 'Escape' && closeOnEscape) {
        closeModal();
      }

      // Tab key (focus trap)
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableRef.current) {
            e.preventDefault();
            lastFocusableRef.current?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableRef.current) {
            e.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal, closeOnEscape]);

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      padding: '48px 24px',
      backgroundColor: config?.backgroundColor || '#FAFAFA',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    triggerButton: {
      padding: '14px 32px',
      fontSize: '16px',
      fontWeight: '500',
      color: '#FFFFFF',
      backgroundColor: config?.primaryButtonColor || '#1A1A1A',
      border: 'none',
      borderRadius: config?.borderRadius || '12px',
      cursor: 'pointer',
      transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      outline: 'none'
    },
    overlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: config?.overlayColor || 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      zIndex: '9999',
      opacity: 0,
      backdropFilter: 'blur(4px)'
    },
    modal: {
      width: '100%',
      maxWidth: modalMaxWidth,
      backgroundColor: config?.modalBackgroundColor || '#FFFFFF',
      borderRadius: config?.borderRadius || '12px',
      padding: config?.modalPadding || '32px',
      boxShadow: (config?.showShadow !== false) ? '0 20px 60px rgba(0,0,0,0.3)' : 'none',
      position: 'relative',
      maxHeight: 'calc(100vh - 48px)',
      overflowY: 'auto',
      opacity: 0,
      transform: 'scale(0.95) translateY(-20px)'
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '32px',
      height: '32px',
      display: showCloseButton ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      outline: 'none',
      color: config?.secondaryTextColor || '#6B6B6B'
    },
    title: {
      fontSize: config?.titleSize || '24px',
      fontWeight: '500',
      color: config?.primaryTextColor || '#1A1A1A',
      marginBottom: '16px',
      paddingRight: showCloseButton ? '40px' : '0'
    },
    content: {
      fontSize: config?.contentSize || '16px',
      color: config?.secondaryTextColor || '#6B6B6B',
      lineHeight: '1.6',
      marginBottom: '32px'
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end'
    },
    button: {
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      borderRadius: config?.borderRadius || '12px',
      cursor: 'pointer',
      transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      outline: 'none'
    },
    primaryButton: {
      backgroundColor: config?.primaryButtonColor || '#1A1A1A',
      color: '#FFFFFF'
    },
    secondaryButton: {
      backgroundColor: config?.secondaryButtonColor || '#E5E5E5',
      color: config?.primaryTextColor || '#1A1A1A'
    }
  };

  return (
    <div style={styles.container} className="modal-system-container">
      <button
        style={styles.triggerButton}
        onClick={openModal}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {config?.triggerButtonText || 'Open Modal'}
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          style={styles.overlay}
          onClick={(e) => {
            if (closeOnOverlayClick && e.target === e.currentTarget) {
              closeModal();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div ref={modalRef} style={styles.modal}>
            {showCloseButton && (
              <button
                style={styles.closeButton}
                onClick={closeModal}
                aria-label="Close modal"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}

            <h2 id="modal-title" style={styles.title}>
              {config?.demoTitle || 'Confirm Action'}
            </h2>

            <p style={styles.content}>
              {config?.demoContent || 'Are you sure you want to proceed with this action? This cannot be undone.'}
            </p>

            <div style={styles.buttonContainer}>
              <button
                style={{...styles.button, ...styles.secondaryButton}}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#D4D4D4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = config?.secondaryButtonColor || '#E5E5E5';
                }}
              >
                {config?.secondaryButtonText || 'Cancel'}
              </button>

              <button
                style={{...styles.button, ...styles.primaryButton}}
                onClick={() => {
                  // Handle confirm action
                  closeModal();
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {config?.primaryButtonText || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
