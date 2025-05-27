import React from 'react';
import SNMPConnection from './components/SNMPConnection';
import ResourceMonitor from './components/ResourceMonitor';
import AlertPanel from './components/AlertPanel';
import NetworkTraffic from './components/NetworkTraffic';

const App = () => {
  const serverIP = '45.169.236.126';
  const version = 'SNMP v2';

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Bee Monitoring</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <SNMPConnection 
            ipAddress={serverIP}
            version={version}
          />
        </div>
        <div className="lg:col-span-2">
          <AlertPanel />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ResourceMonitor 
          title="Uso de CPU" 
          initialValue={45} 
          maxValue={100} 
          unit="%" 
        />
        <ResourceMonitor 
          title="Uso de Memoria" 
          initialValue={65} 
          maxValue={128} 
          unit="GB" 
        />
        <ResourceMonitor 
          title="Uso de Disco" 
          initialValue={38} 
          maxValue={100} 
          unit="%" 
        />
      </div>
      
      <div className="grid grid-cols-1">
        <NetworkTraffic />
      </div>
    </div>
  );
};

export default App;


// DONE