import React from "react";

const MANIFEST = {
  "type": "Timeline.RadialTimeline",
  "description": "Radial timeline docked on side with glassmorphism cards that expand progressively on scroll",
  "editorElement": {
    "selector": ".radial-timeline",
    "displayName": "Radial Timeline",
    "archetype": "container",
    "data": {
      "dockPosition": {
        "dataType": "select",
        "displayName": "Dock Position",
        "defaultValue": "left",
        "options": ["left", "right"],
        "group": "Layout"
      },
      "radius": {
        "dataType": "select",
        "displayName": "Circle Radius",
        "defaultValue": "300",
        "options": ["250", "300", "350", "400"],
        "group": "Layout"
      },
      "cardWidth": {
        "dataType": "select",
        "displayName": "Card Width",
        "defaultValue": "280",
        "options": ["240", "260", "280", "300", "320"],
        "group": "Layout"
      },
      "scrollThreshold": {
        "dataType": "select",
        "displayName": "Scroll Trigger Point",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.4", "0.5"],
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Item Stagger (ms)",
        "defaultValue": "150",
        "options": ["100", "150", "200", "250"],
        "group": "Animation"
      },
      "backdropBlur": {
        "dataType": "select",
        "displayName": "Glass Blur Amount",
        "defaultValue": "16",
        "options": ["10", "12", "16", "20", "24"],
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "timelineLineColor": {
        "dataType": "color",
        "displayName": "Timeline Line Color",
        "defaultValue": "#CED4DA",
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
  const [visibleIndices, setVisibleIndices] = React.useState(new Set());
  const [progress, setProgress] = React.useState(0);
  const containerRef = React.useRef(null);
  const itemRefs = React.useRef([]);
  
  const dockPosition = config?.dockPosition || "left";
  const radius = parseInt(config?.radius || "300");
  const cardWidth = parseInt(config?.cardWidth || "280");
  const scrollThreshold = parseFloat(config?.scrollThreshold || "0.3");
  const staggerDelay = parseInt(config?.staggerDelay || "150");
  const backdropBlur = config?.backdropBlur || "16";
  
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const accentColor = config?.accentColor || "#495057";
  const textColor = config?.textColor || "#212529";
  const timelineLineColor = config?.timelineLineColor || "#CED4DA";
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const milestones = [
    { 
      year: "2019", 
      title: "Foundation", 
      description: "Started with a vision to transform sustainable architecture",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
    },
    { 
      year: "2020", 
      title: "First Project", 
      description: "Completed our first LEED-certified residential building",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    },
    { 
      year: "2021", 
      title: "Expansion", 
      description: "Opened offices in three major cities across the continent",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
    },
    { 
      year: "2022", 
      title: "Recognition", 
      description: "Received international design awards for innovation",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
    },
    { 
      year: "2023", 
      title: "Innovation", 
      description: "Launched proprietary green building methodology",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop"
    },
    { 
      year: "2024", 
      title: "Global Impact", 
      description: "Reached 100+ sustainable projects worldwide",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop"
    }
  ];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleIndices(prev => new Set([...prev, index]));
            }, index * staggerDelay);
          }
        });
      },
      { threshold: scrollThreshold }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [scrollThreshold, staggerDelay]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      const scrolled = Math.max(0, -rect.top);
      const scrollableDistance = elementHeight - viewportHeight;
      const scrollProgress = Math.min(1, Math.max(0, scrolled / scrollableDistance));
      
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerStyle = {
    width: '100%',
    minHeight: '2000px',
    backgroundColor,
    padding: '80px 0',
    position: 'relative',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const timelineContainerStyle = {
    position: 'sticky',
    top: '50%',
    transform: 'translateY(-50%)',
    [dockPosition]: '0',
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    pointerEvents: 'none'
  };

  const circleStyle = {
    position: 'absolute',
    left: dockPosition === 'left' ? `-${radius}px` : 'auto',
    right: dockPosition === 'right' ? `-${radius}px` : 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    borderRadius: '50%',
    border: `2px solid ${timelineLineColor}`,
    clipPath: dockPosition === 'left' 
      ? `polygon(50% 0, 100% 0, 100% 100%, 50% 100%)`
      : `polygon(0 0, 50% 0, 50% 100%, 0 100%)`
  };

  const progressArcStyle = {
    position: 'absolute',
    left: dockPosition === 'left' ? `-${radius}px` : 'auto',
    right: dockPosition === 'right' ? `-${radius}px` : 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    borderRadius: '50%',
    border: `3px solid ${accentColor}`,
    clipPath: dockPosition === 'left' 
      ? `polygon(50% 0, 100% 0, 100% ${progress * 100}%, 50% ${progress * 100}%)`
      : `polygon(0 0, 50% 0, 50% ${progress * 100}%, 0 ${progress * 100}%)`,
    transition: prefersReducedMotion ? 'none' : 'clip-path 100ms linear'
  };

  const spacerStyle = {
    height: `${300 * milestones.length}px`
  };

  const itemsContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none'
  };

  const getItemPosition = (index) => {
    const anglePerItem = 180 / (milestones.length + 1);
    const angle = (index + 1) * anglePerItem;
    const radians = (angle - 90) * (Math.PI / 180);
    
    const xPos = Math.cos(radians) * radius;
    const yPos = Math.sin(radians) * radius;
    
    return {
      [dockPosition]: dockPosition === 'left' ? `${xPos}px` : `${-xPos}px`,
      top: `calc(50% + ${yPos}px)`,
      transform: 'translateY(-50%)'
    };
  };

  const getCardStyle = (index) => {
    const isVisible = visibleIndices.has(index);
    const position = getItemPosition(index);
    
    return {
      position: 'absolute',
      ...position,
      width: `${cardWidth}px`,
      minHeight: '180px',
      background: cardBackground,
      backdropFilter: `blur(${backdropBlur}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${backdropBlur}px) saturate(180%)`,
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'translateY(-50%) scale(1)' 
        : `translateY(-50%) scale(0.8) translateX(${dockPosition === 'left' ? '-30' : '30'}px)`,
      transition: prefersReducedMotion 
        ? 'none'
        : 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
      pointerEvents: 'auto',
      overflow: 'hidden'
    };
  };

  const imageContainerStyle = {
    width: '100%',
    height: '100px',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '16px'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const yearStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: accentColor,
    letterSpacing: '0.05em',
    marginBottom: '8px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '500',
    color: textColor,
    margin: '0 0 8px 0',
    letterSpacing: '-0.01em'
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: textColor,
    opacity: 0.7,
    margin: 0,
    lineHeight: 1.5
  };

  const dotStyle = {
    position: 'absolute',
    [dockPosition]: dockPosition === 'left' ? `${radius}px` : `${radius}px`,
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: accentColor,
    boxShadow: `0 0 0 4px ${backgroundColor}, 0 0 0 6px ${timelineLineColor}`,
    transition: prefersReducedMotion ? 'none' : 'transform 300ms ease-out',
    transform: visibleIndices.has(index) ? 'scale(1)' : 'scale(0)'
  };

  return (
    <div ref={containerRef} style={containerStyle} className="radial-timeline">
      <div style={timelineContainerStyle}>
        <div style={circleStyle} />
        <div style={progressArcStyle} />
        
        <div style={itemsContainerStyle}>
          {milestones.map((milestone, index) => {
            const position = getItemPosition(index);
            return (
              <React.Fragment key={index}>
                <div 
                  ref={el => itemRefs.current[index] = el}
                  style={getCardStyle(index)}
                >
                  <div style={imageContainerStyle}>
                    <img 
                      src={milestone.image} 
                      alt={milestone.title}
                      style={imageStyle}
                    />
                  </div>
                  <div style={yearStyle}>{milestone.year}</div>
                  <h3 style={titleStyle}>{milestone.title}</h3>
                  <p style={descriptionStyle}>{milestone.description}</p>
                </div>
                
                <div 
                  style={{
                    ...dotStyle,
                    ...position
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      <div style={spacerStyle} />
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
