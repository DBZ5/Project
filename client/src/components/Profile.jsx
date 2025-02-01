import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
  const user = useSelector((state) => state.auth.user); // Get the user from Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if the user is authenticated
  const navigate = useNavigate(); // Hook to navigate programmatically

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    navigate("/login");
    return null; // Return null to avoid rendering the component while redirecting
  }

  return (
    <div className="profile-page">
      <Navbar />
      <h1>Profile</h1>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {user?.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        {/* Add more user information as needed */}
      </div>
    </div>
  );
};

export default Profile;
