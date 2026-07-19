import React from "react";

const MANIFEST = {
  "type": "Table.AdvancedDataTable",
  "description": "Advanced data table with sorting, filtering, pagination, and bulk actions",
  "editorElement": {
    "selector": ".data-table-container",
    "displayName": "Advanced Data Table",
    "archetype": "container",
    "data": {
      "columns": {
        "dataType": "text",
        "displayName": "Columns JSON",
        "defaultValue": '[{"key":"name","label":"Name","sortable":true,"filterable":true},{"key":"email","label":"Email","sortable":true,"filterable":true},{"key":"role","label":"Role","sortable":true,"filterable":true},{"key":"status","label":"Status","sortable":true,"filterable":true},{"key":"joinDate","label":"Join Date","sortable":true,"filterable":false}]',
        "group": "Content"
      },
      "data": {
        "dataType": "text",
        "displayName": "Data JSON",
        "defaultValue": '[{"id":1,"name":"Alice Johnson","email":"alice@example.com","role":"Admin","status":"Active","joinDate":"2024-01-15"},{"id":2,"name":"Bob Smith","email":"bob@example.com","role":"Editor","status":"Active","joinDate":"2024-02-20"},{"id":3,"name":"Carol White","email":"carol@example.com","role":"Viewer","status":"Inactive","joinDate":"2024-03-10"},{"id":4,"name":"David Brown","email":"david@example.com","role":"Admin","status":"Active","joinDate":"2024-01-25"},{"id":5,"name":"Eve Davis","email":"eve@example.com","role":"Editor","status":"Active","joinDate":"2024-04-05"},{"id":6,"name":"Frank Miller","email":"frank@example.com","role":"Viewer","status":"Inactive","joinDate":"2024-05-12"},{"id":7,"name":"Grace Lee","email":"grace@example.com","role":"Admin","status":"Active","joinDate":"2024-02-28"},{"id":8,"name":"Henry Wilson","email":"henry@example.com","role":"Editor","status":"Active","joinDate":"2024-03-15"}]',
        "group": "Content"
      },
      "itemsPerPage": {
        "dataType": "select",
        "displayName": "Items Per Page",
        "defaultValue": "5",
        "options": ["5", "10", "20", "50"],
        "group": "Content"
      },
      "enableSelection": {
        "dataType": "booleanValue",
        "displayName": "Enable Row Selection",
        "defaultValue": "true",
        "group": "Content"
      },
      "enableExport": {
        "dataType": "booleanValue",
        "displayName": "Enable CSV Export",
        "defaultValue": "true",
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
      "hoverColor": {
        "dataType": "color",
        "displayName": "Row Hover Color",
        "defaultValue": "rgba(0,0,0,0.02)",
        "group": "Colors"
      },
      "selectedColor": {
        "dataType": "color",
        "displayName": "Selected Row Color",
        "defaultValue": "rgba(0,0,0,0.03)",
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
      "headerSize": {
        "dataType": "select",
        "displayName": "Header Font Size",
        "defaultValue": "13px",
        "options": ["11px", "12px", "13px", "14px"],
        "group": "Typography"
      },
      "cellSize": {
        "dataType": "select",
        "displayName": "Cell Font Size",
        "defaultValue": "14px",
        "options": ["12px", "13px", "14px", "15px"],
        "group": "Typography"
      },
      "cellPadding": {
        "dataType": "select",
        "displayName": "Cell Padding",
        "defaultValue": "12px 16px",
        "options": ["8px 12px", "10px 14px", "12px 16px", "14px 18px"],
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
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState(new Set());

  // Safe config extraction
  const columns = React.useMemo(() => {
    try {
      return JSON.parse(config?.columns || MANIFEST.editorElement.data.columns.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.columns.defaultValue);
    }
  }, [config?.columns]);

  const rawData = React.useMemo(() => {
    try {
      return JSON.parse(config?.data || MANIFEST.editorElement.data.data.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.data.defaultValue);
    }
  }, [config?.data]);

  const itemsPerPage = parseInt(config?.itemsPerPage || '5');
  const enableSelection = config?.enableSelection !== false;
  const enableExport = config?.enableExport !== false;
  const stickyHeader = config?.stickyHeader !== false;

  // Filter data
  const filteredData = React.useMemo(() => {
    return rawData.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(row[key]).toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [rawData, filters]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle filter
  const handleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Handle selection
  const toggleRow = (id) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(row => row.id)));
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = columns.map(col => col.label).join(',');
    const rows = sortedData.map(row => 
      columns.map(col => `"${row[col.key]}"`).join(',')
    ).join('\n');
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      padding: '48px 24px',
      backgroundColor: config?.backgroundColor || '#FAFAFA',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif'
    },
    inner: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '12px'
    },
    toolbarLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    toolbarRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    button: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '500',
      backgroundColor: config?.accentColor || '#1A1A1A',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: config?.borderRadius || '8px',
      cursor: 'pointer',
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      outline: 'none'
    },
    tableWrapper: {
      backgroundColor: config?.tableBackgroundColor || '#FFFFFF',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      overflow: 'hidden',
      boxShadow: (config?.showShadow !== false) ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
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
    th: {
      padding: config?.cellPadding || '12px 16px',
      textAlign: 'left',
      fontSize: config?.headerSize || '13px',
      fontWeight: '500',
      color: config?.secondaryTextColor || '#6B6B6B',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      cursor: 'pointer',
      userSelect: 'none',
      whiteSpace: 'nowrap'
    },
    sortable: {
      cursor: 'pointer'
    },
    filterInput: {
      width: '100%',
      marginTop: '8px',
      padding: '6px 8px',
      fontSize: '12px',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: '4px',
      outline: 'none',
      fontFamily: 'inherit'
    },
    td: {
      padding: config?.cellPadding || '12px 16px',
      fontSize: config?.cellSize || '14px',
      color: config?.primaryTextColor || '#1A1A1A',
      borderBottom: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`
    },
    tr: {
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      accentColor: config?.accentColor || '#1A1A1A'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '24px',
      flexWrap: 'wrap'
    },
    pageButton: {
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: '400',
      backgroundColor: 'transparent',
      color: config?.primaryTextColor || '#1A1A1A',
      border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
      borderRadius: config?.borderRadius || '8px',
      cursor: 'pointer',
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      outline: 'none',
      minWidth: '36px'
    },
    pageButtonActive: {
      backgroundColor: config?.accentColor || '#1A1A1A',
      color: '#FFFFFF',
      borderColor: config?.accentColor || '#1A1A1A'
    },
    pageInfo: {
      fontSize: '14px',
      color: config?.secondaryTextColor || '#6B6B6B',
      padding: '0 12px'
    }
  };

  return (
    <div style={styles.container} className="data-table-container">
      <div style={styles.inner}>
        <div style={styles.toolbar}>
          <div style={styles.toolbarLeft}>
            {enableSelection && selectedRows.size > 0 && (
              <span style={{fontSize: '14px', color: config?.secondaryTextColor || '#6B6B6B'}}>
                {selectedRows.size} selected
              </span>
            )}
          </div>
          <div style={styles.toolbarRight}>
            {enableExport && (
              <button
                style={styles.button}
                onClick={exportToCSV}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Export CSV
              </button>
            )}
          </div>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                {enableSelection && (
                  <th style={{...styles.th, width: '48px'}}>
                    <input
                      type="checkbox"
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      onChange={toggleAll}
                      style={styles.checkbox}
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{...styles.th, ...(col.sortable ? styles.sortable : {})}}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span>{col.label}</span>
                      {col.sortable && sortConfig.key === col.key && (
                        <span style={{fontSize: '12px'}}>
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                    {col.filterable && (
                      <input
                        type="text"
                        placeholder={`Filter ${col.label}...`}
                        value={filters[col.key] || ''}
                        onChange={(e) => handleFilter(col.key, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        style={styles.filterInput}
                        onFocus={(e) => {
                          e.target.style.borderColor = config?.accentColor || '#1A1A1A';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = config?.borderColor || 'rgba(0,0,0,0.08)';
                        }}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  style={styles.tr}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = selectedRows.has(row.id)
                      ? config?.selectedColor || 'rgba(0,0,0,0.03)'
                      : config?.hoverColor || 'rgba(0,0,0,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = selectedRows.has(row.id)
                      ? config?.selectedColor || 'rgba(0,0,0,0.03)'
                      : 'transparent';
                  }}
                >
                  {enableSelection && (
                    <td style={styles.td}>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => toggleRow(row.id)}
                        style={styles.checkbox}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} style={styles.td}>
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              style={styles.pageButton}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ←
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  style={{
                    ...styles.pageButton,
                    ...(currentPage === pageNum ? styles.pageButtonActive : {})
                  }}
                  onClick={() => setCurrentPage(pageNum)}
                  onMouseEnter={(e) => {
                    if (currentPage !== pageNum) {
                      e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== pageNum) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              style={styles.pageButton}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              →
            </button>

            <span style={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
