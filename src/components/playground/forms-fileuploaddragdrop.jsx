import React from "react";

const MANIFEST = {
  "type": "Forms.FileUploadDragDrop",
  "description": "Advanced file upload component with drag-and-drop, multiple file handling, progress tracking, and preview thumbnails",
  "editorElement": {
    "selector": ".file-upload-zone",
    "displayName": "File Upload with Drag & Drop",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "Upload Your Files",
        "group": "Content"
      },
      "subtitle": {
        "dataType": "text",
        "displayName": "Subtitle",
        "defaultValue": "Drag and drop files here or click to browse",
        "group": "Content"
      },
      "maxFiles": {
        "dataType": "number",
        "displayName": "Max Files",
        "defaultValue": "5",
        "group": "Content",
        "description": "Maximum number of files allowed"
      },
      "maxSizeMB": {
        "dataType": "number",
        "displayName": "Max File Size (MB)",
        "defaultValue": "10",
        "group": "Content"
      },
      "acceptedTypes": {
        "dataType": "text",
        "displayName": "Accepted File Types",
        "defaultValue": "image/*,.pdf,.doc,.docx",
        "group": "Content",
        "description": "Comma-separated MIME types or extensions"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "dropzoneColor": {
        "dataType": "color",
        "displayName": "Dropzone Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "rgba(0,0,0,0.08)",
        "group": "Colors"
      },
      "activeBorderColor": {
        "dataType": "color",
        "displayName": "Active Border Color",
        "defaultValue": "#2B2B2B",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#2B2B2B",
        "group": "Colors"
      },
      "subtitleColor": {
        "dataType": "color",
        "displayName": "Subtitle Color",
        "defaultValue": "#6B6B6B",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Bar Color",
        "defaultValue": "#2B2B2B",
        "group": "Colors"
      },
      "successColor": {
        "dataType": "color",
        "displayName": "Success Color",
        "defaultValue": "#22C55E",
        "group": "Colors"
      },
      "errorColor": {
        "dataType": "color",
        "displayName": "Error Color",
        "defaultValue": "#EF4444",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "-apple-system, SF Pro, Segoe UI, sans-serif",
        "options": [
          "-apple-system, SF Pro, Segoe UI, sans-serif",
          "Inter, sans-serif",
          "Helvetica Neue, Arial, sans-serif",
          "Montserrat, sans-serif"
        ],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "select",
        "displayName": "Title Size",
        "defaultValue": "24px",
        "options": ["20px", "24px", "28px", "32px"],
        "group": "Typography"
      },
      "titleWeight": {
        "dataType": "select",
        "displayName": "Title Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "dropzonePadding": {
        "dataType": "select",
        "displayName": "Dropzone Padding",
        "defaultValue": "48px",
        "options": ["32px", "40px", "48px", "56px", "64px"],
        "group": "Layout"
      },
      "showPreviews": {
        "dataType": "booleanValue",
        "displayName": "Show File Previews",
        "defaultValue": "true",
        "group": "Content"
      },
      "enableAnimation": {
        "dataType": "booleanValue",
        "displayName": "Enable Animations",
        "defaultValue": "true",
        "group": "Animation"
      },
      "animationDuration": {
        "dataType": "number",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "250",
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
  const [files, setFiles] = React.useState([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const dragCounterRef = React.useRef(0);

  // Configuration with safe access
  const maxFiles = parseInt(config?.maxFiles || '5');
  const maxSizeMB = parseInt(config?.maxSizeMB || '10');
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const acceptedTypes = config?.acceptedTypes || 'image/*,.pdf,.doc,.docx';
  const showPreviews = config?.showPreviews !== false;
  const enableAnimation = config?.enableAnimation !== false;
  const duration = parseInt(config?.animationDuration || '250');

  // File validation
  const validateFile = (file) => {
    if (file.size > maxSizeBytes) {
      return { valid: false, error: `File exceeds ${maxSizeMB}MB limit` };
    }
    
    const types = acceptedTypes.split(',').map(t => t.trim());
    const fileType = file.type;
    const fileExt = '.' + file.name.split('.').pop();
    
    const isValid = types.some(type => {
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.replace('/*', ''));
      }
      return type === fileType || type === fileExt;
    });
    
    if (!isValid) {
      return { valid: false, error: 'File type not accepted' };
    }
    
    return { valid: true };
  };

  // Handle file selection
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    
    if (files.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const processedFiles = newFiles.map(file => {
      const validation = validateFile(file);
      const fileData = {
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: validation.valid ? 'uploading' : 'error',
        error: validation.error,
        preview: null
      };

      // Generate preview for images
      if (file.type.startsWith('image/') && showPreviews) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFiles(prev => prev.map(f => 
            f.id === fileData.id ? { ...f, preview: e.target.result } : f
          ));
        };
        reader.readAsDataURL(file);
      }

      // Simulate upload
      if (validation.valid) {
        simulateUpload(fileData.id);
      }

      return fileData;
    });

    setFiles(prev => [...prev, ...processedFiles]);
  };

  // Simulate file upload with progress
  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: 100, status: 'complete' } : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: Math.floor(progress) } : f
        ));
      }
    }, 200);
  };

  // Remove file
  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounterRef.current = 0;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  // Click to browse
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Format file size
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div
      className="file-upload-zone"
      style={{
        fontFamily: config?.fontFamily || '-apple-system, SF Pro, Segoe UI, sans-serif',
        backgroundColor: config?.backgroundColor || '#FAFAFA',
        padding: '48px 32px',
        minHeight: '400px'
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Title */}
        <h2 style={{
          fontSize: config?.titleSize || '24px',
          fontWeight: config?.titleWeight || '400',
          color: config?.textColor || '#2B2B2B',
          margin: '0 0 8px 0',
          textAlign: 'center'
        }}>
          {config?.title || 'Upload Your Files'}
        </h2>
        
        <p style={{
          fontSize: '14px',
          color: config?.subtitleColor || '#6B6B6B',
          margin: '0 0 32px 0',
          textAlign: 'center'
        }}>
          {config?.subtitle || 'Drag and drop files here or click to browse'}
        </p>

        {/* Dropzone */}
        <div
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            backgroundColor: config?.dropzoneColor || '#FFFFFF',
            border: `2px dashed ${isDragging ? (config?.activeBorderColor || '#2B2B2B') : (config?.borderColor || 'rgba(0,0,0,0.08)')}`,
            borderRadius: config?.cornerRadius || '8px',
            padding: config?.dropzonePadding || '48px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: `all ${duration}ms ease-out`,
            transform: isDragging ? 'scale(1.02)' : 'scale(1)',
            opacity: isDragging ? 0.8 : 1
          }}
        >
          {/* Upload Icon */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke={config?.textColor || '#2B2B2B'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: '0 auto 16px auto', display: 'block' }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>

          <p style={{
            fontSize: '16px',
            fontWeight: '400',
            color: config?.textColor || '#2B2B2B',
            margin: '0 0 8px 0'
          }}>
            {isDragging ? 'Drop files here' : 'Click to browse or drag files here'}
          </p>
          
          <p style={{
            fontSize: '13px',
            color: config?.subtitleColor || '#6B6B6B',
            margin: 0
          }}>
            Max {maxFiles} files • {maxSizeMB}MB per file • {acceptedTypes}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes}
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '400',
              color: config?.textColor || '#2B2B2B',
              margin: '0 0 16px 0'
            }}>
              Uploaded Files ({files.length}/{maxFiles})
            </h3>

            {files.map(file => (
              <div
                key={file.id}
                style={{
                  backgroundColor: config?.dropzoneColor || '#FFFFFF',
                  border: `1px solid ${config?.borderColor || 'rgba(0,0,0,0.08)'}`,
                  borderRadius: config?.cornerRadius || '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  animation: enableAnimation ? `fadeIn ${duration}ms ease-out` : 'none'
                }}
              >
                {/* Preview thumbnail */}
                {showPreviews && file.preview && (
                  <img
                    src={file.preview}
                    alt={file.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'cover',
                      borderRadius: config?.cornerRadius || '8px',
                      flexShrink: 0
                    }}
                  />
                )}

                {/* File info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: config?.textColor || '#2B2B2B',
                    margin: '0 0 4px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {file.name}
                  </p>
                  
                  <p style={{
                    fontSize: '12px',
                    color: config?.subtitleColor || '#6B6B6B',
                    margin: '0 0 8px 0'
                  }}>
                    {formatSize(file.size)}
                  </p>

                  {/* Progress bar */}
                  {file.status === 'uploading' && (
                    <div style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${file.progress}%`,
                        height: '100%',
                        backgroundColor: config?.progressColor || '#2B2B2B',
                        transition: `width ${duration}ms ease-out`
                      }} />
                    </div>
                  )}

                  {/* Status */}
                  {file.status === 'complete' && (
                    <p style={{
                      fontSize: '12px',
                      color: config?.successColor || '#22C55E',
                      margin: 0
                    }}>
                      ✓ Upload complete
                    </p>
                  )}

                  {file.status === 'error' && (
                    <p style={{
                      fontSize: '12px',
                      color: config?.errorColor || '#EF4444',
                      margin: 0
                    }}>
                      ✕ {file.error}
                    </p>
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFile(file.id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    color: config?.subtitleColor || '#6B6B6B',
                    fontSize: '18px',
                    lineHeight: 1,
                    transition: `color ${duration}ms ease-out`
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = config?.errorColor || '#EF4444'}
                  onMouseLeave={(e) => e.currentTarget.style.color = config?.subtitleColor || '#6B6B6B'}
                  aria-label="Remove file"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
