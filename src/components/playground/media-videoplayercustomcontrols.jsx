import React from "react";

const MANIFEST = {
  "type": "Media.VideoPlayerCustomControls",
  "description": "Video player with custom controls, progress bar, volume control, and playback speed",
  "editorElement": {
    "selector": ".video-player-custom",
    "displayName": "Video Player Custom",
    "archetype": "container",
    "data": {
      "videoUrl": {
        "dataType": "text",
        "displayName": "Video URL",
        "defaultValue": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "group": "Content"
      },
      "posterUrl": {
        "dataType": "text",
        "displayName": "Poster Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
        "group": "Content"
      },
      "autoplay": {
        "dataType": "booleanValue",
        "displayName": "Autoplay",
        "defaultValue": false,
        "group": "Content"
      },
      "showControls": {
        "dataType": "booleanValue",
        "displayName": "Show Controls",
        "defaultValue": true,
        "group": "Content"
      },
      "showTimeDisplay": {
        "dataType": "booleanValue",
        "displayName": "Show Time Display",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "controlsColor": {
        "dataType": "color",
        "displayName": "Controls Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Color",
        "defaultValue": "#3B82F6",
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
  const videoUrl = config?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const posterUrl = config?.posterUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200';
  const autoplay = config?.autoplay === true;
  const showControls = config?.showControls !== false;
  const showTimeDisplay = config?.showTimeDisplay !== false;
  const backgroundColor = config?.backgroundColor || '#000000';
  const controlsColor = config?.controlsColor || '#FFFFFF';
  const progressColor = config?.progressColor || '#3B82F6';
  const accentColor = config?.accentColor || '#495057';
  
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = React.useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);
  const [buffered, setBuffered] = React.useState(0);
  
  const videoRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const progressRef = React.useRef(null);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      if (videoRef.current.buffered.length > 0) {
        const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
        setBuffered((bufferedEnd / videoRef.current.duration) * 100);
      }
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  const handleProgressClick = (e) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const time = percentage * duration;
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const changePlaybackSpeed = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSpeedMenu(false);
    }
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowLeft':
        skipTime(-10);
        break;
      case 'ArrowRight':
        skipTime(10);
        break;
      case 'm':
        toggleMute();
        break;
      case 'f':
        toggleFullscreen();
        break;
    }
  };
  
  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);
  
  const progressPercentage = (currentTime / duration) * 100;
  
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
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          aspectRatio: '16/9',
          backgroundColor: '#000000',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          outline: 'none'
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay={autoplay}
          onClick={togglePlay}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            cursor: 'pointer'
          }}
        />
        
        {!isPlaying && (
          <div
            onClick={togglePlay}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 200ms ease-out',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
            }}
          >
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '24px solid #000000',
              borderTop: '16px solid transparent',
              borderBottom: '16px solid transparent',
              marginLeft: '6px'
            }} />
          </div>
        )}
        
        {showControls && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            padding: '40px 20px 20px',
            backdropFilter: 'blur(4px)'
          }}>
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '3px',
                marginBottom: '16px',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${buffered}%`,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '3px',
                transition: 'width 200ms ease-out'
              }} />
              
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${progressPercentage}%`,
                backgroundColor: progressColor,
                borderRadius: '3px',
                transition: 'width 100ms ease-out'
              }} />
              
              <div style={{
                position: 'absolute',
                top: '50%',
                left: `${progressPercentage}%`,
                transform: 'translate(-50%, -50%)',
                width: '14px',
                height: '14px',
                backgroundColor: progressColor,
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                transition: 'left 100ms ease-out'
              }} />
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: controlsColor
            }}>
              <button
                onClick={togglePlay}
                style={{
                  background: 'none',
                  border: 'none',
                  color: controlsColor,
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              
              <button
                onClick={() => skipTime(-10)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: controlsColor,
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '8px'
                }}
                title="Back 10s"
              >
                ⏪
              </button>
              
              <button
                onClick={() => skipTime(10)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: controlsColor,
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '8px'
                }}
                title="Forward 10s"
              >
                ⏩
              </button>
              
              {showTimeDisplay && (
                <span style={{ fontSize: '14px', fontFamily: 'monospace', minWidth: '100px' }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              )}
              
              <div style={{ flex: 1 }} />
              
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button
                  onClick={toggleMute}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: controlsColor,
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
                </button>
                
                {showVolumeSlider && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '8px',
                    padding: '12px 8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderRadius: '8px',
                    height: '100px'
                  }}>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      style={{
                        WebkitAppearance: 'slider-vertical',
                        width: '4px',
                        height: '80px',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: controlsColor,
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: '8px',
                    fontWeight: '500'
                  }}
                >
                  {playbackSpeed}x
                </button>
                
                {showSpeedMenu && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    right: 0,
                    marginBottom: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    minWidth: '80px'
                  }}>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        onClick={() => changePlaybackSpeed(speed)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          background: speed === playbackSpeed ? 'rgba(255, 255, 255, 0.2)' : 'none',
                          border: 'none',
                          color: controlsColor,
                          fontSize: '14px',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={toggleFullscreen}
                style={{
                  background: 'none',
                  border: 'none',
                  color: controlsColor,
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '8px'
                }}
                title="Fullscreen"
              >
                {isFullscreen ? '⛶' : '⛶'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
