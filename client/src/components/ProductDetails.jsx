import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar';
import './ProductDetails.css';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(2);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!isAuthenticated || !token || !id) {
        setIsInWishlist(false);
        return;
      }
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/wishlist/check/${id}`, 
          {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setIsInWishlist(response.data.isInWishlist);
      } catch (err) {
        console.error('Error checking wishlist status:', err);
        setIsInWishlist(false);
      }
    };

    checkWishlistStatus();
  }, [id, token, isAuthenticated]);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated || !token) {
      navigate('/login');
      return;
    }

    try {
      if (isInWishlist) {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/wishlist/${id}`,
          {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        if (response.data.isInWishlist === false) {
          setIsInWishlist(false);
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/wishlist`,
          { productId: id },
          {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        if (response.data.isInWishlist === true) {
          setIsInWishlist(true);
        }
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        size: selectedSize,
        image: product.image
      };
      
      dispatch(addToCart(cartItem));
      navigate('/cart');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="product-details-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="ratings-container">
            <div className="stars">
              {'★'.repeat(4)}{'☆'.repeat(1)}
            </div>
            <span className="reviews-count">(150 Reviews)</span>
            <span className={`stock-status ${product.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="product-price">${product.price}</div>
          
          <p className="product-description">
            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
          </p>

          <div className="size-section">
            <span className="section-label">Size:</span>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="action-group">
            <div className="action-buttons">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.quantity}
                >
                  +
                </button>
              </div>

              <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
              <button 
                className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                onClick={handleWishlistToggle}
                title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <svg
                  className="heart-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"
                  />
                </svg>
              </button>
            </div>

            <div className="delivery-info">
              <div className="delivery-item">
                <img src="https://cdn-icons-png.flaticon.com/512/66/66841.png" alt="Delivery" />
                <div className="delivery-text">
                  <h4>Free Delivery</h4>
                  <a href="#" className="enter-pincode">Enter your postal code for Delivery Availability</a>
                </div>
              </div>
              <div className="delivery-item">
                <img src="https://static.vecteezy.com/system/resources/previews/012/289/518/non_2x/undo-flat-color-outline-icon-free-png.png" alt="Return" />
                <div className="delivery-text">
                  <h4>Return Delivery</h4>
                  <p>Free 30 Days Delivery Returns. <a href="#" className="details-link">Details</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
