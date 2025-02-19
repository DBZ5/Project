import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { authStart, authSuccess, authFailure } from '../store/authSlice';
import Navbar from './Navbar';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      dispatch(authFailure("Passwords do not match"));
      return;
    }

    dispatch(authStart());
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/createAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      dispatch(authSuccess(data));
      navigate('/login');
    } catch (err) {
      dispatch(authFailure(err.message || 'Signup failed'));
    }
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (response) => {
      dispatch(authStart());
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { 
              Authorization: `Bearer ${response.access_token}`
            },
          }
        );

        const signupResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/googleSignup`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userInfo.data.email,
              fullName: userInfo.data.name,
              role: 'user'
            }),
          }
        );

        const data = await signupResponse.json();

        if (!signupResponse.ok) {
          throw new Error(data.message || 'Google signup failed');
        }

        dispatch(authSuccess(data));
        navigate('/');
      } catch (err) {
        dispatch(authFailure('Google signup failed: ' + err.message));
      }
    },
    onError: (error) => {
      dispatch(authFailure('Google signup failed: ' + error.message));
    }
  });

  return (
    <div className="login-page">
      <Navbar />
      <div className="auth-layout">
        <div className="auth-image">
          <img 
            src="https://sellfy.com/blog/wp-content/uploads/2020/03/add-a-shopping-cart-website.png" 
            alt="Shopping Cart" 
            className="login-image"
          />
        </div>
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <h1>Create an Account</h1>
            <p className="auth-subtitle">Enter your details below</p>

            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="auth-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="auth-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="auth-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                  className="auth-input"
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <div className="role-selection">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === 'user'}
                      onChange={handleChange}
                    />
                    User
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="seller"
                      checked={formData.role === 'seller'}
                      onChange={handleChange}
                    />
                    Seller
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="login-button" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              <button type="button" className="google-button" onClick={() => handleGoogleSignup()}>
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  className="google-icon"
                />
                Sign up with Google
              </button>
            </form>

            <p className="auth-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
