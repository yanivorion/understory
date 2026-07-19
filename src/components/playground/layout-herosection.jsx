import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 04:08 AM
 * Component Type: Layout.HeroSection
 * 
* User Request: N/A
*
* Design Brief:
* N/A
 * ============================================================================
 */

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: October 26, 2025, 3:00 PM
 * Component Type: Layout.HeroSection
 * 
 * User Request: Create portfolio website sections inspired by Exoape and Elva
 * with bold editorial typography, minimal aesthetic, and sophisticated layouts
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 3 (Scroll interactions, image handling, layout variations)
 * Expressive Complexity: 5 (Award-winning editorial aesthetic, bold typography)
 * 
 * USER DESIGN DIRECTION
 * Reference sites: Exoape, Elva - bold oversized typography, minimal palettes,
 * asymmetric layouts, full-bleed imagery, sophisticated negative space
 * 
 * DESIGN BRIEF
 * Core Concept: Full-viewport hero with oversized editorial typography over 
 * background image, embodying award-winning portfolio aesthetic
 * 
 * Visual Profile: Sophisticated | Editorial | Bold | Minimal
 * Design Style: Editorial-Luxury meets Contemporary Minimal
 * 
 * Color Palette: True Gray System with high contrast
 *   - Base 1 (#FAFAFA): Light elements
 *   - Base 4 (#171717): Dark text
 *   - Base 5 (#000000): Maximum contrast
 *   - Accent (#FFFFFF): Text on dark overlay
 * 
 * Typography:
 *   - System fonts for native feel
 *   - Weight Range: 300-700 (bold for editorial impact)
 *   - Hierarchy: Massive headlines (72-120px) vs refined body (16-18px)
 *   - Letter-spacing on large type for elegance
 * 
 * Spacing & Layout:
 *   - Generous padding (80-120px vertical)
 *   - Full viewport height
 *   - Asymmetric text placement
 * 
 * Interaction Design:
 *   - Standard appearance transition on load
 *   - Smooth 500ms ease-out
 *   - Respects reduced motion
 * 
 * Key Animation: Opacity + translateY entrance (500ms ease-out)
 * 
 * Design Rationale: Full-bleed hero with bold typography creates immediate 
 * impact while maintaining sophistication through restrained color and generous 
 * spacing. Oversized type establishes editorial credibility inspired by Exoape/Elva.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Layout.HeroSection",
  "description": "Full-viewport hero section with bold editorial typography overlaid on background image. Features oversized headline, supporting text, and elegant fade-in animation. Perfect for portfolio landing pages.",
  "editorElement": {
    "selector": ".hero-section-editorial",
    "displayName": "Editorial Hero Section",
    "archetype": "container",
    "data": {
      "backgroundImage": {
        "dataType": "text",
        "displayName": "Background Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80",
        "group": "Content",
        "description": "Full-width background image URL"
      },
      "headline": {
        "dataType": "text",
        "displayName": "Main Headline",
        "defaultValue": "Digital Design Experience",
        "group": "Content"
      },
      "subheadline": {
        "dataType": "text",
        "displayName": "Subheadline",
        "defaultValue": "Creative designer partnering with brands and businesses that create exceptional experiences.",
        "group": "Content"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "View Work",
        "group": "Content"
      },
      "ctaLink": {
        "dataType": "text",
        "displayName": "CTA Button Link",
        "defaultValue": "#work",
        "group": "Content"
      },
      "overlayOpacity": {
        "dataType": "number",
        "displayName": "Overlay Opacity (0-100)",
        "defaultValue": 40,
        "group": "Colors",
        "description": "Dark overlay opacity percentage"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "headlineFontSize": {
        "dataType": "number",
        "displayName": "Headline Font Size (px)",
        "defaultValue": 96,
        "group": "Typography"
      },
      "headlineFontWeight": {
        "dataType": "select",
        "displayName": "Headline Font Weight",
        "defaultValue": "700",
        "options": ["300", "400", "500", "600", "700"],
        "group": "Typography"
      },
      "subheadlineFontSize": {
        "dataType": "number",
        "displayName": "Subheadline Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "500",
        "options": ["300", "400", "500", "600", "800"],
        "group": "Animation"
      },
      "enableAnimation": {
        "dataType": "booleanValue",
        "displayName": "Enable Entrance Animation",
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
  const backgroundImage = config?.backgroundImage || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80";
  const headline = config?.headline || "Digital Design Experience";
  const subheadline = config?.subheadline || "Creative designer partnering with brands and businesses that create exceptional experiences.";
  const ctaText = config?.ctaText || "View Work";
  const ctaLink = config?.ctaLink || "#work";
  const overlayOpacity = parseInt(config?.overlayOpacity || "40");
  const textColor = config?.textColor || "#FFFFFF";
  const headlineFontSize = parseInt(config?.headlineFontSize || "96");
  const headlineFontWeight = config?.headlineFontWeight || "700";
  const subheadlineFontSize = parseInt(config?.subheadlineFontSize || "18");
  const animationDuration = parseInt(config?.animationDuration || "500");
  const enableAnimation = config?.enableAnimation !== false;

  const [isVisible, setIsVisible] = React.useState(false);
  const heroRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  React.useEffect(() => {
    if (!enableAnimation || prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [enableAnimation, prefersReducedMotion]);

  const shouldAnimate = enableAnimation && !prefersReducedMotion;

  return (
    <div
      ref={heroRef}
      className="hero-section-editorial"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(40px, 8vw, 120px) clamp(24px, 5vw, 80px)',
        overflow: 'hidden',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          opacity: overlayOpacity / 100,
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          width: '100%',
          opacity: shouldAnimate ? (isVisible ? 1 : 0) : 1,
          transform: shouldAnimate ? (isVisible ? 'translateY(0)' : 'translateY(30px)') : 'translateY(0)',
          transition: shouldAnimate ? `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out` : 'none'
        }}
      >
        {/* Subheadline */}
        <p
          style={{
            fontSize: `${subheadlineFontSize}px`,
            fontWeight: '300',
            color: textColor,
            margin: '0 0 24px 0',
            maxWidth: '560px',
            lineHeight: '1.6',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            opacity: 0.9
          }}
        >
          {subheadline}
        </p>

        {/* Main headline */}
        <h1
          style={{
            fontSize: `clamp(${headlineFontSize * 0.4}px, ${headlineFontSize * 0.08}vw + ${headlineFontSize * 0.3}px, ${headlineFontSize}px)`,
            fontWeight: headlineFontWeight,
            color: textColor,
            margin: '0 0 48px 0',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            maxWidth: '900px'
          }}
        >
          {headline}
        </h1>

        {/* CTA Button */}
        <a
          href={ctaLink}
          style={{
            display: 'inline-block',
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: '500',
            color: '#171717',
            backgroundColor: textColor,
            border: 'none',
            borderRadius: '0',
            textDecoration: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            cursor: 'pointer',
            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
            opacity: 0.95
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.opacity = '0.95';
          }}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
