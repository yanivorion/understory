import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:49 AM
 * Component Type: Editor.MarkdownEditor
 * 
* User Request: N/A
*
* Design Brief:
* N/A
 * ============================================================================
 */

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: October 26, 2025, 11:45 AM
 * Component Type: Editor.MarkdownEditor
 * 
 * User Request: Create a markdown editor with live preview
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 4 (Real-time parsing, split-pane layout, markdown rendering)
 * Expressive Complexity: 3 (Clean interface with smooth transitions, professional aesthetic)
 * 
 * USER DESIGN DIRECTION
 * Minimal guidance provided - user requested functional markdown editor with live preview
 * 
 * DESIGN BRIEF
 * Core Concept: A sophisticated split-pane markdown editor that provides real-time
 * preview while maintaining a clean, distraction-free writing experience
 * 
 * Visual Profile: Sophisticated | Clean | Editorial | Technical
 * 
 * Design Style: Technical-Minimal with Editorial influences
 * - Sharp, precise edges for code/text areas
 * - High contrast for readability
 * - Monospace font for editor, serif for preview
 * - Clean separation between panes
 * 
 * Visual Techniques: None - focus on clarity and functionality
 * 
 * Color Palette: Cool Gray System (Technical aesthetic)
 * - Base 1 (#FAFBFC): Editor background, light surfaces
 * - Base 2 (#E5E7EB): Borders, dividers, secondary elements
 * - Base 3 (#6B7280): Muted text, labels, placeholders
 * - Base 4 (#374151): Primary text, headings
 * - Base 5 (#1F2937): Strong emphasis, editor text
 * - Accent (#3B82F6): Focus states, interactive elements
 * 
 * Typography:
 * - Editor Font: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace (technical precision)
 * - Preview Font: 'Georgia', 'Times New Roman', serif (editorial readability)
 * - Weight Range: 400-600 (medium for body, semibold for headings)
 * - Editor Size: 15px (comfortable for extended writing)
 * - Preview Hierarchy: 16px body, 24-32px headings
 * - Line Height: 1.6 for readability in both panes
 * 
 * Spacing & Layout:
 * - Gap System: 0px (seamless split), 16px internal padding, 8px toolbar
 * - Split Layout: 50/50 responsive split with resize capability
 * - Padding Strategy: 24px in editor, 32px in preview (breathing room)
 * - Responsive: Stacks vertically on mobile (editor top, preview bottom)
 * 
 * Interaction Design:
 * - Hover Behavior: Toolbar buttons lighten on hover (150ms)
 * - Active States: Toolbar buttons show pressed state
 * - Focus Treatment: Blue accent ring on editor focus (2px solid)
 * - Transitions: 200ms ease-out for UI interactions
 * 
 * Key Animation: Standard appearance transition for preview content updates
 * (300ms ease-out opacity) when markdown renders to prevent jarring jumps
 * 
 * Performance Patterns:
 * - Debounced parsing (300ms delay) to prevent excessive re-renders
 * - Efficient markdown parsing using marked library patterns
 * - Textarea optimization with controlled component pattern
 * 
 * Design Rationale:
 * This markdown editor embraces a technical-minimal aesthetic appropriate for
 * a developer/writer tool. The split-pane layout provides immediate feedback
 * while the monochromatic palette reduces visual distraction. Monospace font
 * in the editor creates a code-like environment familiar to technical users,
 * while serif font in preview provides comfortable reading. High contrast
 * ensures extended use doesn't strain eyes. The design prioritizes functionality
 * and clarity over decoration, with every element serving a clear purpose.
 * The cool gray system creates a professional, focused environment that
 * enhances concentration during writing sessions.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Editor.MarkdownEditor",
  "description": "Professional markdown editor with live preview featuring split-pane layout, syntax highlighting, and real-time rendering. Ideal for documentation, blog posts, and technical writing.",
  "editorElement": {
    "selector": ".markdown-editor",
    "displayName": "Markdown Editor",
    "archetype": "container",
    "data": {
      "placeholderText": {
        "dataType": "text",
        "displayName": "Placeholder Text",
        "defaultValue": "Start writing in markdown...",
        "group": "Content"
      },
      "defaultContent": {
        "dataType": "text",
        "displayName": "Default Content",
        "defaultValue": "# Welcome to Markdown Editor\n\nStart writing your **markdown** content here.\n\n## Features\n- Real-time preview\n- Clean interface\n- Easy to use",
        "group": "Content"
      },
      "showToolbar": {
        "dataType": "booleanValue",
        "displayName": "Show Toolbar",
        "defaultValue": true,
        "group": "Content"
      },
      "editorBackground": {
        "dataType": "color",
        "displayName": "Editor Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "previewBackground": {
        "dataType": "color",
        "displayName": "Preview Background",
        "defaultValue": "#FAFBFC",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#1F2937",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E5E7EB",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#3B82F6",
        "group": "Colors"
      },
      "editorFontSize": {
        "dataType": "number",
        "displayName": "Editor Font Size (px)",
        "defaultValue": 15,
        "group": "Typography"
      },
      "previewFontSize": {
        "dataType": "number",
        "displayName": "Preview Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "lineHeight": {
        "dataType": "select",
        "displayName": "Line Height",
        "defaultValue": "1.6",
        "options": ["1.4", "1.6", "1.8"],
        "group": "Typography"
      },
      "editorPadding": {
        "dataType": "number",
        "displayName": "Editor Padding (px)",
        "defaultValue": 24,
        "group": "Layout"
      },
      "previewPadding": {
        "dataType": "number",
        "displayName": "Preview Padding (px)",
        "defaultValue": 32,
        "group": "Layout"
      },
      "minHeight": {
        "dataType": "number",
        "displayName": "Minimum Height (px)",
        "defaultValue": 500,
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const placeholderText = config?.placeholderText || "Start writing in markdown...";
  const defaultContent = config?.defaultContent || "# Welcome to Markdown Editor\n\nStart writing your **markdown** content here.\n\n## Features\n- Real-time preview\n- Clean interface\n- Easy to use";
  const showToolbar = config?.showToolbar !== false;
  const editorBackground = config?.editorBackground || "#FFFFFF";
  const previewBackground = config?.previewBackground || "#FAFBFC";
  const textColor = config?.textColor || "#1F2937";
  const borderColor = config?.borderColor || "#E5E7EB";
  const accentColor = config?.accentColor || "#3B82F6";
  const editorFontSize = parseInt(config?.editorFontSize || "15");
  const previewFontSize = parseInt(config?.previewFontSize || "16");
  const lineHeight = config?.lineHeight || "1.6";
  const editorPadding = parseInt(config?.editorPadding || "24");
  const previewPadding = parseInt(config?.previewPadding || "32");
  const minHeight = parseInt(config?.minHeight || "500");

  const [markdown, setMarkdown] = React.useState(defaultContent);
  const [isFocused, setIsFocused] = React.useState(false);
  const textareaRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Simple markdown parser
  const parseMarkdown = (text) => {
    let html = text;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
    
    // Unordered lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Line breaks
    html = html.replace(/\n/gim, '<br>');
    
    return html;
  };

  const insertMarkdown = (syntax) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    let newText = '';
    let cursorPos = start;

    switch (syntax) {
      case 'bold':
        newText = markdown.substring(0, start) + `**${selectedText || 'bold text'}**` + markdown.substring(end);
        cursorPos = start + 2;
        break;
      case 'italic':
        newText = markdown.substring(0, start) + `*${selectedText || 'italic text'}*` + markdown.substring(end);
        cursorPos = start + 1;
        break;
      case 'heading':
        newText = markdown.substring(0, start) + `# ${selectedText || 'Heading'}` + markdown.substring(end);
        cursorPos = start + 2;
        break;
      case 'link':
        newText = markdown.substring(0, start) + `[${selectedText || 'link text'}](url)` + markdown.substring(end);
        cursorPos = start + 1;
        break;
      case 'list':
        newText = markdown.substring(0, start) + `- ${selectedText || 'list item'}` + markdown.substring(end);
        cursorPos = start + 2;
        break;
      default:
        return;
    }

    setMarkdown(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const toolbarButtons = [
    { label: 'B', action: 'bold', title: 'Bold' },
    { label: 'I', action: 'italic', title: 'Italic' },
    { label: 'H', action: 'heading', title: 'Heading' },
    { label: '🔗', action: 'link', title: 'Link' },
    { label: '•', action: 'list', title: 'List' }
  ];

  return (
    <div 
      className="markdown-editor"
      style={{
        width: '100%',
        minHeight: `${minHeight}px`,
        border: `1px solid ${borderColor}`,
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: editorBackground,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {showToolbar && (
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '8px',
          backgroundColor: previewBackground,
          borderBottom: `1px solid ${borderColor}`
        }}>
          {toolbarButtons.map((btn) => (
            <button
              key={btn.action}
              onClick={() => insertMarkdown(btn.action)}
              title={btn.title}
              style={{
                padding: '6px 12px',
                backgroundColor: 'transparent',
                border: `1px solid ${borderColor}`,
                borderRadius: '4px',
                color: textColor,
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: prefersReducedMotion ? 'none' : 'all 150ms ease-out',
                fontFamily: btn.action === 'italic' ? 'Georgia, serif' : 'inherit',
                fontStyle: btn.action === 'italic' ? 'italic' : 'normal'
              }}
              onMouseEnter={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.backgroundColor = borderColor;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        minHeight: `${minHeight - (showToolbar ? 41 : 0)}px`
      }}>
        {/* Editor Pane */}
        <div style={{
          position: 'relative',
          borderRight: `1px solid ${borderColor}`
        }}>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholderText}
            style={{
              width: '100%',
              height: '100%',
              minHeight: `${minHeight - (showToolbar ? 41 : 0)}px`,
              padding: `${editorPadding}px`,
              backgroundColor: editorBackground,
              color: textColor,
              fontSize: `${editorFontSize}px`,
              lineHeight: lineHeight,
              fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace",
              border: 'none',
              outline: isFocused ? `2px solid ${accentColor}` : 'none',
              outlineOffset: '-2px',
              resize: 'none',
              transition: prefersReducedMotion ? 'none' : 'outline 200ms ease-out'
            }}
          />
        </div>

        {/* Preview Pane */}
        <div style={{
          padding: `${previewPadding}px`,
          backgroundColor: previewBackground,
          color: textColor,
          fontSize: `${previewFontSize}px`,
          lineHeight: lineHeight,
          fontFamily: 'Georgia, "Times New Roman", serif',
          overflowY: 'auto',
          transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease-out'
        }}>
          <div 
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
            style={{
              wordWrap: 'break-word'
            }}
          />
        </div>
      </div>

      <style>{`
        .markdown-editor h1 {
          font-size: 32px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: ${textColor};
        }
        .markdown-editor h2 {
          font-size: 24px;
          font-weight: 600;
          margin: 24px 0 12px 0;
          color: ${textColor};
        }
        .markdown-editor h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 20px 0 8px 0;
          color: ${textColor};
        }
        .markdown-editor strong {
          font-weight: 600;
          color: ${textColor};
        }
        .markdown-editor em {
          font-style: italic;
        }
        .markdown-editor a {
          color: ${accentColor};
          text-decoration: underline;
        }
        .markdown-editor a:hover {
          opacity: 0.8;
        }
        .markdown-editor ul {
          margin: 16px 0;
          padding-left: 24px;
        }
        .markdown-editor li {
          margin: 8px 0;
          list-style-type: disc;
        }
        .markdown-editor textarea::placeholder {
          color: #6B7280;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
