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
        <Card>
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle className="text-3xl font-medium">Avaliable Ride Pools</CardTitle>
            <Link
                href="/ride-sharing"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
              View all pools →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
            {availablePools.slice(0, 3).map((pool) => (
              <Card key={pool.id}>
                  <CardContent>
                    <div className="flex flex-row justify-between items-start">
                      <div className='flex flex-col pb-1'>
                        <div className='flex flex-row items-center gap-1 pb-1'>
                          <MapPin className='w-12 h-12' />
                          <p className="font-medium text-md">{pool.startLocation} → {pool.endLocation}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDateTime(pool.departureTime)}</p>
                      </div>
                      <Badge className="text-xs font-medium" variant={pool.availableSeats > 0 ? "default" : "destructive"}>
                        {pool.availableSeats} seats left
                      </Badge>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="text-sm text-muted-foreground">{pool.route.distance} • {pool.route.duration}</span>
                      <div className="flex -space-x-2">
                        {pool.participants.map((participant) => (
                          <img
                            key={participant.id}
                            className="h-6 w-6 rounded-full ring-2 ring-white"
                            src={participant.image}
                            alt={participant.name}
                            title={participant.name}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        ${pool.pricePerSeat.toFixed(2)} per person
                      </span>
                      <Link
                        href={`/ride-sharing/${pool.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
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