import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase
        .from('compradores')
        .insert([{
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono
        }]);

      if (error) throw error;
      
      setStatus('success');
      // Here we would integrate Wompi redirect
      // window.location.href = `https://checkout.wompi.co/p/...`
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="checkout" className="checkout-section section-padding">
      <div className="container">
        <div className="checkout-card">
          <h2 className="checkout-title">Comienza tu transformación</h2>
          <p className="checkout-subtitle">Completa tus datos para acceder al libro (Versión Digital / Física).</p>
          
          {status === 'success' ? (
            <div className="success-message">
              <h3>¡Registro Exitoso!</h3>
              <p>En este momento te redirigiríamos a la pasarela de pagos (Wompi).</p>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo *</label>
                <input type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono (Opcional)</label>
                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
              </div>
              
              {status === 'error' && <div className="error-message">Hubo un error al guardar tus datos. Intenta nuevamente.</div>}
              
              <button type="submit" className="btn-primary form-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Procesando...' : 'Comprar Ahora'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
