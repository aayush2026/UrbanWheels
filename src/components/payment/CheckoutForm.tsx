'use client';

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { usePayment } from '@/context/PaymentContext';

interface CheckoutFormProps {
  onSuccess: () => void;
}

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { pendingPayment } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const pendingPaymentData = JSON.stringify(pendingPayment);
      sessionStorage.setItem('pendingPayment', pendingPaymentData);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Something went wrong');
        setIsProcessing(false);
        sessionStorage.removeItem('pendingPayment');
      }
    } catch (err) {
      setErrorMessage('Payment failed. Please try again.');
      setIsProcessing(false);
      sessionStorage.removeItem('pendingPayment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-600 text-sm">{errorMessage}</div>
      )}
      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
} 