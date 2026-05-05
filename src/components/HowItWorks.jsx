import React from 'react';
import { ShieldCheck, Zap, Truck } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'Compra segura',
    description: 'Elige tu formato y paga discretamente con cifrado SSL.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Acceso Inmediato',
    description: 'Recibe la versión digital y el audio en tu correo al instante.'
  },
  {
    icon: <Truck size={32} />,
    title: 'Envío VIP',
    description: 'Si elegiste físico, lo enviamos en empaque discreto en 24h.'
  }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works-section section-padding">
      <div className="container">
        <div className="section-header text-center mb-16">
          <h2 className="section-title">
            Tu proceso es <span className="text-gold">Sencillo y Privado</span>
          </h2>
        </div>
        
        <div className="how-it-works-grid">
          {steps.map((step, index) => (
            <div key={index} className="how-step">
              <div className="step-icon-container">
                <div className="step-icon">{step.icon}</div>
                {index < steps.length - 1 && <div className="step-connector"></div>}
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
