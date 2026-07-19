import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 21, 2025, 03:31 AM
 * Component Type: Grid.FilterableProducts
 * 
 * User Request: No prompt provided
 * 
 * Design Brief:
 * No design brief provided
 * ============================================================================
 */

const MANIFEST = {
  "type": "Grid.FilterableProducts",
  "description": "Advanced product grid with real-time search, category filtering, multiple sort options, and animated grid transitions",
  "editorElement": {
    "selector": ".product-grid-container",
    "displayName": "Filterable Product Grid",
    "archetype": "container",
    "data": {
      "products": {
        "dataType": "text",
        "displayName": "Products (JSON format: name|category|price|image)",
        "defaultValue": "Wireless Headphones|Electronics|299|https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400,Smart Watch|Electronics|399|https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400,Designer Backpack|Fashion|159|https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400,Leather Wallet|Fashion|89|https://images.unsplash.com/photo-1627123424574-724758594e93?w=400,Desk Lamp|Home|129|https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400,Coffee Maker|Home|199|https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
        "group": "Content"
      },
      "showSearch": {
        "dataType": "booleanValue",
        "displayName": "Show Search Bar",
        "defaultValue": true,
        "group": "Content"
      },
      "searchPlaceholder": {
        "dataType": "text",
        "displayName": "Search Placeholder",
        "defaultValue": "Search products...",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "cardBackgroundColor": {
        "dataType": "color",
        "displayName": "Card Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
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
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "priceColor": {
        "dataType": "color",
        "displayName": "Price Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "filterActiveColor": {
        "dataType": "color",
        "displayName": "Active Filter Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "filterInactiveColor": {
        "dataType": "color",
        "displayName": "Inactive Filter Color",
        "defaultValue": "#CED4DA",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "system-ui",
        "options": ["system-ui", "Inter", "SF Pro Display", "Helvetica Neue"],
        "group": "Typography"
      },
      "nameSize": {
        "dataType": "number",
        "displayName": "Product Name Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "priceSize": {
        "dataType": "number",
        "displayName": "Price Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('name');

  const productsData = (config?.products || "Wireless Headphones|Electronics|299|https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400,Smart Watch|Electronics|399|https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400,Designer Backpack|Fashion|159|https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400,Leather Wallet|Fashion|89|https://images.unsplash.com/photo-1627123424574-724758594e93?w=400,Desk Lamp|Home|129|https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400,Coffee Maker|Home|199|https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400")
    .split(',')
    .map(item => {
      const [name, category, price, image] = item.split('|');
      return { name, category, price: parseFloat(price), image };
    });

  const showSearch = config?.showSearch !== false;
  const searchPlaceholder = config?.searchPlaceholder || "Search products...";
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const cardBackgroundColor = config?.cardBackgroundColor || "#FFFFFF";
  const borderColor = config?.borderColor || "#E9ECEF";
  const textColor = config?.textColor || "#212529";
  const secondaryTextColor = config?.secondaryTextColor || "#6C757D";
  const priceColor = config?.priceColor || "#495057";
  const filterActiveColor = config?.filterActiveColor || "#495057";
  const filterInactiveColor = config?.filterInactiveColor || "#CED4DA";
  const fontFamily = config?.fontFamily || "system-ui";
  const nameSize = config?.nameSize || 16;
  const priceSize = config?.priceSize || 18;

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const filteredProducts = productsData
    .filter(product => 
      (activeCategory === 'All' || product.category === activeCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <div 
      className="product-grid-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '700px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Controls Bar */}
        <div style={{
          backgroundColor: cardBackgroundColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          {/* Search */}
          {showSearch && (
            <div style={{ marginBottom: '24px' }}>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '6px',
                  fontFamily,
                  outline: 'none',
                  transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out'
                }}
                onFocus={(e) => e.target.style.borderColor = filterActiveColor}
                onBlur={(e) => e.target.style.borderColor = borderColor}
              />
            </div>
          )}

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: activeCategory === category ? filterActiveColor : 'transparent',
                  color: activeCategory === category ? '#FFFFFF' : textColor,
                  border: `1px solid ${activeCategory === category ? filterActiveColor : borderColor}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                  fontFamily
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category && !prefersReducedMotion) {
                    e.currentTarget.style.borderColor = filterInactiveColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category) {
                    e.currentTarget.style.borderColor = borderColor;
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: secondaryTextColor
            }}>
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                fontFamily,
                backgroundColor: cardBackgroundColor,
                color: textColor,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{
          marginBottom: '24px',
          fontSize: '14px',
          color: secondaryTextColor
        }}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {filteredProducts.map((product, index) => (
            <div
              key={`${product.name}-${index}`}
              style={{
                backgroundColor: cardBackgroundColor,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                overflow: 'hidden',
                opacity: 0,
                transform: 'translateY(20px)',
                animation: prefersReducedMotion ? 'none' : `productAppear 400ms ease-out ${index * 50}ms forwards`,
                cursor: 'pointer',
                transition: prefersReducedMotion ? 'none' : 'transform 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#F1F3F5',
                overflow: 'hidden'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: prefersReducedMotion ? 'none' : 'transform 300ms ease-out'
                  }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
              
              <div style={{ padding: '16px' }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: secondaryTextColor,
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {product.category}
                </div>
                
                <h3 style={{
                  margin: '0 0 12px 0',
                  fontSize: `${nameSize}px`,
                  fontWeight: '500',
                  color: textColor,
                  lineHeight: '1.3'
                }}>
                  {product.name}
                </h3>
                
                <div style={{
                  fontSize: `${priceSize}px`,
                  fontWeight: '500',
                  color: priceColor
                }}>
                  ${product.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: secondaryTextColor
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
              No products found
            </div>
            <div style={{ fontSize: '14px' }}>
              Try adjusting your search or filters
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes productAppear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
