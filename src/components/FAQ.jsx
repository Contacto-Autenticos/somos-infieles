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
    question: '¿Aparecerá "Somos Infieles" en mi extracto bancario?',
    answer: 'No. Para proteger tu privacidad, el cobro aparecerá a nombre de "Felipe Beltrán H." o "Mercado Pago". En ningún momento se mencionará el título del libro en tu registro bancario.'
  },
  {
    question: '¿El envío del libro físico es discreto?',
    answer: 'Totalmente. El paquete se envía en un sobre o caja de seguridad estándar sin logos llamativos ni el título del libro a la vista. El remitente figurará como "Logística FB" para garantizar total discreción.'
  },
  {
    question: '¿Es seguro mi pago?',
    answer: 'Totalmente. Utilizamos pasarelas de pago líderes (Mercado Pago / Stripe) con cifrado SSL de 256 bits. Tus datos financieros nunca son almacenados en nuestros servidores y la transacción está 100% protegida.'
  },
  {
    question: '¿Cuánto tarda en llegar el libro físico?',
    answer: 'Para envíos nacionales en Colombia, el tiempo estimado es de 3 a 5 días hábiles. Para envíos internacionales, el tiempo puede variar entre 8 y 15 días hábiles dependiendo de la ciudad de destino.'
  },
  {
    question: '¿Puedo leer el digital en Kindle o en mi celular?',
    answer: '¡Sí! Al comprar la versión digital, recibirás el libro en formatos PDF y EPUB, compatibles con Kindle, iBooks, Google Books y cualquier dispositivo móvil o tablet.'
  },
  {
    question: '¿El libro está disponible físico o digital?',
    answer: 'Podrás encontrarlo en versión física, en versión digital y en versión Audio libro. También puedes optar por "La Experiencia Total" que incluye todos los formatos.'
  },
  {
    question: '¿Por dónde puedo tener más información del libro?',
    answer: 'Puedes escribirnos directamente al WhatsApp +57 316 428 7586 o al correo electrónico: info@felipebeltranh.com. Estamos atentos para resolver cualquier duda.'
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
