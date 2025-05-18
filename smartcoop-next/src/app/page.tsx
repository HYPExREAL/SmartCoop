'use client';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import SensorCard from '@/components/SensorCard';
import type { SensorData, SensorConfig } from '@/types/sensor';

const sensorConfig: SensorConfig[] = [
  { title: 'Temperature', key: 'Temperature', type: 'temperature', unit: '°C' },
  { title: 'Humidity', key: 'Humidity', type: 'humidity', unit: '%' },
  { title: 'Distance', key: 'Distance', type: 'distance', unit: 'cm' },
  { title: 'Gas Level', key: 'Gas', type: 'gas', unit: 'ppm' },
  { title: 'Fan Status', key: 'Fan', type: 'fan' },
];

export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connectToFirebase = async () => {
      try {
        await signInWithEmailAndPassword(auth, 'antarixasoftware@gmail.com', 'AntariXa123');
        
        const scRef = ref(db, 'SC');
        
        onValue(scRef, (snapshot) => {
          const data = snapshot.val();
          console.log('Received Firebase data:', data);

          // Check if data exists and has the expected structure
          if (!data) {
            console.error('No data received from Firebase');
            return;
          }

          // Extract the latest reading (assuming data is nested under a timestamp)
          const latestData = Object.values(data)[0] || data;
          console.log('Latest sensor reading:', latestData);

          const formattedData: SensorData = {
            Temperature: parseFloat(latestData.Temperature) || 0,
            Humidity: parseFloat(latestData.Humidity) || 0,
            Distance: parseFloat(latestData.Distance) || 0,
            Gas: parseFloat(latestData.Gas) || 0,
            Fan: Boolean(latestData.Fan),
          };

          console.log('Formatted sensor data:', formattedData);
          setSensorData(formattedData);
        });
      } catch (error) {
        console.error('Firebase error:', error);
        setError('Connection error: ' + (error as Error).message);
      }
    };

    connectToFirebase();

    return () => {
      const scRef = ref(db, 'SC');
      onValue(scRef, () => {});
    };
  }, []);

  // Add logging for render phase
  console.log('Current render state:', { sensorData, error });

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">SmartCoop Dashboard</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {!sensorData ? (
          <div className="text-center py-10">Loading sensor data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sensorConfig.map((sensor) => (
              <SensorCard
                key={sensor.key}
                title={sensor.title}
                value={sensorData[sensor.key]}
                type={sensor.type}
                unit={sensor.unit}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}