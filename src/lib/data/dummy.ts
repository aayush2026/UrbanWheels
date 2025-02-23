import { RideDetails, RideStatus, Driver, RideStats, RideHistory } from '@/types/ride';
import { ProfileData } from '@/types/profile';
import { RidePool } from '@/types/ride-sharing';

// Function to create a style for initials
export const getInitials = (name: string) => {
  return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
};

// Drivers data with initials as profile pictures
export const DUMMY_DRIVERS: Driver[] = [
  {
    id: 'driver_1',
    name: 'John Smith',
    image: getInitials('John Smith'), // Use initials
    rating: 4.8
  },
  {
    id: 'driver_2',
    name: 'Sarah Johnson',
    image: getInitials('Sarah Johnson'), // Use initials
    rating: 4.9
  },
  {
    id: 'driver_3',
    name: 'Mike Brown',
    image: getInitials('Mike Brown'), // Use initials
    rating: 4.7
  },
  {
    id: 'driver_4',
    name: 'Emma Wilson',
    image: getInitials('Emma Wilson'), // Use initials
    rating: 4.6
  },
  {
    id: 'driver_5',
    name: 'David Lee',
    image: getInitials('David Lee'), // Use initials
    rating: 4.9
  }
];

// Ride history data with specific place names
export const DUMMY_RIDES: RideHistory[] = [
  {
    id: '1',
    driver: {
      id: 'driver1',
      name: 'John Doe',
      image: getInitials('John Doe'), // Use initials
      rating: 4.5,
    },
    fare: 2000.0,
    pickup: 'Central Park',
    destination: 'Times Square',
    date: '2023-10-01T10:00:00Z',
    distance: '10 miles',
    duration: '30 mins',
    status: 'completed',
    type: 'solo_ride',
    startTime: '2023-10-01T10:00:00Z',
  },
  {
    id: '2',
    driver: {
      id: 'driver2',
      name: 'Sarah Connor',
      image: getInitials('Sarah Connor'), // Use initials
      rating: 4.7,
    },
    fare: 2500.0,
    pickup: 'Brooklyn Bridge',
    destination: 'Statue of Liberty',
    date: '2023-10-02T11:00:00Z',
    distance: '15 miles',
    duration: '40 mins',
    status: 'completed',
    type: 'pool',
    startTime: '2023-10-02T11:00:00Z',
  },
  {
    id: '3',
    driver: {
      id: 'driver3',
      name: 'Mike Johnson',
      image: getInitials('Mike Johnson'), // Use initials
      rating: 4.6,
    },
    fare: 3000.0,
    pickup: 'Empire State Building',
    destination: 'Fifth Avenue',
    date: '2023-10-03T12:00:00Z',
    distance: '20 miles',
    duration: '50 mins',
    status: 'completed',
    type: 'solo_ride',
    startTime: '2023-10-03T12:00:00Z',
  },
  {
    id: '4',
    driver: {
      id: 'driver4',
      name: 'Emma Watson',
      image: getInitials('Emma Watson'), // Use initials
      rating: 4.8,
    },
    fare: 1500.0,
    pickup: 'Wall Street',
    destination: 'One World Trade Center',
    date: '2023-10-04T13:00:00Z',
    distance: '8 miles',
    duration: '20 mins',
    status: 'cancelled',
    type: 'pool',
    startTime: '2023-10-04T13:00:00Z',
  },
  {
    id: '5',
    driver: {
      id: 'driver5',
      name: 'David Beckham',
      image: getInitials('David Beckham'), // Use initials
      rating: 4.9,
    },
    fare: 1800.0,
    pickup: 'Chinatown',
    destination: 'Little Italy',
    date: '2023-10-05T14:00:00Z',
    distance: '12 miles',
    duration: '35 mins',
    status: 'completed',
    type: 'solo_ride',
    startTime: '2023-10-05T14:00:00Z',
  },
];

// Profile statistics
export const DUMMY_PROFILE_STATS: RideStats = {
  totalRides: 42,
  completedRides: 38,
  totalSpent: 846.50,
  rating: 4.8
};

// User profile data
export const DUMMY_PROFILE: ProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 234-567-8900',
  address: '123 Main St, City, Country',
  profileImage: 'https://ui-avatars.com/api/?name=John+Doe'
};

// Ride pools data
export const DUMMY_RIDE_POOLS: RidePool[] = [
  {
    id: 'pool_1',
    startLocation: 'Downtown Station',
    endLocation: 'Airport Terminal 1',
    departureTime: '2024-03-20T08:00:00Z',
    availableSeats: 3,
    pricePerSeat: 100.00,
    participants: [
      {
        id: 'user_1',
        name: 'Alice Johnson',
        image: 'https://ui-avatars.com/api/?name=Alice+Johnson',
        rating: 4.9,
        isVerified: true,
        pickupPoint: 'Downtown Station',
        dropoffPoint: 'Airport Terminal 1',
        joinedAt: '2024-03-19T15:30:00Z',
        emergencyContact: {
          name: 'Bob Johnson',
          phone: '+1 234-567-8901',
          relationship: 'Spouse'
        }
      }
    ],
    route: {
      distance: '15.2 km',
      duration: '25 mins'
    },
    status: 'open'
  },
  {
    id: 'pool_2',
    startLocation: 'Shopping Mall',
    endLocation: 'University Campus',
    departureTime: '2024-03-20T09:30:00Z',
    availableSeats: 2,
    pricePerSeat: 75.00,
    participants: [
      {
        id: 'user_2',
        name: 'Mike Smith',
        image: 'https://ui-avatars.com/api/?name=Mike+Smith',
        rating: 4.7,
        isVerified: true,
        pickupPoint: 'Shopping Mall',
        dropoffPoint: 'University Campus',
        joinedAt: '2024-03-19T18:45:00Z'
      }
    ],
    route: {
      distance: '8.5 km',
      duration: '15 mins'
    },
    status: 'open'
  },
  {
    id: 'pool_3',
    startLocation: 'Central Park',
    endLocation: 'Beach Resort',
    departureTime: '2024-03-20T10:00:00Z',
    availableSeats: 0,
    pricePerSeat: 120.00,
    participants: [
      {
        id: 'user_3',
        name: 'Sarah Wilson',
        image: 'https://ui-avatars.com/api/?name=Sarah+Wilson',
        rating: 4.8,
        isVerified: true,
        pickupPoint: 'Central Park',
        dropoffPoint: 'Beach Resort',
        joinedAt: '2024-03-19T12:30:00Z'
      }
    ],
    route: {
      distance: '22.3 km',
      duration: '35 mins'
    },
    status: 'full'
  }
];