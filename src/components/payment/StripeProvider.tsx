'use client';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { ReactNode } from 'react';

export default function StripeProvider({ children }: { children: ReactNode }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
} 