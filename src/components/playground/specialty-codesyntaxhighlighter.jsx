import React from "react";

const MANIFEST = {
  "type": "Specialty.CodeSyntaxHighlighter",
  "description": "Code syntax highlighter with line numbers, copy button, and language support",
  "editorElement": {
    "selector": ".code-syntax-highlighter",
    "displayName": "Code Syntax Highlighter",
    "archetype": "container",
    "data": {
      "code": {
        "dataType": "text",
        "displayName": "Code Content",
        "defaultValue": "function greet(name) {\\n  const message = `Hello, ${name}!`;\\n  console.log(message);\\n  return message;\\n}\\n\\nconst user = 'World';\\ngreet(user);",
        "group": "Content"
      },
      "language": {
        "dataType": "select",
        "displayName": "Language",
        "defaultValue": "javascript",
        "options": ["javascript", "python", "html", "css", "json"],
        "group": "Content"
      },
      "theme": {
        "dataType": "select",
        "displayName": "Theme",
        "defaultValue": "dark",
        "options": ["light", "dark"],
        "group": "Content"
      },
      "showLineNumbers": {
        "dataType": "booleanValue",
        "displayName": "Show Line Numbers",
        "defaultValue": true,
        "group": "Content"
      },
      "showCopyButton": {
        "dataType": "booleanValue",
        "displayName": "Show Copy Button",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
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
  const code = (config?.code || 'function greet(name) {\n  const message = `Hello, ${name}!`;\n  console.log(message);\n  return message;\n}\n\nconst user = \'World\';\ngreet(user);').replace(/\\n/g, '\n');
  const language = config?.language || 'javascript';
  const theme = config?.theme || 'dark';
  const showLineNumbers = config?.showLineNumbers !== false;
  const showCopyButton = config?.showCopyButton !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const accentColor = config?.accentColor || '#495057';
  
  const [copied, setCopied] = React.useState(false);
  
  const themes = {
    dark: {
      bg: '#1E1E1E',
      text: '#D4D4D4',
      lineNumbers: '#858585',
      keyword: '#569CD6',
      string: '#CE9178',
      comment: '#6A9955',
      function: '#DCDCAA',
      number: '#B5CEA8',
      operator: '#D4D4D4'
    },
    light: {
      bg: '#F8F9FA',
      text: '#24292E',
      lineNumbers: '#6E7781',
      keyword: '#D73A49',
      string: '#032F62',
      comment: '#6A737D',
      function: '#6F42C1',
      number: '#005CC5',
      operator: '#24292E'
    }
  };
  
  const currentTheme = themes[theme];
  
  const highlightCode = (code, lang) => {
    let highlighted = code;
    
    const keywords = {
      javascript: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await'],
      python: ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'with', 'as', 'try', 'except'],
      html: ['<!DOCTYPE', 'html', 'head', 'body', 'div', 'span', 'a', 'img', 'script', 'style', 'link'],
      css: ['color', 'background', 'margin', 'padding', 'border', 'display', 'flex', 'grid', 'position', 'width', 'height'],
      json: ['true', 'false', 'null']
    };
    
    highlighted = highlighted.replace(/\/\/.*$/gm, (match) => `<span style="color: ${currentTheme.comment}; font-style: italic;">${match}</span>`);
    highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (match) => `<span style="color: ${currentTheme.comment}; font-style: italic;">${match}</span>`);
    highlighted = highlighted.replace(/#.*$/gm, (match) => `<span style="color: ${currentTheme.comment}; font-style: italic;">${match}</span>`);
    
    highlighted = highlighted.replace(/'([^']*)'/g, (match) => `<span style="color: ${currentTheme.string};">${match}</span>`);
    highlighted = highlighted.replace(/"([^"]*)"/g, (match) => `<span style="color: ${currentTheme.string};">${match}</span>`);
    highlighted = highlighted.replace(/`([^`]*)`/g, (match) => `<span style="color: ${currentTheme.string};">${match}</span>`);
    
    const langKeywords = keywords[lang] || keywords.javascript;
    langKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="color: ${currentTheme.keyword}; font-weight: 500;">$1</span>`);
    });
    
    highlighted = highlighted.replace(/\b(\d+)\b/g, `<span style="color: ${currentTheme.number};">$1</span>`);
    
    highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, (match, funcName) => 
      `<span style="color: ${currentTheme.function};">${funcName}</span>(`
    );
    
    return highlighted;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const lines = code.split('\n');
  
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
        width: '100%',
        maxWidth: '900px',
        backgroundColor: currentTheme.bg,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          backgroundColor: theme === 'dark' ? '#2D2D2D' : '#E8EAED',
          borderBottom: `1px solid ${theme === 'dark' ? '#404040' : '#D1D5DB'}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              gap: '6px'
            }}>
              {['#FF5F56', '#FFBD2E', '#27C93F'].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: color
                  }}
                />
              ))}
            </div>
            
            <span style={{
              fontSize: '13px',
              color: currentTheme.text,
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {language}
            </span>
          </div>
          
          {showCopyButton && (
            <button
              onClick={copyToClipboard}
              style={{
                padding: '6px 16px',
                backgroundColor: copied ? '#10B981' : (theme === 'dark' ? '#404040' : '#FFFFFF'),
                color: copied ? '#FFFFFF' : currentTheme.text,
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 200ms ease-out',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                if (!copied) {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? '#505050' : '#F3F4F6';
                }
              }}
              onMouseLeave={(e) => {
                if (!copied) {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? '#404040' : '#FFFFFF';
                }
              }}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          )}
        </div>
        
        <div style={{
          display: 'flex',
          maxHeight: '600px',
          overflow: 'auto'
        }}>
          {showLineNumbers && (
            <div style={{
              padding: '20px 16px',
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F0F0F0',
              borderRight: `1px solid ${theme === 'dark' ? '#404040' : '#D1D5DB'}`,
              textAlign: 'right',
              userSelect: 'none',
              minWidth: '50px'
            }}>
              {lines.map((_, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: '14px',
                    fontFamily: '"SF Mono", Monaco, monospace',
                    color: currentTheme.lineNumbers,
                    lineHeight: '1.6',
                    height: '22.4px'
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          )}
          
          <div style={{
            flex: 1,
            padding: '20px',
            overflow: 'auto'
          }}>
            <pre style={{
              margin: 0,
              fontSize: '14px',
              fontFamily: '"SF Mono", Monaco, monospace',
              color: currentTheme.text,
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {lines.map((line, index) => (
                <div
                  key={index}
                  style={{ minHeight: '22.4px' }}
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(line || ' ', language)
                  }}
                />
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
