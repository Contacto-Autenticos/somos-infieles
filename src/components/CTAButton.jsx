import React from 'react';
import './CTAButton.css';
import { Lock } from 'lucide-react';

const CTAButton = ({ text, className = "", darkNote = false, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`cta-wrapper ${className}`}>
      <button 
        className="btn btn-primary cta-action-btn"
        onClick={handleClick}
      >
        {text}
      </button>
      <p className={`cta-confidential-note ${darkNote ? 'note-dark' : ''}`}>
        <Lock size={12} className="cta-lock-icon" />
        Compra confidencial.
      </p>
    </div>
  );
};

export default CTAButton;
