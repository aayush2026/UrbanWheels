'use client';

import Link from 'next/link';

export default function FailureView() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-800 mb-6">
          <svg className="w-8 h-8 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Payment Failed</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We couldn't process your payment. Please try again.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
