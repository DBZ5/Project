
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SellerRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated || user?.role !== 'seller') {
    // Redirect to home page if not authenticated or not a seller
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerRoute;