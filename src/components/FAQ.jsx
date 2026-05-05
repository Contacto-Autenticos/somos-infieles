import React, { useState } from 'react';
import CTAButton from './CTAButton';
import './FAQ.css';

const Plus = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Minus = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const faqs = [
  {
    question: '¿El libro está disponible físico o digital?',
    answer: 'Podrás encontrarlo en versión física, en versión digital y en versión Audio libro.'
  },
  {
    question: '¿Por dónde puedo tener más información del libro?',
    answer: 'Escribiendo al Whatsapp +57 316 428 7586 y al correo electrónico: info@felipebeltranh.com.'
  },
  {
    question: '¿Puedo pedir varios libros?',
    answer: 'Sí, todos los que quieras.'
  },
  {
    question: '¿Tienen envíos internacionales?',
    answer: 'Sí, realizamos envíos a nivel internacional. Los tiempos y costos de entrega pueden variar según tu país y ciudad de destino.'
  },
  {
    question: '¿Es seguro hacer el pago en esta página?',
    answer: 'Totalmente. Utilizamos pasarelas de pago certificadas con encriptación de seguridad para proteger todos tus datos personales y financieros en cada transacción.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section section-padding">
      <div className="container">
        <div className="faq-header">
          <h2 className="faq-title">
            Preguntas <br/>
            <span className="text-gold">frecuentes</span>
          </h2>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <CTAButton text="Asegurar mi copia hoy" className="mt-12" />
      </div>
    </section>
  );
};

export default FAQ;
