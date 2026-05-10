import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Book, Headphones } from 'lucide-react';
import './PurchaseNotifications.css';

const PURCHASE_DATA = [
  { name: 'Ricardo G.', type: 'Solo Digital', time: 'hace 2 min' },
  { name: 'Valentina M.', type: 'Experiencia VIP', time: 'hace 5 min' },
  { name: 'Javier S.', type: 'Solo Físico', time: 'hace 8 min' },
  { name: 'Marta R.', type: 'Solo Digital', time: 'hace 12 min' },
  { name: 'Carlos L.', type: 'Experiencia VIP', time: 'hace 15 min' },
  { name: 'Sofia T.', type: 'Solo Físico', time: 'hace 18 min' },
  { name: 'Andrés B.', type: 'Solo Digital', time: 'hace 22 min' },
  { name: 'Elena F.', type: 'Experiencia VIP', time: 'hace 25 min' },
  { name: 'Diego N.', type: 'Solo Digital', time: 'hace 30 min' },
  { name: 'Camila P.', type: 'Solo Físico', time: 'hace 35 min' },
  { name: 'Luis M.', type: 'Experiencia VIP', time: 'hace 40 min' },
  { name: 'Isabela D.', type: 'Solo Digital', time: 'hace 45 min' },
];

const PurchaseNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const showNotification = () => {
      // Get a random purchase or follow the sequence
      const nextIndex = Math.floor(Math.random() * PURCHASE_DATA.length);
      setCurrentNotification(PURCHASE_DATA[nextIndex]);
      
      // Hide after 7 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 7000);
    };

    // Show first notification after 5 seconds
    const initialTimer = setTimeout(showNotification, 5000);

    // Set interval for subsequent notifications
    const interval = setInterval(() => {
      showNotification();
    }, 25000); // Every 25 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'Experiencia VIP':
        return <Star className="notification-icon" size={20} />;
      case 'Solo Digital':
        return <Book className="notification-icon" size={20} />;
      case 'Solo Físico':
        return <ShoppingBag className="notification-icon" size={20} />;
      default:
        return <ShoppingBag className="notification-icon" size={20} />;
    }
  };

  return (
    <div className="purchase-notifications-container">
      <div className="purchase-notification">
        <div className="notification-icon-wrapper">
          {getIcon(currentNotification.type)}
        </div>
        <div className="notification-content">
          <span className="notification-name">{currentNotification.name}</span>
          <span className="notification-text">
            compró el paquete <strong>{currentNotification.type}</strong>
          </span>
          <span className="notification-time">{currentNotification.time}</span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseNotifications;
