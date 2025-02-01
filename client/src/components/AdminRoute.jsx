import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated || user?.role !== 'admin') {
    // Redirect to home page if not authenticated or not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute; 