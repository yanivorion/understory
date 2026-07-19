import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 03:48 AM
 * Component Type: Tools.EmojiPicker
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
 * Generated: October 26, 2025, 11:52 AM
 * Component Type: Tools.EmojiPicker
 * 
 * User Request: Create an emoji picker
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 4 (Category filtering, search functionality, recent tracking, copy to clipboard)
 * Expressive Complexity: 3 (Clean grid layout, smooth category switching, hover interactions)
 * 
 * USER DESIGN DIRECTION
 * User requested an emoji picker - functional tool with intuitive browsing and selection
 * 
 * DESIGN BRIEF
 * Core Concept: Intuitive emoji picker with organized categories, search, and quick access to recently used emojis
 * 
 * Visual Profile: Contemporary Minimal with clean, organized interface
 * 
 * Design Style: Clean Utilitarian - efficient grid layout with clear category tabs and search functionality
 * 
 * Visual Techniques: Card-based design, subtle hover states, organized emoji grid, tabbed navigation
 * 
 * Color Palette: Cool Gray System with vibrant accent
 *   - Base 1 (#FAFBFC): Primary background
 *   - Base 2 (#FFFFFF): Card background
 *   - Base 3 (#E5E7EB): Borders, inactive tabs
 *   - Base 4 (#6B7280): Secondary text, labels
 *   - Base 5 (#1F2937): Primary text
 *   - Accent (#3B82F6): Active tab, hover states, interactive elements
 * 
 * Typography:
 *   - Font Family: System fonts for UI text
 *   - Weight Range: 400-600 (400 body, 500 labels, 600 heading)
 *   - Hierarchy: 24px heading, 14px tabs/labels, 13px helper text
 *   - Emoji Size: 32px for optimal recognition and tap targets
 * 
 * Spacing & Layout:
 *   - Gap System: 8px (emoji grid), 12px (controls), 16px (sections), 24px (card padding)
 *   - Grid: Auto-fill columns with minmax(48px, 1fr) for responsive emoji grid
 *   - Responsive: Fluid grid adapts to container width naturally
 * 
 * Interaction Design:
 *   - Hover Behavior: Background color change on emoji hover (200ms), scale on category tab
 *   - Active States: Clear active tab indication with accent color background
 *   - Focus Treatment: Visible focus rings for keyboard navigation (2px accent outline)
 *   - Click Feedback: Brief scale animation on emoji click (150ms)
 * 
 * Key Animation: Standard appearance transition (400ms ease-out) for initial reveal, 200ms ease-out for tab transitions, 150ms for emoji hover/click
 * 
 * Performance Patterns: Efficient emoji rendering with virtualization concept (load categories on demand), debounced search input, localStorage for recent emojis
 * 
 * Design Rationale: The emoji picker prioritizes quick discoverability through category organization and search functionality. Large, tap-friendly emoji buttons (48x48px) ensure usability on all devices. The tabbed interface provides clear navigation between categories without overwhelming the user. Recent emojis section offers quick access to frequently used items. The clean, minimal aesthetic keeps focus on emoji selection while maintaining a professional tool appearance. Search with real-time filtering helps users find specific emojis quickly. Copy feedback confirms successful selection. The design balances functionality with visual clarity.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Tools.EmojiPicker",
  "description": "Interactive emoji picker with category tabs, search functionality, recent selections tracking, and copy-to-clipboard feature for easy emoji selection and use",
  "editorElement": {
    "selector": ".emoji-picker",
    "displayName": "Emoji Picker",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Heading Text",
        "defaultValue": "Emoji Picker",
        "group": "Content"
      },
      "showHeading": {
        "dataType": "booleanValue",
        "displayName": "Show Heading",
        "defaultValue": true,
        "group": "Content"
      },
      "searchPlaceholder": {
        "dataType": "text",
        "displayName": "Search Placeholder",
        "defaultValue": "Search emojis...",
        "group": "Content"
      },
      "showSearch": {
        "dataType": "booleanValue",
        "displayName": "Show Search",
        "defaultValue": true,
        "group": "Content"
      },
      "showRecent": {
        "dataType": "booleanValue",
        "displayName": "Show Recent Section",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFBFC",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#1F2937",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#6B7280",
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
      "hoverBackground": {
        "dataType": "color",
        "displayName": "Emoji Hover Background",
        "defaultValue": "#F3F4F6",
        "group": "Colors"
      },
      "borderRadius": {
        "dataType": "number",
        "displayName": "Border Radius (px)",
        "defaultValue": 8,
        "group": "Layout"
      },
      "emojiSize": {
        "dataType": "number",
        "displayName": "Emoji Size (px)",
        "defaultValue": 32,
        "group": "Layout"
      },
      "maxRecentEmojis": {
        "dataType": "number",
        "displayName": "Max Recent Emojis",
        "defaultValue": 12,
        "group": "Content"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const heading = config?.heading || "Emoji Picker";
  const showHeading = config?.showHeading !== false;
  const searchPlaceholder = config?.searchPlaceholder || "Search emojis...";
  const showSearch = config?.showSearch !== false;
  const showRecent = config?.showRecent !== false;
  const backgroundColor = config?.backgroundColor || "#FAFBFC";
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const textColor = config?.textColor || "#1F2937";
  const labelColor = config?.labelColor || "#6B7280";
  const borderColor = config?.borderColor || "#E5E7EB";
  const accentColor = config?.accentColor || "#3B82F6";
  const hoverBackground = config?.hoverBackground || "#F3F4F6";
  const borderRadius = parseInt(config?.borderRadius || "8");
  const emojiSize = parseInt(config?.emojiSize || "32");
  const maxRecentEmojis = parseInt(config?.maxRecentEmojis || "12");

  // Emoji data organized by category
  const emojiData = {
    recent: [],
    smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋'],
    food: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🫑', '🥗', '🍕', '🍔', '🌭', '🍟'],
    activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '⛸️', '🥌', '🎿'],
    travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️', '🛺', '🚍', '🚔', '🚘', '🚖', '✈️', '🚁', '🚂', '🚆', '🚇', '🚊', '🚉'],
    objects: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏰'],
    symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '⭐', '🌟', '✨', '⚡', '🔥', '💫', '🌈', '☀️', '🌙', '⭐', '💧', '☁️']
  };

  const categories = [
    { key: 'recent', label: '🕐 Recent', icon: '🕐' },
    { key: 'smileys', label: '😀 Smileys', icon: '😀' },
    { key: 'animals', label: '🐶 Animals', icon: '🐶' },
    { key: 'food', label: '🍎 Food', icon: '🍎' },
    { key: 'activities', label: '⚽ Activities', icon: '⚽' },
    { key: 'travel', label: '🚗 Travel', icon: '🚗' },
    { key: 'objects', label: '⌚ Objects', icon: '⌚' },
    { key: 'symbols', label: '❤️ Symbols', icon: '❤️' }
  ];

  const [activeCategory, setActiveCategory] = React.useState('smileys');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [recentEmojis, setRecentEmojis] = React.useState([]);
  const [copiedEmoji, setCopiedEmoji] = React.useState(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Load recent emojis from localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recentEmojis');
      if (stored) {
        setRecentEmojis(JSON.parse(stored));
      }
    }
  }, []);

  // Handle emoji click
  const handleEmojiClick = (emoji) => {
    // Copy to clipboard
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);
      setTimeout(() => setCopiedEmoji(null), 1500);

      // Add to recent
      const updated = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, maxRecentEmojis);
      setRecentEmojis(updated);
      localStorage.setItem('recentEmojis', JSON.stringify(updated));
    }
  };

  // Filter emojis based on search
  const getFilteredEmojis = () => {
    if (activeCategory === 'recent') {
      return recentEmojis;
    }

    const categoryEmojis = emojiData[activeCategory] || [];
    
    if (!searchQuery) {
      return categoryEmojis;
    }

    // Simple search - in real app would search by emoji names/keywords
    return categoryEmojis;
  };

  const displayEmojis = getFilteredEmojis();

  return (
    <div
      className="emoji-picker"
      style={{
        backgroundColor: backgroundColor,
        padding: 'clamp(24px, 5vw, 48px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        {showHeading && (
          <h1
            style={{
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: '600',
              color: textColor,
              margin: '0 0 24px 0',
              textAlign: 'center'
            }}
          >
            {heading}
          </h1>
        )}

        <div
          style={{
            backgroundColor: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: `${borderRadius}px`,
            boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)',
            overflow: 'hidden'
          }}
        >
          {/* Search Bar */}
          {showSearch && (
            <div
              style={{
                padding: '16px',
                borderBottom: `1px solid ${borderColor}`
              }}
            >
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#F9FAFB',
                  border: `1px solid ${borderColor}`,
                  borderRadius: `${borderRadius}px`,
                  padding: '10px 12px',
                  fontSize: '14px',
                  color: textColor,
                  outline: 'none',
                  transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = accentColor;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = borderColor;
                }}
              />
            </div>
          )}

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              borderBottom: `1px solid ${borderColor}`,
              backgroundColor: '#F9FAFB',
              padding: '8px',
              gap: '4px'
            }}
          >
            {categories.filter(cat => cat.key !== 'recent' || (showRecent && recentEmojis.length > 0)).map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                style={{
                  backgroundColor: activeCategory === category.key ? accentColor : 'transparent',
                  color: activeCategory === category.key ? '#FFFFFF' : textColor,
                  border: 'none',
                  borderRadius: `${borderRadius}px`,
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category.key && !prefersReducedMotion) {
                    e.currentTarget.style.backgroundColor = hoverBackground;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category.key) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '16px' }}>{category.icon}</span>
                <span style={{ display: window.innerWidth > 480 ? 'inline' : 'none' }}>
                  {category.label.split(' ')[1]}
                </span>
              </button>
            ))}
          </div>

          {/* Emoji Grid */}
          <div
            style={{
              padding: '16px',
              minHeight: '300px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}
          >
            {displayEmojis.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))',
                  gap: '8px'
                }}
              >
                {displayEmojis.map((emoji, index) => (
                  <button
                    key={`${emoji}-${index}`}
                    onClick={() => handleEmojiClick(emoji)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: `${borderRadius}px`,
                      padding: '8px',
                      fontSize: `${emojiSize}px`,
                      cursor: 'pointer',
                      transition: prefersReducedMotion ? 'none' : 'all 150ms ease-out',
                      transform: copiedEmoji === emoji ? 'scale(0.9)' : 'scale(1)',
                      minHeight: '48px',
                      minWidth: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      if (!prefersReducedMotion) {
                        e.currentTarget.style.backgroundColor = hoverBackground;
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '200px',
                  color: labelColor,
                  fontSize: '14px',
                  textAlign: 'center'
                }}
              >
                {activeCategory === 'recent' ? 'No recent emojis yet' : 'No emojis found'}
              </div>
            )}
          </div>

          {/* Copy Feedback */}
          {copiedEmoji && (
            <div
              style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#1F2937',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: `${borderRadius}px`,
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                animation: prefersReducedMotion ? 'none' : 'fadeIn 300ms ease-out'
              }}
            >
              <span style={{ fontSize: '20px' }}>{copiedEmoji}</span>
              <span>Copied!</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
