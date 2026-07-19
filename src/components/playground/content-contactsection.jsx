import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:45 AM
 * Component Type: Content.ContactSection
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
 * Generated: October 26, 2025, 3:15 PM
 * Component Type: Content.ContactSection
 * 
 * User Request: Create portfolio website sections inspired by Exoape and Elva
 * with bold editorial typography, minimal aesthetic, and sophisticated layouts
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 2 (Static contact display, click interactions)
 * Expressive Complexity: 4 (Elegant minimal design with clear hierarchy)
 * 
 * USER DESIGN DIRECTION
 * Reference sites: Exoape, Elva - minimal contact sections with clean
 * typography, simple information presentation, elegant restraint
 * 
 * DESIGN BRIEF
 * Core Concept: Minimal contact section with clear hierarchy, large title,
 * organized contact information, and optional CTA button
 * 
 * Visual Profile: Sophisticated | Minimal | Clean | Elegant
 * Design Style: Contemporary Minimal with refined simplicity
 * 
 * Color Palette: True Gray System
 *   - Base 1 (#FAFAFA): Section background
 *   - Base 4 (#171717): Primary text
 *   - Base 3 (#737373): Supporting text
 *   - Base 5 (#000000): CTA button background
 * 
 * Typography:
 *   - System fonts
 *   - Weight Range: 300-600
 *   - Hierarchy: Large title (64px), medium labels (14px uppercase), large info (24px)
 *   - Special: Uppercase labels with letter-spacing for refinement
 * 
 * Spacing & Layout:
 *   - Padding: 80-120px vertical
 *   - Two-column layout desktop, stacked mobile
 *   - Generous gaps between elements (32-48px)
 * 
 * Interaction Design:
 *   - Hover: Underline on contact links, button lift
 *   - Transitions: 300ms ease-out
 *   - Focus: Clear keyboard indicators
 * 
 * Key Animation: Standard appearance transition (400ms ease-out)
 * 
 * Design Rationale: Minimal contact section provides essential information
 * without clutter. Large title establishes section clearly. Organized layout
 * with uppercase labels creates professional polish. Hover states provide
 * feedback while maintaining elegant restraint. Light background provides
 * visual break after dark statement section.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Content.ContactSection",
  "description": "Minimal contact section with elegant typography, organized information layout, and optional CTA. Features clear hierarchy, hover states, and responsive design. Perfect for portfolio contact pages.",
  "editorElement": {
    "selector": ".contact-section-minimal",
    "displayName": "Contact Section",
    "archetype": "container",
    "data": {
      "sectionTitle": {
        "dataType": "text",
        "displayName": "Section Title",
        "defaultValue": "Let's Work Together",
        "group": "Content"
      },
      "email": {
        "dataType": "text",
        "displayName": "Email Address",
        "defaultValue": "hello@example.com",
        "group": "Content"
      },
      "phone": {
        "dataType": "text",
        "displayName": "Phone Number",
        "defaultValue": "+1 234 567 8900",
        "group": "Content"
      },
      "location": {
        "dataType": "text",
        "displayName": "Location",
        "defaultValue": "New York, NY",
        "group": "Content"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "Send Message",
        "group": "Content"
      },
      "ctaLink": {
        "dataType": "text",
        "displayName": "CTA Button Link",
        "defaultValue": "mailto:hello@example.com",
        "group": "Content"
      },
      "showCTA": {
        "dataType": "booleanValue",
        "displayName": "Show CTA Button",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#171717",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#737373",
        "group": "Colors"
      },
      "infoColor": {
        "dataType": "color",
        "displayName": "Info Color",
        "defaultValue": "#171717",
        "group": "Colors"
      },
      "ctaBackgroundColor": {
        "dataType": "color",
        "displayName": "CTA Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "ctaTextColor": {
        "dataType": "color",
        "displayName": "CTA Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 64,
        "group": "Typography"
      },
      "titleFontWeight": {
        "dataType": "select",
        "displayName": "Title Font Weight",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700"],
        "group": "Typography"
      },
      "infoFontSize": {
        "dataType": "number",
        "displayName": "Info Font Size (px)",
        "defaultValue": 24,
        "group": "Typography"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
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
  const sectionTitle = config?.sectionTitle || "Let's Work Together";
  const email = config?.email || "hello@example.com";
  const phone = config?.phone || "+1 234 567 8900";
  const location = config?.location || "New York, NY";
  const ctaText = config?.ctaText || "Send Message";
  const ctaLink = config?.ctaLink || "mailto:hello@example.com";
  const showCTA = config?.showCTA !== false;
  const backgroundColor = config?.backgroundColor || "#FAFAFA";
  const titleColor = config?.titleColor || "#171717";
  const labelColor = config?.labelColor || "#737373";
  const infoColor = config?.infoColor || "#171717";
  const ctaBackgroundColor = config?.ctaBackgroundColor || "#000000";
  const ctaTextColor = config?.ctaTextColor || "#FFFFFF";
  const titleFontSize = parseInt(config?.titleFontSize || "64");
  const titleFontWeight = config?.titleFontWeight || "600";
  const infoFontSize = parseInt(config?.infoFontSize || "24");
  const animationDuration = parseInt(config?.animationDuration || "400");
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

  const ContactItem = ({ label, value, href }) => (
    <div
      style={{
        marginBottom: '32px'
      }}
    >
      <div
        style={{
          fontSize: '12px',
          fontWeight: '500',
          color: labelColor,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '8px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        {label}
      </div>
      {href ? (
        <a
          href={href}
          style={{
            fontSize: `${infoFontSize}px`,
            fontWeight: '400',
            color: infoColor,
            textDecoration: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'opacity 300ms ease-out',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.6';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          {value}
        </a>
      ) : (
        <div
          style={{
            fontSize: `${infoFontSize}px`,
            fontWeight: '400',
            color: infoColor,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {value}
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="contact-section-minimal"
      style={{
        backgroundColor: backgroundColor,
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        width: '100%'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          opacity: shouldAnimate ? (isVisible ? 1 : 0) : 1,
          transform: shouldAnimate ? (isVisible ? 'translateY(0)' : 'translateY(30px)') : 'translateY(0)',
          transition: shouldAnimate ? `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out` : 'none'
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: `clamp(${titleFontSize * 0.5}px, ${titleFontSize * 0.08}vw + ${titleFontSize * 0.35}px, ${titleFontSize}px)`,
            fontWeight: titleFontWeight,
            color: titleColor,
            margin: '0 0 64px 0',
            lineHeight: '1.2',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {sectionTitle}
        </h2>

        {/* Contact Info Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '48px',
            marginBottom: showCTA ? '64px' : '0'
          }}
        >
          <ContactItem 
            label="Email" 
            value={email} 
            href={`mailto:${email}`}
          />
          <ContactItem 
            label="Phone" 
            value={phone} 
            href={`tel:${phone.replace(/\s/g, '')}`}
          />
          <ContactItem 
            label="Location" 
            value={location}
          />
        </div>

        {/* CTA Button */}
        {showCTA && (
          <a
            href={ctaLink}
            style={{
              display: 'inline-block',
              padding: '18px 48px',
              fontSize: '16px',
              fontWeight: '500',
              color: ctaTextColor,
              backgroundColor: ctaBackgroundColor,
              border: 'none',
              textDecoration: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              cursor: 'pointer',
              transition: 'transform 300ms ease-out, opacity 300ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
