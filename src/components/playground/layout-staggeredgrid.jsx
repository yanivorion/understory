import React from "react";

const MANIFEST = {
  "type": "Layout.StaggeredGrid",
  "description": "Masonry grid with staggered reveal animation on scroll",
  "editorElement": {
    "selector": ".staggered-grid",
    "displayName": "Staggered Grid Reveal",
    "archetype": "container",
    "data": {
      "itemCount": {
        "dataType": "select",
        "displayName": "Number of Items",
        "defaultValue": "12",
        "options": ["6", "9", "12", "15", "18"],
        "group": "Content"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Gap",
        "defaultValue": "24",
        "options": ["16", "20", "24", "32"],
        "group": "Layout"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay (ms)",
        "defaultValue": "100",
        "options": ["50", "75", "100", "150"],
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "500",
        "options": ["400", "500", "600", "700"],
        "group": "Animation"
      },
      "direction": {
        "dataType": "select",
        "displayName": "Animation Direction",
        "defaultValue": "up",
        "options": ["up", "down", "left", "right"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "12",
        "options": ["0", "8", "12", "16"],
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
  const containerRef = React.useRef(null);
  const [animatedItems, setAnimatedItems] = React.useState(new Set());

  // Config values
  const itemCount = parseInt(config?.itemCount || "12");
  const columns = parseInt(config?.columns || "3");
  const gap = parseInt(config?.gap || "24");
  const staggerDelay = parseInt(config?.staggerDelay || "100");
  const animationDuration = parseInt(config?.animationDuration || "500");
  const direction = config?.direction || "up";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const cardBackgroundColor = config?.cardBackgroundColor || "#F4F4F5";
  const borderColor = config?.borderColor || "#E4E4E7";
  const textColor = config?.textColor || "#18181B";
  const borderRadius = parseInt(config?.borderRadius || "12");

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Intersection Observer for animation
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedItems(new Set(Array.from({ length: itemCount }, (_, i) => i)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setAnimatedItems(prev => new Set([...prev, index]));
            }, index * staggerDelay);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = containerRef.current?.querySelectorAll('[data-index]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [itemCount, staggerDelay, prefersReducedMotion]);

  // Random heights for masonry effect
  const heights = React.useMemo(() => {
    const options = [180, 200, 240, 280, 220];
    return Array.from({ length: itemCount }, () => 
      options[Math.floor(Math.random() * options.length)]
    );
  }, [itemCount]);

  const containerStyle = {
    width: '100%',
    backgroundColor: backgroundColor,
    padding: '48px 24px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      default: return 'translateY(30px)';
    }
  };

  const itemStyle = (index, isAnimated) => ({
    backgroundColor: cardBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    height: `${heights[index]}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: textColor,
    fontSize: '14px',
    fontWeight: '500',
    opacity: prefersReducedMotion ? 1 : (isAnimated ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (isAnimated ? 'none' : getTransform()),
    transition: prefersReducedMotion 
      ? 'none' 
      : `opacity ${animationDuration}ms ease, transform ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
  });

  return (
    <div 
      ref={containerRef}
      className="staggered-grid"
      style={containerStyle}
    >
      <div style={gridStyle}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <div
            key={index}
            data-index={index}
            style={itemStyle(index, animatedItems.has(index))}
          >
            Item {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
