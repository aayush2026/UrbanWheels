'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { RidePool } from '@/types/ride-sharing';
import { DUMMY_RIDE_POOLS } from '@/lib/data/dummy';
import { formatDateTime } from '@/lib/utils/dateTime';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useRide } from '@/context/RideContext';
import { notify } from '@/lib/utils/notifications';
import Chat from '@/components/chat/Chat';
import { useAuth } from '@/context/AuthContext';

export default function RidePoolDetailsPage() {
  const resolvedParams = useParams();
  const { bookRide } = useRide();
  const { user } = useAuth();
  const userId = user ? user.id.toString() : '';
  const [pool, setPool] = useState<RidePool | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const foundPool = DUMMY_RIDE_POOLS.find(p => p.id === resolvedParams.poolId);
      if (!foundPool) {
        router.push('/404');
        return;
      }
      setPool(foundPool);
      setLoading(false);
    }, 1000);
  }, [resolvedParams.poolId, router]);

  const handleJoinPool = () => {
    if (!pool) return;

    try {
      bookRide({
        pickup: pool.startLocation,
        destination: pool.endLocation,
        distance: pool.route.distance,
        duration: pool.route.duration,
        fare: pool.pricePerSeat,
        type: 'pool',
        poolId: pool.id
      });
      notify.success('Successfully joined the ride pool!');
      router.push('/dashboard');
    } catch (error) {
      notify.error(error as string);
    }
  };

  if (loading) {
    return <ClipLoader size={50} color="#4F46E5" />;
  }

  console.log('Chat props:', { poolId: Array.isArray(resolvedParams.poolId) ? resolvedParams.poolId[0] : resolvedParams.poolId || '', userId, currentUsername: user ? user.username : 'Unknown User' });

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="bg-white dark:bg-gray-800 shadow-lg shadow-gray-300 dark:shadow-gray-700 sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Ride Pool Details</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                pool && pool.availableSeats > 0 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
              }`}>
                {pool && pool.status === 'open' ? `${pool.availableSeats} seats available` : 'Full'}
              </span>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-600 pb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Route Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">From</p>
                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{pool ? pool.startLocation : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">To</p>
                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{pool ? pool.endLocation : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Departure Time</p>
                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {pool ? formatDateTime(pool.departureTime) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Journey Details</p>
                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {pool ? `${pool.route.distance} • ${pool.route.duration}` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Participants</h2>
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-600">
                {pool ? pool.participants.map((participant) => (
                  <li key={participant.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <img className="h-8 w-8 rounded-full" src={participant.image} alt={participant.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          {participant.name}
                          {participant.isVerified && <CheckBadgeIcon className="ml-1 h-4 w-4 text-blue-500" aria-hidden="true" />}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">Rating: {participant.rating} ★</p>
                      </div>
                      <div className="text-right text-sm text-gray-500 dark:text-gray-300">
                        <p>Pickup: {participant.pickupPoint}</p>
                        <p>Dropoff: {participant.dropoffPoint}</p>
                      </div>
                    </div>
                  </li>
                )) : <li className="py-4 text-gray-900 dark:text-white">No participants available.</li>}
              </ul>
            </div>

            {pool && pool.status === 'open' && (
              <div className="mt-6">
                <button
                  onClick={handleJoinPool}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Join Pool - ₹{pool.pricePerSeat.toFixed(2)}
                </button>
              </div>
            )}
          </div>
        </div>
        <Chat poolId={Array.isArray(resolvedParams.poolId) ? resolvedParams.poolId[0] : resolvedParams.poolId || ''} userId={userId} currentUsername={user ? user.username : 'Unknown User'} />
      </div>
    </div>
  );
}
