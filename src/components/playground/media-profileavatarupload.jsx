import React from "react";

const MANIFEST = {
  "type": "Media.ProfileAvatarUpload",
  "description": "Profile avatar with status indicator dot, upload button, and image preview",
  "editorElement": {
    "selector": ".profile-avatar-upload",
    "displayName": "Profile Avatar Upload",
    "archetype": "container",
    "data": {
      "defaultAvatar": {
        "dataType": "text",
        "displayName": "Default Avatar URL",
        "defaultValue": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        "group": "Content"
      },
      "userName": {
        "dataType": "text",
        "displayName": "User Name",
        "defaultValue": "John Doe",
        "group": "Content"
      },
      "userTitle": {
        "dataType": "text",
        "displayName": "User Title",
        "defaultValue": "Product Designer",
        "group": "Content"
      },
      "status": {
        "dataType": "select",
        "displayName": "Online Status",
        "defaultValue": "online",
        "options": ["online", "away", "busy", "offline"],
        "group": "Content"
      },
      "avatarSize": {
        "dataType": "select",
        "displayName": "Avatar Size",
        "defaultValue": "160",
        "options": ["120", "140", "160", "180", "200"],
        "group": "Layout"
      },
      "showUploadButton": {
        "dataType": "booleanValue",
        "displayName": "Show Upload Button",
        "defaultValue": true,
        "group": "Content"
      },
      "showStatusIndicator": {
        "dataType": "booleanValue",
        "displayName": "Show Status Indicator",
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
      "statusOnlineColor": {
        "dataType": "color",
        "displayName": "Online Status Color",
        "defaultValue": "#10B981",
        "group": "Colors"
      },
      "statusAwayColor": {
        "dataType": "color",
        "displayName": "Away Status Color",
        "defaultValue": "#F59E0B",
        "group": "Colors"
      },
      "statusBusyColor": {
        "dataType": "color",
        "displayName": "Busy Status Color",
        "defaultValue": "#EF4444",
        "group": "Colors"
      },
      "statusOfflineColor": {
        "dataType": "color",
        "displayName": "Offline Status Color",
        "defaultValue": "#9CA3AF",
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
  const defaultAvatar = config?.defaultAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400';
  const userName = config?.userName || 'John Doe';
  const userTitle = config?.userTitle || 'Product Designer';
  const status = config?.status || 'online';
  const avatarSize = parseInt(config?.avatarSize || '160');
  const showUploadButton = config?.showUploadButton !== false;
  const showStatusIndicator = config?.showStatusIndicator !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const statusOnlineColor = config?.statusOnlineColor || '#10B981';
  const statusAwayColor = config?.statusAwayColor || '#F59E0B';
  const statusBusyColor = config?.statusBusyColor || '#EF4444';
  const statusOfflineColor = config?.statusOfflineColor || '#9CA3AF';
  const accentColor = config?.accentColor || '#495057';
  
  const [avatar, setAvatar] = React.useState(defaultAvatar);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  
  const fileInputRef = React.useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  
  const statusColors = {
    online: statusOnlineColor,
    away: statusAwayColor,
    busy: statusBusyColor,
    offline: statusOfflineColor
  };
  
  const statusLabels = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    offline: 'Offline'
  };
  
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const reader = new FileReader();
    
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        setUploadProgress(progress);
      }
    };
    
    reader.onload = (e) => {
      setTimeout(() => {
        setAvatar(e.target.result);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    };
    
    reader.readAsDataURL(file);
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
      <div style={{
        padding: '48px',
        backgroundColor: `${accentColor}08`,
        borderRadius: '16px',
        border: `1px solid ${accentColor}20`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            position: 'relative',
            width: `${avatarSize}px`,
            height: `${avatarSize}px`
          }}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `4px solid ${accentColor}20`,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            transition: 'transform 300ms ease-out, box-shadow 300ms ease-out',
            transform: isHovering ? 'scale(1.05)' : 'scale(1)'
          }}>
            <img
              src={avatar}
              alt={userName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isUploading ? 'blur(4px) brightness(0.7)' : 'none',
                transition: 'filter 300ms ease-out'
              }}
            />
            
            {isUploading && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: `4px solid ${accentColor}30`,
                  borderTopColor: accentColor,
                  animation: prefersReducedMotion ? 'none' : 'spin 1s linear infinite'
                }} />
                <div style={{
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {Math.round(uploadProgress)}%
                </div>
              </div>
            )}
          </div>
          
          {showStatusIndicator && (
            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: statusColors[status],
              border: `4px solid ${backgroundColor}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              opacity: prefersReducedMotion ? 1 : (isHovering ? 1 : 0.9),
              transform: prefersReducedMotion ? 'none' : (isHovering ? 'scale(1.1)' : 'scale(1)'),
              transition: 'all 300ms ease-out'
            }}>
              {status === 'busy' && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '12px',
                  height: '2px',
                  backgroundColor: backgroundColor,
                  borderRadius: '1px'
                }} />
              )}
            </div>
          )}
          
          {showUploadButton && isHovering && !isUploading && (
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '8px 16px',
                backgroundColor: accentColor,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                whiteSpace: 'nowrap',
                opacity: prefersReducedMotion ? 1 : (isHovering ? 1 : 0),
                animation: prefersReducedMotion ? 'none' : 'slideUp 300ms ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) translateY(0)';
              }}
            >
              📷 Change Photo
            </button>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
        
        <div style={{
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '500',
            color: textColor,
            marginBottom: '4px',
            letterSpacing: '-0.01em'
          }}>
            {userName}
          </h2>
          <p style={{
            fontSize: '14px',
            color: accentColor,
            marginBottom: '12px'
          }}>
            {userTitle}
          </p>
          
          {showStatusIndicator && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: `${statusColors[status]}15`,
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '500',
              color: statusColors[status]
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: statusColors[status],
                animation: status === 'online' && !prefersReducedMotion ? 'pulse 2s infinite' : 'none'
              }} />
              {statusLabels[status]}
            </div>
          )}
        </div>
        
        {showUploadButton && !isHovering && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            style={{
              padding: '12px 32px',
              backgroundColor: isUploading ? `${accentColor}40` : `${accentColor}20`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              transition: 'all 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              if (!isUploading) {
                e.currentTarget.style.backgroundColor = `${accentColor}30`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isUploading) {
                e.currentTarget.style.backgroundColor = `${accentColor}20`;
              }
            }}
          >
            {isUploading ? 'Uploading...' : 'Upload New Photo'}
          </button>
        )}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
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
  );
}

export { MANIFEST, Component };
export default Component;
