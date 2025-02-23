'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface SuccessViewProps {
  amount: number;
}

export default function SuccessView({ amount }: SuccessViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto py-16 px-4"
    >
      <div className="text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6"
        >
          <motion.svg 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-8 h-8 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </motion.svg>
        </motion.div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-8">
          Your payment of ${amount.toFixed(2)} has been processed successfully.
        </p>
        <div className="space-x-4">
          <Link
            href="/rides"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            View My Rides
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 