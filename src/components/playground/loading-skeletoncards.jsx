import React from "react";

const MANIFEST = {
  "type": "Loading.SkeletonCards",
  "description": "Loading skeleton cards with animated shimmer effect",
  "editorElement": {
    "selector": ".skeleton-cards",
    "displayName": "Skeleton Loading",
    "archetype": "container",
    "data": {
      "cardCount": {
        "dataType": "select",
        "displayName": "Number of Cards",
        "defaultValue": "3",
        "options": ["1", "2", "3", "4", "6"],
        "group": "Content"
      },
      "showImage": {
        "dataType": "booleanValue",
        "displayName": "Show Image Skeleton",
        "defaultValue": true,
        "group": "Content"
      },
      "showTitle": {
        "dataType": "booleanValue",
        "displayName": "Show Title Skeleton",
        "defaultValue": true,
        "group": "Content"
      },
      "showDescription": {
        "dataType": "booleanValue",
        "displayName": "Show Description Lines",
        "defaultValue": true,
        "group": "Content"
      },
      "descriptionLines": {
        "dataType": "select",
        "displayName": "Description Lines",
        "defaultValue": "3",
        "options": ["1", "2", "3", "4"],
        "group": "Content"
      },
      "animationSpeed": {
        "dataType": "select",
        "displayName": "Animation Speed",
        "defaultValue": "1.5",
        "options": ["1.0", "1.5", "2.0", "2.5"],
        "group": "Animation",
        "description": "Duration in seconds"
      },
      "layout": {
        "dataType": "select",
        "displayName": "Layout",
        "defaultValue": "grid",
        "options": ["grid", "list"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Gap Between Cards",
        "defaultValue": "24",
        "options": ["16", "20", "24", "32"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "12",
        "options": ["0", "8", "12", "16"],
        "group": "Layout"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "20",
        "options": ["16", "20", "24"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "skeletonBaseColor": {
        "dataType": "color",
        "displayName": "Skeleton Base Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "skeletonShimmerColor": {
        "dataType": "color",
        "displayName": "Shimmer Color",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FAFAFA",
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
  // Config values
  const cardCount = parseInt(config?.cardCount || "3");
  const showImage = config?.showImage !== false;
  const showTitle = config?.showTitle !== false;
  const showDescription = config?.showDescription !== false;
  const descriptionLines = parseInt(config?.descriptionLines || "3");
  const animationSpeed = parseFloat(config?.animationSpeed || "1.5");
  const layout = config?.layout || "grid";
  const gap = parseInt(config?.gap || "24");
  const borderRadius = parseInt(config?.borderRadius || "12");
  const cardPadding = parseInt(config?.cardPadding || "20");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const skeletonBaseColor = config?.skeletonBaseColor || "#E4E4E7";
  const skeletonShimmerColor = config?.skeletonShimmerColor || "#F4F4F5";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FAFAFA";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const containerStyle = {
    width: '100%',
    backgroundColor: backgroundColor,
    padding: '24px'
  };

  const gridStyle = {
    display: layout === 'grid' ? 'grid' : 'flex',
    gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'none',
    flexDirection: layout === 'list' ? 'column' : 'row',
    gap: `${gap}px`
  };

  const cardStyle = {
    backgroundColor: cardBackgroundColor,
    borderRadius: `${borderRadius}px`,
    padding: `${cardPadding}px`,
    border: `1px solid ${skeletonBaseColor}`
  };

  const skeletonBaseStyle = {
    backgroundColor: skeletonBaseColor,
    borderRadius: `${borderRadius * 0.5}px`,
    position: 'relative',
    overflow: 'hidden'
  };

  const shimmerKeyframes = `
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `;

  const shimmerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${skeletonShimmerColor}, transparent)`,
    animation: prefersReducedMotion ? 'none' : `shimmer ${animationSpeed}s infinite linear`
  };

  const imageSkeletonStyle = {
    ...skeletonBaseStyle,
    width: '100%',
    height: '180px',
    marginBottom: `${cardPadding * 0.75}px`
  };

  const titleSkeletonStyle = {
    ...skeletonBaseStyle,
    width: '70%',
    height: '20px',
    marginBottom: `${cardPadding * 0.5}px`
  };

  const lineSkeletonStyle = (width) => ({
    ...skeletonBaseStyle,
    width: width,
    height: '14px',
    marginBottom: '8px'
  });

  return (
    <div className="skeleton-cards" style={containerStyle}>
      <style>{shimmerKeyframes}</style>
      
      <div style={gridStyle}>
        {Array.from({ length: cardCount }).map((_, index) => (
          <div key={index} style={cardStyle}>
            {showImage && (
              <div style={imageSkeletonStyle}>
                <div style={shimmerStyle} />
              </div>
            )}
            
            {showTitle && (
              <div style={titleSkeletonStyle}>
                <div style={shimmerStyle} />
              </div>
            )}
            
            {showDescription && Array.from({ length: descriptionLines }).map((_, lineIndex) => (
              <div
                key={lineIndex}
                style={lineSkeletonStyle(
                  lineIndex === descriptionLines - 1 ? '60%' : '100%'
                )}
              >
                <div style={shimmerStyle} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
