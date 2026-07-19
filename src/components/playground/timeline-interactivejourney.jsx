import React from "react";

const MANIFEST = {
  "type": "Timeline.InteractiveJourney",
  "description": "Sophisticated interactive timeline with scroll-triggered animations, milestone nodes, and branching visual paths",
  "editorElement": {
    "selector": ".timeline-container",
    "displayName": "Interactive Timeline",
    "archetype": "container",
    "data": {
      "event1Year": {
        "dataType": "text",
        "displayName": "Event 1 Year",
        "defaultValue": "2020",
        "group": "Content"
      },
      "event1Title": {
        "dataType": "text",
        "displayName": "Event 1 Title",
        "defaultValue": "Foundation",
        "group": "Content"
      },
      "event1Description": {
        "dataType": "text",
        "displayName": "Event 1 Description",
        "defaultValue": "Company founded with a vision to transform digital experiences through innovative design solutions.",
        "group": "Content"
      },
      "event2Year": {
        "dataType": "text",
        "displayName": "Event 2 Year",
        "defaultValue": "2021",
        "group": "Content"
      },
      "event2Title": {
        "dataType": "text",
        "displayName": "Event 2 Title",
        "defaultValue": "First Major Client",
        "group": "Content"
      },
      "event2Description": {
        "dataType": "text",
        "displayName": "Event 2 Description",
        "defaultValue": "Secured partnership with Fortune 500 company, establishing credibility in enterprise market.",
        "group": "Content"
      },
      "event3Year": {
        "dataType": "text",
        "displayName": "Event 3 Year",
        "defaultValue": "2022",
        "group": "Content"
      },
      "event3Title": {
        "dataType": "text",
        "displayName": "Event 3 Title",
        "defaultValue": "Team Expansion",
        "group": "Content"
      },
      "event3Description": {
        "dataType": "text",
        "displayName": "Event 3 Description",
        "defaultValue": "Grew team to 25 specialists across design, development, and strategy disciplines.",
        "group": "Content"
      },
      "event4Year": {
        "dataType": "text",
        "displayName": "Event 4 Year",
        "defaultValue": "2023",
        "group": "Content"
      },
      "event4Title": {
        "dataType": "text",
        "displayName": "Event 4 Title",
        "defaultValue": "Global Recognition",
        "group": "Content"
      },
      "event4Description": {
        "dataType": "text",
        "displayName": "Event 4 Description",
        "defaultValue": "Awarded Best Digital Agency by industry leaders, with projects featured internationally.",
        "group": "Content"
      },
      "event5Year": {
        "dataType": "text",
        "displayName": "Event 5 Year",
        "defaultValue": "2024",
        "group": "Content"
      },
      "event5Title": {
        "dataType": "text",
        "displayName": "Event 5 Title",
        "defaultValue": "Innovation Lab",
        "group": "Content"
      },
      "event5Description": {
        "dataType": "text",
        "displayName": "Event 5 Description",
        "defaultValue": "Launched research division focused on emerging technologies and future design paradigms.",
        "group": "Content"
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
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "lineActiveColor": {
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
      "dotActiveColor": {
        "dataType": "color",
        "displayName": "Active Dot Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "yearColor": {
        "dataType": "color",
        "displayName": "Year Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "descriptionColor": {
        "dataType": "color",
        "displayName": "Description Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue"],
        "group": "Typography"
      },
      "yearSize": {
        "dataType": "number",
        "displayName": "Year Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "number",
        "displayName": "Title Size (px)",
        "defaultValue": 20,
        "group": "Typography"
      },
      "descriptionSize": {
        "dataType": "number",
        "displayName": "Description Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [activeIndices, setActiveIndices] = React.useState(new Set());
  const itemRefs = React.useRef([]);

  const events = [
    {
      year: config?.event1Year || "2020",
      title: config?.event1Title || "Foundation",
      description: config?.event1Description || "Company founded with a vision to transform digital experiences through innovative design solutions."
    },
    {
      year: config?.event2Year || "2021",
      title: config?.event2Title || "First Major Client",
      description: config?.event2Description || "Secured partnership with Fortune 500 company, establishing credibility in enterprise market."
    },
    {
      year: config?.event3Year || "2022",
      title: config?.event3Title || "Team Expansion",
      description: config?.event3Description || "Grew team to 25 specialists across design, development, and strategy disciplines."
    },
    {
      year: config?.event4Year || "2023",
      title: config?.event4Title || "Global Recognition",
      description: config?.event4Description || "Awarded Best Digital Agency by industry leaders, with projects featured internationally."
    },
    {
      year: config?.event5Year || "2024",
      title: config?.event5Title || "Innovation Lab",
      description: config?.event5Description || "Launched research division focused on emerging technologies and future design paradigms."
    }
  ];

  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const lineColor = config?.lineColor || "#E9ECEF";
  const lineActiveColor = config?.lineActiveColor || "#495057";
  const dotColor = config?.dotColor || "#495057";
  const dotActiveColor = config?.dotActiveColor || "#212529";
  const yearColor = config?.yearColor || "#6C757D";
  const titleColor = config?.titleColor || "#212529";
  const descriptionColor = config?.descriptionColor || "#495057";
  const cardBackgroundColor = config?.cardBackgroundColor || "#F8F9FA";
  const fontFamily = config?.fontFamily || "system-ui";
  const yearSize = config?.yearSize || 14;
  const titleSize = config?.titleSize || 20;
  const descriptionSize = config?.descriptionSize || 14;

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  React.useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndices(prev => {
                const newSet = new Set(prev);
                newSet.add(index);
                return newSet;
              });
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <div 
      className="timeline-container"
      style={{
        backgroundColor,
        padding: '80px 24px',
        fontFamily,
        minHeight: '800px'
      }}
    >
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Vertical Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: lineColor,
          transform: 'translateX(-50%)'
        }}>
          {/* Active Progress Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            backgroundColor: lineActiveColor,
            height: `${(activeIndices.size / events.length) * 100}%`,
            transition: prefersReducedMotion ? 'none' : 'height 800ms cubic-bezier(0.22, 1, 0.36, 1)'
          }} />
        </div>

        {/* Timeline Events */}
        {events.map((event, index) => {
          const isActive = activeIndices.has(index);
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              style={{
                position: 'relative',
                marginBottom: index === events.length - 1 ? 0 : '120px',
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                alignItems: 'center'
              }}
            >
              {/* Content Card */}
              <div
                style={{
                  width: 'calc(50% - 40px)',
                  backgroundColor: cardBackgroundColor,
                  padding: '24px',
                  borderRadius: '8px',
                  opacity: prefersReducedMotion ? 1 : (isActive ? 1 : 0),
                  transform: prefersReducedMotion ? 'none' : (
                    isActive 
                      ? 'translateX(0)' 
                      : (isLeft ? 'translateX(-40px)' : 'translateX(40px)')
                  ),
                  transition: prefersReducedMotion ? 'none' : 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div style={{
                  fontSize: `${yearSize}px`,
                  fontWeight: '500',
                  color: yearColor,
                  marginBottom: '8px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  {event.year}
                </div>
                
                <h3 style={{
                  fontSize: `${titleSize}px`,
                  fontWeight: '500',
                  color: titleColor,
                  margin: '0 0 12px 0',
                  lineHeight: '1.3'
                }}>
                  {event.title}
                </h3>
                
                <p style={{
                  fontSize: `${descriptionSize}px`,
                  color: descriptionColor,
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {event.description}
                </p>
              </div>

              {/* Center Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? dotActiveColor : dotColor,
                  border: `3px solid ${backgroundColor}`,
                  zIndex: 2,
                  boxShadow: '0 0 0 2px ' + (isActive ? lineActiveColor : lineColor),
                  transition: prefersReducedMotion ? 'none' : 'all 400ms ease-out',
                  opacity: prefersReducedMotion ? 1 : (isActive ? 1 : 0.4),
                  scale: prefersReducedMotion ? 1 : (isActive ? 1 : 0.8)
                }}
              />

              {/* Connecting Line to Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: isLeft ? 'calc(50% - 40px)' : '50%',
                  right: isLeft ? '50%' : 'calc(50% - 40px)',
                  top: '50%',
                  height: '2px',
                  backgroundColor: isActive ? lineActiveColor : lineColor,
                  transform: 'translateY(-50%)',
                  opacity: prefersReducedMotion ? 1 : (isActive ? 1 : 0.3),
                  transition: prefersReducedMotion ? 'none' : 'all 400ms ease-out'
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
