import React from "react";

const MANIFEST = {
  "type": "Interactive.MomentumCarousel",
  "description": "Horizontal draggable carousel with momentum scrolling and snap points",
  "editorElement": {
    "selector": ".momentum-carousel",
    "displayName": "Drag Momentum Carousel",
    "archetype": "container",
    "data": {
      "itemCount": {
        "dataType": "select",
        "displayName": "Number of Items",
        "defaultValue": "8",
        "options": ["5", "6", "8", "10", "12"],
        "group": "Content"
      },
      "itemWidth": {
        "dataType": "select",
        "displayName": "Item Width (px)",
        "defaultValue": "280",
        "options": ["240", "280", "320", "360"],
        "group": "Layout"
      },
      "itemHeight": {
        "dataType": "select",
        "displayName": "Item Height (px)",
        "defaultValue": "200",
        "options": ["180", "200", "220", "240"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Gap Between Items",
        "defaultValue": "20",
        "options": ["12", "16", "20", "24"],
        "group": "Layout"
      },
      "snapToItems": {
        "dataType": "booleanValue",
        "displayName": "Snap To Items",
        "defaultValue": true,
        "group": "Animation"
      },
      "momentumMultiplier": {
        "dataType": "select",
        "displayName": "Momentum Strength",
        "defaultValue": "1.5",
        "options": ["1.0", "1.5", "2.0", "2.5"],
        "group": "Animation"
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
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "itemBackgroundColor": {
        "dataType": "color",
        "displayName": "Item Background",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["400", "500"],
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontal",
      "contentResizeDirection": "horizontal"
    }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [velocity, setVelocity] = React.useState(0);
  const lastMoveTime = React.useRef(Date.now());
  const lastMoveX = React.useRef(0);
  const animationFrame = React.useRef(null);

  // Config values
  const itemCount = parseInt(config?.itemCount || "8");
  const itemWidth = parseInt(config?.itemWidth || "280");
  const itemHeight = parseInt(config?.itemHeight || "200");
  const gap = parseInt(config?.gap || "20");
  const snapToItems = config?.snapToItems !== false;
  const momentumMultiplier = parseFloat(config?.momentumMultiplier || "1.5");
  const borderRadius = parseInt(config?.borderRadius || "12");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const itemBackgroundColor = config?.itemBackgroundColor || "#F4F4F5";
  const textColor = config?.textColor || "#18181B";
  const fontSize = config?.fontSize || 18;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Mouse/Touch handlers
  const handleDragStart = (clientX) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setStartX(clientX);
    setScrollLeft(containerRef.current.scrollLeft);
    setVelocity(0);
    lastMoveTime.current = Date.now();
    lastMoveX.current = clientX;
    
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || !containerRef.current) return;

    const currentTime = Date.now();
    const timeDelta = currentTime - lastMoveTime.current;
    const xDelta = clientX - lastMoveX.current;
    
    if (timeDelta > 0) {
      setVelocity(xDelta / timeDelta);
    }

    const deltaX = clientX - startX;
    containerRef.current.scrollLeft = scrollLeft - deltaX;

    lastMoveTime.current = currentTime;
    lastMoveX.current = clientX;
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (!prefersReducedMotion && Math.abs(velocity) > 0.1) {
      applyMomentum();
    } else if (snapToItems && containerRef.current) {
      snapToNearest();
    }
  };

  // Momentum animation
  const applyMomentum = () => {
    if (!containerRef.current) return;

    let currentVelocity = velocity * momentumMultiplier * 100;
    const friction = 0.95;
    const minVelocity = 0.5;

    const animate = () => {
      if (Math.abs(currentVelocity) < minVelocity) {
        if (snapToItems) {
          snapToNearest();
        }
        return;
      }

      currentVelocity *= friction;
      containerRef.current.scrollLeft -= currentVelocity;

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();
  };

  // Snap to nearest item
  const snapToNearest = () => {
    if (!containerRef.current) return;

    const scrollPosition = containerRef.current.scrollLeft;
    const itemWidthWithGap = itemWidth + gap;
    const nearestIndex = Math.round(scrollPosition / itemWidthWithGap);
    const snapPosition = nearestIndex * itemWidthWithGap;

    containerRef.current.scrollTo({
      left: snapPosition,
      behavior: 'smooth'
    });
  };

  // Event listeners
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e) => handleDragStart(e.clientX);
    const handleMouseMove = (e) => handleDragMove(e.clientX);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX);
    const handleTouchMove = (e) => handleDragMove(e.touches[0].clientX);
    const handleTouchEnd = () => handleDragEnd();

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isDragging, startX, scrollLeft, velocity]);

  const containerStyle = {
    width: '100%',
    backgroundColor: backgroundColor,
    padding: '48px 0',
    overflow: 'hidden'
  };

  const scrollContainerStyle = {
    display: 'flex',
    gap: `${gap}px`,
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    padding: '0 24px',
    scrollBehavior: isDragging ? 'auto' : 'smooth'
  };

  const itemStyle = {
    flex: `0 0 ${itemWidth}px`,
    height: `${itemHeight}px`,
    backgroundColor: itemBackgroundColor,
    borderRadius: `${borderRadius}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    pointerEvents: 'none'
  };

  return (
    <div className="momentum-carousel" style={containerStyle}>
      <style>
        {`
          .momentum-carousel [ref]::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      
      <div 
        ref={containerRef}
        style={scrollContainerStyle}
      >
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index} style={itemStyle}>
            Item {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
