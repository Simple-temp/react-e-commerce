import React from 'react';
import { useStripe, useElements, IdealBankElement, FpxBankElement, IbanElement, AuBankAccountElement, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const PaymentCard = ({processPayment}) => {

    const stripe = useStripe();
    const elements = useElements();

    const [err, setErr] = useState(null)
    const [success, setsuccess] = useState(null)
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (elements == null) {
        return;
      }
  
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if(error)
      {
        console.log(error.message)
        setErr(error.message)
        setsuccess(null)
      }else{
        console.log(paymentMethod)
        setsuccess(paymentMethod.id)
        processPayment(paymentMethod.id)
        setErr(null)
      }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe || !elements}>
                    Pay
                </button>
            </form>
            {
                err && <p style={{ color:"red"}}>{err}</p>
            }
            {
                success && <p style={{ color:"green"}}>Payment was successfull..</p>
            }
        </>
    );
};

export default PaymentCard;