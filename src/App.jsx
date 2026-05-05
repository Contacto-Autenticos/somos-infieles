import React from 'react';
import Hero from './components/Hero';
import EmotionalHook from './components/EmotionalHook';
import Problem from './components/Problem';
import { Transformation, AboutBook, Author, Guarantee, Footer } from './components/RemainingComponents';
import AudioPlayerSection from './components/AudioPlayerSection';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="app-container">
      <Hero />
      <EmotionalHook />
      <Problem />
      <AudioPlayerSection />
      <AboutBook />
      <Transformation />
      <Author />
      <Testimonials />
      <Pricing />
      <Guarantee />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
