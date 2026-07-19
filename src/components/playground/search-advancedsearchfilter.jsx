import React from "react";

const MANIFEST = {
  "type": "Search.AdvancedSearchFilter",
  "description": "Advanced search interface with multiple filters and animated results",
  "editorElement": {
    "selector": ".advanced-search-container",
    "displayName": "Advanced Search & Filter",
    "archetype": "container",
    "data": {
      "items": {
        "dataType": "text",
        "displayName": "Items JSON",
        "defaultValue": '[{"id":1,"title":"Premium Wireless Headphones","category":"Electronics","price":299,"rating":4.8,"date":"2024-01-15","image":"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop","description":"High-quality sound with noise cancellation"},{"id":2,"title":"Ergonomic Office Chair","category":"Furniture","price":450,"rating":4.6,"date":"2024-01-20","image":"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&h=300&fit=crop","description":"Comfortable seating for long work sessions"},{"id":3,"title":"Smart Watch Pro","category":"Electronics","price":399,"rating":4.9,"date":"2024-02-01","image":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop","description":"Fitness tracking and notifications"},{"id":4,"title":"Minimalist Desk Lamp","category":"Furniture","price":89,"rating":4.5,"date":"2024-02-10","image":"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop","description":"Elegant lighting solution"},{"id":5,"title":"Mechanical Keyboard","category":"Electronics","price":159,"rating":4.7,"date":"2024-02-15","image":"https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&h=300&fit=crop","description":"Tactile typing experience"},{"id":6,"title":"Standing Desk","category":"Furniture","price":599,"rating":4.8,"date":"2024-03-01","image":"https://images.unsplash.com/photo-1486946255434-2466348c2166?w=300&h=300&fit=crop","description":"Adjustable height workstation"}]',
        "group": "Content"
      },
      "categories": {
        "dataType": "text",
        "displayName": "Categories (comma separated)",
        "defaultValue": "All,Electronics,Furniture",
        "group": "Content"
      },
      "priceRanges": {
        "dataType": "text",
        "displayName": "Price Ranges JSON",
        "defaultValue": '[{"label":"All Prices","min":0,"max":99999},{"label":"Under $100","min":0,"max":100},{"label":"$100 - $300","min":100,"max":300},{"label":"$300 - $500","min":300,"max":500},{"label":"$500+","min":500,"max":99999}]',
        "group": "Content"
      },
      "sortOptions": {
        "dataType": "text",
        "displayName": "Sort Options (comma separated)",
        "defaultValue": "Relevance,Price: Low to High,Price: High to Low,Rating,Newest First",
        "group": "Content"
      },
      "searchPlaceholder": {
        "dataType": "text",
        "displayName": "Search Placeholder",
        "defaultValue": "Search products...",
        "group": "Content"
      },
      "showResults": {
        "dataType": "booleanValue",
        "displayName": "Show Result Count",
        "defaultValue": "true",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "sidebarBackgroundColor": {
        "dataType": "color",
        "displayName": "Sidebar Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "primaryTextColor": {
        "dataType": "color",
        "displayName": "Primary Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#6B6B6B",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(0,0,0,0.08)",
        "group": "Colors"
      },
      "starColor": {
        "dataType": "color",
        "displayName": "Star Rating Color",
        "defaultValue": "#F59E0B",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "Inter, -apple-system, system-ui, sans-serif",
        "options": [
          "Inter, -apple-system, system-ui, sans-serif",
          "SF Pro Display, -apple-system, sans-serif",
          "Helvetica Neue, Helvetica, Arial, sans-serif"
        ],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "select",
        "displayName": "Card Title Size",
        "defaultValue": "16px",
        "options": ["14px", "16px", "18px", "20px"],
        "group": "Typography"
      },
      "priceSize": {
        "dataType": "select",
        "displayName": "Price Font Size",
        "defaultValue": "20px",
        "options": ["16px", "18px", "20px", "24px"],
        "group": "Typography"
      },
      "sidebarWidth": {
        "dataType": "select",
        "displayName": "Sidebar Width",
        "defaultValue": "280px",
        "options": ["240px", "260px", "280px", "300px"],
        "group": "Layout"
      },
      "cardAspectRatio": {
        "dataType": "select",
        "displayName": "Card Image Aspect Ratio",
        "defaultValue": "1/1",
        "options": ["1/1", "4/3", "16/9"],
        "group": "Layout"
      },
      "gridColumns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "showShadow": {
        "dataType": "booleanValue",
        "displayName": "Show Card Shadow",
        "defaultValue": "true",
        "group": "Layout"
      },
      "transitionDuration": {
        "dataType": "number",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "300",
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "number",
        "displayName": "Card Stagger Delay (ms)",
        "defaultValue": "40",
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activePriceRange, setActivePriceRange] = React.useState(0);
  const [minRating, setMinRating] = React.useState(0);
  const [sortBy, setSortBy] = React.useState('Relevance');
  const cardRefs = React.useRef([]);

  // Safe config extraction
  const allItems = React.useMemo(() => {
    try {
      return JSON.parse(config?.items || MANIFEST.editorElement.data.items.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.items.defaultValue);
    }
  }, [config?.items]);

  const categories = React.useMemo(() => {
    return (config?.categories || MANIFEST.editorElement.data.categories.defaultValue).split(',').map(c => c.trim());
  }, [config?.categories]);

  const priceRanges = React.useMemo(() => {
    try {
      return JSON.parse(config?.priceRanges || MANIFEST.editorElement.data.priceRanges.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.priceRanges.defaultValue);
    }
  }, [config?.priceRanges]);

  const sortOptions = React.useMemo(() => {
    return (config?.sortOptions || MANIFEST.editorElement.data.sortOptions.defaultValue).split(',').map(s => s.trim());
  }, [config?.sortOptions]);

  const transitionDuration = parseInt(config?.transitionDuration || '300');
  const staggerDelay = parseInt(config?.staggerDelay || '40');

  // Filter and sort items
  const filteredItems = React.useMemo(() => {
    let items = allItems;

    // Search filter
    if (searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (activeCategory !== 'All') {
      items = items.filter(item => item.category === activeCategory);
    }

    // Price range filter
    const priceRange = priceRanges[activePriceRange];
    items = items.filter(item => item.price >= priceRange.min && item.price <= priceRange.max);

    // Rating filter
    if (minRating > 0) {
      items = items.filter(item => item.rating >= minRating);
    }

    // Sort
    switch(sortBy) {
      case 'Price: Low to High':
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      case 'Rating':
        items = [...items].sort((a, b) => b.rating - a.rating);
        break;
      case 'Newest First':
        items = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default: // Relevance
        break;
    }

    return items;
  }, [allItems, searchQuery, activeCategory, activePriceRange, minRating, sortBy, priceRanges]);

  // PATTERN 1: Direct DOM animation for cards
  React.useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      setTimeout(() => {
        card.animate([
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: transitionDuration,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        });
      }, index * staggerDelay);
    });
  }, [filteredItems, transitionDuration, staggerDelay]);

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: config?.backgroundColor || '#FAFAFA',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif',
      display: 'flex'
    },
    sidebar: {
      width: config?.sidebarWidth || '280px',
      backgroundColor: config?.sidebarBackgroundColor || '#FFFFFF',
      borderRight: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      padding: '32px 24px',
      overflowY: 'auto',
      position: 'sticky',
      top: '0',
      height: '100vh'
    },
    main: {
      flex: '1',
      padding: '32px 24px'
    },
    searchBox: {
      marginBottom: '32px'
    },
    searchInput: {
      width: '100%',
      padding: '12px 16px 12px 44px',
      fontSize: '14px',
      color: config?.primaryTextColor || '#1A1A1A',
      backgroundColor: config?.cardBackgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      outline: 'none',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      fontFamily: 'inherit',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '16px center'
    },
    filterSection: {
      marginBottom: '32px'
    },
    filterTitle: {
      fontSize: '12px',
      fontWeight: '500',
      color: config?.secondaryTextColor || '#6B6B6B',
      marginBottom: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    filterOption: {
      padding: '10px 12px',
      fontSize: '14px',
      color: config?.primaryTextColor || '#1A1A1A',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: config?.borderRadius || '8px',
      cursor: 'pointer',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      width: '100%',
      textAlign: 'left',
      display: 'block',
      marginBottom: '4px',
      outline: 'none'
    },
    filterOptionActive: {
      backgroundColor: config?.accentColor || '#1A1A1A',
      color: '#FFFFFF'
    },
    ratingFilter: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    ratingOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px',
      cursor: 'pointer',
      borderRadius: config?.borderRadius || '8px',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    resultsCount: {
      fontSize: '14px',
      color: config?.secondaryTextColor || '#6B6B6B'
    },
    sortSelect: {
      padding: '8px 12px',
      fontSize: '14px',
      color: config?.primaryTextColor || '#1A1A1A',
      backgroundColor: config?.cardBackgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      outline: 'none',
      cursor: 'pointer',
      fontFamily: 'inherit'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(${config?.gridColumns || '3'}, 1fr)`,
      gap: '24px'
    },
    card: {
      backgroundColor: config?.cardBackgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      overflow: 'hidden',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      boxShadow: (config?.showShadow !== false) ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
      opacity: 0
    },
    cardImage: {
      width: '100%',
      aspectRatio: config?.cardAspectRatio || '1/1',
      objectFit: 'cover'
    },
    cardContent: {
      padding: '20px'
    },
    cardTitle: {
      fontSize: config?.titleSize || '16px',
      fontWeight: '500',
      color: config?.primaryTextColor || '#1A1A1A',
      marginBottom: '8px',
      lineHeight: '1.4'
    },
    cardDescription: {
      fontSize: '14px',
      color: config?.secondaryTextColor || '#6B6B6B',
      marginBottom: '12px',
      lineHeight: '1.6'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    price: {
      fontSize: config?.priceSize || '20px',
      fontWeight: '500',
      color: config?.primaryTextColor || '#1A1A1A'
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px',
      color: config?.secondaryTextColor || '#6B6B6B'
    },
    star: {
      color: config?.starColor || '#F59E0B'
    }
  };

  return (
    <div style={styles.container} className="advanced-search-container">
      <aside style={styles.sidebar}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder={config?.searchPlaceholder || 'Search products...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => {
              e.target.style.borderColor = config?.accentColor || '#1A1A1A';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = config?.borderColor || 'rgba(0,0,0,0.08)';
            }}
          />
        </div>

        <div style={styles.filterSection}>
          <div style={styles.filterTitle}>Category</div>
          {categories.map((category) => (
            <button
              key={category}
              style={{
                ...styles.filterOption,
                ...(activeCategory === category ? styles.filterOptionActive : {})
              }}
              onClick={() => setActiveCategory(category)}
              onMouseEnter={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div style={styles.filterSection}>
          <div style={styles.filterTitle}>Price Range</div>
          {priceRanges.map((range, index) => (
            <button
              key={index}
              style={{
                ...styles.filterOption,
                ...(activePriceRange === index ? styles.filterOptionActive : {})
              }}
              onClick={() => setActivePriceRange(index)}
              onMouseEnter={(e) => {
                if (activePriceRange !== index) {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (activePriceRange !== index) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {range.label}
            </button>
          ))}
        </div>

        <div style={styles.filterSection}>
          <div style={styles.filterTitle}>Minimum Rating</div>
          <div style={styles.ratingFilter}>
            {[4, 3, 2, 1, 0].map((rating) => (
              <div
                key={rating}
                style={{
                  ...styles.ratingOption,
                  ...(minRating === rating ? { backgroundColor: 'rgba(0,0,0,0.03)' } : {})
                }}
                onClick={() => setMinRating(rating)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                }}
                onMouseLeave={(e) => {
                  if (minRating !== rating) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {rating === 0 ? (
                  <span style={{fontSize: '14px', color: config?.primaryTextColor || '#1A1A1A'}}>All Ratings</span>
                ) : (
                  <>
                    {'★'.repeat(rating)}
                    <span style={{fontSize: '14px', color: config?.secondaryTextColor || '#6B6B6B'}}>& Up</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main style={styles.main}>
        <div style={styles.header}>
          {(config?.showResults !== false) && (
            <div style={styles.resultsCount}>
              {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
            </div>
          )}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div style={styles.grid}>
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => cardRefs.current[index] = el}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = (config?.showShadow !== false) ? '0 8px 24px rgba(0,0,0,0.08)' : 'none';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = (config?.showShadow !== false) ? '0 2px 8px rgba(0,0,0,0.04)' : 'none';
              }}
            >
              <img src={item.image} alt={item.title} style={styles.cardImage} />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDescription}>{item.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.price}>${item.price}</span>
                  <div style={styles.rating}>
                    <span style={styles.star}>★</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
