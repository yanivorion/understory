import React from "react";

const MANIFEST = {
  "type": "Interactive.TagInput",
  "description": "Tag input field with pill-style tags, remove buttons, and keyboard navigation",
  "editorElement": {
    "selector": ".tag-input",
    "displayName": "Tag Input",
    "archetype": "container",
    "data": {
      "placeholder": {
        "dataType": "text",
        "displayName": "Placeholder Text",
        "defaultValue": "Add tags...",
        "group": "Content"
      },
      "defaultTags": {
        "dataType": "text",
        "displayName": "Default Tags (comma-separated)",
        "defaultValue": "React,JavaScript,TypeScript,CSS",
        "group": "Content"
      },
      "maxTags": {
        "dataType": "select",
        "displayName": "Max Tags",
        "defaultValue": "10",
        "options": ["5", "10", "15", "20", "unlimited"],
        "group": "Content"
      },
      "allowDuplicates": {
        "dataType": "booleanValue",
        "displayName": "Allow Duplicates",
        "defaultValue": false,
        "group": "Content"
      },
      "showCount": {
        "dataType": "booleanValue",
        "displayName": "Show Tag Count",
        "defaultValue": true,
        "group": "Content"
      },
      "inputWidth": {
        "dataType": "select",
        "displayName": "Input Width",
        "defaultValue": "500",
        "options": ["400", "500", "600", "700", "100%"],
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
      "tagColor": {
        "dataType": "color",
        "displayName": "Tag Background",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "tagTextColor": {
        "dataType": "color",
        "displayName": "Tag Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
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
  const placeholder = config?.placeholder || 'Add tags...';
  const defaultTags = (config?.defaultTags || 'React,JavaScript,TypeScript,CSS')
    .split(',')
    .map(t => t.trim())
    .filter(t => t);
  const maxTags = config?.maxTags === 'unlimited' ? Infinity : parseInt(config?.maxTags || '10');
  const allowDuplicates = config?.allowDuplicates === true;
  const showCount = config?.showCount !== false;
  const inputWidth = config?.inputWidth || '500';
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const tagColor = config?.tagColor || '#495057';
  const tagTextColor = config?.tagTextColor || '#FFFFFF';
  const accentColor = config?.accentColor || '#495057';
  
  const [tags, setTags] = React.useState(defaultTags);
  const [inputValue, setInputValue] = React.useState('');
  const [focusedTagIndex, setFocusedTagIndex] = React.useState(null);
  const [removingTag, setRemovingTag] = React.useState(null);
  
  const inputRef = React.useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    
    if (!allowDuplicates && tags.includes(trimmed)) {
      return;
    }
    
    if (tags.length >= maxTags) {
      return;
    }
    
    setTags([...tags, trimmed]);
    setInputValue('');
  };
  
  const removeTag = (index) => {
    if (!prefersReducedMotion) {
      setRemovingTag(index);
      setTimeout(() => {
        setTags(tags.filter((_, i) => i !== index));
        setRemovingTag(null);
      }, 300);
    } else {
      setTags(tags.filter((_, i) => i !== index));
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    } else if (e.key === 'ArrowLeft' && inputValue === '' && tags.length > 0) {
      setFocusedTagIndex(tags.length - 1);
    }
  };
  
  const handleTagKeyDown = (e, index) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      removeTag(index);
      setFocusedTagIndex(null);
      inputRef.current?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setFocusedTagIndex(index - 1);
    } else if (e.key === 'ArrowRight') {
      if (index < tags.length - 1) {
        setFocusedTagIndex(index + 1);
      } else {
        setFocusedTagIndex(null);
        inputRef.current?.focus();
      }
    }
  };
  
  React.useEffect(() => {
    if (focusedTagIndex !== null) {
      document.getElementById(`tag-${focusedTagIndex}`)?.focus();
    }
  }, [focusedTagIndex]);
  
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
      <div style={{
        width: inputWidth === '100%' ? '100%' : `${inputWidth}px`,
        maxWidth: '100%'
      }}>
        <div style={{
          padding: '16px',
          backgroundColor: `${accentColor}08`,
          border: `2px solid ${accentColor}20`,
          borderRadius: '8px',
          minHeight: '120px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'flex-start',
          transition: 'border-color 200ms ease-out'
        }}>
          {tags.map((tag, index) => (
            <div
              key={index}
              id={`tag-${index}`}
              tabIndex={0}
              onKeyDown={(e) => handleTagKeyDown(e, index)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: tagColor,
                color: tagTextColor,
                fontSize: '14px',
                fontWeight: '400',
                borderRadius: '6px',
                letterSpacing: '0.025em',
                opacity: prefersReducedMotion ? 1 : (removingTag === index ? 0 : 1),
                transform: prefersReducedMotion ? 'none' : (removingTag === index ? 'scale(0.8)' : 'scale(1)'),
                transition: 'all 300ms ease-out',
                outline: focusedTagIndex === index ? `2px solid ${accentColor}` : 'none',
                outlineOffset: '2px'
              }}
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(index)}
                aria-label={`Remove ${tag}`}
                style={{
                  background: 'none',
                  border: 'none',
                  color: tagTextColor,
                  cursor: 'pointer',
                  padding: '0',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  opacity: 0.7,
                  transition: 'opacity 200ms ease-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
              >
                ×
              </button>
            </div>
          ))}
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={tags.length >= maxTags}
            style={{
              flex: 1,
              minWidth: '120px',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '14px',
              color: textColor,
              padding: '6px 0',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          fontSize: '13px',
          color: accentColor
        }}>
          {showCount && (
            <span>
              {tags.length} {tags.length === 1 ? 'tag' : 'tags'}
              {maxTags !== Infinity && ` (max ${maxTags})`}
            </span>
          )}
          <span style={{ fontSize: '12px', fontStyle: 'italic' }}>
            Press Enter or comma to add
          </span>
        </div>
        
        {tags.length > 0 && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: `${accentColor}08`,
            borderRadius: '8px',
            border: `1px solid ${accentColor}20`
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              color: accentColor,
              marginBottom: '8px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Output
            </div>
            <div style={{
              fontSize: '14px',
              color: textColor,
              fontFamily: '"SF Mono", Monaco, monospace',
              wordBreak: 'break-all'
            }}>
              {JSON.stringify(tags)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
