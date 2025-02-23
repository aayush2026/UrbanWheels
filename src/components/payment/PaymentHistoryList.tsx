'use client';

import { PaymentHistoryRecord } from '@/types/payment';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentHistoryListProps {
  payments: PaymentHistoryRecord[];
}

type SortField = 'date' | 'amount' | 'type';
type SortOrder = 'asc' | 'desc';

export default function PaymentHistoryList({ payments }: PaymentHistoryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterType, setFilterType] = useState<string>('all');

  const getRideTypeDisplay = (type: string) => {
    return type === 'solo_ride' ? 'Solo Ride' : 'Pool Ride';
  };

  const filteredAndSortedPayments = useMemo(() => {
    return payments
      .filter(payment => {
        const matchesSearch = 
          payment.rideDetails?.pickup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.rideDetails?.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          getRideTypeDisplay(payment.type).toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = filterType === 'all' || payment.type === filterType;
        
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortField === 'date') {
          return sortOrder === 'desc' 
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortField === 'amount') {
          return sortOrder === 'desc' 
            ? b.amount - a.amount
            : a.amount - b.amount;
        }
        return sortOrder === 'desc'
          ? b.type.localeCompare(a.type)
          : a.type.localeCompare(b.type);
      });
  }, [payments, searchTerm, sortField, sortOrder, filterType]);

  const uniqueTypes = useMemo(() => {
    return ['all', ...new Set(payments.map(p => p.type))];
  }, [payments]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search rides..."
            className="px-4 py-2 border rounded-md flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {uniqueTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-4">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="type">Sort by Type</option>
          </select>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <AnimatePresence>
          <motion.ul 
            role="list" 
            className="divide-y divide-gray-200"
          >
            {filteredAndSortedPayments.map((payment) => (
              <motion.li
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="hover:bg-gray-50"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {getRideTypeDisplay(payment.type)}
                        </p>
                        {payment.rideDetails?.driver && (
                          <div className="ml-4 flex items-center">
                            <img
                              src={payment.rideDetails.driver.image}
                              alt={payment.rideDetails.driver.name}
                              className="h-6 w-6 rounded-full"
                            />
                            <span className="ml-2 text-sm text-gray-500">
                              {payment.rideDetails.driver.name}
                            </span>
                          </div>
                        )}
                        <div className="ml-2 flex-shrink-0">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {payment.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex flex-col">
                          <p className="flex items-center text-sm text-gray-500">
                            From: {payment.rideDetails?.pickup}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            To: {payment.rideDetails?.destination}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="mr-4">Distance: {payment.rideDetails?.distance}</span>
                        <span>Duration: {payment.rideDetails?.duration}</span>
                      </div>
                    </div>
                    <div className="ml-6 flex flex-col items-end">
                      <p className="text-sm font-medium text-gray-900">
                        ${payment.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
            {filteredAndSortedPayments.length === 0 && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="px-4 py-8 text-center text-gray-500">
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