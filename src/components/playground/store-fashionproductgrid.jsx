import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Jul 19, 2026, 08:35 PM
 * Component Type: Store.FashionProductGrid
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Store.FashionProductGrid",
  "description": "Elegant fashion store product grid with wishlist and quick-view modal functionality",
  "editorElement": {
    "selector": ".fashion-store-widget",
    "displayName": "Fashion Store Widget",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Section Title",
        "defaultValue": "New Arrivals",
        "group": "Content",
        "description": "Main heading for the product section"
      },
      "subtitle": {
        "dataType": "text",
        "displayName": "Section Subtitle",
        "defaultValue": "Discover our latest collection",
        "group": "Content",
        "description": "Subtitle or tagline"
      },
      "showSubtitle": {
        "dataType": "booleanValue",
        "displayName": "Show Subtitle",
        "defaultValue": true,
        "group": "Content"
      },
      "gridColumns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout",
        "description": "Number of columns in the product grid"
      },
      "productCount": {
        "dataType": "select",
        "displayName": "Number of Products",
        "defaultValue": "6",
        "options": ["3", "4", "6", "8", "9", "12"],
        "group": "Content",
        "description": "How many products to display"
      },
      "quickViewButtonText": {
        "dataType": "text",
        "displayName": "Quick View Button Text",
        "defaultValue": "Quick View",
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
        "defaultValue": "#FAFAF9",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Primary Text Color",
        "defaultValue": "#1C1917",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#44403C",
        "group": "Colors"
      },
      "tertiaryTextColor": {
        "dataType": "color",
        "displayName": "Tertiary Text Color",
        "defaultValue": "#78716C",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#44403C",
        "group": "Colors",
        "description": "Used for buttons and interactive elements"
      },
      "wishlistActiveColor": {
        "dataType": "color",
        "displayName": "Wishlist Active Color",
        "defaultValue": "#1C1917",
        "group": "Colors",
        "description": "Color when item is added to wishlist"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E7E5E4",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "titleFontWeight": {
        "dataType": "select",
        "displayName": "Title Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "titleLetterSpacing": {
        "dataType": "select",
        "displayName": "Title Letter Spacing",
        "defaultValue": "0.05em",
        "options": ["0em", "0.025em", "0.05em", "0.075em", "0.1em"],
        "group": "Typography"
      },
      "productNameFontSize": {
        "dataType": "number",
        "displayName": "Product Name Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "productNameFontWeight": {
        "dataType": "select",
        "displayName": "Product Name Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "priceFontSize": {
        "dataType": "number",
        "displayName": "Price Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "priceFontWeight": {
        "dataType": "select",
        "displayName": "Price Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "cardPadding": {
        "dataType": "select",
        "displayName": "Card Padding",
        "defaultValue": "16px",
        "options": ["12px", "16px", "20px", "24px"],
        "group": "Layout"
      },
      "gridGap": {
        "dataType": "select",
        "displayName": "Grid Gap",
        "defaultValue": "24px",
        "options": ["16px", "20px", "24px", "32px", "40px"],
        "group": "Layout"
      },
      "maxWidth": {
        "dataType": "select",
        "displayName": "Container Max Width",
        "defaultValue": "1280px",
        "options": ["1024px", "1280px", "1440px", "100%"],
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
  // Safe config access with defaults
  const title = config?.title || "New Arrivals";
  const subtitle = config?.subtitle || "Discover our latest collection";
  const showSubtitle = config?.showSubtitle !== false;
  const gridColumns = parseInt(config?.gridColumns || "3");
  const productCount = parseInt(config?.productCount || "6");
  const quickViewButtonText = config?.quickViewButtonText || "Quick View";
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FAFAF9";
  const textColor = config?.textColor || "#1C1917";
  const secondaryTextColor = config?.secondaryTextColor || "#44403C";
  const tertiaryTextColor = config?.tertiaryTextColor || "#78716C";
  const accentColor = config?.accentColor || "#44403C";
  const wishlistActiveColor = config?.wishlistActiveColor || "#1C1917";
  const borderColor = config?.borderColor || "#E7E5E4";
  
  const titleFontSize = parseInt(config?.titleFontSize || "48");
  const titleFontWeight = config?.titleFontWeight || "300";
  const titleLetterSpacing = config?.titleLetterSpacing || "0.05em";
  const productNameFontSize = parseInt(config?.productNameFontSize || "16");
  const productNameFontWeight = config?.productNameFontWeight || "400";
  const priceFontSize = parseInt(config?.priceFontSize || "18");
  const priceFontWeight = config?.priceFontWeight || "500";
  
  const cardPadding = config?.cardPadding || "16px";
  const gridGap = config?.gridGap || "24px";
  const maxWidth = config?.maxWidth || "1280px";
  
  // State management
  const [wishlist, setWishlist] = React.useState(new Set());
  const [quickViewProduct, setQuickViewProduct] = React.useState(null);
  const [imageLoadStates, setImageLoadStates] = React.useState({});
  
  // Accessibility: reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  // Generate product data
  const products = React.useMemo(() => {
    const fashionCategories = [
      'Tailored Blazer', 'Silk Dress', 'Cashmere Sweater', 'Leather Jacket',
      'Wool Coat', 'Cotton Shirt', 'Denim Jeans', 'Linen Trousers',
      'Knit Cardigan', 'Satin Blouse', 'Tweed Skirt', 'Suede Boots'
    ];
    
    const fashionColors = [
      'Ivory', 'Charcoal', 'Navy', 'Camel', 'Stone', 'Burgundy',
      'Olive', 'Cream', 'Slate', 'Tan', 'Pearl', 'Mocha'
    ];
    
    return Array.from({ length: productCount }, (_, index) => ({
      id: index + 1,
      name: `${fashionCategories[index % fashionCategories.length]} in ${fashionColors[index % fashionColors.length]}`,
      price: Math.floor(Math.random() * 300 + 100),
      category: fashionCategories[index % fashionCategories.length],
      image: `https://images.unsplash.com/photo-${1539109136881 + index}?w=600&h=800&fit=crop`,
      description: 'Timeless design meets contemporary craftsmanship. Premium materials sourced responsibly.'
    }));
  }, [productCount]);
  
  // Wishlist toggle handler
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };
  
  // Quick view handlers
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    document.body.style.overflow = 'hidden';
  };
  
  const closeQuickView = () => {
    setQuickViewProduct(null);
    document.body.style.overflow = 'auto';
  };
  
  // Handle image load
  const handleImageLoad = (productId) => {
    setImageLoadStates(prev => ({ ...prev, [productId]: true }));
  };
  
  // Keyboard handling for modal
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && quickViewProduct) {
        closeQuickView();
      }
    };
    
    if (quickViewProduct) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [quickViewProduct]);
  
  return (
    <div 
      className="fashion-store-widget"
      style={{
        backgroundColor,
        padding: '60px 20px',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}
    >
      {/* Header */}
      <div style={{
        maxWidth,
        margin: '0 auto 48px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: `${titleFontSize}px`,
          fontWeight: titleFontWeight,
          letterSpacing: titleLetterSpacing,
          color: textColor,
          margin: '0 0 12px',
          fontFamily: 'Georgia, "Times New Roman", serif',
          lineHeight: 1.2
        }}>
          {title}
        </h1>
        {showSubtitle && (
          <p style={{
            fontSize: '16px',
            fontWeight: '300',
            color: tertiaryTextColor,
            margin: 0,
            letterSpacing: '0.025em'
          }}>
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Product Grid */}
      <div style={{
        maxWidth,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: gridGap,
        '@media (max-width: 768px)': {
          gridTemplateColumns: 'repeat(2, 1fr)'
        }
      }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInWishlist={wishlist.has(product.id)}
            onToggleWishlist={() => toggleWishlist(product.id)}
            onOpenQuickView={() => openQuickView(product)}
            imageLoaded={imageLoadStates[product.id]}
            onImageLoad={() => handleImageLoad(product.id)}
            cardBackgroundColor={cardBackgroundColor}
            textColor={textColor}
            secondaryTextColor={secondaryTextColor}
            accentColor={accentColor}
            wishlistActiveColor={wishlistActiveColor}
            borderColor={borderColor}
            productNameFontSize={productNameFontSize}
            productNameFontWeight={productNameFontWeight}
            priceFontSize={priceFontSize}
            priceFontWeight={priceFontWeight}
            cardPadding={cardPadding}
            quickViewButtonText={quickViewButtonText}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isInWishlist={wishlist.has(quickViewProduct.id)}
          onToggleWishlist={() => toggleWishlist(quickViewProduct.id)}
          onClose={closeQuickView}
          backgroundColor={backgroundColor}
          cardBackgroundColor={cardBackgroundColor}
          textColor={textColor}
          secondaryTextColor={secondaryTextColor}
          accentColor={accentColor}
          wishlistActiveColor={wishlistActiveColor}
          borderColor={borderColor}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  isInWishlist,
  onToggleWishlist,
  onOpenQuickView,
  imageLoaded,
  onImageLoad,
  cardBackgroundColor,
  textColor,
  secondaryTextColor,
  accentColor,
  wishlistActiveColor,
  borderColor,
  productNameFontSize,
  productNameFontWeight,
  priceFontSize,
  priceFontWeight,
  cardPadding,
  quickViewButtonText,
  prefersReducedMotion
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      style={{
        backgroundColor: cardBackgroundColor,
        borderRadius: '4px',
        border: `1px solid ${borderColor}`,
        overflow: 'hidden',
        position: 'relative',
        transform: prefersReducedMotion ? 'none' : (isHovered ? 'scale(1.02)' : 'scale(1)'),
        boxShadow: isHovered 
          ? '0 4px 12px rgba(0,0,0,0.08)' 
          : '0 1px 3px rgba(0,0,0,0.06)',
        transition: prefersReducedMotion ? 'none' : 'transform 250ms ease-out, box-shadow 250ms ease-out',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '133.33%', // 3:4 aspect ratio
        backgroundColor: '#F5F5F4',
        overflow: 'hidden'
      }}>
        <img
          src={product.image}
          alt={product.name}
          onLoad={onImageLoad}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 400ms ease-out'
          }}
        />
        
        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.95)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transform: prefersReducedMotion ? 'none' : (isInWishlist ? 'scale(1)' : 'scale(1)'),
            transition: prefersReducedMotion ? 'none' : 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 2
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isInWishlist ? wishlistActiveColor : "none"}
            stroke={isInWishlist ? wishlistActiveColor : accentColor}
            strokeWidth="2"
            style={{
              transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out'
            }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        
        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView();
          }}
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: prefersReducedMotion 
              ? 'translateX(-50%)' 
              : (isHovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)'),
            opacity: prefersReducedMotion ? 1 : (isHovered ? 1 : 0),
            backgroundColor: accentColor,
            color: '#FFFFFF',
            padding: '10px 24px',
            border: 'none',
            borderRadius: '2px',
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 250ms ease-out',
            pointerEvents: isHovered ? 'auto' : 'none'
          }}
        >
          {quickViewButtonText}
        </button>
      </div>
      
      {/* Product Info */}
      <div style={{ padding: cardPadding }}>
        <p style={{
          fontSize: '12px',
          fontWeight: '300',
          color: secondaryTextColor,
          margin: '0 0 6px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {product.category}
        </p>
        
        <h3 style={{
          fontSize: `${productNameFontSize}px`,
          fontWeight: productNameFontWeight,
          color: textColor,
          margin: '0 0 8px',
          letterSpacing: '0.025em',
          lineHeight: 1.4
        }}>
          {product.name}
        </h3>
        
        <p style={{
          fontSize: `${priceFontSize}px`,
          fontWeight: priceFontWeight,
          color: textColor,
          margin: 0
        }}>
          ${product.price}
        </p>
      </div>
    </div>
  );
}

// Quick View Modal Component
function QuickViewModal({
  product,
  isInWishlist,
  onToggleWishlist,
  onClose,
  backgroundColor,
  cardBackgroundColor,
  textColor,
  secondaryTextColor,
  accentColor,
  wishlistActiveColor,
  borderColor,
  prefersReducedMotion
}) {
  const modalRef = React.useRef(null);
  
  // Trap focus within modal
  React.useEffect(() => {
    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, []);
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        animation: prefersReducedMotion ? 'none' : 'fadeIn 300ms ease-out'
      }}
      onClick={onClose}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes modalAppear {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
      
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          backgroundColor: cardBackgroundColor,
          borderRadius: '4px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          animation: prefersReducedMotion ? 'none' : 'modalAppear 400ms ease-out',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close quick view"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: backgroundColor,
            border: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background-color 200ms ease-out'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        
        {/* Modal Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          padding: '40px',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          {/* Product Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            paddingTop: '133.33%',
            backgroundColor: '#F5F5F4',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          
          {/* Product Details */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div>
              <p style={{
                fontSize: '12px',
                fontWeight: '300',
                color: secondaryTextColor,
                margin: '0 0 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {product.category}
              </p>
              
              <h2
                id="modal-title"
                style={{
                  fontSize: '28px',
                  fontWeight: '400',
                  color: textColor,
                  margin: '0 0 16px',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  letterSpacing: '0.025em',
                  lineHeight: 1.3
                }}
              >
                {product.name}
              </h2>
              
              <p style={{
                fontSize: '24px',
                fontWeight: '500',
                color: textColor,
                margin: 0
              }}>
                ${product.price}
              </p>
            </div>
            
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: secondaryTextColor,
              margin: 0
            }}>
              {product.description}
            </p>
            
            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: 'auto'
            }}>
              <button
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '14px',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color 200ms ease-out'
                }}
              >
                Add to Cart
              </button>
              
              <button
                onClick={onToggleWishlist}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 200ms ease-out'
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isInWishlist ? wishlistActiveColor : "none"}
                  stroke={isInWishlist ? wishlistActiveColor : accentColor}
                  strokeWidth="2"
                  style={{
                    transition: 'all 300ms ease-out'
                  }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
