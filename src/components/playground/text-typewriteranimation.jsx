import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 16, 2025, 01:00 PM
 * Component Type: Text.TypewriterAnimation
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Text.TypewriterAnimation",
  "description": "Pure typewriter text animation with rotating phrases and blinking cursor",
  "editorElement": {
    "selector": ".typewriter-text",
    "displayName": "Typewriter Text",
    "archetype": "container",
    "data": {
      "phrases": {
        "dataType": "text",
        "displayName": "Phrases (comma-separated)",
        "defaultValue": "Transform Your Vision, Build The Future, Innovate Without Limits, Create Something Extraordinary",
        "group": "Content",
        "description": "Comma-separated phrases to rotate through"
      },
      "staticPrefix": {
        "dataType": "text",
        "displayName": "Static Prefix",
        "defaultValue": "",
        "group": "Content",
        "description": "Optional text before animation (e.g., 'We ')"
      },
      "staticSuffix": {
        "dataType": "text",
        "displayName": "Static Suffix",
        "defaultValue": "",
        "group": "Content",
        "description": "Optional text after animation"
      },
      "showCursor": {
        "dataType": "booleanValue",
        "displayName": "Show Cursor",
        "defaultValue": true,
        "group": "Content",
        "description": "Display blinking cursor"
      },
      "loopAnimation": {
        "dataType": "booleanValue",
        "displayName": "Loop Animation",
        "defaultValue": true,
        "group": "Content",
        "description": "Continuously rotate phrases"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Main text color"
      },
      "cursorColor": {
        "dataType": "color",
        "displayName": "Cursor Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors",
        "description": "Blinking cursor color"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 72,
        "group": "Typography",
        "description": "Desktop font size (1-120px)"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography",
        "description": "Text font weight"
      },
      "textAlign": {
        "dataType": "select",
        "displayName": "Text Alignment",
        "defaultValue": "center",
        "options": ["left", "center", "right"],
        "group": "Typography",
        "description": "Text alignment"
      },
      "lineHeight": {
        "dataType": "select",
        "displayName": "Line Height",
        "defaultValue": "1.1",
        "options": ["1", "1.1", "1.2", "1.3", "1.4"],
        "group": "Typography",
        "description": "Line height ratio"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "-0.02em",
        "options": ["-0.02em", "0em", "0.02em", "0.05em", "0.1em"],
        "group": "Typography",
        "description": "Letter spacing"
      },
      "typingSpeed": {
        "dataType": "select",
        "displayName": "Typing Speed",
        "defaultValue": "80",
        "options": ["50", "80", "100", "150", "200"],
        "group": "Animation",
        "description": "Milliseconds per character"
      },
      "deletingSpeed": {
        "dataType": "select",
        "displayName": "Deleting Speed",
        "defaultValue": "50",
        "options": ["30", "50", "80", "100"],
        "group": "Animation",
        "description": "Milliseconds per character deletion"
      },
      "pauseDuration": {
        "dataType": "select",
        "displayName": "Pause Duration",
        "defaultValue": "2000",
        "options": ["1000", "1500", "2000", "3000", "4000"],
        "group": "Animation",
        "description": "Pause before deleting (ms)"
      },
      "cursorWidth": {
        "dataType": "select",
        "displayName": "Cursor Width",
        "defaultValue": "3",
        "options": ["2", "3", "4", "5"],
        "group": "Animation",
        "description": "Cursor thickness (px)"
      },
      "enableTextShadow": {
        "dataType": "booleanValue",
        "displayName": "Enable Text Shadow",
        "defaultValue": false,
        "group": "Animation",
        "description": "Add subtle shadow/glow"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  
  const timeoutRef = React.useRef(null);

  // Parse phrases from config
  const phrases = React.useMemo(() => {
    const phrasesString = config?.phrases || 'Transform Your Vision, Build The Future, Innovate Without Limits';
    return phrasesString.split(',').map(p => p.trim()).filter(p => p);
  }, [config?.phrases]);

  const currentPhrase = phrases[currentPhraseIndex] || '';
  const typingSpeed = parseInt(config?.typingSpeed || '80');
  const deletingSpeed = parseInt(config?.deletingSpeed || '50');
  const pauseDuration = parseInt(config?.pauseDuration || '2000');
  const shouldLoop = config?.loopAnimation !== false;

  // Check for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Typewriter effect
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(currentPhrase);
      return;
    }

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return;
    }

    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        const nextIndex = (currentPhraseIndex + 1) % phrases.length;
        
        // Check if we should stop (no loop and reached end)
        if (!shouldLoop && nextIndex === 0 && currentPhraseIndex === phrases.length - 1) {
          return;
        }
        
        setCurrentPhraseIndex(nextIndex);
        timeoutRef.current = setTimeout(() => {}, 500);
      } else {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayedText.length < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Check if we should loop
        if (!shouldLoop && currentPhraseIndex === phrases.length - 1) {
          return;
        }
        setIsPaused(true);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedText, isDeleting, isPaused, currentPhrase, currentPhraseIndex, phrases.length, typingSpeed, deletingSpeed, pauseDuration, shouldLoop, prefersReducedMotion]);

  const textShadow = config?.enableTextShadow !== false 
    ? `0 0 40px ${config?.textColor || '#FFFFFF'}20` 
    : 'none';

  return (
    <div
      className="typewriter-text"
      style={{
        fontFamily: 'system-ui, -apple-system, "SF Pro Display", "Inter", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        padding: '20px'
      }}
    >
      <h1
        style={{
          fontSize: `clamp(32px, 8vw, ${config?.fontSize || 72}px)`,
          fontWeight: config?.fontWeight || '500',
          color: config?.textColor || '#FFFFFF',
          margin: '0',
          lineHeight: config?.lineHeight || '1.1',
          letterSpacing: config?.letterSpacing || '-0.02em',
          textAlign: config?.textAlign || 'center',
          minHeight: '1.2em',
          textShadow: textShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: config?.textAlign === 'left' ? 'flex-start' : config?.textAlign === 'right' ? 'flex-end' : 'center',
          flexWrap: 'wrap'
        }}
      >
        {/* Static Prefix */}
        {config?.staticPrefix && (
          <span style={{ marginRight: '0.3em' }}>
            {config.staticPrefix}
          </span>
        )}

        {/* Animated Text with Cursor */}
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
          <span>{displayedText}</span>
          {config?.showCursor !== false && (
            <span
              style={{
                display: 'inline-block',
                width: `${config?.cursorWidth || 3}px`,
                height: '0.9em',
                backgroundColor: config?.cursorColor || '#FFFFFF',
                marginLeft: '4px',
                verticalAlign: 'text-bottom',
                animation: prefersReducedMotion ? 'none' : 'blink 530ms steps(1) infinite',
                flexShrink: 0
              }}
            />
          )}
        </span>

        {/* Static Suffix */}
        {config?.staticSuffix && (
          <span style={{ marginLeft: '0.3em' }}>
            {config.staticSuffix}
          </span>
        )}
      </h1>

      {/* CSS Keyframes for cursor blink */}
      <style>
        {`
          @keyframes blink {
            0%, 49% {
              opacity: 1;
            }
            50%, 100% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
