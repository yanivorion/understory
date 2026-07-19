import React from "react";

const MANIFEST = {
  "type": "Diagrams.MindMapNode",
  "description": "Radial mind map with central concept and branching ideas, expandable nodes",
  "editorElement": {
    "selector": ".mindmap-container",
    "displayName": "Mind Map Node",
    "archetype": "container",
    "data": {
      "centralConcept": { "dataType": "text", "displayName": "Central Concept", "defaultValue": "Product Strategy", "group": "Content" },
      "showConnectors": { "dataType": "booleanValue", "displayName": "Show Connectors", "defaultValue": true, "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background Color", "defaultValue": "#FFFFFF", "group": "Colors" },
      "centralNodeColor": { "dataType": "color", "displayName": "Central Node Color", "defaultValue": "#212529", "group": "Colors" },
      "branchNodeColor": { "dataType": "color", "displayName": "Branch Node Color", "defaultValue": "#495057", "group": "Colors" },
      "leafNodeColor": { "dataType": "color", "displayName": "Leaf Node Color", "defaultValue": "#6C757D", "group": "Colors" },
      "connectorColor": { "dataType": "color", "displayName": "Connector Color", "defaultValue": "#DEE2E6", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#FFFFFF", "group": "Colors" },
      "centralNodeSize": { "dataType": "number", "displayName": "Central Node Size (px)", "defaultValue": 16, "group": "Typography" },
      "branchNodeSize": { "dataType": "number", "displayName": "Branch Node Size (px)", "defaultValue": 14, "group": "Typography" },
      "nodeWeight": { "dataType": "select", "displayName": "Node Text Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "centralNodeRadius": { "dataType": "select", "displayName": "Central Node Radius", "defaultValue": "80px", "options": ["60px", "80px", "100px", "120px"], "group": "Layout" },
      "branchNodeRadius": { "dataType": "select", "displayName": "Branch Node Radius", "defaultValue": "60px", "options": ["40px", "60px", "80px"], "group": "Layout" },
      "branchDistance": { "dataType": "select", "displayName": "Branch Distance", "defaultValue": "200px", "options": ["150px", "200px", "250px", "300px"], "group": "Layout" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const [expandedBranches, setExpandedBranches] = React.useState(new Set([0, 1, 2, 3]));
  
  const centralConcept = config?.centralConcept || "Product Strategy";
  const showConnectors = config?.showConnectors !== false;
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const centralNodeColor = config?.centralNodeColor || "#212529";
  const branchNodeColor = config?.branchNodeColor || "#495057";
  const leafNodeColor = config?.leafNodeColor || "#6C757D";
  const connectorColor = config?.connectorColor || "#DEE2E6";
  const textColor = config?.textColor || "#FFFFFF";
  const centralNodeSize = parseInt(config?.centralNodeSize || '16');
  const branchNodeSize = parseInt(config?.branchNodeSize || '14');
  const nodeWeight = config?.nodeWeight || "500";
  const centralNodeRadius = parseInt(config?.centralNodeRadius || '80');
  const branchNodeRadius = parseInt(config?.branchNodeRadius || '60');
  const branchDistance = parseInt(config?.branchDistance || '200');

  const branches = [
    { id: 0, text: "Market Analysis", children: ["Target Audience", "Competitors"] },
    { id: 1, text: "Features", children: ["Core Functionality", "Differentiators"] },
    { id: 2, text: "Pricing", children: ["Tiers", "Value Props"] },
    { id: 3, text: "Launch", children: ["Timeline", "Marketing"] }
  ];

  const toggleBranch = (id) => {
    setExpandedBranches(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const getNodePosition = (index, total, distance) => {
    const angle = (360 / total) * index - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance
    };
  };

  return (
    <div className="mindmap-container" style={{ width: '100%', minHeight: '700px', backgroundColor, padding: '48px', position: 'relative', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {showConnectors && branches.map((branch, idx) => {
          const pos = getNodePosition(idx, branches.length, branchDistance);
          return (
            <line key={idx} x1="50%" y1="50%" x2={`calc(50% + ${pos.x}px)`} y2={`calc(50% + ${pos.y}px)`} stroke={connectorColor} strokeWidth="2" />
          );
        })}
      </svg>

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <div style={{ width: centralNodeRadius + 'px', height: centralNodeRadius + 'px', borderRadius: '50%', backgroundColor: centralNodeColor, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: centralNodeSize + 'px', fontWeight: nodeWeight, textAlign: 'center', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
          {centralConcept}
        </div>
      </div>

      {branches.map((branch, idx) => {
        const pos = getNodePosition(idx, branches.length, branchDistance);
        const isExpanded = expandedBranches.has(branch.id);
        
        return (
          <div key={branch.id} style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`, zIndex: 2 }}>
            <div onClick={() => toggleBranch(branch.id)} style={{ width: branchNodeRadius + 'px', height: branchNodeRadius + 'px', borderRadius: '50%', backgroundColor: branchNodeColor, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: branchNodeSize + 'px', fontWeight: nodeWeight, textAlign: 'center', padding: '12px', cursor: 'pointer', transition: 'all 0.3s ease-out', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transform: isExpanded ? 'scale(1.05)' : 'scale(1)' }}>
              {branch.text}
            </div>

            {isExpanded && branch.children.map((child, childIdx) => {
              const childPos = getNodePosition(childIdx, branch.children.length, 90);
              return (
                <div key={childIdx} style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(calc(-50% + ${childPos.x}px), calc(-50% + ${childPos.y}px))`, opacity: 1, animation: 'fadeIn 0.4s ease-out' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: leafNodeColor, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: nodeWeight, textAlign: 'center', padding: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    {child}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translate(calc(-50% + ${0}px), calc(-50% + ${0}px)) scale(0.5); } to { opacity: 1; transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1); }}`}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
