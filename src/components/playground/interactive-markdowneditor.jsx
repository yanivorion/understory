import React from "react";

const MANIFEST = {
  "type": "Interactive.MarkdownEditor",
  "description": "Markdown editor with live preview, toolbar buttons, and syntax highlighting",
  "editorElement": {
    "selector": ".markdown-editor",
    "displayName": "Markdown Editor",
    "archetype": "container",
    "data": {
      "defaultContent": {
        "dataType": "text",
        "displayName": "Default Content",
        "defaultValue": "# Welcome to Markdown Editor\\n\\nStart typing to see the **live preview**.\\n\\n## Features\\n\\n- Bold and *italic* text\\n- Lists and links\\n- Code blocks\\n- Tables\\n\\n```javascript\\nconst hello = 'world';\\n```",
        "group": "Content"
      },
      "layout": {
        "dataType": "select",
        "displayName": "Layout",
        "defaultValue": "split",
        "options": ["split", "editor-only", "preview-only"],
        "group": "Layout"
      },
      "showToolbar": {
        "dataType": "booleanValue",
        "displayName": "Show Toolbar",
        "defaultValue": true,
        "group": "Content"
      },
      "showLineNumbers": {
        "dataType": "booleanValue",
        "displayName": "Show Line Numbers",
        "defaultValue": true,
        "group": "Content"
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
      "editorBg": {
        "dataType": "color",
        "displayName": "Editor Background",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "previewBg": {
        "dataType": "color",
        "displayName": "Preview Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "codeColor": {
        "dataType": "color",
        "displayName": "Code Color",
        "defaultValue": "#E91E63",
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
  const defaultContent = (config?.defaultContent || '# Welcome to Markdown Editor\n\nStart typing to see the **live preview**.\n\n## Features\n\n- Bold and *italic* text\n- Lists and links\n- Code blocks\n- Tables\n\n```javascript\nconst hello = \'world\';\n```').replace(/\\n/g, '\n');
  const layout = config?.layout || 'split';
  const showToolbar = config?.showToolbar !== false;
  const showLineNumbers = config?.showLineNumbers !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const editorBg = config?.editorBg || '#FAFAFA';
  const previewBg = config?.previewBg || '#FFFFFF';
  const accentColor = config?.accentColor || '#495057';
  const codeColor = config?.codeColor || '#E91E63';
  
  const [content, setContent] = React.useState(defaultContent);
  const [activeTab, setActiveTab] = React.useState('editor');
  
  const textareaRef = React.useRef(null);
  
  const insertMarkdown = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };
  
  const toolbarButtons = [
    { icon: '𝐁', label: 'Bold', action: () => insertMarkdown('**', '**') },
    { icon: '𝐼', label: 'Italic', action: () => insertMarkdown('*', '*') },
    { icon: 'H1', label: 'Heading', action: () => insertMarkdown('# ') },
    { icon: '—', label: 'Strikethrough', action: () => insertMarkdown('~~', '~~') },
    { icon: '• ', label: 'List', action: () => insertMarkdown('- ') },
    { icon: '1.', label: 'Numbered List', action: () => insertMarkdown('1. ') },
    { icon: '""', label: 'Quote', action: () => insertMarkdown('> ') },
    { icon: '<>', label: 'Code', action: () => insertMarkdown('`', '`') },
    { icon: '{}', label: 'Code Block', action: () => insertMarkdown('```\n', '\n```') },
    { icon: '🔗', label: 'Link', action: () => insertMarkdown('[', '](url)') },
  ];
  
  const parseMarkdown = (md) => {
    let html = md;
    
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre style="background-color: ${accentColor}10; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0;"><code style="color: ${codeColor}; font-family: 'SF Mono', Monaco, monospace; font-size: 14px;">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    });
    
    html = html.replace(/`([^`]+)`/g, `<code style="background-color: ${accentColor}15; color: ${codeColor}; padding: 2px 6px; border-radius: 4px; font-family: 'SF Mono', Monaco, monospace; font-size: 13px;">$1</code>`);
    
    html = html.replace(/^### (.*$)/gim, '<h3 style="font-size: 20px; font-weight: 500; margin: 24px 0 12px 0; color: ' + textColor + ';">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-size: 24px; font-weight: 500; margin: 28px 0 14px 0; color: ' + textColor + ';">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 style="font-size: 32px; font-weight: 500; margin: 32px 0 16px 0; color: ' + textColor + ';">$1</h1>');
    
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 500;">$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/~~(.+?)~~/g, '<del style="opacity: 0.7;">$1</del>');
    
    html = html.replace(/^\> (.*$)/gim, '<blockquote style="border-left: 4px solid ' + accentColor + '; padding-left: 16px; margin: 16px 0; color: ' + accentColor + '; font-style: italic;">$1</blockquote>');
    
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: ' + accentColor + '; text-decoration: underline;">$1</a>');
    
    html = html.replace(/^\- (.+)$/gim, '<li style="margin: 4px 0;">$1</li>');
    html = html.replace(/^\d+\. (.+)$/gim, '<li style="margin: 4px 0;">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul style="padding-left: 24px; margin: 12px 0;">$1</ul>');
    
    html = html.replace(/\n\n/g, '</p><p style="margin: 12px 0; line-height: 1.6;">');
    html = '<p style="margin: 12px 0; line-height: 1.6;">' + html + '</p>';
    
    html = html.replace(/\n/g, '<br>');
    
    return html;
  };
  
  const lineCount = content.split('\n').length;
  const wordCount = content.trim().split(/\s+/).filter(w => w).length;
  const charCount = content.length;
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: `${accentColor}08`,
        borderRadius: '12px',
        border: `1px solid ${accentColor}20`,
        overflow: 'hidden'
      }}>
        {showToolbar && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: `${accentColor}10`,
            borderBottom: `1px solid ${accentColor}20`,
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {toolbarButtons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.action}
                title={btn.label}
                style={{
                  padding: '8px 12px',
                  backgroundColor: backgroundColor,
                  border: `1px solid ${accentColor}30`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: textColor,
                  transition: 'all 200ms ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${accentColor}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = backgroundColor;
                }}
              >
                {btn.icon}
              </button>
            ))}
            
            <div style={{
              marginLeft: 'auto',
              fontSize: '13px',
              color: accentColor,
              display: 'flex',
              gap: '16px'
            }}>
              <span>{wordCount} words</span>
              <span>{charCount} chars</span>
              <span>{lineCount} lines</span>
            </div>
          </div>
        )}
        
        {layout === 'split' && (
          <>
            <div style={{
              display: 'flex',
              borderBottom: `1px solid ${accentColor}20`,
              backgroundColor: `${accentColor}10`
            }}>
              {['editor', 'preview'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: activeTab === tab ? backgroundColor : 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab ? `3px solid ${accentColor}` : '3px solid transparent',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: activeTab === tab ? textColor : accentColor,
                    cursor: 'pointer',
                    transition: 'all 200ms ease-out',
                    textTransform: 'capitalize'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </>
        )}
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: layout === 'split' ? '1fr 1fr' : '1fr',
          minHeight: '500px'
        }}>
          {(layout === 'editor-only' || layout === 'split') && (
            <div style={{
              display: activeTab === 'editor' || layout === 'editor-only' ? 'flex' : layout === 'split' ? 'flex' : 'none',
              backgroundColor: editorBg,
              borderRight: layout === 'split' ? `1px solid ${accentColor}20` : 'none'
            }}>
              {showLineNumbers && (
                <div style={{
                  padding: '20px 12px',
                  backgroundColor: `${accentColor}10`,
                  fontSize: '14px',
                  fontFamily: '"SF Mono", Monaco, monospace',
                  color: accentColor,
                  textAlign: 'right',
                  lineHeight: '1.6',
                  userSelect: 'none',
                  minWidth: '50px'
                }}>
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
              )}
              
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  flex: 1,
                  padding: '20px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '15px',
                  fontFamily: '"SF Mono", Monaco, monospace',
                  lineHeight: '1.6',
                  resize: 'none'
                }}
                placeholder="Start typing markdown..."
              />
            </div>
          )}
          
          {(layout === 'preview-only' || layout === 'split') && (
            <div
              style={{
                display: activeTab === 'preview' || layout === 'preview-only' ? 'block' : layout === 'split' ? 'block' : 'none',
                padding: '20px',
                backgroundColor: previewBg,
                overflowY: 'auto',
                fontSize: '15px',
                color: textColor,
                lineHeight: '1.6'
              }}
              dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
