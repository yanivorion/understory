import React from "react";

const MANIFEST = {
  "type": "Card.FlipCard3D",
  "description": "Premium 3D flip card with hover interaction, dual-sided content, and depth effects",
  "editorElement": {
    "selector": ".flip-card-container",
    "displayName": "3D Flip Card",
    "archetype": "container",
    "data": {
      "frontTitle": {
        "dataType": "text",
        "displayName": "Front Title",
        "defaultValue": "Sarah Johnson",
        "group": "Content - Front"
      },
      "frontSubtitle": {
        "dataType": "text",
        "displayName": "Front Subtitle",
        "defaultValue": "Senior Product Designer",
        "group": "Content - Front"
      },
      "frontImageUrl": {
        "dataType": "text",
        "displayName": "Front Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        "group": "Content - Front"
      },
      "backTitle": {
        "dataType": "text",
        "displayName": "Back Title",
        "defaultValue": "About Me",
        "group": "Content - Back"
      },
      "backContent": {
        "dataType": "text",
        "displayName": "Back Content",
        "defaultValue": "10+ years of experience crafting user-centered digital experiences. Passionate about design systems and accessibility.",
        "group": "Content - Back"
      },
      "backStats": {
        "dataType": "text",
        "displayName": "Back Stats (label:value, comma-separated)",
        "defaultValue": "Projects:127,Years:10,Awards:15",
        "group": "Content - Back"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "View Profile",
        "group": "Content - Back"
      },
      "showCTA": {
        "dataType": "booleanValue",
        "displayName": "Show CTA Button",
        "defaultValue": true,
        "group": "Content - Back"
      },
      "flipTrigger": {
        "dataType": "select",
        "displayName": "Flip Trigger",
        "defaultValue": "hover",
        "options": ["hover", "click"],
        "group": "Content - Back"
      },
      "frontBackground": {
        "dataType": "color",
        "displayName": "Front Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "frontTextColor": {
        "dataType": "color",
        "displayName": "Front Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "frontSubtitleColor": {
        "dataType": "color",
        "displayName": "Front Subtitle Color",
        "defaultValue": "#737373",
        "group": "Colors"
      },
      "backBackground": {
        "dataType": "color",
        "displayName": "Back Background",
        "defaultValue": "#2B2520",
        "group": "Colors"
      },
      "backTextColor": {
        "dataType": "color",
        "displayName": "Back Text Color",
        "defaultValue": "#F5F5F5",
        "group": "Colors"
      },
      "backAccentColor": {
        "dataType": "color",
        "displayName": "Back Accent Color",
        "defaultValue": "#8B7F73",
        "group": "Colors"
      },
      "ctaBackground": {
        "dataType": "color",
        "displayName": "CTA Background",
        "defaultValue": "#8B7F73",
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
        "defaultValue": "system-ui, -apple-system, sans-serif",
        "options": [
          "system-ui, -apple-system, sans-serif",
          "Inter, sans-serif",
          "Georgia, serif"
        ],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "select",
        "displayName": "Title Size",
        "defaultValue": "24px",
        "options": ["20px", "22px", "24px", "26px", "28px"],
        "group": "Typography"
      },
      "subtitleSize": {
        "dataType": "select",
        "displayName": "Subtitle Size",
        "defaultValue": "14px",
        "options": ["12px", "13px", "14px", "15px", "16px"],
        "group": "Typography"
      },
      "contentSize": {
        "dataType": "select",
        "displayName": "Content Size",
        "defaultValue": "15px",
        "options": ["13px", "14px", "15px", "16px"],
        "group": "Typography"
      },
      "cardWidth": {
        "dataType": "select",
        "displayName": "Card Width",
        "defaultValue": "320px",
        "options": ["280px", "300px", "320px", "340px", "360px"],
        "group": "Layout"
      },
      "cardHeight": {
        "dataType": "select",
        "displayName": "Card Height",
        "defaultValue": "420px",
        "options": ["380px", "400px", "420px", "440px", "460px"],
        "group": "Layout"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "12px",
        "options": ["8px", "10px", "12px", "16px", "20px"],
        "group": "Layout"
      },
      "flipDuration": {
        "dataType": "select",
        "displayName": "Flip Duration",
        "defaultValue": "600ms",
        "options": ["400ms", "500ms", "600ms", "700ms", "800ms"],
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
  const [isFlipped, setIsFlipped] = React.useState(false);
  
  const frontTitle = config?.frontTitle || "Sarah Johnson";
  const frontSubtitle = config?.frontSubtitle || "Senior Product Designer";
  const frontImageUrl = config?.frontImageUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop";
  const backTitle = config?.backTitle || "About Me";
  const backContent = config?.backContent || "10+ years of experience crafting user-centered digital experiences. Passionate about design systems and accessibility.";
  const backStatsString = config?.backStats || "Projects:127,Years:10,Awards:15";
  const ctaText = config?.ctaText || "View Profile";
  const showCTA = config?.showCTA !== false;
  const flipTrigger = config?.flipTrigger || "hover";
  
  const frontBackground = config?.frontBackground || "#FFFFFF";
  const frontTextColor = config?.frontTextColor || "#1A1A1A";
  const frontSubtitleColor = config?.frontSubtitleColor || "#737373";
  const backBackground = config?.backBackground || "#2B2520";
  const backTextColor = config?.backTextColor || "#F5F5F5";
  const backAccentColor = config?.backAccentColor || "#8B7F73";
  const ctaBackground = config?.ctaBackground || "#8B7F73";
  const ctaTextColor = config?.ctaTextColor || "#FFFFFF";
  
  const fontFamily = config?.fontFamily || "system-ui, -apple-system, sans-serif";
  const titleSize = config?.titleSize || "24px";
  const subtitleSize = config?.subtitleSize || "14px";
  const contentSize = config?.contentSize || "15px";
  const cardWidth = config?.cardWidth || "320px";
  const cardHeight = config?.cardHeight || "420px";
  const cornerRadius = config?.cornerRadius || "12px";
  const flipDuration = config?.flipDuration || "600ms";
  
  const backStats = backStatsString.split(',').map(stat => {
    const [label, value] = stat.split(':');
    return { label: label?.trim() || '', value: value?.trim() || '' };
  }).filter(stat => stat.label && stat.value);
  
  const handleInteraction = () => {
    if (flipTrigger === 'click') {
      setIsFlipped(!isFlipped);
    }
  };
  
  const containerStyle = {
    perspective: '1200px',
    width: cardWidth,
    height: cardHeight,
    fontFamily,
    cursor: flipTrigger === 'click' ? 'pointer' : 'default'
  };
  
  const cardInnerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    transition: `transform ${flipDuration} cubic-bezier(0.4, 0, 0.2, 1)`
  };
  
  const faceBaseStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: cornerRadius,
    overflow: 'hidden',
    boxShadow: isFlipped 
      ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
      : '0 8px 24px rgba(0, 0, 0, 0.12)',
    transition: `box-shadow ${flipDuration} ease-out`
  };
  
  const frontStyle = {
    ...faceBaseStyle,
    backgroundColor: frontBackground,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    textAlign: 'center'
  };
  
  const backStyle = {
    ...faceBaseStyle,
    backgroundColor: backBackground,
    transform: 'rotateY(180deg)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };
  
  const imageContainerStyle = {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginBottom: '24px',
    border: `4px solid ${frontBackground}`,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
  };
  
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };
  
  const frontTitleStyle = {
    fontSize: titleSize,
    fontWeight: '500',
    color: frontTextColor,
    marginBottom: '8px',
    letterSpacing: '-0.01em'
  };
  
  const frontSubtitleStyle = {
    fontSize: subtitleSize,
    fontWeight: '400',
    color: frontSubtitleColor,
    letterSpacing: '0.02em'
  };
  
  const backTitleStyle = {
    fontSize: titleSize,
    fontWeight: '500',
    color: backTextColor,
    marginBottom: '16px',
    letterSpacing: '-0.01em'
  };
  
  const backContentStyle = {
    fontSize: contentSize,
    lineHeight: '1.6',
    color: backTextColor,
    opacity: 0.9,
    marginBottom: '24px'
  };
  
  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
    padding: '20px 0',
    borderTop: `1px solid ${backAccentColor}40`,
    borderBottom: `1px solid ${backAccentColor}40`
  };
  
  const statStyle = {
    textAlign: 'center'
  };
  
  const statValueStyle = {
    fontSize: '24px',
    fontWeight: '300',
    color: backAccentColor,
    marginBottom: '4px'
  };
  
  const statLabelStyle = {
    fontSize: '12px',
    fontWeight: '400',
    color: backTextColor,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };
  
  const ctaButtonStyle = {
    width: '100%',
    padding: '14px 24px',
    backgroundColor: ctaBackground,
    color: ctaTextColor,
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 200ms ease-out',
    fontFamily,
    display: showCTA ? 'block' : 'none'
  };
  
  return (
    <div 
      className="flip-card-container"
      style={containerStyle}
      onMouseEnter={() => flipTrigger === 'hover' && setIsFlipped(true)}
      onMouseLeave={() => flipTrigger === 'hover' && setIsFlipped(false)}
      onClick={handleInteraction}
    >
      <div style={cardInnerStyle}>
        {/* Front Face */}
        <div style={frontStyle}>
          <div style={imageContainerStyle}>
            <img src={frontImageUrl} alt={frontTitle} style={imageStyle} />
          </div>
          <div style={frontTitleStyle}>{frontTitle}</div>
          <div style={frontSubtitleStyle}>{frontSubtitle}</div>
        </div>
        
        {/* Back Face */}
        <div style={backStyle}>
          <div>
            <div style={backTitleStyle}>{backTitle}</div>
            <div style={backContentStyle}>{backContent}</div>
            
            {backStats.length > 0 && (
              <div style={statsContainerStyle}>
                {backStats.map((stat, index) => (
                  <div key={index} style={statStyle}>
                    <div style={statValueStyle}>{stat.value}</div>
                    <div style={statLabelStyle}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            style={ctaButtonStyle}
            onMouseEnter={e => e.target.style.opacity = '0.9'}
            onMouseLeave={e => e.target.style.opacity = '1'}
            onClick={e => flipTrigger === 'click' && e.stopPropagation()}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
