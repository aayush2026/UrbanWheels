'use client';

import { useState } from 'react';
import { notify } from '@/lib/utils/notifications';
import { RideDetails } from '@/types/ride';

interface RideFeedbackProps {
  ride: RideDetails;
  onSubmit: (feedback: { rating: number; comment: string }) => void;
}

export default function RideFeedback({ ride, onSubmit }: RideFeedbackProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    notify.success('Thank you for your feedback!');
    setRating(5);
    setComment('');
  };

  return (
    <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Rate your ride</h3>
      <form onSubmit={handleSubmit} className="mt-1 space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-colors duration-200 ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comments</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Share your experience..."
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Submit and Pay
        </button>
      </form>
    </div>
  );
}
