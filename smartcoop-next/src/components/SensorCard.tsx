import { FC } from 'react';
import { IconType } from 'react-icons';
import { FaTemperatureHigh, FaTint, FaRuler, FaWind, FaFan } from 'react-icons/fa';

interface SensorCardProps {
  title: string;
  value: number | boolean;
  type: string;
  unit?: string;
}

const getIcon = (type: string): IconType => {
  switch (type.toLowerCase()) {
    case 'temperature':
      return FaTemperatureHigh;
    case 'humidity':
      return FaTint;
    case 'distance':
      return FaRuler;
    case 'gas':
      return FaWind;
    case 'fan':
      return FaFan;
    default:
      return FaTemperatureHigh;
  }
};

const formatValue = (value: number | boolean): string => {
  if (typeof value === 'boolean') {
    return value ? 'ON' : 'OFF';
  }
  
  // Handle NaN, undefined, or null
  if (value === undefined || value === null || isNaN(value)) {
    return '-';
  }
  
  // Format number to 1 decimal place if it's a float
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
};

const SensorCard: FC<SensorCardProps> = ({ title, value, type, unit }) => {
  const Icon = getIcon(type);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Icon className={`text-2xl ${value ? 'text-blue-500' : 'text-gray-400'}`} />
      </div>
      <div className="flex items-baseline">
        <p className="text-3xl font-bold text-gray-900">
          {formatValue(value)}
        </p>
        {unit && <span className="text-lg ml-1 text-gray-600">{unit}</span>}
      </div>
    </div>
  );
};

export default SensorCard;