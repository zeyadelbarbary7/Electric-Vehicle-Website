// Type definitions for the application

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
}

export interface ChargingVan {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'busy' | 'offline';
  estimatedArrival?: number; // minutes
  batteryLevel: number;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  vanId?: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  location: {
    lat: number;
    lng: number;
    address: string;
    parkingDetails?: string;
    accessRequirements?: string;
  };
  scheduledTime: Date;
  isUrgent: boolean;
  estimatedDuration: number; // minutes
  price: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicles: Vehicle[];
  savedLocations: {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
  }[];
  paymentMethods: {
    id: string;
    type: 'card' | 'paypal';
    last4?: string;
    expiryDate?: string;
    isDefault: boolean;
  }[];
}

export interface MapSettings {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  radius: number; // miles
}

export interface BookingFormData {
  vehicle: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
    parkingDetails: string;
    accessRequirements: boolean;
    accessDetails?: string;
  };
  service: {
    preferredTime: Date;
    isUrgent: boolean;
    estimatedDuration: number;
    price: number;
  };
  payment: {
    method: string;
    savePaymentMethod: boolean;
    promoCode?: string;
  };
}