import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:42 AM
 * Component Type: Gallery.GridHoverEffects
 * 
* User Request: N/A
*
* Design Brief:
* N/A
 * ============================================================================
 */

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: October 26, 2025, 12:16 PM
 * Component Type: Gallery.GridHoverEffects
 * 
 * User Request: Make a grid gallery with hover effects
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 4 (Responsive grid layout, hover state management, category filtering logic, smooth transitions)
 * Expressive Complexity: 3 (Elegant hover reveals, smooth scale effects, refined overlay transitions)
 * 
 * USER DESIGN DIRECTION
 * User requested "grid gallery with hover effects" - implies a clean grid layout where images reveal additional information or visual effects on hover.
 * 
 * DESIGN BRIEF
 * Core Concept: A sophisticated grid gallery where images are arranged in a clean, uniform layout with elegant hover interactions that reveal captions, zoom effects, or overlay information, creating an engaging browsing experience without overwhelming the viewer.
 * 
 * Visual Profile: Sophisticated, Clean, Contemporary
 * 
 * Design Style: Contemporary Minimal with refined interaction design
 * 
 * Visual Techniques: Subtle scale on hover, smooth overlay transitions, elegant caption reveals, optional color tint overlays, refined shadow enhancement
 * 
 * Color Palette: Cool Gray System
 *   - Base 1 (#FAFBFC): Gallery background
 *   - Base 2 (#FFFFFF): Card backgrounds (if needed)
 *   - Base 3 (#E5E7EB): Subtle borders
 *   - Base 4 (#1F2937): Text and overlay backgrounds
 *   - Accent (#3B82F6): Hover state highlights, optional overlay tint
 * 
 * Typography:
 *   - Font Family: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
 *   - Weight Range: 400-500 for captions and titles
 *   - Hierarchy: Image-first, text reveals on interaction
 *   - Special Treatment: Captions fade in from bottom on hover
 * 
 * Spacing & Layout:
 *   - Gap System: 16px between grid items for balanced density
 *   - Padding Strategy: No internal padding on images (full bleed), padding on overlay text
 *   - Responsive Strategy:
 *     * Mobile: 1-2 columns
 *     * Tablet: 3 columns
 *     * Desktop: 4-5 columns
 *   - Layout: CSS Grid with auto-fit for fluid responsiveness
 * 
 * Interaction Design:
 *   - Hover Behavior: 
 *     * Image: Subtle scale (1.05) with smooth overlay fade-in
 *     * Overlay: Dark gradient from bottom with caption text
 *     * Optional: Slight brightness increase on image
 *   - Transition Timing: 300ms ease-out for scale, 250ms ease-out for overlay
 *   - Click Action: Optional link or lightbox trigger
 *   - Focus Treatment: Clear outline with offset for keyboard navigation
 * 
 * Key Animation: Scale transform on hover (1 → 1.05, 300ms ease-out), overlay opacity (0 → 1, 250ms ease-out), caption translateY (10px → 0, 300ms ease-out)
 * 
 * Performance Patterns:
 *   - CSS transforms for scale (GPU-accelerated)
 *   - Lazy loading images with Intersection Observer
 *   - Optimized hover transitions (no layout shifts)
 *   - will-change: transform on grid items
 * 
 * Design Rationale: Grid galleries are the backbone of modern web design - they're familiar, scannable, and infinitely scalable. The hover effect transforms static images into interactive discoveries without being intrusive. The subtle scale (1.05 rather than dramatic 1.1+) maintains sophistication while providing clear feedback. The gradient overlay from bottom ensures text remains readable while keeping focus on the image. This approach works universally - from photography portfolios to product catalogs to team member grids. The Cool Gray palette stays neutral, letting image content define the aesthetic while maintaining a polished, professional container.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Gallery.GridHoverEffects",
  "description": "Clean grid gallery with sophisticated hover effects including subtle scale, overlay reveals, and elegant caption transitions for engaging image browsing",
  "editorElement": {
    "selector": ".grid-hover-gallery",
    "displayName": "Grid Gallery with Hover Effects",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Images (JSON Array)",
        "defaultValue": JSON.stringify([
          { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", caption: "Mountain Vista", subcaption: "Nature Photography" },
          { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800", caption: "Forest Path", subcaption: "Landscape" },
          { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800", caption: "Desert Sunset", subcaption: "Travel" },
          { url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800", caption: "Misty Valley", subcaption: "Atmospheric" },
          { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", caption: "Wild Trail", subcaption: "Adventure" },
          { url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800", caption: "Alpine Lake", subcaption: "Scenic" },
          { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", caption: "Ocean Waves", subcaption: "Coastal" },
          { url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800", caption: "Starry Night", subcaption: "Astrophotography" },
          { url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800", caption: "Sunset Beach", subcaption: "Tropical" },
          { url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800", caption: "Mountain Peak", subcaption: "Alpine" },
          { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800", caption: "Lake Reflection", subcaption: "Serene" },
          { url: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800", caption: "Canyon View", subcaption: "Geological" }
        ]),
        "group": "Content",
        "description": "Array of image objects with url, caption, and optional subcaption"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFBFC",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Overlay Background",
        "defaultValue": "#1F2937",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#3B82F6",
        "group": "Colors"
      },
      "gridGap": {
        "dataType": "number",
        "displayName": "Grid Gap (px)",
        "defaultValue": 16,
        "group": "Layout"
      },
      "columnMinWidth": {
        "dataType": "number",
        "displayName": "Column Min Width (px)",
        "defaultValue": 280,
        "group": "Layout"
      },
      "imageAspectRatio": {
        "dataType": "select",
        "displayName": "Image Aspect Ratio",
        "defaultValue": "4/3",
        "options": ["1/1", "4/3", "3/2", "16/9"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "number",
        "displayName": "Border Radius (px)",
        "defaultValue": 8,
        "group": "Layout"
      },
      "hoverEffect": {
        "dataType": "select",
        "displayName": "Hover Effect Type",
        "defaultValue": "overlay",
        "options": ["overlay", "zoom", "lift", "overlay-zoom"],
        "group": "Animation",
        "description": "Type of hover interaction"
      },
      "hoverScale": {
        "dataType": "select",
        "displayName": "Hover Scale Amount",
        "defaultValue": "1.05",
        "options": ["1.03", "1.05", "1.08", "1.1"],
        "group": "Animation"
      },
      "transitionDuration": {
        "dataType": "select",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "300",
        "options": ["200", "250", "300", "400"],
        "group": "Animation"
      },
      "showSubcaptions": {
        "dataType": "booleanValue",
        "displayName": "Show Subcaptions",
        "defaultValue": true,
        "group": "Content"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const imagesData = config?.images || JSON.stringify([
    { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", caption: "Mountain Vista", subcaption: "Nature Photography" },
    { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800", caption: "Forest Path", subcaption: "Landscape" },
    { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800", caption: "Desert Sunset", subcaption: "Travel" },
    { url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800", caption: "Misty Valley", subcaption: "Atmospheric" },
    { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", caption: "Wild Trail", subcaption: "Adventure" },
    { url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800", caption: "Alpine Lake", subcaption: "Scenic" },
    { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", caption: "Ocean Waves", subcaption: "Coastal" },
    { url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800", caption: "Starry Night", subcaption: "Astrophotography" },
    { url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800", caption: "Sunset Beach", subcaption: "Tropical" },
    { url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800", caption: "Mountain Peak", subcaption: "Alpine" },
    { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800", caption: "Lake Reflection", subcaption: "Serene" },
    { url: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800", caption: "Canyon View", subcaption: "Geological" }
  ]);
  
  const images = typeof imagesData === 'string' ? JSON.parse(imagesData) : imagesData;
  const backgroundColor = config?.backgroundColor || "#FAFBFC";
  const overlayColor = config?.overlayColor || "#1F2937";
  const textColor = config?.textColor || "#FFFFFF";
  const accentColor = config?.accentColor || "#3B82F6";
  const gridGap = parseInt(config?.gridGap || "16");
  const columnMinWidth = parseInt(config?.columnMinWidth || "280");
  const imageAspectRatio = config?.imageAspectRatio || "4/3";
  const borderRadius = parseInt(config?.borderRadius || "8");
  const hoverEffect = config?.hoverEffect || "overlay";
  const hoverScale = parseFloat(config?.hoverScale || "1.05");
  const transitionDuration = parseInt(config?.transitionDuration || "300");
  const showSubcaptions = config?.showSubcaptions !== false;

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const duration = prefersReducedMotion ? 0 : transitionDuration;

  // Get hover styles based on effect type
  const getHoverStyles = (isHovered) => {
    if (prefersReducedMotion) return {};
    
    const baseStyles = {
      transition: `all ${duration}ms ease-out`
    };

    switch(hoverEffect) {
      case 'zoom':
        return {
          ...baseStyles,
          transform: isHovered ? `scale(${hoverScale})` : 'scale(1)'
        };
      case 'lift':
        return {
          ...baseStyles,
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? '0 12px 24px rgba(0,0,0,0.15), 0 24px 48px rgba(0,0,0,0.12)'
            : '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)'
        };
      case 'overlay-zoom':
        return {
          ...baseStyles,
          transform: isHovered ? `scale(${hoverScale})` : 'scale(1)'
        };
      case 'overlay':
      default:
        return baseStyles;
    }
  };

  return (
    <div
      className="grid-hover-gallery"
      style={{
        backgroundColor: backgroundColor,
        padding: '48px 24px',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${columnMinWidth}px, 1fr))`,
          gap: `${gridGap}px`,
          maxWidth: '1600px',
          margin: '0 auto'
        }}
      >
        {images.map((image, index) => {
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              tabIndex={0}
              role="button"
              aria-label={image.caption || `Image ${index + 1}`}
              style={{
                aspectRatio: imageAspectRatio,
                position: 'relative',
                borderRadius: `${borderRadius}px`,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: hoverEffect === 'lift' 
                  ? (isHovered 
                    ? '0 12px 24px rgba(0,0,0,0.15), 0 24px 48px rgba(0,0,0,0.12)'
                    : '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)')
                  : '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
                outline: 'none',
                ...getHoverStyles(isHovered)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Handle click action here
                }
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={image.url}
                  alt={image.caption || ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transform: (hoverEffect === 'zoom' || hoverEffect === 'overlay-zoom') && isHovered && !prefersReducedMotion
                      ? `scale(${hoverScale})`
                      : 'scale(1)',
                    transition: prefersReducedMotion ? 'none' : `transform ${duration}ms ease-out`,
                    filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
                  }}
                />
              </div>

              {/* Overlay */}
              {(hoverEffect === 'overlay' || hoverEffect === 'overlay-zoom') && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: `linear-gradient(to top, ${overlayColor}, transparent)`,
                    padding: '48px 20px 20px',
                    opacity: isHovered ? 1 : 0,
                    transition: prefersReducedMotion ? 'none' : `opacity ${duration * 0.8}ms ease-out`,
                    pointerEvents: 'none'
                  }}
                >
                  <div
                    style={{
                      transform: isHovered && !prefersReducedMotion ? 'translateY(0)' : 'translateY(10px)',
                      transition: prefersReducedMotion ? 'none' : `transform ${duration}ms ease-out`,
                      opacity: isHovered ? 1 : 0
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color: textColor,
                        fontSize: '18px',
                        fontWeight: '500',
                        marginBottom: showSubcaptions && image.subcaption ? '6px' : 0
                      }}
                    >
                      {image.caption}
                    </h3>
                    {showSubcaptions && image.subcaption && (
                      <p
                        style={{
                          margin: 0,
                          color: textColor,
                          fontSize: '14px',
                          fontWeight: '400',
                          opacity: 0.8
                        }}
                      >
                        {image.subcaption}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Always-visible caption for lift effect */}
              {hoverEffect === 'lift' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: overlayColor,
                    padding: '16px 20px',
                    pointerEvents: 'none'
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: textColor,
                      fontSize: '16px',
                      fontWeight: '500',
                      marginBottom: showSubcaptions && image.subcaption ? '4px' : 0
                    }}
                  >
                    {image.caption}
                  </h3>
                  {showSubcaptions && image.subcaption && (
                    <p
                      style={{
                        margin: 0,
                        color: textColor,
                        fontSize: '13px',
                        fontWeight: '400',
                        opacity: 0.8
                      }}
                    >
                      {image.subcaption}
                    </p>
                  )}
                </div>
              )}

              {/* Focus indicator */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: isHovered ? `2px solid ${accentColor}` : 'none',
                  borderRadius: `${borderRadius}px`,
                  pointerEvents: 'none',
                  transition: prefersReducedMotion ? 'none' : 'border 200ms ease-out'
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
