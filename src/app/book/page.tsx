'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorMessage from '@/components/shared/ErrorMessage';
import Map from '@/components/maps/Map';
import LocationInput from '@/components/maps/LocationInput';
import { RIDE_TYPES } from '@/lib/constants/config';
import { DUMMY_RIDE_POOLS } from '@/lib/data/dummy';
import RidePoolCard from '@/components/ride-sharing/RidePoolCard';
import { RidePool } from '@/types/ride-sharing';
import { useRide } from '@/context/RideContext';
import { notify } from '@/lib/utils/notifications';

interface FormErrors {
  pickup?: string;
  destination?: string;
  rideType?: string;
  general?: string;
}

export default function BookRidePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingType = searchParams.get('type') || 'solo';
  const selectedPoolId = searchParams.get('poolId');
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [availablePools, setAvailablePools] = useState<RidePool[]>([]);
  const [loadingPools, setLoadingPools] = useState(false);
  const [selectedPool, setSelectedPool] = useState<RidePool | null>(null);
  const { currentRide } = useRide();

  const { bookRide } = useRide();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.pickup.trim()) {
      newErrors.pickup = 'Pickup location is required';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (formData.pickup === formData.destination && formData.pickup !== '') {
      newErrors.general = 'Pickup and destination cannot be the same';
    }

    if (!routeInfo.distance) {
      newErrors.general = 'Please ensure both locations are valid for route calculation';
    }

    if (!RIDE_TYPES.find(type => type.id === formData.rideType)) {
      newErrors.rideType = 'Please select a valid ride type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateFare = (distance: string, rideType: string) => {
    const selectedRideType = RIDE_TYPES.find(type => type.id === rideType);
    if (!selectedRideType || !distance) return 0;

    const numericDistance = parseFloat(distance.replace(/[^0-9.]/g, ''));
    return (numericDistance * selectedRideType.multiplier * 2) + selectedRideType.basePrice;
  };

  const handleRouteCalculated = (distance: string, duration: string) => {
    const fare = calculateFare(distance, formData.rideType);
    setRouteInfo({ distance, duration, fare });
    // Clear any previous route-related errors
    setErrors(prev => ({ ...prev, general: undefined }));
  };

  const handleLocationChange = (field: 'pickup' | 'destination', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear specific field error when user starts typing
    setErrors(prev => ({ ...prev, [field]: undefined, general: undefined }));
  };

  const handleDestinationKeyDown = (e: React.KeyboardEvent) => {
    // Prevent form submission on Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      notify.error('Please fix the errors in the form');
      return;
    }

    setSubmitting(true);
    try {
      // Book the ride instead of proceeding to payment
      bookRide({
        pickup: formData.pickup,
        destination: formData.destination,
        distance: routeInfo.distance,
        duration: routeInfo.duration,
        fare: routeInfo.fare,
        type: bookingType === 'solo' ? 'solo_ride' : 'pool'
      });
      notify.success('Ride booked successfully!');
      router.push('/dashboard');
    } catch (error) {
      notify.error('Failed to book ride. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchAvailablePools = async () => {
    if (!formData.pickup || !formData.destination) return;
    
    setLoadingPools(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For testing, show all pools
    setAvailablePools(DUMMY_RIDE_POOLS);
    setLoadingPools(false);
  };

  useEffect(() => {
    if (bookingType === 'pool') {
      fetchAvailablePools();
    }
  }, [formData.pickup, formData.destination, bookingType]);

  useEffect(() => {
    if (selectedPoolId && bookingType === 'pool') {
      const pool = DUMMY_RIDE_POOLS.find(p => p.id === selectedPoolId);
      if (pool) {
        setSelectedPool(pool);
        setFormData({
          ...formData,
          pickup: pool.startLocation,
          destination: pool.endLocation
        });
      }
    }
  }, [selectedPoolId, bookingType]);

  useEffect(() => {
    if (currentRide && ['booked', 'ongoing'].includes(currentRide.status)) {
      router.push('/dashboard');
    }
  }, [currentRide, router]);

  const handlePoolSelect = (pool: RidePool) => {
    router.push(`/book?type=pool&poolId=${pool.id}`);
  };

  const renderSelectedPoolDetails = () => {
    if (!selectedPool) return null;

    return (
      <div className="bg-white rounded-lg border border-indigo-200 p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Selected Pool Details</h3>
            <p className="text-sm text-gray-500 mt-1">
              Departure: {new Date(selectedPool.departureTime).toLocaleString()}
            </p>
          </div>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            {selectedPool.availableSeats} seats left
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Distance</p>
            <p className="font-medium text-gray-900">{selectedPool.route.distance}</p>
          </div>
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-medium text-gray-900">{selectedPool.route.duration}</p>
          </div>
          <div>
            <p className="text-gray-500">Price per seat</p>
            <p className="font-medium text-green-600">${selectedPool.pricePerSeat.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900 mb-2">Current Participants:</p>
          <div className="space-y-3">
            {selectedPool.participants.map(participant => (
              <div key={participant.id} className="flex items-center space-x-3">
                <img
                  src={participant.image}
                  alt={participant.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                    {participant.isVerified && (
                      <svg className="h-4 w-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

        <button
          onClick={() => router.push(`/payment/checkout?poolId=${selectedPool.id}`)}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Join Pool
        </button>
      </div>
    );
  };

  const renderPoolSection = () => {
    if (loadingPools) {
      return <LoadingSpinner />;
    }

    if (!formData.pickup || !formData.destination) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Enter pickup and destination to find available pools</p>
        </div>
      );
    }

    if (availablePools.length === 0) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No pools available for this route</p>
          <p className="text-sm text-gray-400 mt-2">Try different locations or check back later</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {selectedPool && renderSelectedPoolDetails()}
        
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Available Pools</h3>
          <span className="text-sm text-gray-500">{availablePools.length} pools found</span>
        </div>
        <div className="space-y-4">
          {availablePools.map(pool => (
            <div
              key={pool.id}
              onClick={() => handlePoolSelect(pool)}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-indigo-500 transition-colors cursor-pointer"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {pool.startLocation} → {pool.endLocation}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Departure: {new Date(pool.departureTime).toLocaleString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {pool.availableSeats} seats left
                  </span>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Distance</p>
                      <p className="font-medium text-gray-900">{pool.route.distance}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium text-gray-900">{pool.route.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Current Participants:</p>
                  <div className="flex -space-x-2 overflow-hidden">
                    {pool.participants.map(participant => (
                      <img
                        key={participant.id}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src={participant.image}
                        alt={participant.name}
                        title={participant.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-green-600 font-medium">
                    ${pool.pricePerSeat.toFixed(2)} per person
                  </div>
                  <button
                    onClick={() => router.push(`/payment/checkout?poolId=${pool.id}`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Join Pool
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (currentRide && ['booked', 'ongoing'].includes(currentRide.status)) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Cannot Book New Ride</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>You have an active ride. Please complete your current ride before booking a new one.</p>
                </div>
                <div className="mt-4">
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => router.push('/dashboard')}
                      className="bg-yellow-800 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-yellow-700"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium text-gray-900">
            {bookingType === 'solo' ? 'Book a Solo Ride' : 'Find a Ride Pool'}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/book?type=solo')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                bookingType === 'solo'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Solo Ride
            </button>
            <button
              onClick={() => router.push('/book?type=pool')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                bookingType === 'pool'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Share Pool
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <LocationInput
                  id="pickup"
                  label="Pickup Location"
                  value={formData.pickup}
                  onChange={(value) => handleLocationChange('pickup', value)}
                  placeholder="Enter pickup address"
                  error={errors.pickup}
                />
                {errors.pickup && (
                  <p className="mt-1 text-sm text-red-600">{errors.pickup}</p>
                )}
              </div>

              <div>
                <LocationInput
                  id="destination"
                  label="Destination"
                  value={formData.destination}
                  onChange={(value) => handleLocationChange('destination', value)}
                  placeholder="Enter destination address"
                  error={errors.destination}
                  onKeyDown={handleDestinationKeyDown}
                />
                {errors.destination && (
                  <p className="mt-1 text-sm text-red-600">{errors.destination}</p>
                )}
              </div>

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
                      } ${errors.rideType ? 'border-red-300' : ''}`}
                      onClick={() => {
                        setFormData({ ...formData, rideType: type.id });
                        setErrors(prev => ({ ...prev, rideType: undefined }));
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
                {errors.rideType && (
                  <p className="mt-1 text-sm text-red-600">{errors.rideType}</p>
                )}
              </div>

              {bookingType === 'solo' ? (
                <>
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
                </>
              ) : (
                renderPoolSection()
              )}

              {errors.general && <ErrorMessage message={errors.general} />}

              {bookingType === 'solo' && routeInfo.distance && (
                <>
                  <button
                    type="submit"
                    disabled={submitting || !routeInfo.distance}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {submitting ? 'Processing...' : 'Book Ride'}
                  </button>
                </>
              )}
            </form>
          </div>

          <div className="lg:pl-6">
            <Map
              pickup={formData.pickup}
              destination={formData.destination}
              onRouteCalculated={handleRouteCalculated}
              highlightedRoute={selectedPool?.route}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 