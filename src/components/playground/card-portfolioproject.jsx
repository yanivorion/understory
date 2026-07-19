import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 21, 2025, 09:24 AM
 * Component Type: Card.PortfolioProject
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Card.PortfolioProject",
  "description": "Polished portfolio project card with image, title, description, tags, and elegant hover interactions",
  "editorElement": {
    "selector": ".portfolio-card-container",
    "displayName": "Portfolio Project Card",
    "archetype": "container",
    "data": {
      "imageUrl": {
        "dataType": "text",
        "displayName": "Project Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "group": "Content"
      },
      "title": {
        "dataType": "text",
        "displayName": "Project Title",
        "defaultValue": "Brand Identity Redesign",
        "group": "Content"
      },
      "description": {
        "dataType": "text",
        "displayName": "Project Description",
        "defaultValue": "A comprehensive brand identity system for a tech startup, including logo design, color palette, typography, and brand guidelines.",
        "group": "Content"
      },
      "tags": {
        "dataType": "text",
        "displayName": "Tags (comma-separated)",
        "defaultValue": "Brand Design, UI/UX, Strategy",
        "group": "Content"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "View Project",
        "group": "Content"
      },
      "showCta": {
        "dataType": "booleanValue",
        "displayName": "Show CTA Button",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "descriptionColor": {
        "dataType": "color",
        "displayName": "Description Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "tagBackgroundColor": {
        "dataType": "color",
        "displayName": "Tag Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "tagTextColor": {
        "dataType": "color",
        "displayName": "Tag Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "ctaTextColor": {
        "dataType": "color",
        "displayName": "CTA Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "ctaBorderColor": {
        "dataType": "color",
        "displayName": "CTA Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "ctaHoverColor": {
        "dataType": "color",
        "displayName": "CTA Hover Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue", "Georgia"],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "number",
        "displayName": "Title Size (px)",
        "defaultValue": 20,
        "group": "Typography"
      },
      "descriptionSize": {
        "dataType": "number",
        "displayName": "Description Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "tagSize": {
        "dataType": "number",
        "displayName": "Tag Size (px)",
        "defaultValue": 12,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "cardBorderRadius": {
        "dataType": "select",
        "displayName": "Card Border Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px", "16px"],
        "group": "Layout"
      },
      "imageBorderRadius": {
        "dataType": "select",
        "displayName": "Image Border Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "24px",
        "options": ["16px", "20px", "24px", "32px"],
        "group": "Layout"
      },
      "cardMaxWidth": {
        "dataType": "select",
        "displayName": "Card Max Width",
        "defaultValue": "400px",
        "options": ["320px", "360px", "400px", "480px", "100%"],
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
  const [isHovered, setIsHovered] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const imageUrl = config?.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop";
  const title = config?.title || "Brand Identity Redesign";
  const description = config?.description || "A comprehensive brand identity system for a tech startup, including logo design, color palette, typography, and brand guidelines.";
  const tags = (config?.tags || "Brand Design, UI/UX, Strategy").split(',').map(t => t.trim()).filter(t => t);
  const ctaText = config?.ctaText || "View Project";
  const showCta = config?.showCta !== false;
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FFFFFF";
  const borderColor = config?.borderColor || "#E9ECEF";
  const titleColor = config?.titleColor || "#212529";
  const descriptionColor = config?.descriptionColor || "#495057";
  const tagBackgroundColor = config?.tagBackgroundColor || "#F8F9FA";
  const tagTextColor = config?.tagTextColor || "#495057";
  const ctaTextColor = config?.ctaTextColor || "#495057";
  const ctaBorderColor = config?.ctaBorderColor || "#E9ECEF";
  const ctaHoverColor = config?.ctaHoverColor || "#212529";
  
  const fontFamily = config?.fontFamily || "system-ui";
  const titleSize = config?.titleSize || 20;
  const descriptionSize = config?.descriptionSize || 14;
  const tagSize = config?.tagSize || 12;
  const fontWeight = config?.fontWeight || "400";
  
  const cardBorderRadius = config?.cardBorderRadius || "8px";
  const imageBorderRadius = config?.imageBorderRadius || "8px";
  const cardPadding = config?.cardPadding || "24px";
  const cardMaxWidth = config?.cardMaxWidth || "400px";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div 
      className="portfolio-card-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: cardBackgroundColor,
          border: `1px solid ${borderColor}`,
          borderRadius: cardBorderRadius,
          maxWidth: cardMaxWidth,
          width: '100%',
          overflow: 'hidden',
          boxShadow: prefersReducedMotion 
            ? '0 1px 3px rgba(0,0,0,0.06)' 
            : (isHovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.06)'),
          transform: prefersReducedMotion 
            ? 'translateY(0)' 
            : (isHovered ? 'translateY(-4px)' : 'translateY(0)'),
          transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out',
          cursor: 'pointer'
        }}
      >
        {/* Image Container */}
        <div style={{
          width: '100%',
          height: '240px',
          backgroundColor: '#F1F3F5',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: imageBorderRadius
        }}>
          <img
            src={imageUrl}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transform: prefersReducedMotion 
                ? 'scale(1)' 
                : (isHovered ? 'scale(1.05)' : 'scale(1)'),
              transition: prefersReducedMotion ? 'opacity 300ms ease-out' : 'all 500ms ease-out'
            }}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#F1F3F5',
              animation: prefersReducedMotion ? 'none' : 'pulse 1.5s ease-in-out infinite'
            }} />
          )}
        </div>

        {/* Content */}
        <div style={{
          padding: cardPadding
        }}>
          {/* Title */}
          <h3 style={{
            margin: '0 0 12px 0',
            fontSize: `${titleSize}px`,
            fontWeight: '500',
            color: titleColor,
            lineHeight: '1.3',
            letterSpacing: '-0.01em'
          }}>
            {title}
          </h3>

          {/* Description */}
          <p style={{
            margin: '0 0 16px 0',
            fontSize: `${descriptionSize}px`,
            fontWeight,
            color: descriptionColor,
            lineHeight: '1.6'
          }}>
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: showCta ? '20px' : '0'
            }}>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: tagBackgroundColor,
                    color: tagTextColor,
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: `${tagSize}px`,
                    fontWeight: '500',
                    letterSpacing: '0.01em',
                    opacity: 0,
                    transform: 'translateY(10px)',
                    animation: prefersReducedMotion ? 'none' : `tagAppear 400ms ease-out ${index * 50}ms forwards`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA Button */}
          {showCta && (
            <button
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: 'transparent',
                color: isHovered && !prefersReducedMotion ? ctaHoverColor : ctaTextColor,
                border: `1px solid ${isHovered && !prefersReducedMotion ? ctaHoverColor : ctaBorderColor}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                fontFamily
              }}
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes tagAppear {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
