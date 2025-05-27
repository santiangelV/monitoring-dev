import React, { useState, useEffect } from 'react';

const NetworkTraffic = () => {
  const [trafficData, setTrafficData] = useState({
    in: Array(20).fill(0),
    out: Array(20).fill(0)
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => {
        const newIn = [...prev.in.slice(1), Math.max(0, prev.in[prev.in.length - 1] + (Math.random() * 20 - 10))];
        const newOut = [...prev.out.slice(1), Math.max(0, prev.out[prev.out.length - 1] + (Math.random() * 20 - 10))];
        return { in: newIn, out: newOut };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...trafficData.in, ...trafficData.out, 1);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Tráfico de Red</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Entrada</p>
          <p className="text-xl font-bold">{Math.round(trafficData.in[trafficData.in.length - 1])} Mbps</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Salida</p>
          <p className="text-xl font-bold">{Math.round(trafficData.out[trafficData.out.length - 1])} Mbps</p>
        </div>
      </div>
      <div className="h-40">
        <div className="flex h-full space-x-1">
          {trafficData.in.map((value, index) => (
            <div key={`in-${index}`} className="flex flex-col flex-1">
              <div className="flex-1 flex items-end">
                <div 
                  className="w-full bg-blue-500 rounded-t-sm"
                  style={{ height: `${(value / maxValue) * 100}%` }}
                />
              </div>
              <div className="flex-1 flex items-start">
                <div 
                  className="w-full bg-green-500 rounded-b-sm"
                  style={{ height: `${(trafficData.out[index] / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Hace 20s</span>
          <span>Ahora</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkTraffic;