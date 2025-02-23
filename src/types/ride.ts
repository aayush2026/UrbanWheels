export type RideStatus = 'booked' | 'ongoing' | 'completed' | 'cancelled';

export interface Driver {
  id: string;
  name: string;
  image: string;
  rating: number;
}

export interface RideHistory {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  status: RideStatus;
  fare: number;
  driver: Driver;
  distance: string;
  duration: string;
  type: 'solo_ride' | 'pool';
  startTime: string;
}

export interface RideDetails {
  id: string;
  pickup: string;
  destination: string;
  distance: string;
  duration: string;
  fare: number;
  status: 'booked' | 'ongoing' | 'completed' | 'cancelled';
  type: 'solo_ride' | 'pool';
  date: string;
  startTime: string;
  driver?: Driver;
  poolId?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export interface RideStats {
  totalRides: number;
  completedRides: number;
  totalSpent: number;
  rating: number;
} 