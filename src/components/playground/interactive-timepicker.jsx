import React from "react";

const MANIFEST = {
  "type": "Interactive.TimePicker",
  "description": "Time picker with rotating hour/minute wheels, smooth scrolling, and 12/24 hour format",
  "editorElement": {
    "selector": ".time-picker",
    "displayName": "Time Picker",
    "archetype": "container",
    "data": {
      "defaultHour": {
        "dataType": "number",
        "displayName": "Default Hour",
        "defaultValue": 12,
        "group": "Content"
      },
      "defaultMinute": {
        "dataType": "number",
        "displayName": "Default Minute",
        "defaultValue": 30,
        "group": "Content"
      },
      "format24Hour": {
        "dataType": "booleanValue",
        "displayName": "24-Hour Format",
        "defaultValue": false,
        "group": "Content"
      },
      "minuteStep": {
        "dataType": "select",
        "displayName": "Minute Step",
        "defaultValue": "1",
        "options": ["1", "5", "10", "15", "30"],
        "group": "Content"
      },
      "showNowButton": {
        "dataType": "booleanValue",
        "displayName": "Show Now Button",
        "defaultValue": true,
        "group": "Content"
      },
      "wheelHeight": {
        "dataType": "select",
        "displayName": "Wheel Height",
        "defaultValue": "200",
        "options": ["150", "180", "200", "250"],
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
      "selectedColor": {
        "dataType": "color",
        "displayName": "Selected Color",
        "defaultValue": "#495057",
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
  const defaultHour = parseInt(config?.defaultHour || '12');
  const defaultMinute = parseInt(config?.defaultMinute || '30');
  const format24Hour = config?.format24Hour === true;
  const minuteStep = parseInt(config?.minuteStep || '1');
  const showNowButton = config?.showNowButton !== false;
  const wheelHeight = parseInt(config?.wheelHeight || '200');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const selectedColor = config?.selectedColor || '#495057';
  const accentColor = config?.accentColor || '#495057';
  
  const [hour, setHour] = React.useState(defaultHour);
  const [minute, setMinute] = React.useState(defaultMinute);
  const [period, setPeriod] = React.useState(defaultHour >= 12 ? 'PM' : 'AM');
  
  const hourRef = React.useRef(null);
  const minuteRef = React.useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const hours = format24Hour 
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1);
  
  const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);
  
  const itemHeight = 44;
  const centerOffset = (wheelHeight - itemHeight) / 2;
  
  const scrollToValue = (ref, value, items) => {
    if (!ref.current) return;
    const index = items.indexOf(value);
    const scrollTop = index * itemHeight;
    ref.current.scrollTop = scrollTop;
  };
  
  React.useEffect(() => {
    scrollToValue(hourRef, hour, hours);
    scrollToValue(minuteRef, minute, minutes);
  }, []);
  
  const handleHourScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const newHour = hours[index];
    if (newHour !== undefined && newHour !== hour) {
      setHour(newHour);
    }
  };
  
  const handleMinuteScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const newMinute = minutes[index];
    if (newMinute !== undefined && newMinute !== minute) {
      setMinute(newMinute);
    }
  };
  
  const handleScrollEnd = (ref, value, items) => {
    if (!ref.current) return;
    const index = items.indexOf(value);
    const targetScroll = index * itemHeight;
    
    ref.current.scrollTo({
      top: targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };
  
  React.useEffect(() => {
    const hourTimer = setTimeout(() => handleScrollEnd(hourRef, hour, hours), 150);
    return () => clearTimeout(hourTimer);
  }, [hour]);
  
  React.useEffect(() => {
    const minuteTimer = setTimeout(() => handleScrollEnd(minuteRef, minute, minutes), 150);
    return () => clearTimeout(minuteTimer);
  }, [minute]);
  
  const setCurrentTime = () => {
    const now = new Date();
    let currentHour = now.getHours();
    const currentMinute = Math.floor(now.getMinutes() / minuteStep) * minuteStep;
    
    if (!format24Hour) {
      setPeriod(currentHour >= 12 ? 'PM' : 'AM');
      currentHour = currentHour % 12 || 12;
    }
    
    setHour(currentHour);
    setMinute(currentMinute);
    
    setTimeout(() => {
      scrollToValue(hourRef, currentHour, hours);
      scrollToValue(minuteRef, currentMinute, minutes);
    }, 50);
  };
  
  const formatTime = () => {
    const h = format24Hour ? hour : hour;
    const m = minute.toString().padStart(2, '0');
    return format24Hour ? `${h.toString().padStart(2, '0')}:${m}` : `${h}:${m} ${period}`;
  };
  
  const getOpacity = (index, selectedIndex) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.6;
    if (distance === 2) return 0.3;
    return 0.15;
  };
  
  const getScale = (index, selectedIndex) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.85;
    return 0.75;
  };
  
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
        padding: '32px',
        backgroundColor: `${accentColor}08`,
        borderRadius: '12px',
        border: `1px solid ${accentColor}20`
      }}>
        <div style={{
          fontSize: '32px',
          fontWeight: '500',
          color: textColor,
          textAlign: 'center',
          marginBottom: '24px',
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {formatTime()}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            position: 'relative',
            width: '80px'
          }}>
            <div style={{
              position: 'absolute',
              top: centerOffset,
              left: 0,
              right: 0,
              height: itemHeight,
              backgroundColor: `${selectedColor}15`,
              borderRadius: '8px',
              border: `2px solid ${selectedColor}30`,
              pointerEvents: 'none',
              zIndex: 1
            }} />
            
            <div
              ref={hourRef}
              onScroll={handleHourScroll}
              style={{
                height: `${wheelHeight}px`,
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                position: 'relative',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
              }}
            >
              <div style={{ height: centerOffset }} />
              {hours.map((h, index) => (
                <div
                  key={h}
                  onClick={() => {
                    setHour(h);
                    scrollToValue(hourRef, h, hours);
                  }}
                  style={{
                    height: `${itemHeight}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: hour === h ? '500' : '400',
                    color: hour === h ? selectedColor : textColor,
                    cursor: 'pointer',
                    scrollSnapAlign: 'start',
                    transition: 'all 200ms ease-out',
                    opacity: getOpacity(index, hours.indexOf(hour)),
                    transform: prefersReducedMotion ? 'none' : `scale(${getScale(index, hours.indexOf(hour))})`,
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {format24Hour ? h.toString().padStart(2, '0') : h}
                </div>
              ))}
              <div style={{ height: centerOffset }} />
            </div>
          </div>
          
          <div style={{
            fontSize: '24px',
            fontWeight: '500',
            color: textColor
          }}>
            :
          </div>
          
          <div style={{
            position: 'relative',
            width: '80px'
          }}>
            <div style={{
              position: 'absolute',
              top: centerOffset,
              left: 0,
              right: 0,
              height: itemHeight,
              backgroundColor: `${selectedColor}15`,
              borderRadius: '8px',
              border: `2px solid ${selectedColor}30`,
              pointerEvents: 'none',
              zIndex: 1
            }} />
            
            <div
              ref={minuteRef}
              onScroll={handleMinuteScroll}
              style={{
                height: `${wheelHeight}px`,
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                position: 'relative',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
              }}
            >
              <div style={{ height: centerOffset }} />
              {minutes.map((m, index) => (
                <div
                  key={m}
                  onClick={() => {
                    setMinute(m);
                    scrollToValue(minuteRef, m, minutes);
                  }}
                  style={{
                    height: `${itemHeight}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: minute === m ? '500' : '400',
                    color: minute === m ? selectedColor : textColor,
                    cursor: 'pointer',
                    scrollSnapAlign: 'start',
                    transition: 'all 200ms ease-out',
                    opacity: getOpacity(index, minutes.indexOf(minute)),
                    transform: prefersReducedMotion ? 'none' : `scale(${getScale(index, minutes.indexOf(minute))})`,
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {m.toString().padStart(2, '0')}
                </div>
              ))}
              <div style={{ height: centerOffset }} />
            </div>
          </div>
          
          {!format24Hour && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {['AM', 'PM'].map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: period === p ? selectedColor : `${accentColor}15`,
                    color: period === p ? backgroundColor : textColor,
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 200ms ease-out'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {showNowButton && (
          <button
            onClick={setCurrentTime}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: `${selectedColor}20`,
              color: selectedColor,
              border: `1px solid ${selectedColor}30`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${selectedColor}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${selectedColor}20`;
            }}
          >
            Set to Now
          </button>
        )}
        
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
