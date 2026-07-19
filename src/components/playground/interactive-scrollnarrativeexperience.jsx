import React from "react";

const MANIFEST = {
  "type": "Interactive.ScrollNarrativeExperience",
  "description": "Immersive scroll-driven storytelling experience with parallax layers, intersection-triggered reveals, and orchestrated animation timelines",
  "editorElement": {
    "selector": ".scroll-narrative-experience",
    "displayName": "Scroll Narrative Experience",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Main Title",
        "defaultValue": "The Future of Design",
        "group": "Content"
      },
      "subtitle": {
        "dataType": "text",
        "displayName": "Subtitle",
        "defaultValue": "A journey through innovation and creativity",
        "group": "Content"
      },
      "chapter1Title": {
        "dataType": "text",
        "displayName": "Chapter 1 Title",
        "defaultValue": "Discovery",
        "group": "Content"
      },
      "chapter1Text": {
        "dataType": "text",
        "displayName": "Chapter 1 Text",
        "defaultValue": "Every great story begins with curiosity. A question that demands exploration, a vision that refuses to fade.",
        "group": "Content"
      },
      "chapter2Title": {
        "dataType": "text",
        "displayName": "Chapter 2 Title",
        "defaultValue": "Innovation",
        "group": "Content"
      },
      "chapter2Text": {
        "dataType": "text",
        "displayName": "Chapter 2 Text",
        "defaultValue": "Ideas transform into reality through careful refinement. Each iteration brings us closer to perfection.",
        "group": "Content"
      },
      "chapter3Title": {
        "dataType": "text",
        "displayName": "Chapter 3 Title",
        "defaultValue": "Impact",
        "group": "Content"
      },
      "chapter3Text": {
        "dataType": "text",
        "displayName": "Chapter 3 Text",
        "defaultValue": "The culmination of vision and execution. Where design meets purpose, and purpose creates change.",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "heroBackgroundColor": {
        "dataType": "color",
        "displayName": "Hero Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "chapterNumberColor": {
        "dataType": "color",
        "displayName": "Chapter Number Color",
        "defaultValue": "#DEE2E6",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 72,
        "group": "Typography"
      },
      "subtitleFontSize": {
        "dataType": "number",
        "displayName": "Subtitle Font Size (px)",
        "defaultValue": 20,
        "group": "Typography"
      },
      "chapterTitleFontSize": {
        "dataType": "number",
        "displayName": "Chapter Title Font Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "bodyFontSize": {
        "dataType": "number",
        "displayName": "Body Font Size (px)",
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
      "titleFontWeight": {
        "dataType": "select",
        "displayName": "Title Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "-0.02em",
        "options": ["-0.02em", "-0.01em", "0em", "0.01em", "0.02em"],
        "group": "Typography"
      },
      "parallaxSpeed": {
        "dataType": "select",
        "displayName": "Parallax Speed",
        "defaultValue": "0.5",
        "options": ["0.3", "0.4", "0.5", "0.6", "0.7"],
        "group": "Animation"
      },
      "revealDuration": {
        "dataType": "select",
        "displayName": "Reveal Duration (ms)",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800"],
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay (ms)",
        "defaultValue": "150",
        "options": ["100", "150", "200", "250", "300"],
        "group": "Animation"
      },
      "scrollThreshold": {
        "dataType": "select",
        "displayName": "Trigger Threshold",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.4", "0.5"],
        "group": "Animation"
      },
      "repeatAnimation": {
        "dataType": "booleanValue",
        "displayName": "Repeat on Scroll",
        "defaultValue": false,
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
  const [heroVisible, setHeroVisible] = React.useState(false);
  const [chapter1Visible, setChapter1Visible] = React.useState(false);
  const [chapter2Visible, setChapter2Visible] = React.useState(false);
  const [chapter3Visible, setChapter3Visible] = React.useState(false);
  const [parallaxOffset, setParallaxOffset] = React.useState(0);
  const [activeChapter, setActiveChapter] = React.useState(0);
  
  const heroRef = React.useRef(null);
  const chapter1Ref = React.useRef(null);
  const chapter2Ref = React.useRef(null);
  const chapter3Ref = React.useRef(null);
  const parallaxLayerRef = React.useRef(null);
  const animatedChapters = React.useRef(new Set());

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config values safely
  const title = config?.title || "The Future of Design";
  const subtitle = config?.subtitle || "A journey through innovation and creativity";
  const chapter1Title = config?.chapter1Title || "Discovery";
  const chapter1Text = config?.chapter1Text || "Every great story begins with curiosity. A question that demands exploration, a vision that refuses to fade.";
  const chapter2Title = config?.chapter2Title || "Innovation";
  const chapter2Text = config?.chapter2Text || "Ideas transform into reality through careful refinement. Each iteration brings us closer to perfection.";
  const chapter3Title = config?.chapter3Title || "Impact";
  const chapter3Text = config?.chapter3Text || "The culmination of vision and execution. Where design meets purpose, and purpose creates change.";
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const heroBackgroundColor = config?.heroBackgroundColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const secondaryTextColor = config?.secondaryTextColor || "#495057";
  const accentColor = config?.accentColor || "#343A40";
  const chapterNumberColor = config?.chapterNumberColor || "#DEE2E6";
  
  const titleFontSize = parseInt(config?.titleFontSize) || 72;
  const subtitleFontSize = parseInt(config?.subtitleFontSize) || 20;
  const chapterTitleFontSize = parseInt(config?.chapterTitleFontSize) || 48;
  const bodyFontSize = parseInt(config?.bodyFontSize) || 18;
  const fontWeight = config?.fontWeight || "400";
  const titleFontWeight = config?.titleFontWeight || "300";
  const letterSpacing = config?.letterSpacing || "-0.02em";
  
  const parallaxSpeed = parseFloat(config?.parallaxSpeed) || 0.5;
  const revealDuration = parseInt(config?.revealDuration) || 600;
  const staggerDelay = parseInt(config?.staggerDelay) || 150;
  const scrollThreshold = parseFloat(config?.scrollThreshold) || 0.3;
  const repeatAnimation = config?.repeatAnimation !== false;

  // Parallax scroll handler
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setParallaxOffset(scrollY * parallaxSpeed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxSpeed, prefersReducedMotion]);

  // Intersection Observer for reveals
  React.useEffect(() => {
    const observerOptions = {
      threshold: scrollThreshold,
      rootMargin: '0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const chapterId = entry.target.dataset.chapter;
        
        if (entry.isIntersecting) {
          // Set active chapter
          setActiveChapter(parseInt(chapterId));
          
          // Trigger reveal if not animated before (or if repeat is enabled)
          if (repeatAnimation || !animatedChapters.current.has(chapterId)) {
            switch(chapterId) {
              case '0':
                setHeroVisible(true);
                break;
              case '1':
                setChapter1Visible(true);
                break;
              case '2':
                setChapter2Visible(true);
                break;
              case '3':
                setChapter3Visible(true);
                break;
            }
            animatedChapters.current.add(chapterId);
          }
        } else if (repeatAnimation) {
          // Reset visibility if repeat is enabled and element left viewport
          switch(chapterId) {
            case '0':
              setHeroVisible(false);
              break;
            case '1':
              setChapter1Visible(false);
              break;
            case '2':
              setChapter2Visible(false);
              break;
            case '3':
              setChapter3Visible(false);
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (chapter1Ref.current) observer.observe(chapter1Ref.current);
    if (chapter2Ref.current) observer.observe(chapter2Ref.current);
    if (chapter3Ref.current) observer.observe(chapter3Ref.current);

    return () => observer.disconnect();
  }, [scrollThreshold, repeatAnimation]);

  const containerStyle = {
    backgroundColor,
    color: textColor,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  };

  const heroSectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: heroBackgroundColor,
    padding: '4rem 2rem'
  };

  const parallaxLayerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: prefersReducedMotion ? 'none' : `translateY(${parallaxOffset}px)`,
    willChange: prefersReducedMotion ? 'auto' : 'transform',
    zIndex: 0,
    opacity: 0.03,
    pointerEvents: 'none'
  };

  const titleStyle = {
    fontSize: `clamp(${titleFontSize * 0.5}px, 8vw, ${titleFontSize}px)`,
    fontWeight: titleFontWeight,
    letterSpacing,
    marginBottom: '1.5rem',
    textAlign: 'center',
    maxWidth: '20ch',
    lineHeight: 1.1,
    opacity: prefersReducedMotion ? 1 : (heroVisible ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (heroVisible ? 'translateY(0)' : 'translateY(30px)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
    position: 'relative',
    zIndex: 1
  };

  const subtitleStyle = {
    fontSize: `clamp(${subtitleFontSize * 0.8}px, 2.5vw, ${subtitleFontSize}px)`,
    fontWeight,
    color: secondaryTextColor,
    textAlign: 'center',
    maxWidth: '40ch',
    lineHeight: 1.6,
    opacity: prefersReducedMotion ? 1 : (heroVisible ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (heroVisible ? 'translateY(0)' : 'translateY(30px)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}ms, transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}ms`,
    position: 'relative',
    zIndex: 1
  };

  const chapterSectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6rem 2rem',
    position: 'relative'
  };

  const chapterContentStyle = {
    maxWidth: '800px',
    width: '100%',
    position: 'relative'
  };

  const getChapterNumberStyle = (visible) => ({
    position: 'absolute',
    top: '-2rem',
    left: '-1rem',
    fontSize: `clamp(120px, 15vw, 200px)`,
    fontWeight: '300',
    color: chapterNumberColor,
    lineHeight: 1,
    zIndex: 0,
    userSelect: 'none',
    opacity: prefersReducedMotion ? 0.6 : (visible ? 0.6 : 0),
    transform: prefersReducedMotion ? 'none' : (visible ? 'translateX(0)' : 'translateX(-30px)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
  });

  const getChapterTitleStyle = (visible) => ({
    fontSize: `clamp(${chapterTitleFontSize * 0.6}px, 6vw, ${chapterTitleFontSize}px)`,
    fontWeight: titleFontWeight,
    letterSpacing,
    marginBottom: '2rem',
    position: 'relative',
    zIndex: 1,
    opacity: prefersReducedMotion ? 1 : (visible ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (visible ? 'translateY(0)' : 'translateY(30px)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}ms, transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}ms`
  });

  const getChapterTextStyle = (visible) => ({
    fontSize: `clamp(${bodyFontSize * 0.9}px, 2vw, ${bodyFontSize}px)`,
    fontWeight,
    color: secondaryTextColor,
    lineHeight: 1.8,
    maxWidth: '60ch',
    position: 'relative',
    zIndex: 1,
    opacity: prefersReducedMotion ? 1 : (visible ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (visible ? 'translateY(0)' : 'translateY(30px)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay * 2}ms, transform ${revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay * 2}ms`
  });

  const progressIndicatorStyle = {
    position: 'fixed',
    left: '2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    zIndex: 100
  };

  const progressDotStyle = (isActive) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isActive ? accentColor : chapterNumberColor,
    transition: 'background-color 300ms ease',
    cursor: 'pointer'
  });

  return (
    <div style={containerStyle} className="scroll-narrative-experience">
      {/* Progress Indicator */}
      <div style={progressIndicatorStyle} className="progress-indicator">
        <div style={progressDotStyle(activeChapter === 0)} title="Intro" />
        <div style={progressDotStyle(activeChapter === 1)} title="Chapter 1" />
        <div style={progressDotStyle(activeChapter === 2)} title="Chapter 2" />
        <div style={progressDotStyle(activeChapter === 3)} title="Chapter 3" />
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef} 
        data-chapter="0"
        style={heroSectionStyle}
      >
        {/* Parallax Background Layer */}
        <div ref={parallaxLayerRef} style={parallaxLayerStyle}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
      </section>

      {/* Chapter 1 */}
      <section 
        ref={chapter1Ref}
        data-chapter="1"
        style={chapterSectionStyle}
      >
        <div style={chapterContentStyle}>
          <div style={getChapterNumberStyle(chapter1Visible)}>01</div>
          <h2 style={getChapterTitleStyle(chapter1Visible)}>{chapter1Title}</h2>
          <p style={getChapterTextStyle(chapter1Visible)}>{chapter1Text}</p>
        </div>
      </section>

      {/* Chapter 2 */}
      <section 
        ref={chapter2Ref}
        data-chapter="2"
        style={{
          ...chapterSectionStyle,
          backgroundColor: heroBackgroundColor
        }}
      >
        <div style={chapterContentStyle}>
          <div style={getChapterNumberStyle(chapter2Visible)}>02</div>
          <h2 style={getChapterTitleStyle(chapter2Visible)}>{chapter2Title}</h2>
          <p style={getChapterTextStyle(chapter2Visible)}>{chapter2Text}</p>
        </div>
      </section>

      {/* Chapter 3 */}
      <section 
        ref={chapter3Ref}
        data-chapter="3"
        style={chapterSectionStyle}
      >
        <div style={chapterContentStyle}>
          <div style={getChapterNumberStyle(chapter3Visible)}>03</div>
          <h2 style={getChapterTitleStyle(chapter3Visible)}>{chapter3Title}</h2>
          <p style={getChapterTextStyle(chapter3Visible)}>{chapter3Text}</p>
        </div>
      </section>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
