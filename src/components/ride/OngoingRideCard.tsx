'use client';

import { useRide } from '@/context/RideContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { notify } from '@/lib/utils/notifications';
import RideFeedback from '@/components/feedback/RideFeedback';
import { usePayment } from '@/context/PaymentContext';

export default function OngoingRideCard() {
  const { currentRide, completeRide, startRide, submitFeedback } = useRide();
  const [isCompleting, setIsCompleting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();
  const { setPendingPayment } = usePayment();

  if (!currentRide) return null;

  const handleCompleteRide = async () => {
    setIsCompleting(true);
    try {
      // Store ride details before completing
      const rideData = {
        id: currentRide.id,
        pickup: currentRide.pickup,
        destination: currentRide.destination,
        distance: currentRide.distance,
        duration: currentRide.duration,
        fare: currentRide.fare,
        type: currentRide.type,
        driver: currentRide.driver
      };
      localStorage.setItem('currentRideDetails', JSON.stringify(rideData));
      
      completeRide();
      notify.success('Ride completed successfully!');
      setShowFeedback(true);
    } catch (error) {
      notify.error('Failed to complete ride. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleStartRide = () => {
    startRide();
    notify.success('Your ride has started!');
  };

  const handleFeedbackSubmit = (feedback: { rating: number; comment: string }) => {
    try {
      submitFeedback(currentRide.id, feedback);
      setPendingPayment(currentRide.fare, currentRide);
      setShowFeedback(false);
      router.push('/payment/checkout');
    } catch (error) {
      notify.error('Failed to process feedback');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Current Ride</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          currentRide.status === 'ongoing' 
            ? 'bg-green-100 text-green-800'
            : currentRide.status === 'booked'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {currentRide.status.charAt(0).toUpperCase() + currentRide.status.slice(1)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600">A</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pickup Location</p>
              <p className="text-sm font-medium text-gray-900">{currentRide.pickup}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600">B</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Destination</p>
              <p className="text-sm font-medium text-gray-900">{currentRide.destination}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
          <div>
            <p className="text-sm text-gray-500">Distance</p>
            <p className="text-sm font-medium text-gray-900">{currentRide.distance}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-sm font-medium text-gray-900">{currentRide.duration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fare</p>
            <p className="text-sm font-medium text-gray-900">₹{currentRide.fare.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-sm font-medium text-gray-900">
              {currentRide.type === 'solo_ride' ? 'Solo Ride' : 'Pool'}
            </p>
          </div>
        </div>

        {showFeedback ? (
          <RideFeedback 
            ride={currentRide} 
            onSubmit={handleFeedbackSubmit} 
          />
        ) : (
          <div className="mt-6 space-y-3">
            {currentRide.status === 'booked' && (
              <button
                onClick={handleStartRide}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Start Ride
              </button>
            )}
            
            {currentRide.status === 'ongoing' && (
              <button
                onClick={handleCompleteRide}
                disabled={isCompleting}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isCompleting ? 'Completing Ride...' : 'Complete Ride'}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
} 