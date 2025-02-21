export type RideStatus = 'completed' | 'ongoing' | 'cancelled';

export interface RideHistory {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  status: RideStatus;
  fare: number;
  driver: {
    name: string;
    image: string;
    rating: number;
  };
  distance: string;
  duration: string;
} 