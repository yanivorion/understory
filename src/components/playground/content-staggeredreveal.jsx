import React from "react";

const MANIFEST = {
  "type": "Content.StaggeredReveal",
  "description": "Sophisticated content reveal system with staggered animations, multiple patterns, and scroll-triggered entrances",
  "editorElement": {
    "selector": ".staggered-reveal",
    "displayName": "Staggered Reveal",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Heading",
        "defaultValue": "OUR SERVICES",
        "group": "Content"
      },
      "subheading": {
        "dataType": "text",
        "displayName": "Subheading",
        "defaultValue": "Comprehensive solutions for modern challenges",
        "group": "Content"
      },
      "items": {
        "dataType": "text",
        "displayName": "Items (one per line)",
        "defaultValue": "Brand Strategy & Identity\nDigital Experience Design\nProduct Development\nContent & Marketing\nData Analytics\nGrowth Optimization",
        "group": "Content",
        "description": "Each line becomes a separate card"
      },
      "itemDescriptions": {
        "dataType": "text",
        "displayName": "Item Descriptions (one per line)",
        "defaultValue": "Define your unique position in the market\nCreate memorable digital experiences\nBuild products users love\nEngage audiences with compelling stories\nMake data-driven decisions\nScale your business efficiently",
        "group": "Content"
      },
      "triggerMode": {
        "dataType": "select",
        "displayName": "Trigger Mode",
        "defaultValue": "scroll",
        "options": ["scroll", "immediate", "manual"],
        "group": "Content"
      },
      "showReplayButton": {
        "dataType": "booleanValue",
        "displayName": "Show Replay Button",
        "defaultValue": true,
        "group": "Content"
      },
      "revealPattern": {
        "dataType": "select",
        "displayName": "Reveal Pattern",
        "defaultValue": "sequential",
        "options": ["sequential", "alternating", "centerOut", "edgesIn", "wave", "random"],
        "group": "Animation",
        "description": "Order in which items appear"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay (ms)",
        "defaultValue": "100",
        "options": ["50", "80", "100", "120", "150", "200"],
        "group": "Animation"
      },
      "itemDuration": {
        "dataType": "select",
        "displayName": "Item Duration (ms)",
        "defaultValue": "500",
        "options": ["400", "500", "600", "700", "800"],
        "group": "Animation"
      },
      "transformDirection": {
        "dataType": "select",
        "displayName": "Transform Direction",
        "defaultValue": "up",
        "options": ["up", "down", "left", "right", "scale"],
        "group": "Animation",
        "description": "Starting position for items"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Columns (Desktop)",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Grid Gap",
        "defaultValue": "1.5rem",
        "options": ["1rem", "1.5rem", "2rem", "2.5rem"],
        "group": "Layout"
      },
      "headingFontSize": {
        "dataType": "number",
        "displayName": "Heading Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "itemFontSize": {
        "dataType": "number",
        "displayName": "Item Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Item Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "headingColor": {
        "dataType": "color",
        "displayName": "Heading Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "subheadingColor": {
        "dataType": "color",
        "displayName": "Subheading Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "itemBackground": {
        "dataType": "color",
        "displayName": "Item Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "itemBorder": {
        "dataType": "color",
        "displayName": "Item Border",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "itemTextColor": {
        "dataType": "color",
        "displayName": "Item Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "itemDescriptionColor": {
        "dataType": "color",
        "displayName": "Item Description Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#212529",
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
  const heading = config?.heading || "OUR SERVICES";
  const subheading = config?.subheading || "Comprehensive solutions for modern challenges";
  const itemsText = config?.items || "Brand Strategy & Identity\nDigital Experience Design\nProduct Development\nContent & Marketing\nData Analytics\nGrowth Optimization";
  const descriptionsText = config?.itemDescriptions || "Define your unique position in the market\nCreate memorable digital experiences\nBuild products users love\nEngage audiences with compelling stories\nMake data-driven decisions\nScale your business efficiently";
  const triggerMode = config?.triggerMode || "scroll";
  const showReplayButton = config?.showReplayButton !== false;
  const revealPattern = config?.revealPattern || "sequential";
  const staggerDelay = parseInt(config?.staggerDelay || "100");
  const itemDuration = parseInt(config?.itemDuration || "500");
  const transformDirection = config?.transformDirection || "up";
  const columns = parseInt(config?.columns || "3");
  const gap = config?.gap || "1.5rem";
  const headingFontSize = parseInt(config?.headingFontSize || "14");
  const itemFontSize = parseInt(config?.itemFontSize || "18");
  const fontWeight = config?.fontWeight || "500";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const headingColor = config?.headingColor || "#6C757D";
  const subheadingColor = config?.subheadingColor || "#212529";
  const itemBackground = config?.itemBackground || "#F8F9FA";
  const itemBorder = config?.itemBorder || "#E9ECEF";
  const itemTextColor = config?.itemTextColor || "#212529";
  const itemDescriptionColor = config?.itemDescriptionColor || "#6C757D";
  const accentColor = config?.accentColor || "#212529";

  const items = itemsText.split('\n').filter(item => item.trim());
  const descriptions = descriptionsText.split('\n').filter(desc => desc.trim());

  const [revealedIndices, setRevealedIndices] = React.useState(new Set());
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const containerRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const getRevealOrder = () => {
    const indices = Array.from({ length: items.length }, (_, i) => i);
    const middle = Math.floor(items.length / 2);

    switch (revealPattern) {
      case 'sequential':
        return indices;
      case 'alternating':
        const even = indices.filter(i => i % 2 === 0);
        const odd = indices.filter(i => i % 2 !== 0);
        return [...even, ...odd];
      case 'centerOut':
        return indices.sort((a, b) => 
          Math.abs(a - middle) - Math.abs(b - middle)
        );
      case 'edgesIn':
        return indices.sort((a, b) => 
          Math.abs(a - middle) - Math.abs(b - middle)
        ).reverse();
      case 'wave':
        return indices.map((val, idx) => ({
          index: val,
          distance: Math.abs(idx - middle)
        }))
        .sort((a, b) => a.distance - b.distance)
        .map(item => item.index);
      case 'random':
        return indices.sort(() => Math.random() - 0.5);
      default:
        return indices;
    }
  };

  const getTransformOffset = (index) => {
    const isRevealed = revealedIndices.has(index);
    const distance = 30;

    const transforms = {
      up: `translateY(${isRevealed ? 0 : distance}px)`,
      down: `translateY(${isRevealed ? 0 : -distance}px)`,
      left: `translateX(${isRevealed ? 0 : distance}px)`,
      right: `translateX(${isRevealed ? 0 : -distance}px)`,
      scale: `scale(${isRevealed ? 1 : 0.8})`
    };

    return transforms[transformDirection] || transforms.up;
  };

  const animate = React.useCallback(() => {
    if (isAnimating || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setRevealedIndices(new Set(Array.from({ length: items.length }, (_, i) => i)));
      }
      return;
    }

    setIsAnimating(true);
    setRevealedIndices(new Set());

    const revealOrder = getRevealOrder();

    revealOrder.forEach((itemIndex, orderIndex) => {
      setTimeout(() => {
        setRevealedIndices(prev => {
          const newSet = new Set(prev);
          newSet.add(itemIndex);
          return newSet;
        });

        if (orderIndex === revealOrder.length - 1) {
          setTimeout(() => {
            setIsAnimating(false);
            setHasAnimated(true);
          }, itemDuration);
        }
      }, orderIndex * staggerDelay);
    });
  }, [items.length, revealPattern, staggerDelay, itemDuration, isAnimating, prefersReducedMotion]);

  React.useEffect(() => {
    if (triggerMode === 'immediate') {
      animate();
      return;
    }

    if (triggerMode === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              animate();
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [triggerMode, hasAnimated, animate]);

  const handleReplay = () => {
    setHasAnimated(false);
    setIsAnimating(false);
    setTimeout(() => animate(), 50);
  };

  return (
    <div className="staggered-reveal" style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor,
      padding: '4rem 1.5rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div
        ref={containerRef}
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          opacity: 1,
          transform: 'translateY(0)',
          animation: 'headerFadeIn 600ms ease-out'
        }}>
          <div style={{
            fontSize: `${headingFontSize}px`,
            fontWeight: '400',
            letterSpacing: '0.1em',
            color: headingColor,
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            {heading}
          </div>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 2vw + 1rem, 2.5rem)',
            fontWeight: '500',
            color: subheadingColor,
            margin: 0,
            lineHeight: 1.3
          }}>
            {subheading}
          </h2>
        </div>

        {/* Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          marginBottom: showReplayButton ? '3rem' : 0
        }}>
          {items.map((item, index) => {
            const isRevealed = revealedIndices.has(index);
            const description = descriptions[index] || '';

            return (
              <div
                key={index}
                style={{
                  backgroundColor: itemBackground,
                  border: `1px solid ${itemBorder}`,
                  borderRadius: '8px',
                  padding: '2rem',
                  opacity: prefersReducedMotion ? 1 : (isRevealed ? 1 : 0),
                  transform: prefersReducedMotion ? 'none' : getTransformOffset(index),
                  transition: `all ${itemDuration}ms ease-out`,
                  willChange: 'transform, opacity',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: accentColor,
                  color: backgroundColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Item Content */}
                <h3 style={{
                  fontSize: `${itemFontSize}px`,
                  fontWeight,
                  color: itemTextColor,
                  margin: '0 0 0.75rem 0',
                  lineHeight: 1.4,
                  paddingRight: '2.5rem'
                }}>
                  {item.trim()}
                </h3>

                {description && (
                  <p style={{
                    fontSize: '0.9375rem',
                    fontWeight: '400',
                    color: itemDescriptionColor,
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {description.trim()}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Replay Button */}
        {showReplayButton && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleReplay}
              disabled={isAnimating}
              style={{
                padding: '0.875rem 2rem',
                fontSize: '0.875rem',
                fontWeight: '400',
                fontFamily: 'inherit',
                color: isAnimating ? '#CED4DA' : accentColor,
                backgroundColor: 'transparent',
                border: `1px solid ${isAnimating ? '#E9ECEF' : accentColor}`,
                borderRadius: '6px',
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                transition: 'all 200ms ease-out',
                letterSpacing: '0.025em'
              }}
              onMouseEnter={(e) => {
                if (!isAnimating) {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.color = backgroundColor;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = accentColor;
              }}
            >
              Replay Animation
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes headerFadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .staggered-reveal > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .staggered-reveal * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Component;