import React from 'react';
import './Testimonials.css';

const Star = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--color-gold)" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const Quote = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gray)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, marginBottom: '1rem' }}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
  </svg>
);

const Testimonials = () => {
  const items = [
    {
      type: 'text',
      initials: "M.A.",
      text: "Este libro me quitó un peso inmenso de encima. Entendí que mis deseos no me hacen una mala persona y pude hablar de mis fantasías sin culpa."
    },
    {
      type: 'image',
      src: "/Testimonio 1.jpg",
      alt: "Lector de Somos infieles 1"
    },
    {
      type: 'text',
      initials: "C.R.",
      text: "Lloré leyendo el capítulo sobre el origen biológico del deseo. Finalmente alguien explica la infidelidad sin juzgar ni victimizar."
    },
    {
      type: 'image',
      src: "/Testimonio 2.png",
      alt: "Lector de Somos infieles 2"
    },
    {
      type: 'text',
      initials: "J.D.",
      text: "Ojalá hubiera leído esto antes de mi divorcio. Cambió por completo mi forma de ver el amor, el compromiso y lo que realmente significa la lealtad."
    },
    {
      type: 'image',
      src: "/Testimonio 3.png",
      alt: "Lector de Somos infieles 3"
    },
    {
      type: 'text',
      initials: "S.T.",
      text: "Un viaje de autodescubrimiento crudo, doloroso pero tremendamente real. Se lo recomiendo a cualquier pareja que esté lista para ser verdaderamente honesta."
    }
  ];

  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <h2 className="testimonials-title">
          Lo que dicen <span className="text-gold">los lectores</span>
        </h2>
        <p className="testimonials-subtitle">
          Historias reales de personas que se atrevieron a cuestionar sus creencias.
        </p>

        <div className="carousel-container">
          <div className="carousel-track">
            {[...items, ...items].map((item, index) => (
              <div key={index} className={`testimonial-card ${item.type === 'image' ? 'card-image' : ''}`}>
                {item.type === 'text' ? (
                  <>
                    <Quote />
                    <p className="testimonial-text">"{item.text}"</p>
                    
                    <div className="testimonial-footer">
                      <div className="stars">
                        <Star /><Star /><Star /><Star /><Star />
                      </div>
                      <span className="testimonial-author">- {item.initials}</span>
                    </div>
                  </>
                ) : (
                  <img src={item.src} alt={item.alt} className="reader-photo" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
