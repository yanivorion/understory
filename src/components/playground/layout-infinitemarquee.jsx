import React from "react";

const MANIFEST = {
  "type": "Layout.InfiniteMarquee",
  "description": "Infinite horizontal scrolling marquee with seamless loop",
  "editorElement": {
    "selector": ".infinite-marquee",
    "displayName": "Infinite Marquee",
    "archetype": "container",
    "data": {
      "items": {
        "dataType": "text",
        "displayName": "Items (comma-separated)",
        "defaultValue": "React, Vue, Angular, Svelte, Next.js, Nuxt.js, Gatsby, Remix",
        "group": "Content"
      },
      "speed": {
        "dataType": "select",
        "displayName": "Scroll Speed",
        "defaultValue": "normal",
        "options": ["slow", "normal", "fast", "very-fast"],
        "group": "Animation",
        "description": "slow=60s, normal=40s, fast=25s, very-fast=15s"
      },
      "direction": {
        "dataType": "select",
        "displayName": "Direction",
        "defaultValue": "left",
        "options": ["left", "right"],
        "group": "Animation"
      },
      "pauseOnHover": {
        "dataType": "booleanValue",
        "displayName": "Pause On Hover",
        "defaultValue": true,
        "group": "Animation"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Gap Between Items",
        "defaultValue": "48",
        "options": ["24", "32", "40", "48", "64", "80"],
        "group": "Layout"
      },
      "itemPadding": {
        "dataType": "select",
        "displayName": "Item Padding",
        "defaultValue": "16",
        "options": ["12", "16", "20", "24"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "itemBackgroundColor": {
        "dataType": "color",
        "displayName": "Item Background",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "8",
        "options": ["0", "4", "6", "8", "12", "100"],
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "horizontal",
      "contentResizeDirection": "horizontal"
    }
  }
};

function Component({ config = {} }) {
  const [isPaused, setIsPaused] = React.useState(false);

  // Config values
  const itemsString = config?.items || "React, Vue, Angular, Svelte, Next.js, Nuxt.js, Gatsby, Remix";
  const items = itemsString.split(',').map(item => item.trim()).filter(Boolean);
  const speed = config?.speed || "normal";
  const direction = config?.direction || "left";
  const pauseOnHover = config?.pauseOnHover !== false;
  const gap = parseInt(config?.gap || "48");
  const itemPadding = parseInt(config?.itemPadding || "16");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#18181B";
  const itemBackgroundColor = config?.itemBackgroundColor || "#F4F4F5";
  const borderColor = config?.borderColor || "#E4E4E7";
  const fontSize = config?.fontSize || 16;
  const fontWeight = config?.fontWeight || "500";
  const borderRadius = parseInt(config?.borderRadius || "8");

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Speed mapping
  const speedMap = {
    'slow': '60s',
    'normal': '40s',
    'fast': '25s',
    'very-fast': '15s'
  };
  const animationDuration = speedMap[speed] || '40s';
  
  // Double the items for seamless loop
  const doubledItems = [...items, ...items];

  const containerStyle = {
    width: '100%',
    backgroundColor: backgroundColor,
    overflow: 'hidden',
    padding: '24px 0',
    position: 'relative'
  };

  const trackStyle = {
    display: 'flex',
    gap: `${gap}px`,
    width: 'fit-content',
    animation: prefersReducedMotion 
      ? 'none' 
      : `marquee-${direction} ${animationDuration} linear infinite`,
    animationPlayState: (pauseOnHover && isPaused) ? 'paused' : 'running'
  };

  const itemStyle = {
    flex: '0 0 auto',
    padding: `${itemPadding}px ${itemPadding * 1.5}px`,
    backgroundColor: itemBackgroundColor,
    color: textColor,
    borderRadius: `${borderRadius}px`,
    border: `1px solid ${borderColor}`,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    whiteSpace: 'nowrap',
    userSelect: 'none'
  };

  const animationKeyframes = `
    @keyframes marquee-left {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-50% - ${gap / 2}px));
      }
    }
    
    @keyframes marquee-right {
      0% {
        transform: translateX(calc(-50% - ${gap / 2}px));
      }
      100% {
        transform: translateX(0);
      }
    }
  `;

  return (
    <div 
      className="infinite-marquee"
      style={containerStyle}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      role="marquee"
      aria-label="Scrolling content"
    >
      <style>{animationKeyframes}</style>
      
      <div style={trackStyle}>
        {doubledItems.map((item, index) => (
          <div key={index} style={itemStyle}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
