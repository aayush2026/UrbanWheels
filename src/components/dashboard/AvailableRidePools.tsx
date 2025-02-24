'use client';

import { RidePool } from '@/types/ride-sharing';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils/dateTime';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from 'lucide-react';

interface AvailableRidePoolsProps {
  pools: RidePool[];
}

export default function AvailableRidePools({ pools }: AvailableRidePoolsProps) {
  const availablePools = pools.filter(pool => pool.status === 'open');

  return (
    <> 
      <div className="mt-6">
        <Card className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700">
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle className="text-3xl font-medium text-gray-900 dark:text-white">Available Ride Pools</CardTitle>
            <Link
                href="/ride-sharing"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
              >
              View all pools →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {availablePools.slice(0, 3).map((pool) => (
              <Card key={pool.id} className="bg-gray-100 dark:bg-gray-900 shadow-md dark:shadow-gray-700">
                  <CardContent>
                    <div className="flex flex-row justify-between items-start">
                      <div className='flex flex-col pb-1'>
                        <div className='flex flex-row items-center gap-1 pb-1'>
                          <MapPin className='w-12 h-12 text-gray-900 dark:text-gray-200' />
                          <p className="font-medium text-md text-gray-900 dark:text-white">{pool.startLocation} → {pool.endLocation}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDateTime(pool.departureTime)}</p>
                      </div>
                      <Badge className="text-xs font-medium" variant={pool.availableSeats > 0 ? "default" : "destructive"}>
                        {pool.availableSeats} seats left
                      </Badge>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{pool.route.distance} • {pool.route.duration}</span>
                      <div className="flex -space-x-2">
                        {pool.participants.map((participant) => (
                          <img
                            key={participant.id}
                            className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-700"
                            src={participant.image}
                            alt={participant.name}
                            title={participant.name}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ₹{pool.pricePerSeat.toFixed(2)} per person
                      </span>
                      <Link
                        href={`/ride-sharing/${pool.id}`}
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        View Details →
                      </Link>
                    </div>
                  </CardContent>
              </Card>
            ))}
            </div>
          </CardContent>
        </Card>
    </div>
    </>
  );
}
