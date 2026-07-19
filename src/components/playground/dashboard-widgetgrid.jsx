import React from "react";

const MANIFEST = {
  "type": "Dashboard.WidgetGrid",
  "description": "Interactive dashboard with draggable and resizable widgets",
  "editorElement": {
    "selector": ".dashboard-grid-container",
    "displayName": "Dashboard Widget Grid",
    "archetype": "container",
    "data": {
      "widgets": {
        "dataType": "text",
        "displayName": "Widgets JSON",
        "defaultValue": '[{"id":"w1","type":"metric","title":"Total Revenue","value":"$124,500","change":"+12.5%","changePositive":true,"x":0,"y":0,"width":1,"height":1},{"id":"w2","type":"metric","title":"Active Users","value":"8,432","change":"+8.2%","changePositive":true,"x":1,"y":0,"width":1,"height":1},{"id":"w3","type":"metric","title":"Conversion Rate","value":"3.24%","change":"-0.3%","changePositive":false,"x":2,"y":0,"width":1,"height":1},{"id":"w4","type":"chart","title":"Revenue Trend","data":[65,72,68,80,85,92,88,95],"x":0,"y":1,"width":2,"height":2},{"id":"w5","type":"list","title":"Recent Activities","items":["New user signup","Payment received","Feature deployed","Support ticket resolved"],"x":2,"y":1,"width":1,"height":2},{"id":"w6","type":"progress","title":"Monthly Goal","value":68,"target":100,"x":0,"y":3,"width":1,"height":1}]',
        "group": "Content"
      },
      "gridColumns": {
        "dataType": "number",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "group": "Content"
      },
      "enableDrag": {
        "dataType": "booleanValue",
        "displayName": "Enable Dragging",
        "defaultValue": "true",
        "group": "Content"
      },
      "enableResize": {
        "dataType": "booleanValue",
        "displayName": "Enable Resizing",
        "defaultValue": "false",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F8F8",
        "group": "Colors"
      },
      "widgetBackgroundColor": {
        "dataType": "color",
        "displayName": "Widget Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "primaryTextColor": {
        "dataType": "color",
        "displayName": "Primary Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#6B6B6B",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "positiveColor": {
        "dataType": "color",
        "displayName": "Positive Change Color",
        "defaultValue": "#10B981",
        "group": "Colors"
      },
      "negativeColor": {
        "dataType": "color",
        "displayName": "Negative Change Color",
        "defaultValue": "#EF4444",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(0,0,0,0.08)",
        "group": "Colors"
      },
      "chartColor": {
        "dataType": "color",
        "displayName": "Chart Line Color",
        "defaultValue": "#1A1A1A",
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
      "titleSize": {
        "dataType": "select",
        "displayName": "Title Font Size",
        "defaultValue": "14px",
        "options": ["12px", "14px", "16px"],
        "group": "Typography"
      },
      "valueSize": {
        "dataType": "select",
        "displayName": "Value Font Size",
        "defaultValue": "32px",
        "options": ["24px", "28px", "32px", "36px", "40px"],
        "group": "Typography"
      },
      "gridGap": {
        "dataType": "select",
        "displayName": "Grid Gap",
        "defaultValue": "20px",
        "options": ["12px", "16px", "20px", "24px", "32px"],
        "group": "Layout"
      },
      "widgetPadding": {
        "dataType": "select",
        "displayName": "Widget Padding",
        "defaultValue": "24px",
        "options": ["16px", "20px", "24px", "28px", "32px"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "12px",
        "options": ["0px", "6px", "8px", "12px", "16px"],
        "group": "Layout"
      },
      "showShadow": {
        "dataType": "booleanValue",
        "displayName": "Show Widget Shadow",
        "defaultValue": "true",
        "group": "Layout"
      },
      "transitionDuration": {
        "dataType": "number",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "300",
        "group": "Animation"
      },
      "snapThreshold": {
        "dataType": "number",
        "displayName": "Snap Threshold (px)",
        "defaultValue": "20",
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [widgets, setWidgets] = React.useState([]);
  const [draggedWidget, setDraggedWidget] = React.useState(null);
  const gridRef = React.useRef(null);
  const dragStateRef = React.useRef({ startX: 0, startY: 0, offsetX: 0, offsetY: 0 });

  // Safe config extraction
  const initialWidgets = React.useMemo(() => {
    try {
      return JSON.parse(config?.widgets || MANIFEST.editorElement.data.widgets.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.widgets.defaultValue);
    }
  }, [config?.widgets]);

  React.useEffect(() => {
    setWidgets(initialWidgets);
  }, [initialWidgets]);

  const gridColumns = parseInt(config?.gridColumns || '3');
  const gridGap = parseInt((config?.gridGap || '20px').replace('px', ''));
  const enableDrag = config?.enableDrag !== false;
  const transitionDuration = parseInt(config?.transitionDuration || '300');
  const snapThreshold = parseInt(config?.snapThreshold || '20');

  // Calculate cell size
  const getCellSize = React.useCallback(() => {
    if (!gridRef.current) return 200;
    const gridWidth = gridRef.current.offsetWidth;
    return (gridWidth - (gridColumns - 1) * gridGap) / gridColumns;
  }, [gridColumns, gridGap]);

  // PATTERN 3: FLIP animation for widget repositioning
  const animateWidgetMove = React.useCallback((widgetId, fromPos, toPos) => {
    const element = document.querySelector(`[data-widget-id="${widgetId}"]`);
    if (!element) return;

    const deltaX = fromPos.x - toPos.x;
    const deltaY = fromPos.y - toPos.y;

    element.animate([
      { transform: `translate(${deltaX}px, ${deltaY}px)` },
      { transform: 'translate(0, 0)' }
    ], {
      duration: transitionDuration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });
  }, [transitionDuration]);

  // PATTERN 4: Gesture recognition for drag
  const handlePointerDown = React.useCallback((e, widget) => {
    if (!enableDrag) return;
    
    e.preventDefault();
    const cellSize = getCellSize();
    const rect = e.currentTarget.getBoundingClientRect();
    
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      cellSize
    };

    setDraggedWidget(widget);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [enableDrag, getCellSize]);

  const handlePointerMove = React.useCallback((e) => {
    if (!draggedWidget) return;

    const cellSize = dragStateRef.current.cellSize;
    const gridElement = gridRef.current;
    if (!gridElement) return;

    const gridRect = gridElement.getBoundingClientRect();
    const x = e.clientX - gridRect.left - dragStateRef.current.offsetX;
    const y = e.clientY - gridRect.top - dragStateRef.current.offsetY;

    // Calculate grid position
    const gridX = Math.max(0, Math.min(gridColumns - draggedWidget.width, Math.round(x / (cellSize + gridGap))));
    const gridY = Math.max(0, Math.round(y / (cellSize + gridGap)));

    // Update widget position with direct DOM manipulation (PATTERN 1)
    const element = document.querySelector(`[data-widget-id="${draggedWidget.id}"]`);
    if (element) {
      element.style.transform = `translate(${x}px, ${y}px)`;
      element.style.zIndex = '1000';
      element.style.cursor = 'grabbing';
      element.style.opacity = '0.8';
    }
  }, [draggedWidget, gridColumns, gridGap]);

  const handlePointerUp = React.useCallback((e) => {
    if (!draggedWidget) return;

    const cellSize = dragStateRef.current.cellSize;
    const gridElement = gridRef.current;
    if (!gridElement) return;

    const gridRect = gridElement.getBoundingClientRect();
    const x = e.clientX - gridRect.left - dragStateRef.current.offsetX;
    const y = e.clientY - gridRect.top - dragStateRef.current.offsetY;

    const newGridX = Math.max(0, Math.min(gridColumns - draggedWidget.width, Math.round(x / (cellSize + gridGap))));
    const newGridY = Math.max(0, Math.round(y / (cellSize + gridGap)));

    // Update widget grid position
    setWidgets(prev => prev.map(w => 
      w.id === draggedWidget.id 
        ? { ...w, x: newGridX, y: newGridY }
        : w
    ));

    // Reset visual state
    const element = document.querySelector(`[data-widget-id="${draggedWidget.id}"]`);
    if (element) {
      element.style.transform = '';
      element.style.zIndex = '';
      element.style.cursor = '';
      element.style.opacity = '';
    }

    setDraggedWidget(null);
  }, [draggedWidget, gridColumns, gridGap]);

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      padding: '48px 24px',
      backgroundColor: config?.backgroundColor || '#F8F8F8',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      gap: config?.gridGap || '20px',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative'
    },
    widget: {
      backgroundColor: config?.widgetBackgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '12px',
      padding: config?.widgetPadding || '24px',
      boxShadow: (config?.showShadow !== false) ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
      cursor: enableDrag ? 'grab' : 'default',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      touchAction: 'none',
      position: 'relative'
    },
    widgetTitle: {
      fontSize: config?.titleSize || '14px',
      fontWeight: '500',
      color: config?.secondaryTextColor || '#6B6B6B',
      marginBottom: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    metricValue: {
      fontSize: config?.valueSize || '32px',
      fontWeight: '300',
      color: config?.primaryTextColor || '#1A1A1A',
      lineHeight: '1',
      marginBottom: '8px'
    },
    change: {
      fontSize: '14px',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px'
    },
    listItem: {
      fontSize: '14px',
      color: config?.primaryTextColor || '#1A1A1A',
      padding: '10px 0',
      borderBottom: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: 'rgba(0,0,0,0.06)',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '16px'
    },
    progressFill: {
      height: '100%',
      backgroundColor: config?.accentColor || '#1A1A1A',
      borderRadius: '4px',
      transition: `width ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    }
  };

  const renderMetricWidget = (widget) => (
    <>
      <div style={styles.widgetTitle}>{widget.title}</div>
      <div style={styles.metricValue}>{widget.value}</div>
      <div style={{...styles.change, color: widget.changePositive ? (config?.positiveColor || '#10B981') : (config?.negativeColor || '#EF4444')}}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path 
            d={widget.changePositive ? "M8 4v8M4 8l4-4 4 4" : "M8 12V4M4 8l4 4 4-4"} 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
        {widget.change}
      </div>
    </>
  );

  const renderChartWidget = (widget) => {
    const data = widget.data || [];
    const max = Math.max(...data);
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / max) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <>
        <div style={styles.widgetTitle}>{widget.title}</div>
        <svg width="100%" height="120" viewBox="0 0 100 100" preserveAspectRatio="none" style={{marginTop: '16px'}}>
          <polyline
            points={points}
            fill="none"
            stroke={config?.chartColor || '#1A1A1A'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </>
    );
  };

  const renderListWidget = (widget) => (
    <>
      <div style={styles.widgetTitle}>{widget.title}</div>
      <div>
        {(widget.items || []).map((item, idx) => (
          <div key={idx} style={{...styles.listItem, borderBottom: idx === widget.items.length - 1 ? 'none' : styles.listItem.borderBottom}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke={config?.accentColor || '#1A1A1A'} strokeWidth="1.5" />
              <circle cx="8" cy="8" r="3" fill={config?.accentColor || '#1A1A1A'} />
            </svg>
            {item}
          </div>
        ))}
      </div>
    </>
  );

  const renderProgressWidget = (widget) => (
    <>
      <div style={styles.widgetTitle}>{widget.title}</div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '16px'}}>
        <span style={{fontSize: '28px', fontWeight: '300', color: config?.primaryTextColor || '#1A1A1A'}}>
          {widget.value}%
        </span>
        <span style={{fontSize: '14px', color: config?.secondaryTextColor || '#6B6B6B'}}>
          of {widget.target}
        </span>
      </div>
      <div style={styles.progressBar}>
        <div style={{...styles.progressFill, width: `${widget.value}%`}} />
      </div>
    </>
  );

  const renderWidget = (widget) => {
    switch(widget.type) {
      case 'metric': return renderMetricWidget(widget);
      case 'chart': return renderChartWidget(widget);
      case 'list': return renderListWidget(widget);
      case 'progress': return renderProgressWidget(widget);
      default: return null;
    }
  };

  return (
    <div style={styles.container} className="dashboard-grid-container">
      <div ref={gridRef} style={styles.grid}>
        {widgets.map((widget) => (
          <div
            key={widget.id}
            data-widget-id={widget.id}
            style={{
              ...styles.widget,
              gridColumn: `span ${widget.width}`,
              gridRow: `span ${widget.height}`
            }}
            onPointerDown={(e) => handlePointerDown(e, widget)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={(e) => {
              if (!draggedWidget) {
                e.currentTarget.style.boxShadow = (config?.showShadow !== false) ? '0 8px 24px rgba(0,0,0,0.08)' : 'none';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!draggedWidget) {
                e.currentTarget.style.boxShadow = (config?.showShadow !== false) ? '0 2px 8px rgba(0,0,0,0.04)' : 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {renderWidget(widget)}
          </div>
        ))}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
