import React from "react";

const MANIFEST = {
  "type": "Table.InteractiveDataTable",
  "description": "Advanced data table with multi-column sorting, pagination, row selection, search filtering, and inline interactions",
  "editorElement": {
    "selector": ".data-table-container",
    "displayName": "Interactive Data Table",
    "archetype": "container",
    "data": {
      "tableData": {
        "dataType": "text",
        "displayName": "Table Data (CSV format: Name,Email,Role,Status)",
        "defaultValue": "Sarah Chen,sarah.chen@company.com,Product Manager,Active,Emma Wilson,emma.wilson@company.com,Senior Designer,Active,Michael Torres,michael.torres@company.com,Frontend Developer,Active,James Kumar,james.kumar@company.com,Backend Developer,Inactive,Lisa Anderson,lisa.anderson@company.com,UX Researcher,Active,David Park,david.park@company.com,Data Analyst,Active,Rachel Green,rachel.green@company.com,Marketing Lead,Active,Alex Johnson,alex.johnson@company.com,DevOps Engineer,Inactive,Maria Garcia,maria.garcia@company.com,Content Strategist,Active,Kevin Brown,kevin.brown@company.com,Sales Manager,Active",
        "group": "Content"
      },
      "rowsPerPage": {
        "dataType": "select",
        "displayName": "Rows Per Page",
        "defaultValue": "5",
        "options": ["5", "10", "15", "20"],
        "group": "Content"
      },
      "showSearch": {
        "dataType": "booleanValue",
        "displayName": "Show Search",
        "defaultValue": true,
        "group": "Content"
      },
      "showSelection": {
        "dataType": "booleanValue",
        "displayName": "Show Row Selection",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "tableBackgroundColor": {
        "dataType": "color",
        "displayName": "Table Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "headerBackgroundColor": {
        "dataType": "color",
        "displayName": "Header Background Color",
        "defaultValue": "#F8F9FA",
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
      "hoverColor": {
        "dataType": "color",
        "displayName": "Row Hover Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "selectedColor": {
        "dataType": "color",
        "displayName": "Selected Row Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "activeStatusColor": {
        "dataType": "color",
        "displayName": "Active Status Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "inactiveStatusColor": {
        "dataType": "color",
        "displayName": "Inactive Status Color",
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
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 14,
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
  const [sortColumn, setSortColumn] = React.useState('');
  const [sortDirection, setSortDirection] = React.useState('asc');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState(new Set());

  const rawData = (config?.tableData || "Sarah Chen,sarah.chen@company.com,Product Manager,Active").split(',');
  const tableData = [];
  for (let i = 0; i < rawData.length; i += 4) {
    if (rawData[i]) {
      tableData.push({
        name: rawData[i] || '',
        email: rawData[i + 1] || '',
        role: rawData[i + 2] || '',
        status: rawData[i + 3] || 'Active'
      });
    }
  }

  const rowsPerPage = parseInt(config?.rowsPerPage || "5");
  const showSearch = config?.showSearch !== false;
  const showSelection = config?.showSelection !== false;
  const backgroundColor = config?.backgroundColor || "#F8F9FA";
  const tableBackgroundColor = config?.tableBackgroundColor || "#FFFFFF";
  const headerBackgroundColor = config?.headerBackgroundColor || "#F8F9FA";
  const borderColor = config?.borderColor || "#E9ECEF";
  const textColor = config?.textColor || "#212529";
  const secondaryTextColor = config?.secondaryTextColor || "#6C757D";
  const hoverColor = config?.hoverColor || "#F8F9FA";
  const selectedColor = config?.selectedColor || "#E9ECEF";
  const activeStatusColor = config?.activeStatusColor || "#495057";
  const inactiveStatusColor = config?.inactiveStatusColor || "#CED4DA";
  const fontFamily = config?.fontFamily || "system-ui";
  const fontSize = config?.fontSize || 14;

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const filteredData = tableData.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const toggleRowSelection = (index) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((_, i) => startIndex + i)));
    }
  };

  return (
    <div 
      className="data-table-container"
      style={{
        backgroundColor,
        padding: '48px 24px',
        fontFamily,
        minHeight: '700px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: tableBackgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {/* Header with Search */}
        {showSearch && (
          <div style={{
            padding: '20px',
            borderBottom: `1px solid ${borderColor}`
          }}>
            <input
              type="text"
              placeholder="Search table..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                maxWidth: '300px',
                padding: '10px 16px',
                fontSize: `${fontSize}px`,
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                fontFamily,
                outline: 'none',
                transition: prefersReducedMotion ? 'none' : 'border-color 200ms ease-out'
              }}
              onFocus={(e) => e.target.style.borderColor = textColor}
              onBlur={(e) => e.target.style.borderColor = borderColor}
            />
            
            {selectedRows.size > 0 && (
              <div style={{
                marginTop: '12px',
                fontSize: '13px',
                color: secondaryTextColor
              }}>
                {selectedRows.size} row{selectedRows.size !== 1 ? 's' : ''} selected
              </div>
            )}
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                backgroundColor: headerBackgroundColor,
                borderBottom: `2px solid ${borderColor}`
              }}>
                {showSelection && (
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    width: '50px'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      onChange={toggleSelectAll}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                )}
                {['Name', 'Email', 'Role', 'Status'].map((header, i) => {
                  const column = header.toLowerCase();
                  return (
                    <th
                      key={i}
                      onClick={() => handleSort(column)}
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontSize: `${fontSize}px`,
                        fontWeight: '500',
                        color: textColor,
                        cursor: 'pointer',
                        userSelect: 'none',
                        position: 'relative',
                        transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out'
                      }}
                      onMouseEnter={(e) => {
                        if (!prefersReducedMotion) {
                          e.currentTarget.style.backgroundColor = hoverColor;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {header}
                      {sortColumn === column && (
                        <span style={{
                          marginLeft: '8px',
                          fontSize: '12px',
                          color: secondaryTextColor
                        }}>
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            
            <tbody>
              {paginatedData.map((row, index) => {
                const globalIndex = startIndex + index;
                const isSelected = selectedRows.has(globalIndex);
                
                return (
                  <tr
                    key={globalIndex}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      backgroundColor: isSelected ? selectedColor : 'transparent',
                      transition: prefersReducedMotion ? 'none' : 'background-color 200ms ease-out',
                      opacity: 0,
                      transform: 'translateY(10px)',
                      animation: prefersReducedMotion ? 'none' : `rowAppear 300ms ease-out ${index * 30}ms forwards`
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected && !prefersReducedMotion) {
                        e.currentTarget.style.backgroundColor = hoverColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {showSelection && (
                      <td style={{ padding: '16px' }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRowSelection(globalIndex)}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                    )}
                    <td style={{
                      padding: '16px',
                      fontSize: `${fontSize}px`,
                      color: textColor,
                      fontWeight: '500'
                    }}>
                      {row.name}
                    </td>
                    <td style={{
                      padding: '16px',
                      fontSize: `${fontSize}px`,
                      color: secondaryTextColor
                    }}>
                      {row.email}
                    </td>
                    <td style={{
                      padding: '16px',
                      fontSize: `${fontSize}px`,
                      color: textColor
                    }}>
                      {row.role}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: row.status === 'Active' ? activeStatusColor : inactiveStatusColor,
                        color: '#FFFFFF'
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          padding: '20px',
          borderTop: `1px solid ${borderColor}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{
            fontSize: '14px',
            color: secondaryTextColor
          }}>
            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                backgroundColor: tableBackgroundColor,
                color: currentPage === 1 ? secondaryTextColor : textColor,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                fontFamily
              }}
            >
              Previous
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
                  key={i}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '6px',
                    backgroundColor: currentPage === pageNum ? textColor : tableBackgroundColor,
                    color: currentPage === pageNum ? '#FFFFFF' : textColor,
                    cursor: 'pointer',
                    transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                    fontFamily
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== pageNum && !prefersReducedMotion) {
                      e.currentTarget.style.backgroundColor = hoverColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== pageNum) {
                      e.currentTarget.style.backgroundColor = tableBackgroundColor;
                    }
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                backgroundColor: tableBackgroundColor,
                color: currentPage === totalPages ? secondaryTextColor : textColor,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                fontFamily
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rowAppear {
          from {
            opacity: 0;
            transform: translateY(10px);
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
