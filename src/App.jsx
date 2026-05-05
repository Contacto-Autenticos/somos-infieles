import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import EmotionalHook from './components/EmotionalHook';
import Problem from './components/Problem';
import { Transformation, AboutBook, Author, Guarantee, Footer } from './components/RemainingComponents';
import AudioPlayerSection from './components/AudioPlayerSection';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import WhatsAppButton from './components/WhatsAppButton';
import StickyMobileCTA from './components/StickyMobileCTA';
import PaymentStatus from './components/PaymentStatus';

function App() {
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'approved', 'failure', 'pending'

  useEffect(() => {
    // Check if returning from Mercado Pago
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    
    if (status && ['approved', 'failure', 'pending'].includes(status)) {
      setPaymentStatus(status);
    }
  }, []);

  const handleBackFromPayment = () => {
    // Clear URL params and hide payment status
    window.history.replaceState({}, document.title, window.location.pathname);
    setPaymentStatus(null);
  };

  // If returning from payment, show the payment status screen
  if (paymentStatus) {
    return <PaymentStatus status={paymentStatus} onBack={handleBackFromPayment} />;
  }

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
      <HowItWorks />
      <Guarantee />
      <FAQ />
      <Footer />
      <StickyMobileCTA />
      <WhatsAppButton />
    </div>
  );
}

export default App;
