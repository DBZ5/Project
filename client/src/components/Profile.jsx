import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Profile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { authSuccess } from '../store/authSlice';

const Profile = () => {
  console.log("Retrieving user data:", localStorage.getItem('user'));
  const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem('user') || '{}');
  console.log("Parsed user data:", user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    image: user?.image || ''
  });

  // Debug logging
  console.log('User data in Profile:', user);
  console.log('CreatedAt value:', user?.createdAt);

  // Debugging check
  useEffect(() => {
    console.log('User data:', user);
    if (!user || !user.id) {
      console.error('User data is missing or incomplete:', user);
      // Fetch user data if missing
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update Redux state and local storage
      dispatch(authSuccess({
        user: response.data,
        token
      }));
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch user data. Please log in again.'
      });
      // Redirect to login if user data cannot be fetched
      navigate('/login');
    }
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Format the date
  const formatDate = (dateString) => {
    console.log('Formatting date string:', dateString);
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // const handleEditProfile = async () => {
  //   try {
      
  //     const token = localStorage.getItem('token');
  //     const response = await axios.put(
  //       `${import.meta.env.VITE_API_URL}/api/user/${user.id}`,
  //       profileData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );

  //     if (response.data) {
  //       Swal.fire('Success!', 'Profile updated successfully', 'success');
  //       localStorage.setItem('user', JSON.stringify(response.data));
  //       setEditMode(false);
  //       dispatch(authSuccess({ user: response.data, token }));
  //     }
  //   } catch (error) {
  //     Swal.fire('Error!', error.response?.data?.message || 'Failed to update profile', 'error');
  //   }
  // };

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/forgot-password`, {
        email: user.email
      });
      
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Password reset link has been sent to your email',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to send password reset email',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Ensure user ID is available
    const userId = user?.id;
    console.log("User ID:", userId);
    console.log("User:", user);
    
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'User ID is missing. Please log in again.'
      });
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}`,
        profileData,
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update local storage and Redux state
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(authSuccess({
        user: response.data,
        token: localStorage.getItem('token')
      }));

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been successfully updated.'
      });
      setEditMode(false);
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update profile. Please try again.'
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-title">Profile Dashboard</h1>
        
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>
              <h2 className="profile-name">{user?.fullName}</h2>
              <p className="profile-role">{user?.role}</p>
            </div>
            
            <div className="profile-details">
              {editMode ? (
                <>
                  <div className="profile-field">
                    <label>Full Name:</label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="profile-field">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div className="profile-field">
                    <label>Profile Image URL:</label>
                    <input
                      type="text"
                      value={profileData.image}
                      onChange={(e) => setProfileData({...profileData, image: e.target.value})}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{user?.email}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Account Created</span>
                    <span className="detail-value">
                      {formatDate(user?.createdAt)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="profile-actions">
            {editMode ? (
              <>
                <button className="profile-button save-button" onClick={handleUpdate}>
                  Save Changes
                </button>
                <button className="profile-button cancel-button" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="profile-button edit-button" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            )}
            <button 
              className="profile-button change-password-button" 
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
