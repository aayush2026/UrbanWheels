if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
  throw new Error('Google Maps API key is missing');
}

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('API URL is missing');
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const RIDE_TYPES = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Affordable, everyday rides',
    multiplier: 1,
    basePrice: 5,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Luxury vehicles, top-rated drivers',
    multiplier: 1.5,
    basePrice: 8,
  },
  {
    id: 'xl',
    name: 'XL',
    description: 'Vehicles for groups up to 6',
    multiplier: 2,
    basePrice: 10,
  },
];
