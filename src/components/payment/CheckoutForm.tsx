'use client';

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { usePayment } from '@/context/PaymentContext';
import { PaymentHistoryRecord } from '@/types/payment';

interface CheckoutFormProps {
  onSuccess: () => void;
}

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { pendingPayment, setPendingPayment } = usePayment();

  function isPaymentIntentResult(result: any): result is { paymentIntent: any } {
    return result && result.paymentIntent !== undefined;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { amount, rideDetails } = pendingPayment;

      if (!rideDetails) {
        throw new Error('Ride details are missing');
      }

      const pendingPaymentData = {
        amount: amount,
        rideDetails: rideDetails,
        feedback: {
          rating: 5,
          comment: 'Great ride!',
        },
      };

      sessionStorage.setItem('pendingPayment', JSON.stringify(pendingPaymentData));
      setPendingPayment(amount, rideDetails, rideDetails.type);

      console.log('Attempting to confirm payment...');
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });
      console.log('Payment confirmation result:', result);

      if (result.error) {
        setErrorMessage(result.error.message || 'Something went wrong');
        setIsProcessing(false);
        sessionStorage.removeItem('pendingPayment');
      } else if (isPaymentIntentResult(result)) {
        const newPayment: PaymentHistoryRecord = {
          id: result.paymentIntent.id,
          amount: result.paymentIntent.amount / 100,
          date: new Date(result.paymentIntent.created * 1000).toISOString(),
          type: rideDetails.type as 'solo_ride' | 'pool',
          rideDetails: rideDetails,
          paymentMethod: result.paymentIntent.payment_method_types[0] || 'unknown',
          status: 'completed',
        };

        console.log('Creating payment record:', newPayment);

        const storedPayments = localStorage.getItem('paymentHistory');
        const existingPayments: PaymentHistoryRecord[] = storedPayments ? JSON.parse(storedPayments) : [];
        const updatedPayments = [...existingPayments, newPayment];
        localStorage.setItem('paymentHistory', JSON.stringify(updatedPayments));

        sessionStorage.removeItem('pendingPayment');
        onSuccess();
        router.push('/payment/success');
      }
    } catch (err) {
      setErrorMessage('Payment failed. Please try again.');
      setIsProcessing(false);
      sessionStorage.removeItem('pendingPayment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md dark:shadow-gray-700">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-600 dark:text-red-400 text-sm">{errorMessage}</div>
      )}
      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}
