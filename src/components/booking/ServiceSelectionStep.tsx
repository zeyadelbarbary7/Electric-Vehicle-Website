import React, { useState } from 'react';
import { Calendar, Clock, Zap, DollarSign, ArrowLeft, ArrowRight } from 'lucide-react';
import { BookingFormData } from '../../types';

interface ServiceSelectionStepProps {
  formData: BookingFormData['service'];
  updateFormData: (data: Partial<BookingFormData['service']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onBack 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(formData.preferredTime || null);
  const [selectedTime, setSelectedTime] = useState<string>('12:00');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine date and time
    if (selectedDate) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const dateTime = new Date(selectedDate);
      dateTime.setHours(hours, minutes);
      
      updateFormData({ preferredTime: dateTime });
    }
    
    onNext();
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedDate(date);
  };
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };
  
  const handleUrgentToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isUrgent = e.target.checked;
    
    // Update pricing based on urgency
    const newPrice = isUrgent ? 300.00 : 160.00 ;
    const newDuration = isUrgent ? 30 : 45;
    
    updateFormData({ 
      isUrgent, 
      price: newPrice,
      estimatedDuration: newDuration
    });
  };
  
  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour < 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        slots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Format date for input
  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Service Selection</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <Calendar size={16} className="inline mr-1" />
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            min={new Date().toISOString().split('T')[0]}
            value={formatDateForInput(selectedDate)}
            onChange={handleDateChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <Clock size={16} className="inline mr-1" />
            Time
          </label>
          <select
            id="time"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={selectedTime}
            onChange={handleTimeChange}
            required
          >
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="urgent-service"
              type="checkbox"
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              checked={formData.isUrgent}
              onChange={handleUrgentToggle}
            />
          </div>
          <div className="ml-3">
            <label htmlFor="urgent-service" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <Zap size={16} className="inline mr-1 text-yellow-500" />
              Urgent Service (Priority Response)
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Our technicians will prioritize your request and arrive 30% faster. Additional fee applies.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-8">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Service Summary</h4>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Service Type:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formData.isUrgent ? 'Priority Charging' : 'Standard Charging'}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Estimated Duration:</span>
            <span className="font-medium text-gray-900 dark:text-white">{formData.estimatedDuration} minutes</span>
          </div>
          
          {/* <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Range Added:</span>
            <span className="font-medium text-gray-900 dark:text-white">Up to 150 miles</span>
          </div> */}
          
          <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <span className="text-base font-medium text-gray-900 dark:text-white flex items-center">
              {/* <DollarSign size={16} className="inline" /> */}
              Estimated Price:
            </span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
    {formData.isUrgent ? (
      <>
        <span className="inline text-lg font-semibold">E£</span>
        {formData.price.toFixed(2)}
      </>
    ) : (
      <span className="text-lg font-semibold">160.00 E£ - 240.00 E£</span>
    )}
  </span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center py-3 px-6 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </button>
        
        <button
          type="submit"
          className="flex items-center justify-center py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
        >
          Continue to Payment
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </form>
  );
};

export default ServiceSelectionStep;