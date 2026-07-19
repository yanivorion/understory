import React from "react";

const MANIFEST = {
  "type": "Interactive.RangeSlider",
  "description": "Dual-handle range slider with magnetic snapping, momentum drag, and value preview",
  "editorElement": {
    "selector": ".range-slider",
    "displayName": "Range Slider",
    "archetype": "container",
    "data": {
      "minValue": {
        "dataType": "number",
        "displayName": "Minimum Value",
        "defaultValue": 0,
        "group": "Content"
      },
      "maxValue": {
        "dataType": "number",
        "displayName": "Maximum Value",
        "defaultValue": 100,
        "group": "Content"
      },
      "defaultMin": {
        "dataType": "number",
        "displayName": "Default Min",
        "defaultValue": 25,
        "group": "Content"
      },
      "defaultMax": {
        "dataType": "number",
        "displayName": "Default Max",
        "defaultValue": 75,
        "group": "Content"
      },
      "step": {
        "dataType": "select",
        "displayName": "Step Size",
        "defaultValue": "1",
        "options": ["1", "5", "10", "25"],
        "group": "Content"
      },
      "magneticSnap": {
        "dataType": "booleanValue",
        "displayName": "Magnetic Snap",
        "defaultValue": true,
        "group": "Content"
      },
      "showValues": {
        "dataType": "booleanValue",
        "displayName": "Show Values",
        "defaultValue": true,
        "group": "Content"
      },
      "showRange": {
        "dataType": "booleanValue",
        "displayName": "Show Range Label",
        "defaultValue": true,
        "group": "Content"
      },
      "sliderWidth": {
        "dataType": "select",
        "displayName": "Slider Width",
        "defaultValue": "400",
        "options": ["300", "350", "400", "500", "600"],
        "group": "Layout"
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
      "trackColor": {
        "dataType": "color",
        "displayName": "Track Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "rangeColor": {
        "dataType": "color",
        "displayName": "Range Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "handleColor": {
        "dataType": "color",
        "displayName": "Handle Color",
        "defaultValue": "#343A40",
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
  const minValue = parseInt(config?.minValue || '0');
  const maxValue = parseInt(config?.maxValue || '100');
  const defaultMin = parseInt(config?.defaultMin || '25');
  const defaultMax = parseInt(config?.defaultMax || '75');
  const step = parseInt(config?.step || '1');
  const magneticSnap = config?.magneticSnap !== false;
  const showValues = config?.showValues !== false;
  const showRange = config?.showRange !== false;
  const sliderWidth = parseInt(config?.sliderWidth || '400');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const trackColor = config?.trackColor || '#E4E4E7';
  const rangeColor = config?.rangeColor || '#495057';
  const handleColor = config?.handleColor || '#343A40';
  const accentColor = config?.accentColor || '#495057';
  
  const [minSelected, setMinSelected] = React.useState(defaultMin);
  const [maxSelected, setMaxSelected] = React.useState(defaultMax);
  const [isDraggingMin, setIsDraggingMin] = React.useState(false);
  const [isDraggingMax, setIsDraggingMax] = React.useState(false);
  const [hoverHandle, setHoverHandle] = React.useState(null);
  const [magneticOffset, setMagneticOffset] = React.useState({ min: 0, max: 0 });
  
  const trackRef = React.useRef(null);
  const velocityRef = React.useRef({ min: 0, max: 0 });
  const lastPosRef = React.useRef({ min: 0, max: 0 });
  const lastTimeRef = React.useRef(Date.now());
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const snapToStep = (value) => {
    return Math.round(value / step) * step;
  };
  
  const getValueFromPosition = (clientX) => {
    if (!trackRef.current) return minValue;
    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const rawValue = minValue + percentage * (maxValue - minValue);
    return snapToStep(rawValue);
  };
  
  const handleMouseMove = (e) => {
    if (!isDraggingMin && !isDraggingMax) return;
    
    const newValue = getValueFromPosition(e.clientX);
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    
    if (isDraggingMin) {
      const clampedValue = Math.min(newValue, maxSelected - step);
      if (dt > 0) {
        const delta = clampedValue - lastPosRef.current.min;
        velocityRef.current.min = (delta / dt) * 16;
      }
      lastPosRef.current.min = clampedValue;
      setMinSelected(clampedValue);
      
      if (magneticSnap && !prefersReducedMotion) {
        const snapPoints = [minValue, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue];
        const closest = snapPoints.reduce((prev, curr) =>
          Math.abs(curr - clampedValue) < Math.abs(prev - clampedValue) ? curr : prev
        );
        const distance = Math.abs(closest - clampedValue);
        if (distance < step * 3) {
          const strength = 1 - distance / (step * 3);
          setMagneticOffset(prev => ({ ...prev, min: (closest - clampedValue) * strength * 0.3 }));
        } else {
          setMagneticOffset(prev => ({ ...prev, min: 0 }));
        }
      }
    }
    
    if (isDraggingMax) {
      const clampedValue = Math.max(newValue, minSelected + step);
      if (dt > 0) {
        const delta = clampedValue - lastPosRef.current.max;
        velocityRef.current.max = (delta / dt) * 16;
      }
      lastPosRef.current.max = clampedValue;
      setMaxSelected(clampedValue);
      
      if (magneticSnap && !prefersReducedMotion) {
        const snapPoints = [minValue, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue];
        const closest = snapPoints.reduce((prev, curr) =>
          Math.abs(curr - clampedValue) < Math.abs(prev - clampedValue) ? curr : prev
        );
        const distance = Math.abs(closest - clampedValue);
        if (distance < step * 3) {
          const strength = 1 - distance / (step * 3);
          setMagneticOffset(prev => ({ ...prev, max: (closest - clampedValue) * strength * 0.3 }));
        } else {
          setMagneticOffset(prev => ({ ...prev, max: 0 }));
        }
      }
    }
    
    lastTimeRef.current = now;
  };
  
  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
    setMagneticOffset({ min: 0, max: 0 });
  };
  
  React.useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingMin, isDraggingMax, minSelected, maxSelected]);
  
  const minPercentage = ((minSelected + magneticOffset.min - minValue) / (maxValue - minValue)) * 100;
  const maxPercentage = ((maxSelected + magneticOffset.max - minValue) / (maxValue - minValue)) * 100;
  
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
      <div style={{
        width: `${sliderWidth}px`,
        padding: '40px',
        backgroundColor: `${accentColor}08`,
        borderRadius: '12px',
        border: `1px solid ${accentColor}20`
      }}>
        {showRange && (
          <div style={{
            fontSize: '24px',
            fontWeight: '500',
            color: textColor,
            marginBottom: '32px',
            textAlign: 'center',
            letterSpacing: '-0.01em'
          }}>
            ${minSelected.toLocaleString()} - ${maxSelected.toLocaleString()}
          </div>
        )}
        
        <div style={{ position: 'relative', padding: '20px 0' }}>
          <div
            ref={trackRef}
            style={{
              position: 'relative',
              height: '6px',
              backgroundColor: trackColor,
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: `${minPercentage}%`,
                right: `${100 - maxPercentage}%`,
                height: '100%',
                backgroundColor: rangeColor,
                borderRadius: '3px',
                transition: prefersReducedMotion ? 'none' : 'all 100ms ease-out'
              }}
            />
          </div>
          
          <div
            onMouseDown={() => setIsDraggingMin(true)}
            onMouseEnter={() => setHoverHandle('min')}
            onMouseLeave={() => setHoverHandle(null)}
            style={{
              position: 'absolute',
              left: `${minPercentage}%`,
              top: '50%',
              transform: `translate(-50%, -50%) scale(${hoverHandle === 'min' || isDraggingMin ? 1.15 : 1})`,
              width: '24px',
              height: '24px',
              backgroundColor: handleColor,
              borderRadius: '50%',
              cursor: 'grab',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              transition: prefersReducedMotion ? 'none' : 'transform 200ms ease-out',
              zIndex: isDraggingMin ? 10 : 1
            }}
          >
            {showValues && (hoverHandle === 'min' || isDraggingMin) && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '12px',
                padding: '6px 12px',
                backgroundColor: textColor,
                color: backgroundColor,
                fontSize: '13px',
                fontWeight: '500',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                opacity: prefersReducedMotion ? 1 : (hoverHandle === 'min' || isDraggingMin ? 1 : 0),
                transition: 'opacity 200ms ease-out',
                pointerEvents: 'none'
              }}>
                ${minSelected.toLocaleString()}
              </div>
            )}
          </div>
          
          <div
            onMouseDown={() => setIsDraggingMax(true)}
            onMouseEnter={() => setHoverHandle('max')}
            onMouseLeave={() => setHoverHandle(null)}
            style={{
              position: 'absolute',
              left: `${maxPercentage}%`,
              top: '50%',
              transform: `translate(-50%, -50%) scale(${hoverHandle === 'max' || isDraggingMax ? 1.15 : 1})`,
              width: '24px',
              height: '24px',
              backgroundColor: handleColor,
              borderRadius: '50%',
              cursor: 'grab',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              transition: prefersReducedMotion ? 'none' : 'transform 200ms ease-out',
              zIndex: isDraggingMax ? 10 : 1
            }}
          >
            {showValues && (hoverHandle === 'max' || isDraggingMax) && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '12px',
                padding: '6px 12px',
                backgroundColor: textColor,
                color: backgroundColor,
                fontSize: '13px',
                fontWeight: '500',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                opacity: prefersReducedMotion ? 1 : (hoverHandle === 'max' || isDraggingMax ? 1 : 0),
                transition: 'opacity 200ms ease-out',
                pointerEvents: 'none'
              }}>
                ${maxSelected.toLocaleString()}
              </div>
            )}
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '32px',
          fontSize: '14px',
          color: accentColor
        }}>
          <span>${minValue.toLocaleString()}</span>
          <span>${maxValue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
