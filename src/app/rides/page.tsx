'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface Ride {
  id: string;
  from: string;
  to: string;
  date: string;
  status: 'completed' | 'ongoing' | 'cancelled';
  price: number;
}

export default function RidesPage() {
  const { user, isLoading } = useAuth();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching rides data
    setTimeout(() => {
      setRides([
        {
          id: '1',
          from: 'Downtown',
          to: 'Airport',
          date: '2024-03-15',
          status: 'completed',
          price: 25.99
        },
        {
          id: '2',
          from: 'Mall',
          to: 'Beach',
          date: '2024-03-16',
          status: 'ongoing',
          price: 15.50
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">My Rides</h1>
        
        <div className="mt-6">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white shadow overflow-hidden sm:rounded-md mb-4"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {ride.from} → {ride.to}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(ride.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      ride.status === 'completed' ? 'bg-green-100 text-green-800' :
                      ride.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                    </span>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      ${ride.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 