import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51QmcDbLlLqT9CWcnEzOznx3OiQFUpGQLbuWQ4lEJPRf4MALKDKHNiQpRCRihEm6KLSGd0cuStgzN2J8zvqVK2s2Q003zJDkrTh");

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
    } else {
      const { id } = paymentMethod;
      try {
        const response = await axios.post("http://localhost:3000/api/payment", {
          amount: 1000, // Replace with actual amount
          id,
        });
        if (response.data.success) {
          setSuccess(true);
        }
      } catch (error) {
        setError("Payment failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment Successful!</div>}
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
