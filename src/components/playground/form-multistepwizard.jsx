import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 21, 2025, 03:30 AM
 * Component Type: Form.MultiStepWizard
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Form.MultiStepWizard",
  "description": "Sophisticated multi-step form wizard with validation, progress tracking, conditional logic, and animated transitions",
  "editorElement": {
    "selector": ".form-wizard-container",
    "displayName": "Multi-Step Form Wizard",
    "archetype": "container",
    "data": {
      "step1Title": {
        "dataType": "text",
        "displayName": "Step 1 Title",
        "defaultValue": "Personal Information",
        "group": "Content"
      },
      "step1Description": {
        "dataType": "text",
        "displayName": "Step 1 Description",
        "defaultValue": "Tell us about yourself",
        "group": "Content"
      },
      "step2Title": {
        "dataType": "text",
        "displayName": "Step 2 Title",
        "defaultValue": "Project Details",
        "group": "Content"
      },
      "step2Description": {
        "dataType": "text",
        "displayName": "Step 2 Description",
        "defaultValue": "Share your project requirements",
        "group": "Content"
      },
      "step3Title": {
        "dataType": "text",
        "displayName": "Step 3 Title",
        "defaultValue": "Timeline & Budget",
        "group": "Content"
      },
      "step3Description": {
        "dataType": "text",
        "displayName": "Step 3 Description",
        "defaultValue": "Help us understand your constraints",
        "group": "Content"
      },
      "step4Title": {
        "dataType": "text",
        "displayName": "Step 4 Title",
        "defaultValue": "Review & Submit",
        "group": "Content"
      },
      "step4Description": {
        "dataType": "text",
        "displayName": "Step 4 Description",
        "defaultValue": "Confirm your information",
        "group": "Content"
      },
      "submitButtonText": {
        "dataType": "text",
        "displayName": "Submit Button Text",
        "defaultValue": "Submit Application",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "descriptionColor": {
        "dataType": "color",
        "displayName": "Description Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "inputBorderColor": {
        "dataType": "color",
        "displayName": "Input Border Color",
        "defaultValue": "#CED4DA",
        "group": "Colors"
      },
      "inputFocusColor": {
        "dataType": "color",
        "displayName": "Input Focus Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "progressBackgroundColor": {
        "dataType": "color",
        "displayName": "Progress Background Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "buttonColor": {
        "dataType": "color",
        "displayName": "Button Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "buttonTextColor": {
        "dataType": "color",
        "displayName": "Button Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "buttonHoverColor": {
        "dataType": "color",
        "displayName": "Button Hover Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue"],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "number",
        "displayName": "Title Size (px)",
        "defaultValue": 24,
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "number",
        "displayName": "Label Size (px)",
        "defaultValue": 14,
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
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    description: '',
    timeline: '',
    budget: ''
  });
  const [errors, setErrors] = React.useState({});
  const [direction, setDirection] = React.useState('forward');

  const steps = [
    {
      title: config?.step1Title || "Personal Information",
      description: config?.step1Description || "Tell us about yourself",
      fields: ['name', 'email', 'company']
    },
    {
      title: config?.step2Title || "Project Details",
      description: config?.step2Description || "Share your project requirements",
      fields: ['projectType', 'description']
    },
    {
      title: config?.step3Title || "Timeline & Budget",
      description: config?.step3Description || "Help us understand your constraints",
      fields: ['timeline', 'budget']
    },
    {
      title: config?.step4Title || "Review & Submit",
      description: config?.step4Description || "Confirm your information",
      fields: []
    }
  ];

  const submitButtonText = config?.submitButtonText || "Submit Application";
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FFFFFF";
  const borderColor = config?.borderColor || "#E9ECEF";
  const titleColor = config?.titleColor || "#212529";
  const descriptionColor = config?.descriptionColor || "#6C757D";
  const labelColor = config?.labelColor || "#495057";
  const inputBorderColor = config?.inputBorderColor || "#CED4DA";
  const inputFocusColor = config?.inputFocusColor || "#495057";
  const progressColor = config?.progressColor || "#495057";
  const progressBackgroundColor = config?.progressBackgroundColor || "#E9ECEF";
  const buttonColor = config?.buttonColor || "#495057";
  const buttonTextColor = config?.buttonTextColor || "#FFFFFF";
  const buttonHoverColor = config?.buttonHoverColor || "#343A40";
  const fontFamily = config?.fontFamily || "system-ui";
  const titleSize = config?.titleSize || 24;
  const labelSize = config?.labelSize || 14;

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const validateStep = (step) => {
    const newErrors = {};
    const currentFields = steps[step].fields;
    
    currentFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'This field is required';
      }
      
      if (field === 'email' && formData[field]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field])) {
          newErrors[field] = 'Please enter a valid email';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setDirection('forward');
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setDirection('backward');
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const renderInput = (field, label, type = 'text') => (
    <div key={field} style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontSize: `${labelSize}px`,
        fontWeight: '500',
        color: labelColor,
        marginBottom: '8px'
      }}>
        {label}
      </label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '15px',
          border: `1px solid ${errors[field] ? '#DC3545' : inputBorderColor}`,
          borderRadius: '6px',
          fontFamily,
          transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out',
          outline: 'none'
        }}
        onFocus={(e) => {
          if (!errors[field]) {
            e.target.style.borderColor = inputFocusColor;
          }
        }}
        onBlur={(e) => {
          if (!errors[field]) {
            e.target.style.borderColor = inputBorderColor;
          }
        }}
      />
      {errors[field] && (
        <div style={{
          marginTop: '4px',
          fontSize: '12px',
          color: '#DC3545'
        }}>
          {errors[field]}
        </div>
      )}
    </div>
  );

  const renderTextarea = (field, label) => (
    <div key={field} style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontSize: `${labelSize}px`,
        fontWeight: '500',
        color: labelColor,
        marginBottom: '8px'
      }}>
        {label}
      </label>
      <textarea
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        rows={4}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '15px',
          border: `1px solid ${errors[field] ? '#DC3545' : inputBorderColor}`,
          borderRadius: '6px',
          fontFamily,
          resize: 'vertical',
          transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out',
          outline: 'none'
        }}
        onFocus={(e) => {
          if (!errors[field]) {
            e.target.style.borderColor = inputFocusColor;
          }
        }}
        onBlur={(e) => {
          if (!errors[field]) {
            e.target.style.borderColor = inputBorderColor;
          }
        }}
      />
      {errors[field] && (
        <div style={{
          marginTop: '4px',
          fontSize: '12px',
          color: '#DC3545'
        }}>
          {errors[field]}
        </div>
      )}
    </div>
  );

  const renderSelect = (field, label, options) => (
    <div key={field} style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontSize: `${labelSize}px`,
        fontWeight: '500',
        color: labelColor,
        marginBottom: '8px'
      }}>
        {label}
      </label>
      <select
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '15px',
          border: `1px solid ${errors[field] ? '#DC3545' : inputBorderColor}`,
          borderRadius: '6px',
          fontFamily,
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
          transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out',
          outline: 'none'
        }}
        onFocus={(e) => {
          if (!errors[field]) {
            e.target.style.borderColor = inputFocusColor;
          }
        }}
        onBlur={(e) => {
          if (!errors[field]) {
            e.target.style.borderColor = inputBorderColor;
          }
        }}
      >
        <option value="">Select an option</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {errors[field] && (
        <div style={{
          marginTop: '4px',
          fontSize: '12px',
          color: '#DC3545'
        }}>
          {errors[field]}
        </div>
      )}
    </div>
  );

  return (
    <div 
      className="form-wizard-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        backgroundColor: cardBackgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%'
      }}>
        {/* Progress Bar */}
        <div style={{
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: index <= currentStep ? progressColor : descriptionColor,
                  transition: prefersReducedMotion ? 'none' : 'color 300ms ease-out'
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
          
          <div style={{
            height: '4px',
            backgroundColor: progressBackgroundColor,
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: progressColor,
              width: `${((currentStep + 1) / steps.length) * 100}%`,
              transition: prefersReducedMotion ? 'none' : 'width 400ms cubic-bezier(0.22, 1, 0.36, 1)'
            }} />
          </div>
        </div>

        {/* Step Content */}
        <div style={{
          minHeight: '400px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div
            key={currentStep}
            style={{
              opacity: 0,
              transform: prefersReducedMotion ? 'none' : (
                direction === 'forward' ? 'translateX(40px)' : 'translateX(-40px)'
              ),
              animation: prefersReducedMotion ? 'none' : 'stepAppear 400ms ease-out forwards'
            }}
          >
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: `${titleSize}px`,
              fontWeight: '500',
              color: titleColor
            }}>
              {steps[currentStep].title}
            </h2>
            
            <p style={{
              margin: '0 0 32px 0',
              fontSize: '14px',
              color: descriptionColor
            }}>
              {steps[currentStep].description}
            </p>

            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <>
                {renderInput('name', 'Full Name')}
                {renderInput('email', 'Email Address', 'email')}
                {renderInput('company', 'Company Name')}
              </>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 1 && (
              <>
                {renderSelect('projectType', 'Project Type', ['Web Design', 'Mobile App', 'Branding', 'Consulting'])}
                {renderTextarea('description', 'Project Description')}
              </>
            )}

            {/* Step 3: Timeline & Budget */}
            {currentStep === 2 && (
              <>
                {renderSelect('timeline', 'Project Timeline', ['1-2 months', '3-4 months', '5-6 months', '6+ months'])}
                {renderSelect('budget', 'Budget Range', ['< $10k', '$10k - $25k', '$25k - $50k', '$50k+'])}
              </>
            )}

            {/* Step 4: Review */}
            {currentStep === 3 && (
              <div style={{
                backgroundColor: '#F8F9FA',
                padding: '24px',
                borderRadius: '8px'
              }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '500', color: titleColor }}>
                  Review Your Information
                </h3>
                {Object.entries(formData).map(([key, value]) => (
                  value && (
                    <div key={key} style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '12px', color: labelColor, textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div style={{ fontSize: '14px', color: titleColor, fontWeight: '500' }}>
                        {value}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '32px'
        }}>
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: 'transparent',
                color: buttonColor,
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                fontFamily
              }}
              onMouseEnter={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.borderColor = buttonColor;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = borderColor;
              }}
            >
              Previous
            </button>
          )}
          
          <button
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: buttonColor,
              color: buttonTextColor,
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
              fontFamily
            }}
            onMouseEnter={(e) => {
              if (!prefersReducedMotion) {
                e.currentTarget.style.backgroundColor = buttonHoverColor;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = buttonColor;
            }}
          >
            {currentStep === steps.length - 1 ? submitButtonText : 'Next'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes stepAppear {
          from {
            opacity: 0;
            transform: translateX(${direction === 'forward' ? '40px' : '-40px'});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
