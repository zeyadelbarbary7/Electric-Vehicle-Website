import { ChargingVan, Vehicle, Booking } from '../types';

// your map‐center
const CENTER = { lat: 30.021375, lng: 31.403591 };

const MAX_OFFSET = 0.1;

// helper to get random number in ±MAX_OFFSET/2
function rndOffset() {
  return (Math.random() - 0.5) * MAX_OFFSET;
}

// pick a random status
const STATUSES: ChargingVan['status'][] = ['available','busy','offline'];

export const mockVans: ChargingVan[] = Array.from({ length: 5 }, (_, i) => ({
  id: `van-${i+1}`,
  name: `WattUP Van ${String.fromCharCode(65 + i)}`,
  status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
  batteryLevel: Math.floor(20 + Math.random() * 80),        // 20–100%
  estimatedArrival: Math.floor(1 + Math.random() * 14),      // 1–15 min
  location: {
    lat: CENTER.lat + rndOffset(),
    lng: CENTER.lng + rndOffset(),
  },
}));

// Mock data for vehicles
export const mockVehicles: Vehicle[] = [
  {
    id: 'vehicle-1',
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    color: 'White',
    licensePlate: 'EV-12345'
  },
  {
    id: 'vehicle-2',
    make: 'Chevrolet',
    model: 'Bolt EV',
    year: 2021,
    color: 'Blue',
    licensePlate: 'BOLT-42'
  },
];

// Mock data for bookings
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    userId: 'user-1',
    vehicleId: 'vehicle-1',
    vanId: 'van-1',
    status: 'completed',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Broadway, New York, NY 10001',
      parkingDetails: 'Street parking, white Tesla Model 3'
    },
    scheduledTime: new Date('2023-09-15T14:30:00'),
    isUrgent: false,
    estimatedDuration: 45,
    price: 49.99,
    createdAt: new Date('2023-09-15T10:15:00')
  },
  {
    id: 'booking-2',
    userId: 'user-1',
    vehicleId: 'vehicle-2',
    vanId: 'van-2',
    status: 'in-progress',
    location: {
      lat: 40.7200,
      lng: -74.0100,
      address: '456 Park Ave, New York, NY 10022',
      parkingDetails: 'Underground parking, level P2, spot 42',
      accessRequirements: 'Gate code: 1234'
    },
    scheduledTime: new Date('2023-09-20T09:00:00'),
    isUrgent: true,
    estimatedDuration: 30,
    price: 79.99,
    createdAt: new Date('2023-09-19T17:30:00')
  },
];