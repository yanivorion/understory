import React from "react";

const MANIFEST = {
  "type": "Media.AnalyticsTrackedImageGrid",
  "description": "Intelligent image grid with lazy loading, responsive srcset generation, intersection-based loading, and comprehensive engagement analytics",
  "editorElement": {
    "selector": ".analytics-image-grid",
    "displayName": "Analytics-Tracked Image Grid",
    "archetype": "container",
    "data": {
      "gridTitle": {
        "dataType": "text",
        "displayName": "Grid Title",
        "defaultValue": "Project Gallery",
        "group": "Content"
      },
      "gridSubtitle": {
        "dataType": "text",
        "displayName": "Grid Subtitle",
        "defaultValue": "Explore our collection of carefully curated work",
        "group": "Content"
      },
      "columns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Grid Gap (rem)",
        "defaultValue": "1.5",
        "options": ["1", "1.5", "2", "2.5", "3"],
        "group": "Layout"
      },
      "aspectRatio": {
        "dataType": "select",
        "displayName": "Image Aspect Ratio",
        "defaultValue": "4/3",
        "options": ["1/1", "4/3", "16/9", "3/2"],
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
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "imagePlaceholderColor": {
        "dataType": "color",
        "displayName": "Image Placeholder Color",
        "defaultValue": "#F1F3F5",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Hover Overlay Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#DEE2E6",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "subtitleFontSize": {
        "dataType": "number",
        "displayName": "Subtitle Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "captionFontSize": {
        "dataType": "number",
        "displayName": "Caption Font Size (px)",
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
      "loadingStrategy": {
        "dataType": "select",
        "displayName": "Loading Strategy",
        "defaultValue": "lazy",
        "options": ["lazy", "eager", "progressive"],
        "group": "Performance"
      },
      "preloadCount": {
        "dataType": "select",
        "displayName": "Preload Next Images",
        "defaultValue": "2",
        "options": ["0", "1", "2", "3", "4"],
        "group": "Performance"
      },
      "intersectionThreshold": {
        "dataType": "select",
        "displayName": "Load Threshold",
        "defaultValue": "0.1",
        "options": ["0.1", "0.2", "0.3", "0.5"],
        "group": "Performance"
      },
      "rootMargin": {
        "dataType": "select",
        "displayName": "Root Margin (px)",
        "defaultValue": "200",
        "options": ["0", "100", "200", "300", "400"],
        "group": "Performance"
      },
      "fadeInDuration": {
        "dataType": "select",
        "displayName": "Fade Duration (ms)",
        "defaultValue": "400",
        "options": ["300", "400", "500", "600"],
        "group": "Animation"
      },
      "hoverScale": {
        "dataType": "select",
        "displayName": "Hover Scale",
        "defaultValue": "1.05",
        "options": ["1.02", "1.05", "1.08", "1.1"],
        "group": "Animation"
      },
      "trackEngagement": {
        "dataType": "booleanValue",
        "displayName": "Track Engagement",
        "defaultValue": true,
        "group": "Analytics"
      },
      "trackViewTime": {
        "dataType": "booleanValue",
        "displayName": "Track View Time",
        "defaultValue": true,
        "group": "Analytics"
      },
      "trackHovers": {
        "dataType": "booleanValue",
        "displayName": "Track Hovers",
        "defaultValue": true,
        "group": "Analytics"
      },
      "showAnalytics": {
        "dataType": "booleanValue",
        "displayName": "Show Analytics",
        "defaultValue": true,
        "group": "Analytics"
      },
      "showCaptions": {
        "dataType": "booleanValue",
        "displayName": "Show Captions",
        "defaultValue": true,
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
  const [loadedImages, setLoadedImages] = React.useState(new Set());
  const [loadingImages, setLoadingImages] = React.useState(new Set());
  const [imageAnalytics, setImageAnalytics] = React.useState({});
  const [hoveredImage, setHoveredImage] = React.useState(null);
  
  const imageRefs = React.useRef({});
  const viewTimers = React.useRef({});
  const intersectionTimes = React.useRef({});

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Extract config values safely
  const gridTitle = config?.gridTitle || "Project Gallery";
  const gridSubtitle = config?.gridSubtitle || "Explore our collection of carefully curated work";
  const columns = parseInt(config?.columns) || 3;
  const gap = parseFloat(config?.gap) || 1.5;
  const aspectRatio = config?.aspectRatio || "4/3";
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const textColor = config?.textColor || "#212529";
  const secondaryTextColor = config?.secondaryTextColor || "#495057";
  const imagePlaceholderColor = config?.imagePlaceholderColor || "#F1F3F5";
  const overlayColor = config?.overlayColor || "#212529";
  const borderColor = config?.borderColor || "#DEE2E6";
  
  const titleFontSize = parseInt(config?.titleFontSize) || 48;
  const subtitleFontSize = parseInt(config?.subtitleFontSize) || 16;
  const captionFontSize = parseInt(config?.captionFontSize) || 14;
  const fontWeight = config?.fontWeight || "400";
  const titleFontWeight = config?.titleFontWeight || "300";
  
  const loadingStrategy = config?.loadingStrategy || "lazy";
  const preloadCount = parseInt(config?.preloadCount) || 2;
  const intersectionThreshold = parseFloat(config?.intersectionThreshold) || 0.1;
  const rootMargin = parseInt(config?.rootMargin) || 200;
  const fadeInDuration = parseInt(config?.fadeInDuration) || 400;
  const hoverScale = parseFloat(config?.hoverScale) || 1.05;
  
  const trackEngagement = config?.trackEngagement !== false;
  const trackViewTime = config?.trackViewTime !== false;
  const trackHovers = config?.trackHovers !== false;
  const showAnalytics = config?.showAnalytics !== false;
  const showCaptions = config?.showCaptions !== false;

  // Sample image data (in production, this would come from props/API)
  const images = [
    { id: 1, caption: "Modern Architecture", category: "Architecture" },
    { id: 2, caption: "Urban Landscape", category: "Photography" },
    { id: 3, caption: "Abstract Composition", category: "Design" },
    { id: 4, caption: "Minimal Interior", category: "Architecture" },
    { id: 5, caption: "Natural Forms", category: "Photography" },
    { id: 6, caption: "Digital Art", category: "Design" },
    { id: 7, caption: "Geometric Patterns", category: "Design" },
    { id: 8, caption: "Coastal Views", category: "Photography" },
    { id: 9, caption: "Contemporary Space", category: "Architecture" }
  ];

  // Initialize analytics for each image
  React.useEffect(() => {
    const initialAnalytics = {};
    images.forEach(img => {
      initialAnalytics[img.id] = {
        loaded: false,
        viewed: false,
        viewTime: 0,
        hoverCount: 0,
        firstViewTime: null
      };
    });
    setImageAnalytics(initialAnalytics);
  }, []);

  // Intersection Observer for lazy loading
  React.useEffect(() => {
    const observerOptions = {
      threshold: intersectionThreshold,
      rootMargin: `${rootMargin}px`
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const imageId = parseInt(entry.target.dataset.imageId);
        
        if (entry.isIntersecting) {
          // Start loading the image
          if (!loadedImages.has(imageId) && !loadingImages.has(imageId)) {
            setLoadingImages(prev => {
              const newSet = new Set(prev);
              newSet.add(imageId);
              return newSet;
            });

            // Simulate image load delay
            setTimeout(() => {
              setLoadedImages(prev => {
                const newSet = new Set(prev);
                newSet.add(imageId);
                return newSet;
              });

              setLoadingImages(prev => {
                const newSet = new Set(prev);
                newSet.delete(imageId);
                return newSet;
              });

              // Track analytics
              if (trackEngagement) {
                setImageAnalytics(prev => ({
                  ...prev,
                  [imageId]: {
                    ...prev[imageId],
                    loaded: true,
                    viewed: true,
                    firstViewTime: Date.now()
                  }
                }));
              }

              // Preload next images
              if (preloadCount > 0) {
                const currentIndex = images.findIndex(img => img.id === imageId);
                for (let i = 1; i <= preloadCount; i++) {
                  const nextIndex = currentIndex + i;
                  if (nextIndex < images.length) {
                    const nextImageId = images[nextIndex].id;
                    if (!loadedImages.has(nextImageId) && !loadingImages.has(nextImageId)) {
                      setTimeout(() => {
                        setLoadingImages(prev => {
                          const newSet = new Set(prev);
                          newSet.add(nextImageId);
                          return newSet;
                        });

                        setTimeout(() => {
                          setLoadedImages(prev => {
                            const newSet = new Set(prev);
                            newSet.add(nextImageId);
                            return newSet;
                          });

                          setLoadingImages(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(nextImageId);
                            return newSet;
                          });
                        }, 200);
                      }, i * 100);
                    }
                  }
                }
              }
            }, loadingStrategy === 'progressive' ? 100 : 300);
          }

          // Track view time
          if (trackViewTime && !intersectionTimes.current[imageId]) {
            intersectionTimes.current[imageId] = Date.now();
            
            viewTimers.current[imageId] = setInterval(() => {
              setImageAnalytics(prev => ({
                ...prev,
                [imageId]: {
                  ...prev[imageId],
                  viewTime: (prev[imageId]?.viewTime || 0) + 1
                }
              }));
            }, 1000);
          }
        } else {
          // Stop tracking view time when out of viewport
          if (viewTimers.current[imageId]) {
            clearInterval(viewTimers.current[imageId]);
            delete viewTimers.current[imageId];
            delete intersectionTimes.current[imageId];
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all images
    Object.values(imageRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      Object.values(viewTimers.current).forEach(timer => clearInterval(timer));
    };
  }, [intersectionThreshold, rootMargin, loadingStrategy, preloadCount, trackEngagement, trackViewTime]);

  // Track hover events
  const handleMouseEnter = (imageId) => {
    setHoveredImage(imageId);
    
    if (trackHovers) {
      setImageAnalytics(prev => ({
        ...prev,
        [imageId]: {
          ...prev[imageId],
          hoverCount: (prev[imageId]?.hoverCount || 0) + 1
        }
      }));
    }
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  // Calculate total analytics
  const totalAnalytics = React.useMemo(() => {
    const loaded = Object.values(imageAnalytics).filter(a => a.loaded).length;
    const viewed = Object.values(imageAnalytics).filter(a => a.viewed).length;
    const totalViewTime = Object.values(imageAnalytics).reduce((sum, a) => sum + (a.viewTime || 0), 0);
    const totalHovers = Object.values(imageAnalytics).reduce((sum, a) => sum + (a.hoverCount || 0), 0);
    const avgViewTime = viewed > 0 ? Math.floor(totalViewTime / viewed) : 0;
    
    return { loaded, viewed, totalViewTime, totalHovers, avgViewTime };
  }, [imageAnalytics]);

  const containerStyle = {
    backgroundColor,
    color: textColor,
    padding: '4rem 2rem',
    minHeight: '100vh'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '4rem',
    maxWidth: '800px',
    margin: '0 auto 4rem'
  };

  const titleStyle = {
    fontSize: `clamp(${titleFontSize * 0.6}px, 6vw, ${titleFontSize}px)`,
    fontWeight: titleFontWeight,
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
    lineHeight: 1.2
  };

  const subtitleStyle = {
    fontSize: `${subtitleFontSize}px`,
    fontWeight,
    color: secondaryTextColor,
    lineHeight: 1.6
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}rem`,
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const imageCardStyle = (imageId) => {
    const isLoaded = loadedImages.has(imageId);
    const isLoading = loadingImages.has(imageId);
    const isHovered = hoveredImage === imageId;

    return {
      position: 'relative',
      aspectRatio,
      backgroundColor: imagePlaceholderColor,
      borderRadius: '4px',
      overflow: 'hidden',
      cursor: 'pointer',
      border: `1px solid ${borderColor}`,
      opacity: prefersReducedMotion ? 1 : (isLoaded ? 1 : 0.6),
      transform: prefersReducedMotion ? 'none' : (isHovered ? `scale(${hoverScale})` : 'scale(1)'),
      transition: prefersReducedMotion ? 'none' : `transform 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${fadeInDuration}ms ease`,
      willChange: prefersReducedMotion ? 'auto' : 'transform'
    };
  };

  const imagePlaceholderStyle = (isLoaded, isLoading) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '0.5rem',
    color: secondaryTextColor,
    fontSize: '14px',
    opacity: isLoaded ? 0 : 1,
    transition: `opacity ${fadeInDuration}ms ease`,
    pointerEvents: 'none'
  });

  const imageStyle = (isLoaded) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: prefersReducedMotion ? 1 : (isLoaded ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (isLoaded ? 'scale(1)' : 'scale(1.1)'),
    transition: prefersReducedMotion ? 'none' : `opacity ${fadeInDuration}ms ease, transform ${fadeInDuration}ms ease`
  });

  const overlayStyle = (isHovered) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: overlayColor,
    opacity: prefersReducedMotion ? 0 : (isHovered ? 0.3 : 0),
    transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease',
    pointerEvents: 'none'
  });

  const captionStyle = (isHovered) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '1rem',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
    color: '#FFFFFF',
    fontSize: `${captionFontSize}px`,
    fontWeight,
    opacity: prefersReducedMotion ? 1 : (isHovered ? 1 : 0),
    transform: prefersReducedMotion ? 'none' : (isHovered ? 'translateY(0)' : 'translateY(10px)'),
    transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease, transform 300ms ease'
  });

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

  const loadingIndicatorStyle = {
    width: '24px',
    height: '24px',
    border: `2px solid ${borderColor}`,
    borderTopColor: textColor,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  };

  return (
    <div style={containerStyle} className="analytics-image-grid">
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>{gridTitle}</h1>
        <p style={subtitleStyle}>{gridSubtitle}</p>
      </div>

      {/* Image Grid */}
      <div style={gridStyle}>
        {images.map(image => {
          const isLoaded = loadedImages.has(image.id);
          const isLoading = loadingImages.has(image.id);
          const isHovered = hoveredImage === image.id;

          return (
            <div
              key={image.id}
              ref={el => imageRefs.current[image.id] = el}
              data-image-id={image.id}
              style={imageCardStyle(image.id)}
              onMouseEnter={() => handleMouseEnter(image.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Placeholder */}
              <div style={imagePlaceholderStyle(isLoaded, isLoading)}>
                {isLoading && (
                  <div style={loadingIndicatorStyle} />
                )}
                <span>{isLoading ? 'Loading...' : 'Image'}</span>
              </div>

              {/* Actual Image (SVG placeholder in this demo) */}
              {isLoaded && (
                <>
                  <svg 
                    width="100%" 
                    height="100%" 
                    style={imageStyle(isLoaded)}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="100%" height="100%" fill={imagePlaceholderColor}/>
                    <text 
                      x="50%" 
                      y="50%" 
                      textAnchor="middle" 
                      dominantBaseline="middle" 
                      fill={secondaryTextColor}
                      fontSize="14"
                    >
                      {image.caption}
                    </text>
                  </svg>

                  {/* Hover Overlay */}
                  <div style={overlayStyle(isHovered)} />

                  {/* Caption */}
                  {showCaptions && (
                    <div style={captionStyle(isHovered)}>
                      <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                        {image.caption}
                      </div>
                      <div style={{ fontSize: `${captionFontSize - 2}px`, opacity: 0.8 }}>
                        {image.category}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Analytics Panel */}
      {showAnalytics && trackEngagement && (
        <div style={analyticsStyle}>
          <div style={analyticsHeaderStyle}>
            Image Grid Analytics
          </div>
          <div style={analyticsItemStyle}>
            <span>Images Loaded</span>
            <span style={analyticsValueStyle}>{totalAnalytics.loaded}/{images.length}</span>
          </div>
          <div style={analyticsItemStyle}>
            <span>Images Viewed</span>
            <span style={analyticsValueStyle}>{totalAnalytics.viewed}/{images.length}</span>
          </div>
          {trackViewTime && (
            <div style={analyticsItemStyle}>
              <span>Avg View Time</span>
              <span style={analyticsValueStyle}>{totalAnalytics.avgViewTime}s</span>
            </div>
          )}
          {trackHovers && (
            <div style={analyticsItemStyle}>
              <span>Total Hovers</span>
              <span style={analyticsValueStyle}>{totalAnalytics.totalHovers}</span>
            </div>
          )}
          <div style={{...analyticsItemStyle, borderTop: `1px solid ${borderColor}`, paddingTop: '0.75rem', marginTop: '0.5rem'}}>
            <span>Engagement Rate</span>
            <span style={analyticsValueStyle}>
              {images.length > 0 ? Math.round((totalAnalytics.viewed / images.length) * 100) : 0}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
