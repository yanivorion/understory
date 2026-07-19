import React from "react";

const MANIFEST = {
  "type": "Timeline.AnimatedTimeline",
  "description": "Vertical timeline with scroll-triggered animations",
  "editorElement": {
    "selector": ".animated-timeline-container",
    "displayName": "Animated Timeline",
    "archetype": "container",
    "data": {
      "events": {
        "dataType": "text",
        "displayName": "Timeline Events JSON",
        "defaultValue": '[{"date":"January 2020","title":"Company Founded","description":"Started with a vision to revolutionize the industry with innovative solutions and customer-first approach.","image":"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop"},{"date":"June 2020","title":"First Product Launch","description":"Released our flagship product after months of development and testing with early adopters.","image":"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"},{"date":"March 2021","title":"Series A Funding","description":"Secured $10M in Series A funding to accelerate growth and expand our engineering team.","image":"https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=300&fit=crop"},{"date":"September 2021","title":"Reached 10,000 Users","description":"Milestone achievement as we welcomed our 10,000th customer to the platform.","image":""},{"date":"January 2022","title":"International Expansion","description":"Opened offices in London, Tokyo, and Singapore to serve our global customer base.","image":"https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop"},{"date":"July 2023","title":"Product 2.0 Release","description":"Launched complete platform redesign with advanced features and improved performance.","image":"https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"}]',
        "group": "Content"
      },
      "alternateLayout": {
        "dataType": "booleanValue",
        "displayName": "Alternate Left/Right Layout",
        "defaultValue": "true",
        "group": "Content"
      },
      "showImages": {
        "dataType": "booleanValue",
        "displayName": "Show Images",
        "defaultValue": "true",
        "group": "Content"
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
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "primaryTextColor": {
        "dataType": "color",
        "displayName": "Primary Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#6B6B6B",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color (line, dots)",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "dateColor": {
        "dataType": "color",
        "displayName": "Date Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(0,0,0,0.08)",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "Inter, -apple-system, system-ui, sans-serif",
        "options": [
          "Inter, -apple-system, system-ui, sans-serif",
          "SF Pro Display, -apple-system, sans-serif",
          "Helvetica Neue, Helvetica, Arial, sans-serif"
        ],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "select",
        "displayName": "Title Font Size",
        "defaultValue": "24px",
        "options": ["20px", "24px", "28px", "32px"],
        "group": "Typography"
      },
      "dateSize": {
        "dataType": "select",
        "displayName": "Date Font Size",
        "defaultValue": "14px",
        "options": ["12px", "14px", "16px"],
        "group": "Typography"
      },
      "descriptionSize": {
        "dataType": "select",
        "displayName": "Description Font Size",
        "defaultValue": "16px",
        "options": ["14px", "16px", "18px"],
        "group": "Typography"
      },
      "timelineMaxWidth": {
        "dataType": "select",
        "displayName": "Timeline Max Width",
        "defaultValue": "1200px",
        "options": ["900px", "1000px", "1200px", "1400px"],
        "group": "Layout"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "32px",
        "options": ["24px", "28px", "32px", "36px", "40px"],
        "group": "Layout"
      },
      "eventGap": {
        "dataType": "select",
        "displayName": "Gap Between Events",
        "defaultValue": "80px",
        "options": ["60px", "80px", "100px", "120px"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Card Border Radius",
        "defaultValue": "12px",
        "options": ["0px", "6px", "8px", "12px", "16px"],
        "group": "Layout"
      },
      "dotSize": {
        "dataType": "select",
        "displayName": "Timeline Dot Size",
        "defaultValue": "16px",
        "options": ["12px", "14px", "16px", "18px", "20px"],
        "group": "Layout"
      },
      "lineWidth": {
        "dataType": "select",
        "displayName": "Timeline Line Width",
        "defaultValue": "2px",
        "options": ["1px", "2px", "3px", "4px"],
        "group": "Layout"
      },
      "showShadow": {
        "dataType": "booleanValue",
        "displayName": "Show Card Shadow",
        "defaultValue": "true",
        "group": "Layout"
      },
      "animationDuration": {
        "dataType": "number",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "600",
        "group": "Animation"
      },
      "scrollThreshold": {
        "dataType": "select",
        "displayName": "Scroll Trigger Point",
        "defaultValue": "0.2",
        "options": ["0.1", "0.2", "0.3", "0.5"],
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [animatedEvents, setAnimatedEvents] = React.useState(new Set());
  const eventRefs = React.useRef([]);

  // Safe config extraction
  const events = React.useMemo(() => {
    try {
      return JSON.parse(config?.events || MANIFEST.editorElement.data.events.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.events.defaultValue);
    }
  }, [config?.events]);

  const alternateLayout = config?.alternateLayout !== false;
  const showImages = config?.showImages !== false;
  const animationDuration = parseInt(config?.animationDuration || '600');
  const scrollThreshold = parseFloat(config?.scrollThreshold || '0.2');

  // PATTERN 7: IntersectionObserver for scroll-triggered animations
  React.useEffect(() => {
    const observers = [];

    eventRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !animatedEvents.has(index)) {
            // PATTERN 1: Direct DOM animation
            element.animate([
              { 
                opacity: 0, 
                transform: alternateLayout && index % 2 === 1 
                  ? 'translateX(50px)' 
                  : 'translateX(-50px)' 
              },
              { 
                opacity: 1, 
                transform: 'translateX(0)' 
              }
            ], {
              duration: animationDuration,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              fill: 'forwards'
            });

            setAnimatedEvents(prev => new Set([...prev, index]));
            observer.disconnect();
          }
        },
        { threshold: scrollThreshold }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [events, animatedEvents, animationDuration, scrollThreshold, alternateLayout]);

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      padding: '80px 24px',
      backgroundColor: config?.backgroundColor || '#FFFFFF',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif'
    },
    timeline: {
      maxWidth: config?.timelineMaxWidth || '1200px',
      margin: '0 auto',
      position: 'relative'
    },
    line: {
      position: 'absolute',
      left: '50%',
      top: '0',
      bottom: '0',
      width: config?.lineWidth || '2px',
      backgroundColor: config?.accentColor || '#1A1A1A',
      transform: 'translateX(-50%)',
      opacity: '0.2'
    },
    event: {
      position: 'relative',
      marginBottom: config?.eventGap || '80px',
      opacity: 0
    },
    eventContent: {
      width: 'calc(50% - 60px)',
      position: 'relative'
    },
    eventLeft: {
      marginLeft: '0',
      marginRight: 'auto',
      textAlign: 'right'
    },
    eventRight: {
      marginLeft: 'auto',
      marginRight: '0',
      textAlign: 'left'
    },
    eventCenter: {
      width: '100%',
      maxWidth: '700px',
      margin: '0 auto',
      textAlign: 'left'
    },
    card: {
      backgroundColor: config?.cardBackgroundColor || '#FAFAFA',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '12px',
      padding: config?.cardPadding || '32px',
      boxShadow: (config?.showShadow !== false) ? '0 4px 12px rgba(0,0,0,0.04)' : 'none',
      transition: `all 300ms cubic-bezier(0.4, 0, 0.2, 1)`
    },
    date: {
      fontSize: config?.dateSize || '14px',
      fontWeight: '500',
      color: config?.dateColor || '#1A1A1A',
      marginBottom: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    title: {
      fontSize: config?.titleSize || '24px',
      fontWeight: '400',
      color: config?.primaryTextColor || '#1A1A1A',
      marginBottom: '16px',
      lineHeight: '1.3'
    },
    description: {
      fontSize: config?.descriptionSize || '16px',
      color: config?.secondaryTextColor || '#6B6B6B',
      lineHeight: '1.6',
      marginBottom: showImages ? '20px' : '0'
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: config?.borderRadius || '12px',
      marginTop: '20px'
    },
    dot: {
      position: 'absolute',
      top: '24px',
      left: '50%',
      width: config?.dotSize || '16px',
      height: config?.dotSize || '16px',
      backgroundColor: config?.accentColor || '#1A1A1A',
      borderRadius: '50%',
      transform: 'translateX(-50%)',
      border: `3px solid ${config?.backgroundColor || '#FFFFFF'}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: '2'
    }
  };

  return (
    <div style={styles.container} className="animated-timeline-container">
      <div style={styles.timeline}>
        {alternateLayout && <div style={styles.line} />}

        {events.map((event, index) => {
          const isLeft = alternateLayout ? index % 2 === 0 : false;
          const isRight = alternateLayout ? index % 2 === 1 : false;

          return (
            <div
              key={index}
              ref={el => eventRefs.current[index] = el}
              style={styles.event}
            >
              {alternateLayout && <div style={styles.dot} />}

              <div style={{
                ...styles.eventContent,
                ...(alternateLayout ? (isLeft ? styles.eventLeft : styles.eventRight) : styles.eventCenter)
              }}>
                <div
                  style={styles.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = (config?.showShadow !== false) ? '0 8px 24px rgba(0,0,0,0.08)' : 'none';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = (config?.showShadow !== false) ? '0 4px 12px rgba(0,0,0,0.04)' : 'none';
                  }}
                >
                  <div style={styles.date}>{event.date}</div>
                  <h3 style={styles.title}>{event.title}</h3>
                  <p style={styles.description}>{event.description}</p>
                  {showImages && event.image && (
                    <img src={event.image} alt={event.title} style={styles.image} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
