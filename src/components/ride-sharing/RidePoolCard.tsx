'use client';

import { useState } from 'react';
import { RidePool } from '@/types/ride-sharing';
import UserProfileCard from './UserProfileCard';

interface RidePoolCardProps {
  pool: RidePool;
}

export default function RidePoolCard({ pool }: RidePoolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinPool = async () => {
    setIsJoining(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsJoining(false);
    // Show success toast
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {pool.startLocation} → {pool.endLocation}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Departure: {new Date(pool.departureTime).toLocaleString()}
            </p>
          </div>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              pool.status === 'open'
                ? 'bg-green-100 text-green-800'
                : pool.status === 'full'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
          </span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              {pool.availableSeats} seats available
            </p>
            <p className="text-sm font-medium text-gray-900">
              ${pool.pricePerSeat.toFixed(2)} per person
            </p>
          </div>
          <button
            onClick={handleJoinPool}
            disabled={pool.status !== 'open' || isJoining}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isJoining ? 'Joining...' : 'Join Pool'}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900">Participants</h4>
            <div className="mt-2 space-y-4">
              {pool.participants.map(participant => (
                <UserProfileCard
                  key={participant.id}
                  participant={participant}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 