import React from 'react';
import CTAButton from './CTAButton';
import './Problem.css';

const CheckIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="problem-icon">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Problem = () => {
  const problems = [
    "He sido infiel",
    "Me fueron infiel",
    "Fui causa de una infidelidad"
  ];

  return (
    <section className="problem section-padding">
      <div className="container">
        <h2 className="section-title" style={{ fontSize: '2rem' }}>Continúa si respondes con un <span className="text-gold">SÍ</span> al menos a una de las siguientes afirmaciones:</h2>
        <div className="problem-list">
          {problems.map((problem, index) => (
            <div key={index} className="problem-item">
              <CheckIcon size={28} />
              <p className="problem-text">{problem}</p>
            </div>
          ))}
        </div>
        
        <CTAButton text="Sí, es para mí" className="mt-16" />
      </div>
    </section>
  );
};

export default Problem;
