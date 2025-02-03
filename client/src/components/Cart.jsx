import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import './Cart.css'; // Import a CSS file for styling
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCouponApply = () => {
    // Implement coupon logic here
    Swal.fire({
      icon: 'success',
      title: 'Coupon Applied',
      text: 'Coupon code applied successfully!'
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) || 0; // Ensure subtotal is 0 if NaN

  const handleCheckout = () => {
    // Check both Redux state and localStorage for auth
    const token = localStorage.getItem('token');
    if (user || token) {
      Swal.fire({
        icon: 'success',
        title: 'Proceeding to payment',
        text: 'Redirecting to payment page...'
      });
      navigate('/payment');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Please log in to proceed with the checkout.'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-items">
            <h2>Product</h2>
            {cartItems.map((item) => (
              <div className="cart-item" key={`${item.id}-${item.size}`}>
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <span>{item.name}</span>
                    {item.size && <span className="item-size">Size: {item.size}</span>}
                  </div>
                </div>
                <span className="price">${item.price}</span>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="quantity-input"
                />
                <span className="subtotal">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <input type="text" placeholder="Coupon Code" className="coupon-input" />
            <button className="apply-coupon" onClick={handleCouponApply}>
              Apply Coupon
            </button>
            <div className="total-section">
              <div><span>Subtotal:</span><span>${subtotal}</span></div>
              <div><span>Shipping:</span><span>Free</span></div>
              <div><span>Total:</span><span>${subtotal}</span></div>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart; 