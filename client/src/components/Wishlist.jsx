import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar';
import './Wishlist.css';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/login');
      return;
    }

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/wishlist`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setItems(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          setError('Error fetching wishlist items');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token, isAuthenticated, navigate]);

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated || !token) {
      navigate('/login');
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${productId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setItems(items.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
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