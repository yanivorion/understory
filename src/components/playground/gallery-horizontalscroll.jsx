import React from "react";

const MANIFEST = {
  "type": "Gallery.HorizontalScroll",
  "description": "Horizontal scrolling gallery with scale and blur based on distance from center",
  "editorElement": {
    "selector": ".horizontal-gallery",
    "displayName": "Horizontal Scroll Gallery",
    "archetype": "container",
    "data": {
      "itemWidth": {
        "dataType": "select",
        "displayName": "Item Width",
        "defaultValue": "400",
        "options": ["320", "360", "400", "440", "480"],
        "group": "Layout"
      },
      "itemHeight": {
        "dataType": "select",
        "displayName": "Item Height",
        "defaultValue": "500",
        "options": ["400", "450", "500", "550", "600"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Gap Between Items",
        "defaultValue": "32",
        "options": ["20", "24", "32", "40", "48"],
        "group": "Layout"
      },
      "maxBlur": {
        "dataType": "select",
        "displayName": "Max Blur Amount (px)",
        "defaultValue": "8",
        "options": ["4", "6", "8", "10", "12"],
        "group": "Animation"
      },
      "minScale": {
        "dataType": "select",
        "displayName": "Min Scale (distant items)",
        "defaultValue": "0.75",
        "options": ["0.6", "0.7", "0.75", "0.8", "0.85"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Item Border Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "vertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, scroll: 0 });
  const [velocity, setVelocity] = React.useState(0);
  const scrollContainerRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const lastTimeRef = React.useRef(Date.now());
  
  const itemWidth = parseInt(config?.itemWidth || "400");
  const itemHeight = parseInt(config?.itemHeight || "500");
  const gap = parseInt(config?.gap || "32");
  const maxBlur = parseInt(config?.maxBlur || "8");
  const minScale = parseFloat(config?.minScale || "0.75");
  
  const backgroundColor = config?.backgroundColor || "#18181B";
  const textColor = config?.textColor || "#FAFAFA";
  const borderColor = config?.borderColor || "#3F3F46";
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const items = [
    { title: "Mountain Vista", location: "Swiss Alps", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop" },
    { title: "Ocean Serenity", location: "Maldives", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1000&fit=crop" },
    { title: "Desert Dreams", location: "Sahara", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=1000&fit=crop" },
    { title: "Urban Lights", location: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=1000&fit=crop" },
    { title: "Forest Path", location: "Redwood", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1000&fit=crop" },
    { title: "Arctic Aurora", location: "Iceland", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=1000&fit=crop" },
    { title: "Coastal Cliffs", location: "Ireland", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=1000&fit=crop" },
    { title: "Canyon Depths", location: "Arizona", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=1000&fit=crop" }
  ];

  // Momentum scrolling
  React.useEffect(() => {
    if (prefersReducedMotion) return;
    
    const animate = () => {
      if (Math.abs(velocity) > 0.1 && !isDragging) {
        setScrollPosition(prev => {
          const container = scrollContainerRef.current;
          if (!container) return prev;
          
          const maxScroll = container.scrollWidth - container.clientWidth;
          const newScroll = Math.max(0, Math.min(maxScroll, prev + velocity));
          container.scrollLeft = newScroll;
          return newScroll;
        });
        setVelocity(v => v * 0.95);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [velocity, isDragging, prefersReducedMotion]);

  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, scroll: scrollPosition });
    setVelocity(0);
    lastTimeRef.current = Date.now();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const delta = e.clientX - dragStart.x;
    const newScroll = dragStart.scroll - delta;
    
    const container = scrollContainerRef.current;
    if (container) {
      const now = Date.now();
      const dt = now - lastTimeRef.current;
      if (dt > 0) {
        setVelocity(-(newScroll - scrollPosition) / dt * 16);
      }
      lastTimeRef.current = now;
      
      container.scrollLeft = newScroll;
      setScrollPosition(newScroll);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, scrollPosition]);

  const containerStyle = {
    width: '100%',
    minHeight: '700px',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '60px 0'
  };

  const scrollContainerStyle = {
    display: 'flex',
    gap: `${gap}px`,
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
    padding: '40px max(40px, calc((100vw - 1400px) / 2))',
    userSelect: 'none',
    width: '100%'
  };

  const getItemTransform = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return { scale: 1, blur: 0, opacity: 1 };
    
    const itemLeft = index * (itemWidth + gap);
    const containerCenter = scrollPosition + container.clientWidth / 2;
    const itemCenter = itemLeft + itemWidth / 2;
    const distance = Math.abs(containerCenter - itemCenter);
    const maxDistance = container.clientWidth / 2 + itemWidth;
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    
    const scale = minScale + (1 - minScale) * (1 - normalizedDistance);
    const blur = maxBlur * normalizedDistance;
    const opacity = 0.4 + 0.6 * (1 - normalizedDistance);
    
    return { scale, blur, opacity };
  };

  const getItemStyle = (index) => {
    const { scale, blur, opacity } = getItemTransform(index);
    
    return {
      minWidth: `${itemWidth}px`,
      height: `${itemHeight}px`,
      borderRadius: '16px',
      overflow: 'hidden',
      border: `1px solid ${borderColor}`,
      position: 'relative',
      transform: prefersReducedMotion ? 'none' : `scale(${scale})`,
      filter: prefersReducedMotion ? 'none' : `blur(${blur}px)`,
      opacity: prefersReducedMotion ? 1 : opacity,
      transition: 'transform 100ms ease-out, filter 100ms ease-out, opacity 100ms ease-out',
      willChange: 'transform, filter, opacity',
      pointerEvents: isDragging ? 'none' : 'auto'
    };
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  };

  const infoOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
    padding: '32px 20px 20px',
    color: textColor
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '400',
    margin: '0 0 4px 0',
    letterSpacing: '-0.01em'
  };

  const locationStyle = {
    fontSize: '14px',
    opacity: 0.7,
    margin: 0
  };

  return (
    <div style={containerStyle} className="horizontal-gallery">
      <style>{`
        .horizontal-gallery *::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <div 
        ref={scrollContainerRef}
        style={scrollContainerStyle}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
      >
        {items.map((item, index) => (
          <div key={index} style={getItemStyle(index)}>
            <img 
              src={item.image} 
              alt={item.title}
              style={imageStyle}
              draggable={false}
            />
            <div style={infoOverlayStyle}>
              <h3 style={titleStyle}>{item.title}</h3>
              <p style={locationStyle}>{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
