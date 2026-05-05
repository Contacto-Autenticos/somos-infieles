import React from 'react';
import CTAButton from './CTAButton';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--color-white)', lineHeight: '1.1', marginBottom: '1.5rem', textTransform: 'none' }}>
            <span style={{ display: 'block' }}>La verdad sobre la</span>
            <span style={{ display: 'block' }}>infidelidad que nadie</span>
            <span style={{ display: 'block' }}>se atreve a decirte.</span>
          </h1>
          <p className="hero-description" style={{ marginBottom: '2rem' }}>
            Desafía tus creencias, rompe el ciclo del dolor y descubre por qué la traición es solo el síntoma de algo más profundo. Recupera tu poder personal y la claridad que necesitas hoy.
          </p>
          
          <CTAButton text="QUIERO DESCUBRIR LA VERDAD" className="hero-cta" />
        </div>
        
        <div className="hero-image-wrapper">
          <div className="hero-glow"></div>
          <img src="/Libro Somos infieles.png" alt="Libro Somos Infieles" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
