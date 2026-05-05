import React, { useState, useEffect } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';
import './CheckoutModal.css';

const CheckoutModal = ({ isOpen, onClose, packageType }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    housingType: 'casa', // 'casa' o 'unidad'
    unitName: '',
    floor: '',
    apartment: ''
  });

  // Reset form when opening/closing or changing type
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isPhysical = packageType === 'physical' || packageType === 'vip';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Gracias por tu interés. En un entorno real, aquí se conectaría con la pasarela de pago.');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2 className="modal-title">Finalizar Pedido</h2>
          <p className="modal-subtitle">Estás a un paso de obtener tu copia de <strong>"Somos Infieles"</strong></p>

          <div className="form-group">
            <label>NOMBRE Y APELLIDO</label>
            <input 
              type="text" 
              name="fullName" 
              placeholder="Tu nombre y apellido" 
              required 
              value={formData.fullName}
              onChange={handleChange}
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
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>PISO</label>
                      <input 
                        type="text" 
                        name="floor" 
                        placeholder="Ejem: 5" 
                        required 
                        value={formData.floor}
                        onChange={handleChange}
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

          <button type="submit" className="modal-submit-btn">
            CONTINUAR <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
