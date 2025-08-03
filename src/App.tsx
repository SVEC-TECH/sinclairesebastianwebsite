import React from 'react';
import Header from './components/Header';
import FeaturedWork from './components/FeaturedWork';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
      <Header />
      <FeaturedWork />
      <Navigation />
    </div>
  );
}

export default App;