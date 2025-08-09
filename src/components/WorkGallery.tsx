import React, { useState } from 'react';
import { Play } from 'lucide-react';

const WorkGallery: React.FC = () => {
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);

  const works = [
    {
      id: 1,
      title: "Frozen 2",
      subtitle: "Original Motion Picture Soundtrack",
      year: "2019",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Film Score"
    },
    {
      id: 2,
      title: "Mary Poppins Returns",
      subtitle: "Music Supervision & Orchestration",
      year: "2018",
      image: "https://images.pexels.com/photos/3823211/pexels-photo-3823211.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Musical"
    },
    {
      id: 3,
      title: "Mufasa: The Lion King",
      subtitle: "Composer & Music Producer",
      year: "2024",
      image: "https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Animation"
    },
    {
      id: 4,
      title: "Wonka",
      subtitle: "Songwriter & Producer",
      year: "2023",
      image: "https://images.pexels.com/photos/7991624/pexels-photo-7991624.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Musical Fantasy"
    },
    {
      id: 5,
      title: "The Lion King - Broadway",
      subtitle: "Musical Arrangement",
      year: "2023",
      image: "https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Broadway"
    },
    {
      id: 6,
      title: "Hamilton",
      subtitle: "Orchestral Arrangements",
      year: "2022",
      image: "https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Musical Theatre"
    },
    {
      id: 7,
      title: "The Conjuring: Last Rites",
      subtitle: "Original Score & Sound Design",
      year: "2024",
      image: "https://images.pexels.com/photos/3823446/pexels-photo-3823446.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Horror"
    },
    {
      id: 8,
      title: "Wicked",
      subtitle: "Additional Music & Lyrics",
      year: "2023",
      image: "https://images.pexels.com/photos/7991624/pexels-photo-7991624.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Musical"
    }
  ];

  return (
    <div className="w-full">
      {/* Featured Work Section */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-serif text-stone-800 mb-4 font-light italic">
          Featured Works
        </h2>
        <p className="text-lg text-stone-600 font-light tracking-wide max-w-2xl mx-auto">
          A collection of musical compositions, arrangements, and productions spanning film, theatre, and beyond
        </p>
      </div>

      {/* Works Grid - Alan Menken Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {works.map((work) => (
          <div
            key={work.id}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredWork(work.id)}
            onMouseLeave={() => setHoveredWork(null)}
          >
            {/* Album Cover Style */}
            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                hoveredWork === work.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {work.category}
                </span>
              </div>

              {/* Year Badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 text-stone-800 text-xs px-2 py-1 rounded-full font-medium">
                  {work.year}
                </span>
              </div>
            </div>

            {/* Work Info */}
            <div className="text-center">
              <h3 className="font-serif text-xl text-stone-800 mb-1 group-hover:text-stone-600 transition-colors duration-200">
                {work.title}
              </h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                {work.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Works Button */}
      <div className="text-center mt-12">
        <button className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3 rounded-full font-light tracking-wide uppercase text-sm transition-all duration-200 hover:scale-105">
          View Complete Discography
        </button>
      </div>
    </div>
  );
};

export default WorkGallery;