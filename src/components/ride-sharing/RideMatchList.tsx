'use client';

import { useState, useEffect } from 'react';
import { DUMMY_RIDE_POOLS } from '@/lib/data/dummy';
import { RidePool } from '@/types/ride-sharing';
import RidePoolCard from './RidePoolCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface RideMatchListProps {
  startLocation: string;
  endLocation: string;
  departureTime: string;
}

export default function RideMatchList({
  startLocation,
  endLocation,
  departureTime
}: RideMatchListProps) {
  const [pools, setPools] = useState<RidePool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch matching rides
    const fetchMatches = () => {
      setLoading(true);
      setTimeout(() => {
        setPools(DUMMY_RIDE_POOLS);
        setLoading(false);
      }, 1000);
    };

    fetchMatches();

    // Simulate real-time updates
    const interval = setInterval(() => {
      const updatedPools = [...DUMMY_RIDE_POOLS].map(pool => ({
        ...pool,
        availableSeats: Math.max(0, pool.availableSeats - Math.random() > 0.7 ? 1 : 0)
      }));
      setPools(updatedPools);
    }, 5000);

    return () => clearInterval(interval);
  }, [startLocation, endLocation, departureTime]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Available Ride Shares ({pools.length})
      </h2>
      {pools.map(pool => (
        <RidePoolCard key={pool.id} pool={pool} />
      ))}
    </div>
  );
} 