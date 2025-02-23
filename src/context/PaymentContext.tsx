'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PaymentHistoryRecord } from '@/types/payment';
import { RideDetails } from '@/types/ride';

interface PaymentContextType {
  addPaymentToHistory: (payment: PaymentHistoryRecord) => void;
  clearPaymentHistory: () => void;
  getPaymentHistory: () => PaymentHistoryRecord[];
  pendingPayment: {
    amount: number;
    rideDetails: RideDetails | null;
  };
  setPendingPayment: (amount: number, details: RideDetails) => void;
  clearPendingPayment: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryRecord[]>([]);
  const [pendingPayment, setPendingPaymentState] = useState<{
    amount: number;
    rideDetails: RideDetails | null;
  }>({ amount: 0, rideDetails: null });

  const setPendingPayment = (amount: number, details: RideDetails) => {
    setPendingPaymentState({ amount, rideDetails: details });
  };

  const addPaymentToHistory = (payment: PaymentHistoryRecord) => {
    setPaymentHistory(prev => [payment, ...prev]);
  };

  const clearPaymentHistory = () => {
    setPaymentHistory([]);
  };

  const getPaymentHistory = () => paymentHistory;

  const clearPendingPayment = () => {
    setPendingPaymentState({ amount: 0, rideDetails: null });
  };

  return (
    <PaymentContext.Provider value={{ 
      pendingPayment,
      setPendingPayment,
      clearPendingPayment,
      addPaymentToHistory, 
      clearPaymentHistory,
      getPaymentHistory 
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (undefined === context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}; 