import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Profile.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  // Debug logging
  console.log('User data in Profile:', user);
  console.log('CreatedAt value:', user?.createdAt);

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
              
        
            </div>
          </div>

          <div className="profile-actions">
            <button className="profile-button edit-button">
              Edit Profile
            </button>
            <button className="profile-button change-password-button">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
