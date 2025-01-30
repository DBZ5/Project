import React, { useState } from "react";
import './Cart.css'; // Import a CSS file for styling
import Navbar from "./Navbar";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "LCD Monitor", price: 650, quantity: 1 },
    { id: 2, name: "Game Controller", price: 50, quantity: 2 },
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleCouponApply = () => {
    // Implement coupon logic here
    alert("Coupon applied!");
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) || 0; // Ensure subtotal is 0 if NaN

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      
      // Create payment intent
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment`, {
        amount: subtotal,
        id: 'your_payment_method_id' // This should come from Stripe Elements
      });

      if (response.data.success) {
        alert('Payment successful!');
        setCartItems([]); // Clear cart after successful payment
      } else {
        alert('Payment failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Payment failed: ' + error.message);
    }
  };

  return (
  <>
  <Navbar />
    <div className="cart-container">
      
      <h2 className="cart-title">Your Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price}</span>
            </div>
            <div className="item-quantity">
              <input
                type="number"
                value={item.quantity}
                min="0"
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="quantity-input"
              />
            </div>
            <span className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
          </div>

        ))}
      </div>
      <div className="coupon-section">
        <input type="text" placeholder="Coupon Code" className="coupon-input" />
        <button onClick={handleCouponApply} className="coupon-button">
          Apply Coupon
        </button>
      </div>
      <div className="cart-total">
        <p>Subtotal: <span className="subtotal-amount">${subtotal}</span></p>
        <p>Shipping: <span className="shipping-amount">Free</span></p>
        <p>Total: <span className="total-amount">${subtotal}</span></p>
        <button className="checkout-button" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
    </>
  );
};

export default Cart; 