import React from 'react';
import CTAButton from './CTAButton';
import { Book } from './ui/book';
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
          <div className="hero-right">
            <div className="hero-book-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Book 
                title="Somos Infieles" 
                coverImage="/Libro Somos infieles.png"
                width={{ sm: 260, md: 320, lg: 380, xl: 420 }}
                textured={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
