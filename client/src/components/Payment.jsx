import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import './Payment.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
        console.log("Stripe not loaded");
        return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        console.log('[error]', error);
        Swal.fire({
          icon: 'error',
          title: 'Payment Error',
          text: error.message,
          customClass: {
            popup: 'swal-wide'
          }
        });
    } else {
        console.log('PaymentMethod', paymentMethod);
        // Trigger the beautiful success alert
        Swal.fire({
          title: 'Payment Successful!',
          text: 'Your transaction has been completed successfully.',
          icon: 'success',
          imageUrl: 'https://i.imgur.com/4NZ6uLY.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
          `,
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Great!',
          customClass: {
            popup: 'custom-popup-class'
          }
        });
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
    <>
      <Navbar />
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </>
  );
};

export default Payment;
