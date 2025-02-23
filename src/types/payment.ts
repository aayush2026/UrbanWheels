// Create a new file to consolidate payment-related types
export interface PaymentData {
  id: string;
  amount: number;
  metadata: {
    poolId?: string;
  };
  status: string;
}

export interface PaymentHistoryRecord {
  id: string;
  amount: number;
  date: string;
  status: string;
  type: 'solo_ride' | 'pool';
  rideDetails: {
    id: string;
    pickup: string;
    destination: string;
    distance: string;
    duration: string;
    type: 'solo_ride' | 'pool';
    driver?: {
      name: string;
      image: string;
      rating: number;
    };
    poolId?: string;
  };
  paymentMethod: string;
}

export type PaymentStatus = 'loading' | 'success' | 'failed'; 