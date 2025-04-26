import React, { useState } from 'react';
import { BookingFormData } from '../../types';
import VehicleDetailsStep from './VehicleDetailsStep';
import ServiceSelectionStep from './ServiceSelectionStep';
import PaymentStep from './PaymentStep';

const BookingFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    vehicle: {
      make: '',
      model: '',
      color: '',
      licensePlate: '',
      parkingDetails: '',
      accessRequirements: false,
      accessDetails: '',
    },
    service: {
      preferredTime: new Date(),
      isUrgent: false,
      estimatedDuration: 45, // default in minutes
      price: 49.99, // default price
    },
    payment: {
      method: '',
      savePaymentMethod: false,
      promoCode: '',
    },
  });

  const updateFormData = (section: keyof BookingFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    console.log('Booking submitted:', formData);
    // Here we would typically submit the data to an API
    // and navigate to a confirmation or tracking page
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Book a Charging Service</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Get your EV charged right where you are.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                1
              </div>
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Vehicle</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              step > 1 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                2
              </div>
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Service</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              step > 2 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                3
              </div>
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Payment</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            {step === 1 && (
              <VehicleDetailsStep 
                formData={formData.vehicle} 
                updateFormData={(data) => updateFormData('vehicle', data)} 
                onNext={nextStep}
              />
            )}
            {step === 2 && (
              <ServiceSelectionStep 
                formData={formData.service} 
                updateFormData={(data) => updateFormData('service', data)} 
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 3 && (
              <PaymentStep 
                formData={formData.payment} 
                updateFormData={(data) => updateFormData('payment', data)} 
                onSubmit={handleSubmit}
                onBack={prevStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;