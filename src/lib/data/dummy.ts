import { RideHistory } from '@/types/ride';
import { ProfileData, RideStats } from '@/types/profile';
import { RidePool } from '@/types/ride-sharing';

export const DUMMY_RIDES: RideHistory[] = [
  {
    id: '1',
    date: '2024-03-15T10:30:00Z',
    pickup: 'Downtown Station',
    destination: 'Airport Terminal 1',
    status: 'completed',
    fare: 35.50,
    driver: {
      name: 'John Smith',
      image: 'https://ui-avatars.com/api/?name=John+Smith',
      rating: 4.8
    },
    distance: '15.2 km',
    duration: '25 mins'
  },
  {
    id: '2',
    date: '2024-03-14T15:45:00Z',
    pickup: 'Shopping Mall',
    destination: 'Central Park',
    status: 'completed',
    fare: 22.75,
    driver: {
      name: 'Sarah Johnson',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
      rating: 4.9
    },
    distance: '8.7 km',
    duration: '15 mins'
  },
  {
    id: '3',
    date: '2024-03-16T08:20:00Z',
    pickup: 'Gym Center',
    destination: 'Office Complex',
    status: 'ongoing',
    fare: 18.90,
    driver: {
      name: 'Mike Brown',
      image: 'https://ui-avatars.com/api/?name=Mike+Brown',
      rating: 4.7
    },
    distance: '6.3 km',
    duration: '12 mins'
  },
  {
    id: '4',
    date: '2024-03-13T19:15:00Z',
    pickup: 'Restaurant Row',
    destination: 'Residential Area',
    status: 'cancelled',
    fare: 0,
    driver: {
      name: 'Emma Wilson',
      image: 'https://ui-avatars.com/api/?name=Emma+Wilson',
      rating: 4.6
    },
    distance: '12.1 km',
    duration: '20 mins'
  },
  {
    id: '5',
    date: '2024-03-12T11:30:00Z',
    pickup: 'University Campus',
    destination: 'Public Library',
    status: 'completed',
    fare: 15.25,
    driver: {
      name: 'David Lee',
      image: 'https://ui-avatars.com/api/?name=David+Lee',
      rating: 4.9
    },
    distance: '5.8 km',
    duration: '10 mins'
  },
  {
    id: '6',
    date: '2024-03-11T14:20:00Z',
    pickup: 'Beach Front',
    destination: 'Hotel Zone',
    status: 'completed',
    fare: 28.90,
    driver: {
      name: 'Lisa Chen',
      image: 'https://ui-avatars.com/api/?name=Lisa+Chen',
      rating: 4.8
    },
    distance: '13.5 km',
    duration: '22 mins'
  }
];

export const DUMMY_PROFILE_STATS: RideStats = {
  totalRides: 42,
  completedRides: 38,
  cancelledRides: 4,
  totalSpent: 846.50,
  averageRating: 4.8,
  favoriteDestinations: ['Airport', 'Downtown', 'Shopping Mall']
};

export const DUMMY_PROFILE: ProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 234-567-8900',
  address: '123 Main St, City, Country',
  profileImage: 'https://ui-avatars.com/api/?name=John+Doe'
};

export const DUMMY_RIDE_POOLS: RidePool[] = [
  {
    id: 'pool1',
    startLocation: 'Downtown Station',
    endLocation: 'Airport Terminal 1',
    departureTime: '2024-03-20T08:00:00Z',
    availableSeats: 3,
    pricePerSeat: 15.00,
    participants: [
      {
        id: 'user1',
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
    id: 'pool2', 
    startLocation: 'Shopping Mall',
    endLocation: 'University Campus',
    departureTime: '2024-03-20T09:30:00Z',
    availableSeats: 2,
    pricePerSeat: 12.50,
    participants: [
      {
        id: 'user2',
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
    id: 'pool3',
    startLocation: 'Central Park',
    endLocation: 'Beach Resort',
    departureTime: '2024-03-20T10:00:00Z',
    availableSeats: 0,
    pricePerSeat: 20.00,
    participants: [
      {
        id: 'user3',
        name: 'Sarah Wilson',
        image: 'https://ui-avatars.com/api/?name=Sarah+Wilson',
        rating: 4.8,
        isVerified: true,
        pickupPoint: 'Central Park',
        dropoffPoint: 'Beach Resort',
        joinedAt: '2024-03-19T12:30:00Z',
        emergencyContact: {
          name: 'James Wilson',
          phone: '+1 234-567-8902',
          relationship: 'Brother'
        }
      },
      {
        id: 'user4',
        name: 'Tom Brown',
        image: 'https://ui-avatars.com/api/?name=Tom+Brown',
        rating: 4.6,
        isVerified: false,
        pickupPoint: 'Central Park',
        dropoffPoint: 'Beach Resort',
        joinedAt: '2024-03-19T14:15:00Z'
      }
    ],
    route: {
      distance: '22.3 km',
      duration: '35 mins'
    },
    status: 'full'
  },
  {
    id: 'pool4',
    startLocation: 'Sports Complex',
    endLocation: 'Concert Hall',
    departureTime: '2024-03-20T18:30:00Z',
    availableSeats: 1,
    pricePerSeat: 18.00,
    participants: [
      {
        id: 'user5',
        name: 'Emma Davis',
        image: 'https://ui-avatars.com/api/?name=Emma+Davis',
        rating: 5.0,
        isVerified: true,
        pickupPoint: 'Sports Complex',
        dropoffPoint: 'Concert Hall',
        joinedAt: '2024-03-19T20:00:00Z',
        emergencyContact: {
          name: 'John Davis',
          phone: '+1 234-567-8903',
          relationship: 'Father'
        }
      }
    ],
    route: {
      distance: '12.8 km',
      duration: '20 mins'
    },
    status: 'open'
  }
];