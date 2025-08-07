import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import FeaturedWork from './components/FeaturedWork';
import Navigation from './components/Navigation';
import IntroVideo from './components/IntroVideo';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroVideo onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
      <Header />
      <FeaturedWork />
      <Navigation />
    </div>
  );
}

export default App;