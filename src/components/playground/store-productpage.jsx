import React from "react";

const MANIFEST = {
  "type": "Store.ProductPage",
  "description": "Shopify-style product page with 8 layout presets and smooth interactions",
  "editorElement": {
    "selector": ".store-product-page",
    "displayName": "Store Product Page",
    "archetype": "container",
    "data": {
      "layoutPreset": {
        "dataType": "select",
        "displayName": "Layout Preset",
        "defaultValue": "classic",
        "options": ["classic", "modern", "minimal", "gallery", "immersive", "compact", "editorial", "luxury"],
        "group": "Layout",
        "description": "Classic: Traditional 50/50 | Modern: Sticky sidebar | Minimal: Clean borders | Gallery: Image focus | Immersive: Full bleed | Compact: Quick view | Editorial: Magazine | Luxury: Premium feel"
      },
      "productTitle": {
        "dataType": "text",
        "displayName": "Product Title",
        "defaultValue": "Premium Leather Weekender Bag",
        "group": "Product"
      },
      "productBrand": {
        "dataType": "text",
        "displayName": "Brand",
        "defaultValue": "Heritage & Co.",
        "group": "Product"
      },
      "productPrice": {
        "dataType": "text",
        "displayName": "Price",
        "defaultValue": "$289.00",
        "group": "Product"
      },
      "originalPrice": {
        "dataType": "text",
        "displayName": "Original Price (optional)",
        "defaultValue": "",
        "group": "Product"
      },
      "productRating": {
        "dataType": "select",
        "displayName": "Rating",
        "defaultValue": "4.8",
        "options": ["4.0", "4.2", "4.5", "4.7", "4.8", "4.9", "5.0"],
        "group": "Product"
      },
      "reviewCount": {
        "dataType": "text",
        "displayName": "Review Count",
        "defaultValue": "127",
        "group": "Product"
      },
      "productDescription": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "Crafted from full-grain leather that only gets better with age. Features brass hardware, cotton lining, and a detachable shoulder strap. Perfect for weekend getaways.",
        "group": "Product"
      },
      "stockStatus": {
        "dataType": "select",
        "displayName": "Stock Status",
        "defaultValue": "inStock",
        "options": ["inStock", "lowStock", "outOfStock"],
        "group": "Product"
      },
      "stockCount": {
        "dataType": "text",
        "displayName": "Stock Count",
        "defaultValue": "12",
        "group": "Product"
      },
      "color1": {
        "dataType": "color",
        "displayName": "Color 1",
        "defaultValue": "#78350F",
        "group": "Variants"
      },
      "color1Name": {
        "dataType": "text",
        "displayName": "Color 1 Name",
        "defaultValue": "Cognac",
        "group": "Variants"
      },
      "color2": {
        "dataType": "color",
        "displayName": "Color 2",
        "defaultValue": "#1C1917",
        "group": "Variants"
      },
      "color2Name": {
        "dataType": "text",
        "displayName": "Color 2 Name",
        "defaultValue": "Black",
        "group": "Variants"
      },
      "color3": {
        "dataType": "color",
        "displayName": "Color 3",
        "defaultValue": "#44403C",
        "group": "Variants"
      },
      "color3Name": {
        "dataType": "text",
        "displayName": "Color 3 Name",
        "defaultValue": "Charcoal",
        "group": "Variants"
      },
      "size1": {
        "dataType": "text",
        "displayName": "Size 1",
        "defaultValue": "Carry-On",
        "group": "Variants"
      },
      "size2": {
        "dataType": "text",
        "displayName": "Size 2",
        "defaultValue": "Weekender",
        "group": "Variants"
      },
      "size3": {
        "dataType": "text",
        "displayName": "Size 3",
        "defaultValue": "Duffle",
        "group": "Variants"
      },
      "feature1": {
        "dataType": "text",
        "displayName": "Feature 1",
        "defaultValue": "Full-grain leather",
        "group": "Features"
      },
      "feature2": {
        "dataType": "text",
        "displayName": "Feature 2",
        "defaultValue": "Brass hardware",
        "group": "Features"
      },
      "feature3": {
        "dataType": "text",
        "displayName": "Feature 3",
        "defaultValue": "Cotton lining",
        "group": "Features"
      },
      "feature4": {
        "dataType": "text",
        "displayName": "Feature 4",
        "defaultValue": "Detachable strap",
        "group": "Features"
      },
      "showTrustBadges": {
        "dataType": "booleanValue",
        "displayName": "Show Trust Badges",
        "defaultValue": true,
        "group": "Features"
      },
      "showSizeGuide": {
        "dataType": "booleanValue",
        "displayName": "Show Size Guide",
        "defaultValue": true,
        "group": "Features"
      },
      "showShareButtons": {
        "dataType": "booleanValue",
        "displayName": "Show Share Buttons",
        "defaultValue": true,
        "group": "Features"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card/Image Background",
        "defaultValue": "#F9FAFB",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#111827",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#6B7280",
        "group": "Colors"
      },
      "priceColor": {
        "dataType": "color",
        "displayName": "Price Color",
        "defaultValue": "#111827",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent/Button Color",
        "defaultValue": "#111827",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E5E7EB",
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
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState('description');

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const layoutPreset = config?.layoutPreset || 'classic';
  const productTitle = config?.productTitle || 'Premium Leather Weekender Bag';
  const productBrand = config?.productBrand || 'Heritage & Co.';
  const productPrice = config?.productPrice || '$289.00';
  const originalPrice = config?.originalPrice || '';
  const productRating = parseFloat(config?.productRating || '4.8');
  const reviewCount = config?.reviewCount || '127';
  const productDescription = config?.productDescription || 'Crafted from full-grain leather...';
  const stockStatus = config?.stockStatus || 'inStock';
  const stockCount = config?.stockCount || '12';

  const colors = [
    { color: config?.color1 || '#78350F', name: config?.color1Name || 'Cognac' },
    { color: config?.color2 || '#1C1917', name: config?.color2Name || 'Black' },
    { color: config?.color3 || '#44403C', name: config?.color3Name || 'Charcoal' }
  ];

  const sizes = [
    config?.size1 || 'Carry-On',
    config?.size2 || 'Weekender',
    config?.size3 || 'Duffle'
  ];

  const features = [
    config?.feature1 || 'Full-grain leather',
    config?.feature2 || 'Brass hardware',
    config?.feature3 || 'Cotton lining',
    config?.feature4 || 'Detachable strap'
  ].filter(Boolean);

  const showTrustBadges = config?.showTrustBadges !== false;
  const showSizeGuide = config?.showSizeGuide !== false;
  const showShareButtons = config?.showShareButtons !== false;

  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const cardBackground = config?.cardBackground || '#F9FAFB';
  const titleColor = config?.titleColor || '#111827';
  const textColor = config?.textColor || '#6B7280';
  const priceColor = config?.priceColor || '#111827';
  const accentColor = config?.accentColor || '#111827';
  const borderColor = config?.borderColor || '#E5E7EB';

  const thumbnails = [0, 1, 2, 3, 4];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#FBBF24' : '#E5E7EB', fontSize: '14px' }}>★</span>
    ));
  };

  const getStockInfo = () => {
    switch (stockStatus) {
      case 'lowStock': return { text: `Only ${stockCount} left`, color: '#D97706' };
      case 'outOfStock': return { text: 'Out of stock', color: '#DC2626' };
      default: return { text: 'In stock', color: '#059669' };
    }
  };

  const stockInfo = getStockInfo();

  // Image Gallery Component
  const ImageGallery = ({ layout = 'vertical', size = 'large' }) => {
    const isVertical = layout === 'vertical';
    const isLarge = size === 'large';
    
    return (
      <div style={{
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        gap: '16px'
      }}>
        {/* Thumbnails */}
        <div style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          gap: '12px',
          order: isVertical ? 0 : 1
        }}>
          {thumbnails.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              style={{
                width: isVertical ? '72px' : '64px',
                height: isVertical ? '72px' : '64px',
                borderRadius: '8px',
                border: selectedImage === index ? `2px solid ${accentColor}` : `1px solid ${borderColor}`,
                backgroundColor: cardBackground,
                cursor: 'pointer',
                padding: '6px',
                transition: prefersReducedMotion ? 'none' : 'all 200ms ease'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '4px',
                backgroundColor: colors[selectedColor].color,
                opacity: 0.3 + (index * 0.15)
              }} />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div style={{
          flex: 1,
          aspectRatio: isLarge ? '1' : '4/3',
          backgroundColor: cardBackground,
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '65%',
            height: '65%',
            borderRadius: '16px',
            background: `linear-gradient(145deg, ${colors[selectedColor].color}80, ${colors[selectedColor].color})`,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }} />
          
          {/* Zoom Button */}
          <button style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: backgroundColor,
            border: `1px solid ${borderColor}`,
            cursor: 'pointer',
            fontSize: '16px',
            color: textColor
          }}>
            ⤢
          </button>

          {/* Navigation Arrows */}
          <button style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: backgroundColor,
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            fontSize: '16px'
          }}>‹</button>
          <button style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: backgroundColor,
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            fontSize: '16px'
          }}>›</button>
        </div>
      </div>
    );
  };

  // Product Info Component
  const ProductInfo = ({ compact = false }) => (
    <div>
      {/* Brand */}
      <p style={{ fontSize: '13px', color: textColor, margin: '0 0 8px 0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {productBrand}
      </p>

      {/* Title */}
      <h1 style={{
        fontSize: compact ? '24px' : '32px',
        fontWeight: '500',
        color: titleColor,
        margin: '0 0 16px 0',
        lineHeight: '1.2'
      }}>
        {productTitle}
      </h1>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ display: 'flex' }}>{renderStars(productRating)}</div>
        <span style={{ fontSize: '14px', color: titleColor, fontWeight: '500' }}>{productRating}</span>
        <span style={{ fontSize: '14px', color: textColor }}>({reviewCount} reviews)</span>
      </div>

      {/* Price */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{ fontSize: compact ? '24px' : '28px', fontWeight: '600', color: priceColor }}>
          {productPrice}
        </span>
        {originalPrice && (
          <span style={{ fontSize: '18px', color: textColor, textDecoration: 'line-through' }}>
            {originalPrice}
          </span>
        )}
      </div>

      {/* Description */}
      {!compact && (
        <p style={{ fontSize: '15px', color: textColor, lineHeight: '1.7', margin: '0 0 24px 0' }}>
          {productDescription}
        </p>
      )}

      {/* Color Selection */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', color: titleColor, marginBottom: '12px' }}>
          Color: <span style={{ fontWeight: '500' }}>{colors[selectedColor].name}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {colors.map((c, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: c.color,
                border: selectedColor === index ? `2px solid ${accentColor}` : '2px solid transparent',
                outline: selectedColor === index ? `2px solid ${backgroundColor}` : 'none',
                outlineOffset: '-4px',
                cursor: 'pointer',
                transition: prefersReducedMotion ? 'none' : 'all 150ms ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', color: titleColor }}>Size</span>
          {showSizeGuide && (
            <button style={{
              background: 'none',
              border: 'none',
              fontSize: '13px',
              color: textColor,
              textDecoration: 'underline',
              cursor: 'pointer'
            }}>
              Size guide
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {sizes.map((size, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(index)}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                backgroundColor: selectedSize === index ? accentColor : backgroundColor,
                color: selectedSize === index ? backgroundColor : titleColor,
                border: `1px solid ${selectedSize === index ? accentColor : borderColor}`,
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: prefersReducedMotion ? 'none' : 'all 150ms ease'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '14px', color: titleColor, display: 'block', marginBottom: '12px' }}>Quantity</span>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          border: `1px solid ${borderColor}`,
          borderRadius: '8px'
        }}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{
              width: '44px',
              height: '44px',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '18px',
              cursor: 'pointer',
              color: textColor
            }}
          >−</button>
          <span style={{ width: '44px', textAlign: 'center', fontSize: '15px', color: titleColor, fontWeight: '500' }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{
              width: '44px',
              height: '44px',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '18px',
              cursor: 'pointer',
              color: textColor
            }}
          >+</button>
        </div>
      </div>

      {/* Stock Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: stockInfo.color }} />
        <span style={{ fontSize: '14px', color: stockInfo.color, fontWeight: '500' }}>{stockInfo.text}</span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button style={{
          flex: 1,
          padding: '16px 24px',
          borderRadius: '8px',
          backgroundColor: accentColor,
          color: backgroundColor,
          border: 'none',
          fontSize: '15px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Add to Cart
        </button>
        <button style={{
          padding: '16px 20px',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          color: titleColor,
          border: `1px solid ${borderColor}`,
          fontSize: '18px',
          cursor: 'pointer'
        }}>
          ♡
        </button>
      </div>

      {/* Buy Now */}
      <button style={{
        width: '100%',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: backgroundColor,
        color: titleColor,
        border: `1px solid ${borderColor}`,
        fontSize: '15px',
        fontWeight: '500',
        cursor: 'pointer',
        marginBottom: '24px'
      }}>
        Buy it now
      </button>

      {/* Trust Badges */}
      {showTrustBadges && (
        <div style={{
          display: 'flex',
          gap: '20px',
          paddingTop: '20px',
          borderTop: `1px solid ${borderColor}`
        }}>
          {[
            { icon: '🚚', text: 'Free Shipping' },
            { icon: '↩️', text: 'Easy Returns' },
            { icon: '🔒', text: 'Secure Payment' }
          ].map((badge, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px' }}>{badge.icon}</span>
              <span style={{ fontSize: '12px', color: textColor }}>{badge.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Features List Component
  const FeaturesList = () => (
    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${borderColor}` }}>
      <h3 style={{ fontSize: '16px', fontWeight: '500', color: titleColor, margin: '0 0 16px 0' }}>
        Features
      </h3>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {features.map((feature, index) => (
          <li key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px',
            fontSize: '14px',
            color: textColor
          }}>
            <span style={{ color: '#059669' }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  // PRESET: Classic - Traditional 50/50 layout
  const renderClassic = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <ImageGallery layout="vertical" />
      <div>
        <ProductInfo />
        <FeaturesList />
      </div>
    </div>
  );

  // PRESET: Modern - Sticky sidebar
  const renderModern = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: '48px',
      padding: '40px',
      maxWidth: '1300px',
      margin: '0 auto'
    }}>
      <div>
        {/* Main Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}>
          {thumbnails.map((_, index) => (
            <div
              key={index}
              style={{
                aspectRatio: index === 0 ? '1' : '4/5',
                gridColumn: index === 0 ? 'span 2' : 'span 1',
                backgroundColor: cardBackground,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{
                width: '60%',
                height: '60%',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${colors[selectedColor].color}60, ${colors[selectedColor].color})`,
                opacity: 0.4 + (index * 0.15)
              }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'sticky', top: '40px', alignSelf: 'start' }}>
        <ProductInfo />
        <FeaturesList />
      </div>
    </div>
  );

  // PRESET: Minimal - Clean with borders
  const renderMinimal = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      border: `1px solid ${borderColor}`,
      maxWidth: '1100px',
      margin: '40px auto'
    }}>
      <div style={{
        borderRight: `1px solid ${borderColor}`,
        padding: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '80%',
          aspectRatio: '1',
          backgroundColor: cardBackground,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '50%',
            height: '50%',
            background: `linear-gradient(145deg, ${colors[selectedColor].color}80, ${colors[selectedColor].color})`
          }} />
        </div>
      </div>
      <div style={{ padding: '48px' }}>
        <ProductInfo compact />
      </div>
    </div>
  );

  // PRESET: Gallery - Image focused
  const renderGallery = () => (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Large Hero Image */}
      <div style={{
        aspectRatio: '21/9',
        backgroundColor: cardBackground,
        borderRadius: '16px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          width: '30%',
          height: '70%',
          borderRadius: '16px',
          background: `linear-gradient(145deg, ${colors[selectedColor].color}70, ${colors[selectedColor].color})`,
          boxShadow: '0 30px 60px rgba(0,0,0,0.2)'
        }} />
      </div>
      
      {/* Thumbnail Row */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
        {thumbnails.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            style={{
              flex: 1,
              aspectRatio: '4/3',
              borderRadius: '12px',
              border: selectedImage === index ? `2px solid ${accentColor}` : `1px solid ${borderColor}`,
              backgroundColor: cardBackground,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{
              width: '50%',
              height: '50%',
              borderRadius: '8px',
              backgroundColor: colors[selectedColor].color,
              opacity: 0.3 + (index * 0.15)
            }} />
          </button>
        ))}
      </div>

      {/* Info Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <ProductInfo />
        <div>
          <FeaturesList />
        </div>
      </div>
    </div>
  );

  // PRESET: Immersive - Full bleed
  const renderImmersive = () => (
    <div>
      {/* Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        minHeight: '90vh'
      }}>
        <div style={{
          backgroundColor: cardBackground,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px'
        }}>
          <div style={{
            width: '70%',
            aspectRatio: '1',
            borderRadius: '24px',
            background: `linear-gradient(145deg, ${colors[selectedColor].color}60, ${colors[selectedColor].color})`,
            boxShadow: '0 40px 80px rgba(0,0,0,0.2)'
          }} />
        </div>
        <div style={{
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <ProductInfo />
        </div>
      </div>
      
      {/* Features Section */}
      <div style={{
        padding: '80px 60px',
        backgroundColor: cardBackground
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '400', color: titleColor, marginBottom: '40px', textAlign: 'center' }}>
            Crafted Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {features.map((feature, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: backgroundColor,
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  ✓
                </div>
                <span style={{ fontSize: '14px', color: titleColor }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // PRESET: Compact - Quick view style
  const renderCompact = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr 1.2fr',
      gap: '32px',
      padding: '40px',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      {/* Vertical Thumbnails */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {thumbnails.slice(0, 4).map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '6px',
              border: selectedImage === index ? `2px solid ${accentColor}` : `1px solid ${borderColor}`,
              backgroundColor: cardBackground,
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: colors[selectedColor].color,
              opacity: 0.3 + (index * 0.2),
              borderRadius: '3px'
            }} />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div style={{
        aspectRatio: '1',
        backgroundColor: cardBackground,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '65%',
          height: '65%',
          borderRadius: '12px',
          background: `linear-gradient(145deg, ${colors[selectedColor].color}70, ${colors[selectedColor].color})`
        }} />
      </div>

      {/* Product Info */}
      <div>
        <ProductInfo compact />
      </div>
    </div>
  );

  // PRESET: Editorial - Magazine style
  const renderEditorial = () => (
    <div style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{ fontSize: '12px', color: textColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
          {productBrand}
        </p>
        <h1 style={{ fontSize: '48px', fontWeight: '300', color: titleColor, margin: '0 0 24px 0', lineHeight: '1.1' }}>
          {productTitle}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex' }}>{renderStars(productRating)}</div>
          <span style={{ fontSize: '14px', color: textColor }}>({reviewCount} reviews)</span>
        </div>
      </div>

      {/* Image Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        gap: '24px',
        marginBottom: '60px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[0, 1].map((_, i) => (
            <div key={i} style={{
              aspectRatio: '3/4',
              backgroundColor: cardBackground,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '50%',
                height: '50%',
                backgroundColor: colors[selectedColor].color,
                opacity: 0.3 + (i * 0.2)
              }} />
            </div>
          ))}
        </div>
        <div style={{
          aspectRatio: '3/4',
          backgroundColor: cardBackground,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '60%',
            height: '60%',
            borderRadius: '16px',
            background: `linear-gradient(145deg, ${colors[selectedColor].color}70, ${colors[selectedColor].color})`,
            boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
          }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[2, 3].map((_, i) => (
            <div key={i} style={{
              aspectRatio: '3/4',
              backgroundColor: cardBackground,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '50%',
                height: '50%',
                backgroundColor: colors[selectedColor].color,
                opacity: 0.5 + (i * 0.15)
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '400', color: titleColor, marginBottom: '24px' }}>Details</h2>
          <p style={{ fontSize: '16px', color: textColor, lineHeight: '1.8' }}>{productDescription}</p>
          <FeaturesList />
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '400', color: titleColor, marginBottom: '24px' }}>Purchase</h2>
          <ProductInfo compact />
        </div>
      </div>
    </div>
  );

  // PRESET: Luxury - Premium feel
  const renderLuxury = () => (
    <div style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', minHeight: '100vh' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh'
      }}>
        {/* Image Side */}
        <div style={{
          backgroundColor: '#141414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px'
        }}>
          <div style={{
            width: '70%',
            aspectRatio: '1',
            borderRadius: '4px',
            background: `linear-gradient(145deg, ${colors[selectedColor].color}80, ${colors[selectedColor].color})`,
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
          }} />
        </div>

        {/* Info Side */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px'
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#888', marginBottom: '24px', textTransform: 'uppercase' }}>
            {productBrand}
          </p>
          <h1 style={{ fontSize: '42px', fontWeight: '300', margin: '0 0 24px 0', lineHeight: '1.1' }}>
            {productTitle}
          </h1>
          <p style={{ fontSize: '32px', fontWeight: '300', marginBottom: '32px' }}>{productPrice}</p>
          <p style={{ fontSize: '16px', color: '#AAA', lineHeight: '1.8', marginBottom: '40px', maxWidth: '400px' }}>
            {productDescription}
          </p>

          {/* Colors */}
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#888', display: 'block', marginBottom: '16px' }}>
              SELECT COLOR
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              {colors.map((c, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: c.color,
                    border: selectedColor === index ? '2px solid #FFFFFF' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#888', display: 'block', marginBottom: '16px' }}>
              SELECT SIZE
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              {sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(index)}
                  style={{
                    padding: '14px 24px',
                    borderRadius: '0',
                    backgroundColor: selectedSize === index ? '#FFFFFF' : 'transparent',
                    color: selectedSize === index ? '#0A0A0A' : '#FFFFFF',
                    border: `1px solid ${selectedSize === index ? '#FFFFFF' : '#333'}`,
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    cursor: 'pointer'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button style={{
            padding: '20px 48px',
            borderRadius: '0',
            backgroundColor: '#FFFFFF',
            color: '#0A0A0A',
            border: 'none',
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            alignSelf: 'flex-start'
          }}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreset = () => {
    switch (layoutPreset) {
      case 'modern': return renderModern();
      case 'minimal': return renderMinimal();
      case 'gallery': return renderGallery();
      case 'immersive': return renderImmersive();
      case 'compact': return renderCompact();
      case 'editorial': return renderEditorial();
      case 'luxury': return renderLuxury();
      default: return renderClassic();
    }
  };

  return (
    <div
      className="store-product-page"
      style={{
        backgroundColor: layoutPreset === 'luxury' ? '#0A0A0A' : backgroundColor,
        minHeight: '800px'
      }}
    >
      {renderPreset()}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
