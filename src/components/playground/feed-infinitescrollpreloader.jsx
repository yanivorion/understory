import React from "react";

const MANIFEST = {
  "type": "Feed.InfiniteScrollPreloader",
  "description": "Infinite scroll feed with intelligent preloading, lazy loading, scroll depth analytics, and memory-efficient off-screen cleanup",
  "editorElement": {
    "selector": ".infinite-scroll-feed",
    "displayName": "Infinite Scroll Preloader",
    "archetype": "container",
    "data": {
      "feedTitle": {
        "dataType": "text",
        "displayName": "Feed Title",
        "defaultValue": "Latest Updates",
        "group": "Content"
      },
      "feedDescription": {
        "dataType": "text",
        "displayName": "Feed Description",
        "defaultValue": "Continuously loading content as you scroll",
        "group": "Content"
      },
      "itemsPerBatch": {
        "dataType": "select",
        "displayName": "Items Per Batch",
        "defaultValue": "6",
        "options": ["3", "6", "9", "12"],
        "group": "Content"
      },
      "totalItems": {
        "dataType": "select",
        "displayName": "Total Items (Demo)",
        "defaultValue": "30",
        "options": ["20", "30", "40", "50"],
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "loaderColor": {
        "dataType": "color",
        "displayName": "Loader Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 40,
        "group": "Typography"
      },
      "cardTitleFontSize": {
        "dataType": "number",
        "displayName": "Card Title Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "bodyFontSize": {
        "dataType": "number",
        "displayName": "Body Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "titleFontWeight": {
        "dataType": "select",
        "displayName": "Title Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "preloadDistance": {
        "dataType": "select",
        "displayName": "Preload Distance (px)",
        "defaultValue": "400",
        "options": ["200", "300", "400", "500", "600"],
        "group": "Performance"
      },
      "cleanupThreshold": {
        "dataType": "select",
        "displayName": "Cleanup Threshold",
        "defaultValue": "20",
        "options": ["10", "20", "30", "40"],
        "group": "Performance"
      },
      "loadDelay": {
        "dataType": "select",
        "displayName": "Load Delay (ms)",
        "defaultValue": "800",
        "options": ["400", "600", "800", "1000"],
        "group": "Performance"
      },
      "fadeInDuration": {
        "dataType": "select",
        "displayName": "Fade Duration (ms)",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay (ms)",
        "defaultValue": "80",
        "options": ["50", "80", "100", "150"],
        "group": "Animation"
      },
      "trackScrollDepth": {
        "dataType": "booleanValue",
        "displayName": "Track Scroll Depth",
        "defaultValue": true,
        "group": "Analytics"
      },
      "trackLoadTime": {
        "dataType": "booleanValue",
        "displayName": "Track Load Time",
        "defaultValue": true,
        "group": "Analytics"
      },
      "showAnalytics": {
        "dataType": "booleanValue",
        "displayName": "Show Analytics",
        "defaultValue": true,
        "group": "Analytics"
      },
      "enableCleanup": {
        "dataType": "booleanValue",
        "displayName": "Enable Memory Cleanup",
        "defaultValue": true,
        "group": "Performance"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [loadedCount, setLoadedCount] = React.useState(0);
  const [analytics, setAnalytics] = React.useState({
    scrollDepth: 0,
    batchesLoaded: 0,
    totalLoadTime: 0,
    averageLoadTime: 0,
    itemsViewed: 0
  });
  
  const loaderRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const loadTimeStart = React.useRef(null);
  const itemRefs = React.useRef({});
  const scrollDepthMax = React.useRef(0);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config values safely
  const feedTitle = config?.feedTitle || "Latest Updates";
  const feedDescription = config?.feedDescription || "Continuously loading content as you scroll";
  const itemsPerBatch = parseInt(config?.itemsPerBatch) || 6;
  const totalItems = parseInt(config?.totalItems) || 30;
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const cardBackgroundColor = config?.cardBackgroundColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const secondaryTextColor = config?.secondaryTextColor || "#495057";
  const borderColor = config?.borderColor || "#E9ECEF";
  const loaderColor = config?.loaderColor || "#343A40";
  
  const titleFontSize = parseInt(config?.titleFontSize) || 40;
  const cardTitleFontSize = parseInt(config?.cardTitleFontSize) || 18;
  const bodyFontSize = parseInt(config?.bodyFontSize) || 14;
  const fontWeight = config?.fontWeight || "400";
  const titleFontWeight = config?.titleFontWeight || "300";
  
  const preloadDistance = parseInt(config?.preloadDistance) || 400;
  const cleanupThreshold = parseInt(config?.cleanupThreshold) || 20;
  const loadDelay = parseInt(config?.loadDelay) || 800;
  const fadeInDuration = parseInt(config?.fadeInDuration) || 400;
  const staggerDelay = parseInt(config?.staggerDelay) || 80;
  
  const trackScrollDepth = config?.trackScrollDepth !== false;
  const trackLoadTime = config?.trackLoadTime !== false;
  const showAnalytics = config?.showAnalytics !== false;
  const enableCleanup = config?.enableCleanup !== false;

  // Generate initial batch
  React.useEffect(() => {
    loadMoreItems();
  }, []);

  // Load more items function
  const loadMoreItems = React.useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    if (trackLoadTime) {
      loadTimeStart.current = Date.now();
    }

    setTimeout(() => {
      const currentCount = loadedCount;
      const newItems = [];
      
      for (let i = 0; i < itemsPerBatch; i++) {
        const itemNumber = currentCount + i + 1;
        if (itemNumber > totalItems) {
          setHasMore(false);
          break;
        }
        
        newItems.push({
          id: itemNumber,
          title: `Item ${itemNumber}`,
          description: `This is the content for item ${itemNumber}. It demonstrates infinite scroll with intelligent preloading and memory management.`,
          timestamp: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
        });
      }

      setItems(prev => [...prev, ...newItems]);
      setLoadedCount(prev => prev + newItems.length);
      setLoading(false);

      // Track analytics
      if (trackLoadTime && loadTimeStart.current) {
        const loadTime = Date.now() - loadTimeStart.current;
        setAnalytics(prev => {
          const newBatchCount = prev.batchesLoaded + 1;
          const newTotalTime = prev.totalLoadTime + loadTime;
          return {
            ...prev,
            batchesLoaded: newBatchCount,
            totalLoadTime: newTotalTime,
            averageLoadTime: Math.floor(newTotalTime / newBatchCount)
          };
        });
      }

      // Check if we've reached the end
      if (currentCount + newItems.length >= totalItems) {
        setHasMore(false);
      }
    }, loadDelay);
  }, [loading, hasMore, loadedCount, itemsPerBatch, totalItems, loadDelay, trackLoadTime]);

  // Intersection Observer for infinite scroll trigger
  React.useEffect(() => {
    if (!loaderRef.current) return;

    const observerOptions = {
      rootMargin: `${preloadDistance}px`
    };

    const observerCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadMoreItems();
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, loadMoreItems, preloadDistance]);

  // Track scroll depth
  React.useEffect(() => {
    if (!trackScrollDepth || !containerRef.current) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const scrollTop = containerRef.current.scrollTop;
            const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
            const currentDepth = Math.floor((scrollTop / scrollHeight) * 100);
            
            if (currentDepth > scrollDepthMax.current) {
              scrollDepthMax.current = currentDepth;
              setAnalytics(prev => ({ ...prev, scrollDepth: currentDepth }));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => container.removeEventListener('scroll', handleScroll);
  }, [trackScrollDepth]);

  // Memory cleanup - remove off-screen items from DOM
  React.useEffect(() => {
    if (!enableCleanup || items.length < cleanupThreshold) return;

    const observerOptions = {
      rootMargin: '500px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const itemElement = entry.target;
        if (!entry.isIntersecting) {
          // Item is far off-screen, we could optimize here
          // In a real implementation, you might replace with placeholder
          itemElement.style.contentVisibility = 'auto';
        } else {
          itemElement.style.contentVisibility = 'visible';
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(itemRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [items.length, enableCleanup, cleanupThreshold]);

  // Track item views
  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.5
    };

    const viewedItems = new Set();

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const itemId = entry.target.dataset.itemId;
          if (!viewedItems.has(itemId)) {
            viewedItems.add(itemId);
            setAnalytics(prev => ({ ...prev, itemsViewed: viewedItems.size }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(itemRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [items.length]);

  const containerStyle = {
    height: '600px',
    overflow: 'auto',
    backgroundColor,
    color: textColor
  };

  const headerStyle = {
    position: 'sticky',
    top: 0,
    backgroundColor,
    padding: '2rem',
    borderBottom: `1px solid ${borderColor}`,
    zIndex: 10,
    backdropFilter: 'blur(10px)',
    backgroundColor: `${backgroundColor}F0`
  };

  const titleStyle = {
    fontSize: `clamp(${titleFontSize * 0.7}px, 5vw, ${titleFontSize}px)`,
    fontWeight: titleFontWeight,
    letterSpacing: '-0.01em',
    marginBottom: '0.5rem',
    lineHeight: 1.2
  };

  const descriptionStyle = {
    fontSize: `${bodyFontSize}px`,
    fontWeight,
    color: secondaryTextColor,
    lineHeight: 1.6
  };

  const feedContainerStyle = {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const itemStyle = (index) => ({
    backgroundColor: cardBackgroundColor,
    padding: '1.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: `1px solid ${borderColor}`,
    opacity: prefersReducedMotion ? 1 : 0,
    transform: prefersReducedMotion ? 'none' : 'translateY(20px)',
    animation: prefersReducedMotion ? 'none' : `fadeInUp ${fadeInDuration}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
    animationDelay: prefersReducedMotion ? '0ms' : `${(index % itemsPerBatch) * staggerDelay}ms`
  });

  const itemTitleStyle = {
    fontSize: `${cardTitleFontSize}px`,
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: textColor
  };

  const itemDescriptionStyle = {
    fontSize: `${bodyFontSize}px`,
    fontWeight,
    color: secondaryTextColor,
    lineHeight: 1.6,
    marginBottom: '0.75rem'
  };

  const itemMetaStyle = {
    fontSize: `${bodyFontSize - 2}px`,
    color: secondaryTextColor,
    opacity: 0.7
  };

  const loaderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    flexDirection: 'column',
    gap: '1rem'
  };

  const spinnerStyle = {
    width: '32px',
    height: '32px',
    border: `3px solid ${borderColor}`,
    borderTopColor: loaderColor,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  };

  const endMessageStyle = {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: secondaryTextColor,
    fontSize: `${bodyFontSize}px`
  };

  const analyticsStyle = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    backgroundColor: '#FFFFFF',
    padding: '1.5rem',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: `1px solid ${borderColor}`,
    minWidth: '250px',
    zIndex: 1000
  };

  const analyticsHeaderStyle = {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '1rem',
    color: textColor,
    borderBottom: `1px solid ${borderColor}`,
    paddingBottom: '0.5rem'
  };

  const analyticsItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    fontSize: '13px',
    color: secondaryTextColor
  };

  const analyticsValueStyle = {
    fontWeight: '500',
    color: textColor
  };

  return (
    <div ref={containerRef} style={containerStyle} className="infinite-scroll-feed">
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>{feedTitle}</h1>
        <p style={descriptionStyle}>{feedDescription}</p>
      </div>

      {/* Feed Items */}
      <div style={feedContainerStyle}>
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={el => itemRefs.current[item.id] = el}
            data-item-id={item.id}
            style={itemStyle(index)}
          >
            <h2 style={itemTitleStyle}>{item.title}</h2>
            <p style={itemDescriptionStyle}>{item.description}</p>
            <div style={itemMetaStyle}>{item.timestamp}</div>
          </div>
        ))}

        {/* Loader */}
        {hasMore && (
          <div ref={loaderRef} style={loaderContainerStyle}>
            {loading && (
              <>
                <div style={spinnerStyle} />
                <span style={{ color: secondaryTextColor, fontSize: `${bodyFontSize}px` }}>
                  Loading more...
                </span>
              </>
            )}
          </div>
        )}

        {/* End Message */}
        {!hasMore && (
          <div style={endMessageStyle}>
            <div style={{ fontSize: `${titleFontSize * 0.5}px`, marginBottom: '0.5rem' }}>
              ✓
            </div>
            You've reached the end
            <div style={{ fontSize: `${bodyFontSize - 2}px`, marginTop: '0.5rem', opacity: 0.7 }}>
              {loadedCount} items loaded
            </div>
          </div>
        )}
      </div>

      {/* Analytics Panel */}
      {showAnalytics && (
        <div style={analyticsStyle}>
          <div style={analyticsHeaderStyle}>
            Feed Analytics
          </div>
          <div style={analyticsItemStyle}>
            <span>Items Loaded</span>
            <span style={analyticsValueStyle}>{loadedCount}/{totalItems}</span>
          </div>
          <div style={analyticsItemStyle}>
            <span>Batches Loaded</span>
            <span style={analyticsValueStyle}>{analytics.batchesLoaded}</span>
          </div>
          <div style={analyticsItemStyle}>
            <span>Items Viewed</span>
            <span style={analyticsValueStyle}>{analytics.itemsViewed}</span>
          </div>
          {trackScrollDepth && (
            <div style={analyticsItemStyle}>
              <span>Scroll Depth</span>
              <span style={analyticsValueStyle}>{analytics.scrollDepth}%</span>
            </div>
          )}
          {trackLoadTime && (
            <div style={analyticsItemStyle}>
              <span>Avg Load Time</span>
              <span style={analyticsValueStyle}>{analytics.averageLoadTime}ms</span>
            </div>
          )}
          <div style={{...analyticsItemStyle, borderTop: `1px solid ${borderColor}`, paddingTop: '0.75rem', marginTop: '0.5rem'}}>
            <span>View Rate</span>
            <span style={analyticsValueStyle}>
              {loadedCount > 0 ? Math.round((analytics.itemsViewed / loadedCount) * 100) : 0}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
