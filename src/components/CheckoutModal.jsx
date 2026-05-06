import React, { useState, useEffect } from 'react';
import { X, Lock, ArrowRight, Loader, ShieldCheck } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './CheckoutModal.css';

// Package configuration: maps packageType to title and USD price
const PACKAGE_CONFIG = {
  digital: { title: 'Somos Infieles - Digital + Audio', priceUSD: 15 },
  physical: { title: 'Somos Infieles - Solo Físico', priceUSD: 20 },
  vip: { title: 'Somos Infieles - Experiencia VIP', priceUSD: 22 }
};

const CheckoutModal = ({ isOpen, onClose, packageType }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    housingType: 'casa',
    unitName: '',
    floor: '',
    apartment: ''
  });
  const [status, setStatus] = useState('idle'); // idle, processing, error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatus('idle');
      setErrorMsg('');
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isPhysical = packageType === 'physical' || packageType === 'vip';
  const pkg = PACKAGE_CONFIG[packageType] || PACKAGE_CONFIG.digital;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('processing');
    setErrorMsg('');

    try {
      // 1. Generate a unique reference for this order
      const reference = `SI-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

      // 2. Determine the back URL (current origin)
      const backUrl = window.location.origin;

      // 3. Call the Edge Function to create the Mercado Pago preference
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-mp-preference-infieles`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            title: pkg.title,
            unit_price_usd: pkg.priceUSD,
            user_email: formData.email,
            reference: reference,
            back_url: backUrl
          })
        }
      );

      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const textError = await response.text();
        console.error('Respuesta no-JSON de la función:', textError);
        throw new Error(`Error del servidor (${response.status}). Por favor contacta a soporte.`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la preferencia de pago');
      }

      // 4. Save buyer data to Supabase
      const { error: dbError } = await supabase
        .from('compradores_somos_infieles')
        .insert([{
          nombre: formData.fullName,
          email: formData.email,
          telefono: formData.phone,
          ciudad: isPhysical ? formData.city : null,
          direccion: isPhysical ? formData.address : null,
          tipo_vivienda: isPhysical ? formData.housingType : null,
          nombre_unidad: isPhysical && formData.housingType === 'unidad' ? formData.unitName : null,
          piso: isPhysical && formData.housingType === 'unidad' ? formData.floor : null,
          apartamento: isPhysical && formData.housingType === 'unidad' ? formData.apartment : null,
          paquete: packageType,
          precio_usd: pkg.priceUSD,
          precio_cop: data.unit_price_cop,
          estado_pago: 'pendiente',
          mp_preference_id: data.id
        }]);

      if (dbError) {
        console.error('Error guardando comprador:', dbError);
        // Continue to payment even if DB save fails
      }

      // 5. Redirect to Mercado Pago checkout
      window.location.href = data.init_point;

    } catch (error) {
      console.error('Error en el checkout:', error);
      setStatus('error');
      setErrorMsg(error.message || 'Hubo un error al procesar tu pedido. Intenta nuevamente.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} disabled={status === 'processing'}>
          <X size={24} />
        </button>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2 className="modal-title">Finalizar Pedido</h2>
          <p className="modal-subtitle">
            Estás a un paso de obtener tu copia de <strong>"Somos Infieles"</strong>
            <br />
            <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>
              {pkg.title.replace('Somos Infieles - ', '')} — ${pkg.priceUSD} USD
            </span>
          </p>

          <div className="form-group">
            <label>NOMBRE Y APELLIDO</label>
            <input 
              type="text" 
              name="fullName" 
              placeholder="Tu nombre y apellido" 
              required 
              value={formData.fullName}
              onChange={handleChange}
              disabled={status === 'processing'}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>EMAIL</label>
              <input 
                type="email" 
                name="email" 
                placeholder="tu@email.com" 
                required 
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'processing'}
              />
            </div>
            <div className="form-group">
              <label>TELÉFONO / WHATSAPP</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Ej: +57 300 000 0000" 
                required 
                value={formData.phone}
                onChange={handleChange}
                disabled={status === 'processing'}
              />
            </div>
          </div>

          {isPhysical && (
            <div className="physical-fields">
              <div className="form-row">
                <div className="form-group">
                  <label>CIUDAD</label>
                  <input 
                    type="text" 
                    name="city" 
                    placeholder="Ciudad de destino" 
                    required 
                    value={formData.city}
                    onChange={handleChange}
                    disabled={status === 'processing'}
                  />
                </div>
                <div className="form-group">
                  <label>DIRECCIÓN</label>
                  <input 
                    type="text" 
                    name="address" 
                    placeholder="Calle, carrera, #, etc." 
                    required 
                    value={formData.address}
                    onChange={handleChange}
                    disabled={status === 'processing'}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>TIPO DE VIVIENDA</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="housingType" 
                      value="casa" 
                      checked={formData.housingType === 'casa'}
                      onChange={handleChange}
                      disabled={status === 'processing'}
                    />
                    <span>Casa</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="housingType" 
                      value="unidad" 
                      checked={formData.housingType === 'unidad'}
                      onChange={handleChange}
                      disabled={status === 'processing'}
                    />
                    <span>Unidad Residencial</span>
                  </label>
                </div>
              </div>

              {formData.housingType === 'unidad' && (
                <div className="unit-details animate-fade-in">
                  <div className="form-group">
                    <label>NOMBRE DE LA UNIDAD / EDIFICIO</label>
                    <input 
                      type="text" 
                      name="unitName" 
                      placeholder="Nombre del conjunto" 
                      required 
                      value={formData.unitName}
                      onChange={handleChange}
                      disabled={status === 'processing'}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>TORRE</label>
                      <input 
                        type="text" 
                        name="floor" 
                        placeholder="Ejem: 5" 
                        required 
                        value={formData.floor}
                        onChange={handleChange}
                        disabled={status === 'processing'}
                      />
                    </div>
                    <div className="form-group">
                      <label>NÚMERO DE APARTAMENTO</label>
                      <input 
                        type="text" 
                        name="apartment" 
                        placeholder="Ejem: 502" 
                        required 
                        value={formData.apartment}
                        onChange={handleChange}
                        disabled={status === 'processing'}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="modal-privacy">
            <Lock size={14} className="lock-icon" />
            <p>Tus datos están protegidos y no serán compartidos con terceros sin tu autorización.</p>
          </div>

          {status === 'error' && (
            <div className="checkout-error">
              <p>⚠️ {errorMsg}</p>
            </div>
          )}

          <button type="submit" className="modal-submit-btn" disabled={status === 'processing'}>
            {status === 'processing' ? (
              <>
                <Loader size={20} className="spinner" /> PROCESANDO...
              </>
            ) : (
              <>
                CONTINUAR AL PAGO <ArrowRight size={20} />
              </>
            )}
          </button>

          <div className="secure-checkout-footer">
            <div className="secure-badge">
              <ShieldCheck size={16} className="shield-icon" />
              <span>Compra 100% segura</span>
            </div>
            <div className="payment-methods-logos">
              <img src="/Icono - Visa.png" alt="Visa" className="payment-logo" />
              <img src="/Icono - Mastercard.png" alt="Mastercard" className="payment-logo" />
              <img src="/Icono - Mercado pago.png" alt="Mercado Pago" className="payment-logo mp-logo-img" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
