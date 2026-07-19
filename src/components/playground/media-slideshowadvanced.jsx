import React from "react";

const MANIFEST = {
  "type": "Media.SlideshowAdvanced",
  "description": "Advanced slideshow with navigation, autoplay, thumbnails, Ken Burns effect, and sophisticated transitions",
  "editorElement": {
    "selector": ".slideshow-container",
    "displayName": "Advanced Slideshow",
    "archetype": "container",
    "data": {
      "slides": {
        "dataType": "text",
        "displayName": "Slide Images (comma-separated URLs)",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200,https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200,https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200",
        "group": "Content"
      },
      "slideCaptions": {
        "dataType": "text",
        "displayName": "Captions (comma-separated)",
        "defaultValue": "Mountain Landscape,Tropical Paradise,Forest Path,Ocean Sunset",
        "group": "Content"
      },
      "transitionEffect": {
        "dataType": "select",
        "displayName": "Transition Effect",
        "defaultValue": "slide",
        "options": ["slide", "fade", "zoom", "flip", "cube", "coverflow"],
        "group": "Animation"
      },
      "autoplay": {
        "dataType": "booleanValue",
        "displayName": "Enable Autoplay",
        "defaultValue": true,
        "group": "Animation"
      },
      "autoplayDelay": {
        "dataType": "select",
        "displayName": "Autoplay Delay (seconds)",
        "defaultValue": "5",
        "options": ["3", "4", "5", "6", "7", "8", "10"],
        "group": "Animation"
      },
      "transitionSpeed": {
        "dataType": "select",
        "displayName": "Transition Speed",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800", "1000"],
        "group": "Animation"
      },
      "kenBurnsEffect": {
        "dataType": "booleanValue",
        "displayName": "Enable Ken Burns Effect",
        "defaultValue": true,
        "group": "Animation",
        "description": "Subtle zoom and pan on images"
      },
      "showThumbnails": {
        "dataType": "booleanValue",
        "displayName": "Show Thumbnails",
        "defaultValue": true,
        "group": "Content"
      },
      "showNavigation": {
        "dataType": "booleanValue",
        "displayName": "Show Navigation Arrows",
        "defaultValue": true,
        "group": "Content"
      },
      "showPagination": {
        "dataType": "booleanValue",
        "displayName": "Show Pagination Dots",
        "defaultValue": true,
        "group": "Content"
      },
      "showCaptions": {
        "dataType": "booleanValue",
        "displayName": "Show Captions",
        "defaultValue": true,
        "group": "Content"
      },
      "aspectRatio": {
        "dataType": "select",
        "displayName": "Aspect Ratio",
        "defaultValue": "16:9",
        "options": ["16:9", "4:3", "21:9", "1:1", "9:16"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "captionBgColor": {
        "dataType": "color",
        "displayName": "Caption Background",
        "defaultValue": "rgba(0,0,0,0.7)",
        "group": "Colors"
      },
      "captionTextColor": {
        "dataType": "color",
        "displayName": "Caption Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "navColor": {
        "dataType": "color",
        "displayName": "Navigation Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#A1A1AA",
        "group": "Colors"
      }
    }
  }
};

function Component({ config = {} }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [direction, setDirection] = React.useState(1); // 1 = forward, -1 = backward
  const autoplayTimerRef = React.useRef(null);
  
  // Safe config access
  const slideUrls = (config?.slides || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200,https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200,https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200').split(',');
  const captions = (config?.slideCaptions || 'Mountain Landscape,Tropical Paradise,Forest Path,Ocean Sunset').split(',');
  
  const transitionEffect = config?.transitionEffect || 'slide';
  const autoplay = config?.autoplay !== false;
  const autoplayDelay = parseInt(config?.autoplayDelay) || 5;
  const transitionSpeed = parseInt(config?.transitionSpeed) || 600;
  const kenBurns = config?.kenBurnsEffect !== false;
  
  const showThumbs = config?.showThumbnails !== false;
  const showNav = config?.showNavigation !== false;
  const showPag = config?.showPagination !== false;
  const showCaptions = config?.showCaptions !== false;
  
  const aspectRatio = config?.aspectRatio || '16:9';
  const bgColor = config?.backgroundColor || '#000000';
  const captionBg = config?.captionBgColor || 'rgba(0,0,0,0.7)';
  const captionColor = config?.captionTextColor || '#FFFFFF';
  const navColor = config?.navColor || '#FFFFFF';
  const accentColor = config?.accentColor || '#A1A1AA';
  
  const totalSlides = slideUrls.length;
  
  // Navigate to slide
  const goToSlide = (index, dir = 1) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setDirection(dir);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, transitionSpeed);
  };
  
  const nextSlide = () => {
    const next = (currentIndex + 1) % totalSlides;
    goToSlide(next, 1);
  };
  
  const prevSlide = () => {
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prev, -1);
  };
  
  // Autoplay
  React.useEffect(() => {
    if (!autoplay) return;
    
    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, autoplayDelay * 1000);
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplayDelay, currentIndex]);
  
  // Aspect ratio calculation
  const getAspectPadding = () => {
    const ratios = {
      '16:9': '56.25%',
      '4:3': '75%',
      '21:9': '42.86%',
      '1:1': '100%',
      '9:16': '177.78%'
    };
    return ratios[aspectRatio] || '56.25%';
  };
  
  // Transition styles
  const getSlideStyle = (index) => {
    const isCurrent = index === currentIndex;
    const offset = index - currentIndex;
    
    const transitions = {
      slide: {
        transform: `translateX(${offset * 100}%)`,
        opacity: 1,
        transition: `transform ${transitionSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`
      },
      
      fade: {
        opacity: isCurrent ? 1 : 0,
        transform: 'translateX(0)',
        transition: `opacity ${transitionSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`
      },
      
      zoom: {
        opacity: isCurrent ? 1 : 0,
        transform: isCurrent ? 'scale(1)' : `scale(${direction > 0 ? 0.8 : 1.2})`,
        transition: `all ${transitionSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`
      },
      
      flip: {
        opacity: isCurrent ? 1 : 0,
        transform: isCurrent ? 'rotateY(0deg)' : `rotateY(${direction > 0 ? 90 : -90}deg)`,
        transition: `all ${transitionSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transformStyle: 'preserve-3d'
      },
      
      cube: {
        transform: `translateX(${offset * 100}%) rotateY(${offset * -90}deg)`,
        opacity: Math.abs(offset) <= 1 ? 1 : 0,
        transition: `all ${transitionSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transformOrigin: offset > 0 ? 'left center' : 'right center',
        transformStyle: 'preserve-3d'
      }
    };
    
    return transitions[transitionEffect] || transitions.slide;
  };
  
  // Ken Burns animation
  const getKenBurnsStyle = (index) => {
    if (!kenBurns || index !== currentIndex) return {};
    
    const animations = [
      { transform: 'scale(1) translate(0, 0)', animation: 'kenBurns1 20s ease-in-out infinite alternate' },
      { transform: 'scale(1) translate(0, 0)', animation: 'kenBurns2 20s ease-in-out infinite alternate' },
      { transform: 'scale(1) translate(0, 0)', animation: 'kenBurns3 20s ease-in-out infinite alternate' },
      { transform: 'scale(1) translate(0, 0)', animation: 'kenBurns4 20s ease-in-out infinite alternate' }
    ];
    
    return animations[index % animations.length];
  };
  
  return (
    <div className="slideshow-container" style={{
      position: 'relative',
      width: '100%',
      backgroundColor: bgColor,
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>
        {`
          @keyframes kenBurns1 {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(-2%, -2%); }
          }
          @keyframes kenBurns2 {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(2%, -2%); }
          }
          @keyframes kenBurns3 {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(-2%, 2%); }
          }
          @keyframes kenBurns4 {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(2%, 2%); }
          }
        `}
      </style>
      
      {/* Main slides container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: getAspectPadding(),
        overflow: 'hidden',
        perspective: transitionEffect === 'cube' ? '1200px' : 'none'
      }}>
        {slideUrls.map((url, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              ...getSlideStyle(index)
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...getKenBurnsStyle(index)
            }} />
            
            {/* Caption */}
            {showCaptions && captions[index] && index === currentIndex && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: captionBg,
                color: captionColor,
                fontSize: '20px',
                fontWeight: '500',
                opacity: index === currentIndex ? 1 : 0,
                transform: index === currentIndex ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 400ms cubic-bezier(0.22, 1, 0.36, 1) ${transitionSpeed * 0.5}ms`
              }}>
                {captions[index].trim()}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      {showNav && (
        <>
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            style={{
              position: 'absolute',
              top: '50%',
              left: '16px',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              color: navColor,
              fontSize: '24px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              if (!isAnimating) {
                e.target.style.background = 'rgba(0,0,0,0.8)';
                e.target.style.transform = 'translateY(-50%) scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0,0,0,0.5)';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ‹
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            style={{
              position: 'absolute',
              top: '50%',
              right: '16px',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              color: navColor,
              fontSize: '24px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              if (!isAnimating) {
                e.target.style.background = 'rgba(0,0,0,0.8)';
                e.target.style.transform = 'translateY(-50%) scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0,0,0,0.5)';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ›
          </button>
        </>
      )}
      
      {/* Pagination dots */}
      {showPag && (
        <div style={{
          position: 'absolute',
          bottom: showCaptions ? '80px' : '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 10
        }}>
          {slideUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index, index > currentIndex ? 1 : -1)}
              disabled={isAnimating}
              style={{
                width: index === currentIndex ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: index === currentIndex ? accentColor : 'rgba(255,255,255,0.5)',
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
            />
          ))}
        </div>
      )}
      
      {/* Thumbnails */}
      {showThumbs && (
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '16px',
          backgroundColor: 'rgba(0,0,0,0.8)',
          overflowX: 'auto',
          justifyContent: 'center'
        }}>
          {slideUrls.map((url, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index, index > currentIndex ? 1 : -1)}
              disabled={isAnimating}
              style={{
                width: '80px',
                height: '60px',
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: index === currentIndex ? `2px solid ${accentColor}` : '2px solid transparent',
                borderRadius: '4px',
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                opacity: index === currentIndex ? 1 : 0.5,
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (!isAnimating && index !== currentIndex) {
                  e.target.style.opacity = 0.8;
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.target.style.opacity = 0.5;
                  e.target.style.transform = 'scale(1)';
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
