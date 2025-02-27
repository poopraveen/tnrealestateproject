'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PlotInformation: React.FC = () => {
  const [activePhase, setActivePhase] = useState('Phase A');
  const [plots, setPlots] = useState([
    { number: 101, facing: 'N/S/E/W', corner: 'Yes', status: 'Booked' },
    { number: 102, facing: 'N/S/E/W', corner: 'Yes', status: 'Hold' },
    { number: 103, facing: 'N/S/E/W', corner: 'Yes', status: 'Registered' },
    { number: 104, facing: 'N/S/E/W', corner: 'Yes', status: 'Available' },
  ]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-center text-black dark:text-white">Plot Information</h2>
      <h3 className="text-lg font-medium text-center text-red-600 dark:text-red-400">SM NAGAR 1</h3>
      
      <div className="flex justify-center space-x-4 my-4">
        {['Phase A', 'Phase B', 'Phase C'].map((phase) => (
          <button
            key={phase}
            onClick={() => setActivePhase(phase)}
            className={`px-4 py-2 rounded-md ${activePhase === phase ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-white'}`}
          >
            {phase}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search Plot Number"
        className="w-full p-2 border dark:bg-gray-700 dark:text-white rounded-md mb-4"
      />
      
      <div className="space-y-2">
        {plots.map((plot, index) => (
          <div key={plot.number} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow flex justify-between items-center">
            <Link href="/PlotDetail" key={`plotList${index}`}>
              <div>
                <p className="font-semibold text-black dark:text-white">Plot Number: {plot.number}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Facing: {plot.facing}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Corner: {plot.corner}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Status: {plot.status}</p>
              </div>
            </Link>
            <button className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500">✏️</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlotInformation;
