import React from "react";

const MANIFEST = {
  "type": "Diagrams.SwimlaneDiagram",
  "description": "Cross-functional swimlane diagram showing process flows across departments or roles",
  "editorElement": {
    "selector": ".swimlane-diagram-container",
    "displayName": "Swimlane Diagram",
    "archetype": "container",
    "data": {
      "title": { "dataType": "text", "displayName": "Diagram Title", "defaultValue": "Order Fulfillment Process", "group": "Content" },
      "showStepNumbers": { "dataType": "booleanValue", "displayName": "Show Step Numbers", "defaultValue": true, "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background Color", "defaultValue": "#FFFFFF", "group": "Colors" },
      "titleColor": { "dataType": "color", "displayName": "Title Color", "defaultValue": "#212529", "group": "Colors" },
      "laneHeaderColor": { "dataType": "color", "displayName": "Lane Header Color", "defaultValue": "#F8F9FA", "group": "Colors" },
      "laneBackgroundColor": { "dataType": "color", "displayName": "Lane Background", "defaultValue": "#FAFAFA", "group": "Colors" },
      "laneBorderColor": { "dataType": "color", "displayName": "Lane Border", "defaultValue": "#E9ECEF", "group": "Colors" },
      "stepBackgroundColor": { "dataType": "color", "displayName": "Step Background", "defaultValue": "#F8F9FA", "group": "Colors" },
      "stepBorderColor": { "dataType": "color", "displayName": "Step Border", "defaultValue": "#DEE2E6", "group": "Colors" },
      "stepTextColor": { "dataType": "color", "displayName": "Step Text Color", "defaultValue": "#212529", "group": "Colors" },
      "connectorColor": { "dataType": "color", "displayName": "Connector Color", "defaultValue": "#495057", "group": "Colors" },
      "titleSize": { "dataType": "number", "displayName": "Title Size (px)", "defaultValue": 24, "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "laneHeaderSize": { "dataType": "number", "displayName": "Lane Header Size (px)", "defaultValue": 14, "group": "Typography" },
      "laneHeaderWeight": { "dataType": "select", "displayName": "Lane Header Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "stepTextSize": { "dataType": "number", "displayName": "Step Text Size (px)", "defaultValue": 13, "group": "Typography" },
      "stepTextWeight": { "dataType": "select", "displayName": "Step Text Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "stepCornerRadius": { "dataType": "select", "displayName": "Step Corner Radius", "defaultValue": "6px", "options": ["0px", "4px", "6px", "8px"], "group": "Layout" },
      "laneHeight": { "dataType": "select", "displayName": "Lane Height", "defaultValue": "140px", "options": ["120px", "140px", "160px", "180px"], "group": "Layout" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const title = config?.title || "Order Fulfillment Process";
  const showStepNumbers = config?.showStepNumbers !== false;
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const titleColor = config?.titleColor || "#212529";
  const laneHeaderColor = config?.laneHeaderColor || "#F8F9FA";
  const laneBackgroundColor = config?.laneBackgroundColor || "#FAFAFA";
  const laneBorderColor = config?.laneBorderColor || "#E9ECEF";
  const stepBackgroundColor = config?.stepBackgroundColor || "#F8F9FA";
  const stepBorderColor = config?.stepBorderColor || "#DEE2E6";
  const stepTextColor = config?.stepTextColor || "#212529";
  const connectorColor = config?.connectorColor || "#495057";
  const titleSize = parseInt(config?.titleSize || '24');
  const titleWeight = config?.titleWeight || "500";
  const laneHeaderSize = parseInt(config?.laneHeaderSize || '14');
  const laneHeaderWeight = config?.laneHeaderWeight || "500";
  const stepTextSize = parseInt(config?.stepTextSize || '13');
  const stepTextWeight = config?.stepTextWeight || "400";
  const stepCornerRadius = config?.stepCornerRadius || "6px";
  const laneHeight = config?.laneHeight || "140px";

  const lanes = [
    { id: 1, name: "Customer", steps: [{ text: "Place Order", col: 0 }, { text: "Receive Product", col: 4 }] },
    { id: 2, name: "Sales", steps: [{ text: "Process Order", col: 1 }, { text: "Send Invoice", col: 3 }] },
    { id: 3, name: "Warehouse", steps: [{ text: "Pick Items", col: 2 }, { text: "Pack & Ship", col: 3 }] }
  ];

  const maxCols = 5;

  return (
    <div className="swimlane-diagram-container" style={{ width: '100%', backgroundColor, padding: '32px', overflow: 'auto' }}>
      <h2 style={{ fontSize: titleSize + 'px', fontWeight: titleWeight, color: titleColor, margin: '0 0 24px 0' }}>{title}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {lanes.map((lane, laneIndex) => (
          <div key={lane.id} style={{ display: 'flex', borderTop: laneIndex === 0 ? `1px solid ${laneBorderColor}` : 'none' }}>
            <div style={{ width: '140px', backgroundColor: laneHeaderColor, border: `1px solid ${laneBorderColor}`, borderTop: 'none', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: laneHeaderSize + 'px', fontWeight: laneHeaderWeight, color: stepTextColor }}>
              {lane.name}
            </div>
            <div style={{ flex: 1, backgroundColor: laneBackgroundColor, border: `1px solid ${laneBorderColor}`, borderLeft: 'none', borderTop: 'none', padding: '16px', minHeight: laneHeight, position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${maxCols}, 1fr)`, gap: '16px' }}>
              {Array.from({ length: maxCols }).map((_, colIndex) => {
                const step = lane.steps.find(s => s.col === colIndex);
                return (
                  <div key={colIndex} style={{ position: 'relative' }}>
                    {step && (
                      <div style={{ backgroundColor: stepBackgroundColor, border: `1px solid ${stepBorderColor}`, borderRadius: stepCornerRadius, padding: '12px', fontSize: stepTextSize + 'px', fontWeight: stepTextWeight, color: stepTextColor, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', position: 'relative' }}>
                        {showStepNumbers && <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: connectorColor, color: '#FFFFFF', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500' }}>{colIndex + 1}</div>}
                        {step.text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
