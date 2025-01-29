import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { authStart, authSuccess, authFailure } from '../store/authSlice';
import Navbar from './Navbar';
import { useGoogleLogin } from '@react-oauth/google';

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
      const response = await axios.post('http://localhost:8000/api/user/login', formData);
      dispatch(authSuccess(response.data));
      navigate('/');
    } catch (err) {
      dispatch(authFailure(err.response?.data?.message || 'Login failed'));
    }
  };

  // Handle Google login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      if (!response.access_token) {
        dispatch(authFailure("Google login failed: No access token"));
        return;
      }

      dispatch(authStart());
      try {
        // Get user info from Google
        const { data: userInfo } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );

        // Send to your backend
        const backendResponse = await axios.post(
          "http://localhost:8000/api/user/loginWithGoogle",
          {
            email: userInfo.email,
            fullName: userInfo.name
          }
        );

        if (backendResponse.data.error) {
          dispatch(authFailure(backendResponse.data.message));
          return;
        }

        dispatch(authSuccess(backendResponse.data));
        navigate('/');
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Google login failed";
        dispatch(authFailure(errorMessage));
      }
    },
    onError: () => {
      dispatch(authFailure("Google login failed"));
    },
  });

  return (
    <div className="auth-container">
      <Navbar />
      <Navbar />
      <div className="auth-box">
        <h2>Log in to Exclusive</h2>
        <p className="subtitle">Enter your details below</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email or Phone Number"
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
            />
          </div>
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
          <button 
            type="button" 
            className="google-button"
            onClick={() => handleGoogleLogin()}
          >
            <img src="/google-icon.svg" alt="Google" />
            Sign in with Google
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
