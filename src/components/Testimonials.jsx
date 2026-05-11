import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(true);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const requestRef = useRef();
  const lastTimeRef = useRef();
  const items = [
    {
      type: 'text',
      initials: "A.S.",
      text: "Por fin lo terminé... No fue un libro sencillo de leer; me demoré porque era necesario procesar cada capítulo. Pero honestamente me dio los argumentos y explicaciones a esas ideas que siempre he tenido sobre la fidelidad e infidelidad."
    },
    {
      type: 'image',
      src: "/Testimonio 1.jpg",
      alt: "Lector de Somos infieles 1"
    },
    {
      type: 'text',
      initials: "R.B.",
      text: "¡Un libro que te permite ver las diferentes situaciones de otra forma! Contiene herramientas que me confrontaron y que habrían sido muy útiles si las hubiera tenido más joven. Recomendado para que los jóvenes entiendan cómo amar sin sufrir y sin hacer sufrir a los demás."
    },
    {
      type: 'image',
      src: "/Testimonio 2.jpg",
      alt: "Lector de Somos infieles 2"
    },
    {
      type: 'text',
      initials: "G.V.",
      text: "Es un libro muy bien escrito, fácil de leer, práctico y vigente. Permite abrir la mente a nuevas formas de relacionarnos con nuestro entorno y parejas, pero sobre todo con nosotros mismos. Más que respuestas, ofrece reflexiones y cuestionamientos que permiten hacer un análisis interno. 100% recomendado."
    },
    {
      type: 'image',
      src: "/Testimonio 3.png",
      alt: "Lector de Somos infieles 3"
    },
    {
      type: 'text',
      initials: "M.R.",
      text: "Muchas gracias Felipe. Aunque no he terminado el libro, te agradezco por aclararme las ideas confusas que me hacían pensar que estaba loca y sentirme apática a la realidad de las personas que me rodean. ¡Gracias por este libro!"
    },
    {
      type: 'image',
      src: "/Testimonio 4.jpg",
      alt: "Lector de Somos infieles 4"
    },
    {
      type: 'text',
      initials: "L.G.",
      text: "Es muy corto, ¡quedas con la sensación de leer más! Hay tantas cosas que decir acerca del tema, muero de ganas por una tertulia. Ya les compartí el link para comprarlo a otros amigos en un grupo. ¡Me encantó!"
    },
    {
      type: 'image',
      src: "/Testimonio 5.png",
      alt: "Lector de Somos infieles 5"
    },
    {
      type: 'text',
      initials: "P.S.",
      text: "Ya lo leí, y es exactamente lo que pensaba, te felicito porque no todos se lanzan a compartir lo que realmente es humano y a aceptar su naturaleza. Yo he perdido amores cuando les cuento cómo pienso y se asustan. De hecho hay mucha gente que, así sean infieles, prefieren pensar que hay algo malo en ellos antes de aceptar algo tan humano."
    },
    {
      type: 'image',
      src: "/Testimonio 6.jpg",
      alt: "Lector de Somos infieles 6"
    },
    {
      type: 'text',
      initials: "M.A.",
      text: "Aunque cuestiona fuertemente y pone a tambalear nuestras creencias limitantes, siento que este libro se puede convertir en una herramienta de sanación."
    },
    {
      type: 'image',
      src: "/Testimonio 7.jpg",
      alt: "Lector de Somos infieles 7"
    },
    {
      type: 'text',
      initials: "C.R.",
      text: "Con palabras claras, un lenguaje sencillo y un mensaje directo, \"Somos infieles\" es muy ameno de leer, a menos que tu ego y creencias te pongan en conflicto."
    },
    {
      type: 'text',
      initials: "J.D.",
      text: "Ojalá hubiera leído esto antes de mi divorcio. Cambió por completo mi forma de ver el amor, el compromiso y lo que realmente significa la lealtad."
    },
    {
      type: 'text',
      initials: "S.T.",
      text: "Un viaje de autodescubrimiento crudo, doloroso pero tremendamente real. Se lo recomiendo a cualquier pareja que esté lista para ser verdaderamente honesta."
    },
    {
      type: 'text',
      initials: "A.P.",
      text: "Increíble cómo este libro me dio las palabras para expresar lo que siempre sentí pero nunca me atreví a decir por miedo al juicio social."
    },
    {
      type: 'text',
      initials: "L.M.",
      text: "Una lectura obligatoria. Te desarma por completo y te obliga a reconstruir tus conceptos de amor y fidelidad sobre bases mucho más sanas."
    }
  ];

  const scroll = (time) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = time - lastTimeRef.current;
      const speed = 0.05; // Ajustar velocidad aquí (píxeles por ms)
      offsetRef.current -= speed * deltaTime;

      // Calcular el ancho de un set de items
      const cardWidth = window.innerWidth <= 768 ? 280 : 350;
      const gap = 32; // 2rem
      const totalWidth = (cardWidth + gap) * items.length;

      if (Math.abs(offsetRef.current) >= totalWidth) {
        offsetRef.current += totalWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(scroll);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleManualNav = (direction) => {
    setIsPlaying(false);
    const cardWidth = window.innerWidth <= 768 ? 280 : 350;
    const gap = 32;
    const step = cardWidth + gap;
    
    // Alinear al comentario más cercano
    const currentItem = Math.round(Math.abs(offsetRef.current) / step);
    let nextItem = direction === 'next' ? currentItem + 1 : currentItem - 1;
    
    // Evitar saltos bruscos en los límites del loop infinito
    let nextOffset = -nextItem * step;
    
    // Si llegamos al final del clon, reseteamos posición sin que se note
    const totalWidth = step * items.length;
    
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
      offsetRef.current = nextOffset;
      trackRef.current.style.transform = `translateX(${nextOffset}px)`;
      
      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = 'none';
          // Si nos pasamos del rango original, ajustamos silenciosamente
          if (Math.abs(offsetRef.current) >= totalWidth) {
            offsetRef.current += totalWidth;
            trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
          } else if (offsetRef.current > 0) {
            offsetRef.current -= totalWidth;
            trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
          }
        }
      }, 600);
    }
  };

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
          <div 
            className="carousel-track" 
            ref={trackRef}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {[...items, ...items, ...items].map((item, index) => (
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

        <div className="carousel-controls">
          <button 
            className="control-btn" 
            onClick={() => handleManualNav('prev')}
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="control-btn play-pause-btn" 
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button 
            className="control-btn" 
            onClick={() => handleManualNav('next')}
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
