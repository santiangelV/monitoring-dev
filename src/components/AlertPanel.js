import React, { useState, useEffect } from 'react';

const AlertPanel = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simular alertas en tiempo real
    const alertTypes = [
      { message: 'CPU sobre 90%', severity: 'critical' },
      { message: 'Memoria en 85%', severity: 'warning' },
      { message: 'Disco lleno al 95%', severity: 'critical' },
      { message: 'Latencia alta', severity: 'warning' }
    ];

    const interval = setInterval(() => {
      setAlerts(prevAlerts => {
        // Resolver aleatoriamente algunas alertas
        const updatedAlerts = prevAlerts.map(alert => 
          Math.random() > 0.9 ? { ...alert, status: 'resolved' } : alert
        ).filter(alert => alert.status !== 'resolved');

        // Agregar nuevas alertas aleatoriamente
        if (Math.random() > 0.7) {
          const newAlert = {
            id: Date.now(),
            ...alertTypes[Math.floor(Math.random() * alertTypes.length)],
            date: new Date().toLocaleDateString('es-MX'),
            time: new Date().toLocaleTimeString('es-MX'),
            status: 'pending'
          };
          return [...updatedAlerts, newAlert];
        }

        return updatedAlerts;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status, severity) => {
    if (status === 'resolved') return 'bg-green-100 border-l-4 border-green-500';
    if (severity === 'critical') return 'bg-red-100 border-l-4 border-red-500';
    return 'bg-orange-100 border-l-4 border-orange-500';
  };

  const handleResolve = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: 'resolved' } : alert
    ));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Alertas en Tiempo Real</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <div key={alert.id} className={`p-3 rounded-r ${getStatusColor(alert.status, alert.severity)}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <div className="flex items-center mt-1 space-x-3 text-xs text-gray-600">
                    <span>{alert.date}</span>
                    <span>{alert.time}</span>
                    <span className="font-semibold">
                      {alert.status === 'resolved' ? 'Resuelto' : 
                       alert.severity === 'critical' ? 'Crítico' : 'Advertencia'}
                    </span>
                  </div>
                </div>
                {alert.status !== 'resolved' && (
                  <button 
                    onClick={() => handleResolve(alert.id)}
                    className="text-xs px-2 py-1 bg-white rounded shadow-sm hover:bg-gray-50"
                  >
                    Marcar como resuelto
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No hay alertas activas</p>
        )}
      </div>
    </div>
  );
};

export default AlertPanel;