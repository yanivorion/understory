import React from "react";

const MANIFEST = {
  "type": "Dashboard.MetricCard",
  "description": "Clean dashboard metric card with trend indicator, sparkline visualization, and period comparison",
  "editorElement": {
    "selector": ".metric-card-container",
    "displayName": "Metric Card",
    "archetype": "container",
    "data": {
      "metricLabel": {
        "dataType": "text",
        "displayName": "Metric Label",
        "defaultValue": "Total Revenue",
        "group": "Content"
      },
      "currentValue": {
        "dataType": "text",
        "displayName": "Current Value",
        "defaultValue": "124,593",
        "group": "Content"
      },
      "valuePrefix": {
        "dataType": "text",
        "displayName": "Value Prefix",
        "defaultValue": "$",
        "group": "Content"
      },
      "valueSuffix": {
        "dataType": "text",
        "displayName": "Value Suffix",
        "defaultValue": "",
        "group": "Content"
      },
      "trendPercentage": {
        "dataType": "text",
        "displayName": "Trend Percentage",
        "defaultValue": "12.5",
        "group": "Content"
      },
      "trendDirection": {
        "dataType": "select",
        "displayName": "Trend Direction",
        "defaultValue": "up",
        "options": ["up", "down", "neutral"],
        "group": "Content"
      },
      "comparisonLabel": {
        "dataType": "text",
        "displayName": "Comparison Label",
        "defaultValue": "vs last month",
        "group": "Content"
      },
      "sparklineData": {
        "dataType": "text",
        "displayName": "Sparkline Data (comma-separated)",
        "defaultValue": "65,72,68,85,92,88,95,110,105,115,120,124",
        "group": "Content"
      },
      "showSparkline": {
        "dataType": "booleanValue",
        "displayName": "Show Sparkline",
        "defaultValue": true,
        "group": "Content"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(100, 116, 139, 0.12)",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#64748B",
        "group": "Colors"
      },
      "valueColor": {
        "dataType": "color",
        "displayName": "Value Color",
        "defaultValue": "#1E293B",
        "group": "Colors"
      },
      "trendUpColor": {
        "dataType": "color",
        "displayName": "Trend Up Color",
        "defaultValue": "#059669",
        "group": "Colors"
      },
      "trendDownColor": {
        "dataType": "color",
        "displayName": "Trend Down Color",
        "defaultValue": "#DC2626",
        "group": "Colors"
      },
      "trendNeutralColor": {
        "dataType": "color",
        "displayName": "Trend Neutral Color",
        "defaultValue": "#94A3B8",
        "group": "Colors"
      },
      "sparklineColor": {
        "dataType": "color",
        "displayName": "Sparkline Color",
        "defaultValue": "#94A3B8",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui, -apple-system, sans-serif",
        "options": [
          "system-ui, -apple-system, sans-serif",
          "Inter, sans-serif",
          "Georgia, serif"
        ],
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "select",
        "displayName": "Label Size",
        "defaultValue": "14px",
        "options": ["12px", "13px", "14px", "15px"],
        "group": "Typography"
      },
      "valueSize": {
        "dataType": "select",
        "displayName": "Value Size",
        "defaultValue": "32px",
        "options": ["28px", "32px", "36px", "40px", "48px"],
        "group": "Typography"
      },
      "trendSize": {
        "dataType": "select",
        "displayName": "Trend Size",
        "defaultValue": "14px",
        "options": ["12px", "13px", "14px", "15px", "16px"],
        "group": "Typography"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "24px",
        "options": ["20px", "24px", "28px", "32px"],
        "group": "Layout"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "8px",
        "options": ["4px", "6px", "8px", "10px", "12px"],
        "group": "Layout"
      },
      "sparklineHeight": {
        "dataType": "select",
        "displayName": "Sparkline Height",
        "defaultValue": "48px",
        "options": ["32px", "40px", "48px", "56px", "64px"],
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
  const canvasRef = React.useRef(null);
  
  const metricLabel = config?.metricLabel || "Total Revenue";
  const currentValue = config?.currentValue || "124,593";
  const valuePrefix = config?.valuePrefix || "$";
  const valueSuffix = config?.valueSuffix || "";
  const trendPercentage = config?.trendPercentage || "12.5";
  const trendDirection = config?.trendDirection || "up";
  const comparisonLabel = config?.comparisonLabel || "vs last month";
  const sparklineDataString = config?.sparklineData || "65,72,68,85,92,88,95,110,105,115,120,124";
  const showSparkline = config?.showSparkline !== false;
  
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const borderColor = config?.borderColor || "rgba(100, 116, 139, 0.12)";
  const labelColor = config?.labelColor || "#64748B";
  const valueColor = config?.valueColor || "#1E293B";
  const trendUpColor = config?.trendUpColor || "#059669";
  const trendDownColor = config?.trendDownColor || "#DC2626";
  const trendNeutralColor = config?.trendNeutralColor || "#94A3B8";
  const sparklineColor = config?.sparklineColor || "#94A3B8";
  
  const fontFamily = config?.fontFamily || "system-ui, -apple-system, sans-serif";
  const labelSize = config?.labelSize || "14px";
  const valueSize = config?.valueSize || "32px";
  const trendSize = config?.trendSize || "14px";
  const cardPadding = config?.cardPadding || "24px";
  const cornerRadius = config?.cornerRadius || "8px";
  const sparklineHeight = parseInt(config?.sparklineHeight || "48");
  
  const sparklineData = sparklineDataString.split(',').map(v => parseFloat(v.trim()));
  
  const getTrendColor = () => {
    if (trendDirection === 'up') return trendUpColor;
    if (trendDirection === 'down') return trendDownColor;
    return trendNeutralColor;
  };
  
  const getTrendIcon = () => {
    if (trendDirection === 'up') return '↑';
    if (trendDirection === 'down') return '↓';
    return '→';
  };
  
  React.useEffect(() => {
    if (!showSparkline || !canvasRef.current || sparklineData.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    const width = canvas.offsetWidth;
    const height = sparklineHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);
    
    const padding = 4;
    const drawWidth = width - padding * 2;
    const drawHeight = height - padding * 2;
    
    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min || 1;
    
    const stepX = drawWidth / (sparklineData.length - 1);
    
    ctx.beginPath();
    ctx.strokeStyle = sparklineColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    sparklineData.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + drawHeight - ((value - min) / range) * drawHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    ctx.beginPath();
    ctx.fillStyle = `${sparklineColor}15`;
    
    sparklineData.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + drawHeight - ((value - min) / range) * drawHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(padding + (sparklineData.length - 1) * stepX, padding + drawHeight);
    ctx.lineTo(padding, padding + drawHeight);
    ctx.closePath();
    ctx.fill();
    
  }, [sparklineData, showSparkline, sparklineColor, sparklineHeight]);
  
  const containerStyle = {
    display: 'inline-block',
    minWidth: '280px',
    maxWidth: '100%'
  };
  
  const cardStyle = {
    backgroundColor: cardBackground,
    border: `1px solid ${borderColor}`,
    borderRadius: cornerRadius,
    padding: cardPadding,
    fontFamily,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
  };
  
  const headerStyle = {
    marginBottom: '16px'
  };
  
  const labelStyle = {
    fontSize: labelSize,
    fontWeight: '500',
    color: labelColor,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px'
  };
  
  const valueContainerStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginBottom: '12px'
  };
  
  const prefixStyle = {
    fontSize: `calc(${valueSize} * 0.6)`,
    fontWeight: '400',
    color: valueColor,
    opacity: 0.7
  };
  
  const valueStyle = {
    fontSize: valueSize,
    fontWeight: '300',
    color: valueColor,
    lineHeight: '1'
  };
  
  const suffixStyle = {
    fontSize: `calc(${valueSize} * 0.5)`,
    fontWeight: '400',
    color: valueColor,
    opacity: 0.7
  };
  
  const trendContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: showSparkline ? '20px' : '0'
  };
  
  const trendBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: `${getTrendColor()}15`,
    color: getTrendColor(),
    fontSize: trendSize,
    fontWeight: '500'
  };
  
  const comparisonStyle = {
    fontSize: `calc(${trendSize} - 1px)`,
    color: labelColor,
    fontWeight: '400'
  };
  
  const sparklineContainerStyle = {
    display: showSparkline ? 'block' : 'none',
    marginTop: '16px'
  };
  
  return (
    <div className="metric-card-container" style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={labelStyle}>{metricLabel}</div>
          
          <div style={valueContainerStyle}>
            {valuePrefix && <span style={prefixStyle}>{valuePrefix}</span>}
            <span style={valueStyle}>{currentValue}</span>
            {valueSuffix && <span style={suffixStyle}>{valueSuffix}</span>}
          </div>
          
          <div style={trendContainerStyle}>
            <div style={trendBadgeStyle}>
              <span>{getTrendIcon()}</span>
              <span>{trendPercentage}%</span>
            </div>
            <span style={comparisonStyle}>{comparisonLabel}</span>
          </div>
        </div>
        
        <div style={sparklineContainerStyle}>
          <canvas 
            ref={canvasRef}
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
