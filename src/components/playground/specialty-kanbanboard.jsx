import React from "react";

const MANIFEST = {
  "type": "Specialty.KanbanBoard",
  "description": "Kanban board with draggable cards between columns, add/delete functionality",
  "editorElement": {
    "selector": ".kanban-board",
    "displayName": "Kanban Board",
    "archetype": "container",
    "data": {
      "columns": {
        "dataType": "text",
        "displayName": "Column Names (comma-separated)",
        "defaultValue": "To Do,In Progress,Review,Done",
        "group": "Content"
      },
      "initialTasks": {
        "dataType": "text",
        "displayName": "Initial Tasks (format: title|column)",
        "defaultValue": "Design mockups|To Do,Setup database|To Do,Build API|In Progress,Write tests|Review,Deploy app|Done",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F5F5F4",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "columnColor": {
        "dataType": "color",
        "displayName": "Column Background",
        "defaultValue": "#E7E5E4",
        "group": "Colors"
      },
      "cardColor": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
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
  const columns = (config?.columns || 'To Do,In Progress,Review,Done').split(',').map(c => c.trim());
  const initialTasksStr = config?.initialTasks || 'Design mockups|To Do,Setup database|To Do,Build API|In Progress,Write tests|Review,Deploy app|Done';
  const backgroundColor = config?.backgroundColor || '#F5F5F4';
  const textColor = config?.textColor || '#18181B';
  const columnColor = config?.columnColor || '#E7E5E4';
  const cardColor = config?.cardColor || '#FFFFFF';
  const accentColor = config?.accentColor || '#495057';
  
  const parseInitialTasks = () => {
    const tasksData = {};
    columns.forEach(col => tasksData[col] = []);
    
    initialTasksStr.split(',').forEach((task, index) => {
      const [title, column] = task.split('|').map(s => s.trim());
      if (title && column && tasksData[column]) {
        tasksData[column].push({
          id: Date.now() + index,
          title: title
        });
      }
    });
    
    return tasksData;
  };
  
  const [tasks, setTasks] = React.useState(parseInitialTasks());
  const [draggedCard, setDraggedCard] = React.useState(null);
  const [draggedFrom, setDraggedFrom] = React.useState(null);
  const [newTaskText, setNewTaskText] = React.useState('');
  const [addingToColumn, setAddingToColumn] = React.useState(null);
  
  const handleDragStart = (card, column) => {
    setDraggedCard(card);
    setDraggedFrom(column);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (targetColumn) => {
    if (!draggedCard || !draggedFrom) return;
    
    if (draggedFrom === targetColumn) {
      setDraggedCard(null);
      setDraggedFrom(null);
      return;
    }
    
    setTasks(prev => {
      const newTasks = { ...prev };
      newTasks[draggedFrom] = newTasks[draggedFrom].filter(t => t.id !== draggedCard.id);
      newTasks[targetColumn] = [...newTasks[targetColumn], draggedCard];
      return newTasks;
    });
    
    setDraggedCard(null);
    setDraggedFrom(null);
  };
  
  const addTask = (column) => {
    if (!newTaskText.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: newTaskText.trim()
    };
    
    setTasks(prev => ({
      ...prev,
      [column]: [...prev[column], newTask]
    }));
    
    setNewTaskText('');
    setAddingToColumn(null);
  };
  
  const deleteTask = (column, taskId) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(t => t.id !== taskId)
    }));
  };
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '500',
          color: textColor,
          marginBottom: '32px',
          letterSpacing: '-0.02em'
        }}>
          Project Board
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          gap: '20px'
        }}>
          {columns.map((column) => (
            <div
              key={column}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column)}
              style={{
                backgroundColor: columnColor,
                borderRadius: '12px',
                padding: '16px',
                minHeight: '500px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h2 style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: textColor,
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}>
                  {column}
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '14px',
                    color: accentColor,
                    fontWeight: '400'
                  }}>
                    {tasks[column]?.length || 0}
                  </span>
                </h2>
                
                <button
                  onClick={() => setAddingToColumn(column)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 200ms ease-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${accentColor}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${accentColor}20`;
                  }}
                >
                  +
                </button>
              </div>
              
              {addingToColumn === column && (
                <div style={{
                  marginBottom: '12px',
                  padding: '12px',
                  backgroundColor: cardColor,
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}>
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addTask(column);
                      if (e.key === 'Escape') setAddingToColumn(null);
                    }}
                    placeholder="Enter task title..."
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${accentColor}30`,
                      borderRadius: '4px',
                      fontSize: '14px',
                      outline: 'none',
                      marginBottom: '8px'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => addTask(column)}
                      style={{
                        flex: 1,
                        padding: '6px',
                        backgroundColor: accentColor,
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setAddingToColumn(null);
                        setNewTaskText('');
                      }}
                      style={{
                        flex: 1,
                        padding: '6px',
                        backgroundColor: `${accentColor}20`,
                        color: textColor,
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {(tasks[column] || []).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column)}
                    style={{
                      padding: '12px',
                      backgroundColor: cardColor,
                      borderRadius: '8px',
                      cursor: 'grab',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      transition: 'all 200ms ease-out',
                      opacity: draggedCard?.id === task.id ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: textColor,
                        lineHeight: '1.4'
                      }}>
                        {task.title}
                      </span>
                      
                      <button
                        onClick={() => deleteTask(column, task.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: accentColor,
                          fontSize: '18px',
                          cursor: 'pointer',
                          opacity: 0.5,
                          transition: 'opacity 200ms ease-out',
                          padding: '0',
                          lineHeight: '1'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.5';
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
