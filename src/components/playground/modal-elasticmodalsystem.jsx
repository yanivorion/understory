import React from "react";

const MANIFEST = {
  "type": "Modal.ElasticModalSystem",
  "description": "Modal with elastic overshoot animation, opens from trigger position, staggered content reveals, drag-to-dismiss, and morphing close button",
  "editorElement": {
    "selector": ".elastic-modal-system",
    "displayName": "Elastic Modal System",
    "archetype": "container",
    "data": {
      "triggerText": { "dataType": "text", "displayName": "Trigger Button Text", "defaultValue": "Open Modal", "group": "Content" },
      "modalTitle": { "dataType": "text", "displayName": "Modal Title", "defaultValue": "Modal Title", "group": "Content" },
      "modalContent": { "dataType": "text", "displayName": "Modal Content", "defaultValue": "This is sophisticated modal content with elastic animations and smooth transitions.", "group": "Content" },
      "elasticity": { "dataType": "select", "displayName": "Elastic Intensity", "defaultValue": "medium", "options": ["subtle", "medium", "strong"], "group": "Animation" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#18181B", "group": "Colors" },
      "modalColor": { "dataType": "color", "displayName": "Modal Background", "defaultValue": "#27272A", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#FAFAFA", "group": "Colors" },
      "buttonColor": { "dataType": "color", "displayName": "Button Color", "defaultValue": "#3F3F46", "group": "Colors" }
    }
  }
};

function Component({ config = {} }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [triggerPos, setTriggerPos] = React.useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const triggerRef = React.useRef(null);

  const triggerText = config?.triggerText || "Open Modal";
  const modalTitle = config?.modalTitle || "Modal Title";
  const modalContent = config?.modalContent || "This is sophisticated modal content with elastic animations and smooth transitions.";
  const elasticity = config?.elasticity || "medium";
  const backgroundColor = config?.backgroundColor || "#18181B";
  const modalColor = config?.modalColor || "#27272A";
  const textColor = config?.textColor || "#FAFAFA";
  const buttonColor = config?.buttonColor || "#3F3F46";

  const elasticEasing = { subtle: 'cubic-bezier(0.68, -0.35, 0.265, 1.35)', medium: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', strong: 'cubic-bezier(0.68, -0.75, 0.265, 1.75)' }[elasticity];

  const openModal = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDragOffset(0);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    const modalTop = window.innerHeight * 0.1;
    const delta = Math.max(0, clientY - modalTop);
    setDragOffset(delta);
  };

  const handleDragEnd = () => {
    if (dragOffset > 100) {
      closeModal();
    } else {
      setDragOffset(0);
    }
    setIsDragging(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
      <button
        ref={triggerRef}
        onClick={openModal}
        style={{
          padding: '16px 48px',
          fontSize: '16px',
          fontWeight: '500',
          color: textColor,
          backgroundColor: buttonColor,
          border: 'none',
          borderRadius: '32px',
          cursor: 'pointer',
          transition: 'transform 200ms ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {triggerText}
      </button>

      {isOpen && (
        <>
          <div onClick={closeModal} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 999, animation: 'fadeIn 300ms ease' }} />
          <div
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{
              position: 'fixed',
              top: `${10 + (dragOffset * 0.3)}%`,
              left: '50%',
              width: '90%',
              maxWidth: '600px',
              backgroundColor: modalColor,
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              zIndex: 1000,
              transform: `translate(-50%, ${dragOffset}px) scale(${1 - dragOffset * 0.0005})`,
              transition: isDragging ? 'none' : `transform 600ms ${elasticEasing}`,
              animation: `modalEnter 600ms ${elasticEasing}`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <span style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', backgroundColor: textColor, transform: 'translateY(-50%) rotate(45deg)' }} />
                <span style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', backgroundColor: textColor, transform: 'translateY(-50%) rotate(-45deg)' }} />
              </div>
            </button>

            <h2 style={{ fontSize: '32px', fontWeight: '500', color: textColor, margin: '0 0 24px 0', opacity: 0, animation: 'slideIn 400ms ease 200ms forwards' }}>{modalTitle}</h2>
            <p style={{ fontSize: '16px', color: textColor, lineHeight: 1.6, margin: 0, opacity: 0, animation: 'slideIn 400ms ease 300ms forwards' }}>{modalContent}</p>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalEnter { from { opacity: 0; transform: translate(-50%, 0) scale(0.8); } to { opacity: 1; transform: translate(-50%, 0) scale(1); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
