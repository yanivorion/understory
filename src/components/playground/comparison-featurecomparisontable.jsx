import React from "react";

const MANIFEST = {
  "type": "Comparison.FeatureComparisonTable",
  "description": "Advanced feature comparison table with category filtering and smooth animations",
  "editorElement": {
    "selector": ".feature-comparison-container",
    "displayName": "Feature Comparison Table",
    "archetype": "container",
    "data": {
      "plans": {
        "dataType": "text",
        "displayName": "Plans JSON",
        "defaultValue": '[{"name":"Starter","price":"$29","popular":false},{"name":"Professional","price":"$79","popular":true},{"name":"Enterprise","price":"$199","popular":false}]',
        "group": "Content"
      },
      "categories": {
        "dataType": "text",
        "displayName": "Categories (comma separated)",
        "defaultValue": "Core Features,Advanced Features,Security,Support,Integrations",
        "group": "Content"
      },
      "features": {
        "dataType": "text",
        "displayName": "Features JSON",
        "defaultValue": '[{"name":"Users","category":"Core Features","values":["10","50","Unlimited"]},{"name":"Storage","category":"Core Features","values":["50GB","500GB","Unlimited"]},{"name":"Projects","category":"Core Features","values":["5","50","Unlimited"]},{"name":"API Access","category":"Advanced Features","values":[false,true,true]},{"name":"Custom Domain","category":"Advanced Features","values":[false,true,true]},{"name":"Advanced Analytics","category":"Advanced Features","values":[false,true,true]},{"name":"White Label","category":"Advanced Features","values":[false,false,true]},{"name":"SSO","category":"Security","values":[false,false,true]},{"name":"2FA","category":"Security","values":[false,true,true]},{"name":"Audit Logs","category":"Security","values":[false,false,true]},{"name":"Email Support","category":"Support","values":[true,true,true]},{"name":"Priority Support","category":"Support","values":[false,true,true]},{"name":"Dedicated Manager","category":"Support","values":[false,false,true]},{"name":"Slack Integration","category":"Integrations","values":[true,true,true]},{"name":"API Webhooks","category":"Integrations","values":[false,true,true]},{"name":"Custom Integrations","category":"Integrations","values":[false,false,true]}]',
        "group": "Content"
      },
      "showAllCategory": {
        "dataType": "text",
        "displayName": "Show All Category Label",
        "defaultValue": "All Features",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "tableBackgroundColor": {
        "dataType": "color",
        "displayName": "Table Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "headerBackgroundColor": {
        "dataType": "color",
        "displayName": "Header Background",
        "defaultValue": "#F8F8F8",
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
      "checkmarkColor": {
        "dataType": "color",
        "displayName": "Checkmark Color",
        "defaultValue": "#10B981",
        "group": "Colors"
      },
      "xMarkColor": {
        "dataType": "color",
        "displayName": "X Mark Color",
        "defaultValue": "#EF4444",
        "group": "Colors"
      },
      "popularBadgeColor": {
        "dataType": "color",
        "displayName": "Popular Badge Color",
        "defaultValue": "#1A1A1A",
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
      "planNameSize": {
        "dataType": "select",
        "displayName": "Plan Name Font Size",
        "defaultValue": "18px",
        "options": ["16px", "18px", "20px", "24px"],
        "group": "Typography"
      },
      "priceSize": {
        "dataType": "select",
        "displayName": "Price Font Size",
        "defaultValue": "28px",
        "options": ["24px", "28px", "32px", "36px"],
        "group": "Typography"
      },
      "featureSize": {
        "dataType": "select",
        "displayName": "Feature Font Size",
        "defaultValue": "14px",
        "options": ["12px", "14px", "16px"],
        "group": "Typography"
      },
      "cellPadding": {
        "dataType": "select",
        "displayName": "Cell Padding",
        "defaultValue": "16px",
        "options": ["12px", "16px", "20px", "24px"],
        "group": "Layout"
      },
      "tableMaxWidth": {
        "dataType": "select",
        "displayName": "Table Max Width",
        "defaultValue": "1200px",
        "options": ["1000px", "1200px", "1400px", "100%"],
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
        "displayName": "Show Table Shadow",
        "defaultValue": "true",
        "group": "Layout"
      },
      "stickyHeader": {
        "dataType": "booleanValue",
        "displayName": "Sticky Header",
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
        "displayName": "Row Stagger Delay (ms)",
        "defaultValue": "30",
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
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const rowRefs = React.useRef([]);

  // Safe config extraction
  const plans = React.useMemo(() => {
    try {
      return JSON.parse(config?.plans || MANIFEST.editorElement.data.plans.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.plans.defaultValue);
    }
  }, [config?.plans]);

  const categories = React.useMemo(() => {
    const cats = (config?.categories || MANIFEST.editorElement.data.categories.defaultValue).split(',').map(c => c.trim());
    return cats;
  }, [config?.categories]);

  const features = React.useMemo(() => {
    try {
      return JSON.parse(config?.features || MANIFEST.editorElement.data.features.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.features.defaultValue);
    }
  }, [config?.features]);

  const transitionDuration = parseInt(config?.transitionDuration || '300');
  const staggerDelay = parseInt(config?.staggerDelay || '30');
  const stickyHeader = config?.stickyHeader !== false;

  // Filter features by category
  const filteredFeatures = React.useMemo(() => {
    if (activeCategory === 'all') return features;
    return features.filter(f => f.category === activeCategory);
  }, [activeCategory, features]);

  // PATTERN 6: Auto-animation for filtered rows (PATTERN 1: Direct DOM)
  React.useEffect(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    rowRefs.current.forEach((row, index) => {
      if (!row) return;

      setTimeout(() => {
        row.animate([
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: transitionDuration,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        });
      }, index * staggerDelay);
    });

    const totalDuration = filteredFeatures.length * staggerDelay + transitionDuration;
    setTimeout(() => setIsTransitioning(false), totalDuration);

  }, [activeCategory, transitionDuration, staggerDelay, filteredFeatures.length]);

  const handleCategoryChange = (category) => {
    if (category === activeCategory || isTransitioning) return;
    setActiveCategory(category);
  };

  const styles = {
    container: {
      width: '100%',
      minHeight: '600px',
      padding: '64px 24px',
      backgroundColor: config?.backgroundColor || '#FAFAFA',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif'
    },
    inner: {
      maxWidth: config?.tableMaxWidth || '1200px',
      margin: '0 auto'
    },
    categoryNav: {
      display: 'flex',
      gap: '8px',
      marginBottom: '32px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    categoryButton: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '500',
      color: config?.secondaryTextColor || '#6B6B6B',
      backgroundColor: 'transparent',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: '50px',
      cursor: 'pointer',
      transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      outline: 'none',
      whiteSpace: 'nowrap'
    },
    categoryButtonActive: {
      backgroundColor: config?.accentColor || '#1A1A1A',
      color: '#FFFFFF',
      borderColor: config?.accentColor || '#1A1A1A'
    },
    tableWrapper: {
      backgroundColor: config?.tableBackgroundColor || '#FFFFFF',
      borderRadius: config?.borderRadius || '8px',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      boxShadow: (config?.showShadow !== false) ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
      overflow: 'hidden'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    thead: {
      backgroundColor: config?.headerBackgroundColor || '#F8F8F8',
      position: stickyHeader ? 'sticky' : 'relative',
      top: stickyHeader ? '0' : 'auto',
      zIndex: stickyHeader ? '10' : 'auto'
    },
    headerCell: {
      padding: config?.cellPadding || '16px',
      textAlign: 'center',
      borderBottom: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      verticalAlign: 'bottom'
    },
    planName: {
      fontSize: config?.planNameSize || '18px',
      fontWeight: '500',
      color: config?.primaryTextColor || '#1A1A1A',
      marginBottom: '8px',
      display: 'block'
    },
    price: {
      fontSize: config?.priceSize || '28px',
      fontWeight: '300',
      color: config?.primaryTextColor || '#1A1A1A',
      display: 'block'
    },
    period: {
      fontSize: '14px',
      fontWeight: '400',
      color: config?.secondaryTextColor || '#6B6B6B',
      display: 'block',
      marginTop: '4px'
    },
    popularBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      backgroundColor: config?.popularBadgeColor || '#1A1A1A',
      color: '#FFFFFF',
      fontSize: '11px',
      fontWeight: '500',
      borderRadius: '4px',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      marginBottom: '8px'
    },
    row: {
      borderBottom: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      transition: `background-color ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      opacity: 0
    },
    featureCell: {
      padding: config?.cellPadding || '16px',
      fontSize: config?.featureSize || '14px',
      color: config?.primaryTextColor || '#1A1A1A',
      fontWeight: '500',
      textAlign: 'left'
    },
    valueCell: {
      padding: config?.cellPadding || '16px',
      textAlign: 'center',
      fontSize: config?.featureSize || '14px',
      color: config?.secondaryTextColor || '#6B6B6B'
    },
    iconWrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  const renderValue = (value) => {
    if (value === true) {
      return (
        <span style={styles.iconWrapper}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" fill={config?.checkmarkColor || '#10B981'} opacity="0.2" />
            <path d="M6 10l3 3 5-6" stroke={config?.checkmarkColor || '#10B981'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      );
    }
    
    if (value === false) {
      return (
        <span style={styles.iconWrapper}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" fill={config?.xMarkColor || '#EF4444'} opacity="0.2" />
            <path d="M7 7l6 6M13 7l-6 6" stroke={config?.xMarkColor || '#EF4444'} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      );
    }

    return <span style={{ fontWeight: '500', color: config?.primaryTextColor || '#1A1A1A' }}>{value}</span>;
  };

  return (
    <div style={styles.container} className="feature-comparison-container">
      <div style={styles.inner}>
        <div style={styles.categoryNav}>
          <button
            style={{
              ...styles.categoryButton,
              ...(activeCategory === 'all' ? styles.categoryButtonActive : {})
            }}
            onClick={() => handleCategoryChange('all')}
            onMouseEnter={(e) => {
              if (activeCategory !== 'all') {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 'all') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {config?.showAllCategory || 'All Features'}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              style={{
                ...styles.categoryButton,
                ...(activeCategory === category ? styles.categoryButtonActive : {})
              }}
              onClick={() => handleCategoryChange(category)}
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

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={{...styles.headerCell, textAlign: 'left'}}>Features</th>
                {plans.map((plan, idx) => (
                  <th key={idx} style={styles.headerCell}>
                    {plan.popular && (
                      <span style={styles.popularBadge}>Most Popular</span>
                    )}
                    <span style={styles.planName}>{plan.name}</span>
                    <span style={styles.price}>{plan.price}</span>
                    <span style={styles.period}>/month</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredFeatures.map((feature, idx) => (
                <tr
                  key={`${activeCategory}-${feature.name}`}
                  ref={el => rowRefs.current[idx] = el}
                  style={styles.row}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={styles.featureCell}>{feature.name}</td>
                  {feature.values.map((value, vIdx) => (
                    <td key={vIdx} style={styles.valueCell}>
                      {renderValue(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
