'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePayment } from '@/context/PaymentContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import PaymentHistoryList from '@/components/payment/PaymentHistoryList';
import { PaymentHistoryRecord } from '@/types/payment';

export default function PaymentHistoryPage() {
  const { isLoading: authLoading } = useAuth();
  const { getPaymentHistory } = usePayment();
  const [payments, setPayments] = useState<PaymentHistoryRecord[]>([]);

  useEffect(() => {
    if (!authLoading) {
      const storedPayments = getPaymentHistory();
      setPayments(storedPayments);
    }
  }, [authLoading, getPaymentHistory]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Payment History
        </h1>
        <PaymentHistoryList payments={payments} />
      </div>
    </div>
  );
}
