import React from "react";

const MANIFEST = {
  "type": "Timeline.Vertical",
  "description": "Vertical timeline with alternating content, progressive line drawing, and scroll-based activation",
  "editorElement": {
    "selector": ".vertical-timeline",
    "displayName": "Vertical Timeline",
    "archetype": "container",
    "data": {
      "lineWidth": {
        "dataType": "select",
        "displayName": "Timeline Line Width",
        "defaultValue": "2",
        "options": ["1", "2", "3", "4"],
        "group": "Layout"
      },
      "dotSize": {
        "dataType": "select",
        "displayName": "Dot Size",
        "defaultValue": "16",
        "options": ["12", "14", "16", "18", "20"],
        "group": "Layout"
      },
      "cardWidth": {
        "dataType": "select",
        "displayName": "Card Max Width",
        "defaultValue": "500",
        "options": ["400", "450", "500", "550", "600"],
        "group": "Layout"
      },
      "inactiveScale": {
        "dataType": "select",
        "displayName": "Inactive Scale",
        "defaultValue": "0.94",
        "options": ["0.9", "0.92", "0.94", "0.96", "0.98"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "lineColor": {
        "dataType": "color",
        "displayName": "Timeline Line Color",
        "defaultValue": "#CED4DA",
        "group": "Colors"
      },
      "activeLineColor": {
        "dataType": "color",
        "displayName": "Active Line Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "dotColor": {
        "dataType": "color",
        "displayName": "Dot Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "glowColor": {
        "dataType": "color",
        "displayName": "Active Glow Color",
        "defaultValue": "#495057",
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
  const [activeIndices, setActiveIndices] = React.useState(new Set());
  const [lineProgress, setLineProgress] = React.useState(0);
  const itemRefs = React.useRef([]);
  const containerRef = React.useRef(null);
  
  const lineWidth = parseInt(config?.lineWidth || "2");
  const dotSize = parseInt(config?.dotSize || "16");
  const cardWidth = parseInt(config?.cardWidth || "500");
  const inactiveScale = parseFloat(config?.inactiveScale || "0.94");
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const lineColor = config?.lineColor || "#CED4DA";
  const activeLineColor = config?.activeLineColor || "#495057";
  const dotColor = config?.dotColor || "#495057";
  const cardBackground = config?.cardBackground || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const glowColor = config?.glowColor || "#495057";
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const events = [
    { year: "2019", title: "Company Founded", desc: "Started with a vision to innovate", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" },
    { year: "2020", title: "Series A Funding", desc: "Raised $10M to scale operations", image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop" },
    { year: "2021", title: "Product Launch", desc: "Released flagship product to market", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" },
    { year: "2022", title: "Global Expansion", desc: "Opened offices in 5 countries", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" },
    { year: "2023", title: "1M Customers", desc: "Reached major milestone", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop" },
    { year: "2024", title: "Innovation Award", desc: "Recognized for excellence", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop" }
  ];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setActiveIndices(prev => new Set([...prev, index]));
            }, index * 100);
          }
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      const start = rect.top;
      const end = rect.bottom - windowHeight;
      
      const progress = Math.max(0, Math.min(1, -start / (elementHeight - windowHeight)));
      setLineProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerStyle = {
    width: '100%',
    minHeight: '2000px',
    backgroundColor,
    padding: '100px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative'
  };

  const timelineLineStyle = {
    position: 'absolute',
    left: '50%',
    top: '80px',
    bottom: '80px',
    width: `${lineWidth}px`,
    transform: 'translateX(-50%)',
    backgroundColor: lineColor,
    zIndex: 1
  };

  const progressLineStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: `${lineProgress * 100}%`,
    backgroundColor: activeLineColor,
    transition: 'height 100ms linear',
    boxShadow: `0 0 20px ${glowColor}33`
  };

  const eventsContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  };

  const eventStyle = (index) => {
    const isActive = activeIndices.has(index);
    const isLeft = index % 2 === 0;
    
    return {
      display: 'flex',
      justifyContent: isLeft ? 'flex-end' : 'flex-start',
      paddingLeft: isLeft ? 0 : '50%',
      paddingRight: isLeft ? '50%' : 0,
      marginBottom: '120px',
      position: 'relative'
    };
  };

  const cardStyle = (index) => {
    const isActive = activeIndices.has(index);
    const isLeft = index % 2 === 0;
    
    return {
      maxWidth: `${cardWidth}px`,
      backgroundColor: cardBackground,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: isActive 
        ? `0 12px 40px rgba(0,0,0,0.15), 0 0 30px ${glowColor}15` 
        : '0 4px 12px rgba(0,0,0,0.08)',
      opacity: isActive ? 1 : 0.5,
      transform: prefersReducedMotion 
        ? 'none'
        : isActive 
          ? 'scale(1)' 
          : `scale(${inactiveScale}) translateX(${isLeft ? '20px' : '-20px'})`,
      filter: isActive ? 'grayscale(0%) saturate(100%)' : 'grayscale(80%) saturate(50%)',
      transition: 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
      willChange: 'transform, opacity, filter'
    };
  };

  const dotStyle = (index) => {
    const isActive = activeIndices.has(index);
    
    return {
      position: 'absolute',
      left: '50%',
      top: '32px',
      transform: 'translateX(-50%)',
      width: `${dotSize}px`,
      height: `${dotSize}px`,
      borderRadius: '50%',
      backgroundColor: isActive ? dotColor : lineColor,
      border: `${lineWidth * 2}px solid ${backgroundColor}`,
      boxShadow: isActive ? `0 0 0 4px ${glowColor}20, 0 0 20px ${glowColor}40` : 'none',
      transition: 'all 400ms ease-out',
      zIndex: 3
    };
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginBottom: '16px'
  };

  const yearStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: dotColor,
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

  const descStyle = {
    fontSize: '15px',
    color: textColor,
    opacity: 0.7,
    margin: 0,
    lineHeight: 1.6
  };

  return (
    <div ref={containerRef} style={containerStyle} className="vertical-timeline">
      <div style={timelineLineStyle}>
        <div style={progressLineStyle} />
      </div>

      <div style={eventsContainerStyle}>
        {events.map((event, index) => (
          <div key={index} style={eventStyle(index)}>
            <div 
              ref={el => itemRefs.current[index] = el}
              style={cardStyle(index)}
            >
              <img src={event.image} alt={event.title} style={imageStyle} />
              <div style={yearStyle}>{event.year}</div>
              <h3 style={titleStyle}>{event.title}</h3>
              <p style={descStyle}>{event.desc}</p>
            </div>
            <div style={dotStyle(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
