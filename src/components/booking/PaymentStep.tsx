import React, { useState } from 'react';
import { CreditCard, ArrowLeft, Check, Shield } from 'lucide-react';
import { BookingFormData } from '../../types';

interface PaymentStepProps {
  formData: BookingFormData['payment'];
  updateFormData: (data: Partial<BookingFormData['payment']>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ 
  formData, 
  updateFormData, 
  onSubmit, 
  onBack 
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    updateFormData({ method: 'card' });
    
    setTimeout(() => {
      setLoading(false);
      onSubmit();
    }, 1500);
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted.substring(0, 19)); // Limit to 16 digits + spaces
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    
    setExpiryDate(value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Details</h3>
      
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-3 flex items-center">
          <CreditCard size={18} className="mr-2" />
          Credit or Debit Card
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="card-name"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="John Smith"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry-date"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                maxLength={5}
                required
              />
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, '').substring(0, 3))}
                maxLength={3}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="save-card"
                type="checkbox"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                checked={formData.savePaymentMethod}
                onChange={(e) => updateFormData({ savePaymentMethod: e.target.checked })}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="save-card" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Save card for future payments
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Promo Code
        </label>
        <div className="flex">
          <input
            type="text"
            id="promo-code"
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter code"
            value={formData.promoCode || ''}
            onChange={(e) => updateFormData({ promoCode: e.target.value })}
          />
          <button
            type="button"
            className="px-4 bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-100 font-medium rounded-r-lg transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-2 text-green-600 dark:text-green-400">
          <Shield size={16} className="mr-2" />
          <span className="text-sm font-medium">Secure Payment</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your payment information is encrypted and secure. We never store your full card details.
        </p>
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
          className={`flex items-center justify-center py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors ${
            loading ? 'opacity-75 cursor-wait' : ''
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Complete Booking
              <Check size={18} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentStep;