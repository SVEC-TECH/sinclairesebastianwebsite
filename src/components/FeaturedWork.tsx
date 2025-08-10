import React, { useState } from 'react';
import { ArrowRight, Music, Film, Zap } from 'lucide-react';

interface FeaturedWorkProps {
  onNavigate?: (section: 'music' | 'conjuring' | 'film') => void;
}

const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onNavigate }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSectionClick = (section: 'music' | 'conjuring' | 'film') => {
    setIsTransitioning(true);
    
    // Create zoom transition effect
    const transitionElement = document.createElement('div');
    transitionElement.className = 'fixed inset-0 bg-black z-50 animate-expand-circle';
    transitionElement.style.transformOrigin = 'center center';
    document.body.appendChild(transitionElement);

    setTimeout(() => {
      if (onNavigate) {
        onNavigate(section);
      }
      document.body.removeChild(transitionElement);
      setIsTransitioning(false);
    }, 800);
  };

  const sections = [
    {
      id: 'music',
      title: 'Music',
      subtitle: 'Original Compositions & Soundtracks',
      description: 'Explore a world of musical storytelling through film scores, Broadway arrangements, and original compositions.',
      image: '/music.jpg',
      icon: Music,
      color: 'from-blue-900/80 to-purple-900/80',
      hoverColor: 'from-blue-800/90 to-purple-800/90'
    },
    {
      id: 'conjuring',
      title: 'The Conjuring Universe',
      subtitle: 'Horror Masterpieces',
      description: 'Dive into the spine-chilling world of supernatural horror with haunting scores and atmospheric sound design.',
      image: '/Theconjuringuniverse.webp',
      icon: Zap,
      color: 'from-red-900/80 to-black/80',
      hoverColor: 'from-red-800/90 to-black/90'
    },
    {
      id: 'film',
      title: 'Film',
      subtitle: 'Cinematic Experiences',
      description: 'Journey through epic tales and intimate stories brought to life through the power of music and sound.',
      image: '/film.jpg',
      icon: Film,
      color: 'from-amber-900/80 to-orange-900/80',
      hoverColor: 'from-amber-800/90 to-orange-800/90'
    }
  ];

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-serif text-stone-800 mb-4 font-light italic">
            Featured Works
          </h2>
          <p className="text-lg text-stone-600 font-light tracking-wide max-w-2xl mx-auto">
            Choose your journey through the musical universe of Sseruwagi Sinclaire Sebastian
          </p>
        </div>

        {/* Split Screen Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[70vh] min-h-[600px]">
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isHovered = hoveredSection === section.id;
            
            return (
              <div
                key={section.id}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 transform ${
                  isHovered ? 'scale-105 shadow-2xl' : 'hover:scale-102 shadow-lg'
                } ${isTransitioning ? 'pointer-events-none' : ''}`}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={() => handleSectionClick(section.id as 'music' | 'conjuring' | 'film')}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
                  style={{
                    backgroundImage: `url('${section.image}')`,
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                  }}
                />

                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b transition-all duration-500 ${
                  isHovered ? section.hoverColor : section.color
                }`} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                  {/* Top Section - Icon */}
                  <div className="flex justify-center">
                    <div className={`p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 ${
                      isHovered ? 'scale-110 bg-white/30' : ''
                    }`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Bottom Section - Text */}
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-serif font-light mb-2 tracking-wide">
                      {section.title}
                    </h3>
                    <p className="text-lg font-light mb-4 opacity-90">
                      {section.subtitle}
                    </p>
                    <p className={`text-sm font-light leading-relaxed mb-6 transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
                    }`}>
                      {section.description}
                    </p>
                    
                    {/* Call to Action */}
                    <div className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <span className="text-sm font-medium tracking-wide uppercase">Explore</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 border-2 border-white/30 rounded-2xl transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Hint */}
        <div className="text-center mt-8">
          <p className="text-stone-500 text-sm font-light tracking-wide">
            Click on any section to begin your journey
          </p>
        </div>
      </div>
    </main>
  );
};

export default FeaturedWork;