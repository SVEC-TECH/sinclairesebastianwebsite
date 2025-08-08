import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import FeaturedWork from './components/FeaturedWork';
import Navigation from './components/Navigation';
import IntroVideo from './components/IntroVideo';
import ConjuringPage from './components/ConjuringPage';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showConjuring, setShowConjuring] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowConjuring(true);
  };

  const handleConjuringComplete = () => {
    setShowConjuring(false);
  };

  if (showIntro) {
    return <IntroVideo onComplete={handleIntroComplete} />;
  }

  if (showConjuring) {
    return <ConjuringPage onContinue={handleConjuringComplete} />;
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