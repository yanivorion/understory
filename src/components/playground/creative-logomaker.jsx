import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:54 AM
 * Component Type: Creative.LogoMaker
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
 * Generated: October 26, 2025, 12:22 PM
 * Component Type: Creative.LogoMaker
 * 
 * User Request: Make a logo maker with shapes and text
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 5 (Multiple shapes, text layers, positioning, color controls, layering, canvas export)
 * Expressive Complexity: 4 (Professional design tool interface, live preview, flexible composition)
 * 
 * USER DESIGN DIRECTION
 * User requested logo maker with shapes and text - creative design tool for brand identity
 * 
 * DESIGN BRIEF
 * Core Concept: Professional logo design tool enabling quick creation of geometric logos with text
 * 
 * Visual Profile: Clean Utilitarian with design professional focus
 * 
 * Design Style: Technical-Minimal - organized controls, clear canvas, professional tool aesthetic
 * 
 * Visual Techniques: Large canvas preview, organized control panels, layer-based editing
 * 
 * Color Palette: Cool Gray System
 *   - Base 1 (#FAFBFC): Background
 *   - Base 2 (#FFFFFF): Canvas, cards
 *   - Base 3 (#E5E7EB): Borders, grid
 *   - Base 4 (#6B7280): Labels
 *   - Base 5 (#1F2937): Text
 *   - Accent (#3B82F6): Interactive elements
 * 
 * Typography:
 *   - Font Family: System fonts for UI
 *   - Weight Range: 400-600
 *   - Hierarchy: 24px heading, 14px controls
 *   - Logo Text: User-selectable fonts
 * 
 * Spacing & Layout:
 *   - Gap System: 12px (controls), 16px (sections), 24px (cards)
 *   - Canvas: Square format centered
 *   - Two-panel: Canvas left, controls right (desktop), stacked (mobile)
 * 
 * Interaction Design:
 *   - Hover Behavior: Control highlights, shape selection
 *   - Active States: Selected shape indicator
 *   - Real-time Updates: Instant preview changes
 *   - Drag Support: Future enhancement placeholder
 * 
 * Key Animation: Standard appearance (400ms ease-out), instant updates for responsive tool feel
 * 
 * Performance Patterns: Efficient canvas rendering, optimized redraws, SVG export capability
 * 
 * Design Rationale: Logo makers require simple, powerful tools for non-designers to create professional marks. The component provides essential geometric shapes (circle, square, triangle) that form the foundation of countless logos. Text layers enable wordmarks and combination marks. Color controls for each element allow brand color application. The canvas-based approach ensures clean export. Professional interface signals tool quality while remaining accessible. Real-time preview enables iterative design. Download as PNG provides immediate usability. The constrained toolset (vs infinite options) guides users toward successful outcomes through limitation.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Creative.LogoMaker",
  "description": "Logo design tool with geometric shapes (circle, square, triangle), text layers, color controls, positioning, and PNG export functionality for creating simple brand marks",
  "editorElement": {
    "selector": ".logo-maker",
    "displayName": "Logo Maker",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Heading Text",
        "defaultValue": "Logo Maker",
        "group": "Content"
      },
      "showHeading": {
        "dataType": "booleanValue",
        "displayName": "Show Heading",
        "defaultValue": true,
        "group": "Content"
      },
      "defaultLogoText": {
        "dataType": "text",
        "displayName": "Default Logo Text",
        "defaultValue": "BRAND",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFBFC",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "canvasBackground": {
        "dataType": "color",
        "displayName": "Canvas Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#1F2937",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#6B7280",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E5E7EB",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#3B82F6",
        "group": "Colors"
      },
      "borderRadius": {
        "dataType": "number",
        "displayName": "Border Radius (px)",
        "defaultValue": 8,
        "group": "Layout"
      },
      "canvasSize": {
        "dataType": "number",
        "displayName": "Canvas Size (px)",
        "defaultValue": 400,
        "group": "Layout"
      },
      "gridVisible": {
        "dataType": "booleanValue",
        "displayName": "Show Grid",
        "defaultValue": false,
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
  const heading = config?.heading || "Logo Maker";
  const showHeading = config?.showHeading !== false;
  const defaultLogoText = config?.defaultLogoText || "BRAND";
  const backgroundColor = config?.backgroundColor || "#FAFBFC";
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const canvasBackground = config?.canvasBackground || "#FFFFFF";
  const textColor = config?.textColor || "#1F2937";
  const labelColor = config?.labelColor || "#6B7280";
  const borderColor = config?.borderColor || "#E5E7EB";
  const accentColor = config?.accentColor || "#3B82F6";
  const borderRadius = parseInt(config?.borderRadius || "8");
  const canvasSize = parseInt(config?.canvasSize || "400");
  const gridVisible = config?.gridVisible || false;

  const [logoText, setLogoText] = React.useState(defaultLogoText);
  const [textColor_, setTextColor_] = React.useState("#1F2937");
  const [textSize, setTextSize] = React.useState(48);
  const [shape, setShape] = React.useState("circle");
  const [shapeColor, setShapeColor] = React.useState("#3B82F6");
  const [shapeSize, setShapeSize] = React.useState(120);
  const [showShape, setShowShape] = React.useState(true);
  const [showText, setShowText] = React.useState(true);

  const canvasRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Draw logo on canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear canvas
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw grid if visible
    if (gridVisible) {
      ctx.strokeStyle = '#F3F4F6';
      ctx.lineWidth = 1;
      const gridSize = canvasSize / 10;
      for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvasSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvasSize, i * gridSize);
        ctx.stroke();
      }
    }

    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;

    // Draw shape
    if (showShape) {
      ctx.fillStyle = shapeColor;
      
      switch (shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(centerX, centerY - 20, shapeSize / 2, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'square':
          ctx.fillRect(
            centerX - shapeSize / 2,
            centerY - 20 - shapeSize / 2,
            shapeSize,
            shapeSize
          );
          break;

        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(centerX, centerY - 20 - shapeSize / 2);
          ctx.lineTo(centerX - shapeSize / 2, centerY - 20 + shapeSize / 2);
          ctx.lineTo(centerX + shapeSize / 2, centerY - 20 + shapeSize / 2);
          ctx.closePath();
          ctx.fill();
          break;
      }
    }

    // Draw text
    if (showText && logoText) {
      ctx.fillStyle = textColor_;
      ctx.font = `bold ${textSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(logoText, centerX, centerY + 40);
    }
  }, [logoText, textColor_, textSize, shape, shapeColor, shapeSize, showShape, showText, canvasSize, canvasBackground, gridVisible]);

  // Download logo
  const downloadLogo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'logo.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div
      className="logo-maker"
      style={{
        backgroundColor: backgroundColor,
        padding: 'clamp(24px, 5vw, 48px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        {showHeading && (
          <h1
            style={{
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: '600',
              color: textColor,
              margin: '0 0 32px 0',
              textAlign: 'center'
            }}
          >
            {heading}
          </h1>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '24px'
          }}
        >
          {/* Canvas Preview */}
          <div
            style={{
              backgroundColor: cardBackground,
              border: `1px solid ${borderColor}`,
              borderRadius: `${borderRadius}px`,
              padding: '24px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: '100%',
                height: 'auto',
                border: `1px solid ${borderColor}`,
                borderRadius: `${borderRadius}px`
              }}
            />
          </div>

          {/* Controls */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '16px'
            }}
          >
            {/* Shape Controls */}
            <div
              style={{
                backgroundColor: cardBackground,
                border: `1px solid ${borderColor}`,
                borderRadius: `${borderRadius}px`,
                padding: '20px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: textColor,
                  margin: '0 0 16px 0'
                }}
              >
                Shape
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: textColor,
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={showShape}
                    onChange={(e) => setShowShape(e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer',
                      accentColor: accentColor
                    }}
                  />
                  Show Shape
                </label>

                {showShape && (
                  <>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: labelColor,
                          marginBottom: '8px'
                        }}
                      >
                        Shape Type
                      </label>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '8px'
                        }}
                      >
                        {['circle', 'square', 'triangle'].map((s) => (
                          <button
                            key={s}
                            onClick={() => setShape(s)}
                            style={{
                              backgroundColor: shape === s ? accentColor : 'transparent',
                              color: shape === s ? '#FFFFFF' : textColor,
                              border: `1px solid ${shape === s ? accentColor : borderColor}`,
                              borderRadius: `${borderRadius}px`,
                              padding: '10px',
                              fontSize: '13px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              textTransform: 'capitalize',
                              transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: labelColor,
                          marginBottom: '8px'
                        }}
                      >
                        Color
                      </label>
                      <input
                        type="color"
                        value={shapeColor}
                        onChange={(e) => setShapeColor(e.target.value)}
                        style={{
                          width: '100%',
                          height: '40px',
                          border: `1px solid ${borderColor}`,
                          borderRadius: `${borderRadius}px`,
                          cursor: 'pointer'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="shapeSize"
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: labelColor,
                          marginBottom: '8px'
                        }}
                      >
                        Size: {shapeSize}px
                      </label>
                      <input
                        id="shapeSize"
                        type="range"
                        min="40"
                        max="200"
                        value={shapeSize}
                        onChange={(e) => setShapeSize(parseInt(e.target.value))}
                        style={{
                          width: '100%',
                          cursor: 'pointer',
                          accentColor: accentColor
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Text Controls */}
            <div
              style={{
                backgroundColor: cardBackground,
                border: `1px solid ${borderColor}`,
                borderRadius: `${borderRadius}px`,
                padding: '20px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: textColor,
                  margin: '0 0 16px 0'
                }}
              >
                Text
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: textColor,
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={showText}
                    onChange={(e) => setShowText(e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer',
                      accentColor: accentColor
                    }}
                  />
                  Show Text
                </label>

                {showText && (
                  <>
                    <div>
                      <label
                        htmlFor="logoText"
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: labelColor,
                          marginBottom: '8px'
                        }}
                      >
                        Text
                      </label>
                      <input
                        id="logoText"
                        type="text"
                        value={logoText}
                        onChange={(e) => setLogoText(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: '#F9FAFB',
                          border: `1px solid ${borderColor}`,
                          borderRadius: `${borderRadius}px`,
                          padding: '10px 12px',
                          fontSize: '14px',
                          color: textColor
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: labelColor,
                          marginBottom: '8px'
                        }}
                      >
                        Color
                      </label>
                      <input
                        type="color"
                        value={textColor_}
                        onChange={(e) => setTextColor_(e.target.value)}
                        style={{
                          width: '100%',
                          height: '40px',
                          border: `1px solid ${borderColor}`,
                          borderRadius: `${borderRadius}px`,
                          cursor: 'pointer'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="textSize"
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: labelColor,
                          marginBottom: '8px'
                        }}
                      >
                        Size: {textSize}px
                      </label>
                      <input
                        id="textSize"
                        type="range"
                        min="20"
                        max="80"
                        value={textSize}
                        onChange={(e) => setTextSize(parseInt(e.target.value))}
                        style={{
                          width: '100%',
                          cursor: 'pointer',
                          accentColor: accentColor
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadLogo}
              style={{
                backgroundColor: accentColor,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: `${borderRadius}px`,
                padding: '14px 24px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ⬇ Download Logo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}