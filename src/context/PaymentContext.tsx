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
    rideType?: string;
  };
  setPendingPayment: (amount: number, details: RideDetails, rideType?: string) => void;
  clearPendingPayment: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [pendingPayment, setPendingPaymentState] = useState<{
    amount: number;
    rideDetails: RideDetails | null;
    rideType?: string;
  }>({ amount: 0, rideDetails: null, rideType: undefined });

  const setPendingPayment = (amount: number, details: RideDetails, rideType?: string) => {
    setPendingPaymentState({ amount, rideDetails: details, rideType });
  };

  const addPaymentToHistory = (payment: PaymentHistoryRecord) => {
    const existingPayments = getPaymentHistory();
    const updatedPayments = [payment, ...existingPayments];
    localStorage.setItem('paymentHistory', JSON.stringify(updatedPayments));
  };

  const clearPaymentHistory = () => {
    localStorage.removeItem('paymentHistory');
  };

  const getPaymentHistory = () => {
    const storedPayments = localStorage.getItem('paymentHistory');
    return storedPayments ? JSON.parse(storedPayments) : [];
  };

  const clearPendingPayment = () => {
    setPendingPaymentState({ amount: 0, rideDetails: null, rideType: undefined });
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