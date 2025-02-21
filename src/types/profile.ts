export interface RideStats {
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  totalSpent: number;
  averageRating: number;
  favoriteDestinations: string[];
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
} 