import React from "react";

const MANIFEST = {
  "type": "Interactive.ColorPickerWheel",
  "description": "Advanced color picker with HSV wheel and saturation/brightness adjustment in center",
  "editorElement": {
    "selector": ".color-picker-wheel",
    "displayName": "Color Picker Wheel",
    "archetype": "container",
    "data": {
      "defaultColor": {
        "dataType": "color",
        "displayName": "Default Color",
        "defaultValue": "#FF6B6B",
        "group": "Content"
      },
      "wheelSize": {
        "dataType": "select",
        "displayName": "Wheel Size",
        "defaultValue": "280",
        "options": ["220", "260", "280", "320", "360"],
        "group": "Layout"
      },
      "showHexInput": {
        "dataType": "booleanValue",
        "displayName": "Show Hex Input",
        "defaultValue": true,
        "group": "Content"
      },
      "showRgbValues": {
        "dataType": "booleanValue",
        "displayName": "Show RGB Values",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const defaultColor = config?.defaultColor || '#FF6B6B';
  const wheelSize = parseInt(config?.wheelSize || '280');
  const showHexInput = config?.showHexInput !== false;
  const showRgbValues = config?.showRgbValues !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const accentColor = config?.accentColor || '#495057';
  
  const hexToHsv = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
      if (max === r) h = ((g - b) / delta) % 6;
      else if (max === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }
    const s = max === 0 ? 0 : delta / max;
    const v = max;
    return { h, s, v };
  };
  
  const hsvToHex = (h, s, v) => {
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
    const toHex = (n) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  };
  
  const initialHsv = hexToHsv(defaultColor);
  const [hue, setHue] = React.useState(initialHsv.h);
  const [saturation, setSaturation] = React.useState(initialHsv.s);
  const [brightness, setBrightness] = React.useState(initialHsv.v);
  const [isDraggingWheel, setIsDraggingWheel] = React.useState(false);
  const [isDraggingCenter, setIsDraggingCenter] = React.useState(false);
  
  const wheelRef = React.useRef(null);
  const centerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  
  const currentColor = hsvToHex(hue, saturation, brightness);
  
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  
  const rgb = hexToRgb(currentColor);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = wheelSize;
    const center = size / 2;
    const outerRadius = size / 2;
    const innerRadius = size / 2 * 0.65;
    
    canvas.width = size;
    canvas.height = size;
    
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = (angle - 90) * Math.PI / 180;
      const endAngle = (angle + 1 - 90) * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, outerRadius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = hsvToHex(angle, 1, 1);
      ctx.fill();
    }
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(center, center, innerRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }, [wheelSize]);
  
  const handleWheelInteraction = (e) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    const angle = Math.atan2(y, x) * 180 / Math.PI + 90;
    const newHue = angle < 0 ? angle + 360 : angle;
    setHue(newHue);
  };
  
  const handleCenterInteraction = (e) => {
    if (!centerRef.current) return;
    const rect = centerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setSaturation(Math.max(0, Math.min(1, x)));
    setBrightness(Math.max(0, Math.min(1, 1 - y)));
  };
  
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingWheel) handleWheelInteraction(e);
      if (isDraggingCenter) handleCenterInteraction(e);
    };
    
    const handleMouseUp = () => {
      setIsDraggingWheel(false);
      setIsDraggingCenter(false);
    };
    
    if (isDraggingWheel || isDraggingCenter) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingWheel, isDraggingCenter]);
  
  const handleHexChange = (e) => {
    const hex = e.target.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      const hsv = hexToHsv(hex);
      setHue(hsv.h);
      setSaturation(hsv.s);
      setBrightness(hsv.v);
    }
  };
  
  const centerSize = wheelSize * 0.65;
  const indicatorAngle = (hue - 90) * Math.PI / 180;
  const indicatorRadius = wheelSize / 2 * 0.825;
  const indicatorX = Math.cos(indicatorAngle) * indicatorRadius;
  const indicatorY = Math.sin(indicatorAngle) * indicatorRadius;
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        <div style={{ position: 'relative', width: `${wheelSize}px`, height: `${wheelSize}px` }}>
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              cursor: 'crosshair',
              borderRadius: '50%'
            }}
          />
          
          <div
            ref={wheelRef}
            onMouseDown={(e) => {
              setIsDraggingWheel(true);
              handleWheelInteraction(e);
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'crosshair',
              borderRadius: '50%'
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(${indicatorX}px, ${indicatorY}px) translate(-50%, -50%)`,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '3px solid #FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              pointerEvents: 'none',
              transition: 'transform 100ms ease-out'
            }}
          />
          
          <div
            ref={centerRef}
            onMouseDown={(e) => {
              setIsDraggingCenter(true);
              handleCenterInteraction(e);
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${centerSize}px`,
              height: `${centerSize}px`,
              borderRadius: '50%',
              cursor: 'crosshair',
              background: `linear-gradient(to top, #000000, transparent),
                          linear-gradient(to right, #FFFFFF, ${hsvToHex(hue, 1, 1)})`,
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.2)'
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(${saturation * centerSize - centerSize / 2}px, ${(1 - brightness) * centerSize - centerSize / 2}px) translate(-50%, -50%)`,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: '3px solid #FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              pointerEvents: 'none',
              transition: 'transform 100ms ease-out'
            }}
          />
        </div>
        
        <div style={{
          width: `${wheelSize}px`,
          padding: '24px',
          backgroundColor: `${accentColor}08`,
          borderRadius: '8px',
          border: `1px solid ${accentColor}20`
        }}>
          <div style={{
            width: '100%',
            height: '60px',
            backgroundColor: currentColor,
            borderRadius: '6px',
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }} />
          
          {showHexInput && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: accentColor,
                marginBottom: '6px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Hex
              </label>
              <input
                type="text"
                value={currentColor.toUpperCase()}
                onChange={handleHexChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  fontFamily: '"SF Mono", Monaco, monospace',
                  border: `1px solid ${accentColor}30`,
                  borderRadius: '6px',
                  backgroundColor: backgroundColor,
                  color: textColor,
                  outline: 'none'
                }}
              />
            </div>
          )}
          
          {showRgbValues && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              {['R', 'G', 'B'].map((label, i) => (
                <div key={label}>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: accentColor,
                    marginBottom: '6px',
                    letterSpacing: '0.05em'
                  }}>
                    {label}
                  </label>
                  <div style={{
                    padding: '10px 12px',
                    fontSize: '14px',
                    fontFamily: '"SF Mono", Monaco, monospace',
                    border: `1px solid ${accentColor}30`,
                    borderRadius: '6px',
                    backgroundColor: backgroundColor,
                    color: textColor,
                    textAlign: 'center'
                  }}>
                    {i === 0 ? rgb.r : i === 1 ? rgb.g : rgb.b}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
