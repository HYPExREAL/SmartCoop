export interface SensorData {
  temperature: number;
  humidity: number;
  distance: number;
  gas: number;
  fan: boolean;
}

export interface FirebaseData {
  [key: string]: {
    temperature: string | number;
    humidity: string | number;
    distance: string | number;
    gas: string | number;
    fan: string | number | boolean;
  }
}