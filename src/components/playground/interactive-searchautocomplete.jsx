import React from "react";

const MANIFEST = {
  "type": "Interactive.SearchAutocomplete",
  "description": "Search autocomplete with highlighted matching text, keyboard navigation, and smooth animations",
  "editorElement": {
    "selector": ".search-autocomplete",
    "displayName": "Search Autocomplete",
    "archetype": "container",
    "data": {
      "placeholder": {
        "dataType": "text",
        "displayName": "Placeholder Text",
        "defaultValue": "Search...",
        "group": "Content"
      },
      "suggestions": {
        "dataType": "text",
        "displayName": "Suggestions (comma-separated)",
        "defaultValue": "JavaScript,TypeScript,React,Vue,Angular,Svelte,Next.js,Node.js,Python,Java,C++,Ruby,Go,Rust,Swift",
        "group": "Content"
      },
      "maxResults": {
        "dataType": "select",
        "displayName": "Max Results",
        "defaultValue": "8",
        "options": ["5", "6", "8", "10", "12"],
        "group": "Content"
      },
      "showIcon": {
        "dataType": "booleanValue",
        "displayName": "Show Search Icon",
        "defaultValue": true,
        "group": "Content"
      },
      "inputWidth": {
        "dataType": "select",
        "displayName": "Input Width",
        "defaultValue": "500",
        "options": ["400", "500", "600", "700"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "highlightColor": {
        "dataType": "color",
        "displayName": "Highlight Color",
        "defaultValue": "#FFC107",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "hoverColor": {
        "dataType": "color",
        "displayName": "Hover Background",
        "defaultValue": "#F8F9FA",
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
  const placeholder = config?.placeholder || 'Search...';
  const suggestions = (config?.suggestions || 'JavaScript,TypeScript,React,Vue,Angular,Svelte,Next.js,Node.js,Python,Java,C++,Ruby,Go,Rust,Swift')
    .split(',')
    .map(s => s.trim());
  const maxResults = parseInt(config?.maxResults || '8');
  const showIcon = config?.showIcon !== false;
  const inputWidth = parseInt(config?.inputWidth || '500');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const borderColor = config?.borderColor || '#E4E4E7';
  const highlightColor = config?.highlightColor || '#FFC107';
  const accentColor = config?.accentColor || '#495057';
  const hoverColor = config?.hoverColor || '#F8F9FA';
  
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [isFocused, setIsFocused] = React.useState(false);
  
  const inputRef = React.useRef(null);
  const resultsRef = React.useRef([]);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const filteredResults = React.useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return suggestions
      .filter(s => s.toLowerCase().includes(lowerQuery))
      .slice(0, maxResults);
  }, [query, suggestions, maxResults]);
  
  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    
    const parts = [];
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    let lastIndex = 0;
    let index = lowerText.indexOf(lowerQuery);
    
    while (index !== -1) {
      if (index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, index), highlight: false });
      }
      parts.push({ text: text.slice(index, index + query.length), highlight: true });
      lastIndex = index + query.length;
      index = lowerText.indexOf(lowerQuery, lastIndex);
    }
    
    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), highlight: false });
    }
    
    return parts;
  };
  
  const handleKeyDown = (e) => {
    if (!isOpen || filteredResults.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectResult(filteredResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };
  
  const selectResult = (result) => {
    setQuery(result);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };
  
  React.useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);
  
  React.useEffect(() => {
    setIsOpen(query.trim().length > 0 && filteredResults.length > 0);
    setSelectedIndex(-1);
  }, [query, filteredResults.length]);
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ width: `${inputWidth}px`, maxWidth: '100%', position: 'relative' }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          {showIcon && (
            <div style={{
              position: 'absolute',
              left: '16px',
              fontSize: '18px',
              color: accentColor,
              pointerEvents: 'none',
              opacity: 0.6
            }}>
              🔍
            </div>
          )}
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setTimeout(() => {
                setIsFocused(false);
                setIsOpen(false);
              }, 200);
            }}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: showIcon ? '14px 16px 14px 48px' : '14px 16px',
              fontSize: '16px',
              border: `2px solid ${isFocused ? accentColor : borderColor}`,
              borderRadius: '8px',
              outline: 'none',
              backgroundColor: backgroundColor,
              color: textColor,
              transition: 'border-color 200ms ease-out',
              fontFamily: 'inherit'
            }}
          />
          
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              style={{
                position: 'absolute',
                right: '12px',
                background: 'none',
                border: 'none',
                color: accentColor,
                cursor: 'pointer',
                fontSize: '20px',
                padding: '4px',
                opacity: 0.6,
                transition: 'opacity 200ms ease-out'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            >
              ×
            </button>
          )}
        </div>
        
        {isOpen && filteredResults.length > 0 && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            backgroundColor: backgroundColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxHeight: '320px',
            overflowY: 'auto',
            zIndex: 100,
            opacity: prefersReducedMotion ? 1 : (isOpen ? 1 : 0),
            transform: prefersReducedMotion ? 'none' : (isOpen ? 'translateY(0)' : 'translateY(-10px)'),
            transition: 'opacity 200ms ease-out, transform 200ms ease-out'
          }}>
            {filteredResults.map((result, index) => {
              const parts = highlightMatch(result, query);
              const isSelected = index === selectedIndex;
              
              return (
                <div
                  key={index}
                  ref={el => resultsRef.current[index] = el}
                  onClick={() => selectResult(result)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? hoverColor : 'transparent',
                    borderLeft: isSelected ? `3px solid ${accentColor}` : '3px solid transparent',
                    transition: 'all 150ms ease-out',
                    fontSize: '15px',
                    color: textColor
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {parts.map((part, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: part.highlight ? `${highlightColor}40` : 'transparent',
                        fontWeight: part.highlight ? '500' : '400',
                        padding: part.highlight ? '2px 0' : '0'
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        )}
        
        {query && filteredResults.length === 0 && isOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            backgroundColor: backgroundColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            textAlign: 'center',
            color: accentColor,
            fontSize: '14px',
            zIndex: 100
          }}>
            No results found for "{query}"
          </div>
        )}
        
        <div style={{
          marginTop: '16px',
          fontSize: '13px',
          color: accentColor,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>
            {filteredResults.length > 0 && `${filteredResults.length} result${filteredResults.length === 1 ? '' : 's'}`}
          </span>
          <span style={{ fontSize: '12px', fontStyle: 'italic' }}>
            Use ↑↓ to navigate, Enter to select
          </span>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
