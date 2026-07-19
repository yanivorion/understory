import React from "react";

const MANIFEST = {
  "type": "Productivity.PomodoroTimer",
  "description": "Sophisticated Pomodoro productivity timer with work/break cycles and progress visualization",
  "editorElement": {
    "selector": ".pomodoro-timer",
    "displayName": "Pomodoro Timer",
    "archetype": "container",
    "data": {
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Pomodoro Timer", "group": "Content" },
      "workDuration": { "dataType": "select", "displayName": "Work Duration (min)", "defaultValue": "25", "options": ["15", "20", "25", "30", "45"], "group": "Content" },
      "breakDuration": { "dataType": "select", "displayName": "Break Duration (min)", "defaultValue": "5", "options": ["3", "5", "10", "15"], "group": "Content" },
      "showSessionCount": { "dataType": "booleanValue", "displayName": "Show Session Count", "defaultValue": true, "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background Color", "defaultValue": "#FFFFFF", "group": "Colors" },
      "timerBackground": { "dataType": "color", "displayName": "Timer Background", "defaultValue": "#F8F9FA", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text Color", "defaultValue": "#212529", "group": "Colors" },
      "secondaryTextColor": { "dataType": "color", "displayName": "Secondary Text Color", "defaultValue": "#495057", "group": "Colors" },
      "borderColor": { "dataType": "color", "displayName": "Border Color", "defaultValue": "#E9ECEF", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent Color", "defaultValue": "#495057", "group": "Colors" },
      "buttonHoverColor": { "dataType": "color", "displayName": "Button Hover Color", "defaultValue": "#343A40", "group": "Colors" },
      "progressColor": { "dataType": "color", "displayName": "Progress Color", "defaultValue": "#495057", "group": "Colors" },
      "fontSize": { "dataType": "number", "displayName": "Base Font Size (px)", "defaultValue": 15, "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "titleFontSize": { "dataType": "number", "displayName": "Title Font Size (px)", "defaultValue": 28, "group": "Typography" },
      "timerFontSize": { "dataType": "number", "displayName": "Timer Font Size (px)", "defaultValue": 64, "group": "Typography" },
      "cornerRadius": { "dataType": "select", "displayName": "Corner Radius", "defaultValue": "8px", "options": ["4px", "6px", "8px", "10px", "12px"], "group": "Layout" }
    },
    "layout": { "resizeDirection": "horizontalAndVertical", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const [mode, setMode] = React.useState('work');
  const [seconds, setSeconds] = React.useState(parseInt(config?.workDuration || '25') * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const [sessions, setSessions] = React.useState(0);
  
  const workDuration = parseInt(config?.workDuration || '25') * 60;
  const breakDuration = parseInt(config?.breakDuration || '5') * 60;
  
  const totalSeconds = mode === 'work' ? workDuration : breakDuration;
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
  
  React.useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          if (mode === 'work') {
            setMode('break');
            setSessions(s => s + 1);
            return breakDuration;
          } else {
            setMode('work');
            return workDuration;
          }
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, mode, workDuration, breakDuration]);
  
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };
  
  const handleStartPause = () => setIsRunning(!isRunning);
  
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(mode === 'work' ? workDuration : breakDuration);
  };
  
  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setSeconds(newMode === 'work' ? workDuration : breakDuration);
  };
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  return (
    <div className="pomodoro-timer" style={{ backgroundColor: config?.backgroundColor || '#FFFFFF', color: config?.textColor || '#212529', padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: `${config?.fontSize || 15}px`, fontWeight: config?.fontWeight || '400', maxWidth: '600px', margin: '0 auto', minHeight: '500px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: `${config?.titleFontSize || 28}px`, fontWeight: '500', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>{config?.title || 'Pomodoro Timer'}</h1>
        <div style={{ color: config?.secondaryTextColor || '#495057', fontSize: `${(config?.fontSize || 15) * 0.93}px` }}>Focus · Work · Achieve</div>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => handleModeSwitch('work')} style={{ flex: 1, padding: '12px', backgroundColor: mode === 'work' ? config?.accentColor || '#495057' : config?.timerBackground || '#F8F9FA', color: mode === 'work' ? '#FFFFFF' : config?.textColor || '#212529', border: 'none', borderRadius: config?.cornerRadius || '8px', cursor: 'pointer', fontSize: `${config?.fontSize || 15}px`, fontWeight: mode === 'work' ? '500' : '400', transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out' }}>Work</button>
        <button onClick={() => handleModeSwitch('break')} style={{ flex: 1, padding: '12px', backgroundColor: mode === 'break' ? config?.accentColor || '#495057' : config?.timerBackground || '#F8F9FA', color: mode === 'break' ? '#FFFFFF' : config?.textColor || '#212529', border: 'none', borderRadius: config?.cornerRadius || '8px', cursor: 'pointer', fontSize: `${config?.fontSize || 15}px`, fontWeight: mode === 'break' ? '500' : '400', transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out' }}>Break</button>
      </div>
      
      <div style={{ backgroundColor: config?.timerBackground || '#F8F9FA', padding: '48px 24px', borderRadius: config?.cornerRadius || '8px', border: `1px solid ${config?.borderColor || '#E9ECEF'}`, marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: `${(config?.fontSize || 15) * 0.87}px`, color: config?.secondaryTextColor || '#495057', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>{mode === 'work' ? 'Work Session' : 'Break Time'}</div>
        <div style={{ fontSize: `${config?.timerFontSize || 64}px`, fontWeight: '500', lineHeight: '1', marginBottom: '24px', fontVariantNumeric: 'tabular-nums' }}>{formatTime(seconds)}</div>
        
        <div style={{ height: '8px', backgroundColor: config?.borderColor || '#E9ECEF', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ height: '100%', width: `${progress}%`, backgroundColor: config?.progressColor || '#495057', transition: prefersReducedMotion ? 'none' : 'width 1s linear', borderRadius: '4px' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={handleStartPause} style={{ padding: '12px 32px', backgroundColor: config?.accentColor || '#495057', color: '#FFFFFF', border: 'none', borderRadius: config?.cornerRadius || '8px', cursor: 'pointer', fontSize: `${(config?.fontSize || 15) * 1.07}px`, fontWeight: '500', transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out' }} onMouseEnter={(e) => e.target.style.backgroundColor = config?.buttonHoverColor || '#343A40'} onMouseLeave={(e) => e.target.style.backgroundColor = config?.accentColor || '#495057'}>{isRunning ? 'Pause' : 'Start'}</button>
          <button onClick={handleReset} style={{ padding: '12px 24px', backgroundColor: config?.timerBackground || '#F8F9FA', color: config?.textColor || '#212529', border: `1px solid ${config?.borderColor || '#E9ECEF'}`, borderRadius: config?.cornerRadius || '8px', cursor: 'pointer', fontSize: `${config?.fontSize || 15}px`, fontWeight: '500', transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out' }} onMouseEnter={(e) => e.target.style.backgroundColor = config?.borderColor || '#E9ECEF'} onMouseLeave={(e) => e.target.style.backgroundColor = config?.timerBackground || '#F8F9FA'}>Reset</button>
        </div>
      </div>
      
      {(config?.showSessionCount !== false) && <div style={{ textAlign: 'center', padding: '20px', backgroundColor: config?.timerBackground || '#F8F9FA', borderRadius: config?.cornerRadius || '8px', border: `1px solid ${config?.borderColor || '#E9ECEF'}` }}><div style={{ fontSize: `${(config?.fontSize || 15) * 0.87}px`, color: config?.secondaryTextColor || '#495057', marginBottom: '8px' }}>Completed Sessions</div><div style={{ fontSize: `${(config?.fontSize || 15) * 2}px`, fontWeight: '500' }}>{sessions}</div></div>}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
