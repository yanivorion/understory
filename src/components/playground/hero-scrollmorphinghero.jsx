import React from "react";

const MANIFEST = {
  "type": "Hero.ScrollMorphingHero",
  "description": "Hero section with geometric shape morphing (circle→square→triangle→hexagon) based on scroll progress, multi-speed parallax layers, and magnetic CTA button",
  "editorElement": {
    "selector": ".scroll-morphing-hero",
    "displayName": "Scroll Morphing Hero",
    "archetype": "container",
    "data": {
      "heroTitle": {
        "dataType": "text",
        "displayName": "Hero Title",
        "defaultValue": "Creative Excellence",
        "group": "Content"
      },
      "heroSubtitle": {
        "dataType": "text",
        "displayName": "Hero Subtitle",
        "defaultValue": "Transforming ideas into extraordinary experiences through innovative design and development",
        "group": "Content"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "Explore Our Work",
        "group": "Content"
      },
      "morphingSpeed": {
        "dataType": "select",
        "displayName": "Shape Morphing Speed",
        "defaultValue": "medium",
        "options": ["slow", "medium", "fast"],
        "group": "Animation"
      },
      "parallaxIntensity": {
        "dataType": "select",
        "displayName": "Parallax Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "strong"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "shapeColor": {
        "dataType": "color",
        "displayName": "Shape Color",
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
      "ctaBackgroundColor": {
        "dataType": "color",
        "displayName": "CTA Background",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "ctaHoverColor": {
        "dataType": "color",
        "displayName": "CTA Hover Color",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 72,
        "group": "Typography"
      },
      "subtitleFontSize": {
        "dataType": "number",
        "displayName": "Subtitle Font Size (px)",
        "defaultValue": 18,
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
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [magneticOffset, setMagneticOffset] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef(null);
  const ctaRef = React.useRef(null);

  // Configuration
  const heroTitle = config?.heroTitle || "Creative Excellence";
  const heroSubtitle = config?.heroSubtitle || "Transforming ideas into extraordinary experiences through innovative design and development";
  const ctaText = config?.ctaText || "Explore Our Work";
  const morphingSpeed = config?.morphingSpeed || "medium";
  const parallaxIntensity = config?.parallaxIntensity || "medium";
  const backgroundColor = config?.backgroundColor || "#18181B";
  const shapeColor = config?.shapeColor || "#3F3F46";
  const textColor = config?.textColor || "#FAFAFA";
  const accentColor = config?.accentColor || "#71717A";
  const ctaBackgroundColor = config?.ctaBackgroundColor || "#3F3F46";
  const ctaHoverColor = config?.ctaHoverColor || "#27272A";
  const titleFontSize = config?.titleFontSize || 72;
  const subtitleFontSize = config?.subtitleFontSize || 18;
  const fontWeight = config?.fontWeight || "400";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Parallax multipliers
  const parallaxMultipliers = {
    subtle: { layer1: 0.2, layer2: 0.5, layer3: 0.8 },
    medium: { layer1: 0.3, layer2: 0.7, layer3: 1.2 },
    strong: { layer1: 0.5, layer2: 1.0, layer3: 1.5 }
  }[parallaxIntensity];

  // Handle scroll
  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const maxScroll = window.innerHeight;
      const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic CTA
  const handleCtaMouseMove = (e) => {
    if (!ctaRef.current || prefersReducedMotion) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    setMagneticOffset({ x: deltaX, y: deltaY });
  };

  const handleCtaMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  // Shape morphing clip-path
  const getShapeClipPath = (progress) => {
    if (progress < 0.25) {
      // Circle
      const radius = 50;
      return `circle(${radius}% at 50% 50%)`;
    } else if (progress < 0.5) {
      // Circle to Square
      const t = (progress - 0.25) * 4;
      return `polygon(
        ${50 - 40}% ${50 - 40}%,
        ${50 + 40}% ${50 - 40}%,
        ${50 + 40}% ${50 + 40}%,
        ${50 - 40}% ${50 + 40}%
      )`;
    } else if (progress < 0.75) {
      // Triangle
      return `polygon(50% 10%, 90% 90%, 10% 90%)`;
    } else {
      // Hexagon
      return `polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)`;
    }
  };

  const shapeRotation = scrollProgress * 360;
  const shapeScale = 1 + scrollProgress * 0.5;

  return (
    <div 
      ref={containerRef}
      className="scroll-morphing-hero"
      style={{
        minHeight: '200vh',
        backgroundColor: backgroundColor,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Hero Content (Fixed) */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Parallax Layer 1 (Slowest) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${scrollProgress * 100 * parallaxMultipliers.layer1}px)`,
          opacity: 0.1
        }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(i * 11) % 100}%`,
                top: `${(i * 7) % 100}%`,
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: `1px solid ${accentColor}`
              }}
            />
          ))}
        </div>

        {/* Morphing Shape */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '600px',
          height: '600px',
          transform: prefersReducedMotion
            ? 'translate(-50%, -50%)'
            : `translate(-50%, -50%) rotate(${shapeRotation}deg) scale(${shapeScale}) translateY(${scrollProgress * 100 * parallaxMultipliers.layer2}px)`,
          clipPath: getShapeClipPath(scrollProgress),
          backgroundColor: shapeColor,
          transition: prefersReducedMotion ? 'none' : 'clip-path 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          willChange: 'transform, clip-path',
          zIndex: 1
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 40px',
          transform: `translateY(${scrollProgress * -50 * parallaxMultipliers.layer3}px)`,
          opacity: 1 - scrollProgress * 1.2
        }}>
          <h1 style={{
            fontSize: titleFontSize + 'px',
            fontWeight: '500',
            color: textColor,
            margin: 0,
            marginBottom: '32px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            {heroTitle}
          </h1>
          <p style={{
            fontSize: subtitleFontSize + 'px',
            fontWeight: fontWeight,
            color: accentColor,
            lineHeight: 1.6,
            margin: 0,
            marginBottom: '48px'
          }}>
            {heroSubtitle}
          </p>

          {/* Magnetic CTA */}
          <button
            ref={ctaRef}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            style={{
              padding: '16px 48px',
              fontSize: (subtitleFontSize - 2) + 'px',
              fontWeight: '500',
              color: textColor,
              backgroundColor: ctaBackgroundColor,
              border: `1px solid ${accentColor}`,
              borderRadius: '32px',
              cursor: 'pointer',
              transition: prefersReducedMotion 
                ? 'background-color 200ms ease'
                : 'background-color 200ms ease, transform 200ms ease',
              transform: prefersReducedMotion 
                ? 'none'
                : `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ctaHoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ctaBackgroundColor;
            }}
          >
            {ctaText}
          </button>
        </div>

        {/* Background Parallax Layer 2 (Fastest) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${scrollProgress * 150 * parallaxMultipliers.layer3}px)`,
          opacity: 0.05,
          pointerEvents: 'none'
        }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 100}%`,
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                border: `2px solid ${textColor}`,
                transform: 'rotate(45deg)'
              }}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        {scrollProgress < 0.1 && (
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            animation: prefersReducedMotion ? 'none' : 'bounce 2s ease-in-out infinite',
            zIndex: 2
          }}>
            <span style={{
              fontSize: '12px',
              color: accentColor,
              fontWeight: fontWeight,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              Scroll
            </span>
            <div style={{
              width: '2px',
              height: '40px',
              backgroundColor: accentColor,
              borderRadius: '2px'
            }} />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
