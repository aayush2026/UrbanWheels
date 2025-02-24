'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { RideHistory, RideStatus } from '@/types/ride';
import { DUMMY_RIDES } from '@/lib/data/dummy';
import { getInitials } from '@/lib/data/dummy';

const ITEMS_PER_PAGE = 5;

export default function RidesPage() {
  const { isLoading } = useAuth();
  const [rides, setRides] = useState<RideHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<RideStatus | 'all'>('all');
  const [dateSort, setDateSort] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRides(DUMMY_RIDES);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRides = rides
    .filter(ride => statusFilter === 'all' || ride.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateSort === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const totalPages = Math.ceil(filteredRides.length / ITEMS_PER_PAGE);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return <ClipLoader size={50} color="#4F46E5" />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Rides</h1>
          
          <div className="flex space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RideStatus | 'all')}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Rides</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              onClick={() => setDateSort(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              Sort by Date {dateSort === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md dark:bg-gray-800">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedRides.map((ride) => (
              <li key={ride.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-300 text-white font-bold dark:bg-gray-600"
                        style={{ fontSize: '1.25rem' }}
                      >
                        {getInitials(ride.driver.name)}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {ride.driver.name}
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm text-yellow-500">★</span>
                          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            {ride.driver.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ride.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : ride.status === 'ongoing'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        }`}
                      >
                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </span>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">₹{ride.fare.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{ride.pickup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{ride.destination}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div>{new Date(ride.date).toLocaleString()}</div>
                      <div>{ride.distance} • {ride.duration}</div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === index + 1
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-800 dark:border-indigo-700 dark:text-indigo-100'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}