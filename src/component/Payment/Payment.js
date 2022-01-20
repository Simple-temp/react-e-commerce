import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentCard from '../PaymentCard/PaymentCard';


const stripePromise = loadStripe('pk_test_51KJhEFFesKPGWiP3YH9pPx3aDpRX44wil8afCvneKe2ziTVEPoBgXnEFnanssjwK1RbAeyKbQV5kSBYGcjeOsxoB00m0ZXAjF8');

const Payment = ({processPayment}) => {

    return (
        <Elements stripe={stripePromise} >
            <PaymentCard processPayment={processPayment}></PaymentCard>
        </Elements>
    );
};

export default Payment;