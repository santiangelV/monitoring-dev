import React, { useState, useEffect } from 'react';

const SNMPConnection = ({ ipAddress, version }) => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [sslInfo, setSslInfo] = useState({
    status: 'Válido',
    issued: '01/11/2023',
    expires: '01/12/2024',
    domain: 'bee-monitoring.com'
  });

  useEffect(() => {
    // Simular conexión en tiempo real
    const interval = setInterval(() => {
      setConnectionStatus('Connected');
      setLastUpdate(new Date());
      
      // Simular cambios en el certificado SSL
      const daysToExpire = Math.floor(Math.random() * 30) - 5;
      setSslInfo(prev => ({
        ...prev,
        status: daysToExpire > 0 ? (daysToExpire < 7 ? 'Por expirar' : 'Válido') : 'Expirado'
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSslStatusColor = () => {
    return sslInfo.status === 'Válido' ? 'text-green-600' : 
           sslInfo.status === 'Por expirar' ? 'text-orange-600' : 'text-red-600';
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Conexión del Servidor</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className={`h-3 w-3 rounded-full ${connectionStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-600">{connectionStatus}</span>
        </div>
        
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Dirección IP:</span>
            <span>{ipAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Versión SNMP:</span>
            <span>{version}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Dominio:</span>
            <span>{sslInfo.domain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Certificado SSL:</span>
            <span className={`font-medium ${getSslStatusColor()}`}>
              {sslInfo.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Emitido:</span>
            <span>{sslInfo.issued}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Expira:</span>
            <span>{sslInfo.expires}</span>
          </div>
          {lastUpdate && (
            <div className="flex justify-between">
              <span className="text-gray-500">Última actualización:</span>
              <span>{lastUpdate.toLocaleTimeString('es-MX')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SNMPConnection;