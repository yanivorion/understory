import React from "react";

const MANIFEST = {
  "type": "Specialty.MusicPlayerWaveform",
  "description": "Music player with waveform visualization, playback controls, and timeline scrubbing",
  "editorElement": {
    "selector": ".music-player-waveform",
    "displayName": "Music Player Waveform",
    "archetype": "container",
    "data": {
      "audioUrl": {
        "dataType": "text",
        "displayName": "Audio URL",
        "defaultValue": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "group": "Content"
      },
      "trackTitle": {
        "dataType": "text",
        "displayName": "Track Title",
        "defaultValue": "Beautiful Melody",
        "group": "Content"
      },
      "artistName": {
        "dataType": "text",
        "displayName": "Artist Name",
        "defaultValue": "The Composer",
        "group": "Content"
      },
      "albumArt": {
        "dataType": "text",
        "displayName": "Album Art URL",
        "defaultValue": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
        "group": "Content"
      },
      "showWaveform": {
        "dataType": "booleanValue",
        "displayName": "Show Waveform",
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
      "waveformColor": {
        "dataType": "color",
        "displayName": "Waveform Color",
        "defaultValue": "#495057",
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
  const audioUrl = config?.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const trackTitle = config?.trackTitle || 'Beautiful Melody';
  const artistName = config?.artistName || 'The Composer';
  const albumArt = config?.albumArt || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400';
  const showWaveform = config?.showWaveform !== false;
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const waveformColor = config?.waveformColor || '#495057';
  const progressColor = config?.progressColor || '#3B82F6';
  const accentColor = config?.accentColor || '#495057';
  
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0.7);
  const [waveformData, setWaveformData] = React.useState([]);
  
  const audioRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const waveformContainerRef = React.useRef(null);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const generateWaveform = () => {
    const bars = 100;
    const data = [];
    for (let i = 0; i < bars; i++) {
      const t = i / bars;
      const wave = Math.sin(t * Math.PI * 8) * 0.5 + 0.5;
      const random = Math.random() * 0.3;
      data.push(wave * 0.7 + random * 0.3);
    }
    setWaveformData(data);
  };
  
  React.useEffect(() => {
    generateWaveform();
  }, []);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleWaveformClick = (e) => {
    if (waveformContainerRef.current && audioRef.current) {
      const rect = waveformContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      audioRef.current.currentTime = percentage * duration;
    }
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const skipTime = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  
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
        width: '100%',
        maxWidth: '600px',
        padding: '32px',
        backgroundColor: `${accentColor}08`,
        borderRadius: '16px',
        border: `1px solid ${accentColor}20`,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
      }}>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
        
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <img
            src={albumArt}
            alt="Album Art"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          />
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '500',
              color: textColor,
              marginBottom: '4px',
              letterSpacing: '-0.01em'
            }}>
              {trackTitle}
            </h2>
            <p style={{
              fontSize: '16px',
              color: accentColor,
              margin: 0
            }}>
              {artistName}
            </p>
          </div>
        </div>
        
        {showWaveform && (
          <div
            ref={waveformContainerRef}
            onClick={handleWaveformClick}
            style={{
              position: 'relative',
              width: '100%',
              height: '80px',
              backgroundColor: `${accentColor}10`,
              borderRadius: '8px',
              marginBottom: '24px',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${progress}%`,
              height: '100%',
              backgroundColor: `${progressColor}20`,
              transition: 'width 100ms linear',
              pointerEvents: 'none'
            }} />
            
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              padding: '0 8px'
            }}>
              {waveformData.map((height, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: `${height * 100}%`,
                    backgroundColor: index < (waveformData.length * progress / 100)
                      ? progressColor
                      : waveformColor,
                    borderRadius: '2px',
                    transition: 'background-color 100ms linear, height 200ms ease-out',
                    minWidth: '2px',
                    opacity: 0.8
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          fontSize: '14px',
          color: accentColor,
          fontFamily: 'monospace'
        }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => skipTime(-10)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: `${accentColor}15`,
              color: textColor,
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${accentColor}25`;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${accentColor}15`;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ⏪
          </button>
          
          <button
            onClick={togglePlay}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: progressColor,
              color: '#FFFFFF',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 200ms ease-out',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          <button
            onClick={() => skipTime(10)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: `${accentColor}15`,
              color: textColor,
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${accentColor}25`;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${accentColor}15`;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ⏩
          </button>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '20px' }}>
            {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          <span style={{
            fontSize: '14px',
            color: accentColor,
            minWidth: '40px',
            textAlign: 'right'
          }}>
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
