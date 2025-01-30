import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { authStart, authSuccess, authFailure } from '../store/authSlice';
import Navbar from './Navbar';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    dispatch(authStart());

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      dispatch(authSuccess(data));
      navigate('/');
    } catch (err) {
      dispatch(authFailure(err.message || 'Login failed'));
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      dispatch(authStart());
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );

        const loginResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/loginWithGoogle`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userInfo.data.email,
              fullName: userInfo.data.name,
            }),
          }
        );

        const data = await loginResponse.json();

        if (!loginResponse.ok) {
          throw new Error(data.message || 'Google login failed');
        }

        dispatch(authSuccess(data));
        navigate('/');
      } catch (err) {
        dispatch(authFailure(err.message || 'Google login failed'));
      }
    },
    onError: () => {
      dispatch(authFailure('Google login failed'));
    },
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
            <h1>Log in to Exclusive</h1>
            <p className="auth-subtitle">Enter your details below</p>

            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email or Phone Number"
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

              <div className="form-actions">
                <button type="submit" className="login-button" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </button>
                <Link to="/forgot-password" className="forgot-password">
                  Forget Password?
                </Link>
              </div>

              <button type="button" className="google-button" onClick={() => handleGoogleLogin()}>
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  className="google-icon"
                />
                Sign in with Google
              </button>
            </form>

            <p className="auth-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
