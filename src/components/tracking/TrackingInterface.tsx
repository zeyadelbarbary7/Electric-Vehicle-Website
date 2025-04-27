import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle, Truck, Battery, RotateCw } from 'lucide-react';
import { ChargingVan } from '../../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import vanPng from '../common/8607666.png'
import userPng from '../common/9356777.png'
const userIcon = L.icon({
  iconUrl: userPng,
  iconSize: [30, 30],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});
const vanIcon = L.icon({
  iconUrl: vanPng,
  iconSize: [40, 40],      // adjust to your PNG’s size
  iconAnchor: [20, 40],    // point of the icon which corresponds to marker’s location
  popupAnchor: [0, -40],   // where popups should open relative to iconAnchor
});
interface TrackingInterfaceProps {
  bookingId?: string;
}

const TrackingInterface: React.FC<TrackingInterfaceProps> = ({ bookingId = 'BK-123456' }) => {
  const [vanLocation, setVanLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [estimatedArrival, setEstimatedArrival] = useState(12);
  const [currentStep, setCurrentStep] = useState(1);
  const [batteryLevel, setBatteryLevel] = useState(10);
  const [batteryTarget, setBatteryTarget] = useState(80);
  const [isCharging, setIsCharging] = useState(false);
  
  // Simulate real-time updates
  useEffect(() => {
    const locationInterval = setInterval(() => {
      // Randomly update van location
      setVanLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
      
      // Update ETA
      if (currentStep === 1 && estimatedArrival > 1) {
        setEstimatedArrival(prev => Math.max(1, prev - 1));
      }
      
      // Simulate van arrival
      if (currentStep === 1 && estimatedArrival === 1) {
        setTimeout(() => {
          setCurrentStep(2);
          setIsCharging(true);
        }, 5000);
      }
      
      // Simulate charging progress
      if (isCharging && batteryLevel < batteryTarget) {
        setBatteryLevel(prev => Math.min(batteryTarget, prev + 1));
      }
      
      // Simulate charging completion
      if (isCharging && batteryLevel === batteryTarget) {
        setTimeout(() => {
          setIsCharging(false);
          setCurrentStep(3);
        }, 3000);
      }
      
    }, 3000);
    
    return () => clearInterval(locationInterval);
  }, [currentStep, estimatedArrival, isCharging, batteryLevel, batteryTarget]);

  const stepStatus = {
    1: currentStep >= 1 ? 'completed' : 'pending',
    2: currentStep >= 2 ? 'completed' : 'pending',
    3: currentStep >= 3 ? 'completed' : 'pending',
  };
  
  const getStepClass = (step: 1 | 2 | 3) => {
    if (currentStep === step) return 'text-blue-600 dark:text-blue-400 font-medium';
    if (currentStep > step) return 'text-green-600 dark:text-green-400';
    return 'text-gray-400 dark:text-gray-500';
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tracking Your Charging Service
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Booking #{bookingId}
                </p>
              </div>
              
              {currentStep < 3 && (
                <div className="mt-4 md:mt-0 flex items-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 py-2 px-4 rounded-full">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm font-medium">
                    {currentStep === 1 
                      ? `Arriving in ${estimatedArrival} minute${estimatedArrival !== 1 ? 's' : ''}` 
                      : 'Currently charging'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Progress Timeline */}
            <div className="relative mb-8">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              <div className="space-y-8">
                <div className="relative flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10 
                    ${stepStatus[1] === 'completed' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                  >
                    {stepStatus[1] === 'completed' ? <CheckCircle size={16} /> : '1'}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium ${getStepClass(1)}`}>
                      Van En Route
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Our charging van is on the way to your vehicle.
                    </p>
                    
                    {currentStep === 1 && (
                      <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400 animate-pulse">
                        <Truck size={16} className="mr-2" />
                        <span className="text-sm font-medium">
                          Currently en route - {estimatedArrival} min away
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10 
                    ${stepStatus[2] === 'completed' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                      : currentStep === 2
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                  >
                    {stepStatus[2] === 'completed' ? <CheckCircle size={16} /> : '2'}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium ${getStepClass(2)}`}>
                      Charging in Progress
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Our technician is now charging your vehicle.
                    </p>
                    
                    {currentStep === 2 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Current: {batteryLevel}%
                          </span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Target: {batteryTarget}%
                          </span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-1000 ease-in-out"
                            style={{ width: `${(batteryLevel / batteryTarget) * 100}%` }}
                          ></div>
                        </div>
                        <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400">
                          <Battery size={16} className="mr-2" />
                          <span className="text-sm font-medium">
                            {isCharging ? (
                              <span className="flex items-center">
                                Charging in progress
                                <RotateCw size={14} className="ml-2 animate-spin" />
                              </span>
                            ) : 'Preparing to charge'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10 
                    ${stepStatus[3] === 'completed' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                  >
                    {stepStatus[3] === 'completed' ? <CheckCircle size={16} /> : '3'}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium ${getStepClass(3)}`}>
                      Service Completed
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Charging is complete and your vehicle is ready to go.
                    </p>
                    
                    {currentStep === 3 && (
                      <div className="mt-4">
                        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900 rounded-lg p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                                Service Summary
                              </h3>
                              <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                                <p>Your vehicle has been charged successfully. The battery is now at {batteryLevel}%.</p>
                              </div>
                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  View Receipt
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map preview - For a real implementation, this would be a Google Map with the van location */}
            {/* Real interactive map */}
<div className="rounded-lg overflow-hidden h-60 mb-6">
  <MapContainer
    center={[30.0214781, 31.4010477]}
    zoom={14}
    className="w-full h-full"
    scrollWheelZoom={false}
  >
    {/* <TileLayer
      attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors'
      url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
    /> */}

    <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {/* User marker */}
    <Marker position={[30.021375 , 31.403591]} icon={userIcon}>
      <Popup>You</Popup>
    </Marker>
    {/* Van marker */}
    <Marker position={[30.016484, 31.421399]} icon={vanIcon}>
      <Popup>WattUp Van — {estimatedArrival} min away</Popup>
    </Marker>
  </MapContainer>
</div>

            
            {/* Support section */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Need assistance?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Our support team is available to help with any issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Contact Driver
                </button>
                <button className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  24/7 Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingInterface;