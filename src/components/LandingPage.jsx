import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import EmotionalHook from './EmotionalHook';
import Problem from './Problem';
import { Transformation, AboutBook, Author, Guarantee, Footer } from './RemainingComponents';
import AudioPlayerSection from './AudioPlayerSection';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import WhatsAppButton from './WhatsAppButton';
import StickyMobileCTA from './StickyMobileCTA';
import PaymentStatus from './PaymentStatus';

const LandingPage = () => {
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
};

export default LandingPage;
