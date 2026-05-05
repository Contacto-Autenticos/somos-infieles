import React, { useState, useEffect } from 'react';
import './StickyMobileCTA.css';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece después de 400px de scroll
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="sticky-mobile-cta" onClick={scrollToPricing}>
      <button className="sticky-btn">
        <span>QUIERO MI COPIA</span>
        <span className="btn-icon">🚀</span>
      </button>
    </div>
  );
};

export default StickyMobileCTA;
