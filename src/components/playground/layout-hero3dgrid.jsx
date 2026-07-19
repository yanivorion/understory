import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9 - Advanced Hero Collection
 * Generated: Oct 26, 2025, 04:09 AM
 * Component Type: Layout.Hero3DGrid
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
 * Project: Custom Components V9 - Advanced Hero Collection
 * Generated: October 26, 2025, 4:15 PM
 * Component Type: Layout.Hero3DGrid
 * 
 * User Request: Create 10 amazing hero sections that push capabilities
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 5 (3D transforms, mouse tracking, dynamic positioning)
 * Expressive Complexity: 5 (Advanced 3D perspective, floating images)
 * 
 * USER DESIGN DIRECTION
 * Inspired by Delphi reference - 3D perspective grid with floating images
 * creating depth and spatial interest through CSS 3D transforms
 * 
 * DESIGN BRIEF
 * Core Concept: 3D perspective space with floating image cards that respond
 * to mouse movement, creating immersive depth and spatial awareness
 * 
 * Visual Profile: Sophisticated | Innovative | Spatial | Immersive
 * Design Style: Contemporary 3D with editorial polish
 * 
 * Color Palette: Light with depth
 *   - Base 1 (#FAFAFA): Background
 *   - Base 4 (#171717): Typography
 *   - Subtle shadows for depth
 * 
 * Typography:
 *   - System fonts, 300-700 range
 *   - Large centered headline (64px)
 *   - Clean hierarchy
 * 
 * Spacing & Layout:
 *   - Full viewport
 *   - Centered content
 *   - 3D space with perspective
 * 
 * Interaction Design:
 *   - Mouse parallax on images
 *   - Floating card animations
 *   - Smooth 3D transforms
 * 
 * Key Animation: 3D perspective transforms, mouse-driven parallax
 * 
 * Performance: Transform-based animations, RAF for smooth 60fps
 * 
 * Design Rationale: Creates immersive spatial experience through CSS 3D
 * transforms. Mouse interaction adds playfulness while maintaining
 * sophistication. Floating images create visual interest and depth.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Layout.Hero3DGrid",
  "description": "Immersive 3D perspective hero with floating image cards that respond to mouse movement. Features advanced CSS 3D transforms and smooth parallax effects. Perfect for creative portfolios and innovative landing pages.",
  "editorElement": {
    "selector": ".hero-3d-grid",
    "displayName": "3D Grid Hero",
    "archetype": "container",
    "data": {
      "headline": {
        "dataType": "text",
        "displayName": "Headline",
        "defaultValue": "Clone yourself.",
        "group": "Content"
      },
      "description": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "Build the digital version of you to scale your expertise and availability, infinitely",
        "group": "Content"
      },
      "images": {
        "dataType": "text",
        "displayName": "Floating Images (JSON Array)",
        "defaultValue": JSON.stringify([
          { "url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", "position": { "x": -200, "y": -100, "z": -100 } },
          { "url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", "position": { "x": 200, "y": 50, "z": -200 } },
          { "url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", "position": { "x": -150, "y": 150, "z": -150 } },
          { "url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", "position": { "x": 150, "y": -150, "z": -250 } }
        ]),
        "group": "Content",
        "description": "Images with 3D position coordinates (x, y, z)"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "headlineColor": {
        "dataType": "color",
        "displayName": "Headline Color",
        "defaultValue": "#171717",
        "group": "Colors"
      },
      "descriptionColor": {
        "dataType": "color",
        "displayName": "Description Color",
        "defaultValue": "#737373",
        "group": "Colors"
      },
      "headlineFontSize": {
        "dataType": "number",
        "displayName": "Headline Font Size (px)",
        "defaultValue": 64,
        "group": "Typography"
      },
      "perspectiveDistance": {
        "dataType": "number",
        "displayName": "3D Perspective (px)",
        "defaultValue": 1200,
        "group": "Layout",
        "description": "Distance of 3D perspective (lower = more dramatic)"
      },
      "parallaxStrength": {
        "dataType": "number",
        "displayName": "Parallax Strength",
        "defaultValue": 20,
        "group": "Animation",
        "description": "Mouse movement multiplier (higher = more movement)"
      },
      "enableParallax": {
        "dataType": "booleanValue",
        "displayName": "Enable Mouse Parallax",
        "defaultValue": true,
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "select",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "500",
        "options": ["400", "500", "600", "800"],
        "group": "Animation"
      },
      "enableAnimation": {
        "dataType": "booleanValue",
        "displayName": "Enable Entrance Animation",
        "defaultValue": true,
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
  const headline = config?.headline || "Clone yourself.";
  const description = config?.description || "Build the digital version of you to scale your expertise and availability, infinitely";
  const backgroundColor = config?.backgroundColor || "#FAFAFA";
  const headlineColor = config?.headlineColor || "#171717";
  const descriptionColor = config?.descriptionColor || "#737373";
  const headlineFontSize = parseInt(config?.headlineFontSize || "64");
  const perspectiveDistance = parseInt(config?.perspectiveDistance || "1200");
  const parallaxStrength = parseInt(config?.parallaxStrength || "20");
  const enableParallax = config?.enableParallax !== false;
  const animationDuration = parseInt(config?.animationDuration || "500");
  const enableAnimation = config?.enableAnimation !== false;

  let images = [];
  try {
    images = JSON.parse(config?.images || '[]');
    if (!Array.isArray(images) || images.length === 0) {
      images = [
        { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", position: { x: -200, y: -100, z: -100 } },
        { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", position: { x: 200, y: 50, z: -200 } },
        { url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", position: { x: -150, y: 150, z: -150 } },
        { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", position: { x: 150, y: -150, z: -250 } }
      ];
    }
  } catch (e) {
    images = [
      { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", position: { x: -200, y: -100, z: -100 } }
    ];
  }

  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  const heroRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  React.useEffect(() => {
    if (!enableAnimation || prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [enableAnimation, prefersReducedMotion]);

  React.useEffect(() => {
    if (!enableParallax || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;
      
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableParallax, prefersReducedMotion]);

  const shouldAnimate = enableAnimation && !prefersReducedMotion;

  return (
    <div
      ref={heroRef}
      className="hero-3d-grid"
      style={{
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
        perspective: `${perspectiveDistance}px`,
        perspectiveOrigin: '50% 50%'
      }}
    >
      {/* 3D Space Container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: enableParallax && !prefersReducedMotion
            ? `translate(-50%, -50%) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
            : 'translate(-50%, -50%)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Floating Images */}
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '200px',
              height: '250px',
              transformStyle: 'preserve-3d',
              transform: `translate(-50%, -50%) translate3d(${image.position.x + (enableParallax && !prefersReducedMotion ? mousePos.x * parallaxStrength * (index + 1) : 0)}px, ${image.position.y + (enableParallax && !prefersReducedMotion ? mousePos.y * parallaxStrength * (index + 1) : 0)}px, ${image.position.z}px) rotateY(${index * 15}deg)`,
              opacity: shouldAnimate ? (isVisible ? 1 : 0) : 1,
              transition: shouldAnimate 
                ? `opacity ${animationDuration}ms ease-out ${index * 100}ms, transform 0.3s ease-out`
                : 'transform 0.3s ease-out',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <img
              src={image.url}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '800px',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(100px)',
          opacity: shouldAnimate ? (isVisible ? 1 : 0) : 1,
          transition: shouldAnimate ? `opacity ${animationDuration}ms ease-out ${animationDuration * 0.5}ms` : 'none'
        }}
      >
        <h1
          style={{
            fontSize: `clamp(${headlineFontSize * 0.5}px, ${headlineFontSize * 0.08}vw + ${headlineFontSize * 0.35}px, ${headlineFontSize}px)`,
            fontWeight: '700',
            color: headlineColor,
            margin: '0 0 24px 0',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {headline}
        </h1>

        <p
          style={{
            fontSize: '20px',
            fontWeight: '300',
            color: descriptionColor,
            margin: 0,
            lineHeight: '1.6',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
