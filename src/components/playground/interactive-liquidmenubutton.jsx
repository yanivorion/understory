import React from "react";

const MANIFEST = {
  "type": "Interactive.LiquidMenuButton",
  "description": "Menu toggle button with fluid liquid morphing animation between states",
  "editorElement": {
    "selector": ".liquid-menu-button",
    "displayName": "Liquid Menu Button",
    "archetype": "container",
    "data": {
      "size": {
        "dataType": "select",
        "displayName": "Button Size (px)",
        "defaultValue": "48",
        "options": ["40", "44", "48", "56", "64"],
        "group": "Layout"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
        "group": "Animation"
      },
      "strokeWidth": {
        "dataType": "select",
        "displayName": "Line Thickness",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "buttonColor": {
        "dataType": "color",
        "displayName": "Button Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "lineColor": {
        "dataType": "color",
        "displayName": "Line Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "hoverBackgroundColor": {
        "dataType": "color",
        "displayName": "Hover Background",
        "defaultValue": "#F4F4F5",
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Config values
  const size = parseInt(config?.size || "48");
  const animationDuration = parseInt(config?.animationDuration || "400");
  const strokeWidth = parseInt(config?.strokeWidth || "3");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const buttonColor = config?.buttonColor || "#18181B";
  const lineColor = config?.lineColor || "#18181B";
  const hoverBackgroundColor = config?.hoverBackgroundColor || "#F4F4F5";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const containerStyle = {
    display: 'inline-flex',
    backgroundColor: backgroundColor,
    padding: '24px'
  };

  const buttonStyle = {
    width: `${size}px`,
    height: `${size}px`,
    padding: '12px',
    backgroundColor: isHovered ? hoverBackgroundColor : 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: prefersReducedMotion ? 'none' : `background-color 0.2s ease`,
    WebkitTapHighlightColor: 'transparent'
  };

  const svgStyle = {
    width: '100%',
    height: '100%',
    overflow: 'visible'
  };

  // Calculate positions for liquid animation
  const lineLength = size * 0.5;
  const gap = size * 0.15;
  const center = size * 0.5;

  // Hamburger positions
  const topY = center - gap;
  const middleY = center;
  const bottomY = center + gap;

  // X positions
  const lineStart = (size - lineLength) / 2;
  const lineEnd = lineStart + lineLength;

  const getPath = (isOpen, line) => {
    if (line === 'top') {
      if (isOpen) {
        // Top line rotates and moves to form X
        const diagonal = lineLength / Math.sqrt(2);
        return `M ${lineStart} ${topY} L ${lineEnd} ${topY}`;
      }
      return `M ${lineStart} ${topY} L ${lineEnd} ${topY}`;
    } else if (line === 'middle') {
      if (isOpen) {
        // Middle line disappears
        return `M ${center} ${middleY} L ${center} ${middleY}`;
      }
      return `M ${lineStart} ${middleY} L ${lineEnd} ${middleY}`;
    } else if (line === 'bottom') {
      if (isOpen) {
        // Bottom line rotates
        return `M ${lineStart} ${bottomY} L ${lineEnd} ${bottomY}`;
      }
      return `M ${lineStart} ${bottomY} L ${lineEnd} ${bottomY}`;
    }
  };

  const lineStyle = {
    fill: 'none',
    stroke: lineColor,
    strokeWidth: strokeWidth,
    strokeLinecap: 'round',
    transition: prefersReducedMotion 
      ? 'none' 
      : `d ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${animationDuration}ms ease, transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    transformOrigin: 'center',
    willChange: 'transform'
  };

  const topLineTransform = prefersReducedMotion 
    ? 'none' 
    : (isOpen ? `translateY(${gap}px) rotate(45deg)` : 'none');
  
  const bottomLineTransform = prefersReducedMotion 
    ? 'none' 
    : (isOpen ? `translateY(-${gap}px) rotate(-45deg)` : 'none');

  const middleLineOpacity = isOpen ? 0 : 1;

  return (
    <div className="liquid-menu-button" style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg 
          viewBox={`0 0 ${size} ${size}`}
          style={svgStyle}
        >
          {/* Top Line */}
          <path
            d={getPath(false, 'top')}
            style={{
              ...lineStyle,
              transform: topLineTransform
            }}
          />
          
          {/* Middle Line */}
          <path
            d={getPath(isOpen, 'middle')}
            style={{
              ...lineStyle,
              opacity: middleLineOpacity
            }}
          />
          
          {/* Bottom Line */}
          <path
            d={getPath(false, 'bottom')}
            style={{
              ...lineStyle,
              transform: bottomLineTransform
            }}
          />
        </svg>
      </button>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
