import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:50 AM
 * Component Type: Content.ContactCentered
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
 * Generated: October 26, 2025, 3:40 PM
 * Component Type: Content.ContactCentered
 * 
 * User Request: Create additional portfolio section variations (Set 2)
 * with different layout approaches while maintaining editorial sophistication
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 2 (Simple centered layout, link interactions)
 * Expressive Complexity: 4 (Bold centered typography, minimal elegance)
 * 
 * USER DESIGN DIRECTION
 * Set 2 variation - centered contact section with large statement-style
 * typography and minimal contact links, maximum impact through simplicity
 * 
 * DESIGN BRIEF
 * Core Concept: Centered contact section with bold call-to-action headline
 * and minimal contact information, creating impactful final section
 * 
 * Visual Profile: Sophisticated | Bold | Minimal | Impactful
 * Design Style: Contemporary Minimal with bold typography
 * 
 * Color Palette: True Gray System
 *   - Base 1 (#FAFAFA): Section background
 *   - Base 4 (#171717): Main text
 *   - Base 3 (#737373): Supporting text
 *   - Accent (#000000): Link underlines on hover
 * 
 * Typography:
 *   - System fonts
 *   - Weight Range: 300-700
 *   - Hierarchy: Large headline (72px), medium contact info (24px)
 *   - Bold statement approach
 * 
 * Spacing & Layout:
 *   - Centered alignment
 *   - Padding: 100-140px vertical for drama
 *   - Generous gaps (40-48px) between elements
 * 
 * Interaction Design:
 *   - Underline on link hover
 *   - Scale slightly on hover
 *   - 300ms ease-out transitions
 * 
 * Key Animation: Standard fade and slide up (400ms ease-out)
 * 
 * Design Rationale: Centered layout with bold headline creates strong
 * call-to-action. Minimal contact information (just email/phone as links)
 * removes friction. Large typography maintains editorial boldness while
 * simplicity ensures clarity. This serves as impactful closing section.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Content.ContactCentered",
  "description": "Bold centered contact section with large headline and minimal contact links. Features dramatic typography, centered layout, and hover effects. Perfect for impactful closing section.",
  "editorElement": {
    "selector": ".contact-centered-bold",
    "displayName": "Contact Centered",
    "archetype": "container",
    "data": {
      "headline": {
        "dataType": "text",
        "displayName": "Headline",
        "defaultValue": "Let's Create Something Remarkable",
        "group": "Content"
      },
      "subheadline": {
        "dataType": "text",
        "displayName": "Subheadline",
        "defaultValue": "Ready to start your next project? Get in touch.",
        "group": "Content"
      },
      "showSubheadline": {
        "dataType": "booleanValue",
        "displayName": "Show Subheadline",
        "defaultValue": true,
        "group": "Content"
      },
      "email": {
        "dataType": "text",
        "displayName": "Email Address",
        "defaultValue": "hello@studio.com",
        "group": "Content"
      },
      "phone": {
        "dataType": "text",
        "displayName": "Phone Number",
        "defaultValue": "+1 (555) 123-4567",
        "group": "Content"
      },
      "showPhone": {
        "dataType": "booleanValue",
        "displayName": "Show Phone",
        "defaultValue": true,
        "group": "Content"
      },
      "socialLinks": {
        "dataType": "text",
        "displayName": "Social Links (JSON Array)",
        "defaultValue": JSON.stringify([
          { "label": "LinkedIn", "url": "https://linkedin.com" },
          { "label": "Instagram", "url": "https://instagram.com" },
          { "label": "Twitter", "url": "https://twitter.com" }
        ]),
        "group": "Content",
        "description": "Optional social media links"
      },
      "showSocialLinks": {
        "dataType": "booleanValue",
        "displayName": "Show Social Links",
        "defaultValue": false,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "headlineColor": {
        "dataType": "color",
        "displayName": "Headline Color",
        "defaultValue": "#171717",
        "group": "Colors"
      },
      "subheadlineColor": {
        "dataType": "color",
        "displayName": "Subheadline Color",
        "defaultValue": "#737373",
        "group": "Colors"
      },
      "linkColor": {
        "dataType": "color",
        "displayName": "Link Color",
        "defaultValue": "#171717",
        "group": "Colors"
      },
      "headlineFontSize": {
        "dataType": "number",
        "displayName": "Headline Font Size (px)",
        "defaultValue": 72,
        "group": "Typography"
      },
      "headlineFontWeight": {
        "dataType": "select",
        "displayName": "Headline Font Weight",
        "defaultValue": "700",
        "options": ["600", "700"],
        "group": "Typography"
      },
      "contactFontSize": {
        "dataType": "number",
        "displayName": "Contact Info Font Size (px)",
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
  const headline = config?.headline || "Let's Create Something Remarkable";
  const subheadline = config?.subheadline || "Ready to start your next project? Get in touch.";
  const showSubheadline = config?.showSubheadline !== false;
  const email = config?.email || "hello@studio.com";
  const phone = config?.phone || "+1 (555) 123-4567";
  const showPhone = config?.showPhone !== false;
  const showSocialLinks = config?.showSocialLinks === true;
  const backgroundColor = config?.backgroundColor || "#FAFAFA";
  const headlineColor = config?.headlineColor || "#171717";
  const subheadlineColor = config?.subheadlineColor || "#737373";
  const linkColor = config?.linkColor || "#171717";
  const headlineFontSize = parseInt(config?.headlineFontSize || "72");
  const headlineFontWeight = config?.headlineFontWeight || "700";
  const contactFontSize = parseInt(config?.contactFontSize || "24");
  const animationDuration = parseInt(config?.animationDuration || "400");
  const enableAnimation = config?.enableAnimation !== false;

  let socialLinks = [];
  try {
    socialLinks = JSON.parse(config?.socialLinks || '[]');
    if (!Array.isArray(socialLinks)) {
      socialLinks = [];
    }
  } catch (e) {
    socialLinks = [];
  }

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

  const ContactLink = ({ href, children }) => (
    <a
      href={href}
      style={{
        fontSize: `${contactFontSize}px`,
        fontWeight: '400',
        color: linkColor,
        textDecoration: 'none',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
        display: 'inline-block',
        position: 'relative',
        paddingBottom: '4px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.6';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: linkColor,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 300ms ease-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scaleX(1)';
        }}
      />
    </a>
  );

  return (
    <div
      ref={sectionRef}
      className="contact-centered-bold"
      style={{
        backgroundColor: backgroundColor,
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          opacity: shouldAnimate ? (isVisible ? 1 : 0) : 1,
          transform: shouldAnimate ? (isVisible ? 'translateY(0)' : 'translateY(30px)') : 'translateY(0)',
          transition: shouldAnimate ? `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out` : 'none'
        }}
      >
        {/* Main Headline */}
        <h2
          style={{
            fontSize: `clamp(${headlineFontSize * 0.45}px, ${headlineFontSize * 0.08}vw + ${headlineFontSize * 0.3}px, ${headlineFontSize}px)`,
            fontWeight: headlineFontWeight,
            color: headlineColor,
            margin: showSubheadline ? '0 0 24px 0' : '0 0 56px 0',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {headline}
        </h2>

        {/* Subheadline */}
        {showSubheadline && (
          <p
            style={{
              fontSize: '20px',
              fontWeight: '300',
              color: subheadlineColor,
              margin: '0 0 56px 0',
              lineHeight: '1.6',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            {subheadline}
          </p>
        )}

        {/* Contact Links */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            marginBottom: showSocialLinks && socialLinks.length > 0 ? '48px' : '0'
          }}
        >
          <ContactLink href={`mailto:${email}`}>
            {email}
          </ContactLink>
          
          {showPhone && (
            <ContactLink href={`tel:${phone.replace(/\s|\(|\)|-/g, '')}`}>
              {phone}
            </ContactLink>
          )}
        </div>

        {/* Social Links */}
        {showSocialLinks && socialLinks.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '32px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              paddingTop: '32px',
              borderTop: '1px solid rgba(0,0,0,0.08)'
            }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: linkColor,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  transition: 'opacity 300ms ease-out',
                  opacity: 0.7
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.7';
                }}
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
