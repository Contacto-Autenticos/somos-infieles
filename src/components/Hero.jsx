import React from 'react';
import CTAButton from './CTAButton';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title" style={{ fontSize: '3.1rem', fontWeight: 'bold', color: 'var(--color-white)', lineHeight: '1.2', marginBottom: '1.5rem', textTransform: 'none' }}>
            La infidelidad puede ser un infierno o el cielo, depende de ti cómo vivirla.
          </h1>
          <p className="hero-description" style={{ marginBottom: '1.5rem' }}>
            Conoce una nueva forma de entender tus relaciones de pareja.
          </p>
          <p className="hero-description">
            Un libro provocador que desafía las creencias tradicionales sobre la fidelidad, el amor y las relaciones. No busca enseñar, sino generar una revelación interna.
          </p>
          
          <CTAButton text="Quiero entender mis relaciones" className="hero-cta" />
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
