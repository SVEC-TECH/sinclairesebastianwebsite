import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ConjuringPageProps {
  onContinue: () => void;
}

const ConjuringPage: React.FC<ConjuringPageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Annabelle Comes Home Image.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Grain Effect */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        {/* Main Title */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-red-100 mb-4 tracking-wider font-light">
            <span className="block text-red-200 drop-shadow-2xl">THE</span>
            <span className="block text-red-100 drop-shadow-2xl">CONJURING</span>
            <span className="block text-red-300 drop-shadow-2xl italic">LAST RITES</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-red-200/80 font-light tracking-widest uppercase">
            A Horror Experience
          </p>
        </div>

        {/* Credits */}
        <div className="mb-12 space-y-2">
          <div className="text-red-100/90 text-lg md:text-xl font-light tracking-wide">
            <span className="block mb-4 text-red-200/70 text-sm uppercase tracking-widest">Written, Edited & Composed by</span>
            <span className="font-serif text-2xl md:text-3xl italic">Sseruwagi Sinclaire Sebastian</span>
          </div>
        </div>

        {/* Call to Action */}
        <button
          onClick={onContinue}
          className="group flex items-center gap-4 bg-red-900/30 hover:bg-red-800/40 border border-red-700/50 text-red-100 px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:shadow-red-900/20"
        >
          <span className="text-lg font-light tracking-wide uppercase">See Other Works</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        {/* Atmospheric Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-300/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Bottom Vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
    </div>
  );
};

export default ConjuringPage;