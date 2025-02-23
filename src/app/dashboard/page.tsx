'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { DUMMY_PROFILE_STATS, DUMMY_RIDES, DUMMY_RIDE_POOLS } from '@/lib/data/dummy';
import Link from 'next/link';
import OngoingRideCard from '@/components/ride/OngoingRideCard';
import RecentRides from '@/components/dashboard/RecentRides';
import QuickActions from '@/components/dashboard/QuickActions';
import AvailableRidePools from '@/components/dashboard/AvailableRidePools';
import { RideDetails, RideStats } from '@/types/ride';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const stats: RideStats = DUMMY_PROFILE_STATS;
  const recentRides: RideDetails[] = DUMMY_RIDES.slice(0, 3);

  // useEffect(() => {
  //   // Simulate loading
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  const renderStats = (stats: RideStats) => (
      <div className="grid gap-4 md:grid-cols-4 mt-6">
        <Card className="transform transition-transform duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRides}</div>
            <p className="text-xs text-muted-foreground">{stats.totalRides} from last month</p>
          </CardContent>
        </Card>
        <Card className="transform transition-transform duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedRides}</div>
            <p className="text-xs text-muted-foreground">{stats.completedRides} from last month</p>
          </CardContent>
        </Card>
        <Card className="transform transition-transform duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Money Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card className="transform transition-transform duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <div className="text-2xl font-bold">{stats.rating.toFixed(1)}</div>
              <Star className="h-4 w-4 fill-primary text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Based on 48 rides</p>
          </CardContent>
        </Card>
    </div>
  );

  if (isLoading) {
    return <ClipLoader size={50} color="#4F46E5" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">Dashboard</h1>

      <OngoingRideCard />
      <QuickActions />
      {renderStats(stats)}
      <RecentRides rides={recentRides} />
      <AvailableRidePools pools={DUMMY_RIDE_POOLS} />

      {/* Profile Update Card */}
      <div className="mt-6">
        <Link
          href="/profile/settings"
          className="block w-full p-6 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="mt-2 block text-sm font-medium text-gray-900">
            Update Profile Settings
          </span>
        </Link>
      </div>
    </div>
  );
} 