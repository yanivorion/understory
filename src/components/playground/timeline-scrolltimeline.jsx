import React from "react";

const MANIFEST = {
  "type": "Timeline.ScrollTimeline",
  "description": "Vertical timeline with alternating card animations on scroll, progressive line fill, and pulsing milestone dots",
  "editorElement": {
    "selector": ".scroll-timeline",
    "displayName": "Scroll-Triggered Timeline",
    "archetype": "container",
    "data": {
      "events": {
        "dataType": "text",
        "displayName": "Timeline Events (comma-separated)",
        "defaultValue": "2024 - Project Launch,2023 - Series A Funding,2022 - First Product,2021 - Company Founded",
        "group": "Content"
      },
      "descriptions": {
        "dataType": "text",
        "displayName": "Event Descriptions (pipe-separated)",
        "defaultValue": "Successfully launched our flagship product|Raised $10M in Series A|Shipped MVP to first customers|Started with a vision and a team of 3",
        "group": "Content"
      },
      "lineColor": {
        "dataType": "color",
        "displayName": "Timeline Line Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "cardColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#71717A",
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      }
    }
  }
};

function Component({ config = {} }) {
  const [visibleCards, setVisibleCards] = React.useState(new Set());
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const containerRef = React.useRef(null);
  const cardRefs = React.useRef([]);

  const eventsText = config?.events || "2024 - Project Launch,2023 - Series A Funding,2022 - First Product,2021 - Company Founded";
  const descriptionsText = config?.descriptions || "Successfully launched our flagship product|Raised $10M in Series A|Shipped MVP to first customers|Started with a vision and a team of 3";
  const events = eventsText.split(',').map(e => e.trim());
  const descriptions = descriptionsText.split('|').map(d => d.trim());
  const lineColor = config?.lineColor || "#3F3F46";
  const cardColor = config?.cardColor || "#27272A";
  const textColor = config?.textColor || "#FAFAFA";
  const accentColor = config?.accentColor || "#71717A";
  const backgroundColor = config?.backgroundColor || "#18181B";

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target);
          if (index !== -1) {
            setVisibleCards(prev => new Set([...prev, index]));
          }
        }
      });
    }, { threshold: 0.3 });

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '200vh', backgroundColor, padding: '80px 40px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', backgroundColor: lineColor, transform: 'translateX(-50%)' }}>
          <div style={{ width: '100%', height: `${scrollProgress * 100}%`, backgroundColor: accentColor, transition: 'height 100ms linear' }} />
        </div>

        {events.map((event, i) => {
          const isVisible = visibleCards.has(i);
          const isLeft = i % 2 === 0;

          return (
            <div key={i} ref={el => cardRefs.current[i] = el} style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', marginBottom: '80px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '50%', top: '24px', width: '16px', height: '16px', backgroundColor: isVisible ? accentColor : lineColor, borderRadius: '50%', transform: 'translateX(-50%)', boxShadow: isVisible ? `0 0 20px ${accentColor}` : 'none', transition: 'all 400ms ease', animation: isVisible ? 'pulse 2s ease-in-out infinite' : 'none' }} />
              <div style={{ width: 'calc(50% - 40px)', backgroundColor: cardColor, borderRadius: '12px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0) rotate(0)' : `translateX(${isLeft ? '-40px' : '40px'}) rotate(${isLeft ? '-5deg' : '5deg'})`, transition: 'all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)', transitionDelay: `${i * 100}ms` }}>
                <h3 style={{ fontSize: '20px', fontWeight: '500', color: textColor, margin: '0 0 12px 0' }}>{event}</h3>
                <p style={{ fontSize: '14px', color: accentColor, margin: 0, lineHeight: 1.6 }}>{descriptions[i] || ''}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`@keyframes pulse { 0%, 100% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.3); } }`}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
