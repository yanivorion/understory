import React from "react";

const MANIFEST = {
  "type": "Media.VideoPlayer",
  "description": "Advanced video player with custom controls, keyboard shortcuts, quality selector, playback speed, and picture-in-picture support",
  "editorElement": {
    "selector": ".video-player-container",
    "displayName": "Video Player with Controls",
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
        "defaultValue": "",
        "group": "Content",
        "description": "Thumbnail shown before play"
      },
      "title": {
        "dataType": "text",
        "displayName": "Video Title",
        "defaultValue": "Sample Video",
        "group": "Content"
      },
      "showTitle": {
        "dataType": "booleanValue",
        "displayName": "Show Title",
        "defaultValue": "true",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#0A0A0A",
        "group": "Colors"
      },
      "controlsBackground": {
        "dataType": "color",
        "displayName": "Controls Background",
        "defaultValue": "rgba(0,0,0,0.8)",
        "group": "Colors"
      },
      "controlsColor": {
        "dataType": "color",
        "displayName": "Controls Icon Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "progressColor": {
        "dataType": "color",
        "displayName": "Progress Bar Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "progressBackground": {
        "dataType": "color",
        "displayName": "Progress Background",
        "defaultValue": "rgba(255,255,255,0.3)",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "-apple-system, SF Pro, Segoe UI, sans-serif",
        "options": [
          "-apple-system, SF Pro, Segoe UI, sans-serif",
          "Inter, sans-serif",
          "Helvetica Neue, Arial, sans-serif"
        ],
        "group": "Typography"
      },
      "fontSize": {
        "dataType": "select",
        "displayName": "Font Size",
        "defaultValue": "14px",
        "options": ["12px", "14px", "16px"],
        "group": "Typography"
      },
      "cornerRadius": {
        "dataType": "select",
        "displayName": "Corner Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "autoplay": {
        "dataType": "booleanValue",
        "displayName": "Autoplay",
        "defaultValue": "false",
        "group": "Playback"
      },
      "loop": {
        "dataType": "booleanValue",
        "displayName": "Loop",
        "defaultValue": "false",
        "group": "Playback"
      },
      "muted": {
        "dataType": "booleanValue",
        "displayName": "Start Muted",
        "defaultValue": "false",
        "group": "Playback"
      },
      "showQualitySelector": {
        "dataType": "booleanValue",
        "displayName": "Show Quality Selector",
        "defaultValue": "true",
        "group": "Features"
      },
      "showPlaybackSpeed": {
        "dataType": "booleanValue",
        "displayName": "Show Playback Speed",
        "defaultValue": "true",
        "group": "Features"
      },
      "enablePictureInPicture": {
        "dataType": "booleanValue",
        "displayName": "Enable Picture-in-Picture",
        "defaultValue": "true",
        "group": "Features"
      },
      "enableKeyboardShortcuts": {
        "dataType": "booleanValue",
        "displayName": "Enable Keyboard Shortcuts",
        "defaultValue": "true",
        "group": "Features"
      },
      "controlsHideDelay": {
        "dataType": "number",
        "displayName": "Controls Hide Delay (ms)",
        "defaultValue": "3000",
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
  const videoRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(config?.muted !== false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = React.useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);
  const hideControlsTimeout = React.useRef(null);

  const autoplay = config?.autoplay === true;
  const loop = config?.loop === true;
  const enablePiP = config?.enablePictureInPicture !== false;
  const enableKeyboard = config?.enableKeyboardShortcuts !== false;
  const hideDelay = parseInt(config?.controlsHideDelay || '3000');

  // Initialize video
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    video.muted = isMuted;
    video.loop = loop;
    if (autoplay) video.play().catch(() => {});

    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [autoplay, loop, volume, isMuted]);

  // Handle controls visibility
  const resetControlsTimer = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, hideDelay);
    }
  };

  React.useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  // Keyboard shortcuts
  React.useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT') return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'arrowleft':
          e.preventDefault();
          skip(-5);
          break;
        case 'arrowright':
          e.preventDefault();
          skip(5);
          break;
        case 'arrowup':
          e.preventDefault();
          changeVolume(0.1);
          break;
        case 'arrowdown':
          e.preventDefault();
          changeVolume(-0.1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [enableKeyboard, isPlaying]);

  // Playback controls
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
    resetControlsTimer();
  };

  const seek = (time) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
  };

  const changeVolume = (delta) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume > 0) setIsMuted(false);
    resetControlsTimer();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const togglePictureInPicture = async () => {
    const video = videoRef.current;
    if (!video || !enablePiP) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (err) {
      console.error('PiP error:', err);
    }
  };

  // Format time
  const formatTime = (seconds) => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="video-player-container"
      onMouseMove={resetControlsTimer}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      style={{
        fontFamily: config?.fontFamily || '-apple-system, SF Pro, Segoe UI, sans-serif',
        backgroundColor: config?.backgroundColor || '#0A0A0A',
        borderRadius: config?.cornerRadius || '8px',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {/* Title overlay */}
      {config?.showTitle !== false && config?.title && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
          padding: '24px',
          zIndex: 2,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 250ms ease-out'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '400',
            color: config?.textColor || '#FFFFFF',
            margin: 0
          }}>
            {config?.title}
          </h3>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={config?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        poster={config?.posterUrl || ''}
        onClick={togglePlay}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          cursor: 'pointer'
        }}
      />

      {/* Controls overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: config?.controlsBackground || 'rgba(0,0,0,0.8)',
        padding: '16px',
        zIndex: 2,
        opacity: showControls ? 1 : 0,
        transition: 'opacity 250ms ease-out',
        pointerEvents: showControls ? 'auto' : 'none'
      }}>
        {/* Progress bar */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            seek(percent * duration);
          }}
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: config?.progressBackground || 'rgba(255,255,255,0.3)',
            borderRadius: '2px',
            cursor: 'pointer',
            marginBottom: '12px',
            position: 'relative'
          }}
        >
          <div style={{
            width: `${(currentTime / duration) * 100}%`,
            height: '100%',
            backgroundColor: config?.progressColor || '#FFFFFF',
            borderRadius: '2px',
            transition: 'width 100ms linear'
          }} />
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: config?.fontSize || '14px',
          color: config?.textColor || '#FFFFFF'
        }}>
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            style={{
              background: 'none',
              border: 'none',
              color: config?.controlsColor || '#FFFFFF',
              cursor: 'pointer',
              padding: 0,
              width: '24px',
              height: '24px'
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Skip backward */}
          <button
            onClick={() => skip(-5)}
            style={{
              background: 'none',
              border: 'none',
              color: config?.controlsColor || '#FFFFFF',
              cursor: 'pointer',
              padding: 0,
              fontSize: '18px'
            }}
            aria-label="Skip backward 5 seconds"
          >
            ⏪
          </button>

          {/* Skip forward */}
          <button
            onClick={() => skip(5)}
            style={{
              background: 'none',
              border: 'none',
              color: config?.controlsColor || '#FFFFFF',
              cursor: 'pointer',
              padding: 0,
              fontSize: '18px'
            }}
            aria-label="Skip forward 5 seconds"
          >
            ⏩
          </button>

          {/* Volume */}
          <div
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <button
              onClick={toggleMute}
              style={{
                background: 'none',
                border: 'none',
                color: config?.controlsColor || '#FFFFFF',
                cursor: 'pointer',
                padding: 0,
                fontSize: '18px'
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
            </button>

            {showVolumeSlider && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (videoRef.current) videoRef.current.volume = val;
                  if (val > 0) setIsMuted(false);
                }}
                style={{
                  width: '80px',
                  cursor: 'pointer'
                }}
              />
            )}
          </div>

          {/* Time */}
          <span style={{ fontSize: '13px', minWidth: '100px' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div style={{ flex: 1 }} />

          {/* Playback speed */}
          {config?.showPlaybackSpeed !== false && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: config?.controlsColor || '#FFFFFF',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  fontSize: '13px'
                }}
              >
                {playbackRate}x
              </button>
              
              {showSpeedMenu && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  right: 0,
                  marginBottom: '8px',
                  backgroundColor: config?.controlsBackground || 'rgba(0,0,0,0.9)',
                  borderRadius: '4px',
                  padding: '8px',
                  minWidth: '80px'
                }}>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => changePlaybackRate(rate)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: config?.textColor || '#FFFFFF',
                        cursor: 'pointer',
                        padding: '6px 12px',
                        width: '100%',
                        textAlign: 'left',
                        fontSize: '13px',
                        opacity: playbackRate === rate ? 1 : 0.7
                      }}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Picture in Picture */}
          {enablePiP && (
            <button
              onClick={togglePictureInPicture}
              style={{
                background: 'none',
                border: 'none',
                color: config?.controlsColor || '#FFFFFF',
                cursor: 'pointer',
                padding: 0,
                fontSize: '18px'
              }}
              aria-label="Picture in Picture"
            >
              📺
            </button>
          )}

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            style={{
              background: 'none',
              border: 'none',
              color: config?.controlsColor || '#FFFFFF',
              cursor: 'pointer',
              padding: 0,
              fontSize: '18px'
            }}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? '⊡' : '⛶'}
          </button>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
