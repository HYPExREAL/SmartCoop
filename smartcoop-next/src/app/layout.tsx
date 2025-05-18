import React from "react";
import "../styles/globals.css";
import { FaChartLine, FaBell } from "react-icons/fa";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>SmartCoop Dashboard</title>
        <meta name="description" content="Real-time monitoring dashboard for SmartCoop" />
      </head>
      <body className="font-body min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <FaChartLine className="w-6 h-6" style={{ color: 'var(--primary-green)' }} />
                <h1 className="font-heading text-xl font-bold text-gray-800">SmartCoop</h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-500 hover:text-primary-green transition-colors">
                  <FaBell className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}