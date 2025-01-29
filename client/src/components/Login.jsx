import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { authStart, authSuccess, authFailure } from '../store/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/main');
//     }
//   }, [isAuthenticated, navigate]);

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
      navigate('/main');
    } catch (err) {
      dispatch(authFailure(err.response?.data?.message || 'Login failed'));
    }
  };

  return (
    <div className="auth-container">
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
            Log in
          </button>
          <button type="button" className="google-button">
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