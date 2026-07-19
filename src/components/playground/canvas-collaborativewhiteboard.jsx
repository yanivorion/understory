import React from "react";

const MANIFEST = {
  "type": "Canvas.CollaborativeWhiteboard",
  "description": "Interactive canvas with drawing tools, shapes, text, and zoom/pan",
  "editorElement": {
    "selector": ".canvas-whiteboard-container",
    "displayName": "Collaborative Canvas",
    "archetype": "container",
    "data": {
      "canvasWidth": {
        "dataType": "number",
        "displayName": "Canvas Width (px)",
        "defaultValue": "3000",
        "group": "Content"
      },
      "canvasHeight": {
        "dataType": "number",
        "displayName": "Canvas Height (px)",
        "defaultValue": "2000",
        "group": "Content"
      },
      "defaultTool": {
        "dataType": "select",
        "displayName": "Default Tool",
        "defaultValue": "select",
        "options": ["select", "pen", "rectangle", "circle", "text", "sticky"],
        "group": "Content"
      },
      "maxHistorySteps": {
        "dataType": "number",
        "displayName": "Max Undo Steps",
        "defaultValue": "50",
        "group": "Content"
      },
      "enableGrid": {
        "dataType": "booleanValue",
        "displayName": "Show Grid",
        "defaultValue": "true",
        "group": "Content"
      },
      "snapToGrid": {
        "dataType": "booleanValue",
        "displayName": "Snap to Grid",
        "defaultValue": "false",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Canvas Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "gridColor": {
        "dataType": "color",
        "displayName": "Grid Color",
        "defaultValue": "rgba(0,0,0,0.05)",
        "group": "Colors"
      },
      "toolbarBackgroundColor": {
        "dataType": "color",
        "displayName": "Toolbar Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "primaryTextColor": {
        "dataType": "color",
        "displayName": "Primary Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(0,0,0,0.08)",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "Inter, -apple-system, system-ui, sans-serif",
        "options": [
          "Inter, -apple-system, system-ui, sans-serif",
          "SF Pro Display, -apple-system, sans-serif",
          "Helvetica Neue, Helvetica, Arial, sans-serif"
        ],
        "group": "Typography"
      },
      "toolbarSize": {
        "dataType": "select",
        "displayName": "Toolbar Button Size",
        "defaultValue": "40px",
        "options": ["36px", "40px", "44px", "48px"],
        "group": "Layout"
      },
      "toolbarPadding": {
        "dataType": "select",
        "displayName": "Toolbar Padding",
        "defaultValue": "12px",
        "options": ["8px", "10px", "12px", "16px"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "gridSize": {
        "dataType": "select",
        "displayName": "Grid Cell Size",
        "defaultValue": "20px",
        "options": ["10px", "15px", "20px", "25px", "30px"],
        "group": "Layout"
      },
      "minZoom": {
        "dataType": "select",
        "displayName": "Minimum Zoom",
        "defaultValue": "0.1",
        "options": ["0.1", "0.25", "0.5"],
        "group": "Zoom"
      },
      "maxZoom": {
        "dataType": "select",
        "displayName": "Maximum Zoom",
        "defaultValue": "5",
        "options": ["3", "4", "5", "10"],
        "group": "Zoom"
      },
      "zoomStep": {
        "dataType": "select",
        "displayName": "Zoom Step",
        "defaultValue": "0.1",
        "options": ["0.05", "0.1", "0.2"],
        "group": "Zoom"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [tool, setTool] = React.useState(config?.defaultTool || 'select');
  const [color, setColor] = React.useState('#1A1A1A');
  const [elements, setElements] = React.useState([]);
  const [history, setHistory] = React.useState([[]]);
  const [historyStep, setHistoryStep] = React.useState(0);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [isPanning, setIsPanning] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [zoom, setZoom] = React.useState(1);
  const [panOffset, setPanOffset] = React.useState({ x: 0, y: 0 });
  
  const canvasRef = React.useRef(null);
  const drawingRef = React.useRef({ startX: 0, startY: 0, currentElement: null });
  const panStartRef = React.useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const elementIdCounter = React.useRef(0);

  const canvasWidth = parseInt(config?.canvasWidth || '3000');
  const canvasHeight = parseInt(config?.canvasHeight || '2000');
  const enableGrid = config?.enableGrid !== false;
  const gridSize = parseInt((config?.gridSize || '20px').replace('px', ''));
  const minZoom = parseFloat(config?.minZoom || '0.1');
  const maxZoom = parseFloat(config?.maxZoom || '5');
  const zoomStep = parseFloat(config?.zoomStep || '0.1');
  const maxHistorySteps = parseInt(config?.maxHistorySteps || '50');

  // Get mouse position relative to canvas
  const getMousePos = React.useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    
    return {
      x: (e.clientX - rect.left - panOffset.x) / zoom,
      y: (e.clientY - rect.top - panOffset.y) / zoom
    };
  }, [zoom, panOffset]);

  // Add to history
  const addToHistory = React.useCallback((newElements) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyStep + 1);
      newHistory.push(newElements);
      return newHistory.slice(-maxHistorySteps);
    });
    setHistoryStep(prev => Math.min(prev + 1, maxHistorySteps - 1));
  }, [historyStep, maxHistorySteps]);

  // Undo/Redo
  const undo = React.useCallback(() => {
    if (historyStep > 0) {
      setHistoryStep(prev => prev - 1);
      setElements(history[historyStep - 1]);
    }
  }, [historyStep, history]);

  const redo = React.useCallback(() => {
    if (historyStep < history.length - 1) {
      setHistoryStep(prev => prev + 1);
      setElements(history[historyStep + 1]);
    }
  }, [historyStep, history]);

  // PATTERN 4: Drawing gestures
  const handlePointerDown = React.useCallback((e) => {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      // Middle mouse or Ctrl+Click = Pan
      setIsPanning(true);
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        offsetX: panOffset.x,
        offsetY: panOffset.y
      };
      return;
    }

    const pos = getMousePos(e);
    
    if (tool === 'select') {
      // Check if clicking on existing element
      const clicked = elements.find(el => {
        if (el.type === 'path') return false; // Complex hit detection for paths
        return pos.x >= el.x && pos.x <= el.x + el.width &&
               pos.y >= el.y && pos.y <= el.y + el.height;
      });
      setSelectedId(clicked?.id || null);
    } else if (tool !== 'select') {
      setIsDrawing(true);
      const id = elementIdCounter.current++;
      
      drawingRef.current = {
        startX: pos.x,
        startY: pos.y,
        currentElement: {
          id,
          type: tool,
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
          color,
          points: tool === 'pen' ? [{ x: pos.x, y: pos.y }] : []
        }
      };

      if (tool !== 'pen') {
        setElements(prev => [...prev, drawingRef.current.currentElement]);
      }
    }
  }, [tool, elements, getMousePos, color, panOffset]);

  const handlePointerMove = React.useCallback((e) => {
    if (isPanning) {
      const deltaX = e.clientX - panStartRef.current.x;
      const deltaY = e.clientY - panStartRef.current.y;
      
      setPanOffset({
        x: panStartRef.current.offsetX + deltaX,
        y: panStartRef.current.offsetY + deltaY
      });
      return;
    }

    if (!isDrawing || !drawingRef.current.currentElement) return;

    const pos = getMousePos(e);
    const current = drawingRef.current.currentElement;

    if (tool === 'pen') {
      current.points.push({ x: pos.x, y: pos.y });
      setElements(prev => {
        const updated = [...prev];
        const index = updated.findIndex(el => el.id === current.id);
        if (index >= 0) {
          updated[index] = { ...current };
        } else {
          updated.push(current);
        }
        return updated;
      });
    } else {
      const width = pos.x - drawingRef.current.startX;
      const height = pos.y - drawingRef.current.startY;

      current.width = width;
      current.height = height;

      setElements(prev => {
        const updated = [...prev];
        const index = updated.findIndex(el => el.id === current.id);
        if (index >= 0) {
          updated[index] = { ...current };
        }
        return updated;
      });
    }
  }, [isDrawing, isPanning, tool, getMousePos]);

  const handlePointerUp = React.useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (isDrawing) {
      addToHistory(elements);
      setIsDrawing(false);
      drawingRef.current.currentElement = null;
    }
  }, [isDrawing, isPanning, elements, addToHistory]);

  // Zoom controls
  const handleZoomIn = React.useCallback(() => {
    setZoom(prev => Math.min(prev + zoomStep, maxZoom));
  }, [zoomStep, maxZoom]);

  const handleZoomOut = React.useCallback(() => {
    setZoom(prev => Math.max(prev - zoomStep, minZoom));
  }, [zoomStep, minZoom]);

  const handleResetZoom = React.useCallback(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) {
          setElements(prev => prev.filter(el => el.id !== selectedId));
          addToHistory(elements.filter(el => el.id !== selectedId));
          setSelectedId(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedId, elements, addToHistory]);

  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F0F0F0',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif',
      overflow: 'hidden'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: config?.toolbarPadding || '12px',
      backgroundColor: config?.toolbarBackgroundColor || '#FFFFFF',
      borderBottom: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      flexWrap: 'wrap'
    },
    toolButton: {
      width: config?.toolbarSize || '40px',
      height: config?.toolbarSize || '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      cursor: 'pointer',
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      outline: 'none',
      color: config?.primaryTextColor || '#1A1A1A'
    },
    toolButtonActive: {
      backgroundColor: config?.accentColor || '#1A1A1A',
      color: '#FFFFFF',
      borderColor: config?.accentColor || '#1A1A1A'
    },
    divider: {
      width: '1px',
      height: '24px',
      backgroundColor: config?.borderColor || 'rgba(0,0,0,0.08)'
    },
    colorPicker: {
      width: config?.toolbarSize || '40px',
      height: config?.toolbarSize || '40px',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      cursor: 'pointer'
    },
    zoomInfo: {
      padding: '0 12px',
      fontSize: '14px',
      color: config?.primaryTextColor || '#1A1A1A',
      fontWeight: '500'
    },
    canvasWrapper: {
      flex: '1',
      position: 'relative',
      overflow: 'hidden',
      cursor: isPanning ? 'grabbing' : tool === 'select' ? 'default' : 'crosshair'
    },
    canvas: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
      transformOrigin: 'center',
      backgroundColor: config?.backgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }
  };

  const tools = [
    { id: 'select', icon: '↖', label: 'Select' },
    { id: 'pen', icon: '✎', label: 'Pen' },
    { id: 'rectangle', icon: '□', label: 'Rectangle' },
    { id: 'circle', icon: '○', label: 'Circle' },
    { id: 'text', icon: 'T', label: 'Text' },
    { id: 'sticky', icon: '📝', label: 'Sticky Note' }
  ];

  // Render element on canvas
  const renderElement = (el) => {
    const isSelected = el.id === selectedId;
    const strokeWidth = 2 / zoom; // Maintain visual stroke width at all zoom levels
    
    switch(el.type) {
      case 'pen':
        if (!el.points || el.points.length < 2) return null;
        const pathData = `M ${el.points[0].x} ${el.points[0].y} ${el.points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}`;
        return (
          <path
            key={el.id}
            d={pathData}
            stroke={el.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      
      case 'rectangle':
        return (
          <rect
            key={el.id}
            x={el.x}
            y={el.y}
            width={el.width}
            height={el.height}
            fill="none"
            stroke={isSelected ? config?.accentColor || '#1A1A1A' : el.color}
            strokeWidth={isSelected ? strokeWidth * 2 : strokeWidth}
            strokeDasharray={isSelected ? `${4 / zoom} ${2 / zoom}` : 'none'}
          />
        );
      
      case 'circle':
        const rx = Math.abs(el.width / 2);
        const ry = Math.abs(el.height / 2);
        const cx = el.x + el.width / 2;
        const cy = el.y + el.height / 2;
        return (
          <ellipse
            key={el.id}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={isSelected ? config?.accentColor || '#1A1A1A' : el.color}
            strokeWidth={isSelected ? strokeWidth * 2 : strokeWidth}
            strokeDasharray={isSelected ? `${4 / zoom} ${2 / zoom}` : 'none'}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={styles.container} className="canvas-whiteboard-container">
      <div style={styles.toolbar}>
        {tools.map(t => (
          <button
            key={t.id}
            style={{
              ...styles.toolButton,
              ...(tool === t.id ? styles.toolButtonActive : {})
            }}
            onClick={() => setTool(t.id)}
            title={t.label}
            onMouseEnter={(e) => {
              if (tool !== t.id) {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
              }
            }}
            onMouseLeave={(e) => {
              if (tool !== t.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {t.icon}
          </button>
        ))}

        <div style={styles.divider} />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={styles.colorPicker}
          title="Choose color"
        />

        <div style={styles.divider} />

        <button
          style={styles.toolButton}
          onClick={undo}
          disabled={historyStep === 0}
          title="Undo (Ctrl+Z)"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ↶
        </button>
        <button
          style={styles.toolButton}
          onClick={redo}
          disabled={historyStep === history.length - 1}
          title="Redo (Ctrl+Y)"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ↷
        </button>

        <div style={styles.divider} />

        <button
          style={styles.toolButton}
          onClick={handleZoomOut}
          title="Zoom Out"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          −
        </button>
        <div style={styles.zoomInfo}>{Math.round(zoom * 100)}%</div>
        <button
          style={styles.toolButton}
          onClick={handleZoomIn}
          title="Zoom In"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          +
        </button>
        <button
          style={styles.toolButton}
          onClick={handleResetZoom}
          title="Reset Zoom"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ⊡
        </button>
      </div>

      <div
        style={styles.canvasWrapper}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <svg
          ref={canvasRef}
          style={styles.canvas}
          width={canvasWidth}
          height={canvasHeight}
        >
          {enableGrid && (
            <defs>
              <pattern
                id="grid"
                width={gridSize}
                height={gridSize}
                patternUnits="userSpaceOnUse"
              >
                <rect width={gridSize} height={gridSize} fill="none" />
                <path
                  d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                  fill="none"
                  stroke={config?.gridColor || 'rgba(0,0,0,0.05)'}
                  strokeWidth="1"
                />
              </pattern>
            </defs>
          )}
          
          {enableGrid && (
            <rect width={canvasWidth} height={canvasHeight} fill="url(#grid)" />
          )}

          {elements.map(el => renderElement(el))}
        </svg>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
