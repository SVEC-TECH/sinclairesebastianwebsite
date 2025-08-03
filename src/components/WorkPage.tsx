import React from 'react';
import { ArrowLeft, Play, Calendar, MapPin, Users } from 'lucide-react';

interface WorkPageProps {
  workId: number;
}

const WorkPage: React.FC<WorkPageProps> = ({ workId }) => {
  // This would typically fetch data based on workId
  const workData = {
    1: {
      title: "The Lion King - Broadway",
      subtitle: "Starring as Simba",
      year: "2023-2024",
      venue: "Minskoff Theatre, New York",
      director: "Julie Taymor",
      description: "An unforgettable journey to the Pride Lands, where Sseruwagi brings depth and power to the iconic role of Simba. This production showcases his remarkable vocal range and commanding stage presence in one of Broadway's most beloved musicals.",
      images: [
        "https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3823211/pexels-photo-3823211.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      reviews: [
        {
          quote: "Sseruwagi's Simba is nothing short of magnificent - a performance that will be remembered for years to come.",
          author: "The New York Times"
        },
        {
          quote: "A powerhouse performance that brings new life to this classic role.",
          author: "Broadway World"
        }
      ]
    }
  };

  const work = workData[workId as keyof typeof workData] || workData[1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
      {/* Header */}
      <header className="relative w-full py-6 px-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-3 text-stone-600 hover:text-stone-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium tracking-wide uppercase">Back to Gallery</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-serif text-stone-800 mb-4 font-light italic">
                {work.title}
              </h1>
              <p className="text-2xl text-stone-600 mb-6 font-light">
                {work.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8 text-stone-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{work.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{work.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Directed by {work.director}</span>
                </div>
              </div>

              <p className="text-lg text-stone-700 leading-relaxed mb-8 font-light">
                {work.description}
              </p>

              <button className="flex items-center gap-3 bg-stone-800 text-white px-8 py-4 rounded-full hover:bg-stone-700 transition-all duration-200 transform hover:scale-105">
                <Play className="w-5 h-5" />
                <span className="font-medium">Watch Performance</span>
              </button>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={work.images[0]} 
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-8 py-16 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            <video 
              src={work.video}
              controls
              className="w-full h-full"
              poster={work.images[0]}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-stone-800 mb-8 text-center font-light italic">
            Behind the Scenes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {work.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={image} 
                  alt={`${work.title} - Image ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="px-8 py-16 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif mb-12 text-center font-light italic">
            Critical Acclaim
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {work.reviews.map((review, index) => (
              <blockquote key={index} className="text-center">
                <p className="text-xl font-light italic mb-4 leading-relaxed">
                  "{review.quote}"
                </p>
                <cite className="text-stone-300 font-medium">
                  — {review.author}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkPage;