"use client";

import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import SensorCard from "@/components/SensorCard";

interface SensorData {
  Temperature: number;
  Humidity: number;
  Distance: number;
  Gas: number;
  Fan: boolean;
}

interface SensorConfig {
  title: string;
  key: keyof SensorData;
  type: 'temperature' | 'humidity' | 'distance' | 'gas' | 'fan';
  unit?: string;
}

const sensorConfig: SensorConfig[] = [
  { title: "Temperature", key: "Temperature", type: "temperature", unit: "°C" },
  { title: "Humidity", key: "Humidity", type: "humidity", unit: "%" },
  { title: "Distance", key: "Distance", type: "distance", unit: "cm" },
  { title: "Gas Level", key: "Gas", type: "gas", unit: "ppm" },
  { title: "Fan Status", key: "Fan", type: "fan" }
];

export default function Home() {
  const [data, setData] = useState<SensorData | null>(null);

  useEffect(() => {
    const scRef = ref(db, "SC");
    onValue(scRef, (snapshot) => {
      const val = snapshot.val();
      setData(val);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800">
              Live Monitoring
            </h2>
            <p className="font-body text-gray-500 mt-1">
              Real-time sensor data
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" 
               style={{ backgroundColor: 'var(--light-green)' }}>
            <div className="h-2.5 w-2.5 rounded-full animate-pulse"
                 style={{ backgroundColor: 'var(--primary-green)' }}/>
            <span className="font-body text-sm" 
                  style={{ color: 'var(--primary-green)' }}>
              Live
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && sensorConfig.map((sensor) => (
            <SensorCard
              key={sensor.key}
              title={sensor.title}
              value={data[sensor.key]}
              unit={sensor.unit}
              type={sensor.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}