import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:57 AM
 * Component Type: Creative.DrawingCanvas
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
 * Generated: October 26, 2025, 12:10 PM
 * Component Type: Creative.DrawingCanvas
 * 
 * User Request: Create a drawing canvas with different colors
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 4 (Canvas drawing, mouse/touch tracking, color selection, brush size, clear/download)
 * Expressive Complexity: 3 (Clean tool interface, smooth drawing experience, organized controls)
 * 
 * USER DESIGN DIRECTION
 * User requested drawing canvas with different colors - creative tool for freeform drawing
 * 
 * DESIGN BRIEF
 * Core Concept: Intuitive digital canvas with essential drawing tools organized for easy access
 * 
 * Visual Profile: Contemporary Minimal with creative undertones
 * 
 * Design Style: Clean Utilitarian - canvas-first design with minimalist toolbar
 * 
 * Visual Techniques: Large drawing area, organized color palette, clean tool icons, subtle shadows
 * 
 * Color Palette: Cool Gray System with vibrant color options for drawing
 *   - Base 1 (#FAFBFC): Background
 *   - Base 2 (#FFFFFF): Canvas surface, controls
 *   - Base 3 (#E5E7EB): Borders, dividers
 *   - Base 4 (#6B7280): Labels, icons
 *   - Base 5 (#1F2937): Primary text
 *   - Drawing Colors: Full spectrum palette for creative expression
 * 
 * Typography:
 *   - Font Family: System fonts
 *   - Weight Range: 400-600 (400 body, 500 labels, 600 heading)
 *   - Hierarchy: 24px heading, 14px labels, 13px helper text
 * 
 * Spacing & Layout:
 *   - Gap System: 8px (color swatches), 12px (tools), 16px (sections), 24px (card padding)
 *   - Layout: Canvas centered, toolbar below for easy access
 *   - Canvas: Square format for versatile drawing space
 * 
 * Interaction Design:
 *   - Hover Behavior: Color swatch scale (150ms), button background shift (200ms)
 *   - Active States: Selected color has border highlight, active tool shows emphasis
 *   - Drawing Feedback: Smooth lines following cursor/touch with no lag
 *   - Touch Support: Full touch/pointer event support for mobile drawing
 * 
 * Key Animation: Standard appearance transition (400ms ease-out) on load, instant drawing response for smooth experience
 * 
 * Performance Patterns: Efficient canvas drawing with requestAnimationFrame, optimized event handlers, smooth line rendering
 * 
 * Design Rationale: Drawing canvases require immediate, lag-free response for natural creative flow. The large square canvas provides ample space for sketches and doodles. Color palette features common creative colors arranged in an intuitive grid for quick selection. Brush size slider allows precise control from fine lines to bold strokes. Clear button provides quick reset. Download button saves artwork as PNG. The white canvas mimics traditional paper while the surrounding gray provides comfortable contrast. Touch support enables mobile drawing. The clean interface keeps focus on the creative canvas rather than overwhelming with options. Tool organization prioritizes frequently used features (color, brush size) for efficient workflow.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Creative.DrawingCanvas",
  "description": "Interactive drawing canvas with color picker, adjustable brush sizes, clear canvas, and download functionality for freeform digital drawing and sketching",
  "editorElement": {
    "selector": ".drawing-canvas",
    "displayName": "Drawing Canvas",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Heading Text",
        "defaultValue": "Drawing Canvas",
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
      "canvasBackground": {
        "dataType": "color",
        "displayName": "Canvas Background",
        "defaultValue": "#FFFFFF",
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
      "defaultBrushColor": {
        "dataType": "color",
        "displayName": "Default Brush Color",
        "defaultValue": "#1F2937",
        "group": "Content"
      },
      "defaultBrushSize": {
        "dataType": "number",
        "displayName": "Default Brush Size",
        "defaultValue": 3,
        "group": "Content"
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
        "defaultValue": 600,
        "group": "Layout",
        "description": "Width and height of drawing canvas"
      },
      "showColorPalette": {
        "dataType": "booleanValue",
        "displayName": "Show Color Palette",
        "defaultValue": true,
        "group": "Content"
      },
      "showBrushSize": {
        "dataType": "booleanValue",
        "displayName": "Show Brush Size Control",
        "defaultValue": true,
        "group": "Content"
      },
      "showDownload": {
        "dataType": "booleanValue",
        "displayName": "Show Download Button",
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
  const heading = config?.heading || "Drawing Canvas";
  const showHeading = config?.showHeading !== false;
  const backgroundColor = config?.backgroundColor || "#FAFBFC";
  const canvasBackground = config?.canvasBackground || "#FFFFFF";
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const textColor = config?.textColor || "#1F2937";
  const labelColor = config?.labelColor || "#6B7280";
  const borderColor = config?.borderColor || "#E5E7EB";
  const defaultBrushColor = config?.defaultBrushColor || "#1F2937";
  const defaultBrushSize = parseInt(config?.defaultBrushSize || "3");
  const borderRadius = parseInt(config?.borderRadius || "8");
  const canvasSize = parseInt(config?.canvasSize || "600");
  const showColorPalette = config?.showColorPalette !== false;
  const showBrushSize = config?.showBrushSize !== false;
  const showDownload = config?.showDownload !== false;

  const colorPalette = [
    '#1F2937', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', 
    '#8B5CF6', '#EC4899', '#FFFFFF', '#6B7280', '#DC2626',
    '#D97706', '#059669', '#2563EB', '#7C3AED', '#DB2777'
  ];

  const [isDrawing, setIsDrawing] = React.useState(false);
  const [brushColor, setBrushColor] = React.useState(defaultBrushColor);
  const [brushSize, setBrushSize] = React.useState(defaultBrushSize);
  const [lastPosition, setLastPosition] = React.useState({ x: 0, y: 0 });

  const canvasRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Initialize canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [canvasSize, canvasBackground]);

  // Get coordinates relative to canvas
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Start drawing
  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCoordinates(e);
    setLastPosition(coords);
  };

  // Draw
  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const coords = getCoordinates(e);

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    setLastPosition(coords);
  };

  // Stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvasSize, canvasSize);
  };

  // Download canvas
  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div
      className="drawing-canvas"
      style={{
        backgroundColor: backgroundColor,
        padding: 'clamp(24px, 5vw, 48px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          maxWidth: `${canvasSize + 100}px`,
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
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)',
            marginBottom: '16px'
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              maxWidth: '100%',
              height: 'auto',
              border: `2px solid ${borderColor}`,
              borderRadius: `${borderRadius}px`,
              cursor: 'crosshair',
              touchAction: 'none',
              display: 'block'
            }}
          />
        </div>

        {/* Controls */}
        <div
          style={{
            backgroundColor: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: `${borderRadius}px`,
            padding: '20px',
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
            {/* Color Palette */}
            {showColorPalette && (
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: labelColor,
                    marginBottom: '12px'
                  }}
                >
                  Color
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
                      onClick={() => setBrushColor(color)}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: color,
                        border: brushColor === color ? `3px solid ${textColor}` : `1px solid ${borderColor}`,
                        borderRadius: `${borderRadius}px`,
                        cursor: 'pointer',
                        transition: prefersReducedMotion ? 'none' : 'transform 150ms ease-out',
                        transform: 'scale(1)'
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
            )}

            {/* Brush Size */}
            {showBrushSize && (
              <div>
                <label
                  htmlFor="brushSize"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: labelColor,
                    marginBottom: '8px'
                  }}
                >
                  Brush Size: {brushSize}px
                </label>
                <input
                  id="brushSize"
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    accentColor: brushColor
                  }}
                />
                <div
                  style={{
                    marginTop: '12px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      width: `${brushSize * 2}px`,
                      height: `${brushSize * 2}px`,
                      backgroundColor: brushColor,
                      borderRadius: '50%',
                      border: brushColor === '#FFFFFF' ? `1px solid ${borderColor}` : 'none'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={clearCanvas}
                style={{
                  flex: 1,
                  minWidth: '120px',
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

              {showDownload && (
                <button
                  onClick={downloadCanvas}
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    backgroundColor: textColor,
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
