import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [showSkip, setShowSkip] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show skip button after 3 seconds
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 3000);

    // Auto-advance after video duration (approximately 2 minutes)
    const autoAdvanceTimer = setTimeout(() => {
      if (!videoEnded) {
        handleVideoEnd();
      }
    }, 180000); // 3 minutes

    return () => {
      clearTimeout(timer);
      clearTimeout(autoAdvanceTimer);
    };
  }, [videoEnded]);

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
          autoPlay
          muted={isMuted}
          playsInline
          onEnded={handleVideoEnd}
          onError={(e) => {
            console.error('Video failed to load:', e);
            // Fallback: skip to next page if video fails
            setTimeout(handleVideoEnd, 1000);
          }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className={`absolute top-8 right-8 flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/70 transition-all duration-300 ${
            showSkip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <X className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide">SKIP</span>
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className={`absolute top-8 right-32 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 ${
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
            Artist • Performer • Storyteller
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroVideo;
