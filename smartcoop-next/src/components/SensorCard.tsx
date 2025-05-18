// components/SensorCard.tsx
import React from "react";
import { IconType } from "react-icons";
import { 
  FaThermometerHalf, 
  FaTint,
  FaRuler,
  FaSmog,
  FaFan 
} from "react-icons/fa";

type SensorType = 'temperature' | 'humidity' | 'distance' | 'gas' | 'fan';

interface SensorCardProps {
  title: string;
  value: string | number | boolean;
  unit?: string;
  type: SensorType;
}

const iconMap: Record<string, IconType> = {
  temperature: FaThermometerHalf,
  humidity: FaTint,
  distance: FaRuler,
  gas: FaSmog,
  fan: FaFan
};

const SensorCard: React.FC<SensorCardProps> = ({ title, value, unit, type }) => {
  const Icon = iconMap[type];
  
  const renderValue = () => {
    if (type === 'fan') {
      return (
        <div className={`px-3 py-1 rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'ON' : 'OFF'}
        </div>
      );
    }
    
    return (
      <div className="flex items-baseline">
        <p className="font-heading text-3xl font-bold text-gray-800">{value}</p>
        {unit && <span className="font-body ml-1 text-sm text-gray-500">{unit}</span>}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'var(--light-green)' }}>
            <Icon className="w-5 h-5" style={{ color: 'var(--primary-green)' }} />
          </div>
          <h3 className="font-heading text-sm font-semibold text-gray-700">{title}</h3>
        </div>
      </div>
      {renderValue()}
    </div>
  );
};

export default SensorCard;