import React from 'react';
import CTAButton from './CTAButton';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            La verdad sobre la infidelidad que nadie se atreve a decirte.
          </h1>
          <p className="hero-description">
            Desafía tus creencias, rompe el ciclo del dolor y descubre por qué la mentira es solo el síntoma de algo más profundo.
          </p>
          <p className="hero-description">
            Recupera tu poder personal y la claridad que necesitas hoy.
          </p>
          
          <CTAButton text="QUIERO DESCUBRIR LA VERDAD" className="hero-cta" />
        </div>
        
        <div className="hero-image-wrapper">
          <div className="hero-glow"></div>
          <div className="hero-video-crop">
            <video 
              src="/Animacion de libro sin sonido.mp4" 
              className="hero-video" 
              autoPlay 
              loop 
              muted 
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
