import React from "react";

const MANIFEST = {
  "type": "Scroll.StickyCardStack",
  "description": "Sticky scroll card stack that peels away revealing next card with depth shadows",
  "editorElement": {
    "selector": ".sticky-card-stack",
    "displayName": "Sticky Card Stack",
    "archetype": "container",
    "data": {
      "cardCount": {
        "dataType": "select",
        "displayName": "Number of Cards",
        "defaultValue": "5",
        "options": ["3", "4", "5", "6"],
        "group": "Content"
      },
      "cardHeight": {
        "dataType": "select",
        "displayName": "Card Height (vh)",
        "defaultValue": "60",
        "options": ["50", "60", "70", "80"],
        "group": "Layout"
      },
      "peelDistance": {
        "dataType": "select",
        "displayName": "Peel Distance (px)",
        "defaultValue": "100",
        "options": ["80", "100", "120", "150"],
        "group": "Animation"
      },
      "scaleReduction": {
        "dataType": "select",
        "displayName": "Scale Reduction",
        "defaultValue": "0.95",
        "options": ["0.90", "0.95", "0.97", "0.98"],
        "group": "Animation"
      },
      "shadowIntensity": {
        "dataType": "select",
        "displayName": "Shadow Depth Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "dramatic"],
        "group": "Animation"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "24",
        "options": ["16", "20", "24", "32"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "card1Color": {
        "dataType": "color",
        "displayName": "Card 1 Background",
        "defaultValue": "#667eea",
        "group": "Colors"
      },
      "card2Color": {
        "dataType": "color",
        "displayName": "Card 2 Background",
        "defaultValue": "#764ba2",
        "group": "Colors"
      },
      "card3Color": {
        "dataType": "color",
        "displayName": "Card 3 Background",
        "defaultValue": "#f093fb",
        "group": "Colors"
      },
      "card4Color": {
        "dataType": "color",
        "displayName": "Card 4 Background",
        "defaultValue": "#4facfe",
        "group": "Colors"
      },
      "card5Color": {
        "dataType": "color",
        "displayName": "Card 5 Background",
        "defaultValue": "#43e97b",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 32,
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
      "resizeDirection": "vertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const containerRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const [cardStates, setCardStates] = React.useState([]);

  // Config values
  const cardCount = parseInt(config?.cardCount || "5");
  const cardHeight = parseInt(config?.cardHeight || "60");
  const peelDistance = parseInt(config?.peelDistance || "100");
  const scaleReduction = parseFloat(config?.scaleReduction || "0.95");
  const shadowIntensity = config?.shadowIntensity || "medium";
  const borderRadius = parseInt(config?.borderRadius || "24");
  const backgroundColor = config?.backgroundColor || "#F4F4F5";
  const textColor = config?.textColor || "#FFFFFF";
  const fontSize = config?.fontSize || 32;
  const fontWeight = config?.fontWeight || "500";

  const cardColors = [
    config?.card1Color || "#667eea",
    config?.card2Color || "#764ba2",
    config?.card3Color || "#f093fb",
    config?.card4Color || "#4facfe",
    config?.card5Color || "#43e97b",
    config?.card1Color || "#667eea"
  ];

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Shadow intensity mapping
  const shadowMultiplier = {
    'subtle': 0.5,
    'medium': 1.0,
    'dramatic': 1.5
  }[shadowIntensity] || 1.0;

  // Initialize card states
  React.useEffect(() => {
    setCardStates(Array(cardCount).fill({ progress: 0, isStuck: true }));
  }, [cardCount]);

  // Handle scroll
  const handleScroll = () => {
    if (prefersReducedMotion) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when card should start peeling
      const peelStart = windowHeight * 0.2;
      const peelEnd = -rect.height;
      
      if (rect.top <= peelStart && rect.top > peelEnd) {
        // Card is in peel zone
        const progress = (peelStart - rect.top) / (peelStart - peelEnd);
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        
        setCardStates(prev => {
          const newStates = [...prev];
          newStates[index] = { progress: clampedProgress, isStuck: rect.top > peelEnd };
          return newStates;
        });
      } else if (rect.top > peelStart) {
        // Card hasn't started peeling
        setCardStates(prev => {
          const newStates = [...prev];
          newStates[index] = { progress: 0, isStuck: true };
          return newStates;
        });
      } else {
        // Card has finished peeling
        setCardStates(prev => {
          const newStates = [...prev];
          newStates[index] = { progress: 1, isStuck: false };
          return newStates;
        });
      }
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cardCount, prefersReducedMotion]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    minHeight: `${(cardCount + 1) * 100}vh`,
    backgroundColor: backgroundColor,
    padding: '10vh 0'
  };

  const cardWrapperStyle = (index) => {
    const state = cardStates[index] || { progress: 0, isStuck: true };
    const zIndex = cardCount - index;
    
    return {
      position: state.isStuck ? 'sticky' : 'relative',
      top: state.isStuck ? '20vh' : 'auto',
      height: `${cardHeight}vh`,
      marginBottom: index < cardCount - 1 ? '100vh' : '0',
      zIndex: zIndex
    };
  };

  const cardStyle = (index) => {
    const state = cardStates[index] || { progress: 0, isStuck: true };
    
    // Easing function for smooth peel
    const easeProgress = 1 - Math.pow(1 - state.progress, 3);
    
    // Calculate transforms
    const translateY = -easeProgress * peelDistance;
    const scale = 1 - (1 - scaleReduction) * (1 - easeProgress);
    const rotateX = easeProgress * 5; // Slight 3D rotation
    
    // Calculate shadow
    const shadowDepth = (1 - easeProgress) * 40 * shadowMultiplier;
    const shadowOpacity = (1 - easeProgress) * 0.25 * shadowMultiplier;
    
    return {
      width: '90%',
      maxWidth: '900px',
      height: '100%',
      margin: '0 auto',
      background: `linear-gradient(135deg, ${cardColors[index]}, ${cardColors[index]}dd)`,
      borderRadius: `${borderRadius}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: textColor,
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      transformStyle: 'preserve-3d',
      perspective: '1000px',
      transform: prefersReducedMotion 
        ? 'none' 
        : `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`,
      boxShadow: `0 ${shadowDepth}px ${shadowDepth * 2}px rgba(0, 0, 0, ${shadowOpacity})`,
      transition: prefersReducedMotion ? 'none' : 'box-shadow 0.1s ease',
      willChange: 'transform, box-shadow'
    };
  };

  return (
    <div ref={containerRef} className="sticky-card-stack" style={containerStyle}>
      {Array.from({ length: cardCount }).map((_, index) => (
        <div key={index} style={cardWrapperStyle(index)}>
          <div 
            ref={el => cardRefs.current[index] = el}
            style={cardStyle(index)}
          >
            <div>Card {index + 1}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
