import React from 'react';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import './PaymentStatus.css';

const STATUS_CONFIG = {
  approved: {
    icon: CheckCircle,
    iconColor: '#22c55e',
    title: '¡Pago Exitoso!',
    message: 'Tu compra ha sido procesada correctamente. Recibirás un correo electrónico con los detalles de tu pedido.',
    bgClass: 'status-success'
  },
  failure: {
    icon: XCircle,
    iconColor: '#ef4444',
    title: 'Pago Rechazado',
    message: 'Hubo un problema al procesar tu pago. Por favor, intenta nuevamente o usa otro método de pago.',
    bgClass: 'status-failure'
  },
  pending: {
    icon: Clock,
    iconColor: '#f59e0b',
    title: 'Pago Pendiente',
    message: 'Tu pago está siendo procesado. Te notificaremos por correo electrónico cuando se confirme.',
    bgClass: 'status-pending'
  }
};

const PaymentStatus = ({ status, onBack }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const IconComponent = config.icon;

  return (
    <div className={`payment-status-overlay ${config.bgClass}`}>
      <div className="payment-status-card">
        <div className="status-icon-wrapper">
          <IconComponent size={64} color={config.iconColor} strokeWidth={1.5} />
        </div>
        <h2 className="status-title">{config.title}</h2>
        <p className="status-message">{config.message}</p>
        
        {status === 'approved' && (
          <div className="status-details">
            <p>📧 Revisa tu bandeja de entrada (y la carpeta de spam)</p>
            <p>📖 ¡Disfruta la lectura!</p>
          </div>
        )}

        {status === 'failure' && (
          <button className="status-retry-btn" onClick={onBack}>
            <ArrowLeft size={18} /> Intentar de nuevo
          </button>
        )}

        <button className="status-home-btn" onClick={onBack}>
          Volver a la página principal
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
