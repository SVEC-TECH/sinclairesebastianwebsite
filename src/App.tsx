import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import FeaturedWork from './components/FeaturedWork';
import Navigation from './components/Navigation';
import IntroVideo from './components/IntroVideo';
import ConjuringPage from './components/ConjuringPage';
import WorkGallery from './components/WorkGallery';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showConjuring, setShowConjuring] = useState(false);
  const [currentSection, setCurrentSection] = useState<'home' | 'music' | 'conjuring' | 'film'>('home');

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowConjuring(true);
  };

  const handleConjuringComplete = () => {
    setShowConjuring(false);
    setCurrentSection('home');
  };

  const handleSectionNavigate = (section: 'music' | 'conjuring' | 'film') => {
    setCurrentSection(section);
  };

  if (showIntro) {
    return <IntroVideo onComplete={handleIntroComplete} />;
  }

  if (showConjuring) {
    return <ConjuringPage onContinue={handleConjuringComplete} />;
  }

  if (currentSection === 'music' || currentSection === 'film') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
        <Header />
        <div className="px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <button
                onClick={() => setCurrentSection('home')}
                className="text-stone-600 hover:text-stone-800 text-sm font-medium tracking-wide uppercase mb-4 transition-colors duration-200"
              >
                ← Back to Home
              </button>
              <h1 className="text-5xl md:text-6xl font-serif text-stone-800 mb-4 font-light italic">
                {currentSection === 'music' ? 'Musical Works' : 'Film Projects'}
              </h1>
              <p className="text-lg text-stone-600 font-light tracking-wide max-w-2xl mx-auto">
                {currentSection === 'music' 
                  ? 'A collection of original compositions, film scores, and musical arrangements'
                  : 'Cinematic projects featuring original scores and sound design'
                }
              </p>
            </div>
            <WorkGallery />
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  if (currentSection === 'conjuring') {
    return <ConjuringPage onContinue={() => setCurrentSection('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
      <Header />
      <FeaturedWork onNavigate={handleSectionNavigate} />
      <Navigation />
    </div>
  );
}

export default App;