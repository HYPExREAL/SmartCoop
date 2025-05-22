'use client';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import SensorCard from '@/components/SensorCard';
import type { SensorData } from '@/types/sensor';

const sensorConfig: {
  title: string;
  key: keyof SensorData;
  type: string;
  unit?: string;
}[] = [
  { title: 'Temperature', key: 'temperature', type: 'temperature', unit: '°C' },
  { title: 'Gas Level', key: 'gas', type: 'gas', unit: 'ppm' },
  { title: 'Fan Status', key: 'fan', type: 'fan' },
  { title: 'Feed Level', key: 'feedLevel', type: 'feed', unit: '%' },
];



export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: ReturnType<typeof onValue> | null = null;

    const init = async () => {
      // Cek apakah user sudah login
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          try {
            await signInWithEmailAndPassword(auth, 'antarixasoftware@gmail.com', 'AntariXa123');
            // Otomatis trigger ulang listener ketika login selesai
          } catch (error) {
            console.error('Firebase login error:', error);
            setError('Login error: ' + (error as Error).message);
          }
          return;
        }

        // User sudah login, mulai baca data
        const scRef = ref(db, 'SC');
        unsubscribe = onValue(scRef, (snapshot) => {
          const rawData = snapshot.val();
          console.log('Raw Firebase data:', rawData);

          if (!rawData) return;

          const formattedData: SensorData = {
            temperature: Number(rawData.temperature) || 0,
            humidity: Number(rawData.humidity) || 0,
            distance: Number(rawData.distance) || 0,
            gas: Number(rawData.gas) || 0,
            fan: Boolean(Number(rawData.fan)),
            feedLevel: Number(rawData.feedLevel) || 0,
            fanDHT: Boolean(Number(rawData.fanDHT))
          };
          setSensorData(formattedData);
        });
      });
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe(); // bersihkan listener
    };
  }, []);

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
