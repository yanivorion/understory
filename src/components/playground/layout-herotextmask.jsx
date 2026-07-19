import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9 - Advanced Hero Collection
 * Generated: Oct 26, 2025, 04:10 AM
 * Component Type: Layout.HeroTextMask
 * 
* User Request: N/A
*
* Design Brief:
* N/A
 * ============================================================================
 */

/*
 * ============================================================================
 * Hero 2: Text Mask with Image/Video
 * Ultra-sophisticated technique where image shows through typography
 * ============================================================================
 */

const MANIFEST = {
  "type": "Layout.HeroTextMask",
  "description": "Sophisticated hero with image visible through large typography cutout. Features background-clip text effect with optional parallax scroll. Perfect for photography, fashion, and art portfolios.",
  "editorElement": {
    "selector": ".hero-text-mask",
    "displayName": "Text Mask Hero",
    "archetype": "container",
    "data": {
      "maskText": {
        "dataType": "text",
        "displayName": "Mask Text",
        "defaultValue": "CREATIVE",
        "group": "Content"
      },
      "subheadline": {
        "dataType": "text",
        "displayName": "Subheadline",
        "defaultValue": "Photographer & Visual Artist",
        "group": "Content"
      },
      "backgroundImage": {
        "dataType": "text",
        "displayName": "Background Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "subheadlineColor": {
        "dataType": "color",
        "displayName": "Subheadline Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "maskFontSize": {
        "dataType": "number",
        "displayName": "Mask Text Font Size (px)",
        "defaultValue": 140,
        "group": "Typography"
      },
      "enableParallax": {
        "dataType": "booleanValue",
        "displayName": "Enable Scroll Parallax",
        "defaultValue": true,
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "800",
        "options": ["600", "800", "1000"],
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
  const maskText = config?.maskText || "CREATIVE";
  const subheadline = config?.subheadline || "Photographer & Visual Artist";
  const backgroundImage = config?.backgroundImage || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80";
  const backgroundColor = config?.backgroundColor || "#000000";
  const subheadlineColor = config?.subheadlineColor || "#FFFFFF";
  const maskFontSize = parseInt(config?.maskFontSize || "140");
  const enableParallax = config?.enableParallax !== false;
  const animationDuration = parseInt(config?.animationDuration || "800");

  const [scrollY, setScrollY] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!enableParallax || prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableParallax, prefersReducedMotion]);

  return (
    <div
      className="hero-text-mask"
      style={{
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @supports (background-clip: text) or (-webkit-background-clip: text) {
          .mask-text {
            background-image: url('${backgroundImage}');
            background-size: cover;
            background-position: center ${enableParallax && !prefersReducedMotion ? scrollY * 0.5 : 0}px;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
          }
        }
      `}</style>

      <h1
        className="mask-text"
        style={{
          fontSize: `clamp(${maskFontSize * 0.3}px, ${maskFontSize * 0.12}vw + ${maskFontSize * 0.2}px, ${maskFontSize}px)`,
          fontWeight: '900',
          margin: '0 0 32px 0',
          lineHeight: '0.9',
          letterSpacing: '-0.04em',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`
        }}
      >
        {maskText}
      </h1>

      <p
        style={{
          fontSize: '20px',
          fontWeight: '300',
          color: subheadlineColor,
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textAlign: 'center',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity ${animationDuration}ms ease-out ${animationDuration * 0.3}ms, transform ${animationDuration}ms ease-out ${animationDuration * 0.3}ms`
        }}
      >
        {subheadline}
      </p>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
