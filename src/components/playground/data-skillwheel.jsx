import React from "react";

const MANIFEST = {
  "type": "Data.SkillWheel",
  "description": "Circular skill wheel with gradient fills, staggered animations, and animated percentage counter",
  "editorElement": {
    "selector": ".skill-wheel",
    "displayName": "Skill Wheel",
    "archetype": "container",
    "data": {
      "radius": {
        "dataType": "select",
        "displayName": "Wheel Radius",
        "defaultValue": "180",
        "options": ["140", "160", "180", "200", "220"],
        "group": "Layout"
      },
      "segmentGap": {
        "dataType": "select",
        "displayName": "Segment Gap",
        "defaultValue": "4",
        "options": ["2", "3", "4", "5", "6"],
        "group": "Layout"
      },
      "strokeWidth": {
        "dataType": "select",
        "displayName": "Stroke Width",
        "defaultValue": "28",
        "options": ["20", "24", "28", "32", "36"],
        "group": "Layout"
      },
      "triggerMode": {
        "dataType": "select",
        "displayName": "Trigger Mode",
        "defaultValue": "scroll",
        "options": ["scroll", "immediate"],
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "1200",
        "options": ["800", "1000", "1200", "1500", "2000"],
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay (ms)",
        "defaultValue": "100",
        "options": ["50", "80", "100", "120", "150"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "trackColor": {
        "dataType": "color",
        "displayName": "Track Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "fillColorStart": {
        "dataType": "color",
        "displayName": "Fill Gradient Start",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "fillColorEnd": {
        "dataType": "color",
        "displayName": "Fill Gradient End",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "centerTextColor": {
        "dataType": "color",
        "displayName": "Center Text Color",
        "defaultValue": "#3F3F46",
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
  const [animatedSkills, setAnimatedSkills] = React.useState(new Set());
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const [hoveredSkill, setHoveredSkill] = React.useState(null);
  const [centerValue, setCenterValue] = React.useState(0);
  const containerRef = React.useRef(null);
  
  const radius = parseInt(config?.radius || "180");
  const segmentGap = parseInt(config?.segmentGap || "4");
  const strokeWidth = parseInt(config?.strokeWidth || "28");
  const triggerMode = config?.triggerMode || "scroll";
  const animationDuration = parseInt(config?.animationDuration || "1200");
  const staggerDelay = parseInt(config?.staggerDelay || "100");
  
  const backgroundColor = config?.backgroundColor || "#FAFAFA";
  const trackColor = config?.trackColor || "#E4E4E7";
  const fillColorStart = config?.fillColorStart || "#3F3F46";
  const fillColorEnd = config?.fillColorEnd || "#18181B";
  const textColor = config?.textColor || "#18181B";
  const centerTextColor = config?.centerTextColor || "#3F3F46";
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const skills = [
    { name: "React", value: 92 },
    { name: "TypeScript", value: 88 },
    { name: "Node.js", value: 85 },
    { name: "Python", value: 78 },
    { name: "UI/UX", value: 90 },
    { name: "AWS", value: 82 },
    { name: "GraphQL", value: 75 },
    { name: "Docker", value: 80 },
    { name: "SQL", value: 86 },
    { name: "Git", value: 94 },
    { name: "CI/CD", value: 79 },
    { name: "Testing", value: 83 }
  ];

  // Animate counter
  React.useEffect(() => {
    if (hoveredSkill === null) {
      setCenterValue(0);
      return;
    }
    
    const targetValue = skills[hoveredSkill].value;
    const duration = 600;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      setCenterValue(Math.round(eased * targetValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    if (!prefersReducedMotion) {
      requestAnimationFrame(animate);
    } else {
      setCenterValue(targetValue);
    }
  }, [hoveredSkill, prefersReducedMotion]);

  React.useEffect(() => {
    if (triggerMode === 'immediate' && !hasTriggered) {
      setHasTriggered(true);
      skills.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => new Set([...prev, index]));
        }, index * staggerDelay);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true);
            skills.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedSkills(prev => new Set([...prev, index]));
              }, index * staggerDelay);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerMode, hasTriggered, staggerDelay]);

  const containerStyle = {
    width: '100%',
    minHeight: '800px',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '60px 20px'
  };

  const wheelContainerStyle = {
    position: 'relative',
    width: `${radius * 2 + strokeWidth}px`,
    height: `${radius * 2 + strokeWidth}px`
  };

  const svgStyle = {
    transform: 'rotate(-90deg)',
    overflow: 'visible'
  };

  const centerContentStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    pointerEvents: 'none'
  };

  const centerValueStyle = {
    fontSize: '56px',
    fontWeight: '300',
    color: centerTextColor,
    margin: '0 0 4px 0',
    lineHeight: 1,
    letterSpacing: '-0.02em'
  };

  const centerLabelStyle = {
    fontSize: '14px',
    color: centerTextColor,
    opacity: 0.6,
    margin: 0,
    fontWeight: '400'
  };

  const centerNameStyle = {
    fontSize: '18px',
    color: centerTextColor,
    margin: '12px 0 0 0',
    fontWeight: '500',
    opacity: hoveredSkill !== null ? 1 : 0,
    transition: prefersReducedMotion ? 'none' : 'opacity 200ms ease-out'
  };

  const labelsContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none'
  };

  const getSegmentPath = (index) => {
    const anglePerSegment = 360 / skills.length;
    const gapAngle = segmentGap / radius * (180 / Math.PI);
    const startAngle = index * anglePerSegment + gapAngle / 2;
    const endAngle = (index + 1) * anglePerSegment - gapAngle / 2;
    
    const circumference = 2 * Math.PI * radius;
    const segmentLength = (endAngle - startAngle) / 360 * circumference;
    const gapLength = gapAngle / 360 * circumference;
    
    return {
      startAngle,
      endAngle,
      circumference,
      segmentLength,
      gapLength
    };
  };

  const getLabelPosition = (index) => {
    const anglePerSegment = 360 / skills.length;
    const angle = index * anglePerSegment + anglePerSegment / 2;
    const radians = (angle - 90) * (Math.PI / 180);
    const labelRadius = radius + strokeWidth / 2 + 30;
    
    const x = Math.cos(radians) * labelRadius;
    const y = Math.sin(radians) * labelRadius;
    
    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: 'translate(-50%, -50%)'
    };
  };

  const getLabelStyle = (index) => {
    const isHovered = hoveredSkill === index;
    
    return {
      position: 'absolute',
      ...getLabelPosition(index),
      fontSize: '13px',
      fontWeight: isHovered ? '500' : '400',
      color: textColor,
      opacity: animatedSkills.has(index) ? 1 : 0,
      transition: prefersReducedMotion 
        ? 'none'
        : 'opacity 400ms ease-out, font-weight 200ms ease-out, transform 200ms ease-out',
      whiteSpace: 'nowrap',
      transform: isHovered 
        ? 'translate(-50%, -50%) scale(1.1)' 
        : 'translate(-50%, -50%) scale(1)'
    };
  };

  return (
    <div ref={containerRef} style={containerStyle} className="skill-wheel">
      <div style={wheelContainerStyle}>
        <svg 
          width={radius * 2 + strokeWidth} 
          height={radius * 2 + strokeWidth}
          style={svgStyle}
        >
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fillColorStart} />
              <stop offset="100%" stopColor={fillColorEnd} />
            </linearGradient>
          </defs>
          
          {skills.map((skill, index) => {
            const { startAngle, endAngle, circumference, segmentLength } = getSegmentPath(index);
            const isAnimated = animatedSkills.has(index);
            const isHovered = hoveredSkill === index;
            const progress = isAnimated ? skill.value / 100 : 0;
            
            const centerX = radius + strokeWidth / 2;
            const centerY = radius + strokeWidth / 2;
            
            return (
              <g key={index}>
                {/* Track */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke={trackColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${segmentLength} ${circumference}`}
                  strokeDashoffset={-startAngle / 360 * circumference}
                  strokeLinecap="round"
                  opacity={0.3}
                />
                
                {/* Fill */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke="url(#skillGradient)"
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={`${segmentLength * progress} ${circumference}`}
                  strokeDashoffset={-startAngle / 360 * circumference}
                  strokeLinecap="round"
                  style={{
                    transition: prefersReducedMotion 
                      ? 'none'
                      : `stroke-dasharray ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1), stroke-width 200ms ease-out`,
                    cursor: 'pointer',
                    filter: isHovered ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none'
                  }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                />
              </g>
            );
          })}
        </svg>

        <div style={labelsContainerStyle}>
          {skills.map((skill, index) => (
            <div 
              key={index}
              style={getLabelStyle(index)}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {skill.name}
            </div>
          ))}
        </div>

        <div style={centerContentStyle}>
          <div style={centerValueStyle}>
            {hoveredSkill !== null ? `${centerValue}%` : '—'}
          </div>
          <div style={centerLabelStyle}>
            {hoveredSkill !== null ? 'Proficiency' : 'Hover to view'}
          </div>
          <div style={centerNameStyle}>
            {hoveredSkill !== null ? skills[hoveredSkill].name : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
