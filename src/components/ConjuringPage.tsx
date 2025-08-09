import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface ConjuringPageProps {
  onContinue: () => void;
}

const ConjuringPage: React.FC<ConjuringPageProps> = ({ onContinue }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightning, setLightning] = useState(false);

  const conjuringMovies = [
    {
      title: "The Conjuring",
      year: "2013",
      image: "https://images.pexels.com/photos/3823446/pexels-photo-3823446.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "The supernatural horror that started it all. Ed and Lorraine Warren investigate a dark presence haunting a family farmhouse.",
      roles: ["Composer", "Sound Designer", "Music Producer"]
    },
    {
      title: "The Conjuring 2",
      year: "2016", 
      image: "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "The Warrens travel to England to help a single mother raising four children alone in a house plagued by malicious spirits.",
      roles: ["Original Score", "Orchestrator", "Music Supervisor"]
    },
    {
      title: "The Conjuring: The Devil Made Me Do It",
      year: "2021",
      image: "https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg?auto=compress&cs=tinysrgb&w=1200", 
      description: "A chilling story of terror, murder and unknown evil that shocked even experienced real-life paranormal investigators.",
      roles: ["Composer", "Additional Music", "Sound Design"]
    },
    {
      title: "The Conjuring: Last Rites",
      year: "2024",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "The final chapter in the Conjuring saga. The Warrens face their most terrifying case yet in this bone-chilling conclusion.",
      roles: ["Original Score", "Music Producer", "Sound Designer"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % conjuringMovies.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [conjuringMovies.length]);

  // Lightning effect
  useEffect(() => {
    const lightningTimer = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 3 seconds
        setLightning(true);
        setTimeout(() => setLightning(false), 200);
      }
    }, 3000);

    return () => clearInterval(lightningTimer);
  }, []);

  const currentMovie = conjuringMovies[currentSlide];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Lightning Effect */}
      <div className={`fixed inset-0 bg-white pointer-events-none transition-opacity duration-100 z-50 ${
        lightning ? 'opacity-20' : 'opacity-0'
      }`} />

      {/* Animated Background SVG */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Creepy tree silhouettes */}
          <path d="M100 1080 Q150 800 200 600 Q180 400 220 200 Q240 100 260 50" 
                stroke="#333" strokeWidth="8" fill="none" opacity="0.6"/>
          <path d="M1800 1080 Q1750 850 1700 650 Q1720 450 1680 250 Q1660 150 1640 100" 
                stroke="#333" strokeWidth="6" fill="none" opacity="0.4"/>
          
          {/* Fog effect */}
          <ellipse cx="960" cy="900" rx="800" ry="200" fill="url(#fogGradient)" opacity="0.3"/>
          
          <defs>
            <linearGradient id="fogGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#666" stopOpacity="0"/>
              <stop offset="50%" stopColor="#666" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#666" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Slider */}
      <div className="relative w-full h-2/3">
        {conjuringMovies.map((movie, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${movie.image}')`,
                filter: 'brightness(0.3) contrast(1.2) saturate(0.8)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
            </div>

            {/* Movie Title */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-red-100 mb-4 tracking-wider font-light drop-shadow-2xl">
                  {movie.title}
                </h2>
                <p className="text-2xl md:text-3xl text-red-200/80 font-light tracking-widest">
                  {movie.year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Movie Details Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-8">
        <div className="max-w-6xl mx-auto">
          {/* Movie Description */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-red-100/90 font-light leading-relaxed max-w-4xl">
              {currentMovie.description}
            </p>
          </div>

          {/* Artist Name */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-red-100 tracking-wider font-light italic drop-shadow-lg">
              Sseruwagi Sinclaire Sebastian
            </h1>
          </div>
          
          {/* Roles */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {currentMovie.roles.map((role, index) => (
              <span
                key={index}
                className="text-lg md:text-xl text-red-200/90 font-light tracking-widest uppercase px-6 py-3 border border-red-800/50 rounded-full backdrop-blur-sm bg-black/30 hover:bg-red-900/20 transition-colors duration-300"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button
              onClick={onContinue}
              className="group flex items-center gap-4 bg-red-900/30 hover:bg-red-800/40 border border-red-700/50 text-red-100 px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-2xl mx-auto"
            >
              <span className="text-lg font-light tracking-wide uppercase">Enter Portfolio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-8 flex gap-3">
        {conjuringMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border ${
              index === currentSlide 
                ? 'bg-red-600 border-red-400' 
                : 'bg-transparent border-red-800/50 hover:border-red-600'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-900/30">
        <div 
          className="h-full bg-red-600 transition-all duration-100 ease-linear shadow-lg"
          style={{ 
            width: `${((currentSlide + 1) / conjuringMovies.length) * 100}%` 
          }}
        />
      </div>

      {/* Creepy Audio Visualization */}
      <div className="absolute bottom-20 right-8 flex items-center gap-1">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-red-600/60 rounded-full transition-all duration-200"
            style={{
              height: `${Math.sin(Date.now() * 0.01 + i) * 10 + 15}px`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ConjuringPage;