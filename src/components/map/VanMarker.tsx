import React, { useMemo } from 'react';
import { Battery, Zap } from 'lucide-react';
import { ChargingVan, MapSettings } from '../../types';

interface VanMarkerProps {
  van: ChargingVan;
  onClick: () => void;
  isSelected: boolean;
  mapSettings: MapSettings;
}

const VanMarker: React.FC<VanMarkerProps> = ({ van, onClick, isSelected, mapSettings }) => {
  // Calculate position based on map settings and van location
  // This is a simplified version since we're not using actual Google Maps
  const position = useMemo(() => {
    const centerX = 50; // center percentage
    const centerY = 50; // center percentage
    
    // Calculate offset from center based on coordinates difference
    const latDiff = van.location.lat - mapSettings.center.lat;
    const lngDiff = van.location.lng - mapSettings.center.lng;
    
    // Scale based on zoom - higher zoom means larger offsets
    const scaleFactor = 5 / mapSettings.zoom;
    
    const offsetX = lngDiff / scaleFactor; // longitude affects X position
    const offsetY = -latDiff / scaleFactor; // latitude affects Y position (negative because latitude increases northward)
    
    return {
      left: `${centerX + offsetX * 50}%`,
      top: `${centerY + offsetY * 50}%`,
    };
  }, [van.location, mapSettings]);

  return (
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-300 ${
        isSelected ? 'scale-125' : 'hover:scale-110'
      }`}
      style={position}
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <div className={`
          w-10 h-10 rounded-full 
          ${van.status === 'available' ? 'bg-green-500' : 
            van.status === 'busy' ? 'bg-yellow-500' : 'bg-red-500'} 
          ${isSelected ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
          shadow-lg flex items-center justify-center
        `}>
          <div className="relative text-white">
            <Battery size={20} strokeWidth={2} className="transform rotate-90" />
            <Zap 
              size={12} 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
            />
          </div>
        </div>
        {isSelected && (
          <div className="mt-1 px-2 py-1 bg-white dark:bg-gray-800 rounded shadow-md text-xs font-medium text-gray-700 dark:text-white whitespace-nowrap">
            {van.name} ({van.estimatedArrival} min)
          </div>
        )}
      </div>
    </div>
  );
};

export default VanMarker;