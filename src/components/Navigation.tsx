import React, { useState } from 'react';
import { Volume2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-stone-700">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-3 text-stone-300 hover:text-stone-100 transition-colors duration-200">
            <Volume2 className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide uppercase">
              See All 42 Works
            </span>
          </button>

          <div className="flex items-center gap-4">
            <button 
              className="p-3 hover:bg-stone-700 rounded-full transition-colors duration-200"
              onClick={() => {/* Previous track logic */}}
            >
              <SkipBack className="w-5 h-5 text-stone-300" />
            </button>
            
            <button 
              className="p-4 bg-red-900 hover:bg-red-800 rounded-full transition-all duration-200 transform hover:scale-105"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
            
            <button 
              className="p-3 hover:bg-stone-700 rounded-full transition-colors duration-200"
              onClick={() => {/* Next track logic */}}
            >
              <SkipForward className="w-5 h-5 text-stone-300" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isPlaying 
                    ? `bg-red-400 animate-pulse` 
                    : 'bg-stone-500'
                }`}
                style={{
                  height: isPlaying ? `${Math.random() * 20 + 8}px` : '8px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;