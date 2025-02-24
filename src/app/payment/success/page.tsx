'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStripe } from '@stripe/react-stripe-js';
import { PaymentData, PaymentStatus } from '@/types/payment';
import { usePayment } from '@/context/PaymentContext';
import SuccessView from '@/components/payment/SuccessView';
import FailureView from '@/components/payment/FailureView';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import StripeProvider from '@/components/payment/StripeProvider';

function PaymentSuccessContent() {
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [paymentIntent, setPaymentIntent] = useState<PaymentData | null>(null);
  const searchParams = useSearchParams();
  const stripe = useStripe();
  const { addPaymentToHistory, getPaymentHistory } = usePayment();
  const router = useRouter();
  const processedRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const processPayment = async () => {
      if (processedRef.current) return;
      
      if (!stripe) {
        setTimeout(processPayment, 100);
        return;
      }

      const clientSecret = searchParams.get('payment_intent_client_secret');
      if (!clientSecret) {
        console.error('No client secret found');
        setStatus('failed');
        return;
      }

      try {
        const storedPayment = sessionStorage.getItem('pendingPayment');
        if (!storedPayment) {
          console.error('No stored payment data found');
          setStatus('failed');
          return;
        }

        console.log('Retrieving payment intent...');
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
        console.log('Payment intent status:', paymentIntent?.status);
        
        const pendingPaymentData = JSON.parse(storedPayment);
        console.log('Stored pending payment:', pendingPaymentData);

        if (paymentIntent?.status === 'succeeded' && pendingPaymentData?.rideDetails) {
          const paymentRecord = {
            id: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            date: new Date().toISOString(),
            status: 'success',
            type: pendingPaymentData.rideDetails.type,
            rideDetails: pendingPaymentData.rideDetails,
            paymentMethod: 'Card'
          };

          console.log('Before adding new payment:', getPaymentHistory());
          addPaymentToHistory(paymentRecord);
          console.log('After adding new payment:', getPaymentHistory());
          setPaymentIntent(paymentIntent as unknown as PaymentData);
          setStatus('success');
          processedRef.current = true;
          setTimeout(() => {
            sessionStorage.removeItem('pendingPayment');
          }, 1000);
        } else {
          if (mounted) {
            console.error('Payment not succeeded or missing ride details');
            setStatus('failed');
          }
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        if (mounted) setStatus('failed');
      }
    };

    processPayment();

    return () => {
      mounted = false;
    };
  }, [stripe, searchParams, addPaymentToHistory, getPaymentHistory]);

  if (status === 'loading') return <LoadingSpinner  />;
  if (status === 'failed') return <FailureView  />;
  return <SuccessView amount={(paymentIntent?.amount || 0) / 100}/>;
}

export default function PaymentSuccessPage() {
  return (
    <StripeProvider>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex items-center justify-center">
        <PaymentSuccessContent />
      </div>
    </StripeProvider>
  );
}
