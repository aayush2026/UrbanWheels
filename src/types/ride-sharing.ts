export interface RidePool {
  id: string;
  startLocation: string;
  endLocation: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  participants: RideParticipant[];
  route: {
    distance: string;
    duration: string;
  };
  status: 'open' | 'full' | 'departed';
}

export interface RideParticipant {
  id: string;
  name: string;
  image: string;
  rating: number;
  isVerified: boolean;
  pickupPoint: string;
  dropoffPoint: string;
  joinedAt: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
} 