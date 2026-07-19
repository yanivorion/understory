import React from "react";

const MANIFEST = {
  "type": "Diagrams.ProcessTimeline",
  "description": "Horizontal process timeline with milestones, progress tracking, and status indicators",
  "editorElement": {
    "selector": ".process-timeline-container",
    "displayName": "Process Timeline",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Timeline Title",
        "defaultValue": "Project Phases",
        "group": "Content"
      },
      "showProgress": {
        "dataType": "booleanValue",
        "displayName": "Show Progress Bar",
        "defaultValue": true,
        "group": "Content"
      },
      "showDates": {
        "dataType": "booleanValue",
        "displayName": "Show Dates",
        "defaultValue": true,
        "group": "Content"
      },
      "currentStep": {
        "dataType": "select",
        "displayName": "Current Step",
        "defaultValue": "2",
        "options": ["0", "1", "2", "3", "4", "5"],
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "stepBackgroundColor": {
        "dataType": "color",
        "displayName": "Step Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "stepBorderColor": {
        "dataType": "color",
        "displayName": "Step Border",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "completedColor": {
        "dataType": "color",
        "displayName": "Completed Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "activeColor": {
        "dataType": "color",
        "displayName": "Active Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "upcomingColor": {
        "dataType": "color",
        "displayName": "Upcoming Color",
        "defaultValue": "#ADB5BD",
        "group": "Colors"
      },
      "lineColor": {
        "dataType": "color",
        "displayName": "Connection Line Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "titleSize": {
        "dataType": "number",
        "displayName": "Title Size (px)",
        "defaultValue": 24,
        "group": "Typography"
      },
      "titleWeight": {
        "dataType": "select",
        "displayName": "Title Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "stepTitleSize": {
        "dataType": "number",
        "displayName": "Step Title Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "stepTitleWeight": {
        "dataType": "select",
        "displayName": "Step Title Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "stepDescSize": {
        "dataType": "number",
        "displayName": "Step Description Size (px)",
        "defaultValue": 12,
        "group": "Typography"
      },
      "stepDescWeight": {
        "dataType": "select",
        "displayName": "Step Description Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "stepCornerRadius": {
        "dataType": "select",
        "displayName": "Step Corner Radius",
        "defaultValue": "6px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "stepPadding": {
        "dataType": "select",
        "displayName": "Step Padding",
        "defaultValue": "16px",
        "options": ["12px", "16px", "20px", "24px"],
        "group": "Layout"
      },
      "stepGap": {
        "dataType": "select",
        "displayName": "Step Gap",
        "defaultValue": "32px",
        "options": ["24px", "32px", "40px", "48px"],
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
  const title = config?.title || "Project Phases";
  const showProgress = config?.showProgress !== false;
  const showDates = config?.showDates !== false;
  const currentStep = parseInt(config?.currentStep || '2');
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const titleColor = config?.titleColor || "#212529";
  const stepBackgroundColor = config?.stepBackgroundColor || "#F8F9FA";
  const stepBorderColor = config?.stepBorderColor || "#E9ECEF";
  const completedColor = config?.completedColor || "#495057";
  const activeColor = config?.activeColor || "#212529";
  const upcomingColor = config?.upcomingColor || "#ADB5BD";
  const lineColor = config?.lineColor || "#E9ECEF";
  const titleSize = parseInt(config?.titleSize || '24');
  const titleWeight = config?.titleWeight || "500";
  const stepTitleSize = parseInt(config?.stepTitleSize || '14');
  const stepTitleWeight = config?.stepTitleWeight || "500";
  const stepDescSize = parseInt(config?.stepDescSize || '12');
  const stepDescWeight = config?.stepDescWeight || "400";
  const stepCornerRadius = config?.stepCornerRadius || "6px";
  const stepPadding = config?.stepPadding || "16px";
  const stepGap = config?.stepGap || "32px";

  const steps = [
    { id: 1, title: "Research", description: "Market analysis & discovery", date: "Jan 2024" },
    { id: 2, title: "Planning", description: "Strategy & roadmap", date: "Feb 2024" },
    { id: 3, title: "Design", description: "UI/UX & prototyping", date: "Mar 2024" },
    { id: 4, title: "Development", description: "Build & testing", date: "Apr 2024" },
    { id: 5, title: "Launch", description: "Deploy & monitor", date: "May 2024" }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'upcoming';
  };

  const getStepColor = (status) => {
    switch(status) {
      case 'completed': return completedColor;
      case 'active': return activeColor;
      case 'upcoming': return upcomingColor;
      default: return upcomingColor;
    }
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div 
      className="process-timeline-container"
      style={{
        width: '100%',
        minHeight: '300px',
        backgroundColor,
        padding: '32px'
      }}
    >
      <h2 style={{
        fontSize: titleSize + 'px',
        fontWeight: titleWeight,
        color: titleColor,
        margin: '0 0 48px 0',
        letterSpacing: '0em'
      }}>
        {title}
      </h2>

      <div style={{ position: 'relative', paddingBottom: showDates ? '40px' : '0' }}>
        {showProgress && (
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '48px',
            right: '48px',
            height: '2px',
            backgroundColor: lineColor,
            zIndex: 0
          }}>
            <div style={{
              height: '100%',
              width: progressPercentage + '%',
              backgroundColor: completedColor,
              transition: 'width 0.5s ease-out'
            }} />
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: stepGap,
          position: 'relative',
          zIndex: 1
        }}>
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            const color = getStepColor(status);
            const isActive = status === 'active';

            return (
              <div 
                key={step.id}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: status === 'upcoming' ? stepBackgroundColor : color,
                  border: `3px solid ${color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '500',
                  color: status === 'upcoming' ? color : '#FFFFFF',
                  marginBottom: '16px',
                  transition: 'all 0.4s ease-out',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  {status === 'completed' ? '✓' : step.id}
                </div>

                <div style={{
                  backgroundColor: stepBackgroundColor,
                  border: `1px solid ${isActive ? color : stepBorderColor}`,
                  borderRadius: stepCornerRadius,
                  padding: stepPadding,
                  width: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s ease-out',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.06)'
                }}>
                  <div style={{
                    fontSize: stepTitleSize + 'px',
                    fontWeight: stepTitleWeight,
                    color: color,
                    marginBottom: '4px'
                  }}>
                    {step.title}
                  </div>
                  <div style={{
                    fontSize: stepDescSize + 'px',
                    fontWeight: stepDescWeight,
                    color: titleColor,
                    opacity: 0.7
                  }}>
                    {step.description}
                  </div>
                </div>

                {showDates && (
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '400',
                    color: color,
                    marginTop: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {step.date}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
