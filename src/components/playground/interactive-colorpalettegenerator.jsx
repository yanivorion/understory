import React from "react";

const MANIFEST = {
  "type": "Interactive.ColorPaletteGenerator",
  "description": "Color palette generator that creates harmonious color schemes with multiple algorithms",
  "editorElement": {
    "selector": ".color-palette-generator",
    "displayName": "Color Palette Generator",
    "archetype": "container",
    "data": {
      "baseColor": {
        "dataType": "color",
        "displayName": "Base Color",
        "defaultValue": "#3B82F6",
        "group": "Content"
      },
      "scheme": {
        "dataType": "select",
        "displayName": "Color Scheme",
        "defaultValue": "complementary",
        "options": ["monochromatic", "complementary", "analogous", "triadic", "tetradic", "split-complementary"],
        "group": "Content"
      },
      "colorCount": {
        "dataType": "select",
        "displayName": "Colors Per Scheme",
        "defaultValue": "5",
        "options": ["3", "5", "7"],
        "group": "Content"
      },
      "showHex": {
        "dataType": "booleanValue",
        "displayName": "Show Hex Values",
        "defaultValue": true,
        "group": "Content"
      },
      "showRgb": {
        "dataType": "booleanValue",
        "displayName": "Show RGB Values",
        "defaultValue": false,
        "group": "Content"
      },
      "enableCopy": {
        "dataType": "booleanValue",
        "displayName": "Enable Copy to Clipboard",
        "defaultValue": true,
        "group": "Content"
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
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
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
  const baseColor = config?.baseColor || '#3B82F6';
  const scheme = config?.scheme || 'complementary';
  const colorCount = parseInt(config?.colorCount || '5');
  const showHex = config?.showHex !== false;
  const showRgb = config?.showRgb === true;
  const enableCopy = config?.enableCopy !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const accentColor = config?.accentColor || '#495057';
  
  const [currentBase, setCurrentBase] = React.useState(baseColor);
  const [palette, setPalette] = React.useState([]);
  const [copiedIndex, setCopiedIndex] = React.useState(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const hexToHsl = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  };
  
  const hslToHex = (h, s, l) => {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return '#' + toHex(r) + toHex(g) + toHex(b);
  };
  
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  
  const generatePalette = (base, schemeType, count) => {
    const hsl = hexToHsl(base);
    const colors = [];
    
    switch (schemeType) {
      case 'monochromatic':
        for (let i = 0; i < count; i++) {
          const l = 20 + (i * (60 / (count - 1)));
          colors.push(hslToHex(hsl.h, hsl.s, l));
        }
        break;
        
      case 'complementary':
        colors.push(base);
        const compH = (hsl.h + 180) % 360;
        for (let i = 1; i < count; i++) {
          const l = 30 + (i * (40 / (count - 1)));
          colors.push(hslToHex(compH, hsl.s, l));
        }
        break;
        
      case 'analogous':
        const analogDiff = 30;
        for (let i = 0; i < count; i++) {
          const offset = (i - Math.floor(count / 2)) * analogDiff;
          const h = (hsl.h + offset + 360) % 360;
          colors.push(hslToHex(h, hsl.s, hsl.l));
        }
        break;
        
      case 'triadic':
        colors.push(base);
        colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
        while (colors.length < count) {
          const h = (hsl.h + (colors.length * 40)) % 360;
          colors.push(hslToHex(h, hsl.s * 0.7, hsl.l * 1.1));
        }
        break;
        
      case 'tetradic':
        colors.push(base);
        colors.push(hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l));
        while (colors.length < count) {
          colors.push(hslToHex((hsl.h + (colors.length * 30)) % 360, hsl.s * 0.8, hsl.l));
        }
        break;
        
      case 'split-complementary':
        colors.push(base);
        colors.push(hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l));
        while (colors.length < count) {
          const h = (hsl.h + (colors.length * 25)) % 360;
          colors.push(hslToHex(h, hsl.s * 0.75, hsl.l * 1.05));
        }
        break;
    }
    
    return colors.slice(0, count);
  };
  
  React.useEffect(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPalette = generatePalette(currentBase, scheme, colorCount);
      setPalette(newPalette);
      setIsGenerating(false);
    }, prefersReducedMotion ? 0 : 300);
  }, [currentBase, scheme, colorCount]);
  
  const copyToClipboard = (color, index) => {
    if (!enableCopy) return;
    
    navigator.clipboard.writeText(color).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };
  
  const randomizeBase = () => {
    const h = Math.floor(Math.random() * 360);
    const s = 60 + Math.floor(Math.random() * 30);
    const l = 45 + Math.floor(Math.random() * 20);
    const newColor = hslToHex(h, s, l);
    setCurrentBase(newColor);
  };
  
  const schemeDescriptions = {
    monochromatic: 'Single hue with varying lightness',
    complementary: 'Opposite colors on the color wheel',
    analogous: 'Adjacent colors on the color wheel',
    triadic: 'Three colors evenly spaced',
    tetradic: 'Four colors in two complementary pairs',
    'split-complementary': 'Base color with two adjacent to complement'
  };
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <div style={{
          padding: '32px',
          backgroundColor: `${accentColor}08`,
          borderRadius: '12px',
          border: `1px solid ${accentColor}20`,
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '500',
            color: textColor,
            marginBottom: '8px',
            letterSpacing: '-0.01em'
          }}>
            Color Palette Generator
          </h2>
          <p style={{
            fontSize: '14px',
            color: accentColor,
            marginBottom: '24px'
          }}>
            {schemeDescriptions[scheme]}
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: accentColor,
                marginBottom: '8px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Base Color
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="color"
                  value={currentBase}
                  onChange={(e) => setCurrentBase(e.target.value)}
                  style={{
                    width: '60px',
                    height: '44px',
                    border: `2px solid ${accentColor}30`,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                />
                <input
                  type="text"
                  value={currentBase.toUpperCase()}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      setCurrentBase(e.target.value);
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '0 12px',
                    fontSize: '14px',
                    fontFamily: '"SF Mono", Monaco, monospace',
                    border: `2px solid ${accentColor}30`,
                    borderRadius: '8px',
                    backgroundColor: backgroundColor,
                    color: textColor,
                    outline: 'none'
                  }}
                />
              </div>
            </div>
            
            <button
              onClick={randomizeBase}
              style={{
                padding: '12px 24px',
                backgroundColor: accentColor,
                color: backgroundColor,
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 200ms ease-out',
                alignSelf: 'flex-end'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🎲 Randomize
            </button>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px',
            opacity: isGenerating ? 0.5 : 1,
            transition: 'opacity 300ms ease-out'
          }}>
            {palette.map((color, index) => {
              const rgb = hexToRgb(color);
              const isCopied = copiedIndex === index;
              
              return (
                <div
                  key={index}
                  onClick={() => copyToClipboard(color, index)}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    backgroundColor: color,
                    borderRadius: '12px',
                    cursor: enableCopy ? 'pointer' : 'default',
                    transition: 'transform 200ms ease-out',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    opacity: prefersReducedMotion ? 1 : 1,
                    animation: prefersReducedMotion ? 'none' : `fadeIn 400ms ease-out ${index * 80}ms backwards`
                  }}
                  onMouseEnter={(e) => {
                    if (enableCopy) {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '6px 12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontFamily: '"SF Mono", Monaco, monospace',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(8px)'
                  }}>
                    {isCopied ? '✓ Copied!' : (showHex ? color.toUpperCase() : '')}
                    {showRgb && !isCopied && <div style={{ fontSize: '10px', marginTop: '2px' }}>
                      rgb({rgb.r}, {rgb.g}, {rgb.b})
                    </div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div style={{
          padding: '20px',
          backgroundColor: `${accentColor}08`,
          borderRadius: '12px',
          border: `1px solid ${accentColor}20`,
          fontSize: '13px',
          color: accentColor
        }}>
          <div style={{ fontWeight: '500', marginBottom: '8px' }}>
            Export Palette
          </div>
          <div style={{
            padding: '12px',
            backgroundColor: backgroundColor,
            borderRadius: '6px',
            fontFamily: '"SF Mono", Monaco, monospace',
            fontSize: '12px',
            wordBreak: 'break-all',
            color: textColor
          }}>
            {JSON.stringify(palette)}
          </div>
        </div>
        
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
