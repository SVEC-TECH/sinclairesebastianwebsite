import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import FeaturedWork from './components/FeaturedWork';
import IntroVideo from './components/IntroVideo';
import ConjuringPage from './components/ConjuringPage';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState<'home' | 'music' | 'conjuring' | 'film'>('home');

  const handleIntroComplete = () => {
    setShowIntro(false);
    setCurrentSection('home');
  };

  const handleSectionNavigate = (section: 'music' | 'conjuring' | 'film') => {
    setCurrentSection(section);
  };

  if (showIntro) {
    return <IntroVideo onComplete={handleIntroComplete} />;
  }

  if (currentSection === 'music') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
        <Header />
        <MusicPlayer onBack={() => setCurrentSection('home')} />
      </div>
    );
  }

  if (currentSection === 'film') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
        <Header />
        <MusicPlayer onBack={() => setCurrentSection('home')} />
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
    </div>
  );
}

export default App;