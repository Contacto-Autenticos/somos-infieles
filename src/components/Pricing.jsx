import React, { useState } from 'react';
import CTAButton from './CTAButton';
import './Pricing.css';

const CheckIcon = ({ size = 20, color = 'var(--color-gold)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CrossIcon = ({ size = 20, color = '#aaa' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

import CheckoutModal from './CheckoutModal';

const Pricing = () => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'digital' // 'digital', 'physical', 'vip'
  });

  const openModal = (type) => {
    setModalConfig({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  return (
    <section id="pricing" className="pricing-section section-padding">
      <div className="container">
        <div className="pricing-header">
          <div className="launch-badge">🔥 PRECIO DE LANZAMIENTO – SOLO POR TIEMPO LIMITADO</div>
          <h2 className="pricing-title">
            Elige tu <span className="text-gold">Experiencia</span>
          </h2>
          <p className="pricing-subtitle">
            Aprovecha nuestros precios especiales de lanzamiento. Una vez terminada la preventa, el libro volverá a su precio original.
          </p>
          
          <div className="scarcity-container">
            <p className="scarcity-text">🔥 87% de las copias en preventa vendidas</p>
            <div className="scarcity-bar">
              <div className="scarcity-progress" style={{ width: '87%' }}></div>
            </div>
          </div>
        </div>

        <div className="pricing-cards">
          
          {/* Plan Básico */}
          <div className="pricing-card basic">
            <h3 className="plan-name">Solo Digital</h3>
            <p className="plan-desc">Acceso inmediato a la verdad desde cualquier dispositivo.</p>
            <div className="plan-price-container">
              <span className="original-price">$29 USD</span>
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">15</span>
                <span className="period">USD</span>
              </div>
            </div>
            
            <ul className="plan-features">
              <li><CheckIcon /> Libro Digital (PDF)</li>
              <li className="disabled"><CrossIcon /> Audiolibro Completo</li>
              <li className="disabled"><CrossIcon /> Libro Físico (Tapa Blanda)</li>
              <li className="disabled"><CrossIcon /> Envío a Domicilio</li>
            </ul>
            
            <CTAButton 
              text="Elegir Digital" 
              className="pricing-cta" 
              onClick={() => openModal('digital')}
            />
          </div>

          {/* Plan Estándar (Físico) */}
          <div className="pricing-card standard">
            <h3 className="plan-name">Solo Físico</h3>
            <p className="plan-desc">Para los puristas del papel que aman el olor a libro nuevo.</p>
            <div className="last-units-badge">¡SOLO QUEDAN 14 COPIAS FÍSICAS!</div>
            <div className="plan-price-container">
              <span className="original-price">$39 USD</span>
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">20</span>
                <span className="period">USD</span>
              </div>
            </div>
            
            <ul className="plan-features">
              <li className="disabled"><CrossIcon /> Libro Digital (PDF)</li>
              <li className="disabled"><CrossIcon /> Audiolibro Completo</li>
              <li><CheckIcon /> Libro Físico (Tapa Blanda)</li>
              <li><CheckIcon /> Envío a Domicilio*</li>
            </ul>
            
            <CTAButton 
              text="Elegir Físico" 
              className="pricing-cta" 
              onClick={() => openModal('physical')}
            />
          </div>

          {/* Plan VIP (Best Seller) */}
          <div className="pricing-card vip">
            <div className="popular-badge">LA EXPERIENCIA TOTAL</div>
            <h3 className="plan-name text-gold">Experiencia VIP</h3>
            <p className="plan-desc" style={{ color: 'var(--color-darker)' }}>
              La colección completa para una transformación profunda y discreta.
            </p>
            <div className="last-units-badge">¡SOLO QUEDAN 14 COPIAS FÍSICAS!</div>
            <div className="plan-price-container">
              <span className="original-price" style={{ color: 'rgba(0,0,0,0.4)' }}>$89 USD</span>
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">22</span>
                <span className="period">USD</span>
              </div>
            </div>
            
            <ul className="plan-features">
              <li><CheckIcon /> Libro Digital (PDF)</li>
              <li><CheckIcon /> Libro Físico (Tapa Blanda)</li>
              <li><CheckIcon /> Envío a Domicilio*</li>
              <li className="bonus-feature">
                <CheckIcon color="#059669" /> 
                <span style={{ color: '#059669', fontWeight: 'bold' }}>BONUS: Audiolibro Completo</span>
              </li>
            </ul>
            
            <CTAButton 
              text="Quiero Todo + Bonus" 
              className="pricing-cta" 
              darkNote={true} 
              onClick={() => openModal('vip')}
            />
          </div>

        </div>
        <p className="pricing-disclaimer">* Los costos de envío pueden variar dependiendo de tu país o ciudad de destino.</p>
      </div>

      <CheckoutModal 
        isOpen={modalConfig.isOpen} 
        onClose={closeModal} 
        packageType={modalConfig.type} 
      />
    </section>
  );
};

export default Pricing;
