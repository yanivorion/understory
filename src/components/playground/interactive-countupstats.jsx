import React from "react";

const MANIFEST = {
  "type": "Interactive.CountUpStats",
  "description": "Animated counter statistics that count up when scrolled into view",
  "editorElement": {
    "selector": ".countup-stats",
    "displayName": "Count-Up Statistics",
    "archetype": "container",
    "data": {
      "stats": {
        "dataType": "text",
        "displayName": "Stats (format: number|label|suffix, comma-separated)",
        "defaultValue": "1000|Projects|+, 50|Countries, 98|Satisfaction|%, 24|Support|/7",
        "group": "Content",
        "description": "Format: value|label|suffix (e.g., 1000|Projects|+)"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "2000",
        "options": ["1000", "1500", "2000", "2500", "3000"],
        "group": "Animation"
      },
      "layout": {
        "dataType": "select",
        "displayName": "Layout",
        "defaultValue": "grid",
        "options": ["grid", "horizontal", "vertical"],
        "group": "Layout"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "4",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Gap",
        "defaultValue": "40",
        "options": ["24", "32", "40", "48", "64"],
        "group": "Layout"
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
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#71717A",
        "group": "Colors"
      },
      "numberSize": {
        "dataType": "number",
        "displayName": "Number Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "number",
        "displayName": "Label Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Number Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
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
  const containerRef = React.useRef(null);
  const [counters, setCounters] = React.useState([]);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const animationFrameRefs = React.useRef([]);

  // Config values
  const statsString = config?.stats || "1000|Projects|+, 50|Countries, 98|Satisfaction|%, 24|Support|/7";
  const animationDuration = parseInt(config?.animationDuration || "2000");
  const layout = config?.layout || "grid";
  const columns = parseInt(config?.columns || "4");
  const gap = parseInt(config?.gap || "40");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const numberColor = config?.numberColor || "#18181B";
  const labelColor = config?.labelColor || "#71717A";
  const numberSize = config?.numberSize || 48;
  const labelSize = config?.labelSize || 14;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Parse stats
  const stats = React.useMemo(() => {
    return statsString.split(',').map(stat => {
      const parts = stat.trim().split('|');
      return {
        target: parseInt(parts[0]) || 0,
        label: parts[1]?.trim() || '',
        suffix: parts[2]?.trim() || ''
      };
    }).filter(s => s.target > 0);
  }, [statsString]);

  // Initialize counters
  React.useEffect(() => {
    setCounters(stats.map(() => 0));
  }, [stats]);

  // Easing function
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animateCounter = React.useCallback((index, target) => {
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(startValue + (target - startValue) * easedProgress);

      setCounters(prev => {
        const newCounters = [...prev];
        newCounters[index] = currentValue;
        return newCounters;
      });

      if (progress < 1) {
        animationFrameRefs.current[index] = requestAnimationFrame(animate);
      }
    };

    animate();
  }, [animationDuration]);

  // Intersection Observer
  React.useEffect(() => {
    if (hasAnimated || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setCounters(stats.map(s => s.target));
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            stats.forEach((stat, index) => {
              animateCounter(index, stat.target);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      animationFrameRefs.current.forEach(ref => {
        if (ref) cancelAnimationFrame(ref);
      });
    };
  }, [hasAnimated, stats, animateCounter, prefersReducedMotion]);

  const containerStyle = {
    width: '100%',
    backgroundColor: backgroundColor,
    padding: '48px 24px'
  };

  const gridStyle = {
    display: layout === 'grid' ? 'grid' : 'flex',
    gridTemplateColumns: layout === 'grid' ? `repeat(${columns}, 1fr)` : 'none',
    flexDirection: layout === 'vertical' ? 'column' : 'row',
    gap: `${gap}px`,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const statStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const numberStyle = {
    fontSize: `${numberSize}px`,
    fontWeight: fontWeight,
    color: numberColor,
    lineHeight: 1,
    marginBottom: '8px',
    fontVariantNumeric: 'tabular-nums'
  };

  const labelStyle = {
    fontSize: `${labelSize}px`,
    fontWeight: '400',
    color: labelColor,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  };

  return (
    <div 
      ref={containerRef}
      className="countup-stats"
      style={containerStyle}
    >
      <div style={gridStyle}>
        {stats.map((stat, index) => (
          <div key={index} style={statStyle}>
            <div style={numberStyle}>
              {counters[index]?.toLocaleString()}{stat.suffix}
            </div>
            <div style={labelStyle}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
