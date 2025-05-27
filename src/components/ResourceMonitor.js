import React, { useState, useEffect } from 'react';

const ResourceMonitor = ({ title, initialValue, maxValue, unit }) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [history, setHistory] = useState(Array(15).fill(initialValue));

  useEffect(() => {
    const interval = setInterval(() => {
      const variation = (Math.random() * 6 - 3);
      const newValue = Math.min(maxValue, Math.max(0, currentValue + variation));
      
      setCurrentValue(newValue);
      setHistory(prev => [...prev.slice(1), newValue]);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentValue, maxValue]);

  const percentage = Math.round((currentValue / maxValue) * 100);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <div className="flex justify-between items-center mb-1">
        <span className="text-2xl font-bold">{Math.round(currentValue)} {unit}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
        <div 
          className="h-2.5 rounded-full" 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: percentage > 90 ? '#EF4444' : percentage > 70 ? '#F59E0B' : '#10B981'
          }} 
        />
      </div>
      <div className="h-20">
        <div className="flex items-end h-full space-x-1">
          {history.map((value, i) => (
            <div 
              key={i}
              className="flex-1 bg-gray-200 rounded-t-sm"
              style={{
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: (value / maxValue) > 0.9 ? '#EF4444' : (value / maxValue) > 0.7 ? '#F59E0B' : '#10B981'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceMonitor;