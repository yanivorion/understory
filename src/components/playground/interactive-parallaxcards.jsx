import React from "react";

const MANIFEST = {
  "type": "Interactive.ParallaxCards",
  "description": "Card stack with depth parallax effect on scroll",
  "editorElement": {
    "selector": ".parallax-cards",
    "displayName": "Parallax Scroll Cards",
    "archetype": "container",
    "data": {
      "cardCount": {
        "dataType": "select",
        "displayName": "Number of Cards",
        "defaultValue": "4",
        "options": ["3", "4", "5", "6"],
        "group": "Content"
      },
      "parallaxSpeed": {
        "dataType": "select",
        "displayName": "Parallax Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "dramatic"],
        "group": "Animation",
        "description": "subtle=0.3, medium=0.5, dramatic=0.8"
      },
      "cardHeight": {
        "dataType": "select",
        "displayName": "Card Height (px)",
        "defaultValue": "320",
        "options": ["280", "320", "360", "400"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Vertical Gap",
        "defaultValue": "80",
        "options": ["60", "80", "100", "120"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "16",
        "options": ["8", "12", "16", "20"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "shadowColor": {
        "dataType": "color",
        "displayName": "Shadow Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 20,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["400", "500"],
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
  const cardRefs = React.useRef([]);
  const [scrollPositions, setScrollPositions] = React.useState([]);
  const containerRef = React.useRef(null);

  // Config values
  const cardCount = parseInt(config?.cardCount || "4");
  const parallaxSpeed = config?.parallaxSpeed || "medium";
  const cardHeight = parseInt(config?.cardHeight || "320");
  const gap = parseInt(config?.gap || "80");
  const borderRadius = parseInt(config?.borderRadius || "16");
  const backgroundColor = config?.backgroundColor || "#FAFAFA";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#18181B";
  const shadowColor = config?.shadowColor || "#000000";
  const fontSize = config?.fontSize || 20;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Speed multipliers
  const speedMap = {
    'subtle': 0.3,
    'medium': 0.5,
    'dramatic': 0.8
  };
  const speedMultiplier = speedMap[parallaxSpeed] || 0.5;

  // Initialize scroll positions
  React.useEffect(() => {
    setScrollPositions(Array(cardCount).fill(0));
  }, [cardCount]);

  // Scroll handler
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setScrollPositions(Array(cardCount).fill(0));
      return;
    }

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const newPositions = cardRefs.current.map((card, index) => {
          if (!card) return 0;

          const rect = card.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const cardCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distance = viewportCenter - cardCenter;
          
          // Each card moves at different speed based on index
          const layerSpeed = speedMultiplier * (1 + index * 0.2);
          return distance * layerSpeed * 0.1;
        });

        setScrollPositions(newPositions);
      });
    };

    // Initial calculation
    setTimeout(() => handleScroll(), 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [cardCount, speedMultiplier, prefersReducedMotion]);

  const containerStyle = {
    width: '100%',
    backgroundColor: backgroundColor,
    padding: '120px 24px',
    minHeight: '200vh'
  };

  const cardsContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: `${gap}px`
  };

  const cardStyle = (index) => {
    const shadowOpacity = 0.08 + (index * 0.02);
    const zIndex = cardCount - index;

    return {
      height: `${cardHeight}px`,
      backgroundColor: cardBackgroundColor,
      borderRadius: `${borderRadius}px`,
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: textColor,
      boxShadow: `0 ${8 + index * 4}px ${24 + index * 8}px rgba(0, 0, 0, ${shadowOpacity})`,
      transform: prefersReducedMotion 
        ? 'none' 
        : `translateY(${scrollPositions[index] || 0}px)`,
      transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out',
      willChange: 'transform',
      position: 'relative',
      zIndex: zIndex
    };
  };

  const titleStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    marginBottom: '12px',
    letterSpacing: '0.02em'
  };

  const subtitleStyle = {
    fontSize: `${fontSize * 0.7}px`,
    fontWeight: '400',
    opacity: 0.7,
    lineHeight: '1.6'
  };

  // Card content
  const cardContent = [
    { title: 'Layer 1', subtitle: 'Moves slowly in the background' },
    { title: 'Layer 2', subtitle: 'Medium parallax depth' },
    { title: 'Layer 3', subtitle: 'Faster movement' },
    { title: 'Layer 4', subtitle: 'Closest to foreground' },
    { title: 'Layer 5', subtitle: 'Maximum parallax effect' },
    { title: 'Layer 6', subtitle: 'Ultra-fast movement' }
  ];

  return (
    <div 
      ref={containerRef}
      className="parallax-cards"
      style={containerStyle}
    >
      <div style={cardsContainerStyle}>
        {Array.from({ length: cardCount }).map((_, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            style={cardStyle(index)}
          >
            <h3 style={titleStyle}>{cardContent[index].title}</h3>
            <p style={subtitleStyle}>{cardContent[index].subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
