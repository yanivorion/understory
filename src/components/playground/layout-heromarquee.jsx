import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9 - Advanced Hero Collection
 * Generated: Oct 26, 2025, 04:11 AM
 * Component Type: Layout.HeroMarquee
 * 
* User Request: N/A
*
* Design Brief:
* N/A
 * ============================================================================
 */

/*
 * ============================================================================
 * Hero 3: Infinite Scrolling Marquee
 * Dynamic energy through continuous horizontal motion
 * ============================================================================
 */

const MANIFEST = {
  "type": "Layout.HeroMarquee",
  "description": "Dynamic hero with infinite scrolling text marquees. Features multiple rows at different speeds, pause on hover, and smooth seamless loops. Perfect for events, agencies, and bold brands.",
  "editorElement": {
    "selector": ".hero-marquee",
    "displayName": "Marquee Hero",
    "archetype": "container",
    "data": {
      "row1Text": {
        "dataType": "text",
        "displayName": "Row 1 Text",
        "defaultValue": "DESIGN · DEVELOP · CREATE · INNOVATE ·",
        "group": "Content"
      },
      "row2Text": {
        "dataType": "text",
        "displayName": "Row 2 Text",
        "defaultValue": "BRAND · DIGITAL · VISUAL · EXPERIENCE ·",
        "group": "Content"
      },
      "row3Text": {
        "dataType": "text",
        "displayName": "Row 3 Text",
        "defaultValue": "STRATEGY · CREATIVE · PRODUCTION · LAUNCH ·",
        "group": "Content"
      },
      "centerText": {
        "dataType": "text",
        "displayName": "Center Headline",
        "defaultValue": "We Create Digital Excellence",
        "group": "Content"
      },
      "showCenterText": {
        "dataType": "booleanValue",
        "displayName": "Show Center Text",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "centerTextColor": {
        "dataType": "color",
        "displayName": "Center Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "marqueeFontSize": {
        "dataType": "number",
        "displayName": "Marquee Font Size (px)",
        "defaultValue": 72,
        "group": "Typography"
      },
      "row1Speed": {
        "dataType": "number",
        "displayName": "Row 1 Speed (seconds)",
        "defaultValue": 20,
        "group": "Animation"
      },
      "row2Speed": {
        "dataType": "number",
        "displayName": "Row 2 Speed (seconds)",
        "defaultValue": 25,
        "group": "Animation"
      },
      "row3Speed": {
        "dataType": "number",
        "displayName": "Row 3 Speed (seconds)",
        "defaultValue": 30,
        "group": "Animation"
      },
      "pauseOnHover": {
        "dataType": "booleanValue",
        "displayName": "Pause on Hover",
        "defaultValue": true,
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const row1Text = config?.row1Text || "DESIGN · DEVELOP · CREATE · INNOVATE ·";
  const row2Text = config?.row2Text || "BRAND · DIGITAL · VISUAL · EXPERIENCE ·";
  const row3Text = config?.row3Text || "STRATEGY · CREATIVE · PRODUCTION · LAUNCH ·";
  const centerText = config?.centerText || "We Create Digital Excellence";
  const showCenterText = config?.showCenterText !== false;
  const backgroundColor = config?.backgroundColor || "#000000";
  const textColor = config?.textColor || "#FFFFFF";
  const centerTextColor = config?.centerTextColor || "#FFFFFF";
  const marqueeFontSize = parseInt(config?.marqueeFontSize || "72");
  const row1Speed = parseInt(config?.row1Speed || "20");
  const row2Speed = parseInt(config?.row2Speed || "25");
  const row3Speed = parseInt(config?.row3Speed || "30");
  const pauseOnHover = config?.pauseOnHover !== false;

  const MarqueeRow = ({ text, speed, direction = 'left' }) => {
    const [isPaused, setIsPaused] = React.useState(false);

    return (
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative',
          padding: '24px 0'
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <style>{`
          @keyframes marquee-left-${speed} {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes marquee-right-${speed} {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}</style>
        <div
          style={{
            display: 'inline-block',
            fontSize: `clamp(${marqueeFontSize * 0.4}px, ${marqueeFontSize * 0.08}vw + ${marqueeFontSize * 0.3}px, ${marqueeFontSize}px)`,
            fontWeight: '700',
            color: textColor,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '0.02em',
            animation: `marquee-${direction}-${speed} ${speed}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {text} {text}
        </div>
      </div>
    );
  };

  return (
    <div
      className="hero-marquee"
      style={{
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Marquee Rows */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <MarqueeRow text={row1Text} speed={row1Speed} direction="left" />
        <MarqueeRow text={row2Text} speed={row2Speed} direction="right" />
        <MarqueeRow text={row3Text} speed={row3Speed} direction="left" />
      </div>

      {/* Center Text Overlay */}
      {showCenterText && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            textAlign: 'center',
            padding: '48px',
            backgroundColor: `${backgroundColor}dd`,
            backdropFilter: 'blur(10px)',
            borderRadius: '12px'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: '600',
              color: centerTextColor,
              margin: 0,
              lineHeight: '1.2',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            {centerText}
          </h1>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
