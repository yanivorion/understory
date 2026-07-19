import React from "react";

const MANIFEST = {
  "type": "Dashboard.AnalyticsDashboard",
  "description": "Advanced analytics dashboard with animated counters, progress rings, trend indicators, and interactive metric cards",
  "editorElement": {
    "selector": ".analytics-dashboard-container",
    "displayName": "Analytics Dashboard",
    "archetype": "container",
    "data": {
      "metric1Label": {
        "dataType": "text",
        "displayName": "Metric 1 Label",
        "defaultValue": "Total Revenue",
        "group": "Content"
      },
      "metric1Value": {
        "dataType": "text",
        "displayName": "Metric 1 Value",
        "defaultValue": "284750",
        "group": "Content"
      },
      "metric1Prefix": {
        "dataType": "text",
        "displayName": "Metric 1 Prefix",
        "defaultValue": "$",
        "group": "Content"
      },
      "metric1Change": {
        "dataType": "text",
        "displayName": "Metric 1 Change %",
        "defaultValue": "+12.5",
        "group": "Content"
      },
      "metric2Label": {
        "dataType": "text",
        "displayName": "Metric 2 Label",
        "defaultValue": "Active Users",
        "group": "Content"
      },
      "metric2Value": {
        "dataType": "text",
        "displayName": "Metric 2 Value",
        "defaultValue": "8429",
        "group": "Content"
      },
      "metric2Prefix": {
        "dataType": "text",
        "displayName": "Metric 2 Prefix",
        "defaultValue": "",
        "group": "Content"
      },
      "metric2Change": {
        "dataType": "text",
        "displayName": "Metric 2 Change %",
        "defaultValue": "+8.2",
        "group": "Content"
      },
      "metric3Label": {
        "dataType": "text",
        "displayName": "Metric 3 Label",
        "defaultValue": "Conversion Rate",
        "group": "Content"
      },
      "metric3Value": {
        "dataType": "text",
        "displayName": "Metric 3 Value",
        "defaultValue": "3.24",
        "group": "Content"
      },
      "metric3Prefix": {
        "dataType": "text",
        "displayName": "Metric 3 Prefix",
        "defaultValue": "",
        "group": "Content"
      },
      "metric3Suffix": {
        "dataType": "text",
        "displayName": "Metric 3 Suffix",
        "defaultValue": "%",
        "group": "Content"
      },
      "metric3Change": {
        "dataType": "text",
        "displayName": "Metric 3 Change %",
        "defaultValue": "-2.1",
        "group": "Content"
      },
      "metric4Label": {
        "dataType": "text",
        "displayName": "Metric 4 Label",
        "defaultValue": "Task Completion",
        "group": "Content"
      },
      "metric4Value": {
        "dataType": "text",
        "displayName": "Metric 4 Progress (0-100)",
        "defaultValue": "78",
        "group": "Content"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Count Animation Duration (ms)",
        "defaultValue": "2000",
        "options": ["1000", "1500", "2000", "2500", "3000"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "valueColor": {
        "dataType": "color",
        "displayName": "Value Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "positiveColor": {
        "dataType": "color",
        "displayName": "Positive Change Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "negativeColor": {
        "dataType": "color",
        "displayName": "Negative Change Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "progressBackgroundColor": {
        "dataType": "color",
        "displayName": "Progress Background Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue"],
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "number",
        "displayName": "Label Size (px)",
        "defaultValue": 13,
        "group": "Typography"
      },
      "valueSize": {
        "dataType": "number",
        "displayName": "Value Size (px)",
        "defaultValue": 32,
        "group": "Typography"
      },
      "cardBorderRadius": {
        "dataType": "select",
        "displayName": "Card Border Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [counts, setCounts] = React.useState({ m1: 0, m2: 0, m3: 0 });
  const [progress, setProgress] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef(null);

  const metrics = [
    {
      label: config?.metric1Label || "Total Revenue",
      targetValue: parseFloat((config?.metric1Value || "284750").replace(/,/g, '')),
      prefix: config?.metric1Prefix || "$",
      suffix: "",
      change: config?.metric1Change || "+12.5",
      key: 'm1'
    },
    {
      label: config?.metric2Label || "Active Users",
      targetValue: parseFloat((config?.metric2Value || "8429").replace(/,/g, '')),
      prefix: config?.metric2Prefix || "",
      suffix: "",
      change: config?.metric2Change || "+8.2",
      key: 'm2'
    },
    {
      label: config?.metric3Label || "Conversion Rate",
      targetValue: parseFloat((config?.metric3Value || "3.24").replace(/,/g, '')),
      prefix: config?.metric3Prefix || "",
      suffix: config?.metric3Suffix || "%",
      change: config?.metric3Change || "-2.1",
      key: 'm3'
    }
  ];

  const progressMetric = {
    label: config?.metric4Label || "Task Completion",
    value: parseInt(config?.metric4Value || "78")
  };

  const animationDuration = parseInt(config?.animationDuration || "2000");
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FFFFFF";
  const borderColor = config?.borderColor || "#E9ECEF";
  const labelColor = config?.labelColor || "#6C757D";
  const valueColor = config?.valueColor || "#212529";
  const positiveColor = config?.positiveColor || "#495057";
  const negativeColor = config?.negativeColor || "#6C757D";
  const progressColor = config?.progressColor || "#495057";
  const progressBackgroundColor = config?.progressBackgroundColor || "#E9ECEF";
  const fontFamily = config?.fontFamily || "system-ui";
  const labelSize = config?.labelSize || 13;
  const valueSize = config?.valueSize || 32;
  const cardBorderRadius = config?.cardBorderRadius || "8px";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animateValue = (start, end, duration, key) => {
    if (prefersReducedMotion) {
      setCounts(prev => ({ ...prev, [key]: end }));
      return;
    }

    const startTime = performance.now();
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = start + (end - start) * easedProgress;
      
      setCounts(prev => ({ ...prev, [key]: current }));
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    
    requestAnimationFrame(update);
  };

  const animateProgress = (target, duration) => {
    if (prefersReducedMotion) {
      setProgress(target);
      return;
    }

    const startTime = performance.now();
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressValue = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progressValue);
      const current = target * easedProgress;
      
      setProgress(current);
      
      if (progressValue < 1) {
        requestAnimationFrame(update);
      }
    };
    
    requestAnimationFrame(update);
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            metrics.forEach((metric, index) => {
              setTimeout(() => {
                animateValue(0, metric.targetValue, animationDuration, metric.key);
              }, index * 100);
            });
            setTimeout(() => {
              animateProgress(progressMetric.value, animationDuration);
            }, metrics.length * 100);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const formatNumber = (num, hasDecimals) => {
    if (hasDecimals) {
      return num.toFixed(2);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <div 
      ref={containerRef}
      className="analytics-dashboard-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '600px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {/* Metric Cards */}
        {metrics.map((metric, index) => {
          const currentValue = counts[metric.key];
          const hasDecimals = metric.targetValue % 1 !== 0;
          const isPositive = parseFloat(metric.change) > 0;
          
          return (
            <div
              key={index}
              style={{
                backgroundColor: cardBackgroundColor,
                border: `1px solid ${borderColor}`,
                borderRadius: cardBorderRadius,
                padding: '24px',
                opacity: 0,
                transform: 'translateY(20px)',
                animation: prefersReducedMotion ? 'none' : `cardAppear 500ms ease-out ${index * 100}ms forwards`
              }}
            >
              <div style={{
                fontSize: `${labelSize}px`,
                fontWeight: '500',
                color: labelColor,
                marginBottom: '12px',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}>
                {metric.label}
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <span style={{
                  fontSize: `${valueSize}px`,
                  fontWeight: '300',
                  color: valueColor,
                  lineHeight: '1'
                }}>
                  {metric.prefix}{formatNumber(currentValue, hasDecimals)}{metric.suffix}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d={isPositive ? "M8 4l4 6H4l4-6z" : "M8 12l4-6H4l4 6z"}
                    fill={isPositive ? positiveColor : negativeColor}
                  />
                </svg>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: isPositive ? positiveColor : negativeColor
                }}>
                  {metric.change}%
                </span>
                <span style={{
                  fontSize: '12px',
                  color: labelColor,
                  marginLeft: '4px'
                }}>
                  vs last month
                </span>
              </div>
            </div>
          );
        })}

        {/* Progress Ring Card */}
        <div
          style={{
            backgroundColor: cardBackgroundColor,
            border: `1px solid ${borderColor}`,
            borderRadius: cardBorderRadius,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transform: 'translateY(20px)',
            animation: prefersReducedMotion ? 'none' : `cardAppear 500ms ease-out ${metrics.length * 100}ms forwards`
          }}
        >
          <div style={{
            fontSize: `${labelSize}px`,
            fontWeight: '500',
            color: labelColor,
            marginBottom: '20px',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            alignSelf: 'flex-start'
          }}>
            {progressMetric.label}
          </div>

          <div style={{
            position: 'relative',
            width: '120px',
            height: '120px'
          }}>
            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={progressBackgroundColor}
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={progressColor}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                strokeLinecap="round"
                style={{
                  transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 100ms ease-out'
                }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: `${valueSize}px`,
              fontWeight: '300',
              color: valueColor
            }}>
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
