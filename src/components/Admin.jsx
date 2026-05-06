import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  CreditCard, 
  Search, 
  RefreshCcw, 
  Calendar, 
  Filter, 
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Building,
  LogOut,
  CircleUser
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('adminAuth') === 'true'
  );
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ 
    total: 0, 
    confirmed: 0, 
    pendingPayment: 0, 
    revenue: 0, 
    pendingDispatch: 0 
  });
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('compradores_somos_infieles')
        .select('*')
        .order('created_at', { ascending: false });

      if (dateFrom) {
        query = query.gte('created_at', `${dateFrom}T00:00:00`);
      }
      if (dateTo) {
        query = query.lte('created_at', `${dateTo}T23:59:59`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setOrders(data || []);
      calculateStats(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDespacho = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('compradores_somos_infieles')
        .update({ despachado: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setOrders(prev => prev.map(o => o.id === id ? { ...o, despachado: !currentStatus } : o));
    } catch (err) {
      console.error('Error updating despacho:', err);
      alert('No se pudo actualizar el estado de despacho.');
    }
  };

  const handleUpdateGuia = async (id, numeroGuia) => {
    try {
      const { error } = await supabase
        .from('compradores_somos_infieles')
        .update({ numero_guia: numeroGuia })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setOrders(prev => prev.map(o => o.id === id ? { ...o, numero_guia: numeroGuia } : o));
    } catch (err) {
      console.error('Error updating tracking number:', err);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const confirmed = data.filter(o => o.estado_pago === 'pagado').length;
    const pendingPayment = data.filter(o => o.estado_pago !== 'pagado').length;
    
    const revenue = data
      .filter(o => o.estado_pago === 'pagado')
      .reduce((acc, o) => acc + (o.precio_usd || 0), 0);
      
    const pendingDispatch = data.filter(o => 
      (o.paquete === 'physical' || o.paquete === 'vip') && 
      o.estado_pago === 'pagado' && 
      !o.despachado
    ).length;

    setStats({ total, confirmed, pendingPayment, revenue, pendingDispatch });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPackageLabel = (pkg) => {
    switch(pkg) {
      case 'digital': return 'Digital + Audio';
      case 'physical': return 'Solo Físico';
      case 'vip': return 'Experiencia VIP';
      default: return pkg;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('adminAuth', 'true');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <div className="admin-logo">
          <span className="somos">Somos</span> <span className="infieles">Infieles</span>
        </div>
        <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <CircleUser size={28} color="var(--color-gold)" />
          
          {showDropdown && (
            <div className="profile-dropdown" onClick={e => e.stopPropagation()}>
              <div className="dropdown-header">
                <span className="dropdown-user-name">CEO-admin</span>
                <span className="dropdown-user-role">Administrador Principal</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="admin-header">
        <div className="admin-title">
          <CreditCard size={32} color="var(--color-gold)" />
          <span>Transacciones</span>
        </div>

        <div className="admin-filters">
          <div className="filter-group">
            <label><Calendar size={16} /> Desde:</label>
            <input 
              type="date" 
              value={dateFrom} 
              onChange={(e) => setDateFrom(e.target.value)} 
            />
          </div>
          <div className="filter-group">
            <label><Calendar size={16} /> Hasta:</label>
            <input 
              type="date" 
              value={dateTo} 
              onChange={(e) => setDateTo(e.target.value)} 
            />
          </div>
          <button className="btn-apply" onClick={fetchOrders}>
            <Filter size={18} /> Aplicar
          </button>
          <button className="btn-refresh" onClick={fetchOrders} title="Actualizar">
            <RefreshCcw size={20} className={loading ? 'spinner' : ''} />
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-label">Total Pedidos</div>
          <div className="stat-split">
            <div className="split-item">
              <div className="split-value confirmed">{stats.confirmed}</div>
              <div className="split-label">Confirmados</div>
            </div>
            <div className="split-divider"></div>
            <div className="split-item">
              <div className="split-value pending">{stats.pendingPayment}</div>
              <div className="split-label">Pendientes</div>
            </div>
          </div>
        </div>
        <div className="stat-card stat-revenue">
          <div className="stat-label">Recaudado (USD)</div>
          <div className="stat-value">${stats.revenue}</div>
        </div>
        <div className="stat-card stat-pending">
          <div className="stat-label">Pendientes por Despacho</div>
          <div className="stat-value">{stats.pendingDispatch}</div>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>Cargando datos...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Estado</th>
                <th>Monto</th>
                <th>Paquete</th>
                <th>Comprador</th>
                <th>Correo / Teléfono</th>
                <th>Ubicación</th>
                <th>Vivienda / Torre / Apto</th>
                <th>Despacho</th>
                <th># Guía <br /> Coordinadora</th>
                <th>Fecha y Hora</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '3rem' }}>No hay transacciones registradas</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className={`status-badge ${order.estado_pago || 'pendiente'}`}>
                        {order.estado_pago || 'pendiente'}
                      </span>
                    </td>
                    <td className="col-monto">
                      ${order.precio_usd} USD
                      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>~ ${order.precio_cop?.toLocaleString()} COP</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{getPackageLabel(order.paquete)}</span>
                    </td>
                    <td className="col-comprador">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={14} /> {order.nombre}
                      </div>
                    </td>
                    <td className="col-email">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Mail size={14} /> {order.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <Phone size={14} /> {order.telefono}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={14} /> {order.ciudad || 'N/A'}
                      </div>
                      <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>{order.direccion || '-'}</div>
                    </td>
                    <td>
                      {order.paquete === 'digital' ? (
                        <div style={{ color: '#aaa', fontSize: '0.85rem' }}>N/A</div>
                      ) : (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {order.tipo_vivienda === 'casa' ? <Home size={14} /> : <Building size={14} />}
                            {order.tipo_vivienda === 'casa' ? 'Casa' : (order.nombre_unidad || 'Unidad')}
                          </div>
                          {order.tipo_vivienda === 'unidad' && (
                            <div style={{ fontSize: '0.85rem', marginTop: '4px', opacity: 0.8 }}>
                              T: {order.piso} | Apto: {order.apartamento}
                            </div>
                          )}
                        </>
                      )}
                    </td>
                    <td>
                      {order.paquete === 'digital' ? (
                        <div style={{ textAlign: 'center', color: '#aaa', fontSize: '0.85rem' }}>N/A</div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <input 
                            type="checkbox" 
                            checked={order.despachado || false} 
                            onChange={() => handleToggleDespacho(order.id, order.despachado)}
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      {order.paquete === 'digital' ? (
                        <div style={{ textAlign: 'center', color: '#aaa', fontSize: '0.85rem' }}>N/A</div>
                      ) : (
                        <input 
                          type="text"
                          className="tracking-input"
                          placeholder="Ej: 123456"
                          value={order.numero_guia || ''}
                          disabled={order.despachado}
                          onChange={(e) => {
                            const val = e.target.value;
                            setOrders(prev => prev.map(o => o.id === order.id ? { ...o, numero_guia: val } : o));
                          }}
                          onBlur={(e) => handleUpdateGuia(order.id, e.target.value)}
                        />
                      )}
                    </td>
                    <td style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                      {formatDate(order.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
