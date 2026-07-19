import React from "react";

const MANIFEST = {
  "type": "Interactive.ProgressRing",
  "description": "Circular progress indicator with animated percentage counter",
  "editorElement": {
    "selector": ".progress-ring",
    "displayName": "Progress Ring",
    "archetype": "container",
    "data": {
      "progress": {
        "dataType": "select",
        "displayName": "Progress (%)",
        "defaultValue": "75",
        "options": ["0", "25", "50", "75", "85", "100"],
        "group": "Content"
      },
      "label": {
        "dataType": "text",
        "displayName": "Label",
        "defaultValue": "Complete",
        "group": "Content"
      },
      "showPercentage": {
        "dataType": "booleanValue",
        "displayName": "Show Percentage",
        "defaultValue": true,
        "group": "Content"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "1500",
        "options": ["1000", "1500", "2000", "2500"],
        "group": "Animation"
      },
      "animateOnView": {
        "dataType": "booleanValue",
        "displayName": "Animate On Scroll Into View",
        "defaultValue": true,
        "group": "Animation"
      },
      "size": {
        "dataType": "select",
        "displayName": "Ring Size (px)",
        "defaultValue": "180",
        "options": ["120", "150", "180", "200", "240"],
        "group": "Layout"
      },
      "strokeWidth": {
        "dataType": "select",
        "displayName": "Stroke Width",
        "defaultValue": "12",
        "options": ["8", "10", "12", "14", "16"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "trackColor": {
        "dataType": "color",
        "displayName": "Track Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#71717A",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 32,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
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
  const [animatedProgress, setAnimatedProgress] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const containerRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);

  // Config values
  const progress = parseInt(config?.progress || "75");
  const label = config?.label || "Complete";
  const showPercentage = config?.showPercentage !== false;
  const animationDuration = parseInt(config?.animationDuration || "1500");
  const animateOnView = config?.animateOnView !== false;
  const size = parseInt(config?.size || "180");
  const strokeWidth = parseInt(config?.strokeWidth || "12");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const trackColor = config?.trackColor || "#E4E4E7";
  const progressColor = config?.progressColor || "#18181B";
  const textColor = config?.textColor || "#18181B";
  const labelColor = config?.labelColor || "#71717A";
  const fontSize = config?.fontSize || 32;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Easing function (ease-out cubic)
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateProgress = React.useCallback(() => {
    const startTime = Date.now();
    const startValue = 0;
    const endValue = progress;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeOutCubic(progressRatio);
      const currentValue = startValue + (endValue - startValue) * easedProgress;

      setAnimatedProgress(Math.round(currentValue));

      if (progressRatio < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  }, [progress, animationDuration]);

  // Intersection Observer for scroll animation
  React.useEffect(() => {
    if (!animateOnView || hasAnimated || prefersReducedMotion) {
      if (!animateOnView || prefersReducedMotion) {
        setAnimatedProgress(progress);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateProgress();
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateOnView, hasAnimated, animateProgress, prefersReducedMotion, progress]);

  // Immediate animation if not scroll-triggered
  React.useEffect(() => {
    if (!animateOnView && !prefersReducedMotion) {
      animateProgress();
    } else if (prefersReducedMotion) {
      setAnimatedProgress(progress);
    }
  }, [animateOnView, animateProgress, prefersReducedMotion, progress]);

  // SVG calculations
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (animatedProgress / 100) * circumference;

  const containerStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: backgroundColor,
    padding: '24px'
  };

  const svgStyle = {
    transform: 'rotate(-90deg)',
    overflow: 'visible'
  };

  const trackStyle = {
    fill: 'none',
    stroke: trackColor,
    strokeWidth: strokeWidth
  };

  const progressStyle = {
    fill: 'none',
    stroke: progressColor,
    strokeWidth: strokeWidth,
    strokeDasharray: circumference,
    strokeDashoffset: prefersReducedMotion ? circumference - (progress / 100) * circumference : progressOffset,
    strokeLinecap: 'round',
    transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.3s ease',
    willChange: 'stroke-dashoffset'
  };

  const textContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const percentageStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    color: textColor,
    lineHeight: 1
  };

  const labelStyle = {
    fontSize: `${fontSize * 0.4}px`,
    fontWeight: '400',
    color: labelColor,
    marginTop: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  };

  return (
    <div 
      ref={containerRef}
      className="progress-ring"
      style={containerStyle}
      role="progressbar"
      aria-valuenow={animatedProgress}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={`${label}: ${animatedProgress}% complete`}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={svgStyle}>
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            style={trackStyle}
          />
          {/* Progress */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            style={progressStyle}
          />
        </svg>
        
        {/* Text */}
        <div style={textContainerStyle}>
          {showPercentage && (
            <span style={percentageStyle}>{animatedProgress}%</span>
          )}
          {label && <span style={labelStyle}>{label}</span>}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
