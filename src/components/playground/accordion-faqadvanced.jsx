import React from "react";

const MANIFEST = {
  "type": "Accordion.FAQAdvanced",
  "description": "Advanced accordion FAQ component with smooth height animations, search filtering, expand/collapse all, and sophisticated icon transitions",
  "editorElement": {
    "selector": ".faq-accordion-container",
    "displayName": "Advanced FAQ Accordion",
    "archetype": "container",
    "data": {
      "question1": {
        "dataType": "text",
        "displayName": "Question 1",
        "defaultValue": "What makes your product unique?",
        "group": "Content"
      },
      "answer1": {
        "dataType": "text",
        "displayName": "Answer 1",
        "defaultValue": "Our product combines cutting-edge technology with intuitive design, offering a seamless experience that adapts to your workflow. We prioritize performance, security, and user satisfaction in every feature we build.",
        "group": "Content"
      },
      "question2": {
        "dataType": "text",
        "displayName": "Question 2",
        "defaultValue": "How does the pricing model work?",
        "group": "Content"
      },
      "answer2": {
        "dataType": "text",
        "displayName": "Answer 2",
        "defaultValue": "We offer flexible pricing tiers designed to scale with your needs. Start with our free plan to explore core features, then upgrade to unlock advanced capabilities as your requirements grow. Volume discounts are available for enterprise customers.",
        "group": "Content"
      },
      "question3": {
        "dataType": "text",
        "displayName": "Question 3",
        "defaultValue": "What kind of support do you provide?",
        "group": "Content"
      },
      "answer3": {
        "dataType": "text",
        "displayName": "Answer 3",
        "defaultValue": "All customers receive email support with response times within 24 hours. Premium and enterprise plans include priority support, dedicated account management, and access to our technical team for implementation assistance.",
        "group": "Content"
      },
      "question4": {
        "dataType": "text",
        "displayName": "Question 4",
        "defaultValue": "Can I integrate with existing tools?",
        "group": "Content"
      },
      "answer4": {
        "dataType": "text",
        "displayName": "Answer 4",
        "defaultValue": "Yes, we offer extensive integration capabilities through our API and pre-built connectors for popular platforms. Our documentation includes detailed guides for common integrations, and our support team can assist with custom implementations.",
        "group": "Content"
      },
      "question5": {
        "dataType": "text",
        "displayName": "Question 5",
        "defaultValue": "How secure is my data?",
        "group": "Content"
      },
      "answer5": {
        "dataType": "text",
        "displayName": "Answer 5",
        "defaultValue": "Security is our top priority. We employ enterprise-grade encryption, regular security audits, and compliance with industry standards including SOC 2 and GDPR. Your data is stored in secure, redundant data centers with automatic backups.",
        "group": "Content"
      },
      "showSearch": {
        "dataType": "booleanValue",
        "displayName": "Show Search",
        "defaultValue": true,
        "group": "Content"
      },
      "showExpandAll": {
        "dataType": "booleanValue",
        "displayName": "Show Expand/Collapse All",
        "defaultValue": true,
        "group": "Content"
      },
      "allowMultiple": {
        "dataType": "booleanValue",
        "displayName": "Allow Multiple Open",
        "defaultValue": false,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
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
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "hoverColor": {
        "dataType": "color",
        "displayName": "Hover Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue"],
        "group": "Typography"
      },
      "questionSize": {
        "dataType": "number",
        "displayName": "Question Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "answerSize": {
        "dataType": "number",
        "displayName": "Answer Size (px)",
        "defaultValue": 14,
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
  const [searchTerm, setSearchTerm] = React.useState('');
  const contentRefs = React.useRef([]);

  const faqItems = [
    { question: config?.question1 || "What makes your product unique?", answer: config?.answer1 || "Our product combines cutting-edge technology..." },
    { question: config?.question2 || "How does the pricing model work?", answer: config?.answer2 || "We offer flexible pricing tiers..." },
    { question: config?.question3 || "What kind of support do you provide?", answer: config?.answer3 || "All customers receive email support..." },
    { question: config?.question4 || "Can I integrate with existing tools?", answer: config?.answer4 || "Yes, we offer extensive integration capabilities..." },
    { question: config?.question5 || "How secure is my data?", answer: config?.answer5 || "Security is our top priority..." }
  ];

  const showSearch = config?.showSearch !== false;
  const showExpandAll = config?.showExpandAll !== false;
  const allowMultiple = config?.allowMultiple === true;
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FFFFFF";
  const borderColor = config?.borderColor || "#E9ECEF";
  const questionColor = config?.questionColor || "#212529";
  const answerColor = config?.answerColor || "#495057";
  const iconColor = config?.iconColor || "#495057";
  const hoverColor = config?.hoverColor || "#F8F9FA";
  const fontFamily = config?.fontFamily || "system-ui";
  const questionSize = config?.questionSize || 16;
  const answerSize = config?.answerSize || 14;

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const filteredItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const expandAll = () => {
    setOpenItems(new Set(filteredItems.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  return (
    <div 
      className="faq-accordion-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '700px'
      }}
    >
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <h2 style={{
          margin: '0 0 32px 0',
          fontSize: '32px',
          fontWeight: '500',
          color: questionColor,
          textAlign: 'center'
        }}>
          Frequently Asked Questions
        </h2>

        {/* Controls */}
        {(showSearch || showExpandAll) && (
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            {showSearch && (
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '6px',
                  fontFamily,
                  outline: 'none',
                  transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out'
                }}
                onFocus={(e) => e.target.style.borderColor = iconColor}
                onBlur={(e) => e.target.style.borderColor = borderColor}
              />
            )}
            
            {showExpandAll && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={expandAll}
                  style={{
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '6px',
                    backgroundColor: cardBackgroundColor,
                    color: questionColor,
                    cursor: 'pointer',
                    transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                    fontFamily
                  }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.backgroundColor = hoverColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = cardBackgroundColor;
                  }}
                >
                  Expand All
                </button>
                
                <button
                  onClick={collapseAll}
                  style={{
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '6px',
                    backgroundColor: cardBackgroundColor,
                    color: questionColor,
                    cursor: 'pointer',
                    transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                    fontFamily
                  }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.backgroundColor = hoverColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = cardBackgroundColor;
                  }}
                >
                  Collapse All
                </button>
              </div>
            )}
          </div>
        )}

        {/* Accordion Items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {filteredItems.map((item, index) => {
            const isOpen = openItems.has(index);
            
            return (
              <div
                key={index}
                style={{
                  backgroundColor: cardBackgroundColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  animation: prefersReducedMotion ? 'none' : `itemAppear 400ms ease-out ${index * 50}ms forwards`
                }}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '20px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out',
                    fontFamily
                  }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.backgroundColor = hoverColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{
                    fontSize: `${questionSize}px`,
                    fontWeight: '500',
                    color: questionColor,
                    lineHeight: '1.5'
                  }}>
                    {item.question}
                  </span>
                  
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: prefersReducedMotion ? 'none' : 'transform 300ms ease-out'
                    }}
                  >
                    <path
                      d="M5 7.5l5 5 5-5"
                      stroke={iconColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Answer Content */}
                <div
                  ref={el => contentRefs.current[index] = el}
                  style={{
                    maxHeight: isOpen ? (contentRefs.current[index]?.scrollHeight + 'px') : '0px',
                    opacity: prefersReducedMotion ? (isOpen ? 1 : 0) : undefined,
                    overflow: 'hidden',
                    transition: prefersReducedMotion ? 'opacity 200ms ease-out' : 'max-height 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease-out'
                  }}
                >
                  <div style={{
                    padding: '0 20px 20px 20px',
                    fontSize: `${answerSize}px`,
                    color: answerColor,
                    lineHeight: '1.7'
                  }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: answerColor
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
              No questions found
            </div>
            <div style={{ fontSize: '14px' }}>
              Try adjusting your search term
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes itemAppear {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export { MANIFEST, Component };
export default Component;
