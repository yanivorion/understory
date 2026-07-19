import React from "react";

const MANIFEST = {
  "type": "Gallery.FlipCardGallery",
  "description": "3D flip card gallery with preserve-3d transforms, neighbor tilt reactions, magnification lens on hover, and scroll-triggered entrance animations",
  "editorElement": {
    "selector": ".flip-card-gallery",
    "displayName": "3D Flip Card Gallery",
    "archetype": "container",
    "data": {
      "cards": {
        "dataType": "text",
        "displayName": "Card Titles (comma-separated)",
        "defaultValue": "Innovation,Design,Development,Strategy,Research,Analytics",
        "group": "Content"
      },
      "cardDescriptions": {
        "dataType": "text",
        "displayName": "Card Descriptions (pipe-separated)",
        "defaultValue": "Breakthrough solutions|Creative excellence|Technical mastery|Business growth|Deep insights|Data-driven decisions",
        "group": "Content"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "cardGap": {
        "dataType": "select",
        "displayName": "Gap Between Cards",
        "defaultValue": "24",
        "options": ["16", "20", "24", "32"],
        "group": "Layout"
      },
      "enableMagnifier": {
        "dataType": "booleanValue",
        "displayName": "Enable Magnification Lens",
        "defaultValue": true,
        "group": "Content"
      },
      "magnifierSize": {
        "dataType": "select",
        "displayName": "Magnifier Size",
        "defaultValue": "120",
        "options": ["100", "120", "140", "160"],
        "group": "Layout"
      },
      "tiltIntensity": {
        "dataType": "select",
        "displayName": "3D Tilt Intensity",
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
      "cardFrontColor": {
        "dataType": "color",
        "displayName": "Card Front Background",
        "defaultValue": "#27272A",
        "group": "Colors"
      },
      "cardBackColor": {
        "dataType": "color",
        "displayName": "Card Back Background",
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
        "defaultValue": 24,
        "group": "Typography"
      },
      "bodyFontSize": {
        "dataType": "number",
        "displayName": "Body Font Size (px)",
        "defaultValue": 14,
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
  const [flippedCards, setFlippedCards] = React.useState(new Set());
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [magnifierPos, setMagnifierPos] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef(null);
  const cardsRef = React.useRef([]);

  // Configuration with safe access
  const cardsText = config?.cards || "Innovation,Design,Development,Strategy,Research,Analytics";
  const descriptionsText = config?.cardDescriptions || "Breakthrough solutions|Creative excellence|Technical mastery|Business growth|Deep insights|Data-driven decisions";
  const cards = cardsText.split(',').map(c => c.trim());
  const descriptions = descriptionsText.split('|').map(d => d.trim());
  const columns = parseInt(config?.columns || "3");
  const cardGap = parseInt(config?.cardGap || "24");
  const enableMagnifier = config?.enableMagnifier !== false;
  const magnifierSize = parseInt(config?.magnifierSize || "120");
  const tiltIntensity = config?.tiltIntensity || "medium";
  const backgroundColor = config?.backgroundColor || "#18181B";
  const cardFrontColor = config?.cardFrontColor || "#27272A";
  const cardBackColor = config?.cardBackColor || "#3F3F46";
  const textColor = config?.textColor || "#FAFAFA";
  const accentColor = config?.accentColor || "#71717A";
  const titleFontSize = config?.titleFontSize || 24;
  const bodyFontSize = config?.bodyFontSize || 14;
  const fontWeight = config?.fontWeight || "400";

  // Tilt intensity multiplier
  const tiltMultiplier = {
    subtle: 5,
    medium: 10,
    strong: 15
  }[tiltIntensity];

  // Reduced motion check
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Intersection Observer for entrance animation
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Toggle flip
  const toggleFlip = (index) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Handle magnifier movement
  const handleMouseMove = (e, index) => {
    if (!enableMagnifier) return;
    
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMagnifierPos({ x, y });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  // Get neighbor indices
  const getNeighborIndices = (index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const neighbors = [];

    // Left
    if (col > 0) neighbors.push(index - 1);
    // Right
    if (col < columns - 1) neighbors.push(index + 1);
    // Top
    if (row > 0) neighbors.push(index - columns);
    // Bottom
    if (row < Math.ceil(cards.length / columns) - 1) neighbors.push(index + columns);

    return neighbors;
  };

  return (
    <div 
      ref={containerRef}
      className="flip-card-gallery"
      style={{
        minHeight: '100vh',
        backgroundColor: backgroundColor,
        padding: '80px 40px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        perspective: '1200px'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: cardGap + 'px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.has(index);
          const isHovered = hoveredCard === index;
          const neighbors = getNeighborIndices(index);
          const isNeighbor = hoveredCard !== null && neighbors.includes(hoveredCard);
          const delay = index * 80;

          return (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              onClick={() => toggleFlip(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
                opacity: prefersReducedMotion || isVisible ? 1 : 0,
                transform: prefersReducedMotion 
                  ? 'none'
                  : isVisible 
                    ? isNeighbor 
                      ? 'rotateY(-8deg) scale(0.95)' 
                      : 'rotateY(0) scale(1)'
                    : 'rotateY(-45deg) translateY(40px) scale(0.8)',
                transition: prefersReducedMotion 
                  ? 'none'
                  : `opacity 400ms ease-out ${delay}ms, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
                willChange: 'transform, opacity'
              }}
            >
              {/* Card Inner (flip container) */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transform: prefersReducedMotion 
                    ? 'none'
                    : isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                  transition: prefersReducedMotion ? 'none' : 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {/* Front Face */}
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: cardFrontColor,
                    borderRadius: '8px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden'
                  }}
                >
                  <h3 style={{
                    fontSize: titleFontSize + 'px',
                    fontWeight: '500',
                    color: textColor,
                    margin: 0,
                    textAlign: 'center',
                    letterSpacing: '-0.02em'
                  }}>
                    {card}
                  </h3>
                  <div style={{
                    width: '40px',
                    height: '2px',
                    backgroundColor: accentColor,
                    marginTop: '20px'
                  }} />
                  <p style={{
                    fontSize: bodyFontSize + 'px',
                    fontWeight: fontWeight,
                    color: accentColor,
                    marginTop: '20px',
                    textAlign: 'center'
                  }}>
                    Click to explore
                  </p>

                  {/* Pattern Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.03,
                    backgroundImage: `repeating-linear-gradient(45deg, ${textColor} 0, ${textColor} 1px, transparent 0, transparent 50%)`,
                    backgroundSize: '10px 10px',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Back Face */}
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: cardBackColor,
                    borderRadius: '8px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                    transform: 'rotateY(180deg)',
                    overflow: 'hidden'
                  }}
                >
                  <h3 style={{
                    fontSize: titleFontSize + 'px',
                    fontWeight: '500',
                    color: textColor,
                    margin: 0,
                    textAlign: 'center',
                    letterSpacing: '-0.02em',
                    marginBottom: '24px'
                  }}>
                    {card}
                  </h3>
                  <p style={{
                    fontSize: bodyFontSize + 'px',
                    fontWeight: fontWeight,
                    color: textColor,
                    lineHeight: 1.6,
                    textAlign: 'center',
                    margin: 0
                  }}>
                    {descriptions[index] || 'Detailed information about this card'}
                  </p>

                  {/* Decorative elements */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: accentColor
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    width: '32px',
                    height: '32px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '50%',
                    opacity: 0.3
                  }} />
                </div>
              </div>

              {/* Magnification Lens */}
              {enableMagnifier && isHovered && !isFlipped && (
                <div
                  style={{
                    position: 'absolute',
                    left: magnifierPos.x + 'px',
                    top: magnifierPos.y + 'px',
                    width: magnifierSize + 'px',
                    height: magnifierSize + 'px',
                    border: `2px solid ${accentColor}`,
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    backgroundColor: cardFrontColor,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(0px)',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: prefersReducedMotion ? 'none' : 'lensAppear 200ms ease-out',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    fontSize: (titleFontSize * 0.8) + 'px',
                    fontWeight: '500',
                    color: textColor,
                    textAlign: 'center',
                    transform: 'scale(1.2)'
                  }}>
                    {card}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes lensAppear {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @media (max-width: 768px) {
          .flip-card-gallery > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .flip-card-gallery > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
