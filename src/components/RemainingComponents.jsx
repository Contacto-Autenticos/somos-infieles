import React from 'react';
import CTAButton from './CTAButton';

const Instagram = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Youtube = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const Transformation = () => (
  <section className="section-padding" style={{ backgroundColor: 'var(--color-white)' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <h2 className="responsive-title" style={{ color: 'var(--color-gold)', lineHeight: '1.1', textAlign: 'center', marginBottom: '2rem' }}>La revelación que cambiará tus relaciones</h2>
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', padding: '2rem', background: 'var(--color-gray)', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--color-black)', opacity: 0.6, textDecoration: 'line-through' }}>Antes del libro</h3>
          <p style={{ marginTop: '1rem', color: 'var(--color-black)' }}>Vives con culpa, reprimes tus deseos, buscas un ideal inalcanzable de fidelidad.</p>
        </div>
        <div style={{ flex: 1, minWidth: '300px', padding: '2rem', background: 'var(--color-gray)', borderTop: '4px solid var(--color-gold)', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--color-gold)' }}>Después del libro</h3>
          <p style={{ marginTop: '1rem', color: 'var(--color-black)' }}>Comprendes tu naturaleza, abrazas tus deseos sin culpa, y decides desde la consciencia, no desde el miedo.</p>
        </div>
      </div>
      <CTAButton text="Lo quiero ahora" className="mt-16" darkNote={true} />
    </div>
  </section>
);

export const AboutBook = () => (
  <section className="section-padding" style={{ backgroundColor: 'var(--color-dark)' }}>
    <div className="container">
      <div className="video-wrapper" style={{ maxWidth: '800px', margin: '0 auto 3.5rem', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src="https://www.youtube.com/embed/vDMdczIxJ9s"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <h2 className="responsive-title" style={{ marginBottom: '3rem', textAlign: 'center', color: 'var(--color-white)', lineHeight: '1.2' }}>
        ¿Qué descubrirás <br /> <span style={{ whiteSpace: 'nowrap' }}>en "<span style={{ color: 'var(--color-gold)' }}>Somos</span> Infieles"?</span>
      </h2>
      <ul style={{ maxWidth: '600px', margin: '0 auto', listStyle: 'none', padding: 0 }}>
        {["El origen biológico y psicológico del deseo.", "Por qué la monogamia es un acuerdo, no una condición natural.", "Cómo separar el amor del deseo sexual.", "Herramientas para hablar de fantasías con tu pareja sin destruir la relación."].map((item, i) => (
          <li key={i} style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>✓</span> {item}
          </li>
        ))}
      </ul>
      <CTAButton text="Acceder a este conocimiento" className="mt-16" />
    </div>
  </section>
);

export const NotForEveryone = () => (
  <section className="section-padding" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
    <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
      <h2 style={{ color: '#ff4b4b', fontSize: '2rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Advertencia: Este libro no es para todos</h2>
      <p style={{ fontSize: '1.2rem', color: 'var(--color-gray)' }}>Si buscas cuentos de hadas, finales felices de Hollywood, o si no estás dispuesto a cuestionar lo que la sociedad te ha enseñado sobre el amor, <strong>no leas este libro</strong>. Te incomodará.</p>
    </div>
  </section>
);



export const Author = () => (
  <section className="section-padding" style={{ backgroundColor: 'var(--color-dark)' }}>
    <div className="container">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img 
            src="/Autor Libro Somos infieles.png" 
            alt="Felipe Beltrán Hernández" 
            style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', objectFit: 'cover' }} 
          />
        </div>
        <div style={{ flex: '1 1 500px' }}>
          <h2 className="responsive-title" style={{ marginBottom: '0.5rem', color: 'var(--color-white)' }}>Felipe Beltrán Hernández</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-gold)', marginBottom: '2rem', fontStyle: 'italic' }}>Escritor, mentor y speaker</p>
          
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-gray)', marginBottom: '1.5rem' }}>
            Es economista y un apasionado buscador de la verdad que, durante casi dos décadas ha combinado su pasión por crear y de desarrollar negocios, con su profundo interés por entender, acompañar y potenciar los talentos naturales de los seres humanos a través de <a href="https://www.autenticos.co/" target="_blank" rel="noopener noreferrer" className="autenticos-link" style={{ color: 'var(--color-gold)', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '1.3rem' }}>Auténticos <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>.
          </p>
          
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-gray)', marginBottom: '1.5rem' }}>
            Su enfoque en temas relacionados con las ciencias sociales y el comportamiento humano, le han permitido comprender la mecánica del universo y la relación que los individuos tienen con él.
          </p>



          <blockquote style={{ borderLeft: '4px solid var(--color-gold)', paddingLeft: '1.5rem', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--color-white)', margin: 0 }}>
            «Sí esta obra salva una relación de pareja, un hogar, la vida de una persona o contribuye a que tengamos relaciones más sanas y honestas, habrá tenido sentido»
          </blockquote>
        </div>
      </div>
      <CTAButton text="Quiero el libro ahora" className="mt-16" />
    </div>
  </section>
);

export const Guarantee = () => (
  <section className="section-padding" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)', textAlign: 'center' }}>
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        <img 
          src="/Garantia.png?v=3" 
          alt="Garantía de 7 Días" 
          style={{ width: '620px', maxWidth: '100%', height: 'auto' }} 
        />
      </div>
      <h2 className="responsive-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-black)' }}>
        Tranquilo, tu compra está <br /> <span style={{ color: 'var(--color-gold)' }}>100% protegida.</span>
      </h2>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444' }}>
        Si por cualquier motivo no has recibido el libro en un plazo de 7 días. Podrás solicitar el reembolso completo, sin complicaciones.
      </p>
      <CTAButton text="Sí, lo necesito" className="mt-16" darkNote={true} />
    </div>
  </section>
);

export const Footer = () => (
  <footer style={{ backgroundColor: 'var(--color-gray)', padding: '3rem 0', textAlign: 'center' }}>
    <div className="container">
      <h3 style={{ marginBottom: '1rem', color: 'var(--color-dark)' }}>SOMOS INFIELES</h3>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '1.5rem 0' }}>
        <a href="https://www.instagram.com/felipebeltranhernandez/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)' }}>
          <Instagram size={28} />
        </a>
        <a href="https://www.facebook.com/felipebeltranhernandez/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)' }}>
          <Facebook size={28} />
        </a>
        <a href="https://www.youtube.com/felipebeltranhernandez" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)' }}>
          <Youtube size={28} />
        </a>
        <a href="https://www.linkedin.com/in/felipebeltranh/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)' }}>
          <Linkedin size={28} />
        </a>
      </div>

      <p style={{ color: 'var(--color-black)', fontSize: '0.9rem', opacity: 0.7 }}>© 2026 Todos los derechos reservados.</p>
    </div>
  </footer>
);
