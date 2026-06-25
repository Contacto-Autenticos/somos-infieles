import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import EmotionalHook from './EmotionalHook';
import Problem from './Problem';
import { Transformation, AboutBook, Author, AuthorInterview, Guarantee, Footer } from './RemainingComponents';
import AudioPlayerSection from './AudioPlayerSection';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import WhatsAppButton from './WhatsAppButton';
import StickyMobileCTA from './StickyMobileCTA';
import PaymentStatus from './PaymentStatus';
import PurchaseNotifications from './PurchaseNotifications';

const LandingPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'approved', 'failure', 'pending'
  const navigate = useNavigate();

  useEffect(() => {
    // Check if returning from Mercado Pago
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    
    if (status && ['approved', 'failure', 'pending'].includes(status)) {
      setPaymentStatus(status);
      if (status === 'approved') {
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: '¡Pago Aprobado! 💰',
            message: 'Un comprador ha finalizado exitosamente su pago en Mercado Pago.'
          })
        }).catch(err => console.error('Error enviando notificación:', err));
      }
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
      <PurchaseNotifications />
      <Hero />
      <EmotionalHook />
      <Problem />
      <AudioPlayerSection />
      <AboutBook />
      <Transformation />
      <Author />
      <Testimonials />
      <AuthorInterview />
      <Pricing />
      <HowItWorks />
      <Guarantee />
      <FAQ />
      <Footer />
      <StickyMobileCTA />
      <WhatsAppButton />
      
      {/* Botón oculto para ir a /admin */}
      <div 
        onClick={() => navigate('/admin')}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          zIndex: 9999,
          opacity: 0
        }}
        title="Admin"
      />
    </div>
  );
};

export default LandingPage;
