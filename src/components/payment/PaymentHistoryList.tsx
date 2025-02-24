'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePayment } from '@/context/PaymentContext';
import { PaymentHistoryRecord } from '@/types/payment';

type SortField = 'date' | 'amount' | 'type';
type SortOrder = 'asc' | 'desc';

const createInitials = (name: string) => {
  const names = name.split(' ');
  const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
  return initials;
};

interface PaymentHistoryListProps {
  payments: PaymentHistoryRecord[];
}

export default function PaymentHistoryList({ payments }: PaymentHistoryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredAndSortedPayments = useMemo(() => {
    return payments
      .filter(payment => {
        const matchesSearch =
          payment.rideDetails?.pickup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.rideDetails?.destination?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'all' || payment.type === filterType;

        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (sortField === 'date') {
          return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
        }
        if (sortField === 'amount') {
          return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
        }
        return sortOrder === 'desc' ? b.type.localeCompare(a.type) : a.type.localeCompare(b.type);
      });
  }, [payments, searchTerm, sortField, sortOrder, filterType]);

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search rides..."
          className="px-4 py-2 border rounded-md flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="all">All Types</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <AnimatePresence>
          <motion.ul role="list" className="divide-y divide-gray-200 dark:divide-gray-600">
            {filteredAndSortedPayments.map((payment) => (
              <motion.li key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col flex-grow">
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                        {payment.type === 'solo_ride' ? 'Solo Ride' : 'Pool Ride'}
                      </p>
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                        From: {payment.rideDetails?.pickup}
                      </p>
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                        To: {payment.rideDetails?.destination}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ${payment.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
            {filteredAndSortedPayments.length === 0 && (
              <motion.li>
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-300">
                  No matching payments found
                </div>
              </motion.li>
            )}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
