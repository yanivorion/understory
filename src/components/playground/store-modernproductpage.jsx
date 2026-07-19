import React from "react";

const MANIFEST = {
  "type": "Store.ModernProductPage",
  "description": "Contemporary product page with 8 sleek modern design presets featuring smooth transitions and sophisticated interactions",
  "editorElement": {
    "selector": ".modern-product-page",
    "displayName": "Modern Product Page",
    "archetype": "container",
    "data": {
      "designPreset": {
        "dataType": "select",
        "displayName": "Design Preset",
        "defaultValue": "minimal",
        "options": ["minimal", "split", "immersive", "card", "magazine", "floating", "asymmetric", "fullscreen"],
        "group": "Content",
        "description": "Choose from 8 modern design layouts"
      },
      "productName": {
        "dataType": "text",
        "displayName": "Product Name",
        "defaultValue": "Quantum Speaker Pro",
        "group": "Content"
      },
      "productPrice": {
        "dataType": "text",
        "displayName": "Price",
        "defaultValue": "499",
        "group": "Content"
      },
      "productDescription": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "Experience studio-quality sound with advanced spatial audio technology. Seamlessly connects to all your devices with ultra-low latency wireless streaming.",
        "group": "Content"
      },
      "ctaText": {
        "dataType": "text",
        "displayName": "CTA Button Text",
        "defaultValue": "Add to Cart",
        "group": "Content"
      },
      "showSizeSelector": {
        "dataType": "booleanValue",
        "displayName": "Show Size Selector",
        "defaultValue": false,
        "group": "Content"
      },
      "showColorSelector": {
        "dataType": "booleanValue",
        "displayName": "Show Color Selector",
        "defaultValue": true,
        "group": "Content"
      },
      "showQuantitySelector": {
        "dataType": "booleanValue",
        "displayName": "Show Quantity Selector",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "surfaceColor": {
        "dataType": "color",
        "displayName": "Surface Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Primary Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "tertiaryTextColor": {
        "dataType": "color",
        "displayName": "Tertiary Text Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "buttonTextColor": {
        "dataType": "color",
        "displayName": "Button Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "productNameFontSize": {
        "dataType": "number",
        "displayName": "Product Name Font Size (px)",
        "defaultValue": 48,
        "group": "Typography"
      },
      "productNameFontWeight": {
        "dataType": "select",
        "displayName": "Product Name Font Weight",
        "defaultValue": "500",
        "options": ["400", "500"],
        "group": "Typography"
      },
      "priceFontSize": {
        "dataType": "number",
        "displayName": "Price Font Size (px)",
        "defaultValue": 32,
        "group": "Typography"
      },
      "descriptionFontSize": {
        "dataType": "number",
        "displayName": "Description Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "buttonFontSize": {
        "dataType": "number",
        "displayName": "Button Font Size (px)",
        "defaultValue": 15,
        "group": "Typography"
      },
      "transitionSpeed": {
        "dataType": "select",
        "displayName": "Transition Speed",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Animation",
        "description": "Speed of preset transitions in ms"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  // Safe config access
  const designPreset = config?.designPreset || "minimal";
  const productName = config?.productName || "Quantum Speaker Pro";
  const productPrice = config?.productPrice || "499";
  const productDescription = config?.productDescription || "Experience studio-quality sound with advanced spatial audio technology.";
  const ctaText = config?.ctaText || "Add to Cart";
  const showSizeSelector = config?.showSizeSelector !== false;
  const showColorSelector = config?.showColorSelector !== false;
  const showQuantitySelector = config?.showQuantitySelector !== false;
  
  const backgroundColor = config?.backgroundColor || "#FFFFFF";
  const surfaceColor = config?.surfaceColor || "#F8F9FA";
  const textColor = config?.textColor || "#212529";
  const secondaryTextColor = config?.secondaryTextColor || "#495057";
  const tertiaryTextColor = config?.tertiaryTextColor || "#6C757D";
  const accentColor = config?.accentColor || "#495057";
  const buttonTextColor = config?.buttonTextColor || "#FFFFFF";
  const borderColor = config?.borderColor || "#E9ECEF";
  
  const productNameFontSize = parseInt(config?.productNameFontSize || "48");
  const productNameFontWeight = config?.productNameFontWeight || "500";
  const priceFontSize = parseInt(config?.priceFontSize || "32");
  const descriptionFontSize = parseInt(config?.descriptionFontSize || "16");
  const buttonFontSize = parseInt(config?.buttonFontSize || "15");
  const transitionSpeed = parseInt(config?.transitionSpeed || "400");
  
  // State
  const [currentImage, setCurrentImage] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState("M");
  const [selectedColor, setSelectedColor] = React.useState("black");
  const [quantity, setQuantity] = React.useState(1);
  const [addedToCart, setAddedToCart] = React.useState(false);
  
  // Accessibility
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  // Product images (Unsplash tech/product photos)
  const images = [
    "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=1000&fit=crop"
  ];
  
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "black", hex: "#212529" },
    { name: "white", hex: "#F8F9FA" },
    { name: "gray", hex: "#6C757D" },
    { name: "blue", hex: "#4A5568" }
  ];
  
  // Add to cart handler
  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  // Render appropriate preset
  const renderPreset = () => {
    const commonProps = {
      images,
      currentImage,
      setCurrentImage,
      productName,
      productPrice,
      productDescription,
      selectedSize,
      setSelectedSize,
      selectedColor,
      setSelectedColor,
      quantity,
      setQuantity,
      sizes,
      colors,
      ctaText,
      addedToCart,
      handleAddToCart,
      showSizeSelector,
      showColorSelector,
      showQuantitySelector,
      backgroundColor,
      surfaceColor,
      textColor,
      secondaryTextColor,
      tertiaryTextColor,
      accentColor,
      buttonTextColor,
      borderColor,
      productNameFontSize,
      productNameFontWeight,
      priceFontSize,
      descriptionFontSize,
      buttonFontSize,
      prefersReducedMotion
    };
    
    switch(designPreset) {
      case "minimal": return <MinimalPreset {...commonProps} />;
      case "split": return <SplitPreset {...commonProps} />;
      case "immersive": return <ImmersivePreset {...commonProps} />;
      case "card": return <CardPreset {...commonProps} />;
      case "magazine": return <MagazinePreset {...commonProps} />;
      case "floating": return <FloatingPreset {...commonProps} />;
      case "asymmetric": return <AsymmetricPreset {...commonProps} />;
      case "fullscreen": return <FullscreenPreset {...commonProps} />;
      default: return <MinimalPreset {...commonProps} />;
    }
  };
  
  return (
    <div 
      className="modern-product-page"
      style={{
        backgroundColor,
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        opacity: 1,
        transform: 'scale(1)',
        animation: prefersReducedMotion ? 'none' : `presetFade ${transitionSpeed}ms ease-out`,
        overflow: 'hidden'
      }}
    >
      <style>
        {`
          @keyframes presetFade {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes checkmark {
            0% { transform: scale(0) rotate(-45deg); }
            50% { transform: scale(1.1) rotate(-45deg); }
            100% { transform: scale(1) rotate(-45deg); }
          }
        `}
      </style>
      {renderPreset()}
    </div>
  );
}

// Preset 1: Minimal - Clean centered layout
function MinimalPreset(props) {
  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '60px 40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '80px',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <ImageGallery {...props} layout="minimal" />
      <ProductInfo {...props} layout="minimal" />
    </div>
  );
}

// Preset 2: Split - Dramatic 50/50 split
function SplitPreset(props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: '100vh'
    }}>
      <div style={{ 
        backgroundColor: props.surfaceColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px'
      }}>
        <ImageGallery {...props} layout="split" />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '60px 80px'
      }}>
        <ProductInfo {...props} layout="split" />
      </div>
    </div>
  );
}

// Preset 3: Immersive - Large image with overlay info
function ImmersivePreset(props) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden'
      }}>
        <img 
          src={props.images[props.currentImage]}
          alt={props.productName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)'
          }}
        />
      </div>
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px',
        margin: '0 auto',
        padding: '120px 40px',
        color: '#FFFFFF'
      }}>
        <ProductInfo {...props} layout="immersive" textColor="#FFFFFF" />
      </div>
      <ImageThumbnails {...props} />
    </div>
  );
}

// Preset 4: Card - Product card floating on background
function CardPreset(props) {
  return (
    <div style={{
      backgroundColor: props.surfaceColor,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 40px'
    }}>
      <div style={{
        backgroundColor: props.backgroundColor,
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        maxWidth: '1200px',
        width: '100%',
        padding: '60px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px'
      }}>
        <ImageGallery {...props} layout="card" />
        <ProductInfo {...props} layout="card" />
      </div>
    </div>
  );
}

// Preset 5: Magazine - Editorial layout
function MagazinePreset(props) {
  return (
    <div style={{
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '80px 40px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '60px'
      }}>
        <div>
          <ImageGallery {...props} layout="magazine" />
        </div>
        <div style={{
          position: 'sticky',
          top: '40px',
          height: 'fit-content'
        }}>
          <ProductInfo {...props} layout="magazine" />
        </div>
      </div>
    </div>
  );
}

// Preset 6: Floating - Image floats over content
function FloatingPreset(props) {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '60px 40px',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center'
      }}>
        <ProductInfo {...props} layout="floating" />
        <div style={{
          position: 'relative',
          transform: props.prefersReducedMotion ? 'none' : 'translateY(-20px)',
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
        }}>
          <ImageGallery {...props} layout="floating" />
        </div>
      </div>
    </div>
  );
}

// Preset 7: Asymmetric - Bold asymmetric grid
function AsymmetricPreset(props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '40% 60%',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: props.surfaceColor,
        padding: '60px 40px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <ProductInfo {...props} layout="asymmetric" />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px'
      }}>
        <ImageGallery {...props} layout="asymmetric" />
      </div>
    </div>
  );
}

// Preset 8: Fullscreen - Cinematic fullscreen
function FullscreenPreset(props) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh'
    }}>
      <div style={{
        flex: '0 0 45%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src={props.images[props.currentImage]}
          alt={props.productName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <ImageThumbnails {...props} position="bottom-left" />
      </div>
      <div style={{
        flex: 1,
        padding: '80px 100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <ProductInfo {...props} layout="fullscreen" />
      </div>
    </div>
  );
}

// Shared Components
function ImageGallery({ images, currentImage, setCurrentImage, layout, prefersReducedMotion }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: layout === 'magazine' ? '75%' : '125%',
        backgroundColor: '#F1F3F5',
        borderRadius: layout === 'card' ? '8px' : '4px',
        overflow: 'hidden'
      }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product view ${index + 1}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: currentImage === index ? 1 : 0,
              transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease-out'
            }}
          />
        ))}
      </div>
      
      {/* Image navigation dots */}
      {layout !== 'immersive' && (
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              aria-label={`View image ${index + 1}`}
              style={{
                width: currentImage === index ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: currentImage === index ? '#495057' : '#DEE2E6',
                cursor: 'pointer',
                transition: 'all 250ms ease-out',
                padding: 0
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ImageThumbnails({ images, currentImage, setCurrentImage, position = "bottom-center" }) {
  const positionStyles = position === "bottom-left" 
    ? { position: 'absolute', bottom: '24px', left: '24px' }
    : { marginTop: '24px', display: 'flex', justifyContent: 'center' };
    
  return (
    <div style={{
      ...positionStyles,
      display: 'flex',
      gap: '12px',
      zIndex: 10
    }}>
      {images.map((img, index) => (
        <button
          key={index}
          onClick={() => setCurrentImage(index)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '4px',
            border: currentImage === index ? '2px solid #FFFFFF' : '2px solid transparent',
            overflow: 'hidden',
            cursor: 'pointer',
            padding: 0,
            opacity: currentImage === index ? 1 : 0.6,
            transition: 'all 200ms ease-out'
          }}
        >
          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      ))}
    </div>
  );
}

function ProductInfo({
  productName,
  productPrice,
  productDescription,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  sizes,
  colors,
  ctaText,
  addedToCart,
  handleAddToCart,
  showSizeSelector,
  showColorSelector,
  showQuantitySelector,
  textColor: defaultTextColor,
  secondaryTextColor,
  tertiaryTextColor,
  accentColor,
  buttonTextColor,
  borderColor,
  productNameFontSize,
  productNameFontWeight,
  priceFontSize,
  descriptionFontSize,
  buttonFontSize,
  layout,
  prefersReducedMotion
}) {
  const textColor = defaultTextColor;
  
  return (
    <div style={{
      animation: prefersReducedMotion ? 'none' : 'slideIn 400ms ease-out 100ms backwards'
    }}>
      <h1 style={{
        fontSize: `${productNameFontSize}px`,
        fontWeight: productNameFontWeight,
        color: textColor,
        margin: '0 0 16px',
        letterSpacing: '0.01em',
        lineHeight: 1.1
      }}>
        {productName}
      </h1>
      
      <p style={{
        fontSize: `${priceFontSize}px`,
        fontWeight: '500',
        color: textColor,
        margin: '0 0 24px'
      }}>
        ${productPrice}
      </p>
      
      <p style={{
        fontSize: `${descriptionFontSize}px`,
        lineHeight: 1.6,
        color: layout === 'immersive' ? 'rgba(255,255,255,0.9)' : secondaryTextColor,
        margin: '0 0 32px'
      }}>
        {productDescription}
      </p>
      
      {/* Color Selector */}
      {showColorSelector && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: layout === 'immersive' ? 'rgba(255,255,255,0.8)' : tertiaryTextColor,
            marginBottom: '12px'
          }}>
            Color
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {colors.map(color => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                aria-label={`Select ${color.name} color`}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  border: selectedColor === color.name 
                    ? `3px solid ${textColor}` 
                    : `2px solid ${borderColor}`,
                  cursor: 'pointer',
                  transition: 'all 200ms ease-out',
                  transform: selectedColor === color.name ? 'scale(1.1)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Size Selector */}
      {showSizeSelector && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: layout === 'immersive' ? 'rgba(255,255,255,0.8)' : tertiaryTextColor,
            marginBottom: '12px'
          }}>
            Size
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: selectedSize === size ? accentColor : 'transparent',
                  color: selectedSize === size ? buttonTextColor : textColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 200ms ease-out'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Quantity Selector */}
      {showQuantitySelector && (
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: layout === 'immersive' ? 'rgba(255,255,255,0.8)' : tertiaryTextColor,
            marginBottom: '12px'
          }}>
            Quantity
          </label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'transparent',
                border: `1px solid ${borderColor}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px',
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 200ms ease-out'
              }}
            >
              −
            </button>
            <span style={{
              fontSize: '16px',
              fontWeight: '500',
              color: textColor,
              minWidth: '30px',
              textAlign: 'center'
            }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'transparent',
                border: `1px solid ${borderColor}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px',
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 200ms ease-out'
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={addedToCart}
        style={{
          width: '100%',
          padding: '18px 32px',
          backgroundColor: addedToCart ? '#10B981' : accentColor,
          color: buttonTextColor,
          border: 'none',
          borderRadius: '6px',
          fontSize: `${buttonFontSize}px`,
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          cursor: addedToCart ? 'default' : 'pointer',
          transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {addedToCart ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
              style={{
                animation: prefersReducedMotion ? 'none' : 'checkmark 500ms ease-out'
              }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Added to Cart
          </span>
        ) : ctaText}
      </button>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
