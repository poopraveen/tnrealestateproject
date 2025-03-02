'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { MapPin, Search, PlusCircle, Edit } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlots, selectPlots, selectPlotStatus, selectPlotError, resetPlotsState } from '../../../../store/slices/plotSlice';

const PlotInformation: React.FC = () => {
  const { t } = useTranslation();
  const { id, customerId } = useParams();  // Get project ID from URL params
  const dispatch = useDispatch();

  // Local state for active phase
  const [activePhase, setActivePhase] = useState('Phase A');
  
  // Fetch plot data from the store
  const plots = useSelector(selectPlots);
  const plotStatus = useSelector(selectPlotStatus);
  const plotError = useSelector(selectPlotError);

  // Fetch plots when the component mounts or project ID changes
  useEffect(() => {
    dispatch(resetPlotsState()); // Reset state on initial page load
    if (id && customerId) {
      dispatch(fetchPlots(id));  // Fetch plots for the given project ID
    }
  }, [id, dispatch, customerId]);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-black dark:text-white">{t('plotInformation')}</h2>
      <h3 className="text-lg font-semibold text-center text-red-600 dark:text-red-400">SM NAGAR 1</h3>
      
      {/* Phase Tabs */}
      <div className="flex justify-center space-x-4 my-4">
        {['Phase A', 'Phase B', 'Phase C'].map((phase) => (
          <button
            key={phase}
            onClick={() => setActivePhase(phase)}
            className={`px-4 py-2 flex items-center gap-2 rounded-md font-medium transition-all duration-200 
              ${activePhase === phase ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'}`}
          >
            <MapPin size={16} /> {t(phase)}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />
        <input
          type="text"
          placeholder={t('searchPlotNumber')}
          className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>
      
      {/* Plot List */}
      {plotStatus === 'loading' && <div>Loading plots...</div>}
      {plotStatus === 'failed' && <div>Error: {plotError}</div>}

      <div className="space-y-3">
        {plots?.map((plot: any) => (
          <div key={plot.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow flex justify-between items-center">
            <div>
              <p className="font-semibold text-black dark:text-white">{t('plotNumber')}: {plot?.data?.plotNumber}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('facing')}: {t(plot?.data?.facing)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('corner')}: {t(plot?.data?.plotCorner)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('status')}: {t(plot?.data?.plotStatus)}</p>
              {plot?.data?.profile && <p className="text-sm text-gray-600 dark:text-gray-300">{t('profile')}: {t(plot?.data?.profile?.data?.personalDetails?.firstName)}</p>}
            </div>
            <button className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500">
              <Edit size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Plot Button */}
      <button className="w-full mt-6 p-3 flex items-center justify-center gap-2 bg-teal-500 text-white rounded-lg font-medium text-center hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-400">
        <PlusCircle size={18} />
        <Link href={`/PlotDetail/${id}/${customerId}`}>
          {t('addNewPlot')}
        </Link>
      </button>
    </div>
  );
};

export default PlotInformation;


// const PlotInformation: React.FC = () => {
//   const { t } = useTranslation();
//   const {id} = useParams();
//   const [activePhase, setActivePhase] = useState('Phase A');
//   const [plots, setPlots] = useState([
//     { number: 101, facing: 'North', corner: 'Yes', status: 'Booked' },
//     { number: 102, facing: 'South', corner: 'No', status: 'Hold' },
//     { number: 103, facing: 'East', corner: 'Yes', status: 'Registered' },
//     { number: 104, facing: 'West', corner: 'No', status: 'Available' },
//   ]);

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center text-black dark:text-white">{t('plotInformation')}</h2>
//       <h3 className="text-lg font-semibold text-center text-red-600 dark:text-red-400">SM NAGAR 1</h3>
      
//       {/* Phase Tabs */}
//       <div className="flex justify-center space-x-4 my-4">
//         {['Phase A', 'Phase B', 'Phase C'].map((phase) => (
//           <button
//             key={phase}
//             onClick={() => setActivePhase(phase)}
//             className={`px-4 py-2 flex items-center gap-2 rounded-md font-medium transition-all duration-200 
//               ${activePhase === phase ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'}`}
//           >
//             <MapPin size={16} /> {t(phase)}
//           </button>
//         ))}
//       </div>

//       {/* Search Input */}
//       <div className="relative mb-4">
//         <Search className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />
//         <input
//           type="text"
//           placeholder={t('searchPlotNumber')}
//           className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//         />
//       </div>
      
//       {/* Plot List */}
//       <div className="space-y-3">
//         {plots.map((plot) => (
//           <div key={plot.number} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow flex justify-between items-center">
//             <div>
//               <p className="font-semibold text-black dark:text-white">{t('plotNumber')}: {plot.number}</p>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{t('facing')}: {t(plot.facing)}</p>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{t('corner')}: {t(plot.corner)}</p>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{t('status')}: {t(plot.status)}</p>
//             </div>
//             <button className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500">
//               <Edit size={18} />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Add New Project Button */}
//       <button className="w-full mt-6 p-3 flex items-center justify-center gap-2 bg-teal-500 text-white rounded-lg font-medium text-center hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-400">
//         <PlusCircle size={18} />
//         <Link href={`/PlotDetail/${id}`}>
//           {t('addNewProject')}
//         </Link>
//       </button>
//     </div>
//   );
// };

// export default PlotInformation;
