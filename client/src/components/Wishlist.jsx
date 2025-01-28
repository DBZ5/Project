import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeFromWishlistSuccess, setWishlistItems } from '../store/wishlistSlice';
import Navbar from './Navbar';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setWishlistItems(response.data));
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    if (token) {
      fetchWishlist();
    }
  }, [dispatch, token]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(removeFromWishlistSuccess(productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="wishlist-container">
        <h2>My Wishlist</h2>
        <div className="wishlist-items">
          {items.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button onClick={() => handleRemoveFromWishlist(item.id)}>
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist; 