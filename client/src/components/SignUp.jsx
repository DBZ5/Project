import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { authStart, authSuccess, authFailure } from "../store/authSlice";
import Navbar from "./Navbar";
import { useGoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authStart());

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/createAccount",
        formData
      );
      dispatch(authSuccess(response.data));
      navigate("/");
    } catch (err) {
      dispatch(authFailure(err.response?.data?.message || "Registration failed"));
    }
  };

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (response) => {
      if (!response.access_token) {
        dispatch(authFailure("Google signup failed: No access token"));
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
          "http://127.0.0.1:8000/api/user/googleSignup",
          {
            email: userInfo.email,
            fullName: userInfo.name,
            role: formData.role
          }
        );

        if (backendResponse.data.error) {
          dispatch(authFailure(backendResponse.data.message));
          return;
        }

        dispatch(authSuccess(backendResponse.data));
        navigate("/");
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Google signup failed";
        dispatch(authFailure(errorMessage));
      }
    },
    onError: () => {
      dispatch(authFailure("Google signup failed"));
    },
  });

  return (
    <div className="auth-container">
      <Navbar />

      <div className="auth-box">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <button type="button" className="google-button" onClick={handleGoogleSignUp}>
            <img src="/google-icon.svg" alt="Google" />
            Sign up with Google
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
