'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePayment } from '@/context/PaymentContext';
import { PaymentHistoryRecord } from '@/types/payment';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import PaymentHistoryList from '@/components/payment/PaymentHistoryList';

export default function PaymentHistoryPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { getPaymentHistory } = usePayment();
  const [payments, setPayments] = useState<PaymentHistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPayments = () => {
      const storedPayments = getPaymentHistory();
      const updatedPayments = storedPayments.map(payment => ({
        ...payment,
        rideDetails: payment.rideDetails || {
          pickup: 'Not available',
          destination: 'Not available'
        },
        paymentMethod: payment.paymentMethod || 'Card'
      }));
      setPayments(updatedPayments);
      setIsLoading(false);
    };

    if (!authLoading) {
      loadPayments();
    }
  }, [authLoading, getPaymentHistory]);

  if (authLoading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Payment History
        </h1>
        <PaymentHistoryList payments={payments} />
      </div>
    </div>
  );
} 