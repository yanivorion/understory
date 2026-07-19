import React from "react";

const MANIFEST = {
  "type": "Card.TestimonialCard",
  "description": "Modern testimonial card with customer photo, quote, and smooth scroll-triggered animation",
  "editorElement": {
    "selector": ".testimonial-card-container",
    "displayName": "Testimonial Card",
    "archetype": "container",
    "data": {
      "quote": {
        "dataType": "text",
        "displayName": "Testimonial Quote",
        "defaultValue": "This product completely transformed how our team collaborates. The interface is intuitive and the results speak for themselves.",
        "group": "Content"
      },
      "customerName": {
        "dataType": "text",
        "displayName": "Customer Name",
        "defaultValue": "Sarah Chen",
        "group": "Content"
      },
      "customerTitle": {
        "dataType": "text",
        "displayName": "Customer Title",
        "defaultValue": "Head of Product",
        "group": "Content"
      },
      "companyName": {
        "dataType": "text",
        "displayName": "Company Name",
        "defaultValue": "TechCorp Inc.",
        "group": "Content"
      },
      "photoUrl": {
        "dataType": "text",
        "displayName": "Customer Photo URL",
        "defaultValue": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        "group": "Content"
      },
      "showPhoto": {
        "dataType": "booleanValue",
        "displayName": "Show Customer Photo",
        "defaultValue": true,
        "group": "Content"
      },
      "gradientStart": {
        "dataType": "color",
        "displayName": "Gradient Start Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "gradientEnd": {
        "dataType": "color",
        "displayName": "Gradient End Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(100, 116, 139, 0.12)",
        "group": "Colors"
      },
      "quoteColor": {
        "dataType": "color",
        "displayName": "Quote Text Color",
        "defaultValue": "#1E293B",
        "group": "Colors"
      },
      "nameColor": {
        "dataType": "color",
        "displayName": "Name Color",
        "defaultValue": "#1E293B",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#64748B",
        "group": "Colors"
      },
      "companyColor": {
        "dataType": "color",
        "displayName": "Company Color",
        "defaultValue": "#64748B",
        "group": "Colors"
      },
      "quoteMarkColor": {
        "dataType": "color",
        "displayName": "Quote Mark Color",
        "defaultValue": "#94A3B8",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui, -apple-system, sans-serif",
        "options": [
          "system-ui, -apple-system, sans-serif",
          "Inter, sans-serif",
          "Georgia, serif",
          "'SF Pro Display', sans-serif"
        ],
        "group": "Typography"
      },
      "quoteSize": {
        "dataType": "select",
        "displayName": "Quote Text Size",
        "defaultValue": "18px",
        "options": ["16px", "17px", "18px", "19px", "20px"],
        "group": "Typography"
      },
      "nameSize": {
        "dataType": "select",
        "displayName": "Name Size",
        "defaultValue": "16px",
        "options": ["14px", "15px", "16px", "17px", "18px"],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "select",
        "displayName": "Title/Company Size",
        "defaultValue": "14px",
        "options": ["12px", "13px", "14px", "15px"],
        "group": "Typography"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "40px",
        "options": ["32px", "36px", "40px", "48px"],
        "group": "Layout"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "12px",
        "options": ["6px", "8px", "10px", "12px", "16px"],
        "group": "Layout"
      },
      "maxWidth": {
        "dataType": "select",
        "displayName": "Max Width",
        "defaultValue": "600px",
        "options": ["500px", "550px", "600px", "650px", "700px"],
        "group": "Layout"
      },
      "photoSize": {
        "dataType": "select",
        "displayName": "Photo Size",
        "defaultValue": "64px",
        "options": ["56px", "60px", "64px", "72px", "80px"],
        "group": "Layout"
      },
      "enableAnimation": {
        "dataType": "booleanValue",
        "displayName": "Enable Scroll Animation",
        "defaultValue": true,
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration",
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
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef(null);
  
  // Safe config access with defaults
  const quote = config?.quote || "This product completely transformed how our team collaborates. The interface is intuitive and the results speak for themselves.";
  const customerName = config?.customerName || "Sarah Chen";
  const customerTitle = config?.customerTitle || "Head of Product";
  const companyName = config?.companyName || "TechCorp Inc.";
  const photoUrl = config?.photoUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";
  const showPhoto = config?.showPhoto !== false;
  
  const gradientStart = config?.gradientStart || "#FFFFFF";
  const gradientEnd = config?.gradientEnd || "#F8F9FA";
  const borderColor = config?.borderColor || "rgba(100, 116, 139, 0.12)";
  const quoteColor = config?.quoteColor || "#1E293B";
  const nameColor = config?.nameColor || "#1E293B";
  const titleColor = config?.titleColor || "#64748B";
  const companyColor = config?.companyColor || "#64748B";
  const quoteMarkColor = config?.quoteMarkColor || "#94A3B8";
  
  const fontFamily = config?.fontFamily || "system-ui, -apple-system, sans-serif";
  const quoteSize = config?.quoteSize || "18px";
  const nameSize = config?.nameSize || "16px";
  const titleSize = config?.titleSize || "14px";
  
  const cardPadding = config?.cardPadding || "40px";
  const cornerRadius = config?.cornerRadius || "12px";
  const maxWidth = config?.maxWidth || "600px";
  const photoSize = config?.photoSize || "64px";
  
  const enableAnimation = config?.enableAnimation !== false;
  const animationDuration = config?.animationDuration || "600ms";
  
  // Intersection Observer for scroll animation
  React.useEffect(() => {
    if (!enableAnimation || !cardRef.current) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    observer.observe(cardRef.current);
    
    return () => observer.disconnect();
  }, [enableAnimation]);
  
  const containerStyle = {
    display: 'inline-block',
    fontFamily,
    maxWidth,
    width: '100%'
  };
  
  const cardStyle = {
    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
    border: `1px solid ${borderColor}`,
    borderRadius: cornerRadius,
    padding: cardPadding,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `all ${animationDuration} cubic-bezier(0.4, 0, 0.2, 1)`
  };
  
  const quoteMarkStyle = {
    fontSize: '48px',
    color: quoteMarkColor,
    lineHeight: '1',
    marginBottom: '20px',
    opacity: 0.4,
    fontFamily: 'Georgia, serif'
  };
  
  const quoteTextStyle = {
    fontSize: quoteSize,
    lineHeight: '1.7',
    color: quoteColor,
    marginBottom: '32px',
    fontWeight: '400'
  };
  
  const footerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };
  
  const photoContainerStyle = {
    width: photoSize,
    height: photoSize,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: '#E5E7EB',
    display: showPhoto ? 'block' : 'none'
  };
  
  const photoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };
  
  const infoStyle = {
    flex: 1
  };
  
  const nameStyle = {
    fontSize: nameSize,
    fontWeight: '500',
    color: nameColor,
    marginBottom: '4px'
  };
  
  const metaStyle = {
    fontSize: titleSize,
    color: titleColor,
    fontWeight: '400'
  };
  
  const companyStyle = {
    color: companyColor,
    fontWeight: '400'
  };
  
  return (
    <div 
      ref={cardRef}
      className="testimonial-card-container"
      style={containerStyle}
    >
      <div style={cardStyle}>
        <div style={quoteMarkStyle}>"</div>
        <div style={quoteTextStyle}>{quote}</div>
        <div style={footerStyle}>
          <div style={photoContainerStyle}>
            <img 
              src={photoUrl} 
              alt={customerName}
              style={photoStyle}
            />
          </div>
          <div style={infoStyle}>
            <div style={nameStyle}>{customerName}</div>
            <div style={metaStyle}>
              {customerTitle} · <span style={companyStyle}>{companyName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
