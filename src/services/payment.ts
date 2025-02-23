import { PaymentData, PaymentHistoryRecord } from '@/types/payment';
import { RideDetails } from '@/types/ride';
export const paymentService = {
  createPaymentIntent: async (amount: number, poolId?: string) => {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount < 50 ? 50 : amount, poolId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Payment setup failed');
    }

    return response.json();
  },

  storeRideDetails: (details: any) => {
    localStorage.setItem('currentRideDetails', JSON.stringify(details));
  },

  getRideDetails: () => {
    return JSON.parse(localStorage.getItem('currentRideDetails') || '{}');
  },

  clearRideDetails: () => {
    localStorage.removeItem('currentRideDetails');
  },

  createPaymentRecord: (payment: PaymentData, currentRide: RideDetails): PaymentHistoryRecord => {
    return {
      id: payment.id,
      amount: payment.amount,
      date: new Date().toISOString(),
      status: 'completed',
      type: currentRide.type,
      rideDetails: {
        id: currentRide.id,
        pickup: currentRide.pickup,
        destination: currentRide.destination,
        distance: currentRide.distance,
        duration: currentRide.duration,
        type: currentRide.type,
        driver: currentRide.driver,
        poolId: currentRide.poolId
      },
      paymentMethod: 'Credit Card' // Or get from payment data
    };
  }
}; 