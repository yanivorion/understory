import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:55 AM
 * Component Type: Tools.ColorPaletteGenerator
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
 * Generated: October 26, 2025, 12:15 PM
 * Component Type: Tools.ColorPaletteGenerator
 * 
 * User Request: Build a color palette generator
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 4 (Color theory algorithms, harmony generation, HEX/RGB conversion, copying)
 * Expressive Complexity: 4 (Visual color display, sophisticated presentation, color theory knowledge)
 * 
 * USER DESIGN DIRECTION
 * User requested color palette generator - design tool for color scheme creation
 * 
 * DESIGN BRIEF
 * Core Concept: Professional color palette generator using color theory principles to create harmonious schemes
 * 
 * Visual Profile: Contemporary Minimal with design tool sophistication
 * 
 * Design Style: Clean Utilitarian with elevated presentation - tool for designers requiring refined aesthetic
 * 
 * Visual Techniques: Large color swatches, clear hex values, organized harmony schemes, elegant transitions
 * 
 * Color Palette: True Gray System (interface should be neutral to not influence color perception)
 *   - Base 1 (#FAFAFA): Background
 *   - Base 2 (#FFFFFF): Card surfaces
 *   - Base 3 (#E5E5E5): Borders
 *   - Base 4 (#737373): Labels, secondary text
 *   - Base 5 (#171717): Primary text
 *   - Generated colors display prominently as the focal point
 * 
 * Typography:
 *   - Font Family: System fonts
 *   - Weight Range: 400-600 (400 body, 500 labels, 600 headings)
 *   - Hierarchy: 24px heading, 14px labels, 13px hex codes (monospace)
 *   - Hex Codes: Monospace font for technical accuracy
 * 
 * Spacing & Layout:
 *   - Gap System: 12px (colors), 16px (sections), 24px (major divisions)
 *   - Color Swatches: Large and prominent (minimum 100px height) for accurate perception
 *   - Grid: Responsive color grid adapting to palette size
 * 
 * Interaction Design:
 *   - Hover Behavior: Subtle elevation on color swatches (200ms), copy button reveal
 *   - Active States: Click feedback on color copy
 *   - Focus Treatment: Visible outlines on interactive elements
 *   - Transitions: Smooth color transitions when generating new palettes (300ms)
 * 
 * Key Animation: Colors fade and slide in when generating new palette (300ms ease-out) creating smooth, professional transition
 * 
 * Performance Patterns: Efficient HSL to HEX conversion, optimized color calculations, instant palette generation
 * 
 * Design Rationale: Color palette generators serve designers who need harmonious color schemes. The interface must be neutral (grays only) to avoid influencing color perception. Large swatches allow accurate color evaluation. Multiple harmony types (complementary, analogous, triadic, etc.) provide versatility. Hex codes in monospace font ensure clarity for copying. The generator uses color theory algorithms to create pleasing combinations from a single base color. Random generation offers exploration while harmony rules ensure quality results. Copy functionality enables immediate use in design tools. The clean presentation respects the professional context of design work.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Tools.ColorPaletteGenerator",
  "description": "Professional color palette generator with color harmony algorithms (complementary, analogous, triadic, tetradic), base color picker, randomization, and copy-to-clipboard functionality",
  "editorElement": {
    "selector": ".color-palette-generator",
    "displayName": "Color Palette Generator",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Heading Text",
        "defaultValue": "Color Palette Generator",
        "group": "Content"
      },
      "showHeading": {
        "dataType": "booleanValue",
        "displayName": "Show Heading",
        "defaultValue": true,
        "group": "Content"
      },
      "defaultHarmonyType": {
        "dataType": "select",
        "displayName": "Default Harmony Type",
        "defaultValue": "analogous",
        "options": ["complementary", "analogous", "triadic", "tetradic", "monochromatic"],
        "group": "Content"
      },
      "defaultBaseColor": {
        "dataType": "color",
        "displayName": "Default Base Color",
        "defaultValue": "#3B82F6",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
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
        "defaultValue": "#171717",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#737373",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E5E5E5",
        "group": "Colors"
      },
      "borderRadius": {
        "dataType": "number",
        "displayName": "Border Radius (px)",
        "defaultValue": 8,
        "group": "Layout"
      },
      "swatchHeight": {
        "dataType": "number",
        "displayName": "Color Swatch Height (px)",
        "defaultValue": 120,
        "group": "Layout"
      },
      "showHarmonySelector": {
        "dataType": "booleanValue",
        "displayName": "Show Harmony Selector",
        "defaultValue": true,
        "group": "Content"
      },
      "showRandomize": {
        "dataType": "booleanValue",
        "displayName": "Show Randomize Button",
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
  const heading = config?.heading || "Color Palette Generator";
  const showHeading = config?.showHeading !== false;
  const defaultHarmonyType = config?.defaultHarmonyType || "analogous";
  const defaultBaseColor = config?.defaultBaseColor || "#3B82F6";
  const backgroundColor = config?.backgroundColor || "#FAFAFA";
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const textColor = config?.textColor || "#171717";
  const labelColor = config?.labelColor || "#737373";
  const borderColor = config?.borderColor || "#E5E5E5";
  const borderRadius = parseInt(config?.borderRadius || "8");
  const swatchHeight = parseInt(config?.swatchHeight || "120");
  const showHarmonySelector = config?.showHarmonySelector !== false;
  const showRandomize = config?.showRandomize !== false;

  const [baseColor, setBaseColor] = React.useState(defaultBaseColor);
  const [harmonyType, setHarmonyType] = React.useState(defaultHarmonyType);
  const [palette, setPalette] = React.useState([]);
  const [copiedColor, setCopiedColor] = React.useState(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Convert HEX to HSL
  const hexToHSL = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  // Convert HSL to HEX
  const hslToHex = (h, s, l) => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  // Generate palette based on harmony type
  const generatePalette = React.useCallback(() => {
    const hsl = hexToHSL(baseColor);
    let colors = [];

    switch (harmonyType) {
      case 'complementary':
        colors = [
          baseColor,
          hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
          hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 20)),
          hslToHex((hsl.h + 180) % 360, hsl.s, Math.max(10, hsl.l - 20)),
          hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 20))
        ];
        break;

      case 'analogous':
        colors = [
          hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
          baseColor,
          hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
          hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 20)),
          hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 20))
        ];
        break;

      case 'triadic':
        colors = [
          baseColor,
          hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
          hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 20)),
          hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 20))
        ];
        break;

      case 'tetradic':
        colors = [
          baseColor,
          hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l),
          hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 20))
        ];
        break;

      case 'monochromatic':
        colors = [
          hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 30)),
          hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 15)),
          baseColor,
          hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 15)),
          hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 30))
        ];
        break;

      default:
        colors = [baseColor];
    }

    return colors;
  }, [baseColor, harmonyType]);

  // Generate palette on mount and when dependencies change
  React.useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setPalette(generatePalette());
      setIsGenerating(false);
    }, prefersReducedMotion ? 0 : 300);

    return () => clearTimeout(timer);
  }, [generatePalette, prefersReducedMotion]);

  // Randomize base color
  const randomizeColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    setBaseColor(randomHex);
  };

  // Copy color to clipboard
  const copyColor = (color) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    }
  };

  const harmonyOptions = [
    { value: 'complementary', label: 'Complementary' },
    { value: 'analogous', label: 'Analogous' },
    { value: 'triadic', label: 'Triadic' },
    { value: 'tetradic', label: 'Tetradic' },
    { value: 'monochromatic', label: 'Monochromatic' }
  ];

  return (
    <div
      className="color-palette-generator"
      style={{
        backgroundColor: backgroundColor,
        padding: 'clamp(24px, 5vw, 48px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          maxWidth: '900px',
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

        {/* Controls */}
        <div
          style={{
            backgroundColor: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: `${borderRadius}px`,
            padding: '24px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.04)',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {/* Base Color Picker */}
            <div>
              <label
                htmlFor="baseColor"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: labelColor,
                  marginBottom: '8px'
                }}
              >
                Base Color
              </label>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}
              >
                <input
                  id="baseColor"
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
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
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    backgroundColor: '#F9FAFB',
                    border: `1px solid ${borderColor}`,
                    borderRadius: `${borderRadius}px`,
                    padding: '10px 12px',
                    fontSize: '14px',
                    color: textColor,
                    fontFamily: '"SF Mono", "Monaco", monospace',
                    textTransform: 'uppercase'
                  }}
                />
              </div>
            </div>

            {/* Harmony Type */}
            {showHarmonySelector && (
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
                  Harmony Type
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '8px'
                  }}
                >
                  {harmonyOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setHarmonyType(option.value)}
                      style={{
                        backgroundColor: harmonyType === option.value ? textColor : 'transparent',
                        color: harmonyType === option.value ? '#FFFFFF' : textColor,
                        border: `1px solid ${harmonyType === option.value ? textColor : borderColor}`,
                        borderRadius: `${borderRadius}px`,
                        padding: '10px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
                      }}
                      onMouseEnter={(e) => {
                        if (harmonyType !== option.value) {
                          e.currentTarget.style.borderColor = textColor;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (harmonyType !== option.value) {
                          e.currentTarget.style.borderColor = borderColor;
                        }
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Randomize Button */}
            {showRandomize && (
              <button
                onClick={randomizeColor}
                style={{
                  backgroundColor: 'transparent',
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: `${borderRadius}px`,
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                🎲 Randomize Base Color
              </button>
            )}
          </div>
        </div>

        {/* Color Palette Display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            opacity: isGenerating ? 0 : 1,
            transform: isGenerating ? 'translateY(-10px)' : 'translateY(0)',
            transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease-out, transform 300ms ease-out'
          }}
        >
          {palette.map((color, index) => (
            <div
              key={`${color}-${index}`}
              style={{
                backgroundColor: cardBackground,
                border: `1px solid ${borderColor}`,
                borderRadius: `${borderRadius}px`,
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.04)',
                transition: prefersReducedMotion ? 'none' : 'transform 200ms ease-out',
                cursor: 'pointer'
              }}
              onClick={() => copyColor(color)}
              onMouseEnter={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  height: `${swatchHeight}px`,
                  backgroundColor: color
                }}
              />
              <div
                style={{
                  padding: '12px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: textColor,
                    fontFamily: '"SF Mono", "Monaco", monospace',
                    marginBottom: '4px'
                  }}
                >
                  {color}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: labelColor
                  }}
                >
                  {copiedColor === color ? '✓ Copied!' : 'Click to copy'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
