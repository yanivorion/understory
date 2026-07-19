import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:53 AM
 * Component Type: Content.StatementSection
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
 * Generated: October 26, 2025, 3:10 PM
 * Component Type: Content.StatementSection
 * 
 * User Request: Create portfolio website sections inspired by Exoape and Elva
 * with bold editorial typography, minimal aesthetic, and sophisticated layouts
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 2 (Static content with entrance animation)
 * Expressive Complexity: 5 (Bold statement typography, high impact design)
 * 
 * USER DESIGN DIRECTION
 * Reference sites: Exoape, Elva - large-scale statement typography on dark
 * backgrounds, bold declarations, minimal supporting text
 * 
 * DESIGN BRIEF
 * Core Concept: Full-width statement section with oversized typography on dark
 * background, creating dramatic contrast and showcasing editorial boldness
 * 
 * Visual Profile: Sophisticated | Bold | Editorial | Dramatic
 * Design Style: Editorial-Luxury with maximum typographic impact
 * 
 * Color Palette: Inverted system (dark background)
 *   - Base 5 (#000000): Section background
 *   - Base 4 (#171717): Alternate dark option
 *   - Accent (#FFFFFF): Primary text
 *   - Base 2 (#E5E5E5): Supporting text
 * 
 * Typography:
 *   - System fonts
 *   - Weight Range: 300-700 (bold for statement)
 *   - Hierarchy: Massive statement (80-120px), small supporting text (16-18px)
 *   - Letter-spacing: -0.02em for tight, impactful headlines
 * 
 * Spacing & Layout:
 *   - Padding: 100-160px vertical for drama
 *   - Centered content with max-width constraint
 *   - Generous line-height on statement text
 * 
 * Interaction Design:
 *   - Standard appearance transition
 *   - 500ms ease-out for elegance
 * 
 * Key Animation: Opacity + translateY entrance (500ms ease-out)
 * 
 * Design Rationale: Dark background creates dramatic stage for bold statement
 * typography. Inspired by Elva's "WE SPECIALIZE" section - using size and
 * contrast to command attention. Minimal supporting text provides context
 * without diluting impact. This section serves as visual break and creates
 * rhythm through dramatic contrast with lighter sections.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Content.StatementSection",
  "description": "Bold statement section with oversized typography on dark background. Features dramatic contrast, large-scale text, and optional supporting copy. Perfect for about sections or bold declarations.",
  "editorElement": {
    "selector": ".statement-section-dark",
    "displayName": "Statement Section",
    "archetype": "container",
    "data": {
      "statementText": {
        "dataType": "text",
        "displayName": "Statement Text",
        "defaultValue": "WE SPECIALIZE IN CREATING EXCEPTIONAL DIGITAL EXPERIENCES",
        "group": "Content",
        "description": "Main bold statement - use uppercase for impact"
      },
      "supportingText": {
        "dataType": "text",
        "displayName": "Supporting Text",
        "defaultValue": "We help experience-driven companies thrive by making their audience feel the refined intricacies of their brand in the digital space.",
        "group": "Content"
      },
      "showSupportingText": {
        "dataType": "booleanValue",
        "displayName": "Show Supporting Text",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "statementColor": {
        "dataType": "color",
        "displayName": "Statement Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "supportingColor": {
        "dataType": "color",
        "displayName": "Supporting Text Color",
        "defaultValue": "#E5E5E5",
        "group": "Colors"
      },
      "statementFontSize": {
        "dataType": "number",
        "displayName": "Statement Font Size (px)",
        "defaultValue": 96,
        "group": "Typography"
      },
      "statementFontWeight": {
        "dataType": "select",
        "displayName": "Statement Font Weight",
        "defaultValue": "700",
        "options": ["500", "600", "700"],
        "group": "Typography"
      },
      "supportingFontSize": {
        "dataType": "number",
        "displayName": "Supporting Font Size (px)",
        "defaultValue": 18,
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
        "dataType": "number",
        "displayName": "Max Content Width (px)",
        "defaultValue": 1200,
        "group": "Layout"
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
  const statementText = config?.statementText || "WE SPECIALIZE IN CREATING EXCEPTIONAL DIGITAL EXPERIENCES";
  const supportingText = config?.supportingText || "We help experience-driven companies thrive by making their audience feel the refined intricacies of their brand in the digital space.";
  const showSupportingText = config?.showSupportingText !== false;
  const backgroundColor = config?.backgroundColor || "#000000";
  const statementColor = config?.statementColor || "#FFFFFF";
  const supportingColor = config?.supportingColor || "#E5E5E5";
  const statementFontSize = parseInt(config?.statementFontSize || "96");
  const statementFontWeight = config?.statementFontWeight || "700";
  const supportingFontSize = parseInt(config?.supportingFontSize || "18");
  const textAlign = config?.textAlign || "center";
  const maxWidth = parseInt(config?.maxWidth || "1200");
  const animationDuration = parseInt(config?.animationDuration || "500");
  const enableAnimation = config?.enableAnimation !== false;

  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [enableAnimation, prefersReducedMotion]);

  const shouldAnimate = enableAnimation && !prefersReducedMotion;

  return (
    <div
      ref={sectionRef}
      className="statement-section-dark"
      style={{
        backgroundColor: backgroundColor,
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          maxWidth: `${maxWidth}px`,
          width: '100%',
          textAlign: textAlign,
          opacity: shouldAnimate ? (isVisible ? 1 : 0) : 1,
          transform: shouldAnimate ? (isVisible ? 'translateY(0)' : 'translateY(30px)') : 'translateY(0)',
          transition: shouldAnimate ? `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out` : 'none'
        }}
      >
        {/* Main Statement */}
        <h2
          style={{
            fontSize: `clamp(${statementFontSize * 0.35}px, ${statementFontSize * 0.08}vw + ${statementFontSize * 0.25}px, ${statementFontSize}px)`,
            fontWeight: statementFontWeight,
            color: statementColor,
            margin: showSupportingText ? '0 0 48px 0' : '0',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {statementText}
        </h2>

        {/* Supporting Text */}
        {showSupportingText && (
          <p
            style={{
              fontSize: `${supportingFontSize}px`,
              fontWeight: '300',
              color: supportingColor,
              margin: '0 auto',
              maxWidth: '700px',
              lineHeight: '1.7',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              opacity: 0.9
            }}
          >
            {supportingText}
          </p>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
