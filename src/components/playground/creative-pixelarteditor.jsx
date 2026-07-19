import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:57 AM
 * Component Type: Creative.PixelArtEditor
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
 * Generated: October 26, 2025, 12:28 PM
 * Component Type: Creative.PixelArtEditor
 * 
 * User Request: Create a pixel art editor
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 4 (Grid drawing, pixel fill, color selection, clear, download)
 * Expressive Complexity: 3 (Retro aesthetic, clear grid, organized tools)
 * 
 * USER DESIGN DIRECTION
 * User requested pixel art editor - nostalgic creative tool for retro graphics
 * 
 * DESIGN BRIEF
 * Core Concept: Grid-based pixel art editor with classic drawing experience
 * 
 * Visual Profile: Contemporary Minimal with retro gaming undertones
 * 
 * Design Style: Clean Utilitarian - function-first with nostalgic pixel grid
 * 
 * Color Palette: Cool Gray System with vibrant pixel colors
 *   - Base 1 (#FAFBFC): Background
 *   - Base 2 (#FFFFFF): Card, canvas
 *   - Base 3 (#E5E7EB): Grid lines
 *   - Base 4 (#6B7280): Labels
 *   - Base 5 (#1F2937): Text
 *   - Accent (#8B5CF6): Purple accent for creative tool
 * 
 * Typography:
 *   - Font Family: System fonts
 *   - Weight Range: 400-600
 *   - Hierarchy: 24px heading, 14px labels
 * 
 * Spacing & Layout:
 *   - Gap System: 12px (tools), 16px (sections), 24px (padding)
 *   - Grid: 16x16 or 32x32 pixel grid
 *   - Layout: Canvas centered, color palette below
 * 
 * Interaction Design:
 *   - Click/Drag: Paint pixels
 *   - Hover: Preview pixel highlight
 *   - Color Selection: Click color swatch
 *   - Instant feedback on pixel fill
 * 
 * Key Animation: Standard appearance (400ms), instant pixel drawing
 * 
 * Performance Patterns: Efficient canvas updates, optimized pixel rendering
 * 
 * Design Rationale: Pixel art editors require precise grid control and instant feedback. The 16x16 grid provides manageable canvas for quick sprites. Visible grid lines guide placement. Click-and-drag painting enables efficient workflows. Color palette features retro gaming colors reminiscent of classic consoles. Clear function resets canvas quickly. Download exports creation. The nostalgic medium deserves a clean, respectful interface that doesn't compete with user's pixel art. Grid-based constraints naturally guide users toward successful pixel compositions.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Creative.PixelArtEditor",
  "description": "Grid-based pixel art editor with click-and-drag drawing, color palette selection, clear canvas, and PNG export for creating retro-style pixel graphics",
  "editorElement": {
    "selector": ".pixel-art-editor",
    "displayName": "Pixel Art Editor",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Heading Text",
        "defaultValue": "Pixel Art Editor",
        "group": "Content"
      },
      "showHeading": {
        "dataType": "booleanValue",
        "displayName": "Show Heading",
        "defaultValue": true,
        "group": "Content"
      },
      "gridSize": {
        "dataType": "select",
        "displayName": "Grid Size",
        "defaultValue": "16",
        "options": ["8", "16", "32"],
        "group": "Content",
        "description": "Number of pixels per row/column"
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
      "gridColor": {
        "dataType": "color",
        "displayName": "Grid Line Color",
        "defaultValue": "#E5E7EB",
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
        "defaultValue": "#8B5CF6",
        "group": "Colors"
      },
      "defaultPixelColor": {
        "dataType": "color",
        "displayName": "Default Pixel Color",
        "defaultValue": "#1F2937",
        "group": "Content"
      },
      "borderRadius": {
        "dataType": "number",
        "displayName": "Border Radius (px)",
        "defaultValue": 8,
        "group": "Layout"
      },
      "pixelSize": {
        "dataType": "number",
        "displayName": "Pixel Display Size (px)",
        "defaultValue": 20,
        "group": "Layout",
        "description": "Size of each pixel square in display"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const heading = config?.heading || "Pixel Art Editor";
  const showHeading = config?.showHeading !== false;
  const gridSize = parseInt(config?.gridSize || "16");
  const backgroundColor = config?.backgroundColor || "#FAFBFC";
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const canvasBackground = config?.canvasBackground || "#FFFFFF";
  const gridColor = config?.gridColor || "#E5E7EB";
  const textColor = config?.textColor || "#1F2937";
  const labelColor = config?.labelColor || "#6B7280";
  const borderColor = config?.borderColor || "#E5E7EB";
  const accentColor = config?.accentColor || "#8B5CF6";
  const defaultPixelColor = config?.defaultPixelColor || "#1F2937";
  const borderRadius = parseInt(config?.borderRadius || "8");
  const pixelSize = parseInt(config?.pixelSize || "20");

  const colorPalette = [
    '#1F2937', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', 
    '#8B5CF6', '#EC4899', '#FFFFFF', '#6B7280', '#DC2626',
    '#D97706', '#059669', '#2563EB', '#7C3AED', '#DB2777',
    '#78350F'
  ];

  const [pixels, setPixels] = React.useState(() => 
    Array(gridSize * gridSize).fill(canvasBackground)
  );
  const [selectedColor, setSelectedColor] = React.useState(defaultPixelColor);
  const [isDrawing, setIsDrawing] = React.useState(false);

  const canvasRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Draw grid
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const canvasSize = gridSize * pixelSize;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Draw pixels
    pixels.forEach((color, index) => {
      const x = (index % gridSize) * pixelSize;
      const y = Math.floor(index / gridSize) * pixelSize;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    });

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * pixelSize, 0);
      ctx.lineTo(i * pixelSize, canvasSize);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * pixelSize);
      ctx.lineTo(canvasSize, i * pixelSize);
      ctx.stroke();
    }
  }, [pixels, gridSize, pixelSize, gridColor]);

  // Get pixel index from coordinates
  const getPixelIndex = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return -1;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor((x / rect.width) * gridSize);
    const row = Math.floor((y / rect.height) * gridSize);

    if (col >= 0 && col < gridSize && row >= 0 && row < gridSize) {
      return row * gridSize + col;
    }
    return -1;
  };

  // Paint pixel
  const paintPixel = (e) => {
    const index = getPixelIndex(e);
    if (index >= 0) {
      setPixels(prev => {
        const newPixels = [...prev];
        newPixels[index] = selectedColor;
        return newPixels;
      });
    }
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    paintPixel(e);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      paintPixel(e);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Clear canvas
  const clearCanvas = () => {
    setPixels(Array(gridSize * gridSize).fill(canvasBackground));
  };

  // Download
  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div
      className="pixel-art-editor"
      style={{
        backgroundColor: backgroundColor,
        padding: 'clamp(24px, 5vw, 48px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}
      >
        {showHeading && (
          <h1
            style={{
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: '600',
              color: textColor,
              margin: '0 0 24px 0',
              textAlign: 'center'
            }}
          >
            {heading}
          </h1>
        )}

        {/* Canvas */}
        <div
          style={{
            backgroundColor: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: `${borderRadius}px`,
            padding: '24px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              border: `2px solid ${borderColor}`,
              cursor: 'crosshair',
              imageRendering: 'pixelated',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>

        {/* Color Palette */}
        <div
          style={{
            backgroundColor: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: `${borderRadius}px`,
            padding: '20px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)',
            marginBottom: '16px'
          }}
        >
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: labelColor,
              marginBottom: '12px'
            }}
          >
            Color Palette
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
              gap: '8px'
            }}
          >
            {colorPalette.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: color,
                  border: selectedColor === color ? `3px solid ${accentColor}` : `1px solid ${borderColor}`,
                  borderRadius: `${borderRadius}px`,
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : 'transform 150ms ease-out'
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            gap: '12px'
          }}
        >
          <button
            onClick={clearCanvas}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              color: textColor,
              border: `1px solid ${borderColor}`,
              borderRadius: `${borderRadius}px`,
              padding: '12px 20px',
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
            🗑️ Clear
          </button>

          <button
            onClick={downloadArt}
            style={{
              flex: 1,
              backgroundColor: accentColor,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: `${borderRadius}px`,
              padding: '12px 20px',
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
            ⬇ Download
          </button>
        </div>
      </div>
    </div>
  );
}