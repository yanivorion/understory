import React from "react";

const MANIFEST = {
  "type": "Interactive.MagneticCardStack",
  "description": "Stack of cards with magnetic hover lift and tilt, fan-out animation on click, and smooth position transitions",
  "editorElement": {
    "selector": ".magnetic-card-stack",
    "displayName": "Magnetic Card Stack",
    "archetype": "container",
    "data": {
      "cards": { "dataType": "text", "displayName": "Cards (comma-separated)", "defaultValue": "Card 1,Card 2,Card 3,Card 4,Card 5", "group": "Content" },
      "cardColor": { "dataType": "color", "displayName": "Card Background", "defaultValue": "#27272A", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#FAFAFA", "group": "Colors" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#18181B", "group": "Colors" }
    }
  }
};

function Component({ config = {} }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [magneticOffset, setMagneticOffset] = React.useState({});
  const [isFannedOut, setIsFannedOut] = React.useState(false);

  const cardsText = config?.cards || "Card 1,Card 2,Card 3,Card 4,Card 5";
  const cards = cardsText.split(',').map(c => c.trim());
  const cardColor = config?.cardColor || "#27272A";
  const textColor = config?.textColor || "#FAFAFA";
  const backgroundColor = config?.backgroundColor || "#18181B";

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    setMagneticOffset(prev => ({ ...prev, [index]: { x: deltaX, y: deltaY } }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', fontFamily: 'system-ui' }}>
      <div style={{ position: 'relative', width: '400px', height: '500px', perspective: '1200px' }}>
        {cards.map((card, i) => {
          const offset = magneticOffset[i] || { x: 0, y: 0 };
          const isHovered = hoveredIndex === i;
          const stackOffset = isFannedOut ? i * 80 : i * 10;
          const rotation = isFannedOut ? (i - cards.length / 2) * 15 : i * 2;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => { setHoveredIndex(null); setMagneticOffset(prev => ({ ...prev, [i]: { x: 0, y: 0 } })); }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onClick={() => setIsFannedOut(!isFannedOut)}
              style={{
                position: 'absolute',
                top: 0,
                left: isFannedOut ? stackOffset + 'px' : '50%',
                width: '100%',
                height: '100%',
                backgroundColor: cardColor,
                borderRadius: '16px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transform: isFannedOut 
                  ? `translateX(0) translateY(${isHovered ? -20 : 0}px) rotate(${rotation}deg) scale(${isHovered ? 1.05 : 1})`
                  : `translate(${-50 + offset.x}%, ${stackOffset + offset.y}px) rotate(${rotation}deg) scale(${isHovered ? 1.1 : 1})`,
                transition: 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease',
                boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.4)' : `0 ${4 + i * 2}px ${12 + i * 4}px rgba(0,0,0,0.2)`,
                zIndex: isHovered ? 100 : cards.length - i,
                transformStyle: 'preserve-3d'
              }}
            >
              <h2 style={{ fontSize: '32px', fontWeight: '500', color: textColor, margin: 0 }}>{card}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
