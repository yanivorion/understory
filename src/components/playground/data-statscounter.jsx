import React from "react";

const MANIFEST = {
  "type": "Data.StatsCounter",
  "description": "Animated statistics counter with scroll trigger and easing",
  "editorElement": {
    "selector": ".stats-counter",
    "displayName": "Stats Counter",
    "archetype": "container",
    "data": {
      "stats": {
        "dataType": "text",
        "displayName": "Stats (format: value|label|suffix, pipe-separated)",
        "defaultValue": "15000|Happy Clients|+|2.5M|Lines of Code||450|Projects Completed|+|98|Client Satisfaction|%",
        "group": "Content"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "2000",
        "options": ["1000", "1500", "2000", "2500", "3000"],
        "group": "Animation"
      },
      "easingStyle": {
        "dataType": "select",
        "displayName": "Easing Style",
        "defaultValue": "easeOutExpo",
        "options": ["linear", "easeOutQuad", "easeOutExpo", "easeOutElastic"],
        "group": "Animation"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Columns (Desktop)",
        "defaultValue": "4",
        "options": ["2", "3", "4", "5"],
        "group": "Layout"
      },
      "numberSize": {
        "dataType": "number",
        "displayName": "Number Font Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "number",
        "displayName": "Label Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Number Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "numberColor": {
        "dataType": "color",
        "displayName": "Number Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const statsStr = config?.stats || "15000|Happy Clients|+|2.5M|Lines of Code||450|Projects Completed|+|98|Client Satisfaction|%";
  const animationDuration = parseInt(config?.animationDuration || "2000");
  const easingStyle = config?.easingStyle || "easeOutExpo";
  const columns = parseInt(config?.columns || "4");
  const numberSize = parseInt(config?.numberSize || "48");
  const labelSize = parseInt(config?.labelSize || "16");
  const fontWeight = config?.fontWeight || "500";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const numberColor = config?.numberColor || "#212529";
  const labelColor = config?.labelColor || "#6C757D";
  const borderColor = config?.borderColor || "#E9ECEF";

  const [hasAnimated, setHasAnimated] = React.useState(false);
  const containerRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Parse stats
  const stats = statsStr.split('|').reduce((acc, item, index) => {
    const statIndex = Math.floor(index / 3);
    if (!acc[statIndex]) acc[statIndex] = {};
    if (index % 3 === 0) acc[statIndex].value = item;
    else if (index % 3 === 1) acc[statIndex].label = item;
    else acc[statIndex].suffix = item;
    return acc;
  }, []);

  // Easing functions
  const easingFunctions = {
    linear: (t) => t,
    easeOutQuad: (t) => t * (2 - t),
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeOutElastic: (t) => {
      const c4 = (2 * Math.PI) / 3;
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }
  };

  // Animated Number Hook
  const useAnimatedNumber = (end, duration, easing) => {
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      if (!hasAnimated || prefersReducedMotion) {
        if (prefersReducedMotion) setCurrent(end);
        return;
      }

      const isDecimal = end.toString().includes('.');
      const startValue = 0;
      const endValue = parseFloat(end) || 0;
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFunctions[easing](progress);
        const value = startValue + (endValue - startValue) * easedProgress;

        setCurrent(isDecimal ? value.toFixed(1) : Math.floor(value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, [hasAnimated, end, duration, easing, prefersReducedMotion]);

    return current;
  };

  // Intersection Observer
  React.useEffect(() => {
    if (!containerRef.current || hasAnimated || prefersReducedMotion) {
      if (prefersReducedMotion) setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, prefersReducedMotion]);

  return (
    <div className="stats-counter" style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div ref={containerRef} style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        gap: '2rem'
      }}>
        {stats.map((stat, index) => {
          const animatedValue = useAnimatedNumber(stat.value, animationDuration, easingStyle);
          
          return (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '2rem 1.5rem',
                borderRight: index < stats.length - 1 ? `1px solid ${borderColor}` : 'none',
                opacity: prefersReducedMotion || hasAnimated ? 1 : 0,
                transform: prefersReducedMotion || hasAnimated ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 500ms ease-out',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div style={{
                fontSize: `clamp(${numberSize * 0.7}px, ${numberSize / 16}rem + 1vw, ${numberSize * 1.2}px)`,
                fontWeight,
                color: numberColor,
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}>
                {animatedValue}{stat.suffix}
              </div>
              <div style={{
                fontSize: `${labelSize}px`,
                fontWeight: '400',
                color: labelColor,
                letterSpacing: '0.025em'
              }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Component;