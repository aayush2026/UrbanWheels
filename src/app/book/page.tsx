'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorMessage from '@/components/shared/ErrorMessage';
import Map from '@/components/maps/Map';
import LocationInput from '@/components/maps/LocationInput';
import { RIDE_TYPES } from '@/lib/constants/config';

export default function BookRidePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    rideType: RIDE_TYPES[0].id,
  });
  const [routeInfo, setRouteInfo] = useState({
    distance: '',
    duration: '',
    fare: 0,
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const calculateFare = (distance: string, rideType: string) => {
    const selectedRideType = RIDE_TYPES.find(type => type.id === rideType);
    if (!selectedRideType || !distance) return 0;

    const numericDistance = parseFloat(distance.replace(/[^0-9.]/g, ''));
    return (numericDistance * selectedRideType.multiplier * 2) + selectedRideType.basePrice;
  };

  const handleRouteCalculated = (distance: string, duration: string) => {
    const fare = calculateFare(distance, formData.rideType);
    setRouteInfo({ distance, duration, fare });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pickup || !formData.destination) {
      setError('Please enter pickup and destination locations');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/rides');
    } catch (err) {
      setError('Failed to book ride. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Book a Ride</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <LocationInput
                id="pickup"
                label="Pickup Location"
                value={formData.pickup}
                onChange={(value) => setFormData({ ...formData, pickup: value })}
                placeholder="Enter pickup address"
              />

              <LocationInput
                id="destination"
                label="Destination"
                value={formData.destination}
                onChange={(value) => setFormData({ ...formData, destination: value })}
                placeholder="Enter destination address"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Ride Type
                </label>
                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {RIDE_TYPES.map((type) => (
                    <div
                      key={type.id}
                      className={`relative rounded-lg border p-4 cursor-pointer ${
                        formData.rideType === type.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300'
                      }`}
                      onClick={() => {
                        setFormData({ ...formData, rideType: type.id });
                        if (routeInfo.distance) {
                          const fare = calculateFare(routeInfo.distance, type.id);
                          setRouteInfo({ ...routeInfo, fare });
                        }
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {type.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {type.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {routeInfo.distance && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-700">
                    <p>Distance: {routeInfo.distance}</p>
                    <p>Duration: {routeInfo.duration}</p>
                    <p className="text-lg font-semibold mt-2">
                      Estimated Fare: ${routeInfo.fare.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {error && <ErrorMessage message={error} />}

              <button
                type="submit"
                disabled={submitting || !routeInfo.distance}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {submitting ? 'Booking...' : 'Book Ride'}
              </button>
            </form>
          </div>

          <div className="lg:pl-6">
            <Map
              pickup={formData.pickup}
              destination={formData.destination}
              onRouteCalculated={handleRouteCalculated}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 