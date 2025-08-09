import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Play } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [showSkip, setShowSkip] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Try to play the video immediately
    const tryAutoplay = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented, showing play button');
          setShowPlayButton(true);
        }
      }
    };

    if (videoLoaded) {
      tryAutoplay();
    }

    // Show skip button after 3 seconds
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 3000);

    // Auto-advance after video duration (approximately 2 minutes)
    const autoAdvanceTimer = setTimeout(() => {
      if (!videoEnded) {
        handleVideoEnd();
      }
    }, 120000); // 2 minutes

    return () => {
      clearTimeout(timer);
      clearTimeout(autoAdvanceTimer);
    };
  }, [videoEnded, videoLoaded]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const handlePlayClick = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.error('Failed to play video:', error);
      }
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Add a small delay before transitioning
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const handleSkip = () => {
    onComplete();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Video Container */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/introvideo.mp4"
          muted={isMuted}
          playsInline
          onLoadedData={handleVideoLoaded}
          onEnded={handleVideoEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={(e) => {
            console.error('Video failed to load:', e);
            // Fallback: skip to next page if video fails
            setTimeout(handleVideoEnd, 1000);
          }}
        />

        {/* Play Button Overlay (shown when autoplay is blocked) */}
        {showPlayButton && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <button
              onClick={handlePlayClick}
              className="flex flex-col items-center gap-4 text-white hover:scale-105 transition-transform duration-200"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition-colors duration-200">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <p className="text-lg font-light tracking-wide">Click to start the experience</p>
            </button>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className={`absolute top-8 right-8 flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/70 transition-all duration-300 z-10 ${
            showSkip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <X className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide">SKIP</span>
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className={`absolute top-8 right-32 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 z-10 ${
            showSkip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        {/* Artist Name Overlay */}
        <div className="absolute bottom-16 left-8 text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-light italic mb-2 tracking-wide">
            Sseruwagi Sinclaire Sebastian
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wider opacity-90">
            Composer • Writter • Storyteller
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroVideo;