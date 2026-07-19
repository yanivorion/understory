import React from "react";

const MANIFEST = {
  "type": "Navigation.CircularNavMenu",
  "description": "Luxury circular navigation with product images that scale on hover and clip-path center reveals",
  "editorElement": {
    "selector": ".circular-nav",
    "displayName": "Circular Navigation Menu",
    "archetype": "container",
    "data": {
      "radius": {
        "dataType": "select",
        "displayName": "Orbit Radius",
        "defaultValue": "200",
        "options": ["160", "180", "200", "220", "240"],
        "group": "Layout"
      },
      "itemSize": {
        "dataType": "select",
        "displayName": "Item Size",
        "defaultValue": "100",
        "options": ["80", "90", "100", "110", "120"],
        "group": "Layout"
      },
      "centerSize": {
        "dataType": "select",
        "displayName": "Center Display Size",
        "defaultValue": "320",
        "options": ["280", "300", "320", "360", "400"],
        "group": "Layout"
      },
      "hoverScale": {
        "dataType": "select",
        "displayName": "Hover Scale",
        "defaultValue": "1.2",
        "options": ["1.1", "1.15", "1.2", "1.25", "1.3"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "itemBorderColor": {
        "dataType": "color",
        "displayName": "Item Border Color",
        "defaultValue": "#3F3F46",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "dimOpacity": {
        "dataType": "select",
        "displayName": "Dimmed Opacity",
        "defaultValue": "0.3",
        "options": ["0.2", "0.3", "0.4", "0.5"],
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
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
  const radius = parseInt(config?.radius || "200");
  const itemSize = parseInt(config?.itemSize || "100");
  const centerSize = parseInt(config?.centerSize || "320");
  const hoverScale = parseFloat(config?.hoverScale || "1.2");
  const dimOpacity = parseFloat(config?.dimOpacity || "0.3");
  
  const backgroundColor = config?.backgroundColor || "#18181B";
  const itemBorderColor = config?.itemBorderColor || "#3F3F46";
  const textColor = config?.textColor || "#FAFAFA";
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const items = [
    { 
      title: "Minimal Watch", 
      price: "$495",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop"
    },
    { 
      title: "Leather Bag", 
      price: "$320",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop"
    },
    { 
      title: "Designer Shoes", 
      price: "$580",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop"
    },
    { 
      title: "Sunglasses", 
      price: "$240",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop"
    },
    { 
      title: "Perfume", 
      price: "$185",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop"
    },
    { 
      title: "Jewelry", 
      price: "$750",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop"
    },
    { 
      title: "Wallet", 
      price: "$95",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop"
    },
    { 
      title: "Scarf", 
      price: "$145",
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=800&fit=crop"
    }
  ];

  const containerStyle = {
    width: '100%',
    minHeight: '800px',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const orbitContainerStyle = {
    position: 'relative',
    width: `${radius * 2 + itemSize}px`,
    height: `${radius * 2 + itemSize}px`
  };

  const getItemPosition = (index) => {
    const angle = (360 / items.length) * index - 90;
    const radians = angle * (Math.PI / 180);
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;
    
    return {
      left: '50%',
      top: '50%',
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
    };
  };

  const getItemStyle = (index) => {
    const isSelected = selectedIndex === index;
    const isHovered = hoveredIndex === index;
    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
    
    return {
      position: 'absolute',
      ...getItemPosition(index),
      width: `${itemSize}px`,
      height: `${itemSize}px`,
      borderRadius: '50%',
      overflow: 'hidden',
      cursor: 'pointer',
      border: `2px solid ${itemBorderColor}`,
      boxShadow: isSelected 
        ? '0 0 0 3px rgba(255,255,255,0.2), 0 8px 24px rgba(0,0,0,0.4)' 
        : '0 4px 12px rgba(0,0,0,0.3)',
      transition: prefersReducedMotion 
        ? 'none'
        : 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease-out, box-shadow 300ms ease-out',
      opacity: isDimmed ? dimOpacity : 1,
      transform: isHovered 
        ? `translate(calc(-50% + ${getItemPosition(index).transform.match(/[-\d.]+px/g)[0]}), calc(-50% + ${getItemPosition(index).transform.match(/[-\d.]+px/g)[1]})) scale(${hoverScale})`
        : getItemPosition(index).transform,
      zIndex: isSelected ? 100 : isHovered ? 50 : 10,
      willChange: 'transform, opacity'
    };
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  };

  const centerStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${centerSize}px`,
    height: `${centerSize}px`,
    borderRadius: '50%',
    overflow: 'hidden',
    border: `3px solid ${itemBorderColor}`,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    clipPath: 'circle(0%)',
    animation: prefersReducedMotion ? 'none' : 'expandCircle 600ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
    animationDelay: '100ms'
  };

  const centerImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const centerInfoStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
    padding: '32px 24px 24px',
    color: textColor
  };

  const centerTitleStyle = {
    fontSize: '24px',
    fontWeight: '400',
    margin: '0 0 4px 0',
    letterSpacing: '0.02em'
  };

  const centerPriceStyle = {
    fontSize: '16px',
    opacity: 0.8,
    margin: 0,
    fontWeight: '300'
  };

  return (
    <>
      <style>{`
        @keyframes expandCircle {
          from { clip-path: circle(0% at 50% 50%); }
          to { clip-path: circle(50% at 50% 50%); }
        }
      `}</style>
      
      <div style={containerStyle} className="circular-nav">
        <div style={orbitContainerStyle}>
          {items.map((item, index) => (
            <div
              key={index}
              style={getItemStyle(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedIndex(index)}
            >
              <img 
                src={item.image} 
                alt={item.title}
                style={imageStyle}
              />
            </div>
          ))}

          <div style={centerStyle} key={selectedIndex}>
            <img 
              src={items[selectedIndex].image} 
              alt={items[selectedIndex].title}
              style={centerImageStyle}
            />
            <div style={centerInfoStyle}>
              <h3 style={centerTitleStyle}>{items[selectedIndex].title}</h3>
              <p style={centerPriceStyle}>{items[selectedIndex].price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { MANIFEST, Component };
export default Component;
