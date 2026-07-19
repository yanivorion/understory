import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Jul 19, 2026, 07:27 PM
 * Component Type: Content.Accordion
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Content.Accordion",
  "description": "Elegant accordion component with smooth height animations, multiple open modes, and icon transitions",
  "editorElement": {
    "selector": ".accordion",
    "displayName": "Accordion",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Heading",
        "defaultValue": "FREQUENTLY ASKED QUESTIONS",
        "group": "Content"
      },
      "items": {
        "dataType": "text",
        "displayName": "Question/Answer Pairs (Q:|A:|Q:|A:...)",
        "defaultValue": "Q:What makes your service unique?|A:Our service combines cutting-edge technology with personalized attention, ensuring you receive solutions tailored to your specific needs. We pride ourselves on exceptional customer support and continuous innovation.|||Q:How long does implementation take?|A:Implementation typically takes 2-4 weeks depending on your requirements. Our dedicated team works closely with you throughout the process to ensure a smooth transition and proper training for your staff.|||Q:What kind of support do you provide?|A:We offer 24/7 technical support, comprehensive documentation, video tutorials, and regular training sessions. Our support team is always ready to assist you with any questions or challenges you may encounter.|||Q:Can I customize the solution?|A:Absolutely! Our platform is highly customizable to match your brand and workflow requirements. We work with you to configure features, integrations, and interfaces that align perfectly with your business processes.|||Q:What are the pricing options?|A:We offer flexible pricing plans to accommodate businesses of all sizes. From startups to enterprise clients, we have packages that scale with your growth. Contact us for a personalized quote based on your specific needs.",
        "group": "Content",
        "description": "Format: Q:question|A:answer|||Q:question|A:answer"
      },
      "allowMultipleOpen": {
        "dataType": "booleanValue",
        "displayName": "Allow Multiple Open",
        "defaultValue": false,
        "group": "Content",
        "description": "Allow multiple items to be open simultaneously"
      },
      "defaultOpenIndex": {
        "dataType": "select",
        "displayName": "Default Open Item",
        "defaultValue": "0",
        "options": ["none", "0", "1", "2", "3", "4"],
        "group": "Content"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
        "group": "Animation"
      },
      "iconStyle": {
        "dataType": "select",
        "displayName": "Icon Style",
        "defaultValue": "chevron",
        "options": ["chevron", "plus", "arrow"],
        "group": "Animation"
      },
      "maxWidth": {
        "dataType": "select",
        "displayName": "Container Max Width",
        "defaultValue": "800px",
        "options": ["700px", "800px", "900px", "1000px"],
        "group": "Layout"
      },
      "itemGap": {
        "dataType": "select",
        "displayName": "Item Gap",
        "defaultValue": "1rem",
        "options": ["0.5rem", "0.75rem", "1rem", "1.5rem"],
        "group": "Layout"
      },
      "headingFontSize": {
        "dataType": "number",
        "displayName": "Heading Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "questionFontSize": {
        "dataType": "number",
        "displayName": "Question Font Size (px)",
        "defaultValue": 17,
        "group": "Typography"
      },
      "answerFontSize": {
        "dataType": "number",
        "displayName": "Answer Font Size (px)",
        "defaultValue": 15,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Question Font Weight",
        "defaultValue": "500",
        "options": ["400", "500"],
        "group": "Typography"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "headingColor": {
        "dataType": "color",
        "displayName": "Heading Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "itemBackground": {
        "dataType": "color",
        "displayName": "Item Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "itemBorder": {
        "dataType": "color",
        "displayName": "Item Border",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "questionColor": {
        "dataType": "color",
        "displayName": "Question Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "answerColor": {
        "dataType": "color",
        "displayName": "Answer Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "iconColor": {
        "dataType": "color",
        "displayName": "Icon Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "activeIconColor": {
        "dataType": "color",
        "displayName": "Active Icon Color",
        "defaultValue": "#212529",
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
  const heading = config?.heading || "FREQUENTLY ASKED QUESTIONS";
  const itemsText = config?.items || "Q:What makes your service unique?|A:Our service combines cutting-edge technology with personalized attention, ensuring you receive solutions tailored to your specific needs. We pride ourselves on exceptional customer support and continuous innovation.|||Q:How long does implementation take?|A:Implementation typically takes 2-4 weeks depending on your requirements. Our dedicated team works closely with you throughout the process to ensure a smooth transition and proper training for your staff.|||Q:What kind of support do you provide?|A:We offer 24/7 technical support, comprehensive documentation, video tutorials, and regular training sessions. Our support team is always ready to assist you with any questions or challenges you may encounter.|||Q:Can I customize the solution?|A:Absolutely! Our platform is highly customizable to match your brand and workflow requirements. We work with you to configure features, integrations, and interfaces that align perfectly with your business processes.|||Q:What are the pricing options?|A:We offer flexible pricing plans to accommodate businesses of all sizes. From startups to enterprise clients, we have packages that scale with your growth. Contact us for a personalized quote based on your specific needs.";
  const allowMultipleOpen = config?.allowMultipleOpen !== false;
  const defaultOpenIndex = config?.defaultOpenIndex === "none" ? -1 : parseInt(config?.defaultOpenIndex || "0");
  const animationDuration = parseInt(config?.animationDuration || "400");
  const iconStyle = config?.iconStyle || "chevron";
  const maxWidth = config?.maxWidth || "800px";
  const itemGap = config?.itemGap || "1rem";
  const headingFontSize = parseInt(config?.headingFontSize || "14");
  const questionFontSize = parseInt(config?.questionFontSize || "17");
  const answerFontSize = parseInt(config?.answerFontSize || "15");
  const fontWeight = config?.fontWeight || "500";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const headingColor = config?.headingColor || "#6C757D";
  const itemBackground = config?.itemBackground || "#F8F9FA";
  const itemBorder = config?.itemBorder || "#E9ECEF";
  const questionColor = config?.questionColor || "#212529";
  const answerColor = config?.answerColor || "#495057";
  const iconColor = config?.iconColor || "#6C757D";
  const activeIconColor = config?.activeIconColor || "#212529";

  const items = itemsText.split('|||').map(pair => {
    const [question, answer] = pair.split('|A:');
    return {
      question: question.replace('Q:', '').trim(),
      answer: answer ? answer.trim() : ''
    };
  });

  const [openIndices, setOpenIndices] = React.useState(
    new Set(defaultOpenIndex >= 0 ? [defaultOpenIndex] : [])
  );
  const contentRefs = React.useRef([]);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const toggleItem = (index) => {
    setOpenIndices(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultipleOpen) {
          newSet.clear();
        }
        newSet.add(index);
      }
      
      return newSet;
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(index);
    }
  };

  const getIcon = (isOpen) => {
    const rotation = isOpen ? 180 : 0;
    const transform = `rotate(${rotation}deg)`;

    switch (iconStyle) {
      case 'chevron':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{
            transform: prefersReducedMotion ? 'none' : transform,
            transition: prefersReducedMotion ? 'none' : `transform ${animationDuration}ms ease-out`
          }}>
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'plus':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{
              transform: prefersReducedMotion ? 'none' : (isOpen ? 'rotate(90deg)' : 'rotate(0deg)'),
              transformOrigin: 'center',
              transition: prefersReducedMotion ? 'none' : `transform ${animationDuration}ms ease-out`
            }}/>
            <path d="M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{
              opacity: isOpen ? 0 : 1,
              transition: prefersReducedMotion ? 'none' : `opacity ${animationDuration}ms ease-out`
            }}/>
          </svg>
        );
      case 'arrow':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{
            transform: prefersReducedMotion ? 'none' : (isOpen ? 'rotate(180deg)' : 'rotate(90deg)'),
            transition: prefersReducedMotion ? 'none' : `transform ${animationDuration}ms ease-out`
          }}>
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="accordion" style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor,
      padding: '4rem 1.5rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth,
        margin: '0 auto'
      }}>
        {/* Heading */}
        <div style={{
          fontSize: `${headingFontSize}px`,
          fontWeight: '400',
          letterSpacing: '0.1em',
          color: headingColor,
          textTransform: 'uppercase',
          marginBottom: '2.5rem',
          textAlign: 'center'
        }}>
          {heading}
        </div>

        {/* Accordion Items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: itemGap
        }}>
          {items.map((item, index) => {
            const isOpen = openIndices.has(index);

            return (
              <div
                key={index}
                style={{
                  backgroundColor: itemBackground,
                  border: `1px solid ${itemBorder}`,
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleItem(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${index}`}
                  id={`accordion-button-${index}`}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    transition: 'background-color 200ms ease-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{
                    fontSize: `${questionFontSize}px`,
                    fontWeight,
                    color: questionColor,
                    lineHeight: 1.4,
                    flex: 1
                  }}>
                    {item.question}
                  </span>
                  <span style={{
                    color: isOpen ? activeIconColor : iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'color 200ms ease-out'
                  }}>
                    {getIcon(isOpen)}
                  </span>
                </button>

                {/* Answer Content */}
                <div
                  id={`accordion-content-${index}`}
                  role="region"
                  aria-labelledby={`accordion-button-${index}`}
                  ref={el => contentRefs.current[index] = el}
                  style={{
                    maxHeight: isOpen ? (contentRefs.current[index]?.scrollHeight || 'none') : '0',
                    overflow: 'hidden',
                    transition: prefersReducedMotion ? 'none' : `max-height ${animationDuration}ms ease-out`,
                    willChange: 'max-height'
                  }}
                >
                  <div style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    borderTop: `1px solid ${itemBorder}`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                    transition: prefersReducedMotion 
                      ? 'none' 
                      : `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`
                  }}>
                    <p style={{
                      fontSize: `${answerFontSize}px`,
                      fontWeight: '400',
                      color: answerColor,
                      lineHeight: 1.7,
                      margin: '1rem 0 0 0'
                    }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .accordion * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
