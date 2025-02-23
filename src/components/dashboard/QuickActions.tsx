'use client';

import Link from 'next/link';
import { useRide } from '@/context/RideContext';

export default function QuickActions() {
  const { currentRide } = useRide();

  if (currentRide && ['booked', 'ongoing'].includes(currentRide.status)) {
    return (
      <div className="mt-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Active Ride in Progress</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Please complete your current ride before booking a new one.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Book a Ride</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/book?type=solo"
          className="relative bg-white p-6 rounded-lg border-2 border-gray-300 hover:border-indigo-500 transition-colors"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Solo Ride</h3>
            <p className="text-sm text-gray-500">
              Book a private ride just for yourself. Enjoy comfort and convenience at standard rates.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Starting from ₹100</span>
            </div>
            <div className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Book Solo Ride
            </div>
          </div>
        </Link>

        <Link
          href="/book?type=pool"
          className="relative bg-white p-6 rounded-lg border-2 border-gray-300 hover:border-indigo-500 transition-colors"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Share Pool</h3>
            <p className="text-sm text-gray-500">
              Join a ride pool and split the fare with others going the same way. Save money and reduce carbon footprint.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium text-green-600">Save up to 50%</span>
            </div>
            <div className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              Find Pool
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
} 