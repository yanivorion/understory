import React from "react";

const MANIFEST = {
  "type": "Component.Placeholder",
  "description": "Advanced interactive component with sophisticated animations",
  "editorElement": {
    "selector": ".component-placeholder",
    "displayName": "Component Placeholder",
    "archetype": "container",
    "data": {
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Component Title", "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#18181B", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#FAFAFA", "group": "Colors" }
    }
  }
};

function Component({ config = {} }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: config?.backgroundColor || '#18181B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '48px', color: config?.textColor || '#FAFAFA' }}>{config?.title || 'Component ' + $i}</h1>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
