import React from 'react';

interface MapControlsProps {
  radius: number;
  onRadiusChange: (radius: number) => void;
}

const MapControls: React.FC<MapControlsProps> = ({ radius, onRadiusChange }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search Radius: {radius} miles
        </label>
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={radius}
          onChange={(e) => onRadiusChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1 mi</span>
          <span>10 mi</span>
          <span>20 mi</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Van Status
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="available"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Available
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="busy"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor="busy" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Busy
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="offline"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="offline" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Offline
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <button className="w-full py-2 bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-100 rounded-lg font-medium transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default MapControls;