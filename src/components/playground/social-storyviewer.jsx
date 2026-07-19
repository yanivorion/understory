import React from "react";

const MANIFEST = {
  "type": "Social.StoryViewer",
  "description": "Instagram-style story viewer with progress bars and auto-advance functionality",
  "editorElement": {
    "selector": ".story-viewer",
    "displayName": "Story Viewer",
    "archetype": "container",
    "data": {
      "stories": {
        "dataType": "text",
        "displayName": "Story Content (comma-separated)",
        "defaultValue": "Welcome to our stories!,Check out our latest update,Behind the scenes,Thank you for watching!",
        "group": "Content"
      },
      "storyDuration": {
        "dataType": "select",
        "displayName": "Story Duration (seconds)",
        "defaultValue": "5",
        "options": ["3", "5", "7", "10"],
        "group": "Content"
      },
      "showControls": {
        "dataType": "booleanValue",
        "displayName": "Show Navigation Controls",
        "defaultValue": true,
        "group": "Content"
      },
      "autoplay": {
        "dataType": "booleanValue",
        "displayName": "Autoplay Stories",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "contentBackground": {
        "dataType": "color",
        "displayName": "Content Background",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "progressBarBackground": {
        "dataType": "color",
        "displayName": "Progress Bar Background",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "progressBarFill": {
        "dataType": "color",
        "displayName": "Progress Bar Fill",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "controlsColor": {
        "dataType": "color",
        "displayName": "Controls Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Base Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "containerWidth": {
        "dataType": "select",
        "displayName": "Container Width (px)",
        "defaultValue": "400",
        "options": ["350", "400", "450", "500"],
        "group": "Layout"
      },
      "containerHeight": {
        "dataType": "select",
        "displayName": "Container Height (px)",
        "defaultValue": "600",
        "options": ["500", "600", "700", "800"],
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
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  
  const storiesText = config?.stories || "Welcome to our stories!,Check out our latest update,Behind the scenes,Thank you for watching!";
  const storyList = storiesText.split(',').map(s => s.trim()).filter(s => s);
  const duration = parseFloat(config?.storyDuration || '5') * 1000;
  const autoplay = config?.autoplay !== false;
  
  React.useEffect(() => {
    if (!autoplay || isPaused || storyList.length === 0) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next story
          if (currentIndex < storyList.length - 1) {
            setCurrentIndex(currentIndex + 1);
            return 0;
          } else {
            // End of stories
            return 100;
          }
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, autoplay, duration, storyList.length]);
  
  const goToNext = () => {
    if (currentIndex < storyList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    }
  };
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };
  
  const goToStory = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  return (
    <div 
      className="story-viewer"
      style={{
        backgroundColor: config?.backgroundColor || '#212529',
        padding: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: `${config?.fontSize || 18}px`,
        fontWeight: config?.fontWeight || '400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '650px'
      }}
    >
      <div style={{
        width: `${config?.containerWidth || '400'}px`,
        height: `${config?.containerHeight || '600'}px`,
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: config?.contentBackground || '#495057'
      }}>
        {/* Progress Bars */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          display: 'flex',
          gap: '4px',
          zIndex: 10
        }}>
          {storyList.map((_, index) => (
            <div
              key={index}
              onClick={() => goToStory(index)}
              style={{
                flex: 1,
                height: '3px',
                backgroundColor: config?.progressBarBackground || '#6C757D',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: 0.9
              }}
            >
              <div style={{
                height: '100%',
                width: index < currentIndex ? '100%' : (index === currentIndex ? `${progress}%` : '0%'),
                backgroundColor: config?.progressBarFill || '#FFFFFF',
                transition: prefersReducedMotion ? 'none' : (index === currentIndex ? 'width 50ms linear' : 'width 200ms ease-out')
              }} />
            </div>
          ))}
        </div>
        
        {/* Navigation Areas */}
        {(config?.showControls !== false) && (
          <>
            <div
              onClick={goToPrevious}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '30%',
                cursor: currentIndex > 0 ? 'pointer' : 'default',
                zIndex: 5
              }}
            />
            <div
              onClick={goToNext}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '30%',
                cursor: currentIndex < storyList.length - 1 ? 'pointer' : 'default',
                zIndex: 5
              }}
            />
          </>
        )}
        
        {/* Pause/Play Control */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Play' : 'Pause'}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: `2px solid ${config?.controlsColor || '#FFFFFF'}`,
            backgroundColor: 'rgba(0,0,0,0.3)',
            color: config?.controlsColor || '#FFFFFF',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            opacity: isPaused ? 1 : 0,
            transition: prefersReducedMotion ? 'none' : 'opacity 200ms ease-out'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = isPaused ? '1' : '0'}
        >
          {isPaused ? '▶' : '❚❚'}
        </button>
        
        {/* Story Content */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 32px',
          color: config?.textColor || '#FFFFFF',
          textAlign: 'center',
          opacity: prefersReducedMotion ? 1 : 0,
          animation: prefersReducedMotion ? 'none' : 'storyAppear 400ms ease-out forwards'
        }}>
          <div style={{
            fontSize: `${(config?.fontSize || 18) * 1.33}px`,
            lineHeight: '1.4',
            fontWeight: '500'
          }}>
            {storyList[currentIndex] || 'No story available'}
          </div>
        </div>
        
        {/* Navigation Arrows */}
        {(config?.showControls !== false) && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={goToPrevious}
                aria-label="Previous story"
                style={{
                  position: 'absolute',
                  left: '16px',
                  bottom: '16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: `2px solid ${config?.controlsColor || '#FFFFFF'}`,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: config?.controlsColor || '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.5)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.3)'}
              >
                ‹
              </button>
            )}
            
            {currentIndex < storyList.length - 1 && (
              <button
                onClick={goToNext}
                aria-label="Next story"
                style={{
                  position: 'absolute',
                  right: '16px',
                  bottom: '16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: `2px solid ${config?.controlsColor || '#FFFFFF'}`,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: config?.controlsColor || '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.5)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.3)'}
              >
                ›
              </button>
            )}
          </>
        )}
        
        {/* Story Counter */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: config?.controlsColor || '#FFFFFF',
          fontSize: `${(config?.fontSize || 18) * 0.78}px`,
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: '6px 12px',
          borderRadius: '12px',
          zIndex: 10
        }}>
          {currentIndex + 1} / {storyList.length}
        </div>
      </div>
      
      <style>{`
        @keyframes storyAppear {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
