import React from "react";

const MANIFEST = {
  "type": "Marketing.CTABanner",
  "description": "Sophisticated call-to-action banner with animated gradient and optional countdown timer",
  "editorElement": {
    "selector": ".cta-banner",
    "displayName": "CTA Banner",
    "archetype": "container",
    "data": {
      "headline": {
        "dataType": "text",
        "displayName": "Headline",
        "defaultValue": "Start Your Free Trial Today",
        "group": "Content"
      },
      "subheadline": {
        "dataType": "text",
        "displayName": "Subheadline",
        "defaultValue": "Join thousands of satisfied customers. No credit card required.",
        "group": "Content"
      },
      "primaryButtonText": {
        "dataType": "text",
        "displayName": "Primary Button Text",
        "defaultValue": "Get Started Free",
        "group": "Content"
      },
      "secondaryButtonText": {
        "dataType": "text",
        "displayName": "Secondary Button Text",
        "defaultValue": "Learn More",
        "group": "Content"
      },
      "showCountdown": {
        "dataType": "booleanValue",
        "displayName": "Show Countdown Timer",
        "defaultValue": false,
        "group": "Content"
      },
      "countdownDate": {
        "dataType": "text",
        "displayName": "Countdown Target Date",
        "defaultValue": "2025-12-31T23:59:59",
        "group": "Content",
        "description": "ISO format: YYYY-MM-DDTHH:MM:SS"
      },
      "showSecondaryButton": {
        "dataType": "booleanValue",
        "displayName": "Show Secondary Button",
        "defaultValue": true,
        "group": "Content"
      },
      "animateBackground": {
        "dataType": "booleanValue",
        "displayName": "Animate Background",
        "defaultValue": true,
        "group": "Animation"
      },
      "headlineSize": {
        "dataType": "number",
        "displayName": "Headline Font Size (px)",
        "defaultValue": 42,
        "group": "Typography"
      },
      "subheadlineSize": {
        "dataType": "number",
        "displayName": "Subheadline Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Headline Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "backgroundGradientStart": {
        "dataType": "color",
        "displayName": "Gradient Start Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "backgroundGradientEnd": {
        "dataType": "color",
        "displayName": "Gradient End Color",
        "defaultValue": "#2D2D2D",
        "group": "Colors"
      },
      "headlineColor": {
        "dataType": "color",
        "displayName": "Headline Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "subheadlineColor": {
        "dataType": "color",
        "displayName": "Subheadline Color",
        "defaultValue": "#D1D5DB",
        "group": "Colors"
      },
      "primaryButtonBackground": {
        "dataType": "color",
        "displayName": "Primary Button Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "primaryButtonText": {
        "dataType": "color",
        "displayName": "Primary Button Text",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "secondaryButtonBorder": {
        "dataType": "color",
        "displayName": "Secondary Button Border",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "secondaryButtonText": {
        "dataType": "color",
        "displayName": "Secondary Button Text",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "countdownColor": {
        "dataType": "color",
        "displayName": "Countdown Text Color",
        "defaultValue": "#FFFFFF",
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
  const headline = config?.headline || "Start Your Free Trial Today";
  const subheadline = config?.subheadline || "Join thousands of satisfied customers. No credit card required.";
  const primaryBtnText = config?.primaryButtonText || "Get Started Free";
  const secondaryBtnText = config?.secondaryButtonText || "Learn More";
  const showCountdown = config?.showCountdown === true;
  const countdownDate = config?.countdownDate || "2025-12-31T23:59:59";
  const showSecondaryButton = config?.showSecondaryButton !== false;
  const animateBackground = config?.animateBackground !== false;
  const headlineSize = parseInt(config?.headlineSize || "42");
  const subheadlineSize = parseInt(config?.subheadlineSize || "18");
  const fontWeight = config?.fontWeight || "500";
  const gradientStart = config?.backgroundGradientStart || "#1A1A1A";
  const gradientEnd = config?.backgroundGradientEnd || "#2D2D2D";
  const headlineColor = config?.headlineColor || "#FFFFFF";
  const subheadlineColor = config?.subheadlineColor || "#D1D5DB";
  const primaryButtonBg = config?.primaryButtonBackground || "#FFFFFF";
  const primaryButtonColor = config?.primaryButtonText || "#1A1A1A";
  const secondaryButtonBorder = config?.secondaryButtonBorder || "#FFFFFF";
  const secondaryButtonColor = config?.secondaryButtonText || "#FFFFFF";
  const countdownColor = config?.countdownColor || "#FFFFFF";

  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Countdown timer
  React.useEffect(() => {
    if (!showCountdown) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(countdownDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [showCountdown, countdownDate]);

  return (
    <div className="cta-banner" style={{
      minHeight: '100vh',
      width: '100%',
      background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
      backgroundSize: animateBackground && !prefersReducedMotion ? '200% 200%' : '100% 100%',
      animation: animateBackground && !prefersReducedMotion ? 'gradientShift 15s ease infinite' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Pattern */}
      {animateBackground && !prefersReducedMotion && (
        <>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 20s ease-in-out infinite',
            animationDelay: '0s'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '15%',
            right: '15%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '-5s'
          }} />
        </>
      )}

      <div style={{
        maxWidth: '1000px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Countdown Timer */}
        {showCountdown && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '3rem',
            opacity: prefersReducedMotion ? 1 : 0,
            animation: prefersReducedMotion ? 'none' : 'fadeIn 500ms ease-out 200ms forwards'
          }}>
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '500',
                  color: countdownColor,
                  lineHeight: 1,
                  minWidth: '70px',
                  padding: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  color: subheadlineColor,
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Headline */}
        <h1 style={{
          fontSize: `clamp(${headlineSize * 0.6}px, ${headlineSize / 16}rem + 2vw, ${headlineSize * 1.2}px)`,
          fontWeight,
          color: headlineColor,
          margin: '0 0 1rem 0',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          opacity: prefersReducedMotion ? 1 : 0,
          animation: prefersReducedMotion ? 'none' : 'fadeSlideUp 500ms ease-out 400ms forwards'
        }}>
          {headline}
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: `clamp(${subheadlineSize * 0.875}px, ${subheadlineSize / 16}rem + 0.5vw, ${subheadlineSize * 1.125}px)`,
          fontWeight: '300',
          color: subheadlineColor,
          margin: '0 0 2.5rem 0',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.6,
          letterSpacing: '0.01em',
          opacity: prefersReducedMotion ? 1 : 0,
          animation: prefersReducedMotion ? 'none' : 'fadeSlideUp 500ms ease-out 600ms forwards'
        }}>
          {subheadline}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          opacity: prefersReducedMotion ? 1 : 0,
          animation: prefersReducedMotion ? 'none' : 'fadeSlideUp 500ms ease-out 800ms forwards'
        }}>
          {/* Primary Button */}
          <button
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.0625rem',
              fontWeight: '500',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: primaryButtonColor,
              backgroundColor: primaryButtonBg,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              letterSpacing: '0.025em',
              transition: 'all 200ms ease-out',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            {primaryBtnText}
          </button>

          {/* Secondary Button */}
          {showSecondaryButton && (
            <button
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.0625rem',
                fontWeight: '500',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: secondaryButtonColor,
                backgroundColor: 'transparent',
                border: `2px solid ${secondaryButtonBorder}`,
                borderRadius: '8px',
                cursor: 'pointer',
                letterSpacing: '0.025em',
                transition: 'all 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = secondaryButtonBorder;
                e.currentTarget.style.color = primaryButtonColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = secondaryButtonColor;
              }}
            >
              {secondaryBtnText}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Component;