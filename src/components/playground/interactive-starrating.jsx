import React from "react";

const MANIFEST = {
  "type": "Interactive.StarRating",
  "description": "Star rating component with half-star precision, hover preview, and smooth animations",
  "editorElement": {
    "selector": ".star-rating",
    "displayName": "Star Rating",
    "archetype": "container",
    "data": {
      "maxStars": {
        "dataType": "select",
        "displayName": "Max Stars",
        "defaultValue": "5",
        "options": ["3", "5", "7", "10"],
        "group": "Content"
      },
      "defaultRating": {
        "dataType": "select",
        "displayName": "Default Rating",
        "defaultValue": "3.5",
        "options": ["0", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"],
        "group": "Content"
      },
      "allowHalfStars": {
        "dataType": "booleanValue",
        "displayName": "Allow Half Stars",
        "defaultValue": true,
        "group": "Content"
      },
      "showLabel": {
        "dataType": "booleanValue",
        "displayName": "Show Label",
        "defaultValue": true,
        "group": "Content"
      },
      "showCount": {
        "dataType": "booleanValue",
        "displayName": "Show Rating Count",
        "defaultValue": true,
        "group": "Content"
      },
      "starSize": {
        "dataType": "select",
        "displayName": "Star Size",
        "defaultValue": "32",
        "options": ["24", "28", "32", "40", "48"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "starColor": {
        "dataType": "color",
        "displayName": "Star Color",
        "defaultValue": "#FFC107",
        "group": "Colors"
      },
      "emptyStarColor": {
        "dataType": "color",
        "displayName": "Empty Star Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
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
  const maxStars = parseInt(config?.maxStars || '5');
  const defaultRating = parseFloat(config?.defaultRating || '3.5');
  const allowHalfStars = config?.allowHalfStars !== false;
  const showLabel = config?.showLabel !== false;
  const showCount = config?.showCount !== false;
  const starSize = parseInt(config?.starSize || '32');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const starColor = config?.starColor || '#FFC107';
  const emptyStarColor = config?.emptyStarColor || '#E4E4E7';
  const accentColor = config?.accentColor || '#495057';
  
  const [rating, setRating] = React.useState(defaultRating);
  const [hoverRating, setHoverRating] = React.useState(null);
  const [animatedStars, setAnimatedStars] = React.useState(new Set());
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const displayRating = hoverRating !== null ? hoverRating : rating;
  const ratingCount = 1247; // Mock count
  
  const handleStarClick = (starIndex, isHalf) => {
    const newRating = allowHalfStars && isHalf ? starIndex + 0.5 : starIndex + 1;
    setRating(newRating);
    
    if (!prefersReducedMotion) {
      setAnimatedStars(new Set([starIndex]));
      setTimeout(() => {
        setAnimatedStars(new Set());
      }, 600);
    }
  };
  
  const handleStarHover = (starIndex, isHalf) => {
    const newRating = allowHalfStars && isHalf ? starIndex + 0.5 : starIndex + 1;
    setHoverRating(newRating);
  };
  
  const handleMouseLeave = () => {
    setHoverRating(null);
  };
  
  const getRatingLabel = (rating) => {
    if (rating === 0) return 'Not rated';
    if (rating <= 1) return 'Poor';
    if (rating <= 2) return 'Fair';
    if (rating <= 3) return 'Good';
    if (rating <= 4) return 'Very Good';
    return 'Excellent';
  };
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '40px',
        backgroundColor: `${accentColor}08`,
        borderRadius: '12px',
        border: `1px solid ${accentColor}20`
      }}>
        <div
          style={{
            display: 'flex',
            gap: `${starSize * 0.25}px`,
            position: 'relative'
          }}
          onMouseLeave={handleMouseLeave}
        >
          {Array.from({ length: maxStars }, (_, i) => {
            const starIndex = i;
            const fillAmount = Math.max(0, Math.min(1, displayRating - starIndex));
            const isAnimated = animatedStars.has(starIndex);
            
            return (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: `${starSize}px`,
                  height: `${starSize}px`,
                  cursor: 'pointer',
                  transform: prefersReducedMotion ? 'none' : (isAnimated ? 'scale(1.3)' : 'scale(1)'),
                  transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    fill: emptyStarColor,
                    transition: 'fill 200ms ease-out'
                  }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    fill: starColor,
                    clipPath: `inset(0 ${(1 - fillAmount) * 100}% 0 0)`,
                    transition: 'clip-path 200ms ease-out',
                    filter: hoverRating !== null && hoverRating > starIndex ? 'drop-shadow(0 0 4px rgba(255, 193, 7, 0.5))' : 'none'
                  }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                
                {allowHalfStars && (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '50%',
                        height: '100%',
                        zIndex: 1,
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => handleStarHover(starIndex, true)}
                      onClick={() => handleStarClick(starIndex, true)}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '100%',
                        zIndex: 1,
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => handleStarHover(starIndex, false)}
                      onClick={() => handleStarClick(starIndex, false)}
                    />
                  </>
                )}
                
                {!allowHalfStars && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 1,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => handleStarHover(starIndex, false)}
                    onClick={() => handleStarClick(starIndex, false)}
                  />
                )}
              </div>
            );
          })}
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '500',
            color: textColor,
            letterSpacing: '-0.01em'
          }}>
            {displayRating.toFixed(1)} / {maxStars}
          </div>
          
          {showLabel && (
            <div style={{
              fontSize: '14px',
              fontWeight: '400',
              color: accentColor,
              letterSpacing: '0.025em'
            }}>
              {getRatingLabel(displayRating)}
            </div>
          )}
          
          {showCount && (
            <div style={{
              fontSize: '13px',
              color: accentColor,
              letterSpacing: '0.025em'
            }}>
              Based on {ratingCount.toLocaleString()} reviews
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
