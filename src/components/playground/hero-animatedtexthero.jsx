import React from "react";

const MANIFEST = {
  "type": "Hero.AnimatedTextHero",
  "description": "Hero section with character-level scroll-triggered text animation",
  "editorElement": {
    "selector": ".animated-hero-container",
    "displayName": "Animated Text Hero",
    "archetype": "container",
    "data": {
      "headline": {
        "dataType": "text",
        "displayName": "Headline",
        "defaultValue": "Transform Your Business",
        "group": "Content"
      },
      "subheading": {
        "dataType": "text",
        "displayName": "Subheading",
        "defaultValue": "Elevate your digital presence with sophisticated design and seamless functionality",
        "group": "Content"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "Get Started",
        "group": "Content"
      },
      "ctaUrl": {
        "dataType": "text",
        "displayName": "CTA Button URL",
        "defaultValue": "#",
        "group": "Content"
      },
      "showCTA": {
        "dataType": "booleanValue",
        "displayName": "Show CTA Button",
        "defaultValue": "true",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "headlineColor": {
        "dataType": "color",
        "displayName": "Headline Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "subheadingColor": {
        "dataType": "color",
        "displayName": "Subheading Color",
        "defaultValue": "#6B6B6B",
        "group": "Colors"
      },
      "ctaBackgroundColor": {
        "dataType": "color",
        "displayName": "CTA Background Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "ctaTextColor": {
        "dataType": "color",
        "displayName": "CTA Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "Inter, -apple-system, system-ui, sans-serif",
        "options": [
          "Inter, -apple-system, system-ui, sans-serif",
          "SF Pro Display, -apple-system, sans-serif",
          "Helvetica Neue, Helvetica, Arial, sans-serif",
          "Montserrat, sans-serif"
        ],
        "group": "Typography"
      },
      "headlineSize": {
        "dataType": "select",
        "displayName": "Headline Font Size",
        "defaultValue": "64px",
        "options": ["48px", "56px", "64px", "72px", "80px"],
        "group": "Typography"
      },
      "headlineWeight": {
        "dataType": "select",
        "displayName": "Headline Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "subheadingSize": {
        "dataType": "select",
        "displayName": "Subheading Font Size",
        "defaultValue": "20px",
        "options": ["16px", "18px", "20px", "24px"],
        "group": "Typography"
      },
      "subheadingWeight": {
        "dataType": "select",
        "displayName": "Subheading Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "textAlign": {
        "dataType": "select",
        "displayName": "Text Alignment",
        "defaultValue": "center",
        "options": ["left", "center"],
        "group": "Layout"
      },
      "maxWidth": {
        "dataType": "select",
        "displayName": "Content Max Width",
        "defaultValue": "900px",
        "options": ["700px", "800px", "900px", "1000px", "1200px"],
        "group": "Layout"
      },
      "verticalPadding": {
        "dataType": "select",
        "displayName": "Vertical Padding",
        "defaultValue": "120px",
        "options": ["80px", "100px", "120px", "160px", "200px"],
        "group": "Layout"
      },
      "staggerDelay": {
        "dataType": "number",
        "displayName": "Character Stagger Delay (ms)",
        "defaultValue": "30",
        "group": "Animation",
        "description": "Delay between each character animation"
      },
      "characterDuration": {
        "dataType": "number",
        "displayName": "Character Animation Duration (ms)",
        "defaultValue": "400",
        "group": "Animation"
      },
      "startDistance": {
        "dataType": "number",
        "displayName": "Start Distance (px)",
        "defaultValue": "20",
        "group": "Animation",
        "description": "How far characters move from (Y axis)"
      },
      "scrollThreshold": {
        "dataType": "select",
        "displayName": "Scroll Trigger Point",
        "defaultValue": "0.2",
        "options": ["0.1", "0.2", "0.3", "0.5"],
        "group": "Animation",
        "description": "When to trigger (0=top visible, 1=fully visible)"
      },
      "animationOrder": {
        "dataType": "select",
        "displayName": "Animation Order",
        "defaultValue": "sequential",
        "options": ["sequential", "reverse", "random", "fromCenter"],
        "group": "Animation"
      },
      "ctaDelay": {
        "dataType": "number",
        "displayName": "CTA Delay After Text (ms)",
        "defaultValue": "400",
        "group": "Animation"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "CTA Border Radius",
        "defaultValue": "6px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Button"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const containerRef = React.useRef(null);
  const headlineCharsRef = React.useRef([]);
  const subheadingCharsRef = React.useRef([]);
  const ctaRef = React.useRef(null);

  // Safe config extraction
  const headline = config?.headline || 'Transform Your Business';
  const subheading = config?.subheading || 'Elevate your digital presence with sophisticated design and seamless functionality';
  const staggerDelay = parseInt(config?.staggerDelay || '30');
  const characterDuration = parseInt(config?.characterDuration || '400');
  const startDistance = parseInt(config?.startDistance || '20');
  const scrollThreshold = parseFloat(config?.scrollThreshold || '0.2');
  const animationOrder = config?.animationOrder || 'sequential';
  const ctaDelay = parseInt(config?.ctaDelay || '400');
  const showCTA = config?.showCTA !== false;

  // Split text into characters
  const headlineChars = React.useMemo(() => 
    headline.split('').map(char => char === ' ' ? '\u00A0' : char),
    [headline]
  );

  const subheadingChars = React.useMemo(() => 
    subheading.split('').map(char => char === ' ' ? '\u00A0' : char),
    [subheading]
  );

  // Create animation order indices
  const getAnimationIndices = React.useCallback((length) => {
    const indices = Array.from({ length }, (_, i) => i);
    
    switch(animationOrder) {
      case 'reverse':
        return indices.reverse();
      case 'random':
        return indices.sort(() => Math.random() - 0.5);
      case 'fromCenter':
        const center = Math.floor(length / 2);
        const result = [];
        for (let i = 0; i < length; i++) {
          if (i % 2 === 0) {
            result.push(center + Math.floor(i / 2));
          } else {
            result.push(center - Math.ceil(i / 2));
          }
        }
        return result.filter(i => i >= 0 && i < length);
      default: // sequential
        return indices;
    }
  }, [animationOrder]);

  // PATTERN 7: Scroll-triggered animation with IntersectionObserver
  React.useEffect(() => {
    const element = containerRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate headline characters (PATTERN 1: Direct DOM)
          const headlineIndices = getAnimationIndices(headlineCharsRef.current.length);
          headlineIndices.forEach((idx, order) => {
            const charEl = headlineCharsRef.current[idx];
            if (!charEl) return;

            setTimeout(() => {
              charEl.animate([
                { 
                  opacity: 0, 
                  transform: `translateY(${startDistance}px)` 
                },
                { 
                  opacity: 1, 
                  transform: 'translateY(0)' 
                }
              ], {
                duration: characterDuration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
              });
            }, order * staggerDelay);
          });

          // Animate subheading characters
          const subheadingIndices = getAnimationIndices(subheadingCharsRef.current.length);
          const subheadingStartDelay = headlineIndices.length * staggerDelay + 200;
          
          subheadingIndices.forEach((idx, order) => {
            const charEl = subheadingCharsRef.current[idx];
            if (!charEl) return;

            setTimeout(() => {
              charEl.animate([
                { 
                  opacity: 0, 
                  transform: `translateY(${startDistance}px)` 
                },
                { 
                  opacity: 1, 
                  transform: 'translateY(0)' 
                }
              ], {
                duration: characterDuration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
              });
            }, subheadingStartDelay + order * staggerDelay);
          });

          // Animate CTA button
          if (ctaRef.current && showCTA) {
            const ctaStartDelay = subheadingStartDelay + 
              subheadingIndices.length * staggerDelay + ctaDelay;
            
            setTimeout(() => {
              ctaRef.current.animate([
                { 
                  opacity: 0, 
                  transform: `translateY(${startDistance}px)` 
                },
                { 
                  opacity: 1, 
                  transform: 'translateY(0)' 
                }
              ], {
                duration: 500,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
              });
            }, ctaStartDelay);
          }

          observer.disconnect();
        }
      },
      { threshold: scrollThreshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [
    hasAnimated, 
    staggerDelay, 
    characterDuration, 
    startDistance, 
    scrollThreshold, 
    getAnimationIndices,
    ctaDelay,
    showCTA
  ]);

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: config?.backgroundColor || '#FFFFFF',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif',
      padding: `${config?.verticalPadding || '120px'} 24px`
    },
    content: {
      maxWidth: config?.maxWidth || '900px',
      width: '100%',
      textAlign: config?.textAlign || 'center'
    },
    headline: {
      fontSize: config?.headlineSize || '64px',
      fontWeight: config?.headlineWeight || '300',
      color: config?.headlineColor || '#1A1A1A',
      lineHeight: '1.2',
      marginBottom: '24px',
      letterSpacing: '-0.02em'
    },
    character: {
      display: 'inline-block',
      opacity: 0,
      transform: `translateY(${startDistance}px)`
    },
    subheading: {
      fontSize: config?.subheadingSize || '20px',
      fontWeight: config?.subheadingWeight || '400',
      color: config?.subheadingColor || '#6B6B6B',
      lineHeight: '1.6',
      marginBottom: '40px',
      maxWidth: '700px',
      margin: config?.textAlign === 'center' ? '0 auto 40px' : '0 0 40px'
    },
    ctaButton: {
      display: 'inline-block',
      padding: '16px 40px',
      fontSize: '16px',
      fontWeight: '500',
      color: config?.ctaTextColor || '#FFFFFF',
      backgroundColor: config?.ctaBackgroundColor || '#1A1A1A',
      border: 'none',
      borderRadius: config?.borderRadius || '6px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 0,
      transform: `translateY(${startDistance}px)`
    }
  };

  // Respect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  React.useEffect(() => {
    if (prefersReducedMotion && !hasAnimated) {
      setHasAnimated(true);
      // Instantly show all elements
      [...headlineCharsRef.current, ...subheadingCharsRef.current].forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
      if (ctaRef.current) {
        ctaRef.current.style.opacity = '1';
        ctaRef.current.style.transform = 'translateY(0)';
      }
    }
  }, [prefersReducedMotion, hasAnimated]);

  return (
    <div style={styles.container} ref={containerRef} className="animated-hero-container">
      <div style={styles.content}>
        <h1 style={styles.headline}>
          {headlineChars.map((char, idx) => (
            <span
              key={idx}
              ref={el => headlineCharsRef.current[idx] = el}
              style={styles.character}
            >
              {char}
            </span>
          ))}
        </h1>

        <p style={styles.subheading}>
          {subheadingChars.map((char, idx) => (
            <span
              key={idx}
              ref={el => subheadingCharsRef.current[idx] = el}
              style={styles.character}
            >
              {char}
            </span>
          ))}
        </p>

        {showCTA && (
          <a
            href={config?.ctaUrl || '#'}
            ref={ctaRef}
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {config?.ctaText || 'Get Started'}
          </a>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
