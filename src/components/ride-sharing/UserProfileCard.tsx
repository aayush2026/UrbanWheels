import { RideParticipant } from '@/types/ride-sharing';

interface UserProfileCardProps {
  participant: RideParticipant;
}

export default function UserProfileCard({ participant }: UserProfileCardProps) {
  return (
    <div className="flex items-start space-x-4">
      <img
        src={participant.image}
        alt={participant.name}
        className="h-10 w-10 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-900 truncate">
            {participant.name}
          </p>
          {participant.isVerified && (
            <svg
              className="h-4 w-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex items-center mt-1">
          <span className="text-sm text-yellow-500">★</span>
          <span className="ml-1 text-sm text-gray-500">
            {participant.rating}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Pickup: {participant.pickupPoint}
        </p>
        <p className="text-sm text-gray-500">
          Dropoff: {participant.dropoffPoint}
        </p>
      </div>
    </div>
  );
} 