import React from "react";

const MANIFEST = {
  "type": "Dashboard.MorphingProgressDashboard",
  "description": "Dashboard with progress indicators that morph between circular, linear, and semi-circular shapes with elastic animations, number counters, and particle effects on milestones",
  "editorElement": {
    "selector": ".morphing-progress-dashboard",
    "displayName": "Morphing Progress Dashboard",
    "archetype": "container",
    "data": {
      "metrics": {
        "dataType": "text",
        "displayName": "Metrics (comma-separated)",
        "defaultValue": "Revenue,Users,Engagement,Conversions",
        "group": "Content"
      },
      "values": {
        "dataType": "text",
        "displayName": "Values (comma-separated)",
        "defaultValue": "75,92,68,85",
        "group": "Content"
      },
      "targets": {
        "dataType": "text",
        "displayName": "Targets (comma-separated)",
        "defaultValue": "100,100,100,100",
        "group": "Content"
      },
      "shapeMode": {
        "dataType": "select",
        "displayName": "Shape Mode",
        "defaultValue": "auto-morph",
        "options": ["circular", "linear", "semi-circular", "auto-morph"],
        "group": "Animation"
      },
      "animationSpeed": {
        "dataType": "select",
        "displayName": "Animation Speed",
        "defaultValue": "medium",
        "options": ["slow", "medium", "fast"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "cardColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Fill Color",
        "defaultValue": "#3F3F46",
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
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "valueFontSize": {
        "dataType": "number",
        "displayName": "Value Font Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
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
  const [animatedValues, setAnimatedValues] = React.useState({});
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentShape, setCurrentShape] = React.useState('circular');
  const containerRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);

  const metricsText = config?.metrics || "Revenue,Users,Engagement,Conversions";
  const valuesText = config?.values || "75,92,68,85";
  const targetsText = config?.targets || "100,100,100,100";
  const metrics = metricsText.split(',').map(m => m.trim());
  const values = valuesText.split(',').map(v => parseFloat(v));
  const targets = targetsText.split(',').map(t => parseFloat(t));
  const shapeMode = config?.shapeMode || "auto-morph";
  const animationSpeed = config?.animationSpeed || "medium";
  const backgroundColor = config?.backgroundColor || "#18181B";
  const cardColor = config?.cardColor || "#27272A";
  const progressColor = config?.progressColor || "#3F3F46";
  const textColor = config?.textColor || "#FAFAFA";
  const accentColor = config?.accentColor || "#71717A";
  const titleFontSize = config?.titleFontSize || 18;
  const valueFontSize = config?.valueFontSize || 48;
  const fontWeight = config?.fontWeight || "400";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const duration = { slow: 2000, medium: 1500, fast: 1000 }[animationSpeed];

  // Animate numbers
  const animateValue = (index, targetValue, duration) => {
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Elastic easing
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startValue + (targetValue - startValue) * eased;

      setAnimatedValues(prev => ({ ...prev, [index]: Math.round(current) }));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  // Intersection observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Start animations
            values.forEach((value, index) => {
              setTimeout(() => {
                animateValue(index, value, duration);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  // Auto-morph shapes
  React.useEffect(() => {
    if (shapeMode !== 'auto-morph' || prefersReducedMotion) {
      setCurrentShape(shapeMode);
      return;
    }

    const shapes = ['circular', 'linear', 'semi-circular'];
    let shapeIndex = 0;

    const interval = setInterval(() => {
      shapeIndex = (shapeIndex + 1) % shapes.length;
      setCurrentShape(shapes[shapeIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [shapeMode, prefersReducedMotion]);

  const renderProgress = (value, target, index) => {
    const percentage = (value / target) * 100;
    const shape = shapeMode === 'auto-morph' ? currentShape : shapeMode;

    if (shape === 'circular') {
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (percentage / 100) * circumference;

      return (
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={accentColor}
            strokeWidth="8"
            opacity="0.2"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={progressColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 800ms cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />
        </svg>
      );
    } else if (shape === 'linear') {
      return (
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: accentColor + '30',
          borderRadius: '4px',
          overflow: 'hidden',
          marginTop: '24px'
        }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: progressColor,
            borderRadius: '4px',
            transition: prefersReducedMotion ? 'none' : 'width 800ms cubic-bezier(0.34, 1.56, 0.64, 1)'
          }} />
        </div>
      );
    } else {
      // Semi-circular
      const circumference = Math.PI * 45;
      const offset = circumference - (percentage / 100) * circumference;

      return (
        <svg width="120" height="70" style={{ transform: 'rotate(180deg)' }}>
          <path
            d="M 10,60 A 45,45 0 0,1 110,60"
            fill="none"
            stroke={accentColor}
            strokeWidth="8"
            opacity="0.2"
          />
          <path
            d="M 10,60 A 45,45 0 0,1 110,60"
            fill="none"
            stroke={progressColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 800ms cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />
        </svg>
      );
    }
  };

  return (
    <div 
      ref={containerRef}
      className="morphing-progress-dashboard"
      style={{
        minHeight: '100vh',
        backgroundColor: backgroundColor,
        padding: '80px 40px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {metrics.map((metric, index) => {
          const animatedValue = animatedValues[index] || 0;
          const delay = index * 100;

          return (
            <div
              key={index}
              style={{
                backgroundColor: cardColor,
                borderRadius: '12px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: prefersReducedMotion 
                  ? 'none'
                  : `opacity 600ms ease ${delay}ms, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`
              }}
            >
              {/* Metric Title */}
              <h3 style={{
                fontSize: titleFontSize + 'px',
                fontWeight: fontWeight,
                color: accentColor,
                margin: 0,
                textAlign: 'center'
              }}>
                {metric}
              </h3>

              {/* Progress Indicator */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {renderProgress(animatedValue, targets[index], index)}
                
                {/* Value in center (for circular/semi-circular) */}
                {(currentShape === 'circular' || currentShape === 'semi-circular') && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: (valueFontSize * 0.6) + 'px',
                    fontWeight: '500',
                    color: textColor
                  }}>
                    {animatedValue}
                    <span style={{ fontSize: (valueFontSize * 0.3) + 'px', color: accentColor }}>
                      %
                    </span>
                  </div>
                )}
              </div>

              {/* Value (for linear) */}
              {currentShape === 'linear' && (
                <div style={{
                  fontSize: valueFontSize + 'px',
                  fontWeight: '500',
                  color: textColor,
                  lineHeight: 1
                }}>
                  {animatedValue}
                  <span style={{ fontSize: valueFontSize * 0.5 + 'px', color: accentColor }}>
                    %
                  </span>
                </div>
              )}

              {/* Target */}
              <div style={{
                fontSize: (titleFontSize - 4) + 'px',
                fontWeight: fontWeight,
                color: accentColor
              }}>
                Target: {targets[index]}%
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
