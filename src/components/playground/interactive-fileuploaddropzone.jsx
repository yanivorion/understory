import React from "react";

const MANIFEST = {
  "type": "Interactive.FileUploadDropzone",
  "description": "File upload dropzone with drag-over highlight, progress indicators, and file previews",
  "editorElement": {
    "selector": ".file-upload-dropzone",
    "displayName": "File Upload Dropzone",
    "archetype": "container",
    "data": {
      "allowMultiple": {
        "dataType": "booleanValue",
        "displayName": "Allow Multiple Files",
        "defaultValue": true,
        "group": "Content"
      },
      "maxFiles": {
        "dataType": "select",
        "displayName": "Max Files",
        "defaultValue": "5",
        "options": ["1", "3", "5", "10", "unlimited"],
        "group": "Content"
      },
      "acceptedTypes": {
        "dataType": "text",
        "displayName": "Accepted File Types",
        "defaultValue": "image/*,.pdf,.doc,.docx",
        "group": "Content"
      },
      "maxSizeMB": {
        "dataType": "select",
        "displayName": "Max File Size (MB)",
        "defaultValue": "10",
        "options": ["1", "5", "10", "25", "50"],
        "group": "Content"
      },
      "showPreviews": {
        "dataType": "booleanValue",
        "displayName": "Show File Previews",
        "defaultValue": true,
        "group": "Content"
      },
      "dropzoneHeight": {
        "dataType": "select",
        "displayName": "Dropzone Height",
        "defaultValue": "200",
        "options": ["150", "200", "250", "300"],
        "group": "Layout"
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
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E4E4E7",
        "group": "Colors"
      },
      "dragOverColor": {
        "dataType": "color",
        "displayName": "Drag Over Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Color",
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
  const allowMultiple = config?.allowMultiple !== false;
  const maxFiles = config?.maxFiles === 'unlimited' ? Infinity : parseInt(config?.maxFiles || '5');
  const acceptedTypes = config?.acceptedTypes || 'image/*,.pdf,.doc,.docx';
  const maxSizeMB = parseInt(config?.maxSizeMB || '10');
  const showPreviews = config?.showPreviews !== false;
  const dropzoneHeight = parseInt(config?.dropzoneHeight || '200');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const borderColor = config?.borderColor || '#E4E4E7';
  const dragOverColor = config?.dragOverColor || '#495057';
  const accentColor = config?.accentColor || '#495057';
  const progressColor = config?.progressColor || '#495057';
  
  const [files, setFiles] = React.useState([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState({});
  
  const fileInputRef = React.useRef(null);
  const dragCounterRef = React.useRef(0);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  const validateFile = (file) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      return { valid: false, error: `File exceeds ${maxSizeMB}MB limit` };
    }
    return { valid: true };
  };
  
  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
    }, 200);
  };
  
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    
    if (!allowMultiple && newFiles.length > 1) {
      alert('Only one file allowed');
      return;
    }
    
    if (files.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    const validFiles = newFiles
      .map(file => {
        const validation = validateFile(file);
        return {
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          error: validation.valid ? null : validation.error
        };
      })
      .filter(f => !f.error);
    
    validFiles.forEach(f => {
      if (!f.error) {
        simulateUpload(f.id);
      }
    });
    
    setFiles(prev => [...prev, ...validFiles]);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    dragCounterRef.current = 0;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragOver(false);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };
  
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('doc')) return '📝';
    if (type.includes('sheet') || type.includes('excel')) return '📊';
    if (type.includes('video')) return '🎥';
    if (type.includes('audio')) return '🎵';
    return '📎';
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
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{
            height: `${dropzoneHeight}px`,
            border: `2px dashed ${isDragOver ? dragOverColor : borderColor}`,
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: isDragOver ? `${dragOverColor}10` : `${accentColor}05`,
            transition: 'all 300ms ease-out',
            transform: prefersReducedMotion ? 'none' : (isDragOver ? 'scale(1.02)' : 'scale(1)'),
            padding: '20px'
          }}
        >
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
            opacity: isDragOver ? 1 : 0.5,
            transition: 'opacity 200ms ease-out'
          }}>
            📁
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '500',
            color: textColor,
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
          </div>
          <div style={{
            fontSize: '14px',
            color: accentColor,
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            or click to browse
          </div>
          <div style={{
            fontSize: '13px',
            color: accentColor,
            textAlign: 'center',
            opacity: 0.7
          }}>
            Max {maxFiles === Infinity ? 'unlimited' : maxFiles} files • {maxSizeMB}MB each
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple={allowMultiple}
          accept={acceptedTypes}
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
        
        {files.length > 0 && (
          <div style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {files.map((file, index) => {
              const progress = uploadProgress[file.id] || 0;
              const isComplete = progress === 100;
              
              return (
                <div
                  key={file.id}
                  style={{
                    padding: '16px',
                    backgroundColor: `${accentColor}08`,
                    borderRadius: '8px',
                    border: `1px solid ${accentColor}20`,
                    opacity: prefersReducedMotion ? 1 : 1,
                    transform: prefersReducedMotion ? 'none' : 'translateY(0)',
                    animation: prefersReducedMotion ? 'none' : `slideIn 400ms ease-out ${index * 80}ms backwards`
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    {showPreviews && file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          flexShrink: 0
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        backgroundColor: `${accentColor}15`,
                        borderRadius: '6px',
                        flexShrink: 0
                      }}>
                        {getFileIcon(file.type)}
                      </div>
                    )}
                    
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: textColor,
                        marginBottom: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {file.name}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: accentColor,
                        marginBottom: '8px'
                      }}>
                        {formatFileSize(file.size)}
                      </div>
                      
                      <div style={{
                        height: '6px',
                        backgroundColor: `${accentColor}20`,
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${progress}%`,
                          backgroundColor: isComplete ? '#10B981' : progressColor,
                          transition: 'width 200ms ease-out, background-color 200ms ease-out',
                          borderRadius: '3px'
                        }} />
                      </div>
                      
                      <div style={{
                        fontSize: '12px',
                        color: accentColor,
                        marginTop: '6px'
                      }}>
                        {isComplete ? '✓ Upload complete' : `Uploading... ${Math.round(progress)}%`}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeFile(file.id)}
                      aria-label="Remove file"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: accentColor,
                        cursor: 'pointer',
                        fontSize: '20px',
                        padding: '4px',
                        opacity: 0.7,
                        transition: 'opacity 200ms ease-out',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
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
