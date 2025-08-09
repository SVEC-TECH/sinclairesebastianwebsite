import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface ConjuringPageProps {
  onContinue: () => void;
}

const ConjuringPage: React.FC<ConjuringPageProps> = ({ onContinue }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const movies = [
    {
      title: "The Conjuring: Last Rites",
      image: "https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg?auto=compress&cs=tinysrgb&w=1200",
      roles: ["Composer", "Editor", "Writer"]
    },
    {
      title: "Frozen 2",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200",
      roles: ["VFX Artist", "Composer", "Sound Designer"]
    },
    {
      title: "Mary Poppins Returns",
      image: "https://images.pexels.com/photos/3823211/pexels-photo-3823211.jpeg?auto=compress&cs=tinysrgb&w=1200",
      roles: ["Music Producer", "Orchestrator", "Writer"]
    },
    {
      title: "Mufasa: The Lion King",
      image: "https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg?auto=compress&cs=tinysrgb&w=1200",
      roles: ["Composer", "Music Supervisor", "Editor"]
    },
    {
      title: "Wonka",
      image: "https://images.pexels.com/photos/7991624/pexels-photo-7991624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      roles: ["Songwriter", "Producer", "VFX Artist"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [movies.length]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${movie.image}')`,
              }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Movie Title */}
            <div className="absolute top-1/4 left-8 right-8 text-center">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4 tracking-wider font-light">
                {movie.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Artist Name and Roles - Fixed at Bottom */}
      <div className="absolute bottom-16 left-8 right-8 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-wider font-light italic">
          Sseruwagi Sinclaire Sebastian
        </h1>
        
        {/* Current Movie Roles */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {movies[currentSlide].roles.map((role, index) => (
            <span
              key={index}
              className="text-lg md:text-xl text-white/90 font-light tracking-widest uppercase px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Call to Action */}
        <button
          onClick={onContinue}
          className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-2xl mx-auto"
        >
          <span className="text-lg font-light tracking-wide uppercase">Explore Portfolio</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / movies.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default ConjuringPage;