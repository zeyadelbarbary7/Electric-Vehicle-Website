import React from 'react';
import { Info, ArrowRight } from 'lucide-react';
import { BookingFormData } from '../../types';

interface VehicleDetailsStepProps {
  formData: BookingFormData['vehicle'];
  updateFormData: (data: Partial<BookingFormData['vehicle']>) => void;
  onNext: () => void;
}

const VehicleDetailsStep: React.FC<VehicleDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const vehicleMakes = [
    'Tesla', 'Chevrolet', 'Nissan', 'Ford', 'BMW', 'Audi', 
    'Volkswagen', 'Hyundai', 'Kia', 'Rivian', 'Lucid', 'Toyota',
    'Mercedes-Benz', 'Porsche', 'Jaguar', 'Volvo', 'Other'
  ];

  const teslaModels = ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'];
  const chevroletModels = ['Bolt EV', 'Bolt EUV', 'Silverado EV'];
  const nissanModels = ['Leaf', 'Ariya'];
  // We would have more models for other makes
  
  const getModelOptions = () => {
    switch(formData.make) {
      case 'Tesla': return teslaModels;
      case 'Chevrolet': return chevroletModels;
      case 'Nissan': return nissanModels;
      // Handle more makes
      default: return ['Select make first'];
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Vehicle Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Brand *
          </label>
          <select
            id="make"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={formData.make}
            onChange={(e) => updateFormData({ make: e.target.value })}
            required
          >
            <option value="">Select Make</option>
            {vehicleMakes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Model *
          </label>
          <select
            id="model"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={formData.model}
            onChange={(e) => updateFormData({ model: e.target.value })}
            disabled={!formData.make}
            required
          >
            <option value="">Select Model</option>
            {getModelOptions().map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Color *
          </label>
          <input
            type="text"
            id="color"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. White, Black, Blue"
            value={formData.color}
            onChange={(e) => updateFormData({ color: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label htmlFor="license-plate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            License Plate *
          </label>
          <input
            type="text"
            id="license-plate"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. ABC1234"
            value={formData.licensePlate}
            onChange={(e) => updateFormData({ licensePlate: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="parking-details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Parking Details *
        </label>
        <textarea
          id="parking-details"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="e.g. Underground parking, spot 42, enter from west entrance"
          value={formData.parkingDetails}
          onChange={(e) => updateFormData({ parkingDetails: e.target.value })}
          rows={3}
          required
        ></textarea>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-start">
          <Info size={16} className="mr-1 flex-shrink-0 mt-0.5" />
          Please provide detailed information to help our technician locate your vehicle.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="access-requirements"
              type="checkbox"
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              checked={formData.accessRequirements}
              onChange={(e) => updateFormData({ accessRequirements: e.target.checked })}
            />
          </div>
          <div className="ml-3">
            <label htmlFor="access-requirements" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Special Access Requirements
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Check this if there are special instructions to access your vehicle (e.g., garage code, key pickup).
            </p>
          </div>
        </div>
        
        {formData.accessRequirements && (
          <div className="mt-3">
            <textarea
              id="access-details"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Please provide access details..."
              value={formData.accessDetails || ''}
              onChange={(e) => updateFormData({ accessDetails: e.target.value })}
              rows={2}
            ></textarea>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center justify-center py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
        >
          Continue
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </form>
  );
};

export default VehicleDetailsStep;