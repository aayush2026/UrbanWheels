'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import CheckoutForm from '@/components/payment/CheckoutForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { useRide } from '@/context/RideContext';
import { usePayment } from '@/context/PaymentContext';

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string>();
  const [error, setError] = useState('');
  const router = useRouter();
  const { currentRide, completePayment } = useRide();
  const { pendingPayment } = usePayment();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        if (!pendingPayment.amount) {
          throw new Error('No payment amount specified');
        }

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: pendingPayment.amount,
            rideId: pendingPayment.rideDetails?.id 
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Payment setup failed');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Payment setup failed');
        setTimeout(() => router.push('/book'), 3000);
      }
    };

    fetchPaymentIntent();
  }, [pendingPayment, router]);

  const handlePaymentSuccess = () => {
    if (currentRide) {
      completePayment(currentRide.id);
      router.push('/dashboard');
    }
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <ErrorMessage message={error} />
        <p className="mt-4 text-center text-gray-600">Redirecting back to booking...</p>
      </div>
    );
  }

  if (!clientSecret) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Complete Your Payment</h1>
      <Elements stripe={stripePromise} options={{ 
        clientSecret,
        appearance: {
          theme: 'stripe',
        },
      }}>
        <CheckoutForm onSuccess={handlePaymentSuccess} />
      </Elements>
    </div>
  );
} 