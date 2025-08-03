import React, { useState } from 'react';

const WorkGallery: React.FC = () => {
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [clickedWork, setClickedWork] = useState<number | null>(null);

  const works = [
    {
      id: 1,
      title: "Mary poppins Returns",
      image: "public/MV5BMjE4MjI3OTIyNF5BMl5BanBnXkFtZTgwNjA3MDQwNzM@._V1_.jpg",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      size: "tall",
      description: "Broadway Musical - Starring as Simba"
    },
    {
      id: 2,
      title: "Hamilton",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      size: "square",
      description: "West End Production - Revolutionary Performance"
    },
    {
      id: 3,
      title: "Phantom of the Opera",
      image: "https://images.pexels.com/photos/3823211/pexels-photo-3823211.jpeg?auto=compress&cs=tinysrgb&w=400&h=600",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      size: "tall",
      description: "Classic Musical - The Phantom's Haunting Voice"
    },
    {
      id: 4,
      title: "Wicked",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      size: "wide",
      description: "Broadway Hit - Defying Gravity"
    },
    {
      id: 5,
      title: "Les Misérables",
      image: "https://images.pexels.com/photos/3823212/pexels-photo-3823212.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      size: "square",
      description: "Epic Musical - The People's Song"
    },
    {
      id: 6,
      title: "Chicago",
      image: "https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg?auto=compress&cs=tinysrgb&w=400&h=600",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      size: "tall",
      description: "Jazz Age Musical - All That Jazz"
    },
    {
      id: 7,
      title: "Rent",
      image: "https://images.pexels.com/photos/3823446/pexels-photo-3823446.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      size: "square",
      description: "Rock Musical - Seasons of Love"
    },
    {
      id: 8,
      title: "Mamma Mia!",
      image: "https://images.pexels.com/photos/7991624/pexels-photo-7991624.jpeg?auto=compress&cs=tinysrgb&w=400&h=600",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      size: "tall",
      description: "ABBA Musical - Dancing Queen"
    },
    {
      id: 9,
      title: "West Side Story",
      image: "https://images.pexels.com/photos/3823448/pexels-photo-3823448.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      size: "square",
      description: "Classic Musical - Tonight"
    },
    {
      id: 10,
      title: "La Bohème",
      image: "https://images.pexels.com/photos/7991625/pexels-photo-7991625.jpeg?auto=compress&cs=tinysrgb&w=400&h=600",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
      size: "tall",
      description: "Opera - Che Gelida Manina"
    }
  ];

  const handleWorkClick = (workId: number) => {
    setClickedWork(workId);
    // Simulate zoom-through animation
    setTimeout(() => {
      // Navigate to individual work page
      window.location.href = `/work/${workId}`;
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Zoom overlay for click animation */}
      {clickedWork && (
        <div className="fixed inset-0 z-50 bg-black animate-zoom-in pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white rounded-full animate-expand-circle"></div>
          </div>
        </div>
      )}

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {works.map((work, index) => (
          <div
            key={work.id}
            className={`break-inside-avoid relative group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10 ${
              index % 3 === 0 ? 'mb-8' : index % 3 === 1 ? 'mb-6' : 'mb-4'
            } ${clickedWork === work.id ? 'animate-zoom-out' : ''}`}
            onMouseEnter={() => setHoveredWork(work.id)}
            onMouseLeave={() => setHoveredWork(null)}
            onClick={() => handleWorkClick(work.id)}
          >
            <div className="relative overflow-hidden rounded-lg bg-stone-200 shadow-lg">
              {/* Static Image */}
              <img
                src={work.image}
                alt={work.title}
                className={`w-full h-auto object-cover transition-all duration-700 ${
                  hoveredWork === work.id ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                }`}
                style={{
                  aspectRatio: work.size === 'tall' ? '3/4' : 
                             work.size === 'wide' ? '4/3' : '1/1'
                }}
              />
              
              {/* Video Element */}
              <video
                src={work.video}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  hoveredWork === work.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                autoPlay={hoveredWork === work.id}
                muted
                loop
                playsInline
              />

              {/* Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
                hoveredWork === work.id ? 'opacity-100' : 'opacity-0'
              }`} />

              {/* Content Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-500 ${
                hoveredWork === work.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}>
                <h3 className="text-white font-semibold text-lg mb-1 tracking-wide">
                  {work.title}
                </h3>
                <p className="text-white/90 text-sm font-light leading-relaxed">
                  {work.description}
                </p>
              </div>

              {/* Play Icon Overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                hoveredWork === work.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>

              {/* Click Ripple Effect */}
              {clickedWork === work.id && (
                <div className="absolute inset-0 bg-white animate-ripple pointer-events-none"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGallery;
