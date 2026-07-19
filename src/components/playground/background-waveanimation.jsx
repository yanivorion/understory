import React from "react";

const MANIFEST = {
  "type": "Background.WaveAnimation",
  "description": "Animated SVG wave background with multiple layers",
  "editorElement": {
    "selector": ".wave-background",
    "displayName": "Wave Background",
    "archetype": "container",
    "data": {
      "waveCount": {
        "dataType": "select",
        "displayName": "Number of Waves",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Content"
      },
      "waveHeight": {
        "dataType": "select",
        "displayName": "Wave Height (px)",
        "defaultValue": "120",
        "options": ["80", "100", "120", "150", "180"],
        "group": "Layout"
      },
      "animationSpeed": {
        "dataType": "select",
        "displayName": "Animation Speed",
        "defaultValue": "medium",
        "options": ["slow", "medium", "fast"],
        "group": "Animation",
        "description": "slow=20s, medium=12s, fast=8s"
      },
      "direction": {
        "dataType": "select",
        "displayName": "Direction",
        "defaultValue": "right",
        "options": ["left", "right"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#0F172A",
        "group": "Colors"
      },
      "wave1Color": {
        "dataType": "color",
        "displayName": "Wave 1 Color (Front)",
        "defaultValue": "#1E293B",
        "group": "Colors"
      },
      "wave2Color": {
        "dataType": "color",
        "displayName": "Wave 2 Color",
        "defaultValue": "#334155",
        "group": "Colors"
      },
      "wave3Color": {
        "dataType": "color",
        "displayName": "Wave 3 Color",
        "defaultValue": "#475569",
        "group": "Colors"
      },
      "wave4Color": {
        "dataType": "color",
        "displayName": "Wave 4 Color (Back)",
        "defaultValue": "#64748B",
        "group": "Colors"
      },
      "containerHeight": {
        "dataType": "select",
        "displayName": "Container Height (px)",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
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
  // Config values
  const waveCount = parseInt(config?.waveCount || "3");
  const waveHeight = parseInt(config?.waveHeight || "120");
  const animationSpeed = config?.animationSpeed || "medium";
  const direction = config?.direction || "right";
  const backgroundColor = config?.backgroundColor || "#0F172A";
  const wave1Color = config?.wave1Color || "#1E293B";
  const wave2Color = config?.wave2Color || "#334155";
  const wave3Color = config?.wave3Color || "#475569";
  const wave4Color = config?.wave4Color || "#64748B";
  const containerHeight = parseInt(config?.containerHeight || "400");

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Speed mapping
  const speedMap = {
    'slow': 20,
    'medium': 12,
    'fast': 8
  };
  const baseDuration = speedMap[animationSpeed] || 12;

  const waveColors = [wave1Color, wave2Color, wave3Color, wave4Color];
  const waveOpacities = [0.7, 0.5, 0.3, 0.2];

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: `${containerHeight}px`,
    backgroundColor: backgroundColor,
    overflow: 'hidden'
  };

  const waveContainerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: `${waveHeight}px`
  };

  const getWavePath = (offset) => {
    // Create sine wave path
    return `M0 ${waveHeight * 0.5} 
            Q${offset * 0.25} ${waveHeight * 0.3}, ${offset * 0.5} ${waveHeight * 0.5}
            T${offset} ${waveHeight * 0.5}
            T${offset * 1.5} ${waveHeight * 0.5}
            T${offset * 2} ${waveHeight * 0.5}
            V${waveHeight} H0 Z`;
  };

  const animationKeyframes = (index) => {
    const multiplier = direction === 'right' ? 1 : -1;
    return `
      @keyframes wave-${index} {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(${multiplier * 100}%);
        }
      }
    `;
  };

  const waveStyle = (index) => {
    const duration = baseDuration + index * 2;
    return {
      position: 'absolute',
      bottom: 0,
      left: direction === 'right' ? '-100%' : 0,
      width: '200%',
      height: '100%',
      animation: prefersReducedMotion ? 'none' : `wave-${index} ${duration}s linear infinite`,
      opacity: waveOpacities[index] || 0.5
    };
  };

  return (
    <div className="wave-background" style={containerStyle}>
      <style>
        {Array.from({ length: waveCount }).map((_, index) => animationKeyframes(index)).join('')}
      </style>
      
      <div style={waveContainerStyle}>
        {Array.from({ length: waveCount }).map((_, index) => {
          const viewBoxWidth = 1440;
          const waveOffset = viewBoxWidth / 2;
          
          return (
            <div key={index} style={waveStyle(index)}>
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${viewBoxWidth} ${waveHeight}`}
                preserveAspectRatio="none"
                style={{ display: 'block' }}
              >
                <path
                  d={getWavePath(waveOffset)}
                  fill={waveColors[index]}
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
