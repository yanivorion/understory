import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9 - Advanced Hero Collection
 * Generated: Oct 26, 2025, 04:12 AM
 * Component Type: Layout.HeroScramble
 * 
* User Request: N/A
*
* Design Brief:
* N/A
 * ============================================================================
 */

/*
 * ============================================================================
 * Hero 7: Text Scramble Effect
 * Cyberpunk-style character randomization that progressively resolves
 * ============================================================================
 */

const MANIFEST = {
  "type": "Layout.HeroScramble",
  "description": "Futuristic hero with text scramble effect where random characters progressively resolve to real text. Features customizable character sets and resolution patterns. Perfect for tech, gaming, and web3 brands.",
  "editorElement": {
    "selector": ".hero-scramble",
    "displayName": "Scramble Hero",
    "archetype": "container",
    "data": {
      "text": {
        "dataType": "text",
        "displayName": "Text to Scramble",
        "defaultValue": "FUTURE TECHNOLOGY",
        "group": "Content"
      },
      "subheadline": {
        "dataType": "text",
        "displayName": "Subheadline",
        "defaultValue": "Innovation at the Speed of Tomorrow",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#0A0A0A",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#00FF88",
        "group": "Colors"
      },
      "subheadlineColor": {
        "dataType": "color",
        "displayName": "Subheadline Color",
        "defaultValue": "#CCCCCC",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 96,
        "group": "Typography"
      },
      "scrambleSpeed": {
        "dataType": "select",
        "displayName": "Scramble Speed",
        "defaultValue": "medium",
        "options": ["slow", "medium", "fast"],
        "group": "Animation"
      },
      "resolutionPattern": {
        "dataType": "select",
        "displayName": "Resolution Pattern",
        "defaultValue": "leftToRight",
        "options": ["leftToRight", "random", "centerOut"],
        "group": "Animation"
      },
      "autoScramble": {
        "dataType": "booleanValue",
        "displayName": "Auto Scramble on Load",
        "defaultValue": true,
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
  const text = config?.text || "FUTURE TECHNOLOGY";
  const subheadline = config?.subheadline || "Innovation at the Speed of Tomorrow";
  const backgroundColor = config?.backgroundColor || "#0A0A0A";
  const textColor = config?.textColor || "#00FF88";
  const subheadlineColor = config?.subheadlineColor || "#CCCCCC";
  const fontSize = parseInt(config?.fontSize || "96");
  const scrambleSpeed = config?.scrambleSpeed || "medium";
  const resolutionPattern = config?.resolutionPattern || "leftToRight";
  const autoScramble = config?.autoScramble !== false;

  const [displayText, setDisplayText] = React.useState('');
  const [isScrambling, setIsScrambling] = React.useState(false);
  const intervalRef = React.useRef(null);
  const frameRef = React.useRef(0);

  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const speeds = { slow: 80, medium: 50, fast: 30 };
  const frameInterval = speeds[scrambleSpeed];

  const scrambleText = React.useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    frameRef.current = 0;

    const textArray = text.split('');
    const resolved = new Array(textArray.length).fill(false);
    
    // Determine resolution order
    let resolutionOrder = [];
    if (resolutionPattern === 'leftToRight') {
      resolutionOrder = textArray.map((_, i) => i);
    } else if (resolutionPattern === 'random') {
      resolutionOrder = textArray.map((_, i) => i).sort(() => Math.random() - 0.5);
    } else if (resolutionPattern === 'centerOut') {
      const mid = Math.floor(textArray.length / 2);
      for (let i = 0; i < textArray.length; i++) {
        if (i % 2 === 0) {
          resolutionOrder.push(mid + Math.floor(i / 2));
        } else {
          resolutionOrder.push(mid - Math.ceil(i / 2));
        }
      }
      resolutionOrder = resolutionOrder.filter(i => i >= 0 && i < textArray.length);
    }

    intervalRef.current = setInterval(() => {
      frameRef.current++;
      
      // Resolve characters progressively
      const framesToResolve = Math.ceil(textArray.length / 20); // Resolve over 20 frames
      const resolveIndex = Math.floor(frameRef.current / (20 / textArray.length));
      
      if (resolveIndex < resolutionOrder.length) {
        resolved[resolutionOrder[resolveIndex]] = true;
      }

      // Generate display
      const newDisplay = textArray.map((char, i) => {
        if (char === ' ') return ' ';
        if (resolved[i]) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      setDisplayText(newDisplay);

      // Stop when all resolved
      if (resolved.every(r => r)) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, frameInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, resolutionPattern, frameInterval, chars, isScrambling]);

  React.useEffect(() => {
    if (autoScramble) {
      const timer = setTimeout(() => scrambleText(), 300);
      return () => clearTimeout(timer);
    } else {
      setDisplayText(text);
    }
  }, [autoScramble, scrambleText, text]);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
    }
  }, [prefersReducedMotion, text]);

  return (
    <div
      className="hero-scramble"
      style={{
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 80px)',
        fontFamily: '"Courier New", monospace'
      }}
    >
      <h1
        style={{
          fontSize: `clamp(${fontSize * 0.35}px, ${fontSize * 0.1}vw + ${fontSize * 0.25}px, ${fontSize}px)`,
          fontWeight: '700',
          color: textColor,
          margin: '0 0 32px 0',
          lineHeight: '1.1',
          letterSpacing: '0.05em',
          fontFamily: '"Courier New", monospace',
          textAlign: 'center',
          textShadow: `0 0 20px ${textColor}40`,
          cursor: 'pointer'
        }}
        onClick={() => !prefersReducedMotion && scrambleText()}
      >
        {displayText || text}
      </h1>

      <p
        style={{
          fontSize: '18px',
          fontWeight: '400',
          color: subheadlineColor,
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: '1.6',
          opacity: isScrambling ? 0.5 : 1,
          transition: 'opacity 300ms ease-out'
        }}
      >
        {subheadline}
      </p>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
