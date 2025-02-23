'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RideDetails, Driver } from '@/types/ride';
import { DUMMY_DRIVERS } from '@/lib/data/dummy';
import { notify } from '@/lib/utils/notifications';

interface BookRideParams {
  pickup: string;
  destination: string;
  distance: string;
  duration: string;
  fare: number;
  type: 'solo_ride' | 'pool';
  poolId?: string;
}

interface RideContextType {
  currentRide: RideDetails | null;
  bookRide: (params: BookRideParams) => void;
  startRide: () => void;
  completeRide: () => void;
  cancelRide: () => void;
  clearRide: () => void;
  completePayment: (rideId: string) => void;
  submitFeedback: (rideId: string, feedback: { rating: number; comment: string }) => void;
}

const RideContext = createContext<RideContextType | undefined>(undefined);

export function RideProvider({ children }: { children: ReactNode }) {
  const [currentRide, setCurrentRide] = useState<RideDetails | null>(null);
  const [rideHistory, setRideHistory] = useState<RideDetails[]>([]);

  // Initialize ride from localStorage
  useEffect(() => {
    const storedRide = localStorage.getItem('currentRide');
    if (storedRide) {
      setCurrentRide(JSON.parse(storedRide));
    }
  }, []);

  const bookRide = (params: BookRideParams) => {
    const newRide: RideDetails = {
      id: `ride_${Date.now()}`,
      pickup: params.pickup,
      destination: params.destination,
      distance: params.distance,
      duration: params.duration,
      fare: params.fare,
      status: 'booked',
      type: params.type,
      date: new Date().toISOString(),
      startTime: new Date().toISOString(),
      driver: DUMMY_DRIVERS[Math.floor(Math.random() * DUMMY_DRIVERS.length)],
      poolId: params.poolId
    };

    setCurrentRide(newRide);
    setRideHistory(prev => [newRide, ...prev]);
    localStorage.setItem('currentRide', JSON.stringify(newRide));
  };

  const startRide = () => {
    if (currentRide) {
      const updatedRide = { ...currentRide, status: 'ongoing' as const };
      setCurrentRide(updatedRide);
      localStorage.setItem('currentRide', JSON.stringify(updatedRide));
    }
  };

  const completeRide = () => {
    if (currentRide) {
      const updatedRide = { ...currentRide, status: 'completed' as const };
      setCurrentRide(updatedRide);
      localStorage.setItem('currentRide', JSON.stringify(updatedRide));
    }
  };

  const cancelRide = () => {
    if (currentRide) {
      const updatedRide = { ...currentRide, status: 'cancelled' as const };
      setCurrentRide(updatedRide);
      localStorage.setItem('currentRide', JSON.stringify(updatedRide));
      notify.info('Your ride has been cancelled');
    }
  };

  const clearRide = () => {
    setCurrentRide(null);
    localStorage.removeItem('currentRide');
  };

  const completePayment = (rideId: string) => {
    if (currentRide && currentRide.id === rideId) {
      const updatedRide = { ...currentRide, status: 'completed' as const };
      setCurrentRide(updatedRide);
      localStorage.setItem('currentRide', JSON.stringify(updatedRide));
      notify.success('Payment completed successfully!');
    }
  };

  const submitFeedback = (rideId: string, feedback: { rating: number; comment: string }) => {
    setRideHistory(prev => prev.map(ride => 
      ride.id === rideId 
        ? { ...ride, feedback } 
        : ride
    ));
    notify.success('Thank you for your feedback!');
  };

  return (
    <RideContext.Provider value={{ 
      currentRide, 
      bookRide, 
      startRide,
      completeRide,
      cancelRide,
      clearRide,
      completePayment,
      submitFeedback
    }}>
      {children}
    </RideContext.Provider>
  );
}

export const useRide = () => {
  const context = useContext(RideContext);
  if (undefined === context) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
}; 