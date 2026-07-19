import React from "react";

const MANIFEST = {
  "type": "Interactive.FLIPGallery",
  "description": "Image gallery with FLIP technique for smooth grid-to-detail transitions",
  "editorElement": {
    "selector": ".flip-gallery",
    "displayName": "FLIP Gallery",
    "archetype": "container",
    "data": {
      "itemCount": {
        "dataType": "select",
        "displayName": "Number of Items",
        "defaultValue": "9",
        "options": ["6", "9", "12", "15"],
        "group": "Content"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "transitionDuration": {
        "dataType": "select",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "500",
        "options": ["400", "500", "600", "700"],
        "group": "Animation"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Grid Gap",
        "defaultValue": "16",
        "options": ["12", "16", "20", "24"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "12",
        "options": ["8", "12", "16", "20"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Overlay Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "both",
      "contentResizeDirection": "both"
    }
  }
};

function Component({ config = {} }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const itemRefs = React.useRef([]);
  const detailRef = React.useRef(null);

  // Config values
  const itemCount = parseInt(config?.itemCount || "9");
  const columns = parseInt(config?.columns || "3");
  const transitionDuration = parseInt(config?.transitionDuration || "500");
  const gap = parseInt(config?.gap || "16");
  const borderRadius = parseInt(config?.borderRadius || "12");
  const backgroundColor = config?.backgroundColor || "#000000";
  const overlayColor = config?.overlayColor || "#000000";
  const textColor = config?.textColor || "#FFFFFF";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Gradients for demo
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f8b500 0%, #fceabb 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  ];

  // FLIP animation
  const handleItemClick = (index) => {
    if (isAnimating || prefersReducedMotion) {
      setSelectedIndex(index);
      return;
    }

    const item = itemRefs.current[index];
    if (!item) return;

    // First: Get initial position
    const first = item.getBoundingClientRect();

    setIsAnimating(true);
    setSelectedIndex(index);

    // Wait for DOM update
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const detail = detailRef.current;
        if (!detail) return;

        // Last: Get final position
        const last = detail.getBoundingClientRect();

        // Invert: Calculate difference
        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;
        const deltaW = first.width / last.width;
        const deltaH = first.height / last.height;

        // Play: Animate from inverted position
        detail.style.transformOrigin = 'top left';
        detail.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;
        detail.style.opacity = '0';

        requestAnimationFrame(() => {
          detail.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${transitionDuration}ms ease`;
          detail.style.transform = 'none';
          detail.style.opacity = '1';

          setTimeout(() => {
            detail.style.transition = '';
            detail.style.transformOrigin = '';
            setIsAnimating(false);
          }, transitionDuration);
        });
      });
    });
  };

  const handleClose = () => {
    if (isAnimating || prefersReducedMotion) {
      setSelectedIndex(null);
      return;
    }

    const detail = detailRef.current;
    const item = itemRefs.current[selectedIndex];
    
    if (!detail || !item) {
      setSelectedIndex(null);
      return;
    }

    // FLIP back
    const first = detail.getBoundingClientRect();
    
    setIsAnimating(true);

    requestAnimationFrame(() => {
      const last = item.getBoundingClientRect();

      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const deltaW = first.width / last.width;
      const deltaH = first.height / last.height;

      detail.style.transformOrigin = 'top left';
      detail.style.transform = `translate(${-deltaX}px, ${-deltaY}px) scale(${1/deltaW}, ${1/deltaH})`;
      detail.style.opacity = '0';
      detail.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${transitionDuration}ms ease`;

      setTimeout(() => {
        setSelectedIndex(null);
        setIsAnimating(false);
      }, transitionDuration);
    });
  };

  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: backgroundColor,
    padding: '40px 20px',
    position: 'relative'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    maxWidth: '1200px',
    margin: '0 auto',
    opacity: selectedIndex !== null ? 0 : 1,
    transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease',
    pointerEvents: selectedIndex !== null ? 'none' : 'auto'
  };

  const itemStyle = (index) => ({
    aspectRatio: '1',
    background: gradients[index],
    borderRadius: `${borderRadius}px`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: textColor,
    fontSize: '24px',
    fontWeight: '500',
    transition: prefersReducedMotion ? 'none' : 'transform 0.2s ease',
    willChange: 'transform'
  });

  const detailContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${overlayColor}95`,
    backdropFilter: 'blur(10px)',
    display: selectedIndex !== null ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    zIndex: 1000,
    opacity: selectedIndex !== null ? 1 : 0,
    transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease'
  };

  const detailStyle = {
    width: '90%',
    maxWidth: '800px',
    height: '80vh',
    background: selectedIndex !== null ? gradients[selectedIndex] : gradients[0],
    borderRadius: `${borderRadius * 1.5}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: textColor,
    position: 'relative',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: `${textColor}20`,
    border: 'none',
    color: textColor,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    transition: 'background-color 0.2s ease'
  };

  return (
    <div className="flip-gallery" style={containerStyle}>
      {/* Grid */}
      <div style={gridStyle}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <div
            key={index}
            ref={el => itemRefs.current[index] = el}
            style={itemStyle(index)}
            onClick={() => handleItemClick(index)}
            onMouseEnter={(e) => {
              if (!isAnimating && selectedIndex === null) {
                e.currentTarget.style.transform = 'scale(0.95)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Detail View */}
      {selectedIndex !== null && (
        <div style={detailContainerStyle} onClick={handleClose}>
          <div
            ref={detailRef}
            style={detailStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '48px', fontWeight: '500', marginBottom: '16px' }}>
              Item {selectedIndex + 1}
            </h2>
            <p style={{ fontSize: '18px', opacity: 0.8 }}>
              Detail view with FLIP animation
            </p>
            
            <button
              style={closeButtonStyle}
              onClick={handleClose}
              onMouseEnter={(e) => e.target.style.backgroundColor = `${textColor}30`}
              onMouseLeave={(e) => e.target.style.backgroundColor = `${textColor}20`}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
