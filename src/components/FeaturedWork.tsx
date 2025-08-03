import React from 'react';
import WorkGallery from './WorkGallery';

const FeaturedWork: React.FC = () => {
  return (
    <main className="px-8 py-16">
      <WorkGallery />
      
      <div className="text-center mt-16 mb-8">
        <h2 className="text-5xl md:text-6xl font-serif text-stone-800 mb-6 font-light italic">
          Featured Work
        </h2>
        <p className="text-lg text-stone-600 font-light tracking-wide">
          Explore some of Sseruwagi's featured performances and creative works
        </p>
      </div>
    </main>
  );
};

export default FeaturedWork;