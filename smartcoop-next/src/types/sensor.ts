export interface SensorData {
  Temperature: number;
  Humidity: number;
  Distance: number;
  Gas: number;
  Fan: boolean;
}

export interface SensorConfig {
  title: string;
  key: keyof SensorData;
  type: string;
  unit?: string;
}