import React from "react";

const MANIFEST = {
  "type": "Content.FAQAccordion",
  "description": "Elegant FAQ accordion with smooth height animations and search filter",
  "editorElement": {
    "selector": ".faq-accordion",
    "displayName": "FAQ Accordion",
    "archetype": "container",
    "data": {
      "faqs": {
        "dataType": "text",
        "displayName": "FAQs (format: question|answer, separated by ||)",
        "defaultValue": "What is your refund policy?|We offer a 30-day money-back guarantee. If you're not satisfied, contact our support team for a full refund.||How do I get started?|Simply sign up for an account, choose your plan, and follow our quick-start guide. You'll be up and running in minutes.||Do you offer customer support?|Yes! Our support team is available 24/7 via email, chat, and phone. We typically respond within 2 hours.||Can I upgrade or downgrade my plan?|Absolutely. You can change your plan anytime from your account settings. Changes take effect immediately.||Is my data secure?|Security is our top priority. We use bank-level encryption and comply with all major security standards including SOC 2 and GDPR.||Do you offer discounts for nonprofits?|Yes, we offer special pricing for qualified nonprofit organizations. Contact our sales team for details.",
        "group": "Content"
      },
      "showSearch": {
        "dataType": "booleanValue",
        "displayName": "Show Search Filter",
        "defaultValue": true,
        "group": "Content"
      },
      "searchPlaceholder": {
        "dataType": "text",
        "displayName": "Search Placeholder",
        "defaultValue": "Search FAQs...",
        "group": "Content"
      },
      "allowMultipleOpen": {
        "dataType": "booleanValue",
        "displayName": "Allow Multiple Open",
        "defaultValue": false,
        "group": "Content",
        "description": "Allow multiple accordion items to be open simultaneously"
      },
      "questionSize": {
        "dataType": "number",
        "displayName": "Question Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "answerSize": {
        "dataType": "number",
        "displayName": "Answer Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Question Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "itemBackground": {
        "dataType": "color",
        "displayName": "Item Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "questionColor": {
        "dataType": "color",
        "displayName": "Question Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "answerColor": {
        "dataType": "color",
        "displayName": "Answer Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "iconColor": {
        "dataType": "color",
        "displayName": "Icon Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "searchBorderColor": {
        "dataType": "color",
        "displayName": "Search Border Color",
        "defaultValue": "#CED4DA",
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
  const faqsStr = config?.faqs || "What is your refund policy?|We offer a 30-day money-back guarantee.||How do I get started?|Simply sign up for an account.";
  const showSearch = config?.showSearch !== false;
  const searchPlaceholder = config?.searchPlaceholder || "Search FAQs...";
  const allowMultipleOpen = config?.allowMultipleOpen === true;
  const questionSize = parseInt(config?.questionSize || "18");
  const answerSize = parseInt(config?.answerSize || "16");
  const fontWeight = config?.fontWeight || "500";
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const itemBackground = config?.itemBackground || "#F8F9FA";
  const questionColor = config?.questionColor || "#212529";
  const answerColor = config?.answerColor || "#495057";
  const borderColor = config?.borderColor || "#E9ECEF";
  const iconColor = config?.iconColor || "#6C757D";
  const searchBorderColor = config?.searchBorderColor || "#CED4DA";

  const [openIndices, setOpenIndices] = React.useState(new Set());
  const [searchQuery, setSearchQuery] = React.useState("");

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Parse FAQs
  const faqs = faqsStr.split('||').map(item => {
    const [question, answer] = item.split('|').map(s => s.trim());
    return { question, answer };
  });

  // Filter FAQs
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="faq-accordion" style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor,
      padding: '4rem 2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 2.5rem + 1vw, 3rem)',
            fontWeight: '500',
            color: questionColor,
            margin: '0 0 1rem 0',
            letterSpacing: '-0.02em'
          }}>
            Frequently Asked Questions
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: answerColor,
            margin: '0',
            fontWeight: '300'
          }}>
            Find answers to common questions about our service
          </p>
        </div>

        {/* Search */}
        {showSearch && (
          <div style={{
            marginBottom: '2rem'
          }}>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                fontSize: `${answerSize}px`,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: questionColor,
                backgroundColor: itemBackground,
                border: `1px solid ${searchBorderColor}`,
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 200ms ease-out'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = iconColor;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = searchBorderColor;
              }}
            />
          </div>
        )}

        {/* FAQ Items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndices.has(index);
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: itemBackground,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    opacity: prefersReducedMotion ? 1 : 0,
                    animation: prefersReducedMotion ? 'none' : `fadeSlideIn 400ms ease-out ${index * 50}ms forwards`
                  }}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
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
                      fontSize: `${questionSize}px`,
                      fontWeight,
                      color: questionColor,
                      letterSpacing: '0.01em',
                      lineHeight: 1.4
                    }}>
                      {faq.question}
                    </span>
                    <span style={{
                      fontSize: '1.5rem',
                      color: iconColor,
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      transition: prefersReducedMotion ? 'none' : 'transform 200ms ease-out'
                    }}>
                      +
                    </span>
                  </button>

                  {/* Answer Content */}
                  <div style={{
                    maxHeight: isOpen ? '1000px' : '0',
                    overflow: 'hidden',
                    transition: prefersReducedMotion ? 'none' : 'max-height 400ms ease-out'
                  }}>
                    <div style={{
                      padding: '0 1.5rem 1.5rem 1.5rem',
                      fontSize: `${answerSize}px`,
                      fontWeight: '400',
                      color: answerColor,
                      lineHeight: 1.6,
                      letterSpacing: '0.01em',
                      opacity: prefersReducedMotion || isOpen ? 1 : 0,
                      transform: prefersReducedMotion || isOpen ? 'translateY(0)' : 'translateY(-10px)',
                      transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out 100ms'
                    }}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              color: answerColor,
              fontSize: `${answerSize}px`
            }}>
              No FAQs found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
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