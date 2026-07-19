import React from "react";

const MANIFEST = {
  "type": "Typography.TextScramble",
  "description": "Interactive text scramble effect with progressive character resolution, multiple patterns, and hover triggers",
  "editorElement": {
    "selector": ".text-scramble",
    "displayName": "Text Scramble",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Display Text",
        "defaultValue": "INNOVATION THROUGH DESIGN",
        "group": "Content"
      },
      "subtitle": {
        "dataType": "text",
        "displayName": "Subtitle",
        "defaultValue": "Transforming ideas into digital experiences",
        "group": "Content"
      },
      "showReplayButton": {
        "dataType": "booleanValue",
        "displayName": "Show Replay Button",
        "defaultValue": true,
        "group": "Content"
      },
      "triggerMode": {
        "dataType": "select",
        "displayName": "Trigger Mode",
        "defaultValue": "scroll",
        "options": ["scroll", "immediate", "hover", "manual"],
        "group": "Content",
        "description": "When to trigger scramble effect"
      },
      "scramblePattern": {
        "dataType": "select",
        "displayName": "Scramble Pattern",
        "defaultValue": "leftToRight",
        "options": ["leftToRight", "rightToLeft", "centerOut", "random", "wave"],
        "group": "Animation",
        "description": "Order in which characters resolve"
      },
      "scrambleDuration": {
        "dataType": "select",
        "displayName": "Scramble Duration (ms)",
        "defaultValue": "2000",
        "options": ["1500", "2000", "2500", "3000"],
        "group": "Animation"
      },
      "iterationsPerChar": {
        "dataType": "select",
        "displayName": "Iterations Per Character",
        "defaultValue": "8",
        "options": ["5", "8", "10", "12", "15"],
        "group": "Animation",
        "description": "How many times each char scrambles"
      },
      "charset": {
        "dataType": "select",
        "displayName": "Character Set",
        "defaultValue": "alphanumeric",
        "options": ["alphanumeric", "symbols", "numbers", "letters", "extended"],
        "group": "Animation"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Text Font Size (px)",
        "defaultValue": 56,
        "group": "Typography"
      },
      "subtitleFontSize": {
        "dataType": "number",
        "displayName": "Subtitle Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "0.025em",
        "options": ["0em", "0.025em", "0.05em", "0.075em"],
        "group": "Typography"
      },
      "textAlign": {
        "dataType": "select",
        "displayName": "Text Alignment",
        "defaultValue": "center",
        "options": ["left", "center", "right"],
        "group": "Typography"
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
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "scrambleColor": {
        "dataType": "color",
        "displayName": "Scramble Color",
        "defaultValue": "#6C757D",
        "group": "Colors",
        "description": "Color of randomized characters"
      },
      "subtitleColor": {
        "dataType": "color",
        "displayName": "Subtitle Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "buttonColor": {
        "dataType": "color",
        "displayName": "Button Color",
        "defaultValue": "#212529",
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
  const text = config?.text || "INNOVATION THROUGH DESIGN";
  const subtitle = config?.subtitle || "Transforming ideas into digital experiences";
  const showReplayButton = config?.showReplayButton !== false;
  const triggerMode = config?.triggerMode || "scroll";
  const scramblePattern = config?.scramblePattern || "leftToRight";
  const scrambleDuration = parseInt(config?.scrambleDuration || "2000");
  const iterationsPerChar = parseInt(config?.iterationsPerChar || "8");
  const charsetType = config?.charset || "alphanumeric";
  const fontSize = parseInt(config?.fontSize || "56");
  const subtitleFontSize = parseInt(config?.subtitleFontSize || "18");
  const fontWeight = config?.fontWeight || "500";
  const letterSpacing = config?.letterSpacing || "0.025em";
  const textAlign = config?.textAlign || "center";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#212529";
  const scrambleColor = config?.scrambleColor || "#6C757D";
  const subtitleColor = config?.subtitleColor || "#6C757D";
  const buttonColor = config?.buttonColor || "#212529";

  const [displayText, setDisplayText] = React.useState(text);
  const [isScrambling, setIsScrambling] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const containerRef = React.useRef(null);
  const intervalRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const charsets = {
    alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    numbers: '0123456789',
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    extended: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  };

  const charset = charsets[charsetType] || charsets.alphanumeric;

  const getResolveOrder = () => {
    const indices = Array.from({ length: text.length }, (_, i) => i);
    const middle = Math.floor(text.length / 2);

    switch (scramblePattern) {
      case 'leftToRight':
        return indices;
      case 'rightToLeft':
        return indices.reverse();
      case 'centerOut':
        return indices.sort((a, b) => Math.abs(a - middle) - Math.abs(b - middle));
      case 'random':
        return indices.sort(() => Math.random() - 0.5);
      case 'wave':
        return indices.map((val, idx) => ({
          index: val,
          distance: Math.abs(idx - middle)
        }))
        .sort((a, b) => a.distance - b.distance)
        .map(item => item.index);
      default:
        return indices;
    }
  };

  const scramble = React.useCallback(() => {
    if (isScrambling || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setDisplayText(text);
      }
      return;
    }

    setIsScrambling(true);

    const resolveOrder = getResolveOrder();
    const charsToResolve = text.length;
    const intervalTime = scrambleDuration / (charsToResolve * iterationsPerChar);
    
    let iteration = 0;
    const resolved = new Set();

    intervalRef.current = setInterval(() => {
      const newText = text.split('').map((char, index) => {
        if (char === ' ') return ' ';
        if (resolved.has(index)) return char;
        
        // Check if this character should be resolved in this iteration
        const charPosition = resolveOrder.indexOf(index);
        const iterationsForThisChar = charPosition * iterationsPerChar;
        
        if (iteration > iterationsForThisChar + iterationsPerChar) {
          resolved.add(index);
          return char;
        }
        
        // Still scrambling
        return charset[Math.floor(Math.random() * charset.length)];
      }).join('');

      setDisplayText(newText);

      iteration++;

      if (resolved.size === charsToResolve) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
        setHasAnimated(true);
      }
    }, intervalTime);

  }, [text, scrambleDuration, iterationsPerChar, charset, scramblePattern, isScrambling, prefersReducedMotion]);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (triggerMode === 'immediate') {
      scramble();
      return;
    }

    if (triggerMode === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              scramble();
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [triggerMode, hasAnimated, scramble]);

  const handleHover = () => {
    if (triggerMode === 'hover') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setHasAnimated(false);
      setIsScrambling(false);
      setTimeout(() => scramble(), 50);
    }
  };

  const handleReplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setHasAnimated(false);
    setIsScrambling(false);
    setTimeout(() => scramble(), 50);
  };

  return (
    <div className="text-scramble" style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div
        ref={containerRef}
        onMouseEnter={handleHover}
        style={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: textAlign,
          cursor: triggerMode === 'hover' ? 'pointer' : 'default'
        }}
      >
        <h1 style={{
          fontSize: `clamp(${fontSize * 0.5}px, ${fontSize / 16}rem + 2vw, ${fontSize * 1.2}px)`,
          fontWeight,
          letterSpacing,
          color: textColor,
          margin: '0 0 1.5rem 0',
          lineHeight: 1.2,
          fontVariantNumeric: 'tabular-nums'
        }}>
          {displayText.split('').map((char, index) => {
            const isResolved = char === text[index] || char === ' ';
            
            return (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  color: isResolved ? textColor : scrambleColor,
                  transition: prefersReducedMotion ? 'none' : 'color 150ms ease-out',
                  minWidth: char === ' ' ? '0.5em' : 'auto'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </h1>

        <p style={{
          fontSize: `${subtitleFontSize}px`,
          fontWeight: '400',
          color: subtitleColor,
          margin: '0 0 2rem 0',
          lineHeight: 1.6,
          opacity: hasAnimated || prefersReducedMotion ? 1 : 0,
          transform: hasAnimated || prefersReducedMotion ? 'translateY(0)' : 'translateY(10px)',
          transition: prefersReducedMotion 
            ? 'none' 
            : 'opacity 500ms ease-out 300ms, transform 500ms ease-out 300ms'
        }}>
          {subtitle}
        </p>

        {showReplayButton && (
          <button
            onClick={handleReplay}
            disabled={isScrambling}
            style={{
              marginTop: '1rem',
              padding: '0.875rem 2rem',
              fontSize: '0.875rem',
              fontWeight: '400',
              fontFamily: 'inherit',
              color: isScrambling ? '#CED4DA' : buttonColor,
              backgroundColor: 'transparent',
              border: `1px solid ${isScrambling ? '#E9ECEF' : buttonColor}`,
              borderRadius: '6px',
              cursor: isScrambling ? 'not-allowed' : 'pointer',
              transition: 'all 200ms ease-out',
              letterSpacing: '0.025em'
            }}
            onMouseEnter={(e) => {
              if (!isScrambling) {
                e.currentTarget.style.backgroundColor = buttonColor;
                e.currentTarget.style.color = backgroundColor;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = buttonColor;
            }}
          >
            {isScrambling ? 'Scrambling...' : 'Replay'}
          </button>
        )}

        {/* Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid #E9ECEF',
          opacity: hasAnimated || prefersReducedMotion ? 1 : 0,
          transition: prefersReducedMotion ? 'none' : 'opacity 500ms ease-out 500ms'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.75rem',
              color: subtitleColor,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Pattern
            </div>
            <div style={{
              fontSize: '0.9375rem',
              fontWeight: '500',
              color: textColor
            }}>
              {scramblePattern.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.75rem',
              color: subtitleColor,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Duration
            </div>
            <div style={{
              fontSize: '0.9375rem',
              fontWeight: '500',
              color: textColor
            }}>
              {(scrambleDuration / 1000).toFixed(1)}s
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.75rem',
              color: subtitleColor,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Iterations
            </div>
            <div style={{
              fontSize: '0.9375rem',
              fontWeight: '500',
              color: textColor
            }}>
              {iterationsPerChar}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.75rem',
              color: subtitleColor,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Charset
            </div>
            <div style={{
              fontSize: '0.9375rem',
              fontWeight: '500',
              color: textColor
            }}>
              {charsetType}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .text-scramble * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Component;