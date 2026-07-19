import React from "react";

const MANIFEST = {
  "type": "Layout.BentoParallax",
  "description": "Bento grid layout with parallax depth layers and mouse-based tilt effects",
  "editorElement": {
    "selector": ".bento-parallax",
    "displayName": "Bento Grid Parallax",
    "archetype": "container",
    "data": {
      "gap": {
        "dataType": "select",
        "displayName": "Grid Gap",
        "defaultValue": "20",
        "options": ["12", "16", "20", "24", "32"],
        "group": "Layout"
      },
      "parallaxDepth": {
        "dataType": "select",
        "displayName": "Parallax Depth",
        "defaultValue": "20",
        "options": ["10", "15", "20", "25", "30"],
        "group": "Animation"
      },
      "tiltAmount": {
        "dataType": "select",
        "displayName": "Tilt Amount (degrees)",
        "defaultValue": "3",
        "options": ["2", "3", "4", "5"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "horizontal AndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  
  const gap = parseInt(config?.gap || "20");
  const parallaxDepth = parseInt(config?.parallaxDepth || "20");
  const tiltAmount = parseInt(config?.tiltAmount || "3");
  
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const textColor = config?.textColor || "#212529";
  const borderColor = config?.borderColor || "#E9ECEF";
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const cards = [
    { title: "Analytics Dashboard", desc: "Real-time metrics", span: "1 / 3", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" },
    { title: "Team Collaboration", desc: "Seamless workflow", span: "3 / 5", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" },
    { title: "Project Timeline", desc: "Track progress", span: "1 / 2", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop" },
    { title: "Client Feedback", desc: "Insights & reviews", span: "2 / 4", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" },
    { title: "Revenue Growth", desc: "Financial metrics", span: "4 / 6", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop" },
    { title: "Task Management", desc: "Organize work", span: "1 / 3", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop" },
    { title: "Design System", desc: "Component library", span: "3 / 5", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop" },
    { title: "User Research", desc: "Data insights", span: "5 / 6", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" }
  ];

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
    setHoveredIndex(index);
  };

  const containerStyle = {
    width: '100%',
    minHeight: '1200px',
    backgroundColor,
    padding: '60px 40px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: `${gap}px`,
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const getCardStyle = (index, span) => {
    const isHovered = hoveredIndex === index;
    const rotateX = isHovered ? mousePos.y * tiltAmount : 0;
    const rotateY = isHovered ? mousePos.x * -tiltAmount : 0;
    
    return {
      gridColumn: span,
      minHeight: '280px',
      backgroundColor: cardBackground,
      borderRadius: '16px',
      border: `1px solid ${borderColor}`,
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: isHovered 
        ? '0 20px 60px rgba(0,0,0,0.15)' 
        : '0 4px 12px rgba(0,0,0,0.08)',
      transform: prefersReducedMotion 
        ? 'none'
        : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
      transition: 'box-shadow 300ms ease-out, transform 200ms ease-out',
      position: 'relative',
      willChange: 'transform'
    };
  };

  const imageContainerStyle = (isHovered) => ({
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    position: 'relative'
  });

  const imageStyle = (isHovered) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: prefersReducedMotion 
      ? 'none'
      : `scale(${isHovered ? 1.1 : 1}) translateY(${isHovered ? mousePos.y * -parallaxDepth : 0}px)`,
    transition: 'transform 300ms ease-out'
  });

  const contentStyle = (isHovered) => ({
    padding: '20px',
    transform: prefersReducedMotion 
      ? 'none'
      : `translateY(${isHovered ? mousePos.y * -(parallaxDepth / 2) : 0}px)`,
    transition: 'transform 300ms ease-out'
  });

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '500',
    color: textColor,
    margin: '0 0 4px 0',
    letterSpacing: '-0.01em'
  };

  const descStyle = {
    fontSize: '14px',
    color: textColor,
    opacity: 0.6,
    margin: 0
  };

  return (
    <div style={containerStyle} className="bento-parallax">
      <div style={gridStyle}>
        {cards.map((card, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={index}
              style={getCardStyle(index, card.span)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={imageContainerStyle(isHovered)}>
                <img 
                  src={card.image} 
                  alt={card.title}
                  style={imageStyle(isHovered)}
                />
              </div>
              <div style={contentStyle(isHovered)}>
                <h3 style={titleStyle}>{card.title}</h3>
                <p style={descStyle}>{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
