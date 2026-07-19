import React from "react";

const MANIFEST = {
  "type": "Carousel.3DCardStack",
  "description": "Advanced 3D card carousel with perspective depth, stacked layout, momentum scrolling, and sophisticated transform animations",
  "editorElement": {
    "selector": ".carousel-3d-container",
    "displayName": "3D Card Carousel",
    "archetype": "container",
    "data": {
      "card1Image": {
        "dataType": "text",
        "displayName": "Card 1 Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop",
        "group": "Content"
      },
      "card1Title": {
        "dataType": "text",
        "displayName": "Card 1 Title",
        "defaultValue": "Urban Architecture",
        "group": "Content"
      },
      "card1Subtitle": {
        "dataType": "text",
        "displayName": "Card 1 Subtitle",
        "defaultValue": "Modern Design",
        "group": "Content"
      },
      "card2Image": {
        "dataType": "text",
        "displayName": "Card 2 Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=800&fit=crop",
        "group": "Content"
      },
      "card2Title": {
        "dataType": "text",
        "displayName": "Card 2 Title",
        "defaultValue": "Natural Landscapes",
        "group": "Content"
      },
      "card2Subtitle": {
        "dataType": "text",
        "displayName": "Card 2 Subtitle",
        "defaultValue": "Scenic Views",
        "group": "Content"
      },
      "card3Image": {
        "dataType": "text",
        "displayName": "Card 3 Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600&h=800&fit=crop",
        "group": "Content"
      },
      "card3Title": {
        "dataType": "text",
        "displayName": "Card 3 Title",
        "defaultValue": "Abstract Forms",
        "group": "Content"
      },
      "card3Subtitle": {
        "dataType": "text",
        "displayName": "Card 3 Subtitle",
        "defaultValue": "Digital Art",
        "group": "Content"
      },
      "card4Image": {
        "dataType": "text",
        "displayName": "Card 4 Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=800&fit=crop",
        "group": "Content"
      },
      "card4Title": {
        "dataType": "text",
        "displayName": "Card 4 Title",
        "defaultValue": "Minimalist Spaces",
        "group": "Content"
      },
      "card4Subtitle": {
        "dataType": "text",
        "displayName": "Card 4 Subtitle",
        "defaultValue": "Interior Design",
        "group": "Content"
      },
      "autoPlay": {
        "dataType": "booleanValue",
        "displayName": "Auto Play",
        "defaultValue": false,
        "group": "Content"
      },
      "autoPlaySpeed": {
        "dataType": "select",
        "displayName": "Auto Play Speed (seconds)",
        "defaultValue": "4",
        "options": ["3", "4", "5", "6", "8"],
        "group": "Content"
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
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "subtitleColor": {
        "dataType": "color",
        "displayName": "Subtitle Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "navButtonColor": {
        "dataType": "color",
        "displayName": "Navigation Button Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "navButtonHoverColor": {
        "dataType": "color",
        "displayName": "Nav Button Hover Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "dotColor": {
        "dataType": "color",
        "displayName": "Dot Indicator Color",
        "defaultValue": "#CED4DA",
        "group": "Colors"
      },
      "dotActiveColor": {
        "dataType": "color",
        "displayName": "Active Dot Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue"],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "number",
        "displayName": "Title Size (px)",
        "defaultValue": 24,
        "group": "Typography"
      },
      "subtitleSize": {
        "dataType": "number",
        "displayName": "Subtitle Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "cardBorderRadius": {
        "dataType": "select",
        "displayName": "Card Border Radius",
        "defaultValue": "12px",
        "options": ["0px", "8px", "12px", "16px", "20px"],
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
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);

  const cards = [
    {
      image: config?.card1Image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop",
      title: config?.card1Title || "Urban Architecture",
      subtitle: config?.card1Subtitle || "Modern Design"
    },
    {
      image: config?.card2Image || "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=800&fit=crop",
      title: config?.card2Title || "Natural Landscapes",
      subtitle: config?.card2Subtitle || "Scenic Views"
    },
    {
      image: config?.card3Image || "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600&h=800&fit=crop",
      title: config?.card3Title || "Abstract Forms",
      subtitle: config?.card3Subtitle || "Digital Art"
    },
    {
      image: config?.card4Image || "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=800&fit=crop",
      title: config?.card4Title || "Minimalist Spaces",
      subtitle: config?.card4Subtitle || "Interior Design"
    }
  ];

  const autoPlay = config?.autoPlay !== false;
  const autoPlaySpeed = parseInt(config?.autoPlaySpeed || "4") * 1000;
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FFFFFF";
  const titleColor = config?.titleColor || "#212529";
  const subtitleColor = config?.subtitleColor || "#6C757D";
  const navButtonColor = config?.navButtonColor || "#495057";
  const navButtonHoverColor = config?.navButtonHoverColor || "#212529";
  const dotColor = config?.dotColor || "#CED4DA";
  const dotActiveColor = config?.dotActiveColor || "#495057";
  const fontFamily = config?.fontFamily || "system-ui";
  const titleSize = config?.titleSize || 24;
  const subtitleSize = config?.subtitleSize || 14;
  const cardBorderRadius = config?.cardBorderRadius || "12px";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  React.useEffect(() => {
    if (!autoPlay || isHovering || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlaySpeed, isHovering, cards.length, prefersReducedMotion]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const absDiff = Math.abs(diff);
    
    if (prefersReducedMotion) {
      return {
        opacity: diff === 0 ? 1 : 0,
        transform: 'none',
        zIndex: diff === 0 ? 3 : 1,
        pointerEvents: diff === 0 ? 'auto' : 'none'
      };
    }

    // Current card
    if (diff === 0) {
      return {
        opacity: 1,
        transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
        zIndex: 3,
        filter: 'brightness(1)',
        pointerEvents: 'auto'
      };
    }
    
    // Next cards
    if (diff > 0) {
      return {
        opacity: absDiff === 1 ? 0.6 : 0,
        transform: `translateX(${30 + (absDiff - 1) * 20}%) translateZ(-${absDiff * 100}px) rotateY(-15deg) scale(${1 - absDiff * 0.15})`,
        zIndex: 3 - absDiff,
        filter: `brightness(${1 - absDiff * 0.2})`,
        pointerEvents: absDiff === 1 ? 'auto' : 'none'
      };
    }
    
    // Previous cards
    return {
      opacity: absDiff === 1 ? 0.6 : 0,
      transform: `translateX(-${30 + (absDiff - 1) * 20}%) translateZ(-${absDiff * 100}px) rotateY(15deg) scale(${1 - absDiff * 0.15})`,
      zIndex: 3 - absDiff,
      filter: `brightness(${1 - absDiff * 0.2})`,
      pointerEvents: absDiff === 1 ? 'auto' : 'none'
    };
  };

  return (
    <div 
      className="carousel-3d-container"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        backgroundColor,
        padding: '80px 24px',
        fontFamily,
        minHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 3D Card Stack */}
      <div style={{
        perspective: '2000px',
        perspectiveOrigin: 'center center',
        width: '100%',
        maxWidth: '400px',
        height: '500px',
        position: 'relative',
        transformStyle: 'preserve-3d'
      }}>
        {cards.map((card, index) => {
          const style = getCardStyle(index);
          
          return (
            <div
              key={index}
              onClick={() => {
                if (index !== currentIndex && Math.abs(index - currentIndex) === 1) {
                  setCurrentIndex(index);
                }
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: cardBackgroundColor,
                borderRadius: cardBorderRadius,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                cursor: index !== currentIndex && Math.abs(index - currentIndex) === 1 ? 'pointer' : 'default',
                ...style,
                transition: prefersReducedMotion ? 'none' : 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity'
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: '100%',
                  height: '70%',
                  objectFit: 'cover'
                }}
              />
              
              <div style={{
                padding: '24px',
                height: '30%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: `${titleSize}px`,
                  fontWeight: '500',
                  color: titleColor,
                  lineHeight: '1.2'
                }}>
                  {card.title}
                </h3>
                
                <p style={{
                  margin: 0,
                  fontSize: `${subtitleSize}px`,
                  color: subtitleColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '500'
                }}>
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginTop: '40px'
      }}>
        <button
          onClick={goToPrev}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: cardBackgroundColor,
            color: navButtonColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
          }}
          onMouseEnter={(e) => {
            if (!prefersReducedMotion) {
              e.currentTarget.style.color = navButtonHoverColor;
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = navButtonColor;
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          onClick={goToNext}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: cardBackgroundColor,
            color: navButtonColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
          }}
          onMouseEnter={(e) => {
            if (!prefersReducedMotion) {
              e.currentTarget.style.color = navButtonHoverColor;
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = navButtonColor;
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '24px'
      }}>
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: index === currentIndex ? dotActiveColor : dotColor,
              cursor: 'pointer',
              padding: 0,
              transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out',
              transform: index === currentIndex && !prefersReducedMotion ? 'scale(1.3)' : 'scale(1)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
