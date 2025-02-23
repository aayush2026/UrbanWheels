'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RideDetails } from '@/types/ride';
import Link from 'next/link';

interface RecentRidesProps {
  rides: RideDetails[];
}

export default function RecentRides({ rides }: RecentRidesProps) {
  return (
    <div className="mt-6 bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-3xl font-medium text-gray-900">Recent Rides</h3>
          <Link
            href="/rides"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all rides →
          </Link> 
        </div>
        <div className="mt-4">
          <ul role="list" className="divide-y divide-gray-200">
            {rides.map((ride) => (
              <li key={ride.id} className="my-2">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <div className="text-lg font-medium text-indigo-600">
                        {ride.type === 'solo_ride' ? 'Solo Ride' : 'Pool Ride'}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          ride.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : ride.status === 'ongoing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2">
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
                    {ride.status === 'completed' && ride.feedback && (
                      <div className="mt-2 border-t pt-2">
                        <div className="flex items-center">
                          <div className="text-yellow-400">
                            {'★'.repeat(ride.feedback.rating)}
                            {'☆'.repeat(5 - ride.feedback.rating)}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {ride.feedback.comment}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 