import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [showSkip, setShowSkip] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

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
    }, 120000); // 2 minutes

      clearTimeout(autoAdvanceTimer);
    return () => clearTimeout(timer);
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

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Video Container */}
      <div className="relative w-full h-full">
        <iframe
          className="w-full h-full object-cover"
          src="https://www.youtube.com/embed/bMgfsdYoEEo?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="The Conjuring: Last Rites - Official Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
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