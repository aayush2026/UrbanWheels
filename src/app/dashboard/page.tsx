'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { DUMMY_PROFILE_STATS, DUMMY_RIDES, DUMMY_RIDE_POOLS } from '@/lib/data/dummy';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const stats = DUMMY_PROFILE_STATS;
  const recentRides = DUMMY_RIDES.slice(0, 3); // Show only last 3 rides

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (isLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        {/* Welcome Section */}
        <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Welcome back, {user?.firstName}!
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here's your ride activity overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Rides</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalRides}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Completed Rides</dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">{stats.completedRides}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Spent</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">${stats.totalSpent.toFixed(2)}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
              <dd className="mt-1 text-3xl font-semibold text-yellow-500">{stats.averageRating}</dd>
            </div>
          </div>
        </div>

        {/* Available Ride Pools Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Available Ride Pools</h2>
            <Link
              href="/ride-sharing"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all pools →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DUMMY_RIDE_POOLS.filter(pool => pool.status === 'open').slice(0, 3).map((pool) => (
              <div key={pool.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-4">
                  {/* Route Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {pool.startLocation} → {pool.endLocation}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {pool.route.distance} • {pool.route.duration}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {pool.availableSeats} seats
                    </span>
                  </div>

                  {/* Participants */}
                  <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Current Participants:</p>
                    <div className="space-y-3">
                      {pool.participants.map((participant) => (
                        <div key={participant.id} className="flex items-center space-x-3">
                          <img
                            src={participant.image}
                            alt={participant.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {participant.name}
                              </p>
                              {participant.isVerified && (
                                <svg
                                  className="h-4 w-4 text-blue-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="text-yellow-500">★</span>
                              <span className="ml-1">{participant.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Join Button */}
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      ${pool.pricePerSeat.toFixed(2)} per person
                    </p>
                    <Link
                      href={`/ride-sharing/${pool.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Rides */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Rides</h2>
            <Link
              href="/rides"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all rides →
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {recentRides.map((ride) => (
                <li key={ride.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={ride.driver.image}
                          alt={ride.driver.name}
                        />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {ride.driver.name}
                          </p>
                          <div className="flex items-center">
                            <span className="text-sm text-yellow-500">★</span>
                            <span className="ml-1 text-sm text-gray-500">
                              {ride.driver.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ride.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : ride.status === 'ongoing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                        </span>
                        <p className="mt-1 text-sm text-gray-900">${ride.fare.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="mt-1 text-sm text-gray-900">{ride.pickup}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="mt-1 text-sm text-gray-900">{ride.destination}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between text-sm text-gray-500">
                        <div>{new Date(ride.date).toLocaleString()}</div>
                        <div>{ride.distance} • {ride.duration}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/book"
            className="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Book a New Ride
            </span>
          </Link>
          <Link
            href="/profile/settings"
            className="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Update Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
} 