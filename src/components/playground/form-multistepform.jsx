import React from "react";

const MANIFEST = {
  "type": "Form.MultiStepForm",
  "description": "Multi-step form with progress indicator and validation",
  "editorElement": {
    "selector": ".multistep-form-container",
    "displayName": "Multi-Step Form",
    "archetype": "container",
    "data": {
      "steps": {
        "dataType": "text",
        "displayName": "Steps JSON",
        "defaultValue": '[{"title":"Personal Info","description":"Tell us about yourself","fields":[{"name":"firstName","label":"First Name","type":"text","required":true},{"name":"lastName","label":"Last Name","type":"text","required":true},{"name":"email","label":"Email Address","type":"email","required":true}]},{"title":"Company Details","description":"Information about your company","fields":[{"name":"companyName","label":"Company Name","type":"text","required":true},{"name":"companySize","label":"Company Size","type":"select","required":true,"options":["1-10","11-50","51-200","201-500","500+"]},{"name":"industry","label":"Industry","type":"select","required":true,"options":["Technology","Finance","Healthcare","Education","Other"]}]},{"title":"Preferences","description":"Customize your experience","fields":[{"name":"notifications","label":"Email Notifications","type":"checkbox","required":false},{"name":"newsletter","label":"Subscribe to Newsletter","type":"checkbox","required":false},{"name":"terms","label":"I agree to Terms & Conditions","type":"checkbox","required":true}]}]',
        "group": "Content"
      },
      "submitButtonText": {
        "dataType": "text",
        "displayName": "Submit Button Text",
        "defaultValue": "Complete Setup",
        "group": "Content"
      },
      "successMessage": {
        "dataType": "text",
        "displayName": "Success Message",
        "defaultValue": "Setup complete! Welcome aboard.",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "formBackgroundColor": {
        "dataType": "color",
        "displayName": "Form Background",
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
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "errorColor": {
        "dataType": "color",
        "displayName": "Error Color",
        "defaultValue": "#EF4444",
        "group": "Colors"
      },
      "successColor": {
        "dataType": "color",
        "displayName": "Success Color",
        "defaultValue": "#10B981",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(0,0,0,0.08)",
        "group": "Colors"
      },
      "progressBarColor": {
        "dataType": "color",
        "displayName": "Progress Bar Color",
        "defaultValue": "#1A1A1A",
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
        "defaultValue": "28px",
        "options": ["24px", "28px", "32px", "36px"],
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "select",
        "displayName": "Label Font Size",
        "defaultValue": "14px",
        "options": ["12px", "14px", "16px"],
        "group": "Typography"
      },
      "formMaxWidth": {
        "dataType": "select",
        "displayName": "Form Max Width",
        "defaultValue": "600px",
        "options": ["500px", "600px", "700px", "800px"],
        "group": "Layout"
      },
      "formPadding": {
        "dataType": "select",
        "displayName": "Form Padding",
        "defaultValue": "48px",
        "options": ["32px", "40px", "48px", "56px", "64px"],
        "group": "Layout"
      },
      "fieldGap": {
        "dataType": "select",
        "displayName": "Field Gap",
        "defaultValue": "20px",
        "options": ["16px", "20px", "24px", "28px"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "showShadow": {
        "dataType": "booleanValue",
        "displayName": "Show Form Shadow",
        "defaultValue": "true",
        "group": "Layout"
      },
      "transitionDuration": {
        "dataType": "number",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "400",
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
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [direction, setDirection] = React.useState('forward');
  const contentRef = React.useRef(null);

  // Safe config extraction
  const steps = React.useMemo(() => {
    try {
      return JSON.parse(config?.steps || MANIFEST.editorElement.data.steps.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.steps.defaultValue);
    }
  }, [config?.steps]);

  const transitionDuration = parseInt(config?.transitionDuration || '400');
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Validate current step
  const validateStep = React.useCallback(() => {
    const newErrors = {};
    currentStepData.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Invalid email address';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStepData, formData]);

  // PATTERN 1: Direct DOM animation for step transitions
  const animateStepTransition = React.useCallback((dir) => {
    if (!contentRef.current) return;

    const distance = dir === 'forward' ? -50 : 50;

    contentRef.current.animate([
      { opacity: 1, transform: 'translateX(0)' },
      { opacity: 0, transform: `translateX(${distance}px)` }
    ], {
      duration: transitionDuration / 2,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }).onfinish = () => {
      // Update step (triggers React re-render with new content)
      if (dir === 'forward') {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      } else {
        setCurrentStep(prev => Math.max(prev - 1, 0));
      }

      // Enter animation
      contentRef.current.animate([
        { opacity: 0, transform: `translateX(${-distance}px)` },
        { opacity: 1, transform: 'translateX(0)' }
      ], {
        duration: transitionDuration / 2,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
    };
  }, [transitionDuration, steps.length]);

  const handleNext = () => {
    if (validateStep()) {
      setDirection('forward');
      animateStepTransition('forward');
    }
  };

  const handlePrevious = () => {
    setDirection('backward');
    animateStepTransition('backward');
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setIsSubmitted(true);
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      padding: '64px 24px',
      backgroundColor: config?.backgroundColor || '#FAFAFA',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    form: {
      width: '100%',
      maxWidth: config?.formMaxWidth || '600px',
      backgroundColor: config?.formBackgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      padding: config?.formPadding || '48px',
      boxShadow: (config?.showShadow !== false) ? '0 4px 16px rgba(0,0,0,0.06)' : 'none'
    },
    progressContainer: {
      marginBottom: '40px'
    },
    progressSteps: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px',
      position: 'relative'
    },
    progressStep: {
      flex: '1',
      textAlign: 'center',
      position: 'relative'
    },
    progressStepNumber: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '500',
      border: `2px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      backgroundColor: config?.formBackgroundColor || '#FFFFFF',
      color: config?.secondaryTextColor || '#6B6B6B',
      marginBottom: '8px',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      position: 'relative',
      zIndex: '2'
    },
    progressStepNumberActive: {
      borderColor: config?.accentColor || '#1A1A1A',
      backgroundColor: config?.accentColor || '#1A1A1A',
      color: '#FFFFFF'
    },
    progressStepNumberCompleted: {
      borderColor: config?.successColor || '#10B981',
      backgroundColor: config?.successColor || '#10B981',
      color: '#FFFFFF'
    },
    progressStepLabel: {
      fontSize: '12px',
      color: config?.secondaryTextColor || '#6B6B6B',
      fontWeight: '500'
    },
    progressBar: {
      height: '4px',
      backgroundColor: 'rgba(0,0,0,0.06)',
      borderRadius: '2px',
      overflow: 'hidden',
      position: 'relative'
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: config?.progressBarColor || '#1A1A1A',
      borderRadius: '2px',
      transition: `width ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    },
    stepContent: {
      marginBottom: '32px'
    },
    stepTitle: {
      fontSize: config?.titleSize || '28px',
      fontWeight: '300',
      color: config?.primaryTextColor || '#1A1A1A',
      marginBottom: '8px',
      letterSpacing: '-0.02em'
    },
    stepDescription: {
      fontSize: '16px',
      color: config?.secondaryTextColor || '#6B6B6B',
      marginBottom: '32px',
      lineHeight: '1.6'
    },
    fieldsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: config?.fieldGap || '20px'
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: config?.labelSize || '14px',
      fontWeight: '500',
      color: config?.primaryTextColor || '#1A1A1A',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    required: {
      color: config?.errorColor || '#EF4444'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '14px',
      color: config?.primaryTextColor || '#1A1A1A',
      backgroundColor: config?.formBackgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      outline: 'none',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      fontFamily: 'inherit'
    },
    inputError: {
      borderColor: config?.errorColor || '#EF4444'
    },
    error: {
      fontSize: '12px',
      color: config?.errorColor || '#EF4444',
      marginTop: '4px'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      accentColor: config?.accentColor || '#1A1A1A'
    },
    checkboxLabel: {
      fontSize: '14px',
      color: config?.primaryTextColor || '#1A1A1A',
      cursor: 'pointer',
      userSelect: 'none'
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      marginTop: '32px'
    },
    button: {
      flex: '1',
      padding: '14px 24px',
      fontSize: '16px',
      fontWeight: '500',
      border: 'none',
      borderRadius: config?.borderRadius || '8px',
      cursor: 'pointer',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      outline: 'none'
    },
    buttonPrimary: {
      backgroundColor: config?.accentColor || '#1A1A1A',
      color: '#FFFFFF'
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      color: config?.secondaryTextColor || '#6B6B6B',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`
    },
    successContainer: {
      textAlign: 'center',
      padding: '48px 24px'
    },
    successIcon: {
      width: '64px',
      height: '64px',
      margin: '0 auto 24px',
      color: config?.successColor || '#10B981'
    },
    successTitle: {
      fontSize: '24px',
      fontWeight: '500',
      color: config?.primaryTextColor || '#1A1A1A',
      marginBottom: '12px'
    },
    successMessage: {
      fontSize: '16px',
      color: config?.secondaryTextColor || '#6B6B6B',
      lineHeight: '1.6'
    }
  };

  if (isSubmitted) {
    return (
      <div style={styles.container} className="multistep-form-container">
        <div style={styles.form}>
          <div style={styles.successContainer}>
            <svg style={styles.successIcon} viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" />
              <path d="M20 32l8 8 16-16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={styles.successTitle}>Success!</div>
            <div style={styles.successMessage}>
              {config?.successMessage || 'Setup complete! Welcome aboard.'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container} className="multistep-form-container">
      <div style={styles.form}>
        <div style={styles.progressContainer}>
          <div style={styles.progressSteps}>
            {steps.map((step, index) => (
              <div key={index} style={styles.progressStep}>
                <div style={{
                  ...styles.progressStepNumber,
                  ...(index === currentStep ? styles.progressStepNumberActive : {}),
                  ...(index < currentStep ? styles.progressStepNumberCompleted : {})
                }}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <div style={styles.progressStepLabel}>{step.title}</div>
              </div>
            ))}
          </div>
          <div style={styles.progressBar}>
            <div style={{...styles.progressBarFill, width: `${progress}%`}} />
          </div>
        </div>

        <div ref={contentRef} style={styles.stepContent}>
          <h2 style={styles.stepTitle}>{currentStepData.title}</h2>
          <p style={styles.stepDescription}>{currentStepData.description}</p>

          <div style={styles.fieldsContainer}>
            {currentStepData.fields.map((field, idx) => (
              <div key={idx} style={styles.fieldGroup}>
                {field.type !== 'checkbox' && (
                  <label style={styles.label} htmlFor={field.name}>
                    {field.label}
                    {field.required && <span style={styles.required}>*</span>}
                  </label>
                )}

                {field.type === 'text' || field.type === 'email' ? (
                  <>
                    <input
                      id={field.name}
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      style={{
                        ...styles.input,
                        ...(errors[field.name] ? styles.inputError : {})
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = config?.accentColor || '#1A1A1A';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors[field.name] 
                          ? (config?.errorColor || '#EF4444')
                          : (config?.borderColor || 'rgba(0,0,0,0.08)');
                      }}
                    />
                    {errors[field.name] && <span style={styles.error}>{errors[field.name]}</span>}
                  </>
                ) : field.type === 'select' ? (
                  <>
                    <select
                      id={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      style={{
                        ...styles.input,
                        ...(errors[field.name] ? styles.inputError : {})
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = config?.accentColor || '#1A1A1A';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors[field.name] 
                          ? (config?.errorColor || '#EF4444')
                          : (config?.borderColor || 'rgba(0,0,0,0.08)');
                      }}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors[field.name] && <span style={styles.error}>{errors[field.name]}</span>}
                  </>
                ) : field.type === 'checkbox' ? (
                  <>
                    <div style={styles.checkboxContainer}>
                      <input
                        id={field.name}
                        type="checkbox"
                        checked={formData[field.name] || false}
                        onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                        style={styles.checkbox}
                      />
                      <label htmlFor={field.name} style={styles.checkboxLabel}>
                        {field.label}
                        {field.required && <span style={styles.required}> *</span>}
                      </label>
                    </div>
                    {errors[field.name] && <span style={styles.error}>{errors[field.name]}</span>}
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.buttonContainer}>
          {currentStep > 0 && (
            <button
              style={{...styles.button, ...styles.buttonSecondary}}
              onClick={handlePrevious}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              style={{...styles.button, ...styles.buttonPrimary}}
              onClick={handleNext}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Continue
            </button>
          ) : (
            <button
              style={{...styles.button, ...styles.buttonPrimary}}
              onClick={handleSubmit}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {config?.submitButtonText || 'Complete Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
