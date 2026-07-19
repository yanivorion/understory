import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:47 AM
 * Component Type: Tools.GradientGenerator
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
 * Generated: October 26, 2025, 11:45 AM
 * Component Type: Tools.GradientGenerator
 * 
 * User Request: Make a gradient generator tool
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 4 (Multiple gradient types, color controls, angle adjustment, code export)
 * Expressive Complexity: 3 (Clean interface with smooth color transitions, live preview updates)
 * 
 * USER DESIGN DIRECTION
 * User requested a gradient generator tool - functional emphasis with creative output
 * 
 * DESIGN BRIEF
 * Core Concept: Professional gradient generator with intuitive controls and live preview, emphasizing clarity and usability
 * 
 * Visual Profile: Clean Utilitarian with Contemporary Minimal influence
 * 
 * Design Style: Technical-Minimal with functional focus - clean interface that prioritizes the gradient preview and provides efficient control access
 * 
 * Visual Techniques: Live gradient preview as hero element, subtle shadows for depth, smooth color transitions
 * 
 * Color Palette: Cool Gray System with vibrant accent for interactive elements
 *   - Base 1 (#FAFBFC): Primary background, card surfaces
 *   - Base 2 (#E5E7EB): Borders, input backgrounds
 *   - Base 3 (#6B7280): Secondary text, labels
 *   - Base 4 (#1F2937): Primary text, headings
 *   - Accent (#3B82F6): Interactive elements, focus states
 * 
 * Typography:
 *   - Font Family: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
 *   - Weight Range: 400-600 (400 for body, 500 for labels, 600 for headings)
 *   - Hierarchy: 24px heading, 14px labels, 13px secondary text
 *   - Special Treatment: Monospace for code output
 * 
 * Spacing & Layout:
 *   - Gap System: 12px (tight), 16px (standard), 24px (sections), 32px (major divisions)
 *   - Padding Strategy: 24px card padding, 12px input padding
 *   - Responsive Strategy: Stack vertically on mobile, side-by-side preview/controls on desktop (min-width: 768px)
 * 
 * Interaction Design:
 *   - Hover Behavior: Subtle background change on buttons (150ms), border color shift on inputs
 *   - Active States: Slight scale reduction on buttons (0.98), darker background
 *   - Focus Treatment: 2px blue outline with 2px offset for keyboard navigation
 *   - Transitions: 200ms ease-out for micro-interactions, instant gradient updates
 * 
 * Key Animation: Standard appearance transition (400ms ease-out opacity + translateY) for initial reveal, instant updates for gradient preview to maintain responsive feel
 * 
 * Performance Patterns: Direct state updates for real-time gradient rendering, efficient color parsing, optimized re-renders with React state batching
 * 
 * Design Rationale: This gradient generator prioritizes usability and clarity - the large preview area lets users see results immediately, while organized controls provide intuitive access to all gradient parameters. The technical-minimal aesthetic keeps focus on the creative output (the gradient) while maintaining a professional, tool-like interface. Monochromatic palette with blue accent prevents color interference with the user's gradient creation. The layout adapts gracefully from mobile to desktop, ensuring accessibility across devices. Real-time updates and smooth transitions create a responsive, professional tool experience.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Tools.GradientGenerator",
  "description": "Professional gradient generator tool with live preview, multiple gradient types (linear, radial, conic), adjustable colors and angles, and CSS code export functionality",
  "editorElement": {
    "selector": ".gradient-generator",
    "displayName": "Gradient Generator",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Heading Text",
        "defaultValue": "Gradient Generator",
        "group": "Content"
      },
      "showHeading": {
        "dataType": "booleanValue",
        "displayName": "Show Heading",
        "defaultValue": true,
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
      "defaultGradientType": {
        "dataType": "select",
        "displayName": "Default Gradient Type",
        "defaultValue": "linear",
        "options": ["linear", "radial", "conic"],
        "group": "Content"
      },
      "defaultColor1": {
        "dataType": "color",
        "displayName": "Default Start Color",
        "defaultValue": "#3B82F6",
        "group": "Content"
      },
      "defaultColor2": {
        "dataType": "color",
        "displayName": "Default End Color",
        "defaultValue": "#8B5CF6",
        "group": "Content"
      },
      "defaultAngle": {
        "dataType": "number",
        "displayName": "Default Angle (degrees)",
        "defaultValue": 135,
        "group": "Content"
      },
      "borderRadius": {
        "dataType": "number",
        "displayName": "Border Radius (px)",
        "defaultValue": 8,
        "group": "Layout"
      },
      "previewHeight": {
        "dataType": "number",
        "displayName": "Preview Height (px)",
        "defaultValue": 300,
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
  const heading = config?.heading || "Gradient Generator";
  const showHeading = config?.showHeading !== false;
  const backgroundColor = config?.backgroundColor || "#FAFBFC";
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const textColor = config?.textColor || "#1F2937";
  const labelColor = config?.labelColor || "#6B7280";
  const borderColor = config?.borderColor || "#E5E7EB";
  const accentColor = config?.accentColor || "#3B82F6";
  const defaultGradientType = config?.defaultGradientType || "linear";
  const defaultColor1 = config?.defaultColor1 || "#3B82F6";
  const defaultColor2 = config?.defaultColor2 || "#8B5CF6";
  const defaultAngle = parseInt(config?.defaultAngle || "135");
  const borderRadius = parseInt(config?.borderRadius || "8");
  const previewHeight = parseInt(config?.previewHeight || "300");

  const [gradientType, setGradientType] = React.useState(defaultGradientType);
  const [color1, setColor1] = React.useState(defaultColor1);
  const [color2, setColor2] = React.useState(defaultColor2);
  const [angle, setAngle] = React.useState(defaultAngle);
  const [copied, setCopied] = React.useState(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Generate gradient CSS
  const generateGradient = () => {
    switch (gradientType) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
      case 'radial':
        return `radial-gradient(circle, ${color1}, ${color2})`;
      case 'conic':
        return `conic-gradient(from ${angle}deg, ${color1}, ${color2})`;
      default:
        return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    }
  };

  const gradientCSS = generateGradient();

  // Copy to clipboard
  const handleCopy = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`background: ${gradientCSS};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Random gradient
  const handleRandomize = () => {
    const randomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    
    setColor1(randomColor());
    setColor2(randomColor());
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <div
      className="gradient-generator"
      style={{
        backgroundColor: backgroundColor,
        padding: 'clamp(24px, 5vw, 48px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
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
          {/* Preview Area */}
          <div
            style={{
              backgroundColor: cardBackground,
              border: `1px solid ${borderColor}`,
              borderRadius: `${borderRadius}px`,
              padding: '24px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)'
            }}
          >
            <div
              style={{
                width: '100%',
                height: `${previewHeight}px`,
                background: gradientCSS,
                borderRadius: `${borderRadius}px`,
                border: `1px solid ${borderColor}`,
                transition: prefersReducedMotion ? 'none' : 'background 0ms'
              }}
            />
            
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div
                style={{
                  backgroundColor: '#F9FAFB',
                  border: `1px solid ${borderColor}`,
                  borderRadius: `${borderRadius}px`,
                  padding: '12px',
                  fontFamily: '"SF Mono", "Monaco", "Cascadia Code", monospace',
                  fontSize: '13px',
                  color: textColor,
                  overflowX: 'auto',
                  whiteSpace: 'nowrap'
                }}
              >
                background: {gradientCSS};
              </div>
              
              <button
                onClick={handleCopy}
                style={{
                  backgroundColor: copied ? '#10B981' : accentColor,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: `${borderRadius}px`,
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                  transform: 'scale(1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.transform = 'scale(0.98)';
                    e.currentTarget.style.backgroundColor = copied ? '#059669' : '#2563EB';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = copied ? '#10B981' : accentColor;
                }}
              >
                {copied ? '✓ Copied!' : 'Copy CSS'}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div
            style={{
              backgroundColor: cardBackground,
              border: `1px solid ${borderColor}`,
              borderRadius: `${borderRadius}px`,
              padding: '24px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              {/* Gradient Type */}
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
                  Gradient Type
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px'
                  }}
                >
                  {['linear', 'radial', 'conic'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setGradientType(type)}
                      style={{
                        backgroundColor: gradientType === type ? accentColor : '#F9FAFB',
                        color: gradientType === type ? '#FFFFFF' : textColor,
                        border: `1px solid ${gradientType === type ? accentColor : borderColor}`,
                        borderRadius: `${borderRadius}px`,
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                        textTransform: 'capitalize'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color 1 */}
              <div>
                <label
                  htmlFor="color1"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: labelColor,
                    marginBottom: '8px'
                  }}
                >
                  Start Color
                </label>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                  }}
                >
                  <input
                    id="color1"
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    style={{
                      width: '60px',
                      height: '40px',
                      border: `1px solid ${borderColor}`,
                      borderRadius: `${borderRadius}px`,
                      cursor: 'pointer'
                    }}
                  />
                  <input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: '#F9FAFB',
                      border: `1px solid ${borderColor}`,
                      borderRadius: `${borderRadius}px`,
                      padding: '10px 12px',
                      fontSize: '14px',
                      color: textColor,
                      fontFamily: '"SF Mono", "Monaco", monospace'
                    }}
                  />
                </div>
              </div>

              {/* Color 2 */}
              <div>
                <label
                  htmlFor="color2"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: labelColor,
                    marginBottom: '8px'
                  }}
                >
                  End Color
                </label>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                  }}
                >
                  <input
                    id="color2"
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    style={{
                      width: '60px',
                      height: '40px',
                      border: `1px solid ${borderColor}`,
                      borderRadius: `${borderRadius}px`,
                      cursor: 'pointer'
                    }}
                  />
                  <input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: '#F9FAFB',
                      border: `1px solid ${borderColor}`,
                      borderRadius: `${borderRadius}px`,
                      padding: '10px 12px',
                      fontSize: '14px',
                      color: textColor,
                      fontFamily: '"SF Mono", "Monaco", monospace'
                    }}
                  />
                </div>
              </div>

              {/* Angle */}
              <div>
                <label
                  htmlFor="angle"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: labelColor,
                    marginBottom: '8px'
                  }}
                >
                  {gradientType === 'linear' ? 'Angle' : 'Rotation'}: {angle}°
                </label>
                <input
                  id="angle"
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    accentColor: accentColor
                  }}
                />
              </div>

              {/* Randomize Button */}
              <button
                onClick={handleRandomize}
                style={{
                  backgroundColor: 'transparent',
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: `${borderRadius}px`,
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                  marginTop: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                🎲 Randomize
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}