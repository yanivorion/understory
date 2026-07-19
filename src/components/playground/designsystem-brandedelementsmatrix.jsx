import React from "react";

const MANIFEST = {
  "type": "DesignSystem.BrandedElementsMatrix",
  "description": "Interactive matrix grid showing elements in a comparison table format",
  "editorElement": {
    "selector": ".branded-elements-matrix",
    "displayName": "Branded Elements Matrix",
    "archetype": "container",
    "data": {
      "sectionTitle": {
        "dataType": "text",
        "displayName": "Section Title",
        "defaultValue": "Element Matrix",
        "group": "Content"
      },
      "showRowLabels": {
        "dataType": "booleanValue",
        "displayName": "Show Row Labels",
        "defaultValue": true,
        "group": "Content"
      },
      "showColumnLabels": {
        "dataType": "booleanValue",
        "displayName": "Show Column Labels",
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
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "cellBackgroundColor": {
        "dataType": "color",
        "displayName": "Cell Background",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "headerBackgroundColor": {
        "dataType": "color",
        "displayName": "Header Background",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Base Font Size (px)",
        "defaultValue": 13,
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "vertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [hoveredCell, setHoveredCell] = React.useState(null);

  // Safe config access with defaults
  const sectionTitle = config?.sectionTitle || 'Element Matrix';
  const showRowLabels = config?.showRowLabels !== false;
  const showColumnLabels = config?.showColumnLabels !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const secondaryTextColor = config?.secondaryTextColor || '#6C757D';
  const cellBackgroundColor = config?.cellBackgroundColor || '#F8F9FA';
  const borderColor = config?.borderColor || '#E9ECEF';
  const headerBackgroundColor = config?.headerBackgroundColor || '#212529';
  const fontSize = parseInt(config?.fontSize || '13');

  // Matrix data
  const rowLabels = ['Typography', 'Interactive', 'Elements'];
  const columnLabels = ['Primary', 'Secondary', 'Tertiary'];
  
  const matrixData = {
    'Typography-Primary': { icon: 'H1', label: 'Heading 1', specs: '88/88' },
    'Typography-Secondary': { icon: 'H2', label: 'Heading 2', specs: '64/72' },
    'Typography-Tertiary': { icon: 'P2', label: 'Paragraph 2', specs: '16/20' },
    'Interactive-Primary': { icon: '●', label: 'Primary Button', specs: 'Filled' },
    'Interactive-Secondary': { icon: '○', label: 'Secondary Button', specs: 'Outlined' },
    'Interactive-Tertiary': { icon: '◐', label: 'Tertiary Button', specs: 'Ghost' },
    'Elements-Primary': { icon: '▢', label: 'Box 1', specs: 'Container' },
    'Elements-Secondary': { icon: '▣', label: 'Box 2', specs: 'Container' },
    'Elements-Tertiary': { icon: '—', label: 'Line 1', specs: '1px' }
  };

  const handleCellClick = (row, col) => {
    const key = `${row}-${col}`;
    console.log(`Clicked: ${key}`, matrixData[key]);
  };

  const containerStyle = {
    backgroundColor,
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: textColor,
    fontSize: `${fontSize}px`
  };

  const titleStyle = {
    fontSize: `${fontSize + 8}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '24px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0'
  };

  const headerCellStyle = {
    padding: '12px 16px',
    backgroundColor: headerBackgroundColor,
    color: '#FFFFFF',
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    textAlign: 'center',
    borderRight: `1px solid ${borderColor}`,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const rowLabelCellStyle = {
    padding: '12px 16px',
    backgroundColor: headerBackgroundColor,
    color: '#FFFFFF',
    fontSize: `${fontSize}px`,
    fontWeight: '500',
    borderBottom: `1px solid ${borderColor}`,
    whiteSpace: 'nowrap'
  };

  const getCellStyle = (key) => ({
    padding: '20px',
    backgroundColor: hoveredCell === key ? '#FFFFFF' : cellBackgroundColor,
    border: `1px solid ${borderColor}`,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    boxShadow: hoveredCell === key ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
    position: 'relative'
  });

  const cellIconStyle = {
    fontSize: `${fontSize + 16}px`,
    fontWeight: '500',
    color: textColor,
    marginBottom: '8px'
  };

  const cellLabelStyle = {
    fontSize: `${fontSize}px`,
    color: textColor,
    marginBottom: '4px',
    fontWeight: '500'
  };

  const cellSpecsStyle = {
    fontSize: `${fontSize - 2}px`,
    color: secondaryTextColor
  };

  return (
    <div className="branded-elements-matrix" style={containerStyle}>
      <div style={titleStyle}>{sectionTitle}</div>

      <table style={tableStyle}>
        {/* Column Headers */}
        {showColumnLabels && (
          <thead>
            <tr>
              {showRowLabels && <th style={headerCellStyle}></th>}
              {columnLabels.map((col) => (
                <th key={col} style={headerCellStyle}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
        )}

        {/* Matrix Body */}
        <tbody>
          {rowLabels.map((row) => (
            <tr key={row}>
              {showRowLabels && (
                <td style={rowLabelCellStyle}>{row}</td>
              )}
              {columnLabels.map((col) => {
                const key = `${row}-${col}`;
                const cell = matrixData[key];
                return (
                  <td
                    key={key}
                    style={getCellStyle(key)}
                    onMouseEnter={() => setHoveredCell(key)}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => handleCellClick(row, col)}
                  >
                    {cell && (
                      <>
                        <div style={cellIconStyle}>{cell.icon}</div>
                        <div style={cellLabelStyle}>{cell.label}</div>
                        <div style={cellSpecsStyle}>{cell.specs}</div>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
