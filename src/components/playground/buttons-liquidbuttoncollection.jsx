import React from "react";

const MANIFEST = {
  "type": "Buttons.LiquidButtonCollection",
  "description": "Collection of buttons with liquid ripple effects, magnetic hover, morphing borders, and expanding circle transitions",
  "editorElement": {
    "selector": ".liquid-button-collection",
    "displayName": "Liquid Button Collection",
    "archetype": "container",
    "data": {
      "buttons": { "dataType": "text", "displayName": "Button Labels (comma-separated)", "defaultValue": "Primary,Secondary,Tertiary,Success", "group": "Content" },
      "buttonColor": { "dataType": "color", "displayName": "Button Background", "defaultValue": "#3F3F46", "group": "Colors" },
      "hoverColor": { "dataType": "color", "displayName": "Hover Color", "defaultValue": "#27272A", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#FAFAFA", "group": "Colors" },
      "rippleColor": { "dataType": "color", "displayName": "Ripple Color", "defaultValue": "#71717A", "group": "Colors" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#18181B", "group": "Colors" }
    }
  }
};

function Component({ config = {} }) {
  const [ripples, setRipples] = React.useState({});
  const [magneticOffsets, setMagneticOffsets] = React.useState({});
  const [borderShape, setBorderShape] = React.useState({});

  const buttonsText = config?.buttons || "Primary,Secondary,Tertiary,Success";
  const buttons = buttonsText.split(',').map(b => b.trim());
  const buttonColor = config?.buttonColor || "#3F3F46";
  const hoverColor = config?.hoverColor || "#27272A";
  const textColor = config?.textColor || "#FAFAFA";
  const rippleColor = config?.rippleColor || "#71717A";
  const backgroundColor = config?.backgroundColor || "#18181B";

  const createRipple = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now();
    
    setRipples(prev => ({
      ...prev,
      [index]: [...(prev[index] || []), { id: rippleId, x, y }]
    }));

    setTimeout(() => {
      setRipples(prev => ({
        ...prev,
        [index]: (prev[index] || []).filter(r => r.id !== rippleId)
      }));
    }, 600);
  };

  const handleMouseMove = (e, index) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    setMagneticOffsets(prev => ({ ...prev, [index]: { x: deltaX, y: deltaY } }));
  };

  const cycleBorderShape = (index) => {
    setBorderShape(prev => {
      const shapes = ['rounded', 'sharp', 'blob'];
      const current = prev[index] || 'rounded';
      const currentIndex = shapes.indexOf(current);
      const next = shapes[(currentIndex + 1) % shapes.length];
      return { ...prev, [index]: next };
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', maxWidth: '800px', justifyContent: 'center' }}>
        {buttons.map((label, i) => {
          const offset = magneticOffsets[i] || { x: 0, y: 0 };
          const buttonRipples = ripples[i] || [];
          const shape = borderShape[i] || 'rounded';
          const borderRadius = shape === 'sharp' ? '4px' : shape === 'blob' ? '32px 8px 32px 8px' : '32px';

          return (
            <button
              key={i}
              onClick={(e) => { createRipple(e, i); cycleBorderShape(i); }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => setMagneticOffsets(prev => ({ ...prev, [i]: { x: 0, y: 0 } }))}
              style={{
                position: 'relative',
                padding: '16px 48px',
                fontSize: '16px',
                fontWeight: '500',
                color: textColor,
                backgroundColor: buttonColor,
                border: 'none',
                borderRadius: borderRadius,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'background-color 200ms ease, border-radius 600ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 200ms ease',
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                outline: 'none'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = hoverColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = buttonColor; }}
            >
              {label}
              {buttonRipples.map(ripple => (
                <span
                  key={ripple.id}
                  style={{
                    position: 'absolute',
                    left: ripple.x + 'px',
                    top: ripple.y + 'px',
                    width: '0',
                    height: '0',
                    borderRadius: '50%',
                    backgroundColor: rippleColor,
                    transform: 'translate(-50%, -50%)',
                    animation: 'ripple 600ms ease-out',
                    pointerEvents: 'none'
                  }}
                />
              ))}
            </button>
          );
        })}
      </div>
      <style jsx>{`@keyframes ripple { to { width: 300px; height: 300px; opacity: 0; } }`}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
