import React from "react";

const MANIFEST = {
  "type": "Interactive.FAQAccordion",
  "description": "Expandable FAQ accordion with smooth height animation and rotating icons",
  "editorElement": {
    "selector": ".faq-accordion",
    "displayName": "FAQ Accordion",
    "archetype": "container",
    "data": {
      "items": {
        "dataType": "text",
        "displayName": "FAQ Items (format: question|answer, semicolon-separated)",
        "defaultValue": "What is your return policy?|We offer a 30-day return policy on all items.; How long does shipping take?|Standard shipping takes 5-7 business days.; Do you ship internationally?|Yes, we ship to over 50 countries worldwide.",
        "group": "Content"
      },
      "allowMultiple": {
        "dataType": "booleanValue",
        "displayName": "Allow Multiple Open",
        "defaultValue": false,
        "group": "Content"
      },
      "defaultOpen": {
        "dataType": "select",
        "displayName": "Default Open Index",
        "defaultValue": "none",
        "options": ["none", "0", "1", "2"],
        "group": "Content"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "300",
        "options": ["200", "300", "400", "500"],
        "group": "Animation"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Gap Between Items",
        "defaultValue": "12",
        "options": ["8", "12", "16", "20"],
        "group": "Layout"
      },
      "padding": {
        "dataType": "select",
        "displayName": "Item Padding",
        "defaultValue": "20",
        "options": ["16", "20", "24"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "8",
        "options": ["0", "6", "8", "12"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "itemBackgroundColor": {
        "dataType": "color",
        "displayName": "Item Background",
        "defaultValue": "#F4F4F5",
        "group": "Colors"
      },
      "itemActiveBackgroundColor": {
        "dataType": "color",
        "displayName": "Active Item Background",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "questionColor": {
        "dataType": "color",
        "displayName": "Question Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "answerColor": {
        "dataType": "color",
        "displayName": "Answer Color",
        "defaultValue": "#71717A",
        "group": "Colors"
      },
      "iconColor": {
        "dataType": "color",
        "displayName": "Icon Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["400", "500"],
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [openItems, setOpenItems] = React.useState(new Set());
  const contentRefs = React.useRef([]);

  // Config values
  const itemsString = config?.items || "What is your return policy?|We offer a 30-day return policy on all items.; How long does shipping take?|Standard shipping takes 5-7 business days.; Do you ship internationally?|Yes, we ship to over 50 countries worldwide.";
  const allowMultiple = config?.allowMultiple || false;
  const defaultOpen = config?.defaultOpen || "none";
  const animationDuration = parseInt(config?.animationDuration || "300");
  const gap = parseInt(config?.gap || "12");
  const padding = parseInt(config?.padding || "20");
  const borderRadius = parseInt(config?.borderRadius || "8");
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const itemBackgroundColor = config?.itemBackgroundColor || "#F4F4F5";
  const itemActiveBackgroundColor = config?.itemActiveBackgroundColor || "#FAFAFA";
  const questionColor = config?.questionColor || "#18181B";
  const answerColor = config?.answerColor || "#71717A";
  const iconColor = config?.iconColor || "#18181B";
  const borderColor = config?.borderColor || "#E4E4E7";
  const fontSize = config?.fontSize || 16;
  const fontWeight = config?.fontWeight || "500";

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Parse FAQ items
  const items = React.useMemo(() => {
    return itemsString.split(';').map(item => {
      const [question, answer] = item.trim().split('|');
      return { question: question?.trim() || '', answer: answer?.trim() || '' };
    }).filter(item => item.question && item.answer);
  }, [itemsString]);

  // Initialize default open
  React.useEffect(() => {
    if (defaultOpen !== "none") {
      const index = parseInt(defaultOpen);
      if (index >= 0 && index < items.length) {
        setOpenItems(new Set([index]));
      }
    }
  }, [defaultOpen, items.length]);

  const toggleItem = (index) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: backgroundColor,
    padding: '24px'
  };

  const itemsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: `${gap}px`
  };

  const itemStyle = (isOpen) => ({
    backgroundColor: isOpen ? itemActiveBackgroundColor : itemBackgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    overflow: 'hidden',
    transition: prefersReducedMotion ? 'none' : `background-color ${animationDuration}ms ease`
  });

  const buttonStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    padding: `${padding}px`,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    outline: 'none'
  };

  const questionStyle = {
    flex: 1,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    color: questionColor,
    lineHeight: '1.5'
  };

  const iconWrapperStyle = (isOpen) => ({
    flexShrink: 0,
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: prefersReducedMotion ? 'none' : (isOpen ? 'rotate(45deg)' : 'rotate(0deg)'),
    transition: prefersReducedMotion ? 'none' : `transform ${animationDuration}ms ease`,
    color: iconColor
  });

  const contentWrapperStyle = (index, isOpen) => {
    const content = contentRefs.current[index];
    const height = content ? content.scrollHeight : 0;

    return {
      maxHeight: isOpen ? `${height}px` : '0px',
      overflow: 'hidden',
      transition: prefersReducedMotion ? 'none' : `max-height ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
    };
  };

  const answerStyle = {
    padding: `0 ${padding}px ${padding}px ${padding}px`,
    fontSize: `${fontSize * 0.9}px`,
    fontWeight: '400',
    color: answerColor,
    lineHeight: '1.6'
  };

  return (
    <div className="faq-accordion" style={containerStyle}>
      <div style={itemsContainerStyle}>
        {items.map((item, index) => {
          const isOpen = openItems.has(index);
          
          return (
            <div key={index} style={itemStyle(isOpen)}>
              <button
                style={buttonStyle}
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <div style={questionStyle}>{item.question}</div>
                <div style={iconWrapperStyle(isOpen)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>
              
              <div style={contentWrapperStyle(index, isOpen)}>
                <div 
                  ref={el => contentRefs.current[index] = el}
                  id={`faq-answer-${index}`}
                  style={answerStyle}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
