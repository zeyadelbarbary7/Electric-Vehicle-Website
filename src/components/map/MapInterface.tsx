// import React, { useState, useEffect, useRef } from 'react';
// import { Search, Sliders, Plus, Minus, MapPin } from 'lucide-react';
// import VanMarker from './VanMarker';
// import MapControls from './MapControls';
// import { ChargingVan, MapSettings } from '../../types';
// import { mockVans } from '../../data/mockData';

// const MapInterface: React.FC = () => {
//   const [settings, setSettings] = useState<MapSettings>({
//     center: { lat: 40.7128, lng: -74.006 },
//     zoom: 13,
//     radius: 5,
//   });
  
//   const [vans, setVans] = useState<ChargingVan[]>(mockVans);
//   const [selectedVan, setSelectedVan] = useState<ChargingVan | null>(null);
//   const [searchValue, setSearchValue] = useState('');
//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
//   const mapRef = useRef<HTMLDivElement>(null);

//   // Simulate van movement every few seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setVans(prevVans => 
//         prevVans.map(van => ({
//           ...van,
//           location: {
//             lat: van.location.lat + (Math.random() - 0.5) * 0.001,
//             lng: van.location.lng + (Math.random() - 0.5) * 0.001,
//           },
//           estimatedArrival: Math.max(1, (van.estimatedArrival || 10) - 1),
//         }))
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleVanClick = (van: ChargingVan) => {
//     setSelectedVan(van === selectedVan ? null : van);
//   };

//   const handleRadiusChange = (value: number) => {
//     setSettings(prev => ({ ...prev, radius: value }));
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     // This would typically call a geocoding API
//     console.log('Searching for:', searchValue);
//     // Mock implementation: just update center randomly
//     setSettings(prev => ({
//       ...prev,
//       center: {
//         lat: prev.center.lat + (Math.random() - 0.5) * 0.05,
//         lng: prev.center.lng + (Math.random() - 0.5) * 0.05,
//       }
//     }));
//   };

//   const handleZoomIn = () => {
//     setSettings(prev => ({ ...prev, zoom: Math.min(20, prev.zoom + 1) }));
//   };

//   const handleZoomOut = () => {
//     setSettings(prev => ({ ...prev, zoom: Math.max(1, prev.zoom - 1) }));
//   };

//   return (
//     <div className="relative w-full h-[calc(100vh-64px)] bg-gray-200 dark:bg-gray-800 overflow-hidden">
//       {/* Map Container */}
//       <div 
//         ref={mapRef} 
//         className="w-full h-full relative"
//         style={{ 
//           backgroundColor: '#e5e7eb',
//           backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-74.006,40.7128,13,0/1200x800?access_token=YOUR_MAPBOX_TOKEN')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         {/* Center pin (user location) */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//           <div className="flex flex-col items-center">
//             <div className="w-8 h-8 rounded-full bg-blue-900 border-2 border-white dark:border-gray-800 shadow-md flex items-center justify-center">
//               <MapPin size={16} className="text-white" />
//             </div>
//             <div className="mt-1 px-2 py-1 bg-white dark:bg-gray-800 rounded shadow-md text-xs font-medium text-gray-700 dark:text-white">
//               You
//             </div>
//           </div>
//         </div>

//         {/* Van Markers */}
//         {vans.map(van => (
//           <VanMarker 
//             key={van.id} 
//             van={van} 
//             onClick={() => handleVanClick(van)} 
//             isSelected={selectedVan?.id === van.id}
//             mapSettings={settings}
//           />
//         ))}
//       </div>

//       {/* Map Controls Overlay */}
//       <div className="absolute top-4 left-4 right-4 flex flex-col space-y-4 z-20">
//         <form 
//           onSubmit={handleSearch}
//           className="flex items-center w-full md:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
//         >
//           <input
//             type="text"
//             placeholder="Search location"
//             className="flex-1 py-3 px-4 bg-transparent text-gray-700 dark:text-white outline-none"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//           />
//           <button 
//             type="submit"
//             className="bg-green-500 text-white p-3 hover:bg-green-600 transition-colors"
//           >
//             <Search size={20} />
//           </button>
//         </form>

//         <div className="flex items-center space-x-2">
//           <button 
//             onClick={() => setIsFiltersOpen(!isFiltersOpen)}
//             className="flex items-center space-x-2 bg-white dark:bg-gray-900 py-2 px-4 rounded-lg shadow-md text-gray-700 dark:text-white"
//           >
//             <Sliders size={16} />
//             <span>Filters</span>
//           </button>
//         </div>

//         {isFiltersOpen && (
//           <MapControls 
//             radius={settings.radius} 
//             onRadiusChange={handleRadiusChange} 
//           />
//         )}
//       </div>

//       {/* Zoom Controls */}
//       <div className="absolute bottom-32 right-4 flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden z-20">
//         <button 
//           onClick={handleZoomIn}
//           className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white border-b border-gray-200 dark:border-gray-700"
//         >
//           <Plus size={20} />
//         </button>
//         <button 
//           onClick={handleZoomOut}
//           className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white"
//         >
//           <Minus size={20} />
//         </button>
//       </div>

//       {/* Selected Van Info */}
//       {selectedVan && (
//         <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 z-20 animate-slideUp">
//           <div className="flex items-start justify-between">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{selectedVan.name}</h3>
//               <div className="flex items-center mt-1">
//                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                   selectedVan.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
//                   selectedVan.status === 'busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
//                   'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                 }`}>
//                   {selectedVan.status === 'available' ? 'Available' : 
//                    selectedVan.status === 'busy' ? 'Busy' : 'Offline'}
//                 </span>
//                 <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
//                   {selectedVan.estimatedArrival} min away
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col items-end">
//               <div className="flex items-center text-sm">
//                 <span className="text-gray-600 dark:text-gray-300">Battery:</span>
//                 <div className="ml-2 w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                   <div 
//                     className={`h-full ${
//                       selectedVan.batteryLevel > 70 ? 'bg-green-500' :
//                       selectedVan.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
//                     }`}
//                     style={{ width: `${selectedVan.batteryLevel}%` }}
//                   ></div>
//                 </div>
//                 <span className="ml-1 text-xs font-medium text-gray-600 dark:text-gray-300">
//                   {selectedVan.batteryLevel}%
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="mt-4">
//             <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors">
//               Request This Van
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapInterface;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, Sliders, Plus, Minus, MapPin } from 'lucide-react';
import MapControls from './MapControls';
import { ChargingVan, MapSettings } from '../../types';
import { mockVans } from '../../data/mockData';
import vanPng from '../common/8607666.png'


const vanIcon = L.icon({
  iconUrl: vanPng,
  iconSize: [40, 40],      // adjust to your PNG’s size
  iconAnchor: [20, 40],    // point of the icon which corresponds to marker’s location
  popupAnchor: [0, -40],   // where popups should open relative to iconAnchor
});

const MapInterface: React.FC = () => {
  const [settings, setSettings] = useState<MapSettings>({
    center: { lat: 30.021375, lng: 31.403591 },
    zoom: 13,
    radius: 5,
  });
  
  const [vans, setVans] = useState<ChargingVan[]>(mockVans);
  const [selectedVan, setSelectedVan] = useState<ChargingVan | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVans(prevVans => 
        prevVans.map(van => ({
          ...van,
          location: {
            lat: van.location.lat + (Math.random() - 0.5) * 0.001,
            lng: van.location.lng + (Math.random() - 0.5) * 0.001,
          },
          estimatedArrival: Math.max(1, (van.estimatedArrival || 10) - 1),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleVanClick = (van: ChargingVan) => {
    setSelectedVan(van === selectedVan ? null : van);
  };

  const handleRadiusChange = (value: number) => {
    setSettings(prev => ({ ...prev, radius: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
    setSettings(prev => ({
      ...prev,
      center: {
        lat: prev.center.lat + (Math.random() - 0.5) * 0.05,
        lng: prev.center.lng + (Math.random() - 0.5) * 0.05,
      }
    }));
  };

  // const handleZoomIn = () => {
  //   setSettings(prev => ({ ...prev, zoom: Math.min(20, prev.zoom + 1) }));
  // };

  // const handleZoomOut = () => {
  //   setSettings(prev => ({ ...prev, zoom: Math.max(1, prev.zoom - 1) }));
  // };

  // const vanIcon = L.icon({
  //   iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png', // You can replace with a better van image
  //   iconSize: [40, 40],
  //   iconAnchor: [20, 40],
  //   popupAnchor: [0, -40],
  // });

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
      {/* Real Map */}
      <MapContainer 
        center={[settings.center.lat, settings.center.lng]} 
        zoom={settings.zoom} 
        className="w-full h-full z-0"
        scrollWheelZoom={true}
      >
        {/* <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        /> */}

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        {/* User Location */}
        <Marker position={[settings.center.lat, settings.center.lng]}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Van Markers */}
        {vans.map(van => (
          <Marker 
            key={van.id} 
            position={[van.location.lat, van.location.lng]} 
            eventHandlers={{ click: () => handleVanClick(van) }}
            icon={vanIcon}
          >
            <Popup>
              {van.name} - {van.estimatedArrival} min away
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute top-20 left-4 right-4 flex flex-col space-y-4 z-20">
        <form 
          onSubmit={handleSearch}
          className="flex items-center w-full md:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search location"
            className="flex-1 py-3 px-4 bg-transparent text-gray-700 dark:text-white outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-green-500 text-white p-3 hover:bg-green-600 transition-colors"
          >
            <Search size={20} />
          </button>
        </form>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-900 py-2 px-4 rounded-lg shadow-md text-gray-700 dark:text-white"
          >
            <Sliders size={16} />
            <span>Filters</span>
          </button>
        </div>

        {isFiltersOpen && (
          <MapControls 
            radius={settings.radius} 
            onRadiusChange={handleRadiusChange} 
          />
        )}
      </div>

      {/* Zoom Controls */}
      {/* <div className="absolute bottom-32 right-4 flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden z-20">
        <button 
          onClick={handleZoomIn}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white border-b border-gray-200 dark:border-gray-700"
        >
          <Plus size={20} />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white"
        >
          <Minus size={20} />
        </button>
      </div> */}

      {/* Selected Van Info */}
      {selectedVan && (
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 z-20 animate-slideUp">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{selectedVan.name}</h3>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedVan.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  selectedVan.status === 'busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {selectedVan.status === 'available' ? 'Available' : 
                   selectedVan.status === 'busy' ? 'Busy' : 'Offline'}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {selectedVan.estimatedArrival} min away
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">Battery:</span>
                <div className="ml-2 w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      selectedVan.batteryLevel > 70 ? 'bg-green-500' :
                      selectedVan.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${selectedVan.batteryLevel}%` }}
                  ></div>
                </div>
                <span className="ml-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                  {selectedVan.batteryLevel}%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors">
              Request This Van
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapInterface;
