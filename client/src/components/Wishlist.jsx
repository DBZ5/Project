import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar';
import './Wishlist.css';
import { setWishlistItems, removeFromWishlistSuccess } from '../store/wishlistSlice';

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/wishlist`
        );
        dispatch(setWishlistItems(response.data));
        setError(null);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setError('Error fetching wishlist items');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [dispatch]);

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${productId}`
      );
      dispatch(removeFromWishlistSuccess(productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="loading">Loading...</div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div className="error">{error}</div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="wishlist-container">
        <h2>My Wishlist ({items.length})</h2>
        {items.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        ) : (
          <div className="wishlist-items">
            {items.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price}</p>
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;