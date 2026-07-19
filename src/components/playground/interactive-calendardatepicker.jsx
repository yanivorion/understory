import React from "react";

const MANIFEST = {
  "type": "Interactive.CalendarDatePicker",
  "description": "Calendar date picker with sliding month transitions, date range selection, and keyboard navigation",
  "editorElement": {
    "selector": ".calendar-date-picker",
    "displayName": "Calendar Date Picker",
    "archetype": "container",
    "data": {
      "enableRangeSelection": {
        "dataType": "booleanValue",
        "displayName": "Enable Range Selection",
        "defaultValue": false,
        "group": "Content"
      },
      "showWeekNumbers": {
        "dataType": "booleanValue",
        "displayName": "Show Week Numbers",
        "defaultValue": false,
        "group": "Content"
      },
      "highlightToday": {
        "dataType": "booleanValue",
        "displayName": "Highlight Today",
        "defaultValue": true,
        "group": "Content"
      },
      "firstDayOfWeek": {
        "dataType": "select",
        "displayName": "First Day of Week",
        "defaultValue": "sunday",
        "options": ["sunday", "monday"],
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
      "selectedColor": {
        "dataType": "color",
        "displayName": "Selected Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "todayColor": {
        "dataType": "color",
        "displayName": "Today Highlight",
        "defaultValue": "#3B82F6",
        "group": "Colors"
      },
      "rangeColor": {
        "dataType": "color",
        "displayName": "Range Color",
        "defaultValue": "#E4E4E7",
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
  const enableRangeSelection = config?.enableRangeSelection === true;
  const showWeekNumbers = config?.showWeekNumbers === true;
  const highlightToday = config?.highlightToday !== false;
  const firstDayOfWeek = config?.firstDayOfWeek || 'sunday';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const selectedColor = config?.selectedColor || '#495057';
  const todayColor = config?.todayColor || '#3B82F6';
  const rangeColor = config?.rangeColor || '#E4E4E7';
  const accentColor = config?.accentColor || '#495057';
  
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [rangeStart, setRangeStart] = React.useState(null);
  const [rangeEnd, setRangeEnd] = React.useState(null);
  const [slideDirection, setSlideDirection] = React.useState('none');
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDayOfWeek === 'monday' ? (day === 0 ? 6 : day - 1) : day;
  };
  
  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };
  
  const changeMonth = (direction) => {
    if (isAnimating) return;
    
    setSlideDirection(direction);
    setIsAnimating(true);
    
    setTimeout(() => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
      setCurrentDate(newDate);
      
      setTimeout(() => {
        setSlideDirection('none');
        setIsAnimating(false);
      }, 300);
    }, prefersReducedMotion ? 0 : 150);
  };
  
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (enableRangeSelection) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(clickedDate);
        setRangeEnd(null);
      } else {
        if (clickedDate < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(clickedDate);
        } else {
          setRangeEnd(clickedDate);
        }
      }
    } else {
      setSelectedDate(clickedDate);
    }
  };
  
  const isDateInRange = (day) => {
    if (!enableRangeSelection || !rangeStart) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (!rangeEnd) return false;
    return date >= rangeStart && date <= rangeEnd;
  };
  
  const isDateSelected = (day) => {
    if (enableRangeSelection) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      return (rangeStart && date.toDateString() === rangeStart.toDateString()) ||
             (rangeEnd && date.toDateString() === rangeEnd.toDateString());
    } else {
      if (!selectedDate) return false;
      return selectedDate.getDate() === day &&
             selectedDate.getMonth() === currentDate.getMonth() &&
             selectedDate.getFullYear() === currentDate.getFullYear();
    }
  };
  
  const isToday = (day) => {
    return today.getDate() === day &&
           today.getMonth() === currentDate.getMonth() &&
           today.getFullYear() === currentDate.getFullYear();
  };
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = firstDayOfWeek === 'monday'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const weeks = Math.ceil((daysInMonth + firstDay) / 7);
  
  const getSlideStyle = () => {
    if (prefersReducedMotion || slideDirection === 'none') {
      return { transform: 'translateX(0)', opacity: 1 };
    }
    
    if (isAnimating) {
      if (slideDirection === 'next') {
        return { transform: 'translateX(-100%)', opacity: 0 };
      } else {
        return { transform: 'translateX(100%)', opacity: 0 };
      }
    }
    
    return { transform: 'translateX(0)', opacity: 1 };
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
        width: '360px',
        maxWidth: '100%',
        padding: '24px',
        backgroundColor: `${accentColor}08`,
        borderRadius: '12px',
        border: `1px solid ${accentColor}20`
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => changeMonth('prev')}
            disabled={isAnimating}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              color: textColor,
              padding: '8px',
              opacity: isAnimating ? 0.5 : 1,
              transition: 'opacity 200ms ease-out'
            }}
          >
            ←
          </button>
          
          <div style={{
            fontSize: '18px',
            fontWeight: '500',
            color: textColor,
            letterSpacing: '-0.01em'
          }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          
          <button
            onClick={() => changeMonth('next')}
            disabled={isAnimating}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              color: textColor,
              padding: '8px',
              opacity: isAnimating ? 0.5 : 1,
              transition: 'opacity 200ms ease-out'
            }}
          >
            →
          </button>
        </div>
        
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            ...getSlideStyle(),
            transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: showWeekNumbers ? 'auto repeat(7, 1fr)' : 'repeat(7, 1fr)',
              gap: '4px',
              marginBottom: '8px'
            }}>
              {showWeekNumbers && <div />}
              {dayNames.map(day => (
                <div
                  key={day}
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: accentColor,
                    padding: '8px 0',
                    letterSpacing: '0.05em'
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {Array.from({ length: weeks }, (_, weekIndex) => (
              <div
                key={weekIndex}
                style={{
                  display: 'grid',
                  gridTemplateColumns: showWeekNumbers ? 'auto repeat(7, 1fr)' : 'repeat(7, 1fr)',
                  gap: '4px',
                  marginBottom: '4px'
                }}
              >
                {showWeekNumbers && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    color: accentColor,
                    opacity: 0.5,
                    paddingRight: '8px'
                  }}>
                    {getWeekNumber(new Date(currentDate.getFullYear(), currentDate.getMonth(), weekIndex * 7 + 1 - firstDay))}
                  </div>
                )}
                
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const day = weekIndex * 7 + dayIndex - firstDay + 1;
                  const isValid = day > 0 && day <= daysInMonth;
                  const selected = isValid && isDateSelected(day);
                  const inRange = isValid && isDateInRange(day);
                  const todayDate = isValid && highlightToday && isToday(day);
                  
                  return (
                    <button
                      key={dayIndex}
                      onClick={() => isValid && handleDateClick(day)}
                      disabled={!isValid}
                      style={{
                        height: '40px',
                        border: 'none',
                        borderRadius: '8px',
                        backgroundColor: selected
                          ? selectedColor
                          : inRange
                          ? rangeColor
                          : 'transparent',
                        color: selected ? backgroundColor : textColor,
                        fontSize: '14px',
                        fontWeight: selected ? '500' : '400',
                        cursor: isValid ? 'pointer' : 'default',
                        opacity: isValid ? 1 : 0,
                        transition: 'all 200ms ease-out',
                        outline: todayDate && !selected ? `2px solid ${todayColor}` : 'none',
                        outlineOffset: '-2px'
                      }}
                      onMouseEnter={(e) => {
                        if (isValid && !selected) {
                          e.currentTarget.style.backgroundColor = `${accentColor}15`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isValid && !selected) {
                          e.currentTarget.style.backgroundColor = inRange ? rangeColor : 'transparent';
                        }
                      }}
                    >
                      {isValid ? day : ''}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {enableRangeSelection && rangeStart && rangeEnd && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: `${selectedColor}15`,
            borderRadius: '8px',
            fontSize: '14px',
            color: textColor,
            textAlign: 'center'
          }}>
            {rangeStart.toLocaleDateString()} - {rangeEnd.toLocaleDateString()}
          </div>
        )}
        
        {!enableRangeSelection && selectedDate && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: `${selectedColor}15`,
            borderRadius: '8px',
            fontSize: '14px',
            color: textColor,
            textAlign: 'center'
          }}>
            Selected: {selectedDate.toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
