import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsWheel",
  "description": "Circular wheel menu with elements arranged radially around a center hub",
  "editorElement": {
    "selector": ".branded-elements-wheel",
    "displayName": "Branded Elements Wheel",
    "archetype": "container",
    "data": {
      "centerText": {
        "dataType": "text",
        "displayName": "Center Text",
        "defaultValue": "Design\nSystem",
        "group": "Content"
      },
      "showLabels": {
        "dataType": "booleanValue",
        "displayName": "Show Labels",
        "defaultValue": true,
        "group": "Content"
      },
      "wheelRadius": {
        "dataType": "select",
        "displayName": "Wheel Radius",
        "defaultValue": "140",
        "options": ["120", "140", "160", "180"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
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
        "displayName": "Secondary Text Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "nodeColor": {
        "dataType": "color",
        "displayName": "Node Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "nodeHoverColor": {
        "dataType": "color",
        "displayName": "Node Hover Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "centerColor": {
        "dataType": "color",
        "displayName": "Center Circle Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Base Font Size (px)",
        "defaultValue": 12,
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "vertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [hoveredNode, setHoveredNode] = React.useState(null);
  const [rotation, setRotation] = React.useState(0);

  // Safe config access with defaults
  const centerText = config?.centerText || 'Design\nSystem';
  const showLabels = config?.showLabels !== false;
  const wheelRadius = parseInt(config?.wheelRadius || '140');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const nodeColor = config?.nodeColor || '#495057';
  const nodeHoverColor = config?.nodeHoverColor || '#212529';
  const centerColor = config?.centerColor || '#F8F9FA';
  const fontSize = parseInt(config?.fontSize || '12');

  // Wheel nodes
  const nodes = [
    { id: 'h2', label: 'H2', icon: 'H', category: 'Typography' },
    { id: 'p2', label: 'P2', icon: 'P', category: 'Typography' },
    { id: 'btn', label: 'Button', icon: '●', category: 'Interactive' },
    { id: 'box', label: 'Box', icon: '▢', category: 'Element' },
    { id: 'line', label: 'Line', icon: '—', category: 'Element' }
  ];

  const handleNodeClick = (nodeId) => {
    console.log(`Clicked: ${nodeId}`);
  };

  const containerStyle = {
    backgroundColor,
    padding: '60px 24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `${wheelRadius * 2 + 180}px`
  };

  const wheelContainerStyle = {
    position: 'relative',
    width: `${wheelRadius * 2}px`,
    height: `${wheelRadius * 2}px`
  };

  const centerCircleStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: centerColor,
    border: `2px solid ${nodeColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  };

  const centerTextStyle = {
    fontSize: `${fontSize + 6}px`,
    fontWeight: '500',
    color: textColor,
    textAlign: 'center',
    lineHeight: '1.3',
    whiteSpace: 'pre-line'
  };

  const getNodePosition = (index, total) => {
    const angle = (360 / total) * index - 90; // Start from top
    const angleRad = (angle * Math.PI) / 180;
    const x = wheelRadius + Math.cos(angleRad) * wheelRadius;
    const y = wheelRadius + Math.sin(angleRad) * wheelRadius;
    return { x, y, angle: angle + 90 };
  };

  const getNodeStyle = (nodeId, x, y) => ({
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    transform: 'translate(-50%, -50%)',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: hoveredNode === nodeId ? nodeHoverColor : nodeColor,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${fontSize + 8}px`,
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 200ms ease-out',
    boxShadow: hoveredNode === nodeId
      ? '0 4px 12px rgba(0, 0, 0, 0.15)'
      : '0 2px 6px rgba(0, 0, 0, 0.1)',
    zIndex: hoveredNode === nodeId ? 3 : 1
  });

  const getLabelStyle = (x, y, angle) => {
    const labelDistance = 35;
    const labelAngleRad = ((angle - 90) * Math.PI) / 180;
    const labelX = x + Math.cos(labelAngleRad) * labelDistance;
    const labelY = y + Math.sin(labelAngleRad) * labelDistance;

    return {
      position: 'absolute',
      left: `${labelX}px`,
      top: `${labelY}px`,
      transform: 'translate(-50%, -50%)',
      fontSize: `${fontSize}px`,
      color: secondaryTextColor,
      whiteSpace: 'nowrap',
      pointerEvents: 'none'
    };
  };

  const connectionLineStyle = (x, y) => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: `${Math.sqrt(Math.pow(x - wheelRadius, 2) + Math.pow(y - wheelRadius, 2)) - 50}px`,
    height: '1px',
    backgroundColor: hoveredNode ? nodeColor : '#E9ECEF',
    transformOrigin: '0 50%',
    transform: `rotate(${Math.atan2(y - wheelRadius, x - wheelRadius)}rad)`,
    transition: 'all 200ms ease-out',
    opacity: 0.3
  });

  return (
    <div className="branded-elements-wheel" style={containerStyle}>
      <div style={wheelContainerStyle}>
        {/* Center Circle */}
        <div style={centerCircleStyle}>
          <div style={centerTextStyle}>{centerText}</div>
        </div>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const { x, y, angle } = getNodePosition(index, nodes.length);
          return (
            <React.Fragment key={node.id}>
              {/* Connection Line */}
              <div style={connectionLineStyle(x, y)} />
              
              {/* Node */}
              <div
                style={getNodeStyle(node.id, x, y)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node.id)}
              >
                {node.icon}
              </div>

              {/* Label */}
              {showLabels && (
                <div style={getLabelStyle(x, y, angle)}>
                  {node.label}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
